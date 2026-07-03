import { describe, it, expect } from 'vitest';
import type { NetSymbol } from './types';
import { sectionsBySubject } from './index';

/**
 * Golden answer keys for the "How Many Cubes?" figures, re-derived here by
 * hand — reading each heightmap and adding the towers up — deliberately NOT
 * copied from the section file. Because every one of these questions renders
 * its own heightmap, the strongest possible check is that three numbers agree:
 * the count I re-derived below, the answer stored on the question, and the sum
 * of the figure the child actually sees. Any drift between the picture and the
 * answer fails the suite.
 */
const EXPECTED: Record<string, number> = {
  'nvr-07-q1': 3, // 1+1+1
  'nvr-07-q2': 4, // 2×2 flat
  'nvr-07-q3': 5, // 2+1+1+1
  'nvr-07-q4': 8, // 2×2×2 solid
  'nvr-07-q5': 6, // 3+2+1 staircase
  'nvr-07-q6': 9, // 3×3 flat
  'nvr-07-q7': 9, // (3×2) + (3×1)
  'nvr-07-q8': 18, // 3×3×2
  'nvr-07-q9': 12, // 2×2×3
  'nvr-07-q10': 6, // 1+2+3
  'nvr-07-q11': 12, // (3+2+1)×2 deep
  'nvr-07-q12': 27, // 3×3×3
  'nvr-07-q13': 12, // 2×3×2
  'nvr-07-q14': 8, // 4×2 flat
  'nvr-07-q15': 12, // two 2×3 walls, gap between
  'nvr-07-q16': 10, // 9 flat + 1 on the corner
  'nvr-07-q17': 10, // (3+2+1)+(2+1)+1
  'nvr-07-q18': 8, // 4×2 wall
  'nvr-07-q19': 16, // 2×2×4
  'nvr-07-q20': 18, // 9+6+3 grand staircase
};

const cubeQuestions = sectionsBySubject('non-verbal')
  .flatMap((s) => s.questions)
  .filter((q) => q.cubes);

const first = (a: string | string[]): string => (Array.isArray(a) ? a[0] : a);
const sumHeights = (heights: number[][]) =>
  heights.reduce((tot, row) => tot + row.reduce((a, b) => a + b, 0), 0);

describe('cube-counting answer keys (independently re-derived)', () => {
  it('covers every rendered cube question — no key left behind', () => {
    const missing = cubeQuestions.filter((q) => EXPECTED[q.id] === undefined).map((q) => q.id);
    expect(missing).toEqual([]);
  });

  it('the stored answer matches the hand-derived key', () => {
    const bad = cubeQuestions
      .filter((q) => first(q.answer) !== String(EXPECTED[q.id]))
      .map((q) => `${q.id}: file "${first(q.answer)}" vs key ${EXPECTED[q.id]}`);
    expect(bad).toEqual([]);
  });

  // Note: a "stored answer self-grades against its own figure" check would be
  // redundant here — it follows from (answer === key) ∧ (key === figure sum)
  // above, and gradeNumeric only loosens the comparison. data.test.ts already
  // covers numeric self-grading across every section.
  it('the key equals the sum of the figure the child sees', () => {
    const bad = cubeQuestions
      .filter((q) => EXPECTED[q.id] !== sumHeights(q.cubes!.heights))
      .map((q) => `${q.id}: key ${EXPECTED[q.id]} vs figure ${sumHeights(q.cubes!.heights)}`);
    expect(bad).toEqual([]);
  });
});

/**
 * Cube-net answer keys, re-checked two independent ways. First, the keys
 * below were hand-derived by folding each net on paper (the working is in the
 * comments). Second, `foldNet` actually folds the rendered grid in 3D —
 * walking the net face by face, rotating an orientation frame over each
 * shared edge, and reading off which direction every face ends up pointing.
 * A net is a real cube net exactly when its six faces cover all six
 * directions, and two faces are opposite exactly when their directions are
 * negatives. So for every question, three things must agree: the hand-derived
 * key, the stored answer, and the geometry of the figure the child sees.
 */
type Vec = readonly [number, number, number];
const neg = (v: Vec): Vec => [-v[0], -v[1], -v[2]];
const vecKey = (v: Vec) => v.join(',');

interface FoldedFace {
  cell: string; // the symbol (or 'blank') on the face
  normal: Vec; // which way the face points once folded
}

