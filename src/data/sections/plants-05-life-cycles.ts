import type { Section } from '../types';

export const plants05LifeCycles: Section = {
  id: 'plants-05-life-cycles',
  subject: 'science',
  pack: 'plants',
  number: 5,
  title: 'Life Cycles of Animals',
  lesson: `Every animal has a **life cycle** — the stages it goes through from birth to adult. Different groups of animals have very different cycles.

- **Frog** (amphibian): egg → tadpole → tadpole with legs → froglet → adult frog
- **Butterfly** (insect): egg → caterpillar (larva) → chrysalis (pupa) → adult butterfly
- **Robin** (bird): egg → hatchling → nestling → fledgling → adult robin
- **Woodlouse** (crustacean): eggs → manca (juvenile) → adult woodlouse

Frogs and butterflies go through **metamorphosis** — a *big* change in body shape. Robins and woodlice don't — they just grow bigger versions of themselves.`,
  vocabulary: [
    { term: 'Life cycle', meaning: 'The stages an organism goes through from birth to adulthood' },
    { term: 'Metamorphosis', meaning: 'A big change in body form during growth' },
    { term: 'Larva', meaning: 'A young form that looks different from the adult' },
    { term: 'Pupa', meaning: 'A resting stage where transformation happens' },
    { term: 'Juvenile', meaning: 'A young animal that looks like a smaller adult' },
  ],
  examples: [
    {
      title: 'Frogspawn jelly in February',
      body: `In late winter, British ponds fill with **frogspawn** — clusters of black dots in clear jelly. The jelly tastes terrible to fish and warms slightly in the sun, like a tadpole greenhouse. From those black dots come tadpoles within two weeks, back legs in eight weeks, front legs by ten. By summer the same pond is full of tiny froglets hopping onto land for the first time.`,
    },
    {
      title: 'Caterpillars eat their own weight daily',
      body: `A young caterpillar can eat several times its own body weight in leaves each day — the entire **larva** stage is basically a moving stomach, stockpiling fuel. Then it stops, attaches to a twig, and goes still for two weeks as a **pupa**. Inside the chrysalis, those leaves get re-used to build wings, eyes and legs from scratch.`,
    },
    {
      title: 'Robins fledge in three weeks',
      body: `A robin egg hatches into a featherless **hatchling**, totally dependent on its parents. Two weeks later it has feathers and opens its eyes. At three weeks it leaves the nest as a **fledgling**. Robins go from helpless to flying in less time than it takes a human baby to learn to roll over. Speed matters: every extra day in the nest is another day for predators to find it.`,
    },
    {
      title: 'Tadpoles eat their own tail',
      body: `As a tadpole grows legs, its tail doesn't drop off — it gets resorbed back into the body for nutrients. So during the change into a froglet, the animal is partly eating itself, using the tail as raw material to build new organs. Nature wastes nothing. The frog barely needs food during the most dramatic part of its **metamorphosis**.`,
    },
  ],
  questions: [
    {
      id: 'plants-05-q1',
      sectionId: 'plants-05-life-cycles',
      type: 'short',
      prompt: 'Which two of the animals we studied undergo metamorphosis?',
      answer: 'Frog and butterfly',
      acceptable: [
        'frog and butterfly',
        'butterfly and frog',
        'the frog and the butterfly',
        'frogs and butterflies',
      ],
      explanation:
        'A **frog** changes from a tadpole (lives in water, has a tail) into an adult (lives on land, has legs). A **butterfly** changes from a caterpillar into a totally different-looking flying insect. Both are big body-shape changes = metamorphosis.',
      difficulty: 2,
      source: 'Term 1 Section 5 Q1',
    },
    {
      id: 'plants-05-q2',
      sectionId: 'plants-05-life-cycles',
      type: 'short',
      prompt: 'How is a robin\'s life cycle different from a butterfly\'s?',
      answer: 'A robin keeps the same body shape and grows bigger; a butterfly changes shape completely (metamorphosis)',
      acceptable: [
        'a robin doesn\'t change shape, a butterfly does',
        'butterfly has metamorphosis robin doesn\'t',
        'robin just gets bigger but butterfly changes body shape',
        'robins keep the same shape, butterflies change completely',
        'butterfly goes through metamorphosis',
      ],
      explanation:
        'A robin hatches looking like a tiny featherless robin and just grows up. A butterfly starts as a caterpillar that has to *completely rebuild itself* inside the chrysalis. Same general idea (egg → adult) but the journey is wildly different.',
      difficulty: 3,
      reasoning: true,
      source: 'Term 1 Section 5 Q2',
    },
    {
      id: 'plants-05-q3',
      sectionId: 'plants-05-life-cycles',
      type: 'short',
      prompt: 'What stage comes after the tadpole in a frog\'s life cycle?',
      answer: 'Tadpole with legs',
      acceptable: [
        'tadpole with legs',
        'tadpole grows legs',
        'a tadpole with legs',
        'froglet',
      ],
      explanation:
        'The tadpole grows back legs first, then front legs — still called a tadpole, but now with legs. After that it becomes a froglet (tiny frog with a tail), then a fully adult frog.',
      difficulty: 2,
      source: 'Term 1 Section 5 Q3',
    },
    {
      id: 'plants-05-q4',
      sectionId: 'plants-05-life-cycles',
      type: 'short',
      prompt: 'Where does a woodlouse mother keep her eggs?',
      answer: 'In a pouch under her body',
      acceptable: [
        'in a pouch under her body',
        'in a brood pouch',
        'under her body in a pouch',
        'on her underside',
        'in a pouch on her belly',
      ],
      explanation:
        'Woodlice are crustaceans (relatives of crabs and lobsters!). The mother carries her eggs in a fluid-filled pouch called a **marsupium** under her belly — like a tiny portable pond — until they hatch.',
      difficulty: 3,
      source: 'Term 1 Section 5 Q4',
    },
    {
      id: 'plants-05-q5',
      sectionId: 'plants-05-life-cycles',
      type: 'mcq',
      prompt: 'In a butterfly\'s life cycle, what is the chrysalis stage also called?',
      choices: ['Larva', 'Egg', 'Pupa', 'Juvenile'],
      answer: 'Pupa',
      explanation:
        '**Pupa** = the resting stage where transformation happens. For a butterfly the pupa is called a chrysalis; for a moth it\'s called a cocoon. Same idea: the insect is rebuilding itself inside.',
      difficulty: 2,
      source: 'Term 1 Section 5 — MCQ variant',
    },
    {
      id: 'plants-05-q6',
      sectionId: 'plants-05-life-cycles',
      type: 'cloze',
      prompt: 'A caterpillar is the ____ stage of a butterfly\'s life cycle.',
      answer: 'larva',
      acceptable: ['larva', 'larval'],
      explanation: 'Larva = the young form that looks completely different from the adult.',
      difficulty: 1,
      source: 'Term 1 Section 5 — cloze variant',
    },
  ],
  deeper: `Inside the chrysalis, **the caterpillar literally dissolves**. Most of its body turns into a kind of soup. Special groups of cells called *imaginal discs* survive — and rebuild the soup into a butterfly with wings, eyes and a tongue. It's one of the strangest things in nature.

Even weirder: **the butterfly remembers being a caterpillar**. Experiments have shown that if you teach a caterpillar to avoid a certain smell, the adult butterfly avoids it too — even though most of its brain was rebuilt. Some memories survive the soup.

**Tadpoles eat their own tails.** As the frog grows legs, it slowly resorbs the tail back into its body for nutrients — the tail doesn't fall off, it gets recycled into food.`,
};
