"""
Unique Content Generator - Creates Diverse, Human-Like Content
Each post is unique with different writing styles, tones, and structures
Author: Harsh J Kuhikar
Copyright: 2025 Harsh J Kuhikar. All Rights Reserved.
"""

import requests
import json
import os
import sys
import re
import random
from typing import Dict, List
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

class UniqueContentGenerator:
    def __init__(self):
        self.google_api_key = os.getenv("GOOGLE_AI_KEY", "")
        self.serpapi_key = os.getenv("SERPAPI_KEY", "")
        
        # Different writing styles to rotate through
        self.writing_styles = [
            "storytelling", "conversational", "expert", "casual_friend", 
            "enthusiastic", "analytical", "personal_journey"
        ]
        
        # Different tones
        self.tones = [
            "warm and friendly", "professional but approachable", "excited and energetic",
            "calm and thoughtful", "witty and humorous", "sincere and honest"
        ]
        
        # Different opening styles
        self.opening_styles = [
            "personal_story", "question", "bold_statement", "surprising_fact", "relatable_scenario"
        ]
    
    def generate_unique_content(self, config: Dict) -> Dict:
        """Generate truly unique content for each post"""
        
        topic = config.get('topic', '')
        h_tags = config.get('hTags', [])
        keywords = config.get('keywords', [])
        references = config.get('references', [])
        eeat_info = config.get('eeat', {})
        
        print(f"[Unique Generator] Creating unique content for: {topic}", file=sys.stderr, flush=True)
        
        # Randomly select style elements for THIS post
        style = random.choice(self.writing_styles)
        tone = random.choice(self.tones)
        opening = random.choice(self.opening_styles)
        
        print(f"[Unique Generator] Style: {style}, Tone: {tone}, Opening: {opening}", file=sys.stderr, flush=True)
        
        # Generate unique headings for THIS topic
        h_tags = self._generate_unique_headings(topic, h_tags)
        
        # Generate content with unique style
        content_html = self._generate_with_unique_style(topic, h_tags, keywords, style, tone, opening, eeat_info)
        
        # Extract headings
        headings = self._extract_headings(content_html)
        
        # Generate TOC
        toc_html = self._generate_toc(headings)
        
        # Get images
        images = self._get_images(topic, 4)
        
        # Insert images
        content_with_images = self._insert_images(content_html, images)
        
        # Add references
        if references:
            content_with_images += self._add_references(references)
        
        # Wrap content
        final_html = self._wrap_content(toc_html, content_with_images, topic)
        
        # Generate SEO
        seo_data = self._generate_seo(topic, keywords)
        
        # Generate Schema
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
        
        print(f"[Unique Generator] ✅ Generated {len(final_html)} chars of unique content", file=sys.stderr, flush=True)
        return result
    
    def _generate_unique_headings(self, topic: str, provided_h_tags: List[str]) -> List[str]:
        """Generate unique headings for each post"""
        
        if provided_h_tags:
            return provided_h_tags
        
        # Different heading templates based on topic type
        topic_lower = topic.lower()
        
        # Travel/Destination topics
        if any(word in topic_lower for word in ['travel', 'visit', 'destination', 'place', 'location', 'trip']):
            templates = [
                [
                    f"My Journey to {topic}",
                    "First Impressions That Stuck With Me",
                    "The Hidden Spots Nobody Talks About",
                    "What I Wish I Knew Before Going",
                    "The Real Cost Breakdown",
                    "My Honest Recommendations"
                ],
                [
                    f"Why {topic} Surprised Me",
                    "Getting There and Around",
                    "The Must-See Highlights",
                    "Where to Eat Like a Local",
                    "Budget Tips That Actually Work",
                    "Final Thoughts and Tips"
                ],
                [
                    "Let Me Tell You About This Place",
                    "What Makes It Special",
                    "The Complete Experience",
                    "Practical Planning Advice",
                    "Money Matters",
                    "Would I Go Again?"
                ]
            ]
            return random.choice(templates)
        
        # Food/Restaurant topics
        elif any(word in topic_lower for word in ['food', 'restaurant', 'eat', 'dining', 'cafe', 'coffee']):
            templates = [
                [
                    f"Discovering {topic}",
                    "What Sets These Places Apart",
                    "My Top Picks",
                    "The Atmosphere and Vibe",
                    "Price Points and Value",
                    "My Final Take"
                ],
                [
                    "The Food Scene Here",
                    "Places I Keep Coming Back To",
                    "What to Order",
                    "The Experience",
                    "Is It Worth It?",
                    "Bottom Line"
                ],
                [
                    f"Exploring {topic}",
                    "The Standouts",
                    "Menu Highlights",
                    "Ambiance Check",
                    "Budget Breakdown",
                    "My Verdict"
                ]
            ]
            return random.choice(templates)
        
        # General topics
        else:
            templates = [
                [
                    "Getting Into This",
                    "The Core Concepts",
                    "What Works Best",
                    "Practical Steps",
                    "Common Pitfalls",
                    "Wrapping It Up"
                ],
                [
                    "My Take on This",
                    "The Essentials",
                    "Best Approaches",
                    "Real-World Application",
                    "What to Avoid",
                    "Final Thoughts"
                ],
                [
                    "Understanding the Basics",
                    "Key Points",
                    "Effective Strategies",
                    "Implementation Tips",
                    "Mistakes to Skip",
                    "Conclusion"
                ]
            ]
            return random.choice(templates)
    
    def _generate_with_unique_style(self, topic: str, h_tags: List[str], keywords: List[str], 
                                    style: str, tone: str, opening: str, eeat_info: Dict) -> str:
        """Generate content with unique style for each post"""
        
        keywords_str = ", ".join(keywords) if keywords else topic
        
        # Create opening based on style
        opening_examples = {
            "personal_story": f"So last year, I had this experience with {topic.lower()}. Changed my whole perspective.",
            "question": f"Ever wondered about {topic.lower()}? I did too. Here's what I found out.",
            "bold_statement": f"Let me be straight with you. {topic} is more interesting than most people think.",
            "surprising_fact": f"Here's something that surprised me about {topic.lower()}. And it might surprise you too.",
            "relatable_scenario": f"Picture this. You're trying to figure out {topic.lower()}. Sounds familiar?"
        }
        
        opening_example = opening_examples.get(opening, opening_examples["personal_story"])
        
        # Style-specific instructions
        style_instructions = {
            "storytelling": "Write like you're telling a story to a friend. Use narrative flow. Include specific moments and scenes.",
            "conversational": "Write like you're having a casual conversation. Ask rhetorical questions. Use 'you know' and 'I mean'.",
            "expert": "Write with authority but stay approachable. Share insights from experience. Be specific with details.",
            "casual_friend": "Write like texting a friend. Short sentences. Lots of personality. Super relaxed.",
            "enthusiastic": "Write with energy and excitement. Show genuine passion. Use exclamation points sparingly but effectively.",
            "analytical": "Write thoughtfully. Break things down logically. But keep it accessible and interesting.",
            "personal_journey": "Write about your personal experience. What you learned. How you grew. Make it relatable."
        }
        
        style_instruction = style_instructions.get(style, style_instructions["conversational"])
        
        # Create unique prompt for THIS post
        prompt = f"""Write a blog post about "{topic}" with a unique {style} style and {tone} tone.

CRITICAL: Make this post DIFFERENT from other posts. Use varied vocabulary, different sentence structures, unique examples.

OPENING STYLE: {opening}
Example opening: "{opening_example}"

WRITING STYLE: {style_instruction}

TONE: {tone}

STRUCTURE - Use these H2 headings with IDs:
{chr(10).join([f'<h2 id="{re.sub(r"[^a-z0-9]+", "-", tag.lower()).strip("-")}">{tag}</h2>' for tag in h_tags])}

UNIQUENESS REQUIREMENTS:

1. VARY YOUR VOCABULARY - Don't use the same words repeatedly
   - Instead of always saying "great", use: amazing, fantastic, wonderful, excellent, superb
   - Instead of "good", use: solid, decent, nice, fine, quality
   - Mix it up naturally

2. DIFFERENT SENTENCE PATTERNS - Don't follow the same structure
   - Some posts: Start with short sentences. Build up.
   - Other posts: Begin with longer, flowing sentences that connect ideas.
   - This post: {random.choice(['Mix short and long randomly', 'Start long, end short', 'Vary wildly'])}

3. UNIQUE EXAMPLES - Make each post's examples different
   - Use different time references: "last summer", "a few months ago", "recently", "back in 2023"
   - Different people: "my friend", "my colleague", "someone I met", "a local"
   - Different scenarios each time

4. VARIED TRANSITIONS - Don't use the same phrases
   - Rotate between: "Here's the thing", "Now", "So", "Plus", "Also", "And", "But", "Look"
   - Use different ones in each post

5. PERSONAL TOUCHES - Make each story unique
   - Different emotions: excited, surprised, skeptical, curious, amazed
   - Different reactions: "I couldn't believe it", "It caught me off guard", "I was impressed"
   - Unique details: specific prices, times, places, names

6. WRITING PERSONALITY - Each post should feel different
   - This post's personality: {random.choice(['enthusiastic and energetic', 'calm and reflective', 'witty and fun', 'serious but friendly', 'casual and laid-back'])}

BANNED REPETITIVE PATTERNS:
- Don't start every section the same way
- Don't use the same transition words repeatedly
- Don't follow identical paragraph structures
- Don't use the same examples or scenarios
- Don't repeat the same adjectives

KEYWORDS to mention naturally: {keywords_str}

LENGTH: 1500-2000 words

OUTPUT FORMAT:
- Raw HTML only
- No ```html or ``` markers
- Start with first <h2> tag
- Use <p> tags for paragraphs
- Natural, flowing content

Write this post NOW with a completely unique voice and style."""

        try:
            models = ["gemini-2.0-flash-exp", "gemini-exp-1206", "gemini-2.0-flash"]
            
            for model in models:
                try:
                    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={self.google_api_key}"
                    
                    # Vary temperature for more uniqueness
                    temperature = random.uniform(0.85, 0.95)
                    
                    response = requests.post(url, 
                        headers={"Content-Type": "application/json"},
                        json={
                            "contents": [{"parts": [{"text": prompt}]}],
                            "generationConfig": {
                                "temperature": temperature,
                                "topK": random.randint(35, 45),
                                "topP": random.uniform(0.90, 0.98),
                                "maxOutputTokens": 4000
                            }
                        },
                        timeout=60
                    )
                    
                    if response.status_code == 200:
                        result = response.json()
                        if "candidates" in result and len(result["candidates"]) > 0:
                            content = result["candidates"][0]["content"]["parts"][0]["text"]
                            
                            # Clean up
                            content = content.strip()
                            if content.startswith('```html'):
                                content = content[7:]
                            if content.startswith('```'):
                                content = content[3:]
                            if content.endswith('```'):
                                content = content[:-3]
                            content = content.strip()
                            
                            print(f"[Unique Generator] ✅ Generated with {model} (temp: {temperature:.2f})", file=sys.stderr, flush=True)
                            return content
                except Exception as e:
                    print(f"[Unique Generator] Model {model} failed: {e}", file=sys.stderr, flush=True)
                    continue
            
            return self._fallback_content(topic, h_tags)
            
        except Exception as e:
            print(f"[Unique Generator] Error: {e}", file=sys.stderr, flush=True)
            return self._fallback_content(topic, h_tags)
    
    def _extract_headings(self, content: str) -> List[Dict]:
        """Extract H2 headings"""
        headings = []
        h2_pattern = r'<h2[^>]*id="([^"]*)"[^>]*>([^<]+)</h2>'
        matches = re.findall(h2_pattern, content)
        
        for heading_id, text in matches:
            headings.append({'id': heading_id, 'text': text.strip()})
        
        return headings
    
    def _generate_toc(self, headings: List[Dict]) -> str:
        """Generate TOC"""
        if not headings:
            return ""
        
        toc_html = '''
<div class="wp-block-group table-of-contents" style="background-color: #f8f9fa; padding: 25px; border-radius: 8px; margin: 30px 0; border-left: 5px solid #0073aa; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <h2 style="margin-top: 0; margin-bottom: 15px; color: #23282d; font-size: 22px; font-weight: 600;">📋 Table of Contents</h2>
    <ol style="margin: 0; padding-left: 25px; line-height: 2; list-style-type: decimal;">
'''
        
        for heading in headings:
            toc_html += f'        <li style="margin-bottom: 8px;"><a href="#{heading["id"]}" style="color: #0073aa; text-decoration: none; font-weight: 500;">{heading["text"]}</a></li>\n'
        
        toc_html += '    </ol>\n</div>\n\n'
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
    
    def _insert_images(self, content: str, images: List[Dict]) -> str:
        """Insert images"""
        if not images:
            return content
        
        parts = re.split(r'(<h2[^>]*>.*?</h2>)', content)
        result = []
        image_index = 0
        
        for part in parts:
            result.append(part)
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
        """Add references"""
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
        """Wrap content"""
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
        """Generate SEO"""
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
        """Generate Schema"""
        return {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": topic,
            "author": {
                "@type": "Person",
                "name": eeat_info.get('authorName', 'Expert Author')
            },
            "datePublished": datetime.now().isoformat(),
            "articleSection": [h['text'] for h in headings][:5]
        }
    
    def _fallback_content(self, topic: str, h_tags: List[str]) -> str:
        """Fallback content"""
        if not h_tags:
            h_tags = ["Introduction", "Main Points", "Key Takeaways", "Conclusion"]
        
        content = ""
        for i, tag in enumerate(h_tags):
            tag_id = re.sub(r'[^a-z0-9]+', '-', tag.lower()).strip('-')
            content += f'<h2 id="{tag_id}">{tag}</h2>\n\n'
            
            if i == 0:
                content += f'<p>Welcome to this guide about {topic}. Let me share what I know.</p>\n\n'
            elif i == len(h_tags) - 1:
                content += f'<p>That covers the essentials of {topic}. Hope this helps!</p>\n\n'
            else:
                content += f'<p>Here are some insights about {tag.lower()}.</p>\n\n'
        
        return content


def main():
    """Main entry point"""
    try:
        config_json = sys.stdin.read()
        config = json.loads(config_json)
        
        generator = UniqueContentGenerator()
        result = generator.generate_unique_content(config)
        
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
