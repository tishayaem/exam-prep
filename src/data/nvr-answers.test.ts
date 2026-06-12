import { describe, it, expect } from 'vitest';
import { sectionsBySubject } from './index';
import type { NetMark, NvrFigure, Question } from './types';

/**
 * Independent answer keys for the Cube Lab (figure-based NVR stretch).
 * Unlike the maths/VR golden tables, most of these keys are RE-DERIVED
 * MECHANICALLY from the figure data rather than hand-copied:
 *
 *  - "how many cubes" answers are recomputed by summing the heightmap;
 *  - "touching the floor" answers by counting non-zero columns;
 *  - "how many more to fill the box" by box volume minus the sum;
 *  - net validity by a fold simulator (BFS over the cells, tracking each
 *    face's outward normal — a shape folds into a cube iff all six normals
 *    come out distinct), which also yields the opposite-face pairings the
 *    marked-net questions ask about.
 *
 * The simulator is written from the geometry, not from the section file, so
 * a mis-authored net or a copied-wrong answer fails here. Concept questions
 * keep a hand-derived golden table like every other subject.
 */

const cubelab = sectionsBySubject('non-verbal').filter(
  (s) => s.pack === 'nvr-cubelab',
);
const byId = new Map<string, Question>(
  cubelab.flatMap((s) => s.questions).map((q) => [q.id, q]),
);
const first = (a: string | string[]): string => (Array.isArray(a) ? a[0] : a);

function q(id: string): Question {
  const found = byId.get(id);
  if (!found) throw new Error(`no such question: ${id}`);
  return found;
}

// ─── Heightmap helpers ──────────────────────────────────────────────────────

function solidOf(question: Question): number[][] {
  const f = question.nvr?.stem[0];
  if (!f || !('solid' in f)) throw new Error(`${question.id}: no solid stem`);
  return f.solid;
}

const sum = (g: number[][]) => g.flat().reduce((a, b) => a + b, 0);
const floorCount = (g: number[][]) => g.flat().filter((h) => h > 0).length;

// ─── Cube-net fold simulator ────────────────────────────────────────────────

type Vec = readonly [number, number, number];
const neg = (v: Vec): Vec => [-v[0], -v[1], -v[2]];
const vkey = (v: Vec) => v.join(',');

/**
 * Fold a polyomino of squares into 3-D, assigning every cell the outward
 * normal of the cube face it lands on. Walking from a cell to a neighbour
 * hinges 90° over the shared edge: the step direction becomes the new
 * normal, and the old normal swings back along the step axis. Returns one
 * normal per cell (in cells order).
 */
function foldNormals(cells: [number, number][]): Vec[] {
  interface Frame {
    n: Vec; // outward normal
    dc: Vec; // 3-D direction of a +col step on the paper
    dr: Vec; // 3-D direction of a +row step
  }
  const index = new Map(cells.map(([r, c], i) => [`${r},${c}`, i]));
  const frames: (Frame | undefined)[] = new Array(cells.length);
  frames[0] = { n: [0, 0, 1], dc: [1, 0, 0], dr: [0, 1, 0] };
  const queue = [0];
  while (queue.length) {
    const i = queue.shift()!;
    const [r, c] = cells[i];
    const f = frames[i]!;
    const steps: Array<[number, number, Frame]> = [
      [r, c + 1, { n: f.dc, dc: neg(f.n), dr: f.dr }],
      [r, c - 1, { n: neg(f.dc), dc: f.n, dr: f.dr }],
      [r + 1, c, { n: f.dr, dr: neg(f.n), dc: f.dc }],
      [r - 1, c, { n: neg(f.dr), dr: f.n, dc: f.dc }],
    ];
    for (const [nr, nc, frame] of steps) {
      const j = index.get(`${nr},${nc}`);
      if (j !== undefined && !frames[j]) {
        frames[j] = frame;
        queue.push(j);
      }
    }
  }
  if (frames.some((f) => !f)) throw new Error('net cells not connected');
  return frames.map((f) => f!.n);
}

/** Six squares fold into a cube iff every face normal comes out distinct. */
function foldsIntoCube(cells: [number, number][]): boolean {
  const normals = foldNormals(cells);
  return new Set(normals.map(vkey)).size === 6;
}

