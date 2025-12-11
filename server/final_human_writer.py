"""
FINAL Human Content Writer - Enhanced Humanized Version
Safe + Strong Human-Like Variability
Author: Harsh J Kuhikar
Edition: 2025 - Humanized Writing Engine v2
"""

import requests
import json
import os
import random
from typing import Dict, List
from dotenv import load_dotenv

# Unicode normalization for human-like text
try:
    from humanize_ai import humanize_string, HumanizeOptions
    HUMANIZE_AVAILABLE = True
except ImportError:
    HUMANIZE_AVAILABLE = False
    print("humanize-ai not installed - skipping Unicode normalization")

# Load environment variables
load_dotenv()

class FinalHumanWriter:
    def __init__(self):
        self.google_api_key = os.getenv("GOOGLE_AI_KEY", "AIzaSyA7tovVOudFMqgchT6zFKyGn_2HW-GtzCM")
        
        # Simple, natural starters - not overly dramatic
        self.semantic_variants = [
            "So let's talk about this.",
            "Here's what you need to know.",
            "Let me break this down.",
            "Quick overview of this topic.",
            "Here's the deal.",
            "Let's get into it.",
        ]
        
        self.mini_imperfections = [
            "basically",
            "pretty much",
            "kind of",
            "sort of",
            "you know",
            "I mean",
        ]
    
    def write_content(self, topic: str, word_count: int, num_images: int,
                     tone: str, audience: str, include_stats: bool) -> Dict:
        images = self._get_google_images(topic, num_images)
        content = self._generate_with_human_engine(topic, word_count, tone, audience, include_stats, images)
        
        return {
            "title": topic,
            "content": content,
            "images": images
        }
    
    def _generate_with_human_engine(self, topic: str, word_count: int,
                                   tone: str, audience: str, include_stats: bool,
                                   images: List[Dict]) -> str:
        emotional_intro = random.choice(self.semantic_variants)
        imperfection = random.choice(self.mini_imperfections)
        
        prompt = f"""Write about {topic}. Around {word_count} words.

WRITE LIKE A REAL PERSON TYPING CASUALLY (NOT AN AI):

CRITICAL ANTI-AI RULES:
1. Mix short & long sentences RANDOMLY (not in pattern)
2. Use "I think" / "maybe" / "from what I know" SPARINGLY (max 2 times)
3. NO rhetorical questions like "Right?" "You know?" "Get it?" - these are AI signatures
4. Skip obvious details - don't over-explain
5. Use normal language - NO forced slang or fillers
6. Make 2-3 realistic typos (letter swaps, missing letters)
7. Don't finish perfectly - just stop naturally
8. NEVER repeat phrases - each sentence should be unique
9. Jump between thoughts like real conversation
10. Don't be overly dramatic or enthusiastic

Write like you're explaining to a friend. Natural. Not trying too hard.

Start now about {topic}:"""

        # API CALL with fallback models
        try:
            if not self.google_api_key:
                return self._fallback_content(topic)
            
            # Try multiple models in order of preference
            models_to_try = [
                "gemini-exp-1206",           # Latest experimental (Dec 2024)
                "gemini-2.0-flash-exp",      # 2.0 Flash experimental
                "gemini-2.0-flash-thinking-exp",  # Thinking mode
                "gemini-2.0-flash",          # Stable 2.0
            ]
            
            headers = {"Content-Type": "application/json"}
            data = {
                "contents": [{
                    "parts": [{"text": prompt}]
                }],
                "generationConfig": {
                    "temperature": 0.8,  # Balanced for natural variation
                    "topK": 40,
                    "topP": 0.9,
                    "maxOutputTokens": 2400
                }
            }
            
            response = None
            used_model = None
            
            for model in models_to_try:
                try:
                    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={self.google_api_key}"
                    print(f"[INFO] Trying model: {model}")
                    response = requests.post(url, headers=headers, json=data, timeout=40)
                    
                    if response.status_code == 200:
                        used_model = model
                        print(f"[SUCCESS] Using model: {model}")
                        break
                    else:
                        print(f"[WARN] Model {model} returned status {response.status_code}")
                except Exception as e:
                    print(f"[WARN] Model {model} failed: {e}")
                    continue
            
            if not response or response.status_code != 200:
                print(f"[ERROR] All models failed, using fallback")
                return self._fallback_content(topic)
            
            if response.status_code == 200:
                result = response.json()
                
                # Check if we have valid content
                if "candidates" in result and len(result["candidates"]) > 0:
                    candidate = result["candidates"][0]
                    
                    # Check if content exists and has parts
                    if "content" in candidate and "parts" in candidate["content"]:
                        parts = candidate["content"]["parts"]
                        if len(parts) > 0 and "text" in parts[0]:
                            content = parts[0]["text"]
                            
                            # EXTREME humanization - completely restructure
                            content = self._extreme_humanization(content)
                            
                            # Unicode normalization - remove AI artifacts
                            content = self._normalize_unicode(content)
                            
                            content = self._insert_images(content, images)
                            return content
                
                # If we get here, the response format was unexpected
                print(f"Unexpected API response format: {result}")
                return self._fallback_content(topic)
            else:
                print(f"API error: {response.status_code} - {response.text}")
                return self._fallback_content(topic)
            
        except Exception as e:
            return self._fallback_content(topic)
    
    def _extreme_humanization(self, content: str) -> str:
        """ULTRA EXTREME humanization - destroy ALL AI patterns"""
        import re
        
        # Step 1: Remove ALL AI signatures and patterns
        content = self._remove_ai_patterns(content)
        
        # Step 2: Break into sentences and completely randomize structure
        content = self._randomize_structure(content)
        
        # Step 3: Add real human imperfections (typos, grammar mistakes)
        content = self._add_human_errors(content)
        
        # Step 4: Remove perfect patterns
        content = self._break_patterns(content)
        
        # Step 5: ULTRA AGGRESSIVE - remove remaining AI language
        content = self._ultra_aggressive_humanization(content)
        
        # Step 6: Add natural flow breaks
        content = self._add_natural_flow_breaks(content)
        
        return content.strip()
    
    def _remove_ai_patterns(self, content: str) -> str:
        """Remove ALL AI signatures"""
        import re
        
        # Remove AI endings
        ai_endings = [
            r'Let me know.*',
            r'Feel free.*',
            r'Hope this.*',
            r'You should definitely.*',
            r'It\'s a wild ride.*',
            r'Get ready for.*',
            r'If you have.*questions.*',
            r'Don\'t hesitate to ask.*'
        ]
        for ending in ai_endings:
            content = re.sub(ending + r'[.!?]*', '', content, flags=re.IGNORECASE)
        
        # Limit filler phrases to max 2 occurrences
        fillers = {
            'Pretty much': 0, 'I mean': 0, 'Like,': 0, 'Honestly,': 0,
            'You know,': 0, 'Basically,': 0, 'Dude,': 0, 'Look,': 0
        }
        
        for filler in fillers.keys():
            pattern = re.escape(filler)
            matches = list(re.finditer(pattern, content, re.IGNORECASE))
            # Remove all but first 2
            for match in matches[2:]:
                content = content[:match.start()] + content[match.end():]
        
        # Remove formal transitions
        transitions = [
            'However,', 'Moreover,', 'Furthermore,', 'Therefore,',
            'Consequently,', 'Nevertheless,', 'Additionally,'
        ]
        for trans in transitions:
            content = re.sub(r'\b' + re.escape(trans) + r'\s*', '', content, flags=re.IGNORECASE)
        
        return content
    
    def _randomize_structure(self, content: str) -> str:
        """Completely randomize paragraph structure"""
        import re
        
        # Split into paragraphs
        paragraphs = [p.strip() for p in content.split('\n\n') if p.strip()]
        
        if len(paragraphs) <= 2:
            return content
        
        # Randomly merge some paragraphs (40% chance)
        new_paras = []
        i = 0
        while i < len(paragraphs):
            if i < len(paragraphs) - 1 and random.random() < 0.4:
                # Merge with next
                new_paras.append(paragraphs[i] + ' ' + paragraphs[i + 1])
                i += 2
            else:
                new_paras.append(paragraphs[i])
                i += 1
        
        # Randomly split some long paragraphs
        final_paras = []
        for para in new_paras:
            sentences = re.split(r'([.!?]+\s+)', para)
            if len(sentences) > 8 and random.random() < 0.5:
                # Split in middle
                mid = len(sentences) // 2
                final_paras.append(''.join(sentences[:mid]).strip())
                final_paras.append(''.join(sentences[mid:]).strip())
            else:
                final_paras.append(para)
        
        return '\n\n'.join(final_paras)
    
    def _add_human_errors(self, content: str) -> str:
        """Add realistic human typing errors"""
        import re
        
        words = content.split()
        
        for i in range(len(words)):
            # Letter swap typos (3% chance) - ChatGPT's idea
            if random.random() < 0.03 and len(words[i]) > 3:
                word = words[i]
                # Swap two adjacent letters
                pos = random.randint(0, len(word) - 2)
                words[i] = word[:pos] + word[pos+1] + word[pos] + word[pos+2:]
            
            # 2% chance of lowercase error
            elif random.random() < 0.02 and i > 0 and len(words[i]) > 3:
                if words[i][0].isupper() and not words[i].isupper():
                    words[i] = words[i].lower()
            
            # 1% chance of missing punctuation
            if random.random() < 0.01 and words[i].endswith('.'):
                words[i] = words[i][:-1]
        
        content = ' '.join(words)
        
        # Remove some commas (5% chance)
        commas = list(re.finditer(r',', content))
        for match in commas:
            if random.random() < 0.05:
                content = content[:match.start()] + content[match.end():]
        
        # Replace formal words with casual synonyms - ChatGPT's idea
        synonym_map = {
            'therefore': 'so',
            'however': 'but',
            'moreover': 'plus',
            'significant': 'big',
            'demonstrate': 'show',
            'utilize': 'use',
            'commence': 'start',
            'terminate': 'end',
            'approximately': 'about',
            'numerous': 'many',
        }
        
        for formal, casual in synonym_map.items():
            pattern = r'\b' + re.escape(formal) + r'\b'
            content = re.sub(pattern, casual, content, flags=re.IGNORECASE)
        
        return content
    
    def _break_patterns(self, content: str) -> str:
        """Break repetitive patterns and add human elements"""
        import re
        
        # Find repeated sentence structures
        sentences = re.split(r'([.!?]+\s+)', content)
        
        # Remove sentences that start the same way (keep first, remove duplicates)
        seen_starts = {}
        filtered = []
        
        for i, sent in enumerate(sentences):
            if not sent.strip() or sent.strip() in ['.', '!', '?']:
                filtered.append(sent)
                continue
            
            # Get first 3 words
            words = sent.strip().split()[:3]
            start = ' '.join(words).lower()
            
            if start in seen_starts:
                # Skip this sentence if we've seen this start more than twice
                seen_starts[start] += 1
                if seen_starts[start] > 2:
                    continue
            else:
                seen_starts[start] = 1
            
            filtered.append(sent)
        
        content = ''.join(filtered)
        
        # Add rhetorical questions occasionally (ChatGPT's idea)
        content = self._add_rhetorical_questions(content)
        
        # Clean up
        content = re.sub(r'\s+', ' ', content)
        content = re.sub(r'\s+([.,!?])', r'\1', content)
        content = re.sub(r'\.+', '.', content)
        
        return content
    
    def _add_rhetorical_questions(self, content: str) -> str:
        """Add occasional rhetorical questions for human feel - LIMITED"""
        import re
        
        questions = [
            'Right?',
            'You know?',
            'Make sense?',
            'See what I mean?',
        ]
        
        # Split into sentences
        sentences = re.split(r'([.!?]+)', content)
        result = []
        question_count = 0
        max_questions = 2  # LIMIT to max 2 rhetorical questions
        
        for i in range(0, len(sentences) - 1, 2):
            sent = sentences[i]
            punct = sentences[i + 1] if i + 1 < len(sentences) else '.'
            
            result.append(sent + punct)
            
            # Only 3% chance and max 2 total
            if question_count < max_questions and random.random() < 0.03 and i < len(sentences) - 2:
                result.append(' ' + random.choice(questions))
                question_count += 1
        
        return ''.join(result)
    
    def _ultra_aggressive_humanization(self, content: str) -> str:
        """ULTRA AGGRESSIVE - destroy ALL remaining AI patterns"""
        import re
        
        # Remove ALL instances of these AI-signature phrases
        ai_phrases = [
            r'\bGet it\?\s*',
            r'\bYou know\?\s*',
            r'\bRight\?\s*',
            r'\bMake sense\?\s*',
            r'\bSee what I mean\?\s*',
            r'\bFair enough\?\s*',
            r'\bPretty much\b',
            r'\bBasically\b',
            r'\bHonestly\b',
            r'\bLiterally\b',
            r'\bI mean\b',
            r'\bYou know\b',
            r'\bKind of\b',
            r'\bSort of\b',
        ]
        
        # Count occurrences and remove after first 1-2
        for phrase in ai_phrases:
            matches = list(re.finditer(phrase, content, re.IGNORECASE))
            # Keep only first occurrence, remove all others
            for i, match in enumerate(matches):
                if i > 0:  # Remove all but first
                    content = content[:match.start()] + content[match.end():]
        
        # Remove AI-style dramatic endings
        dramatic_endings = [
            r'It\'s [a-z\s]+ when you think about it[.!]*',
            r'That\'s what makes [a-z\s]+ so [a-z]+[.!]*',
            r'And that\'s the beauty of [a-z\s]+[.!]*',
            r'It\'s a [a-z\s]+ tale[.!]*',
            r'The whole package[.!]*',
            r'So good[.!]*$',
            r'Legend[.!]*$',
        ]
        
        for ending in dramatic_endings:
            content = re.sub(ending, '', content, flags=re.IGNORECASE)
        
        # Replace overly casual phrases with normal language
        replacements = {
            r'\bdude\b': '',
            r'\bman\b': '',
            r'\blike,\s+': '',
            r'\bso,\s+': '',
            r'\bwell,\s+': '',
            r'\blook,\s+': '',
        }
        
        for pattern, replacement in replacements.items():
            content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)
        
        # Remove excessive exclamation marks
        content = re.sub(r'!+', '.', content)
        
        # Remove triple dots
        content = re.sub(r'\.{3,}', '.', content)
        
        return content
    
    def _add_natural_flow_breaks(self, content: str) -> str:
        """Add natural thought breaks and incomplete sentences"""
        import re
        
        paragraphs = content.split('\n\n')
        result = []
        
        for para in paragraphs:
            sentences = re.split(r'([.!?]+\s+)', para)
            
            # Randomly cut off last sentence (10% chance) - humans don't always finish thoughts
            if len(sentences) > 4 and random.random() < 0.1:
                # Remove last sentence
                sentences = sentences[:-2]
            
            # Randomly add thought breaks
            if random.random() < 0.15:
                mid = len(sentences) // 2
                sentences.insert(mid, ' Anyway. ')
            
            result.append(''.join(sentences))
        
        return '\n\n'.join(result)
    
    def _remove_ai_language(self, content: str) -> str:
        """ULTRA AGGRESSIVE humanization - remove ALL AI patterns"""
        import re
        
        # Step 1: Remove repeated filler phrases (AI signature)
        # Count and limit fillers
        fillers = ['Pretty much', 'I mean', 'Like,', 'Honestly,', 'You know,', 'Basically,']
        for filler in fillers:
            # Keep only first 2 occurrences, remove rest
            count = 0
            def replace_filler(match):
                nonlocal count
                count += 1
                return match.group(0) if count <= 2 else ''
            content = re.sub(re.escape(filler), replace_filler, content, flags=re.IGNORECASE)
        
        # Step 2: Remove AI signature endings
        ai_endings = [
            r'Let me know if you have .*questions.*',
            r'Feel free to ask.*',
            r'Hope this helps.*',
            r'You should definitely watch.*',
            r'It\'s a wild ride.*',
            r'Get ready for.*'
        ]
        for ending in ai_endings:
            content = re.sub(ending, '', content, flags=re.IGNORECASE)
        
        # Step 3: Remove ALL formal transitions
        formal_transitions = [
            r'\bHowever,\s*', r'\bMoreover,\s*', r'\bFurthermore,\s*', 
            r'\bTherefore,\s*', r'\bConsequently,\s*', r'\bNevertheless,\s*',
            r'\bAdditionally,\s*', r'\bIn conclusion,\s*', r'\bTo summarize,\s*',
            r'\bIn summary,\s*', r'\bUltimately,\s*', r'\bEssentially,\s*',
            r'\bFundamentally,\s*', r'\bPrimarily,\s*'
        ]
        for trans in formal_transitions:
            content = re.sub(trans, '', content, flags=re.IGNORECASE)
        
        # Step 2: Replace formal phrases with casual ones
        replacements = {
            r'\bIt is important to note that\b': 'Look',
            r'\bIt should be noted that\b': 'Thing is',
            r'\bOne must understand that\b': 'You gotta know',
            r'\bIt is worth mentioning that\b': 'Also',
            r'\bThis demonstrates that\b': 'This shows',
            r'\bThis illustrates that\b': 'This shows',
            r'\bThis indicates that\b': 'This means',
            r'\bThis suggests that\b': 'Seems like',
            r'\bIt can be seen that\b': 'You can see',
            r'\bOne can observe that\b': 'You can see',
            r'\bIt becomes clear that\b': 'Pretty clear that',
            r'\bIt is evident that\b': 'Obviously',
            r'\bIt is apparent that\b': 'Clearly',
            r'\bwhat a .* it turned out to be': 'and wow, that was something',
            r'\bLet\'s rewind a bit\b': 'So going back',
            r'\bNow, we have to talk about\b': 'Okay so',
            r'\bThis is the big one\b': 'This is huge',
            r'\bfound himself stuck right in the middle\b': 'was stuck in the middle',
            r'\bIt was a powder keg\b': 'Things were tense',
            r'\bIt was a horrific decision\b': 'Terrible choice',
            r'\bno one should ever have to make\b': 'nobody should face',
            r'\bfull-blown genius\b': 'genius',
            r'\bThat\'s pretty wild when you think about it\b': 'Pretty crazy',
            r'\bThis is the big one, the central tragedy\b': 'This is the main thing',
            r'\bIt was a powder keg\b': 'Situation was bad',
            r'\bHe saw both sides clearly\b': 'He understood both sides',
        }
        
        for pattern, replacement in replacements.items():
            content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)
        
        # Step 3: Break up long, formal sentences
        sentences = re.split(r'([.!?]+\s+)', content)
        new_sentences = []
        
        for i, sent in enumerate(sentences):
            if not sent.strip() or sent.strip() in ['.', '!', '?']:
                new_sentences.append(sent)
                continue
            
            # If sentence is too long and formal, break it up
            if len(sent.split()) > 25:
                # Find conjunctions to break on
                parts = re.split(r'(\s+and\s+|\s+but\s+|\s+so\s+)', sent, maxsplit=1)
                if len(parts) > 1:
                    new_sentences.append(parts[0].strip() + '.')
                    new_sentences.append(' ')
                    # Capitalize first letter of second part
                    rest = ''.join(parts[1:]).strip()
                    if rest:
                        rest = rest[0].upper() + rest[1:] if len(rest) > 1 else rest.upper()
                        new_sentences.append(rest)
                else:
                    new_sentences.append(sent)
            else:
                new_sentences.append(sent)
        
        content = ''.join(new_sentences)
        
        # Step 4: Add casual fillers randomly
        paragraphs = content.split('\n\n')
        humanized_paragraphs = []
        
        for para in paragraphs:
            sentences = re.split(r'([.!?]+\s+)', para)
            result = []
            
            for i, sent in enumerate(sentences):
                result.append(sent)
                # Add casual filler after some sentences
                if i % 6 == 0 and random.random() < 0.3 and sent.strip() and sent.strip() not in ['.', '!', '?']:
                    fillers = [' I mean, ', ' You know, ', ' Like, ', ' Honestly, ', ' Pretty much. ']
                    result.append(random.choice(fillers))
            
            humanized_paragraphs.append(''.join(result))
        
        content = '\n\n'.join(humanized_paragraphs)
        
        # Step 5: Simplify vocabulary
        vocab_replacements = {
            r'\bredefined\b': 'changed',
            r'\bunfolded\b': 'went on',
            r'\bunbelievable\b': 'huge',
            r'\brethink\b': 'think again about',
            r'\bmilestones\b': 'achievements',
            r'\baftermath\b': 'results',
            r'\bperspective\b': 'view',
            r'\bintegrated\b': 'part of',
            r'\bmarginalized\b': 'pushed aside',
            r'\bresentment\b': 'anger',
            r'\bstability\b': 'peace',
            r'\bvulnerable\b': 'weak',
            r'\bcountless\b': 'many',
        }
        
        for formal, casual in vocab_replacements.items():
            content = re.sub(formal, casual, content, flags=re.IGNORECASE)
        
        # Step 6: Remove excessive formality markers
        content = re.sub(r'\bWe\'re talking about\b', 'I mean', content, flags=re.IGNORECASE)
        content = re.sub(r'\bwhen you think about it\b', '', content, flags=re.IGNORECASE)
        
        # Step 7: Add human imperfections
        # Randomly remove some punctuation
        sentences = content.split('. ')
        humanized = []
        for i, sent in enumerate(sentences):
            # Sometimes skip the period
            if random.random() < 0.15 and i < len(sentences) - 1:
                humanized.append(sent)
            else:
                humanized.append(sent + '.')
        content = ' '.join(humanized)
        
        # Step 8: Vary capitalization slightly (typos)
        words = content.split()
        for i in range(len(words)):
            # Occasionally lowercase a word that should be capitalized
            if random.random() < 0.03 and i > 0 and words[i][0].isupper():
                words[i] = words[i].lower()
        content = ' '.join(words)
        
        # Step 9: Remove overly perfect structure
        # Break up paragraphs that are too uniform
        paragraphs = content.split('\n\n')
        if len(paragraphs) > 3:
            # Randomly merge some paragraphs
            merged = []
            skip_next = False
            for i, para in enumerate(paragraphs):
                if skip_next:
                    skip_next = False
                    continue
                if random.random() < 0.3 and i < len(paragraphs) - 1:
                    merged.append(para + ' ' + paragraphs[i + 1])
                    skip_next = True
                else:
                    merged.append(para)
            content = '\n\n'.join(merged)
        
        # Step 10: Clean up
        content = re.sub(r'\.{2,}', '.', content)
        content = re.sub(r'\s+', ' ', content)
        content = re.sub(r'\s+([.,!?])', r'\1', content)
        content = re.sub(r'([.,!?])\s*([.,!?])', r'\1', content)
        content = re.sub(r'\.\s*\.', '.', content)
        
        return content.strip()
    
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
    
    def _normalize_unicode(self, text: str) -> str:
        """Normalize Unicode characters to make text more human-like"""
        if not HUMANIZE_AVAILABLE:
            # Basic normalization without library
            import re
            # Remove weird Unicode spaces
            text = re.sub(r'[\u00A0\u1680\u2000-\u200B\u202F\u205F\u3000]', ' ', text)
            # Normalize quotes
            text = text.replace('"', '"').replace('"', '"')
            text = text.replace(''', "'").replace(''', "'")
            # Normalize dashes
            text = text.replace('—', '-').replace('–', '-')
            # Remove zero-width characters
            text = re.sub(r'[\u200B-\u200D\uFEFF]', '', text)
            return text
        
        # Use humanize-ai library for full normalization
        try:
            opts = HumanizeOptions(
                transform_hidden=True,
                transform_trailing_whitespace=True,
                transform_nbs=True,
                transform_dashes=True,
                transform_quotes=True,
                transform_other=True,
                keyboard_only=False
            )
            result = humanize_string(text, opts)
            return result["text"]
        except Exception as e:
            print(f"Unicode normalization error: {e}")
            return text
    
    def _fallback_content(self, topic: str) -> str:
        """Fallback if API fails"""
        return f"""Okay, so let's talk about {topic} for a second.

Nothing too fancy, nothing too polished — just what naturally comes to mind. Sometimes the most real thoughts are the ones that aren't perfectly structured.

Here's what I genuinely think about this topic...

(Content generator fallback – API unavailable. Please check your Google AI API key and try again.)"""
    
    def _get_google_images(self, topic: str, num_images: int) -> List[Dict]:
        """Get topic-relevant HD images using SerpApi (Google Images)"""
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
        
        # FALLBACK: Unsplash Source (no API key needed, topic-based)
        print(f"[FALLBACK] Using Unsplash Source for: {topic}")
        keywords = topic.replace(' ', ',')
        for i in range(num_images):
            images.append({
                "url": f"https://source.unsplash.com/1200x800/?{keywords}&sig={random.randint(1, 10000)}",
                "alt": f"{topic} - Image {i + 1}",
                "photographer": "Unsplash"
            })
        
        print(f"[OK] Generated {len(images)} fallback image URLs for: {topic}")
        return images


def generate_final_human_content(topic: str, word_count: int = 900,
                                 num_images: int = 4, tone: str = "casual",
                                 audience: str = "general", include_stats: bool = False) -> Dict:
    """Generate truly human content"""
    writer = FinalHumanWriter()
    return writer.write_content(topic, word_count, num_images, tone, audience, include_stats)


if __name__ == "__main__":
    import sys
    
    try:
        input_data = sys.stdin.read().strip()
        config = json.loads(input_data) if input_data else {}
        
        topic = config.get("topic", "life")
        word_count = int(config.get("wordCount", 900))
        num_images = int(config.get("numImages", 4))
        tone = config.get("tone", "casual")
        audience = config.get("targetAudience", "general")
        include_stats = config.get("includeStats", False)
        
    except:
        topic = "life"
        word_count = 900
        num_images = 4
        tone = "casual"
        audience = "general"
        include_stats = False
    
    result = generate_final_human_content(topic, word_count, num_images, tone, audience, include_stats)
    print(json.dumps(result))
