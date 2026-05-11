import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { scienceQuestions } from '../data/science';
import { useProgress } from '../lib/storage';
import { mistakesQueue } from '../lib/mistakes';
import { QuestionRunner } from '../components/QuestionRunner';

export function Mistakes() {
  const { state, recordAttempt } = useProgress();
  const queueIds = useMemo(() => mistakesQueue(state.attempts), [state.attempts]);

  const queue = useMemo(
    () => queueIds.map((id) => scienceQuestions.find((q) => q.id === id)).filter(Boolean) as typeof scienceQuestions,
    [queueIds],
  );

  const [index, setIndex] = useState(0);
  const [runKey, setRunKey] = useState(0);

  if (queue.length === 0) {
    return (
      <div className="card text-center space-y-3">
        <div className="text-5xl">🎯</div>
        <h2 className="text-2xl font-bold">No mistakes to review</h2>
        <p className="text-ink/60">
          Get any quiz question wrong and it'll appear here until you've answered
          it correctly twice in a row.
        </p>
        <Link to="/" viewTransition className="tap bg-ink/5 font-bold inline-block">
          Back home
        </Link>
      </div>
    );
  }

  if (index >= queue.length) {
    return (
      <div className="card text-center space-y-4">
        <h2 className="text-2xl font-bold">Round done 🎉</h2>
        <p className="text-ink/70">
          {queue.length} question{queue.length === 1 ? '' : 's'} reviewed. Refresh
          to see what's still in the queue — questions only graduate after 2
          correct answers in a row.
        </p>
        <div className="flex gap-3 justify-center pt-2">
          <button
            onClick={() => {
              setIndex(0);
              setRunKey((k) => k + 1);
            }}
            className="tap bg-accent text-white font-bold"
          >
            Go again
          </button>
          <Link to="/" viewTransition className="tap bg-ink/5 font-bold">
            Home
          </Link>
        </div>
      </div>
    );
  }

  const q = queue[index];

  return (
    <div className="space-y-5">
      <ProgressBar value={index} max={queue.length} />

      <div className="card space-y-4">
        <p className="text-xs uppercase tracking-wide text-rose-600">
          Mistakes Queue · {index + 1} of {queue.length}
        </p>
        <QuestionRunner
          key={`${q.id}-${runKey}`}
          question={q}
          onResolved={(correct) => recordAttempt(q.id, correct, q.difficulty)}
          onNext={() => setIndex((i) => i + 1)}
          nextLabel={index + 1 < queue.length ? 'Next →' : 'Finish'}
        />
      </div>
    </div>
  );
}

function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = max === 0 ? 0 : (value / max) * 100;
  return (
    <div className="h-2 bg-ink/10 rounded-full overflow-hidden">
      <div className="h-full bg-rose-500 progress-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}
