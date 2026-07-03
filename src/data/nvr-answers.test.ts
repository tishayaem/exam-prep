import { describe, it, expect } from 'vitest';
import { sectionsBySubject } from './index';
import { gradeNumeric } from '../lib/grading';

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

  it('the key equals the sum of the figure the child sees', () => {
    const bad = cubeQuestions
      .filter((q) => EXPECTED[q.id] !== sumHeights(q.cubes!.heights))
      .map((q) => `${q.id}: key ${EXPECTED[q.id]} vs figure ${sumHeights(q.cubes!.heights)}`);
    expect(bad).toEqual([]);
  });

  it('every stored answer self-grades against its own figure', () => {
    const bad = cubeQuestions
      .filter((q) => !gradeNumeric(String(sumHeights(q.cubes!.heights)), q.answer, q.acceptable))
      .map((q) => q.id);
    expect(bad).toEqual([]);
  });
});