function foldNet(cells: (string | null)[][]): { valid: boolean; faces: FoldedFace[] } {
  const at = (r: number, c: number) => cells[r]?.[c] ?? null;
  const positions: Array<[number, number]> = [];
  cells.forEach((row, r) => row.forEach((cell, c) => cell !== null && positions.push([r, c])));
  if (positions.length === 0) return { valid: false, faces: [] };

  // Each visited face carries a frame: its folded normal `n` plus the folded
  // directions `u` (+column) and `v` (+row) of the flat grid axes. Stepping to
  // a neighbour folds 90° over the shared edge, which swaps the stepped axis
  // with the normal.
  interface Frame { n: Vec; u: Vec; v: Vec }
  const frames = new Map<string, Frame>();
  const posKey = ([r, c]: [number, number]) => `${r},${c}`;
  const start = positions[0];
  frames.set(posKey(start), { n: [0, 0, 1], u: [1, 0, 0], v: [0, 1, 0] });
  const queue = [start];
  while (queue.length) {
    const [r, c] = queue.shift()!;
    const f = frames.get(`${r},${c}`)!;
    const steps: Array<[number, number, Frame]> = [
      [r, c + 1, { n: f.u, u: neg(f.n), v: f.v }],
      [r, c - 1, { n: neg(f.u), u: f.n, v: f.v }],
      [r + 1, c, { n: f.v, v: neg(f.n), u: f.u }],
      [r - 1, c, { n: neg(f.v), v: f.n, u: f.u }],
    ];
    for (const [nr, nc, frame] of steps) {
      if (at(nr, nc) === null || frames.has(`${nr},${nc}`)) continue;
      frames.set(`${nr},${nc}`, frame);
      queue.push([nr, nc]);
    }
  }

  const faces = positions
    .filter((p) => frames.has(posKey(p))) // disconnected squares never fold
    .map(([r, c]) => ({ cell: cells[r][c]!, normal: frames.get(`${r},${c}`)!.n }));
  const valid =
    positions.length === 6 &&
    faces.length === 6 &&
    new Set(faces.map((f) => vecKey(f.normal))).size === 6;
  return { valid, faces };
}

/** The symbol folded opposite `symbol`, or undefined if the net is broken. */
function oppositeOf(cells: (string | null)[][], symbol: string): string | undefined {
  const { valid, faces } = foldNet(cells);
  if (!valid) return undefined;
  const face = faces.find((f) => f.cell === symbol);
  if (!face) return undefined;
  return faces.find((f) => vecKey(f.normal) === vecKey(neg(face.normal)))?.cell;
}

// ——— Hand-derived keys ———
// Net A (cross): column star-heart-moon-triangle wraps the cube, so the
// two-apart pairs are star–moon and heart–triangle; the arms circle/square
// close the sides facing each other. Pairs: star–moon, heart–triangle,
// circle–square.
// Net B (T): top row square-heart-moon gives square–moon; column
// heart-star-triangle-circle gives heart–triangle and star–circle.
// Net C (staircase): folded step by step on paper — star–square, moon–heart,
// circle–triangle.
// Net D (1-4-1): row moon-star-heart-circle gives moon–heart and star–circle;
// the leftover arms triangle/square are the third pair.

/** Does-this-fold questions: id → is the figure a real cube net? */
const NET_VALIDITY: Record<string, boolean> = {
  'nvr-08-q2': true, // the classic cross
  'nvr-08-q3': false, // plus shape: only 5 squares
  'nvr-08-q6': false, // 2×3 block: 6 squares but folds onto itself
  'nvr-08-q7': false, // 1×6 strip: wraps a four-sided tube
  'nvr-08-q17': false, // 7 squares: one too many
  'nvr-08-q19': true, // the staircase (a genuine hexomino net)
};

/** Opposite-face MCQs: id → which symbol was asked about, and the key. */
const NET_OPPOSITE: Record<string, { of: NetSymbol; expect: NetSymbol }> = {
  'nvr-08-q4': { of: 'star', expect: 'moon' }, // Net A column, two apart
  'nvr-08-q5': { of: 'circle', expect: 'square' }, // Net A arms
  'nvr-08-q8': { of: 'heart', expect: 'triangle' }, // Net B column, two apart
  'nvr-08-q9': { of: 'moon', expect: 'square' }, // Net B top row ends
  'nvr-08-q10': { of: 'star', expect: 'circle' }, // Net B column, two apart
  'nvr-08-q13': { of: 'star', expect: 'circle' }, // Net D row, two apart
  'nvr-08-q14': { of: 'triangle', expect: 'square' }, // Net D leftover pair
  'nvr-08-q15': { of: 'star', expect: 'square' }, // Net C, folded by hand
  'nvr-08-q16': { of: 'circle', expect: 'triangle' }, // Net C, leftover pair
};

/** Edge-sharing true/false: id → the two faces asked about + can they touch?
 *  (On a cube, two distinct faces touch exactly when they are NOT opposite.) */
const NET_TOUCH: Record<string, { a: NetSymbol; b: NetSymbol; touch: boolean }> = {
  'nvr-08-q11': { a: 'star', b: 'moon', touch: false }, // opposite in Net A
  'nvr-08-q12': { a: 'star', b: 'circle', touch: true }, // not opposite in Net A
};

/** Pick-the-pair MCQs: id → the one choice naming an opposite pair. */
const NET_PAIR_MCQ: Record<string, [NetSymbol, NetSymbol]> = {
  'nvr-08-q18': ['moon', 'heart'], // Net C's non-obvious pair
  'nvr-08-q20': ['heart', 'triangle'], // Net A, "can never touch" = opposite
};

