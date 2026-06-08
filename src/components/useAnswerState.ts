import { useState } from 'react';
import { grade, gradeMatch, gradeNumeric, gradeSequence } from '../lib/grading';
import type { Question } from '../data/types';
import { firstAnswer, formatPairsChosen, type Verdict } from './answerFormat';

export interface AnswerState {
  input: string;
  setInput: (v: string) => void;
  userPairs: Record<string, string>;
  setUserPairs: (next: Record<string, string>) => void;
  userOrder: string[];
  setUserOrder: (next: string[]) => void;
  pickedIndex: number | null;
  verdict: Verdict;
  borderline: boolean;
  locked: boolean;
  /** Submit a typed / match / sequence / numeric answer. */
  submit: () => void;
  /** Pick an MCQ / true-false choice — resolves immediately. */
  handleChoice: (choice: string) => void;
  /** Pick an NVR figure by index — resolves immediately. */
  handleNvrChoice: (index: number) => void;
  /** Answer the borderline "did you mean?" self-grade. */
  resolveBorderline: (correct: boolean) => void;
  /** Clear all answer state for the next question (in-place flows like Quiz). */
  reset: () => void;
}

/**
 * Owns the input state and the grading decision for a single question, shared
 * by every mode (Quiz, Mock Test, Mistakes). It decides the verdict and calls
 * `onResolve(correct, chosen)`; the caller performs the side-effects (scoring,
 * recording the attempt, advancing). This is the single source of truth for how
 * an answer is graded — there is no per-mode copy.
 *
 * `question` may be undefined transiently (e.g. Quiz's result screen renders
 * after the last question); the handlers no-op in that case.
 */
export function useAnswerState(
  question: Question | undefined,
  onResolve: (correct: boolean, chosen?: string) => void,
): AnswerState {
  const [input, setInput] = useState('');
  const [userPairs, setUserPairs] = useState<Record<string, string>>({});
  const [userOrder, setUserOrder] = useState<string[]>([]);
  const [pickedIndex, setPickedIndex] = useState<number | null>(null);
  const [verdict, setVerdict] = useState<Verdict>(null);
  const [borderline, setBorderline] = useState(false);

  const locked = verdict !== null || borderline;

  function finalise(correct: boolean, chosen?: string) {
    setVerdict(correct ? 'correct' : 'wrong');
    setBorderline(false);
    onResolve(correct, chosen);
  }

  function handleChoice(choice: string) {
    if (!question || locked) return;
    setInput(choice);
    const canonical = firstAnswer(question.answer);
    finalise(choice.trim().toLowerCase() === canonical.trim().toLowerCase(), choice);
  }

  function handleNvrChoice(index: number) {
    if (!question || locked) return;
    setPickedIndex(index);
    const answerIndex = Number(firstAnswer(question.answer));
    finalise(index === answerIndex, `Shape ${String.fromCharCode(65 + index)}`);
  }

  function submit() {
    if (!question || locked) return;
    if (question.type === 'mcq' || question.type === 'truefalse') {
      handleChoice(input);
      return;
    }
    if (question.type === 'match' && question.pairs) {
      finalise(gradeMatch(userPairs, question.pairs), formatPairsChosen(userPairs));
      return;
    }
    if (question.type === 'sequence' && question.sequence) {
      finalise(
        gradeSequence(userOrder, question.sequence),
        userOrder.length > 0 ? userOrder.join(' → ') : undefined,
      );
      return;
    }
    const typed = input.trim() || undefined;
    if (question.type === 'numeric') {
      // Numbers are right or wrong — no borderline "did you mean?" step.
      finalise(gradeNumeric(input, question.answer, question.acceptable), typed);
      return;
    }
    const result = grade(input, question.answer, question.acceptable);
    if (result === 'borderline') {
      setBorderline(true);
      return;
    }
    finalise(result === 'correct', typed);
  }

  function resolveBorderline(correct: boolean) {
    finalise(correct, input.trim() || undefined);
  }

  function reset() {
    setInput('');
    setUserPairs({});
    setUserOrder([]);
    setPickedIndex(null);
    setVerdict(null);
    setBorderline(false);
  }

  return {
    input,
    setInput,
    userPairs,
    setUserPairs,
    userOrder,
    setUserOrder,
    pickedIndex,
    verdict,
    borderline,
    locked,
    submit,
    handleChoice,
    handleNvrChoice,
    resolveBorderline,
    reset,
  };
}
