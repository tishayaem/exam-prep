import type { Section } from '../types';

// One genuinely long passage (~440 words) shared by all 20 questions — the
// skill this section trains is reading stamina, so the length is the point.
// Every question re-carries the passage (see Question.passage) so it stays
// self-contained in Quiz, Mock Test and Mistakes.
const PASSAGE_SWIFT = `Jonas found the swift on the morning of sports day, huddled against the bins like a dropped glove. At first he thought it was dead. Then a wing twitched, and two black eyes blinked up at him, bright as wet ink.

"You can't keep it," said his sister Priya, peering over his shoulder. "Mum will go bananas."

"I'm not keeping it. I'm helping it." Jonas eased the bird into his upturned cap. It weighed almost nothing — a handful of air and feathers — yet he could feel its heart drumming against his fingers, fast as rain on a tin roof.

Mr Okafor, who taught science and knew about birds, met them at the staffroom door. He did not go bananas. He fetched a shoebox, punched six holes in the lid with a biro, and listened carefully while Jonas explained about the bins.

"Swifts are odd ones," he said, lowering the bird inside. "They eat in the air, sleep in the air, even wash in the air. But their legs are so short and weak that if one ends up on flat ground, it often cannot take off again. This bird probably isn't injured. It's just stuck."

"Stuck?" said Priya. "Like a beetle on its back?"

"More or less. What it needs is height — and a little luck."

All through the egg-and-spoon race and the terrible business of the three-legged sprint, Jonas thought about the shoebox waiting in the cool dark of the staffroom. He dropped his egg twice. He came last by a mile, and found he did not care.

At half past three, Mr Okafor carried the box up to the top corridor, where a window opened above the playing field. The grass below was still littered with abandoned sacks and skipping ropes. He let Jonas hold the box.

"Arms out of the window. Steady. Don't throw it — just let it see the sky."

Jonas lifted the lid. For one long second the swift sat motionless in his cupped hands, and his stomach dropped: perhaps it was injured after all; perhaps they had waited too long. Then the bird spilled forward off his fingers, fell like a stone for a heartbeat — and snapped open two long, curved wings.

It did not flap away politely, like a pigeon. It sliced upwards, carving one wide circle over the field, then another, higher, until it was nothing but a flickering speck against the clouds.

"Will it be all right?" asked Priya quietly.

"That bird," said Mr Okafor, "might not touch the ground again for two or three years. Eating, sleeping, flying — all of it up there. We didn't rescue it from the sky. We rescued it for the sky."`;

