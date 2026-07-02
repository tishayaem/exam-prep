import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  writingPrompts,
  KIND_LABEL,
  PLAN_BEATS,
  CHECK_STEPS,
  RUBRIC,
} from '../data/writingPrompts';
import type { WritingPrompt, RubricGroup } from '../data/writingPrompts';
import { shuffle } from '../lib/shuffle';
import { confettiBurst } from '../lib/confetti';

/**
 * The exam writing task can't be auto-marked, so this mode runs the SESSION
 * rather than the story: a prompt, the three timed phases of a real paper
 * (plan 5 min → write 20 min → check 5 min), then a self-mark rubric to walk
 * through with a grown-up. The story itself happens on real paper — same as
 * the exam.
 */
type Phase = 'pick' | 'plan' | 'write' | 'check' | 'review';

const PHASE_SECONDS: Record<'plan' | 'write' | 'check', number> = {
  plan: 5 * 60,
  write: 20 * 60,
  check: 5 * 60,
};

const NEXT_PHASE: Record<'plan' | 'write' | 'check', Phase> = {
  plan: 'write',
  write: 'check',
  check: 'review',
};

const fmt = (s: number) =>
  `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

export function WritingPractice() {
  const [deck, setDeck] = useState<WritingPrompt[]>(() => shuffle(writingPrompts));
  const [deckIndex, setDeckIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('pick');
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [ticked, setTicked] = useState<Set<string>>(new Set());

  const prompt = deck[deckIndex % deck.length];
  const timed = phase === 'plan' || phase === 'write' || phase === 'check';

  // The phase deadline as a wall-clock timestamp. Phases run for many minutes
  // while the child writes on PAPER — the iPad will lock or throttle JS, so a
  // decrementing setTimeout chain (the NumberSprint pattern) would silently
  // stall. Recomputing remaining time from the deadline means the clock is
  // honest the moment the screen wakes, and a phase whose deadline passed
  // while asleep advances immediately.
  const endAtRef = useRef(0);

  useEffect(() => {
    if (!timed) return;
    const tick = () =>
      setSecondsLeft(Math.max(0, Math.ceil((endAtRef.current - Date.now()) / 1000)));
    tick();
    const id = window.setInterval(tick, 500);
    return () => window.clearInterval(id);
  }, [timed, phase]);

  // Auto-advance when the clock hits zero.
  useEffect(() => {
    if (timed && secondsLeft <= 0) advance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timed, secondsLeft]);

  function enter(next: Phase) {
    if (next === 'plan' || next === 'write' || next === 'check') {
      endAtRef.current = Date.now() + PHASE_SECONDS[next] * 1000;
      setSecondsLeft(PHASE_SECONDS[next]);
    }
    if (next === 'review') {
      // The story is written and checked — that deserves a shower.
      confettiBurst(window.innerWidth / 2, window.innerHeight / 3);
    }
    setPhase(next);
  }

  function advance() {
    if (phase === 'plan' || phase === 'write' || phase === 'check') {
      enter(NEXT_PHASE[phase]);
    }
  }

  function anotherPrompt() {
    const next = deckIndex + 1;
    // Reshuffle each time the deck wraps so repeats arrive in a fresh order.
    if (next % deck.length === 0) setDeck(shuffle(writingPrompts));
    setDeckIndex(next);
  }

  function restart() {
    anotherPrompt();
    setTicked(new Set());
    setPhase('pick');
  }

  if (phase === 'pick') {
    return (
      <div className="space-y-9">
        <header>
          <div className="text-[13px] font-bold text-neon-pink uppercase tracking-[0.16em] mb-3">
            Practice · Pen and paper
          </div>
          <h1 className="font-display text-[clamp(2.25rem,6.4vw,4.75rem)] font-bold tracking-[-0.04em] leading-[0.95] m-0">
            Writing{' '}
            <span className="relative inline-block">
              practice.
              <span
                aria-hidden
                className="absolute left-[-2%] right-[-2%] bottom-[8%] h-[18%] bg-neon-yellow -z-10 -skew-x-6"
              />
            </span>
          </h1>
          <p className="text-[15px] text-inkSoft mt-4 max-w-xl leading-relaxed">
            Exactly like the real paper: <strong className="text-ink">5 minutes to plan</strong>,{' '}
            <strong className="text-ink">20 to write</strong>,{' '}
            <strong className="text-ink">5 to check</strong> — half an hour, one story. Grab paper
            and a pen; the app is your prompt and your clock.
          </p>
        </header>

        <PromptCard prompt={prompt} />

        <div className="flex flex-wrap gap-3">
          <button
            onClick={anotherPrompt}
            className="bg-paper text-ink border-[1.5px] border-ink rounded-full px-6 py-4 font-semibold text-[15px] hover:bg-off transition-colors"
          >
            Another prompt ↻
          </button>
          <button
            onClick={() => enter('plan')}
            className="bg-ink text-paper rounded-full px-7 py-4 font-bold text-[15px] hover:bg-neon-pink transition-colors"
          >
            Start the clock ›
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'plan') {
    return (
      <div className="space-y-6">
        <TimerHeader label="Plan · 5 minutes" secondsLeft={secondsLeft} total={PHASE_SECONDS.plan} />
        <PromptCard prompt={prompt} compact />
        <p className="text-[15px] text-inkSoft leading-relaxed">
          One line per beat, on your paper. Decide the <strong className="text-ink">ending</strong>{' '}
          now — endings invented in the last minute read like it. And plan{' '}
          <strong className="text-ink">small</strong>: top stories spend all their words on about{' '}
          <strong className="text-ink">three minutes of action</strong>, described through a
          magnifying glass — not a whole adventure at a sprint.
        </p>
        <ol className="space-y-3">
          {PLAN_BEATS.map((b, i) => (
            <li
              key={b.beat}
              className="rounded-[22px] border border-rule bg-off p-4 sm:p-5 flex gap-4 items-baseline"
            >
              <span className="text-sm font-bold text-inkSoft tabular-nums shrink-0">{i + 1}</span>
              <div>
                <div className="font-display text-lg font-bold tracking-[-0.02em]">{b.beat}</div>
                <div className="text-[14px] text-inkSoft leading-snug mt-0.5">{b.hint}</div>
              </div>
            </li>
          ))}
        </ol>
        <button
          onClick={advance}
          className="bg-ink text-paper rounded-full px-7 py-4 font-bold text-[15px] hover:bg-neon-pink transition-colors"
        >
          I have a plan — start writing ›
        </button>
      </div>
    );
  }

  if (phase === 'write') {
    return (
      <div className="space-y-6">
        <TimerHeader
          label="Write · 20 minutes"
          secondsLeft={secondsLeft}
          total={PHASE_SECONDS.write}
        />
        <PromptCard prompt={prompt} compact />
        <div className="rounded-[22px] border border-rule bg-off p-5 sm:p-6 space-y-2 text-[14px] text-inkSoft leading-relaxed">
          <p>
            <strong className="text-ink">Write on your paper, not in your head.</strong> Stuck?
            Glance at your plan — the next beat tells you what happens.
          </p>
          <p>
            <strong className="text-ink">Ti-To-P-P:</strong> new paragraph when the Time, Topic,
            Person or Place changes. One single-line paragraph is allowed — save it for a moment
            that deserves the spotlight.
          </p>
          <p>
            Spend a simile somewhere deliberate; let a short sentence land after a long one. Show
            the feeling through what your character does — two feelings at once is real life. And
            keep your tense steady — past stays past.
          </p>
        </div>
        <button
          onClick={advance}
          className="bg-ink text-paper rounded-full px-7 py-4 font-bold text-[15px] hover:bg-neon-pink transition-colors"
        >
          Finished writing ›
        </button>
      </div>
    );
  }

  if (phase === 'check') {
    return (
      <div className="space-y-6">
        <TimerHeader label="Check · 5 minutes" secondsLeft={secondsLeft} total={PHASE_SECONDS.check} />
        <p className="text-[15px] text-inkSoft leading-relaxed">
          The polish marks are the easiest marks on the paper. In this order:
        </p>
        <ol className="space-y-3">
          {CHECK_STEPS.map((step, i) => (
            <li
              key={step}
              className="rounded-[22px] border border-rule bg-off p-4 sm:p-5 flex gap-4 items-baseline"
            >
              <span className="text-sm font-bold text-inkSoft tabular-nums shrink-0">{i + 1}</span>
              <span className="text-[15px] leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
        <button
          onClick={advance}
          className="bg-ink text-paper rounded-full px-7 py-4 font-bold text-[15px] hover:bg-neon-pink transition-colors"
        >
          Done checking ›
        </button>
      </div>
    );
  }

  // review — the five headings are the CSSE mark-scheme domains (the best
  // published proxy for what Brighton's markers score).
  const groups: RubricGroup[] = ['Ideas', 'Vocabulary', 'Grammar', 'Structure', 'Punctuation'];
  const toggle = (id: string) =>
    setTicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="space-y-8">
      <header>
        <div className="text-[13px] font-bold text-neon-pink uppercase tracking-[0.16em] mb-3">
          Story written · Now mark it like a marker
        </div>
        <h1 className="font-display text-[clamp(2rem,5.5vw,3.5rem)] font-bold tracking-[-0.035em] leading-[0.98] m-0">
          Read it aloud to a grown-up, then tick together.
        </h1>
        <p className="text-[15px] text-inkSoft mt-3 max-w-xl leading-relaxed">
          These five headings are the same ones real 11+ markers score. Be honest — an unticked
          box isn't a fail, it's the plan for next time.{' '}
          <strong className="text-ink tabular-nums">
            {ticked.size}/{RUBRIC.length}
          </strong>{' '}
          ticked.
        </p>
      </header>

      <div className="space-y-6">
        {groups.map((group) => (
          <section key={group}>
            <div className="text-[12px] font-bold uppercase tracking-[0.14em] text-inkSoft pb-2 border-b border-rule mb-3">
              {group}
            </div>
            <div className="space-y-2.5">
              {RUBRIC.filter((r) => r.group === group).map((r) => {
                const on = ticked.has(r.id);
                return (
                  <button
                    key={r.id}
                    onClick={() => toggle(r.id)}
                    aria-pressed={on}
                    className={`w-full text-left rounded-[22px] border-[1.5px] p-4 sm:p-5 flex gap-4 items-center transition-colors ${
                      on ? 'border-ink bg-neon-green/25' : 'border-rule bg-off hover:border-ink'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-full grid place-items-center text-[15px] font-bold shrink-0 border-[1.5px] ${
                        on ? 'bg-neon-green border-ink text-ink' : 'border-rule text-inkSoft'
                      }`}
                    >
                      {on ? '✓' : ''}
                    </span>
                    <span className="text-[15px] leading-snug">{r.label}</span>
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={restart}
          className="bg-ink text-paper rounded-full px-7 py-4 font-bold text-[15px] hover:bg-neon-pink transition-colors"
        >
          Another prompt ›
        </button>
        <Link
          to="/"
          viewTransition
          className="bg-paper text-ink border-[1.5px] border-ink rounded-full px-6 py-4 font-semibold text-[15px] hover:bg-off transition-colors"
        >
          Home
        </Link>
      </div>
    </div>
  );
}

function PromptCard({ prompt, compact = false }: { prompt: WritingPrompt; compact?: boolean }) {
  return (
    <div className={`bg-ink text-paper rounded-[28px] ${compact ? 'p-5 sm:p-6' : 'p-7 sm:p-9'}`}>
      <div className="text-[11px] font-bold text-neon-yellow uppercase tracking-[0.14em]">
        {KIND_LABEL[prompt.kind]}
      </div>
      <div
        className={`font-display font-bold tracking-[-0.025em] leading-tight mt-2 ${
          compact ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-[34px]'
        }`}
      >
        {prompt.text}
      </div>
      {!compact && (
        <div className="text-[14px] text-[#A8A8B0] mt-3 leading-snug max-w-xl">{prompt.nudge}</div>
      )}
    </div>
  );
}

function TimerHeader({
  label,
  secondsLeft,
  total,
}: {
  label: string;
  secondsLeft: number;
  total: number;
}) {
  const lowTime = secondsLeft <= 60;
  const midTime = secondsLeft <= 300 && total > 300;
  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between">
        <div className="text-[13px] font-bold text-neon-pink uppercase tracking-[0.16em]">
          {label}
        </div>
        <div
          key={lowTime ? 'low' : midTime ? 'mid' : 'normal'}
          className={`font-display text-3xl sm:text-4xl font-bold tabular-nums tracking-[-0.02em] ${
            lowTime
              ? 'text-neon-pink animate-emphasis-pop'
              : midTime
                ? 'text-[#b38b00]'
                : 'text-ink'
          }`}
        >
          {fmt(secondsLeft)}
        </div>
      </div>
      <div className="h-1.5 bg-off rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full progress-fill ${
            lowTime ? 'bg-neon-pink' : midTime ? 'bg-neon-yellow' : 'bg-neon-green'
          }`}
          style={{ width: `${(secondsLeft / total) * 100}%` }}
        />
      </div>
    </div>
  );
}
