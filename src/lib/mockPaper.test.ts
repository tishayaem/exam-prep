import { describe, it, expect } from 'vitest';
import type { Question } from '../data/types';
import { buildMockPaper, buildIsebBlock, isebPool } from './mockPaper';

function mkQuestion(
  id: string,
  type: Question['type'] = 'short',
  difficulty: Question['difficulty'] = 2,
): Question {
  return {
    id,
    sectionId: 's',
    type,
    prompt: id,
    answer: '1',
    explanation: '',
    difficulty,
    source: 'test',
  };
}

const numerics = Array.from({ length: 10 }, (_, i) =>
  mkQuestion(`n${i}`, 'numeric', 1),
);
const worded = Array.from({ length: 30 }, (_, i) => mkQuestion(`w${i}`));
const pool = [...numerics, ...worded];

describe('buildMockPaper', () => {
  it('samples the requested count with no duplicates', () => {
    const paper = buildMockPaper(pool, 20);
    expect(paper).toHaveLength(20);
    expect(new Set(paper.map((q) => q.id)).size).toBe(20);
  });

  it('returns the whole pool when it is smaller than the count', () => {
    const paper = buildMockPaper(worded.slice(0, 5), 20);
    expect(paper).toHaveLength(5);
  });

  it('opens with quick difficulty-1 numeric questions when asked', () => {
    const paper = buildMockPaper(pool, 20, { numeracyOpeners: 8 });
    expect(paper).toHaveLength(20);
    for (const q of paper.slice(0, 8)) {
      expect(q.type).toBe('numeric');
      expect(q.difficulty).toBe(1);
    }
    expect(new Set(paper.map((q) => q.id)).size).toBe(20);
  });

  it('caps the openers at however many quick numerics exist', () => {
    const thin = [...numerics.slice(0, 3), ...worded];
    const paper = buildMockPaper(thin, 20, { numeracyOpeners: 8 });
    expect(paper).toHaveLength(20);
    expect(paper.slice(0, 3).every((q) => q.type === 'numeric')).toBe(true);
  });

  it('never serves an opener again in the body of the paper', () => {
    // Pool barely larger than the paper, so collisions would show up.
    const tight = [...numerics, ...worded.slice(0, 12)];
    const paper = buildMockPaper(tight, 20, { numeracyOpeners: 8 });
    expect(new Set(paper.map((q) => q.id)).size).toBe(paper.length);
  });
});

describe('buildIsebBlock', () => {
  // A mixed pool: tap-answerable kinds across all difficulties + write-in
  // kinds that the on-screen CPT format must never serve.
  const mixed: Question[] = [
    ...Array.from({ length: 20 }, (_, i) => mkQuestion(`m1-${i}`, 'mcq', 1)),
    ...Array.from({ length: 20 }, (_, i) => mkQuestion(`m2-${i}`, 'mcq', 2)),
    ...Array.from({ length: 20 }, (_, i) => mkQuestion(`m3-${i}`, 'mcq', 3)),
    ...Array.from({ length: 5 }, (_, i) => mkQuestion(`tf-${i}`, 'truefalse', 1)),
    ...Array.from({ length: 5 }, (_, i) => mkQuestion(`nv-${i}`, 'nvr', 2)),
    ...Array.from({ length: 10 }, (_, i) => mkQuestion(`num-${i}`, 'numeric', 1)),
    ...Array.from({ length: 10 }, (_, i) => mkQuestion(`sh-${i}`, 'short', 2)),
  ];

  it('serves only tap-to-answer types (the CPT is multiple-choice)', () => {
    const block = buildIsebBlock(mixed, 40);
    expect(block.length).toBeGreaterThan(0);
    for (const q of block) {
      expect(['mcq', 'truefalse', 'nvr']).toContain(q.type);
    }
  });

  it('fills the clock (over one per minute), scales with time, no duplicates', () => {
    // The contract is "let the clock end the paper", not an exact count — so
    // assert the guarantees, not the tunable 1.2-per-minute pacing constant.
    const block = buildIsebBlock(mixed, 40);
    const pool = isebPool(mixed).length;
    expect(block.length).toBeGreaterThan(40); // more than one per minute
    expect(block.length).toBeLessThanOrEqual(pool); // never beyond the tap-only pool
    expect(new Set(block.map((q) => q.id)).size).toBe(block.length); // no repeats
    // A bigger time budget yields a bigger block (until the pool caps it).
    expect(buildIsebBlock(mixed, 80).length).toBeGreaterThan(block.length);
  });

  it('caps at the tap-only pool when it is smaller than the pacing target', () => {
    const thin = mixed.filter((q) => q.type === 'truefalse'); // 5 questions
    expect(buildIsebBlock(thin, 40)).toHaveLength(5);
  });

  it('ramps difficulty like the adaptive test: never a step back down', () => {
    const block = buildIsebBlock(mixed, 40);
    for (let i = 1; i < block.length; i++) {
      expect(block[i].difficulty).toBeGreaterThanOrEqual(block[i - 1].difficulty);
    }
  });

  it('isebPool filters write-in kinds out and keeps tap kinds in', () => {
    const pool = isebPool(mixed);
    expect(pool).toHaveLength(70); // 60 mcq + 5 truefalse + 5 nvr
    expect(pool.some((q) => q.type === 'numeric' || q.type === 'short')).toBe(false);
  });
});
