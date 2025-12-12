"""
Ultra Human Content Writer - Writes Like a Real Person
No AI patterns, natural imperfections, casual and authentic
Author: Scalezix Venture PVT LTD
Copyright: 2025 Scalezix Venture PVT LTD. All Rights Reserved.
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

class UltraHumanWriter:
    def __init__(self):
        self.google_api_key = os.getenv("GOOGLE_AI_KEY", "")
        self.openrouter_key = os.getenv("OPENROUTER_API_KEY", "")
        self.serpapi_key = os.getenv("SERPAPI_KEY", "")
        
        # MAXIMUM UNIQUENESS - Different patterns for each post
        self.casual_starters = [
            "Okay so", "Alright", "Look", "Here's the thing", "So basically",
            "You know what", "Let me tell you", "I gotta say", "Honestly",
            "Real talk", "Not gonna lie", "To be honest", "Listen", "Check this out",
            "Let me break it down", "So here's what happened", "I've been meaning to share",
            "Can we talk about", "I need to tell you about", "Ever wondered about"
        ]
        
        self.transitions = [
            "Anyway", "But yeah", "Oh and", "Also", "Plus", "Another thing",
            "By the way", "Speaking of which", "Now", "So", "And get this"
        ]
        
        self.fillers = [
            "like", "you know", "I mean", "kind of", "sort of", "pretty much",
            "basically", "actually", "really", "definitely", "probably"
        ]
        
        self.personal_touches = [
            "I remember when", "Last time I", "My friend told me", "I've noticed",
            "From what I've seen", "In my experience", "I always", "I usually"
        ]
    
    def generate_human_content(self, config: Dict) -> Dict:
        """Generate ultra-human content"""
        
        topic = config.get('topic', '')
        h_tags = config.get('hTags', [])
        keywords = config.get('keywords', [])
        references = config.get('references', [])
        eeat_info = config.get('eeat', {})
        
        print(f"[Ultra Human] Writing about: {topic}", file=sys.stderr, flush=True)
        
        # Generate natural headings
        if not h_tags:
            h_tags = self._create_natural_headings(topic)
        
        # Generate ultra-human content
        content_html = self._write_like_human(topic, h_tags, keywords, eeat_info)
        
        # Extract headings
        headings = self._extract_headings(content_html)
        
        # Generate simple TOC
        toc_html = self._generate_toc(headings)
        
        # Get MORE images (8-10 for rich content)
        images = self._get_images(topic, 10)
        
        # Insert images naturally
        content_with_images = self._insert_images_naturally(content_html, images)
        
        # Add references if provided
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
        
        print(f"[Ultra Human] ✅ Generated {len(final_html)} chars", file=sys.stderr, flush=True)
        return result
    
    def _create_natural_headings(self, topic: str) -> List[str]:
        """Create DYNAMIC, TOPIC-SPECIFIC headings - truly unique every time"""
        
        topic_lower = topic.lower()
        
        # Extract key words from topic for dynamic headings
        topic_words = topic.split()
        main_subject = topic_words[-1] if topic_words else "This"
        
        # Travel/Destination topics - DYNAMIC VARIATIONS
        if any(word in topic_lower for word in ['travel', 'visit', 'place', 'destination', 'trip', 'vacation', 'city', 'country', 'island', 'beach']):
            variations = [
                [
                    f"Why {topic} Caught My Attention",
                    f"Planning Your {main_subject} Experience",
                    f"The Best Things About {topic}",
                    f"What Makes {topic} Stand Out",
                    f"Insider Tips for {topic}",
                    f"My Honest Take on {topic}"
                ],
                [
                    f"Discovering {topic}",
                    f"What You Should Know Before Visiting",
                    f"Top Experiences in {topic}",
                    f"Hidden Gems I Found",
                    f"Practical Advice for Travelers",
                    f"Would I Recommend {topic}?"
                ],
                [
                    f"My Journey to {topic}",
                    f"Essential Information About {topic}",
                    f"The Highlights You Can't Miss",
                    f"Unexpected Surprises",
                    f"Tips That Actually Help",
                    f"Final Verdict"
                ],
                [
                    f"Getting to Know {topic}",
                    f"Background and Context",
                    f"What I Loved Most",
                    f"Things That Surprised Me",
                    f"Lessons Learned",
                    f"Bottom Line"
                ]
            ]
            return random.choice(variations)
        
        # Food/Restaurant topics - DYNAMIC VARIATIONS
        elif any(word in topic_lower for word in ['food', 'restaurant', 'eat', 'cafe', 'coffee', 'dining', 'cuisine', 'dish', 'meal']):
            variations = [
                [
                    f"Why I'm Talking About {topic}",
                    f"What Makes {topic} Special",
                    f"My Favorite {main_subject} Picks",
                    f"The Dining Experience",
                    f"Is {topic} Worth Your Money?",
                    f"My Final Thoughts"
                ],
                [
                    f"Exploring {topic}",
                    f"What Sets {topic} Apart",
                    f"Top Recommendations",
                    f"The Atmosphere and Vibe",
                    f"Value for Money",
                    f"My Verdict"
                ],
                [
                    f"Let's Talk About {topic}",
                    f"The Unique Features",
                    f"What I Keep Coming Back For",
                    f"The Overall Experience",
                    f"Price vs Quality Analysis",
                    f"Wrapping Up"
                ],
                [
                    f"My Experience With {topic}",
                    f"What's Different Here",
                    f"My Go-To Choices",
                    f"The Complete Picture",
                    f"Worth It or Not?",
                    f"Last Word"
                ]
            ]
            return random.choice(variations)
        
        # Shopping/Product topics - DYNAMIC VARIATIONS
        elif any(word in topic_lower for word in ['best', 'top', 'review', 'product', 'buy', 'shop', 'purchase']):
            variations = [
                [
                    f"Why I Created This {topic} Guide",
                    f"Understanding {topic}",
                    f"Top {main_subject} Options",
                    f"What to Look For",
                    f"Common Buying Mistakes",
                    f"My Recommendations"
                ],
                [
                    f"Everything About {topic}",
                    f"Key Features to Consider",
                    f"Best {main_subject} Choices",
                    f"How to Choose Wisely",
                    f"What to Avoid",
                    f"Final Advice"
                ],
                [
                    f"The Complete {topic} Guide",
                    f"Important Factors",
                    f"Top-Rated {main_subject}",
                    f"Making the Right Choice",
                    f"Pitfalls to Skip",
                    f"Conclusion"
                ],
                [
                    f"Your {topic} Resource",
                    f"What Matters Most",
                    f"Best Options Available",
                    f"Smart Shopping Tips",
                    f"Mistakes I've Seen",
                    f"My Two Cents"
                ]
            ]
            return random.choice(variations)
        
        # How-to/Guide topics - DYNAMIC VARIATIONS
        elif any(word in topic_lower for word in ['how', 'guide', 'tips', 'ways', 'steps', 'learn']):
            variations = [
                [
                    f"Getting Started With {topic}",
                    f"The Fundamentals",
                    f"Step-by-Step Process",
                    f"Common Challenges",
                    f"Pro Tips and Tricks",
                    f"Wrapping Up"
                ],
                [
                    f"Understanding {topic}",
                    f"The Basics Explained",
                    f"Practical Implementation",
                    f"What to Watch Out For",
                    f"Advanced Strategies",
                    f"Final Thoughts"
                ],
                [
                    f"Mastering {topic}",
                    f"Core Principles",
                    f"Effective Techniques",
                    f"Avoiding Mistakes",
                    f"Expert Recommendations",
                    f"Conclusion"
                ],
                [
                    f"Your {topic} Journey",
                    f"Essential Knowledge",
                    f"Best Practices",
                    f"Pitfalls to Avoid",
                    f"My Advice",
                    f"That's It"
                ]
            ]
            return random.choice(variations)
        
        # General topics - DYNAMIC VARIATIONS
        else:
            variations = [
                [
                    f"Introduction to {topic}",
                    f"Key Aspects of {topic}",
                    f"What Works Best",
                    f"Common Mistakes",
                    f"My Recommendations",
                    f"Wrapping Up"
                ],
                [
                    f"Understanding {topic}",
                    f"Important Points",
                    f"Effective Approaches",
                    f"What to Avoid",
                    f"My Advice",
                    f"Final Thoughts"
                ],
                [
                    f"Exploring {topic}",
                    f"Core Concepts",
                    f"Proven Strategies",
                    f"Pitfalls to Skip",
                    f"What I Suggest",
                    f"Conclusion"
                ],
                [
                    f"All About {topic}",
                    f"Essential Information",
                    f"What Actually Works",
                    f"Mistakes to Avoid",
                    f"My Two Cents",
                    f"Bottom Line"
                ]
            ]
            return random.choice(variations)
    
    def _write_like_human(self, topic: str, h_tags: List[str], keywords: List[str], eeat_info: Dict) -> str:
        """Write content that sounds like a real person"""
        
        keywords_str = ", ".join(keywords) if keywords else topic
        
        # Generate unique seed for this specific post
        unique_seed = hash(f"{topic}{datetime.now().timestamp()}{random.random()}") % 1000000
        
        # Create ultra-human prompt with EXTREME UNIQUENESS emphasis
        prompt = f"""Write a LONG, DETAILED blog post about "{topic}" that sounds like a REAL PERSON wrote it.

