import type { Section } from '../types';
import { EarthSphericalBodiesDiagram } from '../../diagrams/earth-01-spherical-bodies';

export const earth01SphericalBodies: Section = {
  id: 'earth-01-spherical-bodies',
  subject: 'science',
  pack: 'earth-space-forces',
  number: 1,
  title: 'Earth, Sun and Moon: Spherical Bodies',
  diagram: EarthSphericalBodiesDiagram,
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
  examples: [
    {
      title: 'Ships disappear into Plymouth Sound',
      body: `Stand on Plymouth Hoe on a clear day, watch a ferry sail out, and you'll see it lose the bottom first — hull, then waterline, then deck, then funnel — as the curve of the sea bends down between you and the **horizon**. If the Earth were flat, the whole ship would just shrink as one. The bottom-first disappearance is the curve made visible.`,
    },
    {
      title: 'Eratosthenes and a shadow',
      body: `In **240 BC** the Greek scientist **Eratosthenes** noticed that at noon on midsummer's day, a stick in Aswan cast no shadow but the same stick 800 km north in Alexandria cast a clear one. From the shadow angle, he worked out Earth's full circumference. His answer was within **5%** of the modern value — done with sticks, sun and arithmetic.`,
    },
    {
      title: "Earth isn't a perfect sphere",
      body: `Earth spins fast enough that it bulges slightly at the equator and flattens at the poles. The shape has a name: an **oblate spheroid**. The bulge is small — only about 21 km of difference across 12,700 km of diameter — but it's why Mount Chimborazo in Ecuador, sitting on the equator, reaches further from Earth's centre than Everest does.`,
    },
    {
      title: 'Try this: a beach-ball eclipse',
      body: `Take a torch, a tennis ball (the Moon) and a football (Earth). In a dark room shine the torch on the football so it casts a shadow on the wall. Now move the tennis ball into that shadow. Notice the shadow on the ball is **curved**. That's what astronomers see during a real lunar eclipse — Earth's shadow on the Moon is always round.`,
    },
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
  deeper: `**Big things in space are always round.** Gravity pulls equally in all directions, so once a rocky body grows past about **600 km wide** it crushes itself into a sphere. Anything smaller stays lumpy because rock is strong enough to hold a weird shape. That's why the Moon, Earth and Sun are spheres while small asteroids look like potatoes.

**Saturn's moon Mimas looks like the Death Star.** It has a giant impact crater taking up almost a third of one face, left from a hit so violent it nearly shattered the moon. Look up the photo — *Star Wars* came out two years before Mimas was photographed up close, but the resemblance is uncanny.

**You can see the curve yourself.** From a tall building or a plane, on a clear day, you can actually see the horizon dip down at the edges. Astronauts always say the curve is the first thing that hits them in space.`,
};
