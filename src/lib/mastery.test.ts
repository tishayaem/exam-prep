import { describe, it, expect } from 'vitest';
import type { Question, Section } from '../data/types';
import type { AttemptLog, LeitnerLevel, ProgressState } from './storage';
import {
  topicMastery,
  weakestTopics,
  rankQuestionsByNeed,
  pickAdaptive,
} from './mastery';

// ─── Builders ────────────────────────────────────────────────────────────────

function mkSection(id: string, n: number, qCount: number): Section {
  const questions: Question[] = Array.from({ length: qCount }, (_, i) => ({
    id: `${id}-q${i + 1}`,
    sectionId: id,
    type: 'numeric',
    prompt: `Q${i + 1}`,
    answer: '1',
    explanation: '',
    difficulty: 1,
    source: 'test',
  }));
  return {
    id,
    subject: 'maths',
    pack: 'maths-number',
    number: n,
    title: id,
    lesson: '',
    vocabulary: [],
    questions,
  };
}

const DAY = 86_400_000;
const NOW = 1_000 * DAY; // a fixed, large "now" so staleness is deterministic

function attempt(id: string, correct: boolean, daysAgo = 0): AttemptLog {
  return { id, correct, ts: NOW - daysAgo * DAY };
}

function stateOf(
  attempts: AttemptLog[],
  box: Record<string, LeitnerLevel> = {},
): ProgressState {
  return {
    box,
    attempts,
    xp: 0,
    streak: { count: 0, lastDay: null },
    mockResults: [],
  };
}

// ─── topicMastery: bands ─────────────────────────────────────────────────────

describe('topicMastery — bands', () => {
  const s = mkSection('s', 1, 8);

  it('is unseen with no attempts', () => {
    const t = topicMastery(s, [], {}, NOW);
    expect(t.band).toBe('unseen');
    expect(t.accuracy).toBe(0);
    expect(t.coverage).toBe(0);
    expect(t.lastTs).toBeNull();
  });

  it('is weak when recent accuracy is below half', () => {
    const attempts = s.questions.map((q, i) => attempt(q.id, i < 2)); // 2/8 right
    const t = topicMastery(s, attempts, {}, NOW);
    expect(t.band).toBe('weak');
    expect(t.accuracy).toBeCloseTo(0.25);
  });

  it('is strong only with high accuracy AND enough coverage', () => {
    const allRight = s.questions.map((q) => attempt(q.id, true));
    expect(topicMastery(s, allRight, {}, NOW).band).toBe('strong');

    // One question answered correctly twice: 100% accuracy but 1/8 coverage →
    // not strong yet, just developing.
    const thin = [attempt('s-q1', true), attempt('s-q1', true)];
    const t = topicMastery(s, thin, {}, NOW);
    expect(t.accuracy).toBe(1);
    expect(t.band).toBe('developing');
  });
});

// ─── topicMastery: recency window ────────────────────────────────────────────

describe('topicMastery — recency', () => {
  it('lets recent improvement outweigh an old shaky start', () => {
    const s = mkSection('s', 1, 8);
    // Two early wrongs, then ten recent corrects. Window is the last 10 → all right.
    const attempts: AttemptLog[] = [
      attempt('s-q1', false, 40),
      attempt('s-q2', false, 39),
      ...s.questions.map((q, i) => attempt(q.id, true, 5 - (i % 5))),
      attempt('s-q1', true, 1),
      attempt('s-q2', true, 0),
    ];
    const t = topicMastery(s, attempts, {}, NOW);
    expect(t.accuracy).toBe(1);
    expect(t.band).toBe('strong');
  });
});

// ─── priority ordering ───────────────────────────────────────────────────────

describe('priority + weakestTopics', () => {
  const weak = mkSection('weak', 1, 8);
  const dev = mkSection('dev', 2, 8);
  const strong = mkSection('strong', 3, 8);
  const sections = [weak, dev, strong];

  const attempts: AttemptLog[] = [
    ...weak.questions.map((q) => attempt(q.id, false)), // 0%
    ...dev.questions.map((q, i) => attempt(q.id, i < 5)), // ~63%
    ...strong.questions.map((q) => attempt(q.id, true)), // 100%
  ];
  const state = stateOf(attempts);

  it('orders weak > developing > strong by priority', () => {
    const w = topicMastery(weak, attempts, {}, NOW).priority;
    const d = topicMastery(dev, attempts, {}, NOW).priority;
    const st = topicMastery(strong, attempts, {}, NOW).priority;
    expect(w).toBeGreaterThan(d);
    expect(d).toBeGreaterThan(st);
  });

  it('weakestTopics ranks the weak topic first', () => {
    const ranked = weakestTopics(sections, state, NOW);
    expect(ranked[0].section.id).toBe('weak');
  });

  it('includeUnseen:false drops never-started topics', () => {
    const withUnseen = [...sections, mkSection('new', 4, 8)];
    const ranked = weakestTopics(withUnseen, state, NOW, { includeUnseen: false });
    expect(ranked.some((t) => t.section.id === 'new')).toBe(false);
  });
});

// ─── question ranking + adaptive pick ────────────────────────────────────────

