# Roadmap — agreed priorities (June 2026)

Working agreement from the planning session that built the adaptive engine and
deepened the maths bank. A fresh Claude session should pick up the **next
unchecked item**, follow the established patterns (listed at the bottom), and
check items off here as they land.

## Context — where things stand

- **Exam:** ISEB **written** Common Entrance at 11+ (60 min maths paper,
  non-calculator, working must be shown). See the ISEB section in
  `materials/11plus-research/maths.md`. The written CE examines
  **English, Maths, Science** — VR/NVR only matter if the school also uses the
  ISEB Pre-Test or its own reasoning paper (→ item 4).
- **Maths:** complete at 280 questions — all 14 sections at 20, graded 1→3,
  ISEB-style multi-step with method-modelling explanations, ~60 `variantOf`
  links, every answer double-checked in `src/data/maths-answers.test.ts`.
- **Verbal:** 30 questions across 5 sections. Breadth is good (~20 of the 21
  GL types in `materials/11plus-research/verbal-reasoning.md` are touched) but
  only 1–3 questions per type.
- **Non-verbal:** 22 questions across 4 sections. Missing two real-exam
  elements (see item 3).
- **Engine:** `src/lib/mastery.ts` powers `/skills` (Skills Map) and
  `/smart-practice` (adaptive 12-question sessions). The Leitner box exists in
  storage; the `reasoning` flag on sections is set but read by nothing.

## 1. Maths quick wins (small, immediate)

- [x] **Variant-aware Mistakes loop** — Mistakes currently makes the child
      redo the *same* question twice, which can be passed by memorising the
      answer. When a failed question has `variantOf` twins (or is itself the
      original of variants), serve a twin for the second confirmation instead.
      Touches `src/lib/mistakes.ts` + `src/modes/Mistakes.tsx`.
- [x] **Number Sprint** — timed mental-arithmetic drill (45–60 s of
      difficulty-1 `numeric` maths questions), mirroring `VocabSprint.tsx`.
      Trains the quick-numeracy opening of the ISEB paper. New route + Home tile.
- [x] **Wire the `reasoning` flag** — a "Problem-solving drill" (filter or
      Smart Practice toggle) drawing only multi-step items.
- [x] **Exam-length mock option** — MockTest preset for a full 60-minute paper
      alongside the current 20 Q / 15 min quick mock.

## 2. Verbal Reasoning depth

- [x] **Deepen all 5 VR sections 6 → 20** (same treatment as maths): 3–4
      questions per named GL type, graded 1→3, `variantOf` links, and an
      independent answer-key suite (`src/data/vr-answers.test.ts`, modelled on
      the maths one).
- [x] **A–Z letter strip** rendered above letter-series/code questions (exam
      technique: children write out the alphabet; give them a tappable strip).
- [x] **Synonym/antonym word bank** — richer vocabulary content feeding
      VocabSprint; word knowledge is the #1 VR lever at this age.

## 3. Non-Verbal Reasoning — schema first, then depth

- [ ] **Codes question kind** — GL's official NVR paper is ~half Codes
      (shapes → letter pairs); the app has none. New `kind: 'code'` in
      `NvrQuestion` (`src/data/types.ts`) + layout in the NVR renderer.
- [ ] **Reflection support** — the #1 NVR trap (reflection distractor vs
      rotation answer) is currently unauthorable: every `NvrFigure` shape is
      mirror-symmetric. Add `mirrored?: boolean` + 1–2 chiral shapes (flag,
      boot) to the figure schema and renderer.
- [ ] **Deepen NVR sections to ~15–20 each**, including a "Most Similar"
      section (inverse of odd-one-out; in the research, absent from the app).

## 4. English (pending one answer from admissions)

- [ ] **Confirm with the school** whether reasoning papers are part of the
      assessment. English is a *confirmed* ISEB CE subject with **zero app
      content** — if reasoning isn't examined, English outranks items 2–3.
- [ ] **English subject workstream** — comprehension, spelling/punctuation/
      grammar, composition prompts. Follow "Adding a new subject" in CLAUDE.md.

## Established patterns to follow

- Sections: 20 questions, difficulty ladder 1→3, explanations model the
  working line by line, lesson ends with a "show your working" note, two
  Study-mode `examples` per section.
- Provenance tags in `source:` (`ISEB CE ·` / `11+ Maths ·` / `GL VR ·` …);
  `variantOf` whenever an item re-drills an existing skill with new numbers.
- Every new maths/VR answer gets an **independently re-derived** key in the
  answers test suite — never copied from the section file.
- Verify before claiming done: `npm run build` (not just typecheck), `npm test`,
  and say explicitly when visual verification in a browser hasn't happened.
- Deploys: push to `main` only with the user's go-ahead (Pages auto-deploys).
