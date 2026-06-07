import type { Section } from '../types';

export const nvr03Analogies: Section = {
  id: 'nvr-03-analogies',
  subject: 'non-verbal',
  pack: 'nvr-core',
  number: 3,
  title: 'Analogies',
  lesson: `An **analogy** has two pairs: "the first shape is to the second as the third is to ___".

Work out exactly what turns the **first** shape into the **second** — a rotation? a shading change? a size change? more dots? Then do the *same thing* to the third shape to find the answer.

The trick is to change **only** what the first pair changes, and leave everything else alone. If the first pair just gets smaller, the answer is the third shape made smaller — same shape, same shading, just smaller.`,
  vocabulary: [
    { term: 'Analogy', meaning: 'Two pairs that change in the same way: A is to B as C is to ?' },
    { term: 'Transformation', meaning: 'The change that turns one shape into another.' },
    { term: 'Pair', meaning: 'Two shapes linked by a transformation.' },
    { term: 'Rotate', meaning: 'Turn a shape around its centre.' },
  ],
  questions: [
    {
      id: 'nvr-03-q1',
      sectionId: 'nvr-03-analogies',
      type: 'nvr',
      prompt: 'Work out how the first pair changes, then complete the second pair.',
      answer: '0',
      nvr: {
        kind: 'analogy',
        stem: [
          { shape: 'arrow', fill: 'black', rotation: 0 },
          { shape: 'arrow', fill: 'black', rotation: 90 },
          { shape: 'triangle', fill: 'black', rotation: 0 },
        ],
        options: [
          { shape: 'triangle', fill: 'black', rotation: 90 },
          { shape: 'triangle', fill: 'black', rotation: 180 },
          { shape: 'triangle', fill: 'black', rotation: 0 },
          { shape: 'triangle', fill: 'black', rotation: 270 },
          { shape: 'square', fill: 'black', rotation: 90 },
        ],
      },
      explanation:
        'The first shape turns 90° clockwise to make the second. Turn the triangle 90° clockwise too.',
      difficulty: 2,
      source: 'GL NVR · Analogies',
    },
    {
      id: 'nvr-03-q2',
      sectionId: 'nvr-03-analogies',
      type: 'nvr',
      prompt: 'Work out how the first pair changes, then complete the second pair.',
      answer: '1',
      nvr: {
        kind: 'analogy',
        stem: [
          { shape: 'circle', fill: 'white' },
          { shape: 'circle', fill: 'black' },
          { shape: 'square', fill: 'white' },
        ],
        options: [
          { shape: 'square', fill: 'white' },
          { shape: 'square', fill: 'black' },
          { shape: 'square', fill: 'grey' },
          { shape: 'square', fill: 'striped' },
          { shape: 'circle', fill: 'black' },
        ],
      },
      explanation:
        'The shape becomes filled black. So the white square becomes a black square.',
      difficulty: 1,
      source: 'GL NVR · Analogies',
    },
    {
      id: 'nvr-03-q3',
      sectionId: 'nvr-03-analogies',
      type: 'nvr',
      prompt: 'Work out how the first pair changes, then complete the second pair.',
      answer: '2',
      nvr: {
        kind: 'analogy',
        stem: [
          { shape: 'star', fill: 'black', size: 'lg' },
          { shape: 'star', fill: 'black', size: 'sm' },
          { shape: 'hexagon', fill: 'black', size: 'lg' },
        ],
        options: [
          { shape: 'hexagon', fill: 'black', size: 'lg' },
          { shape: 'hexagon', fill: 'black', size: 'md' },
          { shape: 'hexagon', fill: 'black', size: 'sm' },
          { shape: 'pentagon', fill: 'black', size: 'sm' },
          { shape: 'star', fill: 'black', size: 'sm' },
        ],
      },
      explanation: 'The shape gets smaller. So the large hexagon becomes a small hexagon.',
      difficulty: 2,
      source: 'GL NVR · Analogies',
    },
    {
      id: 'nvr-03-q4',
      sectionId: 'nvr-03-analogies',
      type: 'nvr',
      prompt: 'Work out how the first pair changes, then complete the second pair.',
      answer: '0',
      nvr: {
        kind: 'analogy',
        stem: [
          { shape: 'square', dots: 1 },
          { shape: 'square', dots: 3 },
          { shape: 'triangle', dots: 1 },
        ],
        options: [
          { shape: 'triangle', dots: 3 },
          { shape: 'triangle', dots: 2 },
          { shape: 'triangle', dots: 4 },
          { shape: 'triangle', dots: 1 },
          { shape: 'square', dots: 3 },
        ],
      },
      explanation:
        'The number of dots goes from 1 to 3. So the triangle with 1 dot becomes a triangle with 3 dots.',
      difficulty: 2,
      source: 'GL NVR · Analogies',
    },
    {
      id: 'nvr-03-q5',
      sectionId: 'nvr-03-analogies',
      type: 'nvr',
      prompt: 'Work out how the first pair changes, then complete the second pair.',
      answer: '3',
      nvr: {
        kind: 'analogy',
        stem: [
          { shape: 'arrow', fill: 'black', rotation: 0 },
          { shape: 'arrow', fill: 'black', rotation: 180 },
          { shape: 'pentagon', fill: 'black', rotation: 0 },
        ],
        options: [
          { shape: 'pentagon', fill: 'black', rotation: 0 },
          { shape: 'pentagon', fill: 'black', rotation: 90 },
          { shape: 'pentagon', fill: 'black', rotation: 270 },
          { shape: 'pentagon', fill: 'black', rotation: 180 },
          { shape: 'arrow', fill: 'black', rotation: 180 },
        ],
      },
      explanation:
        'The arrow turns half-way round (180°). Turn the pentagon 180° too — its point now faces down.',
      difficulty: 3,
      source: 'GL NVR · Analogies',
    },
    {
      id: 'nvr-03-q6',
      sectionId: 'nvr-03-analogies',
      type: 'nvr',
      prompt: 'Work out how the first pair changes, then complete the second pair.',
      answer: '1',
      nvr: {
        kind: 'analogy',
        stem: [
          { shape: 'circle', fill: 'white' },
          { shape: 'circle', fill: 'striped' },
          { shape: 'hexagon', fill: 'white' },
        ],
        options: [
          { shape: 'hexagon', fill: 'black' },
          { shape: 'hexagon', fill: 'striped' },
          { shape: 'hexagon', fill: 'white' },
          { shape: 'hexagon', fill: 'grey' },
          { shape: 'circle', fill: 'striped' },
        ],
      },
      explanation: 'The shape becomes striped. So the white hexagon becomes a striped hexagon.',
      difficulty: 2,
      source: 'GL NVR · Analogies',
    },
  ],
};
