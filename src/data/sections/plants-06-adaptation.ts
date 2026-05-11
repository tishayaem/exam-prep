import type { Section } from '../types';

export const plants06Adaptation: Section = {
  id: 'plants-06-adaptation',
  subject: 'science',
  pack: 'plants',
  number: 6,
  title: 'Adaptation and Habitats',
  lesson: `A **habitat** is the natural home of a plant or animal. It provides everything they need: food, water, shelter, space, the right temperature, the right amount of light.

An **adaptation** is a feature that helps an organism survive in its habitat. Adaptations come in two types:

- **Physical** — body parts: thick fur, sharp claws, long roots, waxy leaves
- **Behavioural** — things they do: migration, hunting at night, turning towards the sun

A **predator** hunts other animals. **Prey** is what gets hunted. Both predator and prey have adaptations that help them — claws and speed for predators, camouflage and warning colours for prey.`,
  vocabulary: [
    { term: 'Habitat', meaning: 'The natural home of a plant or animal' },
    { term: 'Environment', meaning: 'The conditions in a habitat' },
    { term: 'Adaptation', meaning: 'A feature that helps an organism survive' },
    { term: 'Predator', meaning: 'An animal that hunts others' },
    { term: 'Prey', meaning: 'An animal that is hunted' },
  ],
  questions: [
    {
      id: 'plants-06-q1',
      sectionId: 'plants-06-adaptation',
      type: 'short',
      prompt: 'What is a habitat?',
      answer: 'The natural home of a plant or animal',
      acceptable: [
        'the home of a plant or animal',
        'where an animal or plant lives',
        'a natural home',
        'where a plant or animal lives',
        'the place an organism lives',
      ],
      explanation:
        'Habitat = where an organism lives. It provides everything it needs to survive.',
      difficulty: 1,
      source: 'Term 1 Section 6 Q1',
    },
    {
      id: 'plants-06-q2',
      sectionId: 'plants-06-adaptation',
      type: 'short',
      prompt: 'Name one thing a habitat must provide.',
      answer: 'Food',
      acceptable: [
        'food',
        'water',
        'shelter',
        'space',
        'the right temperature',
        'temperature',
        'light',
        'the right amount of light',
      ],
      explanation:
        'A habitat must provide: food, water, shelter, space, the right temperature, and the right amount of light. Any of these counts as a correct answer.',
      difficulty: 1,
      source: 'Term 1 Section 6 Q2',
    },
    {
      id: 'plants-06-q3',
      sectionId: 'plants-06-adaptation',
      type: 'short',
      prompt: 'What is an adaptation?',
      answer: 'A feature that helps an organism survive',
      acceptable: [
        'a feature that helps an organism survive',
        'something that helps an animal or plant survive',
        'a feature that helps a plant or animal live in its habitat',
        'a body part or behaviour that helps it survive',
      ],
      explanation:
        'An adaptation is anything — a body part or a behaviour — that helps an animal or plant survive better in its habitat.',
      difficulty: 1,
      source: 'Term 1 Section 6 Q3',
    },
    {
      id: 'plants-06-q4',
      sectionId: 'plants-06-adaptation',
      type: 'short',
      prompt: 'Give one example of a plant or animal adaptation.',
      answer: 'Thick fur (to keep warm)',
      acceptable: [
        'thick fur',
        'sharp claws',
        'long roots',
        'waxy leaves',
        'camouflage',
        'migration',
        'hunting at night',
        'nocturnal',
        'turning towards the sun',
        'sharp teeth',
        'webbed feet',
        'fast running',
      ],
      explanation:
        'Anything counts: thick fur (keeps warm), sharp claws (catching prey), long roots (reaching water), waxy leaves (stopping water loss), camouflage (hiding), migration (escaping cold)…',
      difficulty: 1,
      source: 'Term 1 Section 6 Q4',
    },
    {
      id: 'plants-06-q5',
      sectionId: 'plants-06-adaptation',
      type: 'mcq',
      prompt: 'A polar bear has thick white fur. This is which kind of adaptation?',
      choices: ['Physical', 'Behavioural', 'Both', 'Neither'],
      answer: 'Physical',
      explanation:
        'Fur is a **body part**, so it\'s a physical adaptation. (It helps with two things at once: warmth + camouflage in the snow.)',
      difficulty: 2,
      source: 'Term 1 Section 6 — MCQ variant',
    },
    {
      id: 'plants-06-q6',
      sectionId: 'plants-06-adaptation',
      type: 'mcq',
      prompt: 'Birds flying south for winter is which kind of adaptation?',
      choices: ['Physical', 'Behavioural', 'Both', 'Neither'],
      answer: 'Behavioural',
      explanation:
        'Migration is **something they do**, not a body part. So it\'s a behavioural adaptation.',
      difficulty: 2,
      source: 'Term 1 Section 6 — MCQ variant',
    },
  ],
  deeper: `The **arctic fox** is a master of seasonal adaptation. In summer its fur is **brown** to blend with the rocks and grass; in winter it turns **pure white** to match the snow. Same fox, two camouflages — and it switches twice a year automatically.

**Cactus spines are leaves.** Yes, really. Over millions of years, the cactus shrank its leaves down to spines so they wouldn't lose water in the desert. The fat green "trunk" is doing the photosynthesis. It's the body part you'd expect to be leaves… and the leaves are now defence weapons.

The **giraffe's neck** isn't just for reaching tall trees — male giraffes use them to *fight*, swinging their heads like clubs. So the long neck is both a feeding adaptation *and* a fighting adaptation. Evolution gets two for one.`,
};