/** For a valid marked net: the mark on the face opposite `target`. */
function oppositeMark(
  net: { cells: [number, number][]; marks?: (NetMark | null)[] },
  target: NetMark,
): NetMark {
  const normals = foldNormals(net.cells);
  const ti = net.marks!.indexOf(target);
  if (ti === -1) throw new Error(`target mark ${target} not on net`);
  const want = vkey(neg(normals[ti]));
  const oi = normals.findIndex((n) => vkey(n) === want);
  const found = net.marks![oi];
  if (!found) throw new Error('opposite face is unmarked');
  return found;
}

function netsOf(question: Question): { cells: [number, number][]; marks?: (NetMark | null)[] }[] {
  const figs: NvrFigure[] = [
    ...(question.nvr?.stem ?? []),
    ...(question.nvr?.options ?? []),
  ];
  return figs.flatMap((f) => ('net' in f ? [f.net] : []));
}

// ─── The simulator itself gets a sanity check ───────────────────────────────

describe('fold simulator self-test (known nets)', () => {
  it('accepts the textbook cross and rejects the textbook impostors', () => {
    // The classic cross — the first net everyone learns.
    expect(foldsIntoCube([[0, 1], [1, 0], [1, 1], [1, 2], [1, 3], [2, 1]])).toBe(true);
    // 2×3 block: contains a 2×2, two faces double up.
    expect(foldsIntoCube([[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2]])).toBe(false);
    // 1×6 strip: wraps round, covering only four faces.
    expect(foldsIntoCube([[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5]])).toBe(false);
  });

  it('reproduces the dice rule on the cross: flaps opposite, strip skip-one', () => {
    const cross = {
      cells: [[0, 1], [1, 0], [1, 1], [1, 2], [1, 3], [2, 1]] as [number, number][],
      marks: ['star', 'dot', 'cross', 'ring', 'stripes', 'triangle'] as NetMark[],
    };
    expect(oppositeMark(cross, 'star')).toBe('triangle'); // flap ↔ flap
    expect(oppositeMark(cross, 'dot')).toBe('ring'); // strip 1 ↔ 3
    expect(oppositeMark(cross, 'cross')).toBe('stripes'); // strip 2 ↔ 4
  });
});

// ─── How Many Cubes — answers re-derived from the heightmaps ────────────────

// Pure counts: stored answer must equal the sum of the column heights.
const COUNT_QS = [
  'nvr-cubelab-01-q1',
  'nvr-cubelab-01-q2',
  'nvr-cubelab-01-q3',
  'nvr-cubelab-01-q5',
  'nvr-cubelab-01-q6',
  'nvr-cubelab-01-q7',
  'nvr-cubelab-01-q8',
  'nvr-cubelab-01-q10',
  'nvr-cubelab-01-q11',
  'nvr-cubelab-01-q12',
  'nvr-cubelab-01-q15',
];

// Floor-contact counts: stored answer = number of non-empty columns.
const FLOOR_QS = ['nvr-cubelab-01-q4', 'nvr-cubelab-01-q9'];

// Fill-the-box: stored answer = box volume (from the prompt) − cubes present.
const BOX_QS: Record<string, [number, number, number]> = {
  'nvr-cubelab-01-q13': [2, 2, 2],
  'nvr-cubelab-01-q14': [2, 2, 3],
};

describe('How Many Cubes — every answer recomputed from its figure', () => {
  it('count questions: answer = sum of column heights', () => {
    for (const id of COUNT_QS) {
      expect(first(q(id).answer), id).toBe(String(sum(solidOf(q(id)))));
    }
  });

  it('floor questions: answer = number of standing columns', () => {
    for (const id of FLOOR_QS) {
      expect(first(q(id).answer), id).toBe(String(floorCount(solidOf(q(id)))));
    }
  });

  it('fill-the-box questions: answer = box volume minus cubes present', () => {
    for (const [id, [w, d, h]] of Object.entries(BOX_QS)) {
      const grid = solidOf(q(id));
      // The promised box must actually contain the solid.
      expect(grid.length, `${id} depth`).toBeLessThanOrEqual(d);
      expect(grid[0].length, `${id} width`).toBeLessThanOrEqual(w);
      expect(Math.max(...grid.flat()), `${id} height`).toBeLessThanOrEqual(h);
      expect(first(q(id).answer), id).toBe(String(w * d * h - sum(grid)));
    }
  });
});

// ─── Cube Nets — validity and opposites re-derived by folding ───────────────

