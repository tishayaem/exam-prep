import type { Section } from '../data/types';
import type { AttemptLog, ProgressState } from './storage';

export interface SectionProgress {
  /** Distinct questions in this section the user has ever answered correctly. */
  correct: number;
  /** Total questions in the section. */
  total: number;
  /** Any attempt — right or wrong — counts as "started". */
  started: boolean;
  /** Every question correctly answered at least once. */
  mastered: boolean;
  /** Percent 0–100, used for the progress bar. */
  pct: number;
}

export function getSectionProgress(
  section: Section,
  attempts: readonly AttemptLog[],
): SectionProgress {
  const total = section.questions.length;
  const ids = new Set(section.questions.map((q) => q.id));
  const correctIds = new Set<string>();
  let started = false;

  for (const a of attempts) {
    if (!ids.has(a.id)) continue;
    started = true;
    if (a.correct) correctIds.add(a.id);
  }

  const correct = correctIds.size;
  const pct = total === 0 ? 0 : Math.round((correct / total) * 100);
  return { correct, total, started, mastered: total > 0 && correct === total, pct };
}

/**
 * Pick the section the "Resume" hero CTA should point at.
 *
 * Strategy (in order):
 *   1. The section the user touched most recently — that's where their head is.
 *   2. The lowest-numbered started-but-not-mastered section — the obvious "carry on".
 *   3. The lowest-numbered not-started section — fresh start.
 *   4. Any section, as a last resort.
 *
 * Returns the chosen section and a one-line meta string for the hero subtitle.
 */
export function pickResume(
  state: ProgressState,
  sections: Section[],
): { section: Section; meta: string } | null {
  if (sections.length === 0) return null;

  const lastAttempt = state.attempts[state.attempts.length - 1];
  if (lastAttempt) {
    const lastSection = sections.find((s) =>
      s.questions.some((q) => q.id === lastAttempt.id),
    );
    if (lastSection) {
      const p = getSectionProgress(lastSection, state.attempts);
      if (!p.mastered) return { section: lastSection, meta: metaFor(p) };
    }
  }

  const inProgress = sections
    .map((s) => ({ s, p: getSectionProgress(s, state.attempts) }))
    .find(({ p }) => p.started && !p.mastered);
  if (inProgress) return { section: inProgress.s, meta: metaFor(inProgress.p) };

  const fresh =
    sections.find((s) => !getSectionProgress(s, state.attempts).started) ??
    sections[0];
  return { section: fresh, meta: metaFor(getSectionProgress(fresh, state.attempts)) };
}

function metaFor(p: SectionProgress): string {
  if (p.mastered) return `${p.total} of ${p.total} mastered`;
  if (p.started) {
    const left = p.total - p.correct;
    return `${p.correct} of ${p.total} done · ${left} to go`;
  }
  return `${p.total} questions · fresh start`;
}
