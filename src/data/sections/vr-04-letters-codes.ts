import type { Section } from '../types';

export const vr04LettersCodes: Section = {
  id: 'vr-04-letters-codes',
  subject: 'verbal',
  pack: 'vr-core',
  number: 4,
  title: 'Letters & Codes',
  lesson: `Here, letters behave like a pattern or a secret code. The two ideas you need are the **alphabet line** and a **shift**.

- **Letter Series:** each part of the pair follows its own rule. In AZ, BY, CX… the first letter goes **forward** (A, B, C) while the second goes **backward** (Z, Y, X) — so next is DW.
- **Codes (shift):** every letter moves the same number of steps along the alphabet. If LAMP becomes MBNQ, each letter has moved **+1**, so DESK becomes EFTL. To *decode*, move back the other way.
- **Word–number codes:** letters are swapped for their position in the alphabet (A = 1, B = 2, C = 3 …).

It helps to write the alphabet out (A B C … Z) and count along it carefully.`,
  vocabulary: [
    { term: 'Code', meaning: 'A rule that swaps letters for other letters or numbers.' },
    { term: 'Shift', meaning: 'Moving every letter the same number of steps along the alphabet.' },
    { term: 'Decode', meaning: 'Turn a code back into the original word by reversing the rule.' },
    { term: 'Alphabet position', meaning: 'Where a letter sits: A = 1, B = 2, C = 3, … Z = 26.' },
  ],
  questions: [
    {
      id: 'vr-04-q1',
      sectionId: 'vr-04-letters-codes',
      type: 'mcq',
      prompt: 'What comes next?  AZ,  BY,  CX,  ___',
      choices: ['DW', 'DX', 'EW', 'CY'],
      answer: 'DW',
      explanation: 'The first letter goes forward A → B → C → D, and the second goes backward Z → Y → X → W. So the next pair is DW.',
      difficulty: 2,
      source: 'GL VR · Letter Series',
    },
    {
      id: 'vr-04-q2',
      sectionId: 'vr-04-letters-codes',
      type: 'mcq',
      prompt: 'What comes next?  CD,  FG,  IJ,  ___',
      choices: ['LM', 'KL', 'LN', 'MN'],
      answer: 'LM',
      explanation: 'Both letters jump forward 3 each time: C → F → I → L, and D → G → J → M. So the next pair is LM.',
      difficulty: 2,
      source: 'GL VR · Letter Series',
    },
    {
      id: 'vr-04-q3',
      sectionId: 'vr-04-letters-codes',
      type: 'mcq',
      prompt: 'If LAMP is written in code as MBNQ, what is the code for DESK?',
      choices: ['EFTL', 'CDRJ', 'EFTM', 'EGTL'],
      answer: 'EFTL',
      explanation: 'Each letter moves one step forward (L → M, A → B, …). So DESK becomes E, F, T, L = EFTL.',
      difficulty: 3,
      source: 'GL VR · Letter Codes',
    },
    {
      id: 'vr-04-q4',
      sectionId: 'vr-04-letters-codes',
      type: 'mcq',
      prompt: 'If CAB is coded as 3, 1, 2, what is the code for DEB?',
      choices: ['4, 5, 2', '4, 5, 3', '3, 5, 2', '4, 4, 2'],
      answer: '4, 5, 2',
      explanation: 'Each letter becomes its position in the alphabet: D = 4, E = 5, B = 2. So DEB = 4, 5, 2.',
      difficulty: 2,
      source: 'GL VR · Word-Number Codes',
    },
    {
      id: 'vr-04-q5',
      sectionId: 'vr-04-letters-codes',
      type: 'mcq',
      prompt: 'What comes next?  AB,  DE,  GH,  ___',
      choices: ['JK', 'IJ', 'JL', 'KL'],
      answer: 'JK',
      explanation: 'Each pair jumps forward 3 letters from the last: A,B → D,E → G,H → J,K. So the next pair is JK.',
      difficulty: 2,
      source: 'GL VR · Letter Series',
    },
    {
      id: 'vr-04-q6',
      sectionId: 'vr-04-letters-codes',
      type: 'mcq',
      prompt: 'In a code, each letter moves one step forward (so FROG becomes GSPH). What real word does the code DPX stand for?',
      choices: ['COW', 'CAT', 'DOG', 'OWL'],
      answer: 'COW',
      explanation: 'To decode, move each letter one step BACK: D → C, P → O, X → W. That spells COW.',
      difficulty: 3,
      source: 'GL VR · Letter Codes',
    },
  ],
};
