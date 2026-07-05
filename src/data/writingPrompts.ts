/**
 * The prompt bank for Writing practice. The app cannot mark prose — the real
 * writing happens on paper, timed, and gets read by a grown-up. What the app
 * supplies is everything around that: an exam-style prompt, the plan/write/
 * check clock, and a self-mark rubric matching what 11+ markers reward
 * (imagination, structure, accuracy — see materials/11plus-research/interview.md §8).
 *
 * Prompt kinds mirror the formats independent-school papers actually use:
 * a bare title, a given opening line, a theme, or a scene to write from.
 */
export type WritingPromptKind = 'title' | 'opening' | 'theme' | 'scene';

export interface WritingPrompt {
  id: string;
  kind: WritingPromptKind;
  /** The prompt itself, as it would appear on the paper. */
  text: string;
  /** One aiming question for the five-minute plan. */
  nudge: string;
}

export const KIND_LABEL: Record<WritingPromptKind, string> = {
  title: 'Story title',
  opening: 'First line — continue the story',
  theme: 'Theme',
  scene: 'Scene to write from',
};

export const writingPrompts: WritingPrompt[] = [
  // Titles
  {
    id: 'wp-title-1',
    kind: 'title',
    text: 'The Midnight Market',
    nudge: 'Who is shopping at midnight — and what do they buy that they shouldn\'t?',
  },
  {
    id: 'wp-title-2',
    kind: 'title',
    text: 'Left Behind',
    nudge: 'A person, a pet or a thing? Decide what is left behind — and whether it minds.',
  },
  {
    id: 'wp-title-3',
    kind: 'title',
    text: 'The Wrong Bus',
    nudge: 'Where was your character supposed to go — and where do they end up instead?',
  },
  {
    id: 'wp-title-4',
    kind: 'title',
    text: 'The Key I Should Not Have Turned',
    nudge: 'What does the key open? Decide the consequence before you write the first line.',
  },
  {
    id: 'wp-title-5',
    kind: 'title',
    text: 'Storm on Sports Day',
    nudge: 'Let the weather wreck the plan — and hand one character a chance to shine.',
  },

  // Opening lines
  {
    id: 'wp-opening-1',
    kind: 'opening',
    text: 'The lights went out, and somebody laughed.',
    nudge: 'Whose laugh? Decide whether your narrator knows them.',
  },
  {
    id: 'wp-opening-2',
    kind: 'opening',
    text: 'I had exactly one hour, and the church clock was already striking.',
    nudge: 'One hour to do WHAT? Make the deadline cost something.',
  },
  {
    id: 'wp-opening-3',
    kind: 'opening',
    text: 'Nobody believed me about the noise under the floor — until Tuesday.',
    nudge: 'What happened on Tuesday? Plan the ending first and work backwards.',
  },
  {
    id: 'wp-opening-4',
    kind: 'opening',
    text: 'The envelope had my name on it, but it was forty years old.',
    nudge: 'Who wrote it — and how can it possibly be addressed to you?',
  },
  {
    id: 'wp-opening-5',
    kind: 'opening',
    text: 'It was the smallest dragon anyone had ever seen.',
    nudge: 'Small is the gift: what can a tiny dragon do that a big one never could?',
  },

  // Themes
  {
    id: 'wp-theme-1',
    kind: 'theme',
    text: 'Write about a time someone was brave when nobody was watching.',
    nudge: 'Quiet bravery: decide what doing the right thing costs your character.',
  },
  {
    id: 'wp-theme-2',
    kind: 'theme',
    text: 'A story that begins in rain and ends in sunshine.',
    nudge: 'Let the weather match the feelings — plan the turn in the middle.',
  },
  {
    id: 'wp-theme-3',
    kind: 'theme',
    text: 'Write about losing something small that mattered enormously.',
    nudge: 'Why did it matter? The reader must feel the size of the small thing.',
  },
  {
    id: 'wp-theme-4',
    kind: 'theme',
    text: 'Write about a promise that was hard to keep.',
    nudge: 'Who made the promise, to whom — and what makes keeping it hurt?',
  },

  // Scenes
  {
    id: 'wp-scene-1',
    kind: 'scene',
    text: 'An empty fairground at dawn — one ride is still turning.',
    nudge: 'Who switched it on? Describe the sounds before you reveal anyone.',
  },
  {
    id: 'wp-scene-2',
    kind: 'scene',
    text: 'A classroom where every desk is covered in a thin layer of sand.',
    nudge: 'Start with the door opening. Let the reader spot the sand when your character does.',
  },
  {
    id: 'wp-scene-3',
    kind: 'scene',
    text: 'A lighthouse kitchen during the worst storm for fifty years.',
    nudge: 'Two characters, one disagreement, waves like fists on the windows.',
  },
  {
    id: 'wp-scene-4',
    kind: 'scene',
    text: 'The last train of the night — and one passenger who never blinks.',
    nudge: 'Keep it small: one carriage, one mile, one decision.',
  },
];

