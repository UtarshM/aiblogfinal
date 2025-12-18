# Content Generation Flow - Scalezix AI Blog Platform

## Overview

This document explains how content and images are generated in the Scalezix AI Blog Automation platform.

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND (Vercel)                               │
│                         https://aiblog.scalezix.com                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ContentCreation.jsx                                                        │
│   ┌─────────────────┐                                                        │
│   │ User Input:     │                                                        │
│   │ - Topic         │                                                        │
│   │ - Tone          │                                                        │
│   │ - Word Count    │                                                        │
│   │ - Num Images    │                                                        │
│   └────────┬────────┘                                                        │
│            │                                                                 │
│            ▼                                                                 │
│   ┌─────────────────┐                                                        │
│   │ api.generateHumanContent(config)                                         │
│   │ POST /api/content/generate-human                                         │
│   └────────┬────────┘                                                        │
│            │                                                                 │
└────────────┼─────────────────────────────────────────────────────────────────┘
             │
             │ HTTPS Request
             ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              BACKEND (AWS EC2)                               │
│                         https://blogapi.scalezix.com                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   server.js - /api/content/generate-human                                    │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                      │   │
│   │  1. VALIDATE INPUT                                                   │   │
│   │     - Check topic exists                                             │   │
│   │     - Set defaults (tone, minWords, numImages)                       │   │
│   │                                                                      │   │
│   │  2. BUILD AI PROMPT                                                  │   │
│   │     - Topic-specific headings                                        │   │
│   │     - Word count requirements                                        │   │
│   │     - HTML formatting instructions                                   │   │
│   │                                                                      │   │
│   │  3. CALL AI SERVICE (Priority Order)                                 │   │
│   │     ┌──────────────────────────────────────────────────────────┐    │   │
│   │     │  TRY 1: OpenRouter API (Claude 3 Haiku)                  │    │   │
│   │     │  - Model: anthropic/claude-3-haiku                       │    │   │
│   │     │  - Max Tokens: 16,000                                    │    │   │
│   │     │  - Requires: OPENROUTER_API_KEY                          │    │   │
│   │     └──────────────────────────────────────────────────────────┘    │   │
│   │                          │                                           │   │
│   │                          ▼ (if fails)                                │   │
│   │     ┌──────────────────────────────────────────────────────────┐    │   │
│   │     │  TRY 2: Google AI (Gemini 1.5 Flash)                     │    │   │
│   │     │  - Model: gemini-1.5-flash-latest                        │    │   │
│   │     │  - Max Tokens: 16,000                                    │    │   │
│   │     │  - Requires: GOOGLE_AI_KEY                               │    │   │
│   │     └──────────────────────────────────────────────────────────┘    │   │
│   │                          │                                           │   │
│   │                          ▼ (if both fail)                            │   │
│   │     ┌──────────────────────────────────────────────────────────┐    │   │
│   │     │  ERROR: "AI services unavailable"                        │    │   │
│   │     │  - Returns 500 error                                     │    │   │
│   │     └──────────────────────────────────────────────────────────┘    │   │
│   │                                                                      │   │
│   │  4. FETCH IMAGES (fetchTopicImages function)                         │   │
│   │     ┌──────────────────────────────────────────────────────────┐    │   │
│   │     │  TRY 1: SerpAPI (Google Images)                          │    │   │
│   │     │  - Searches Google Images for topic                      │    │   │
│   │     │  - Returns real, relevant images                         │    │   │
│   │     │  - Requires: SERPAPI_KEY                                 │    │   │
│   │     └──────────────────────────────────────────────────────────┘    │   │
│   │                          │                                           │   │
│   │                          ▼ (if fails)                                │   │
│   │     ┌──────────────────────────────────────────────────────────┐    │   │
│   │     │  TRY 2: Google Custom Search API                         │    │   │
│   │     │  - Requires: GOOGLE_SEARCH_API_KEY + GOOGLE_SEARCH_CX    │    │   │
│   │     └──────────────────────────────────────────────────────────┘    │   │
│   │                          │                                           │   │
│   │                          ▼ (if fails)                                │   │
│   │     ┌──────────────────────────────────────────────────────────┐    │   │
│   │     │  FALLBACK: Picsum Placeholder Images                     │    │   │
│   │     │  - Uses https://picsum.photos/seed/{topic}/800/500       │    │   │
│   │     │  - No API key required                                   │    │   │
│   │     └──────────────────────────────────────────────────────────┘    │   │
│   │                                                                      │   │
│   │  5. INSERT IMAGES INTO CONTENT                                       │   │
│   │     - Splits content by <h2> sections                                │   │
│   │     - Inserts images evenly throughout                               │   │
│   │     - Adds <figure> with <img> and <figcaption>                      │   │
│   │                                                                      │   │
│   │  6. RETURN RESPONSE                                                  │   │
│   │     {                                                                │   │
│   │       content: "HTML with images",                                   │   │
│   │       title: "Topic Title",                                          │   │
│   │       wordCount: 3500,                                               │   │
│   │       topic: "original topic",                                       │   │
│   │       images: [array of image objects]                               │   │
│   │     }                                                                │   │
│   │                                                                      │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Required Environment Variables (.env)

