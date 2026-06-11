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
**Current format verified (June 2026, ISEB's own support portal):**
English 40 min, Maths 40, NVR 30, VR 25 — ~2h15 total, splittable
across sittings, +25% access time if eligible. The 2025–26 test runs
on the **Century Tech platform**; pencil-and-paper rough working is
allowed; all questions are marked (no unscored items); NVR gained a
"how many cubes" type. **The old circulating timings (Eng 25 /
Maths 50 / VR 36 / NVR 32) are the pre-revision test — do not use.**

- [ ] **ISEB-style mock preset** in MockTest: per-subject timed blocks at
      current CPT pacing (Eng 40 / Maths 40 / NVR 30 / VR 25), MCQ-only
      pool, **forward-only — the real test has no back button, no skipping,
      no flagging** (confirmed June 2026, multi-source), so train
      commit-and-move-on. Question counts are unpublished (adaptive):
      calibrate by time, not count. Keep letter/number-code VR in the pool —
      the claim that Century-era VR dropped codes is **disputed** (see
      `stretch-problems.md`, Pass B verdict); settle it via the
      familiarisation test before re-weighting.
- [ ] **Family calendar item (not an app feature):** book the official ISEB
      familiarisation test (free, via iseb.co.uk) on the same iPad the child
      will use, and consider one MCQ-format external mock (Eleven Plus Exams
      mocks are MCQ — see `brighton-exam-intel.md` §5).
- [ ] **Writing rubric → published mark schemes** — refine the
      writing-practice self-mark rubric to the CSSE domains (Ideas /
      Vocabulary+Spelling / Grammar / Structure / Punctuation), folding in
      the Dulwich top-band descriptors (sensory language, sentence variety,
      paragraphing *for effect*) and the KCS "psychological depth" criterion;
      teach the **magnifying-glass technique** (describe three minutes, not a
      whole plot) and the TiToP-P paragraph rule in the lesson/check phases.
      All in `brighton-exam-intel.md` (Gemini section + §3).
- [x] **Prompt-bank genre check** — 2022 forum evidence says Brighton 11+
      writing has only ever been **descriptive/story**; the bank is already
      100% narrative/descriptive with no persuasive prompts. No change
      needed; keep persuasive out.
- [ ] **Classic-prose passages from the corpus** — build item 5's
      classic-prose section from the combined ~30-extract public-domain list
      in `brighton-exam-intel.md` (§4 + Gemini additions: exploration
      non-fiction like Shackleton/Scott, de la Mare's "The Listeners"), which
      also names downloadable school sample papers to mirror.
- [ ] **Activities-day group-task section in /interview** — proxy intel now
      exists (desert-island format, the observed-behaviour rubric, the
      "coached alpha" vs silence failure modes, the baton-pass move): add a
      short guide section + a few practice scenarios to the interview deck.
      See `brighton-exam-intel.md`, Gemini section.

## 7. Stretch tier — "interesting problems" (added 11 June 2026)

Two parallel research passes (`materials/11plus-research/stretch-problems.md`,
both cross-checked — read the verdict blocks before trusting an example)
mapped the competition canon (PMC, JMC Q1–15, Kangaroo Benjamin, MOEMS E,
NRICH, Parallel) into **~18 re-authorable problem families**. Rationale:
the adaptive test's hard tail and the December day's multi-step written
maths train on the same archetypes, and a 6-month runway needs curiosity,
not just drill. Author originals only — never copy competition questions;
re-derive every answer (Pass B's lift puzzle is provably wrong).

- [ ] **Puzzle Lab pack (maths stretch)** — new `maths-puzzles` pack built
      from the archetype library (working backwards, parity/invariants,
      systematic listing, rate traps, river crossings, cryptarithms,
      balance puzzles, Venn logic, pigeonhole, modular/clock…). Tag every
      item with the hardness driver(s) it trains: multi-step / unfamiliar
      context / distractor info / reading load / justify. Start with two
      sections × 20, difficulty graded within the stretch tier.
- [ ] **Verbal stretch pack** — word ladders (validate every rung is a real
      word), anagram + hidden-word cryptic-lite clues, Greek/Latin roots &
      word families. Text-only authoring; vocabulary terms feed
      VocabSprint automatically.
- [ ] **NVR stretch — ISEB-live types first** — "how many cubes"
      (heightmap data model) + painted-cube counting + cube nets, then
      symmetry/rotation. Declarative-text spatial prompts ("Imagine a
      5×5×5 cube…" — odd-sided for centre prompts) work today as `numeric`
      questions with zero new rendering. Nonograms/slitherlink parked
      (UI cost vs return).
- [ ] **Serving rule** — stretch items aim at ~80–85% success (both passes
      converge on that band; tune by item selection, not by easing items),
      low-floor/high-ceiling framing, no streak pressure. Simplest v1: a
      weekly "Puzzle mix" set on Home drawing across the stretch packs.
- [ ] **English candidate type: shuffled sentences** — reported in the
      current CPT English subtest; assess as a `sequence`-type question
      once the familiarisation test confirms what it looks like.

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
