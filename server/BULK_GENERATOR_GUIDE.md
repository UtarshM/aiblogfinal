# Bulk Blog Generator Guide

## Overview

The Bulk Blog Generator is a Node.js automation script that:
1. Reads blog data from CSV/Excel files
2. Generates 5,000+ word human-like content using Gemini 1.5 Flash
3. Publishes to WordPress with scheduling support
4. Outputs a tracking CSV with all published links

---

## Quick Start

### 1. Prepare Your CSV File

Create a file called `blog_data.csv` with these columns:

| Column | Description | Example |
|--------|-------------|---------|
| Title | Blog post title | "Best Coffee Machines 2024" |
| H Tags (Actual Headings) | Headings separated by `\|` | "Why Coffee Matters\|Best Machines\|Buying Guide" |
| Keywords | SEO keywords (comma-separated) | "coffee machine, espresso, best 2024" |
| Reference | Source URLs for accuracy | "https://example.com/guide" |
| EEAT | Expertise/Authority statement | "Written by certified barista" |
| Date | Publish date | "2025-01-15" or "15/01/2025" |
| Time | Publish time | "09:00" |

### 2. Configure WordPress (Optional)

Add to your `.env` file:

```env
WORDPRESS_SITE_URL=https://yourblog.com
WORDPRESS_USERNAME=your_username
WORDPRESS_APP_PASSWORD=xxxx xxxx xxxx xxxx
```

To get an Application Password:
1. Go to WordPress Admin → Users → Profile
2. Scroll to "Application Passwords"
3. Enter a name and click "Add New"
4. Copy the generated password (spaces are OK)

### 3. Run the Generator

```bash
cd /var/www/scalezix-backend/server

# Using npm script
npm run bulk-generate

# Or directly with custom file
node bulkBlogGenerator.js my_blogs.csv

# With WordPress site ID from database
node bulkBlogGenerator.js blog_data.csv 507f1f77bcf86cd799439011
```

---

## CSV Template

A template file is included: `blog_data_template.csv`

```csv
Title,H Tags (Actual Headings),Keywords,Reference,EEAT,Date,Time
Best Coffee Machines 2024,"Why Coffee Matters|Budget Options|Premium Picks|Parting Thought","coffee machine, espresso maker",https://example.com,"Certified barista",2025-01-15,09:00
```

### H Tags Format

Separate headings with `|` (pipe character):

```
Why Your Morning Coffee Matters|Budget-Friendly Options|Premium Picks|Maintenance Tips|Parting Thought
```

These become H2 headings in the generated content.

---

## Output

### Console Output

```
============================================================
  BULK BLOG GENERATOR - Scalezix AI Platform
============================================================

[2025-01-15T10:00:00.000Z] Reading input file: blog_data.csv
[2025-01-15T10:00:00.100Z] Found 5 blog posts to process
[2025-01-15T10:00:00.200Z] WordPress site: https://yourblog.com

--------------------------------------------------
[2025-01-15T10:00:01.000Z] Processing 1/5: "Best Coffee Machines 2024"
[2025-01-15T10:00:05.000Z] Calling Gemini 1.5 Flash API...
[2025-01-15T10:00:45.000Z] Generated 5,234 words
[2025-01-15T10:00:46.000Z] Scheduling for: 2025-01-15T09:00:00.000Z
[2025-01-15T10:00:48.000Z] ✅ Published: https://yourblog.com/best-coffee-machines-2024/
```

### Output File: `published_links.csv`

```csv
Title,WordPress Link,Status,Word Count,Published At
"Best Coffee Machines 2024",https://yourblog.com/best-coffee-machines-2024/,future,5234,2025-01-15T10:00:48.000Z
"How to Start a Blog",https://yourblog.com/how-to-start-a-blog/,future,5102,2025-01-15T10:01:30.000Z
```

---

## Content Generation Prompt

The script uses a specialized prompt designed for:

### Human-Like Writing
- Sentence length variation (burstiness)
- Personal voice ("I", "You")
- Contractions (don't, it's, we've)
- Casual sentence starters (But, And, So, Now)

### Banned AI Words
The prompt explicitly bans these AI giveaway words:
- delve → "look into"
- realm → "area"
- landscape → "world"
- robust → "strong"
- leverage → "use"
- comprehensive → "full"
- game-changer → "big deal"

### Structure
- Table of Contents with anchor links
- 800-1000 words per H2 section
- "Parting Thought" instead of "In Conclusion"
- Total: 5,000+ words

---

## Environment Variables

Required in `.env`:

```env
# AI (Required)
GOOGLE_AI_KEY=your-gemini-api-key

# WordPress (Optional - for auto-publishing)
WORDPRESS_SITE_URL=https://yourblog.com
WORDPRESS_USERNAME=admin
WORDPRESS_APP_PASSWORD=xxxx xxxx xxxx xxxx
```

---

## Troubleshooting

### "GOOGLE_AI_KEY not found"
Add your Gemini API key to `.env`:
```env
GOOGLE_AI_KEY=AIza...
```

### "WordPress publish failed"
1. Check your Application Password is correct
2. Ensure REST API is enabled on your WordPress site
3. Verify the site URL includes `https://`

### Rate Limit Errors
The script automatically:
- Waits 5 seconds between posts
- Retries failed API calls up to 3 times

### Content Not 5000 Words
Gemini may occasionally generate shorter content. The prompt requests 5000 words but actual output varies. For guaranteed length, you may need to regenerate.

---

## Advanced Usage

### Using with Database WordPress Sites

If you have WordPress sites saved in your database (from the web UI), you can use their ID:

```bash
node bulkBlogGenerator.js blog_data.csv 507f1f77bcf86cd799439011
```

### Custom Delay Between Posts

Edit `CONFIG.DELAY_BETWEEN_POSTS` in `bulkBlogGenerator.js`:

```javascript
const CONFIG = {
  DELAY_BETWEEN_POSTS: 10000, // 10 seconds
  // ...
};
```

### Without WordPress (Local Save)

If WordPress is not configured, content is saved to `generated_posts/` folder as HTML files.

---

## Integration with Web UI

The bulk generator can also be triggered from the web UI:
1. Go to Content Creation page
2. Click "Bulk Import"
3. Upload your Excel/CSV file
4. Select WordPress site
5. Click "Start Processing"

This uses the same generation logic but with progress tracking in the browser.

---

## Support

**Developed by:** Scalezix Venture PVT LTD  
**Platform:** https://aiblog.scalezix.com

---

*© 2025 Scalezix Venture PVT LTD. All Rights Reserved.*
