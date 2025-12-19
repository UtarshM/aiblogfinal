/**
 * Bulk Blog Generator - AWS Backend Automation Script
 * 
 * Processes CSV/Excel files to generate human-like blog content using Gemini 1.5 Flash
 * and publishes to WordPress with scheduling support.
 * 
 * @author Scalezix Venture PVT LTD
 * @copyright 2025 Scalezix Venture PVT LTD. All Rights Reserved.
 * 
 * Usage: node bulkBlogGenerator.js [input_file] [wordpress_site_id]
 * Example: node bulkBlogGenerator.js blog_data.csv site123
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import * as XLSX from 'xlsx';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';
import mongoose from 'mongoose';

// Configuration
const CONFIG = {
  DELAY_BETWEEN_POSTS: 5000, // 5 seconds delay between API calls
  MAX_RETRIES: 3,
  WORD_TARGET: 5000,
  OUTPUT_FILE: 'published_links.csv'
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const colorMap = {
    info: colors.blue,
    success: colors.green,
    error: colors.red,
    warning: colors.yellow,
    progress: colors.cyan
  };
  console.log(`${colorMap[type]}[${timestamp}] ${message}${colors.reset}`);
}

/**
 * Read and parse input file (CSV or Excel)
 */
function readInputFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`Input file not found: ${filePath}`);
  }
  
  log(`Reading input file: ${filePath}`, 'info');
  
  if (ext === '.csv') {
    const content = fs.readFileSync(filePath, 'utf-8');
    const records = parse(content, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });
    return records;
  } else if (ext === '.xlsx' || ext === '.xls') {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const records = XLSX.utils.sheet_to_json(worksheet);
    return records;
  } else {
    throw new Error(`Unsupported file format: ${ext}. Use .csv or .xlsx`);
  }
}

/**
 * Normalize column names from CSV/Excel
 */
function normalizeRow(row) {
  const normalized = {};
  
  // Map various column name formats to standard names
  const columnMappings = {
    'title': ['title', 'Title', 'TITLE', 'topic', 'Topic'],
    'hTags': ['h tags', 'H Tags', 'htags', 'HTags', 'headings', 'Headings', 'H Tags (Actual Headings)'],
    'keywords': ['keywords', 'Keywords', 'KEYWORDS', 'keyword', 'Keyword'],
    'reference': ['reference', 'Reference', 'REFERENCE', 'references', 'References', 'ref', 'Ref'],
    'eeat': ['eeat', 'EEAT', 'E-E-A-T', 'expertise', 'Expertise'],
    'date': ['date', 'Date', 'DATE', 'publish_date', 'Publish Date'],
    'time': ['time', 'Time', 'TIME', 'publish_time', 'Publish Time']
  };
  
  for (const [standardName, possibleNames] of Object.entries(columnMappings)) {
    for (const possibleName of possibleNames) {
      if (row[possibleName] !== undefined) {
        normalized[standardName] = row[possibleName];
        break;
      }
    }
  }
  
  return normalized;
}

/**
 * Build the human-like content generation prompt
 */