/**
 * The five-minute plan: the story mountain, one line per beat — plus the
 * magnifying-glass rule from the mark-scheme research: mid-band scripts race
 * through a whole adventure; top-band scripts spend all their words on about
 * three minutes of time, shown in close-up.
 */
export const PLAN_BEATS: { beat: string; hint: string }[] = [
  { beat: 'Zoom in', hint: 'Pick about THREE MINUTES of story and put them under a magnifying glass. A whole adventure summarised scores in the middle; three minutes shown in close-up scores at the top.' },
  { beat: 'Opening', hint: 'Drop us in — an action, a sound or a question. Never the alarm clock.' },
  { beat: 'Build-up', hint: 'Life as usual… with one wobble the reader can feel coming.' },
  { beat: 'Problem', hint: 'The peak of the mountain. The bridge snaps; the secret gets out.' },
  { beat: 'Ending', hint: 'Decide it NOW, before you write a word. Never "it was all a dream" — markers rank weak endings as the #1 mark-loser.' },
];

/**
 * The five-minute polish, in priority order — built from the ranked
 * mark-loser list in the research (endings, paragraphs, homophones,
 * rambling sentences, misapplied vocabulary).
 */
export const CHECK_STEPS: string[] = [
  'Capitals and full stops — every sentence, no exceptions.',
  'Homophone hunt: there/their, to/too/two, your/you\'re — then your three trickiest spellings.',
  'Paragraph check — TiToP-P: new paragraph at every change of Time, Topic, Person or Place.',
  'Chop your longest rambling sentence in two, and upgrade one boring verb (said → muttered?).',
  'Re-read the ending. Does it land on purpose — no fizzle, no waking up from a dream?',
];

/**
 * Self-mark rubric, ticked with a grown-up after writing. The five groups ARE
 * the five domains of the published CSSE Continuous Writing mark scheme
 * (Ideas / Vocabulary incl. spelling / Grammar / Structure / Punctuation),
 * with the top-band descriptors folded in from Dulwich's 20-mark rubric
 * (sensory language, sentence variety, paragraphing FOR EFFECT) and KCS
 * Wimbledon's (psychological depth over physical description). See
 * materials/11plus-research/brighton-exam-intel.md §3 + Gemini section.
 */
export type RubricGroup = 'Ideas' | 'Vocabulary' | 'Grammar' | 'Structure' | 'Punctuation';

export interface RubricItem {
  id: string;
  group: RubricGroup;
  label: string;
}

export const RUBRIC: RubricItem[] = [
  // Ideas — CSSE Band 4: "clear and original writing"; KCS: psychological depth;
  // the magnifying-glass rule separates top from middle.
  { id: 'r-hook', group: 'Ideas', label: 'My opening line is crafted — it would make a stranger read on.' },
  { id: 'r-original', group: 'Ideas', label: 'There is one idea or image in here only I would have thought of.' },
  { id: 'r-magnify', group: 'Ideas', label: 'I zoomed in on a few minutes of story — I didn\'t race through a whole adventure.' },
  { id: 'r-depth', group: 'Ideas', label: 'My character feels a MIX of feelings (excited AND nervous), shown through what they do.' },
  // Vocabulary — CSSE: "ambitious vocabulary used appropriately"; the trap is
  // thesaurus-stuffing, which markers are actively alert to.
  { id: 'r-ambitious', group: 'Vocabulary', label: 'My ambitious words genuinely fit — nothing stuffed in from a thesaurus.' },
  { id: 'r-senses', group: 'Vocabulary', label: 'I gave the reader more than sights — a sound, a smell or a texture too.' },
  { id: 'r-spelling', group: 'Vocabulary', label: 'Homophones (there/their, to/too) and my trickiest spellings are checked.' },
  // Grammar — steady tense and controlled sentences; rambling run-ons are a
  // top-five mark-loser.
  { id: 'r-tense', group: 'Grammar', label: 'My tense stays steady — past stays past, all the way through.' },
  { id: 'r-variety', group: 'Grammar', label: 'My sentences vary on purpose — a short one lands between long ones.' },
  // Structure — CSSE: "securely structured, with a clear sense of direction";
  // Dulwich top band: paragraphing used FOR EFFECT.
  { id: 'r-arc', group: 'Structure', label: 'It has a controlled arc: build-up, problem, resolution — not a list of events.' },
  { id: 'r-titopp', group: 'Structure', label: 'New paragraph at every change of Time, Topic, Person or Place (TiToP-P).' },
  { id: 'r-effect', group: 'Structure', label: 'One paragraph works FOR EFFECT — like a one-line paragraph landing a shock.' },
  { id: 'r-ending', group: 'Structure', label: 'The ending was planned, and lands on purpose — no fizzle, no "all a dream".' },
  // Punctuation — CSSE Band 4: "punctuation varied and used creatively".
  { id: 'r-basics', group: 'Punctuation', label: 'Capitals and full stops — every sentence, no exceptions.' },
  { id: 'r-punch', group: 'Punctuation', label: 'I used one piece of punctuation for effect — a dash, a colon, or a well-placed question.' },
];
