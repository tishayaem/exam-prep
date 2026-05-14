import type { Section } from '../types';
import { PlantsFlowerDissectionDiagram } from '../../diagrams/plants-03-flower-dissection';

export const plants03FlowerDissection: Section = {
  id: 'plants-03-flower-dissection',
  subject: 'science',
  pack: 'plants',
  number: 3,
  title: 'Flower Dissection',
  diagram: PlantsFlowerDissectionDiagram,
  lesson: `A flower is a plant's reproductive organ — and every part has a job.

The **stamen** is the male part. It has an **anther** that makes **pollen**, held up on a thin stalk called the **filament**.

The **carpel** is the female part. It has a sticky **stigma** at the top that catches pollen, a **style** (a tube) leading down to the **ovary**, which contains **ovules** — the bits that become seeds once pollen reaches them.

Around the outside: **petals** to attract insects, and **sepals** which protected the bud before it opened.`,
  vocabulary: [
    { term: 'Petal', meaning: 'Attracts insects' },
    { term: 'Sepal', meaning: 'Protects the bud' },
    { term: 'Stamen', meaning: 'Male part of the flower' },
    { term: 'Anther', meaning: 'Makes pollen' },
    { term: 'Carpel', meaning: 'Female part of the flower' },
    { term: 'Stigma', meaning: 'Sticky surface that catches pollen' },
    { term: 'Style', meaning: 'Tube leading to the ovary' },
    { term: 'Ovary', meaning: 'Contains ovules' },
    { term: 'Ovule', meaning: 'Becomes a seed after fertilisation' },
  ],
  examples: [
    {
      title: 'Lily pollen stains everything',
      body: `Florists usually snip the **anthers** out of cut lilies because their pollen leaves bright orange stains on clothes, tablecloths and even the lily's own petals. That's how much pollen one **stamen** can carry. If you ever see a lily in a shop with its anthers cut off, it's not damaged — it's just been protected from itself.`,
    },
    {
      title: 'Snapdragons need bee weight',
      body: `A snapdragon's mouth-shaped flower stays clamped shut unless a heavy enough bee lands on its lip. Smaller insects can't open it. This is the flower being picky: it only opens for bees big enough to actually carry pollen between flowers. Press the sides of a snapdragon yourself and you can pop it open — that's the trick the right bee performs.`,
    },
    {
      title: 'Try this: dissect a lily',
      body: `A supermarket lily is the easiest flower to take apart. Peel off the **petals**, then the green **sepals** underneath. The thin filaments standing up are the **stamens** — touch an **anther** for a fingerful of pollen. In the middle is one tall stalk, the **carpel**, with the sticky **stigma** on top. Inside the swollen base lives the **ovary** and the future seeds.`,
    },
    {
      title: 'Carpel sounds like carry',
      body: `A useful trick for remembering flower parts: **carpel** ends in the same letter as **female** (and "carry" — it carries the ovules). **Stamen** ends with the same letter as **male**. The flower's anatomy follows the same letter pattern. Year 5 papers love testing whether you can name the male part vs the female part.`,
    },
  ],
  questions: [
    {
      id: 'plants-03-q1',
      sectionId: 'plants-03-flower-dissection',
      type: 'short',
      prompt: 'Which part of the flower makes pollen?',
      answer: 'Anther',
      acceptable: ['anther', 'the anther', 'stamen', 'the stamen'],
      explanation:
        'The **anther** makes pollen. It sits on top of the **stamen** (the whole male part). If your son writes "stamen", that\'s the whole structure — anther is more precise but stamen is also acceptable.',
      difficulty: 1,
      source: 'Term 1 Section 3 Q1',
    },
    {
      id: 'plants-03-q2',
      sectionId: 'plants-03-flower-dissection',
      type: 'short',
      prompt: 'What is the job of the stigma?',
      answer: 'To catch pollen',
      acceptable: [
        'catches pollen',
        'it catches pollen',
        'to receive pollen',
        'sticky surface that catches pollen',
        'to collect pollen',
      ],
      explanation:
        'The stigma is the sticky landing pad at the top of the carpel. When a bee brushes past, pollen grains stick to it — the start of fertilisation.',
      difficulty: 1,
      source: 'Term 1 Section 3 Q2',
    },
    {
      id: 'plants-03-q3',
      sectionId: 'plants-03-flower-dissection',
      type: 'short',
      prompt: 'Where are the ovules found?',
      answer: 'In the ovary',
      acceptable: [
        'ovary',
        'in the ovary',
        'inside the ovary',
        'at the bottom of the carpel',
      ],
      explanation:
        'Ovules live inside the **ovary**, at the bottom of the carpel. When pollen travels down the style and joins with an ovule → fertilisation → seed.',
      difficulty: 1,
      source: 'Term 1 Section 3 Q3',
    },
    {
      id: 'plants-03-q4',
      sectionId: 'plants-03-flower-dissection',
      type: 'mcq',
      prompt: 'Which part of the flower protects the bud before it opens?',
      choices: ['Petal', 'Sepal', 'Stamen', 'Stigma'],
      answer: 'Sepal',
      explanation:
        'Sepals are the small green leaf-like parts at the base of a flower. Before the flower opens, they wrap around the bud and protect it.',
      difficulty: 1,
      source: 'Term 1 Section 3 Q4 (closed-form variant)',
    },
    {
      id: 'plants-03-q5',
      sectionId: 'plants-03-flower-dissection',
      type: 'mcq',
      prompt: 'Which is the female part of a flower?',
      choices: ['Stamen', 'Carpel', 'Petal', 'Sepal'],
      answer: 'Carpel',
      explanation:
        '**Carpel** = female (contains the ovules). **Stamen** = male (makes pollen). Tip: "stamen" sounds like "stand-men" — the bits standing up making pollen.',
      difficulty: 2,
      source: 'Term 1 Section 3 — MCQ variant',
    },
    {
      id: 'plants-03-q6',
      sectionId: 'plants-03-flower-dissection',
      type: 'cloze',
      prompt: 'Pollen travels from the stigma down the ____ to reach the ovary.',
      answer: 'style',
      acceptable: ['style', 'the style'],
      explanation:
        'The **style** is the tube connecting the stigma (top) to the ovary (bottom). Pollen tubes grow down it to fertilise the ovules.',
      difficulty: 2,
      source: 'Term 1 Section 3 — cloze variant',
    },
    {
      id: 'plants-03-q7',
      sectionId: 'plants-03-flower-dissection',
      type: 'match',
      prompt: 'Match each flower part to its job.',
      pairs: [
        { left: 'Anther', right: 'Makes pollen' },
        { left: 'Stigma', right: 'Catches pollen' },
        { left: 'Petal', right: 'Attracts insects' },
        { left: 'Sepal', right: 'Protects the bud' },
      ],
      answer: '',
      explanation:
        'Each flower part has one specific job. The **anther** (sitting on the stamen) makes pollen; the **stigma** at the top of the carpel is sticky and catches it; **petals** draw insects in with colour and scent; **sepals** were the green wrapping that protected the bud before it opened.',
      difficulty: 2,
      source: 'Term 1 Section 3 — match variant',
    },
  ],
  deeper: `Some flowers cheat. The **bee orchid** has petals shaped — and coloured — to look *exactly* like a female bee, and it even gives off the same scent. Male bees try to mate with it, fail, get covered in pollen, and fly off frustrated to try the next "female". The orchid never had to make any nectar at all. Sneaky.

**Rafflesia**, found in the Indonesian jungle, is the biggest single flower in the world — almost a metre across. It has no leaves, no stem, no roots. It lives as a parasite *inside* another plant and only shows itself to flower. And it smells like a dead body.

Flowers and bees evolved together so closely that some flowers only open when a specific bee weighs the right amount on a specific petal. If anything else tries, the flower stays shut.`,
};