function buildPrompt(row) {
  const { title, hTags, keywords, reference, eeat } = row;
  
  return `You are a professional human ghostwriter. Write a 5,000-word, extremely detailed blog post about "${title}".

STRUCTURE & SEO:
- Use ONLY these headings in order: ${hTags}
- Format them as <h2 id="sectionX"> for main headings or <h3> for sub-headings
- Add a Table of Contents after the opening paragraph:
  <div class="toc"><h3>Table of Contents</h3><ul><li><a href="#section1">First Heading</a></li>...</ul></div>
- KEYWORDS: You MUST include every single one of these keywords naturally throughout the content: ${keywords}
- EEAT COMPLIANCE: ${eeat || 'Write with the authority of an expert in this field.'}
- REFERENCE CONTEXT: ${reference ? `Use the information from ${reference} to ensure factual accuracy.` : 'Ensure all information is accurate and well-researched.'}

HUMAN-WRITING ENGINE (BURSTINESS) - THIS IS CRITICAL:

1. SENTENCE VARIATION:
   - Vary sentence length drastically
   - Follow a long, 30-word sentence with a 3-word sentence
   - Then maybe a medium one. See how that works?

2. PERSONAL VOICE:
   - Use "I" and "You" throughout
   - Speak directly to the reader like a friend
   - Share personal insights: "In my experience...", "What I've found is..."

3. NATURAL LANGUAGE:
   - Use contractions everywhere (don't, it's, we've, you're, they're)
   - Start sentences with "But," "And," "So," or "Now"
   - Add casual phrases: "Here's the thing," "Look," "Honestly"

4. BANNED AI WORDS - NEVER USE THESE:
   ❌ delve → use "look into"
   ❌ realm → use "area" or "world"
   ❌ landscape → use "world" or "space"
   ❌ robust → use "strong" or "solid"
   ❌ leverage → use "use"
   ❌ comprehensive → use "full" or "complete"
   ❌ game-changer → use "big deal" or describe what it does
   ❌ cutting-edge → use "new" or "latest"
   ❌ seamless → use "smooth" or "easy"
   ❌ utilize → use "use"
   ❌ implement → use "set up" or "start"
   ❌ facilitate → use "help"
   ❌ Moreover, Furthermore, Therefore, Nevertheless → use "Also", "Plus", "And", "But", "So"

5. LENGTH REQUIREMENT - DEEP DIVE:
   - Each H2 section should be at least 800-1000 words
   - Provide examples, stories, and detailed explanations
   - Do NOT summarize - go deep into each topic
   - Total content must be at least 5,000 words

6. ENDING:
   - No "In Conclusion" or "To Sum Up"
   - End with a "Parting Thought" section
   - Make it memorable and personal

HTML FORMAT:
- <h2 id="section1"> for main headings (with id for TOC links)
- <h3> for sub-headings
- <p> for paragraphs
- <ul><li> for bullet lists (use sparingly)
- <strong> for emphasis
- <blockquote> for quotes or important callouts

START DIRECTLY WITH THE CONTENT. No intro like "Here is..." - just begin the article:`;
}

/**
 * Generate content using Gemini 1.5 Flash
 */
async function generateContent(prompt, retries = 0) {
  const GOOGLE_AI_KEY = process.env.GOOGLE_AI_KEY;
  
  if (!GOOGLE_AI_KEY) {
    throw new Error('GOOGLE_AI_KEY not found in environment variables');
  }
  
  try {
    const genAI = new GoogleGenerativeAI(GOOGLE_AI_KEY);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 32000,
        topP: 0.95,
        topK: 40
      }
    });
    
    log('Calling Gemini 1.5 Flash API...', 'progress');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const content = response.text();
    
    // Count words
    const wordCount = content.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(w => w.length > 0).length;
    log(`Generated ${wordCount} words`, 'success');
    
    return content;
  } catch (error) {
    if (retries < CONFIG.MAX_RETRIES) {
      log(`API error, retrying (${retries + 1}/${CONFIG.MAX_RETRIES})...`, 'warning');
      await delay(2000);
      return generateContent(prompt, retries + 1);
    }
    throw error;
  }
}

/**
 * Clean generated content
 */
function cleanContent(content) {
  let cleaned = content;
  
  // Remove markdown code blocks if present
  cleaned = cleaned.replace(/```html\n?/gi, '');
  cleaned = cleaned.replace(/```\n?/gi, '');
  
  // Remove any "Here is..." intro lines
  cleaned = cleaned.replace(/^<p>Here is[\s\S]*?<\/p>/i, '');
  cleaned = cleaned.replace(/^Here is[\s\S]*?\n/i, '');
  
  // Remove metadata blocks
  cleaned = cleaned.replace(/---METADATA[\s\S]*?---/gi, '');
  
  // Remove JSON-LD schema
  cleaned = cleaned.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');
  
  return cleaned.trim();
}

