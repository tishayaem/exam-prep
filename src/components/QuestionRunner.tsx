import { useState } from 'react';
import { grade, type GradeResult } from '../lib/grading';
import type { Question } from '../data/types';

type Verdict = 'correct' | 'wrong' | null;

interface Props {
  question: Question;
  /** When false (e.g. Mock Test), hide the explanation panel — the parent
   *  drives the flow via onResolved + onNext. */
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
  nextLabel = 'Next ›',
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
    <div className="space-y-6">
      <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.025em] leading-tight">
        {question.prompt}
      </h2>

      <AnswerArea
        question={question}
        input={input}
        setInput={setInput}
        locked={locked}
        verdict={verdict}
        onChoice={handleChoice}
        onSubmit={submit}
      />

      {borderline && verdict === null && (
        <div className="border border-dashed border-neon-yellow rounded-2xl p-5 space-y-3 animate-feedback-in bg-neon-yellow/15">
          <p className="font-bold">Close! Were you right?</p>
          <p className="text-sm text-inkSoft">
            Expected answer: <em>{firstAnswer(question.answer)}</em>
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => finalise(true)}
              className="flex-1 bg-neon-green text-ink rounded-full px-5 py-3 font-bold hover:opacity-90"
            >
              Yes ✓
            </button>
            <button
              onClick={() => finalise(false)}
              className="flex-1 bg-neon-pink text-paper rounded-full px-5 py-3 font-bold hover:opacity-90"
            >
              No ✗
            </button>
          </div>
        </div>
      )}

      {verdict && showFeedback && (
        <FeedbackPanel
          verdict={verdict}
          answer={firstAnswer(question.answer)}
          explanation={question.explanation}
          onNext={onNext}
          nextLabel={nextLabel}
        />
      )}

      {verdict && !showFeedback && onNext && (
        <button
          onClick={onNext}
          className="bg-ink text-paper rounded-full px-6 py-4 font-bold text-base w-full hover:bg-neon-pink transition-colors"
        >
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
  verdict,
  onChoice,
  onSubmit,
}: {
  question: Question;
  input: string;
  setInput: (v: string) => void;
  locked: boolean;
  verdict: Verdict;
  onChoice: (c: string) => void;
  onSubmit: () => void;
}) {
  if (question.type === 'mcq' || question.type === 'truefalse') {
    const choices =
      question.choices ?? (question.type === 'truefalse' ? ['True', 'False'] : []);
    const canonical = firstAnswer(question.answer).trim().toLowerCase();
    return (
      <div className="grid gap-3">
        {choices.map((c) => {
          const isPicked = input === c;
          const isAnswer = c.trim().toLowerCase() === canonical;
          let cls =
            'bg-paper text-ink border-[1.5px] border-rule hover:border-ink';
          if (verdict) {
            if (isAnswer) cls = 'bg-neon-green text-ink border-[1.5px] border-neon-green';
            else if (isPicked) cls = 'bg-neon-pink text-paper border-[1.5px] border-neon-pink';
            else cls = 'bg-paper text-inkSoft border-[1.5px] border-rule';
          } else if (isPicked) {
            cls = 'bg-ink text-paper border-[1.5px] border-ink';
          }
          return (
            <button
              key={c}
              disabled={locked}
              onClick={() => onChoice(c)}
              className={`rounded-2xl px-5 py-4 text-left text-[17px] font-medium transition-colors ${cls}`}
            >
              {c}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex flex-col sm:flex-row gap-3"
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
        placeholder="Type your answer…"
        className={`flex-1 rounded-2xl px-5 py-4 text-lg font-medium outline-none border-[1.5px] disabled:bg-off ${
          locked ? 'border-rule text-inkSoft' : 'border-ink focus:border-neon-blue'
        }`}
      />
      {!locked && (
        <button
          type="submit"
          disabled={!input.trim()}
          className="bg-ink text-paper rounded-2xl px-7 py-4 font-bold disabled:opacity-30"
        >
          Check ›
        </button>
      )}
    </form>
  );
}

interface FeedbackPanelProps {
  verdict: Exclude<Verdict, null>;
  answer: string;
  explanation: string;
  /** Receives the mouse event so callers can position confetti at the click. */
  onNext?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  nextLabel: string;
}

/**
 * Coloured panel that follows a question. Same layout for embedded use (under
 * the question on phones) and for Quiz's right-column desktop layout.
 */
export function FeedbackPanel({
  verdict,
  answer,
  explanation,
  onNext,
  nextLabel,
}: FeedbackPanelProps) {
  const ok = verdict === 'correct';
  return (
    <div
      className={`rounded-[22px] p-6 sm:p-7 border-[1.5px] flex flex-col gap-4 animate-feedback-in ${
        ok
          ? 'border-neon-green bg-[#f1fff5]'
          : 'border-neon-pink bg-[#fff1f8]'
      }`}
    >
      <div>
        <div
          className={`text-[13px] font-bold uppercase tracking-[0.14em] ${
            ok ? 'text-[#048a3a]' : 'text-[#b30474]'
          }`}
        >
          {ok ? 'Correct' : 'Not quite'}
        </div>
        <div className="font-display text-2xl sm:text-[28px] font-bold tracking-[-0.022em] leading-tight mt-2">
          {ok ? (
            "That's it."
          ) : (
            <>
              The answer is{' '}
              <span className="bg-neon-yellow px-1.5 text-ink">{answer}</span>.
            </>
          )}
        </div>
        <p className="text-[15px] text-ink mt-3 leading-relaxed">{explanation}</p>
      </div>
      {onNext && (
        <button
          onClick={onNext}
          className="self-start bg-ink text-paper rounded-full px-6 py-3.5 font-bold hover:bg-neon-pink transition-colors"
        >
          {nextLabel}
        </button>
      )}
    </div>
  );
}

export function firstAnswer(a: string | string[]): string {
  return Array.isArray(a) ? a[0] : a;
}
