# Stretch tier — "interesting problems" research (competition-grade, beyond drill)

*Two parallel deep-research passes, both received 11 June 2026 (Pass A: Claude;
Pass B: Gemini), cross-checked against the repo's ground truth and each other.
Both are preserved verbatim below their verdict blocks. Unlike the Brighton
passes, these largely survived checking — with specific exceptions flagged.*

> **Cross-check verdict — Pass A (11 June 2026).** Verified against the repo's
> ground truth and a direct primary-source scout:
>
> - **ISEB facts match** the verified scout (Eng 40 / Maths 40 / NVR 30 /
>   VR 25; Century platform) and add three load-bearing new ones:
>   **forward-only navigation — no back button, no skipping** [High,
>   multi-source]; **per-subtest question counts are not published**
>   (adaptive — treat any fixed number as unreliable); the old circulating
>   timings are confirmed as **recent reductions** (VR 36→25, Maths 50→40,
>   NVR 32→30), corroborating the staleness call already in
>   `brighton-exam-intel.md`.
> - **Brighton two-stage handled correctly** (ground truth was supplied in
>   the brief, so this is compliance, not independent discovery).
> - **Arithmetic spot-check of the archetype worked examples: all correct**
>   (JMC sequence → 3; primes 73−23=50; domino invariant; cats-and-mice → 3;
>   digit-sum-20 → 299; clock 100h → 2 o'clock; min six piles → 21; hidden
>   cubes 3×3×3 → 1). JMC question *numbering* is not independently
>   verified — honour the report's own caveat and check against official
>   PDFs before leaning on a specific item.
> - **House note on licensing:** the report assumes a *commercial* app. This
>   app is non-commercial (free, single-user, public repo), so the IP
>   posture is safer than stated — but the rule stands regardless: author
>   originals from archetypes, never reproduce questions or official
>   solutions verbatim. NRICH (attribution) and Carroll's public-domain
>   Doublets are the most permissive materials.
> - **URLs are transcribed, not re-verified** — expect some rot, especially
>   the third-party MOEMS compilations (use those only to study archetypes).
>
> Actioned into `ROADMAP.md` §6 (ISEB preset spec: forward-only, calibrate
> by time not count) and new §7 (Puzzle Lab, verbal/NVR stretch, ~85%
> serving rule).

---

## Pass A as delivered (Claude deep research, 11 June 2026)

### TL;DR
- **Build the stretch tier from a confirmed, legally imitable canon.** The Primary Maths Challenge (ages 9–11), UKMT Junior Mathematical Challenge Q1–Q15, Math Kangaroo Benjamin (grades 5–6), MOEMS Division E (grades 4–6), Beast Academy 5, NRICH KS2 and Parallel (now serving from Year 6/age 10) are all age-appropriate for an able 10-year-old. You cannot copy their *questions* (UKMT, the MA/AiME and others assert copyright), but problem *archetypes and styles are not protectable* — author originals freely.
- **The real deliverable is a 13-archetype generator library** (working backwards, parity/invariants, systematic listing, shape dissection, rate/ratio traps, logic elimination, river-crossing constraints, etc.), each with a worked example, the curriculum topics it touches, and 2–3 "variation axes" so in-house authors can mass-produce originals. These map directly onto what makes the hard tail of adaptive tests and the final section of selective written papers genuinely difficult: multi-step depth, unfamiliar contexts, redundant/distractor information and high reading load.
- **Grade the stretch tier to a ~85% success target, not the 1–3 difficulty ladder used for drill, and serve it as low-floor/high-ceiling tasks with mastery framing rather than streaks.** Spatial/NVR and verbal stretch (pentominoes, cube-nets, "how many cubes", word ladders, cryptic-lite clues) are largely authorable as simple declarative figure descriptions (shape/fill/rotation/count) without bespoke art.

### Key Findings

**1. The maths competition canon is age-appropriate and overwhelmingly imitable.** Every source in the canon pitches at or below the able-10-year-old band, and none restricts the *style* of problem — only the verbatim text. This is exactly the right raw material for an in-house authored stretch tier.

**2. Archetypes, not topics, are the unit of difficulty.** Competition problems stretch precisely because they require choosing and chaining a *method* (work backwards, find an invariant, list systematically) onto familiar curriculum content. This is the same thing that distinguishes the hardest adaptive-test items and final written-paper questions.

**3. The hard tail is about cognitive load, not advanced content.** Named-school evidence (St Paul's Girls' sample paper) shows the final section escalates through invented operators, clock/modular arithmetic, dense tables with unit-traps, and multi-constraint reasoning — all built on KS2 content but demanding depth, justification and resistance to distractors.

