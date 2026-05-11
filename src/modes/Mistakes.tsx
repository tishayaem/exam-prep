import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { scienceQuestions } from '../data/science';
import type { AttemptLog } from '../lib/storage';
import { useProgress } from '../lib/storage';
import { mistakesQueue } from '../lib/mistakes';
import { QuestionRunner, firstAnswer } from '../components/QuestionRunner';
import { SectionHeader } from '../components/Editorial';
import type { Question } from '../data/types';

export function Mistakes() {
  const { state, recordAttempt } = useProgress();
  const queueIds = useMemo(
    () => mistakesQueue(state.attempts),
    [state.attempts],
  );

  const queue = useMemo(
    () =>
      queueIds
        .map((id) => scienceQuestions.find((q) => q.id === id))
        .filter(Boolean) as Question[],
    [queueIds],
  );

  const [activeId, setActiveId] = useState<string | null>(null);
  const [redoKey, setRedoKey] = useState(0);

  if (queue.length === 0) {
    return (
      <div className="max-w-[640px] mx-auto py-10 text-center space-y-5">
        <div className="text-[13px] font-bold text-neon-pink uppercase tracking-[0.16em]">
          All clear
        </div>
        <h1 className="font-display text-[clamp(2.25rem,6vw,4rem)] font-bold tracking-[-0.04em] leading-[0.98]">
          No mistakes{' '}
          <span className="relative inline-block">
            to review.
            <span
              aria-hidden
              className="absolute left-[-2%] right-[-2%] bottom-[8%] h-[16%] bg-neon-green -z-10 -skew-x-6"
            />
          </span>
        </h1>
        <p className="text-inkSoft">
          Get any quiz question wrong and it'll appear here until you've
          answered it correctly twice in a row.
        </p>
        <Link
          to="/"
          viewTransition
          className="inline-block bg-ink text-paper rounded-full px-6 py-3.5 font-semibold"
        >
          Back home
        </Link>
      </div>
    );
  }

  const active = activeId
    ? queue.find((q) => q.id === activeId)
    : null;

  if (active) {
    return (
      <div className="space-y-7">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setActiveId(null)}
            className="text-[13px] font-semibold text-inkSoft hover:text-ink"
          >
            ← Back to mistakes
          </button>
          <span className="text-[13px] font-bold text-neon-pink uppercase tracking-[0.16em]">
            Redo · {active.id}
          </span>
        </div>
        <QuestionRunner
          key={`${active.id}-${redoKey}`}
          question={active}
          onResolved={(correct) => recordAttempt(active.id, correct, active.difficulty)}
          onNext={() => {
            // Re-mount so the user can answer it again to build the streak.
            setRedoKey((k) => k + 1);
            setActiveId(null);
          }}
          nextLabel="Back to list ›"
        />
      </div>
    );
  }

  return (
    <div className="space-y-9">
      <header>
        <div className="text-[13px] font-bold text-neon-pink uppercase tracking-[0.16em] mb-3">
          Your wrong-uns
        </div>
        <h1 className="font-display text-[clamp(2.25rem,6.4vw,4.5rem)] font-bold tracking-[-0.04em] leading-[0.95] m-0">
          Beat each one{' '}
          <span className="relative inline-block">
            twice
            <span
              aria-hidden
              className="absolute left-[-2%] right-[-2%] bottom-[8%] h-[18%] bg-neon-pink -z-10 -skew-x-6"
            />
          </span>{' '}
          in a row.
        </h1>
        <p className="text-[15px] text-inkSoft mt-4 max-w-xl leading-relaxed">
          Get a question right twice in a row and it graduates out of this
          list. Get it wrong and the counter resets.
        </p>
      </header>

      <section>
        <SectionHeader
          title={`${queue.length} to revisit`}
          trailing="Tap to redo"
        />
        <div className="grid gap-3.5">
          {queue.map((q, i) => (
            <MistakeRow
              key={q.id}
              index={i}
              question={q}
              streak={correctStreak(q.id, state.attempts)}
              onRedo={() => setActiveId(q.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

/**
 * Counts the number of consecutive correct answers since the last wrong one
 * for this question. Once that hits 2, `mistakesQueue()` graduates the row.
 * Used to render the "Streak to graduate" pips (0/2 or 1/2).
 */
function correctStreak(id: string, attempts: readonly AttemptLog[]): number {
  let streak = 0;
  for (let i = attempts.length - 1; i >= 0; i--) {
    const a = attempts[i];
    if (a.id !== id) continue;
    if (a.correct) streak += 1;
    else break;
  }
  // Cap at 2 — that's the graduation threshold and the pip count we render.
  return Math.min(streak, 2);
}

function MistakeRow({
  index,
  question,
  streak,
  onRedo,
}: {
  index: number;
  question: Question;
  streak: number;
  onRedo: () => void;
}) {
  // Last wrong answer the user gave for this question, if we can recover it
  // — only MCQ/truefalse store the user's actual choice; for free text we
  // just say "Not the right one".
  const yourAnswer = lastWrongAnswer(question);

  return (
    <div className="border border-rule rounded-[22px] p-5 sm:p-6 grid gap-4 sm:gap-6 grid-cols-[40px_1fr] sm:grid-cols-[40px_1fr_180px_auto] items-center">
      <div className="font-display text-2xl font-bold text-inkSoft tabular-nums self-start sm:self-center">
        {String(index + 1).padStart(2, '0')}
      </div>

      <div className="min-w-0 col-span-1">
        <div className="text-[16px] sm:text-[17px] font-semibold mb-2 leading-snug">
          {question.prompt}
        </div>
        <div className="flex flex-wrap gap-2.5 text-[12px] sm:text-[13px] text-inkSoft">
          {yourAnswer && (
            <span>
              You said{' '}
              <span className="bg-neon-pink text-paper px-1.5 py-0.5">
                {yourAnswer}
              </span>
            </span>
          )}
          <span>
            Answer is{' '}
            <span className="bg-neon-green text-ink px-1.5 py-0.5">
              {firstAnswer(question.answer)}
            </span>
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
        <div className="text-[10px] text-inkSoft font-bold uppercase tracking-[0.1em] whitespace-nowrap">
          Streak to graduate
        </div>
        <div className="flex gap-1.5">
          {[0, 1].map((p) => (
            <div
              key={p}
              className={`flex-1 h-2.5 rounded-full ${
                p < streak ? 'bg-neon-green' : 'bg-rule'
              }`}
            />
          ))}
        </div>
      </div>

      <button
        onClick={onRedo}
        className="bg-ink text-paper rounded-full px-5 py-2.5 font-bold text-[13px] hover:bg-neon-pink transition-colors col-span-2 sm:col-span-1 justify-self-stretch sm:justify-self-end"
      >
        Redo ›
      </button>
    </div>
  );
}

/**
 * For MCQ-style questions, we don't currently log the user's *chosen* wrong
 * answer — only the boolean correctness — so we omit the "You said X" chip
 * unless we can derive a sensible fallback. Returns null when we can't.
 */
function lastWrongAnswer(_question: Question): string | null {
  // The attempt log stores correctness only, not the chosen option. Showing
  // an honest "—" is better than fabricating one. If we ever start logging
  // the chosen answer, surface it here.
  return null;
}
