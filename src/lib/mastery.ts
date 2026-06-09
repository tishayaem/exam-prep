import type { Question, Section, Subject } from '../data/types';
import type { AttemptLog, LeitnerLevel, ProgressState } from './storage';
import { PACKS, SUBJECTS, subjectTitle } from '../data/packs';

/**
 * The adaptive weak-area engine. Everything here is a pure function of the
 * attempt log + Leitner boxes the app already records — no new state. It turns
 * that raw history into:
 *   1. a per-topic strength reading (band + 0..1 priority), rolled up to pack
 *      and subject — what the Skills Map renders;
 *   2. a question ranking + diversity-capped picker that biases practice toward
 *      weak / under-covered / overdue topics — what Smart Practice runs.
 *
 * `now` is always a parameter (default Date.now()) so the staleness term is
 * deterministic in tests.
 */

export type MasteryBand = 'unseen' | 'weak' | 'developing' | 'strong';

export interface TopicMastery {
  section: Section;
  /** Total attempts logged against this section's questions. */
  attempts: number;
  /** Distinct questions attempted at least once. */
  seen: number;
  /** Questions in the section. */
  total: number;
  /** seen / total, 0..1. */
  coverage: number;
  /** Correct fraction over the most recent window of attempts, 0..1 (0 if unseen). */
  accuracy: number;
  /** Timestamp of the most recent attempt on this section, or null if unseen. */
  lastTs: number | null;
  /** Average Leitner box across the section's questions (an unseen question = 1). */
  avgBox: number;
  band: MasteryBand;
  /** 0..1, higher = practise sooner. Drives the Skills Map sort + Smart Practice. */
  priority: number;
}

export interface PackMastery {
  slug: string;
  title: string;
  subject: Subject;
  topics: TopicMastery[];
  accuracy: number;
  coverage: number;
  band: MasteryBand;
}

export interface SubjectMastery {
  subject: Subject;
  title: string;
  packs: PackMastery[];
  topics: TopicMastery[];
  accuracy: number;
  coverage: number;
  /** Whether any question in the subject has been attempted. */
  started: boolean;
}

export interface ScoredQuestion {
  question: Question;
  /** 0..1 — how much this specific question needs practice right now. */
  need: number;
}

// Only the most recent attempts shape the accuracy reading, so a child who has
// since improved isn't dragged down by their first-ever shaky go at a topic.
const RECENT_WINDOW = 10;

// Band thresholds on the recent-accuracy reading.
const WEAK_MAX = 0.5; // accuracy < 0.5 → weak
const DEVELOPING_MAX = 0.8; // accuracy < 0.8 → developing
const STRONG_COVERAGE = 0.6; // …and you must have seen ≥60% of the topic to be "strong"

// A not-yet-started topic sits between weak and developing in the queue: worth
// introducing, but never ahead of a known weakness.
const UNSEEN_PRIORITY = 0.5;

// Leitner box → target review interval in days (indexed 1..5). A topic is "due"
// once roughly this long has passed since its last attempt.
const BOX_INTERVAL_DAYS = [0, 1, 2, 4, 9, 21];
const DAY_MS = 86_400_000;

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

// ─── Per-topic ──────────────────────────────────────────────────────────────

export function topicMastery(
  section: Section,
  attempts: readonly AttemptLog[],
  box: Record<string, LeitnerLevel>,
  now: number = Date.now(),
): TopicMastery {
  const ids = new Set(section.questions.map((q) => q.id));
  const total = section.questions.length;

  const mine = attempts.filter((a) => ids.has(a.id));
  const seen = new Set(mine.map((a) => a.id)).size;
  const coverage = total === 0 ? 0 : seen / total;

  const window = mine.slice(-RECENT_WINDOW);
  const accuracy =
    window.length === 0
      ? 0
      : window.filter((a) => a.correct).length / window.length;

  const lastTs = mine.length ? mine[mine.length - 1].ts : null;
  const avgBox =
    total === 0
      ? 1
      : section.questions.reduce((s, q) => s + (box[q.id] ?? 1), 0) / total;

  const started = mine.length > 0;
  const band = bandFor(started, accuracy, coverage);
  const priority = started
    ? clamp01(
        0.6 * (1 - accuracy) +
          0.25 * (1 - coverage) +
          0.15 * staleness(avgBox, lastTs, now),
      )
    : UNSEEN_PRIORITY;

  return {
    section,
    attempts: mine.length,
    seen,
    total,
    coverage,
    accuracy,
    lastTs,
    avgBox,
    band,
    priority,
  };
}

function bandFor(started: boolean, accuracy: number, coverage: number): MasteryBand {
  if (!started) return 'unseen';
  if (accuracy < WEAK_MAX) return 'weak';
  if (accuracy < DEVELOPING_MAX || coverage < STRONG_COVERAGE) return 'developing';
  return 'strong';
}

/** 0..1 overdue-ness: 0 fresh, 0.5 exactly due, 1 at ≥2× the review interval. */
function staleness(avgBox: number, lastTs: number | null, now: number): number {
  if (lastTs === null) return 0;
  const interval = BOX_INTERVAL_DAYS[Math.max(1, Math.min(5, Math.round(avgBox)))];
  const days = (now - lastTs) / DAY_MS;
  return clamp01(days / interval / 2);
}

// ─── Roll-ups ───────────────────────────────────────────────────────────────

interface Rollup {
  coverage: number;
  accuracy: number;
  band: MasteryBand;
}

