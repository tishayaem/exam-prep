import type { Section } from '../types';

export const vr02WordMeanings: Section = {
  id: 'vr-02-word-meanings',
  subject: 'verbal',
  pack: 'vr-core',
  number: 2,
  title: 'Word Meanings',
  lesson: `This family is all about **what words mean** — and the wider your vocabulary, the easier it is.

- **Synonyms** are words with the **same** (or nearly the same) meaning: *brave* and *courageous*.
- **Antonyms** are **opposites**: *ancient* and *modern*.
- **Odd one out** asks which word doesn't belong to a group — spot what the others share (all vegetables, all opposites of "big", and so on).

Watch out for traps: a question asking for the *opposite* will often list a *synonym* as a tempting wrong answer. Read whether it wants "same" or "opposite" first.`,
  vocabulary: [
    { term: 'Synonym', meaning: 'A word that means the same, or nearly the same, as another.' },
    { term: 'Antonym', meaning: 'A word that means the opposite of another.' },
    { term: 'Definition', meaning: 'What a word means.' },
    { term: 'Category', meaning: 'A group that words belong to (e.g. vegetables, colours).' },
  ],
  questions: [
    {
      id: 'vr-02-q1',
      sectionId: 'vr-02-word-meanings',
      type: 'mcq',
      prompt: 'Which word means the SAME as BRAVE?',
      choices: ['courageous', 'scared', 'weak', 'calm'],
      answer: 'courageous',
      explanation: 'Courageous means brave. "Scared" is the opposite, and the others are unrelated.',
      difficulty: 1,
      source: 'GL VR · Synonyms',
    },
    {
      id: 'vr-02-q2',
      sectionId: 'vr-02-word-meanings',
      type: 'mcq',
      prompt: 'Which word is the OPPOSITE of ANCIENT?',
      choices: ['modern', 'old', 'historic', 'ruined'],
      answer: 'modern',
      explanation: 'Modern (new) is the opposite of ancient. "Old" and "historic" mean nearly the same as ancient — classic traps.',
      difficulty: 2,
      source: 'GL VR · Antonyms',
    },
    {
      id: 'vr-02-q3',
      sectionId: 'vr-02-word-meanings',
      type: 'mcq',
      prompt: 'Which pair of words means the same as each other?',
      choices: ['huge & enormous', 'huge & tiny', 'fast & slow', 'happy & angry'],
      answer: 'huge & enormous',
      explanation: 'Huge and enormous are synonyms (both mean very big). The other pairs are opposites.',
      difficulty: 2,
      source: 'GL VR · Closest Meaning',
    },
    {
      id: 'vr-02-q4',
      sectionId: 'vr-02-word-meanings',
      type: 'mcq',
      prompt: 'Which word is the ODD ONE OUT?',
      choices: ['rose', 'cabbage', 'carrot', 'lettuce'],
      answer: 'rose',
      explanation: 'Cabbage, carrot and lettuce are all vegetables. A rose is a flower, so it does not belong.',
      difficulty: 1,
      source: 'GL VR · Odd One Out',
    },
    {
      id: 'vr-02-q5',
      sectionId: 'vr-02-word-meanings',
      type: 'mcq',
      prompt: 'Which word means nearly the same as RAPID?',
      choices: ['quick', 'slow', 'loud', 'heavy'],
      answer: 'quick',
      explanation: 'Rapid means fast, so quick is the synonym. "Slow" is the opposite.',
      difficulty: 1,
      source: 'GL VR · Synonyms',
    },
    {
      id: 'vr-02-q6',
      sectionId: 'vr-02-word-meanings',
      type: 'mcq',
      prompt: 'Which word is the OPPOSITE of GENEROUS?',
      choices: ['mean', 'kind', 'giving', 'rich'],
      answer: 'mean',
      explanation: 'Mean (unwilling to share) is the opposite of generous. "Kind" and "giving" are synonyms of generous — traps.',
      difficulty: 2,
      source: 'GL VR · Antonyms',
    },
  ],
};
