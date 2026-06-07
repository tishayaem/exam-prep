import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { findSection, allSections } from '../data';
import { useProgress } from '../lib/storage';
import { formatAnswer } from '../components/QuestionRunner';
import { FlipCard } from '../components/FlipCard';
import type { Question } from '../data/types';
import { shuffle } from '../lib/shuffle';
import { burstFromEvent } from '../lib/confetti';

type Recall = 'got-it' | 'nope';

export function Flashcards() {
  const { sectionId } = useParams();
  // Key by sectionId so jumping from one deck to another (or to/from
  // all-sections) re-mounts FlashcardsBody and resets index/revealed/stats.
  return <FlashcardsBody key={sectionId ?? '__all__'} sectionId={sectionId} />;
}

function FlashcardsBody({ sectionId }: { sectionId: string | undefined }) {
  const { state, recordAttempt } = useProgress();

  const pool = useMemo(() => {
    const all = (
      sectionId
        ? findSection(sectionId)?.questions ?? []
        : allSections.flatMap((s) => s.questions)
    ).filter((q) => q.type !== 'nvr'); // NVR needs rendered figures; flip-cards can't show them
    return prioritise(all, state.box);
  }, [sectionId, state.box]);

  const deck = useMemo(() => shuffle(pool), [pool]);

  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [stats, setStats] = useState({ got: 0, nope: 0 });

  if (deck.length === 0) {
    return (
      <div className="border border-rule rounded-3xl p-8 text-center">
        No cards available.
      </div>
    );
  }

  if (index >= deck.length) {
    return <DoneScreen deck={deck} stats={stats} onAgain={resetRun} />;
  }

  const q = deck[index];

  function rate(recall: Recall, e: React.MouseEvent<HTMLButtonElement>) {
    const correct = recall === 'got-it';
    recordAttempt(q.id, correct, q.difficulty);
    if (correct) {
      burstFromEvent(e);
      setStats((s) => ({ ...s, got: s.got + 1 }));
    } else {
      setStats((s) => ({ ...s, nope: s.nope + 1 }));
    }
    setRevealed(false);
    setIndex((i) => i + 1);
  }

  function resetRun() {
    setIndex(0);
    setRevealed(false);
    setStats({ got: 0, nope: 0 });
  }

  return (
    <div className="space-y-7">
      {/* Top bar */}
      <div className="flex items-baseline justify-between">
        <div className="text-[13px] font-bold text-neon-pink uppercase tracking-[0.16em]">
          Card {index + 1}{' '}
          <span className="text-inkSoft">/ {deck.length}</span>
        </div>
        <div className="flex gap-3 text-xs text-inkSoft">
          <Pip color="bg-neon-green" value={stats.got} />
          <Pip color="bg-neon-pink" value={stats.nope} />
        </div>
      </div>

      <DotProgress current={index} total={deck.length} />

      <FlipCard
        revealed={revealed}
        onClick={() => setRevealed((v) => !v)}
        ariaLabel={revealed ? 'Hide answer' : 'Reveal answer'}
        minHeight="380px"
        frontClassName="bg-paper border-2 border-ink rounded-[32px] p-6 sm:p-8 relative h-full flex items-center"
        backClassName="bg-ink border-2 border-ink rounded-[32px] p-6 sm:p-8 relative h-full flex items-center"
        front={
          <>
            <div className="absolute top-5 left-6 text-[11px] font-bold text-inkSoft uppercase tracking-[0.14em]">
              Front · Question
            </div>
            <div className="absolute top-5 right-6 flex gap-1.5" aria-hidden>
              <div className="w-3.5 h-3.5 rounded-full bg-neon-green" />
              <div className="w-3.5 h-3.5 bg-neon-pink" />
              <div className="w-3.5 h-3.5 bg-neon-yellow rotate-45" />
            </div>
            <div className="font-display text-3xl sm:text-[44px] font-bold tracking-[-0.028em] leading-[1.08] max-w-[800px]">
              {q.prompt}
            </div>
            <div className="absolute bottom-5 left-6 text-[13px] text-inkSoft">
              Tap to flip
            </div>
          </>
        }
        back={
          <>
            <div className="absolute top-5 left-6 text-[11px] font-bold text-neon-green uppercase tracking-[0.14em]">
              Back · Answer
            </div>
            <div className="max-w-[760px]">
              <div className="font-display text-4xl sm:text-[52px] font-bold tracking-[-0.03em] text-paper leading-[1.05]">
                <span className="bg-neon-green text-ink px-2.5">
                  {formatAnswer(q)}
                </span>
              </div>
              <div className="text-[15px] sm:text-[16px] text-[#C5C5CC] mt-4 leading-relaxed max-w-[600px]">
                {q.explanation}
              </div>
            </div>
            <div className="absolute bottom-5 left-6 text-[13px] text-[#8A8A99]">
              Tap to flip back
            </div>
          </>
        }
      />

      {revealed ? (
        <div className="grid grid-cols-2 gap-3 animate-feedback-in">
          <RateButton
            color="bg-neon-pink text-paper"
            label="Nope"
            onClick={(e) => rate('nope', e)}
          />
          <RateButton
            color="bg-neon-green text-ink"
            label="Got it"
            onClick={(e) => rate('got-it', e)}
          />
        </div>
      ) : (
        <p className="text-center text-sm text-inkSoft">
          Think of your answer first, then tap the card to flip.
        </p>
      )}
    </div>
  );
}

