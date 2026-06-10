import type { Question } from '../data/types';
import { firstAnswer, type Verdict } from './answerFormat';
import { MatchAnswer } from './MatchAnswer';
import { SequenceAnswer } from './SequenceAnswer';
import { NvrAnswer, NvrCodeStem } from './NvrAnswer';

/**
 * True when every accepted answer can be typed on the iOS decimal keypad,
 * which offers only digits and a decimal point. Symbols gradeNumeric strips
 * (£ % ° commas, spaces) don't need typing, so they don't disqualify — but
 * fractions ("7/24"), 24-hour times ("16:55") and negatives do, and those
 * questions keep the full text keyboard.
 */
function decimalPadSafe(question: Question): boolean {
  const candidates = [
    ...(Array.isArray(question.answer) ? question.answer : [question.answer]),
    ...(question.acceptable ?? []),
  ];
  return candidates.every((c) => /^[0-9.]+$/.test(c.replace(/[£$,%°\s]/g, '')));
}

/**
 * The input surface for a question — picks the right control for the type
 * (NVR figures, match, sequence, MCQ/true-false, or a typed text box). Shared
 * by QuestionRunner (Mock Test / Mistakes) and Quiz, so a new question type is
 * wired up in exactly one place.
 */
export function AnswerArea({
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
      <div>
        {/* Codes questions are MCQs with a figure stem rendered above the
            letter-pair choices. */}
        {question.nvr?.kind === 'code' && <NvrCodeStem nvr={question.nvr} />}
        <div className="grid gap-3">
        {choices.map((c) => {
          const isPicked = input === c;
          const isAnswer = c.trim().toLowerCase() === canonical;
          let cls = 'bg-paper text-ink border-[1.5px] border-rule hover:border-ink';
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
        inputMode={
          question.type === 'numeric' && decimalPadSafe(question)
            ? 'decimal'
            : 'text'
        }
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
