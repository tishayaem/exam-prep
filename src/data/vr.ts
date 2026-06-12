import type { Section } from './types';

import { vr01LettersSpelling } from './sections/vr-01-letters-spelling';
import { vr02WordMeanings } from './sections/vr-02-word-meanings';
import { vr03WordLogic } from './sections/vr-03-word-logic';
import { vr04LettersCodes } from './sections/vr-04-letters-codes';
import { vr05NumberReasoning } from './sections/vr-05-number-reasoning';

import { vrWordlab01WordLadders } from './sections/vr-wordlab-01-word-ladders';
import { vrWordlab02CrackTheClue } from './sections/vr-wordlab-02-crack-the-clue';
import { vrWordlab03WordRoots } from './sections/vr-wordlab-03-word-roots';

export const vrSections: Section[] = [
  vr01LettersSpelling,
  vr02WordMeanings,
  vr03WordLogic,
  vr04LettersCodes,
  vr05NumberReasoning,

  // Word Lab (stretch tier — word play beyond GL drills)
  vrWordlab01WordLadders,
  vrWordlab02CrackTheClue,
  vrWordlab03WordRoots,
];
