import type { Section } from '../types';

// The classic-prose comprehension section — the hardest flavour on
// independent-school papers (ROADMAP §5/§6; Alleyn's 11+ sample uses this very
// novel). The passage is a public-domain extract, ABRIDGED from Chapter 1 of
// Charles Dickens's "Great Expectations" (1861): Pip meets the convict in the
// churchyard. The signature paragraphs ("Hold your noise!", "A fearful man,
// all in coarse grey…", "After darkly looking at his leg…" and the name
// dialogue) are verbatim, checked word-for-word against the published text;
// the framing paragraphs are lightly abridged, exactly as real papers do.
// Vocabulary landmines (coarse, lamed, briars, ravenously, leaden…) are
// drilled by the questions themselves, per the research's advice.
const PASSAGE_CONVICT = `My father's family name being Pirrip, and my Christian name Philip, my infant tongue could make of both names nothing longer or more explicit than Pip. So, I called myself Pip, and came to be called Pip.

Ours was the marsh country, down by the river, within, as the river wound, twenty miles of the sea. My first most vivid and broad impression of the identity of things seems to me to have been gained on a memorable raw afternoon towards evening. At such a time I found out for certain that this bleak place overgrown with nettles was the churchyard; and that the dark flat wilderness beyond the churchyard, intersected with dykes and mounds and gates, with scattered cattle feeding on it, was the marshes; and that the low leaden line beyond was the river; and that the distant savage lair from which the wind was rushing was the sea; and that the small bundle of shivers growing afraid of it all and beginning to cry, was Pip.

"Hold your noise!" cried a terrible voice, as a man started up from among the graves at the side of the church porch. "Keep still, you little devil, or I'll cut your throat!"

A fearful man, all in coarse grey, with a great iron on his leg. A man with no hat, and with broken shoes, and with an old rag tied round his head. A man who had been soaked in water, and smothered in mud, and lamed by stones, and cut by flints, and stung by nettles, and torn by briars; who limped, and shivered, and glared and growled; and whose teeth chattered in his head as he seized me by the chin.

"O! Don't cut my throat, sir," I pleaded in terror. "Pray don't do it, sir."

"Tell us your name!" said the man. "Quick!"

"Pip, sir."

"Once more," said the man, staring at me. "Give it mouth!"

"Pip. Pip, sir."

"Show us where you live," said the man. "Pint out the place!"

I pointed to where our village lay, on the flat in-shore among the alder-trees and pollards, a mile or more from the church.

The man, after looking at me for a moment, turned me upside down, and emptied my pockets. There was nothing in them but a piece of bread. I was seated on a high tombstone, trembling, while he ate the bread ravenously.

After darkly looking at his leg and me several times, he came closer to my tombstone, took me by both arms, and tilted me back as far as he could hold me; so that his eyes looked most powerfully down into mine, and mine looked most helplessly up into his.

— abridged from "Great Expectations" by Charles Dickens (1861), Chapter 1`;

