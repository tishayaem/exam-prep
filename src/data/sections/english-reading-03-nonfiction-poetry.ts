import type { Section } from '../types';

// Real history — every fact checked: Winkie and the ditched Beaufort (Feb 1942),
// the Dickin Medal (founded 1943 by Maria Dickin; 54 awards in the 1940s, 32 to
// pigeons), the National Pigeon Service (~250,000 birds), and Winkie's place in
// The McManus museum, Dundee.
const PASSAGE_WINKIE = `On a freezing February night in 1942, a Royal Air Force bomber crashed into the North Sea. The radio was dead, the aircraft was sinking, and nobody back in Scotland knew where the crew were. The four airmen had one hope left, and she was sitting in a basket: a carrier pigeon called Winkie.

Winkie escaped the wreck and set off through the dark, through oil fumes and freezing spray, across more than a hundred and twenty miles of open water. The next morning she landed, exhausted and slicked with oil, at her home loft near Dundee. She carried no message — but she didn't need one. From the time she arrived, the state of her feathers and the direction of the wind, the rescuers calculated roughly where the bomber must have gone down. A search plane found the crew within fifteen minutes of reaching the area. All four men were saved.

Why use birds at all? A trained carrier pigeon has a remarkable homing instinct: released somewhere it has never been before, it can still find its way back to its own loft, hundreds of miles away, at speeds of more than fifty miles an hour. No radio operator was needed, and no enemy could listen in. A message was rolled into a tiny canister clipped to the pigeon's leg, and the bird did the rest. During the Second World War, Britain's National Pigeon Service kept around a quarter of a million pigeons, which flew from bombers, submarines — and even dropped to secret agents by parachute.

In 1943, Maria Dickin founded a medal for animals that showed outstanding bravery in wartime: the Dickin Medal, often called "the animals' Victoria Cross". Winkie was among the very first to receive it. Of the fifty-four medals awarded in the 1940s, thirty-two went to pigeons — more than to the dogs, the horses and the one ship's cat put together.

The last message-carrying military pigeons retired long ago, replaced by radios and satellites. But in Dundee you can still see Winkie herself, preserved in a museum — a small grey bird who once brought four men home from the sea.`;

const POEM_TIDE = `The Tide

The tide comes in, a great grey dog,
that lopes to shore through morning fog;
it lays its findings at my feet,
then shuffles back in slow retreat.

All afternoon it pads the bay
and begs the gulls to come and play;
it chews the cliffs with frothy jaws
and pats the rocks with salty paws.

But on the nights the storm winds roar
it hurls itself against the shore;
it snaps and snarls and spits out spray
and drags the fishing boats away.

Then, worn out by its wild night's run,
it lies down flat beneath the sun
and snores so softly you would swear
there'd never been a storm out there.`;

