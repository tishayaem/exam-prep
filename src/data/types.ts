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
    | 'diamond'
    | 'flag'
    | 'boot';
  fill?: 'white' | 'black' | 'grey' | 'striped';
  rotation?: 0 | 45 | 90 | 135 | 180 | 225 | 270 | 315;
  size?: 'sm' | 'md' | 'lg';
  /** Number of small dots drawn inside the shape (0 = none). */
  dots?: number;
  /**
   * Flip the shape left-to-right before rotating. Only meaningful on chiral
   * shapes (flag, boot, arrow) — it lets reflection-vs-rotation traps, the
   * #1 NVR distractor, be authored. Mirror-symmetric shapes ignore it
   * visually.
   */
  mirrored?: boolean;
}

/**
 * Payload for a `type: 'nvr'` question. For `odd-one-out`, `stem` holds the
 * tappable figures and the answer index points into `stem`. For `series` /
 * `analogy` / `matrix`, `stem` is the question prompt (the sequence / pair /
 * grid) and `options` holds the tappable choices that the answer index points
 * into. The correct index is stored in `Question.answer` (as a string) so
 * grading and feedback reuse the shared machinery.
 *
 * `code` is the exception: it rides on a `type: 'mcq'` question (the choices
 * are letter-pair strings, graded as ordinary text), and the nvr payload is
 * render-only — `stem` holds the example figures with the LAST figure being
 * the one to encode, and `codes` labels every stem figure except that last
 * one.
 */
export interface NvrQuestion {
  kind: 'odd-one-out' | 'series' | 'analogy' | 'matrix' | 'code' | 'most-similar';
  stem: NvrFigure[];
  options?: NvrFigure[];
  /** Only for `kind: 'code'`: codes[i] labels stem[i]; stem's last figure is the unknown. */
  codes?: string[];
}

export interface Example {
  title: string;
  body: string;
}

export interface Question {
  id: string;
  sectionId: string;
  type: QuestionType;
  /**
   * Optional reading passage rendered as a quote block between the prompt and
   * the answer area — comprehension questions carry their text with them so
   * they stay self-contained in every mode (Quiz, Mock Test, Mistakes…).
   */
  passage?: string;
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
