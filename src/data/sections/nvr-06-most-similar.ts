import type { Section } from '../types';

export const nvr06MostSimilar: Section = {
  id: 'nvr-06-most-similar',
  subject: 'non-verbal',
  pack: 'nvr-core',
  number: 6,
  title: 'Most Similar',
  lesson: `This is **odd one out in reverse**: three shapes share a hidden rule, and you pick the option that **belongs with them**.

The method is the same detective work. Compare the three shapes one feature at a time — shape, shading, size, rotation, dots, and which way they face — and find what ALL THREE share. That shared feature is the rule. Then test each option against the rule and keep the only one that fits.

Beware the half-match: an option that shares something with ONE of the three (same shape as the first, say) but not the rule itself. The rule must work for all three — and features that vary across the three (different shapes, different shading) are NOT the rule, they are the distraction.`,
  vocabulary: [
    { term: 'Most similar', meaning: 'The option that follows the same rule as the three example shapes.' },
    { term: 'Shared feature', meaning: 'Something true of ALL the examples — the rule you are hunting for.' },
    { term: 'Half-match', meaning: 'A trap option that matches one example but not the rule.' },
    { term: 'Varying feature', meaning: 'A feature that differs across the examples — never the rule.' },
  ],
  questions: [
    {
      id: 'nvr-06-q1',
      sectionId: 'nvr-06-most-similar',
      type: 'nvr',
      prompt: 'Which shape belongs with these three?',
      answer: '0',
      nvr: {
        kind: 'most-similar',
        stem: [
          { shape: 'circle', fill: 'black' },
          { shape: 'square', fill: 'black' },
          { shape: 'triangle', fill: 'black' },
        ],
        options: [
          { shape: 'star', fill: 'black' },
          { shape: 'circle', fill: 'white' },
          { shape: 'square', fill: 'striped' },
          { shape: 'pentagon', fill: 'grey' },
          { shape: 'hexagon', fill: 'white' },
        ],
      },
      explanation:
        'The shapes are all different, so shape is not the rule — but all three are BLACK. The only black option is the star.',
      difficulty: 1,
      source: 'GL NVR · Most similar',
    },
    {
      id: 'nvr-06-q2',
      sectionId: 'nvr-06-most-similar',
      type: 'nvr',
      prompt: 'Which shape belongs with these three?',
      answer: '1',
      nvr: {
        kind: 'most-similar',
        stem: [
          { shape: 'square', fill: 'striped' },
          { shape: 'circle', fill: 'striped' },
          { shape: 'hexagon', fill: 'striped' },
        ],
        options: [
          { shape: 'pentagon', fill: 'black' },
          { shape: 'star', fill: 'striped' },
          { shape: 'circle', fill: 'black' },
          { shape: 'triangle', fill: 'white' },
          { shape: 'diamond', fill: 'grey' },
        ],
      },
      explanation:
        'All three examples are striped. Only the star is striped too. (The black circle matches one example\'s SHAPE — a half-match trap.)',
      difficulty: 1,
      source: 'GL NVR · Most similar',
      variantOf: 'nvr-06-q1',
    },
    {
      id: 'nvr-06-q3',
      sectionId: 'nvr-06-most-similar',
      type: 'nvr',
      prompt: 'Which shape belongs with these three?',
      answer: '3',
      nvr: {
        kind: 'most-similar',
        stem: [
          { shape: 'triangle', fill: 'grey' },
          { shape: 'circle', fill: 'grey' },
          { shape: 'pentagon', fill: 'grey' },
        ],
        options: [
          { shape: 'triangle', fill: 'black' },
          { shape: 'circle', fill: 'white' },
          { shape: 'star', fill: 'striped' },
          { shape: 'diamond', fill: 'grey' },
          { shape: 'pentagon', fill: 'white' },
        ],
      },
      explanation:
        'All three are grey. The grey diamond is the only option that follows the rule.',
      difficulty: 1,
      source: 'GL NVR · Most similar',
      variantOf: 'nvr-06-q1',
    },
    {
      id: 'nvr-06-q4',
      sectionId: 'nvr-06-most-similar',
      type: 'nvr',
      prompt: 'Which shape belongs with these three?',
      answer: '2',
      nvr: {
        kind: 'most-similar',
        stem: [
          { shape: 'circle', dots: 2 },
          { shape: 'square', dots: 2 },
          { shape: 'pentagon', dots: 2 },
        ],
        options: [
          { shape: 'hexagon', dots: 3 },
          { shape: 'triangle', dots: 1 },
          { shape: 'star', dots: 2 },
          { shape: 'diamond', dots: 4 },
          { shape: 'circle', dots: 0 },
        ],
      },
      explanation:
        'Each example holds exactly TWO dots. Count, don\'t glance: only the star has two.',
      difficulty: 2,
      source: 'GL NVR · Most similar',
    },
    {
      id: 'nvr-06-q5',
      sectionId: 'nvr-06-most-similar',
      type: 'nvr',
      prompt: 'Which shape belongs with these three?',
      answer: '1',
      nvr: {
        kind: 'most-similar',
        stem: [
          { shape: 'triangle', fill: 'black', size: 'sm' },
          { shape: 'square', fill: 'white', size: 'sm' },
          { shape: 'star', fill: 'striped', size: 'sm' },
        ],
        options: [
          { shape: 'hexagon', fill: 'black', size: 'lg' },
          { shape: 'pentagon', fill: 'grey', size: 'sm' },
          { shape: 'circle', fill: 'white', size: 'lg' },
          { shape: 'diamond', fill: 'striped', size: 'lg' },
          { shape: 'arrow', fill: 'black', size: 'lg' },
        ],
      },
      explanation:
        'Shapes and shading all vary, so neither is the rule. What the three share is SIZE — all small. Only the pentagon is small.',
      difficulty: 2,
      source: 'GL NVR · Most similar',
    },
    {
      id: 'nvr-06-q6',
      sectionId: 'nvr-06-most-similar',
      type: 'nvr',
      prompt: 'Which shape belongs with these three?',
      answer: '0',
      nvr: {
        kind: 'most-similar',
        stem: [
          { shape: 'square', fill: 'black', rotation: 45 },
          { shape: 'arrow', fill: 'black', rotation: 45 },
          { shape: 'flag', fill: 'black', rotation: 45 },
        ],
        options: [
          { shape: 'triangle', fill: 'black', rotation: 45 },
          { shape: 'arrow', fill: 'black', rotation: 90 },
          { shape: 'flag', fill: 'black' },
          { shape: 'boot', fill: 'black', rotation: 90 },
          { shape: 'star', fill: 'black' },
        ],
      },
      explanation:
        'All three examples are tilted by the same eighth-turn (45°). The tilted triangle matches; the others are straight or quarter-turned.',
      difficulty: 2,
      source: 'GL NVR · Most similar',
    },
    {
      id: 'nvr-06-q7',
      sectionId: 'nvr-06-most-similar',
      type: 'nvr',
      prompt: 'Which shape belongs with these three?',
      answer: '0',
      nvr: {
        kind: 'most-similar',
        stem: [
          { shape: 'circle', dots: 1 },
          { shape: 'square', dots: 1 },
          { shape: 'hexagon', dots: 1 },
        ],
        options: [
          { shape: 'pentagon', dots: 1 },
          { shape: 'circle', dots: 2 },
          { shape: 'square', dots: 0 },
          { shape: 'star', dots: 3 },
          { shape: 'diamond', dots: 2 },
        ],
      },
      explanation:
        'One dot inside each white shape — that is the whole rule. The pentagon with one dot belongs.',
      difficulty: 2,
      source: 'GL NVR · Most similar',
      variantOf: 'nvr-06-q4',
    },
    {
      id: 'nvr-06-q8',
      sectionId: 'nvr-06-most-similar',
      type: 'nvr',
      prompt: 'Which boot belongs with these three?',
      answer: '2',
      nvr: {
        kind: 'most-similar',
        stem: [
          { shape: 'boot', fill: 'black', mirrored: true },
          { shape: 'boot', fill: 'black', mirrored: true, rotation: 90 },
          { shape: 'boot', fill: 'black', mirrored: true, rotation: 180 },
        ],
        options: [
          { shape: 'boot', fill: 'black' },
          { shape: 'boot', fill: 'black', rotation: 270 },
          { shape: 'boot', fill: 'black', mirrored: true, rotation: 270 },
          { shape: 'flag', fill: 'black', mirrored: true },
          { shape: 'boot', fill: 'black', rotation: 90 },
        ],
      },
      explanation:
        'All three are the SAME reflected boot, just rotated. Only option C is that reflected boot (turned three quarters). The others are the unreflected boot — rotating them will never match.',
      difficulty: 3,
      source: 'GL NVR · Most similar (reflection)',
    },
    {
      id: 'nvr-06-q9',
      sectionId: 'nvr-06-most-similar',
      type: 'nvr',
      prompt: 'Which flag belongs with these three?',
      answer: '1',
      nvr: {
        kind: 'most-similar',
        stem: [
          { shape: 'flag', fill: 'striped', mirrored: true },
          { shape: 'flag', fill: 'striped', mirrored: true, rotation: 90 },
          { shape: 'flag', fill: 'striped', mirrored: true, rotation: 180 },
        ],
        options: [
          { shape: 'flag', fill: 'striped' },
          { shape: 'flag', fill: 'striped', mirrored: true, rotation: 270 },
          { shape: 'flag', fill: 'striped', rotation: 270 },
          { shape: 'flag', fill: 'striped', rotation: 90 },
          { shape: 'boot', fill: 'striped', mirrored: true },
        ],
      },
      explanation:
        'The three flags are reflections (pennant pointing the "wrong" way), each turned a bit more. Only option B is the same reflected flag. Check the pennant direction before the rotation.',
      difficulty: 3,
      source: 'GL NVR · Most similar (reflection)',
      variantOf: 'nvr-06-q8',
    },
    {
      id: 'nvr-06-q10',
      sectionId: 'nvr-06-most-similar',
      type: 'nvr',
      prompt: 'Which shape belongs with these three?',
      answer: '0',
      nvr: {
        kind: 'most-similar',
        stem: [
          { shape: 'square', fill: 'black', size: 'lg' },
          { shape: 'triangle', fill: 'black', size: 'lg' },
          { shape: 'hexagon', fill: 'black', size: 'lg' },
        ],
        options: [
          { shape: 'circle', fill: 'black', size: 'lg' },
          { shape: 'circle', fill: 'black', size: 'sm' },
          { shape: 'square', fill: 'white', size: 'lg' },
          { shape: 'star', fill: 'white', size: 'sm' },
          { shape: 'pentagon', fill: 'striped', size: 'lg' },
        ],
      },
      explanation:
        'Two things are shared this time: every example is large AND black. Only the big black circle matches both. The small black circle and the big white square are half-matches.',
      difficulty: 2,
      source: 'GL NVR · Most similar',
      variantOf: 'nvr-06-q5',
    },
    {
      id: 'nvr-06-q11',
      sectionId: 'nvr-06-most-similar',
      type: 'nvr',
      prompt: 'Which shape belongs with these three?',
      answer: '3',
      nvr: {
        kind: 'most-similar',
        stem: [
          { shape: 'arrow', fill: 'black' },
          { shape: 'arrow', fill: 'white', rotation: 90 },
          { shape: 'arrow', fill: 'striped', rotation: 180 },
        ],
        options: [
          { shape: 'flag', fill: 'grey' },
          { shape: 'boot', fill: 'grey', rotation: 270 },
          { shape: 'triangle', fill: 'grey' },
          { shape: 'arrow', fill: 'grey', rotation: 270 },
          { shape: 'star', fill: 'grey' },
        ],
      },
      explanation:
        'Shading and rotation both vary, so the rule is simply the SHAPE: they are all arrows. Only option D is an arrow.',
      difficulty: 1,
      source: 'GL NVR · Most similar',
    },
    {
      id: 'nvr-06-q12',
      sectionId: 'nvr-06-most-similar',
      type: 'nvr',
      prompt: 'Which shape belongs with these three?',
      answer: '3',
      nvr: {
        kind: 'most-similar',
        stem: [
          { shape: 'pentagon', fill: 'white' },
          { shape: 'hexagon', fill: 'striped', size: 'sm' },
          { shape: 'pentagon', fill: 'grey', size: 'lg' },
        ],
        options: [
          { shape: 'triangle', fill: 'white' },
          { shape: 'square', fill: 'grey' },
          { shape: 'diamond', fill: 'striped' },
          { shape: 'hexagon', fill: 'black' },
          { shape: 'square', fill: 'striped' },
        ],
      },
      explanation:
        'Count the sides: pentagon 5, hexagon 6, pentagon 5 — every example has FIVE OR MORE sides. Triangles, squares and diamonds have too few; the hexagon belongs.',
      difficulty: 3,
      source: 'GL NVR · Most similar',
    },
    {
      id: 'nvr-06-q13',
      sectionId: 'nvr-06-most-similar',
      type: 'nvr',
      prompt: 'Which boot belongs with these three?',
      answer: '2',
      nvr: {
        kind: 'most-similar',
        stem: [
          { shape: 'boot', rotation: 90 },
          { shape: 'boot', fill: 'striped', rotation: 90 },
          { shape: 'boot', fill: 'black', rotation: 90, size: 'sm' },
        ],
        options: [
          { shape: 'boot', mirrored: true, rotation: 90 },
          { shape: 'boot', rotation: 270 },
          { shape: 'boot', fill: 'grey', rotation: 90, size: 'lg' },
          { shape: 'flag', rotation: 90 },
          { shape: 'boot' },
        ],
      },
      explanation:
        'Shading and size vary; what the three share is being the SAME boot given a quarter turn. Option C matches. Option A is the reflection at the same angle — the classic trap.',
      difficulty: 3,
      source: 'GL NVR · Most similar (reflection)',
      variantOf: 'nvr-06-q8',
    },
    {
      id: 'nvr-06-q14',
      sectionId: 'nvr-06-most-similar',
      type: 'nvr',
      prompt: 'Which shape belongs with these three?',
      answer: '4',
      nvr: {
        kind: 'most-similar',
        stem: [
          { shape: 'circle', fill: 'black' },
          { shape: 'circle', fill: 'white' },
          { shape: 'circle', fill: 'striped' },
        ],
        options: [
          { shape: 'square', fill: 'black' },
          { shape: 'star', fill: 'white' },
          { shape: 'triangle', fill: 'striped' },
          { shape: 'hexagon', fill: 'grey' },
          { shape: 'circle', fill: 'grey' },
        ],
      },
      explanation:
        'The shading varies, so the rule is the shape: all circles. The grey circle is the only circle on offer.',
      difficulty: 1,
      source: 'GL NVR · Most similar',
      variantOf: 'nvr-06-q11',
    },
  ],
  examples: [
    {
      title: 'The rule is what they ALL share',
      body: 'If the three shapes are different shapes, shape is not the rule. If their shading varies, shading is not the rule. Whatever is left — size, dots, tilt, facing — is your rule.',
    },
    {
      title: 'Test every option, keep one',
      body: 'Say the rule out loud ("all small"), then go A, B, C, D, E asking only "is it small?". If two options pass your rule, the rule is incomplete — look for a second shared feature.',
    },
  ],
};