/**
 * Publish to WordPress
 */
async function publishToWordPress(siteConfig, title, content, scheduleDate) {
  const { siteUrl, username, applicationPassword } = siteConfig;
  
  // Create auth header
  const auth = Buffer.from(`${username}:${applicationPassword}`).toString('base64');
  
  // Prepare post data
  const postData = {
    title: title,
    content: content,
    status: scheduleDate ? 'future' : 'draft',
    date: scheduleDate || undefined
  };
  
  try {
    const response = await axios.post(
      `${siteUrl}/wp-json/wp/v2/posts`,
      postData,
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json'
        },
        timeout: 60000
      }
    );
    
    return {
      success: true,
      postId: response.data.id,
      link: response.data.link,
      status: response.data.status
    };
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    throw new Error(`WordPress publish failed: ${errorMsg}`);
  }
}

/**
 * Format date and time for WordPress
 */
function formatScheduleDate(dateStr, timeStr) {
  if (!dateStr) return null;
  
  // Parse date (supports various formats)
  let date;
  if (dateStr.includes('/')) {
    // DD/MM/YYYY or MM/DD/YYYY
    const parts = dateStr.split('/');
    if (parts[0].length === 4) {
      date = new Date(dateStr);
    } else if (parseInt(parts[0]) > 12) {
      // DD/MM/YYYY
      date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    } else {
      // MM/DD/YYYY
      date = new Date(`${parts[2]}-${parts[0]}-${parts[1]}`);
    }
  } else {
    date = new Date(dateStr);
  }
  
  // Add time if provided
  if (timeStr) {
    const timeParts = timeStr.split(':');
    date.setHours(parseInt(timeParts[0]) || 0);
    date.setMinutes(parseInt(timeParts[1]) || 0);
    date.setSeconds(0);
  }
  
  // Return ISO format for WordPress
  return date.toISOString();
}

/**
 * Delay helper
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Write output CSV with published links
 */
function writeOutputFile(results) {
  const outputPath = path.join(process.cwd(), CONFIG.OUTPUT_FILE);
  
  let csvContent = 'Title,WordPress Link,Status,Word Count,Published At\n';
  
  for (const result of results) {
    const row = [
      `"${result.title.replace(/"/g, '""')}"`,
      result.link || 'N/A',
      result.status,
      result.wordCount || 0,
      result.publishedAt || 'N/A'
    ].join(',');
    csvContent += row + '\n';
  }
  
  fs.writeFileSync(outputPath, csvContent);
  log(`Output saved to: ${outputPath}`, 'success');
}

/**
 * Get WordPress site configuration from database or environment
 */
async function getWordPressSiteConfig(siteId) {
  // Try to get from database first
  if (siteId && mongoose.connection.readyState === 1) {
    try {
      const WordPressSite = mongoose.model('WordPressSite');
      const site = await WordPressSite.findById(siteId);
      if (site) {
        return {
          siteUrl: site.siteUrl,
          username: site.username,
          applicationPassword: site.applicationPassword
        };
      }
    } catch (err) {
      log('Could not fetch site from database, using environment variables', 'warning');
    }
  }
  
  // Fallback to environment variables
  const siteUrl = process.env.WORDPRESS_SITE_URL;
  const username = process.env.WORDPRESS_USERNAME;
  const applicationPassword = process.env.WORDPRESS_APP_PASSWORD;
  
  if (!siteUrl || !username || !applicationPassword) {
    throw new Error('WordPress credentials not found. Set WORDPRESS_SITE_URL, WORDPRESS_USERNAME, and WORDPRESS_APP_PASSWORD in .env');
  }
  
  return { siteUrl, username, applicationPassword };
}

/**
 * Main execution function
 */