export const englishReading03NonfictionPoetry: Section = {
  id: 'english-reading-03-nonfiction-poetry',
  subject: 'english',
  pack: 'english-reading',
  number: 3,
  title: 'Non-fiction & poetry',
  lesson: `Not everything on the paper is a story. Two other kinds of text turn up, and each needs its own gear.

**Non-fiction** (information, reports, persuasion) is built from facts — so the questions test whether you can find them, use them, and tell them apart from opinions.
- **Fact or opinion? Use the could-you-check-it test.** "The medal was founded in 1943" — checkable, fact. "Pigeons were the most loveable war animals" — no way to check, opinion. Watch for opinion flags: *best, worst, beautiful, should*.
- **Purpose:** ask "why was this written — to inform, persuade, instruct or entertain?"

**Poems** pack their meaning tight. Read a poem TWICE: once for the picture, once for the tricks.
- **Stanza** = a poem's paragraph.
- **Rhyme scheme:** label each line-ending sound with a letter. Pairs that rhyme share a letter — *dog/fog, feet/retreat* is AABB.
- **Mood:** how does it FEEL — playful, sad, menacing? And does it change partway through? (Watch for a "but…")

**Show your working:** for fact-vs-opinion, underline the word that gives the opinion away.`,
  vocabulary: [
    { term: 'Fact', meaning: 'A statement you could check and prove — a date, a number, a name.' },
    { term: 'Opinion', meaning: 'What someone thinks or feels — it cannot be proved, only argued.' },
    { term: 'Stanza', meaning: "A group of lines in a poem — a poem's paragraph." },
    { term: 'Rhyme scheme', meaning: 'The pattern of rhymes at line ends, written as letters: AABB, ABAB.' },
    { term: 'Mood', meaning: 'The feeling a text gives off — playful, menacing, peaceful, sad.' },
    { term: 'Extended metaphor', meaning: 'One comparison kept running through a whole poem or paragraph.' },
  ],
  questions: [
    {
      id: 'english-reading-03-q1',
      sectionId: 'english-reading-03-nonfiction-poetry',
      type: 'mcq',
      passage: PASSAGE_WINKIE,
      prompt: 'What was Winkie?',
      choices: ['a carrier pigeon', 'a search plane', 'a ship\'s cat', 'a Royal Air Force bomber'],
      answer: 'a carrier pigeon',
      explanation: 'Retrieval from the first paragraph: "a carrier pigeon called Winkie". The other options all appear somewhere in the text — attached to other things.',
      difficulty: 1,
      source: '11+ English · Non-fiction',
    },
    {
      id: 'english-reading-03-q2',
      sectionId: 'english-reading-03-nonfiction-poetry',
      type: 'mcq',
      passage: PASSAGE_WINKIE,
      prompt: 'Roughly how far did Winkie fly to reach her home loft?',
      choices: [
        'more than a hundred and twenty miles',
        'about fifteen miles',
        'more than fifty miles an hour',
        'a quarter of a million miles',
      ],
      answer: 'more than a hundred and twenty miles',
      explanation: 'Retrieval: "across more than a hundred and twenty miles of open water". Careful — fifty is a SPEED, fifteen is the MINUTES the search took, and a quarter of a million counts pigeons. Non-fiction loves to scatter numbers.',
      difficulty: 1,
      source: '11+ English · Non-fiction',
    },
    {
      id: 'english-reading-03-q3',
      sectionId: 'english-reading-03-nonfiction-poetry',
      type: 'mcq',
      passage: PASSAGE_WINKIE,
      prompt: 'Why was Winkie the crew\'s "one hope left"?',
      choices: [
        'The radio was dead, so there was no other way to tell anyone where they were.',
        'She was the only one who could fly the plane.',
        'She was carrying their food supplies.',
        'The crew could not swim.',
      ],
      answer: 'The radio was dead, so there was no other way to tell anyone where they were.',
      explanation: 'Inference from the first paragraph: "The radio was dead… nobody back in Scotland knew where the crew were." Put those together and the pigeon is the only messenger left.',
      difficulty: 2,
      source: '11+ English · Non-fiction',
    },
    {
      id: 'english-reading-03-q4',
      sectionId: 'english-reading-03-nonfiction-poetry',
      type: 'mcq',
      passage: PASSAGE_WINKIE,
      prompt: 'What is the Dickin Medal often called?',
      choices: [
        "the animals' Victoria Cross",
        'the National Pigeon Service',
        "the pigeons' Olympic gold",
        'the Winkie Medal',
      ],
      answer: "the animals' Victoria Cross",
      explanation: 'Retrieval: the Dickin Medal is "often called \'the animals\' Victoria Cross\'" — the Victoria Cross being the highest human medal for bravery, which tells you how seriously these animals were taken.',
      difficulty: 1,
      source: '11+ English · Non-fiction',
    },
    {
      id: 'english-reading-03-q5',
      sectionId: 'english-reading-03-nonfiction-poetry',
      type: 'numeric',
      passage: PASSAGE_WINKIE,
      prompt: 'Of the fifty-four Dickin Medals awarded in the 1940s, how many went to pigeons?',
      answer: '32',
      acceptable: ['thirty-two', 'thirty two'],
      explanation: 'Retrieval: "thirty-two went to pigeons — more than to the dogs, the horses and the one ship\'s cat put together". The passage writes numbers as words; your answer can be digits.',
      difficulty: 2,
      source: '11+ English · Non-fiction',
    },
    {
      id: 'english-reading-03-q6',
      sectionId: 'english-reading-03-nonfiction-poetry',
      type: 'mcq',
      passage: PASSAGE_WINKIE,
      prompt: 'Which of these statements is an OPINION, not a fact?',
      choices: [
        'Pigeons were the most loveable of all the war animals.',
        'The Dickin Medal was founded in 1943.',
        'Winkie landed at a loft near Dundee.',
        'Britain kept around a quarter of a million war pigeons.',
      ],
      answer: 'Pigeons were the most loveable of all the war animals.',
      explanation: 'The could-you-check-it test: dates, places and counts can all be checked in records. "Most loveable" cannot be checked, only felt — the word "loveable" is the opinion flag.',
      difficulty: 2,
      source: '11+ English · Non-fiction',
    },
    {
      id: 'english-reading-03-q7',
      sectionId: 'english-reading-03-nonfiction-poetry',
      type: 'mcq',
      passage: PASSAGE_WINKIE,
      prompt: 'The passage says a carrier pigeon has a "remarkable homing instinct". What is a homing instinct?',
      choices: [
        'a natural, built-in ability to find the way back home',
        'a fear of being away from home',
        'a special radio fitted to the bird',
        'training that takes hundreds of miles of practice',
      ],
      answer: 'a natural, built-in ability to find the way back home',
      explanation: 'The text defines it right after the colon: "released somewhere it has never been before, it can still find its way back to its own loft". An INSTINCT is built in, not bolted on — which rules out the radio.',
      difficulty: 2,
      source: '11+ English · Non-fiction',
    },
    {
      id: 'english-reading-03-q8',
      sectionId: 'english-reading-03-nonfiction-poetry',
      type: 'mcq',
      passage: PASSAGE_WINKIE,
      prompt: 'What is the main purpose of this text?',
      choices: [
        'to inform the reader about how carrier pigeons helped in wartime',
        'to persuade the reader to keep pigeons as pets',
        'to teach the reader how to train a racing pigeon',
        'to tell a made-up adventure story about a magical bird',
      ],
      answer: 'to inform the reader about how carrier pigeons helped in wartime',
      explanation: 'It is packed with checkable facts — dates, distances, medal counts — and never asks you to do or buy anything. That is informing. (And Winkie is real: the story is true, not made up.)',
      difficulty: 3,
      source: '11+ English · Non-fiction',
    },
    {
      id: 'english-reading-03-q9',
      sectionId: 'english-reading-03-nonfiction-poetry',
      type: 'mcq',
      passage: PASSAGE_WINKIE,
      prompt: 'Winkie carried no message. How did she help the rescuers find the crew anyway?',
      choices: [
        'Her arrival time, the oil on her feathers and the wind direction let them calculate where the plane went down.',
        'She flew back out to sea and led the search plane to the wreck.',
        'She squawked the location in Morse code.',
        'The crew had written the location on her leg ring.',
      ],
      answer: 'Her arrival time, the oil on her feathers and the wind direction let them calculate where the plane went down.',
      explanation: 'Retrieval of a tricky detail: "From the time she arrived, the state of her feathers and the direction of the wind, the rescuers calculated roughly where the bomber must have gone down." The bird was the data, not the messenger.',
      difficulty: 3,
      source: '11+ English · Non-fiction',
      variantOf: 'english-reading-03-q3',
    },
    {
      id: 'english-reading-03-q10',
      sectionId: 'english-reading-03-nonfiction-poetry',
      type: 'mcq',
      passage: PASSAGE_WINKIE,
      prompt: 'Why does the writer BEGIN with Winkie\'s crash story rather than with the general facts about pigeons?',
      choices: [
        'A dramatic true story hooks the reader before the information arrives.',
        'The writer forgot to put the facts first.',
        'Stories must always be told in alphabetical order.',
        'The crash is the only part of the text that is true.',
      ],
      answer: 'A dramatic true story hooks the reader before the information arrives.',
      explanation: 'A structure question — why is the text built this way? Sinking plane, dead radio, one pigeon: by the end of paragraph two you WANT the explanation the rest of the text provides. Good non-fiction earns your attention first.',
      difficulty: 3,
      source: '11+ English · Non-fiction',
    },
    {
      id: 'english-reading-03-q11',
      sectionId: 'english-reading-03-nonfiction-poetry',
      type: 'mcq',
      passage: POEM_TIDE,
      prompt: 'Throughout the poem, what does the poet compare the tide to?',
      choices: ['a dog', 'a king', 'a fishing boat', 'a storm'],
      answer: 'a dog',
      explanation: 'The first line announces it — "a great grey dog" — and every stanza keeps it going: it lopes, pads, begs, snarls and snores. One comparison sustained through a whole poem is an EXTENDED metaphor.',
      difficulty: 1,
      source: '11+ English · Poetry',
    },
    {
      id: 'english-reading-03-q12',
      sectionId: 'english-reading-03-nonfiction-poetry',
      type: 'mcq',
      passage: POEM_TIDE,
      prompt: 'In the first stanza, what does the tide lay at the speaker\'s feet?',
      choices: [
        'its findings — things it has carried in from the sea',
        'a bone it has buried',
        "the speaker's lost shoes",
        'a fishing boat',
      ],
      answer: 'its findings — things it has carried in from the sea',
      explanation: 'Retrieval: "it lays its findings at my feet". Inside the dog picture, "findings" are what the tide fetches — driftwood, shells, whatever the sea carries in.',
      difficulty: 1,
      source: '11+ English · Poetry',
    },
    {
      id: 'english-reading-03-q13',
      sectionId: 'english-reading-03-nonfiction-poetry',
      type: 'mcq',
      passage: POEM_TIDE,
      prompt: 'Look at the line endings in any stanza (dog/fog, feet/retreat). What is the rhyme scheme?',
      choices: [
        'AABB — the lines rhyme in pairs',
        'ABAB — every other line rhymes',
        'ABCD — there is no rhyme',
        'AAAA — every line rhymes with every other',
      ],
      answer: 'AABB — the lines rhyme in pairs',
      explanation: 'Label the end sounds: dog (A), fog (A), feet (B), retreat (B). Neighbouring pairs rhyme, so the scheme is AABB. Check a second stanza to be sure the pattern holds — it does.',
      difficulty: 2,
      source: '11+ English · Poetry',
    },
    {
      id: 'english-reading-03-q14',
      sectionId: 'english-reading-03-nonfiction-poetry',
      type: 'mcq',
      passage: POEM_TIDE,
      prompt: '"It chews the cliffs with frothy jaws." What is REALLY happening in this line?',
      choices: [
        'Waves are foaming against the cliffs and slowly wearing them away.',
        'A dog is biting the rocks at the beach.',
        'The cliffs are falling into the sea all at once.',
        'Someone is digging into the cliff with a machine.',
      ],
      answer: 'Waves are foaming against the cliffs and slowly wearing them away.',
      explanation: 'Reading THROUGH a metaphor: the "frothy jaws" are the white foam of breaking waves, and "chewing" is the slow nibbling-away of the rock. The poem never stops being about the sea.',
      difficulty: 2,
      source: '11+ English · Poetry',
    },
    {
      id: 'english-reading-03-q15',
      sectionId: 'english-reading-03-nonfiction-poetry',
      type: 'mcq',
      passage: POEM_TIDE,
      prompt: 'Giving the tide a dog\'s behaviour all the way through the poem — padding, begging, snarling, snoring — is an example of…',
      choices: ['personification', 'onomatopoeia', 'a rhyme scheme', 'a fact'],
      answer: 'personification',
      explanation: 'The sea is given a living creature\'s behaviour — strictly, animal rather than human, but examiners file this under personification: treating a non-living thing as a living one. Kept up for the whole poem, it is also an extended metaphor.',
      difficulty: 2,
      source: '11+ English · Poetry',
    },
    {
      id: 'english-reading-03-q16',
      sectionId: 'english-reading-03-nonfiction-poetry',
      type: 'mcq',
      passage: POEM_TIDE,
      prompt: 'Which line uses ALLITERATION?',
      choices: [
        '"it snaps and snarls and spits out spray"',
        '"that lopes to shore through morning fog"',
        '"it lies down flat beneath the sun"',
        '"and drags the fishing boats away"',
      ],
      answer: '"it snaps and snarls and spits out spray"',
      explanation: 'Snaps, snarls, spits, spray — four spitting S-sounds in one line. Say it aloud: the alliteration makes the line itself hiss like an angry sea.',
      difficulty: 2,
      source: '11+ English · Poetry',
      variantOf: 'english-reading-03-q15',
    },
    {
      id: 'english-reading-03-q17',
      sectionId: 'english-reading-03-nonfiction-poetry',
      type: 'mcq',
      passage: POEM_TIDE,
      prompt: 'How does the mood of the poem change in the third stanza?',
      choices: [
        'from playful to violent and dangerous',
        'from sad to cheerful',
        'from frightening to funny',
        'it does not change at all',
      ],
      answer: 'from playful to violent and dangerous',
      explanation: 'Stanzas one and two are all games — fetching, begging, patting. Then comes the turn-word "But", and the verbs turn savage: hurls, snaps, snarls, drags. Mood questions are won by watching the verbs.',
      difficulty: 3,
      source: '11+ English · Poetry',
    },
    {
      id: 'english-reading-03-q18',
      sectionId: 'english-reading-03-nonfiction-poetry',
      type: 'mcq',
      passage: POEM_TIDE,
      prompt: 'According to the poem, what does the tide do to the fishing boats on stormy nights?',
      choices: ['drags them away', 'paints them grey', 'fills them with fish', 'lifts them onto the beach'],
      answer: 'drags them away',
      explanation: 'Retrieval: "and drags the fishing boats away". Even in a poem, some questions are simple finding — don\'t overthink the easy ones.',
      difficulty: 1,
      source: '11+ English · Poetry',
    },
    {
      id: 'english-reading-03-q19',
      sectionId: 'english-reading-03-nonfiction-poetry',
      type: 'mcq',
      passage: POEM_TIDE,
      prompt: 'The poem ends: it "snores so softly you would swear / there\'d never been a storm out there." What is the poet suggesting?',
      choices: [
        'The sea now looks too calm and innocent to believe it was ever dangerous.',
        'The storm is still going on.',
        'The speaker has fallen asleep on the beach.',
        'The sea makes a deafening snoring sound.',
      ],
      answer: 'The sea now looks too calm and innocent to believe it was ever dangerous.',
      explanation: 'Inference: "you would swear there\'d never been a storm" means the evidence has vanished — the dog looks innocent. After stanza three, the reader knows better: the calm is real, but so was the danger.',
      difficulty: 3,
      source: '11+ English · Poetry',
      variantOf: 'english-reading-03-q17',
    },
    {
      id: 'english-reading-03-q20',
      sectionId: 'english-reading-03-nonfiction-poetry',
      type: 'mcq',
      passage: POEM_TIDE,
      prompt: 'Why is "lopes" a good word for the tide coming in?',
      choices: [
        'It suggests an easy, unhurried, animal stride — matching both the dog picture and the slow, steady waves.',
        'It rhymes with "tide".',
        'It tells us the tide is moving dangerously fast.',
        'It is the only word the poet could fit in the line.',
      ],
      answer: 'It suggests an easy, unhurried, animal stride — matching both the dog picture and the slow, steady waves.',
      explanation: 'Word-choice questions in poems double-pay: "lopes" is how a big relaxed dog actually moves AND how a calm tide actually comes in — unhurried, steady, sure of itself. One word serving both halves of the metaphor is the craft.',
      difficulty: 3,
      source: '11+ English · Poetry',
    },
  ],
  examples: [
    {
      title: 'The could-you-check-it test',
      body: '"The medal was founded in 1943" — you could look that up, so it\'s a fact. "Pigeons were the bravest animals of the war" — no record book can settle "bravest", so it\'s an opinion. Words like best, worst, beautiful and should are opinion flags flying over a sentence.',
    },
    {
      title: 'Read a poem twice',
      body: 'First read: just get the picture (a tide behaving like a dog). Second read: hunt the tricks — label the rhymes with letters, circle the technique words, and watch for a "But" where the mood turns. One read is never enough for a poem; two short reads beat one squint.',
    },
  ],
  deeper: `Winkie is real — and so is the rest. She was stuffed after her death and you can visit her today in **The McManus museum in Dundee**, medal and all. The dinner held in her honour after the rescue reportedly made her the only pigeon ever to attend her own celebration banquet.

The "one ship's cat" in the medal count was **Simon of HMS Amethyst**, who kept a damaged warship's food stores safe from rats while wounded, and remains the only cat ever to win the Dickin Medal. The medal is still awarded — recent winners include search-and-rescue dogs who worked disaster sites.`,
};