🚨 CRITICAL: MAKE THIS POST COMPLETELY UNIQUE! 🚨

UNIQUENESS SEED: {unique_seed}

This post MUST be different from ANY other post you've written. Use this seed to generate completely unique:
- Opening style
- Writing voice
- Examples
- Stories
- Vocabulary
- Sentence structures
- Perspectives

CRITICAL: This needs to be AT LEAST 1500-2000 words MINIMUM. Write A LOT of content. Go deep. Share stories. Add details. DO NOT write less than 1500 words!

EXTREME UNIQUENESS REQUIREMENTS:

1. UNIQUE OPENING (Use seed {unique_seed % 10}):
   - Seed 0: Start with a surprising fact
   - Seed 1: Start with a personal story
   - Seed 2: Start with a question
   - Seed 3: Start with a bold statement
   - Seed 4: Start with a relatable scenario
   - Seed 5: Start with a confession
   - Seed 6: Start with a comparison
   - Seed 7: Start with a challenge
   - Seed 8: Start with an observation
   - Seed 9: Start with a recommendation

2. UNIQUE VOCABULARY (Rotate these):
   - Instead of "good": great, solid, decent, nice, quality, fine, excellent, wonderful, fantastic, superb
   - Instead of "bad": poor, weak, lacking, disappointing, subpar, not great, mediocre, underwhelming
   - Instead of "interesting": fascinating, intriguing, compelling, engaging, captivating, noteworthy
   - Mix them up! Don't use the same words as other posts!

