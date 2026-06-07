import type { Section } from '../types';
import { MathsShapesAnglesDiagram } from '../../diagrams/maths-geometry-02-shapes-angles';

export const mathsGeometry02ShapesAngles: Section = {
  id: 'maths-geometry-02-shapes-angles',
  subject: 'maths',
  pack: 'maths-geometry',
  number: 2,
  title: 'Shapes & Angles',
  diagram: MathsShapesAnglesDiagram,
  lesson: `A few angle facts unlock most questions: angles **on a straight line** add to **180°**, angles **around a point** add to **360°**, and angles **in a triangle** add to **180°**.

So if two angles of a triangle are 65° and 72°, the third is 180 − 65 − 72 = 43°.

For a **regular polygon**, each interior angle = 180 × (n − 2) ÷ n. A hexagon (n = 6): 180 × 4 ÷ 6 = 120°.

For **3D shapes**, count carefully: a triangular prism has 9 edges, 6 vertices and 5 faces. Hidden edges still count.`,
  vocabulary: [
    { term: 'Angle', meaning: 'The amount of turn between two lines, measured in degrees (°).' },
    { term: 'Polygon', meaning: 'A flat shape with straight sides (triangle, square, hexagon…).' },
    { term: 'Vertices', meaning: 'The corners of a shape, where edges meet (one is a vertex).' },
    { term: 'Interior angle', meaning: 'An angle inside a polygon, between two of its sides.' },
  ],
  questions: [
    {
      id: 'maths-geometry-02-q1',
      sectionId: 'maths-geometry-02-shapes-angles',
      type: 'mcq',
      prompt: 'Angles on a straight line add up to…?',
      choices: ['90°', '180°', '360°', '270°'],
      answer: '180°',
      explanation: 'A straight line is a half-turn, which is 180°.',
      difficulty: 1,
      source: 'GL Maths · Angle facts',
    },
    {
      id: 'maths-geometry-02-q2',
      sectionId: 'maths-geometry-02-shapes-angles',
      type: 'numeric',
      prompt: 'Two angles on a straight line are x and 115°. What is x, in degrees?',
      answer: '65',
      explanation: 'Angles on a line add to 180°, so x = 180 − 115 = 65°.',
      difficulty: 1,
      source: 'GL Maths · Angle facts',
    },
    {
      id: 'maths-geometry-02-q3',
      sectionId: 'maths-geometry-02-shapes-angles',
      type: 'numeric',
      prompt: 'Two angles of a triangle are 65° and 72°. What is the third angle, in degrees?',
      answer: '43',
      explanation: 'Angles in a triangle add to 180°, so the third is 180 − 65 − 72 = 43°.',
      difficulty: 2,
      source: 'GL Maths · Angles in a triangle',
    },
    {
      id: 'maths-geometry-02-q4',
      sectionId: 'maths-geometry-02-shapes-angles',
      type: 'numeric',
      prompt: 'Angles around a point are 90°, 130°, 75° and x. What is x, in degrees?',
      answer: '65',
      explanation: 'Angles around a point add to 360°, so x = 360 − 90 − 130 − 75 = 65°.',
      difficulty: 2,
      source: 'GL Maths · Angles around a point',
    },
    {
      id: 'maths-geometry-02-q5',
      sectionId: 'maths-geometry-02-shapes-angles',
      type: 'numeric',
      prompt: 'An isosceles triangle has an apex angle of 40°. What is the size of EACH base angle, in degrees?',
      answer: '70',
      explanation: 'The two base angles are equal and share what is left: (180 − 40) ÷ 2 = 70°.',
      difficulty: 2,
      source: 'GL Maths · Isosceles triangles',
    },
    {
      id: 'maths-geometry-02-q6',
      sectionId: 'maths-geometry-02-shapes-angles',
      type: 'numeric',
      prompt: 'What is the size of one interior angle of a regular hexagon, in degrees?',
      answer: '120',
      explanation: 'Interior angle = 180 × (6 − 2) ÷ 6 = 180 × 4 ÷ 6 = 120°.',
      difficulty: 3,
      source: 'GL Maths · Polygon angles',
    },
    {
      id: 'maths-geometry-02-q7',
      sectionId: 'maths-geometry-02-shapes-angles',
      type: 'mcq',
      prompt: 'Which quadrilateral has exactly one pair of parallel sides?',
      choices: ['Square', 'Trapezium', 'Rhombus', 'Parallelogram'],
      answer: 'Trapezium',
      explanation: 'A trapezium has just one pair of parallel sides. The others all have two pairs.',
      difficulty: 2,
      source: 'GL Maths · Quadrilaterals',
    },
    {
      id: 'maths-geometry-02-q8',
      sectionId: 'maths-geometry-02-shapes-angles',
      type: 'mcq',
      prompt: 'How many edges does a triangular prism have?',
      choices: ['6', '9', '12', '5'],
      answer: '9',
      explanation: 'Two triangles give 3 + 3 = 6 edges, plus 3 edges joining them: 9 in total.',
      difficulty: 2,
      source: 'GL Maths · 3D shapes',
    },
  ],
};
