import type { Section } from './types';

import { englishReading01Comprehension } from './sections/english-reading-01-comprehension';
import { englishSpag01Spelling } from './sections/english-spag-01-spelling';
import { englishSpag02PunctuationGrammar } from './sections/english-spag-02-punctuation-grammar';
import { englishWriting01Composition } from './sections/english-writing-01-composition';

export const englishSections: Section[] = [
  englishReading01Comprehension,
  englishSpag01Spelling,
  englishSpag02PunctuationGrammar,
  englishWriting01Composition,
];
