import { describe, it, expect } from 'vitest';
import {
  INTERVIEW_CATEGORIES,
  interviewGuide,
  interviewQuestions,
  questionsByCategory,
} from './interview';

const categoryIds = new Set(INTERVIEW_CATEGORIES.map((c) => c.id));

describe('interview content integrity', () => {
  it('has no duplicate question ids', () => {
    const ids = interviewQuestions.map((q) => q.id);
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(dupes).toEqual([]);
  });

  it('every question is complete (question, asking, ≥1 talking point)', () => {
    const bad = interviewQuestions
      .filter(
        (q) => !q.question || !q.asking || !q.talkingPoints?.length,
      )
      .map((q) => q.id);
    expect(bad).toEqual([]);
  });

  it('every question belongs to a registered category', () => {
    const orphans = interviewQuestions
      .filter((q) => !categoryIds.has(q.category))
      .map((q) => `${q.id} → ${q.category}`);
    expect(orphans).toEqual([]);
  });

  // Each filter chip on the practice deck must lead to a non-empty deck.
  it('every category has at least one question', () => {
    const empty = INTERVIEW_CATEGORIES.filter(
      (c) => questionsByCategory(c.id).length === 0,
    ).map((c) => c.id);
    expect(empty).toEqual([]);
  });

  it('has no duplicate category ids', () => {
    const ids = INTERVIEW_CATEGORIES.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every guide band has a number, title and some content', () => {
    const bad = interviewGuide
      .filter((b) => !b.number || !b.title || !(b.paras?.length || b.bullets?.length))
      .map((b) => b.title || '(untitled)');
    expect(bad).toEqual([]);
  });

  it('guide band numbers are unique', () => {
    const nums = interviewGuide.map((b) => b.number);
    expect(new Set(nums).size).toBe(nums.length);
  });
});
