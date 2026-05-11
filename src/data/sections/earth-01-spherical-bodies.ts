import type { Section } from '../types';

export const earth01SphericalBodies: Section = {
  id: 'earth-01-spherical-bodies',
  subject: 'science',
  pack: 'earth-space-forces',
  number: 1,
  title: 'Earth, Sun and Moon: Spherical Bodies',
  lesson: `The Earth, Sun and Moon are all **spherical** — roughly perfect round 3D shapes. People once thought the Earth was flat, but we have lots of evidence it isn't:

- **Photographs from space** show curved surfaces.
- **Lunar eclipses** — when the Earth's shadow falls on the Moon, the shadow is round.
- **Ships disappear hull-first** over the horizon, because the sea curves away.
- **Time zones** only make sense on a curved Earth (it's noon in one place and midnight on the other side).`,
  vocabulary: [
    { term: 'Sphere', meaning: 'A 3D shape that is perfectly round' },
    { term: 'Celestial body', meaning: 'A natural object in space (e.g. planet, moon, star)' },
    { term: 'Horizon', meaning: 'Where the sky seems to meet the Earth' },
    { term: 'Evidence', meaning: 'Information that shows something is true' },
  ],
  questions: [
    {
      id: 'earth-01-q1',
      sectionId: 'earth-01-spherical-bodies',
      type: 'short',
      prompt: 'Name one piece of evidence that the Earth is spherical.',
      answer: 'Photographs from space show curved surfaces',
      acceptable: [
        'photos from space',
        'photographs from space',
        'pictures from space',
        'ships disappear hull-first over the horizon',
        'ships disappear bottom first',
        'lunar eclipses show a round shadow',
        'the earth\'s shadow on the moon is round',
        'time zones',
        'time zones only work on a round earth',
        'lunar eclipses',
      ],
      explanation:
        'Any of these counts: space photos, the round shadow on the Moon during a lunar eclipse, ships disappearing bottom-first over the horizon, or the existence of time zones.',
      difficulty: 1,
      source: 'Term 2 Section 1 Q1',
    },
    {
      id: 'earth-01-q2',
      sectionId: 'earth-01-spherical-bodies',
      type: 'short',
      prompt: 'Which is larger: the Earth or the Moon?',
      answer: 'The Earth',
      acceptable: ['earth', 'the earth', 'the earth is larger', 'earth is bigger'],
      explanation:
        'The Earth is much larger — about 4 times wider than the Moon. (You could fit roughly 50 Moons inside the Earth by volume.)',
      difficulty: 1,
      source: 'Term 2 Section 1 Q2',
    },
    {
      id: 'earth-01-q3',
      sectionId: 'earth-01-spherical-bodies',
      type: 'short',
      prompt: 'What shape is the Sun?',
      answer: 'A sphere',
      acceptable: ['sphere', 'spherical', 'a sphere', 'round', 'spherical/round'],
      explanation:
        'The Sun is a sphere — same shape as the Earth and Moon. Gravity pulls everything inward equally in all directions, so big things in space tend to be round.',
      difficulty: 1,
      source: 'Term 2 Section 1 Q3',
    },
    {
      id: 'earth-01-q4',
      sectionId: 'earth-01-spherical-bodies',
      type: 'short',
      prompt: 'Why do ships disappear bottom-first over the horizon?',
      answer: 'Because the Earth is curved, so the sea curves away from us',
      acceptable: [
        'because the earth is curved',
        'because the earth is round',
        'the earth is curved so the bottom dips below the horizon first',
        'the surface of the sea curves',
        'the sea curves away',
        'because the earth is a sphere',
      ],
      explanation:
        'If the Earth were flat, a ship would just shrink in the distance. Because it\'s curved, the bottom of the ship dips below the horizon before the top — like watching a coin slide over the edge of a beach ball.',
      difficulty: 2,
      reasoning: true,
      source: 'Term 2 Section 1 Q4',
    },
    {
      id: 'earth-01-q5',
      sectionId: 'earth-01-spherical-bodies',
      type: 'mcq',
      prompt: 'During a lunar eclipse, what does the Earth\'s shadow on the Moon look like?',
      choices: ['Square', 'A long thin line', 'Round', 'Triangular'],
      answer: 'Round',
      explanation:
        'A round shadow means the object casting it is round — that\'s exactly what we see during a lunar eclipse. Strong evidence the Earth is a sphere.',
      difficulty: 2,
      source: 'Term 2 Section 1 — MCQ variant',
    },
  ],
  deeper: `**Eratosthenes worked out the size of the Earth in 240 BC** — over 2,200 years ago, with no maths machines, no satellites, no rockets. He just compared the shadow of a stick in one Egyptian city with no shadow in another. From that, he calculated the Earth's circumference. His answer was within 5% of the right one. Pretty incredible.

**The Earth isn't a *perfect* sphere.** It bulges slightly at the equator because it's spinning. (Spin a wet tennis ball really fast and it would do the same.) Scientists call this shape an "oblate spheroid". But for Y5 purposes, "sphere" is right.

**You can see the curve yourself.** From a tall building or a plane, on a clear day, you can actually see the horizon dip down at the edges. Astronauts always say the curve is the first thing that hits them in space.`,
};
