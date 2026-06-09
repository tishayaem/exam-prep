import { describe, it, expect } from 'vitest';
import { allSections, allQuestions } from './index';
import { PACKS } from './packs';
import { gradeNumeric } from '../lib/grading';
import { numberSprintPool } from '../lib/numberSprint';

const first = (a: string | string[]): string => (Array.isArray(a) ? a[0] : a);
const packSlugs = new Set(PACKS.map((p) => p.slug));

describe('content integrity (all sections)', () => {
  it('has no duplicate section ids', () => {
    const ids = allSections.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has no duplicate question ids', () => {
    const ids = allQuestions.map((q) => q.id);
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(dupes).toEqual([]);
  });

  it('every question.sectionId matches its parent section', () => {
    const mismatches = allSections.flatMap((s) =>
      s.questions.filter((q) => q.sectionId !== s.id).map((q) => q.id),
    );
    expect(mismatches).toEqual([]);
  });

  it('every section belongs to a registered pack', () => {
    const orphans = allSections
      .filter((s) => !packSlugs.has(s.pack))
      .map((s) => `${s.id} → ${s.pack}`);
    expect(orphans).toEqual([]);
  });

  // Mistakes mode serves a variant twin for the second graduation answer, so
  // a broken link would silently disable that for the whole family.
  it('every variantOf points to a real question in the same section, not itself', () => {
    const byId = new Map(allQuestions.map((q) => [q.id, q]));
    const bad: string[] = [];
    for (const q of allQuestions) {
      if (!q.variantOf) continue;
      const target = byId.get(q.variantOf);
      if (!target) bad.push(`${q.id} → missing "${q.variantOf}"`);
      else if (target.id === q.id) bad.push(`${q.id} → itself`);
      else if (target.sectionId !== q.sectionId)
        bad.push(`${q.id} → ${q.variantOf} (different section)`);
    }
    expect(bad).toEqual([]);
  });

  it('every question has a prompt, explanation, source and valid difficulty', () => {
    const bad = allQuestions
      .filter(
        (q) =>
          !q.prompt || !q.explanation || !q.source || ![1, 2, 3].includes(q.difficulty),
      )
      .map((q) => q.id);
    expect(bad).toEqual([]);
  });
});

describe('answerability (every question can actually be marked correct)', () => {
  it('every MCQ answer is one of its choices', () => {
    const bad = allQuestions
      .filter((q) => q.type === 'mcq')
      .filter((q) => {
        const ans = first(q.answer).trim().toLowerCase();
        return !q.choices?.some((c) => c.trim().toLowerCase() === ans);
      })
      .map((q) => `${q.id}: "${first(q.answer)}"`);
    expect(bad).toEqual([]);
  });

  it('every true/false answer is True or False', () => {
    const bad = allQuestions
      .filter((q) => q.type === 'truefalse')
      .filter((q) => !['true', 'false'].includes(first(q.answer).trim().toLowerCase()))
      .map((q) => q.id);
    expect(bad).toEqual([]);
  });

  it('every numeric answer (and its acceptable forms) self-grades', () => {
    const bad: string[] = [];
    for (const q of allQuestions.filter((q) => q.type === 'numeric')) {
      if (!gradeNumeric(first(q.answer), q.answer, q.acceptable)) bad.push(q.id);
      for (const a of q.acceptable ?? []) {
        if (!gradeNumeric(a, q.answer, q.acceptable)) bad.push(`${q.id} (acceptable "${a}")`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('every match/sequence question carries its structured data', () => {
    const bad = allQuestions
      .filter((q) => q.type === 'match' || q.type === 'sequence')
      .filter((q) =>
        q.type === 'match' ? !q.pairs?.length : !q.sequence?.length,
      )
      .map((q) => q.id);
    expect(bad).toEqual([]);
  });

  // Number Sprint draws difficulty-1 numeric maths questions with answers
  // typeable on a decimal keypad. If edits drain this pool, the Home tile
  // leads to a drill with nothing worth drilling.
  it('the Number Sprint pool stays healthily stocked', () => {
    expect(numberSprintPool(allSections).length).toBeGreaterThanOrEqual(20);
  });

  it('every NVR question has figures and an in-range answer index', () => {
    const bad: string[] = [];
    for (const q of allQuestions.filter((q) => q.type === 'nvr')) {
      const nvr = q.nvr;
      if (!nvr) {
        bad.push(`${q.id}: missing nvr payload`);
        continue;
      }
      const choices = nvr.kind === 'odd-one-out' ? nvr.stem : nvr.options ?? [];
      if (choices.length < 2) bad.push(`${q.id}: needs at least 2 choices`);
      const idx = Number(first(q.answer));
      if (!Number.isInteger(idx) || idx < 0 || idx >= choices.length) {
        bad.push(`${q.id}: answer index "${first(q.answer)}" out of range`);
      }
      // Each kind needs the right stem shape for its layout.
      if (nvr.kind === 'analogy' && nvr.stem.length !== 3) {
        bad.push(`${q.id}: analogy needs exactly 3 stem figures (A, B, C)`);
      }
      if (nvr.kind === 'matrix' && nvr.stem.length !== 8) {
        bad.push(`${q.id}: matrix needs exactly 8 stem figures`);
      }
      if (nvr.kind === 'series' && nvr.stem.length < 2) {
        bad.push(`${q.id}: series needs at least 2 stem figures`);
      }
      if (nvr.kind !== 'odd-one-out' && !nvr.options?.length) {
        bad.push(`${q.id}: ${nvr.kind} needs an options array`);
      }
    }
    expect(bad).toEqual([]);
  });
});
