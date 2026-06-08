import type { Question } from '../data/types';

export type Verdict = 'correct' | 'wrong' | null;

export function firstAnswer(a: string | string[]): string {
  return Array.isArray(a) ? a[0] : a;
}

export function formatPairsChosen(
  userPairs: Record<string, string>,
): string | undefined {
  const entries = Object.entries(userPairs);
  if (entries.length === 0) return undefined;
  return entries.map(([l, r]) => `${l} → ${r}`).join('; ');
}

/**
 * Canonical answer rendered for the kid in feedback panels and the Mistakes
 * list. For match/sequence the structured fields are the source of truth and
 * `question.answer` is empty; for NVR the answer is an option index.
 */
export function formatAnswer(question: Question): string {
  if (question.type === 'match' && question.pairs) {
    return question.pairs.map((p) => `${p.left} → ${p.right}`).join('; ');
  }
  if (question.type === 'sequence' && question.sequence) {
    return question.sequence.join(' → ');
  }
  if (question.type === 'nvr') {
    return `Shape ${String.fromCharCode(65 + Number(firstAnswer(question.answer)))}`;
  }
  return firstAnswer(question.answer);
}
