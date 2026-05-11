import { useState } from 'react';
import { grade, type GradeResult } from '../lib/grading';
import type { Question } from '../data/types';

type Verdict = 'correct' | 'wrong' | null;

interface Props {
  question: Question;
  /** When false (e.g. Mock Test), hide the explanation and "Next" button — the parent drives the flow. */
  showFeedback?: boolean;
  /** Called once a verdict is locked in (after self-grade if needed). */
  onResolved: (correct: boolean) => void;
  /** Optional "Next" button label (Quiz / Mistakes / Mock Test all vary). */
  nextLabel?: string;
  onNext?: () => void;
}

export function QuestionRunner({
  question,
  showFeedback = true,
  onResolved,
  nextLabel = 'Next →',
  onNext,
}: Props) {
  const [input, setInput] = useState('');
  const [verdict, setVerdict] = useState<Verdict>(null);
  const [borderline, setBorderline] = useState(false);

  const locked = verdict !== null || borderline;

  function submit() {
    if (locked) return;
    if (question.type === 'mcq' || question.type === 'truefalse') {
      handleChoice(input);
      return;
    }
    const result: GradeResult = grade(input, question.answer, question.acceptable);
    if (result === 'borderline') {
      setBorderline(true);
      return;
    }
    finalise(result === 'correct');
  }

  function handleChoice(choice: string) {
    setInput(choice);
    const canonical = firstAnswer(question.answer);
    finalise(choice.trim().toLowerCase() === canonical.trim().toLowerCase());
  }

  function finalise(correct: boolean) {
    setVerdict(correct ? 'correct' : 'wrong');
    setBorderline(false);
    onResolved(correct);
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold leading-snug">{question.prompt}</h2>

      <AnswerArea
        question={question}
        input={input}
        setInput={setInput}
        locked={locked}
        onChoice={handleChoice}
        onSubmit={submit}
      />

      {borderline && verdict === null && (
        <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 space-y-3">
          <p className="font-bold">Close! Were you right?</p>
          <p className="text-sm text-ink/70">
            Expected answer: <em>{firstAnswer(question.answer)}</em>
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

      {verdict && showFeedback && (
        <div className="space-y-3">
          <div
            className={`rounded-2xl p-4 ${
              verdict === 'correct'
                ? 'bg-emerald-50 border border-emerald-200'
                : 'bg-rose-50 border border-rose-200'
            }`}
          >
            <p className="font-bold mb-1">
              {verdict === 'correct' ? 'Correct! 🎉' : 'Not quite.'}
            </p>
            <p className="text-sm text-ink/70 mb-2">
              <strong>Answer:</strong> {firstAnswer(question.answer)}
            </p>
            <p className="text-sm">{question.explanation}</p>
          </div>
          {onNext && (
            <button onClick={onNext} className="tap bg-ink text-paper font-bold w-full text-lg">
              {nextLabel}
            </button>
          )}
        </div>
      )}

      {verdict && !showFeedback && onNext && (
        <button onClick={onNext} className="tap bg-ink text-paper font-bold w-full text-lg">
          {nextLabel}
        </button>
      )}
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
              input === c ? 'bg-accent text-white' : 'bg-ink/5 hover:bg-ink/10'
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

export function firstAnswer(a: string | string[]): string {
  return Array.isArray(a) ? a[0] : a;
}
