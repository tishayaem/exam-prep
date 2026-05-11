import type { Section } from '../types';

export const earth02DayNight: Section = {
  id: 'earth-02-day-night',
  subject: 'science',
  pack: 'earth-space-forces',
  number: 2,
  title: 'Day, Night and Shadows',
  lesson: `The **Earth spins on its axis** once every 24 hours. The side facing the Sun gets daytime; the side facing away gets nighttime. The **Sun isn't really moving across the sky** — the Earth is rotating.

**Shadows change during the day** because the angle of sunlight changes:
- Morning → Sun low → shadows **long**
- Midday → Sun high → shadows **shortest**
- Afternoon → Sun low again → shadows **long** again`,
  vocabulary: [
    { term: 'Axis', meaning: 'An imaginary line the Earth spins around' },
    { term: 'Rotation', meaning: 'The Earth spinning once every 24 hours' },
    { term: 'Shadow', meaning: 'A dark shape made when an object blocks light' },
    { term: 'Sunrise / Sunset', meaning: 'When the Sun appears or disappears at the horizon' },
  ],
  questions: [
    {
      id: 'earth-02-q1',
      sectionId: 'earth-02-day-night',
      type: 'short',
      prompt: 'Why does the Sun appear to move across the sky?',
      answer: 'Because the Earth is rotating',
      acceptable: [
        'because the earth is spinning',
        'because the earth rotates',
        'because the earth is spinning on its axis',
        'the earth is rotating not the sun',
        'the earth spins',
      ],
      explanation:
        'The Sun stays still (more or less). The Earth is spinning, so different parts of the Earth point at the Sun at different times. From the ground, that *looks* like the Sun moving — but it\'s us, not the Sun.',
      difficulty: 2,
      reasoning: true,
      source: 'Term 2 Section 2 Q1',
    },
    {
      id: 'earth-02-q2',
      sectionId: 'earth-02-day-night',
      type: 'short',
      prompt: 'When are shadows shortest?',
      answer: 'At midday',
      acceptable: [
        'midday',
        'at midday',
        'noon',
        'at noon',
        'when the sun is highest',
        'when the sun is overhead',
      ],
      explanation:
        'At midday the Sun is highest in the sky, so light hits the ground almost straight down → shadows are short. In the morning and evening the Sun is low → shadows stretch out long.',
      difficulty: 1,
      source: 'Term 2 Section 2 Q2',
    },
    {
      id: 'earth-02-q3',
      sectionId: 'earth-02-day-night',
      type: 'short',
      prompt: 'What causes day and night?',
      answer: 'The Earth spinning on its axis',
      acceptable: [
        'the earth spinning',
        'the rotation of the earth',
        'earth\'s rotation',
        'the earth spinning on its axis',
        'the earth rotates so one side faces the sun and the other is in darkness',
      ],
      explanation:
        'As Earth spins, the half facing the Sun has day; the half facing away has night. One full spin = 24 hours = one day and one night.',
      difficulty: 1,
      source: 'Term 2 Section 2 Q3',
    },
    {
      id: 'earth-02-q4',
      sectionId: 'earth-02-day-night',
      type: 'short',
      prompt: 'What is the Earth\'s axis?',
      answer: 'An imaginary line the Earth spins around',
      acceptable: [
        'an imaginary line that the earth spins around',
        'the imaginary line through the earth',
        'the line earth spins on',
        'imaginary line earth rotates around',
        'a line from the north pole to the south pole',
      ],
      explanation:
        'The axis is an imaginary line going from the North Pole to the South Pole. The Earth spins around it like a spinning top.',
      difficulty: 1,
      source: 'Term 2 Section 2 Q4',
    },
    {
      id: 'earth-02-q5',
      sectionId: 'earth-02-day-night',
      type: 'mcq',
      prompt: 'How long does the Earth take to spin around once?',
      choices: ['1 hour', '24 hours', '7 days', '365 days'],
      answer: '24 hours',
      explanation:
        'One full rotation = 24 hours = one day. (One full orbit around the *Sun* takes 365 days — that\'s a year.)',
      difficulty: 1,
      source: 'Term 2 Section 2 — MCQ variant',
    },
    {
      id: 'earth-02-q6',
      sectionId: 'earth-02-day-night',
      type: 'cloze',
      prompt: 'When the Sun is high in the sky, shadows are at their ____.',
      answer: 'shortest',
      acceptable: ['shortest', 'shortest length'],
      explanation:
        'Light coming down nearly vertical → very little shadow. Light coming in at a low angle → long shadow.',
      difficulty: 2,
      source: 'Term 2 Section 2 — cloze variant',
    },
  ],
  deeper: `In the **Arctic Circle in summer**, the Sun doesn't set for weeks. The Earth\'s tilt keeps the North Pole pointing at the Sun day and night — it\'s called the **midnight sun**. In winter, the opposite happens: 24 hours of darkness for weeks at a time.

**Sundials are the oldest clocks.** People used the shifting shadow of a stick or pillar to tell time over 5,000 years before mechanical clocks were invented. The Egyptians had quite accurate ones.

**You feel the Earth spinning when you fly east.** At the equator the Earth rotates at about **1,670 km/h** — faster than most jet planes. You\'re moving that fast right now and you don\'t even notice, because everything around you is moving with you.`,
};
