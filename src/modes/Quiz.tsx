import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { findSection } from '../data/science';
import { grade, type GradeResult } from '../lib/grading';
import { useProgress } from '../lib/storage';
import type { Question } from '../data/types';

type Verdict = 'correct' | 'wrong' | null;

export function Quiz() {
  const { sectionId } = useParams();
  const section = sectionId ? findSection(sectionId) : undefined;
  const { recordAttempt } = useProgress();

  const order = useMemo(() => {
    if (!section) return [];
    return [...section.questions].sort(() => Math.random() - 0.5);
  }, [section]);

  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [verdict, setVerdict] = useState<Verdict>(null);
  const [borderline, setBorderline] = useState(false);
  const [score, setScore] = useState(0);

  if (!section) return <div className="card">Section not found.</div>;

  const total = order.length;
  if (index >= total) {
    return (
      <div className="card text-center space-y-4">
        <h2 className="text-2xl font-bold">Done! 🎉</h2>
        <p className="text-ink/70">
          You got <strong>{score}</strong> out of <strong>{total}</strong>.
        </p>
        <div className="flex gap-3 justify-center pt-2">
          <Link to={`/quiz/${section.id}`} className="tap bg-accent text-white font-bold" reloadDocument>
            Try again
          </Link>
          <Link to="/" viewTransition className="tap bg-ink/5 font-bold">
            Home
          </Link>
        </div>
      </div>
    );
  }

  const q = order[index];

  function submit() {
    if (verdict !== null) return;
    if (q.type === 'mcq' || q.type === 'truefalse') {
      handleChoice(input);
      return;
    }
    const result: GradeResult = grade(input, q.answer, q.acceptable);
    if (result === 'borderline') {
      setBorderline(true);
      return;
    }
    finalise(result === 'correct');
  }

  function handleChoice(choice: string) {
    setInput(choice);
    const canonical = Array.isArray(q.answer) ? q.answer[0] : q.answer;
    finalise(normalise(choice) === normalise(canonical));
  }

  function finalise(correct: boolean) {
    setVerdict(correct ? 'correct' : 'wrong');
    setBorderline(false);
    setScore((s) => s + (correct ? 1 : 0));
    recordAttempt(q.id, correct, q.difficulty);
  }

  function next() {
    setIndex((i) => i + 1);
    setInput('');
    setVerdict(null);
    setBorderline(false);
  }

  return (
    <div className="space-y-5">
      <ProgressBar value={index} max={total} />

      <div className="card space-y-4">
        <p className="text-xs uppercase tracking-wide text-ink/50">
          {section.title} · Question {index + 1} of {total}
        </p>

        <h2 className="text-xl font-bold leading-snug">{q.prompt}</h2>

        <AnswerArea
          question={q}
          input={input}
          setInput={setInput}
          locked={verdict !== null || borderline}
          onChoice={handleChoice}
          onSubmit={submit}
        />

        {borderline && verdict === null && (
          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 space-y-3 animate-feedback-in">
            <p className="font-bold">Close! Were you right?</p>
            <p className="text-sm text-ink/70">
              Expected answer: <em>{firstAnswer(q.answer)}</em>
            </p>
            <div className="flex gap-3">
              <button onClick={() => finalise(true)} className="tap bg-emerald-500 text-white font-bold flex-1">
                Yes ✓
              </button>
              <button onClick={() => finalise(false)} className="tap bg-rose-400 text-white font-bold flex-1">
                No ✗
              </button>
            </div>
          </div>
        )}

        {verdict && (
          <div className="space-y-3 animate-feedback-in">
            <div
              className={`rounded-2xl p-4 ${
                verdict === 'correct'
                  ? 'bg-emerald-50 border border-emerald-200 animate-emphasis-pop'
                  : 'bg-rose-50 border border-rose-200'
              }`}
            >
              <p className="font-bold mb-1">
                {verdict === 'correct' ? 'Correct! 🎉' : 'Not quite.'}
              </p>
              <p className="text-sm text-ink/70 mb-2">
                <strong>Answer:</strong> {firstAnswer(q.answer)}
              </p>
              <p className="text-sm">{q.explanation}</p>
            </div>
            <button
              onClick={next}
              className="tap bg-ink text-paper font-bold w-full text-lg"
            >
              {index + 1 < total ? 'Next →' : 'Finish'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function AnswerArea({
  question,
  input,
  setInput,
  locked,
  onChoice,
  onSubmit,
}: {
  question: Question;
  input: string;
  setInput: (v: string) => void;
  locked: boolean;
  onChoice: (c: string) => void;
  onSubmit: () => void;
}) {
  if (question.type === 'mcq' || question.type === 'truefalse') {
    const choices =
      question.choices ?? (question.type === 'truefalse' ? ['True', 'False'] : []);
    return (
      <div className="grid gap-2">
        {choices.map((c) => (
          <button
            key={c}
            disabled={locked}
            onClick={() => onChoice(c)}
            className={`tap text-left font-medium ${
              input === c
                ? 'bg-accent text-white'
                : 'bg-ink/5 hover:bg-ink/10'
            } ${locked && input !== c ? 'opacity-50' : ''}`}
          >
            {c}
          </button>
        ))}
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-3"
    >
      <input
        type="text"
        autoFocus
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        disabled={locked}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full rounded-2xl border border-ink/15 bg-paper px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
        placeholder="Type your answer…"
      />
      {!locked && (
        <button
          type="submit"
          disabled={!input.trim()}
          className="tap bg-accent text-white font-bold w-full text-lg disabled:opacity-30"
        >
          Check
        </button>
      )}
    </form>
  );
}

function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = max === 0 ? 0 : (value / max) * 100;
  return (
    <div className="h-2 bg-ink/10 rounded-full overflow-hidden">
      <div className="h-full bg-accent progress-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}

function firstAnswer(a: string | string[]): string {
  return Array.isArray(a) ? a[0] : a;
}

function normalise(s: string): string {
  return s.trim().toLowerCase();
}
