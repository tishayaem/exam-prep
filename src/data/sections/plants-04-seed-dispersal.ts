import type { Section } from '../types';
import { PlantsSeedDispersalDiagram } from '../../diagrams/plants-04-seed-dispersal';

export const plants04SeedDispersal: Section = {
  id: 'plants-04-seed-dispersal',
  subject: 'science',
  pack: 'plants',
  number: 4,
  title: 'Seed Dispersal',
  diagram: PlantsSeedDispersalDiagram,
  lesson: `Plants can't move, so they use clever tricks to **spread their seeds** away from the parent plant. This helps the seeds find space, light, water and nutrients — without competing with their parent.

There are four main methods:

- **Wind** — light seeds with wings or fluff (dandelion, sycamore "helicopters", ash).
- **Animal** — sticky burrs that catch on fur, or tasty fruits that animals eat and drop the seeds elsewhere (blackberry, burdock burrs, acorns).
- **Water** — seeds that float (coconut, mangrove).
- **Explosion** — pods that dry out and burst open suddenly (peas, poppies). **BOOM!**`,
  vocabulary: [
    { term: 'Seed dispersal', meaning: 'How seeds are spread away from the parent plant' },
    { term: 'Wind dispersal', meaning: 'Seeds carried by the air' },
    { term: 'Animal dispersal', meaning: 'Seeds eaten or carried by animals' },
    { term: 'Water dispersal', meaning: 'Seeds that float' },
    { term: 'Explosion', meaning: 'Pods burst open and scatter seeds' },
  ],
  examples: [
    {
      title: 'Sycamore helicopters in autumn',
      body: `Sycamore seeds — those papery winged "helicopters" you see spinning down from trees in October — are one of the most studied seed shapes in physics. The wing creates a low-pressure spiral of air above it as it spins, slowing the fall and letting the **wind** carry it sideways. Children drop them for fun; engineers copy them when designing parachutes and drones.`,
    },
    {
      title: 'Burdock burrs cling to dog walks',
      body: `Walk a dog past a **burdock** plant in late summer and you'll see **animal dispersal** happen live: rounded burrs covered in tiny hooks latch onto fur and trousers. The plant doesn't care which species moves it — every creature that walks past becomes a delivery service. It was these very burrs that gave a Swiss engineer the idea for Velcro.`,
    },
    {
      title: 'Squirrels are forgetful gardeners',
      body: `A grey squirrel buries hundreds of acorns each autumn — and forgets where many of them are. Those forgotten acorns then sprout into oak trees. So the squirrel is, accidentally, the oak's main planter. Britain's oak woodlands are partly there because of generations of squirrels with bad memories. The plant turns animal forgetfulness into free gardening.`,
    },
    {
      title: 'Coconuts can sail an ocean',
      body: `A coconut can float for several months on salt water and still sprout when it washes ashore. That's how coconut palms ended up on tropical islands all over the world — long before humans, the seeds were island-hopping by sea. Some have travelled thousands of kilometres in deep-ocean currents and still grown into trees after landing.`,
    },
  ],
  questions: [
    {
      id: 'plants-04-q1',
      sectionId: 'plants-04-seed-dispersal',
      type: 'short',
      prompt: 'Why do plants need to spread their seeds?',
      answer: 'To avoid overcrowding and competition with the parent plant',
      acceptable: [
        'to avoid overcrowding',
        'so they don\'t compete with the parent',
        'to find space',
        'to get more sunlight',
        'to spread to new areas',
        'to reduce competition',
      ],
      explanation:
        'If all seeds dropped straight down, the new plants would fight the parent for light, water and nutrients — and probably lose. Spreading out gives each seedling a fair chance.',
      difficulty: 1,
      source: 'Term 1 Section 4 Q1',
    },
    {
      id: 'plants-04-q2',
      sectionId: 'plants-04-seed-dispersal',
      type: 'short',
      prompt: 'Name one seed that uses the wind to travel.',
      answer: 'Dandelion',
      acceptable: ['dandelion', 'sycamore', 'ash', 'maple', 'milkweed', 'thistle'],
      explanation:
        'Wind-dispersed seeds are usually light and have wings or fluff: dandelion (parachute), sycamore and maple ("helicopters"), ash, milkweed, thistle.',
      difficulty: 1,
      source: 'Term 1 Section 4 Q2',
    },
    {
      id: 'plants-04-q3',
      sectionId: 'plants-04-seed-dispersal',
      type: 'short',
      prompt: 'How do animals help with seed dispersal?',
      answer: 'They eat the fruit and drop the seeds, or seeds stick to their fur',
      acceptable: [
        'they eat the fruit and drop the seeds',
        'seeds stick to their fur',
        'by eating fruits and dropping seeds',
        'they carry seeds on their fur',
        'they eat them and the seeds come out',
        'animals eat the fruit and spread the seeds',
      ],
      explanation:
        'Two ways. (1) Animals eat tasty fruit and the seeds pass through them (or get dropped) somewhere new. (2) Sticky burrs and hooked seeds latch onto animal fur and hitch a ride.',
      difficulty: 2,
      source: 'Term 1 Section 4 Q3',
    },
    {
      id: 'plants-04-q4',
      sectionId: 'plants-04-seed-dispersal',
      type: 'short',
      prompt: 'What type of dispersal did we model with paper helicopters?',
      answer: 'Wind dispersal',
      acceptable: ['wind dispersal', 'wind', 'by wind'],
      explanation:
        'Paper helicopters spin as they fall — the same trick sycamore seeds use to catch the wind and drift further from the parent tree.',
      difficulty: 1,
      source: 'Term 1 Section 4 Q4',
    },
    {
      id: 'plants-04-q5',
      sectionId: 'plants-04-seed-dispersal',
      type: 'mcq',
      prompt: 'A coconut washes up on a tropical island and sprouts into a tree. Which type of dispersal is this?',
      choices: ['Wind', 'Animal', 'Water', 'Explosion'],
      answer: 'Water',
      explanation:
        'Coconuts float and travel huge distances on ocean currents. That\'s how coconut palms ended up on islands all over the tropics.',
      difficulty: 2,
      source: 'Term 1 Section 4 — MCQ variant',
    },
    {
      id: 'plants-04-q6',
      sectionId: 'plants-04-seed-dispersal',
      type: 'short',
      prompt: 'Why do dandelion seeds have fluffy parachutes?',
      answer: 'So the wind can carry them far away',
      acceptable: [
        'to be carried by the wind',
        'so they catch the wind',
        'to travel further on the wind',
        'so they float on the wind',
        'for wind dispersal',
      ],
      explanation:
        'The fluffy parachute catches the wind so the seed drifts a long way before landing. Some dandelion seeds travel several kilometres on a windy day!',
      difficulty: 2,
      reasoning: true,
      source: 'Term 1 Section 4 — reasoning variant',
    },
  ],
  deeper: `**Velcro was inspired by burdock burrs.** A Swiss engineer was walking his dog in 1941, kept pulling burrs out of its fur, and looked at one under a microscope. Tiny hooks! He spent years copying the design — and that's how velcro was invented. Plants got there millions of years first.

**Jewelweed** seed pods are *spring-loaded*. Touch one when it's ripe and it explodes in your hand, flinging seeds several metres in a fraction of a second. Some kids in the US call it "touch-me-not".

**Dandelion seeds use physics.** Scientists in 2018 discovered that the parachute creates a tiny ring of swirling air above it — a "separated vortex" — that helps it float four times further than it would otherwise. We didn't know how it worked until *recently*. The plant figured it out millions of years ago.`,
};
