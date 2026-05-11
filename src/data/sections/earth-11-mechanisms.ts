import type { Section } from '../types';

export const earth11Mechanisms: Section = {
  id: 'earth-11-mechanisms',
  subject: 'science',
  pack: 'earth-space-forces',
  number: 11,
  title: 'Marvellous Mechanisms (Levers, Pulleys and Gears)',
  lesson: `**Mechanisms** let us use **small forces to move big loads**. The three big ones:

- **Lever** — a bar that pivots on a point called a **fulcrum**. Examples: seesaw, scissors, crowbar. Push down hard on the long end → big force lifts the load on the short end.
- **Pulley** — a wheel with a rope. More pulleys = easier to lift, but you have to pull *much* more rope. (Trade-off: easier *or* faster, not both.)
- **Gear** — a wheel with teeth. Gears change **speed, direction, or force**. Your bike has gears: low gear = pedal lots, but the wheel turns slowly with lots of force (easy uphill).`,
  vocabulary: [
    { term: 'Lever', meaning: 'A bar that pivots to lift a load' },
    { term: 'Pulley', meaning: 'A wheel and rope system' },
    { term: 'Gear', meaning: 'A toothed wheel that transfers force' },
    { term: 'Fulcrum', meaning: 'The pivot point of a lever' },
  ],
  questions: [
    {
      id: 'earth-11-q1',
      sectionId: 'earth-11-mechanisms',
      type: 'short',
      prompt: 'What is a lever?',
      answer: 'A bar that pivots on a fulcrum to lift a load',
      acceptable: [
        'a bar that pivots',
        'a bar that pivots on a fulcrum',
        'a bar that pivots to lift things',
        'a bar that rests on a pivot',
        'a bar with a fulcrum',
        'a long bar that turns on a pivot',
      ],
      explanation:
        'A lever is a stiff bar resting on a fulcrum (pivot). Push down on one end and the other end goes up — and you can lift much heavier things than you could by hand.',
      difficulty: 1,
      source: 'Term 2 Section 11 Q1',
    },
    {
      id: 'earth-11-q2',
      sectionId: 'earth-11-mechanisms',
      type: 'short',
      prompt: 'What does a pulley help you do?',
      answer: 'Lift heavy loads using less force',
      acceptable: [
        'lift heavy things',
        'lift heavy loads',
        'lift things with less force',
        'make lifting easier',
        'lift heavy loads with less force',
        'lift things using less effort',
      ],
      explanation:
        'Pulleys make heavy things easier to lift. The more pulleys you use, the easier each pull becomes — but you have to pull a longer length of rope to lift the same distance.',
      difficulty: 2,
      source: 'Term 2 Section 11 Q2',
    },
    {
      id: 'earth-11-q3',
      sectionId: 'earth-11-mechanisms',
      type: 'short',
      prompt: 'What do gears change?',
      answer: 'Speed, direction, or force',
      acceptable: [
        'speed',
        'direction',
        'force',
        'speed direction or force',
        'speed direction and force',
        'speed and force',
        'speed force and direction',
      ],
      explanation:
        'Three things a gear can change: how fast something spins (**speed**), which way it spins (**direction**), or how strong the turning force is (**force**). Bikes use gears to trade speed for force on hills.',
      difficulty: 2,
      source: 'Term 2 Section 11 Q3',
    },
    {
      id: 'earth-11-q4',
      sectionId: 'earth-11-mechanisms',
      type: 'short',
      prompt: 'What is a fulcrum?',
      answer: 'The pivot point of a lever',
      acceptable: [
        'the pivot of a lever',
        'the pivot point',
        'the point a lever pivots on',
        'the pivot point on a lever',
        'where the lever balances',
        'the pivot',
      ],
      explanation:
        'The fulcrum is the fixed point that a lever pivots around. On a seesaw, the fulcrum is the middle bit. On scissors, it\'s the screw in the middle.',
      difficulty: 1,
      source: 'Term 2 Section 11 Q4',
    },
    {
      id: 'earth-11-q5',
      sectionId: 'earth-11-mechanisms',
      type: 'mcq',
      prompt: 'A pair of scissors is which kind of mechanism?',
      choices: ['Lever', 'Pulley', 'Gear', 'None of these'],
      answer: 'Lever',
      explanation:
        'Scissors are actually **two levers joined together**, sharing a fulcrum (the screw in the middle). When you push the handles together, the blades come together with more force than your fingers alone.',
      difficulty: 2,
      source: 'Term 2 Section 11 — MCQ variant',
    },
    {
      id: 'earth-11-q6',
      sectionId: 'earth-11-mechanisms',
      type: 'short',
      prompt: 'On a bike, why are low gears easier when going uphill?',
      answer: 'They turn the wheels with more force, even though more slowly',
      acceptable: [
        'they give more force',
        'more force less speed',
        'more force to climb the hill',
        'they make the pedals easier to push',
        'low gear gives more force but less speed',
        'you have to pedal more but it\'s easier',
        'more turning force on the wheels',
      ],
      explanation:
        'Low gear = your pedals turn the back wheel a *little bit* with each pedal turn, but with **more force**. That\'s the trade gears make: speed *or* force, not both. Going downhill you switch to high gear (less force, more speed).',
      difficulty: 3,
      reasoning: true,
      source: 'Term 2 Section 11 — reasoning variant',
    },
  ],
  deeper: `**"Give me a lever long enough and I shall move the world."** — Archimedes (an ancient Greek scientist) said this about 2,250 years ago. With a long enough lever and the right fulcrum, you could in theory lift anything. The problem is finding somewhere to stand.

**The gears on your bike work the same way as gears in a car.** Both use one wheel with teeth turning another. In cars, gears connect the engine to the wheels — low gears for starting (lots of force), high gears for cruising (lots of speed).

**Cranes use pulleys.** A big construction crane has multi-pulley systems that let it lift several tonnes with a relatively small motor. The trade-off? The cable that has to roll in and out is *much* longer than the height the load actually moves.`,
};
