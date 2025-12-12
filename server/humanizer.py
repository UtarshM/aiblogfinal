"""
ULTIMATE Content Humanizer - 0% AI Detection
Most aggressive humanization system possible
Author: Scalezix Venture PVT LTD
Copyright: 2025 All Rights Reserved
"""

import re
import random
from typing import List

class UltimateHumanizer:
    def __init__(self):
        # Extremely aggressive AI phrase removal
        self.ai_death_list = [
            'delve', 'delving', 'dive', 'diving', 'explore', 'exploring',
            'unleash', 'unleashing', 'game-changing', 'game changing',
            'cutting-edge', 'cutting edge', 'revolutionary', 'revolutionize',
            'seamless', 'seamlessly', 'robust', 'robustly', 'leverage',
            'leveraging', 'optimize', 'optimizing', 'optimization',
            'streamline', 'streamlining', 'comprehensive', 'comprehensively',
            'landscape', 'paradigm', 'synergy', 'holistic', 'facilitate',
            'facilitating', 'utilize', 'utilizing', 'implement', 'implementing',
            'moreover', 'furthermore', 'however', 'therefore', 'consequently',
            'nevertheless', 'additionally', 'in conclusion', 'to summarize',
            'it is important to note', 'it should be noted', 'notably',
            'significantly', 'essentially', 'fundamentally', 'primarily',
            'ultimately', 'particularly', 'specifically', 'generally',
            'typically', 'commonly', 'frequently', 'increasingly',
            'rapidly', 'dramatically', 'substantially', 'considerably',
            'effectively', 'efficiently', 'successfully', 'properly',
            'carefully', 'thoroughly', 'completely', 'entirely',
            'absolutely', 'definitely', 'certainly', 'obviously',
            'clearly', 'evidently', 'apparently', 'seemingly',
            'arguably', 'potentially', 'possibly', 'probably',
            'various', 'numerous', 'multiple', 'several',
            'different', 'diverse', 'wide range', 'broad spectrum',
            'key', 'crucial', 'vital', 'essential', 'critical',
            'important', 'significant', 'major', 'primary',
            'main', 'central', 'core', 'fundamental',
            'basic', 'simple', 'complex', 'sophisticated',
            'advanced', 'modern', 'contemporary', 'current',
            'recent', 'latest', 'new', 'innovative',
            'unique', 'special', 'particular', 'specific',
            'certain', 'given', 'particular', 'respective',
            'appropriate', 'suitable', 'relevant', 'pertinent',
            'applicable', 'related', 'associated', 'connected',
            'linked', 'tied', 'bound', 'attached'
        ]

    def humanize(self, text: str) -> str:
        """ULTIMATE humanization - most aggressive possible"""
        
        # Step 1: Nuke all AI phrases
        text = self._nuclear_ai_removal(text)
        
        # Step 2: Break into sentences
        sentences = self._split_sentences(text)
        
        # Step 3: Completely restructure each sentence
        new_sentences = []
        for i, sent in enumerate(sentences):
            # Make it super casual
            sent = self._make_super_casual(sent)
            
            # Add random human elements
            if random.random() < 0.4:
                sent = self._add_human_starter(sent)
            
            # Break long sentences aggressively
            if len(sent.split()) > 15:
                sent = self._break_sentence(sent)
            
            # Add fillers randomly
            if random.random() < 0.3:
                sent = self._inject_filler(sent)
            
            new_sentences.append(sent)
        
        # Step 4: Rejoin with natural breaks
        text = self._natural_rejoin(new_sentences)
        
        # Step 5: Add tons of contractions
        text = self._aggressive_contractions(text)
        
        # Step 6: Simplify all vocabulary
        text = self._simplify_everything(text)
        
        # Step 7: Add personal touches everywhere
        text = self._add_personality(text)
        
        # Step 8: Final cleanup
        text = self._final_humanize(text)
        
        return text

    def _nuclear_ai_removal(self, text: str) -> str:
        """Remove EVERY AI phrase aggressively"""
        for phrase in self.ai_death_list:
            # Case insensitive replacement
            pattern = r'\b' + re.escape(phrase) + r'\b'
            text = re.sub(pattern, '', text, flags=re.IGNORECASE)
        
        # Remove double spaces
        text = re.sub(r'\s+', ' ', text)
        return text.strip()

    def _split_sentences(self, text: str) -> List[str]:
        """Split into sentences"""
        sentences = re.split(r'[.!?]+\s+', text)
        return [s.strip() for s in sentences if s.strip()]

    def _make_super_casual(self, sent: str) -> str:
        """Make sentence super casual"""
        # Remove formal words
        replacements = {
            'purchase': 'buy',
            'acquire': 'get',
            'obtain': 'get',
            'receive': 'get',
            'provide': 'give',
            'assist': 'help',
            'require': 'need',
            'demonstrate': 'show',
            'indicate': 'show',
            'suggest': 'say',
            'recommend': 'say',
            'advise': 'tell',
            'inform': 'tell',
            'notify': 'tell',
            'communicate': 'talk',
            'discuss': 'talk about',
            'examine': 'look at',
            'analyze': 'check',
            'evaluate': 'check',
            'assess': 'check',
            'determine': 'figure out',
            'establish': 'set up',
            'create': 'make',
            'develop': 'make',
            'produce': 'make',
            'generate': 'make',
            'construct': 'build',
            'manufacture': 'make',
            'commence': 'start',
            'begin': 'start',
            'initiate': 'start',
            'terminate': 'end',
            'conclude': 'end',
            'finalize': 'finish',
            'complete': 'finish',
            'accomplish': 'do',
            'achieve': 'do',
            'perform': 'do',
            'execute': 'do',
            'conduct': 'do',
            'sufficient': 'enough',
            'adequate': 'enough',
            'appropriate': 'right',
            'suitable': 'good',
            'optimal': 'best',
            'maximum': 'most',
            'minimum': 'least',
            'numerous': 'many',
            'multiple': 'many',
            'various': 'different',
            'diverse': 'different',
            'approximately': 'about',
            'nearly': 'almost',
            'virtually': 'almost',
            'practically': 'almost',
            'essentially': 'basically',
            'fundamentally': 'basically',
            'primarily': 'mainly',
            'chiefly': 'mainly',
            'predominantly': 'mostly',
            'largely': 'mostly',
            'generally': 'usually',
            'typically': 'usually',
            'commonly': 'often',
            'frequently': 'often',
            'regularly': 'often',
            'occasionally': 'sometimes',
            'periodically': 'sometimes',
            'intermittently': 'sometimes',
            'subsequently': 'later',
            'previously': 'before',
            'currently': 'now',
            'presently': 'now',
            'immediately': 'right away',
            'instantly': 'right away',
            'rapidly': 'fast',
            'quickly': 'fast',
            'swiftly': 'fast',
            'slowly': 'slow',
            'gradually': 'slowly',
            'progressively': 'slowly'
        }
        
        for formal, casual in replacements.items():
            pattern = r'\b' + re.escape(formal) + r'\b'
            sent = re.sub(pattern, casual, sent, flags=re.IGNORECASE)
        
        return sent

    def _add_human_starter(self, sent: str) -> str:
        """Add human starter words"""
        starters = [
            'Look', 'So', 'Now', 'And', 'But', 'Plus', 'Also',
            'You know', 'I mean', 'Honestly', 'Real talk',
            'Here\'s the thing', 'Thing is', 'Point is'
        ]
        
        # Don't add if already has one
        first_word = sent.split()[0] if sent.split() else ''
        if first_word.lower() not in [s.lower() for s in starters]:
            starter = random.choice(starters)
            # Make first letter lowercase
            if sent:
                sent = sent[0].lower() + sent[1:]
            sent = f"{starter}, {sent}"
        
        return sent

    def _break_sentence(self, sent: str) -> str:
        """Break long sentences"""
        words = sent.split()
        if len(words) > 15:
            mid = len(words) // 2
            # Find a good break point (after 'and', 'but', 'so', etc.)
            for i in range(mid-3, mid+3):
                if i < len(words) and words[i].lower() in ['and', 'but', 'so', 'or']:
                    part1 = ' '.join(words[:i])
                    part2 = ' '.join(words[i+1:])
                    return f"{part1}. {part2.capitalize()}"
            
            # Just break in middle
            part1 = ' '.join(words[:mid])
            part2 = ' '.join(words[mid:])
            return f"{part1}. {part2.capitalize()}"
        
        return sent

    def _inject_filler(self, sent: str) -> str:
        """Inject filler words"""
        fillers = [
            'you know', 'I mean', 'like', 'honestly',
            'really', 'actually', 'basically', 'pretty much',
            'kind of', 'sort of', 'you see', 'right'
        ]
        
        words = sent.split()
        if len(words) > 5:
            pos = random.randint(2, len(words)-2)
            filler = random.choice(fillers)
            words.insert(pos, filler)
            sent = ' '.join(words)
        
        return sent

    def _natural_rejoin(self, sentences: List[str]) -> str:
        """Rejoin with natural breaks"""
        result = []
        for i, sent in enumerate(sentences):
            result.append(sent)
            
            # Add period if missing
            if not sent.endswith(('.', '!', '?')):
                result.append('.')
            
            # Random paragraph breaks
            if i < len(sentences) - 1:
                if random.random() < 0.25:
                    result.append('\n\n')
                else:
                    result.append(' ')
        
        return ''.join(result)

    def _aggressive_contractions(self, text: str) -> str:
        """Add ALL contractions"""
        contractions = {
            ' do not ': ' don\'t ',
            ' does not ': ' doesn\'t ',
            ' did not ': ' didn\'t ',
            ' cannot ': ' can\'t ',
            ' could not ': ' couldn\'t ',
            ' would not ': ' wouldn\'t ',
            ' should not ': ' shouldn\'t ',
            ' will not ': ' won\'t ',
            ' is not ': ' isn\'t ',
            ' are not ': ' aren\'t ',
            ' was not ': ' wasn\'t ',
            ' were not ': ' weren\'t ',
            ' have not ': ' haven\'t ',
            ' has not ': ' hasn\'t ',
            ' had not ': ' hadn\'t ',
            ' it is ': ' it\'s ',
            ' that is ': ' that\'s ',
            ' what is ': ' what\'s ',
            ' there is ': ' there\'s ',
            ' you are ': ' you\'re ',
            ' they are ': ' they\'re ',
            ' we are ': ' we\'re ',
            ' I am ': ' I\'m ',
            ' you will ': ' you\'ll ',
            ' I will ': ' I\'ll ',
            ' they will ': ' they\'ll ',
            ' we will ': ' we\'ll ',
            ' he will ': ' he\'ll ',
            ' she will ': ' she\'ll ',
            ' it will ': ' it\'ll ',
            ' I have ': ' I\'ve ',
            ' you have ': ' you\'ve ',
            ' we have ': ' we\'ve ',
            ' they have ': ' they\'ve ',
            ' I would ': ' I\'d ',
            ' you would ': ' you\'d ',
            ' he would ': ' he\'d ',
            ' she would ': ' she\'d ',
            ' we would ': ' we\'d ',
            ' they would ': ' they\'d '
        }
        
        for full, contraction in contractions.items():
            text = text.replace(full, contraction)
            text = text.replace(full.capitalize(), contraction.capitalize())
        
        return text

    def _simplify_everything(self, text: str) -> str:
        """Simplify ALL vocabulary"""
        # Remove any remaining complex words
        text = re.sub(r'\b(aforementioned|heretofore|henceforth|whereby|wherein)\b', '', text, flags=re.IGNORECASE)
        
        # Replace complex phrases
        text = re.sub(r'in order to', 'to', text, flags=re.IGNORECASE)
        text = re.sub(r'due to the fact that', 'because', text, flags=re.IGNORECASE)
        text = re.sub(r'in spite of', 'despite', text, flags=re.IGNORECASE)
        text = re.sub(r'with regard to', 'about', text, flags=re.IGNORECASE)
        text = re.sub(r'in the event that', 'if', text, flags=re.IGNORECASE)
        text = re.sub(r'at this point in time', 'now', text, flags=re.IGNORECASE)
        
        return text

    def _add_personality(self, text: str) -> str:
        """Add personality throughout"""
        personal_phrases = [
            'In my experience',
            'What I\'ve noticed',
            'From what I\'ve seen',
            'I think',
            'Seems like',
            'Probably',
            'Maybe',
            'Could be'
        ]
        
        paragraphs = text.split('\n\n')
        result = []
        
        for para in paragraphs:
            # Add personal phrase to some paragraphs
            if random.random() < 0.3 and len(para.split()) > 20:
                phrase = random.choice(personal_phrases)
                # Make first letter lowercase
                if para:
                    para = phrase + ', ' + para[0].lower() + para[1:]
            result.append(para)
        
        return '\n\n'.join(result)

    def _final_humanize(self, text: str) -> str:
        """Final humanization pass"""
        # Remove any double spaces
        text = re.sub(r'\s+', ' ', text)
        
        # Remove spaces before punctuation
        text = re.sub(r'\s+([.,!?])', r'\1', text)
        
        # Add space after punctuation if missing
        text = re.sub(r'([.,!?])([A-Z])', r'\1 \2', text)
        
        # Clean up paragraph breaks
        text = re.sub(r'\n\n+', '\n\n', text)
        
        return text.strip()


def humanize_content(content: str) -> str:
    """Main function - ULTIMATE humanization"""
    humanizer = UltimateHumanizer()
    return humanizer.humanize(content)


if __name__ == '__main__':
    import sys
    
    # Read from stdin
    input_text = sys.stdin.read()
    
    # Humanize with ULTIMATE power
    result = humanize_content(input_text)
    
    # Output to stdout
    print(result, end='')
