import type { AttemptLog } from './storage';
import type { Question } from '../data/types';

/**
 * A question is in the "mistakes queue" if it has been answered wrong at least
 * once and hasn't yet been answered correctly twice in a row since then.
 * Returns the question IDs still on the hook.
 */
export function mistakesQueue(attempts: readonly AttemptLog[]): string[] {
  const lastWrongIndex = new Map<string, number>();
  const ids = new Set<string>();

  attempts.forEach((a, i) => {
    ids.add(a.id);
    if (!a.correct) lastWrongIndex.set(a.id, i);
  });

  const out: string[] = [];
  for (const id of ids) {
    const wrongIdx = lastWrongIndex.get(id);
    if (wrongIdx === undefined) continue;

    let consecutive = 0;
    for (let i = wrongIdx + 1; i < attempts.length; i++) {
      const a = attempts[i];
      if (a.id !== id) continue;
      if (a.correct) {
        consecutive += 1;
        if (consecutive >= 2) break;
      } else {
        consecutive = 0;
        break;
      }
    }
    if (consecutive < 2) out.push(id);
  }
  return out;
}

/**
 * The variant twins of a question: every other question that re-drills the
 * same skill, linked through `variantOf`. Covers all three positions in a
 * family — the question is a variant (twin = its original + siblings), the
 * question is an original (twins = its variants), or both. Mistakes mode
 * serves a twin for the second graduation answer so the child proves the
 * skill with fresh numbers instead of recalling a memorised answer.
 */
export function variantTwins(
  question: Question,
  all: readonly Question[],
): Question[] {
  const byId = new Map(all.map((q) => [q.id, q]));
  const root = rootOf(question, byId);
  return all.filter((q) => q.id !== question.id && rootOf(q, byId) === root);
}

/**
 * Follows `variantOf` links up to the original question's id. Tolerates
 * dangling links and cycles (a data error either way — the walk just stops),
 * so a bad link degrades to "no twins" rather than a hang or crash.
 */
function rootOf(q: Question, byId: Map<string, Question>): string {
  let cur = q;
  const seen = new Set([cur.id]);
  while (cur.variantOf) {
    const next = byId.get(cur.variantOf);
    if (!next || seen.has(next.id)) break;
    seen.add(next.id);
    cur = next;
  }
  return cur.id;
}
