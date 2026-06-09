import type { Section } from '../types';

export const nvr01OddOneOut: Section = {
  id: 'nvr-01-odd-one-out',
  subject: 'non-verbal',
  pack: 'nvr-core',
  number: 1,
  title: 'Odd One Out',
  lesson: `In an **odd one out** question, four of the five shapes follow a hidden rule — and one breaks it. Your job is to spot the rule, then the rule-breaker.

The rule is almost always one of a few things examiners love to change: the **shape** itself, its **shading** (white, black or striped), how it is **rotated**, its **size**, or the **number of dots** inside it.

Two traps to remember. First, **turning a shape doesn't change what it is** — four triangles at different angles are still all triangles. Second, when the shapes are all different, the rule is usually a *feature they share* (all the same size, all the same shading), not the shapes themselves.

The nastiest trap of all is the **reflection**: a mirror image looks like "just another turn" but it is NOT — no rotation ever turns a shape into its reflection. With flags and boots, track which way the pennant or toe points.

Tip: don't stare at the whole picture. Check **one feature at a time** across all five — "are they all the same colour? … the same size? … the same number of dots?" — and the odd one jumps out.`,
  vocabulary: [
    { term: 'Odd one out', meaning: 'The figure that breaks the rule the other four all share.' },
    { term: 'Shading', meaning: 'How a shape is filled in — white, black or striped.' },
    { term: 'Rotation', meaning: 'Turning a shape around its centre — it stays the same shape.' },
    { term: 'Attribute', meaning: 'A feature you can compare: shape, shading, size, rotation or dots.' },
  ],
  questions: [
    {
      id: 'nvr-01-q1',
      sectionId: 'nvr-01-odd-one-out',
      type: 'nvr',
      prompt: 'Which shape is the odd one out?',
      answer: '4',
      nvr: {
        kind: 'odd-one-out',
        stem: [
          { shape: 'circle', fill: 'black' },
          { shape: 'square', fill: 'black' },
          { shape: 'pentagon', fill: 'black' },
          { shape: 'star', fill: 'black' },
          { shape: 'triangle', fill: 'white' },
        ],
      },
      explanation:
        'Every shape is filled in black except the triangle, which is white. The rule is the shading, not the shape — so the white triangle is the odd one out.',
      difficulty: 1,
      source: 'GL NVR · Odd one out',
    },
    {
      id: 'nvr-01-q2',
      sectionId: 'nvr-01-odd-one-out',
      type: 'nvr',
      prompt: 'Which shape is the odd one out?',
      answer: '1',
      nvr: {
        kind: 'odd-one-out',
        stem: [
          { shape: 'triangle', dots: 3 },
          { shape: 'diamond', dots: 5 },
          { shape: 'square', dots: 4 },
          { shape: 'pentagon', dots: 5 },
          { shape: 'hexagon', dots: 6 },
        ],
      },
      explanation:
        'In four shapes the number of dots equals the number of sides — triangle 3, square 4, pentagon 5, hexagon 6. The diamond has 4 sides but 5 dots, so it breaks the rule.',
      difficulty: 3,
      source: 'GL NVR · Odd one out',
    },
    {
      id: 'nvr-01-q3',
      sectionId: 'nvr-01-odd-one-out',
      type: 'nvr',
      prompt: 'Which arrow is the odd one out?',
      answer: '0',
      nvr: {
        kind: 'odd-one-out',
        stem: [
          { shape: 'arrow', fill: 'black', rotation: 45 },
          { shape: 'arrow', fill: 'black', rotation: 0 },
          { shape: 'arrow', fill: 'black', rotation: 90 },
          { shape: 'arrow', fill: 'black', rotation: 180 },
          { shape: 'arrow', fill: 'black', rotation: 270 },
        ],
      },
      explanation:
        'Four arrows point straight — right, down, left and up (quarter turns). One points diagonally (a 45° turn), so it is the odd one out.',
      difficulty: 2,
      source: 'GL NVR · Odd one out',
    },
    {
      id: 'nvr-01-q4',
      sectionId: 'nvr-01-odd-one-out',
      type: 'nvr',
      prompt: 'Which shape is the odd one out?',
      answer: '2',
      nvr: {
        kind: 'odd-one-out',
        stem: [
          { shape: 'square', fill: 'black', size: 'lg' },
          { shape: 'square', fill: 'black', size: 'lg' },
          { shape: 'square', fill: 'black', size: 'sm' },
          { shape: 'square', fill: 'black', size: 'lg' },
          { shape: 'square', fill: 'black', size: 'lg' },
        ],
      },
      explanation:
        'Every square is identical except one, which is smaller. Here the rule is size.',
      difficulty: 1,
      source: 'GL NVR · Odd one out',
    },
    {
      id: 'nvr-01-q5',
      sectionId: 'nvr-01-odd-one-out',
      type: 'nvr',
      prompt: 'Which circle is the odd one out?',
      answer: '3',
      nvr: {
        kind: 'odd-one-out',
        stem: [
          { shape: 'circle', dots: 2 },
          { shape: 'circle', dots: 2 },
          { shape: 'circle', dots: 2 },
          { shape: 'circle', dots: 3 },
          { shape: 'circle', dots: 2 },
        ],
      },
      explanation:
        'Four circles contain two dots; one contains three. The number of dots is what sets it apart.',
      difficulty: 2,
      source: 'GL NVR · Odd one out',
    },
    {
      id: 'nvr-01-q6',
      sectionId: 'nvr-01-odd-one-out',
      type: 'nvr',
      prompt: 'Which shape is the odd one out?',
      answer: '2',
      nvr: {
        kind: 'odd-one-out',
        stem: [
          { shape: 'triangle', fill: 'black', rotation: 0 },
          { shape: 'triangle', fill: 'black', rotation: 90 },
          { shape: 'square', fill: 'black', rotation: 45 },
          { shape: 'triangle', fill: 'black', rotation: 180 },
          { shape: 'triangle', fill: 'black', rotation: 270 },
        ],
      },
      explanation:
        'Four of the shapes are triangles, just turned to different angles. One is a square — turning a shape never changes what it is, so the square is the odd one out.',
      difficulty: 2,
      source: 'GL NVR · Odd one out',
    },
    {
      id: 'nvr-01-q7',
      sectionId: 'nvr-01-odd-one-out',
      type: 'nvr',
      prompt: 'Which flag is the odd one out?',
      answer: '3',
      nvr: {
        kind: 'odd-one-out',
        stem: [
          { shape: 'flag', fill: 'black', rotation: 0 },
          { shape: 'flag', fill: 'black', rotation: 90 },
          { shape: 'flag', fill: 'black', rotation: 180 },
          { shape: 'flag', fill: 'black', mirrored: true },
          { shape: 'flag', fill: 'black', rotation: 270 },
        ],
      },
      explanation:
        'Four flags are the SAME flag turned to different angles. One is a mirror image — no amount of turning will ever make a reflected flag match the others. Rotation keeps a shape the same; reflection does not.',
      difficulty: 2,
      source: 'GL NVR · Odd one out (reflection)',
    },
    {
      id: 'nvr-01-q8',
      sectionId: 'nvr-01-odd-one-out',
      type: 'nvr',
      prompt: 'Which boot is the odd one out?',
      answer: '1',
      nvr: {
        kind: 'odd-one-out',
        stem: [
          { shape: 'boot', fill: 'striped', mirrored: true },
          { shape: 'boot', fill: 'striped' },
          { shape: 'boot', fill: 'striped', mirrored: true, rotation: 90 },
          { shape: 'boot', fill: 'striped', mirrored: true, rotation: 180 },
          { shape: 'boot', fill: 'striped', mirrored: true, rotation: 270 },
        ],
      },
      explanation:
        'Four boots are rotations of the same left-facing boot. The second boot faces the other way — it is the reflection, so it can never be turned to match. Check the toe direction as you rotate each one in your head.',
      difficulty: 3,
      source: 'GL NVR · Odd one out (reflection)',
    },
  ],
};
