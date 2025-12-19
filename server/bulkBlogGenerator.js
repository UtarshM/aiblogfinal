/**
 * Bulk Blog Generator - SaaS Backend Service
 * 
 * Processes Excel/CSV files uploaded by clients through the web UI.
 * Uses client's WordPress sites stored in database.
 * Generates 10,000+ word human-like content using Gemini 1.5 Flash.
 * 
 * @author Scalezix Venture PVT LTD
 * @copyright 2025 Scalezix Venture PVT LTD. All Rights Reserved.
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';
import { WordPressSite, BulkImportJob } from './wordpressModels.js';

// Configuration
const CONFIG = {
  DELAY_BETWEEN_POSTS: 5000, // 5 seconds between API calls
  MAX_RETRIES: 3,
  WORD_TARGET: 10000, // 10,000 words minimum
  WORDS_PER_SECTION: 1200 // 1200 words per H2 section
};

/**
 * THE ULTIMATE HUMAN CONTENT PROMPT
 * Designed to generate 10,000+ words that pass AI detection
 */
function buildHumanPrompt(row) {
  const { title, hTags, keywords, reference, eeat } = row;
  
  // Parse H-tags (separated by | or newlines)
  const headings = hTags ? hTags.split(/[|\n]/).map(h => h.trim()).filter(h => h) : [];
  const headingsList = headings.map((h, i) => `${i + 1}. ${h}`).join('\n');
  
  return `You are a professional human ghostwriter with 20 years of experience. Write an extremely detailed, 10,000-word blog post about "${title}".

═══════════════════════════════════════════════════════════════
STRUCTURE & HEADINGS (USE EXACTLY THESE IN ORDER)
═══════════════════════════════════════════════════════════════

${headingsList || 'Create 8-10 detailed section headings appropriate for this topic.'}

Format each main heading as: <h2 id="section1">Heading Text</h2>
Format sub-headings as: <h3>Sub-heading Text</h3>

After the opening paragraph, add a Table of Contents:
<div class="toc">
<h3>What You'll Learn</h3>
<ul>
<li><a href="#section1">First Heading</a></li>
<li><a href="#section2">Second Heading</a></li>
...
</ul>
</div>

═══════════════════════════════════════════════════════════════
KEYWORDS (MUST INCLUDE ALL NATURALLY)
═══════════════════════════════════════════════════════════════

${keywords || title}

Weave every keyword into the content naturally. Don't force them. Use variations and related terms.

═══════════════════════════════════════════════════════════════
E-E-A-T AUTHORITY
═══════════════════════════════════════════════════════════════

${eeat || 'Write as an industry expert with years of hands-on experience.'}

Show expertise through:
- Personal stories and experiences
- Specific examples with real details
- Industry insider knowledge
- Practical tips only an expert would know

═══════════════════════════════════════════════════════════════
REFERENCE MATERIAL
═══════════════════════════════════════════════════════════════

${reference || 'Use your knowledge to provide accurate, well-researched information.'}

═══════════════════════════════════════════════════════════════
HUMAN-WRITING ENGINE (THIS IS CRITICAL)
═══════════════════════════════════════════════════════════════

1. BURSTINESS - Vary sentence length dramatically:
   - Write a long sentence with 25-35 words that flows naturally and covers multiple points.
   - Then short. Like this.
   - Then medium length, maybe 15 words or so.
   - Mix it up constantly. Never let two sentences be the same length.

2. PERSONAL VOICE:
   - Use "I" constantly: "I've seen this happen...", "In my experience...", "What I tell people is..."
   - Use "You" to connect: "You've probably noticed...", "Here's what you need to know..."
   - Share opinions: "Honestly, I think...", "My take on this is..."
   - Add personality: "Look, here's the deal...", "Can I be real with you?"

3. CONTRACTIONS (Always use these):
   - don't, won't, can't, isn't, aren't, wasn't, weren't
   - it's, that's, there's, here's, what's
   - you're, they're, we're, I'm, I've, I'd
   - couldn't, wouldn't, shouldn't, haven't, hasn't

4. SENTENCE STARTERS (Use these often):
   - "But here's the thing..."
   - "And that's exactly why..."
   - "So what does this mean?"
   - "Now, I know what you're thinking..."
   - "Look, I get it."
   - "Here's what most people miss..."
   - "The truth is..."
   - "Honestly?"

5. CASUAL PHRASES (Sprinkle throughout):
   - "you know what I mean?"
   - "here's the deal"
   - "let me tell you"
   - "trust me on this"
   - "I've been there"
   - "real talk"
   - "no joke"
   - "seriously though"

═══════════════════════════════════════════════════════════════
BANNED WORDS - NEVER USE THESE (AI GIVEAWAYS)
═══════════════════════════════════════════════════════════════

❌ NEVER USE          → ✅ USE INSTEAD
─────────────────────────────────────────
delve                → look into, dig into, explore
realm                → area, world, space, field
landscape            → world, scene, space
robust               → strong, solid, reliable
leverage             → use, take advantage of
comprehensive        → full, complete, thorough
game-changer         → big deal, huge, changes everything
cutting-edge         → new, latest, modern
seamless             → smooth, easy, simple
utilize              → use
implement            → set up, start, put in place
facilitate           → help, make easier
optimal              → best, ideal
subsequently         → then, after that, later
furthermore          → also, plus, and
moreover             → also, and, plus
therefore            → so, that's why
nevertheless         → but, still, even so
consequently         → so, as a result
paramount            → important, key, crucial
plethora             → many, lots of, tons of
myriad               → many, countless
embark               → start, begin
foster               → build, grow, develop
endeavor             → try, attempt, effort
ascertain            → find out, figure out
commence             → start, begin
terminate            → end, stop
prior to             → before
in order to          → to
at this point in time → now
in the event that    → if
due to the fact that → because

═══════════════════════════════════════════════════════════════
LENGTH REQUIREMENTS (NON-NEGOTIABLE)
═══════════════════════════════════════════════════════════════

TOTAL: At least 10,000 words (this is a DEEP DIVE article)

Each H2 section: 1,000-1,500 words minimum

Include in each section:
- A personal story or example (150-200 words)
- Detailed explanation with specifics (400-500 words)
- Practical tips or steps (200-300 words)
- Common mistakes to avoid (150-200 words)
- Real-world application (150-200 words)

DO NOT SUMMARIZE. Go deep. Explain everything thoroughly.
Pretend you're writing a mini-book chapter for each section.

═══════════════════════════════════════════════════════════════
ENDING (NO "IN CONCLUSION")
═══════════════════════════════════════════════════════════════

End with a section called "Parting Thoughts" or "Final Words"
- Make it personal and memorable
- Share one last piece of advice
- End with an encouraging statement
- NO bullet point summaries
- NO "In conclusion" or "To summarize"

═══════════════════════════════════════════════════════════════
HTML FORMAT
═══════════════════════════════════════════════════════════════

<h2 id="section1">Heading</h2>
<h3>Sub-heading</h3>
<p>Paragraph text</p>
<ul><li>List item</li></ul>
<strong>Bold text</strong>
<em>Italic text</em>
<blockquote>Important quote or callout</blockquote>

═══════════════════════════════════════════════════════════════
START WRITING NOW
═══════════════════════════════════════════════════════════════

Begin directly with an engaging opening paragraph. No "Here is..." or any meta-commentary.
Just start the article as if you're a human expert sharing your knowledge.`;
}

