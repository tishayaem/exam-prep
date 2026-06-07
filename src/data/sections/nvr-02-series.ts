import type { Section } from '../types';

export const nvr02Series: Section = {
  id: 'nvr-02-series',
  subject: 'non-verbal',
  pack: 'nvr-core',
  number: 2,
  title: 'Series',
  lesson: `In a **series**, the shapes change by a steady rule as you move along the row. Your job is to spot the rule and carry it on by **one more step**.

The rule is usually one of these: a shape **rotating** a little more each time, the **number of dots** going up or down, the **shading** switching back and forth, or the **shape itself** changing in a pattern (like one more side each time).

The method: find what changes from the **first** shape to the **second**, check the *same* change works from the second to the third, then apply it once more to find the answer.`,
  vocabulary: [
    { term: 'Series', meaning: 'A row of shapes that changes by a steady rule.' },
    { term: 'Rotate', meaning: 'Turn a shape around its centre by a set amount each step.' },
    { term: 'Pattern', meaning: 'The rule the shapes follow as they change.' },
    { term: 'Predict', meaning: 'Work out what must come next from the pattern so far.' },
  ],
  questions: [
    {
      id: 'nvr-02-q1',
      sectionId: 'nvr-02-series',
      type: 'nvr',
      prompt: 'Which arrow comes next in the sequence?',
      answer: '2',
      nvr: {
        kind: 'series',
        stem: [
          { shape: 'arrow', fill: 'black', rotation: 0 },
          { shape: 'arrow', fill: 'black', rotation: 90 },
          { shape: 'arrow', fill: 'black', rotation: 180 },
        ],
        options: [
          { shape: 'arrow', fill: 'black', rotation: 90 },
          { shape: 'arrow', fill: 'black', rotation: 0 },
          { shape: 'arrow', fill: 'black', rotation: 270 },
          { shape: 'arrow', fill: 'black', rotation: 45 },
          { shape: 'arrow', fill: 'black', rotation: 180 },
        ],
      },
      explanation:
        'The arrow turns a quarter-turn (90°) clockwise each step: right → down → left → up. So the next arrow points up.',
      difficulty: 2,
      source: 'GL NVR · Series',
    },
    {
      id: 'nvr-02-q2',
      sectionId: 'nvr-02-series',
      type: 'nvr',
      prompt: 'Which shape comes next in the sequence?',
      answer: '0',
      nvr: {
        kind: 'series',
        stem: [
          { shape: 'pentagon', dots: 1 },
          { shape: 'pentagon', dots: 2 },
          { shape: 'pentagon', dots: 3 },
        ],
        options: [
          { shape: 'pentagon', dots: 4 },
          { shape: 'pentagon', dots: 3 },
          { shape: 'pentagon', dots: 5 },
          { shape: 'pentagon', dots: 2 },
          { shape: 'hexagon', dots: 4 },
        ],
      },
      explanation: 'Each step adds one dot: 1, 2, 3 — so the next pentagon has 4 dots.',
      difficulty: 1,
      source: 'GL NVR · Series',
    },
    {
      id: 'nvr-02-q3',
      sectionId: 'nvr-02-series',
      type: 'nvr',
      prompt: 'Which shape comes next in the sequence?',
      answer: '3',
      nvr: {
        kind: 'series',
        stem: [
          { shape: 'square', fill: 'black' },
          { shape: 'square', fill: 'white' },
          { shape: 'square', fill: 'black' },
        ],
        options: [
          { shape: 'square', fill: 'black' },
          { shape: 'square', fill: 'grey' },
          { shape: 'square', fill: 'striped' },
          { shape: 'square', fill: 'white' },
          { shape: 'circle', fill: 'white' },
        ],
      },
      explanation: 'The squares alternate black, white, black — so the next one is white.',
      difficulty: 2,
      source: 'GL NVR · Series',
    },
    {
      id: 'nvr-02-q4',
      sectionId: 'nvr-02-series',
      type: 'nvr',
      prompt: 'Which shape comes next in the sequence?',
      answer: '1',
      nvr: {
        kind: 'series',
        stem: [
          { shape: 'triangle', fill: 'black' },
          { shape: 'square', fill: 'black' },
          { shape: 'pentagon', fill: 'black' },
        ],
        options: [
          { shape: 'pentagon', fill: 'black' },
          { shape: 'hexagon', fill: 'black' },
          { shape: 'star', fill: 'black' },
          { shape: 'diamond', fill: 'black' },
          { shape: 'circle', fill: 'black' },
        ],
      },
      explanation:
        'Each shape has one more side than the last — triangle 3, square 4, pentagon 5 — so the next has 6 sides: a hexagon.',
      difficulty: 3,
      source: 'GL NVR · Series',
    },
    {
      id: 'nvr-02-q5',
      sectionId: 'nvr-02-series',
      type: 'nvr',
      prompt: 'Which arrow comes next in the sequence?',
      answer: '0',
      nvr: {
        kind: 'series',
        stem: [
          { shape: 'arrow', fill: 'black', rotation: 0 },
          { shape: 'arrow', fill: 'black', rotation: 45 },
          { shape: 'arrow', fill: 'black', rotation: 90 },
        ],
        options: [
          { shape: 'arrow', fill: 'black', rotation: 135 },
          { shape: 'arrow', fill: 'black', rotation: 90 },
          { shape: 'arrow', fill: 'black', rotation: 180 },
          { shape: 'arrow', fill: 'black', rotation: 0 },
          { shape: 'arrow', fill: 'black', rotation: 270 },
        ],
      },
      explanation:
        'The arrow turns an eighth-turn (45°) clockwise each step, so the next one points down-left.',
      difficulty: 3,
      source: 'GL NVR · Series',
    },
    {
      id: 'nvr-02-q6',
      sectionId: 'nvr-02-series',
      type: 'nvr',
      prompt: 'Which shape comes next in the sequence?',
      answer: '1',
      nvr: {
        kind: 'series',
        stem: [
          { shape: 'circle', dots: 4 },
          { shape: 'circle', dots: 3 },
          { shape: 'circle', dots: 2 },
        ],
        options: [
          { shape: 'circle', dots: 2 },
          { shape: 'circle', dots: 1 },
          { shape: 'circle', dots: 3 },
          { shape: 'square', dots: 1 },
          { shape: 'circle', dots: 0 },
        ],
      },
      explanation: 'Each step removes one dot: 4, 3, 2 — so the next circle has just 1 dot.',
      difficulty: 2,
      source: 'GL NVR · Series',
    },
  ],
};
