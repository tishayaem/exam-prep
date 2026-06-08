import type { Section } from '../types';

export const vr03WordLogic: Section = {
  id: 'vr-03-word-logic',
  subject: 'verbal',
  pack: 'vr-core',
  number: 3,
  title: 'Word Logic',
  lesson: `These questions test how words and ideas **relate**.

- **Analogies** say "A is to B as C is to ___". Work out the link between the first pair, then apply the *same* link to the second: *big* is to *small* as *tall* is to **short** (opposites).
- **Related words** use other links — animal to home, young to grown-up, object to what it does.
- **Reading & logic** gives you a few clues and asks you to work something out: if Tom is taller than Sam, and Sam is taller than Ben, then Ben is the shortest.

For analogies, name the link in words first ("the opposite of…", "the home of…"). Then the answer is the option that fits that exact link.`,
  vocabulary: [
    { term: 'Analogy', meaning: 'A pair of words linked the same way as another pair: A is to B as C is to ?' },
    { term: 'Relationship', meaning: 'The link between two words (opposite, home, baby, part of…).' },
    { term: 'Deduce', meaning: 'Work something out for certain from the clues you are given.' },
    { term: 'Sequence', meaning: 'An order things follow, like ages from youngest to oldest.' },
  ],
  questions: [
    {
      id: 'vr-03-q1',
      sectionId: 'vr-03-word-logic',
      type: 'mcq',
      prompt: 'BIG is to SMALL as TALL is to … ?',
      choices: ['short', 'high', 'wide', 'large'],
      answer: 'short',
      explanation: 'Big and small are opposites, so tall pairs with its opposite, short. ("High" and "large" are similar words, not opposites.)',
      difficulty: 1,
      source: 'GL VR · Analogies',
    },
    {
      id: 'vr-03-q2',
      sectionId: 'vr-03-word-logic',
      type: 'mcq',
      prompt: 'BIRD is to NEST as BEE is to … ?',
      choices: ['hive', 'honey', 'flower', 'sting'],
      answer: 'hive',
      explanation: 'A nest is a bird’s home, so the answer is the bee’s home: a hive. (Honey is what a bee makes, not where it lives.)',
      difficulty: 2,
      source: 'GL VR · Related Words',
    },
    {
      id: 'vr-03-q3',
      sectionId: 'vr-03-word-logic',
      type: 'mcq',
      prompt: 'PUPPY is to DOG as KITTEN is to … ?',
      choices: ['cat', 'mouse', 'pet', 'paw'],
      answer: 'cat',
      explanation: 'A puppy is a baby dog, so a kitten is a baby cat. The link is "baby → grown-up".',
      difficulty: 1,
      source: 'GL VR · Analogies',
    },
    {
      id: 'vr-03-q4',
      sectionId: 'vr-03-word-logic',
      type: 'mcq',
      prompt: 'Tom is taller than Sam. Sam is taller than Ben. Who is the shortest?',
      choices: ['Ben', 'Sam', 'Tom', 'Cannot tell'],
      answer: 'Ben',
      explanation: 'Order them tallest to shortest: Tom, then Sam, then Ben. So Ben is the shortest.',
      difficulty: 2,
      source: 'GL VR · Reading Information',
    },
    {
      id: 'vr-03-q5',
      sectionId: 'vr-03-word-logic',
      type: 'mcq',
      prompt: 'Anna is older than Beth. Carl is younger than Beth. Who is the youngest?',
      choices: ['Carl', 'Beth', 'Anna', 'Cannot tell'],
      answer: 'Carl',
      explanation: 'Anna is older than Beth, and Carl is younger than Beth, so the order is Anna, Beth, Carl. Carl is the youngest.',
      difficulty: 2,
      source: 'GL VR · Reading Information',
    },
    {
      id: 'vr-03-q6',
      sectionId: 'vr-03-word-logic',
      type: 'mcq',
      prompt: 'HOT is to COLD as DAY is to … ?',
      choices: ['night', 'sun', 'morning', 'light'],
      answer: 'night',
      explanation: 'Hot and cold are opposites, so day pairs with its opposite, night.',
      difficulty: 1,
      source: 'GL VR · Analogies',
    },
  ],
};