function Pip({ color, value }: { color: string; value: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 tabular-nums">
      <span className={`block w-2 h-2 rounded-full ${color}`} />
      {value}
    </span>
  );
}

function DotProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: total }).map((_, i) => {
        const cls =
          i < current ? 'bg-neon-green' : i === current ? 'bg-ink' : 'bg-rule';
        return <div key={i} className={`flex-1 h-1 ${cls} rounded-full`} />;
      })}
    </div>
  );
}

function RateButton({
  color,
  label,
  onClick,
}: {
  color: string;
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`${color} rounded-2xl px-5 py-4 font-bold text-[16px] hover:opacity-90 transition-opacity`}
    >
      {label}
    </button>
  );
}

function DoneScreen({
  deck,
  stats,
  onAgain,
}: {
  deck: Question[];
  stats: { got: number; nope: number };
  onAgain: () => void;
}) {
  return (
    <div className="max-w-[760px] mx-auto text-center py-6 sm:py-12">
      <div className="text-[13px] font-bold text-neon-pink uppercase tracking-[0.16em] mb-3.5">
        Deck complete
      </div>
      <h1 className="font-display text-[clamp(2.5rem,7vw,4.5rem)] font-bold tracking-[-0.04em] leading-[0.98] m-0">
        Worked through all{' '}
        <span className="relative inline-block">
          {deck.length} cards.
          <span
            aria-hidden
            className="absolute left-[-2%] right-[-2%] bottom-[8%] h-[16%] bg-neon-green -z-10 -skew-x-6"
          />
        </span>
      </h1>

      <div className="flex flex-wrap gap-3 justify-center mt-8">
        <BigStat color="bg-neon-green" label="Got it" value={stats.got} />
        <BigStat color="bg-neon-pink" label="Nope" value={stats.nope} />
      </div>

      <div className="flex flex-wrap gap-3 justify-center mt-8">
        <button
          onClick={onAgain}
          className="bg-paper text-ink border-[1.5px] border-ink rounded-full px-6 py-3.5 font-semibold"
        >
          Go again
        </button>
        <Link
          to="/"
          viewTransition
          className="bg-ink text-paper rounded-full px-6 py-3.5 font-semibold"
        >
          Home
        </Link>
      </div>
    </div>
  );
}

function BigStat({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value: number;
}) {
  return (
    <div className="border-[1.5px] border-rule rounded-[22px] px-6 py-5 min-w-[140px] text-left">
      <div className={`w-3 h-3 rounded-full ${color} mb-2.5`} />
      <div className="font-display text-5xl font-bold tracking-[-0.03em] leading-none">
        {value}
      </div>
      <div className="text-[13px] text-inkSoft mt-1">{label}</div>
    </div>
  );
}

function prioritise(
  questions: Question[],
  box: Record<string, 1 | 2 | 3 | 4 | 5>,
): Question[] {
  // Lower Leitner level first (more practice needed), unseen treated as level 1.
  return [...questions].sort((a, b) => (box[a.id] ?? 1) - (box[b.id] ?? 1));
}