3. UNIQUE EXAMPLES (Make them specific):
   - Use different time references: "last summer", "a few months ago", "recently", "back in 2023", "last year"
   - Different people: "my friend Sarah", "my colleague", "someone I met", "a local", "my neighbor"
   - Different locations: specific street names, neighborhoods, cities
   - Different prices: "$15", "$20-25", "around $30", "less than $10"
   - Different times: "around 8am", "late afternoon", "early evening", "midday"

4. UNIQUE SENTENCE PATTERNS (Vary wildly):
   - Some posts: Short. Punchy. Direct.
   - Other posts: Longer, flowing sentences that connect multiple ideas together.
   - This post: Mix it up completely. No pattern. Keep readers guessing.

5. UNIQUE PERSPECTIVE (Choose one for THIS post):
   - Enthusiastic explorer
   - Skeptical but convinced
   - Experienced veteran
   - Curious newcomer
   - Practical advisor
   - Passionate advocate
   - Honest critic
   - Balanced reviewer

6. UNIQUE STORIES (Create NEW scenarios):
   - Don't repeat the same "I went there last summer" story
   - Create fresh, specific anecdotes
   - Use different emotions: excited, surprised, skeptical, amazed, disappointed then impressed
   - Different outcomes: exceeded expectations, met expectations, surprised positively, had mixed feelings

CRITICAL RULES - MUST FOLLOW:

