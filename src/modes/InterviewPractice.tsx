import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FlipCard } from '../components/FlipCard';
import {
  INTERVIEW_CATEGORIES,
  categoryLabel,
  questionsByCategory,
} from '../data/interview';
import type { InterviewCategory } from '../data/interview';
import { shuffle } from '../lib/shuffle';

type Filter = InterviewCategory | 'all';

/**
 * Interview practice deck. Tap-to-reveal flip cards: the front is a question,
 * the back is "what they’re really asking" plus talking-point prompts. There is
 * deliberately NO scoring or progress tracking — an interview answer has no
 * right answer, so this is about getting used to talking, not getting marked.
 * Shuffle mixes the deck so questions stop arriving in tidy category order,
 * which is closer to how a real chat jumps around.
 */
export function InterviewPractice() {
  const [filter, setFilter] = useState<Filter>('all');
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  // 0 = file order; each increment deals a fresh shuffle of the current deck.
  const [mixCount, setMixCount] = useState(0);

  const deck = useMemo(() => {
    const base = questionsByCategory(filter);
    return mixCount === 0 ? base : shuffle(base);
  }, [filter, mixCount]);
  const q = deck[index];

  function choose(next: Filter) {
    setFilter(next);
    setMixCount(0);
    setIndex(0);
    setRevealed(false);
  }

  function mix() {
    setMixCount((n) => n + 1);
    setIndex(0);
    setRevealed(false);
  }

  function go(delta: number) {
    setRevealed(false);
    setIndex((i) => Math.min(Math.max(i + delta, 0), deck.length - 1));
  }

  return (
    <div className="space-y-7">
      {/* Title + how-to */}
      <div>
        <div className="text-[13px] font-bold text-neon-pink uppercase tracking-[0.16em] mb-2">
          Interview · Practice
        </div>
        <h1 className="font-display text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-[-0.035em] leading-[1.0] m-0">
          Read it, say it out loud, then flip.
        </h1>
        <p className="text-[15px] text-inkSoft mt-3 max-w-xl leading-relaxed">
          There are no marks here. Answer the question out loud first — only then
          tap the card to see what the teacher is really looking for.
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        <Chip label="All" active={filter === 'all'} onClick={() => choose('all')} />
        {INTERVIEW_CATEGORIES.map((c) => (
          <Chip
            key={c.id}
            label={c.label}
            active={filter === c.id}
            onClick={() => choose(c.id)}
          />
        ))}
      </div>

      {/* Top bar */}
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline gap-3">
          <div className="text-[13px] font-bold text-neon-pink uppercase tracking-[0.16em]">
            Card {index + 1} <span className="text-inkSoft">/ {deck.length}</span>
          </div>
          <button
            onClick={mix}
            className="text-[12px] font-semibold text-inkSoft border border-rule rounded-full px-3 py-1 hover:text-ink hover:border-ink transition-colors"
          >
            Shuffle
          </button>
        </div>
        {q.common && (
          <div className="text-[12px] font-bold text-ink bg-neon-yellow px-2.5 py-1 rounded-full">
            ★ Asked most often
          </div>
        )}
      </div>

      <DotProgress current={index} total={deck.length} />

      <FlipCard
        revealed={revealed}
        onClick={() => setRevealed((v) => !v)}
        ariaLabel={revealed ? 'Hide what they’re looking for' : 'Reveal what they’re looking for'}
        minHeight="360px"
        frontClassName="bg-paper border-2 border-ink rounded-[32px] p-6 sm:p-8 relative h-full flex items-center"
        backClassName="bg-ink border-2 border-ink rounded-[32px] p-6 sm:p-8 relative h-full"
        front={
          <>
            <div className="absolute top-5 left-6 text-[11px] font-bold text-inkSoft uppercase tracking-[0.14em]">
              {categoryLabel(q.category)}
            </div>
            <div className="absolute top-5 right-6 flex gap-1.5" aria-hidden>
              <div className="w-3.5 h-3.5 rounded-full bg-neon-green" />
              <div className="w-3.5 h-3.5 bg-neon-pink" />
              <div className="w-3.5 h-3.5 bg-neon-yellow rotate-45" />
            </div>
            <div className="font-display text-3xl sm:text-[40px] font-bold tracking-[-0.028em] leading-[1.1] max-w-[800px]">
              “{q.question}”
            </div>
            <div className="absolute bottom-5 left-6 text-[13px] text-inkSoft">
              Tap to flip
            </div>
          </>
        }
        back={
          <div className="h-full flex flex-col justify-center max-w-[760px]">
            <div className="text-[11px] font-bold text-neon-green uppercase tracking-[0.14em] mb-3">
              What they’re really asking
            </div>
            <div className="font-display text-2xl sm:text-[30px] font-bold tracking-[-0.02em] text-paper leading-[1.15]">
              {q.asking}
            </div>
            <div className="text-[12px] font-bold text-[#8A8A99] uppercase tracking-[0.14em] mt-6 mb-2.5">
              You could talk about
            </div>
            <ul className="grid gap-2.5">
              {q.talkingPoints.map((p, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span aria-hidden className="mt-2 w-2 h-2 rounded-full bg-neon-green shrink-0" />
                  <span className="text-[15px] sm:text-[16px] text-[#D8D8DE] leading-relaxed">
                    {p}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        }
      />

      {/* Navigation */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => go(-1)}
          disabled={index === 0}
          className="border-[1.5px] border-ink text-ink rounded-2xl px-5 py-4 font-bold text-[16px] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-off transition-colors"
        >
          ‹ Back
        </button>
        {index < deck.length - 1 ? (
          <button
            onClick={() => go(1)}
            className="bg-ink text-paper rounded-2xl px-5 py-4 font-bold text-[16px] hover:bg-neon-pink transition-colors"
          >
            Next ›
          </button>
        ) : (
          <button
            onClick={() => {
              setIndex(0);
              setRevealed(false);
            }}
            className="bg-neon-green text-ink rounded-2xl px-5 py-4 font-bold text-[16px] hover:opacity-90 transition-opacity"
          >
            Start over
          </button>
        )}
      </div>

      <div className="text-center">
        <Link
          to="/interview"
          viewTransition
          className="text-sm text-inkSoft hover:text-ink transition-colors"
        >
          ‹ Back to the interview guide
        </Link>
      </div>
    </div>
  );
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`px-3.5 py-2 rounded-full text-[13px] font-semibold border transition-colors ${
        active
          ? 'bg-ink text-paper border-ink'
          : 'bg-transparent text-ink border-rule hover:border-ink'
      }`}
    >
      {label}
    </button>
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
