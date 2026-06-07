import type { Section } from '../types';
import { MathsStatisticsDiagram } from '../../diagrams/maths-data-01-statistics';

export const mathsData01Statistics: Section = {
  id: 'maths-data-01-statistics',
  subject: 'maths',
  pack: 'maths-data',
  number: 1,
  title: 'Statistics & Averages',
  diagram: MathsStatisticsDiagram,
  lesson: `Four "averages" describe a set of numbers:

- **Mean** — add them all up, divide by how many there are.
- **Median** — put them *in order*, take the middle one. With an even count, average the two middle values.
- **Mode** — the value that appears most often.
- **Range** — biggest minus smallest (how spread out they are).

So for 8, 3, 5, 10 the median is found by ordering (3, 5, 8, 10) and averaging the middle pair: (5 + 8) ÷ 2 = 6.5.

You can also work **backwards**: if the mean of 4 numbers is 7, they must total 28.

In a **pie chart** the whole circle is 360°, so a slice for 90 out of 360 students is 90⁄360 × 360 = 90°.`,
  vocabulary: [
    { term: 'Mean', meaning: 'Add all the values and divide by how many there are.' },
    { term: 'Median', meaning: 'The middle value once the numbers are in order.' },
    { term: 'Mode', meaning: 'The value that appears most often.' },
    { term: 'Range', meaning: 'The largest value minus the smallest.' },
  ],
  questions: [
    {
      id: 'maths-data-01-q1',
      sectionId: 'maths-data-01-statistics',
      type: 'numeric',
      prompt: 'Find the mean of 4, 7, 9, 7, 3.',
      answer: '6',
      explanation: 'Add them: 4 + 7 + 9 + 7 + 3 = 30. There are 5 numbers, so 30 ÷ 5 = 6.',
      difficulty: 1,
      source: 'GL Maths · Mean',
    },
    {
      id: 'maths-data-01-q2',
      sectionId: 'maths-data-01-statistics',
      type: 'mcq',
      prompt: 'What is the mode of 2, 5, 5, 7, 9, 5, 2?',
      choices: ['5', '2', '9', '3'],
      answer: '5',
      explanation: '5 appears three times — more than any other value — so the mode is 5.',
      difficulty: 1,
      source: 'GL Maths · Mode',
    },
    {
      id: 'maths-data-01-q3',
      sectionId: 'maths-data-01-statistics',
      type: 'numeric',
      prompt: 'What is the range of 12, 4, 9, 15, 7?',
      answer: '11',
      explanation: 'Range = largest − smallest = 15 − 4 = 11.',
      difficulty: 1,
      source: 'GL Maths · Range',
    },
    {
      id: 'maths-data-01-q4',
      sectionId: 'maths-data-01-statistics',
      type: 'mcq',
      prompt: 'Which average is found by putting the values in order and taking the middle one?',
      choices: ['Median', 'Mean', 'Mode', 'Range'],
      answer: 'Median',
      explanation: 'The median is the middle value once the numbers are in order.',
      difficulty: 1,
      source: 'GL Maths · Averages',
    },
    {
      id: 'maths-data-01-q5',
      sectionId: 'maths-data-01-statistics',
      type: 'numeric',
      prompt: 'Find the median of 8, 3, 5, 10.',
      answer: '6.5',
      explanation: 'In order: 3, 5, 8, 10. With an even count, average the two middle numbers: (5 + 8) ÷ 2 = 6.5.',
      difficulty: 3,
      source: 'GL Maths · Median',
    },
    {
      id: 'maths-data-01-q6',
      sectionId: 'maths-data-01-statistics',
      type: 'numeric',
      prompt: 'The mean of 5 numbers is 12. A sixth number, 18, is added. What is the new mean?',
      answer: '13',
      explanation: 'The first five total 5 × 12 = 60. Adding 18 gives 78, shared between 6 numbers: 78 ÷ 6 = 13.',
      difficulty: 3,
      source: 'GL Maths · Mean (working backwards)',
    },
    {
      id: 'maths-data-01-q7',
      sectionId: 'maths-data-01-statistics',
      type: 'numeric',
      prompt: 'Four numbers are 6, 9, x and 5. Their mean is 7. What is x?',
      answer: '8',
      explanation: 'A mean of 7 over 4 numbers means they total 28. So x = 28 − (6 + 9 + 5) = 28 − 20 = 8.',
      difficulty: 3,
      source: 'GL Maths · Mean (working backwards)',
    },
    {
      id: 'maths-data-01-q8',
      sectionId: 'maths-data-01-statistics',
      type: 'numeric',
      prompt: 'In a pie chart of 360 students, 90 like football. What is the angle of the football slice, in degrees?',
      answer: '90',
      explanation: 'The whole circle is 360°. 90 out of 360 is one quarter, so the slice is 90°.',
      difficulty: 2,
      source: 'GL Maths · Pie charts',
    },
  ],
};