export const englishReading02LongFiction: Section = {
  id: 'english-reading-02-long-fiction',
  subject: 'english',
  pack: 'english-reading',
  number: 2,
  title: 'Long fiction',
  lesson: `The real paper doesn't give you four cosy little texts — it gives you ONE long one, and every question hunts inside it. Long passages need a method:

1. **Read it properly once.** Slowly enough to follow the story. Don't peek at the questions first — a muddled first read costs more time than it saves.
2. **The questions walk through the passage in order.** Question 3's answer almost always lives AFTER question 2's and BEFORE question 4's. Lost? That's your map.
3. **Scan back for the exact spot.** Don't re-read everything — hunt for a name, a number or a time near where you expect the answer.
4. **Word-meaning questions: use the swap test.** Drop each option into the sentence in place of the mystery word. Only the right one keeps the sentence making sense.

The golden rule still rules: **every answer must be backed by the text** — long passages just give the wrong answers more room to hide.

**Show your working:** in the real paper, underline where in the passage you found each answer.`,
  vocabulary: [
    { term: 'Skim', meaning: 'Reading quickly to get the general idea of a text.' },
    { term: 'Scan', meaning: 'Hunting through a text for one detail — a name, a number, a time.' },
    { term: 'Context', meaning: 'The words around a word — they reveal what it means.' },
    { term: 'Chronological', meaning: 'In time order — the order things actually happened.' },
    { term: 'Stamina', meaning: 'Reading power for long texts. Built the same way as running stamina: practice.' },
  ],
  questions: [
    {
      id: 'english-reading-02-q1',
      sectionId: 'english-reading-02-long-fiction',
      type: 'mcq',
      passage: PASSAGE_SWIFT,
      prompt: 'When did Jonas find the swift?',
      choices: [
        'on the morning of sports day',
        'after school on Friday',
        'during the summer holidays',
        'at half past three',
      ],
      answer: 'on the morning of sports day',
      explanation: 'Retrieval from the very first line: "Jonas found the swift on the morning of sports day". Half past three is when they RELEASED it — the classic trap of grabbing the wrong time from later in the text.',
      difficulty: 1,
      source: '11+ English · Comprehension (long passage)',
    },
    {
      id: 'english-reading-02-q2',
      sectionId: 'english-reading-02-long-fiction',
      type: 'short',
      passage: PASSAGE_SWIFT,
      prompt: "What is the name of Jonas's sister?",
      answer: 'Priya',
      acceptable: ['priya'],
      explanation: 'Retrieval: "said his sister Priya, peering over his shoulder". Names are free marks — scan for the capital letter and copy it exactly.',
      difficulty: 1,
      source: '11+ English · Comprehension (long passage)',
    },
    {
      id: 'english-reading-02-q3',
      sectionId: 'english-reading-02-long-fiction',
      type: 'mcq',
      passage: PASSAGE_SWIFT,
      prompt: 'Where exactly was the swift when Jonas found it?',
      choices: [
        'huddled against the bins',
        'caught in a hedge',
        'on the staffroom windowsill',
        'in the middle of the playing field',
      ],
      answer: 'huddled against the bins',
      explanation: 'Retrieval: "huddled against the bins like a dropped glove". The playing field and the staffroom both appear in the story — later, and for other reasons. Location questions love to recycle places from the wrong paragraph.',
      difficulty: 1,
      source: '11+ English · Comprehension (long passage)',
    },
    {
      id: 'english-reading-02-q4',
      sectionId: 'english-reading-02-long-fiction',
      type: 'mcq',
      passage: PASSAGE_SWIFT,
      prompt: '"Huddled against the bins like a dropped glove." What technique is the writer using?',
      choices: ['a simile', 'a metaphor', 'onomatopoeia', 'alliteration'],
      answer: 'a simile',
      explanation: 'The bird is compared to a dropped glove using "like" — that word is the simile signature. It paints something small, soft and accidentally left behind.',
      difficulty: 2,
      source: '11+ English · Comprehension (long passage)',
    },
    {
      id: 'english-reading-02-q5',
      sectionId: 'english-reading-02-long-fiction',
      type: 'mcq',
      passage: PASSAGE_SWIFT,
      prompt: 'Who is Mr Okafor?',
      choices: [
        'a teacher who knows about birds',
        "Jonas's dad",
        'a vet who works near the school',
        'the school caretaker',
      ],
      answer: 'a teacher who knows about birds',
      explanation: 'Retrieval: "Mr Okafor, who taught science and knew about birds". The text never mentions a vet — that option is bait for people answering from imagination instead of evidence.',
      difficulty: 1,
      source: '11+ English · Comprehension (long passage)',
    },
    {
      id: 'english-reading-02-q6',
      sectionId: 'english-reading-02-long-fiction',
      type: 'mcq',
      passage: PASSAGE_SWIFT,
      prompt: 'Priya warns that Mum "will go bananas". Why does the writer later tell us that Mr Okafor "did not go bananas"?',
      choices: [
        "It repeats Priya's phrase to show, with a touch of humour, how calmly he reacted.",
        'It shows Mr Okafor dislikes fruit.',
        'It proves Mum and Mr Okafor are friends.',
        'It is a spelling mistake the writer forgot to fix.',
      ],
      answer: "It repeats Priya's phrase to show, with a touch of humour, how calmly he reacted.",
      explanation: 'Writers plant echoes on purpose. Priya predicted an adult explosion; the repeated phrase measures Mr Okafor against that prediction — and he passes, calmly. Spotting an echo is a language question, not a retrieval one.',
      difficulty: 2,
      source: '11+ English · Comprehension (long passage)',
    },
    {
      id: 'english-reading-02-q7',
      sectionId: 'english-reading-02-long-fiction',
      type: 'numeric',
      passage: PASSAGE_SWIFT,
      prompt: 'How many holes did Mr Okafor punch in the shoebox lid?',
      answer: '6',
      acceptable: ['six'],
      explanation: 'Retrieval: "punched six holes in the lid with a biro". Number questions reward a careful scan — the digits are rarely written as digits in the passage.',
      difficulty: 1,
      source: '11+ English · Comprehension (long passage)',
    },
    {
      id: 'english-reading-02-q8',
      sectionId: 'english-reading-02-long-fiction',
      type: 'mcq',
      passage: PASSAGE_SWIFT,
      prompt: 'According to Mr Okafor, why can a swift get stuck on flat ground?',
      choices: [
        'Its legs are too short and weak to push it back into the air.',
        'Its wings only work in cold weather.',
        'It is afraid of open spaces.',
        'It can only take off from water.',
      ],
      answer: 'Its legs are too short and weak to push it back into the air.',
      explanation: 'Retrieval from his speech: "their legs are so short and weak that if one ends up on flat ground, it often cannot take off again". When a character explains something, the explanation counts as text evidence.',
      difficulty: 2,
      source: '11+ English · Comprehension (long passage)',
    },
    {
      id: 'english-reading-02-q9',
      sectionId: 'english-reading-02-long-fiction',
      type: 'mcq',
      passage: PASSAGE_SWIFT,
      prompt: 'The grass was "littered with abandoned sacks and skipping ropes". In this sentence, "littered" most nearly means…',
      choices: [
        'untidily scattered about',
        'carefully arranged',
        'completely hidden',
        'made dirty with rubbish bins',
      ],
      answer: 'untidily scattered about',
      explanation: 'The swap test: "the grass was untidily scattered about with sacks and ropes" keeps the meaning — sports day kit dropped everywhere. "Litter" the rubbish is a different use of the word; the bins option is planted to catch that.',
      difficulty: 2,
      source: '11+ English · Comprehension (long passage)',
    },
    {
      id: 'english-reading-02-q10',
      sectionId: 'english-reading-02-long-fiction',
      type: 'mcq',
      passage: PASSAGE_SWIFT,
      prompt: 'Jonas drops his egg twice and comes last "by a mile, and found he did not care". What does this tell you?',
      choices: [
        'His mind is on the swift — the races have stopped mattering to him.',
        'He is terrible at sport and used to losing.',
        'He is ill and should have stayed at home.',
        'He wanted to lose on purpose to annoy Priya.',
      ],
      answer: 'His mind is on the swift — the races have stopped mattering to him.',
      explanation: 'Inference: the sentence before tells us he "thought about the shoebox" all through the races. Distraction plus not caring equals a heart that is somewhere else — the text never says he is bad at sport in general.',
      difficulty: 2,
      source: '11+ English · Comprehension (long passage)',
    },
    {
      id: 'english-reading-02-q11',
      sectionId: 'english-reading-02-long-fiction',
      type: 'mcq',
      passage: PASSAGE_SWIFT,
      prompt: 'At what time was the swift released?',
      choices: ['at half past three', 'at three o\'clock', 'first thing in the morning', 'at half past four'],
      answer: 'at half past three',
      explanation: 'Retrieval: "At half past three, Mr Okafor carried the box up to the top corridor". Scan for time words — and check the half against the hour, because near-miss times make perfect wrong options.',
      difficulty: 1,
      source: '11+ English · Comprehension (long passage)',
      variantOf: 'english-reading-02-q1',
    },
    {
      id: 'english-reading-02-q12',
      sectionId: 'english-reading-02-long-fiction',
      type: 'mcq',
      passage: PASSAGE_SWIFT,
      prompt: 'From where was the swift released?',
      choices: [
        'a window in the top corridor, above the playing field',
        'the staffroom door',
        'the roof of the bike shed',
        'the middle of the playing field',
      ],
      answer: 'a window in the top corridor, above the playing field',
      explanation: 'Retrieval: "the top corridor, where a window opened above the playing field". Mr Okafor said the bird needed HEIGHT — the window is the plan coming true, which is why the detail matters.',
      difficulty: 1,
      source: '11+ English · Comprehension (long passage)',
      variantOf: 'english-reading-02-q3',
    },
    {
      id: 'english-reading-02-q13',
      sectionId: 'english-reading-02-long-fiction',
      type: 'mcq',
      passage: PASSAGE_SWIFT,
      prompt: 'When the swift sits motionless in his hands, Jonas\'s "stomach dropped". What is he feeling at that moment?',
      choices: [
        'a sudden lurch of fear that the bird is hurt after all',
        'hunger, because he missed lunch for the races',
        'relief that the day is nearly over',
        'anger at Mr Okafor for waiting so long',
      ],
      answer: 'a sudden lurch of fear that the bird is hurt after all',
      explanation: 'Inference: the colon hands you his exact thoughts — "perhaps it was injured after all; perhaps they had waited too long". A dropping stomach is the body language of dread, and the text supplies the reason.',
      difficulty: 3,
      source: '11+ English · Comprehension (long passage)',
      variantOf: 'english-reading-02-q10',
    },
    {
      id: 'english-reading-02-q14',
      sectionId: 'english-reading-02-long-fiction',
      type: 'mcq',
      passage: PASSAGE_SWIFT,
      prompt: 'The bird "fell like a stone for a heartbeat". What technique is this?',
      choices: ['a simile', 'a metaphor', 'personification', 'onomatopoeia'],
      answer: 'a simile',
      explanation: 'Comparison with "like" — simile. One word of falling-stone heaviness, lasting exactly one heartbeat, makes the wings snapping open feel like a rescue.',
      difficulty: 2,
      source: '11+ English · Comprehension (long passage)',
      variantOf: 'english-reading-02-q4',
    },
    {
      id: 'english-reading-02-q15',
      sectionId: 'english-reading-02-long-fiction',
      type: 'mcq',
      passage: PASSAGE_SWIFT,
      prompt: 'Why does the writer say the swift "sliced upwards" rather than simply "flew upwards"?',
      choices: [
        '"Sliced" suggests a fast, clean, knife-sharp movement — sudden power after looking so helpless.',
        '"Sliced" tells us the bird was injured by the window.',
        'The writer could not think of another word for flying.',
        '"Sliced" shows the bird was moving slowly and carefully.',
      ],
      answer: '"Sliced" suggests a fast, clean, knife-sharp movement — sudden power after looking so helpless.',
      explanation: 'Word-choice questions ask what the picked word does that the plain word would not. A knife slices: fast, clean, effortless. After a whole story of helplessness, one verb flips the swift into the strong one.',
      difficulty: 3,
      source: '11+ English · Comprehension (long passage)',
    },
    {
      id: 'english-reading-02-q16',
      sectionId: 'english-reading-02-long-fiction',
      type: 'mcq',
      passage: PASSAGE_SWIFT,
      prompt: "How is the swift's take-off different from a pigeon's, according to the passage?",
      choices: [
        'It cuts upwards fast and sharply instead of flapping politely away.',
        'It takes off backwards.',
        'It is slower and clumsier than a pigeon.',
        'It makes a much louder noise.',
      ],
      answer: 'It cuts upwards fast and sharply instead of flapping politely away.',
      explanation: 'The text sets up the contrast itself: "It did not flap away politely, like a pigeon. It sliced upwards…". When a writer says "not X but Y", the comparison IS the answer.',
      difficulty: 2,
      source: '11+ English · Comprehension (long passage)',
    },
    {
      id: 'english-reading-02-q17',
      sectionId: 'english-reading-02-long-fiction',
      type: 'mcq',
      passage: PASSAGE_SWIFT,
      prompt: 'The swift "weighed almost nothing — a handful of air and feathers". What technique is "a handful of air and feathers"?',
      choices: ['a metaphor', 'a simile', 'onomatopoeia', 'a fact about all birds'],
      answer: 'a metaphor',
      explanation: 'No "like", no "as" — the bird simply IS a handful of air and feathers. That makes it a metaphor, and an exaggerated one: it tells you the bird feels impossibly light.',
      difficulty: 3,
      source: '11+ English · Comprehension (long passage)',
      variantOf: 'english-reading-02-q14',
    },
    {
      id: 'english-reading-02-q18',
      sectionId: 'english-reading-02-long-fiction',
      type: 'mcq',
      passage: PASSAGE_SWIFT,
      prompt: '"We didn\'t rescue it from the sky. We rescued it for the sky." What does Mr Okafor mean?',
      choices: [
        "The sky is the swift's true home — they saved the bird so it could return to the air, not to keep it safe on the ground.",
        'The sky was dangerous and the bird should stay indoors.',
        'He regrets letting the bird go.',
        'He thinks the bird will come back to the school every year.',
      ],
      answer: "The sky is the swift's true home — they saved the bird so it could return to the air, not to keep it safe on the ground.",
      explanation: 'He has just said the swift does everything "up there" and may not land for years. The flipped sentence — FROM the sky becoming FOR the sky — turns the whole story around: the ground was the danger, the sky is the rescue.',
      difficulty: 3,
      source: '11+ English · Comprehension (long passage)',
    },
    {
      id: 'english-reading-02-q19',
      sectionId: 'english-reading-02-long-fiction',
      type: 'mcq',
      passage: PASSAGE_SWIFT,
      prompt: 'Which of these shows the events in the order they happened?',
      choices: [
        'bird found by the bins — shoebox in the staffroom — the races — release from the window',
        'the races — bird found by the bins — shoebox in the staffroom — release from the window',
        'bird found by the bins — the races — shoebox in the staffroom — release from the window',
        'shoebox in the staffroom — bird found by the bins — the races — release from the window',
      ],
      answer: 'bird found by the bins — shoebox in the staffroom — the races — release from the window',
      explanation: 'Track the time markers: found "on the morning", boxed before the races (Jonas thinks about "the shoebox waiting" DURING the egg-and-spoon), released "at half past three". Order questions are won by scanning for time words, not by memory.',
      difficulty: 2,
      source: '11+ English · Comprehension (long passage)',
    },
    {
      id: 'english-reading-02-q20',
      sectionId: 'english-reading-02-long-fiction',
      type: 'mcq',
      passage: PASSAGE_SWIFT,
      prompt: 'Which sentence best sums up the whole story?',
      choices: [
        'A boy cares more about saving a stranded bird than about winning anything on sports day.',
        'A teacher punishes two children for missing sports day.',
        'A sister persuades her brother to keep a wild bird as a pet.',
        'A boy finds a dead bird and buries it with his teacher.',
      ],
      answer: 'A boy cares more about saving a stranded bird than about winning anything on sports day.',
      explanation: 'Summary questions want the whole arc, not one scene. Jonas loses every race and "did not care" — the story spends its time on the shoebox, not the finish line. The other options each contradict the text somewhere.',
      difficulty: 3,
      source: '11+ English · Comprehension (long passage)',
    },
  ],
  examples: [
    {
      title: 'The questions are a map',
      body: 'Exam questions almost always walk through the passage in order. If question 7 has you lost, its answer probably sits between where you found question 6 and question 8. Use the questions to find your place, not just to test you.',
    },
    {
      title: 'The swap test',
      body: 'For "what does this word mean here?" questions, swap each option into the actual sentence. "The grass was carefully arranged with abandoned sacks"? Nonsense. "Untidily scattered with abandoned sacks"? That survives — and surviving the swap is the test.',
    },
  ],
  deeper: `The swift facts in the story are real. Common swifts genuinely do eat, drink, preen and sleep **while flying** — they nap with one half of the brain at a time. A young swift that leaves its nest in Britain may stay airborne for **two or three years**, flying to Africa and back, before it first lands to nest. Scientists tracked one swift that flew **ten months without landing once**.

And the legs are real too: the swift's scientific name, *Apus*, comes from ancient Greek for "without feet". They have feet — tiny ones — but a grounded swift often needs exactly what Jonas gave it: height, and a little luck.`,
};
