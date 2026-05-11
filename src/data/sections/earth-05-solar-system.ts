import type { Section } from '../types';

export const earth05SolarSystem: Section = {
  id: 'earth-05-solar-system',
  subject: 'science',
  pack: 'earth-space-forces',
  number: 5,
  title: 'The Solar System',
  lesson: `Our **Solar System** has the **Sun** in the middle and 8 planets orbiting it.

**Order from the Sun:**
1. Mercury
2. Venus
3. Earth
4. Mars
5. Jupiter
6. Saturn
7. Uranus
8. Neptune

**Rocky planets** (small, solid surfaces): Mercury, Venus, Earth, Mars.
**Gas giants** (huge, made mostly of gas): Jupiter, Saturn, Uranus, Neptune.

**Mnemonic to remember the order:** *My Very Eager Mother Just Served Us Noodles.* (M-V-E-M-J-S-U-N)`,
  vocabulary: [
    { term: 'Planet', meaning: 'A large body orbiting a star' },
    { term: 'Asteroid', meaning: 'A rocky object orbiting the Sun' },
    { term: 'Gas giant', meaning: 'A large planet made mostly of gas' },
    { term: 'Rocky planet', meaning: 'A planet with a solid surface' },
  ],
  questions: [
    {
      id: 'earth-05-q1',
      sectionId: 'earth-05-solar-system',
      type: 'short',
      prompt: 'Which planet is closest to the Sun?',
      answer: 'Mercury',
      acceptable: ['mercury'],
      explanation:
        'Mercury is closest. It\'s small, rocky, with no atmosphere — and incredibly hot on the day side and freezing cold on the night side.',
      difficulty: 1,
      source: 'Term 2 Section 5 Q1',
    },
    {
      id: 'earth-05-q2',
      sectionId: 'earth-05-solar-system',
      type: 'short',
      prompt: 'Name the four rocky planets.',
      answer: 'Mercury, Venus, Earth, Mars',
      acceptable: [
        'mercury venus earth mars',
        'mercury, venus, earth, mars',
        'mercury venus earth and mars',
        'mercury venus earth, mars',
      ],
      explanation:
        'The four inner planets are all rocky: Mercury, Venus, Earth, Mars. They all have solid surfaces you could (in theory) stand on.',
      difficulty: 2,
      source: 'Term 2 Section 5 Q2',
    },
    {
      id: 'earth-05-q3',
      sectionId: 'earth-05-solar-system',
      type: 'short',
      prompt: 'What type of planet is Jupiter?',
      answer: 'A gas giant',
      acceptable: [
        'gas giant',
        'a gas giant',
        'gas planet',
        'a gas planet',
      ],
      explanation:
        'Jupiter is a gas giant — the biggest planet in the Solar System, made mostly of hydrogen and helium gas. There\'s no solid surface to land on.',
      difficulty: 1,
      source: 'Term 2 Section 5 Q3',
    },
    {
      id: 'earth-05-q4',
      sectionId: 'earth-05-solar-system',
      type: 'short',
      prompt: 'Which planet is farthest from the Sun?',
      answer: 'Neptune',
      acceptable: ['neptune'],
      explanation:
        'Neptune is the most distant planet. It\'s a deep-blue gas giant with the fastest winds in the Solar System.',
      difficulty: 1,
      source: 'Term 2 Section 5 Q4',
    },
    {
      id: 'earth-05-q5',
      sectionId: 'earth-05-solar-system',
      type: 'mcq',
      prompt: 'Which planet has prominent rings made of ice and rock?',
      choices: ['Mars', 'Jupiter', 'Saturn', 'Neptune'],
      answer: 'Saturn',
      explanation:
        'Saturn\'s rings are the most famous and easiest to see. Jupiter, Uranus and Neptune also have rings, but they\'re very faint compared to Saturn\'s.',
      difficulty: 2,
      source: 'Term 2 Section 5 — MCQ variant',
    },
    {
      id: 'earth-05-q6',
      sectionId: 'earth-05-solar-system',
      type: 'mcq',
      prompt: 'Which planet comes right after Earth, moving outwards from the Sun?',
      choices: ['Venus', 'Mars', 'Jupiter', 'Mercury'],
      answer: 'Mars',
      explanation:
        'Order from the Sun: Mercury, Venus, Earth, **Mars**, Jupiter, Saturn, Uranus, Neptune. Mars is our next-door neighbour going outwards.',
      difficulty: 2,
      source: 'Term 2 Section 5 — MCQ variant',
    },
    {
      id: 'earth-05-q7',
      sectionId: 'earth-05-solar-system',
      type: 'cloze',
      prompt: 'The biggest planet in the Solar System is ____.',
      answer: 'Jupiter',
      acceptable: ['jupiter'],
      explanation:
        'Jupiter is the giant of giants — you could fit over 1,300 Earths inside it.',
      difficulty: 1,
      source: 'Term 2 Section 5 — cloze variant',
    },
  ],
  deeper: `**Pluto used to be a planet** — until 2006, when astronomers redefined what counts. Pluto is now a "dwarf planet" because it shares its orbital zone with lots of other icy objects. Some people still campaign for Pluto to be reinstated. The debate is fierce!

**A day on Venus is longer than its year.** Venus spins so slowly that it takes 243 Earth days to rotate once — but only 225 Earth days to orbit the Sun. Weird.

**Jupiter has a Great Red Spot** — a storm wider than Earth that has been going for **at least 350 years**, possibly much longer. If you fell into it, the winds inside could exceed 600 km/h.`,
};
