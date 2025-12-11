"""
SINGLE-STEP Human Content Generator
Generates 100% human-like content from scratch (NOT AI rewrite)
Uses templates and natural writing patterns
Author: Harsh J Kuhikar
Copyright: 2025 All Rights Reserved
"""

import random
import requests
import json
from typing import List, Dict

class HumanContentGenerator:
    def __init__(self):
        self.pexels_api_key = "K7boJ9IvcjYZUBOCprwozoQKH7iU3bW8TlqgV4fhRruUqUHBiQSqQF8qMy"
        
    def generate_human_content(self, topic: str, word_count: int, num_images: int, 
                               tone: str, audience: str, include_stats: bool) -> Dict:
        """
        Generate 100% HUMAN content from scratch
        NO AI rewriting - pure human writing patterns
        """
        
        # Get high-quality images first
        images = self._get_high_quality_images(topic, num_images)
        
        # Generate truly human content
        content = self._write_like_human(topic, word_count, tone, audience, include_stats, images)
        
        return {
            'content': content,
            'images': images,
            'title': topic
        }
    
    def _write_like_human(self, topic: str, word_count: int, tone: str, 
                         audience: str, include_stats: bool, images: List[Dict]) -> str:
        """
        Write content like a REAL human would
        Using natural patterns, not AI generation
        """
        
        paragraphs = []
        current_words = 0
        target_words = word_count
        
        # 1. OPENING (Natural hook)
        opening = self._write_opening(topic, tone)
        paragraphs.append(opening)
        current_words += len(opening.split())
        
        # 2. MAIN CONTENT (Natural flow)
        num_sections = random.randint(4, 6)
        words_per_section = (target_words - current_words - 100) // num_sections
        
        for i in range(num_sections):
            section = self._write_section(topic, words_per_section, tone, audience, include_stats)
            paragraphs.append(section)
            current_words += len(section.split())
            
            # Insert image naturally
            if i < len(images):
                img = images[i]
                img_markdown = f"\n\n![{img['alt']}]({img['url']})\n*{img['alt']}*\n\n"
                paragraphs.append(img_markdown)
        
        # 3. CLOSING (Natural wrap-up)
        closing = self._write_closing(topic, tone)
        paragraphs.append(closing)
        
        return '\n\n'.join(paragraphs)
    
    def _write_opening(self, topic: str, tone: str) -> str:
        """Write natural opening like a human"""
        
        # Real human opening patterns
        patterns = [
            f"So {topic}. Where do I even start? I've been thinking about this a lot lately. "
            f"And honestly, it's way more interesting than most people realize. Let me break it down for you.",
            
            f"You know what's funny about {topic}? Most people get it completely wrong. "
            f"I mean, I used to think the same thing. But after digging into it, wow. "
            f"There's so much more to it.",
            
            f"Look, I'm just going to be straight with you about {topic}. "
            f"No fancy jargon. No corporate speak. Just real talk. "
            f"Because that's what you actually need to know.",
            
            f"{topic} is one of those things everyone talks about but nobody really explains properly. "
            f"And that bugs me. So I'm going to explain it the way I wish someone had explained it to me.",
            
            f"Okay so {topic}. I've spent way too much time on this. "
            f"But you know what? It was worth it. Because now I can actually explain it in a way that makes sense."
        ]
        
        return random.choice(patterns)
    
    def _write_section(self, topic: str, target_words: int, tone: str, 
                      audience: str, include_stats: bool) -> str:
        """Write a section like a human would"""
        
        sentences = []
        current_words = 0
        
        # Start with a casual intro
        intros = [
            "Here's the thing.",
            "So here's what I've noticed.",
            "Let me tell you something.",
            "This is important.",
            "Pay attention to this part.",
            "Now this is where it gets interesting.",
            "Okay so.",
            "Real talk."
        ]
        sentences.append(random.choice(intros))
        
        # Add 5-8 sentences with natural flow
        num_sentences = random.randint(5, 8)
        
        for i in range(num_sentences):
            if current_words >= target_words:
                break
                
            # Natural sentence patterns
            sentence = self._generate_natural_sentence(topic, tone, i)
            sentences.append(sentence)
            current_words += len(sentence.split())
            
            # Add stats if requested
            if include_stats and random.random() < 0.3:
                stat = self._add_natural_stat()
                sentences.append(stat)
                current_words += len(stat.split())
        
        return ' '.join(sentences)
    
    def _generate_natural_sentence(self, topic: str, tone: str, position: int) -> str:
        """Generate a natural-sounding sentence"""
        
        # Real human sentence patterns
        patterns = [
            "It works like this.",
            "You probably already know this but.",
            "Most people don't realize this.",
            "And that's the key part.",
            "Think about it for a second.",
            "Makes sense, right?",
            "I mean, when you really think about it.",
            "That's what makes the difference.",
            "And honestly, that's all you need.",
            "Pretty simple when you break it down.",
            "But here's where people mess up.",
            "Don't overthink it.",
            "Just focus on this one thing.",
            "That's it. Nothing fancy.",
            "And you know what? It actually works.",
            "I've seen this happen so many times.",
            "Trust me on this one.",
            "You'll thank me later.",
            "This changed everything for me.",
            "Wish I'd known this earlier."
        ]
        
        return random.choice(patterns)
    
    def _add_natural_stat(self) -> str:
        """Add a stat in a natural way"""
        
        # Generate realistic stat
        number = random.choice([67, 73, 81, 89, 92, 78, 85, 76, 83, 91])
        
        patterns = [
            f"Like, {number}% of people do this wrong.",
            f"Studies show about {number}% success rate.",
            f"I read somewhere that {number}% of cases work out.",
            f"Apparently {number}% of experts agree on this.",
            f"The data says around {number}% see results."
        ]
        
        return random.choice(patterns)
    
    def _write_closing(self, topic: str, tone: str) -> str:
        """Write natural closing"""
        
        patterns = [
            f"So yeah. That's {topic} in a nutshell. Not as complicated as people make it sound, right? "
            f"Just remember the main points and you'll be fine. Good luck with it.",
            
            f"Bottom line? {topic} isn't rocket science. Just take it step by step. "
            f"Don't overthink it. And you'll figure it out as you go. That's how everyone learns.",
            
            f"Look, I could go on about {topic} forever. But you get the idea. "
            f"Start with the basics. Build from there. And don't be afraid to mess up. That's how you learn.",
            
            f"Alright, that's pretty much everything you need to know about {topic}. "
            f"Is it perfect? Nope. But it's real. And it works. So give it a shot.",
            
            f"And that's {topic} explained. Hope that made sense. "
            f"If you got questions, just figure it out as you go. That's what I did. Works pretty well."
        ]
        
        return random.choice(patterns)
    
    def _get_high_quality_images(self, topic: str, num_images: int) -> List[Dict]:
        """
        Get HIGH QUALITY images from Pexels API
        Falls back to Unsplash if needed
        """
        images = []
        
        try:
            # Try Pexels first (high quality, free)
            headers = {'Authorization': self.pexels_api_key}
            url = f"https://api.pexels.com/v1/search?query={topic}&per_page={num_images}"
            
            response = requests.get(url, headers=headers, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                for photo in data.get('photos', [])[:num_images]:
                    images.append({
                        'url': photo['src']['large'],  # High quality
                        'alt': photo.get('alt', topic),
                        'photographer': photo['photographer']
                    })
        except:
            pass
        
        # Fallback to Unsplash (also high quality)
        while len(images) < num_images:
            images.append({
                'url': f"https://source.unsplash.com/1600x900/?{topic.replace(' ', ',')}&sig={len(images)}",
                'alt': f"{topic} - Professional Image",
                'photographer': 'Unsplash'
            })
        
        return images[:num_images]


def generate_human_content(topic: str, word_count: int = 1000, num_images: int = 4,
                          tone: str = 'conversational', audience: str = 'general',
                          include_stats: bool = True) -> Dict:
    """
    Main function - Generate 100% HUMAN content
    NO AI involved - pure human writing patterns
    """
    generator = HumanContentGenerator()
    return generator.generate_human_content(topic, word_count, num_images, tone, audience, include_stats)


if __name__ == '__main__':
    import sys
    
    # Read config from stdin
    try:
        input_data = sys.stdin.read()
        config = json.loads(input_data) if input_data else {}
        
        topic = config.get('topic', 'business')
        word_count = int(config.get('wordCount', 1000))
        num_images = int(config.get('numImages', 4))
        tone = config.get('tone', 'conversational')
        audience = config.get('targetAudience', 'general')
        include_stats = config.get('includeStats', True)
        
    except:
        topic = sys.argv[1] if len(sys.argv) > 1 else "business"
        word_count = 1000
        num_images = 4
        tone = 'conversational'
        audience = 'general'
        include_stats = True
    
    # Generate 100% human content
    result = generate_human_content(topic, word_count, num_images, tone, audience, include_stats)
    
    # Output as JSON
    print(json.dumps(result))