export const englishReading04ClassicProse: Section = {
  id: 'english-reading-04-classic-prose',
  subject: 'english',
  pack: 'english-reading',
  number: 4,
  title: 'Classic prose',
  lesson: `The hardest passages on independent-school papers aren't new stories — they're OLD ones. Dickens, Nesbit, Grahame: books written over a hundred years ago, with long sentences and words nobody says any more. Schools pick them on purpose, to see what you do when the text fights back. Four tools tame them:

1. **Don't stop at a strange word.** You are not supposed to know them all. Read on to the end of the sentence — the words around it usually tell you enough. "Torn by briars" — whatever briars are, they tear you, so: something sharp you push through.

2. **Use the swap test on word-meaning questions.** Drop each option into the sentence in place of the mystery word and keep the one that makes sense. "A memorable RAW afternoon" — try "uncooked"? Silly. Try "cold and damp"? That works.

3. **Long Victorian sentences: find the anchors.** A sentence can run six lines with semicolons. Don't re-read it in a panic — each semicolon chunk is one small fact. Read it chunk by chunk, like a list.

4. **The questions still walk through the passage in order** — same as any long passage. Question 3's answer lives after question 2's. Lost? Let the question order be your map.

The golden rule doesn't age: **every answer must be backed by the text** — even a text older than your great-great-grandparents.

**Show your working:** underline the exact words that gave you each answer, especially for word-meaning questions.`,
  vocabulary: [
    { term: 'Extract', meaning: 'A passage cut from a longer book. Exam extracts often say "abridged" — shortened, with some sentences trimmed out.' },
    { term: 'Victorian', meaning: 'From the reign of Queen Victoria (1837–1901) — the era of Dickens, with long sentences and formal vocabulary.' },
    { term: 'Dialect', meaning: 'The way people from one place or background really speak — writers spell it as it sounds ("Pint out the place!").' },
    { term: 'Context clue', meaning: 'The words around a hard word that reveal what it must mean — your first tool on old texts.' },
    { term: 'Convict', meaning: 'A person found guilty of a crime — in Victorian stories, often an escaped prisoner still wearing a leg-iron.' },
  ],
  examples: [
    {
      title: 'Why examiners love dusty old books',
      body: 'Anyone can be taught this year\'s vocabulary. What old prose tests is whether you can work out meaning from context — the one reading skill that can\'t be memorised. That\'s why Alleyn\'s used this very novel on a real 11+ paper. Treat every strange word as a puzzle with its answer hidden in the same sentence.',
    },
    {
      title: 'The semicolon is a list in disguise',
      body: 'Dickens\'s famous churchyard sentence has five "and that…" chunks stitched with semicolons: the churchyard; the marshes; the river; the sea; and finally Pip himself, "the small bundle of shivers". Read a monster sentence as the list it secretly is, and it stops being a monster.',
    },
  ],
  questions: [
    {
      id: 'english-reading-04-q1',
      sectionId: 'english-reading-04-classic-prose',
      type: 'mcq',
      passage: PASSAGE_CONVICT,
      prompt: 'Why is the narrator called Pip?',
      choices: [
        'As a small child he could not pronounce his real name properly',
        'It was his father\'s name',
        'The convict gave him the name',
        'It was short for Philip Pirrip in the parish register',
      ],
      answer: 'As a small child he could not pronounce his real name properly',
      explanation: 'The first paragraph explains it: his "infant tongue could make of both names nothing longer or more explicit than Pip" — as a baby he could only manage "Pip" from Philip Pirrip, and the name stuck.',
      difficulty: 1,
      source: '11+ English · Classic prose (Dickens)',
    },
    {
      id: 'english-reading-04-q2',
      sectionId: 'english-reading-04-classic-prose',
      type: 'mcq',
      passage: PASSAGE_CONVICT,
      prompt: 'Where does this extract take place?',
      choices: [
        'a churchyard in the marsh country, near the river',
        'a village school',
        'on board a prison ship',
        'a farmhouse kitchen',
      ],
      answer: 'a churchyard in the marsh country, near the river',
      explanation: 'Retrieval from paragraph two: "Ours was the marsh country, down by the river" and "this bleak place overgrown with nettles was the churchyard". The village and the sea are mentioned, but the scene itself happens among the graves.',
      difficulty: 1,
      source: '11+ English · Classic prose (Dickens)',
    },
    {
      id: 'english-reading-04-q3',
      sectionId: 'english-reading-04-classic-prose',
      type: 'mcq',
      passage: PASSAGE_CONVICT,
      prompt: 'The afternoon is described as "raw". What does "raw" mean here?',
      choices: ['cold and damp', 'uncooked', 'brand new', 'painful and sore'],
      answer: 'cold and damp',
      explanation: 'The swap test: an "uncooked afternoon" is nonsense, but a "cold and damp afternoon" fits the shivering, marshy scene perfectly. "Raw" describing weather means bitingly cold and wet — the wind is "rushing" in from the sea.',
      difficulty: 1,
      source: '11+ English · Classic prose (Dickens)',
    },
    {
      id: 'english-reading-04-q4',
      sectionId: 'english-reading-04-classic-prose',
      type: 'short',
      passage: PASSAGE_CONVICT,
      prompt: 'What was the "bleak place" of the churchyard overgrown with?',
      answer: 'nettles',
      acceptable: ['nettles.', 'with nettles'],
      explanation: 'Retrieval: "this bleak place overgrown with nettles was the churchyard". Scan for the exact phrase "overgrown with" and copy the word that follows — free marks for careful scanning.',
      difficulty: 1,
      source: '11+ English · Classic prose (Dickens)',
    },
    {
      id: 'english-reading-04-q5',
      sectionId: 'english-reading-04-classic-prose',
      type: 'mcq',
      passage: PASSAGE_CONVICT,
      prompt: 'The river is "the low leaden line beyond". Why does Dickens choose the word "leaden"?',
      choices: [
        'It makes the river look dull grey and heavy, like the metal lead',
        'It tells us the river is full of lead pipes',
        'It shows the river is moving very fast',
        'It means the river is shining brightly',
      ],
      answer: 'It makes the river look dull grey and heavy, like the metal lead',
      explanation: '"Leaden" means lead-coloured: a flat, dull, heavy grey. One word paints the river cold and lifeless — the opposite of a sparkling blue river — and matches the bleak mood of the whole scene.',
      difficulty: 2,
      source: '11+ English · Classic prose (Dickens)',
    },
    {
      id: 'english-reading-04-q6',
      sectionId: 'english-reading-04-classic-prose',
      type: 'mcq',
      passage: PASSAGE_CONVICT,
      prompt: 'The sea is called "the distant savage lair from which the wind was rushing". What technique is this?',
      choices: ['a metaphor', 'a simile', 'onomatopoeia', 'alliteration'],
      answer: 'a metaphor',
      explanation: 'A lair is a wild animal\'s den. The sea IS a savage lair — no "like" or "as" — so this is a metaphor: it turns the sea into a dangerous beast\'s home, with the wind rushing out of it like something escaping.',
      difficulty: 2,
      source: '11+ English · Classic prose (Dickens)',
    },
    {
      id: 'english-reading-04-q7',
      sectionId: 'english-reading-04-classic-prose',
      type: 'mcq',
      passage: PASSAGE_CONVICT,
      prompt: 'Pip calls himself "the small bundle of shivers growing afraid of it all and beginning to cry". What does this tell us about him?',
      choices: [
        'He is small, freezing cold and terrified',
        'He is wrapped up warmly in blankets',
        'He is ill with a fever',
        'He is laughing at the storm',
      ],
      answer: 'He is small, freezing cold and terrified',
      explanation: 'Pip doesn\'t even call himself a boy — he is just a "bundle of shivers", as if he were nothing but the shaking. It shows how tiny, cold and frightened he feels against the huge bleak marsh.',
      difficulty: 1,
      source: '11+ English · Classic prose (Dickens)',
    },
    {
      id: 'english-reading-04-q8',
      sectionId: 'english-reading-04-classic-prose',
      type: 'mcq',
      passage: PASSAGE_CONVICT,
      prompt: 'Where does the man appear from?',
      choices: [
        'from among the graves beside the church porch',
        'from behind the alder-trees',
        'from a boat on the river',
        'from inside the church',
      ],
      answer: 'from among the graves beside the church porch',
      explanation: 'Retrieval: "a man started up from among the graves at the side of the church porch". Rising up from the graves themselves is what makes the moment so terrifying — for a heartbeat he could be something worse than a man.',
      difficulty: 1,
      source: '11+ English · Classic prose (Dickens)',
    },
    {
      id: 'english-reading-04-q9',
      sectionId: 'english-reading-04-classic-prose',
      type: 'mcq',
      passage: PASSAGE_CONVICT,
      prompt: 'The man has "a great iron on his leg". What does this detail tell the careful reader?',
      choices: [
        'He is an escaped prisoner, still wearing his leg-iron',
        'He is a blacksmith carrying his tools',
        'He has a broken leg in a metal splint',
        'He is wearing armour',
      ],
      answer: 'He is an escaped prisoner, still wearing his leg-iron',
      explanation: 'Inference: Victorian prisoners were chained by a heavy iron shackle on the leg. A man hiding in a churchyard, dressed in rough prison grey, still wearing his iron — he has escaped, and the "darkly looking at his leg" later confirms the iron is what troubles him.',
      difficulty: 2,
      source: '11+ English · Classic prose (Dickens)',
    },
    {
      id: 'english-reading-04-q10',
      sectionId: 'english-reading-04-classic-prose',
      type: 'mcq',
      passage: PASSAGE_CONVICT,
      prompt: 'The man is dressed "all in coarse grey". What does "coarse" mean?',
      choices: ['rough and scratchy', 'expensive and fine', 'brightly coloured', 'soaking wet'],
      answer: 'rough and scratchy',
      explanation: '"Coarse" is the opposite of fine or smooth — rough, cheap, scratchy cloth. Prison uniforms were made of exactly this. The swap test rules the others out: his clothes are grey (not bright) and their wetness is said separately.',
      difficulty: 2,
      source: '11+ English · Classic prose (Dickens)',
    },
    {
      id: 'english-reading-04-q11',
      sectionId: 'english-reading-04-classic-prose',
      type: 'mcq',
      passage: PASSAGE_CONVICT,
      prompt: 'The man had been "lamed by stones". What has happened to him?',
      choices: [
        'The stones have injured his feet and legs so that he limps',
        'He has been throwing stones',
        'He has been building a wall of stones',
        'The stones have knocked him unconscious',
      ],
      answer: 'The stones have injured his feet and legs so that he limps',
      explanation: 'To "lame" someone is to injure their legs or feet so they cannot walk properly — and sure enough, the very next line says he "limped". The passage often checks its own hard words like this a sentence later.',
      difficulty: 2,
      source: '11+ English · Classic prose (Dickens)',
    },
    {
      id: 'english-reading-04-q12',
      sectionId: 'english-reading-04-classic-prose',
      type: 'short',
      passage: PASSAGE_CONVICT,
      prompt: 'The man was "torn by briars". Using the clues in the sentence, what must briars be?',
      answer: 'thorny bushes',
      acceptable: ['brambles', 'thorn bushes', 'thorny plants', 'prickly bushes', 'sharp thorny bushes', 'thorny brambles'],
      explanation: 'Context clue: whatever briars are, they TEAR you — alongside stinging nettles and cutting flints. So briars must be sharp, thorny plants: brambles. You don\'t need to have met the word before to work it out.',
      difficulty: 2,
      source: '11+ English · Classic prose (Dickens)',
    },
    {
      id: 'english-reading-04-q13',
      sectionId: 'english-reading-04-classic-prose',
      type: 'mcq',
      passage: PASSAGE_CONVICT,
      prompt: '"Soaked in water, and smothered in mud, and lamed by stones, and cut by flints, and stung by nettles, and torn by briars" — what is the effect of this long list?',
      choices: [
        'It piles up his injuries one after another, showing how brutal his escape has been',
        'It shows the man enjoys being outdoors',
        'It describes the weather on the marshes',
        'It lists the jobs the man has to do',
      ],
      answer: 'It piles up his injuries one after another, showing how brutal his escape has been',
      explanation: 'Six punishments, hammered out with "and… and… and…" — the list technique makes his suffering feel endless. Every item is something the marsh has done TO him, so we feel the desperation of his escape.',
      difficulty: 2,
      source: '11+ English · Classic prose (Dickens)',
    },
    {
      id: 'english-reading-04-q14',
      sectionId: 'english-reading-04-classic-prose',
      type: 'mcq',
      passage: PASSAGE_CONVICT,
      prompt: 'Why does Pip say his name twice — "Pip. Pip, sir."?',
      choices: [
        'The man ordered him to say it again more clearly',
        'The man could not hear him over the wind',
        'Pip has forgotten his own name',
        'Pip is introducing two people',
      ],
      answer: 'The man ordered him to say it again more clearly',
      explanation: 'The man demands "Once more… Give it mouth!" — rough speech for "say it louder and clearer". Terrified Pip obeys instantly, repeating his name and adding "sir" to a man who has just threatened to cut his throat.',
      difficulty: 2,
      source: '11+ English · Classic prose (Dickens)',
    },
    {
      id: 'english-reading-04-q15',
      sectionId: 'english-reading-04-classic-prose',
      type: 'mcq',
      passage: PASSAGE_CONVICT,
      prompt: 'The man says "Pint out the place!" instead of "point". Why does Dickens spell it like that?',
      choices: [
        'To let us hear the man\'s rough, uneducated way of speaking',
        'It is a printing mistake',
        'Pip has misheard him',
        '"Pint" was the correct spelling in Victorian times',
      ],
      answer: 'To let us hear the man\'s rough, uneducated way of speaking',
      explanation: 'This is dialect spelling: writing a word the way the speaker actually says it. "Pint out" (and "Give it mouth!") lets us HEAR that the man is rough and unschooled — Dickens characterises him through sound, not description.',
      difficulty: 3,
      source: '11+ English · Classic prose (Dickens)',
    },
    {
      id: 'english-reading-04-q16',
      sectionId: 'english-reading-04-classic-prose',
      type: 'short',
      passage: PASSAGE_CONVICT,
      prompt: 'When the man empties Pip\'s pockets, what is the only thing he finds?',
      answer: 'a piece of bread',
      acceptable: ['bread', 'some bread', 'a piece of bread.', 'piece of bread'],
      explanation: 'Retrieval: "There was nothing in them but a piece of bread." Scan for "pockets" and read on. The man devouring a child\'s scrap of bread also quietly tells us how starving he is.',
      difficulty: 2,
      source: '11+ English · Classic prose (Dickens)',
    },
    {
      id: 'english-reading-04-q17',
      sectionId: 'english-reading-04-classic-prose',
      type: 'mcq',
      passage: PASSAGE_CONVICT,
      prompt: 'The man ate the bread "ravenously". What does "ravenously" mean?',
      choices: ['extremely hungrily', 'very slowly and politely', 'angrily', 'secretly'],
      answer: 'extremely hungrily',
      explanation: '"Ravenous" means starving — wolf-hungry. He wolfs down a boy\'s scrap of bread, which tells us he may not have eaten for days. The swap test kills "politely" instantly: nothing about this man is polite.',
      difficulty: 2,
      source: '11+ English · Classic prose (Dickens)',
    },
    {
      id: 'english-reading-04-q18',
      sectionId: 'english-reading-04-classic-prose',
      type: 'mcq',
      passage: PASSAGE_CONVICT,
      prompt: '"His eyes looked most powerfully down into mine, and mine looked most helplessly up into his." What does the shape of this sentence show?',
      choices: [
        'The two halves mirror each other, showing the man has all the power and Pip has none',
        'The man and Pip are exactly the same height',
        'They are staring at something in the sky together',
        'Pip is winning the staring contest',
      ],
      answer: 'The two halves mirror each other, showing the man has all the power and Pip has none',
      explanation: 'The sentence is built as a mirror: powerfully DOWN / helplessly UP. Same words, opposite directions — the balance of the sentence acts out the imbalance between them. Top-band answers notice the shape, not just the words.',
      difficulty: 3,
      source: '11+ English · Classic prose (Dickens)',
    },
    {
      id: 'english-reading-04-q19',
      sectionId: 'english-reading-04-classic-prose',
      type: 'mcq',
      passage: PASSAGE_CONVICT,
      prompt: 'Which list shows the order in which things happen in the extract?',
      choices: [
        'man springs up — demands Pip\'s name — empties his pockets — tilts him back over the tombstone',
        'man empties Pip\'s pockets — springs up — tilts him back — demands his name',
        'man demands Pip\'s name — springs up — tilts him back — empties his pockets',
        'man tilts Pip back — demands his name — springs up — empties his pockets',
      ],
      answer: 'man springs up — demands Pip\'s name — empties his pockets — tilts him back over the tombstone',
      explanation: 'Walk the passage top to bottom: "Hold your noise!" (he springs up), "Tell us your name!", then "turned me upside down, and emptied my pockets", and finally "tilted me back as far as he could hold me". The questions walk in order — so does the answer.',
      difficulty: 3,
      source: '11+ English · Classic prose (Dickens)',
    },
    {
      id: 'english-reading-04-q20',
      sectionId: 'english-reading-04-classic-prose',
      type: 'mcq',
      passage: PASSAGE_CONVICT,
      prompt: 'Judging by the whole extract, which is the best description of the man?',
      choices: [
        'A desperate escaped convict — terrifying to Pip, yet suffering badly himself',
        'A cruel villain who enjoys frightening children for fun',
        'A poor beggar who politely asks Pip for food',
        'A ghost haunting the churchyard',
      ],
      answer: 'A desperate escaped convict — terrifying to Pip, yet suffering badly himself',
      explanation: 'Hold both halves of the evidence: he threatens Pip and manhandles him (terrifying), but he is also soaked, lamed, starving and shivering (suffering). Dickens makes us fear him AND pity him at once — one-word answers like "villain" miss half the picture.',
      difficulty: 3,
      source: '11+ English · Classic prose (Dickens)',
    },
  ],
  deeper: `This extract is the real thing: the opening of **Great Expectations**, published by Charles Dickens in 1861 — the same novel Alleyn's School put on an actual 11+ paper. The terrifying stranger is Abel Magwitch, an escaped convict, and this meeting in the churchyard secretly sets off the entire plot: years later, Pip's whole life is changed by what happens in these few minutes (no more spoilers).

Books this old are **public domain** — their copyright has expired, so anyone can read them free online. If you liked the atmosphere, the first chapters of *The Secret Garden*, *Treasure Island* and *The Railway Children* are the same vintage and just as good — and every one of them has been used on school entrance papers.`,
};
