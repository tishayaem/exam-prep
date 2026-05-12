import type { Section } from '../types';
import { EarthMoonPhasesDiagram } from '../../diagrams/earth-04-moon-phases';

export const earth04MoonPhases: Section = {
  id: 'earth-04-moon-phases',
  subject: 'science',
  pack: 'earth-space-forces',
  number: 4,
  title: 'Phases of the Moon',
  diagram: EarthMoonPhasesDiagram,
  lesson: `The Moon **doesn\'t actually change shape** — it just *looks* like it does, because we see different amounts of its **lit side** as it orbits Earth.

Half of the Moon is always lit by the Sun (the half facing the Sun). As the Moon orbits Earth, we see more or less of that lit half:

- **New Moon** — the dark side faces us → we see almost nothing
- **Crescent** — a thin curved sliver
- **Half / Quarter** — exactly half lit from our view
- **Gibbous** — more than half lit
- **Full Moon** — the whole lit side faces us

One full cycle = about 28 days = one **lunar month**.`,
  vocabulary: [
    { term: 'Lunar', meaning: 'Anything to do with the Moon' },
    { term: 'Phase', meaning: 'The shape of the lit part of the Moon we can see' },
    { term: 'Orbit', meaning: 'The path the Moon takes around Earth' },
    { term: 'Crescent', meaning: 'A thin curved shape' },
    { term: 'Gibbous', meaning: 'More than half lit' },
  ],
  examples: [
    {
      title: 'We only ever see one side',
      body: `The Moon spins on its own axis at *exactly* the right rate to keep the same face pointing at Earth always. This is called **tidal locking** — Earth's gravity slowed the Moon's spin to match its **orbit** over billions of years. The "far side" of the Moon was first photographed in 1959 by a Soviet probe and turned out to be much more cratered than the side we see.`,
    },
    {
      title: 'A new moon looks like no moon',
      body: `A **new moon** isn't dark — it's hiding. The Moon is between Earth and the Sun, so the lit half faces away from us and the unlit half points our way. The sky looks moonless that night — and astronomers love it because dark skies let them see galaxies and faint stars without lunar glare washing them out.`,
    },
    {
      title: 'The Moon is drifting away',
      body: `Each year the Moon edges about **3.8 cm** further from Earth — roughly the rate fingernails grow. In a few hundred million years it'll be too far away to fully cover the Sun, and total solar eclipses will stop happening on Earth. Many generations from now, only partial eclipses will be possible — and the people alive then won't know what a total eclipse looked like.`,
    },
    {
      title: 'Try this: orange and torch demo',
      body: `In a dark room, hold an orange (the Moon) at arm's length. Have someone shine a torch (the Sun) at it from one side. Slowly turn yourself in a circle, keeping the orange in front of your face. Watch how the lit side tilts in and out of view: full → **gibbous** → half → **crescent** → new → and back. That's exactly what the real Moon does each month.`,
    },
  ],
  questions: [
    {
      id: 'earth-04-q1',
      sectionId: 'earth-04-moon-phases',
      type: 'short',
      prompt: 'How long does the Moon take to orbit the Earth?',
      answer: 'About 28 days',
      acceptable: [
        '28 days',
        'about 28 days',
        '28',
        'a month',
        'about a month',
        '27.3 days',
      ],
      explanation:
        '~28 days for one orbit, which is also how long the cycle of phases takes. That\'s where the word "month" came from.',
      difficulty: 1,
      source: 'Term 2 Section 4 Q1',
    },
    {
      id: 'earth-04-q2',
      sectionId: 'earth-04-moon-phases',
      type: 'short',
      prompt: 'Why does the Moon appear to change shape?',
      answer: 'Because we see different amounts of its lit side as it orbits Earth',
      acceptable: [
        'because we see different amounts of the lit half',
        'because the lit half points at us differently as it orbits',
        'we see different bits of the sunlit half',
        'the moon doesn\'t actually change shape — we see different parts of the lit side',
        'because of its orbit around earth',
      ],
      explanation:
        'Half the Moon is always lit by the Sun. As it goes around the Earth, the angle changes — sometimes the lit half faces us (full moon), sometimes the dark half does (new moon), and everything in between.',
      difficulty: 2,
      reasoning: true,
      source: 'Term 2 Section 4 Q2',
    },
    {
      id: 'earth-04-q3',
      sectionId: 'earth-04-moon-phases',
      type: 'short',
      prompt: 'What is a crescent Moon?',
      answer: 'A thin curved shape — only a sliver of the Moon is lit',
      acceptable: [
        'a thin curved shape',
        'a thin curved moon',
        'a thin sliver',
        'when only a little of the moon is lit',
        'a small curved sliver of light',
        'a small curve',
      ],
      explanation:
        'A crescent is the thin curved shape we see just after a new moon (or just before the next one). Most of the Moon\'s lit side is pointing away from us.',
      difficulty: 1,
      source: 'Term 2 Section 4 Q3',
    },
    {
      id: 'earth-04-q4',
      sectionId: 'earth-04-moon-phases',
      type: 'short',
      prompt: 'When is the Moon fully lit (from our view)?',
      answer: 'During a full moon — when the Earth is between the Sun and the Moon',
      acceptable: [
        'full moon',
        'during a full moon',
        'when it\'s a full moon',
        'when the earth is between the sun and the moon',
        'when the sun fully lights the side facing us',
      ],
      explanation:
        'A full moon happens when the Earth sits between the Sun and the Moon. The Sun lights the whole face of the Moon that\'s pointing at us — that\'s the full bright disc we see.',
      difficulty: 2,
      source: 'Term 2 Section 4 Q4',
    },
    {
      id: 'earth-04-q5',
      sectionId: 'earth-04-moon-phases',
      type: 'mcq',
      prompt: '"Gibbous" describes a Moon that is:',
      choices: [
        'Less than half lit',
        'Exactly half lit',
        'More than half lit but not full',
        'Completely dark',
      ],
      answer: 'More than half lit but not full',
      explanation:
        '**Gibbous** = between half-moon and full-moon. The lit area is bigger than half but not yet the whole face.',
      difficulty: 2,
      source: 'Term 2 Section 4 — MCQ variant',
    },
    {
      id: 'earth-04-q6',
      sectionId: 'earth-04-moon-phases',
      type: 'truefalse',
      prompt: 'The Moon makes its own light.',
      choices: ['True', 'False'],
      answer: 'False',
      explanation:
        'The Moon makes **no** light of its own. We only see it because the Sun is shining on it and the Moon reflects that light back at us.',
      difficulty: 1,
      source: 'Term 2 Section 4 — true/false variant',
    },
  ],
  deeper: `**The same side of the Moon always faces Earth.** This is called **tidal locking** — over billions of years, Earth\'s gravity slowed the Moon\'s spin until one face was permanently locked towards us. We never saw the "far side" of the Moon until a Soviet spacecraft photographed it in 1959. (Spoiler: it\'s much more cratered.)

**Supermoons** happen when a full moon lines up with the closest part of its orbit. It can look up to **14% bigger and 30% brighter** than usual. Your phone camera probably won\'t pick it up — but with your eyes it\'s spectacular.

**The Moon is slowly moving away from Earth** — about **3.8 cm a year**, roughly the rate your fingernails grow. In about 600 million years, total solar eclipses will stop happening because the Moon will be too far away to fully cover the Sun.`,
};