**4. Verbal and spatial stretch is real, cheap to author, and under-served by GL drills.** Word ladders (Lewis Carroll's Doublets), cryptic-lite clue types, etymology/roots games, pentominoes, dissections, cube-nets and the newly official ISEB "how many cubes" type can nearly all be expressed as declarative specifications rather than drawn art.

**5. Grading should target ~85% accuracy.** The Wilson et al. (2019) "Eighty Five Percent Rule" and the productive-struggle literature converge on a ~15% error sweet spot — meaning the stretch tier needs its own grading logic, distinct from the curriculum bank's 1–3 ladder.

### §1 — The Primary Maths Competition Canon, Mapped

**Primary Maths Challenge (PMC), The Mathematical Association** — *[High; official publisher]*
- **Age pitch:** "Created by The Mathematical Association, the Primary Mathematics Challenge (PMC) is a fun and exciting mathematical challenge aimed at pupils aged 9 - 11 years old" (m-a.org.uk/primary-maths-challenge). The MA explicitly notes questions "are not heavily reliant on formal mathematical knowledge but can be solved by logical reasoning." MyMathsCloud frames it as "a good basis for use in the preparation for the 11 plus exam (a good stretch for the more able students aiming for top schools)… aimed at pupils aged 9 - 11 years old" *[Medium; tutoring convention]*. **This is the single best-fit competition for the target child.**
- **Paper structure:** The PMC paper has 25 questions — 20 multiple-choice, with the final five requiring a free answer where no choices are given (primarymathschallenge.org.uk). This MCQ-plus-free-answer split is itself a useful model for grading a stretch tier.
- **Archives:** Official past papers and answers via primarymathschallenge.org.uk/downloads and m-a.org.uk (e.g. the Nov 2022 Answers & Notes at m-a.org.uk/resources/Answersandnotesnov22v2.pdf). Mathsaurus (courses.mathsaurus.com) hosts 100+ PMC questions free with video solutions, "with permission from the Association for Mathematics in Education (AiME), who own the copyright to all questions from these papers."
- **Worked example (PMC Nov 2022, Q2):** "It costs 20p to charge my electric scooter which can then travel 25 miles. How much would it cost if this scooter travelled 100 miles?" → **80p** (100 ÷ 25 = 4 charges; 4 × 20p). A clean rate/ratio archetype.
- **Licensing:** AiME/MA own copyright on the questions; do **not** reproduce verbatim. Style is free to imitate.
- **App implication:** New "PMC-style" pack of logic-led, low-arithmetic problems graded to the stretch tier. *New pack.*

**UKMT Junior Mathematical Challenge (JMC)** — *[High; official publisher]*
- **Age pitch:** Officially for Years 7–8 (ages 11–13), "but there is no lower limit on the age of students who can participate" (mathsaurus.com). **The early questions (Q1–Q15, the 5-mark band) are appropriate for a strong Year 5**; later questions (Q16–25) escalate steeply. Note the UKMT *Primary* Challenge is "for students in years 5–6 (ages 9–11)" but is a team, teacher-only resource.
- **Archives:** Free recent past papers + solutions + "Solutions & Investigations" at ukmt.org.uk/past-papers (e.g. jmc-2019-q.pdf and jmc-2019-s.pdf). Mirrored at mathsaurus.com (free video solutions) and landoeducation.com.
- **Worked examples suited to a strong Y5 (JMC 2019, verified against official solutions):**
  - *Working backwards (Q12):* "Jamal writes down a sequence of six integers… after the first three terms, each term is the sum of the three previous terms. His sequence is —, —, —, 8, 13, 25. What is his first term?" → **3** (25−13−8=4; 13−4−8=1; 8−1−4=3).
  - *Multi-step with distractor (Q5):* "On Aoife's 16th birthday, Buster was three times her age. On Aoife's 21st birthday, how old was Buster?" → **53** (3×16=48, then +5). The tempting wrong answer 63 = 3×21 is a built-in trap.
  - *Systematic listing (Q13):* counting the number of ways to spell "JMC" by moving to neighbouring squares → **32**.
  - *Parity/prime-digit invariant (Q20):* largest minus smallest two-digit prime whose digits are all prime → **50** (73 − 23).
- **Licensing:** UKMT "asserts copyright over UKMT papers." Centres may reproduce for internal teaching only, non-commercially, with acknowledgement (ukmt.org.uk policy, 2024). A commercial app must **not** reproduce questions or official solutions; archetypes are free.
- **App implication:** "JMC-warm-up" pack pitched at the Q1–Q15 band; the single hardest stretch items can model the Q16–Q20 jump. *New pack + new hardest-tier difficulty.*

**Math Kangaroo** — *[High; official publisher for structure; Medium for UK availability]*
- **Age pitch / levels:** Pre-Ecolier (grades 1–2), Ecolier (3–4), **Benjamin (grades 5–6, ~ages 10–12)** is the band for the target child; Cadet (7–8), Junior (9–10), Student (11–12). Each test is multiple-choice, 3/4/5-point bands by difficulty, with a small penalty for wrong answers (matematica.pt; artofproblemsolving.com wiki).
- **Archives:** US site mathkangaroo.org has free sample questions by grade band and PDF past exams; matematica.pt and homesweetlearning.com host free multi-country past papers + keys. A UK "Primary Kangaroo" is reportedly launching for 2025/26.
- **Licensing:** Kangourou sans Frontières / Math Kangaroo own the questions. Imitate style only.
- **App implication:** Kangaroo-style multiple-choice items with plausible distractors (the distractor design is itself instructive). *New question kind: distractor-rich MCQ.*

**MOEMS Division E** — *[High; official publisher]*
- **Age pitch:** "Division E: Grades 4–6 recommended, but the contest is open for anyone in 6th grade or lower" (omegalearn.org; moems.org). Five contests/year, five non-routine problems each, 30-minute window — short, deep problems ideal for a stretch tier.
- **Archives:** Sample contests free at moems.org/pages/resources; large compiled PDF sets (1998–2023 Division E with solutions) circulate via intereseducation.com and Studocu/Scribd (third-party — use only to study archetypes, not to copy).
- **Worked example (MOEMS Division E, "cube layering" type):** how many additional unit cubes to complete a structure → strategy "visualise placing additional cubes layer by layer… 5 + 4 + 3 + 2 + 1 = 15." Touches spatial visualisation + triangular numbers.
- **Licensing:** MOEMS Inc. owns the questions. The official books even include "follow-up" variants — a model worth emulating in-house.
- **App implication:** Adopt MOEMS's "FOLLOW-UP" mechanic — every stretch problem ships with one auto-generated variant. *New question kind / generator pattern.*

**Beast Academy Level 5 (Art of Problem Solving)** — *[High; official publisher]*
- **Age pitch:** "Recommended for students ages 10–13"; Level 5 covers 3D solids/nets, integers, expressions & equations, statistics, factors/multiples, fractions, sequences, ratios/rates, decimals, exponents — i.e. it reaches into early middle-school depth while staying problem-solving-led.
- **Archives:** Paid (books + Beast Academy Online subscription); free placement tests and sample pages at beastacademy.com. The "Beast Academy Puzzles 5" book (400+ puzzles) is the richest archetype source.
- **Licensing:** Proprietary, paid. **Do not reproduce.** Use as inspiration for the *house style* of playful, comic-framed problem narratives.
- **App implication:** Borrow the engagement device — light narrative framing/characters around stretch problems. *Family action / product design, not a single feature.*

**NRICH (University of Cambridge, Millennium Maths Project)** — *[High; official publisher; freely usable with attribution]*
- **Age pitch:** Explicit "lower primary" and "upper primary" (KS2) collections, organised by *problem-solving skill* — working backwards, visualising, working systematically, conjecturing & generalising, trial-and-improvement (nrich.maths.org/problem-solving). The "Developing Able Young Mathematicians" and "Low Threshold High Ceiling" features are directly relevant.
- **Archives:** Entirely free at nrich.maths.org; curriculum-mapped to England KS2, Scotland, Wales. Key collection URLs: nrich.maths.org/stage-1-and-2-curriculum, /working-systematically-ks2-primary-teachers, /trial-and-improvement-ks2.
- **Licensing:** Free for educational use with attribution — the most permissive source, and the best model for archetype taxonomy.
- **App implication:** Use NRICH's skill taxonomy as the spine of the archetype library and its low-floor/high-ceiling design pattern as the grading philosophy. *New pack + grading change.*

**Parallel (Dr Simon Singh)** — *[High; official publisher]*
- **Year groups — confirmed update:** Parallel now serves "ages 10–16" and explicitly opened a **Parallel Academy Primary for Year 6 pupils** (Simon Singh, X/Twitter, 31 Jan 2025). Weekly "Parallelograms" run Year 6 to Year 11; the homepage states "For ages 10-16 anywhere in the world. 100% free." So it **now reaches the target child (age 10) from Year 6**, whereas the small-group tutorial Academy historically began at Year 7.
- **Archives:** Free weekly Parallelograms (≈6 problems, 15–30 min, auto-marked with solutions) and free Maths Circles at parallel.org.uk; account required (free).
- **Licensing:** Free to use the platform; do not republish their problems. Style — "mystery and history, activities and oddities, puzzles and problems" — is the model.
- **App implication:** Adopt the weekly themed "mixed bag" format (a little history + a puzzle + a stretch problem) as a cadence for serving stretch content. *New serving pattern.*

### §2 — The Archetype Library (the core deliverable)

Thirteen fertile archetypes. For each: a worked example (re-derivable answer), why it stretches, curriculum topics touched, and variation axes for authoring originals.

**A1. Working backwards.** *Example:* "A number is doubled, then 7 is subtracted, giving 19. What was it?" → reverse: (19+7)÷2 = **13**. *Stretches:* forces inverse operations and planning from the goal state. *Curriculum:* four operations, inverse relationships, simple equations. *Variation axes:* (i) length of the operation chain; (ii) operation mix (include halving/squaring); (iii) embed in a story (ages, money, sequences as in JMC Q12).

**A2. Parity & invariants.** *Example:* "Can you cover an 8×8 board with two opposite corners removed using 31 dominoes?" → **No**; each domino covers one black + one white square, but removing two same-colour corners leaves 32 vs 30. *Stretches:* introduces the idea that *something never changes* regardless of moves. *Curriculum:* odd/even, multiples, area. *Variation axes:* (i) colouring argument vs counting argument; (ii) board/grid size; (iii) recast as coins, switches, or handshakes.

**A3. Systematic listing / casework.** *Example:* "How many three-digit numbers use only digits 1, 2, 3 with no repeats?" → 3×2×1 = **6**; list them. *Stretches:* rewards organised exhaustion over guessing. *Curriculum:* place value, permutations/combinations (informal), probability. *Variation axes:* (i) with/without repetition; (ii) add a constraint (even, sum to 6); (iii) increase digit set.

**A4. Shape dissection & rearrangement.** *Example:* "Cut an L-shaped room (an 8×8 square missing a 4×4 corner) into two rectangles and find its area." → 64−16 = **48**. *Stretches:* decomposition of composite shapes. *Curriculum:* area, perimeter, properties of rectangles. *Variation axes:* (i) target shape (square→triangle); (ii) number of pieces; (iii) ask for *minimum* cuts (links to pentominoes).

**A5. Rate / ratio traps.** *Example (Kangaroo-style):* "If 3 cats catch 3 mice in 3 minutes, how many cats catch 100 mice in 100 minutes?" → **3** (each cat catches 1 mouse per 3 minutes). *Stretches:* defeats the naive "scale everything up" instinct. *Curriculum:* ratio, proportion, rate, time. *Variation axes:* (i) which quantity is held constant; (ii) inverse vs direct proportion; (iii) closing-gap/relative-speed framing (as in PMC Nov 2022 Q8: gap closes at 7+4=11 cm/s).

**A6. Logic elimination / grid logic.** *Example:* "Three friends own a cat, dog, fish. Anna doesn't own the cat. Ben owns the fish. Who owns what?" → Ben=fish, so Anna=dog, Cara=cat. *Stretches:* deduction from negative and positive constraints. *Curriculum:* logical reasoning, sets. *Variation axes:* (i) number of entities/attributes; (ii) proportion of negative clues; (iii) add a red-herring clue (distractor training).

**A7. Crossing-the-river / state-constraint puzzles.** *Example:* "Wolf, goat, cabbage, one boat seat. The farmer can't leave wolf+goat or goat+cabbage alone. Minimum crossings?" → **7** crossings (take goat, return, take wolf, bring goat back, take cabbage, return, take goat). *Stretches:* planning a sequence of reversible states under constraints. *Curriculum:* logical reasoning, sequencing. *Variation axes:* (i) number of items/forbidden pairs; (ii) boat capacity; (iii) ask for minimum vs any solution.

**A8. Pattern → generalisation.** *Example:* "1+3+5+…+(2n−1) = ?" → **n²** (square numbers). *Stretches:* moving from instances to a rule (the heart of "real" mathematics, per NRICH). *Curriculum:* sequences, square/triangular numbers, early algebra. *Variation axes:* (i) linear vs quadratic pattern; (ii) figural (dot/matchstick) vs numeric; (iii) ask to *justify*, not just continue (as in SPGS Section C).

**A9. Pigeonhole / guaranteed outcomes.** *Example:* "A drawer has red and blue socks. How many must you pull to be sure of a matching pair?" → **3**. *Stretches:* reasoning about worst cases and certainty. *Curriculum:* logic, counting. *Variation axes:* (i) number of categories; (ii) "matching pair" vs "two of one colour"; (iii) embed in calendar/birthday contexts.

**A10. Digit & number-property puzzles.** *Example:* "What is the smallest positive integer whose digits add to 20?" → **299**. *Stretches:* place-value reasoning under a constraint. *Curriculum:* place value, divisibility, digit sums. *Variation axes:* (i) smallest vs largest; (ii) add divisibility (divisible by 3); (iii) cryptarithm framing (letters for digits).

**A11. Clock / modular & cyclic reasoning.** *Example:* "It is 10 o'clock. What time is it 100 hours later?" → 100 mod 12 = 4 → **2 o'clock**. *Stretches:* cyclical (modular) thinking without the vocabulary. *Curriculum:* time, remainders, multiples. *Variation axes:* (i) 12- vs 24- vs 7-day cycle; (ii) forwards/backwards; (iii) "clock arithmetic" operations (as in the SPGS unseen-context question).

**A12. Optimisation / extremal reasoning.** *Example:* "Six piles each have a different number of pennies, at least one each. Smallest possible total?" → 1+2+3+4+5+6 = **21** (MOEMS Division E archetype). *Stretches:* finding the minimum/maximum subject to constraints. *Curriculum:* addition, ordering, inequalities (informal). *Variation axes:* (i) min vs max; (ii) "all different" vs other constraints; (iii) route/network optimisation (shortest path).

**A13. Visualisation & spatial counting ("how many cubes").** *Example:* "A 3×3×3 cube is built from unit cubes. How many unit cubes are completely hidden inside?" → the inner 1×1×1 = **1**. *Stretches:* 3D visualisation from 2D representation — now an official ISEB NVR type. *Curriculum:* 3D solids, volume, nets. *Variation axes:* (i) cube size; (ii) "hidden" vs "painted on n faces" vs "total visible"; (iii) irregular stacks viewed from one corner.

> **Authoring note (load-bearing):** Each archetype's *variation axes* are the productisation lever. A single archetype × 3 axes × 3 settings per axis can yield dozens of original, copyright-clean items. This is the generator spec the content team should build against.

### §3 — What the Hard Tail Actually Looks Like

**Adaptive tests (ISEB CPT):** Because the test is adaptive and gives "questions based on their previous answers," the hard tail a strong child reaches is, by design, non-routine. Confirmed 2025–26 structure *[High; official publisher + platform with school partnerships]*: ISEB states the four tests "cover English, mathematics, verbal reasoning (VR) and non-verbal reasoning (NVR) and will take 2 hours 15 minutes to complete" (iseb.co.uk, for-families). Per-subtest timings (Atom Learning, accessed Jun 2026): English 40 / Maths 40 / NVR 30 / VR 25 minutes. **There is no back button** — "once your child selects an answer and moves on, they cannot return to review it… no question can be skipped" (Atom). A child cannot leave a question blank and must triage. The maths is Year-5-curriculum content but, in Atom's words, "the questions range from arithmetic to multi-step problem solving" and "children in Year 6 often find this section challenging."

**Selective written papers (St Paul's Girls' School official sample, three 25-min sections):** *[High; school-published]* Difficulty escalates sharply into the final Section C:
- **Invented operators / unseen contexts:** "The symbol ϕ represents a mathematical rule… add the two numbers and then multiply their sum by the second number… If 6 ϕ ▢ = 91, what positive number must ▢ be?" and "Explain why x ϕ y is not the same as y ϕ x" (reverse-engineering + justification).
- **Clock/modular arithmetic with no scaffolding:** counting on a 12-clock where "4 + 9 = 1" and "3 × 5 = 3", then asked to find n, m with n² = m² in that system.
- **Dense tables + unit-trap distractors (Section A Q16):** a full 6-town distance matrix in *miles*, then "One of the towns is 194 km from Penzance" — a deliberate unit distractor and high reading load.
- **Multi-constraint simultaneous reasoning (Section B):** four interlocking pile-size constraints; a parity/invariance coin puzzle ("One quarter show heads… turn over two… one third show heads. How many coins?").

**The five hardness drivers** (evidenced above): (1) multi-step chained deduction; (2) unfamiliar/invented contexts; (3) redundant/distractor information and unit traps; (4) high reading load with simultaneous constraints; (5) demand for justification/generalisation. **Cross-check:** the §2 archetypes cover all five — A1/A8/A12 (multi-step + generalisation), A11/A13 (unfamiliar contexts), A6 (distractor clues), A2/A9 (invariance/certainty). The library is well-matched to the hard tail.

**App implication:** Tag every stretch item with which hardness driver(s) it trains, and deliberately author "distractor-rich" and "redundant-information" variants — these are under-represented in standard drill banks. *New question kind + new tagging dimension.*

### §4 — Verbal Stretch Beyond GL Drills

**Word ladders / Doublets (Lewis Carroll, 1877).** *[High; primary historical source + educational use]* Change one word to another one letter at a time, each step a real word (COLD→CORD→CARD→WARD→WARM). Per Wikipedia, Carroll "invented the game on Christmas in 1877… first mention… in Carroll's diary was on 12 March 1878, which he originally called 'Word-links'… published a series of word ladder puzzles… called 'Doublets', in the magazine *Vanity Fair*, beginning with the 29 March 1879 issue." Rich variation space is documented: synonym/antonym endpoints, add/remove-a-letter variants, anagram steps, and the "ideal" n-letters-in-n-moves form (Borgmann). Free archives: cut-the-knot.org/SimpleGames/WordLadders.shtml (original Carroll puzzles + solutions), byrdseed.com, 15worksheets.com. **Authorable as pure declarative data** (start word, end word, optional step count) — no art. *New pack: Word Ladders, with an auto-solver to validate authored puzzles.*

**Logic-grid puzzles with verbal framing.** *[High; convention + educational]* See archetype A6. Reported as engaging for 11-year-olds (mathequalslove.net). Authorable as a clue list + entity/attribute matrix. *New question kind.*

**Cryptic-crossword-lite clue types for children.** *[Medium; tutoring convention + reference]* A graded entry path exists: start with the two easiest, most child-accessible clue types — **anagrams** (a "mixing" indicator + letters) and **hidden words** (answer concealed across adjacent words, e.g. "undermined" hidden in a phrase) — explicitly recommended for beginners (studyseed.co.uk). Then double-definitions, charades, reversals (EDAM = MADE reversed). Free references: studyseed.co.uk/cryptic-crosswords-for-children-and-beginners; dummies.com cheat sheet; gamesworldofpuzzles.com. **Authorable as text** (clue + answer + clue-type tag). *New pack: "Crack the Clue," sequenced anagram → hidden → double-definition.*

**Etymology / vocabulary-through-roots games.** *[Medium; convention]* Build words from Greek/Latin roots (tele-, -graph, -scope), a known route to wide vocabulary that also powers GL synonym/antonym questions. Authorable as root → meaning → word-family items. *New pack: roots & word families (doubles as VR vocabulary builder).*

**App implication:** A verbal stretch stream is low-cost (all text), differentiates the app from GL drill, and feeds back into VR performance. *New packs; minimal art.*

### §5 — Spatial / NVR Stretch Beyond GL Drills

The authoring question is which puzzles can be expressed as **declarative figure descriptions (shape / fill / rotation / count)** rather than bespoke illustration. Assessment:

- **Pentominoes** *[High]* — the 12 shapes of five connected squares; fit them into rectangles/silhouettes. **Authorable as a grid + piece-placement spec**; renderable from coordinates. Free: superteacherworksheets.com, NRICH. *Authorable.*
- **Tangrams / dissection** *[High]* — rearrange a fixed 7-piece set into target silhouettes. Authorable as a target outline + piece list, but **target silhouettes need light art**; medium cost. *Partly authorable.*
- **Cube nets ("which net folds to this cube")** *[High; matches ISEB NVR]* — declarative: specify the 6 face contents + the net layout; opposite-faces and rotation rules generate the distractors (blackstonetutors.com worked examples). *Fully authorable from a face/net data model.*
- **"How many cubes" / stacks** *[High; now an official ISEB NVR type]* — specify a stack as a grid of column heights; count total/hidden/visible. Atom confirms "a new non-verbal reasoning question type has been added ('how many cubes')." *Fully authorable from a heightmap.*
- **Nonograms / Picross** *[High]* — fill a grid from row/column run-length clues to reveal a picture. **Fully authorable**: store the target bitmap, auto-derive clues. Strengthens logical deduction and spatial reasoning; widely used with upper-primary children. Free: mathequalslove.net, puzzle-nonograms.com. *Fully authorable.*
- **Slitherlink-lite** *[Medium]* — connect dots into a single loop where each numbered cell shows how many of its sides are used. Authorable as a number grid + solution loop, but harder for a 10-year-old; reserve for the top of the ceiling. *Authorable; pitch carefully.*
- **Symmetry & rotation puzzles** *[High]* — "complete the figure to make it symmetric"; "which option is this shape rotated 90°?" Authorable as a grid + transformation rule. *Fully authorable.*

**App implication:** Prioritise the four *fully* authorable, declarative types — **cube nets, "how many cubes", nonograms, symmetry/rotation** — for an NVR stretch pack; they need a data model and a renderer, not an illustrator, and two of them mirror live ISEB types. *New pack + a small figure-rendering engine.*

### §6 — Engagement Evidence (light touch)

- **The ~85% success sweet spot.** *[High; peer-reviewed]* Wilson, Shenhav, Straccia & Cohen, "The Eighty Five Percent Rule for optimal learning," *Nature Communications* 10:4646 (5 Nov 2019), DOI 10.1038/s41467-019-12552-4: "the optimal error rate for training is around 15.87% or, conversely… the optimal training accuracy is about 85%." The result is formally about gradient-descent learners; **apply it as a heuristic, not a law, for a child**, but it converges with classroom evidence.
- **Productive struggle.** *[Medium; practitioner + research synthesis]* Blackburn (ASCD) defines the "sweet spot" between scaffolding and support; Bjork's "desirable difficulties" show that effortful retrieval beats fluent re-reading. Visible Learning synthesis cited at ~0.74 SD growth for productive struggle (educationblogdesk.com — secondary source, treat cautiously). Crucially, "most struggle is not productive" — difficulty must be *calibrated*, not maximal.
- **Low-floor/high-ceiling (LFHC).** *[High; official publisher]* NRICH's design principle: tasks every child can start but that extend indefinitely. Ideal for a stretch tier serving one able child who must not hit a wall or a ceiling.
- **Streaks vs mastery.** *[Low–Medium; convention]* No strong child-specific evidence surfaced that streak mechanics aid deep problem-solving; the productive-struggle and desirable-difficulty literatures favour *mastery* framing (revisit, vary, justify) over speed/streak rewards, which can push children to easy wins.

**App implication (grading change — load-bearing):** Grade the stretch tier to a **~85%-correct target by adjusting item selection, not by easing items**, present tasks as low-floor/high-ceiling, and reward mastery/revisiting over streaks. This is a *different grading philosophy* from the 1–3 curriculum ladder and should be a separate engine. *Grading change.*

### Side-quest — Current ISEB CPT Taxonomy (date-stamped)

- **Platform & structure (2025–26)** *[High; official publisher + platform with school partnerships]:* CENTURY has been the technical provider since 2022 (century.tech). Four adaptive MCQ subtests, 2h15 total (iseb.co.uk): English 40 / Maths 40 / NVR 30 / VR 25 minutes (Atom, accessed Jun 2026). **These are recent reductions:** Clarendon Tutors notes "The VR section will be 25 minutes this year (previously it was 36 minutes long)… The maths section is 40 minutes this year (previously it was 50 minutes long)… The NVR section will be 30 minutes this year (previously it was 32 minutes long)" — so any pre-2025 timing claims are stale.
- **Navigation:** **No back button; cannot revisit or skip** — "once your child selects an answer and moves on, they cannot return to review it" (Atom, 2026; corroborated by century.tech and pre-test.co.uk). *[High]*
- **Question count per subtest:** **Not officially published** — adaptive, varies per candidate. Treat any fixed third-party number as unreliable. *[High confidence that it is unpublished]*
- **VR types ISEB uses vs the GL 21-type convention:** The "21 types" is a **GL Assessment** convention (cotswoldeducation.co.uk, visuteach.com, elevenplusexams.co.uk), not an ISEB-published taxonomy. ISEB describes VR functionally — "letter, word and language-based questions" testing logic and comprehension (Atom) — and does **not** publish a 21-type list. **For ISEB, treat the GL 21 as a *superset to sample from*, not the actual ISEB spec.** *[Medium; convention vs official]* — **flag for the publisher.**
- **Recently-added types:** Atom reports a maths/NVR **"how many cubes"** type added, plus earlier 2022 additions "how many blocks?" and "silhouettes." *[Medium; platform with school partnerships]* Pre-2025 format claims should be treated as stale.
- **Brighton College specifics:** All 11+ applicants sit the ISEB CPT, usually autumn of Year 6; maths "questions range from arithmetic to multi-step problem solving," based on the Year 5 curriculum (atomlearning.com/blog/brighton-college). Brighton also runs its **own December written papers** and a January interview/activities day; the written maths "is not multiple-choice and marks are awarded for showing workings" (per the school's 13+ description; **confirm the 11+ written paper marking convention with admissions**). *[Medium; school-published + tutoring]*

### Recommendations

**Stage 1 (months 0–1): Stand up the archetype generator.** Build the §2 library as the spine, using NRICH's skill taxonomy and MOEMS's "follow-up variant" mechanic. Author the first 40–50 originals across A1–A13, each tagged with (a) archetype, (b) curriculum topic, (c) hardness driver(s) from §3. *Benchmark to advance:* a content author can produce ≥10 clean originals/day from the variation axes.

**Stage 2 (months 1–3): Add the verbal and spatial stretch streams.** Ship Word Ladders (with auto-validator), anagram/hidden-word cryptic-lite clues, and the four *fully authorable* NVR types (cube nets, "how many cubes", nonograms, symmetry/rotation). *Benchmark:* the "how many cubes" and cube-net items match live ISEB formats on side-by-side review.

**Stage 3 (months 3–6): Re-grade the stretch tier to ~85% and serve weekly.** Implement a separate selection engine targeting ~85% accuracy (Wilson rule), LFHC presentation, and mastery (not streak) rewards. Serve a Parallel-style weekly "mixed bag." *Benchmark:* the child's rolling accuracy on stretch items sits ~80–88%; if it climbs >90%, inject harder Q16–Q20-style items; if it falls <75%, add scaffolds/hints rather than removing challenge.

**Triggers to change course:** (i) If the child consistently clears the hardest tier (>90%), introduce JMC Q16–25-style and SPGS Section-C-style multi-part/justification items. (ii) If engagement (not accuracy) drops, lean harder on narrative framing and LFHC openers. (iii) If Brighton confirms its December written maths rewards *method marks*, add "show your working / explain why" prompts to the top tier — currently absent from MCQ drill.

### Caveats
- **JMC 2019 Q10** ("digits add to 2019") has a reproduction inconsistency between its stated working and marked key; the cleaner JMC examples (Q5, Q12, Q13, Q20) above are verified and preferred. Verify any JMC item against the official solutions PDF before publishing.
- **ISEB per-subtest question counts are not officially published** (adaptive); do not state a fixed number.
- **The GL "21 VR types" is a GL convention, not the ISEB spec.** ISEB does not publish a type list; use the 21 as a sampling superset only.
- **Math Kangaroo Benjamin** official free UK past papers were not locatable on an authoritative open URL within budget; PMC Nov 2022 is the verified primary-competition substitute. The UK "Primary Kangaroo" launch (2025/26) is reported, not confirmed from the organiser.
- **Copyright:** UKMT, the MA/AiME, MOEMS, Math Kangaroo and AoPS all assert copyright over their *questions and official solutions*. The app's premise — authoring originals inspired by archetypes — is sound because problem *styles/archetypes are not protectable*; verbatim reproduction is. NRICH (with attribution) and the public-domain Lewis Carroll Doublets are the most permissive raw materials.
- **Some difficulty/engagement figures come from secondary sources** (e.g. the 0.74 SD productive-struggle figure); the Wilson 85% rule is peer-reviewed but derived for machine/animal learners and applied here as a heuristic.

### Ask-the-Publisher / Admissions List
1. **ISEB/CENTURY:** Confirm the exact 2025–26 subtest question counts (if disclosed to schools), the current VR question-type set ISEB actually deploys, and whether "how many cubes/blocks/silhouettes" are in maths, NVR, or both.
2. **Brighton College Admissions:** Confirm (a) the December written maths paper format, mark scheme and whether method marks are awarded; (b) whether VR/NVR feature in the December written stage or only via the ISEB CPT; (c) the weighting of CPT vs written papers vs interview.
3. **The Mathematical Association:** Confirm licensing terms for *referencing* PMC archetypes in a commercial app (style imitation should be fine; verify).
4. **UKMT:** Confirm that authoring *original* problems in JMC style (no verbatim text/solutions) is outside their IP policy — expected to be fine, but worth written confirmation given commercial use.
5. **Math Kangaroo UK / Primary Kangaroo:** Confirm whether a UK primary-level contest launches 2025/26 and its age bands.

### Source-Confidence Summary
- **High confidence, official-publisher:** PMC age/licensing/structure (m-a.org.uk, primarymathschallenge.org.uk); JMC age/structure/IP (ukmt.org.uk); MOEMS divisions (moems.org); Beast Academy 5 age/scope (beastacademy.com); NRICH taxonomy (nrich.maths.org); Parallel year-groups (parallel.org.uk, Singh X 2025); Wilson 85% rule (*Nature Comms* 2019); ISEB total duration & no-back-button (iseb.co.uk); cube-nets/how-many-cubes as ISEB type (atomlearning.com).
- **High/Medium, school-published or platform-with-partnerships:** St Paul's Girls' sample paper (spgs.org); ISEB per-subtest timings & recent reductions (atomlearning.com, clarendontutors.com, century.tech); Brighton College 11+ process (atomlearning.com, exampapersplus.co.uk).
- **Medium, tutoring convention:** GL "21 VR types"; cryptic-lite clue progression; etymology games; PMC-as-11+-stretch framing (mymathscloud.com).
- **Low–Medium, single anecdote/secondary:** streaks-vs-mastery evidence; the 0.74 SD productive-struggle figure; UK Primary Kangaroo launch.
- **Do not auto-discount:** Atom Learning holds direct school-partnership intel and corroborates ISEB format details with the official board; weighted as High where it agrees with iseb.co.uk.

---

> **Cross-check verdict — Pass B (11 June 2026, Gemini).** Checked against
> ground truth, Pass A, and a same-day verification search:
>
> - **Convergent on the ISEB core** — timings (40/40/30/25), Century platform,
>   strict forward-only navigation — independently matching Pass A and the
>   primary-source scout. The two passes also converge on the engagement
>   guidance (low-floor/high-ceiling, anti-streak, productive struggle);
>   success-band 70–80% here vs ~85% in Pass A — treat as **~80±5%,
>   tuned by item selection**.
> - **Arithmetic check of its 15 archetypes: 13 clean, one wrong, one sloppy.**
>   **Archetype 6 (the lift puzzle) is provably wrong**: under its own stated
>   rules (1 adult + 1 child is a legal load), 9 journeys suffice — up A+C
>   four times with a child shuttling down three times, the top child rides
>   down once, then all three children ride up — vs its claimed minimum of 13.
>   Re-derive anything taken from this pass before authoring. Also: A1's
>   "doubles each day" is ambiguous about day-3 order of operations, and the
>   4×4×4 "tunnel through the exact centre of the front face" is impossible
>   on an even-sided face (no centre cell) — the arithmetic (64−4=60) is fine,
>   the wording isn't. Authoring hygiene: state orders of operations and use
>   odd-sided cubes for "centre" prompts.
> - **Disputed claim — do NOT action:** "the Century transition removed ALL
>   number/letter-code VR types; VR is now strictly linguistic" [stamped High
>   by the pass; **downgraded to Low–Medium, disputed**]. A same-day
>   verification search found at least one current guide still listing
>   "number codes" in ISEB VR, and the two pages that could settle it
>   (CENTURY's own CPT guide, ISEB's test-framework page) are bot-blocked.
>   **Resolution path:** the free official familiarisation test — note which
>   VR types actually appear — plus the ask-ISEB list. Until settled, keep
>   letter/number-code VR content; it may also still serve the December day.
> - **New keepers beyond Pass A:** the PMC **February Bonus Round** as a
>   high-ceiling source; the CPT English content list (comprehension, SPaG,
>   cloze, **shuffled sentences** — a candidate new question type); the
>   CPT-vs-written **dual-condition table** (obfuscation + speed + no-return
>   vs depth + self-verification + justification) as the case for training
>   both modes; **declarative-text spatial prompts** ("Imagine a 4×4×4
>   cube…") as an art-free authoring strategy; the **painted-cube family**;
>   truths-and-liars logic; and four archetype families Pass A lacked
>   (cryptarithms, pre-algebraic balance, Venn/overlapping sets, successive
>   fractional remainders) — **union across both passes ≈ 18 distinct
>   problem families**.
> - Caveats: URLs transcribed, not re-verified; NRICH licensing is described
>   differently across the passes (immaterial here — we author originals);
>   several tutoring-convention claims are stamped High and should be read
>   one notch lower.

## Pass B as delivered (Gemini deep research, 11 June 2026)

*(The three tables arrived flattened in transmission and have been
reconstructed as markdown tables; cell text is unchanged.)*

### Architecting an "Interesting Problems" Stretch Tier for High-Ability Year 5 Mathematics and Reasoning

The transition to highly selective independent schooling via the 11+ assessment framework demands significantly more from candidates than procedural fluency and rote memorisation. For highly able candidates—particularly those targeting top-tier institutions such as Brighton College—standard algorithmic drills quickly yield diminishing returns and risk algorithmic fatigue. The modern assessment pipeline consists of two distinct, rigorous hurdles. Stage 1 is the Independent Schools Examinations Board (ISEB) Common Pre-Test (CPT), a computerised, adaptive assessment that is now administered via the Century Tech platform for the 2025–2026 testing cycles. Because this assessment utilises an Item Response Theory adaptive engine, candidates who exhibit high early accuracy are rapidly routed into a "hard tail" of complex, non-routine questions. This adaptive tail is explicitly intended to distinguish exceptional, flexible academic potential from mere coached attainment. Subsequently, Stage 2 comprises the target institution's bespoke written papers, administered typically in December of Year 6, which demand multi-step problem-solving, rigorous mathematical reasoning, and the ability to document a coherent chain of thought.

Preparing a capable 10-year-old for this dual-stage environment across a six-month runway necessitates a fundamental transition away from standard Key Stage 2 curriculum reinforcement and toward competition-grade problem solving. The overarching objective for the revision application is to maintain engagement through a "stretch tier" that cultivates deep analytical reasoning, cognitive resilience in the face of ambiguity, and intellectual curiosity. This report delineates the theoretical frameworks, archetype structures, and pedagogical strategies required to author an in-house stretch tier capable of meeting these extreme assessment demands.

### 1. Topography of the Primary Mathematics Competition Canon

To construct a genuinely rigorous stretch tier, the curriculum must draw its structural inspiration from the established canon of national and international mathematical competitions. These platforms have spent decades calibrating items that test raw logical potential rather than advanced, out-of-year syllabus knowledge. The analysis of these platforms provides a blueprint for authoring original content that perfectly mimics the cognitive load of the 11+ hard tail without violating the boundaries of Year 5 arithmetic.

The Primary Maths Challenge (PMC), designed by the Mathematical Association, is pitched precisely at pupils in Years 5 and 6. While the initial questions are accessible, the subsequent "Bonus Round," sat in February, provides an exceptionally high cognitive ceiling. The archives for these past papers, including the November 2022 and February 2023 sets, are available via the official PMC downloads portal, providing a rich vein of logical puzzle structures. In contrast, the UK Mathematics Trust (UKMT) Junior Mathematical Challenge (JMC) is officially targeted at Year 8 and below, but highly able 10-year-olds are frequently entered. The initial questions (Q1–15) fit a strong Year 5 student comfortably, while the final segment (Q16–25) provides extreme stretch, demanding multi-layered combinatorial and geometric logic. The UKMT provides a vast, free archive of past papers up to 2025 on their official site, complete with extended solutions that dissect the underlying logic.

Looking internationally, the Math Kangaroo competition provides two distinct levels suitable for this demographic: the Ecolier band for Grades 3–4 (ages 8–10) and the Benjamin band for Grades 5–6 (ages 10–12). The competition format distributes difficulty equally, but it is the top-tier 5-point questions that serve as excellent models for discrete mathematics and spatial reasoning, which align perfectly with the ISEB hard tail. Archives for the US and UK past papers from 2005 through to 2024 are widely available through educational consortiums. Similarly, the Mathematical Olympiads for Elementary and Middle Schools (MOEMS) Division E targets Grades 4–6. MOEMS focuses intensely on deep arithmetic and lateral logic over a compressed 30-minute, 5-question format, effectively forcing the candidate to make three to four distinct logical leaps per question.

Furthermore, modern curriculum-adjacent platforms offer exceptional engagement models. Beast Academy (Level 5), designed for ages 10–13, covers 3D solids, integers, sequences, and ratios. The curriculum is notable for its dedicated puzzle sets, which provide extreme cognitive stretch through formats like cross-number grids and hive puzzles. NRICH, operated by the University of Cambridge, provides extensive primary collections focused on "Thinking Mathematically" (Stages 2 and 3). Their pedagogy demands formal proof, systematic working, and advanced visualisation, moving candidates away from mere computation toward generalisation. Finally, the Parallel Academy, founded by Dr Simon Singh, serves students from Year 6 (ages 10–11) through Year 11. The platform issues weekly "Parallelograms"—15-to-30-minute interactive sheets that feature quirky, real-world contexts, historical mathematical riddles, and lateral logic, proving highly effective at maintaining long-term engagement.

Regarding the licensing posture across these seven platforms, the literal text, specific bespoke artwork, and trademarked characters are strictly copyrighted. However, the underlying mathematical archetypes, combinatorial frameworks, and logical structures are universally applicable and legally imitable. There is no legal barrier to an in-house authoring team extracting the structural logic of a UKMT Question 24 and re-skinning it with original narrative contexts and novel integer sets.

Confidence Flag: [High] · Class: Official publisher documentation and verified educational platforms.

Practical Implication: The app's stretch tier must systematically harvest the structural logic of UKMT JMC (Questions 16–25), Kangaroo 5-point items, and MOEMS Division E. Authors should generate original questions that force the application of standard Year 5 arithmetic to resolve complex Year 8-level logical scenarios.

| Source Platform | Target Age & Fit Evidence | Archival Location & Direct URLs | Licensing Posture & Imitability |
|---|---|---|---|
| Primary Maths Challenge | Ages 9–11 (Y5–Y6). High ceiling in Bonus Round. | https://www.primarymathschallenge.org.uk/downloads | Text copyrighted; mathematical archetypes legally imitable. |
| UKMT Junior Math Challenge | Year 8 & below. Q16–25 provide extreme stretch. | https://ukmt.org.uk/free-past-papers/junior-mathematical-challenge-2025 | Text copyrighted; combinatorial logic unprotected. |
| Math Kangaroo | Ecolier (Ages 8–10), Benjamin (Ages 10–12). 5-point Qs. | https://gonit.app/blog/how-to-prepare-for-math-kangaroo/ | Specific scenarios copyrighted; structures open. |
| MOEMS Division E | Grades 4–6. 5-question deep-dive format. | https://www.wastudentmath.org/pages/competitions/moems.aspx | Specific items copyrighted; methodologies open. |
| Beast Academy (Level 5) | Ages 10–13. Puzzles section provides extreme stretch. | https://beastacademy.com/resources/printables | Trademarked art; puzzle frameworks (e.g., cross-numbers) open. |
| NRICH (Primary) | Ages 7–11. "Thinking Mathematically" Stage 2/3. | https://nrich.maths.org/curriculum-maps/primary | Creative Commons non-commercial; original authoring required. |
| Parallel (Simon Singh) | Year 6–11. Weekly "Parallelograms" (15-30 mins). | https://parallel.org.uk/parallelograms | Text copyrighted; subject matter inspiration free. |

### 2. The Archetype List: Distilling the Canon for In-House Authoring

An exhaustive analysis of the mathematical competition canon reveals that extreme cognitive stretch at age 10 does not arise from introducing advanced secondary-school syllabus material, such as quadratic equations, advanced trigonometry, or calculus. Instead, difficulty is engineered by requiring candidates to apply basic arithmetic, fractional reasoning, and geometric principles in novel, multi-layered, and often contradictory combinations. The following fifteen archetypes represent the most fertile ground for authoring competition-grade problems. By understanding the mechanical derivations and cognitive demands of each, the in-house content team can generate hundreds of unique variants.

**Archetype 1: Working Backwards (Reverse Operations).** This archetype presents the candidate with the final, resolved state of a system that has undergone a series of transformations, requiring them to reverse the sequence of operations to deduce the initial value. The cognitive stretch lies in the necessity to hold multiple states of a system in working memory simultaneously while actively suppressing the deeply ingrained instinct to calculate forward. It touches core curriculum areas including inverse operations, algebraic thinking, and fractions. Consider a fully worked example: A mystical tree doubles its number of leaves each day. On the 3rd day, it loses 10 leaves to the wind, leaving it with 70 leaves. How many leaves did it have at the start of the 1st day? The derivation requires starting at the end of Day 3 (70 leaves). Before losing leaves, it had 70 + 10 = 80 leaves. The end of Day 2 is therefore 80 ÷ 2 = 40. The end of Day 1 is 40 ÷ 2 = 20. The start of Day 1 is 20 ÷ 2 = 10. *(Cross-check note: ambiguous about whether the day-3 doubling precedes the loss — state order of operations when authoring.)* To generate original variations, an author can manipulate three primary axes. First, they can introduce fractional losses, such as a state where the subject "loses half its inventory plus one more item". Second, they can increase the sequence length to four or five distinct chronological steps. Third, they can ask the candidate to determine a mid-point state rather than the absolute initial starting condition.

**Archetype 2: Parity and Invariants.** Problems within this archetype rely on the candidate recognising that a specific mathematical property, most commonly the odd or even status of a set, cannot fundamentally change under the given rules. This renders brute-force trial-and-error calculations mathematically impossible and unnecessary. The stretch factor requires transitioning from numerical computation to meta-mathematical reasoning about the innate properties of numbers. It interacts with curriculum topics such as multiples, odd and even numbers, and division remainders. A classic worked example involves 5 cups placed upside down on a table. In a single turn, the rules dictate that exactly 3 cups must be flipped. The question asks whether it is possible to achieve a state where all cups face up. The derivation relies on parity: each cup needs to be flipped an odd number of times (minimally 1) to transition from face-down to face-up. Therefore, the total minimum flips required across all 5 cups is 5 × 1 = 5, an odd number. Each turn provides exactly 3 flips. After n turns, the total number of flips generated is 3n. If n=3, there are 9 total flips. These 9 flips can be distributed as Cup 1 (1 flip), Cup 2 (1 flip), Cup 3 (1 flip), Cup 4 (3 flips), and Cup 5 (3 flips), satisfying the odd-flip requirement for all individual cups while summing to 9. Thus, it is possible. *(Cross-check note: verified — e.g. flip {A,B,C}, {A,B,D}, {A,B,E}.)* Authoring axes include changing the base parity rules (e.g., flipping 2 cups out of 6), utilising grid-colouring mechanics (such as proving why a chessboard with two opposite corners removed cannot be tiled with dominoes), or establishing token exchange rates where parity is conserved (trading 1 red token for 3 blue tokens).

**Archetype 3: Systematic Listing and Combinatorics.** Here, the candidate must calculate the absolute total number of possible arrangements, permutations, or combinations while navigating overlapping constraints. This archetype severely penalises scattered, unstructured thinking. Without formulating a rigid, logical system, the candidate will invariably undercount or double-count the possibilities. It relies heavily on place value, systematic working, and addition. A worked example asks: How many 3-digit numbers have digits that sum to exactly 5, given the number cannot commence with a zero? The derivation requires a systematic list anchored by the hundreds digit. If the number starts with 1, the remaining sum for the tens and units is 4, yielding the combinations (1,0,4), (1,1,3), (1,2,2), (1,3,1), and (1,4,0), totalling 5 numbers. Starting with 2 leaves a sum of 3, yielding 4 numbers. This pattern continues down to a starting digit of 5, which leaves a sum of 0, yielding only (5,0,0). The final total is 5 + 4 + 3 + 2 + 1 = 15. Authors can easily turn this into hundreds of distinct questions by adding secondary conditions (such as demanding all digits must be even), altering the length of the target number to four or five digits, or requesting the product of the digits instead of the sum.

**Archetype 4: Rate, Time, and Ratio Traps.** These questions are explicitly designed to exploit the cognitive bias of direct proportionality, requiring the candidate to pause, isolate the unit rate, and avoid scaling all integers uniformly. The stretch factor is purely psychological, defying the intuitive instinct to scale numbers linearly. The curriculum touches upon ratio, proportion, and time calculations. For example, if 3 painters can paint 3 rooms in 3 days, how long will it take 6 painters to paint 6 rooms? The derivation requires finding the base unit rate: it takes 1 single painter 3 days to paint 1 single room. Therefore, 6 painters working simultaneously on 6 individual rooms are essentially 6 isolated instances of the base unit rate. The time remains exactly 3 days. To author variations, content creators can deploy asymmetrical scaling (asking how long 6 painters take to paint 12 rooms), introduce differing individual competence rates where one actor operates twice as fast as another, or utilise the classic "filling and draining" mechanics where a system is simultaneously being populated and depleted at different fractional rates.

**Archetype 5: Logic Elimination (Truths and Liars).** This represents a purely logical deductive scenario where candidates must methodically test conflicting statements to isolate a single consistent reality. It requires the candidate to hold multiple hypothetical states in their working memory and execute boolean logic sequences. It heavily involves deductive reasoning and advanced reading comprehension. In a standard example, four children are standing near a broken window. Alice states, "Bob broke it." Bob states, "Charlie broke it." Charlie states, "Bob is lying." David states, "I didn't do it." The prompt specifies that exactly one child is telling the truth, and asks who broke the window. The derivation requires testing the constraints. Bob and Charlie's statements are mutually exclusive; therefore, exactly one of them must be the sole truth-teller. Because the quota for truth-tellers is now filled by either Bob or Charlie, Alice and David must definitively be lying. If David is lying when he asserts "I didn't do it", the inescapable logical conclusion is that David broke the window. Authors can iterate on this archetype by altering the total number of truth-tellers, introducing conditional statements that rely on dependencies ("If I broke it, then Alice helped me"), or replacing human actors with inanimate objects, such as correctly labelled and mislabelled boxes of physical items.

**Archetype 6: Constraint Satisfaction ("Crossing the River").** *(⚠️ Cross-check: the worked answer below is WRONG — under these same rules, 9 journeys suffice (4× up adult+child with a child shuttling down 3×, the top child rides down, then all 3 children ride up). Keep the archetype, re-derive the example.)* This archetype involves moving items between various states under strict limiting rules, demanding algorithmic forward planning and the ability to recognise cyclical inefficiencies. It touches upon inequalities, capacity limits, and sequential logic. Consider a lift with a maximum capacity of either 2 adults or 3 children. If 4 adults and 3 children must travel upwards, and someone must always be in the lift to operate it, what is the minimum number of total journeys required? The pass's derivation: sending 2 adults up is inefficient because an adult must return to operate the lift. The optimal strategy relies on the fact that 1 adult and 1 child is a safe load. Trip 1 Up carries 1 Adult and 1 Child. Trip 2 Down is operated by 1 Child. This cycle deposits exactly 1 Adult at the top per full round trip. Repeating this cycle transports all adults, requiring 7 upward trips and 6 downward trips, totalling 13 journeys. Authors can vary this by introducing specific, non-uniform weight limits, requiring specific pairings where certain elements cannot be left alone together, or instituting multi-stage journeys across multiple transfer points.

**Archetype 7: Geometric Dissection and Overlapping Area.** This visual archetype tasks the candidate with calculating areas where standard geometric formulas fail, requiring them to subtract negative space or mentally manipulate and rotate shapes. It tests spatial invariance and the ability to decompose complex visual information into known properties without explicitly stated dimensions. It encompasses area, the properties of squares and circles, and internal angles. A fully worked example features two identical squares with a side length of 10 cm, placed such that the corner of the top square rests exactly on the central point of the bottom square. The candidate must find the area of the overlapping region. The derivation relies on rotational symmetry: regardless of the specific angle or rotation of the top square, the overlapping region will always represent exactly one-quarter of the total area of the bottom square. Since the total area is 10 × 10 = 100 cm², the overlap is invariably 100 ÷ 4 = 25 cm². Variation axes for authors include using overlapping circles and rectangles, asking for the perimeter of a complex dissected shape rather than the internal area, or presenting shaded versus unshaded regions and requesting the exact ratio between the two.

**Archetype 8: Cryptarithms and Alphanumeric Puzzles.** These puzzles disguise standard arithmetic algorithms by replacing digits with letters or distinct symbols. They force the student to analyse the structural limits of arithmetic, such as the absolute maximum values generated by carrying over numbers in column addition, rather than merely computing known values. It interacts directly with column addition, multiplication, place value, and logical deduction. In the addition sum AB + AB = BCC, where distinct letters represent distinct single digits, the candidate must determine the value of A. The derivation explores upper limits. The maximum value of any 2-digit number is 99, and 99 + 99 = 198. Consequently, the 3-digit sum BCC must be less than or equal to 198. This structurally forces B to equal 1. The equation becomes A1 + A1 = 1CC. In the units column, 1 + 1 = 2, forcing C to equal 2. The equation is now A1 + A1 = 122. Looking at the tens column, A + A = 12, meaning A must equal 6. Verification confirms 61 + 61 = 122. Authors can easily scale this by shifting to multiplication cryptarithms, introducing specific conditions where a symbol must represent an odd number, or creating missing-digit puzzles that use standard numbers alongside blank spaces.

**Archetype 9: Sequences with Periodic Patterns.** This mathematical structure requires predicting states far into the future by identifying the repeating modulus of a sequence, thereby preventing the candidate from relying on brute-force counting. It teaches the foundational concepts of modulo arithmetic and interacts with division, remainders, and pattern recognition. A common example asks for the 100th letter when the word "BRIGHTON" is written repeatedly. The derivation relies on the 8-letter length of the word. The candidate calculates the remainder of 100 ÷ 8. Since 100 = (12 × 8) + 4, the remainder is 4. The 100th letter corresponds to the 4th letter of the base sequence, which is 'G'. Authoring variations include creating multiple interlocking patterns (e.g., Pattern A repeats every 3 units, Pattern B every 4 units, asking when they next align), designing number sequences with alternating operations (+2, ×3, +2, ×3), or using visual sequences featuring rotating geometric elements.

**Archetype 10: The Pigeonhole Principle.** This archetype establishes absolute mathematical certainties in worst-case scenarios, based on the ratio between the number of available categories and the total number of items distributed among them. It stretches the mind by forcing the candidate to actively seek the specific scenario that hinders their goal, which is a counter-intuitive cognitive process. It covers probability, logical reasoning, and data handling. If a dark drawer contains 10 red socks, 8 blue socks, and 6 green socks, what is the minimum number of socks one must extract to guarantee a matching pair of any colour? The derivation requires formulating the absolute worst-case scenario. The drawer contains 3 distinct colours. The worst luck possible involves drawing exactly one of each colour: one red, one blue, and one green. The candidate now holds 3 socks and zero pairs. However, the very next sock extracted (the 4th one) is mathematically guaranteed to complete a pair. The answer is 4. Authors can vary this by demanding a specific colour pair (e.g., guaranteeing a pair of specifically red socks, which requires exhausting all other colours first), demanding three-of-a-kind, or distributing items into physical spaces to ensure one space meets a minimum threshold.

**Archetype 11: Digit Sums and Number Properties.** These problems exploit the hidden rules of divisibility and digital roots, fusing disparate arithmetic rules into a single puzzle that requires simultaneous constraint satisfaction. It touches upon divisibility rules, place value, and multiples. A worked example presents a 5-digit number, 4A52B, which is divisible by both 5 and 9. If the number is even, and A and B are single digits, what is the value of A? The derivation resolves the constraints sequentially. To be divisible by 5, the number must end in 0 or 5. Because the prompt dictates the number is even, it must end in 0. Therefore, B = 0, making the number 4A520. To be divisible by 9, the sum of all constituent digits must be a multiple of 9. Summing the known digits yields 4 + A + 5 + 2 + 0 = 11 + A. The next multiple of 9 immediately following 11 is 18. Therefore, 11 + A = 18, which resolves to A = 7. Authors can introduce divisibility by composite numbers (such as 36, which requires simultaneously satisfying the rules for both 4 and 9), demand the formulation of the largest or smallest possible number that fits the criteria, or introduce palindromic constraints.

**Archetype 12: Pre-Algebraic Balance (Systems of Equations).** This archetype introduces the core concepts of linear algebra, specifically solving for unknowns using substitution or elimination, without ever introducing formal algebraic notation. It is typically visualised as balancing scales, testing mass, mental arithmetic, and relational logic. If 3 apples and 1 pear weigh 400g, while 1 apple and 1 pear weigh 200g, how much does 1 apple weigh? The derivation requires comparing the two states directly. The difference between the first and second scenario is exactly 2 apples. The difference in their total weight is 400g − 200g = 200g. Therefore, 2 apples weigh exactly 200g, meaning a single apple weighs 100g. Authoring axes include adding a third variable (apples, pears, and bananas), introducing inequalities to determine which side of a scale is heavier, or establishing fractional relationships where one object weighs exactly half as much as another.

**Archetype 13: Overlapping Sets (Venn Logic).** Here, candidates must extract discrete numerical values from intersecting data categories, rigorously testing their comprehension of precise statistical language such as "and", "or", and "only". The wording contains deliberate statistical traps where failing to subtract overlapping subsets leads to impossible, inflated totals. It covers data representation, subtraction, and logic. In a class of 30 students, 20 play football, 15 play tennis, and 3 play neither. How many students play exactly one of the sports? The derivation isolates the active participants. The total number of students playing at least one sport is 30 − 3 = 27. The raw sum of the two sporting lists is 20 + 15 = 35. The intersection (students playing both sports) is the difference between the raw sum and the actual number of players: 35 − 27 = 8. To find those playing exactly one sport, we subtract this intersection from the individual lists. Students playing only football: 20 − 8 = 12. Students playing only tennis: 15 − 8 = 7. The total playing exactly one sport is 12 + 7 = 19. Authors can escalate difficulty by using three-circle Venn diagrams, providing the intersection value upfront and asking for the total population, or presenting the intersecting sets entirely as percentages.

**Archetype 14: Fractional Parts of a Whole (Successive Remainders).** This archetype requires navigating fractions of varying, dynamically changing totals. It forces the candidate to realise that a fractional denominator refers to an entirely different base amount at each successive chronological stage of the problem. It touches upon fractions of amounts and inverse operations. A wizard spends half his gold on a wand. He then spends a third of what he has left on a potion. Finally, he spends a quarter of the new remainder on a hat. He has 15 gold coins left. How many did he start with? The derivation requires working backwards and inverting the fractions. After buying the potion, he spends 1/4 of the remainder, meaning he keeps 3/4. Therefore, 3/4 of the post-potion remainder equates to 15 coins. The post-potion remainder is 15 × (4/3) = 20. Before the potion, he spent 1/3, keeping 2/3. Therefore, 2/3 of the post-wand remainder equates to 20. The post-wand remainder is 20 × (3/2) = 30. Before the wand, he spent 1/2, keeping 1/2. Therefore, half of the original total is 30, meaning the original total was 60. Authors can vary this by mixing fractions with absolute numerical subtractions, asking for the total amount spent rather than the initial value, or requiring the final remainder to be expressed as a single fraction of the original whole.

**Archetype 15: Spatial Constraints and 3D Rotation.** This archetype demands that candidates determine the structural validity of 3D objects based entirely on limited 2D orthographic projections. It rigorously tests visuospatial working memory and the ability to project 2D plans into a 3D mental workspace, interacting with 3D shapes, volume, and spatial reasoning. You are observing a stack of identical 1cm blocks. From the front view, you see a 3 × 3 solid square. From the side view, you see a 3 × 3 solid square. From the top view, you see a cross shape comprising exactly 5 blocks. What is the maximum number of blocks that can exist in the structure? The derivation starts with the top view, which serves as the architectural footprint. Blocks can only exist in those 5 specific vertical columns (a central column and 4 adjacent). To satisfy the front and side views, the structure must reach 3 blocks high. To maximise the total block count, every permitted column must be filled to the maximum height that does not violate the projection rules. If all 5 columns are built to a height of 3, the total is 15 blocks, satisfying all visual constraints and providing the absolute maximum. Variation axes include asking for the absolute minimum number of blocks required to cast the same shadows, identifying which internal faces touch each other, or transitioning into cube nets bearing directional symbols.

Confidence Flag: [High] · Class: Tutoring convention and validated psychometric archetypes.

Practical Implication: Embed these 15 archetypes as the core generative frameworks for the maths stretch tier. Authoring 10 original variations of each provides a 150-question bank of pure competition-grade material that relies entirely on Key Stage 2 arithmetic, avoiding out-of-syllabus acceleration.

### 3. The Anatomy of the Hard Tail: CPT vs. Written Papers

To serve a stretch tier effectively, developers must understand the mechanical differences between the adaptive limits of the ISEB Common Pre-Test and the bespoke demands of a selective written paper such as Brighton College's Stage 2. Designing a singular preparation strategy that fails to account for these differing assessment modalities will leave candidates vulnerable.

The new ISEB Common Pre-Test, engineered by Century Tech, utilises an advanced Item Response Theory (IRT) adaptive algorithm. Candidates who answer correctly are rapidly escalated to questions with high difficulty calibrations. However, because the test remains entirely machine-markable and strictly timed (e.g., 40 minutes for the Mathematics module), the "hard tail" cannot rely on infinite multi-step complexity, as such questions take too long to resolve. Instead, the adaptive ceiling is characterised by obfuscation. Questions introduce redundant information—numbers and data points that are entirely irrelevant to the solution—to bypass simple "number picking" strategies and test the candidate's ability to filter noise. Furthermore, the CPT relies heavily on unfamiliar contexts, testing standard Key Stage 2 attainment (such as division) within entirely novel, text-heavy scenarios. Crucially, the platform enforces a strict forward-navigation policy. Candidates cannot flag questions, skip items, or return to alter prior answers. This heavily penalises careless arithmetic errors early in the test, which can catastrophically trap an otherwise capable candidate in a lower difficulty band.

In stark contrast, Brighton College's bespoke December written assessments are explicitly designed to measure resilience and the capacity to document a logical chain of thought. The analysis of sample independent school papers and institutional admission guidelines reveals that the hard tail here is defined by extended multi-step depth. Problems routinely require 4 to 5 distinct phases of calculation (e.g., deriving a rate, applying it to a fraction, and then calculating a percentage change). Furthermore, unlike multiple-choice formats where the provided options offer a psychological safety net and a clue to the magnitude of the correct answer, written papers offer a blank space. The candidate is entirely responsible for self-verifying their logic. Finally, written papers frequently employ cross-disciplinary syncretism, blending geometry with combinatorics, or algebra with ratio, within a single, extended question.

| Feature | ISEB CPT Hard Tail (Century Tech Platform) | Stage 2 Written Papers (e.g., Brighton College) |
|---|---|---|
| Assessment Format | Online, Multiple Choice, strictly no back navigation. | Pen & Paper, Free Response, open navigation. |
| Pacing Constraint | Rapid and unrelenting (approx. 1 minute per question). | Deliberate (allows extended, deep thinking time). |
| Primary Difficulty Axis | Obfuscation, dense reading load, redundant numerical data. | Deep multi-step deduction, self-verification of logic. |
| Topic Boundary | Strictly adheres to Key Stage 2 up to end of Year 5. | Broad mandate: "Arithmetic to multi-step problem solving". |

Confidence Flag: [High] · Class: School-published criteria, verified platform architectural documentation, and professional tutoring conventions.

Practical Implication: The stretch tier must simulate both distinct conditions. Serve some complex multiple-choice questions under severe time pressure with no "go back" option to train for the psychological pressure of the CPT. Conversely, serve the deeper, multi-step Archetypes (like Archetype 6 and 14) as untimed, free-response puzzles to train for the written paper.

### 4. Verbal Stretch Beyond Standard GL Drills

Standard 11+ verbal reasoning preparation traditionally relies on the classic 21 GL assessment types, which emphasise processing speed and pattern recognition within highly standardised formats. However, to stretch an able 10-year-old, the verbal domain must pivot away from rote mechanics and toward etymological reasoning, advanced deductive logic, and lateral linguistic thinking. This is particularly vital given the Century Tech ISEB update, which has significantly altered the VR landscape (detailed further in Section 7), rendering traditional alphanumeric codes obsolete. *(⚠️ Cross-check: this "codes obsolete" claim is disputed — see the Pass B verdict block.)*

A primary tool for verbal stretch is the Lewis Carroll Doublet, more commonly known as a word ladder. Invented by Carroll in 1877, this format requires the candidate to transform one word into another by changing a single letter at a time, with the strict caveat that each intermediate step must form a valid, recognised dictionary word. Transforming COLD to WARM, for instance, requires the sequence COLD → CORD → CARD → WARD → WARM. The cognitive stretch here is immense; it forces the candidate to hold orthographic patterns in their working memory while mentally scanning their internal lexicon for valid phonetic and structural bridges.

Further stretch can be achieved by introducing Cryptic Crossword frameworks. While full, adult-level cryptic crosswords rely heavily on obscure general knowledge and archaic slang, the mechanical "wordplay" structures of cryptics provide exceptional lateral thinking stretch for children when adapted into a "lite" format. This involves teaching candidates to identify anagrams, where clues contain a straight definition alongside scrambled letters (the fodder) and an anagram indicator (such as "mixed", "crazy", or "broken"). For example, the clue "Crazy horse is on the coast (5)" yields SHORE. Similarly, hidden word clues, where the answer spans across the spaces between words in the sentence (e.g., "Some extra in the train (4)" yielding RAIN), train the child to decouple the literal, semantic meaning of a sentence from its structural, orthographic components. This decoupling is a vital skill for high-level reading comprehension and analytical parsing.

Finally, stretch vocabulary acquisition should abandon the rote memorisation of synonym and antonym lists in favour of structural etymology. Teaching vocabulary through Greek and Latin morphological roots equips the candidate with a linguistic toolkit to decode entirely unseen words. By mastering morphemes such as ject (throw), bene (good), mal (bad), and dict (speak), a student can logically infer the meaning of complex vocabulary encountered in the Brighton College English comprehension paper.

Confidence Flag: [High] · Class: Educational literature, cognitive linguistics, and historical puzzle archives.

Practical Implication: Introduce a dedicated "Linguistic Logic" pack into the application, containing Word Ladders, Hidden Word/Anagram cryptic clues, and Greek/Latin root decoding grids. This moves the candidate away from speed-drilling and directly supports the new ISEB VR focus on pure semantic manipulation.

### 5. Spatial and Non-Verbal Reasoning (NVR) Stretch

Non-Verbal Reasoning is fundamentally a test of innate spatial intelligence and visual processing speed. To stretch a candidate beyond the basic sequence and matrix completion tasks ubiquitous in standard preparation, the application must introduce intensive 3D spatial visualisation and geometric deconstruction.

The visual manipulation of 3D blocks is a primary differentiator in top-tier NVR assessments and is now explicitly tested in the modern ISEB CPT under the "Spatial Reasoning" sub-category. Core challenges include Painted Cubes, where a candidate must mentally track surface area. For example, if a 3 × 3 × 3 cube is painted entirely red on the outside and then shattered into 1 × 1 × 1 cubes, identifying how many cubes possess exactly one painted face requires locating the geometric centres of each of the 6 original faces (Answer: 6 cubes). Furthermore, "Hidden Cube Counting" tasks display an isometric 2D drawing of a complex block structure and ask for the total volumetric count. This requires the candidate to infer and account for the hidden structural supports necessary to elevate the visible blocks, testing their understanding of gravity and 3D space. Net Folding Validation represents the highest tier of this domain, where candidates must determine which 3D cube can be formed from a 2D net bearing asymmetrical symbols (such as arrows or shaded half-triangles) that dramatically change their relative orientation when folded into three dimensions.

A significant challenge in developing NVR stretch material is the heavy reliance on graphic design resources. However, advanced spatial reasoning tasks can be authored using purely declarative text descriptions, forcing the candidate to render the image entirely within their mind's eye. For example, a declarative prompt might read: "A solid 4 × 4 × 4 cube is formed of smaller 1 × 1 × 1 blocks. A tunnel, exactly 1 × 1 block wide, is pushed straight through the exact centre of the front face all the way to the back face. How many 1 × 1 × 1 blocks remain?" The derivation requires no imagery: the total initial blocks equal 64. The tunnel, passing entirely through the depth of the structure, removes exactly 4 blocks. The remaining total is 60. *(Cross-check note: an even-sided face has no single centre cell — use odd-sided cubes for "centre" prompts.)* This format allows authors to rapidly generate complex spatial problems without bespoke artwork. Beyond 3D blocks, incorporating classic spatial logic puzzles such as Pentomino tiling, geometric dissections (Tangrams), and grid-based logic mechanics (such as Nonograms or Slitherlink-lite) provides immense visuospatial stretch.

Confidence Flag: [High] · Class: Platform tutoring convention (Atom Learning/Pretest Plus) and cognitive geometry literature.

Practical Implication: Dedicate a minimum of 50% of the NVR stretch tier to 3D spatial rotation, cube counting, and net validation. Utilise the declarative text scenario strategy ("Imagine a structure...") to dramatically scale the authoring process and increase the cognitive load of visualisation.

### 6. Engagement Evidence: Sustaining Productive Struggle

Deploying highly difficult, competition-grade material to a 10-year-old over an extended 6-month preparatory runway risks catastrophic motivational collapse if the application's grading algorithms and reward cadences are poorly calibrated. Educational psychology provides clear, evidence-based guardrails for designing this user experience.

The core concept governing this tier is "productive struggle." This is defined as the cognitive zone where a student is intensely challenged but possesses enough foundational knowledge to attempt a viable solution without feeling hopelessly overwhelmed. The literature surrounding mathematical engagement indicates that standard learning tasks should ideally yield a success rate of approximately 70–80% to sustain intrinsic motivation. However, the tasks within this stretch tier are fundamentally designed to be harder. To mitigate frustration and prevent churn, these tasks must be meticulously engineered with a "low floor, high ceiling" architecture. In practice, this means the candidate must be able to instantly understand the premise of the problem (the low floor)—for example, flipping cups or moving adults in a lift—even if executing the complex meta-logic to find the solution (the high ceiling) requires immense effort and causes them to stumble.

Crucially, in high-difficulty environments, streak-based gamification—the practice of rewarding consecutive correct answers with visual fanfare or points multipliers—is actively toxic. Streaks inherently penalise the trial-and-error methodology that is essential for complex problem-solving, creating a risk-averse user who fears breaking their streak. Instead, the system must reward "productive failure," which is defined as an effort that results in an incorrect final answer but yields valuable systemic understanding and logical exploration along the way.

Confidence Flag: [Medium/High] · Class: Educational psychology research (Carnegie Foundation, ASCD).

Practical Implication: Strip all "accuracy streak" mechanics out of the stretch tier UI. Reward the completion of multi-step puzzles and the time spent on task, regardless of the initial outcome. When a student fails, provide step-by-step unrolling hints that guide their reasoning, rather than simply displaying a red 'X' and revealing the final answer.

### 7. Current ISEB CPT Taxonomy (2025–2026 Snapshot)

To ensure the stretch tier aligns seamlessly with the ultimate Stage 1 assessment, it is vital to map the exact specifications of the current ISEB Common Pre-Test. The contract for this assessment was shifted to Century Tech, introducing a new psychometric platform. Consequently, any pre-2022 claims regarding GL Assessment formats are completely stale and must be rigorously discarded.

The assessment comprises four distinct modules: English (40 minutes), Mathematics (40 minutes), Non-Verbal Reasoning (30 minutes), and Verbal Reasoning (25 minutes). The Century Tech platform enforces a strict, linear progression protocol. Candidates absolutely cannot skip questions, flag items for later review, or use a "go back" function to alter previous answers. The adaptive algorithm dictates the subsequent question based entirely on the immediate response.

The most profound shift in the taxonomy occurred within the Verbal Reasoning subtest. The transition to Century Tech resulted in the complete removal of all number sequences and letter-number code questions (e.g., determining the numerical value of a word if A=1, B=2). The ISEB VR module is now strictly and exclusively linguistic. To replace the mathematical codes, the platform introduced novel word-manipulation formats, focusing heavily on Move Two Letters, Missing Letters, Odd One Out, Connected Words, Related Words, Synonyms, and Antonyms. *(⚠️ Cross-check: disputed — see the Pass B verdict block; do not act on this until the familiarisation test or ISEB settles it.)*

| Subtest | Time Allocation | Core Focus (2025–2026 Century Taxonomy) | Navigation Rules |
|---|---|---|---|
| English | 40 min | Reading comprehension, SPAG, cloze sentences, shuffled sentences. | No Return/No Skip |
| Maths | 40 min | Key Stage 2 attainment to the end of Year 5. Emphasis on rapid recall and application. | No Return/No Skip |
| Verbal | 25 min | Pure linguistic logic. Synonyms, Antonyms, Move Two Letters. Strictly no numbers/codes. | No Return/No Skip |
| NVR/Spatial | 30 min | 2D/3D manipulation. Nets/cubes, fold and punch, combining shapes, hidden shapes. | No Return/No Skip |

Confidence Flag: [High] · Class: Official ISEB publisher support data and validated platform providers (Pretest Plus, Atom Learning).

Practical Implication: Immediately audit the existing VR question banks and strip out any number-sequence or alphanumeric code questions from the VR stretch tier; reallocate these logic puzzles to the Mathematics section. *(⚠️ Cross-check: NOT actioned — claim disputed.)* Furthermore, the UI must train the candidate to commit definitively to their answers, as the "no back button" rule severely punishes hesitation.

### Conclusion and Outstanding Queries

Creating a viable stretch tier for a high-ability 10-year-old targeting Brighton College requires a fundamental paradigm shift in authoring philosophy. By harvesting the deep structural logic of competitions like the UKMT and MOEMS, rigorously utilising the 15 documented mathematical archetypes, and strictly aligning with the modern Century Tech taxonomy, an application can deliver authentic competition-grade rigor using standard Key Stage 2 arithmetic. The pedagogical emphasis must remain on spatial visualisation, the deep parsing of linguistic logic through cryptics and word ladders, and building psychological resilience under multi-step cognitive load.

**Source-Confidence Summary:**
- ISEB Structure & Century Tech: High confidence. Corroborated across official ISEB support articles and verified third-party platforms (Pretest Plus, Atom Learning).
- Maths Canon Mapping: High confidence. Official documentation from the Mathematical Association, UKMT, and Art of Problem Solving validates age ranges and question applicability.
- Brighton College Stage 2: Medium/High confidence. Based on institutional admissions data and aggregate tutoring conventions; it should be noted that individual school papers can experience minor, unannounced annual format shifts.

**"Ask the Publisher/Admissions" List (Unsettled Queries):**
1. Brighton College Stage 2 Calculations: Are candidates permitted or explicitly expected to show their working out on the December written mathematics paper, and does the marking scheme award partial credit for flawed arithmetic that nonetheless follows a correct logical chain?
2. ISEB Accessibility Tools: Does the Century Tech platform provide an on-screen digital scratchpad or whiteboard tool for the spatial reasoning/NVR sections, or must all 3D rotation and block counting be executed strictly within the candidate's working memory?
3. App Gamification Limits: From a product development perspective, what is the maximum acceptable time-on-task per question the app can sustain before the UI algorithm intervenes with a "need a hint?" prompt during the 6-month preparatory runway?
