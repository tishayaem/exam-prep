import { describe, it, expect } from 'vitest';
import type { Question } from './types';
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

  // Vocab Sprint derives Leitner ids from the slugged term, so two terms in
  // one section that slug identically would silently share progress.
  it('has no duplicate vocabulary terms within a section', () => {
    const slug = (t: string) =>
      t.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-');
    const dupes = allSections.flatMap((s) => {
      const seen = new Set<string>();
      return s.vocabulary
        .map((v) => slug(v.term))
        .filter((t) => (seen.has(t) ? true : (seen.add(t), false)))
        .map((t) => `${s.id}: ${t}`);
    });
    expect(dupes).toEqual([]);
  });

  // Convention behind the Smart Practice "Problem-solving only" toggle: the
  // maths difficulty-3 tier IS the multi-step ISEB tier, so every d3 maths
  // question must carry the reasoning flag or it silently drops out of the
  // drill's pool.
  it('every maths difficulty-3 question is flagged reasoning', () => {
    const bad = allSections
      .filter((s) => s.subject === 'maths')
      .flatMap((s) => s.questions)
      .filter((q) => q.difficulty === 3 && !q.reasoning)
      .map((q) => q.id);
    expect(bad).toEqual([]);
  });

  // Number Sprint draws difficulty-1 numeric maths questions with answers
  // typeable on a decimal keypad. If edits drain this pool, the Home tile
  // leads to a drill with nothing worth drilling.
  it('the Number Sprint pool stays healthily stocked', () => {
    expect(numberSprintPool(allSections).length).toBeGreaterThanOrEqual(20);
  });

  it('every Codes question is a well-formed mcq with a parallel codes array', () => {
    const bad: string[] = [];
    for (const q of allQuestions.filter((q) => q.nvr?.kind === 'code')) {
      const nvr = q.nvr!;
      if (q.type !== 'mcq') bad.push(`${q.id}: code questions must be type mcq`);
      if (nvr.stem.length < 3) bad.push(`${q.id}: needs ≥2 examples + 1 unknown`);
      if (!nvr.codes || nvr.codes.length !== nvr.stem.length - 1)
        bad.push(`${q.id}: codes must label every stem figure except the last`);
      const lens = new Set([...(nvr.codes ?? []), first(q.answer)].map((c) => c.length));
      if (lens.size > 1) bad.push(`${q.id}: codes and answer must share one length`);
    }
    // And the only mcq questions carrying an nvr payload are code stems.
    for (const q of allQuestions.filter((q) => q.type === 'mcq' && q.nvr)) {
      if (q.nvr!.kind !== 'code') bad.push(`${q.id}: mcq nvr payload must be kind code`);
    }
    expect(bad).toEqual([]);
  });

  // Re-derive every code answer from the example figures: for each letter
  // position there must be a figure attribute that is constant within each
  // letter-group and distinct across groups, and reading the unknown figure
  // off that key must reproduce the stored answer. Catches both broken keys
  // and unsolvable/ambiguous constructions.
  it('every Codes question is mechanically solvable to its stored answer', () => {
    const ATTRS = ['shape', 'fill', 'size', 'rotation', 'dots', 'mirrored'] as const;
    const val = (f: NonNullable<Question['nvr']>['stem'][number], a: (typeof ATTRS)[number]) =>
      String(
        a === 'fill' ? f.fill ?? 'white'
        : a === 'size' ? f.size ?? 'md'
        : a === 'rotation' ? f.rotation ?? 0
        : a === 'dots' ? f.dots ?? 0
        : a === 'mirrored' ? f.mirrored ?? false
        : f.shape,
      );
    const bad: string[] = [];
    for (const q of allQuestions.filter((q) => q.nvr?.kind === 'code')) {
      const { stem, codes } = q.nvr!;
      if (!codes?.length) continue; // shape errors reported by the test above
      const examples = stem.slice(0, -1);
      const unknown = stem[stem.length - 1];
      let derived = '';
      for (let p = 0; p < codes[0].length; p++) {
        const groups = new Map<string, typeof examples>();
        examples.forEach((f, i) => {
          const letter = codes[i][p];
          groups.set(letter, [...(groups.get(letter) ?? []), f]);
        });
        const letters = new Set<string>();
        for (const a of ATTRS) {
          const byLetter = new Map<string, string>();
          let consistent = true;
          for (const [letter, figs] of groups) {
            const vals = new Set(figs.map((f) => val(f, a)));
            if (vals.size !== 1) { consistent = false; break; }
            byLetter.set(letter, [...vals][0]);
          }
          if (!consistent || new Set(byLetter.values()).size !== groups.size) continue;
          // `a` is a valid key for this position — read the unknown off it.
          for (const [letter, v] of byLetter) {
            if (v === val(unknown, a)) letters.add(letter);
          }
        }
        if (letters.size !== 1) {
          bad.push(`${q.id}: position ${p + 1} ${letters.size === 0 ? 'unsolvable' : 'ambiguous'}`);
          break;
        }
        derived += [...letters][0];
      }
      if (derived.length === codes[0].length && derived !== first(q.answer)) {
        bad.push(`${q.id}: derives to ${derived}, stored ${first(q.answer)}`);
      }
    }
    expect(bad).toEqual([]);
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
