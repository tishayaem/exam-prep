import type { Section } from '../types';

export const plants02Pollination: Section = {
  id: 'plants-02-pollination',
  subject: 'science',
  pack: 'plants',
  number: 2,
  title: 'Pollination and Plant Reproduction',
  lesson: `Flowering plants make new plants through **pollination, fertilisation, and seed formation**.

**Pollination** is when pollen moves from one flower to another. Pollen sticks to a visiting bee while it drinks **nectar**, then rubs off on the next flower the bee visits. Wind, water, birds and bats can also move pollen.

After pollination, **fertilisation** happens inside the flower — pollen joins with an **ovule** to make a seed. The flower then turns into a **fruit** with seeds inside.`,
  vocabulary: [
    { term: 'Pollination', meaning: 'Pollen moving from one flower to another' },
    { term: 'Pollen', meaning: 'Powder made by the anther' },
    { term: 'Nectar', meaning: 'Sweet liquid that attracts insects' },
    { term: 'Fertilisation', meaning: 'When pollen joins with an ovule to make a seed' },
  ],
  examples: [
    {
      title: 'Bees see in invisible colour',
      body: `Bees can see **ultraviolet light** that humans can't. To a bee, many flowers have glowing "landing strips" painted on them in UV — bright arrows pointing straight at the **nectar**. The flower has effectively put up an advert that only its **pollinators** can read. Photograph a dandelion under a UV filter and you'll see the secret pattern.`,
    },
    {
      title: 'Hummingbirds drink while hovering',
      body: `Not all pollinators are insects. In the Americas, **hummingbirds** hover in front of red, tubular flowers and lap up nectar with tongues that flick up to 20 times a second. The flower's shape only fits a long thin beak — keeping the nectar safe from short-tongued thieves. The bird gets fed; the flower gets pollinated. Trade complete.`,
    },
    {
      title: 'Hay fever is wind pollination',
      body: `Some plants don't bother with insects at all. Grasses, oak, birch and pine dump huge amounts of light, dry **pollen** into the wind and hope some of it lands on the right flower. Most lands in the wrong place — including up human noses. That itchy sneezing every June is your immune system overreacting to plant baby-making.`,
    },
    {
      title: 'Try this: watch a bee at work',
      body: `Find a lavender bush or a patch of clover on a sunny day. Watch one bee for a full minute. Count how many flowers it visits. You'll see it brush against the anthers, get dusted with yellow, then carry that dust to the next flower. Each visit is one tiny act of **pollination** — done by accident, while the bee is just out for a meal.`,
    },
  ],
  questions: [
    {
      id: 'plants-02-q1',
      sectionId: 'plants-02-pollination',
      type: 'short',
      prompt: 'What is pollination?',
      answer: 'When pollen moves from one flower to another',
      acceptable: [
        'pollen moves from one flower to another',
        'when pollen is moved between flowers',
        'movement of pollen from flower to flower',
        'pollen moving between flowers',
      ],
      explanation:
        'Pollination is the moving of pollen between flowers. It\'s the first step in making seeds.',
      difficulty: 1,
      source: 'Term 1 Section 2 Q1',
    },
    {
      id: 'plants-02-q2',
      sectionId: 'plants-02-pollination',
      type: 'short',
      prompt: 'How do bees help pollination?',
      answer: 'They carry pollen from flower to flower on their bodies',
      acceptable: [
        'pollen sticks to them and they move it',
        'they move pollen between flowers',
        'pollen sticks to bees and rubs off on the next flower',
        'they carry pollen on their bodies',
      ],
      explanation:
        'Bees visit flowers to drink nectar. While they\'re there, pollen sticks to their fuzzy bodies. At the next flower, some of that pollen rubs off — and pollination has happened.',
      difficulty: 1,
      source: 'Term 1 Section 2 Q2',
    },
    {
      id: 'plants-02-q3',
      sectionId: 'plants-02-pollination',
      type: 'short',
      prompt: 'What happens after pollination?',
      answer: 'Fertilisation, then a seed grows, then a fruit forms',
      acceptable: [
        'fertilisation',
        'fertilisation happens',
        'a seed grows',
        'the flower turns into a fruit',
        'fertilisation then a seed forms',
        'fertilisation and the seed starts to grow',
      ],
      explanation:
        'After pollination: pollen joins with an ovule (fertilisation) → a seed starts growing → the flower turns into a fruit with seeds inside.',
      difficulty: 2,
      source: 'Term 1 Section 2 Q3',
    },
    {
      id: 'plants-02-q4',
      sectionId: 'plants-02-pollination',
      type: 'short',
      prompt: 'Why do plants need to make seeds?',
      answer: 'To grow new plants',
      acceptable: [
        'to make new plants',
        'to reproduce',
        'so new plants can grow',
        'to grow more of themselves',
      ],
      explanation:
        'Seeds are how plants reproduce — make more of themselves. Without seeds, the species would die out.',
      difficulty: 1,
      source: 'Term 1 Section 2 Q4',
    },
    {
      id: 'plants-02-q5',
      sectionId: 'plants-02-pollination',
      type: 'mcq',
      prompt: 'What do bees come to the flower for?',
      choices: ['Pollen', 'Nectar', 'Petals', 'Seeds'],
      answer: 'Nectar',
      explanation:
        'Bees want **nectar** — sweet liquid they turn into honey. Pollen sticking to them is a side-effect, but it\'s the whole reason the flower bothers making nectar in the first place. Clever trade!',
      difficulty: 2,
      source: 'Term 1 Section 2 — MCQ variant',
    },
    {
      id: 'plants-02-q6',
      sectionId: 'plants-02-pollination',
      type: 'short',
      prompt: 'Why are most flowers brightly coloured and sweet-smelling?',
      answer: 'To attract insects',
      acceptable: [
        'to attract bees',
        'to attract insects to pollinate them',
        'to attract pollinators',
        'so insects come and pollinate them',
        'to bring insects in',
      ],
      explanation:
        'Bright colours and strong scents are adverts — they tell insects "free food over here!". When the insect arrives for nectar, it picks up pollen and carries it on.',
      difficulty: 2,
      reasoning: true,
      source: 'Term 1 Section 2 — reasoning variant',
    },
    {
      id: 'plants-02-q7',
      sectionId: 'plants-02-pollination',
      type: 'cloze',
      prompt: '____ is the sweet liquid in flowers that attracts insects.',
      answer: 'Nectar',
      acceptable: ['nectar'],
      explanation: 'Nectar is the sugar-water reward. Bees turn it into honey.',
      difficulty: 1,
      source: 'Term 1 Section 2 — cloze variant',
    },
  ],
  deeper: `Bees see colours we can't. To them, lots of flowers have glowing "landing strip" patterns in **ultraviolet light** — invisible to us, but bright as a runway for them. The flower has basically painted "EAT HERE" in a colour we can't see.

Not all flowers play nice. The **corpse flower** smells like rotting meat to attract flies for pollination — and it can grow taller than a person. Imagine that walking into your living room!

**Fig wasps** are tinier than a grain of rice. Each species of fig has its own species of wasp — and they can't survive without each other. The wasp crawls inside a fig to lay eggs, pollinating it along the way. Yes, every fig you eat probably had a tiny wasp inside (don't worry — it gets dissolved by the fig's enzymes).

Plants and pollinators evolved together over **100 million years** — long before humans existed.`,
};