describe('rankQuestionsByNeed + pickAdaptive', () => {
  const weak = mkSection('weak', 1, 8);
  const strong = mkSection('strong', 2, 8);
  const sections = [weak, strong];

  // Strong topic fully mastered (box 5); weak topic all wrong (box 1).
  const box: Record<string, LeitnerLevel> = {};
  strong.questions.forEach((q) => (box[q.id] = 5));
  const attempts: AttemptLog[] = [
    ...weak.questions.map((q) => attempt(q.id, false)),
    ...strong.questions.map((q) => attempt(q.id, true)),
  ];
  const state = stateOf(attempts, box);

  it('ranks a wrong question in a weak topic above a mastered one', () => {
    const ranked = rankQuestionsByNeed(sections, state, NOW);
    const weakIdx = ranked.findIndex((r) => r.question.sectionId === 'weak');
    const strongIdx = ranked.findIndex((r) => r.question.sectionId === 'strong');
    expect(weakIdx).toBeLessThan(strongIdx);
    expect(ranked[0].need).toBeGreaterThan(ranked[ranked.length - 1].need);
  });

  it('pickAdaptive returns the requested count and leans into the weak topic', () => {
    const picked = pickAdaptive(sections, state, 6, NOW);
    expect(picked).toHaveLength(6);
    const fromWeak = picked.filter((q) => q.sectionId === 'weak').length;
    expect(fromWeak).toBeGreaterThan(picked.length / 2);
  });

  it('respects the per-topic cap when the count can be met within it', () => {
    // 6 wanted, cap 3, two topics → exactly 3 each, no need to top up past the cap.
    const picked = pickAdaptive(sections, state, 6, NOW, { perTopicCap: 3 });
    expect(picked).toHaveLength(6);
    expect(picked.filter((q) => q.sectionId === 'weak')).toHaveLength(3);
    expect(new Set(picked.map((q) => q.id)).size).toBe(6); // no duplicates
  });

  it('tops up past the cap only when too few topics can fill the count', () => {
    // 8 wanted from two topics with cap 3 can't be met at 3 each (max 6), so the
    // top-up fills the rest — still without duplicates.
    const picked = pickAdaptive(sections, state, 8, NOW, { perTopicCap: 3 });
    expect(picked).toHaveLength(8);
    expect(new Set(picked.map((q) => q.id)).size).toBe(8);
  });

  it('never picks a question twice even when topping up past the cap', () => {
    // Demand more than one topic can supply under the cap.
    const picked = pickAdaptive([weak], state, 8, NOW, { perTopicCap: 2 });
    expect(new Set(picked.map((q) => q.id)).size).toBe(picked.length);
  });
});

// ─── pickAdaptive: reasoningOnly (the Problem-solving toggle) ────────────────

describe('pickAdaptive — reasoningOnly', () => {
  const a = mkSection('a', 1, 8);
  const b = mkSection('b', 2, 8);
  a.questions.slice(0, 2).forEach((q) => (q.reasoning = true));
  b.questions.slice(0, 3).forEach((q) => (q.reasoning = true));

  it('serves only reasoning-flagged questions', () => {
    const picked = pickAdaptive([a, b], stateOf([]), 4, NOW, {
      reasoningOnly: true,
    });
    expect(picked).toHaveLength(4);
    expect(picked.every((q) => q.reasoning)).toBe(true);
  });

  it('returns the whole flagged pool (and no more) when it is thin', () => {
    const picked = pickAdaptive([a, b], stateOf([]), 12, NOW, {
      reasoningOnly: true,
    });
    expect(picked).toHaveLength(5); // only 5 flagged questions exist
    expect(picked.every((q) => q.reasoning)).toBe(true);
  });

  it('combines with the subject filter', () => {
    const c = mkSection('c', 3, 8);
    c.subject = 'science';
    c.questions.slice(0, 2).forEach((q) => (q.reasoning = true));
    const picked = pickAdaptive([a, c], stateOf([]), 4, NOW, {
      reasoningOnly: true,
      subject: 'science',
    });
    expect(picked.length).toBe(2);
    expect(picked.every((q) => q.reasoning && q.sectionId === 'c')).toBe(true);
  });

  it('changes nothing when the toggle is off', () => {
    const all = pickAdaptive([a, b], stateOf([]), 6, NOW, {});
    const off = pickAdaptive([a, b], stateOf([]), 6, NOW, { reasoningOnly: false });
    expect(off.map((q) => q.id)).toEqual(all.map((q) => q.id));
  });
});

// ─── overdue / staleness ─────────────────────────────────────────────────────

describe('staleness', () => {
  it('raises priority for a topic not practised in a long time', () => {
    const s = mkSection('s', 1, 8);
    const box: Record<string, LeitnerLevel> = {};
    s.questions.forEach((q) => (box[q.id] = 3)); // ~4-day review interval

    const fresh = s.questions.map((q) => attempt(q.id, true, 0));
    const stale = s.questions.map((q) => attempt(q.id, true, 30));

    const pFresh = topicMastery(s, fresh, box, NOW).priority;
    const pStale = topicMastery(s, stale, box, NOW).priority;
    expect(pStale).toBeGreaterThan(pFresh);
  });
});
