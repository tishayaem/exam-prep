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

/** The five-minute plan: the story mountain, one line per beat. */
export const PLAN_BEATS: { beat: string; hint: string }[] = [
  { beat: 'Opening', hint: 'Drop us in — an action, a sound or a question. Never the alarm clock.' },
  { beat: 'Build-up', hint: 'Life as usual… with one wobble the reader can feel coming.' },
  { beat: 'Problem', hint: 'The peak of the mountain. The bridge snaps; the secret gets out.' },
  { beat: 'Resolution', hint: 'How it is faced and fixed — or bravely not fixed.' },
  { beat: 'Ending', hint: 'Land it on purpose. An echo of the opening always works.' },
];

/** The five-minute polish, in priority order. */
export const CHECK_STEPS: string[] = [
  'Capitals and full stops — every sentence, no exceptions.',
  'Paragraph patrol: every change of Time, Topic, Person or Place gets a new paragraph. Missed one? Mark it with // — markers accept it.',
  'Hunt down your three trickiest spellings and check each one.',
  'Upgrade one boring verb (said → muttered? walked → trudged?).',
  'Read it in your head. Does every sentence finish — and does the tense stay put?',
];

/**
 * Self-mark rubric, ticked with a grown-up after writing. The five groups
 * ARE the five domains of the published CSSE continuous-writing mark scheme
 * (Ideas / Vocabulary / Grammar / Structure / Punctuation — the best public
 * proxy for Brighton's unpublished rubric), and the individual ticks are the
 * top-band descriptors translated into kid: CSSE Band 4 ("ambitious
 * vocabulary used appropriately", "clear sense of direction", "punctuation
 * varied and used creatively"), the Dulwich 17–20 band (sensory language,
 * sentence variety, paragraphing FOR EFFECT), the KCS "psychological depth"
 * criterion, and the magnifying-glass technique. See
 * materials/11plus-research/brighton-exam-intel.md §3 + the Gemini section.
 */
export type RubricGroup =
  | 'Ideas'
  | 'Vocabulary'
  | 'Grammar'
  | 'Structure'
  | 'Punctuation';

export interface RubricItem {
  id: string;
  group: RubricGroup;
  label: string;
}

export const RUBRIC: RubricItem[] = [
  // Ideas — CSSE "clear and original"; KCS psychological depth; the
  // magnifying glass (top scripts describe ~three minutes, not a plot tour).
  { id: 'r-magnify', group: 'Ideas', label: 'I zoomed in on about three minutes of story, instead of racing through a whole adventure.' },
  { id: 'r-feelings', group: 'Ideas', label: 'My character\'s feelings are in there — and they\'re mixed, like real ones (excited AND nervous).' },
  { id: 'r-original', group: 'Ideas', label: 'There\'s one detail only I would have noticed — not a line learned off by heart.' },
  // Vocabulary — CSSE Band 4 "ambitious vocabulary used appropriately"
  // (Band 2 is "ambitious words misapplied"); Dulwich sensory language.
  { id: 'r-ambitious', group: 'Vocabulary', label: 'Every ambitious word is there because it FITS — none are showing off.' },
  { id: 'r-senses', group: 'Vocabulary', label: 'I used at least two senses that aren\'t seeing: sound, touch, smell or taste.' },
  // Grammar — Dulwich "wide variety of sentence structures".
  { id: 'r-variety', group: 'Grammar', label: 'My sentences change shape and length — a short one lands hard after a long one.' },
  { id: 'r-openers', group: 'Grammar', label: 'My sentences don\'t all start the same way — some open with where, when or how.' },
  // Structure — CSSE "securely structured, clear sense of direction";
  // TiToP-P; Dulwich paragraphing for effect.
  { id: 'r-direction', group: 'Structure', label: 'The story knows where it\'s going — I decided the ending before I wrote the opening.' },
  { id: 'r-titopp', group: 'Structure', label: 'New paragraph at every change of Time, Topic, Person or Place (Ti-To-P-P).' },
  { id: 'r-effect', group: 'Structure', label: 'One paragraph works FOR EFFECT — like a single short line that makes a moment land.' },
  // Punctuation — CSSE "varied and used creatively" (accuracy first).
  { id: 'r-stops', group: 'Punctuation', label: 'Capitals and full stops in every single sentence — checked, not hoped.' },
  { id: 'r-punct-range', group: 'Punctuation', label: 'I used more than full stops: a question mark, dash, colon or ellipsis — each on purpose.' },
];
