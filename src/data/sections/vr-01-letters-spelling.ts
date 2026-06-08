import type { Section } from '../types';

export const vr01LettersSpelling: Section = {
  id: 'vr-01-letters-spelling',
  subject: 'verbal',
  pack: 'vr-core',
  number: 1,
  title: 'Letters & Spelling',
  lesson: `These questions play with the **letters inside words** — moving them, hiding them, adding them, or rearranging them. The trick is to test your idea against the *actual letters*, not just guess.

- **Insert a Letter:** find one letter that ends the first word AND starts the second — and works for **both** pairs.
- **Hidden Word:** a short word hides across the join of two words. In "firs**t ear**" the letters spell TEAR.
- **Move a Letter:** take one letter from the first word and add it to the second so that **both** stay real words.
- **Compound Words & Anagrams:** join two words into one, or rearrange *all* the letters of a word to make a new one.

These reward care, not speed — check every letter.`,
  vocabulary: [
    { term: 'Compound word', meaning: 'Two words joined to make a new one (sun + flower = sunflower).' },
    { term: 'Anagram', meaning: 'A word made by rearranging all the letters of another (listen → silent).' },
    { term: 'Hidden word', meaning: 'A short word concealed across the join of two longer words.' },
    { term: 'Vowel', meaning: 'The letters a, e, i, o, u — every word needs at least one.' },
  ],
  questions: [
    {
      id: 'vr-01-q1',
      sectionId: 'vr-01-letters-spelling',
      type: 'mcq',
      prompt: 'Which letter completes both pairs?  boo ( ? ) ind   and   wal ( ? ) een',
      choices: ['k', 't', 'n', 'd'],
      answer: 'k',
      explanation: 'k makes book + kind, and walk + keen. The same letter has to finish the first word and start the second in both pairs.',
      difficulty: 2,
      source: 'GL VR · Insert a Letter',
    },
    {
      id: 'vr-01-q2',
      sectionId: 'vr-01-letters-spelling',
      type: 'mcq',
      prompt: 'Move one letter from PLACE to SOON so that both become real words. Which letter moves?',
      choices: ['P', 'L', 'C', 'A'],
      answer: 'P',
      explanation: 'Take the P: PLACE → LACE, and SOON → SPOON. Both are still real words. (Removing L gives PACE, but SLOON is not a word.)',
      difficulty: 3,
      source: 'GL VR · Move a Letter',
    },
    {
      id: 'vr-01-q3',
      sectionId: 'vr-01-letters-spelling',
      type: 'mcq',
      prompt: 'Find the hidden four-letter word, made by joining the end of one word to the start of the next: "Pass me the first ear of corn."',
      choices: ['TEAR', 'REAR', 'STAR', 'FEAR'],
      answer: 'TEAR',
      explanation: 'firs(T EAR) of corn — the T at the end of "first" joins "ear" to spell TEAR.',
      difficulty: 2,
      source: 'GL VR · Hidden Word',
    },
    {
      id: 'vr-01-q4',
      sectionId: 'vr-01-letters-spelling',
      type: 'mcq',
      prompt: 'Which three letters complete the word?  CL ( ? ) ER',
      choices: ['EAN', 'OWN', 'ECK', 'USH'],
      answer: 'EAN',
      explanation: 'CL + EAN + ER spells CLEANER. The other three letter-groups do not make a real word.',
      difficulty: 2,
      source: 'GL VR · Complete the Word',
    },
    {
      id: 'vr-01-q5',
      sectionId: 'vr-01-letters-spelling',
      type: 'mcq',
      prompt: 'Which word joins with SUN to make a compound word?',
      choices: ['flower', 'happy', 'run', 'blue'],
      answer: 'flower',
      explanation: 'SUN + flower = sunflower. The others do not make a real compound word.',
      difficulty: 1,
      source: 'GL VR · Compound Words',
    },
    {
      id: 'vr-01-q6',
      sectionId: 'vr-01-letters-spelling',
      type: 'mcq',
      prompt: 'Which word is an anagram of LISTEN (uses exactly the same letters)?',
      choices: ['SILENT', 'TONSIL', 'LENTIL', 'LINNET'],
      answer: 'SILENT',
      explanation: 'SILENT uses the same six letters as LISTEN. TONSIL has an O, LENTIL has no S, and LINNET has two Ns — so none of those work.',
      difficulty: 3,
      source: 'GL VR · Anagrams',
    },
  ],
};
