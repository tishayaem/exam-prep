import type { Section } from './types';

import { englishReading01Comprehension } from './sections/english-reading-01-comprehension';
import { englishReading02LongFiction } from './sections/english-reading-02-long-fiction';
import { englishReading03NonfictionPoetry } from './sections/english-reading-03-nonfiction-poetry';
import { englishSpag01Spelling } from './sections/english-spag-01-spelling';
import { englishSpag02PunctuationGrammar } from './sections/english-spag-02-punctuation-grammar';
import { englishWriting01Composition } from './sections/english-writing-01-composition';

export const englishSections: Section[] = [
  englishReading01Comprehension,
  englishReading02LongFiction,
  englishReading03NonfictionPoetry,
  englishSpag01Spelling,
  englishSpag02PunctuationGrammar,
  englishWriting01Composition,
];