/**
 * Combine a group of topics. Coverage is the plain question-count ratio;
 * accuracy is weighted by how many attempts each topic carries, so a heavily
 * practised topic counts for more than a barely-touched one.
 */
function rollup(topics: TopicMastery[]): Rollup {
  const totalQ = topics.reduce((s, t) => s + t.total, 0);
  const seenQ = topics.reduce((s, t) => s + t.seen, 0);
  const coverage = totalQ === 0 ? 0 : seenQ / totalQ;

  const started = topics.filter((t) => t.attempts > 0);
  const weight = started.reduce((s, t) => s + t.attempts, 0);
  const accuracy =
    weight === 0
      ? 0
      : started.reduce((s, t) => s + t.accuracy * t.attempts, 0) / weight;

  return {
    coverage,
    accuracy,
    band: started.length === 0 ? 'unseen' : bandFor(true, accuracy, coverage),
  };
}

export function subjectMastery(
  subject: Subject,
  sections: readonly Section[],
  state: ProgressState,
  now: number = Date.now(),
): SubjectMastery {
  const packs: PackMastery[] = PACKS.filter((p) => p.subject === subject)
    .map((pd) => {
      const topics = sections
        .filter((s) => s.pack === pd.slug)
        .sort((a, b) => a.number - b.number)
        .map((s) => topicMastery(s, state.attempts, state.box, now));
      return { slug: pd.slug, title: pd.title, subject, topics, ...rollup(topics) };
    })
    .filter((p) => p.topics.length > 0);

  const topics = packs.flatMap((p) => p.topics);
  const r = rollup(topics);
  return {
    subject,
    title: subjectTitle(subject),
    packs,
    topics,
    accuracy: r.accuracy,
    coverage: r.coverage,
    started: topics.some((t) => t.attempts > 0),
  };
}

/** Every authored subject, in registry order, skipping ones with no content. */
export function allSubjectsMastery(
  sections: readonly Section[],
  state: ProgressState,
  now: number = Date.now(),
): SubjectMastery[] {
  return SUBJECTS.map((s) => subjectMastery(s.id, sections, state, now)).filter(
    (s) => s.packs.length > 0,
  );
}

/**
 * Topics sorted by priority (most in need first). Used for the "Focus next"
 * list and to preview what Smart Practice will target.
 */
export function weakestTopics(
  sections: readonly Section[],
  state: ProgressState,
  now: number = Date.now(),
  opts: { subject?: Subject; limit?: number; includeUnseen?: boolean } = {},
): TopicMastery[] {
  const topics = sections
    .filter((s) => (opts.subject ? s.subject === opts.subject : true))
    .map((s) => topicMastery(s, state.attempts, state.box, now))
    .filter((t) => (opts.includeUnseen === false ? t.band !== 'unseen' : true))
    .sort((a, b) => b.priority - a.priority || a.section.number - b.section.number);
  return opts.limit ? topics.slice(0, opts.limit) : topics;
}

// ─── Adaptive selection ─────────────────────────────────────────────────────

/** Map of question id → its most recent attempt (last write wins). */
function lastAttemptMap(attempts: readonly AttemptLog[]): Map<string, AttemptLog> {
  const m = new Map<string, AttemptLog>();
  for (const a of attempts) m.set(a.id, a);
  return m;
}

/**
 * Score every question by how much it needs practice. A question inherits half
 * its weight from its topic's priority (so weak topics float up), then gains:
 *   +0.30 if never attempted (close a coverage gap),
 *   +0.30 if the last attempt was wrong,
 *   up to +0.20 for a low Leitner box (shaky retention).
 */
export function rankQuestionsByNeed(
  sections: readonly Section[],
  state: ProgressState,
  now: number = Date.now(),
  subject?: Subject,
): ScoredQuestion[] {
  const last = lastAttemptMap(state.attempts);
  const out: ScoredQuestion[] = [];

  for (const section of sections) {
    if (subject && section.subject !== subject) continue;
    const topicPriority = topicMastery(section, state.attempts, state.box, now).priority;
    for (const q of section.questions) {
      const a = last.get(q.id);
      const box = state.box[q.id] ?? 1;
      const need = clamp01(
        0.5 * topicPriority +
          (a === undefined ? 0.3 : 0) +
          (a && !a.correct ? 0.3 : 0) +
          ((5 - box) / 4) * 0.2,
      );
      out.push({ question: q, need });
    }
  }

  out.sort((a, b) => b.need - a.need || a.question.id.localeCompare(b.question.id));
  return out;
}

/**
 * Pick `count` questions for an adaptive session: the highest-need questions,
 * but capped per topic so a single weak area can't swallow the whole set. If the
 * cap leaves us short (thin content), top up ignoring it.
 */
export function pickAdaptive(
  sections: readonly Section[],
  state: ProgressState,
  count: number,
  now: number = Date.now(),
  opts: { subject?: Subject; perTopicCap?: number } = {},
): Question[] {
  const ranked = rankQuestionsByNeed(sections, state, now, opts.subject);
  const cap = opts.perTopicCap ?? Math.max(2, Math.ceil(count / 3));

  const perTopic = new Map<string, number>();
  const out: Question[] = [];
  for (const { question } of ranked) {
    if (out.length >= count) break;
    const used = perTopic.get(question.sectionId) ?? 0;
    if (used >= cap) continue;
    perTopic.set(question.sectionId, used + 1);
    out.push(question);
  }

  if (out.length < count) {
    const have = new Set(out.map((q) => q.id));
    for (const { question } of ranked) {
      if (out.length >= count) break;
      if (!have.has(question.id)) out.push(question);
    }
  }
  return out;
}
