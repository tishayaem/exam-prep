import type { Difficulty, Question, Section } from '../data/types';
import { STRETCH_PACK_SLUGS } from '../data/packs';
import type { AttemptLog, ProgressState } from './storage';

/**
 * The weekly Puzzle mix — the stretch tier's serving rule (ROADMAP §7).
 *
 * Ten puzzles drawn across the stretch packs (Puzzle Lab, Word Lab, Cube
 * Lab), re-rolled every Monday from an ISO-week seed so the set is stable
 * all week — a newspaper puzzle page, not an endless drill. Both research
 * passes converged on ~80–85% success as the motivation sweet spot, and the
 * rule tunes BY SELECTION, never by easing items: the child's recent
 * accuracy on stretch questions shifts how many d1/d2/d3 items are picked,
 * while every item stays a genuine puzzle. No timer, no streak pressure.
 */

export const PUZZLE_MIX_SIZE = 10;

// Recent-form window and the band edges from the stretch-problems research.
const FORM_WINDOW = 20;
const MIN_ATTEMPTS_FOR_FORM = 8;
const BAND_HIGH = 0.85;
const BAND_LOW = 0.7;

// A puzzle answered correctly this recently is left to rest, so replaying
// the mix mid-week (or a strong fortnight) keeps serving fresh material.
const REST_DAYS = 14;
const DAY_MS = 86_400_000;

export type FormBand = 'first-week' | 'rebuilding' | 'in-band' | 'cruising';

// How many of each difficulty to serve, per form band. All four quotas sum
// to PUZZLE_MIX_SIZE; the low-floor/high-ceiling shape (always some d1 ease
// and at least one d3 summit) survives in every band.
const QUOTAS: Record<FormBand, Difficulty[]> = {
  'first-week': [1, 1, 1, 1, 2, 2, 2, 2, 3, 3],
  rebuilding: [1, 1, 1, 1, 1, 2, 2, 2, 2, 3],
  'in-band': [1, 1, 1, 2, 2, 2, 2, 3, 3, 3],
  cruising: [1, 1, 2, 2, 2, 2, 3, 3, 3, 3],
};

/** ISO-8601 week key, e.g. "2026-W24". The mix re-rolls when this changes. */
export function weekKey(now: Date = new Date()): string {
  const d = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  const day = d.getUTCDay() || 7; // Mon=1 … Sun=7
  d.setUTCDate(d.getUTCDate() + 4 - day); // shift to this week's Thursday
  const year = d.getUTCFullYear();
  const week = Math.ceil(((d.getTime() - Date.UTC(year, 0, 1)) / DAY_MS + 1) / 7);
  return `${year}-W${String(week).padStart(2, '0')}`;
}

// ─── Seeded randomness (deterministic for the whole week) ───────────────────

function hashSeed(s: string): number {
  let h = 2166136261 >>> 0; // FNV-1a
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle<T>(arr: readonly T[], rnd: () => number): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// ─── Pool and form reading ──────────────────────────────────────────────────

/** Every question in a stretch-flagged pack. */
export function stretchPool(sections: readonly Section[]): Question[] {
  return sections
    .filter((s) => STRETCH_PACK_SLUGS.has(s.pack))
    .flatMap((s) => s.questions);
}

/**
 * Recent accuracy on stretch questions (last FORM_WINDOW attempts), or null
 * until there's enough history to read anything into it.
 */
export function stretchAccuracy(
  attempts: readonly AttemptLog[],
  pool: readonly Question[],
): number | null {
  const ids = new Set(pool.map((q) => q.id));
  const recent = attempts.filter((a) => ids.has(a.id)).slice(-FORM_WINDOW);
  if (recent.length < MIN_ATTEMPTS_FOR_FORM) return null;
  return recent.filter((a) => a.correct).length / recent.length;
}

export function formBand(accuracy: number | null): FormBand {
  if (accuracy === null) return 'first-week';
  if (accuracy >= BAND_HIGH) return 'cruising';
  if (accuracy >= BAND_LOW) return 'in-band';
  return 'rebuilding';
}

// ─── The mix itself ─────────────────────────────────────────────────────────

export interface PuzzleMix {
  week: string;
  band: FormBand;
  questions: Question[];
}

/**
 * Build this week's mix. Deterministic for a given week + progress state:
 * the same ten puzzles greet the child all week. Selection walks the
 * difficulty quota while rotating across packs (so maths, word and cube
 * puzzles all show up), capping each section at two questions and resting
 * recently-conquered puzzles — each constraint relaxed in turn only if the
 * pool runs dry.
 */
export function buildPuzzleMix(
  sections: readonly Section[],
  state: ProgressState,
  now: Date = new Date(),
): PuzzleMix {
  const week = weekKey(now);
  const pool = stretchPool(sections);
  const band = formBand(stretchAccuracy(state.attempts, pool));
  const rnd = mulberry32(hashSeed(week));

  const packOf = new Map<string, string>();
  for (const s of sections) packOf.set(s.id, s.pack);

  // Last attempt per question (the log is append-ordered).
  const last = new Map<string, AttemptLog>();
  for (const a of state.attempts) last.set(a.id, a);
  const resting = (q: Question) => {
    const a = last.get(q.id);
    return !!a && a.correct && now.getTime() - a.ts < REST_DAYS * DAY_MS;
  };

  const shuffled = seededShuffle(pool, rnd);
  const packOrder = seededShuffle(
    [...new Set(shuffled.map((q) => packOf.get(q.sectionId)!))],
    rnd,
  );

  const picked: Question[] = [];
  const pickedIds = new Set<string>();
  const perSection = new Map<string, number>();
  let rotation = 0;

  for (const wantedDifficulty of QUOTAS[band]) {
    // Constraint tiers, strictest first: rotating pack + right difficulty +
    // fresh + section cap, then progressively looser so a thin pool can
    // never strand the picker.
    const tiers: Array<(q: Question, pack: string) => boolean> = [
      (q, pack) =>
        packOf.get(q.sectionId) === pack &&
        q.difficulty === wantedDifficulty &&
        !resting(q) &&
        (perSection.get(q.sectionId) ?? 0) < 2,
      (q, pack) =>
        packOf.get(q.sectionId) === pack && q.difficulty === wantedDifficulty,
      (q) => q.difficulty === wantedDifficulty && !resting(q),
      (q) => q.difficulty === wantedDifficulty,
      (q) => !resting(q),
      () => true,
    ];

    let chosen: Question | undefined;
    outer: for (const fits of tiers) {
      for (let i = 0; i < packOrder.length; i++) {
        const pack = packOrder[(rotation + i) % packOrder.length];
        chosen = shuffled.find((q) => !pickedIds.has(q.id) && fits(q, pack));
        if (chosen) {
          rotation = (rotation + i + 1) % packOrder.length;
          break outer;
        }
      }
    }
    if (!chosen) break; // pool exhausted (content would have to shrink a lot)

    picked.push(chosen);
    pickedIds.add(chosen.id);
    perSection.set(chosen.sectionId, (perSection.get(chosen.sectionId) ?? 0) + 1);
  }

  // Serve easiest-first so the session opens with a foothold.
  picked.sort((a, b) => a.difficulty - b.difficulty);
  return { week, band, questions: picked };
}
