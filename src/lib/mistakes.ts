import type { AttemptLog } from './storage';

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
