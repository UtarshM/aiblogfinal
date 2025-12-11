"""
Professional Human Content Writer - Enterprise Grade
Zero Errors, Maximum Authenticity
Author: Harsh J Kuhikar
Edition: 2025 - Professional Writing Engine v3.0
"""

import requests
import json
import os
import random
import re
from typing import Dict, List
from dotenv import load_dotenv
from urllib.parse import quote

load_dotenv()


class ProfessionalHumanWriter:
    """
    Enterprise-grade content humanization without introducing errors.
    Focus: Natural variation, authentic voice, sophisticated AI pattern breaking.
    """
    
    def __init__(self):
        self.google_api_key = os.getenv("GOOGLE_AI_KEY")
        
    def write_content(self, topic: str, word_count: int, num_images: int,
                     tone: str, audience: str, include_stats: bool) -> Dict:
        """Generate professional, human-like content"""
        import sys
        sys.stdout.flush()
        print(f"[WRITE_CONTENT] START - Topic: {topic}, Images: {num_images}", flush=True)
        
        print(f"[CONTENT] Fetching {num_images} images for: {topic}", flush=True)
        images = self._get_images(topic, num_images)
        print(f"[CONTENT] Got {len(images)} images", flush=True)
        
        print(f"[CONTENT] Generating content...")
        content = self._generate_content(topic, word_count, tone, audience, include_stats)
        print(f"[CONTENT] Content generated: {len(content)} chars")
        
        if content:
            # INSERT IMAGES FIRST - before humanization destroys paragraph structure
            print(f"[CONTENT] Inserting {len(images)} images BEFORE humanization...")
            paragraphs_before = len(content.split('\n\n'))
            print(f"[CONTENT] Paragraphs before insert: {paragraphs_before}", flush=True)
            content = self._insert_images(content, images)
            print(f"[CONTENT] Images inserted. Has markdown: {'![' in content}", flush=True)
            
            # Professional humanization - no errors, just natural variation
            print(f"[CONTENT] Humanizing content...")
            content = self._humanize_professionally(content)
            print(f"[CONTENT] Content humanized: {len(content)} chars")
            print(f"[CONTENT] After humanization, still has images: {'![' in content}", flush=True)
        
        return {
            "title": topic,
            "content": content or self._fallback_content(topic),
            "images": images
        }
    
    def _generate_content(self, topic: str, word_count: int, tone: str, 
                         audience: str, include_stats: bool) -> str:
        """Generate content using AI with professional humanization prompt"""
        
        prompt = self._build_professional_prompt(topic, word_count, tone, audience)
        
        try:
            if not self.google_api_key:
                return None
            
            # Try multiple models in order of preference
            models_to_try = [
                "gemini-exp-1206",           # Latest experimental (Dec 2024)
                "gemini-2.0-flash-exp",      # 2.0 Flash experimental
                "gemini-2.0-flash-thinking-exp",  # Thinking mode
                "gemini-2.0-flash",          # Stable 2.0
            ]
            
            headers = {"Content-Type": "application/json"}
            data = {
                "contents": [{"parts": [{"text": prompt}]}],
                "generationConfig": {
                    "temperature": 0.85,  # Higher for more variation
                    "topK": 50,
                    "topP": 0.92,
                    "maxOutputTokens": 2400
                }
            }
            
            for model in models_to_try:
                try:
                    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={self.google_api_key}"
                    print(f"[INFO] Trying model: {model}")
                    
                    response = requests.post(url, headers=headers, json=data, timeout=40)
                    
                    if response.status_code == 200:
                        result = response.json()
                        if "candidates" in result and result["candidates"]:
                            candidate = result["candidates"][0]
                            if "content" in candidate and "parts" in candidate["content"]:
                                parts = candidate["content"]["parts"]
                                if parts and "text" in parts[0]:
                                    print(f"[SUCCESS] Using model: {model}")
                                    return parts[0]["text"]
                    else:
                        print(f"[WARN] Model {model} returned status {response.status_code}")
                except Exception as e:
                    print(f"[WARN] Model {model} failed: {e}")
                    continue
            
            print(f"[ERROR] All models failed")
            return None
            
        except Exception as e:
            print(f"Content generation error: {e}")
            return None
    
    def _build_professional_prompt(self, topic: str, word_count: int, 
                                   tone: str, audience: str) -> str:
        """Build a sophisticated prompt that generates naturally human content"""
        
        return f"""Write a {word_count}-word article about: {topic}

WRITING STYLE REQUIREMENTS:

1. AUTHENTICITY OVER PERFECTION
   - Write naturally, as if explaining to a colleague
   - Vary sentence length organically (mix 5-word and 25-word sentences)
   - Use active voice predominantly
   - Include personal perspective where appropriate

2. AVOID AI PATTERNS
   - NO repetitive sentence structures
   - NO formulaic transitions (However, Moreover, Furthermore)
   - NO rhetorical questions as filler
   - NO dramatic conclusions or call-to-actions
   - NO overuse of adjectives or superlatives

3. NATURAL LANGUAGE
   - Use contractions naturally (it's, don't, can't)
   - Prefer simple words over complex ones
   - Break grammar rules when it sounds more natural
   - Use occasional fragments for emphasis
   - Vary paragraph length (2-6 sentences)

4. CONTENT STRUCTURE
   - Start directly - no "In this article" or "Let's explore"
   - Present information conversationally
   - Use specific examples over generic statements
   - End naturally - no summary or call-to-action

5. TONE: {tone}
   - Professional but approachable
   - Confident without being preachy
   - Informative without being encyclopedic

Write the article now. Start directly with the content."""

    def _humanize_professionally(self, content: str) -> str:
        """
        Professional humanization through sophisticated pattern breaking.
        NO typos, NO errors - just natural variation.
        """
        
        # Step 1: Remove AI signature patterns
        content = self._remove_ai_signatures(content)
        
        # Step 2: Vary sentence structure
        content = self._vary_sentence_structure(content)
        
        # Step 3: Simplify formal language
        content = self._simplify_language(content)
        
        # Step 4: Break repetitive patterns
        content = self._break_repetition(content)
        
        # Step 5: Normalize paragraph structure
        content = self._normalize_paragraphs(content)
        
        # Step 6: Clean up artifacts
        content = self._clean_artifacts(content)
        
        return content.strip()
    
    def _remove_ai_signatures(self, content: str) -> str:
        """Remove obvious AI-generated patterns"""
        
        # Remove AI-style endings
        ai_endings = [
            r'Let me know.*?[.!]',
            r'Feel free to.*?[.!]',
            r'Hope this helps.*?[.!]',
            r'If you have any questions.*?[.!]',
            r'Don\'t hesitate to.*?[.!]',
            r'In conclusion,.*?[.!]',
            r'To sum up,.*?[.!]',
            r'In summary,.*?[.!]',
        ]
        
        for pattern in ai_endings:
            content = re.sub(pattern, '', content, flags=re.IGNORECASE | re.DOTALL)
        
        # Remove AI-style introductions
        ai_intros = [
            r'^In this article,.*?[.!]\s*',
            r'^Let\'s explore.*?[.!]\s*',
            r'^Today, we\'ll.*?[.!]\s*',
            r'^This article will.*?[.!]\s*',
        ]
        
        for pattern in ai_intros:
            content = re.sub(pattern, '', content, flags=re.IGNORECASE | re.MULTILINE)
        
        # Remove formal transitions
        formal_transitions = {
            r'\bHowever,\s': 'But ',
            r'\bMoreover,\s': 'Also, ',
            r'\bFurthermore,\s': 'Plus, ',
            r'\bTherefore,\s': 'So ',
            r'\bConsequently,\s': 'As a result, ',
            r'\bNevertheless,\s': 'Still, ',
            r'\bAdditionally,\s': 'Also, ',
        }
        
        for formal, casual in formal_transitions.items():
            content = re.sub(formal, casual, content)
        
        return content
    
    def _vary_sentence_structure(self, content: str) -> str:
        """Introduce natural variation in sentence structure"""
        
        paragraphs = content.split('\n\n')
        varied_paragraphs = []
        
        for para in paragraphs:
            if not para.strip():
                continue
                
            sentences = re.split(r'(?<=[.!?])\s+', para)
            
            # Randomly combine short sentences (under 8 words)
            varied_sentences = []
            i = 0
            while i < len(sentences):
                current_sentence = sentences[i].strip()
                
                # Skip empty sentences
                if not current_sentence:
                    i += 1
                    continue
                
                if i < len(sentences) - 1:
                    next_sentence = sentences[i + 1].strip()
                    
                    # Skip if next sentence is empty
                    if not next_sentence:
                        varied_sentences.append(current_sentence)
                        i += 1
                        continue
                    
                    current_words = len(current_sentence.split())
                    next_words = len(next_sentence.split())
                    
                    # Combine if both are short and random chance
                    if current_words < 8 and next_words < 8 and random.random() < 0.3 and len(next_sentence) > 0:
                        # Safely combine sentences
                        base = current_sentence.rstrip('.!?')
                        next_lower = next_sentence[0].lower() + next_sentence[1:] if len(next_sentence) > 1 else next_sentence.lower()
                        combined = base + ', ' + next_lower
                        varied_sentences.append(combined)
                        i += 2
                        continue
                
                varied_sentences.append(current_sentence)
                i += 1
            
            if varied_sentences:
                varied_paragraphs.append(' '.join(varied_sentences))
        
        return '\n\n'.join(varied_paragraphs)
    
    def _simplify_language(self, content: str) -> str:
        """Replace formal/complex words with simpler alternatives"""
        
        simplifications = {
            r'\butilize\b': 'use',
            r'\bcommence\b': 'start',
            r'\bterminate\b': 'end',
            r'\bapproximately\b': 'about',
            r'\bnumerous\b': 'many',
            r'\bdemonstrate\b': 'show',
            r'\bfacilitate\b': 'help',
            r'\bimplement\b': 'use',
            r'\bleverage\b': 'use',
            r'\boptimize\b': 'improve',
            r'\bparadigm\b': 'model',
            r'\bsynergize\b': 'work together',
            r'\bstreamline\b': 'simplify',
        }
        
        for formal, simple in simplifications.items():
            content = re.sub(formal, simple, content, flags=re.IGNORECASE)
        
        return content
    
    def _break_repetition(self, content: str) -> str:
        """Identify and break repetitive patterns"""
        
        # Track sentence beginnings
        sentences = re.split(r'(?<=[.!?])\s+', content)
        seen_starts = {}
        modified_sentences = []
        
        for sentence in sentences:
            words = sentence.split()
            if len(words) < 3:
                modified_sentences.append(sentence)
                continue
            
            # Get first 2-3 words as pattern
            start_pattern = ' '.join(words[:2]).lower()
            
            if start_pattern in seen_starts:
                seen_starts[start_pattern] += 1
                
                # If we've seen this start 2+ times, modify it
                if seen_starts[start_pattern] >= 2:
                    # Try to rephrase by moving a clause
                    if ',' in sentence:
                        parts = sentence.split(',', 1)
                        if len(parts) == 2:
                            # Swap parts
                            sentence = parts[1].strip() + ', ' + parts[0].lower()
                    
            else:
                seen_starts[start_pattern] = 1
            
            modified_sentences.append(sentence)
        
        return ' '.join(modified_sentences)
    
    def _normalize_paragraphs(self, content: str) -> str:
        """Create natural paragraph variation"""
        
        paragraphs = [p.strip() for p in content.split('\n\n') if p.strip()]
        
        if len(paragraphs) < 3:
            return content
        
        normalized = []
        i = 0
        
        while i < len(paragraphs):
            para = paragraphs[i]
            sentences = re.split(r'(?<=[.!?])\s+', para)
            
            # If paragraph is very short (1-2 sentences) and next exists, consider merging
            if len(sentences) <= 2 and i < len(paragraphs) - 1 and random.random() < 0.4:
                normalized.append(para + ' ' + paragraphs[i + 1])
                i += 2
            # If paragraph is very long (8+ sentences), consider splitting
            elif len(sentences) >= 8 and random.random() < 0.5:
                mid = len(sentences) // 2
                normalized.append(' '.join(sentences[:mid]))
                normalized.append(' '.join(sentences[mid:]))
                i += 1
            else:
                normalized.append(para)
                i += 1
        
        return '\n\n'.join(normalized)
    
    def _clean_artifacts(self, content: str) -> str:
        """Clean up any formatting artifacts"""
        
        # Fix spacing
        content = re.sub(r'\s+', ' ', content)
        content = re.sub(r'\s+([.,!?;:])', r'\1', content)
        
        # Fix multiple punctuation
        content = re.sub(r'\.{2,}', '.', content)
        content = re.sub(r'!{2,}', '!', content)
        content = re.sub(r'\?{2,}', '?', content)
        
        # Fix paragraph spacing
        content = re.sub(r'\n{3,}', '\n\n', content)
        
        # Remove trailing whitespace
        lines = [line.rstrip() for line in content.split('\n')]
        content = '\n'.join(lines)
        
        return content
    
    def _get_images(self, topic: str, num_images: int) -> List[Dict]:
        """
        Get high-quality, topic-relevant HD images using SerpApi (Google Images).
        SerpApi provides actual Google Images results - best for any topic.
        """
        
        images = []
        
        try:
            from urllib.parse import quote
            
            # PRIMARY: SerpApi - Google Images (Best for all topics)
            serpapi_key = os.getenv("SERPAPI_KEY")
            
            if serpapi_key and serpapi_key != "YOUR_SERPAPI_KEY_HERE":
                print(f"[INFO] Using SerpApi (Google Images) for: {topic}")
                
                # SerpApi endpoint for Google Images
                url = "https://serpapi.com/search"
                params = {
                    "engine": "google_images",
                    "q": topic,
                    "api_key": serpapi_key,
                    "num": num_images,
                    "ijn": "0"
                }
                
                response = requests.get(url, params=params, timeout=15)
                
                if response.status_code == 200:
                    data = response.json()
                    print(f"[DEBUG] SerpApi Response keys: {list(data.keys())}")
                    
                    if "images_results" in data and len(data["images_results"]) > 0:
                        print(f"[DEBUG] Found {len(data['images_results'])} images from Google")
                        for img in data["images_results"][:num_images]:
                            # Use original image URL for best quality
                            image_url = img.get("original") or img.get("thumbnail")
                            print(f"[DEBUG] Image URL: {image_url}")
                            images.append({
                                "url": image_url,
                                "alt": img.get("title", f"{topic} - Image"),
                                "photographer": img.get("source", "Google Images")
                            })
                        
                        if images:
                            print(f"[SUCCESS] Got {len(images)} HD images from Google via SerpApi for: {topic}")
                            return images
                    else:
                        print(f"[WARNING] No images found in SerpApi response for: {topic}")
                        print(f"[DEBUG] Response keys: {list(data.keys())}")
                else:
                    print(f"[ERROR] SerpApi returned status {response.status_code}: {response.text[:200]}")
            else:
                print("[WARNING] SerpApi key not configured")
        
        except Exception as e:
            print(f"[ERROR] SerpApi error: {e}")
        
        # FALLBACK: Unsplash Source (no API key needed, topic-relevant)
        print(f"[FALLBACK] Using Unsplash Source for: {topic}")
        
        # Clean and optimize topic keywords for better results
        keywords = self._optimize_image_keywords(topic)
        
        for i in range(num_images):
            # Use different keyword variations for diversity
            keyword_variant = keywords if i == 0 else f"{keywords},{random.choice(['professional', 'modern', 'quality', 'business'])}"
            
            images.append({
                "url": f"https://source.unsplash.com/1920x1080/?{keyword_variant}&sig={random.randint(1, 100000)}",
                "alt": f"{topic} - Professional Image {i + 1}",
                "photographer": "Unsplash"
            })
        
        print(f"[OK] Generated {len(images)} fallback image URLs for: {topic}")
        return images
    
    def _optimize_image_keywords(self, topic: str) -> str:
        """
        Optimize topic keywords for better image search results.
        Removes generic words, focuses on visual concepts.
        """
        
        # Words to remove (too generic or non-visual)
        stop_words = {
            'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
            'of', 'with', 'by', 'from', 'about', 'how', 'what', 'why', 'when',
            'guide', 'tips', 'best', 'top', 'ultimate', 'complete', 'introduction'
        }
        
        # Split topic into words
        words = topic.lower().split()
        
        # Filter out stop words and keep visual concepts
        keywords = [w for w in words if w not in stop_words and len(w) > 2]
        
        # If we filtered too much, use original
        if not keywords:
            keywords = words[:3]  # Use first 3 words
        
        # Join with commas for better search
        return ','.join(keywords[:4])  # Max 4 keywords for best results
    
    def _insert_images(self, content: str, images: List[Dict]) -> str:
        """
        Insert ALL images evenly throughout content - GUARANTEED TO WORK
        Each image on its own line with proper spacing
        """
        
        if not images or not content:
            print("[INSERT_IMAGES] No images or no content", flush=True)
            return content
        
        # Split by double newlines to get paragraphs
        paragraphs = content.split("\n\n")
        print(f"[INSERT_IMAGES] Total paragraphs: {len(paragraphs)}, Images to insert: {len(images)}", flush=True)
        
        if len(paragraphs) < 2:
            print("[INSERT_IMAGES] Not enough paragraphs", flush=True)
            return content
        
        # Calculate positions to insert images
        # Distribute images evenly throughout content
        total_paras = len(paragraphs)
        positions = []
        
        if len(images) == 1:
            # Single image - put in middle
            positions = [total_paras // 2]
        else:
            # Multiple images - distribute evenly
            step = total_paras // (len(images) + 1)
            for i in range(len(images)):
                pos = (i + 1) * step
                if pos < total_paras:
                    positions.append(pos)
        
        print(f"[INSERT_IMAGES] Will insert at positions: {positions}", flush=True)
        
        # Build result with images inserted
        result = []
        img_idx = 0
        
        for i, para in enumerate(paragraphs):
            # Add the paragraph
            result.append(para)
            
            # Check if we should insert an image after this paragraph
            if i in positions and img_idx < len(images):
                img = images[img_idx]
                # Add image on its own line with proper markdown
                image_markdown = f"![{img['alt']}]({img['url']})"
                result.append(image_markdown)
                print(f"[INSERT_IMAGES] Inserted image {img_idx + 1} after paragraph {i}: {image_markdown[:80]}", flush=True)
                img_idx += 1
        
        # Join with double newlines to maintain paragraph separation
        final_content = "\n\n".join(result)
        image_count = final_content.count('![')
        print(f"[INSERT_IMAGES] Done! Content now has {image_count} images", flush=True)
        print(f"[INSERT_IMAGES] Sample output: {final_content[:500]}...", flush=True)
        return final_content
    
    def _fallback_content(self, topic: str) -> str:
        """Fallback content if generation fails"""
        return f"""Content generation for "{topic}" is currently unavailable.

Please check your API configuration and try again.

If the issue persists, verify that your Google AI API key is correctly set in the .env file."""


def generate_professional_content(topic: str, word_count: int = 900,
                                  num_images: int = 4, tone: str = "professional",
                                  audience: str = "general", include_stats: bool = False) -> Dict:
    """
    Generate professional, human-like content without errors.
    
    Args:
        topic: Content topic
        word_count: Target word count
        num_images: Number of images to include
        tone: Writing tone
        audience: Target audience
        include_stats: Whether to include statistics
    
    Returns:
        Dict with title, content, and images
    """
    writer = ProfessionalHumanWriter()
    return writer.write_content(topic, word_count, num_images, tone, audience, include_stats)


if __name__ == "__main__":
    import sys
    
    try:
        input_data = sys.stdin.read().strip()
        config = json.loads(input_data) if input_data else {}
        
        topic = config.get("topic", "technology")
        word_count = int(config.get("wordCount", 900))
        num_images = int(config.get("numImages", 4))
        tone = config.get("tone", "professional")
        audience = config.get("targetAudience", "general")
        include_stats = config.get("includeStats", False)
        
    except:
        topic = "technology"
        word_count = 900
        num_images = 4
        tone = "professional"
        audience = "general"
        include_stats = False
    
    result = generate_professional_content(topic, word_count, num_images, tone, audience, include_stats)
    print(json.dumps(result))
