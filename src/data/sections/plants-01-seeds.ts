import type { Section } from '../types';

export const plants01Seeds: Section = {
  id: 'plants-01-seeds',
  subject: 'science',
  pack: 'plants',
  number: 1,
  title: 'Investigating Seeds in Fruit',
  lesson: `We explored different fruits to find out what seeds look like and how they're arranged inside.

**Big idea:** A **fruit** is the part of a plant that contains its **seeds**. Some fruits have lots of tiny seeds (like a tomato or kiwi), and some have just one big seed — called a **stone** — like a peach or a plum.

The **flesh** is the soft, juicy part around the seed. It's there to tempt animals to eat the fruit and carry the seeds somewhere new.`,
  vocabulary: [
    { term: 'Fruit', meaning: 'The part of a plant that contains seeds' },
    { term: 'Seed', meaning: 'The part that grows into a new plant' },
    { term: 'Flesh', meaning: 'The soft part of the fruit' },
    { term: 'Stone', meaning: 'A single large seed (e.g. peach)' },
  ],
  examples: [
    {
      title: 'Strawberries wear seeds outside',
      body: `A strawberry isn't really a single **fruit** — it's a swollen flower base with the actual **seeds** (those tiny yellow dots) studded all over its skin. Most fruits hide their seeds inside; strawberries put them on display. Count the dots on one half: usually around 200 tiny fruits, each holding one seed. Botanists sometimes argue strawberries aren't *technically* fruits at all.`,
    },
    {
      title: "The world's biggest seed",
      body: `The **coco-de-mer**, a palm tree found only on two islands in the Seychelles, makes the heaviest seed on Earth — a giant double coconut weighing up to **25 kg**. One seed can weigh more than a Year 5 child and takes seven years to ripen. So few of these trees survive in the wild that each seed is registered like a passport before anyone is allowed to keep one.`,
    },
    {
      title: 'Why shop bananas have no seeds',
      body: `Wild bananas are nearly all seed — hard black pellets that crunch like gravel between your teeth. The yellow bananas in supermarkets are a special variety bred over thousands of years to grow *without* seeds, reproduced by planting cuttings instead. The downside: every Cavendish banana is basically a clone, which is why a single banana disease could threaten the whole world's supply.`,
    },
    {
      title: 'Try this: count fruit by seeds',
      body: `Cut a tomato, a kiwi and a peach in half on a chopping board. Tomato: dozens of tiny seeds in jelly. Kiwi: hundreds of black flecks. Peach: one big **stone**. Each fruit has chosen a different strategy — flood the area with seeds, or pour everything into one big strong one. Both work, just differently. Plants think in trade-offs.`,
    },
  ],
  deeper: `Seeds are one of nature's wildest engineering tricks. They're tiny survival pods — each one carries a baby plant and a packed lunch of nutrients to feed it until its first leaves can make food from sunlight.

**The smallest seed is an orchid's** — so tiny that a million of them weigh less than a paperclip. They contain almost no food, so they can only sprout if they happen to land next to a particular fungus that feeds them. Their plan is "make millions and hope".

**Some seeds wait thousands of years.** In Israel, scientists successfully germinated a date-palm seed found in an ancient fortress that was **2,000 years old**. Other seeds need fire to wake them up — eucalyptus and certain pines stay sealed shut on the branch until a wildfire passes through, then drop into the cleared, ash-fertilised ground.

**Why do some fruits taste bad when they're unripe?** Because the seeds aren't ready yet. The plant doesn't want animals eating the seeds before they can grow. Once the seeds are ready, the fruit turns sweet and colourful to *invite* animals to eat it — so the seeds get carried somewhere new.`,
  questions: [
    {
      id: 'plants-01-q1',
      sectionId: 'plants-01-seeds',
      type: 'short',
      prompt: 'Why do fruits contain seeds?',
      answer: 'So the plant can make new plants',
      acceptable: [
        'to make new plants',
        'to grow new plants',
        'so the plant can reproduce',
        'to reproduce',
        'so they can grow into new plants',
        'so new plants can grow',
      ],
      explanation:
        'Seeds are how a plant makes more of itself. The fruit wraps around the seeds and helps spread them — usually by being eaten by an animal that drops the seeds somewhere new.',
      difficulty: 1,
      source: 'Term 1 Section 1 Q1',
    },
    {
      id: 'plants-01-q2',
      sectionId: 'plants-01-seeds',
      type: 'mcq',
      prompt: 'Of these four fruits, which usually has the most seeds inside?',
      choices: ['Peach', 'Cherry', 'Tomato', 'Mango'],
      answer: 'Tomato',
      explanation:
        'A tomato has dozens of small seeds packed in jelly. Peaches, cherries and mangoes each have one big seed (a stone) in the middle.',
      difficulty: 1,
      source: 'Term 1 Section 1 Q2 (closed-form variant)',
    },
    {
      id: 'plants-01-q3',
      sectionId: 'plants-01-seeds',
      type: 'short',
      prompt: 'Name a fruit that has only one seed.',
      answer: 'Peach',
      acceptable: [
        'peach',
        'plum',
        'cherry',
        'mango',
        'avocado',
        'apricot',
        'nectarine',
        'olive',
        'date',
      ],
      explanation:
        'Fruits with one big seed (a stone) include peaches, plums, cherries, mangoes, avocados and apricots. They\'re sometimes called "stone fruits".',
      difficulty: 1,
      source: 'Term 1 Section 1 Q3',
    },
    {
      id: 'plants-01-q4',
      sectionId: 'plants-01-seeds',
      type: 'cloze',
      prompt: 'The soft, juicy part of a fruit that surrounds the seeds is called the ____.',
      answer: 'flesh',
      acceptable: ['flesh', 'the flesh'],
      explanation:
        'The flesh is the soft part. It usually tastes nice so that animals eat it — and end up moving the seeds to new places.',
      difficulty: 1,
      source: 'Term 1 Section 1 — cloze variant',
    },
    {
      id: 'plants-01-q5',
      sectionId: 'plants-01-seeds',
      type: 'mcq',
      prompt: 'Which of these is a "stone" inside a fruit?',
      choices: [
        'The hard skin on the outside',
        'A single large seed in the middle',
        'A small bone that animals leave behind',
        'A piece of dirt that fell on the fruit',
      ],
      answer: 'A single large seed in the middle',
      explanation:
        'In fruits like peaches and plums, "stone" is just another word for the one big seed in the middle. Nothing to do with actual stones!',
      difficulty: 2,
      source: 'Term 1 Section 1 — MCQ variant',
    },
    {
      id: 'plants-01-q6',
      sectionId: 'plants-01-seeds',
      type: 'short',
      prompt:
        'Why might it help a plant to have tasty, sweet fruit around its seeds?',
      answer: 'So animals eat the fruit and carry the seeds away',
      acceptable: [
        'so animals eat it',
        'animals eat it and carry the seeds',
        'so animals will eat the fruit and spread the seeds',
        'to spread the seeds',
        'so the seeds get spread to new places',
        'for animal dispersal',
      ],
      explanation:
        'Tasty fruit gets eaten by animals. The seeds either pass through and come out somewhere new, or get dropped. Either way, the seeds get spread further than they could on their own. This is called animal dispersal.',
      difficulty: 2,
      reasoning: true,
      source: 'Term 1 Section 1 — reasoning variant',
    },
  ],
};
