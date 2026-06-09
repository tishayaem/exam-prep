import type { Section } from '../types';

export const englishWriting01Composition: Section = {
  id: 'english-writing-01-composition',
  subject: 'english',
  pack: 'english-writing',
  number: 1,
  title: 'Composition',
  lesson: `The ISEB writing task gives you a choice of titles and about half an hour. The marks are for **ideas, structure and accuracy** — not length. A brilliant single page beats four rambling ones.

The five-minute plan (always!):
1. **Story mountain:** opening → build-up → problem → resolution → ending. One line for each.
2. **Opening that hooks:** drop the reader into action, a sound, or a question — never "One day I woke up and got dressed."
3. **Show, don't tell:** not "Sam was scared" but "Sam's hands would not stay still."
4. **Vary your sentences:** a short one hits hard after a long one. Start some sentences with -ly words, -ing words, or a place ("Beyond the gate, …").
5. **Save two minutes to check:** capitals, full stops, your three trickiest spellings.

Techniques worth one deliberate use each: a **simile**, a **metaphor**, **personification** (the wind howled), **alliteration**, **onomatopoeia**.

**Show your working:** your plan IS your working — examiners can tell a planned story from a wandering one by the end of the first paragraph.`,
  vocabulary: [
    { term: 'Personification', meaning: 'Giving a thing human behaviour: the wind howled, the door groaned.' },
    { term: 'Alliteration', meaning: 'Nearby words starting with the same sound: the slippery, silver snake.' },
    { term: 'Onomatopoeia', meaning: 'A word that sounds like its noise: crash, hiss, thud.' },
    { term: 'Show, don\'t tell', meaning: 'Revealing a feeling through actions instead of naming it.' },
    { term: 'Story mountain', meaning: 'The five-part shape of a story: opening, build-up, problem, resolution, ending.' },
  ],
  questions: [
    {
      id: 'english-writing-01-q1',
      sectionId: 'english-writing-01-composition',
      type: 'mcq',
      prompt: 'What is the most important job of a story\'s OPENING line?',
      choices: [
        'to hook the reader so they want to read on',
        'to introduce every character by name',
        'to explain the whole plot',
        'to describe the weather',
      ],
      answer: 'to hook the reader so they want to read on',
      explanation: 'An opening earns the reader\'s attention — with action, a strange detail or a question. Everything else can wait.',
      difficulty: 1,
      source: 'ISEB CE · Composition',
    },
    {
      id: 'english-writing-01-q2',
      sectionId: 'english-writing-01-composition',
      type: 'mcq',
      prompt: '"The classroom was as quiet as a graveyard." What technique is this?',
      choices: ['a simile', 'a metaphor', 'onomatopoeia', 'personification'],
      answer: 'a simile',
      explanation: 'It compares the classroom to a graveyard using "as … as" — the signature of a simile.',
      difficulty: 1,
      source: 'ISEB CE · Composition',
    },
    {
      id: 'english-writing-01-q3',
      sectionId: 'english-writing-01-composition',
      type: 'mcq',
      prompt: '"The moon was a silver coin spinning above the rooftops." What technique is this?',
      choices: ['a metaphor', 'a simile', 'alliteration', 'a fact'],
      answer: 'a metaphor',
      explanation: 'The moon IS a coin — no "like" or "as" — so it is a metaphor. Bolder than a simile, and examiners love a well-placed one.',
      difficulty: 2,
      source: 'ISEB CE · Composition',
      variantOf: 'english-writing-01-q2',
    },
    {
      id: 'english-writing-01-q4',
      sectionId: 'english-writing-01-composition',
      type: 'mcq',
      prompt: 'Which sentence SHOWS that Maya is nervous, rather than telling us?',
      choices: [
        'Maya\'s fingers drummed the desk while her eyes kept flicking to the door.',
        'Maya was very nervous.',
        'Maya felt extremely worried and scared.',
        'Maya was the most nervous girl in the school.',
      ],
      answer: 'Maya\'s fingers drummed the desk while her eyes kept flicking to the door.',
      explanation: 'Drumming fingers and darting eyes let the reader FEEL the nerves. The others just announce the feeling — telling, not showing.',
      difficulty: 2,
      source: 'ISEB CE · Composition',
    },
    {
      id: 'english-writing-01-q5',
      sectionId: 'english-writing-01-composition',
      type: 'mcq',
      prompt: 'When should you start a NEW paragraph?',
      choices: [
        'when the time, place or speaker changes',
        'after every sentence',
        'only at the very end of the story',
        'whenever a sentence gets long',
      ],
      answer: 'when the time, place or speaker changes',
      explanation: 'New time, new place, new person speaking — new paragraph. (In dialogue, EVERY change of speaker gets its own line.)',
      difficulty: 2,
      source: 'ISEB CE · Composition',
    },
    {
      id: 'english-writing-01-q6',
      sectionId: 'english-writing-01-composition',
      type: 'mcq',
      prompt: 'Mr Hart is furious. Which verb is the strongest choice?  ‘"Get out," he ___.\'',
      choices: ['snarled', 'said', 'stated', 'mentioned'],
      answer: 'snarled',
      explanation: '"Snarled" carries the fury inside the verb itself. "Said" is invisible (fine sometimes), but "stated" and "mentioned" are far too calm for a furious man.',
      difficulty: 2,
      source: 'ISEB CE · Composition',
    },
    {
      id: 'english-writing-01-q7',
      sectionId: 'english-writing-01-composition',
      type: 'mcq',
      prompt: 'Which phrase uses ALLITERATION?',
      choices: [
        'the slippery, silver snake slid past',
        'the snake moved very quickly',
        'the snake was like a rope',
        'crash! went the dustbin',
      ],
      answer: 'the slippery, silver snake slid past',
      explanation: 'Slippery, silver, snake, slid — the repeated S sound is alliteration. ("Crash!" is onomatopoeia; "like a rope" is a simile.)',
      difficulty: 2,
      source: 'ISEB CE · Composition',
      variantOf: 'english-writing-01-q2',
    },
    {
      id: 'english-writing-01-q8',
      sectionId: 'english-writing-01-composition',
      type: 'mcq',
      prompt: '"The old gate groaned and complained as we pushed it open." What technique is this?',
      choices: ['personification', 'a simile', 'onomatopoeia', 'retrieval'],
      answer: 'personification',
      explanation: 'Gates cannot really groan or complain — those are human behaviours. Giving them to a thing is personification.',
      difficulty: 3,
      source: 'ISEB CE · Composition',
      variantOf: 'english-writing-01-q3',
    },
    {
      id: 'english-writing-01-q9',
      sectionId: 'english-writing-01-composition',
      type: 'mcq',
      prompt: 'Which is the best way to fix this run-on sentence?  "The cave was dark we lit the torch we went in."',
      choices: [
        'The cave was dark, so we lit the torch and went in.',
        'The cave was dark we lit, the torch we went in.',
        'The cave was dark we lit the torch, we went in.',
        'The cave, was dark, we lit the torch, we went in.',
      ],
      answer: 'The cave was dark, so we lit the torch and went in.',
      explanation: 'Three squashed-together sentences need joining words, not just commas: "so" links the reason, "and" links the actions. Sprinkling commas between whole sentences is the classic error.',
      difficulty: 3,
      source: 'ISEB CE · Composition',
    },
    {
      id: 'english-writing-01-q10',
      sectionId: 'english-writing-01-composition',
      type: 'truefalse',
      prompt: 'True or false: spending five minutes planning is wasted time in a thirty-minute writing task.',
      answer: 'False',
      explanation: 'False — the plan is what keeps the story shaped and the ending strong. Markers can spot an unplanned story by the way it wanders and stops dead.',
      difficulty: 1,
      source: 'ISEB CE · Composition',
    },
    {
      id: 'english-writing-01-q11',
      sectionId: 'english-writing-01-composition',
      type: 'mcq',
      prompt: 'Which word is an example of ONOMATOPOEIA?',
      choices: ['thud', 'quickly', 'enormous', 'frightened'],
      answer: 'thud',
      explanation: 'Say it aloud — "thud" sounds like the noise it names. That is onomatopoeia.',
      difficulty: 1,
      source: 'ISEB CE · Composition',
      variantOf: 'english-writing-01-q7',
    },
    {
      id: 'english-writing-01-q12',
      sectionId: 'english-writing-01-composition',
      type: 'mcq',
      prompt: 'Your story is one long paragraph of similar sentences. Which fix improves the WRITING most?',
      choices: [
        'Break it into paragraphs and vary the sentence lengths and openers.',
        'Add five more adjectives to every noun.',
        'Write THE END in capital letters.',
        'Make every sentence start with "Then".',
      ],
      answer: 'Break it into paragraphs and vary the sentence lengths and openers.',
      explanation: 'Structure and rhythm carry more marks than piled-up adjectives. A short sentence after a long one. See? It lands.',
      difficulty: 3,
      source: 'ISEB CE · Composition',
      variantOf: 'english-writing-01-q5',
    },
  ],
  examples: [
    {
      title: 'Practice prompt: The Door in the Wall',
      body: 'You have walked past the wall a hundred times — and today there is a door in it that was never there before. Plan the five story-mountain beats in one line each, then write the opening paragraph using one simile and one short punchy sentence.',
    },
    {
      title: 'Practice prompt: The Day the Lights Went Out',
      body: 'Write the first page of a story with this title. Challenge: show how your character feels without once naming the feeling — actions, hands, breathing and glances only.',
    },
  ],
  deeper: `More practice titles, one plan each (five lines, five minutes):

- **The Unexpected Visitor** — who arrives, and why now?
- **Lost** — a place, a person, or a thing? The title is yours to twist.
- **The Smallest Door in the House** — fantasy or family story? Decide before you write.
- **A Walk in the Rain** — the gift here is atmosphere: sounds, smells, reflections.

For each: jot the story mountain, circle the beat where your problem lives, and decide your ending BEFORE you write the opening. Endings written at the last minute read like it.`,
};
