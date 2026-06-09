import { sample } from './shuffle';
import type { Question } from '../data/types';

/**
 * Assemble a mock-test paper from a subject's pool. Plain papers are a
 * straight random sample. With `numeracyOpeners`, the paper mirrors the ISEB
 * written maths structure (see materials/11plus-research/maths.md): it opens
 * with that many quick difficulty-1 numeric questions — the real paper's
 * "first 8" where the answer alone scores — before the worded ones. If the
 * pool holds fewer openers (or fewer questions) than asked, the paper simply
 * comes back shorter rather than padding with duplicates.
 */
export function buildMockPaper(
  pool: readonly Question[],
  count: number,
  opts: { numeracyOpeners?: number } = {},
): Question[] {
  const openersWanted = opts.numeracyOpeners ?? 0;
  const openerPool = pool.filter(
    (q) => q.type === 'numeric' && q.difficulty === 1,
  );
  const openers = sample(openerPool, Math.min(openersWanted, openerPool.length));

  const taken = new Set(openers.map((q) => q.id));
  const rest = sample(
    pool.filter((q) => !taken.has(q.id)),
    Math.max(0, count - openers.length),
  );
  return [...openers, ...rest];
}
