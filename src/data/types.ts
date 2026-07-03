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

/**
 * Stretch-tier tag: which hardness driver(s) a Puzzle Lab item trains, per
 * the hard-tail analysis in materials/11plus-research/stretch-problems.md —
 * multi-step depth, unfamiliar/invented context, planted distractor
 * information, heavy reading load, or justify-the-method. Read by nothing
 * yet; authored now so the stretch serving rule can filter on it later.
 */
export type HardnessDriver =
  | 'multi-step'
  | 'unfamiliar'
  | 'distractor'
  | 'reading-load'
  | 'justify';

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

/**
 * An isometric stack of unit cubes, described as a heightmap. `heights[r][c]`
 * is the number of cubes stacked on floor cell (row `r`, counted from the back,
 * column `c`, counted from the left); `0` is an empty column. One `<CubeStack>`
 * renderer draws it as a single isometric picture — the live on-screen ISEB
 * "how many cubes" NVR type. The stack always sits on the floor (no floating
 * cubes), so the total count is simply the sum of every height, hidden support
 * cubes included — which is exactly the skill the picture trains.
 */
export interface CubeStackFigure {
  /** Row-major grid of column heights, back row first. Rows may differ in length. */
  heights: number[][];
}

/** The face symbols a cube-net question can carry — one per face, all distinct. */
export type NetSymbol = 'star' | 'moon' | 'circle' | 'square' | 'triangle' | 'heart';

/**
 * A flat cube net (or an impostor that only looks like one), described as a
 * grid. `cells[r][c]` is a face carrying a symbol, `'blank'` for a face with
 * no symbol (validity questions), or `null` where the grid is empty. One
 * `<CubeNet>` renderer draws it as outlined squares with the symbols inside.
 * Render-only, like `cubes`: the question itself stays mcq/truefalse/numeric
 * and grading is unchanged. The answer to every opposite-face and
 * does-it-fold question is derivable from the grid alone by folding it, which
 * is exactly what nvr-answers.test.ts does to re-check the stored answers.
 */
export interface CubeNetFigure {
  /** Row-major grid of faces; rows may differ in length. */
  cells: (NetSymbol | 'blank' | null)[][];
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
  /** Stretch-tier only: the hardness driver(s) this puzzle trains. */
  drivers?: HardnessDriver[];
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
  /**
   * A "how many cubes" isometric stack rendered above the answer area. The
   * question itself stays `numeric` (type the count) or `mcq` — grading is
   * unchanged; `cubes` is render-only.
   */
  cubes?: CubeStackFigure;
  /**
   * A flat cube net rendered above the answer area (fold-a-net questions).
   * Render-only, same contract as `cubes`.
   */
  net?: CubeNetFigure;
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
