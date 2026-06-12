import { useState } from 'react';
import { Link } from 'react-router-dom';
import { allSections } from '../data';
import { packTitle } from '../data/packs';
import { useProgress } from '../lib/storage';
import { buildPuzzleMix, PUZZLE_MIX_SIZE } from '../lib/puzzleMix';
import type { FormBand, PuzzleMix as Mix } from '../lib/puzzleMix';
import { QuestionRunner } from '../components/QuestionRunner';
import { Headline } from '../components/Editorial';
import { confettiBurst } from '../lib/confetti';

/**
 * The weekly Puzzle mix — ten stretch puzzles re-rolled every Monday (see
 * lib/puzzleMix.ts for the serving rule). Deliberately the OPPOSITE of the
 * sprints: no timer, no streak mechanics, feedback after every question,
 * and review copy that treats wrong turns as part of the game. Puzzles are
 * supposed to make you stop and think.
 */
type Phase = 'pre' | 'running' | 'review';

const BAND_LINE: Record<FormBand, string> = {
  'first-week': 'Your first mix — a gentle ramp to find your level.',
  rebuilding: 'This week leans a little friendlier. Stack up some wins.',
  'in-band': 'Tuned to be beatable-but-bitey: about eight in ten should fall.',
  cruising: 'You\'ve been cruising, so this week\'s mix bites harder.',
};

export function PuzzleMix() {
  const { state, recordAttempt } = useProgress();
  const [phase, setPhase] = useState<Phase>('pre');
  const [mix, setMix] = useState<Mix>(() => buildPuzzleMix(allSections, state));
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);

  function start() {
    // Rebuild at start so the band reflects any practice since page load.
    setMix(buildPuzzleMix(allSections, state));
    setIndex(0);
    setCorrect(0);
    setPhase('running');
  }

  if (phase === 'pre') {
    return <PreScreen mix={mix} onStart={start} />;
  }

  if (phase === 'review') {
    return (
      <ReviewScreen correct={correct} total={mix.questions.length} week={mix.week} />
    );
  }

  if (index >= mix.questions.length) {
    setPhase('review');
    return null;
  }

  const q = mix.questions[index];

  return (
    <div className="space-y-7">
      <div className="flex items-baseline justify-between">
        <div className="text-[13px] font-bold text-neon-purple uppercase tracking-[0.16em]">
          Puzzle mix · week {mix.week.split('-W')[1]}
        </div>
        <div className="text-[13px] font-bold tabular-nums text-inkSoft">
          {index + 1} <span className="text-rule">/</span> {mix.questions.length}
        </div>
      </div>

      <div className="flex gap-1">
        {mix.questions.map((_, i) => {
          const cls = i < index ? 'bg-neon-purple' : i === index ? 'bg-ink' : 'bg-rule';
          return <div key={i} className={`flex-1 h-1.5 ${cls} rounded-full`} />;
        })}
      </div>

      <QuestionRunner
        key={q.id}
        question={q}
        onResolved={(ok, chosen) => {
          if (ok) setCorrect((c) => c + 1);
          recordAttempt(q.id, ok, q.difficulty, chosen);
        }}
        onNext={() => {
          // Finishing the week's ten earns a shower, win or lose.
          if (index + 1 >= mix.questions.length) {
            confettiBurst(window.innerWidth / 2, window.innerHeight / 3);
          }
          setIndex((i) => i + 1);
        }}
        nextLabel={index + 1 < mix.questions.length ? 'Next puzzle ›' : 'See how it went ›'}
      />
    </div>
  );
}

// ─── Pre ─────────────────────────────────────────────────────────────────────

