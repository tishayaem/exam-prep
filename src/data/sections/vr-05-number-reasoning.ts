import type { Section } from '../types';

export const vr05NumberReasoning: Section = {
  id: 'vr-05-number-reasoning',
  subject: 'verbal',
  pack: 'vr-core',
  number: 5,
  title: 'Number Reasoning',
  lesson: `Verbal reasoning papers sneak in some **number patterns** too. The skill is spotting the rule that gets you from one number to the next.

- **Number Series:** find the step. It might be "+4 each time", "double and add 1", or "square numbers" (1, 4, 9, 16…).
- **Related Numbers:** the same rule links three separate pairs — work it out from the first two, then apply it.
- **Letters for Numbers:** each letter stands for a value; do the sum, then see which letter matches the answer.

When a "+ something" rule doesn't fit, try doubling, or look for square numbers. Always check your rule works for **every** step, not just the first.`,
  vocabulary: [
    { term: 'Sequence', meaning: 'A list of numbers that follows a rule.' },
    { term: 'Term', meaning: 'One number in a sequence.' },
    { term: 'Square number', meaning: 'A number times itself: 1, 4, 9, 16, 25…' },
    { term: 'Rule', meaning: 'How you get from one term to the next.' },
  ],
  questions: [
    {
      id: 'vr-05-q1',
      sectionId: 'vr-05-number-reasoning',
      type: 'numeric',
      prompt: 'What is the next number?  3,  7,  11,  15,  ___',
      answer: '19',
      explanation: 'The numbers go up by 4 each time, so 15 + 4 = 19.',
      difficulty: 1,
      source: 'GL VR · Number Series',
    },
    {
      id: 'vr-05-q2',
      sectionId: 'vr-05-number-reasoning',
      type: 'numeric',
      prompt: 'What is the next number?  1,  4,  9,  16,  ___',
      answer: '25',
      explanation: 'These are the square numbers: 1×1, 2×2, 3×3, 4×4, and next 5×5 = 25.',
      difficulty: 2,
      source: 'GL VR · Number Series',
    },
    {
      id: 'vr-05-q3',
      sectionId: 'vr-05-number-reasoning',
      type: 'numeric',
      prompt: 'What is the next number?  2,  5,  11,  23,  ___',
      answer: '47',
      explanation: 'The rule is "double and add 1": 2×2+1=5, 5×2+1=11, 11×2+1=23, and 23×2+1=47.',
      difficulty: 3,
      source: 'GL VR · Number Series',
    },
    {
      id: 'vr-05-q4',
      sectionId: 'vr-05-number-reasoning',
      type: 'numeric',
      prompt: 'The same rule links each pair: 4 → 13 and 6 → 19. What does 10 become?',
      answer: '31',
      explanation: 'The rule is "multiply by 3, then add 1": 4×3+1=13 and 6×3+1=19. So 10×3+1 = 31.',
      difficulty: 3,
      source: 'GL VR · Related Numbers',
    },
    {
      id: 'vr-05-q5',
      sectionId: 'vr-05-number-reasoning',
      type: 'mcq',
      prompt: 'A = 5, B = 14, C = 12, E = 3. Which letter has the same value as A + C − E?',
      choices: ['B', 'A', 'C', 'E'],
      answer: 'B',
      explanation: 'A + C − E = 5 + 12 − 3 = 14, which is the value of B.',
      difficulty: 2,
      source: 'GL VR · Letters for Numbers',
    },
    {
      id: 'vr-05-q6',
      sectionId: 'vr-05-number-reasoning',
      type: 'numeric',
      prompt: 'Add 6 and 4, then divide the total by 2. What is the answer?',
      answer: '5',
      explanation: '6 + 4 = 10, and 10 ÷ 2 = 5.',
      difficulty: 1,
      source: 'GL VR · Complete the Sum',
    },
  ],
};
