import { describe, it, expect } from 'vitest';
import type { NvrShapeFigure, Subject } from './types';
import { allSections, allQuestions, questionsBySubject } from './index';
import { PACKS, STRETCH_PACK_SLUGS } from './packs';
import { gradeNumeric } from '../lib/grading';
import { numberSprintPool } from '../lib/numberSprint';
import { ISEB_MINUTES, isebPool } from '../lib/mockPaper';

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

  // The ISEB mock preset serves only tap-to-answer questions at CPT pacing.
  // Each pre-test subject needs a pool that comfortably outlasts its clock,
  // or the "ISEB pre-test style" option leads to a paper that ends early.
  it('every ISEB subject has a healthy tap-to-answer pool', () => {
    for (const subject of Object.keys(ISEB_MINUTES) as Subject[]) {
      expect(
        isebPool(questionsBySubject(subject)).length,
        subject,
      ).toBeGreaterThanOrEqual(30);
    }
  });

  // The stretch-pack contract (ROADMAP §7): every question in a pack flagged
  // `stretch` in the registry (Puzzle Lab, Word Lab, Cube Lab…) is
  // reasoning-flagged (it feeds the problem-solving drill) and carries at
  // least one hardness-driver tag for the Puzzle-mix serving rule.
  it('every stretch-pack question is reasoning-flagged and driver-tagged', () => {
    const stretch = allSections
      .filter((s) => STRETCH_PACK_SLUGS.has(s.pack))
      .flatMap((s) => s.questions);
    expect(stretch.length).toBeGreaterThan(0);
    const bad = stretch
      .filter((q) => !q.reasoning || !q.drivers?.length)
      .map((q) => q.id);
    expect(bad).toEqual([]);
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
    // Non-nvr-type questions may carry an nvr payload only as a render-only
    // stem: codes, cube solids and marked nets, on tap-to-answer types.
    for (const q of allQuestions.filter((q) => q.type !== 'nvr' && q.nvr)) {
      if (!['code', 'solid', 'net'].includes(q.nvr!.kind))
        bad.push(`${q.id}: ${q.type} nvr payload must be kind code, solid or net`);
      if (q.type !== 'mcq' && q.type !== 'truefalse')
        bad.push(`${q.id}: nvr stems only ride mcq/truefalse questions`);
      if ((q.nvr!.kind === 'solid' || q.nvr!.kind === 'net') && q.nvr!.stem.length === 0)
        bad.push(`${q.id}: render-only ${q.nvr!.kind} stem needs at least one figure`);
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
    const val = (f: NvrShapeFigure, a: (typeof ATTRS)[number]) =>
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
      if (stem.some((f) => !('shape' in f))) {
        bad.push(`${q.id}: code stems must be flat shape figures`);
        continue;
      }
      const examples = stem.slice(0, -1) as NvrShapeFigure[];
      const unknown = stem[stem.length - 1] as NvrShapeFigure;
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
      if (nvr.kind === 'most-similar' && nvr.stem.length !== 3) {
        bad.push(`${q.id}: most-similar needs exactly 3 stem figures`);
      }
      if (nvr.kind !== 'odd-one-out' && nvr.kind !== 'net' && !nvr.options?.length) {
        bad.push(`${q.id}: ${nvr.kind} needs an options array`);
      }
      // Tappable net questions: every option is a net; solids never tap.
      if (nvr.kind === 'net' && !nvr.options?.every((f) => 'net' in f)) {
        bad.push(`${q.id}: net options must all be net figures`);
      }
      if (nvr.kind === 'solid') {
        bad.push(`${q.id}: solid stems ride mcq questions, not type nvr`);
      }
    }
    expect(bad).toEqual([]);
  });

  // Cube-solid figures must be honest: rectangular height grids in a sane
  // range, and — the fair-figure contract — no column's top face may be
  // fully hidden in the isometric drawing, or the count stops being
  // deducible from the picture. Under the renderer's projection a column at
  // (r, c) of height h keeps its top visible iff (1) no column k steps down
  // the front diagonal reaches height h + k, and (2) its east and south
  // neighbours aren't BOTH taller (which would bury it in a valley).
  it('every cube-solid figure is well-formed and fairly drawn', () => {
    const bad: string[] = [];
    for (const q of allQuestions) {
      for (const f of [...(q.nvr?.stem ?? []), ...(q.nvr?.options ?? [])]) {
        if (!('solid' in f)) continue;
        const g = f.solid;
        const cols = g[0]?.length ?? 0;
        if (cols === 0 || g.some((row) => row.length !== cols)) {
          bad.push(`${q.id}: solid grid must be rectangular`);
          continue;
        }
        if (g.flat().some((h) => !Number.isInteger(h) || h < 0 || h > 4)) {
          bad.push(`${q.id}: heights must be integers 0–4`);
        }
        if (g.flat().every((h) => h === 0)) bad.push(`${q.id}: solid is empty`);
        for (let r = 0; r < g.length; r++) {
          for (let c = 0; c < cols; c++) {
            const h = g[r][c];
            if (h === 0) continue;
            for (let k = 1; r + k < g.length && c + k < cols; k++) {
              if (g[r + k][c + k] >= h + k) {
                bad.push(`${q.id}: column (${r},${c}) hidden by front diagonal`);
              }
            }
            const east = g[r][c + 1] ?? 0;
            const south = g[r + 1]?.[c] ?? 0;
            if (east > h && south > h) {
              bad.push(`${q.id}: column (${r},${c}) buried in a valley`);
            }
          }
        }
      }
    }
    expect(bad).toEqual([]);
  });

  // Net figures: exactly six distinct, edge-connected cells (impostor nets
  // are still six squares — that's what makes them traps), and marks, when
  // present, label every cell with no symbol used twice.
  it('every net figure is six connected squares with well-formed marks', () => {
    const bad: string[] = [];
    for (const q of allQuestions) {
      for (const f of [...(q.nvr?.stem ?? []), ...(q.nvr?.options ?? [])]) {
        if (!('net' in f)) continue;
        const { cells, marks } = f.net;
        if (cells.length !== 6) bad.push(`${q.id}: net needs exactly 6 cells`);
        const keys = new Set(cells.map(([r, c]) => `${r},${c}`));
        if (keys.size !== cells.length) bad.push(`${q.id}: duplicate net cells`);
        // Flood-fill connectivity over edge-adjacent cells.
        const seen = new Set<string>([`${cells[0][0]},${cells[0][1]}`]);
        const queue = [cells[0]];
        while (queue.length) {
          const [r, c] = queue.pop()!;
          for (const [nr, nc] of [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]]) {
            const k = `${nr},${nc}`;
            if (keys.has(k) && !seen.has(k)) {
              seen.add(k);
              queue.push([nr, nc]);
            }
          }
        }
        if (seen.size !== keys.size) bad.push(`${q.id}: net cells not connected`);
        if (marks) {
          if (marks.length !== cells.length)
            bad.push(`${q.id}: marks must parallel cells`);
          const used = marks.filter((m) => m !== null);
          if (new Set(used).size !== used.length)
            bad.push(`${q.id}: marks must not repeat`);
        }
      }
    }
    expect(bad).toEqual([]);
  });
});