// "Which folds into a cube?" — exactly one option may fold.
const PICK_FOLDS = ['nvr-cubelab-02-q4', 'nvr-cubelab-02-q9', 'nvr-cubelab-02-q14'];

// "Which does NOT fold?" — exactly one option may fail.
const PICK_IMPOSTOR = ['nvr-cubelab-02-q10', 'nvr-cubelab-02-q12'];

// Marked-net opposite-face questions: target mark per question; the expected
// choice text is derived by folding, not read from the section file.
const OPPOSITE_QS: Record<string, NetMark> = {
  'nvr-cubelab-02-q6': 'star',
  'nvr-cubelab-02-q7': 'dot',
  'nvr-cubelab-02-q11': 'cross',
  'nvr-cubelab-02-q13': 'dot',
  'nvr-cubelab-02-q15': 'dot',
};

// Concept questions: hand-derived golden keys, like every other subject.
const EXPECTED_TEXT: Record<string, string> = {
  'nvr-cubelab-02-q1': 'Six', // a cube has six faces
  'nvr-cubelab-02-q2': 'The third one', // strip of 4 wraps: 1↔3, 2↔4
  'nvr-cubelab-02-q3': 'False', // 2×3 block contains 2×2 → overlaps
  'nvr-cubelab-02-q5':
    'The strip wraps round in a ring, doubling up on faces and leaving the top and bottom open',
  'nvr-cubelab-02-q8': 'No — squares that share an edge fold to faces that meet at an edge',
};

describe('Cube Nets — validity and opposites re-derived by folding', () => {
  it('pick-the-net questions have exactly one foldable option, the stored answer', () => {
    for (const id of PICK_FOLDS) {
      const verdicts = netsOf(q(id)).map((n) => foldsIntoCube(n.cells));
      expect(verdicts.filter(Boolean).length, `${id} foldable count`).toBe(1);
      expect(String(verdicts.indexOf(true)), id).toBe(first(q(id).answer));
    }
  });

  it('spot-the-impostor questions have exactly one non-foldable option, the stored answer', () => {
    for (const id of PICK_IMPOSTOR) {
      const verdicts = netsOf(q(id)).map((n) => foldsIntoCube(n.cells));
      expect(verdicts.filter((v) => !v).length, `${id} impostor count`).toBe(1);
      expect(String(verdicts.indexOf(false)), id).toBe(first(q(id).answer));
    }
  });

  it('opposite-face questions match the fold simulator', () => {
    for (const [id, target] of Object.entries(OPPOSITE_QS)) {
      const net = netsOf(q(id))[0];
      expect(foldsIntoCube(net.cells), `${id} net must be valid`).toBe(true);
      expect(first(q(id).answer), id).toBe(`The ${oppositeMark(net, target)}`);
      // The question must actually ask about the target we derived from.
      expect(q(id).prompt.toLowerCase()).toContain(target);
    }
  });

  it('concept questions match their golden keys', () => {
    for (const [id, expected] of Object.entries(EXPECTED_TEXT)) {
      expect(first(q(id).answer), id).toBe(expected);
    }
  });
});

// ─── Coverage — a Cube Lab question without a key here fails the suite ──────

describe('Cube Lab coverage', () => {
  it('every question is covered by exactly one derivation table', () => {
    const tables: Record<string, ReadonlySet<string>> = {
      count: new Set(COUNT_QS),
      floor: new Set(FLOOR_QS),
      box: new Set(Object.keys(BOX_QS)),
      pickFolds: new Set(PICK_FOLDS),
      pickImpostor: new Set(PICK_IMPOSTOR),
      opposite: new Set(Object.keys(OPPOSITE_QS)),
      text: new Set(Object.keys(EXPECTED_TEXT)),
    };
    const uncovered: string[] = [];
    for (const section of cubelab) {
      for (const question of section.questions) {
        const hits = Object.values(tables).filter((t) => t.has(question.id)).length;
        if (hits !== 1) uncovered.push(`${question.id} (${hits} tables)`);
      }
    }
    expect(uncovered).toEqual([]);
    // And no key points at a question that doesn't exist.
    const ids = new Set([...byId.keys()]);
    const stale = Object.values(tables)
      .flatMap((t) => [...t])
      .filter((id) => !ids.has(id));
    expect(stale).toEqual([]);
  });
});
