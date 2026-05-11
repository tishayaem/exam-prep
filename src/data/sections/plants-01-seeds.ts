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
  deeper: `Seeds are one of nature's wildest engineering tricks. They're tiny survival pods — each one carries a baby plant and a packed lunch of nutrients to feed it until its first leaves can make food from sunlight.

**Seeds come in *crazy* different sizes.** The smallest seed in the world belongs to an orchid — it's so small that a million of them weigh less than a paperclip. The biggest seed in the world is the **coco-de-mer**, a giant coconut that can weigh **25 kg** — more than most 5-year-olds!

**Why do some fruits taste bad when they're unripe?** Because the seeds aren't ready yet. The plant doesn't want animals eating the seeds before they can grow. Once the seeds are ready, the fruit turns sweet and colourful to *invite* animals to eat it — so the seeds get carried somewhere new.

**Did you know?** A coconut can float across an entire ocean and still sprout into a tree when it washes ashore. That's how coconut palms ended up on tropical islands all over the world — they basically went on holiday and never came back.`,
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
      variantOf: 'plants-01-q2-original',
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
