import { describe, it, expect } from 'vitest';
import { allSections } from '../data';
import { STRETCH_PACK_SLUGS } from '../data/packs';
import type { ProgressState } from './storage';
import {
  PUZZLE_MIX_SIZE,
  buildPuzzleMix,
  formBand,
  stretchAccuracy,
  stretchPool,
  weekKey,
} from './puzzleMix';

const emptyState: ProgressState = {
  box: {},
  attempts: [],
  xp: 0,
  streak: { count: 0, lastDay: null },
};

/** A state whose last `n` stretch attempts hit the given accuracy. */
function stateWithForm(correctOf: number, outOf: number, ts = Date.now()): ProgressState {
  const pool = stretchPool(allSections);
  const attempts = pool.slice(0, outOf).map((q, i) => ({
    id: q.id,
    correct: i < correctOf,
    ts,
  }));
  return { ...emptyState, attempts };
}

// A fixed mid-week date (Friday 12 June 2026, ISO week 24).
const FRIDAY = new Date(2026, 5, 12);

describe('weekKey', () => {
  it('computes ISO weeks, including the awkward year boundaries', () => {
    expect(weekKey(new Date(2026, 5, 8))).toBe('2026-W24'); // Monday
    expect(weekKey(new Date(2026, 5, 12))).toBe('2026-W24'); // Friday, same week
    expect(weekKey(new Date(2026, 5, 14))).toBe('2026-W24'); // Sunday, still same week
    expect(weekKey(new Date(2026, 5, 15))).toBe('2026-W25'); // next Monday rolls over
    expect(weekKey(new Date(2026, 0, 1))).toBe('2026-W01'); // 1 Jan 2026 is a Thursday
    expect(weekKey(new Date(2027, 0, 1))).toBe('2026-W53'); // 1 Jan 2027 belongs to 2026's last week
  });
});

describe('form reading', () => {
  it('needs history before it reads anything', () => {
    expect(stretchAccuracy([], stretchPool(allSections))).toBeNull();
    expect(formBand(null)).toBe('first-week');
  });

  it('maps accuracy to the research bands', () => {
    expect(formBand(0.9)).toBe('cruising');
    expect(formBand(0.85)).toBe('cruising');
    expect(formBand(0.8)).toBe('in-band');
    expect(formBand(0.7)).toBe('in-band');
    expect(formBand(0.5)).toBe('rebuilding');
  });

  it('only counts attempts on stretch questions', () => {
    const noise = Array.from({ length: 30 }, (_, i) => ({
      id: `not-a-stretch-question-${i}`,
      correct: false,
      ts: Date.now(),
    }));
    expect(stretchAccuracy(noise, stretchPool(allSections))).toBeNull();
  });
});

describe('buildPuzzleMix', () => {
  it('serves a full mix of stretch questions, easiest first', () => {
    const mix = buildPuzzleMix(allSections, emptyState, FRIDAY);
    expect(mix.week).toBe('2026-W24');
    expect(mix.band).toBe('first-week');
    expect(mix.questions).toHaveLength(PUZZLE_MIX_SIZE);
    const packs = new Map(allSections.map((s) => [s.id, s.pack]));
    for (const q of mix.questions) {
      expect(STRETCH_PACK_SLUGS.has(packs.get(q.sectionId)!), q.id).toBe(true);
      expect(q.reasoning, q.id).toBe(true);
      expect(q.drivers?.length, q.id).toBeGreaterThan(0);
    }
    const difficulties = mix.questions.map((q) => q.difficulty);
    expect(difficulties).toEqual([...difficulties].sort((a, b) => a - b));
  });

  it('is deterministic within a week and changes across weeks', () => {
    const a = buildPuzzleMix(allSections, emptyState, new Date(2026, 5, 8));
    const b = buildPuzzleMix(allSections, emptyState, new Date(2026, 5, 14));
    expect(b.questions.map((q) => q.id)).toEqual(a.questions.map((q) => q.id));

    const nextWeek = buildPuzzleMix(allSections, emptyState, new Date(2026, 5, 15));
    expect(nextWeek.questions.map((q) => q.id)).not.toEqual(
      a.questions.map((q) => q.id),
    );
  });

  it('spreads across packs and caps each section at two', () => {
    const mix = buildPuzzleMix(allSections, emptyState, FRIDAY);
    const packs = new Map(allSections.map((s) => [s.id, s.pack]));
    const packsUsed = new Set(mix.questions.map((q) => packs.get(q.sectionId)));
    expect(packsUsed.size).toBeGreaterThanOrEqual(3);

    const perSection = new Map<string, number>();
    for (const q of mix.questions) {
      perSection.set(q.sectionId, (perSection.get(q.sectionId) ?? 0) + 1);
    }
    for (const [sectionId, count] of perSection) {
      expect(count, sectionId).toBeLessThanOrEqual(2);
    }
  });

  it('selects harder mixes for a cruising child and softer for a struggling one', () => {
    const count = (band: ProgressState, d: number) =>
      buildPuzzleMix(allSections, band, FRIDAY).questions.filter(
        (q) => q.difficulty === d,
      ).length;

    const cruising = stateWithForm(19, 20);
    const rebuilding = stateWithForm(8, 20);
    expect(buildPuzzleMix(allSections, cruising, FRIDAY).band).toBe('cruising');
    expect(buildPuzzleMix(allSections, rebuilding, FRIDAY).band).toBe('rebuilding');
    expect(count(cruising, 3)).toBe(4);
    expect(count(cruising, 1)).toBe(2);
    expect(count(rebuilding, 3)).toBe(1);
    expect(count(rebuilding, 1)).toBe(5);
  });

  it('rests puzzles beaten in the last fortnight', () => {
    const base = buildPuzzleMix(allSections, emptyState, FRIDAY);
    const beaten: ProgressState = {
      ...emptyState,
      attempts: base.questions.map((q) => ({
        id: q.id,
        correct: true,
        ts: FRIDAY.getTime() - 2 * 86_400_000,
      })),
    };
    const next = buildPuzzleMix(allSections, beaten, FRIDAY);
    const beatenIds = new Set(base.questions.map((q) => q.id));
    expect(next.questions.some((q) => beatenIds.has(q.id))).toBe(false);
  });
});
