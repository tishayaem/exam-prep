import type { Section } from '../types';

export const earth06ScaleModel: Section = {
  id: 'earth-06-scale-model',
  subject: 'science',
  pack: 'earth-space-forces',
  number: 6,
  title: 'Scale of the Solar System (Fruit Model)',
  lesson: `In class, we built a **fruit Solar System** to show how huge the differences in planet sizes really are.

- **Mercury** — peppercorn
- **Venus** — cherry tomato
- **Earth** — cherry tomato
- **Mars** — blueberry
- **Jupiter** — watermelon
- **Saturn** — large grapefruit
- **Uranus** — large apple
- **Neptune** — orange

We also tried it with distances: if Earth is **1 metre** from the Sun, then Neptune is **VERY** far away. The big lesson: **space is mostly empty space**, and even our own Solar System is enormous compared to the planets in it.`,
  vocabulary: [
    { term: 'Scale model', meaning: 'A smaller version that keeps the same proportions' },
    { term: 'Diameter', meaning: 'The width of a sphere' },
    { term: 'Distance', meaning: 'How far apart objects are' },
  ],
  examples: [
    {
      title: 'The Sun a football, Earth a peppercorn',
      body: `Shrink the Sun to the size of a football on the centre spot of a pitch. To scale, **Earth** would be a single **peppercorn** sitting near the goal line. **Jupiter** would be a chestnut at the edge of the car park. **Neptune** would be a marble several streets away. Almost everything in the Solar System is empty **distance**.`,
    },
    {
      title: 'Sunlight takes 8 minutes to arrive',
      body: `When you look at the Sun (don't look directly!), you're seeing it as it was **8 minutes ago** — that's how long light takes to travel the 150 million km from the Sun to Earth. Light from Neptune takes about **4 hours**. Light from the next nearest star, Proxima Centauri, takes **over 4 years**. Space is mostly distance, and even light needs time to cross it.`,
    },
    {
      title: 'Voyager probes are still going',
      body: `**Voyager 1** and **Voyager 2** were launched in **1977**. Both are still travelling. Voyager 1 is now over 24 billion km away — the most distant human-made object in existence — and has crossed into interstellar space, the gap between the stars. Each carries a golden record of Earth's sounds and music in case anyone else out there ever finds it.`,
    },
    {
      title: 'Try this: scale model on the playing field',
      body: `On the school playing field, use a small ball for the Sun. Step out **5 paces** for Mercury, **10** for Venus, **14** for Earth. Mars is **21 paces**. Jupiter is **75 paces** away, Saturn **140**, and Neptune is **over 400 paces** — usually further than the field is wide. Most groups never finish, which is exactly the lesson: space is mostly nothing.`,
    },
  ],
  questions: [
    {
      id: 'earth-06-q1',
      sectionId: 'earth-06-scale-model',
      type: 'short',
      prompt: 'Which fruit represented Jupiter?',
      answer: 'A watermelon',
      acceptable: ['watermelon', 'a watermelon', 'water melon'],
      explanation:
        'Jupiter is the biggest planet, so it got the biggest fruit — a watermelon. It dwarfs everything else.',
      difficulty: 1,
      source: 'Term 2 Section 6 Q1',
    },
    {
      id: 'earth-06-q2',
      sectionId: 'earth-06-scale-model',
      type: 'short',
      prompt: 'Why do we use scale models?',
      answer: 'To see real proportions when the real thing is too big (or too small) to show',
      acceptable: [
        'to see proportions',
        'because the real thing is too big',
        'so we can see the sizes compared to each other',
        'to make something big small enough to study',
        'to keep the same proportions in a smaller version',
        'so we can compare sizes',
      ],
      explanation:
        'We can\'t bring real planets into a classroom. A scale model shrinks everything by the *same amount* so we can see the relative sizes and distances at a glance.',
      difficulty: 2,
      reasoning: true,
      source: 'Term 2 Section 6 Q2',
    },
    {
      id: 'earth-06-q3',
      sectionId: 'earth-06-scale-model',
      type: 'short',
      prompt: 'Which planet was represented by a peppercorn?',
      answer: 'Mercury',
      acceptable: ['mercury'],
      explanation:
        'Mercury is the smallest planet, so it got the smallest fruit-ish thing — a peppercorn. Yes, technically a peppercorn isn\'t a fruit. We won\'t tell anyone.',
      difficulty: 1,
      source: 'Term 2 Section 6 Q3',
    },
    {
      id: 'earth-06-q4',
      sectionId: 'earth-06-scale-model',
      type: 'short',
      prompt: 'What did this activity show about space?',
      answer: 'That space is mostly empty and very big',
      acceptable: [
        'space is mostly empty',
        'space is huge',
        'space is mostly empty space',
        'space is very big',
        'the planets are tiny compared to the distances between them',
        'the distances between planets are huge',
        'space is mostly empty and very big',
      ],
      explanation:
        'Once you put fruit-sized planets at the right distances apart, you realise space is *mostly nothing*. Tiny dots of stuff separated by enormous empty gaps.',
      difficulty: 2,
      reasoning: true,
      source: 'Term 2 Section 6 Q4',
    },
    {
      id: 'earth-06-q5',
      sectionId: 'earth-06-scale-model',
      type: 'mcq',
      prompt: 'In the fruit model, Earth was a cherry tomato. Which planet was almost exactly the same size?',
      choices: ['Mars', 'Venus', 'Jupiter', 'Neptune'],
      answer: 'Venus',
      explanation:
        'Venus is almost the same size as Earth — sometimes called Earth\'s "twin". (But the surface temperature is over 460°C, so don\'t book a holiday.)',
      difficulty: 2,
      source: 'Term 2 Section 6 — MCQ variant',
    },
    {
      id: 'earth-06-q6',
      sectionId: 'earth-06-scale-model',
      type: 'cloze',
      prompt: 'A smaller version of something that keeps the same proportions is called a ____ model.',
      answer: 'scale',
      acceptable: ['scale', 'a scale'],
      explanation:
        '"Scale model" — used for everything from planets to model trains.',
      difficulty: 1,
      source: 'Term 2 Section 6 — cloze variant',
    },
  ],
  deeper: `**The asteroid belt is mostly empty.** In films, spaceships dodge a hailstorm of rocks between Mars and Jupiter. In reality, NASA flew probes straight through it without aiming for anything and didn't come close to a single asteroid. The "belt" is millions of rocks spread thinly over an area larger than the entire orbit of Earth. Hollywood lied.

**The Sun loses 4 million tons of itself every second.** That's nuclear fusion in its core: hydrogen turns into helium, and a tiny fraction of the mass becomes pure energy — light, heat, all of it. The Sun has been doing this for **4.6 billion years** and still has fuel for another **5 billion**. Don't worry.

**A teaspoon of neutron-star material would weigh a billion tons.** Neutron stars are what's left when a giant star dies and its core collapses — atoms get crushed so tightly that one teaspoonful of the stuff weighs more than every car, ship and skyscraper on Earth combined. The whole star is only about **20 km wide** but holds more mass than the Sun.`,
};
