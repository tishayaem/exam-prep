import { useState } from 'react';
import {
  grade,
  gradeMatch,
  gradeNumeric,
  gradeSequence,
  type GradeResult,
} from '../lib/grading';
import type { Question } from '../data/types';
import { MatchAnswer } from './MatchAnswer';
import { SequenceAnswer } from './SequenceAnswer';
import { NvrAnswer } from './NvrAnswer';

type Verdict = 'correct' | 'wrong' | null;

interface Props {
  question: Question;
  /** When false (e.g. Mock Test), hide the explanation panel — the parent
   *  drives the flow via onResolved + onNext. */
  showFeedback?: boolean;
  /**
   * Called once a verdict is locked in (after self-grade if needed). `chosen`
   * is a pre-formatted human-readable string of what the user picked or typed,
   * suitable for the Mistakes "You said X" chip. Undefined when not applicable.
   */
  onResolved: (correct: boolean, chosen?: string) => void;
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
  const [userPairs, setUserPairs] = useState<Record<string, string>>({});
  const [userOrder, setUserOrder] = useState<string[]>([]);
  const [pickedIndex, setPickedIndex] = useState<number | null>(null);
  const [verdict, setVerdict] = useState<Verdict>(null);
  const [borderline, setBorderline] = useState(false);

  const locked = verdict !== null || borderline;

  function submit() {
    if (locked) return;
    if (question.type === 'mcq' || question.type === 'truefalse') {
      handleChoice(input);
      return;
    }
    if (question.type === 'match' && question.pairs) {
      finalise(gradeMatch(userPairs, question.pairs), formatPairsChosen(userPairs));
      return;
    }
    if (question.type === 'sequence' && question.sequence) {
      finalise(
        gradeSequence(userOrder, question.sequence),
        userOrder.length > 0 ? userOrder.join(' → ') : undefined,
      );
      return;
    }
    const typed = input.trim() || undefined;
    if (question.type === 'numeric') {
      // Numbers are right or wrong — no borderline "did you mean?" step.
      finalise(gradeNumeric(input, question.answer, question.acceptable), typed);
      return;
    }
    const result: GradeResult = grade(input, question.answer, question.acceptable);
    if (result === 'borderline') {
      setBorderline(true);
      return;
    }
    finalise(result === 'correct', typed);
  }

  function handleChoice(choice: string) {
    setInput(choice);
    const canonical = firstAnswer(question.answer);
    finalise(choice.trim().toLowerCase() === canonical.trim().toLowerCase(), choice);
  }

  function handleNvrChoice(index: number) {
    if (locked) return;
    setPickedIndex(index);
    const answerIndex = Number(firstAnswer(question.answer));
    finalise(index === answerIndex, `Shape ${String.fromCharCode(65 + index)}`);
  }

  function finalise(correct: boolean, chosen?: string) {
    setVerdict(correct ? 'correct' : 'wrong');
    setBorderline(false);
    onResolved(correct, chosen);
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
        userPairs={userPairs}
        setUserPairs={setUserPairs}
        userOrder={userOrder}
        setUserOrder={setUserOrder}
        pickedIndex={pickedIndex}
        locked={locked}
        verdict={verdict}
        onChoice={handleChoice}
        onNvrChoice={handleNvrChoice}
        onSubmit={submit}
      />

      {borderline && verdict === null && (
        <div className="border border-dashed border-neon-yellow rounded-2xl p-5 sm:p-6 space-y-4 animate-feedback-in bg-neon-yellow/15">
          <div className="text-[12px] font-bold uppercase tracking-[0.14em] text-inkSoft">
            The answer is
          </div>
          <div className="font-display text-2xl sm:text-[28px] font-bold tracking-[-0.022em] leading-tight">
            <span className="bg-neon-yellow px-1.5 text-ink">
              {firstAnswer(question.answer)}
            </span>
          </div>
          <p className="text-[14px] text-ink leading-relaxed">
            Did you mean that? If it's just a spelling slip, tap{' '}
            <strong>Yes</strong>. If you wrote a different word, tap{' '}
            <strong>No</strong>.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => finalise(true, input.trim() || undefined)}
              className="flex-1 bg-neon-green text-ink rounded-full px-6 py-4 font-bold text-[16px] hover:opacity-90"
            >
              Yes ✓
            </button>
            <button
              onClick={() => finalise(false, input.trim() || undefined)}
              className="flex-1 bg-neon-pink text-paper rounded-full px-6 py-4 font-bold text-[16px] hover:opacity-90"
            >
              No ✗
            </button>
          </div>
        </div>
      )}

      {verdict && showFeedback && (
        <FeedbackPanel
          verdict={verdict}
          answer={formatAnswer(question)}
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
  userPairs,
  setUserPairs,
  userOrder,
  setUserOrder,
  pickedIndex,
  locked,
  verdict,
  onChoice,
  onNvrChoice,
  onSubmit,
}: {
  question: Question;
  input: string;
  setInput: (v: string) => void;
  userPairs: Record<string, string>;
  setUserPairs: (next: Record<string, string>) => void;
  userOrder: string[];
  setUserOrder: (next: string[]) => void;
  pickedIndex: number | null;
  locked: boolean;
  verdict: Verdict;
  onChoice: (c: string) => void;
  onNvrChoice: (i: number) => void;
  onSubmit: () => void;
}) {
  if (question.type === 'nvr' && question.nvr) {
    return (
      <NvrAnswer
        nvr={question.nvr}
        answerIndex={Number(firstAnswer(question.answer))}
        pickedIndex={pickedIndex}
        locked={locked}
        verdict={verdict}
        onChoose={onNvrChoice}
      />
    );
  }

  if (question.type === 'match' && question.pairs) {
    return (
      <MatchAnswer
        pairs={question.pairs}
        userPairs={userPairs}
        setUserPairs={setUserPairs}
        locked={locked}
        verdict={verdict}
        onSubmit={onSubmit}
      />
    );
  }

  if (question.type === 'sequence' && question.sequence) {
    return (
      <SequenceAnswer
        items={question.sequence}
        userOrder={userOrder}
        setUserOrder={setUserOrder}
        locked={locked}
        verdict={verdict}
        onSubmit={onSubmit}
      />
    );
  }

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

function formatPairsChosen(userPairs: Record<string, string>): string | undefined {
  const entries = Object.entries(userPairs);
  if (entries.length === 0) return undefined;
  return entries.map(([l, r]) => `${l} → ${r}`).join('; ');
}

/**
 * Canonical answer rendered for the kid in feedback panels and the Mistakes
 * list. For match/sequence, the structured fields are the source of truth and
 * `question.answer` is empty — render them as readable arrow strings.
 */
export function formatAnswer(question: Question): string {
  if (question.type === 'match' && question.pairs) {
    return question.pairs.map((p) => `${p.left} → ${p.right}`).join('; ');
  }
  if (question.type === 'sequence' && question.sequence) {
    return question.sequence.join(' → ');
  }
  if (question.type === 'nvr') {
    return `Shape ${String.fromCharCode(65 + Number(firstAnswer(question.answer)))}`;
  }
  return firstAnswer(question.answer);
}
