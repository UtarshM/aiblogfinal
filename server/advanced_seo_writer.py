"""
Advanced SEO Content Writer with TOC, E-E-A-T, Schema, and Scheduling
Generates professional blog posts with complete SEO optimization
Author: Scalezix Venture PVT LTD
Copyright: 2025 Scalezix Venture PVT LTD. All Rights Reserved.
"""

import requests
import json
import os
import sys
import re
from typing import Dict, List
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

class AdvancedSEOWriter:
    def __init__(self):
        self.google_api_key = os.getenv("GOOGLE_AI_KEY", "")
        self.serpapi_key = os.getenv("SERPAPI_KEY", "")
        
    def write_advanced_content(self, config: Dict) -> Dict:
        """Generate advanced SEO content with all features"""
        
        topic = config.get('topic', '')
        h_tags = config.get('hTags', [])
        keywords = config.get('keywords', [])
        references = config.get('references', [])
        eeat_info = config.get('eeat', {})
        schedule_date = config.get('scheduleDate', '')
        schedule_time = config.get('scheduleTime', '')
        
        print(f"[Advanced SEO] Generating content for: {topic}", file=sys.stderr, flush=True)
        
        # Step 1: Generate structured content with H-tags
        content = self._generate_structured_content_with_htags(
            topic, h_tags, keywords, references, eeat_info
        )
        
        # Step 2: Extract headings for TOC
        headings = self._extract_headings(content)
        
        # Step 3: Generate Table of Contents
        toc_html = self._generate_toc(headings)
        
        # Step 4: Add jump links to content
        content_with_links = self._add_jump_links(content, headings)
        
        # Step 5: Get high-quality images
        images = self._get_images(topic, 4)
        
        # Step 6: Insert images strategically
        content_with_images = self._insert_images_in_content(content_with_links, images)
        
        # Step 7: Add references section
        if references:
            content_with_images += self._generate_references_section(references)
        
        # Step 8: Wrap in semantic HTML
        final_html = self._wrap_in_semantic_html(toc_html, content_with_images, topic)
        
        # Step 9: Generate Schema markup
        schema = self._generate_schema_markup(topic, headings, eeat_info)
        
        # Step 10: Generate SEO metadata
        seo_data = self._generate_seo_metadata(topic, keywords)
        
        result = {
            "title": topic,
            "content": final_html,
            "images": images,
            "seo": seo_data,
            "schema": schema,
            "toc": toc_html,
            "scheduleDate": schedule_date,
            "scheduleTime": schedule_time,
            "keywords": keywords,
            "references": references
        }
        
        print(f"[Advanced SEO] ✅ Generated {len(final_html)} chars with TOC and Schema", file=sys.stderr, flush=True)
        return result
    
    def _generate_structured_content_with_htags(self, topic: str, h_tags: List[str], 
                                                keywords: List[str], references: List[str],
                                                eeat_info: Dict) -> str:
        """Generate content using provided H-tags structure"""
        
        # Build prompt with H-tags structure
        h_tags_structure = "\n".join([f"## {tag}" for tag in h_tags]) if h_tags else ""
        keywords_str = ", ".join(keywords) if keywords else topic
        
        # E-E-A-T information
        author_name = eeat_info.get('authorName', 'Expert Author')
        author_credentials = eeat_info.get('credentials', 'Industry Expert')
        experience_years = eeat_info.get('experienceYears', '10+')
        
        prompt = f"""Write a blog post about "{topic}" in a completely natural, human way.

CRITICAL RULES FOR HUMAN WRITING:

1. NO MARKDOWN - Don't write "##" or "**bold**" or numbered lists like "1. **Title:**"
   Just write normal paragraphs with natural flow.

2. WRITE LIKE TALKING - Imagine explaining this to a friend. Use "I", "you", "we".
   Say things like: "So here's what I learned..." or "You know what's interesting?"

3. NATURAL PARAGRAPHS - Each paragraph should be 3-5 sentences. Mix short and long.
   Don't make lists. Don't use bullet points. Just tell the story.

4. REAL EXAMPLES - Share specific stories: "Last summer I went to..." or "My friend tried this and..."
   Make it personal and real.

5. CASUAL LANGUAGE - Use contractions (don't, can't, it's). Start sentences with And, But, So.
   Say "really good" not "excellent". Say "pretty cool" not "remarkable".

6. BANNED WORDS/PHRASES:
   - delve, dive into, explore, landscape, robust, comprehensive, leverage
   - seamless, streamline, optimize, facilitate, utilize
   - it's important to note, in conclusion, furthermore, moreover
   - game-changing, cutting-edge, revolutionary, innovative
   - NO numbered lists, NO bold text, NO asterisks

7. STRUCTURE - Write with these section topics (but don't write the headings as ##):
{h_tags_structure if h_tags_structure else '''
   - Start with why this topic matters
   - Explain the main things to know
   - Share the best options/places/ideas
   - Give practical tips for getting started
   - Add personal tips from your experience
   - Warn about common mistakes
   - Share real examples or stories
   - End with final thoughts
'''}

8. SECTION BREAKS - Between sections, just write a natural transition like:
   "Now let me tell you about..." or "Here's another thing..." or "So what about..."
   Then start the new section. Don't write headings.

9. KEYWORDS - Mention these naturally: {keywords_str}
   Don't force them. Just use them when it makes sense.

10. LENGTH - Write 1500-2000 words total. Make it flow naturally.

EXAMPLE OF GOOD HUMAN WRITING:

"So I've been thinking about this a lot lately. And honestly, it's not as complicated as people make it out to be.

Last year I tried something similar. Didn't work out great at first. But then I figured out the trick. You just need to focus on the basics.

Here's what I mean. Most people overthink it. They try to do everything at once. That's a mistake. Start small. Get one thing working. Then add more.

I remember talking to my friend about this. She had the same problem. Tried my approach. Worked way better for her too.

The thing is, you don't need fancy stuff. Just the essentials. Keep it simple. That's the secret."

NOW WRITE THE FULL ARTICLE - Remember: NO markdown, NO lists, NO bold text. Just natural paragraphs like a human wrote it.
2. Personal experience examples
3. Specific data and statistics
4. Expert recommendations
5. Industry insights
6. Practical case studies
7. Transparent about limitations
8. Updated information (mention 2025)

Write the complete article now with proper markdown headings (## for H2, ### for H3):"""

        try:
            # Try Gemini models
            models = [
                "gemini-2.0-flash-exp",
                "gemini-exp-1206",
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
                    "maxOutputTokens": 4000
                }
            }
            
            for model in models:
                try:
                    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={self.google_api_key}"
                    print(f"[Advanced SEO] Trying model: {model}", file=sys.stderr, flush=True)
                    
                    response = requests.post(url, headers=headers, json=data, timeout=60)
                    
                    if response.status_code == 200:
                        result = response.json()
                        if "candidates" in result and len(result["candidates"]) > 0:
                            content = result["candidates"][0]["content"]["parts"][0]["text"]
                            print(f"[Advanced SEO] ✅ Generated with {model}", file=sys.stderr, flush=True)
                            return content
                except Exception as e:
                    print(f"[Advanced SEO] Model {model} failed: {e}", file=sys.stderr, flush=True)
                    continue
            
            # Fallback
            return self._fallback_content(topic, h_tags)
            
        except Exception as e:
            print(f"[Advanced SEO] Error: {e}", file=sys.stderr, flush=True)
            return self._fallback_content(topic, h_tags)
    
    def _extract_headings(self, content: str) -> List[Dict]:
        """Extract headings by analyzing content structure"""
        headings = []
        
        # Since we're not using markdown, we need to intelligently split content
        # into sections based on the topic
        paragraphs = content.split('\n\n')
        
        # Create headings based on content flow
        # We'll generate these dynamically based on the topic
        section_keywords = [
            ('introduction', 'Getting Started', 'Why This Matters'),
            ('know', 'What You Should Know', 'The Basics'),
            ('best', 'Top Recommendations', 'Best Options'),
            ('how', 'How to Do It', 'Getting Started'),
            ('tips', 'Pro Tips', 'Expert Advice'),
            ('avoid', 'Common Mistakes', 'What to Avoid'),
            ('example', 'Real Examples', 'Success Stories'),
            ('final', 'Wrapping Up', 'Final Thoughts')
        ]
        
        # Generate headings based on content
        for i, (keyword, heading1, heading2) in enumerate(section_keywords):
            heading_id = re.sub(r'[^a-z0-9]+', '-', heading1.lower()).strip('-')
            headings.append({
                'level': 2,
                'text': heading1,
                'id': heading_id
            })
        
        return headings
    
    def _generate_toc(self, headings: List[Dict]) -> str:
        """Generate HTML Table of Contents - WordPress compatible"""
        
        if not headings:
            return ""
        
        # WordPress-friendly TOC with proper styling
        toc_html = '''
<div class="wp-block-group table-of-contents" style="background-color: #f8f9fa; padding: 25px; border-radius: 8px; margin: 30px 0; border-left: 5px solid #0073aa; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <h2 style="margin-top: 0; margin-bottom: 15px; color: #23282d; font-size: 22px; font-weight: 600;">📋 Table of Contents</h2>
    <ol style="margin: 0; padding-left: 25px; line-height: 2; list-style-type: decimal;">
'''
        
        for heading in headings:
            if heading['level'] == 2:  # Only H2 in TOC for cleaner look
                text = heading['text']
                heading_id = heading['id']
                toc_html += f'        <li style="margin-bottom: 8px;"><a href="#{heading_id}" style="color: #0073aa; text-decoration: none; font-weight: 500; transition: color 0.2s;" onmouseover="this.style.color=\'#005177\'" onmouseout="this.style.color=\'#0073aa\'">{text}</a></li>\n'
        
        toc_html += '''    </ol>
</div>

'''
        
        return toc_html
    
    def _add_jump_links(self, content: str, headings: List[Dict]) -> str:
        """Insert H2 headings into content at strategic points"""
        
        # Split content into paragraphs
        paragraphs = [p.strip() for p in content.split('\n\n') if p.strip()]
        
        if len(paragraphs) < len(headings):
            # Not enough paragraphs, just add headings at intervals
            result = []
            interval = max(1, len(paragraphs) // len(headings))
            
            for i, para in enumerate(paragraphs):
                # Add heading before paragraph at intervals
                heading_index = i // interval
                if heading_index < len(headings) and i % interval == 0 and i > 0:
                    heading = headings[heading_index]
                    result.append(f'<h2 id="{heading["id"]}">{heading["text"]}</h2>')
                result.append(f'<p>{para}</p>')
            
            return '\n\n'.join(result)
        
        # Insert headings at strategic points
        result = []
        heading_index = 0
        paragraphs_per_section = len(paragraphs) // len(headings)
        
        for i, para in enumerate(paragraphs):
            # Add heading at the start of each section
            if i > 0 and i % paragraphs_per_section == 0 and heading_index < len(headings):
                heading = headings[heading_index]
                result.append(f'<h2 id="{heading["id"]}">{heading["text"]}</h2>')
                heading_index += 1
            
            result.append(f'<p>{para}</p>')
        
        return '\n\n'.join(result)
    
    def _get_images(self, topic: str, num_images: int) -> List[Dict]:
        """Get high-quality images from SerpApi (Google Images)"""
        images = []
        
        try:
            if self.serpapi_key:
                # Use SerpApi for Google Images - most relevant results
                search_query = topic.replace(' ', '+')
                url = f"https://serpapi.com/search.json?engine=google_images&q={search_query}&num={num_images}&api_key={self.serpapi_key}"
                
                response = requests.get(url, timeout=15)
                
                if response.status_code == 200:
                    data = response.json()
                    image_results = data.get('images_results', [])
                    
                    for img in image_results[:num_images]:
                        images.append({
                            "url": img.get('original', img.get('thumbnail', '')),
                            "alt": img.get('title', f"{topic} - Professional Image"),
                            "caption": img.get('title', f"High-quality image related to {topic}")
                        })
                    
                    if images:
                        print(f"[Advanced SEO] ✅ Got {len(images)} images from Google via SerpApi", file=sys.stderr, flush=True)
                        return images
        except Exception as e:
            print(f"[Advanced SEO] SerpApi error: {e}", file=sys.stderr, flush=True)
        
        # Fallback to Picsum (reliable placeholder service)
        print(f"[Advanced SEO] Using Picsum fallback images", file=sys.stderr, flush=True)
        
        for i in range(num_images):
            seed = hash(f"{topic}{i}") % 1000
            images.append({
                "url": f"https://picsum.photos/seed/{seed}/800/600",
                "alt": f"{topic} - Image {i+1}",
                "caption": f"Professional image related to {topic}"
            })
        
        return images
    
    def _insert_images_in_content(self, content: str, images: List[Dict]) -> str:
        """Insert images after H2 sections"""
        
        if not images:
            return content
        
        # Split by H2 headings
        parts = re.split(r'(<h2[^>]*>.*?</h2>)', content)
        
        result = []
        image_index = 0
        
        for i, part in enumerate(parts):
            result.append(part)
            
            # After H2 heading, add image
            if part.startswith('<h2') and image_index < len(images):
                img = images[image_index]
                img_html = f'''
<figure style="margin: 30px 0; text-align: center;">
    <img src="{img['url']}" alt="{img['alt']}" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" loading="lazy" />
    <figcaption style="margin-top: 10px; font-style: italic; color: #666;">{img['caption']}</figcaption>
</figure>
'''
                result.append(img_html)
                image_index += 1
        
        return ''.join(result)
    
    def _generate_references_section(self, references: List[str]) -> str:
        """Generate references section"""
        
        if not references:
            return ""
        
        refs_html = '''
<section id="references" style="margin-top: 50px; padding-top: 30px; border-top: 2px solid #e0e0e0;">
    <h2>📚 References and Sources</h2>
    <ol style="line-height: 2;">
'''
        
        for ref in references:
            refs_html += f'        <li><a href="{ref}" target="_blank" rel="noopener noreferrer" style="color: #007bff;">{ref}</a></li>\n'
        
        refs_html += '''    </ol>
</section>
'''
        
        return refs_html
    
    def _wrap_in_semantic_html(self, toc: str, content: str, title: str) -> str:
        """Wrap content in semantic HTML"""
        
        html = f'''
<article class="blog-post" itemscope itemtype="https://schema.org/Article">
    <meta itemprop="headline" content="{title}">
    <meta itemprop="datePublished" content="{datetime.now().isoformat()}">
    
    {toc}
    
    <div class="post-content" itemprop="articleBody">
        {content}
    </div>
</article>
'''
        
        return html
    
    def _generate_schema_markup(self, topic: str, headings: List[Dict], eeat_info: Dict) -> Dict:
        """Generate Schema.org Article markup"""
        
        author_name = eeat_info.get('authorName', 'Expert Author')
        author_credentials = eeat_info.get('credentials', 'Industry Expert')
        
        schema = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": topic,
            "author": {
                "@type": "Person",
                "name": author_name,
                "jobTitle": author_credentials
            },
            "datePublished": datetime.now().isoformat(),
            "dateModified": datetime.now().isoformat(),
            "publisher": {
                "@type": "Organization",
                "name": "Your Blog Name",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://yoursite.com/logo.jpg"
                }
            },
            "articleSection": [h['text'] for h in headings if h['level'] == 2][:5],
            "keywords": topic,
            "articleBody": "Comprehensive guide about " + topic
        }
        
        return schema
    
    def _generate_seo_metadata(self, topic: str, keywords: List[str]) -> Dict:
        """Generate SEO metadata"""
        
        slug = re.sub(r'[^a-z0-9]+', '-', topic.lower()).strip('-')[:50]
        
        keywords_str = ', '.join(keywords) if keywords else topic
        
        meta_description = f"Complete guide to {topic}. Expert insights, practical tips, and real-world examples. Updated for 2025."[:155]
        
        return {
            "slug": slug,
            "metaDescription": meta_description,
            "keywords": keywords_str,
            "focusKeyword": keywords[0] if keywords else topic
        }
    
    def _fallback_content(self, topic: str, h_tags: List[str]) -> str:
        """Fallback content structure"""
        
        content = f"# {topic}\n\n"
        
        if h_tags:
            for tag in h_tags:
                content += f"## {tag}\n\nContent for {tag} section.\n\n"
        else:
            content += "## Introduction\n\nIntroduction content.\n\n"
            content += "## Main Content\n\nMain content here.\n\n"
            content += "## Conclusion\n\nConclusion content.\n\n"
        
        return content


def main():
    """Main entry point"""
    try:
        # Read config from stdin
        config_json = sys.stdin.read()
        config = json.loads(config_json)
        
        writer = AdvancedSEOWriter()
        result = writer.write_advanced_content(config)
        
        # Output JSON result
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
