import type { Section } from '../types';

export const earth03OrbitsSeasons: Section = {
  id: 'earth-03-orbits-seasons',
  subject: 'science',
  pack: 'earth-space-forces',
  number: 3,
  title: 'Orbits, Seasons and the Tilt of the Earth',
  lesson: `Three big facts:

- The **Earth orbits the Sun** once every **year** (about 365 days).
- The **Moon orbits the Earth** every **28 days**.
- The **Earth is tilted at 23.5°** — and this tilt is what causes the **seasons**.

When the Northern Hemisphere tilts **towards** the Sun → it\'s **summer** there (more direct sunlight, longer days). When it tilts **away** → it\'s **winter** (less direct sunlight, shorter days). At the same time, the Southern Hemisphere is doing the opposite.

The seasons are NOT caused by the Earth being closer or further from the Sun. They\'re caused by the **tilt**.`,
  vocabulary: [
    { term: 'Orbit', meaning: 'A curved path one body takes around another' },
    { term: 'Revolution', meaning: 'One complete orbit' },
    { term: 'Tilt', meaning: 'A slanted position' },
    { term: 'Hemisphere', meaning: 'Half of the Earth (Northern or Southern)' },
  ],
  examples: [
    {
      title: 'Christmas Day on Bondi Beach',
      body: `While Britain huddles indoors in cold December, Australians eat Christmas dinner on the beach. Same Earth, same day — but the Southern **Hemisphere** is tilted *towards* the Sun while the north is tilted *away*. So Sydney has long bright days and 30°C heat while London has short grey days and freezing nights. Six months later, the two countries swap.`,
    },
    {
      title: "Closer to the Sun doesn't mean warmer",
      body: `Surprisingly, Earth is actually slightly **closer** to the Sun in January than in July — about 5 million km closer. So why is January cold in Britain? Because closeness barely matters. The **tilt** matters. In January the Northern Hemisphere is tilted away from the Sun and the rays hit at a low angle, spreading their heat thinly across the ground.`,
    },
    {
      title: 'Solstices and equinoxes',
      body: `Twice a year (March 20-21 and September 22-23) the **tilt** is sideways and day equals night everywhere — the **equinoxes**. Twice a year (June 21 and December 21) the tilt is fullest in one direction — the **solstices**, the longest and shortest days. Ancient calendars were built around these four dates and they're still printed on most modern ones.`,
    },
    {
      title: 'Try this: tilted apple demo',
      body: `Hold an apple at an angle and walk it slowly around a table lamp in a dark room. Watch the lit side: the top half catches more light when the apple's stalk tilts *towards* the lamp (summer in the top **hemisphere**), and less when it tilts *away* (winter). Keep the tilt fixed as you orbit — that's exactly what Earth does as it loops the Sun.`,
    },
  ],
  questions: [
    {
      id: 'earth-03-q1',
      sectionId: 'earth-03-orbits-seasons',
      type: 'short',
      prompt: 'How long does the Earth take to orbit the Sun?',
      answer: 'One year (about 365 days)',
      acceptable: [
        'a year',
        'one year',
        '365 days',
        'about 365 days',
        '1 year',
        '365.25 days',
      ],
      explanation:
        'One orbit around the Sun = one year = about 365 days. (Actually 365 and a quarter — which is why we add a leap day every 4 years.)',
      difficulty: 1,
      source: 'Term 2 Section 3 Q1',
    },
    {
      id: 'earth-03-q2',
      sectionId: 'earth-03-orbits-seasons',
      type: 'short',
      prompt: 'What causes the seasons?',
      answer: 'The tilt of the Earth',
      acceptable: [
        'the earth is tilted',
        'the tilt of the earth',
        'the earth\'s axis is tilted',
        'the tilt',
        'because the earth is tilted at 23.5 degrees',
        'the axial tilt',
      ],
      explanation:
        'The Earth\'s axis is tilted 23.5°. As Earth orbits the Sun, different hemispheres point towards or away from the Sun, which changes how directly sunlight hits — and that\'s seasons. (Not distance from the Sun!)',
      difficulty: 2,
      source: 'Term 2 Section 3 Q2',
    },
    {
      id: 'earth-03-q3',
      sectionId: 'earth-03-orbits-seasons',
      type: 'short',
      prompt: 'How long does the Moon take to orbit the Earth?',
      answer: 'About 28 days',
      acceptable: [
        '28 days',
        'about 28 days',
        '28',
        'a month',
        'about a month',
        '27 days',
      ],
      explanation:
        'The Moon takes about 28 days (roughly a month) to go around the Earth. The word "month" actually comes from "Moon"!',
      difficulty: 1,
      source: 'Term 2 Section 3 Q3',
    },
    {
      id: 'earth-03-q4',
      sectionId: 'earth-03-orbits-seasons',
      type: 'short',
      prompt: 'When is it summer in the Northern Hemisphere?',
      answer: 'When the Northern Hemisphere is tilted towards the Sun',
      acceptable: [
        'when the northern hemisphere is tilted towards the sun',
        'when the north is tilted to the sun',
        'when our part of the earth is tilted towards the sun',
        'when the north hemisphere points to the sun',
      ],
      explanation:
        'Summer in the north = the Northern Hemisphere is tilted *towards* the Sun → sunlight hits more directly and the days are longer. Meanwhile it\'s winter in Australia.',
      difficulty: 2,
      source: 'Term 2 Section 3 Q4',
    },
    {
      id: 'earth-03-q5',
      sectionId: 'earth-03-orbits-seasons',
      type: 'mcq',
      prompt: 'If the Earth had no tilt, what would happen?',
      choices: [
        'There would be no seasons',
        'There would be no day and night',
        'There would be no year',
        'There would be no Moon',
      ],
      answer: 'There would be no seasons',
      explanation:
        'No tilt = sunlight hits the Earth the same way all year. No summer, no winter — just one steady climate per region. Day and night would still happen (that\'s the spin) and the year would still happen (that\'s the orbit).',
      difficulty: 3,
      reasoning: true,
      source: 'Term 2 Section 3 — reasoning variant',
    },
    {
      id: 'earth-03-q6',
      sectionId: 'earth-03-orbits-seasons',
      type: 'cloze',
      prompt: 'The Earth is tilted at ____ degrees.',
      answer: '23.5',
      acceptable: ['23.5', '23.5°', '23.5 degrees', 'about 23.5'],
      explanation:
        'The Earth\'s axis tilts at about 23.5° from straight up. Not a random number — it\'s set by a giant collision early in Earth\'s history (which also made the Moon).',
      difficulty: 2,
      source: 'Term 2 Section 3 — cloze variant',
    },
  ],
  deeper: `**Uranus is tilted on its side.** Most planets spin like upright spinning tops; Uranus tips over at **98°**, basically rolling around the Sun. So its poles take turns pointing at the Sun for 42 years at a time — imagine 42 years of summer followed by 42 years of winter!

**Mars has much more extreme seasons** because it\'s further from the Sun and its orbit is more oval. Winters there are properly brutal: dry ice (frozen carbon dioxide) actually freezes out of the atmosphere onto the poles.

The Earth\'s tilt isn\'t completely fixed — it slowly wobbles over **41,000 years**. That wobble is partly why Ice Ages happen and end. Earth has had several Ice Ages, the last one ending only 11,000 years ago.`,
};
