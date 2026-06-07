import type { Section } from '../types';
import { MathsCoordinatesDiagram } from '../../diagrams/maths-geometry-04-coordinates';

export const mathsGeometry04Coordinates: Section = {
  id: 'maths-geometry-04-coordinates',
  subject: 'maths',
  pack: 'maths-geometry',
  number: 4,
  title: 'Coordinates & Transformations',
  diagram: MathsCoordinatesDiagram,
  lesson: `A **coordinate** is written (x, y) — *along* the corridor first, then *up* the stairs. The grid has four quadrants, so coordinates can be negative.

To **translate** a point, slide it: 3 right means x + 3, 5 down means y − 5. So (4, 2) becomes (7, −3).

To **reflect** a point, flip it across an axis. The catch: reflecting in the **y-axis** changes the **x** value, not the y. (5, 3) reflected in the y-axis is (−5, 3); reflected in the x-axis it is (5, −3).

The **midpoint** of two points is the average of the x's and the average of the y's.`,
  vocabulary: [
    { term: 'Coordinate', meaning: 'A pair (x, y) giving a position: across first, then up.' },
    { term: 'Axis', meaning: 'A number line on the grid — the x-axis (across) or y-axis (up).' },
    { term: 'Translate', meaning: 'Slide a shape or point without turning or flipping it.' },
    { term: 'Reflect', meaning: 'Flip a shape or point across a mirror line (an axis).' },
  ],
  questions: [
    {
      id: 'maths-geometry-04-q1',
      sectionId: 'maths-geometry-04-coordinates',
      type: 'mcq',
      prompt: 'What is the midpoint of (2, 3) and (8, 9)?',
      choices: ['(5, 6)', '(6, 6)', '(10, 12)', '(4, 6)'],
      answer: '(5, 6)',
      explanation: 'Average each: x = (2 + 8) ÷ 2 = 5, y = (3 + 9) ÷ 2 = 6, giving (5, 6).',
      difficulty: 2,
      source: 'GL Maths · Midpoint',
    },
    {
      id: 'maths-geometry-04-q2',
      sectionId: 'maths-geometry-04-coordinates',
      type: 'mcq',
      prompt: 'The point (4, 2) is translated 3 right and 5 down. What are its new coordinates?',
      choices: ['(7, −3)', '(1, 7)', '(7, 7)', '(7, −7)'],
      answer: '(7, −3)',
      explanation: '3 right adds to x (4 + 3 = 7); 5 down subtracts from y (2 − 5 = −3). So (7, −3).',
      difficulty: 2,
      source: 'GL Maths · Translation',
    },
    {
      id: 'maths-geometry-04-q3',
      sectionId: 'maths-geometry-04-coordinates',
      type: 'mcq',
      prompt: 'Reflect the point (5, 3) in the y-axis. Where does it land?',
      choices: ['(−5, 3)', '(5, −3)', '(−5, −3)', '(3, 5)'],
      answer: '(−5, 3)',
      explanation: 'Reflecting in the y-axis flips left-right, so the x value changes sign: (5, 3) → (−5, 3).',
      difficulty: 3,
      source: 'GL Maths · Reflection',
    },
    {
      id: 'maths-geometry-04-q4',
      sectionId: 'maths-geometry-04-coordinates',
      type: 'mcq',
      prompt: 'Reflect the point (5, 3) in the x-axis. Where does it land?',
      choices: ['(5, −3)', '(−5, 3)', '(−5, −3)', '(3, 5)'],
      answer: '(5, −3)',
      explanation: 'Reflecting in the x-axis flips up-down, so the y value changes sign: (5, 3) → (5, −3).',
      difficulty: 2,
      source: 'GL Maths · Reflection',
    },
    {
      id: 'maths-geometry-04-q5',
      sectionId: 'maths-geometry-04-coordinates',
      type: 'mcq',
      prompt: 'Three corners of a square are (1, 1), (1, 4) and (4, 4). What is the fourth corner?',
      choices: ['(4, 1)', '(4, 0)', '(1, 0)', '(0, 4)'],
      answer: '(4, 1)',
      explanation: 'The square spans x from 1 to 4 and y from 1 to 4, so the missing corner is (4, 1).',
      difficulty: 2,
      source: 'GL Maths · Coordinates',
    },
    {
      id: 'maths-geometry-04-q6',
      sectionId: 'maths-geometry-04-coordinates',
      type: 'mcq',
      prompt: 'Which quadrant contains the point (−3, −2)?',
      choices: ['Bottom-left', 'Top-right', 'Top-left', 'Bottom-right'],
      answer: 'Bottom-left',
      explanation: 'Both coordinates are negative, so the point is to the left of and below the origin — the bottom-left quadrant.',
      difficulty: 2,
      source: 'GL Maths · Four quadrants',
    },
  ],
};
