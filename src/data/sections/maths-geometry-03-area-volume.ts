import type { Section } from '../types';
import { MathsAreaVolumeDiagram } from '../../diagrams/maths-geometry-03-area-volume';

export const mathsGeometry03AreaVolume: Section = {
  id: 'maths-geometry-03-area-volume',
  subject: 'maths',
  pack: 'maths-geometry',
  number: 3,
  title: 'Perimeter, Area & Volume',
  diagram: MathsAreaVolumeDiagram,
  lesson: `**Perimeter** is the distance all the way round (just add the sides). **Area** is the space inside, measured in square units. **Volume** is the space a solid fills, in cubic units.

- Rectangle: area = length × width; perimeter = 2 × (length + width).
- Triangle: area = ½ × base × height — don't forget the half.
- Cuboid: volume = length × width × height.

A **compound shape** (like an L) is split into rectangles, then you add or subtract: a 10 × 8 rectangle with a 4 × 3 corner cut out has area 80 − 12 = 68 cm².

You can also work **backwards**: area 48 cm² with width 6 cm means the length is 8 cm.`,
  vocabulary: [
    { term: 'Perimeter', meaning: 'The total distance around the outside of a shape.' },
    { term: 'Area', meaning: 'The amount of flat space inside a shape, in square units (cm²).' },
    { term: 'Volume', meaning: 'The amount of space a solid takes up, in cubic units (cm³).' },
    { term: 'Compound shape', meaning: 'A shape made by joining or cutting simpler shapes.' },
  ],
  questions: [
    {
      id: 'maths-geometry-03-q1',
      sectionId: 'maths-geometry-03-area-volume',
      type: 'numeric',
      prompt: 'A rectangle is 12 cm by 7 cm. What is its area, in cm²?',
      answer: '84',
      explanation: 'Area = length × width = 12 × 7 = 84 cm².',
      difficulty: 1,
      source: 'GL Maths · Area',
    },
    {
      id: 'maths-geometry-03-q2',
      sectionId: 'maths-geometry-03-area-volume',
      type: 'numeric',
      prompt: 'A rectangle is 12 cm by 7 cm. What is its perimeter, in cm?',
      answer: '38',
      explanation: 'Perimeter = 2 × (12 + 7) = 2 × 19 = 38 cm.',
      difficulty: 1,
      source: 'GL Maths · Perimeter',
    },
    {
      id: 'maths-geometry-03-q3',
      sectionId: 'maths-geometry-03-area-volume',
      type: 'numeric',
      prompt: 'A triangle has a base of 10 cm and a height of 6 cm. What is its area, in cm²?',
      answer: '30',
      explanation: 'Area = ½ × base × height = ½ × 10 × 6 = 30 cm².',
      difficulty: 2,
      source: 'GL Maths · Triangle area',
    },
    {
      id: 'maths-geometry-03-q4',
      sectionId: 'maths-geometry-03-area-volume',
      type: 'numeric',
      prompt: 'A cuboid measures 5 cm by 4 cm by 3 cm. What is its volume, in cm³?',
      answer: '60',
      explanation: 'Volume = length × width × height = 5 × 4 × 3 = 60 cm³.',
      difficulty: 2,
      source: 'GL Maths · Volume',
    },
    {
      id: 'maths-geometry-03-q5',
      sectionId: 'maths-geometry-03-area-volume',
      type: 'numeric',
      prompt: 'A square has a perimeter of 36 cm. What is the length of one side, in cm?',
      answer: '9',
      explanation: 'A square has 4 equal sides, so one side is 36 ÷ 4 = 9 cm.',
      difficulty: 1,
      source: 'GL Maths · Perimeter',
    },
    {
      id: 'maths-geometry-03-q6',
      sectionId: 'maths-geometry-03-area-volume',
      type: 'mcq',
      prompt: 'Which has the larger area: Shape A, a 5 cm × 5 cm square, or Shape B, a 6 cm × 4 cm rectangle?',
      choices: ['Shape A', 'Shape B', 'They are equal', 'Not enough information'],
      answer: 'Shape A',
      explanation: 'Shape A = 5 × 5 = 25 cm²; Shape B = 6 × 4 = 24 cm². So Shape A is larger by 1 cm².',
      difficulty: 2,
      source: 'GL Maths · Area',
    },
    {
      id: 'maths-geometry-03-q7',
      sectionId: 'maths-geometry-03-area-volume',
      type: 'numeric',
      prompt: 'An L-shape is a 10 cm × 8 cm rectangle with a 4 cm × 3 cm corner cut out. What is its area, in cm²?',
      answer: '68',
      explanation: 'Whole rectangle = 80 cm²; cut-out = 4 × 3 = 12 cm². So 80 − 12 = 68 cm².',
      difficulty: 3,
      source: 'GL Maths · Compound shapes',
    },
    {
      id: 'maths-geometry-03-q8',
      sectionId: 'maths-geometry-03-area-volume',
      type: 'numeric',
      prompt: 'A rectangle has an area of 48 cm² and a width of 6 cm. What is its perimeter, in cm?',
      answer: '28',
      explanation: 'Length = 48 ÷ 6 = 8 cm. Perimeter = 2 × (8 + 6) = 28 cm.',
      difficulty: 3,
      source: 'GL Maths · Area & perimeter combined',
    },
  ],
};
