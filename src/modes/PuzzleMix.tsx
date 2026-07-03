import { useState } from 'react';
import { Link } from 'react-router-dom';
import { allSections } from '../data';
import { packTitle } from '../data/packs';
import { useProgress } from '../lib/storage';
import { QuestionRunner } from '../components/QuestionRunner';
import { Headline } from '../components/Editorial';
import { puzzleMix } from '../lib/puzzleMix';
import type { Question } from '../data/types';

type Phase = 'pre' | 'running' | 'review';

// The weekly Puzzle Mix (ROADMAP §7). Curiosity-first: feedback after every
// question, a gentle review, and deliberately no percentage/streak framing —
// the set is meant to be interesting, not a test you can fail.
export function PuzzleMix() {
  const { recordAttempt } = useProgress();
  const [phase, setPhase] = useState<Phase>('pre');
  const [paper, setPaper] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [solved, setSolved] = useState(0);

  function start() {
    setPaper(puzzleMix(allSections, Date.now()));
    setIndex(0);
    setSolved(0);
    setPhase('running');
  }

  if (phase === 'pre') {
    return <PreScreen onStart={start} />;
  }

  if (phase === 'review') {
    return <ReviewScreen solved={solved} total={paper.length} onAgain={start} />;
  }

  if (index >= paper.length) {
    setPhase('review');
    return null;
  }

  const q = paper[index];

  return (
    <div className="space-y-7">
      <div className="flex items-baseline justify-between">
        <div className="text-[13px] font-bold text-neon-blue uppercase tracking-[0.16em]">
          Puzzle Mix · just for the fun of it
        </div>
        <div className="text-[13px] font-bold tabular-nums text-inkSoft">
          {index + 1} <span className="text-rule">/</span> {paper.length}
        </div>
      </div>

      <DotProgress current={index} total={paper.length} />

      <QuestionRunner
        key={q.id}
        question={q}
        onResolved={(ok, chosen) => {
          if (ok) setSolved((c) => c + 1);
          recordAttempt(q.id, ok, q.difficulty, chosen);
        }}
        onNext={() => setIndex((i) => i + 1)}
        nextLabel={index + 1 < paper.length ? 'Next puzzle ›' : 'Finish ›'}
      />
    </div>
  );
}

// ─── Pre ─────────────────────────────────────────────────────────────────────

function PreScreen({ onStart }: { onStart: () => void }) {
  // Which packs this week's mix reaches into, for a little "what's inside".
  const mix = puzzleMix(allSections, Date.now());
  const packOf = new Map<string, string>();
  for (const s of allSections) for (const q of s.questions) packOf.set(q.id, s.pack);
  const packs = [...new Set(mix.map((q) => packTitle(packOf.get(q.id) ?? '')))];

  return (
    <div className="space-y-9">
      <Headline
        overline="This week's set · refreshes every week"
        lead="Puzzle"
        accent="Mix"
        accentColor="blue"
        subtitle={`${mix.length} brain-teasers pulled from the trickiest corners of every subject — number puzzles, word play and shapes in your head. Some are quick, one or two are proper head-scratchers. There's no score to chase; it's here because puzzles are fun.`}
      />

      <div className="bg-ink text-paper rounded-[28px] p-7 sm:p-9 space-y-6">
        <div>
          <div className="text-[12px] font-bold text-neon-blue uppercase tracking-[0.14em]">
            What's in this week's mix
          </div>
          <div className="font-display text-2xl sm:text-[30px] font-bold tracking-[-0.025em] mt-2 leading-tight">
            A little of everything tricky
          </div>
          <div className="flex flex-wrap gap-2.5 mt-4">
            {packs.map((p) => (
              <span
                key={p}
                className="border border-paper/30 text-paper rounded-full px-4 py-2 text-[13px] font-semibold"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        <p className="text-[14px] text-paper/70 leading-snug">
          Stuck on one? That's allowed — take a guess and read why. The tough ones
          you miss turn up again in <span className="text-paper font-semibold">Fix-ups</span>.
        </p>

        <button
          onClick={onStart}
          className="bg-neon-blue text-ink rounded-full px-7 py-4 font-bold text-base hover:opacity-90 transition-opacity w-full sm:w-auto"
        >
          Start this week's mix ›
        </button>
      </div>

      <p className="text-[13px] text-inkSoft">
        Want to pick a topic instead?{' '}
        <Link to="/" viewTransition className="text-ink font-semibold underline">
          Back home
        </Link>
        .
      </p>
    </div>
  );
}

// ─── Review ──────────────────────────────────────────────────────────────────

function ReviewScreen({
  solved,
  total,
  onAgain,
}: {
  solved: number;
  total: number;
  onAgain: () => void;
}) {
  // No pass/fail framing — every message is warm, whatever the count.
  const line =
    solved === total
      ? 'Every single one. Show-off. 😎'
      : solved >= Math.ceil(total / 2)
        ? 'Nice thinking — puzzles fight back and you won most rounds.'
        : 'These were the hard ones on purpose. Brains grow on the tricky bits.';

  return (
    <div className="space-y-10 pb-8">
      <header className="text-center max-w-[760px] mx-auto">
        <div className="text-[13px] font-bold text-neon-blue uppercase tracking-[0.16em] mb-3.5">
          Mix complete
        </div>
        <div className="font-display text-[clamp(4rem,18vw,6rem)] font-bold tracking-[-0.045em] leading-[0.95]">
          {solved}
          <span className="text-inkSoft">/{total}</span>
        </div>
        <div className="font-display text-[20px] sm:text-[22px] font-semibold mt-3.5">
          <span className="bg-neon-blue text-ink px-2">{line}</span>
        </div>
        <p className="text-[14px] text-inkSoft mt-5 leading-relaxed">
          A fresh mix lands next week. Come back for a new set of head-scratchers.
        </p>
      </header>

      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={onAgain}
          className="bg-paper text-ink border-[1.5px] border-ink rounded-full px-6 py-3.5 font-semibold"
        >
          Play it again
        </button>
        <Link
          to="/mistakes"
          viewTransition
          className="bg-ink text-paper rounded-full px-6 py-3.5 font-semibold"
        >
          Go to Fix-ups ›
        </Link>
      </div>
    </div>
  );
}

// ─── Bits ────────────────────────────────────────────────────────────────────

function DotProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: total }).map((_, i) => {
        const cls = i < current ? 'bg-neon-blue' : i === current ? 'bg-ink' : 'bg-rule';
        return <div key={i} className={`flex-1 h-1.5 ${cls} rounded-full`} />;
      })}
    </div>
  );
}
