import type { ComponentType } from 'react';

export type Subject = 'science' | 'maths' | 'english';
export type Pack = 'plants' | 'earth-space-forces' | string;
export type QuestionType =
  | 'short'
  | 'mcq'
  | 'cloze'
  | 'truefalse'
  | 'match'
  | 'sequence';
export type Difficulty = 1 | 2 | 3;

export interface VocabularyTerm {
  term: string;
  meaning: string;
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
  source: string;
  variantOf?: string;
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
