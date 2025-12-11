"""
Google Images Scraper - Get Real Images
Fetches real images from Google Images instead of AI-generated ones
Author: Harsh J Kuhikar
Copyright: 2025 All Rights Reserved
"""

import requests
from bs4 import BeautifulSoup
import re
from typing import List, Dict
from urllib.parse import quote_plus

class GoogleImageScraper:
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }

    def search_images(self, query: str, num_images: int = 4) -> List[Dict[str, str]]:
        """
        Search Google Images and return real image URLs
        
        Args:
            query: Search query
            num_images: Number of images to return (default 4)
            
        Returns:
            List of dicts with 'url' and 'title' keys
        """
        try:
            # Encode the query
            encoded_query = quote_plus(query)
            
            # Google Images search URL
            url = f"https://www.google.com/search?q={encoded_query}&tbm=isch"
            
            # Make request
            response = requests.get(url, headers=self.headers, timeout=10)
            response.raise_for_status()
            
            # Parse HTML
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Find image elements
            images = []
            img_tags = soup.find_all('img')
            
            for img in img_tags[1:num_images+1]:  # Skip first (Google logo)
                img_url = img.get('src') or img.get('data-src')
                if img_url and img_url.startswith('http'):
                    images.append({
                        'url': img_url,
                        'title': img.get('alt', query)
                    })
            
            # If not enough images, use Unsplash as fallback
            if len(images) < num_images:
                images.extend(self._get_unsplash_images(query, num_images - len(images)))
            
            return images[:num_images]
            
        except Exception as e:
            print(f"Error scraping Google Images: {e}")
            # Fallback to Unsplash
            return self._get_unsplash_images(query, num_images)

    def _get_unsplash_images(self, query: str, num_images: int) -> List[Dict[str, str]]:
        """Fallback to Unsplash for high-quality stock photos"""
        images = []
        keywords = query.replace(' ', ',')
        
        for i in range(num_images):
            images.append({
                'url': f"https://source.unsplash.com/800x600/?{keywords}&sig={i}",
                'title': query
            })
        
        return images

    def get_images_for_content(self, content: str, topic: str, num_images: int = 4) -> List[Dict[str, str]]:
        """
        Analyze content and get relevant images
        
        Args:
            content: The content text
            topic: Main topic
            num_images: Number of images to return
            
        Returns:
            List of image dicts
        """
        # Extract key phrases from content
        key_phrases = self._extract_key_phrases(content, topic)
        
        # Get images for each key phrase
        all_images = []
        for phrase in key_phrases[:num_images]:
            images = self.search_images(phrase, 1)
            if images:
                all_images.extend(images)
        
        # If not enough, search with main topic
        while len(all_images) < num_images:
            all_images.extend(self.search_images(topic, num_images - len(all_images)))
        
        return all_images[:num_images]

    def _extract_key_phrases(self, content: str, topic: str) -> List[str]:
        """Extract key phrases from content for image search"""
        # Simple extraction - get first few important words
        words = content.split()
        
        # Remove common words
        stop_words = {'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 
                     'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been',
                     'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
                     'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that',
                     'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they'}
        
        # Get important words (longer than 4 chars, not stop words)
        important_words = [w.strip('.,!?;:') for w in words 
                          if len(w) > 4 and w.lower() not in stop_words]
        
        # Create phrases
        phrases = [topic]
        
        # Add combinations
        for i in range(0, min(len(important_words), 12), 3):
            phrase = ' '.join(important_words[i:i+2])
            if phrase:
                phrases.append(phrase)
        
        return phrases[:4]


def get_real_images(content: str, topic: str, num_images: int = 4) -> List[Dict[str, str]]:
    """Main function to get real images from Google"""
    scraper = GoogleImageScraper()
    return scraper.get_images_for_content(content, topic, num_images)


if __name__ == '__main__':
    import sys
    import json
    
    # Get topic from command line argument
    topic = sys.argv[1] if len(sys.argv) > 1 else "business"
    
    # Read content from stdin
    try:
        input_data = sys.stdin.read()
        data = json.loads(input_data) if input_data else {}
        content = data.get('content', '')
        topic = data.get('topic', topic)
        num_images = data.get('numImages', 4)
    except:
        content = ""
        num_images = 4
    
    # Get images
    images = get_real_images(content or topic, topic, num_images)
    
    # Output as JSON
    print(json.dumps(images))