/**
 * Generate content using Gemini 1.5 Flash
 */
async function generateContent(prompt, retries = 0) {
  const GOOGLE_AI_KEY = process.env.GOOGLE_AI_KEY;
  
  if (!GOOGLE_AI_KEY) {
    throw new Error('GOOGLE_AI_KEY not configured');
  }
  
  try {
    const genAI = new GoogleGenerativeAI(GOOGLE_AI_KEY);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.85, // Higher for more human-like variation
        maxOutputTokens: 65536, // Maximum tokens for long content
        topP: 0.95,
        topK: 40
      }
    });
    
    console.log('[BulkGen] Calling Gemini 1.5 Flash...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let content = response.text();
    
    // Clean the content
    content = cleanContent(content);
    
    // Count words
    const wordCount = countWords(content);
    console.log(`[BulkGen] Generated ${wordCount} words`);
    
    return { content, wordCount };
  } catch (error) {
    console.error('[BulkGen] Gemini error:', error.message);
    
    if (retries < CONFIG.MAX_RETRIES) {
      console.log(`[BulkGen] Retrying (${retries + 1}/${CONFIG.MAX_RETRIES})...`);
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
  
  // Remove markdown code blocks
  cleaned = cleaned.replace(/```html\n?/gi, '');
  cleaned = cleaned.replace(/```\n?/gi, '');
  
  // Remove "Here is..." intro lines
  cleaned = cleaned.replace(/^<p>Here is[\s\S]*?<\/p>\n*/i, '');
  cleaned = cleaned.replace(/^Here is[\s\S]*?\n\n/i, '');
  cleaned = cleaned.replace(/^<p>I've written[\s\S]*?<\/p>\n*/i, '');
  
  // Remove metadata blocks
  cleaned = cleaned.replace(/---[\s\S]*?---\n*/gi, '');
  
  // Remove JSON-LD schema
  cleaned = cleaned.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');
  
  // Remove word count mentions
  cleaned = cleaned.replace(/\(?\d+,?\d*\s*words?\)?/gi, '');
  
  return cleaned.trim();
}

/**
 * Count words in content
 */
function countWords(content) {
  const textOnly = content.replace(/<[^>]*>/g, ' ');
  return textOnly.split(/\s+/).filter(w => w.length > 0).length;
}

/**
 * Publish to WordPress using client's stored credentials
 */
async function publishToWordPress(siteId, title, content, scheduleDate) {
  // Get WordPress site from database
  const site = await WordPressSite.findById(siteId);
  
  if (!site) {
    throw new Error('WordPress site not found');
  }
  
  const { siteUrl, username, applicationPassword } = site;
  
  // Create auth header
  const auth = Buffer.from(`${username}:${applicationPassword}`).toString('base64');
  
  // Prepare post data
  const postData = {
    title: title,
    content: content,
    status: scheduleDate ? 'future' : 'draft'
  };
  
  if (scheduleDate) {
    postData.date = scheduleDate;
  }
  
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
    throw new Error(`WordPress error: ${errorMsg}`);
  }
}

/**
 * Format schedule date for WordPress
 */
function formatScheduleDate(dateStr, timeStr) {
  if (!dateStr) return null;
  
  let date;
  
  // Handle various date formats
  if (dateStr.includes('/')) {
    const parts = dateStr.split('/');
    if (parts[0].length === 4) {
      date = new Date(dateStr);
    } else if (parseInt(parts[0]) > 12) {
      // DD/MM/YYYY
      date = new Date(`${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`);
    } else {
      // MM/DD/YYYY
      date = new Date(`${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`);
    }
  } else if (dateStr.includes('-')) {
    date = new Date(dateStr);
  } else {
    date = new Date(dateStr);
  }
  
  // Add time
  if (timeStr) {
    const [hours, minutes] = timeStr.split(':');
    date.setHours(parseInt(hours) || 0);
    date.setMinutes(parseInt(minutes) || 0);
    date.setSeconds(0);
  }
  
  return date.toISOString();
}

/**
 * Delay helper
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Process a single post in a bulk import job
 */
async function processPost(post, wordpressSiteId, jobId) {
  const row = {
    title: post.title,
    hTags: post.hTags,
    keywords: post.keywords,
    reference: post.references,
    eeat: post.eeat
  };
  
  try {
    // Update status to generating
    await BulkImportJob.updateOne(
      { _id: jobId, 'posts.title': post.title },
      { 
        $set: { 
          'posts.$.status': 'generating',
          currentStep: `Generating content for: ${post.title}`
        }
      }
    );
    
    // Build prompt and generate content
    const prompt = buildHumanPrompt(row);
    const { content, wordCount } = await generateContent(prompt);
    
    // Update status to publishing
    await BulkImportJob.updateOne(
      { _id: jobId, 'posts.title': post.title },
      { 
        $set: { 
          'posts.$.status': 'publishing',
          'posts.$.contentLength': wordCount,
          currentStep: `Publishing to WordPress: ${post.title}`
        }
      }
    );
    
    // Format schedule date
    const scheduleDate = formatScheduleDate(post.scheduleDate, post.scheduleTime);
    
    // Publish to WordPress
    const result = await publishToWordPress(wordpressSiteId, post.title, content, scheduleDate);
    
    // Update success
    await BulkImportJob.updateOne(
      { _id: jobId, 'posts.title': post.title },
      { 
        $set: { 
          'posts.$.status': 'published',
          'posts.$.wordpressPostId': result.postId,
          'posts.$.wordpressPostUrl': result.link,
          'posts.$.publishedAt': new Date()
        },
        $inc: { processedPosts: 1, successfulPosts: 1 }
      }
    );
    
    console.log(`[BulkGen] ✅ Published: ${post.title} → ${result.link}`);
    
    return { success: true, link: result.link, wordCount };
    
  } catch (error) {
    console.error(`[BulkGen] ❌ Failed: ${post.title} - ${error.message}`);
    
    // Update failure
    await BulkImportJob.updateOne(
      { _id: jobId, 'posts.title': post.title },
      { 
        $set: { 
          'posts.$.status': 'failed',
          'posts.$.error': error.message
        },
        $inc: { processedPosts: 1, failedPosts: 1 }
      }
    );
    
    return { success: false, error: error.message };
  }
}

/**
 * Process entire bulk import job
 * Called from the web UI bulk import endpoint
 */
async function processBulkImportJob(jobId) {
  console.log(`[BulkGen] Starting job: ${jobId}`);
  
  try {
    // Get job from database
    const job = await BulkImportJob.findById(jobId);
    
    if (!job) {
      throw new Error('Job not found');
    }
    
    // Update job status
    await BulkImportJob.updateOne(
      { _id: jobId },
      { 
        $set: { 
          status: 'processing',
          startedAt: new Date()
        }
      }
    );
    
    // Process each post
    for (let i = 0; i < job.posts.length; i++) {
      const post = job.posts[i];
      
      if (post.status === 'published') {
        console.log(`[BulkGen] Skipping already published: ${post.title}`);
        continue;
      }
      
      console.log(`[BulkGen] Processing ${i + 1}/${job.posts.length}: ${post.title}`);
      
      await processPost(post, job.wordpressSiteId, jobId);
      
      // Delay between posts
      if (i < job.posts.length - 1) {
        await delay(CONFIG.DELAY_BETWEEN_POSTS);
      }
    }
    
    // Mark job as completed
    await BulkImportJob.updateOne(
      { _id: jobId },
      { 
        $set: { 
          status: 'completed',
          completedAt: new Date(),
          currentStep: 'All posts processed'
        }
      }
    );
    
    console.log(`[BulkGen] ✅ Job completed: ${jobId}`);
    
  } catch (error) {
    console.error(`[BulkGen] Job failed: ${error.message}`);
    
    await BulkImportJob.updateOne(
      { _id: jobId },
      { 
        $set: { 
          status: 'failed',
          currentStep: `Error: ${error.message}`
        }
      }
    );
  }
}

/**
 * Generate single post content (for API endpoint)
 */
async function generateSinglePost(config) {
  const row = {
    title: config.topic || config.title,
    hTags: config.headings || config.hTags || '',
    keywords: config.keywords || config.topic || config.title,
    reference: config.references || config.reference || '',
    eeat: config.eeat || ''
  };
  
  const prompt = buildHumanPrompt(row);
  const { content, wordCount } = await generateContent(prompt);
  
  return {
    content,
    wordCount,
    title: row.title
  };
}

export { 
  processBulkImportJob, 
  generateSinglePost, 
  buildHumanPrompt, 
  generateContent,
  publishToWordPress,
  CONFIG
};
