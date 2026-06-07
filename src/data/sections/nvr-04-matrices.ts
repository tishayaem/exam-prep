import type { Section } from '../types';

export const nvr04Matrices: Section = {
  id: 'nvr-04-matrices',
  subject: 'non-verbal',
  pack: 'nvr-core',
  number: 4,
  title: 'Matrices',
  lesson: `A **matrix** is a 3×3 grid of shapes with one square missing (the dashed "?"). The shapes follow a rule **across each row**, and often **down each column** too.

Look along the **rows** first: what changes from left to right — the shading, the number of dots, the size, or the rotation? Then glance down the **columns** to check.

A very common pattern: one feature changes across the row (say white → grey → black), while **each row uses a different shape**. The missing square must obey the rule for its row and its column.`,
  vocabulary: [
    { term: 'Matrix', meaning: 'A grid of shapes (here 3×3) with one square to work out.' },
    { term: 'Grid', meaning: 'Shapes arranged in rows and columns.' },
    { term: 'Row', meaning: 'A line of shapes going across the grid.' },
    { term: 'Column', meaning: 'A line of shapes going down the grid.' },
  ],
  questions: [
    {
      id: 'nvr-04-q1',
      sectionId: 'nvr-04-matrices',
      type: 'nvr',
      prompt: 'Which shape completes the grid?',
      answer: '0',
      nvr: {
        kind: 'matrix',
        stem: [
          { shape: 'circle', fill: 'white' },
          { shape: 'circle', fill: 'grey' },
          { shape: 'circle', fill: 'black' },
          { shape: 'square', fill: 'white' },
          { shape: 'square', fill: 'grey' },
          { shape: 'square', fill: 'black' },
          { shape: 'triangle', fill: 'white' },
          { shape: 'triangle', fill: 'grey' },
        ],
        options: [
          { shape: 'triangle', fill: 'black' },
          { shape: 'triangle', fill: 'white' },
          { shape: 'triangle', fill: 'grey' },
          { shape: 'square', fill: 'black' },
          { shape: 'circle', fill: 'black' },
        ],
      },
      explanation:
        'Across each row the shading goes white, grey, black. The bottom row is triangles, so the missing shape is a black triangle.',
      difficulty: 2,
      source: 'GL NVR · Matrices',
    },
    {
      id: 'nvr-04-q2',
      sectionId: 'nvr-04-matrices',
      type: 'nvr',
      prompt: 'Which shape completes the grid?',
      answer: '2',
      nvr: {
        kind: 'matrix',
        stem: [
          { shape: 'square', dots: 1 },
          { shape: 'square', dots: 2 },
          { shape: 'square', dots: 3 },
          { shape: 'pentagon', dots: 1 },
          { shape: 'pentagon', dots: 2 },
          { shape: 'pentagon', dots: 3 },
          { shape: 'hexagon', dots: 1 },
          { shape: 'hexagon', dots: 2 },
        ],
        options: [
          { shape: 'hexagon', dots: 2 },
          { shape: 'hexagon', dots: 4 },
          { shape: 'hexagon', dots: 3 },
          { shape: 'pentagon', dots: 3 },
          { shape: 'hexagon', dots: 1 },
        ],
      },
      explanation:
        'Across each row the number of dots goes 1, 2, 3. The bottom row is hexagons, so the missing shape is a hexagon with 3 dots.',
      difficulty: 2,
      source: 'GL NVR · Matrices',
    },
    {
      id: 'nvr-04-q3',
      sectionId: 'nvr-04-matrices',
      type: 'nvr',
      prompt: 'Which shape completes the grid?',
      answer: '1',
      nvr: {
        kind: 'matrix',
        stem: [
          { shape: 'triangle', fill: 'black', rotation: 0 },
          { shape: 'triangle', fill: 'black', rotation: 90 },
          { shape: 'triangle', fill: 'black', rotation: 180 },
          { shape: 'square', fill: 'black', rotation: 0 },
          { shape: 'square', fill: 'black', rotation: 90 },
          { shape: 'square', fill: 'black', rotation: 180 },
          { shape: 'pentagon', fill: 'black', rotation: 0 },
          { shape: 'pentagon', fill: 'black', rotation: 90 },
        ],
        options: [
          { shape: 'pentagon', fill: 'black', rotation: 0 },
          { shape: 'pentagon', fill: 'black', rotation: 180 },
          { shape: 'pentagon', fill: 'black', rotation: 90 },
          { shape: 'pentagon', fill: 'black', rotation: 270 },
          { shape: 'square', fill: 'black', rotation: 180 },
        ],
      },
      explanation:
        'Each row is one shape, turning further across the row — 0°, 90°, 180°. The bottom row is pentagons, so the missing one is a pentagon turned to 180°.',
      difficulty: 3,
      source: 'GL NVR · Matrices',
    },
    {
      id: 'nvr-04-q4',
      sectionId: 'nvr-04-matrices',
      type: 'nvr',
      prompt: 'Which shape completes the grid?',
      answer: '3',
      nvr: {
        kind: 'matrix',
        stem: [
          { shape: 'circle', fill: 'black', size: 'sm' },
          { shape: 'circle', fill: 'black', size: 'md' },
          { shape: 'circle', fill: 'black', size: 'lg' },
          { shape: 'square', fill: 'black', size: 'sm' },
          { shape: 'square', fill: 'black', size: 'md' },
          { shape: 'square', fill: 'black', size: 'lg' },
          { shape: 'star', fill: 'black', size: 'sm' },
          { shape: 'star', fill: 'black', size: 'md' },
        ],
        options: [
          { shape: 'star', fill: 'black', size: 'sm' },
          { shape: 'star', fill: 'black', size: 'md' },
          { shape: 'hexagon', fill: 'black', size: 'lg' },
          { shape: 'star', fill: 'black', size: 'lg' },
          { shape: 'circle', fill: 'black', size: 'lg' },
        ],
      },
      explanation:
        'Across each row the shape gets bigger — small, medium, large. The bottom row is stars, so the missing one is a large star.',
      difficulty: 2,
      source: 'GL NVR · Matrices',
    },
  ],
};