async function main() {
  console.log('\n' + '='.repeat(60));
  console.log('  BULK BLOG GENERATOR - Scalezix AI Platform');
  console.log('='.repeat(60) + '\n');
  
  // Get command line arguments
  const args = process.argv.slice(2);
  const inputFile = args[0] || 'blog_data.csv';
  const siteId = args[1] || null;
  
  log(`Input file: ${inputFile}`, 'info');
  log(`WordPress site ID: ${siteId || 'Using environment variables'}`, 'info');
  
  const results = [];
  
  try {
    // Read input file
    const rows = readInputFile(inputFile);
    log(`Found ${rows.length} blog posts to process`, 'success');
    
    // Get WordPress config
    let wpConfig;
    try {
      wpConfig = await getWordPressSiteConfig(siteId);
      log(`WordPress site: ${wpConfig.siteUrl}`, 'success');
    } catch (err) {
      log(`WordPress not configured: ${err.message}`, 'warning');
      log('Content will be generated but not published', 'warning');
      wpConfig = null;
    }
    
    // Process each row
    for (let i = 0; i < rows.length; i++) {
      const row = normalizeRow(rows[i]);
      const { title, date, time } = row;
      
      console.log('\n' + '-'.repeat(50));
      log(`Processing ${i + 1}/${rows.length}: "${title}"`, 'progress');
      
      try {
        // Build prompt
        const prompt = buildPrompt(row);
        
        // Generate content
        const rawContent = await generateContent(prompt);
        const content = cleanContent(rawContent);
        
        // Count words
        const wordCount = content.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(w => w.length > 0).length;
        
        // Publish to WordPress if configured
        let publishResult = { success: false, link: null, status: 'not_published' };
        
        if (wpConfig) {
          const scheduleDate = formatScheduleDate(date, time);
          log(`Scheduling for: ${scheduleDate || 'immediate'}`, 'info');
          
          publishResult = await publishToWordPress(wpConfig, title, content, scheduleDate);
          log(`✅ Published: ${publishResult.link}`, 'success');
        } else {
          // Save content to file instead
          const safeTitle = title.replace(/[^a-z0-9]/gi, '_').substring(0, 50);
          const outputPath = path.join(process.cwd(), 'generated_posts', `${safeTitle}.html`);
          
          // Create directory if needed
          if (!fs.existsSync(path.dirname(outputPath))) {
            fs.mkdirSync(path.dirname(outputPath), { recursive: true });
          }
          
          fs.writeFileSync(outputPath, content);
          log(`Content saved to: ${outputPath}`, 'success');
          publishResult.status = 'saved_locally';
        }
        
        results.push({
          title,
          link: publishResult.link,
          status: publishResult.status,
          wordCount,
          publishedAt: new Date().toISOString()
        });
        
      } catch (error) {
        log(`❌ Error processing "${title}": ${error.message}`, 'error');
        results.push({
          title,
          link: null,
          status: 'error',
          wordCount: 0,
          error: error.message
        });
      }
      
      // Delay between posts to avoid rate limits
      if (i < rows.length - 1) {
        log(`Waiting ${CONFIG.DELAY_BETWEEN_POSTS / 1000}s before next post...`, 'info');
        await delay(CONFIG.DELAY_BETWEEN_POSTS);
      }
    }
    
    // Write output file
    console.log('\n' + '='.repeat(50));
    writeOutputFile(results);
    
    // Summary
    const successful = results.filter(r => r.status !== 'error').length;
    const failed = results.filter(r => r.status === 'error').length;
    
    console.log('\n' + '='.repeat(60));
    log(`COMPLETED: ${successful} successful, ${failed} failed`, successful === rows.length ? 'success' : 'warning');
    console.log('='.repeat(60) + '\n');
    
  } catch (error) {
    log(`Fatal error: ${error.message}`, 'error');
    process.exit(1);
  }
}

// Run if called directly
main().catch(console.error);

export { generateContent, buildPrompt, cleanContent, publishToWordPress };