### For Content Generation (REQUIRED - at least one)

```env
# Option 1: OpenRouter (Recommended - supports multiple AI models)
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxx

# Option 2: Google AI (Gemini)
GOOGLE_AI_KEY=AIzaxxxxxxxxxxxxxxxx
```

### For Image Search (OPTIONAL but recommended)

```env
# Option 1: SerpAPI (Best - real Google Images)
SERPAPI_KEY=xxxxxxxxxxxxxxxxxxxxxxxx

# Option 2: Google Custom Search
GOOGLE_SEARCH_API_KEY=AIzaxxxxxxxxxxxxxxxx
GOOGLE_SEARCH_CX=xxxxxxxxxxxxxxxxx
```

---

## AI Services Used

### 1. OpenRouter API
- **URL**: `https://openrouter.ai/api/v1/chat/completions`
- **Model**: `anthropic/claude-3-haiku`
- **Purpose**: Primary content generation
- **Get API Key**: https://openrouter.ai/keys

### 2. Google AI (Gemini)
- **URL**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent`
- **Model**: `gemini-1.5-flash-latest`
- **Purpose**: Fallback content generation
- **Get API Key**: https://makersuite.google.com/app/apikey

### 3. SerpAPI (for Images)
- **URL**: `https://serpapi.com/search.json?engine=google_images`
- **Purpose**: Fetch real, topic-relevant images from Google
- **Get API Key**: https://serpapi.com/manage-api-key

---

## Content Generation Process

### Step 1: User Input (Frontend)
```javascript
// ContentCreation.jsx
const config = {
  topic: "My Hero Academia",
  tone: "professional",
  minWords: 3000,
  numImages: 4
};
api.generateHumanContent(config);
```

### Step 2: API Request (Frontend → Backend)
```
POST https://blogapi.scalezix.com/api/content/generate-human
Content-Type: application/json
Authorization: Bearer {token}

{
  "topic": "My Hero Academia",
  "tone": "professional",
  "minWords": 3000,
  "numImages": 4
}
```

### Step 3: AI Prompt Construction (Backend)
The backend builds a detailed prompt that:
- Requests topic-specific headings (not generic ones)
- Specifies minimum word count
- Defines HTML formatting requirements
- Sets the tone (professional, casual, etc.)

### Step 4: AI Content Generation (Backend)
```
OpenRouter API → Claude 3 Haiku → HTML Content
       OR
Google AI API → Gemini 1.5 Flash → HTML Content
```

### Step 5: Image Fetching (Backend)
```
SerpAPI → Google Images → Real topic images
       OR
Google Custom Search → Topic images
       OR
Picsum → Placeholder images
```

### Step 6: Image Insertion (Backend)
Images are inserted after `<h2>` sections evenly throughout the content.

### Step 7: Response (Backend → Frontend)
```json
{
  "content": "<h2>The World of Quirks...</h2><p>...</p><figure><img src='...'/>...</figure>...",
  "title": "My Hero Academia",
  "wordCount": 3542,
  "topic": "My Hero Academia",
  "images": [
    { "url": "https://...", "alt": "My Hero Academia - Image 1" },
    { "url": "https://...", "alt": "My Hero Academia - Image 2" }
  ]
}
```

---

## File Structure

```
server/
├── server.js              # Main API endpoints including /api/content/generate-human
├── aiServices.js          # AI helper functions (OpenRouter calls)
├── database.js            # MongoDB connection and schemas
├── emailService.js        # Brevo email for OTP
└── .env                   # Environment variables (API keys)

src/
├── api/
│   └── client.js          # API client with all endpoint functions
├── pages/
│   └── ContentCreation.jsx # Content generation UI
└── components/
    └── Layout.jsx         # Main layout component
```

---

## Troubleshooting

### Error: "AI services unavailable"
**Cause**: No AI API keys configured
**Fix**: Add `OPENROUTER_API_KEY` or `GOOGLE_AI_KEY` to your `.env` file

### Error: "Image search requires SERPAPI_KEY"
**Cause**: No image API configured
**Fix**: Add `SERPAPI_KEY` to your `.env` file (or images will use placeholders)

### Content generates but no real images
**Cause**: SerpAPI key missing
**Fix**: Get key from https://serpapi.com and add to `.env`

---

## Getting API Keys

| Service | URL | Free Tier |
|---------|-----|-----------|
| OpenRouter | https://openrouter.ai/keys | $5 free credits |
| Google AI | https://makersuite.google.com/app/apikey | Free |
| SerpAPI | https://serpapi.com/manage-api-key | 100 searches/month |

---

## Summary

1. **Frontend** sends topic + config to backend
2. **Backend** builds AI prompt with topic-specific requirements
3. **OpenRouter/Google AI** generates HTML content
4. **SerpAPI/Google Search** fetches relevant images
5. **Backend** inserts images into content
6. **Frontend** displays the final article with images

**Minimum Required**: One AI key (OpenRouter OR Google AI)
**Recommended**: AI key + SerpAPI key for real images
