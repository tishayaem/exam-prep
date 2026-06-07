import type { Section } from '../types';
import { MathsRatioDiagram } from '../../diagrams/maths-ratio-01-ratio';

export const mathsRatio01Ratio: Section = {
  id: 'maths-ratio-01-ratio',
  subject: 'maths',
  pack: 'maths-ratio',
  number: 1,
  title: 'Ratio & Proportion',
  diagram: MathsRatioDiagram,
  lesson: `A **ratio** compares amounts. To **share in a ratio**, add the parts to find how big one part is. Share £60 in the ratio 2 : 3 → that's 5 parts, so one part = £12, giving £24 and £36.

The trap is mixing up a *part* with the *total*. If counters are blue : red = 2 : 3 and there are 35 in total, there are 5 parts, so each part is 7 — not dividing 35 by 2 or 3.

**Direct proportion** scales up together: a recipe for 8 people needs 200 g flour, so for 20 people (×2.5) you need 500 g.

Watch for **inverse proportion**, where more means less: 5 workers take 6 days, but 3 workers take *longer* — 30 worker-days ÷ 3 = 10 days.`,
  vocabulary: [
    { term: 'Ratio', meaning: 'A way of comparing two or more amounts, like 2 : 3.' },
    { term: 'Proportion', meaning: 'How a part relates to the whole, often as a fraction.' },
    { term: 'Part', meaning: 'One share of a ratio. Add the parts to find the total number of shares.' },
    { term: 'Scale', meaning: 'How map or model distance compares to real distance, like 1 : 50,000.' },
  ],
  questions: [
    {
      id: 'maths-ratio-01-q1',
      sectionId: 'maths-ratio-01-ratio',
      type: 'mcq',
      prompt: 'Share £60 in the ratio 2 : 3. How much is the LARGER share?',
      choices: ['£36', '£24', '£30', '£40'],
      answer: '£36',
      explanation: '2 + 3 = 5 parts, so one part is £60 ÷ 5 = £12. The larger share is 3 parts = £36.',
      difficulty: 2,
      source: 'GL Maths · Sharing in a ratio',
    },
    {
      id: 'maths-ratio-01-q2',
      sectionId: 'maths-ratio-01-ratio',
      type: 'mcq',
      prompt: 'Simplify the ratio 18 : 24 to its simplest form.',
      choices: ['3 : 4', '6 : 8', '9 : 12', '2 : 3'],
      answer: '3 : 4',
      explanation: 'Divide both sides by 6: 18 ÷ 6 = 3 and 24 ÷ 6 = 4, giving 3 : 4.',
      difficulty: 1,
      source: 'GL Maths · Simplifying ratios',
    },
    {
      id: 'maths-ratio-01-q3',
      sectionId: 'maths-ratio-01-ratio',
      type: 'numeric',
      prompt: 'A recipe for 8 people uses 200 g of flour. How much flour is needed for 20 people, in grams?',
      answer: '500',
      explanation: '20 ÷ 8 = 2.5, so multiply the flour by 2.5: 200 × 2.5 = 500 g.',
      difficulty: 2,
      source: 'GL Maths · Direct proportion',
    },
    {
      id: 'maths-ratio-01-q4',
      sectionId: 'maths-ratio-01-ratio',
      type: 'numeric',
      prompt: 'Blue and red counters are in the ratio 2 : 3. There are 35 counters in total. How many are red?',
      answer: '21',
      explanation: '2 + 3 = 5 parts, so one part is 35 ÷ 5 = 7. Red is 3 parts = 21.',
      difficulty: 2,
      source: 'GL Maths · Sharing in a ratio',
    },
    {
      id: 'maths-ratio-01-q5',
      sectionId: 'maths-ratio-01-ratio',
      type: 'numeric',
      prompt: 'Sweets are shared between Amy and Ben in the ratio 3 : 5. Ben gets 20 sweets. How many does Amy get?',
      answer: '12',
      explanation: 'Ben’s 5 parts equal 20, so one part is 4. Amy gets 3 parts = 12.',
      difficulty: 2,
      source: 'GL Maths · Ratio — given one part',
    },
    {
      id: 'maths-ratio-01-q6',
      sectionId: 'maths-ratio-01-ratio',
      type: 'numeric',
      prompt: 'A map has a scale of 1 : 50,000. A road is 4 cm long on the map. How long is it in real life, in kilometres?',
      answer: '2',
      explanation: '4 cm × 50,000 = 200,000 cm. There are 100,000 cm in a kilometre, so that is 2 km.',
      difficulty: 3,
      source: 'GL Maths · Scale',
    },
    {
      id: 'maths-ratio-01-q7',
      sectionId: 'maths-ratio-01-ratio',
      type: 'mcq',
      prompt: '5 workers build a wall in 6 days. Working at the same rate, how long would 3 workers take?',
      choices: ['10 days', '3.6 days', '9 days', '18 days'],
      answer: '10 days',
      explanation: 'The job is 5 × 6 = 30 worker-days. With 3 workers that takes 30 ÷ 3 = 10 days — fewer workers means more time.',
      difficulty: 3,
      source: 'GL Maths · Inverse proportion',
    },
  ],
};
