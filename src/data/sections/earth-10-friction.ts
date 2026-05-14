import type { Section } from '../types';
import { EarthFrictionDiagram } from '../../diagrams/earth-10-friction';

export const earth10Friction: Section = {
  id: 'earth-10-friction',
  subject: 'science',
  pack: 'earth-space-forces',
  number: 10,
  title: 'Friction, Air Resistance and Water Resistance',
  diagram: EarthFrictionDiagram,
  lesson: `Some forces **slow things down**:

- **Friction** — when two surfaces rub against each other. Rough surfaces give more friction; smooth ones give less. Friction is what stops a ball rolling forever and lets your shoes grip the floor.
- **Air resistance** — air pushing against a moving object. The faster you move, or the bigger your front-facing area, the more air resistance you feel. (Try sticking your hand out of a moving car — you can *feel* it.)
- **Water resistance** — water pushing against an object moving through it. Water is much denser than air, so water resistance is much stronger.

These forces aren\'t always bad — without friction we couldn\'t walk, and without air resistance parachutes wouldn\'t work.`,
  vocabulary: [
    { term: 'Friction', meaning: 'A force between two surfaces' },
    { term: 'Air resistance', meaning: 'A force caused by air' },
    { term: 'Water resistance', meaning: 'A force caused by water' },
  ],
  examples: [
    {
      title: 'Why ice is slippery',
      body: `Ice is slippery because pressure from your weight melts a microscopically thin layer of water on the surface — and water lubricates. Less **friction** means your shoe doesn't grip, so it slides. Ice skaters use this on purpose: their thin blades concentrate all their weight onto a sliver of ice, melting a guide track they then glide along.`,
    },
    {
      title: 'Penguins toboggan on their bellies',
      body: `A walking penguin wastes energy with every waddling step. So on flat snow or ice, emperor penguins flop onto their bellies and push with their flippers — a slide called **tobogganing**. The smooth belly has less **friction** with ice than two stumpy legs, and it covers ground much faster. Adaptation built around using physics.`,
    },
    {
      title: 'Parachutes love air resistance',
      body: `Most aerodynamic engineering tries to *reduce* **air resistance**. A parachute does the opposite: it has a massive front-facing area on purpose, forcing huge amounts of air to push back as it falls. The skydiver still falls — but slowly enough to land safely. Without that wall of air pushing up, parachutes wouldn't work at all.`,
    },
    {
      title: 'Dolphins inspired modern swimsuits',
      body: `A dolphin's skin has microscopic grooves that let water flow smoothly along its body, cutting **water resistance**. Engineers studied them and made swimsuits with similar surface patterns — fast enough that some were eventually banned from Olympic competition. Sharks use a similar trick: rough-but-streamlined skin that controls how water flows down their length.`,
    },
  ],
  questions: [
    {
      id: 'earth-10-q1',
      sectionId: 'earth-10-friction',
      type: 'short',
      prompt: 'What is friction?',
      answer: 'A force that happens when two surfaces rub together',
      acceptable: [
        'a force between two surfaces',
        'when two surfaces rub together',
        'a force when surfaces rub',
        'a force caused by two surfaces touching',
        'force between surfaces that touch',
      ],
      explanation:
        'Friction is the force between two surfaces that touch each other. It always opposes movement — it slows things down (or stops them moving in the first place).',
      difficulty: 1,
      source: 'Term 2 Section 10 Q1',
    },
    {
      id: 'earth-10-q2',
      sectionId: 'earth-10-friction',
      type: 'short',
      prompt: 'What force slows down falling objects?',
      answer: 'Air resistance',
      acceptable: [
        'air resistance',
        'air',
        'resistance of the air',
        'the air',
        'air pushing against the object',
      ],
      explanation:
        'Air resistance pushes up against falling objects. (Gravity is also acting, pulling them down — but gravity makes them fall, air resistance slows the fall.)',
      difficulty: 2,
      source: 'Term 2 Section 10 Q2',
    },
    {
      id: 'earth-10-q3',
      sectionId: 'earth-10-friction',
      type: 'short',
      prompt: 'Why do swimmers wear smooth, tight-fitting suits?',
      answer: 'To reduce water resistance so they can swim faster',
      acceptable: [
        'to reduce water resistance',
        'to reduce drag',
        'less water resistance',
        'so they can swim faster',
        'less resistance so they move faster',
        'to slip through the water more easily',
        'so water doesn\'t slow them down as much',
      ],
      explanation:
        'A baggy, rough swimsuit creates more water resistance — water has to push past extra fabric. Sleek suits let swimmers cut through the water more easily, so they can go faster.',
      difficulty: 2,
      reasoning: true,
      source: 'Term 2 Section 10 Q3',
    },
    {
      id: 'earth-10-q4',
      sectionId: 'earth-10-friction',
      type: 'short',
      prompt: 'What force slows boats down?',
      answer: 'Water resistance',
      acceptable: [
        'water resistance',
        'water',
        'water pushing against them',
        'drag from the water',
        'friction with the water',
      ],
      explanation:
        'Water resistance pushes back against the boat as it moves. That\'s why boats have streamlined (pointy) hulls — to cut through with less resistance.',
      difficulty: 1,
      source: 'Term 2 Section 10 Q4',
    },
    {
      id: 'earth-10-q5',
      sectionId: 'earth-10-friction',
      type: 'mcq',
      prompt: 'Why do cars have rounded, streamlined shapes?',
      choices: [
        'It looks nicer',
        'To reduce air resistance and save fuel',
        'To be lighter',
        'To make them quieter',
      ],
      answer: 'To reduce air resistance and save fuel',
      explanation:
        'A streamlined shape lets air flow smoothly around the car rather than crashing into it. Less resistance = less fuel needed to keep moving.',
      difficulty: 2,
      reasoning: true,
      source: 'Term 2 Section 10 — reasoning variant',
    },
    {
      id: 'earth-10-q6',
      sectionId: 'earth-10-friction',
      type: 'mcq',
      prompt: 'Why is it hard to walk on ice?',
      choices: [
        'Ice is too cold',
        'Ice has very little friction',
        'Ice is too thin',
        'Air resistance is higher on ice',
      ],
      answer: 'Ice has very little friction',
      explanation:
        'Ice is very smooth, so there\'s hardly any friction between it and your shoes. Friction is what your feet normally push back against to walk forwards. No friction → slipping.',
      difficulty: 2,
      source: 'Term 2 Section 10 — MCQ variant',
    },
  ],
  deeper: `**Without friction you couldn't walk.** Every step you take, your shoe is gripping the floor by friction and pushing back. On a frictionless surface (like wet ice), you'd just slip in place forever.

**Re-entering spacecraft glow because of friction.** Coming back from orbit at **28,000 km/h**, a capsule slams into the upper atmosphere — and the friction with all that air heats the heat shield to over **1,600 °C**. Astronauts inside watch a fireball outside the window. Without a properly engineered shield, the spacecraft would burn up like a meteor.

**Bicycle brakes turn movement into heat.** Squeeze the brake lever and a rubber pad presses on the wheel — friction slows the wheel down, and the pad gets hot. All the energy you had as you raced downhill ends up as warmth in the brake pad. Stop too suddenly on a long descent and the pads can actually start to smoke.`,
};