function PreScreen({ mix, onStart }: { mix: Mix; onStart: () => void }) {
  const packs = [
    ...new Set(
      mix.questions.map((q) => {
        const section = allSections.find((s) => s.id === q.sectionId);
        return section ? packTitle(section.pack) : '';
      }),
    ),
  ].filter(Boolean);

  return (
    <div className="space-y-9">
      <Headline
        overline="Weekly · A fresh mix every Monday"
        lead="Puzzle"
        accent="mix"
        accentColor="purple"
        subtitle={`${PUZZLE_MIX_SIZE} proper head-scratchers picked for this week. No clock, no pressure — puzzles are supposed to make you stop and think, and wrong turns are part of the game.`}
      />

      <div className="bg-ink text-paper rounded-[28px] p-7 sm:p-9 space-y-6">
        <div>
          <div className="text-[12px] font-bold text-neon-purple uppercase tracking-[0.14em]">
            This week's mix · {mix.week}
          </div>
          <div className="font-display text-2xl sm:text-[30px] font-bold tracking-[-0.025em] mt-2 leading-tight">
            {BAND_LINE[mix.band]}
          </div>
          <div className="text-[14px] text-paper/60 mt-3 leading-snug">
            Drawing from{' '}
            <span className="text-paper font-semibold">{packs.join(' · ')}</span>. Beat a
            puzzle and it sits out a fortnight; the mix re-rolls Monday.
          </div>
        </div>

        <button
          onClick={onStart}
          className="bg-neon-purple text-paper rounded-full px-7 py-4 font-bold text-base hover:opacity-90 transition-opacity w-full sm:w-auto"
        >
          Start this week's ten ›
        </button>
      </div>

      <p className="text-[13px] text-inkSoft">
        Want targeted practice instead?{' '}
        <Link to="/smart-practice" viewTransition className="text-ink font-semibold underline">
          Smart Practice
        </Link>{' '}
        aims at your gaps.
      </p>
    </div>
  );
}

// ─── Review ──────────────────────────────────────────────────────────────────

function ReviewScreen({
  correct,
  total,
  week,
}: {
  correct: number;
  total: number;
  week: string;
}) {
  // The 80–85% band IS the design target: celebrate landing in it, and frame
  // both edges as the mix's job to fix, never the child's failure.
  const tagline =
    correct >= total
      ? { text: 'A clean sweep — next Monday will bite harder.', bg: 'bg-neon-green text-ink' }
      : correct >= Math.round(total * 0.8)
        ? { text: 'The sweet spot: hard enough to matter, won anyway.', bg: 'bg-neon-green text-ink' }
        : correct >= total / 2
          ? { text: 'Proper puzzles, proper fight. The re-match is free.', bg: 'bg-neon-yellow text-ink' }
          : { text: 'Gnarly mix — it eases up while you sharpen up.', bg: 'bg-neon-pink text-paper' };

  return (
    <div className="space-y-10 pb-8">
      <header className="text-center max-w-[760px] mx-auto">
        <div className="text-[13px] font-bold text-neon-purple uppercase tracking-[0.16em] mb-3.5">
          Week {week.split('-W')[1]} mix · done
        </div>
        <div className="font-display text-[clamp(4rem,18vw,6rem)] font-bold tracking-[-0.045em] leading-[0.95]">
          {correct}
          <span className="text-inkSoft">/{total}</span>
        </div>
        <div className="font-display text-[20px] sm:text-[22px] font-semibold mt-3.5">
          <span className={`${tagline.bg} px-2`}>{tagline.text}</span>
        </div>
      </header>

      <div className="border border-rule rounded-[22px] p-6 text-center text-[15px] leading-relaxed">
        Anything you missed is waiting in{' '}
        <Link to="/mistakes" viewTransition className="font-semibold underline">
          Fix-ups
        </Link>{' '}
        — and a fresh ten lands on Monday.
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          to="/"
          viewTransition
          className="bg-ink text-paper rounded-full px-6 py-3.5 font-semibold"
        >
          Home ›
        </Link>
        <Link
          to="/smart-practice"
          viewTransition
          className="bg-paper text-ink border-[1.5px] border-ink rounded-full px-6 py-3.5 font-semibold"
        >
          Smart Practice
        </Link>
      </div>
    </div>
  );
}
