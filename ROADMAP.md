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
- **Maths:** 420 questions — 14 curriculum sections × 20 plus the complete
  7-section **Puzzle Lab** stretch pack (`maths-puzzles`, all archetype
  families). Every answer double-checked in `src/data/maths-answers.test.ts`.
- **Verbal:** 8 sections × 20 = 160 — `vr-core` (5) plus the **Word Lab**
  stretch pack (ladders / cryptic-lite / roots). **Non-verbal:** 8 sections
  (~119 Qs) — `nvr-core` (6, incl. Codes, Most Similar and reflection
  traps) plus the **Cube Lab** stretch pack (figure-based "how many cubes"
  heightmaps + cube nets, answers machine-verified by a fold simulator).

**Next session, start here (handoff, 12 Jun 2026, evening — after the
Cube Lab / Puzzle mix / classic-prose session):**

1. **Activities-day group-task section in /interview** (§6) — the last
   unticked item with all its research in hand (desert-island format,
   observed-behaviour rubric, "coached alpha" vs silence failure modes,
   the baton-pass move — `brighton-exam-intel.md`, Gemini section).
2. **English §5 leftovers** — third SPaG section (clauses, apostrophe edge
   cases, direct speech); log writing-practice sessions to storage so the
   streak/resume tile see them. (Write-in comprehension drill stays parked
   until admissions confirm the December day's composition.)
3. **More classic prose** — `english-reading-04` (Grahame) established the
   pattern; the §4 corpus has ~30 more extracts (Dickens, Stevenson,
   exploration non-fiction, de la Mare). A second section or variantOf
   twins both work. Passage sourcing trick: gutenberg.org 403s from the
   sandbox, but the GITenberg GitHub mirrors serve the same files raw.
4. **NVR stretch round 2** (§7) — symmetry/rotation figures, and a
   figure-based painted-cube type if wanted (text version lives in
   maths-puzzles-05). The heightmap fair-figure contract in data.test.ts
   is the template for any new figure kind's honesty rules.
5. **Blocked on the familiarisation test:** shuffled-sentences English type;
   the disputed "ISEB VR dropped codes" claim (don't re-weight until then).

Ops notes for that session: this repo squash-merges PRs, so after a merge
reset the session's `claude/*` work branch onto `origin/main`
(`git reset --hard origin/main` + force-with-lease push) before new work.
Fresh containers need `npm ci`. Stretch-pack questions must carry
`reasoning: true` + ≥1 `drivers` tag and re-derived keys in the subject's
`*-answers.test.ts` — data.test.ts enforces all of it (stretch packs are
now flagged in `packs.ts`, not hardcoded). Any new long timer must use the
wall-clock pattern (see `WritingPractice.tsx` / `MockTest.tsx`). The GitHub
MCP `actions_list` result overflows — `jq` the saved file.
- **English:** 7 sections × 20 = 140 questions — reading ×4 (short passages,
  a long passage, non-fiction + poetry, classic prose), SPaG ×2, composition
  — plus the `/writing-practice` session runner with the CSSE-domain
  self-mark rubric. Keys in `english-answers.test.ts`.
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
- [x] **A classic-prose long passage** — *(Shipped 12 June 2026:
      `english-reading-04-classic-prose` — The Wind in the Willows ch. 1,
      verbatim 1908 text from the corpus (§4 entry 5), 20 questions in
      passage order: old-word swap-test vocabulary (pail / imperiously /
      seclusion / insatiable), the famous river personification, invented-
      word alliteration, mood inference. Lesson teaches the three
      classic-prose obstacles: old words, long sentences, dense technique.
      Keys re-derived in english-answers.test.ts.)*
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

- [x] **ISEB-style mock preset** in MockTest. *(Shipped 12 June 2026: third
      preset "ISEB pre-test style" — per-subject blocks at the verified CPT
      timings (Eng 40 / Maths 40 / NVR 30 / VR 25), tap-to-answer pool only
      (mcq/truefalse/nvr — `isebPool` in lib/mockPaper.ts), ~1.2 Qs/min so
      the clock ends the test (counts are unpublished), difficulty ramped
      d1→d3 to echo the adaptive escalation, science excluded, and the mock
      timer converted to wall-clock so screen-lock can't stall long papers.
      Forward-only was already the mock's behaviour; the rule cards now say
      so in CPT terms. Letter/number-code VR kept in the pool — the
      "Century dropped codes" claim stays disputed (see
      `stretch-problems.md`, Pass B verdict); re-weight only after the
      familiarisation test settles it.)*
- [ ] **Family calendar item (not an app feature):** book the official ISEB
      familiarisation test (free, via iseb.co.uk) on the same iPad the child
      will use, and consider one MCQ-format external mock (Eleven Plus Exams
      mocks are MCQ — see `brighton-exam-intel.md` §5).
- [x] **Writing rubric → published mark schemes** — *(Shipped 12 June 2026:
      the self-mark rubric's groups are now the five CSSE domains (Ideas /
      Vocabulary / Grammar / Structure / Punctuation), with 12 ticks built
      from the CSSE Band-4 descriptors, the Dulwich top band (sensory
      language, sentence variety, paragraphing FOR EFFECT) and the KCS
      psychological-depth criterion. The plan phase teaches the
      magnifying-glass technique, the write phase teaches Ti-To-P-P + the
      one-line-paragraph move, and the check phase gained the paragraph
      patrol with the // exam fix-up mark.)*
- [x] **Prompt-bank genre check** — 2022 forum evidence says Brighton 11+
      writing has only ever been **descriptive/story**; the bank is already
      100% narrative/descriptive with no persuasive prompts. No change
      needed; keep persuasive out.
- [x] **Classic-prose passages from the corpus** — *(First section shipped
      12 June 2026 — see item 5's classic-prose entry. The corpus still
      holds ~30 unused extracts (Dickens, Stevenson, Shackleton/Scott
      exploration non-fiction, de la Mare); further sections or variantOf
      twins are next-session material, sourced via the GITenberg GitHub
      mirrors since gutenberg.org blocks the sandbox.)*
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

- [x] **Puzzle Lab pack (maths stretch)** — new `maths-puzzles` pack built
      from the archetype library. Tag every item with the hardness driver(s)
      it trains: multi-step / unfamiliar context / distractor info / reading
      load / justify. *(Shipped 11 June 2026: `maths-puzzles-01-working-
      backwards` and `maths-puzzles-02-logic-and-certainty` — 2 × 20
      original questions, all `reasoning`-flagged with typed `drivers` tags
      (new `HardnessDriver` in types.ts, enforced by a data.test.ts
      contract), keys in `maths-answers.test.ts`, and excluded from the
      Number Sprint pool — riddles are the wrong tempo for a 60-second
      drill.)*
- [x] **More Puzzle Lab sections — archetype library COMPLETE** at
      7 × 20 = 140 questions. *(12 June 2026: `03-rates-and-journeys` (rate
      traps + crossings — incl. a correctly-derived ferry-weight puzzle
      replacing Pass B's broken one), `04-number-detective` (cryptarithms +
      digit properties), `05-seeing-in-3d` (spatial counting as text
      prompts — the live ISEB "how many cubes" family, odd-sided cubes for
      centre prompts), `06-clocks-and-cycles` (modular/clock + periodic
      patterns, incl. the remainder-zero trap), `07-balance-and-overlap`
      (pre-algebra balance + Venn logic). Every archetype family from the
      stretch-problems research is now represented.)*
- [x] **Verbal stretch pack** — *(Shipped 12 June 2026: new `vr-wordlab`
      "Word Lab" pack, 3 × 20: `01-word-ladders` (Carroll doublets — every
      rung hand-verified, forked ladders accept both rungs, difference-count
      minimum proofs), `02-crack-the-clue` (anagram / hidden-word / double-
      definition / reversal clue types, all letters verified), `03-word-roots`
      (Greek/Latin decoding toolkit; root vocab feeds VocabSprint). Same
      stretch contract — reasoning + drivers, enforced by the extended
      data.test.ts check — and 60 re-derived keys in vr-answers.test.ts.)*
- [x] **NVR stretch — ISEB-live types first** — *(Shipped 12 June 2026:
      new `nvr-cubelab` "Cube Lab" pack, 2 × 15. `NvrFigure` is now a union
      (flat shapes / isometric heightmap solids / cube nets) with one
      renderer. `01-how-many-cubes` draws the live CPT type as real
      figures — counts, floor-contact, fill-the-box — under a data.test.ts
      fair-figure contract (no column's top may be fully occluded; diagonal
      + valley rules derived from the projection). `02-cube-nets` covers
      valid-net picking, impostor spotting (2×2-block poison, same-side
      flaps), opposite faces and the skip-one rule. nvr-answers.test.ts
      re-derives every answer mechanically: heightmap sums and a cube-fold
      simulator (BFS face normals) for net validity + opposite pairs.
      Painted-cube counting stays text-only in maths-puzzles-05;
      symmetry/rotation figures are round 2. Nonograms/slitherlink parked.)*
- [x] **Serving rule** — *(Shipped 12 June 2026: `/puzzle-mix` + Home
      banner — ten puzzles re-rolled every ISO week from a seeded shuffle,
      stable all week like a newspaper puzzle page. Aims at the 80–85%
      band by tuning the d1/d2/d3 quota from recent stretch accuracy
      (selection, never easing): gentle ramp with no history, harder when
      cruising ≥85%, softer below 70%. Rotates across the stretch packs
      (now `stretch: true` in packs.ts), caps sections at 2, rests puzzles
      beaten in the last fortnight, serves easiest-first, no timer or
      streak pressure. Engine + tests in lib/puzzleMix.ts.)*
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
