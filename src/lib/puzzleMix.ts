import type { Question, Section } from '../data/types';

/**
 * The weekly "Puzzle Mix" (ROADMAP §7 serving rule). A low-floor / high-ceiling
 * set drawn across the stretch packs — Puzzle Lab (maths), Word Lab (verbal)
 * and the cube-counting spatial section. Two goals from the research:
 *
 *  1. **~80–85% success**, tuned by *selection* not by easing items: the mix
 *     leans on difficulty-1/2 items with a minority of difficulty-3 so a ten-
 *     year-old clears most of it and meets a couple of genuine stretches.
 *  2. **No streak pressure**, curiosity-first — so this is a fixed set that
 *     rotates once a week rather than an endless adaptive drill.
 *
 * The pick is deterministic per ISO-ish week (seeded RNG keyed on the week
 * number), so the set is stable all week and refreshes on its own — no state
 * to store, and every device shows the same mix.
 */

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
export const PUZZLE_MIX_SIZE = 9;

/** Whole weeks since the Unix epoch — the seed that rotates the set weekly. */
export function weekNumber(now: number): number {
  return Math.floor(now / WEEK_MS);
}

/** A question belongs to the stretch tier iff it carries hardness-driver tags
 *  (the `drivers` field is stretch-only by contract — see types.ts). */
export function isStretch(q: Question): boolean {
  return (q.drivers?.length ?? 0) > 0;
}

/** Deterministic PRNG (mulberry32) so a week's mix is reproducible. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle<T>(arr: readonly T[], rand: () => number): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Re-order a list so consecutive items come from different packs where
 *  possible — keeps the mix visibly varied (a maths puzzle, then a word one…). */
function spreadByPack(qs: Question[], packOf: Map<string, string>): Question[] {
  const groups = new Map<string, Question[]>();
  for (const q of qs) {
    const pack = packOf.get(q.id) ?? '';
    (groups.get(pack) ?? groups.set(pack, []).get(pack)!).push(q);
  }
  const lists = [...groups.values()];
  const out: Question[] = [];
  let i = 0;
  while (out.length < qs.length) {
    const list = lists[i % lists.length];
    if (list.length) out.push(list.shift()!);
    i++;
    if (lists.every((l) => l.length === 0)) break;
  }
  return out;
}

/**
 * This week's puzzle mix: `size` stretch questions, biased toward the easier
 * end, spread across packs, no two from the same `variantOf` family, ordered
 * low-floor → high-ceiling (easy first, the hardest last).
 */
export function puzzleMix(
  sections: readonly Section[],
  now: number = Date.now(),
  size: number = PUZZLE_MIX_SIZE,
): Question[] {
  const packOf = new Map<string, string>();
  const pool: Question[] = [];
  for (const s of sections) {
    for (const q of s.questions) {
      if (!isStretch(q)) continue;
      packOf.set(q.id, s.pack);
      pool.push(q);
    }
  }
  if (pool.length === 0) return [];

  const rand = mulberry32((weekNumber(now) + 1) * 0x9e3779b1);
  const shuffled = seededShuffle(pool, rand);

  // Difficulty quotas — an easy majority keeps success in the target band.
  const d3 = Math.round(size * 0.22);
  const d1 = Math.round(size * 0.34);
  const d2 = Math.max(0, size - d1 - d3);
  const quota: Record<number, number> = { 1: d1, 2: d2, 3: d3 };

  const byDiff: Record<number, Question[]> = { 1: [], 2: [], 3: [] };
  for (const q of shuffled) byDiff[q.difficulty]?.push(q);
  for (const d of [1, 2, 3]) byDiff[d] = spreadByPack(byDiff[d], packOf);

  const out: Question[] = [];
  const usedFamily = new Set<string>();
  const familyOf = (q: Question) => q.variantOf ?? q.id;

  const take = (list: Question[], n: number) => {
    let taken = 0;
    for (const q of list) {
      if (taken >= n) break;
      const fam = familyOf(q);
      if (usedFamily.has(fam)) continue;
      usedFamily.add(fam);
      out.push(q);
      taken++;
    }
  };

  for (const d of [1, 2, 3]) take(byDiff[d], quota[d]);

  // If dedup/thin buckets left us short, top up from everything that's left,
  // easiest first, still one-per-family.
  if (out.length < size) {
    const leftover = spreadByPack(
      [...byDiff[1], ...byDiff[2], ...byDiff[3]].filter((q) => !usedFamily.has(familyOf(q))),
      packOf,
    ).sort((a, b) => a.difficulty - b.difficulty);
    take(leftover, size - out.length);
  }

  return out.sort((a, b) => a.difficulty - b.difficulty);
}
