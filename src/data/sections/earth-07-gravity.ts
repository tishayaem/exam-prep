import type { Section } from '../types';

export const earth07Gravity: Section = {
  id: 'earth-07-gravity',
  subject: 'science',
  pack: 'earth-space-forces',
  number: 7,
  title: 'Gravity and Planetary Motion',
  lesson: `**Gravity** is the force that pulls objects towards each other. *Everything* has gravity — even you! But the Earth is **much** bigger than you, so its gravity is much stronger. That\'s why things fall *down* — towards the Earth\'s centre.

Gravity also:
- Keeps the **planets in orbit** around the Sun
- Keeps the **Moon in orbit** around the Earth

**Sir Isaac Newton** explained how gravity works in the 1600s. (Important: Newton didn\'t **invent** gravity — gravity was already there. He worked out the maths describing it.)

**Mass** = how much *stuff* something is made of (always the same).
**Weight** = how hard gravity pulls on that stuff (changes depending on where you are).`,
  vocabulary: [
    { term: 'Gravity', meaning: 'A force that pulls objects together' },
    { term: 'Mass', meaning: 'How much matter something has' },
    { term: 'Weight', meaning: 'The force of gravity on an object' },
    { term: 'Orbit', meaning: 'A curved path caused by gravity' },
  ],
  examples: [
    {
      title: "Newton's apple actually happened",
      body: `The famous story of an apple falling on **Isaac Newton's** head is mostly legend, but Newton himself told friends it was the *sight* of an apple falling — at his mother's farm in 1666 — that started him thinking about **gravity**. The apple didn't bonk him. It just got him asking the right question: why do things fall straight down rather than sideways or upwards?`,
    },
    {
      title: 'Astronauts are constantly falling',
      body: `Astronauts on the **International Space Station** look like they're floating, but they're actually **falling** around the Earth at **28,000 km/h**. The Earth's curve drops away beneath them at the same rate they fall, so they never hit the ground. Inside the station, everyone falls at exactly the same speed — and that shared falling feels exactly like floating.`,
    },
    {
      title: 'Your weight on different planets',
      body: `A child weighing 30 kg on Earth would weigh about **5 kg** on the Moon, **11 kg** on Mars, and **76 kg** on Jupiter. Same body, same **mass** — different **weight**, because gravity is different in each place. You'd jump six times higher on the Moon. On Jupiter you'd barely manage to lift your arms above your head.`,
    },
    {
      title: 'Hammer and feather on the Moon',
      body: `In **1971**, Apollo 15 astronaut David Scott stood on the Moon and dropped a **hammer and a feather** at the same height. With no air to slow the feather down, both hit the ground together — exactly as Galileo had predicted nearly 350 years earlier. The video is on YouTube. It's probably the cleanest physics experiment ever recorded.`,
    },
  ],
  questions: [
    {
      id: 'earth-07-q1',
      sectionId: 'earth-07-gravity',
      type: 'short',
      prompt: 'What is gravity?',
      answer: 'A force that pulls objects towards each other',
      acceptable: [
        'a force that pulls objects together',
        'a force that pulls things towards each other',
        'a pulling force between objects',
        'the force that pulls things to earth',
        'a force pulling things down',
        'a force that pulls objects to the centre of the earth',
      ],
      explanation:
        'Gravity is a pulling force between any two objects with mass. The bigger the object, the stronger its pull.',
      difficulty: 1,
      source: 'Term 2 Section 7 Q1',
    },
    {
      id: 'earth-07-q2',
      sectionId: 'earth-07-gravity',
      type: 'short',
      prompt: 'Who helped explain gravity?',
      answer: 'Sir Isaac Newton',
      acceptable: [
        'isaac newton',
        'newton',
        'sir isaac newton',
        'sir newton',
      ],
      explanation:
        'Isaac Newton worked out the maths of gravity in the 1600s. He didn\'t invent it (it was already there!) — he *explained* it.',
      difficulty: 1,
      source: 'Term 2 Section 7 Q2',
    },
    {
      id: 'earth-07-q3',
      sectionId: 'earth-07-gravity',
      type: 'short',
      prompt: 'What keeps the Moon in orbit around the Earth?',
      answer: 'Gravity',
      acceptable: [
        'gravity',
        'the earth\'s gravity',
        'earth\'s gravity',
        'gravity from the earth',
        'gravitational pull',
      ],
      explanation:
        'The Earth\'s gravity pulls on the Moon, bending its path into a curve — that curve is its orbit. Without gravity, the Moon would fly off in a straight line.',
      difficulty: 1,
      source: 'Term 2 Section 7 Q3',
    },
    {
      id: 'earth-07-q4',
      sectionId: 'earth-07-gravity',
      type: 'short',
      prompt: 'What is the difference between mass and weight?',
      answer: 'Mass is how much matter something has; weight is the force of gravity on it',
      acceptable: [
        'mass is how much matter, weight is the pull of gravity',
        'mass stays the same but weight changes with gravity',
        'mass is the amount of stuff in something, weight is the force pulling it down',
        'mass is constant, weight depends on gravity',
        'mass is how much stuff, weight is gravity acting on it',
      ],
      explanation:
        'Your **mass** is the same on Earth, on the Moon, and on Mars — it\'s how much *stuff* you\'re made of. Your **weight** is different on each, because the gravity is different. On the Moon you\'d weigh about 1/6 of what you weigh on Earth — same mass, less pull.',
      difficulty: 3,
      reasoning: true,
      source: 'Term 2 Section 7 Q4',
    },
    {
      id: 'earth-07-q5',
      sectionId: 'earth-07-gravity',
      type: 'mcq',
      prompt: 'Did Isaac Newton invent gravity?',
      choices: [
        'Yes — he created it',
        'No — gravity was always there; he just explained it',
        'No — Galileo invented it',
        'Yes — but only on Earth',
      ],
      answer: 'No — gravity was always there; he just explained it',
      explanation:
        'Trick question! Newton **explained** gravity — he worked out the rules. But gravity was pulling apples off trees long before Newton was born. (Your teacher may try to convince you otherwise — they\'re joking!)',
      difficulty: 2,
      source: 'Term 2 Section 7 — MCQ variant',
    },
    {
      id: 'earth-07-q6',
      sectionId: 'earth-07-gravity',
      type: 'truefalse',
      prompt: 'On the Moon, your weight would be the same as on Earth.',
      choices: ['True', 'False'],
      answer: 'False',
      explanation:
        'The Moon has weaker gravity (about 1/6 of Earth\'s), so you\'d **weigh less**. Your mass stays the same — you\'re still made of the same stuff.',
      difficulty: 2,
      source: 'Term 2 Section 7 — true/false variant',
    },
  ],
  deeper: `**On Jupiter, you\'d weigh about 2.5 times more than on Earth.** If you weigh 30 kg here, you\'d weigh 75 kg there. (You couldn\'t actually stand on Jupiter though — it has no solid surface and the pressure would crush you.)

**Astronauts on the ISS aren\'t actually weightless** — they\'re *falling*. They\'re orbiting Earth at 28,000 km/h, so they keep falling around the planet without hitting it. Inside the station, everything is falling at the same rate together, which feels like floating.

**Black holes** are objects with so much gravity that not even light can escape. If you got close enough, you\'d be stretched into a thin noodle by the difference in gravity between your head and your feet. Scientists actually call this **"spaghettification"**.`,
};
