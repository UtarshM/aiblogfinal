"""
SEO-Optimized Content Writer with Proper HTML Structure
Generates professional blog posts with H1, H2, H3, paragraphs, and high-quality images
Author: Scalezix Venture PVT LTD
Copyright: 2025 Scalezix Venture PVT LTD. All Rights Reserved.
"""

import requests
import json
import os
import sys
import re
from typing import Dict, List
from dotenv import load_dotenv

load_dotenv()

class SEOContentWriter:
    def __init__(self):
        self.google_api_key = os.getenv("GOOGLE_AI_KEY", "AIzaSyA7tovVOudFMqgchT6zFKyGn_2HW-GtzCM")
        self.pexels_api_key = os.getenv("PEXELS_API_KEY", "")
        
    def write_seo_content(self, topic: str, word_count: int, num_images: int,
                         tone: str, audience: str, include_stats: bool) -> Dict:
        """Generate SEO-optimized content with proper structure"""
        
        # Debug to stderr (not stdout)
        print(f"[SEO Writer] Generating SEO content for: {topic}", file=sys.stderr, flush=True)
        
        # Step 1: Generate structured content with headings
        content = self._generate_structured_content(topic, word_count, tone, audience, include_stats)
        
        # Step 2: Get high-quality images from Pexels
        images = self._get_pexels_images(topic, num_images)
        
        # Step 3: Insert images strategically after H2 sections
        content_with_images = self._insert_images_after_headings(content, images)
        
        # Step 4: Generate SEO metadata
        seo_metadata = self._generate_seo_metadata(topic, content)
        
        result = {
            "title": topic,
            "content": content_with_images,
            "images": images,
            "seo": seo_metadata
        }
        
        # Debug to stderr (not stdout)
        print(f"[SEO Writer] ✅ Generated {len(content)} chars, {len(images)} images", file=sys.stderr, flush=True)
        return result
    
    def _generate_structured_content(self, topic: str, word_count: int,
                                    tone: str, audience: str, include_stats: bool) -> str:
        """Generate content with proper H1, H2, H3 structure"""
        
        prompt = f"""Write a comprehensive, SEO-optimized blog post about: "{topic}"

TARGET: {word_count} words
TONE: {tone}
AUDIENCE: {audience}

CRITICAL STRUCTURE REQUIREMENTS:

1. START WITH H1 (Main Title):
# {topic}

2. INTRODUCTION (2-3 paragraphs):
- Hook the reader immediately
- Explain what they'll learn
- Why this matters

3. MAIN SECTIONS (5-7 sections with H2 headings):
Each section should have:
## Section Title (H2)
- 2-3 paragraphs of detailed content
- Real examples and practical tips
- Natural, conversational writing
{"- Include relevant statistics and data" if include_stats else ""}

Optional subsections with H3:
### Subsection Title (H3)
- Additional details
- Step-by-step instructions

4. CONCLUSION (2 paragraphs):
- Summarize key points
- Call to action or next steps

WRITING STYLE:
✅ Write naturally like a human expert
✅ Use short and long sentences (varied rhythm)
✅ Include specific examples and real scenarios
✅ Use conversational language (contractions, casual phrases)
✅ Add personal insights ("In my experience...", "I've found that...")
✅ Break up long paragraphs
✅ Use transition words naturally (but, so, plus, also)

❌ NO AI patterns: "delve into", "landscape", "robust", "leverage"
❌ NO formal transitions: "Furthermore", "Moreover", "However"
❌ NO rhetorical questions at end of paragraphs
❌ NO overly enthusiastic language

SEO OPTIMIZATION:
- Use the main keyword "{topic}" naturally 3-5 times
- Include related keywords in headings
- Write descriptive, keyword-rich headings
- Keep paragraphs 2-4 sentences
- Use bullet points where appropriate

Write the complete article now with proper markdown headings (# ## ###):"""

        try:
            # Try multiple Gemini models
            models = [
                "gemini-exp-1206",
                "gemini-2.0-flash-exp",
                "gemini-2.0-flash-thinking-exp",
                "gemini-2.0-flash",
            ]
            
            headers = {"Content-Type": "application/json"}
            data = {
                "contents": [{
                    "parts": [{"text": prompt}]
                }],
                "generationConfig": {
                    "temperature": 0.7,
                    "topK": 40,
                    "topP": 0.9,
                    "maxOutputTokens": 3000
                }
            }
            
            for model in models:
                try:
                    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={self.google_api_key}"
                    print(f"[SEO Writer] Trying model: {model}", file=sys.stderr, flush=True)
                    
                    response = requests.post(url, headers=headers, json=data, timeout=60)
                    
                    if response.status_code == 200:
                        result = response.json()
                        if "candidates" in result and len(result["candidates"]) > 0:
                            content = result["candidates"][0]["content"]["parts"][0]["text"]
                            print(f"[SEO Writer] ✅ Generated with {model}", file=sys.stderr, flush=True)
                            return self._clean_and_structure_content(content)
                except Exception as e:
                    print(f"[SEO Writer] Model {model} failed: {e}", file=sys.stderr, flush=True)
                    continue
            
            # Fallback
            print(f"[SEO Writer] All models failed, using fallback", file=sys.stderr, flush=True)
            return self._fallback_structured_content(topic, word_count)
            
        except Exception as e:
            print(f"[SEO Writer] Error: {e}", file=sys.stderr, flush=True)
            return self._fallback_structured_content(topic, word_count)
    
    def _clean_and_structure_content(self, content: str) -> str:
        """Clean and ensure proper structure"""
        
        # Remove any extra markdown formatting
        content = content.strip()
        
        # Ensure proper heading hierarchy
        lines = content.split('\n')
        cleaned_lines = []
        
        for line in lines:
            # Clean up headings
            if line.startswith('#'):
                # Remove extra spaces after #
                line = re.sub(r'^(#+)\s+', r'\1 ', line)
            cleaned_lines.append(line)
        
        content = '\n'.join(cleaned_lines)
        
        # Ensure paragraphs are separated by double newlines
        content = re.sub(r'\n{3,}', '\n\n', content)
        
        return content
    
    def _get_pexels_images(self, topic: str, num_images: int) -> List[Dict]:
        """Get high-quality images from Pexels API"""
        
        images = []
        
        if not self.pexels_api_key:
            print("[SEO Writer] No Pexels API key, using fallback images", file=sys.stderr, flush=True)
            return self._fallback_images(topic, num_images)
        
        try:
            # Search for relevant images
            headers = {"Authorization": self.pexels_api_key}
            url = f"https://api.pexels.com/v1/search?query={topic}&per_page={num_images}&orientation=landscape"
            
            response = requests.get(url, headers=headers, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                for photo in data.get("photos", [])[:num_images]:
                    images.append({
                        "url": photo["src"]["large"],
                        "alt": f"{topic} - {photo.get('alt', 'Image')}",
                        "photographer": photo.get("photographer", "Unknown")
                    })
                
                print(f"[SEO Writer] ✅ Got {len(images)} Pexels images", file=sys.stderr, flush=True)
                return images
            else:
                print(f"[SEO Writer] Pexels API error: {response.status_code}", file=sys.stderr, flush=True)
                return self._fallback_images(topic, num_images)
                
        except Exception as e:
            print(f"[SEO Writer] Pexels error: {e}", file=sys.stderr, flush=True)
            return self._fallback_images(topic, num_images)
    
    def _fallback_images(self, topic: str, num_images: int) -> List[Dict]:
        """Fallback to Unsplash or Picsum images"""
        images = []
        
        # Use Unsplash Source (no API key needed)
        keywords = topic.lower().replace(' ', ',')
        
        for i in range(num_images):
            images.append({
                "url": f"https://source.unsplash.com/800x600/?{keywords},{i}",
                "alt": f"{topic} - Image {i+1}",
                "photographer": "Unsplash"
            })
        
        return images
    
    def _insert_images_after_headings(self, content: str, images: List[Dict]) -> str:
        """Insert images strategically after H2 headings"""
        
        if not images:
            return content
        
        lines = content.split('\n')
        result = []
        image_index = 0
        
        for i, line in enumerate(lines):
            result.append(line)
            
            # Insert image after H2 headings (but not after H1)
            if line.startswith('## ') and image_index < len(images):
                # Add blank line, image, blank line
                result.append('')
                img = images[image_index]
                result.append(f"![{img['alt']}]({img['url']})")
                result.append('')
                image_index += 1
        
        # If we still have images left, add them at the end of sections
        while image_index < len(images):
            # Find a good spot (after a paragraph)
            for i in range(len(result) - 1, 0, -1):
                if result[i].strip() and not result[i].startswith('#') and not result[i].startswith('!['):
                    result.insert(i + 1, '')
                    img = images[image_index]
                    result.insert(i + 2, f"![{img['alt']}]({img['url']})")
                    result.insert(i + 3, '')
                    image_index += 1
                    break
            else:
                break
        
        return '\n'.join(result)
    
    def _generate_seo_metadata(self, topic: str, content: str) -> Dict:
        """Generate SEO metadata"""
        
        # Generate slug
        slug = topic.lower().replace(' ', '-').replace('/', '-')
        slug = re.sub(r'[^a-z0-9-]', '', slug)[:50]
        
        # Generate meta description (first 155 chars)
        plain_text = re.sub(r'#+ ', '', content)
        plain_text = re.sub(r'!\[([^\]]*)\]\(([^)]+)\)', '', plain_text)
        plain_text = plain_text.replace('\n', ' ').strip()
        
        meta_description = plain_text[:155]
        if len(plain_text) > 155:
            meta_description += '...'
        
        # Extract keywords
        keywords = topic.lower().split()[:5]
        
        return {
            "slug": slug,
            "metaDescription": meta_description,
            "keywords": ', '.join(keywords),
            "focusKeyword": topic
        }
    
    def _fallback_structured_content(self, topic: str, word_count: int) -> str:
        """Fallback content with proper structure"""
        
        return f"""# {topic}

## Introduction

{topic} is an important topic that deserves attention. In this comprehensive guide, we'll explore the key aspects and provide practical insights.

## Understanding {topic}

Let's start by understanding what {topic} really means and why it matters in today's context.

## Key Benefits

There are several important benefits to consider when it comes to {topic}.

## Best Practices

Here are some proven strategies and best practices for {topic}.

## Common Challenges

Like anything worthwhile, {topic} comes with its own set of challenges. Let's address them.

## Practical Tips

Here are actionable tips you can implement right away.

## Conclusion

{topic} is a valuable area to focus on. By following these guidelines, you'll be well-equipped to succeed."""


def main():
    """Main entry point"""
    try:
        # Read config from stdin
        config_json = sys.stdin.read()
        config = json.loads(config_json)
        
        writer = SEOContentWriter()
        result = writer.write_seo_content(
            topic=config.get('topic', 'Content Topic'),
            word_count=config.get('wordCount', 1000),
            num_images=config.get('numImages', 4),
            tone=config.get('tone', 'professional'),
            audience=config.get('targetAudience', 'general'),
            include_stats=config.get('includeStats', False)
        )
        
        # Output ONLY JSON result (no debug messages)
        print(json.dumps(result))
        sys.stdout.flush()
        
    except Exception as e:
        # Output error as JSON
        error_result = {
            "error": str(e),
            "title": "Error",
            "content": f"Error generating content: {str(e)}",
            "images": []
        }
        print(json.dumps(error_result))
        sys.stdout.flush()
        sys.exit(1)


if __name__ == "__main__":
    main()
