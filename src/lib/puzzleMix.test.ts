import { describe, it, expect } from 'vitest';
import { allSections } from '../data';
import { puzzleMix, weekNumber, isStretch, PUZZLE_MIX_SIZE } from './puzzleMix';

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const familyOf = (id: string, variantOf?: string) => variantOf ?? id;

describe('puzzle mix (weekly stretch set)', () => {
  it('draws only from the stretch tier, across at least three packs', () => {
    const mix = puzzleMix(allSections, 0);
    expect(mix.length).toBe(PUZZLE_MIX_SIZE);
    expect(mix.every(isStretch)).toBe(true);

    const packOf = new Map<string, string>();
    for (const s of allSections) for (const q of s.questions) packOf.set(q.id, s.pack);
    const packs = new Set(mix.map((q) => packOf.get(q.id)));
    expect(packs.size).toBeGreaterThanOrEqual(3);
  });

  it('leans easy — a majority is difficulty 1–2, so success stays high', () => {
    // Averaged over many weeks the mix should sit well below "all hard".
    let easy = 0;
    let total = 0;
    for (let w = 0; w < 30; w++) {
      const mix = puzzleMix(allSections, w * WEEK_MS);
      easy += mix.filter((q) => q.difficulty <= 2).length;
      total += mix.length;
    }
    expect(easy / total).toBeGreaterThan(0.7);
  });

  it('opens low-floor: questions are ordered easiest first', () => {
    const mix = puzzleMix(allSections, 3 * WEEK_MS);
    const diffs = mix.map((q) => q.difficulty);
    expect([...diffs].sort((a, b) => a - b)).toEqual(diffs);
  });

  it('never serves two questions from the same variant family', () => {
    for (let w = 0; w < 20; w++) {
      const mix = puzzleMix(allSections, w * WEEK_MS);
      const fams = mix.map((q) => familyOf(q.id, q.variantOf));
      expect(new Set(fams).size).toBe(fams.length);
    }
    expect(new Set(puzzleMix(allSections, 0).map((q) => q.id)).size).toBe(PUZZLE_MIX_SIZE);
  });

  it('is stable within a week and rotates between weeks', () => {
    const monday = 5 * WEEK_MS + 1000;
    const friday = 5 * WEEK_MS + 4 * 24 * 60 * 60 * 1000;
    const nextWeek = 6 * WEEK_MS + 1000;

    const ids = (t: number) => puzzleMix(allSections, t).map((q) => q.id);
    expect(ids(monday)).toEqual(ids(friday)); // same week → identical set
    expect(weekNumber(monday)).not.toBe(weekNumber(nextWeek));

    // Across a run of weeks the set genuinely changes (not a frozen list).
    const sets = Array.from({ length: 8 }, (_, w) => ids(w * WEEK_MS).join(','));
    expect(new Set(sets).size).toBeGreaterThan(1);
  });

  it('is a pure function of the week — same week, same order', () => {
    const t = 12 * WEEK_MS + 90_000;
    expect(puzzleMix(allSections, t).map((q) => q.id)).toEqual(
      puzzleMix(allSections, t).map((q) => q.id),
    );
  });
});
