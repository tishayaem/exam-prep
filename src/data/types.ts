import type { ComponentType } from 'react';

export type Subject = 'science' | 'maths' | 'english' | 'non-verbal' | 'verbal';
export type Pack = 'plants' | 'earth-space-forces' | string;
export type QuestionType =
  | 'short'
  | 'mcq'
  | 'cloze'
  | 'truefalse'
  | 'match'
  | 'sequence'
  | 'numeric'
  | 'nvr';
export type Difficulty = 1 | 2 | 3;

export interface VocabularyTerm {
  term: string;
  meaning: string;
}

/**
 * A single non-verbal-reasoning figure, described declaratively so one
 * `<NvrFigure>` renderer can draw any of them. The attributes are exactly the
 * axes GL examiners vary: shape, shading, rotation, size and count.
 */
export interface NvrFigure {
  shape:
    | 'circle'
    | 'square'
    | 'triangle'
    | 'pentagon'
    | 'hexagon'
    | 'star'
    | 'arrow'
    | 'diamond';
  fill?: 'white' | 'black' | 'grey' | 'striped';
  rotation?: 0 | 45 | 90 | 135 | 180 | 225 | 270 | 315;
  size?: 'sm' | 'md' | 'lg';
  /** Number of small dots drawn inside the shape (0 = none). */
  dots?: number;
}

/**
 * Payload for a `type: 'nvr'` question. For `odd-one-out`, `stem` holds the
 * tappable figures and the answer index points into `stem`. For the others,
 * `stem` is the question prompt (the sequence / pair / grid) and `options`
 * holds the tappable choices that the answer index points into. The correct
 * index is stored in `Question.answer` (as a string) so grading and feedback
 * reuse the shared machinery.
 */
export interface NvrQuestion {
  kind: 'odd-one-out' | 'series' | 'analogy' | 'matrix';
  stem: NvrFigure[];
  options?: NvrFigure[];
}

export interface Example {
  title: string;
  body: string;
}

export interface Question {
  id: string;
  sectionId: string;
  type: QuestionType;
  prompt: string;
  answer: string | string[];
  acceptable?: string[];
  choices?: string[];
  pairs?: { left: string; right: string }[];
  sequence?: string[];
  hint?: string;
  explanation: string;
  difficulty: Difficulty;
  reasoning?: boolean;
  /**
   * Render a tappable A–Z strip above the answer area — the on-screen version
   * of the exam technique of writing the alphabet out before counting steps.
   * Set on letter-series/code questions.
   */
  letterStrip?: boolean;
  source: string;
  variantOf?: string;
  /** Present only for `type: 'nvr'` — the figures to render. */
  nvr?: NvrQuestion;
}

export interface Section {
  id: string;
  subject: Subject;
  pack: Pack;
  number: number;
  title: string;
  lesson: string;
  vocabulary: VocabularyTerm[];
  questions: Question[];
  /**
   * Real-world examples, analogies, fun facts, or "try this" prompts that
   * bring the lesson to life. Rendered as cards between Lesson and Vocabulary
   * in Study mode. Never used for grading.
   */
  examples?: Example[];
  /**
   * Optional inline React SVG component rendered between Lesson and Examples.
   * Hand-coded per section in src/diagrams/<section-id>.tsx so labels and
   * colours stay in the editorial palette.
   */
  diagram?: ComponentType;
  /**
   * Optional "Want to know more?" extension content rendered in Study mode only.
   * Never used for grading or quizzes — extras are for curiosity, not testing.
   */
  deeper?: string;
}
