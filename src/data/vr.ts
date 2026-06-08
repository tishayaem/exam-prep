import type { Section } from './types';

import { vr01LettersSpelling } from './sections/vr-01-letters-spelling';
import { vr02WordMeanings } from './sections/vr-02-word-meanings';
import { vr03WordLogic } from './sections/vr-03-word-logic';
import { vr04LettersCodes } from './sections/vr-04-letters-codes';
import { vr05NumberReasoning } from './sections/vr-05-number-reasoning';

export const vrSections: Section[] = [
  vr01LettersSpelling,
  vr02WordMeanings,
  vr03WordLogic,
  vr04LettersCodes,
  vr05NumberReasoning,
];
