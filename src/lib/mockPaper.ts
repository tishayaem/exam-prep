import { sample } from './shuffle';
import type { Question, QuestionType, Subject } from '../data/types';

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

/**
 * The four ISEB Common Pre-Test subjects with their verified 2025–26 subtest
 * timings (see the format scout in materials/11plus-research/
 * brighton-exam-intel.md). Subjects absent here (science) have no ISEB block.
 */
export const ISEB_MINUTES: Partial<Record<Subject, number>> = {
  english: 40,
  maths: 40,
  'non-verbal': 30,
  verbal: 25,
};

/** The CPT is answered by tapping — these are the app's tap-only types. */
const TAP_TYPES: ReadonlySet<QuestionType> = new Set(['mcq', 'truefalse', 'nvr']);

/** The slice of a subject pool that matches the on-screen CPT format. */
export function isebPool(pool: readonly Question[]): Question[] {
  return pool.filter((q) => TAP_TYPES.has(q.type));
}

/**
 * Assemble an ISEB-style block: tap-only questions at roughly CPT pacing
 * (~1.2 per minute — official per-subtest counts are unpublished, so the
 * clock, not the count, is the real boundary), ordered as a gentle
 * difficulty ramp (shuffled within bands, d1 → d2 → d3) to echo how the
 * adaptive test escalates on a child who keeps answering correctly.
 */
export function buildIsebBlock(
  pool: readonly Question[],
  minutes: number,
): Question[] {
  const candidates = isebPool(pool);
  const picked = sample(
    candidates,
    Math.min(candidates.length, Math.round(minutes * 1.2)),
  );
  const bands: Question[][] = [[], [], []];
  for (const q of picked) bands[q.difficulty - 1].push(q);
  return bands.flat();
}
