import type { Section } from '../types';
import { EarthForcesNewtonsDiagram } from '../../diagrams/earth-09-forces-newtons';

export const earth09ForcesNewtons: Section = {
  id: 'earth-09-forces-newtons',
  subject: 'science',
  pack: 'earth-space-forces',
  number: 9,
  title: 'Forces and Newtons',
  diagram: EarthForcesNewtonsDiagram,
  lesson: `A **force** is simply a **push** or a **pull**. We measure forces in **newtons** (symbol: **N**), named after Isaac Newton. The tool we use is a **force meter** (also called a spring balance or a newton meter).

**Types of forces:**
- **Push** — pushing a door, pushing a swing
- **Pull** — pulling open a drawer, pulling a rope
- **Gravity** — the force pulling things down
- **Friction** — between two surfaces that touch
- **Air resistance** — air pushing against moving things
- **Water resistance** — water pushing against moving things

Quick rule of thumb: **1 newton ≈ the weight of a small apple** (about 100 g).`,
  vocabulary: [
    { term: 'Force', meaning: 'A push or pull' },
    { term: 'Newton (N)', meaning: 'The unit used to measure force' },
    { term: 'Force meter', meaning: 'A tool used to measure force' },
  ],
  examples: [
    {
      title: '1 newton ≈ a small apple',
      body: `A small apple weighs about **100 g**, which gravity pulls on with a force of roughly **1 newton**. The unit was chosen so the apple — Newton's most famous fruit — comes out as a tidy single newton. Hold a small apple on your palm and you're feeling exactly the force the textbook means when it says "1 N".`,
    },
    {
      title: 'Ants lift 50 times their weight',
      body: `A leafcutter ant can carry a leaf fragment **50 times** its own body weight — like a 10-year-old shouldering a small car. Their legs and jaws are built for it. Bigger animals can't pull this off because muscle strength scales slower than body weight: ant-sized creatures end up with the strongest **force**-per-kilo on the planet.`,
    },
    {
      title: 'Magnets pull without touching',
      body: `Most **forces** need contact — pushing, pulling, **friction**. Magnets prove you can have force at a distance. Hold one near a paperclip and the clip jumps to it through empty air. The force is real and measurable in **newtons**. Earth's gravity acts the same way — pulling on the Moon across 384,000 km of empty space without touching it.`,
    },
    {
      title: 'Try this: weigh an apple',
      body: `Hang an apple from a kitchen scale or a school **force meter**. Read the weight. Now hold the same apple in your hand. That heaviness you feel is the **force** of gravity — about **1 newton** per 100 g. The scale isn't measuring "weight" in some loose sense; it's literally counting the newtons pulling the apple down towards the ground.`,
    },
  ],
  questions: [
    {
      id: 'earth-09-q1',
      sectionId: 'earth-09-forces-newtons',
      type: 'short',
      prompt: 'What is the unit of force?',
      answer: 'The newton (N)',
      acceptable: [
        'newton',
        'newtons',
        'n',
        'the newton',
        'a newton',
      ],
      explanation:
        'Forces are measured in newtons (N), named after Sir Isaac Newton.',
      difficulty: 1,
      source: 'Term 2 Section 9 Q1',
    },
    {
      id: 'earth-09-q2',
      sectionId: 'earth-09-forces-newtons',
      type: 'short',
      prompt: 'What tool measures force?',
      answer: 'A force meter',
      acceptable: [
        'force meter',
        'a force meter',
        'newton meter',
        'a newton meter',
        'a spring balance',
        'spring balance',
      ],
      explanation:
        'A force meter (also called a newton meter or spring balance) uses a spring that stretches or squashes by an amount proportional to the force.',
      difficulty: 1,
      source: 'Term 2 Section 9 Q2',
    },
    {
      id: 'earth-09-q3',
      sectionId: 'earth-09-forces-newtons',
      type: 'short',
      prompt: 'Give an example of a push.',
      answer: 'Pushing a door open',
      acceptable: [
        'pushing a door',
        'pushing a swing',
        'pushing a trolley',
        'pushing a shopping cart',
        'pushing a button',
        'pressing a button',
        'pushing someone on a swing',
        'pushing a car',
        'pushing a pram',
      ],
      explanation:
        'Any "I\'m pressing/shoving something away from me" action counts. Pushing a door, a swing, a trolley, a button, a wheelbarrow.',
      difficulty: 1,
      source: 'Term 2 Section 9 Q3',
    },
    {
      id: 'earth-09-q4',
      sectionId: 'earth-09-forces-newtons',
      type: 'short',
      prompt: 'Give an example of a pull.',
      answer: 'Pulling open a drawer',
      acceptable: [
        'pulling open a drawer',
        'pulling a rope',
        'tug of war',
        'pulling a sled',
        'pulling a wagon',
        'pulling on a lead',
        'pulling a door towards you',
        'pulling a curtain',
      ],
      explanation:
        'Any "I\'m moving something towards me" action — pulling a rope, a drawer, a wagon, a dog\'s lead.',
      difficulty: 1,
      source: 'Term 2 Section 9 Q4',
    },
    {
      id: 'earth-09-q5',
      sectionId: 'earth-09-forces-newtons',
      type: 'mcq',
      prompt: 'Opening a door by pulling it towards you is which kind of force?',
      choices: ['Push', 'Pull', 'Gravity', 'Friction'],
      answer: 'Pull',
      explanation:
        'If you move it *towards* you, it\'s a pull. Push = away from you. (Doors with "PUSH" or "PULL" signs make perfect real-life examples.)',
      difficulty: 2,
      source: 'Term 2 Section 9 — MCQ variant',
    },
    {
      id: 'earth-09-q6',
      sectionId: 'earth-09-forces-newtons',
      type: 'cloze',
      prompt: 'Forces are measured in ____.',
      answer: 'newtons',
      acceptable: ['newtons', 'newton', 'n'],
      explanation: 'Newtons (N) — named after Isaac Newton.',
      difficulty: 1,
      source: 'Term 2 Section 9 — cloze variant',
    },
  ],
  deeper: `**1 newton is roughly the weight of an apple.** That\'s not an accident — Newton was supposedly inspired by a falling apple. So it\'s nicely poetic that "1 apple = 1 newton".

**Ants are incredibly strong relative to their size.** A leafcutter ant can carry leaves **50 times its own body weight** — like a 10-year-old carrying a small car. If we had ant-strength, we\'d be able to throw lorries around.

**Sumo wrestlers use force science.** They lower their centre of gravity and push horizontally — making it physically much harder to push them out of the ring. It\'s not just muscle; it\'s physics.`,
};
