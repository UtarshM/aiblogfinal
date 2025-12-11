"""
Human-Like Content Writer - Generates 75%+ Human Content
No AI patterns, natural flow, dynamic TOC based on actual content
Author: Harsh J Kuhikar
Copyright: 2025 Harsh J Kuhikar. All Rights Reserved.
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

class HumanContentWriter:
    def __init__(self):
        self.google_api_key = os.getenv("GOOGLE_AI_KEY", "")
        self.serpapi_key = os.getenv("SERPAPI_KEY", "")
        
    def write_human_content(self, config: Dict) -> Dict:
        """Generate truly human-like content"""
        
        topic = config.get('topic', '')
        h_tags = config.get('hTags', [])
        keywords = config.get('keywords', [])
        references = config.get('references', [])
        eeat_info = config.get('eeat', {})
        
        print(f"[Human Writer] Generating human content for: {topic}", file=sys.stderr, flush=True)
        
        # Step 1: Generate natural content with proper HTML headings
        content_html = self._generate_natural_content(topic, h_tags, keywords, eeat_info)
        
        # Step 2: Extract headings from generated HTML
        headings = self._extract_html_headings(content_html)
        
        # Step 3: Generate dynamic TOC based on actual headings
        toc_html = self._generate_dynamic_toc(headings)
        
        # Step 4: Get images
        images = self._get_images(topic, 4)
        
        # Step 5: Insert images
        content_with_images = self._insert_images(content_html, images, headings)
        
        # Step 6: Add references if provided
        if references:
            content_with_images += self._add_references(references)
        
        # Step 7: Wrap everything
        final_html = self._wrap_content(toc_html, content_with_images, topic)
        
        # Step 8: Generate SEO data
        seo_data = self._generate_seo(topic, keywords)
        
        # Step 9: Generate Schema
        schema = self._generate_schema(topic, headings, eeat_info)
        
        result = {
            "title": topic,
            "content": final_html,
            "images": images,
            "seo": seo_data,
            "schema": schema,
            "toc": toc_html,
            "keywords": keywords,
            "references": references
        }
        
        print(f"[Human Writer] ✅ Generated {len(final_html)} chars of human content", file=sys.stderr, flush=True)
        return result
    
    def _generate_natural_content(self, topic: str, h_tags: List[str], keywords: List[str], eeat_info: Dict) -> str:
        """Generate content that sounds 75%+ human"""
        
        keywords_str = ", ".join(keywords) if keywords else topic
        author_name = eeat_info.get('authorName', 'Travel Expert')
        
        # Create dynamic headings based on topic
        if not h_tags:
            # Generate smart headings based on topic keywords
            if any(word in topic.lower() for word in ['travel', 'visit', 'destination', 'place']):
                h_tags = [
                    f"Why {topic} is Worth Your Time",
                    "What Makes These Places Special",
                    "The Complete List",
                    "Planning Your Trip",
                    "Money-Saving Tips",
                    "Common Tourist Traps to Avoid",
                    "My Personal Recommendations"
                ]
            elif any(word in topic.lower() for word in ['hotel', 'restaurant', 'food', 'eat']):
                h_tags = [
                    f"What You Need to Know About {topic}",
                    "The Top Picks",
                    "What to Expect",
                    "Booking Tips",
                    "Budget Options",
                    "Mistakes to Avoid",
                    "Final Verdict"
                ]
            else:
                h_tags = [
                    "Getting Started",
                    "The Main Points",
                    "Best Approaches",
                    "Practical Tips",
                    "Things to Watch For",
                    "Real-World Examples",
                    "Wrapping Up"
                ]
        
        prompt = f"""Write a blog post about "{topic}" in a completely natural, conversational way.

CRITICAL: This must sound like a real person wrote it, not AI. Target: 75%+ human score.

WRITING RULES:

1. Write in first person. Use "I", "my", "I've". Share personal experiences.
   Example: "I visited this place last summer and honestly, it blew my mind."

