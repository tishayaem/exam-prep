import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { scienceQuestions, scienceSections } from '../data/science';
import { useProgress } from '../lib/storage';
import { QuestionRunner, firstAnswer } from '../components/QuestionRunner';
import { sample } from '../lib/shuffle';
import type { Question } from '../data/types';

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

  useEffect(() => {
    if (phase !== 'running') return;
    if (secondsLeft <= 0) {
      setPhase('review');
      return;
    }
    const id = window.setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(id);
  }, [phase, secondsLeft]);

  function start() {
    const picked = sample(scienceQuestions, TEST_QUESTIONS);
    setPaper(picked);
    setIndex(0);
    setAnswers([]);
    setSecondsLeft(TEST_MINUTES * 60);
    setPhase('running');
  }

  if (phase === 'pre') {
    return (
      <div className="card text-center space-y-4">
        <div className="text-5xl">📝</div>
        <h2 className="text-2xl font-bold">Mock Test</h2>
        <ul className="text-ink/70 text-left mx-auto inline-block space-y-1">
          <li>• {TEST_QUESTIONS} random questions from all sections</li>
          <li>• {TEST_MINUTES} minutes on the clock</li>
          <li>• No feedback until the end</li>
          <li>• You can’t go back to change answers</li>
        </ul>
        <button onClick={start} className="tap bg-accent text-white font-bold text-lg w-full mt-2">
          Start the test →
        </button>
      </div>
    );
  }

  if (phase === 'review') {
    const correct = answers.filter((a) => a.correct).length;
    const byTopic = breakdownByTopic(paper, answers);

    return (
      <div className="space-y-5">
        <div className="card text-center space-y-2">
          <h2 className="text-2xl font-bold">Test complete</h2>
          <p className="text-5xl font-bold tabular-nums">
            {correct} / {paper.length}
          </p>
          <p className="text-ink/60">
            ({Math.round((correct / paper.length) * 100)}% correct)
          </p>
        </div>

        <div className="card">
          <h3 className="font-bold mb-3">By topic</h3>
          <ul className="space-y-2">
            {byTopic.map((row) => (
              <li key={row.title} className="flex items-center justify-between gap-3">
                <span className="truncate text-sm">{row.title}</span>
                <span
                  className={`text-sm font-bold tabular-nums ${
                    row.correct === row.total
                      ? 'text-emerald-600'
                      : row.correct === 0
                        ? 'text-rose-600'
                        : 'text-ink'
                  }`}
                >
                  {row.correct}/{row.total}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h3 className="font-bold mb-3">Review answers</h3>
          <ul className="space-y-3">
            {paper.map((q, i) => {
              const a = answers.find((x) => x.questionId === q.id);
              return (
                <li
                  key={q.id}
                  className={`rounded-2xl p-3 border ${
                    a?.correct
                      ? 'bg-emerald-50 border-emerald-200'
                      : 'bg-rose-50 border-rose-200'
                  }`}
                >
                  <p className="text-sm font-bold">
                    {i + 1}. {q.prompt}
                  </p>
                  <p className="text-sm text-ink/70 mt-1">
                    Answer: <em>{firstAnswer(q.answer)}</em>
                  </p>
                  <p className="text-sm mt-1">{q.explanation}</p>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex gap-3">
          <button onClick={start} className="tap bg-accent text-white font-bold flex-1">
            New test
          </button>
          <Link to="/" className="tap bg-ink/5 font-bold flex-1 text-center">
            Home
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
    <div className="space-y-5">
      <div className="flex items-center justify-between px-1">
        <span className="text-sm text-ink/60 tabular-nums">
          Q{index + 1} / {paper.length}
        </span>
        <span
          className={`text-sm font-bold tabular-nums ${lowTime ? 'text-rose-600' : 'text-ink'}`}
        >
          ⏱ {minutes}:{seconds.toString().padStart(2, '0')}
        </span>
      </div>

      <ProgressBar value={index} max={paper.length} />

      <div className="card">
        <QuestionRunner
          key={q.id}
          question={q}
          showFeedback={false}
          onResolved={(correct) => {
            setAnswers((arr) => [...arr, { questionId: q.id, correct }]);
            recordAttempt(q.id, correct, q.difficulty);
          }}
          onNext={() => setIndex((i) => i + 1)}
          nextLabel={index + 1 < paper.length ? 'Next →' : 'Finish test'}
        />
      </div>
    </div>
  );
}

function breakdownByTopic(paper: Question[], answers: AnswerLog[]) {
  const byId = new Map<string, { title: string; total: number; correct: number }>();
  for (const q of paper) {
    const section = scienceSections.find((s) => s.id === q.sectionId);
    const title = section?.title ?? q.sectionId;
    const row = byId.get(q.sectionId) ?? { title, total: 0, correct: 0 };
    row.total += 1;
    const a = answers.find((x) => x.questionId === q.id);
    if (a?.correct) row.correct += 1;
    byId.set(q.sectionId, row);
  }
  return [...byId.values()].sort((a, b) => a.title.localeCompare(b.title));
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
