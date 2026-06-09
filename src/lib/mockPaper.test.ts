import { describe, it, expect } from 'vitest';
import type { Question } from '../data/types';
import { buildMockPaper } from './mockPaper';

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
