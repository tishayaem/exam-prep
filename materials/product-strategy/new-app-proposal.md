# Product strategy — a new standalone app

*Product-strategy exercise, July 2026. Phase 1 analyzes the existing exam-prep
app; Phase 2 proposes ONE new, separate product that borrows its core insight.
This is a strategy document, not a roadmap item — nothing here changes the
existing app.*

## Phase 1 — what the existing app actually is

**The problem it solves, and for whom.** A ten-year-old is six months out from
a two-stage selective-school entrance exam (Brighton College 11+): an online
adaptive multiple-choice pre-test across four subjects, then written papers and
an interview day. The syllabus is wide, the deadline is distant, and the child
— not the parent — has to put in the daily minutes. The app's real job is
**converting an intimidating exam syllabus into short, game-shaped sessions a
ten-year-old will choose to do alone on an iPad**: streaks, XP, confetti,
45–60-second sprints, a weekly puzzle mix, and an adaptive "Smart Practice"
that quietly aims at weak spots. The parent's job (authoring content, verifying
answer keys, tracking the exam format) is done offline, in the repo; the
child's experience is pure play-shaped practice. A second, subtler problem it
solves: the exam has **two conflicting formats** (on-screen MCQ pacing vs
write-in working and extended writing), and the app deliberately trains both.

**The single most valuable moment.** It's not answering a question — it's the
**visible-progress payoff a few seconds later**: the instant right/wrong
feedback, the confetti, and above all a topic that was red on the Skills Map
turning green, or a past mistake "graduating" out of the Fix-ups queue after
being beaten twice (the second time on a disguised twin, so it can't be passed
by memory). The emotional core is *"I can see myself getting smarter, right
now."* Everything else — sprints, mocks, mastery model — exists to manufacture
that moment several times a day.

**What a user would tell a friend, in one sentence.** *"It's like a game
version of the 11+ — my kid actually chooses to do exam practice on the iPad."*

The transferable audience insight: **11+ families are an anxious, highly
networked community** (school-gate chat, class WhatsApp groups, Mumsnet/Eleven
Plus forums), and the kids themselves are motivated far more by instant
feedback and beating someone than by "revision."

## Phase 2 — the new app

### The winner: **The Daily Cube**

**1. One sentence.** A free web page with one spatial-reasoning puzzle per day
— the same puzzle for everyone, taken from the question types on a real exam
for ten-year-olds — that you solve in under a minute and share as a
spoiler-free score grid.

**2. The core interaction.** You open the page and the day's puzzle is already
on screen — a rendered figure (how many cubes in this stack? which net folds
into this cube? which shape doesn't belong?) with 4–5 tappable answers. No
account, no onboarding, no instructions needed: the picture *is* the
instruction. You tap; you get instant right/wrong with a one-line "why," your
solve time, and two comparisons: *"faster than 71% of today's players — and
54% of ten-year-olds get this one right."* A localStorage streak counts your
days (the main app already proves this no-backend pattern). Total time to
first value: ~20 seconds.

**3. Why THIS audience shares it.** Two motivations, stacked:

- **Humor/humility for adults.** The share artifact leads with the killer
  line: *"🧊 Daily Cube #142 · solved in 0:41 · this is on an exam for
  10-year-olds."* Adults being humbled by a children's test question is a
  proven social format — it invites the reader to try it, which is the whole
  loop. Spatial puzzles are the right vehicle because they're
  language-neutral, need zero curriculum knowledge, and are *genuinely* hard
  for untrained adults.
- **Comparison inside existing groups.** Because everyone gets the identical
  puzzle each day, scores are commensurable — and 11+ parent WhatsApp groups
  and family chats are exactly where a daily "did you get today's?" ritual
  takes root. Kids in prep get a status inversion they will not shut up
  about: they routinely beat their parents.

The share output is Wordle-style: emoji grid + time + percentile, spoiler-free
by construction. Sharing isn't a button bolted on; the score card *is* the
result screen.

**4. Feedback to the main app (secondary).** A one-line footer — *"This
question type appears on the ISEB 11+ pre-test"* — with a link to the practice
app. The people most hooked by the puzzles (competitive parents of 8–10s) are
precisely the funnel. The main app's cube-stack and cube-net renderers, and
its fold-simulator answer verification, are directly reusable as the content
engine.

**5. Two ways it fails.**

- **The content treadmill.** One verified figure puzzle per day, forever. The
  main repo's history shows how expensive correctness is here (a 3D fold
  simulator exists *because* hand-authored nets go wrong) — and a daily
  puzzle with a wrong official answer dies publicly, in one day. Mitigation
  is a parametric generator with machine-checkable answers (cube counts and
  net folds both have them), but that's real engineering before launch, not
  after.
- **Niche and seasonal beyond the beachhead.** If it only ever reaches 11+
  families, the market is small and peaks September–November; daily-puzzle
  habits need a general "brain-teaser" audience to sustain the loop
  year-round. The bet is that "children's exam question humbles adults"
  generalizes the way Wordle did — if it stays an 11+ in-joke, the loop
  starves after offer day in January.

### Why it beat the other two candidates

- **"Beaten by a Ten-Year-Old"** — a 60-second, 10-question adult quiz
  producing a verdict card ("You would NOT get into Brighton College").
  Strongest single viral spike, but it's one-and-done: no daily cadence, no
  reason to return, so every visitor must be re-acquired. The Daily Cube
  keeps that exact hook as its share-card copy while adding a retention
  spine.
- **Word Ladder Duels** — solve a Carroll word ladder, send a challenge link,
  friend races the same ladder head-to-head. Great kid-to-kid mechanic, but
  it fails the 30-second solo-value test (the payoff needs a second person to
  respond) and word puzzles are language-bound, capping the audience the
  moment it tries to spread beyond English-curriculum families.

The Daily Cube is the only candidate that is valuable alone in 30 seconds,
returns daily by design, and produces a share artifact that works in the
audience's *existing* group chats rather than asking them to build new ones.
