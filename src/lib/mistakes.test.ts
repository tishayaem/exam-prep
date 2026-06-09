import { describe, it, expect } from 'vitest';
import type { Question } from '../data/types';
import type { AttemptLog } from './storage';
import { mistakesQueue, variantTwins } from './mistakes';

// ─── Builders ────────────────────────────────────────────────────────────────

function mkQuestion(id: string, variantOf?: string): Question {
  return {
    id,
    sectionId: 's',
    type: 'numeric',
    prompt: id,
    answer: '1',
    explanation: '',
    difficulty: 1,
    source: 'test',
    ...(variantOf ? { variantOf } : {}),
  };
}

function attempt(id: string, correct: boolean): AttemptLog {
  return { id, correct, ts: 0 };
}

// ─── mistakesQueue ───────────────────────────────────────────────────────────

describe('mistakesQueue', () => {
  it('is empty with no attempts', () => {
    expect(mistakesQueue([])).toEqual([]);
  });

  it('never queues a question that was only answered correctly', () => {
    expect(mistakesQueue([attempt('a', true), attempt('a', true)])).toEqual([]);
  });

  it('queues a question after one wrong answer', () => {
    expect(mistakesQueue([attempt('a', false)])).toEqual(['a']);
  });

  it('keeps a question queued after a single correct answer', () => {
    expect(mistakesQueue([attempt('a', false), attempt('a', true)])).toEqual([
      'a',
    ]);
  });

  it('graduates after two consecutive correct answers', () => {
    expect(
      mistakesQueue([attempt('a', false), attempt('a', true), attempt('a', true)]),
    ).toEqual([]);
  });

  it('restarts the count when a wrong answer breaks the streak', () => {
    expect(
      mistakesQueue([
        attempt('a', false),
        attempt('a', true),
        attempt('a', false),
        attempt('a', true),
      ]),
    ).toEqual(['a']);
  });

  it('tracks questions independently', () => {
    expect(
      mistakesQueue([
        attempt('a', false),
        attempt('b', false),
        attempt('a', true),
        attempt('a', true),
      ]),
    ).toEqual(['b']);
  });
});

// ─── variantTwins ────────────────────────────────────────────────────────────

describe('variantTwins', () => {
  const original = mkQuestion('q1');
  const variantA = mkQuestion('q1a', 'q1');
  const variantB = mkQuestion('q1b', 'q1');
  const loner = mkQuestion('q2');
  const all = [original, variantA, variantB, loner];

  it('finds the variants of an original', () => {
    expect(variantTwins(original, all).map((q) => q.id)).toEqual(['q1a', 'q1b']);
  });

  it('finds the original and siblings of a variant', () => {
    expect(variantTwins(variantA, all).map((q) => q.id)).toEqual(['q1', 'q1b']);
  });

  it('returns nothing for a question with no variant links', () => {
    expect(variantTwins(loner, all)).toEqual([]);
  });

  it('never includes the question itself', () => {
    for (const q of all) {
      expect(variantTwins(q, all).map((t) => t.id)).not.toContain(q.id);
    }
  });

  it('treats a dangling variantOf link as having no twins', () => {
    const dangling = mkQuestion('q3', 'does-not-exist');
    expect(variantTwins(dangling, [...all, dangling])).toEqual([]);
  });

  it('terminates on a cyclic variantOf link instead of hanging', () => {
    const x = mkQuestion('x', 'y');
    const y = mkQuestion('y', 'x');
    // A cycle is a data error; we only require a sane, finite result.
    expect(Array.isArray(variantTwins(x, [x, y]))).toBe(true);
  });
});