1. WRITE LIKE YOU'RE TEXTING A FRIEND
   - Use casual language
   - Short sentences mixed with longer ones
   - Natural flow, not structured
   - Add personal opinions
   - Use contractions (I'm, you're, it's, don't, can't)

2. ADD HUMAN IMPERFECTIONS
   - Start sentences with "And" or "But"
   - Use "like", "you know", "I mean" occasionally
   - Add personal anecdotes
   - Show uncertainty sometimes ("I think", "maybe", "probably")
   - Use casual phrases ("pretty cool", "really good", "not bad")

3. BANNED AI PHRASES - NEVER USE:
   - "delve into"
   - "comprehensive"
   - "robust"
   - "leverage"
   - "seamless"
   - "cutting-edge"
   - "state-of-the-art"
   - "game-changer"
   - "revolutionize"
   - "unlock"
   - "harness"
   - "elevate"
   - "optimize"
   - "streamline"

4. WRITE NATURALLY
   - Don't use bullet points or numbered lists
   - Write in paragraphs
   - Vary paragraph length (some short, some long)
   - Add transitions naturally
   - Use everyday words

5. BE CONVERSATIONAL
   - Ask rhetorical questions
   - Address reader directly ("you", "your")
   - Share personal experiences
   - Admit when you don't know something
   - Show personality

6. STRUCTURE - Use these headings with IDs:
{chr(10).join([f'<h2 id="{re.sub(r"[^a-z0-9]+", "-", tag.lower()).strip("-")}">{tag}</h2>' for tag in h_tags])}

7. TONE
   - Friendly and approachable
   - Not too formal
   - Not too casual
   - Like talking to a friend over coffee

8. EXAMPLES OF GOOD WRITING:
   - "So I tried this place last week. And honestly? Pretty impressed."
   - "Look, I'm not saying it's perfect. But it's definitely worth checking out."
   - "Here's the thing though. You gotta go early. Trust me on this."
   - "I mean, yeah, it's a bit pricey. But the quality makes up for it."

9. WRITE LONG SECTIONS:
   - Each section should be 400-600 words minimum
   - Don't rush through topics
   - Add multiple examples per section
   - Share detailed stories
   - Include specific details (prices, times, locations, names)
   - Compare different options
   - Mention pros and cons naturally
   - Add personal experiences throughout
   - Give practical tips and advice
   - Make it comprehensive but conversational

9. KEYWORDS to mention naturally: {keywords_str}

10. LENGTH: MINIMUM 1500 WORDS - THIS IS MANDATORY!
    - You MUST write at least 1500 words
    - Each section should be 250-400 words minimum
    - Write LOTS of content
    - Go deep into details
    - Share multiple examples
    - Tell several stories
    - Add lots of personal experiences
    - Make it comprehensive but natural
    - DO NOT STOP until you have written 1500+ words!

11. MAKE IT LONG AND DETAILED:
    - Each section should be 250-400 words MINIMUM
    - Add specific examples and stories
    - Include personal anecdotes
    - Share tips and advice
    - Mention specific details (prices, times, names)
    - Add comparisons
    - Include pros and cons naturally
    - KEEP WRITING until you reach 1500+ words!

12. RICH, HUMANIZED CONTENT REQUIREMENTS:
    - Write with depth and substance
    - Add emotional elements (excitement, surprise, disappointment, joy)
    - Include sensory details (what you saw, heard, smelled, tasted, felt)
    - Share real experiences with specific details
    - Add dialogue or quotes when relevant
    - Include timestamps and dates for authenticity
    - Mention real people (friends, locals, staff)
    - Add location-specific details (street names, neighborhoods)
    - Include price ranges and value assessments
    - Share both positive and negative aspects honestly
    - Add context and background information
    - Connect with reader's potential experiences
    - Use vivid descriptions
    - Include practical, actionable advice

13. SEO OPTIMIZATION:
    - Naturally incorporate keywords throughout
    - Use semantic variations of keywords
    - Include long-tail keyword phrases
    - Add location-specific terms when relevant
    - Use question-based subheadings naturally
    - Include related terms and synonyms
    - Write for humans first, search engines second

14. SCHEMA OPTIMIZATION:
    - Structure content logically
    - Use clear hierarchical headings
    - Include specific data points (dates, prices, locations)
    - Add factual information
    - Include expert insights
    - Mention credentials or experience when relevant

WRITE LIKE A HUMAN BLOGGER, NOT AN AI!

Start with the first <h2> heading. Use <p> tags for paragraphs. NO markdown, NO bullet points, NO numbered lists.

Write NOW:"""

        try:
            # Try OpenRouter first (more reliable, no quota issues)
            if self.openrouter_key:
                try:
                    print(f"[Ultra Human] Calling OpenRouter API...", file=sys.stderr, flush=True)
                    
                    response = requests.post(
                        "https://openrouter.ai/api/v1/chat/completions",
                        headers={
                            "Authorization": f"Bearer {self.openrouter_key}",
                            "Content-Type": "application/json"
                        },
                        json={
                            "model": "google/gemini-2.0-flash-exp:free",
                            "messages": [{"role": "user", "content": prompt}],
                            "temperature": random.uniform(0.9, 1.0),
                            "max_tokens": 8000
                        },
                        timeout=90
                    )
                    
                    if response.status_code == 200:
                        result = response.json()
                        if "choices" in result and len(result["choices"]) > 0:
                            content = result["choices"][0]["message"]["content"]
                            content = self._clean_content(content)
                            print(f"[Ultra Human] ✅ Generated with OpenRouter!", file=sys.stderr, flush=True)
                            return content
                    else:
                        print(f"[Ultra Human] OpenRouter status: {response.status_code}", file=sys.stderr, flush=True)
                except Exception as e:
                    print(f"[Ultra Human] OpenRouter failed: {e}", file=sys.stderr, flush=True)
            
            # Fallback to Google AI
            models = ["gemini-2.0-flash-exp", "gemini-exp-1206", "gemini-2.0-flash"]
            
            for model in models:
                try:
                    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={self.google_api_key}"
                    
                    # High temperature for more human-like variation
                    temperature = random.uniform(0.9, 1.0)
                    
                    response = requests.post(url, 
                        headers={"Content-Type": "application/json"},
                        json={
                            "contents": [{"parts": [{"text": prompt}]}],
                            "generationConfig": {
                                "temperature": temperature,
                                "topK": random.randint(40, 50),
                                "topP": random.uniform(0.92, 0.98),
                                "maxOutputTokens": 8000  # Increased for longer content
                            }
                        },
                        timeout=60
                    )
                    
                    if response.status_code == 200:
                        result = response.json()
                        if "candidates" in result and len(result["candidates"]) > 0:
                            content = result["candidates"][0]["content"]["parts"][0]["text"]
                            
                            # Clean up
                            content = self._clean_content(content)
                            
                            print(f"[Ultra Human] ✅ Generated with {model}", file=sys.stderr, flush=True)
                            return content
                except Exception as e:
                    print(f"[Ultra Human] Model {model} failed: {e}", file=sys.stderr, flush=True)
                    continue
            
            return self._fallback_content(topic, h_tags)
            
        except Exception as e:
            print(f"[Ultra Human] Error: {e}", file=sys.stderr, flush=True)
            return self._fallback_content(topic, h_tags)
    
    def _clean_content(self, content: str) -> str:
        """Clean content from AI markers"""
        
        # Remove code block markers
        content = content.strip()
        if content.startswith('```html'):
            content = content[7:]
        if content.startswith('```'):
            content = content[3:]
        if content.endswith('```'):
            content = content[:-3]
        content = content.strip()
        
        # Remove any remaining markdown
        content = re.sub(r'\*\*([^*]+)\*\*', r'\1', content)  # Remove bold
        content = re.sub(r'\*([^*]+)\*', r'\1', content)  # Remove italic
        content = re.sub(r'^#+\s+', '', content, flags=re.MULTILINE)  # Remove markdown headings
        
        # Remove numbered lists (convert to paragraphs)
        content = re.sub(r'^\d+\.\s+', '', content, flags=re.MULTILINE)
        
        # Remove bullet points (convert to paragraphs)
        content = re.sub(r'^[\*\-]\s+', '', content, flags=re.MULTILINE)
        
        return content
    
    def _extract_headings(self, content: str) -> List[Dict]:
        """Extract H2 headings"""
        headings = []
        h2_pattern = r'<h2[^>]*id="([^"]*)"[^>]*>([^<]+)</h2>'
        matches = re.findall(h2_pattern, content)
        
        for heading_id, text in matches:
            headings.append({'id': heading_id, 'text': text.strip()})
        
        return headings
    
    def _generate_toc(self, headings: List[Dict]) -> str:
        """Generate rich, SEO-optimized Table of Contents"""
        if not headings:
            return ""
        
        toc_html = '''
<div class="table-of-contents" itemscope itemtype="https://schema.org/ItemList" style="background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); padding: 25px; border-radius: 10px; margin: 30px 0; border-left: 5px solid #2c3e50; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <h2 style="margin-top: 0; margin-bottom: 15px; font-size: 22px; color: #2c3e50; font-weight: 600;">📋 Table of Contents</h2>
    <ol style="list-style: decimal; padding-left: 25px; line-height: 2; margin: 0;">
'''
        
        for idx, heading in enumerate(headings):
            toc_html += f'        <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" style="margin: 10px 0;"><meta itemprop="position" content="{idx + 1}" /><a itemprop="url" href="#{heading["id"]}" style="color: #2c3e50; text-decoration: none; font-weight: 500; transition: color 0.3s;"><span itemprop="name">{heading["text"]}</span></a></li>\n'
        
        toc_html += '    </ol>\n</div>\n\n'
        return toc_html
    
    def _get_images(self, topic: str, num_images: int) -> List[Dict]:
        """Get ACCURATE, RELEVANT images with improved search queries"""
        images = []
        
        try:
            if self.serpapi_key:
                # Create BETTER search variations for more accurate results
                topic_lower = topic.lower()
                
                # Smart search query based on topic type
                if any(word in topic_lower for word in ['travel', 'visit', 'place', 'destination', 'city', 'country']):
                    search_variations = [
                        f"{topic} travel photography",
                        f"{topic} destination",
                        f"{topic} tourist attractions",
                        f"{topic} scenic views",
                        f"{topic} landmarks"
                    ]
                elif any(word in topic_lower for word in ['food', 'restaurant', 'eat', 'cafe', 'cuisine', 'dish']):
                    search_variations = [
                        f"{topic} food photography",
                        f"{topic} dishes",
                        f"{topic} restaurant",
                        f"{topic} culinary",
                        f"{topic} gourmet"
                    ]
                elif any(word in topic_lower for word in ['product', 'review', 'best', 'top']):
                    search_variations = [
                        f"{topic} product photography",
                        f"{topic} high quality",
                        f"{topic} professional",
                        f"{topic} detailed",
                        f"{topic} showcase"
                    ]
                else:
                    # General topics - use descriptive terms
                    search_variations = [
                        f"{topic} professional photography",
                        f"{topic} high quality images",
                        f"{topic} detailed photos",
                        f"{topic} HD photography",
                        f"{topic} visual guide"
                    ]
                
                # Randomly select search variation for uniqueness
                search_query = random.choice(search_variations).replace(' ', '+')
                
                # Add random start parameter to get different results each time
                start_param = random.randint(0, 30)
                
                # Add image type filter for better quality
                url = f"https://serpapi.com/search.json?engine=google_images&q={search_query}&num={num_images}&start={start_param}&tbm=isch&tbs=isz:l&api_key={self.serpapi_key}"
                
                print(f"[Images] Searching: {search_query} (start: {start_param})", file=sys.stderr, flush=True)
                
                response = requests.get(url, timeout=15)
                
                if response.status_code == 200:
                    data = response.json()
                    image_results = data.get('images_results', [])
                    
                    print(f"[Images] Found {len(image_results)} results", file=sys.stderr, flush=True)
                    
                    for img in image_results[:num_images]:
                        # Get the best quality image URL
                        img_url = img.get('original', img.get('thumbnail', ''))
                        
                        # Create clean alt text (no captions needed)
                        alt_text = topic
                        
                        images.append({
                            "url": img_url,
                            "alt": alt_text,
                            "caption": ""  # Empty caption - we don't use it anymore
                        })
                    
                    if images:
                        print(f"[Images] ✅ Got {len(images)} accurate images", file=sys.stderr, flush=True)
                        return images
        except Exception as e:
            print(f"[Images] Error: {e}", file=sys.stderr, flush=True)
            pass
        
        # Fallback to Picsum with UNIQUE seeds
        print(f"[Images] Using Picsum fallback", file=sys.stderr, flush=True)
        for i in range(num_images):
            # Use timestamp + random for truly unique seeds
            unique_seed = hash(f"{topic}{i}{datetime.now().timestamp()}{random.random()}") % 10000
            images.append({
                "url": f"https://picsum.photos/seed/{unique_seed}/800/600",
                "alt": topic,
                "caption": ""  # Empty caption
            })
        
        return images
    
    def _insert_images_naturally(self, content: str, images: List[Dict]) -> str:
        """Insert MANY images throughout the content - NO CAPTIONS, just clean images"""
        if not images:
            return content
        
        parts = re.split(r'(<h2[^>]*>.*?</h2>)', content)
        result = []
        image_index = 0
        
        for i, part in enumerate(parts):
            result.append(part)
            
            # Add image after EVERY heading (more images!)
            if part.startswith('<h2') and image_index < len(images):
                img = images[image_index]
                # NO FIGCAPTION - just clean image
                img_html = f'''
<figure style="margin: 30px 0; text-align: center;">
    <img src="{img['url']}" alt="{img['alt']}" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" loading="lazy" />
</figure>
'''
                result.append(img_html)
                image_index += 1
        
        # If we still have images left, add them between paragraphs
        if image_index < len(images):
            content_with_images = ''.join(result)
            paragraphs = content_with_images.split('</p>')
            
            # Calculate spacing for remaining images
            remaining_images = len(images) - image_index
            if remaining_images > 0 and len(paragraphs) > 1:
                spacing = max(1, len(paragraphs) // (remaining_images + 1))
                
                final_result = []
                para_count = 0
                
                for para in paragraphs:
                    if para.strip():
                        final_result.append(para + '</p>')
                        para_count += 1
                        
                        # Insert image every few paragraphs
                        if para_count % spacing == 0 and image_index < len(images):
                            img = images[image_index]
                            # NO FIGCAPTION - just clean image
                            img_html = f'''
<figure style="margin: 30px 0; text-align: center;">
    <img src="{img['url']}" alt="{img['alt']}" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" loading="lazy" />
</figure>
'''
                            final_result.append(img_html)
                            image_index += 1
                
                return ''.join(final_result)
        
        return ''.join(result)
    
    def _add_references(self, references: List[str]) -> str:
        """Add references section"""
        refs_html = '''
<div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd;">
    <h2>References</h2>
    <ul style="line-height: 1.8;">
'''
        for ref in references:
            refs_html += f'        <li><a href="{ref}" target="_blank" rel="noopener">{ref}</a></li>\n'
        
        refs_html += '    </ul>\n</div>\n'
        return refs_html
    
    def _wrap_content(self, toc: str, content: str, title: str) -> str:
        """Wrap content in SEO-optimized article tags with Schema markup"""
        current_date = datetime.now().isoformat()
        
        return f'''
<article itemscope itemtype="https://schema.org/Article" style="max-width: 1200px; margin: 0 auto; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.8; color: #333;">
    <meta itemprop="headline" content="{title}">
    <meta itemprop="datePublished" content="{current_date}">
    <meta itemprop="dateModified" content="{current_date}">
    <meta itemprop="inLanguage" content="en-US">
    <meta itemprop="isFamilyFriendly" content="true">
    
    <div itemprop="author" itemscope itemtype="https://schema.org/Person" style="display: none;">
        <meta itemprop="name" content="Expert Content Writer">
    </div>
    
    <div itemprop="publisher" itemscope itemtype="https://schema.org/Organization" style="display: none;">
        <meta itemprop="name" content="Content Publishing Platform">
    </div>
    
    {toc}
    
    <div class="article-content" itemprop="articleBody" style="font-size: 18px; line-height: 1.8;">
        {content}
    </div>
</article>
'''
    
    def _generate_seo(self, topic: str, keywords: List[str]) -> Dict:
        """Generate SEO metadata"""
        slug = re.sub(r'[^a-z0-9]+', '-', topic.lower()).strip('-')[:50]
        keywords_str = ', '.join(keywords) if keywords else topic
        meta_desc = f"Everything you need to know about {topic}. Real insights and practical tips."[:155]
        
        return {
            "slug": slug,
            "metaDescription": meta_desc,
            "keywords": keywords_str,
            "focusKeyword": keywords[0] if keywords else topic
        }
    
    def _generate_schema(self, topic: str, headings: List[Dict], eeat_info: Dict) -> Dict:
        """Generate comprehensive Schema markup for SEO"""
        
        author_name = eeat_info.get('authorName', 'Expert Content Writer')
        credentials = eeat_info.get('credentials', 'Professional Writer')
        experience = eeat_info.get('experienceYears', '5+ years')
        
        return {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": topic,
            "description": f"Comprehensive guide about {topic} with expert insights and practical advice",
            "author": {
                "@type": "Person",
                "name": author_name,
                "jobTitle": credentials,
                "description": f"{credentials} with {experience} of experience"
            },
            "publisher": {
                "@type": "Organization",
                "name": "Content Publishing Platform",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://example.com/logo.png"
                }
            },
            "datePublished": datetime.now().isoformat(),
            "dateModified": datetime.now().isoformat(),
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": f"#{re.sub(r'[^a-z0-9]+', '-', topic.lower()).strip('-')}"
            },
            "articleSection": [h['text'] for h in headings],
            "wordCount": "1500-2000",
            "articleBody": f"Detailed article about {topic}",
            "inLanguage": "en-US",
            "isFamilyFriendly": True
        }
    
    def _fallback_content(self, topic: str, h_tags: List[str]) -> str:
        """Fallback content if AI fails - generates 1500+ words"""
        if not h_tags:
            h_tags = [
                f"Introduction to {topic}",
                f"Understanding {topic}",
                f"Key Benefits of {topic}",
                f"How to Get Started with {topic}",
                f"Common Mistakes to Avoid",
                f"Expert Tips and Recommendations",
                f"Final Thoughts on {topic}"
            ]
        
        content = ""
        
        # Introduction section - 200+ words
        tag_id = re.sub(r'[^a-z0-9]+', '-', h_tags[0].lower()).strip('-')
        content += f'<h2 id="{tag_id}">{h_tags[0]}</h2>\n\n'
        content += f'<p>So I wanted to talk about {topic} today. Been thinking about this for a while now, and I figured it was time to share what I\'ve learned. Look, I know there\'s a lot of information out there about {topic}, and honestly, some of it is pretty confusing. That\'s why I wanted to put together something that actually makes sense.</p>\n\n'
        content += f'<p>Here\'s the thing about {topic} - it\'s one of those subjects that seems complicated at first, but once you get the basics down, everything starts to click. I remember when I first started learning about this stuff, I was completely overwhelmed. There were so many different opinions, so many different approaches, and I had no idea where to start.</p>\n\n'
        content += f'<p>But after spending a lot of time researching, talking to people who know their stuff, and just experimenting on my own, I\'ve come to understand {topic} pretty well. And that\'s what I want to share with you today. Not some complicated technical breakdown, but real, practical information that you can actually use.</p>\n\n'
        
        # Middle sections - 200+ words each
        for i, tag in enumerate(h_tags[1:-1], 1):
            tag_id = re.sub(r'[^a-z0-9]+', '-', tag.lower()).strip('-')
            content += f'<h2 id="{tag_id}">{tag}</h2>\n\n'
            
            content += f'<p>Now let\'s talk about {tag.lower()}. This is actually one of the most important aspects of {topic}, and I think a lot of people overlook it. From what I\'ve seen, understanding this part can really make or break your experience.</p>\n\n'
            
            content += f'<p>When I first started exploring this area, I made a bunch of mistakes. And honestly, that\'s okay - that\'s how you learn. But if I can help you avoid some of those same mistakes, then this whole article is worth it. The key thing to remember here is that {topic} isn\'t just about one thing. It\'s about understanding how all the pieces fit together.</p>\n\n'
            
            content += f'<p>One thing that really helped me was talking to people who had been doing this for years. They shared insights that you just can\'t find in books or online articles. Real, practical advice based on actual experience. And that\'s the kind of information I want to pass on to you.</p>\n\n'
            
            content += f'<p>Another important point about {tag.lower()} is that it\'s not a one-size-fits-all situation. What works for one person might not work for another. That\'s why it\'s so important to experiment and find what works best for your specific situation. Don\'t be afraid to try different approaches and see what gives you the best results.</p>\n\n'
            
            content += f'<p>I\'ve also noticed that a lot of people get stuck on the details and forget about the big picture. Yes, the details matter, but they only matter in the context of your overall goals. So before you dive too deep into the specifics, make sure you have a clear understanding of what you\'re trying to achieve with {topic}.</p>\n\n'
        
        # Conclusion section - 200+ words
        tag_id = re.sub(r'[^a-z0-9]+', '-', h_tags[-1].lower()).strip('-')
        content += f'<h2 id="{tag_id}">{h_tags[-1]}</h2>\n\n'
        content += f'<p>Alright, so that pretty much covers what I wanted to share about {topic}. I hope this has been helpful and given you some practical insights that you can actually use. Remember, the most important thing is to just get started. Don\'t wait until you know everything - that day will never come.</p>\n\n'
        content += f'<p>If there\'s one thing I want you to take away from this, it\'s that {topic} is totally achievable. It might seem overwhelming at first, but if you break it down into smaller steps and focus on one thing at a time, you\'ll be surprised at how quickly you can make progress.</p>\n\n'
        content += f'<p>And hey, if you have any questions about {topic}, feel free to reach out. I\'m always happy to chat about this stuff and help where I can. We\'re all learning together, and there\'s no such thing as a stupid question. The only stupid thing is not asking when you need help.</p>\n\n'
        content += f'<p>Thanks for reading, and good luck with your {topic} journey. I know you\'ve got this. Just take it one step at a time, stay consistent, and don\'t give up when things get tough. That\'s really the secret to success with anything, including {topic}. Now go out there and make it happen!</p>\n\n'
        
        return content


def main():
    """Main entry point"""
    try:
        config_json = sys.stdin.read()
        config = json.loads(config_json)
        
        writer = UltraHumanWriter()
        result = writer.generate_human_content(config)
        
        print(json.dumps(result))
        sys.stdout.flush()
        
    except Exception as e:
        error_result = {
            "error": str(e),
            "title": "Error",
            "content": f"<p>Error generating content: {str(e)}</p>",
            "images": []
        }
        print(json.dumps(error_result))
        sys.stdout.flush()
        sys.exit(1)


if __name__ == "__main__":
    main()
