import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { findSection, scienceSections } from '../data/science';
import { useProgress } from '../lib/storage';
import { firstAnswer } from '../components/QuestionRunner';
import type { Question } from '../data/types';
import { shuffle } from '../lib/shuffle';

type Recall = 'got-it' | 'almost' | 'nope';

export function Flashcards() {
  const { sectionId } = useParams();
  const { state, recordAttempt } = useProgress();

  const pool = useMemo(() => {
    const all = sectionId
      ? findSection(sectionId)?.questions ?? []
      : scienceSections.flatMap((s) => s.questions);
    return prioritise(all, state.box);
  }, [sectionId, state.box]);

  const deck = useMemo(() => shuffle(pool), [pool]);

  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  if (deck.length === 0) {
    return <div className="card">No cards available.</div>;
  }

  if (index >= deck.length) {
    return (
      <div className="card text-center space-y-4">
        <div className="text-5xl">🎉</div>
        <h2 className="text-2xl font-bold">Deck complete</h2>
        <p className="text-ink/70">
          You've worked through all {deck.length} cards.
        </p>
        <div className="flex gap-3 justify-center pt-2">
          <button
            onClick={() => {
              setIndex(0);
              setRevealed(false);
            }}
            className="tap bg-accent text-white font-bold"
          >
            Go again
          </button>
          <Link to="/" className="tap bg-ink/5 font-bold">
            Home
          </Link>
        </div>
      </div>
    );
  }

  const q = deck[index];
  const level = state.box[q.id] ?? 1;

  function rate(recall: Recall) {
    if (recall === 'got-it') recordAttempt(q.id, true, q.difficulty);
    else if (recall === 'nope') recordAttempt(q.id, false, q.difficulty);
    // 'almost' deliberately doesn't touch Leitner — same level, no XP
    setRevealed(false);
    setIndex((i) => i + 1);
  }

  return (
    <div className="space-y-5">
      <ProgressBar value={index} max={deck.length} />

      <button
        type="button"
        onClick={() => setRevealed((v) => !v)}
        className="w-full card text-left active:scale-[0.99] transition-transform min-h-[18rem]"
        aria-label={revealed ? 'Hide answer' : 'Reveal answer'}
      >
        <div className="flex items-center justify-between text-xs uppercase tracking-wide text-ink/50 mb-3">
          <span>Card {index + 1} of {deck.length}</span>
          <span>Level {level}/5</span>
        </div>

        <h2 className="text-2xl font-bold leading-snug">{q.prompt}</h2>

        {revealed ? (
          <div className="mt-6 space-y-3">
            <div className="rounded-2xl bg-accent/10 border border-accent/30 p-4">
              <p className="text-sm text-ink/60 uppercase tracking-wide mb-1">Answer</p>
              <p className="font-bold text-lg">{firstAnswer(q.answer)}</p>
            </div>
            <p className="text-sm leading-relaxed">{q.explanation}</p>
          </div>
        ) : (
          <p className="mt-8 text-center text-ink/40 italic">Tap to reveal</p>
        )}
      </button>

      {revealed ? (
        <div className="grid grid-cols-3 gap-2">
          <button onClick={() => rate('nope')} className="tap bg-rose-400 text-white font-bold">
            Nope ✗
          </button>
          <button onClick={() => rate('almost')} className="tap bg-amber-400 text-white font-bold">
            Almost
          </button>
          <button onClick={() => rate('got-it')} className="tap bg-emerald-500 text-white font-bold">
            Got it ✓
          </button>
        </div>
      ) : (
        <p className="text-center text-sm text-ink/50">
          Think of your answer first, then tap the card.
        </p>
      )}
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

function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = max === 0 ? 0 : (value / max) * 100;
  return (
    <div className="h-2 bg-ink/10 rounded-full overflow-hidden">
      <div
        className="h-full bg-accent transition-all duration-300"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
