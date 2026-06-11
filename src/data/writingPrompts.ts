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
  'Hunt down your three trickiest spellings and check each one.',
  'Upgrade one boring verb (said → muttered? walked → trudged?).',
  'Read it in your head. Does every sentence actually finish?',
];

/**
 * Self-mark rubric, ticked with a grown-up after writing. Groups mirror the
 * published marking criteria: imagination, structure/cohesion, sentence
 * craft, and technical accuracy.
 */
export type RubricGroup = 'Ideas' | 'Structure' | 'Style' | 'Accuracy';

export interface RubricItem {
  id: string;
  group: RubricGroup;
  label: string;
}

export const RUBRIC: RubricItem[] = [
  { id: 'r-hook', group: 'Ideas', label: 'My opening would make a stranger want to read on.' },
  { id: 'r-original', group: 'Ideas', label: 'There is one idea in here only I would have thought of.' },
  { id: 'r-mountain', group: 'Structure', label: 'It has the mountain shape: build-up, problem, resolution, ending.' },
  { id: 'r-paragraphs', group: 'Structure', label: 'Paragraphs change when the time, place or speaker changes.' },
  { id: 'r-ending', group: 'Structure', label: 'The ending lands on purpose — it doesn\'t just stop.' },
  { id: 'r-show', group: 'Style', label: 'I showed a feeling through actions instead of naming it.' },
  { id: 'r-technique', group: 'Style', label: 'I used one simile or metaphor on purpose.' },
  { id: 'r-variety', group: 'Style', label: 'My sentences vary — a short one lands between long ones.' },
  { id: 'r-accuracy', group: 'Accuracy', label: 'Capitals, full stops and my trickiest spellings are checked.' },
  { id: 'r-aloud', group: 'Accuracy', label: 'I read it aloud and it sounds like me.' },
];