2. Be conversational. Use contractions (don't, can't, it's, I've, you'll).
   Start sentences with And, But, So, Plus, Also.

3. Show personality. Add opinions: "This is my favorite", "I'm not a fan of", "Honestly".
   Use casual phrases: "you know", "pretty cool", "really good", "kind of", "sort of".

4. Vary sentence length. Mix short punchy sentences with longer flowing ones.
   Short. Then a longer one that connects multiple thoughts together naturally. Then short again.

5. Be specific. Instead of "beautiful scenery", say "mountains that make you stop and stare".
   Instead of "delicious food", say "food that makes you want to come back tomorrow".

6. Add real details. Mention specific things: "around $50", "takes about 2 hours", "open until 10pm".
   Make it feel researched and real.

7. NO AI PATTERNS:
   - Don't use: delve, explore, landscape, robust, comprehensive, leverage, seamless, facilitate
   - Don't use: it's important to note, in conclusion, furthermore, moreover
   - Don't use: game-changing, cutting-edge, revolutionary
   - Don't write numbered lists like "1. **Title:** description"
   - Don't use bold text or asterisks

8. Natural transitions between sections. Don't announce sections.
   Just flow naturally: "Now here's the interesting part..." or "Let me tell you about..."

STRUCTURE - Write these sections with H2 tags:

{chr(10).join([f'<h2 id="{re.sub(r"[^a-z0-9]+", "-", tag.lower()).strip("-")}">{tag}</h2>' for tag in h_tags])}

For each section:
- Write 2-4 natural paragraphs
- Share personal insights or stories
- Be specific and detailed
- Keep it conversational
- No lists, no bold text, just flowing paragraphs

KEYWORDS to mention naturally: {keywords_str}

TOTAL LENGTH: 1500-2000 words

TONE: Friendly, knowledgeable, personal, helpful. Like a friend giving advice.

CRITICAL OUTPUT FORMAT:
- Output ONLY the HTML content
- Do NOT wrap it in ```html or ``` code blocks
- Do NOT add any markdown formatting
- Start directly with the first <h2> tag
- End with the last </p> tag
- Just raw HTML, nothing else

Write the complete article now with proper HTML <h2> tags and <p> tags for paragraphs."""

        try:
            models = ["gemini-2.0-flash-exp", "gemini-exp-1206", "gemini-2.0-flash"]
            
            for model in models:
                try:
                    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={self.google_api_key}"
                    
                    response = requests.post(url, 
                        headers={"Content-Type": "application/json"},
                        json={
                            "contents": [{"parts": [{"text": prompt}]}],
                            "generationConfig": {
                                "temperature": 0.9,  # Higher for more human-like
                                "topK": 40,
                                "topP": 0.95,
                                "maxOutputTokens": 4000
                            }
                        },
                        timeout=60
                    )
                    
                    if response.status_code == 200:
                        result = response.json()
                        if "candidates" in result and len(result["candidates"]) > 0:
                            content = result["candidates"][0]["content"]["parts"][0]["text"]
                            
                            # Clean up the content - remove code block markers
                            content = content.strip()
                            if content.startswith('```html'):
                                content = content[7:]  # Remove ```html
                            if content.startswith('```'):
                                content = content[3:]  # Remove ```
                            if content.endswith('```'):
                                content = content[:-3]  # Remove trailing ```
                            content = content.strip()
                            
                            print(f"[Human Writer] ✅ Generated with {model}", file=sys.stderr, flush=True)
                            return content
                except Exception as e:
                    print(f"[Human Writer] Model {model} failed: {e}", file=sys.stderr, flush=True)
                    continue
            
            return self._fallback_content(topic, h_tags)
            
        except Exception as e:
            print(f"[Human Writer] Error: {e}", file=sys.stderr, flush=True)
            return self._fallback_content(topic, h_tags)
    
    def _extract_html_headings(self, content: str) -> List[Dict]:
        """Extract H2 headings from HTML content"""
        headings = []
        h2_pattern = r'<h2[^>]*id="([^"]*)"[^>]*>([^<]+)</h2>'
        matches = re.findall(h2_pattern, content)
        
        for heading_id, text in matches:
            headings.append({
                'id': heading_id,
                'text': text.strip()
            })
        
        return headings
    
    def _generate_dynamic_toc(self, headings: List[Dict]) -> str:
        """Generate TOC based on actual headings in content"""
        
        if not headings:
            return ""
        
        toc_html = '''
<div class="wp-block-group table-of-contents" style="background-color: #f8f9fa; padding: 25px; border-radius: 8px; margin: 30px 0; border-left: 5px solid #0073aa; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <h2 style="margin-top: 0; margin-bottom: 15px; color: #23282d; font-size: 22px; font-weight: 600;">📋 Table of Contents</h2>
    <ol style="margin: 0; padding-left: 25px; line-height: 2; list-style-type: decimal;">
'''
        
        for heading in headings:
            toc_html += f'        <li style="margin-bottom: 8px;"><a href="#{heading["id"]}" style="color: #0073aa; text-decoration: none; font-weight: 500; transition: color 0.2s;" onmouseover="this.style.color=\'#005177\'" onmouseout="this.style.color=\'#0073aa\'">{heading["text"]}</a></li>\n'
        
        toc_html += '''    </ol>
</div>

'''
        
        return toc_html
    
    def _get_images(self, topic: str, num_images: int) -> List[Dict]:
        """Get images"""
        images = []
        
        try:
            if self.serpapi_key:
                search_query = topic.replace(' ', '+')
                url = f"https://serpapi.com/search.json?engine=google_images&q={search_query}&num={num_images}&api_key={self.serpapi_key}"
                
                response = requests.get(url, timeout=15)
                
                if response.status_code == 200:
                    data = response.json()
                    image_results = data.get('images_results', [])
                    
                    for img in image_results[:num_images]:
                        images.append({
                            "url": img.get('original', img.get('thumbnail', '')),
                            "alt": img.get('title', f"{topic} - Image"),
                            "caption": img.get('title', f"Image related to {topic}")
                        })
                    
                    if images:
                        return images
        except:
            pass
        
        # Fallback
        for i in range(num_images):
            seed = hash(f"{topic}{i}") % 1000
            images.append({
                "url": f"https://picsum.photos/seed/{seed}/800/600",
                "alt": f"{topic} - Image {i+1}",
                "caption": f"Image related to {topic}"
            })
        
        return images
    
    def _insert_images(self, content: str, images: List[Dict], headings: List[Dict]) -> str:
        """Insert images after H2 sections"""
        
        if not images or not headings:
            return content
        
        # Split by H2 tags
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
    <figcaption style="margin-top: 10px; font-style: italic; color: #666; font-size: 14px;">{img['caption']}</figcaption>
</figure>
'''
                result.append(img_html)
                image_index += 1
        
        return ''.join(result)
    
    def _add_references(self, references: List[str]) -> str:
        """Add references section"""
        refs_html = '''
<section style="margin-top: 50px; padding-top: 30px; border-top: 2px solid #e0e0e0;">
    <h2>📚 References</h2>
    <ol style="line-height: 2;">
'''
        for ref in references:
            refs_html += f'        <li><a href="{ref}" target="_blank" rel="noopener">{ref}</a></li>\n'
        
        refs_html += '    </ol>\n</section>\n'
        return refs_html
    
    def _wrap_content(self, toc: str, content: str, title: str) -> str:
        """Wrap in semantic HTML"""
        return f'''
<article class="blog-post" itemscope itemtype="https://schema.org/Article">
    <meta itemprop="headline" content="{title}">
    <meta itemprop="datePublished" content="{datetime.now().isoformat()}">
    
    {toc}
    
    <div class="post-content" itemprop="articleBody">
        {content}
    </div>
</article>
'''
    
    def _generate_seo(self, topic: str, keywords: List[str]) -> Dict:
        """Generate SEO metadata"""
        slug = re.sub(r'[^a-z0-9]+', '-', topic.lower()).strip('-')[:50]
        keywords_str = ', '.join(keywords) if keywords else topic
        meta_desc = f"Complete guide to {topic}. Expert insights and practical tips. Updated for 2025."[:155]
        
        return {
            "slug": slug,
            "metaDescription": meta_desc,
            "keywords": keywords_str,
            "focusKeyword": keywords[0] if keywords else topic
        }
    
    def _generate_schema(self, topic: str, headings: List[Dict], eeat_info: Dict) -> Dict:
        """Generate Schema markup"""
        author_name = eeat_info.get('authorName', 'Expert Author')
        
        return {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": topic,
            "author": {
                "@type": "Person",
                "name": author_name
            },
            "datePublished": datetime.now().isoformat(),
            "articleSection": [h['text'] for h in headings][:5]
        }
    
    def _fallback_content(self, topic: str, h_tags: List[str]) -> str:
        """Generate better fallback content"""
        if not h_tags:
            h_tags = ["Introduction", "Main Points", "Key Takeaways", "Conclusion"]
        
        content = ""
        for i, tag in enumerate(h_tags):
            tag_id = re.sub(r'[^a-z0-9]+', '-', tag.lower()).strip('-')
            content += f'<h2 id="{tag_id}">{tag}</h2>\n\n'
            
            # Generate better fallback paragraphs
            if i == 0:
                content += f'<p>Welcome to this comprehensive guide about {topic}. In this article, we will explore everything you need to know.</p>\n\n'
                content += f'<p>Whether you are new to this topic or looking to deepen your understanding, this guide will provide valuable insights.</p>\n\n'
            elif i == len(h_tags) - 1:
                content += f'<p>We have covered the essential aspects of {topic} in this guide. Remember to apply these insights to your own situation.</p>\n\n'
                content += f'<p>Thank you for reading. We hope you found this information helpful and actionable.</p>\n\n'
            else:
                content += f'<p>This section covers important information about {tag.lower()}. Understanding this aspect is crucial for success.</p>\n\n'
                content += f'<p>Let us explore the key points and practical applications you can use right away.</p>\n\n'
        
        return content


def main():
    """Main entry point"""
    try:
        config_json = sys.stdin.read()
        config = json.loads(config_json)
        
        writer = HumanContentWriter()
        result = writer.write_human_content(config)
        
        print(json.dumps(result))
        sys.stdout.flush()
        
    except Exception as e:
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