/** Count questions: id → number of squares in the figure. */
const NET_COUNT: Record<string, number> = {
  'nvr-08-q1': 6, // the cross: 1 + 3 + 1 + 1
};

const netQuestions = sectionsBySubject('non-verbal')
  .flatMap((s) => s.questions)
  .filter((q) => q.net);

describe('cube-net answer keys (hand-derived, then re-checked by folding)', () => {
  it('the fold simulator itself is sane (strip of four wraps into a belt)', () => {
    // A 1×4 strip folds around four sides of the cube: squares 1&3 and 2&4
    // end up opposite, and the net is invalid (only 4 faces).
    const { valid, faces } = foldNet([['a', 'b', 'c', 'd']]);
    expect(valid).toBe(false);
    const norm = (cell: string) => faces.find((f) => f.cell === cell)!.normal;
    expect(vecKey(norm('a'))).toBe(vecKey(neg(norm('c'))));
    expect(vecKey(norm('b'))).toBe(vecKey(neg(norm('d'))));
  });

  it('covers every net question — no key left behind', () => {
    const covered = (id: string) =>
      [NET_VALIDITY, NET_OPPOSITE, NET_TOUCH, NET_PAIR_MCQ, NET_COUNT].filter(
        (spec) => id in spec,
      ).length;
    const bad = netQuestions
      .filter((q) => covered(q.id) !== 1)
      .map((q) => `${q.id}: in ${covered(q.id)} spec tables`);
    expect(bad).toEqual([]);
  });

  it('validity answers match both the key and the folded geometry', () => {
    const bad: string[] = [];
    for (const [id, valid] of Object.entries(NET_VALIDITY)) {
      const q = netQuestions.find((q) => q.id === id);
      if (!q) { bad.push(`${id}: missing question`); continue; }
      if (first(q.answer) !== (valid ? 'True' : 'False'))
        bad.push(`${id}: stored "${first(q.answer)}" vs key ${valid}`);
      if (foldNet(q.net!.cells).valid !== valid)
        bad.push(`${id}: figure folds to ${foldNet(q.net!.cells).valid}, key says ${valid}`);
    }
    expect(bad).toEqual([]);
  });

  it('opposite-face answers match both the key and the folded geometry', () => {
    const bad: string[] = [];
    for (const [id, { of, expect: expected }] of Object.entries(NET_OPPOSITE)) {
      const q = netQuestions.find((q) => q.id === id);
      if (!q) { bad.push(`${id}: missing question`); continue; }
      if (first(q.answer) !== expected)
        bad.push(`${id}: stored "${first(q.answer)}" vs key ${expected}`);
      const folded = oppositeOf(q.net!.cells, of);
      if (folded !== expected)
        bad.push(`${id}: figure folds ${of} opposite ${folded}, key says ${expected}`);
    }
    expect(bad).toEqual([]);
  });

  it('edge-sharing answers match the folded geometry', () => {
    const bad: string[] = [];
    for (const [id, { a, b, touch }] of Object.entries(NET_TOUCH)) {
      const q = netQuestions.find((q) => q.id === id);
      if (!q) { bad.push(`${id}: missing question`); continue; }
      if (first(q.answer) !== (touch ? 'True' : 'False'))
        bad.push(`${id}: stored "${first(q.answer)}" vs key ${touch}`);
      const foldedTouch = oppositeOf(q.net!.cells, a) !== b;
      if (foldedTouch !== touch)
        bad.push(`${id}: geometry says touch=${foldedTouch}, key says ${touch}`);
    }
    expect(bad).toEqual([]);
  });

  it('pair MCQs name exactly one opposite pair, and it is the stored answer', () => {
    const bad: string[] = [];
    for (const [id, [a, b]] of Object.entries(NET_PAIR_MCQ)) {
      const q = netQuestions.find((q) => q.id === id);
      if (!q) { bad.push(`${id}: missing question`); continue; }
      if (first(q.answer) !== `${a} and ${b}`)
        bad.push(`${id}: stored "${first(q.answer)}" vs key "${a} and ${b}"`);
      // Fold the figure and grade every choice: the answer must be the one
      // and only choice naming an opposite pair.
      for (const choice of q.choices ?? []) {
        const [x, y] = choice.split(' and ');
        const isOpposite = oppositeOf(q.net!.cells, x) === y;
        if (isOpposite !== (choice === first(q.answer)))
          bad.push(`${id}: choice "${choice}" is ${isOpposite ? '' : 'not '}an opposite pair`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('count answers match the squares actually drawn', () => {
    const bad: string[] = [];
    for (const [id, count] of Object.entries(NET_COUNT)) {
      const q = netQuestions.find((q) => q.id === id);
      if (!q) { bad.push(`${id}: missing question`); continue; }
      if (first(q.answer) !== String(count))
        bad.push(`${id}: stored "${first(q.answer)}" vs key ${count}`);
      const drawn = q.net!.cells.flat().filter((c) => c !== null).length;
      if (drawn !== count) bad.push(`${id}: figure draws ${drawn} squares, key says ${count}`);
    }
    expect(bad).toEqual([]);
  });
});
