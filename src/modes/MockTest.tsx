import { useEffect, useState } from 'react';
import { Link, useBlocker } from 'react-router-dom';
import { allSections, questionsBySubject } from '../data';
import { SUBJECTS } from '../data/packs';
import { useProgress } from '../lib/storage';
import { QuestionRunner, formatAnswer } from '../components/QuestionRunner';
import { sample } from '../lib/shuffle';
import type { Question, Subject } from '../data/types';

const TEST_QUESTIONS = 20;
const TEST_MINUTES = 15;

type Phase = 'pre' | 'running' | 'review';

interface AnswerLog {
  questionId: string;
  correct: boolean;
}

export function MockTest() {
  const { recordAttempt } = useProgress();
  const [phase, setPhase] = useState<Phase>('pre');
  const [paper, setPaper] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerLog[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(TEST_MINUTES * 60);
  const [subject, setSubject] = useState<Subject | null>(null);

  useEffect(() => {
    if (phase !== 'running') return;
    if (secondsLeft <= 0) {
      setPhase('review');
      return;
    }
    const id = window.setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(id);
  }, [phase, secondsLeft]);

  // Only block once she's actually invested an answer — losing a freshly
  // started, untouched run isn't worth the warning friction. Per-question
  // attempts are already saved by `recordAttempt`; what gets lost on quit is
  // the review screen (score, topic breakdown), not the underlying progress.
  const inProgress = phase === 'running' && answers.length > 0;

  // Intercept in-app navigation (← Home button, browser back, any <Link>).
  // beforeunload only catches tab close / refresh, so we need both.
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      inProgress && currentLocation.pathname !== nextLocation.pathname,
  );

  useEffect(() => {
    if (!inProgress) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      // Some older Chromium needs returnValue set; modern browsers ignore the
      // string but show a generic "Leave site?" prompt as long as preventDefault
      // ran during the event.
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [inProgress]);

  // If the timer expires while the quit modal is open, drop the block so she
  // can see her result instead of being stuck on the prompt.
  useEffect(() => {
    if (blocker.state === 'blocked' && !inProgress) {
      blocker.reset?.();
    }
  }, [blocker, inProgress]);

  function start(subj: Subject) {
    const picked = sample(questionsBySubject(subj), TEST_QUESTIONS);
    setSubject(subj);
    setPaper(picked);
    setIndex(0);
    setAnswers([]);
    setSecondsLeft(TEST_MINUTES * 60);
    setPhase('running');
  }

  if (phase === 'pre') {
    return (
      <div className="space-y-9">
        <header>
          <div className="text-[13px] font-bold text-neon-pink uppercase tracking-[0.16em] mb-3">
            Practice · Under exam conditions
          </div>
          <h1 className="font-display text-[clamp(2.25rem,6.4vw,4.75rem)] font-bold tracking-[-0.04em] leading-[0.95] m-0">
            Mock{' '}
            <span className="relative inline-block">
              Test.
              <span
                aria-hidden
                className="absolute left-[-2%] right-[-2%] bottom-[8%] h-[18%] bg-neon-green -z-10 -skew-x-6"
              />
            </span>
          </h1>
          <p className="text-[15px] text-inkSoft mt-4 max-w-xl leading-relaxed">
            Like the real thing — pick a subject, then random questions, a clock,
            and no feedback until the end.
          </p>
        </header>

        <div className="grid gap-3.5 sm:grid-cols-2">
          <RuleCard label="Questions" value={String(TEST_QUESTIONS)} sub="random from one subject" color="bg-neon-green" />
          <RuleCard label="Time limit" value={`${TEST_MINUTES} min`} sub="clock starts on tap" color="bg-neon-yellow" />
          <RuleCard label="Feedback" value="At the end" sub="not after each question" color="bg-neon-blue" />
          <RuleCard label="Going back" value="Locked" sub="can't change earlier answers" color="bg-neon-pink" />
        </div>

        <SubjectChooser onPick={start} />
      </div>
    );
  }

  if (phase === 'review') {
    const correct = answers.filter((a) => a.correct).length;
    const pct = Math.round((correct / paper.length) * 100);
    const byTopic = breakdownByTopic(paper, answers);
    const tagline = pct === 100
      ? { text: 'Top of the class.', bg: 'bg-neon-green text-ink' }
      : pct >= 80
        ? { text: "One more pass and it's locked in.", bg: 'bg-neon-yellow text-ink' }
        : pct >= 50
          ? { text: 'Solid go — review the misses.', bg: 'bg-neon-blue text-paper' }
          : { text: 'Take it back to Study and try again.', bg: 'bg-neon-pink text-paper' };

    return (
      <div className="space-y-10 pb-8">
        <header className="text-center max-w-[760px] mx-auto">
          <div className="text-[13px] font-bold text-neon-pink uppercase tracking-[0.16em] mb-3.5">
            Test complete
          </div>
          <div className="font-display text-[clamp(4rem,18vw,6rem)] font-bold tracking-[-0.045em] leading-[0.95]">
            {correct}
            <span className="text-inkSoft">/{paper.length}</span>
          </div>
          <div className="font-display text-[20px] sm:text-[22px] font-semibold mt-3.5">
            {pct}% correct ·{' '}
            <span className={`${tagline.bg} px-2`}>{tagline.text}</span>
          </div>
        </header>

        <section>
          <div className="flex items-end justify-between pb-3.5 border-b border-rule mb-5">
            <div className="flex items-baseline gap-3 sm:gap-[18px]">
              <span className="text-[13px] font-bold text-inkSoft tabular-nums">
                01
              </span>
              <h2 className="m-0 font-display text-2xl sm:text-[28px] font-bold tracking-[-0.022em]">
                By topic
              </h2>
            </div>
          </div>
          <div className="grid gap-2">
            {byTopic.map((row) => {
              const allRight = row.correct === row.total;
              const allWrong = row.correct === 0;
              const tone = allRight
                ? 'text-neon-green'
                : allWrong
                  ? 'text-neon-pink'
                  : 'text-ink';
              return (
                <div
                  key={row.title}
                  className="flex items-center justify-between gap-3 py-2.5 border-b border-rule last:border-b-0"
                >
                  <span className="truncate text-[15px]">{row.title}</span>
                  <span className={`text-[15px] font-bold tabular-nums shrink-0 ${tone}`}>
                    {row.correct}/{row.total}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <div className="flex items-end justify-between pb-3.5 border-b border-rule mb-5">
            <div className="flex items-baseline gap-3 sm:gap-[18px]">
              <span className="text-[13px] font-bold text-inkSoft tabular-nums">
                02
              </span>
              <h2 className="m-0 font-display text-2xl sm:text-[28px] font-bold tracking-[-0.022em]">
                Review answers
              </h2>
            </div>
          </div>
          <ul className="grid gap-3">
            {paper.map((q, i) => {
              const a = answers.find((x) => x.questionId === q.id);
              const ok = a?.correct;
              return (
                <li
                  key={q.id}
                  className={`rounded-[22px] p-5 border-[1.5px] ${
                    ok
                      ? 'border-neon-green bg-[#f1fff5]'
                      : 'border-neon-pink bg-[#fff1f8]'
                  }`}
                >
                  <p className="text-[15px] font-semibold leading-snug">
                    <span className="text-inkSoft tabular-nums mr-2">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {q.prompt}
                  </p>
                  <p className="text-[13px] mt-2.5">
                    Answer:{' '}
                    <span className="bg-neon-yellow px-1.5 font-semibold">
                      {formatAnswer(q)}
                    </span>
                  </p>
                  <p className="text-[13px] text-ink mt-2 leading-relaxed">
                    {q.explanation}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>

        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => start(subject ?? SUBJECTS[0].id)}
            className="bg-paper text-ink border-[1.5px] border-ink rounded-full px-6 py-3.5 font-semibold"
          >
            New test
          </button>
          <Link
            to="/mistakes"
            viewTransition
            className="bg-ink text-paper rounded-full px-6 py-3.5 font-semibold"
          >
            Review mistakes ›
          </Link>
        </div>
      </div>
    );
  }

  if (index >= paper.length) {
    setPhase('review');
    return null;
  }

  const q = paper[index];
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const lowTime = secondsLeft <= 60;

  return (
    <div className="space-y-7">
      <div className="flex items-baseline justify-between">
        <div className="text-[13px] font-bold text-neon-pink uppercase tracking-[0.16em]">
          Question {index + 1}{' '}
          <span className="text-inkSoft">/ {paper.length}</span>
        </div>
        <div
          key={lowTime ? 'low' : 'normal'}
          className={`text-[13px] font-bold tabular-nums inline-block ${
            lowTime ? 'text-neon-pink animate-emphasis-pop' : 'text-ink'
          }`}
        >
          ⏱ {minutes}:{seconds.toString().padStart(2, '0')}
        </div>
      </div>

      <DotProgress current={index} total={paper.length} />

      <QuestionRunner
        key={q.id}
        question={q}
        showFeedback={false}
        onResolved={(correct, chosen) => {
          setAnswers((arr) => [...arr, { questionId: q.id, correct }]);
          recordAttempt(q.id, correct, q.difficulty, chosen);
        }}
        onNext={() => setIndex((i) => i + 1)}
        nextLabel={index + 1 < paper.length ? 'Next ›' : 'Finish test ›'}
      />

      {blocker.state === 'blocked' && (
        <QuitConfirm
          answered={answers.length}
          total={paper.length}
          onKeepGoing={() => blocker.reset?.()}
          onQuit={() => blocker.proceed?.()}
        />
      )}
    </div>
  );
}

function QuitConfirm({
  answered,
  total,
  onKeepGoing,
  onQuit,
}: {
  answered: number;
  total: number;
  onKeepGoing: () => void;
  onQuit: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quit-confirm-title"
      className="fixed inset-0 z-50 bg-ink/60 flex items-center justify-center p-5 animate-feedback-in"
    >
      <div className="bg-paper rounded-[28px] max-w-[460px] w-full p-7 sm:p-8 space-y-5 border-[1.5px] border-ink">
        <div>
          <div className="text-[12px] font-bold text-neon-pink uppercase tracking-[0.14em]">
            Quit the test?
          </div>
          <h2
            id="quit-confirm-title"
            className="font-display text-2xl sm:text-[28px] font-bold tracking-[-0.022em] mt-2 leading-tight"
          >
            You've answered {answered} of {total}.
          </h2>
          <p className="text-[14px] text-ink mt-3 leading-relaxed">
            If you quit now, you won't see your test result. Your answers are
            still saved either way.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            autoFocus
            onClick={onKeepGoing}
            className="flex-1 bg-ink text-paper rounded-full px-6 py-4 font-bold text-[16px] hover:bg-neon-pink transition-colors"
          >
            Keep going
          </button>
          <button
            type="button"
            onClick={onQuit}
            className="flex-1 bg-paper text-inkSoft border-[1.5px] border-rule rounded-full px-6 py-4 font-bold text-[16px] hover:border-ink hover:text-ink transition-colors"
          >
            Quit anyway
          </button>
        </div>
      </div>
    </div>
  );
}

const SUBJECT_BTN = [
  'bg-neon-green text-ink',
  'bg-neon-yellow text-ink',
  'bg-neon-blue text-paper',
];

function SubjectChooser({ onPick }: { onPick: (s: Subject) => void }) {
  // Only offer subjects that actually have questions, so an un-authored subject
  // never produces an empty paper.
  const available = SUBJECTS.filter((s) => questionsBySubject(s.id).length > 0);
  return (
    <div className="bg-ink text-paper rounded-[28px] p-7 sm:p-9 space-y-5">
      <div>
        <div className="text-[12px] font-bold text-neon-green uppercase tracking-[0.14em]">
          Choose a subject
        </div>
        <div className="font-display text-2xl sm:text-[32px] font-bold tracking-[-0.025em] mt-2 leading-tight">
          Which paper today?
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {available.map((s, i) => {
          const count = Math.min(questionsBySubject(s.id).length, TEST_QUESTIONS);
          return (
            <button
              key={s.id}
              onClick={() => onPick(s.id)}
              className={`${SUBJECT_BTN[i % SUBJECT_BTN.length]} rounded-2xl px-6 py-5 text-left hover:opacity-90 transition-opacity`}
            >
              <div className="font-display text-xl sm:text-2xl font-bold tracking-tight">
                {s.title}
              </div>
              <div className="text-[12px] font-semibold opacity-70 mt-1">
                {count} questions · go ›
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RuleCard({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: string;
  sub: string;
  color: string;
}) {
  return (
    <div className="border border-rule rounded-[22px] p-5 sm:p-6">
      <div className="flex items-center gap-2.5">
        <span className={`block w-2.5 h-2.5 rounded-full ${color}`} />
        <span className="text-[11px] font-bold text-inkSoft uppercase tracking-[0.14em]">
          {label}
        </span>
      </div>
      <div className="font-display text-2xl sm:text-[28px] font-bold tracking-[-0.022em] mt-2 leading-tight">
        {value}
      </div>
      <div className="text-[13px] text-inkSoft mt-1">{sub}</div>
    </div>
  );
}

function DotProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: total }).map((_, i) => {
        const cls =
          i < current ? 'bg-neon-green' : i === current ? 'bg-ink' : 'bg-rule';
        return <div key={i} className={`flex-1 h-1.5 ${cls} rounded-full`} />;
      })}
    </div>
  );
}

function breakdownByTopic(paper: Question[], answers: AnswerLog[]) {
  const byId = new Map<string, { title: string; total: number; correct: number }>();
  for (const q of paper) {
    const section = allSections.find((s) => s.id === q.sectionId);
    const title = section?.title ?? q.sectionId;
    const row = byId.get(q.sectionId) ?? { title, total: 0, correct: 0 };
    row.total += 1;
    const a = answers.find((x) => x.questionId === q.id);
    if (a?.correct) row.correct += 1;
    byId.set(q.sectionId, row);
  }
  return [...byId.values()].sort((a, b) => a.title.localeCompare(b.title));
}
