# Roadmap — agreed priorities (June 2026)

Working agreement from the planning session that built the adaptive engine and
deepened the maths bank. A fresh Claude session should pick up the **next
unchecked item**, follow the established patterns (listed at the bottom), and
check items off here as they land.

## Context — where things stand

- **Exam (corrected 11 June 2026 after a direct call to admissions):**
  **Brighton College 11+ is two-stage.** Stage 1: the **ISEB Common
  Pre-Test** — online, adaptive, **multiple-choice** (English, Maths, VR,
  NVR); Brighton accesses the results. Stage 2: the school's own December
  **Academic Assessment Day** (written papers; English likely comprehension
  + creative writing), then the January **Interview & Activities Day**.
  Offers by end of January; registration closes 30 Nov. Research:
  `materials/11plus-research/interview.md` (see its correction banner) and
  `brighton-exam-intel.md`. **Science is not examined at 11+** — keep the
  science bank as school revision, but stop admissions-driven work on it.
- **Still unconfirmed (ask admissions):** what the December day's papers
  consist of now that ISEB covers all four subjects at stage 1; the CPT
  sitting window/venue; paper weightings. The app hedges by training both
  formats — on-screen MCQ pacing AND write-in working/extended writing.
- **Maths:** complete at 280 questions — all 14 sections at 20, graded 1→3,
  multi-step with method-modelling explanations, ~60 `variantOf` links, every
  answer double-checked in `src/data/maths-answers.test.ts`.
- **Verbal:** 5 sections × 20, with the A–Z strip and the synonym/antonym
  bank. **Non-verbal:** 6 sections (~89 Qs) incl. Codes, Most Similar and
  reflection traps.
- **English:** 6 sections × 20 = 120 questions — reading ×3 (short passages,
  a long passage, non-fiction + poetry), SPaG ×2, composition — plus the
  `/writing-practice` session runner. Keys in `english-answers.test.ts`.
- **Interview:** `/interview` guide + practice deck, built from the research.
- **Engine:** `src/lib/mastery.ts` powers `/skills` (Skills Map) and
  `/smart-practice` (adaptive 12-question sessions); Mistakes serves
  `variantOf` twins; Mock Test has quick and full-paper presets.

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

- [x] **Codes question kind** — GL's official NVR paper is ~half Codes
      (shapes → letter pairs); the app has none. New `kind: 'code'` in
      `NvrQuestion` (`src/data/types.ts`) + layout in the NVR renderer.
- [x] **Reflection support** — the #1 NVR trap (reflection distractor vs
      rotation answer) is currently unauthorable: every `NvrFigure` shape is
      mirror-symmetric. Add `mirrored?: boolean` + 1–2 chiral shapes (flag,
      boot) to the figure schema and renderer.
- [x] **Deepen NVR sections to ~15–20 each**, including a "Most Similar"
      section (inverse of odd-one-out; in the research, absent from the app).

## 4. English (was: pending one answer from admissions)

- [x] **Confirm whether reasoning papers are part of the assessment** —
      resolved by the Brighton College research (June 2026, see
      `materials/11plus-research/interview.md`): the December day examines
      **Maths, English, VR and NVR**; Science is not examined. The one
      remaining admissions question is MCQ vs write-in (context above).
- [x] **English subject workstream** — comprehension, spelling/punctuation/
      grammar, composition prompts. *(Shipped with 64 questions across 4
      sections, then deepened to Brighton depth — item 5.)*

## 5. English to Brighton depth (June 2026)

English was the thinnest confirmed paper, so it got the maths/VR treatment:

- [x] **Long-passage fiction section** (`english-reading-02`) — one ~440-word
      story shared by all 20 questions, ordered the way real papers order them
      (passage order), teaching the long-text method: read once, questions as
      a map, scan back, swap test for word meanings.
- [x] **Non-fiction + poetry section** (`english-reading-03`) — a true
      WW2 carrier-pigeon text (fact vs opinion, purpose, structure) and an
      original 16-line poem (rhyme scheme, extended metaphor, mood shift).
- [x] **Top up `english-reading-01` and `english-writing-01`** from 12 to the
      established 20-question pattern.
- [x] **Writing practice mode** (`/writing-practice`) — 18-prompt bank
      (title / opening line / theme / scene), the real paper's rhythm on
      timers (5 min plan / 20 write / 5 check) with the story written on
      paper, then a self-mark rubric (ideas / structure / style / accuracy)
      to walk through with a grown-up.
- [ ] **A classic-prose long passage** — a public-domain extract (Dickens,
      Nesbit, Grahame…) with older vocabulary: the hardest comprehension
      flavour on independent-school papers, currently unrepresented.
- [ ] **Write-in comprehension drill** — stage 1 is confirmed MCQ, so the
      December day is the write-in venue; shift more comprehension questions
      to `short` type once the day's composition is confirmed.
- [ ] **Third SPaG section** — clauses, apostrophe edge cases, direct-speech
      punctuation in context.
- [ ] **Log writing-practice sessions to storage** so the streak and the Home
      resume tile know a session happened.

## 6. ISEB Pre-Test stage (added 11 June 2026 after the admissions call)

Stage 1 is an online, adaptive, multiple-choice test across all four
subjects — a format the app mostly trains already, minus the pacing.
Commonly circulated CPT timings (English ~25 min, Maths ~50, VR ~36,
NVR ~32) should be **verified against ISEB's official familiarisation
materials** before being hard-coded anywhere.

- [ ] **ISEB-style mock preset** in MockTest: per-subject timed blocks at
      CPT-like pacing, MCQ-only question pool, on-screen, no working —
      trains the stage-1 format the December-day banks deliberately don't.
- [ ] **Family calendar item (not an app feature):** book the official ISEB
      familiarisation test (free, via iseb.co.uk) on the same iPad the child
      will use, and consider one MCQ-format external mock (Eleven Plus Exams
      mocks are MCQ — see `brighton-exam-intel.md` §5).
- [ ] **Writing rubric → CSSE bands** — refine the writing-practice self-mark
      rubric to the published CSSE domains (Ideas / Vocabulary+Spelling /
      Grammar / Structure / Punctuation), the best public proxy for what
      markers reward; fold the ranked mark-losers into the check phase.
- [ ] **Classic-prose passages from the corpus** — build item 5's
      classic-prose section from the vetted 20-extract public-domain list in
      `brighton-exam-intel.md` §4 (Dickens / Stevenson / Nesbit tier +
      poetry), which also names downloadable school sample papers to mirror.

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
