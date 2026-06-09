import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { allSections } from '../data';
import { shuffle } from '../lib/shuffle';
import { gradeNumeric } from '../lib/grading';
import { numberSprintPool } from '../lib/numberSprint';
import { useProgress } from '../lib/storage';
import type { Question } from '../data/types';

// Longer than Vocab Sprint's 45s: typing a number takes more time than
// tapping an option, and the ISEB opening section rewards a steady minute.
const SPRINT_SECONDS = 60;

const firstAnswer = (a: string | string[]): string =>
  Array.isArray(a) ? a[0] : a;

export function NumberSprint() {
  const { recordAttempt } = useProgress();

  const pool = useMemo(() => numberSprintPool(allSections), []);
  const [run, setRun] = useState<Question[]>(() => shuffle(pool));
  const [phase, setPhase] = useState<'pre' | 'running' | 'done'>('pre');
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(SPRINT_SECONDS);
  const [input, setInput] = useState('');
  const [verdict, setVerdict] = useState<'correct' | 'wrong' | null>(null);

  const active: Question | null = run[index] ?? null;

  useEffect(() => {
    if (phase !== 'running') return;
    if (secondsLeft <= 0) {
      setPhase('done');
      return;
    }
    const id = window.setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(id);
  }, [phase, secondsLeft]);

  if (pool.length < 5) {
    return (
      <div className="max-w-[640px] mx-auto py-10 text-center space-y-5">
        <h2 className="font-display text-3xl font-bold tracking-tight">
          Not enough questions
        </h2>
        <p className="text-inkSoft">
          Number Sprint needs a few quick-fire maths questions to draw from.
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

  function startRun() {
    setRun(shuffle(pool));
    setIndex(0);
    setScore(0);
    setSecondsLeft(SPRINT_SECONDS);
    setInput('');
    setVerdict(null);
    setPhase('running');
  }

  if (phase === 'pre') {
    return (
      <div className="space-y-9">
        <header>
          <div className="text-[13px] font-bold text-neon-pink uppercase tracking-[0.16em] mb-3">
            Practice · Beat the buzzer
          </div>
          <h1 className="font-display text-[clamp(2.25rem,6.4vw,4.75rem)] font-bold tracking-[-0.04em] leading-[0.95] m-0">
            Number{' '}
            <span className="relative inline-block">
              Sprint.
              <span
                aria-hidden
                className="absolute left-[-2%] right-[-2%] bottom-[8%] h-[18%] bg-neon-blue -z-10 -skew-x-6"
              />
            </span>
          </h1>
          <p className="text-[15px] text-inkSoft mt-4 max-w-xl leading-relaxed">
            Quick-fire arithmetic — type each answer and hit check. You have{' '}
            <strong className="text-ink font-semibold">
              {SPRINT_SECONDS} seconds
            </strong>
            . Stuck on one? Pass and keep moving.
          </p>
        </header>

        <div className="bg-ink text-paper rounded-[28px] p-7 sm:p-9 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <div className="text-[12px] font-bold text-neon-blue uppercase tracking-[0.14em]">
              {pool.length} questions loaded
            </div>
            <div className="font-display text-2xl sm:text-[32px] font-bold tracking-[-0.025em] mt-2 leading-tight">
              Tap when you're ready.
            </div>
          </div>
          <button
            onClick={startRun}
            className="bg-neon-blue text-ink rounded-full px-7 py-4 font-bold text-[15px] hover:opacity-90 transition-opacity justify-self-start"
          >
            Start ›
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'done' || index >= run.length) {
    const total = Math.max(index, 1);
    const tagline =
      score >= 12
        ? { text: 'Calculator brain.', bg: 'bg-neon-green text-ink' }
        : score >= 7
          ? { text: 'Quick! One more sprint?', bg: 'bg-neon-yellow text-ink' }
          : { text: 'Slow is smooth — run it again.', bg: 'bg-neon-pink text-paper' };

    return (
      <div className="max-w-[760px] mx-auto text-center py-6 sm:py-12 space-y-7">
        <div className="text-[13px] font-bold text-neon-pink uppercase tracking-[0.16em]">
          Time's up
        </div>
        <div className="font-display text-[clamp(4rem,18vw,6rem)] font-bold tracking-[-0.045em] leading-[0.95]">
          {score}
          <span className="text-inkSoft">/{total}</span>
        </div>
        <div className="font-display text-[20px] sm:text-[22px] font-semibold">
          <span className={`${tagline.bg} px-2`}>{tagline.text}</span>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={startRun}
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

  // Past the early returns, active is non-null.
  const q = active!;
  const resolved = verdict !== null;

  function submit() {
    if (resolved) return;
    const typed = input.trim();
    if (!typed) return;
    const correct = gradeNumeric(typed, q.answer, q.acceptable);
    setVerdict(correct ? 'correct' : 'wrong');
    if (correct) setScore((s) => s + 1);
    // Real question ids: each answer nudges the Leitner box and lands in the
    // attempt log, so sprint slip-ups surface in Fix-ups like any other miss.
    recordAttempt(q.id, correct, 1, typed);
    // Asymmetric: snap forward on correct, linger on wrong so there's time
    // to read the right answer before it disappears.
    window.setTimeout(
      () => {
        setVerdict(null);
        setInput('');
        setIndex((i) => i + 1);
      },
      correct ? 450 : 1400,
    );
  }

  // A pass is a free skip: no attempt is logged, nothing lands in Fix-ups.
  // The denominator still moves, so passed questions show in the final score.
  function pass() {
    if (resolved) return;
    setInput('');
    setIndex((i) => i + 1);
  }

  const lowTime = secondsLeft <= 10;
  const inputBorder =
    verdict === 'correct'
      ? 'border-neon-green'
      : verdict === 'wrong'
        ? 'border-neon-pink'
        : 'border-rule focus:border-ink';

  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between">
        <div className="text-[13px] font-bold text-neon-pink uppercase tracking-[0.16em]">
          Question {index + 1}
        </div>
        <div className="flex items-baseline gap-4 text-[13px] font-semibold">
          <span>
            <span className="text-inkSoft">Score </span>
            <span className="bg-neon-green px-2 py-0.5 font-bold text-ink tabular-nums">
              {score}
            </span>
          </span>
          <span
            key={lowTime ? 'low' : 'normal'}
            className={`tabular-nums inline-block ${
              lowTime ? 'text-neon-pink animate-emphasis-pop' : 'text-ink'
            }`}
          >
            ⏱ {secondsLeft}s
          </span>
        </div>
      </div>

      <div className="h-1.5 bg-off rounded-full overflow-hidden">
        <div
          className="h-full bg-neon-blue rounded-full progress-fill"
          style={{ width: `${(secondsLeft / SPRINT_SECONDS) * 100}%` }}
        />
      </div>

      <div className="bg-ink text-paper rounded-[28px] p-7 sm:p-10">
        <div className="text-[11px] font-bold text-neon-blue uppercase tracking-[0.14em]">
          Work it out
        </div>
        <div className="font-display text-2xl sm:text-[34px] font-bold tracking-[-0.025em] mt-2 leading-tight">
          {q.prompt}
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <input
          // Remounting per question re-triggers autoFocus, so the keypad
          // stays up between questions instead of needing a tap each time.
          key={index}
          autoFocus
          type="text"
          inputMode="decimal"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          disabled={resolved}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your answer…"
          className={`flex-1 rounded-2xl px-5 py-4 text-lg font-medium outline-none border-[1.5px] disabled:bg-off ${inputBorder}`}
        />
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={resolved || !input.trim()}
            className="flex-1 sm:flex-none bg-ink text-paper rounded-2xl px-7 py-4 font-bold text-[15px] disabled:opacity-40 hover:bg-neon-pink transition-colors"
          >
            Check ›
          </button>
          <button
            type="button"
            onClick={pass}
            disabled={resolved}
            className="flex-1 sm:flex-none bg-paper text-inkSoft border-[1.5px] border-rule rounded-2xl px-6 py-4 font-semibold text-[15px] disabled:opacity-40 hover:border-ink hover:text-ink transition-colors"
          >
            Pass ›
          </button>
        </div>
      </form>

      {verdict === 'correct' && (
        <div className="bg-neon-green text-ink rounded-2xl px-5 py-4 font-bold animate-emphasis-pop">
          ✓ Correct
        </div>
      )}
      {verdict === 'wrong' && (
        <div className="bg-neon-pink text-paper rounded-2xl px-5 py-4 font-semibold animate-feedback-in">
          Answer is{' '}
          <span className="bg-paper text-ink px-1.5 font-bold">
            {firstAnswer(q.answer)}
          </span>
        </div>
      )}
    </div>
  );
}
