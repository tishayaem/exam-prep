import type { Question } from '../data/types';
import { AlphabetStrip } from './AlphabetStrip';
import { AnswerArea } from './AnswerArea';
import { useAnswerState } from './useAnswerState';
import { firstAnswer, formatAnswer, type Verdict } from './answerFormat';

// Re-exported so existing importers (Quiz / Mock Test / Mistakes / Flashcards)
// keep working after these helpers moved into answerFormat.
export { firstAnswer, formatAnswer };

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
  const a = useAnswerState(question, onResolved);

  return (
    <div className="space-y-6">
      <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.025em] leading-tight">
        {question.prompt}
      </h2>

      {question.letterStrip && <AlphabetStrip />}

      <AnswerArea
        question={question}
        input={a.input}
        setInput={a.setInput}
        userPairs={a.userPairs}
        setUserPairs={a.setUserPairs}
        userOrder={a.userOrder}
        setUserOrder={a.setUserOrder}
        pickedIndex={a.pickedIndex}
        locked={a.locked}
        verdict={a.verdict}
        onChoice={a.handleChoice}
        onNvrChoice={a.handleNvrChoice}
        onSubmit={a.submit}
      />

      {a.borderline && a.verdict === null && (
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
              onClick={() => a.resolveBorderline(true)}
              className="flex-1 bg-neon-green text-ink rounded-full px-6 py-4 font-bold text-[16px] hover:opacity-90"
            >
              Yes ✓
            </button>
            <button
              onClick={() => a.resolveBorderline(false)}
              className="flex-1 bg-neon-pink text-paper rounded-full px-6 py-4 font-bold text-[16px] hover:opacity-90"
            >
              No ✗
            </button>
          </div>
        </div>
      )}

      {a.verdict && showFeedback && (
        <FeedbackPanel
          verdict={a.verdict}
          answer={formatAnswer(question)}
          explanation={question.explanation}
          onNext={onNext}
          nextLabel={nextLabel}
        />
      )}

      {a.verdict && !showFeedback && onNext && (
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
        ok ? 'border-neon-green bg-[#f1fff5]' : 'border-neon-pink bg-[#fff1f8]'
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
