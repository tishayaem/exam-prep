import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { findSection } from '../data';
import { grade, gradeMatch, gradeSequence, type GradeResult } from '../lib/grading';
import { useProgress } from '../lib/storage';
import type { Question } from '../data/types';
import { FeedbackPanel, firstAnswer, formatAnswer } from '../components/QuestionRunner';
import { MatchAnswer } from '../components/MatchAnswer';
import { SequenceAnswer } from '../components/SequenceAnswer';
import { burstFromEvent } from '../lib/confetti';

type Verdict = 'correct' | 'wrong' | null;

/**
 * Outer wrapper exists purely to key the inner body by sectionId — when the
 * route param changes (e.g. the kid jumps from one section's quiz to another
 * via a Home link without going via the result screen), React unmounts and
 * remounts QuizBody, re-initialising every useState back to its default. Without
 * the key, the stale `done`/`score`/`index` from the previous quiz would leak
 * into the new one, showing the old result screen.
 */
export function Quiz() {
  const { sectionId } = useParams();
  return <QuizBody key={sectionId ?? '__none__'} sectionId={sectionId} />;
}

function QuizBody({ sectionId }: { sectionId: string | undefined }) {
  const section = sectionId ? findSection(sectionId) : undefined;
  const { recordAttempt } = useProgress();

  const order = useMemo(() => {
    if (!section) return [];
    return [...section.questions].sort(() => Math.random() - 0.5);
  }, [section]);

  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [userPairs, setUserPairs] = useState<Record<string, string>>({});
  const [userOrder, setUserOrder] = useState<string[]>([]);
  const [verdict, setVerdict] = useState<Verdict>(null);
  const [borderline, setBorderline] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  if (!section) {
    return (
      <div className="border border-rule rounded-3xl p-8 text-center">
        Section not found.
      </div>
    );
  }

  const total = order.length;

  if (done || index >= total) {
    return (
      <ResultScreen
        score={score}
        total={total}
        sectionId={section.id}
        onRetry={() => {
          setDone(false);
          setIndex(0);
          setScore(0);
          setVerdict(null);
          setBorderline(false);
          setInput('');
        }}
      />
    );
  }

  const q = order[index];
  const locked = verdict !== null || borderline;

  function submit(value?: string) {
    if (locked) return;
    if (q.type === 'match' && q.pairs) {
      const entries = Object.entries(userPairs);
      const chosen =
        entries.length > 0
          ? entries.map(([l, r]) => `${l} → ${r}`).join('; ')
          : undefined;
      finalise(gradeMatch(userPairs, q.pairs), chosen);
      return;
    }
    if (q.type === 'sequence' && q.sequence) {
      finalise(
        gradeSequence(userOrder, q.sequence),
        userOrder.length > 0 ? userOrder.join(' → ') : undefined,
      );
      return;
    }
    const v = (value ?? input).trim();
    if (!v) return;
    if (q.type === 'mcq' || q.type === 'truefalse') {
      handleChoice(v);
      return;
    }
    const result: GradeResult = grade(v, q.answer, q.acceptable);
    if (result === 'borderline') {
      setBorderline(true);
      return;
    }
    finalise(result === 'correct', v);
  }

  function handleChoice(choice: string) {
    setInput(choice);
    const canonical = firstAnswer(q.answer);
    finalise(choice.trim().toLowerCase() === canonical.trim().toLowerCase(), choice);
  }

  function finalise(correct: boolean, chosen?: string) {
    setVerdict(correct ? 'correct' : 'wrong');
    setBorderline(false);
    setScore((s) => s + (correct ? 1 : 0));
    recordAttempt(q.id, correct, q.difficulty, chosen);
  }

  function next(e: React.MouseEvent<HTMLButtonElement>) {
    if (verdict === 'correct') {
      burstFromEvent(e);
    }
    if (index + 1 >= total) {
      setDone(true);
      // Bigger pop on the last "See result" press.
      burstFromEvent(e);
      return;
    }
    setIndex((i) => i + 1);
    setInput('');
    setUserPairs({});
    setUserOrder([]);
    setVerdict(null);
    setBorderline(false);
  }

  return (
    <div className="space-y-7">
      <div className="flex items-baseline justify-between">
        <div className="text-[13px] font-bold text-neon-pink uppercase tracking-[0.16em]">
          Question {index + 1}{' '}
          <span className="text-inkSoft">/ {total}</span>
        </div>
        <div className="text-[13px] font-semibold">
          <span className="text-inkSoft">Score </span>
          <span className="bg-neon-green px-2 py-0.5 font-bold text-ink">
            {score}
          </span>
        </div>
      </div>

      <DotProgress current={index} total={total} />

      <div className="grid gap-8 lg:gap-12 lg:grid-cols-[1.3fr_1fr] items-start">
        {/* Left: question + answer */}
        <div>
          <h2 className="font-display text-3xl sm:text-[44px] font-bold tracking-[-0.03em] leading-[1.05] mb-7">
            {q.prompt}
          </h2>
          <ChoiceOrInput
            question={q}
            input={input}
            setInput={setInput}
            userPairs={userPairs}
            setUserPairs={setUserPairs}
            userOrder={userOrder}
            setUserOrder={setUserOrder}
            verdict={verdict}
            locked={locked}
            onPick={handleChoice}
            onSubmit={() => submit()}
          />
        </div>

        {/* Right: feedback / hint */}
        <div className="lg:sticky lg:top-24">
          {borderline && (
            <div className="border border-dashed border-neon-yellow rounded-[22px] p-7 bg-neon-yellow/15 flex flex-col gap-5">
              <div>
                <div className="text-[12px] font-bold text-inkSoft uppercase tracking-[0.14em]">
                  The answer is
                </div>
                <div className="font-display text-[26px] sm:text-[30px] font-bold tracking-[-0.022em] mt-2 leading-snug">
                  <span className="bg-neon-yellow px-1.5 text-ink">
                    {firstAnswer(q.answer)}
                  </span>
                </div>
                <p className="text-[14px] text-ink mt-3 leading-relaxed">
                  Did you mean that? If it's just a spelling slip, tap{' '}
                  <strong>Yes</strong>. If you wrote a different word, tap{' '}
                  <strong>No</strong>.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => finalise(true, input.trim() || undefined)}
                  className="flex-1 bg-neon-green text-ink rounded-full px-6 py-4 font-bold text-[16px]"
                >
                  Yes ✓
                </button>
                <button
                  onClick={() => finalise(false, input.trim() || undefined)}
                  className="flex-1 bg-neon-pink text-paper rounded-full px-6 py-4 font-bold text-[16px]"
                >
                  No ✗
                </button>
              </div>
            </div>
          )}

          {!verdict && !borderline && (
            <div className="border border-dashed border-rule rounded-[22px] p-7 min-h-[280px] flex flex-col justify-center text-inkSoft">
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] mb-2.5">
                Hint
              </div>
              <p className="text-[15px] leading-relaxed">
                Take your time. There are no time penalties. Pick what feels
                right — you'll see the answer and a quick explanation either
                way.
              </p>
            </div>
          )}

          {verdict && (
            <FeedbackPanel
              verdict={verdict}
              answer={formatAnswer(q)}
              explanation={q.explanation}
              onNext={next}
              nextLabel={index + 1 < total ? 'Next question ›' : 'See result ›'}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Pieces ─────────────────────────────────────────────────────────────────

function DotProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: total }).map((_, i) => {
        const cls =
          i < current ? 'bg-neon-green' : i === current ? 'bg-ink' : 'bg-rule';
        return <div key={i} className={`flex-1 h-1.5 ${cls} rounded-full`} />;
      })}
    </div>
  );
}

function ChoiceOrInput({
  question,
  input,
  setInput,
  userPairs,
  setUserPairs,
  userOrder,
  setUserOrder,
  verdict,
  locked,
  onPick,
  onSubmit,
}: {
  question: Question;
  input: string;
  setInput: (v: string) => void;
  userPairs: Record<string, string>;
  setUserPairs: (next: Record<string, string>) => void;
  userOrder: string[];
  setUserOrder: (next: string[]) => void;
  verdict: Verdict;
  locked: boolean;
  onPick: (c: string) => void;
  onSubmit: () => void;
}) {
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
      question.choices ??
      (question.type === 'truefalse' ? ['True', 'False'] : []);
    const canonical = firstAnswer(question.answer).trim().toLowerCase();
    return (
      <div className="grid gap-3">
        {choices.map((c) => {
          const isPicked = input === c;
          const isAnswer = c.trim().toLowerCase() === canonical;
          let cls =
            'bg-paper text-ink border-[1.5px] border-rule hover:border-ink';
          if (verdict) {
            if (isAnswer)
              cls = 'bg-neon-green text-ink border-[1.5px] border-neon-green';
            else if (isPicked)
              cls = 'bg-neon-pink text-paper border-[1.5px] border-neon-pink';
            else cls = 'bg-paper text-inkSoft border-[1.5px] border-rule';
          } else if (isPicked) {
            cls = 'bg-ink text-paper border-[1.5px] border-ink';
          }
          return (
            <button
              key={c}
              disabled={locked}
              onClick={() => onPick(c)}
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

// ─── Result ─────────────────────────────────────────────────────────────────

function ResultScreen({
  score,
  total,
  sectionId,
  onRetry,
}: {
  score: number;
  total: number;
  sectionId: string;
  onRetry: () => void;
}) {
  const pct = score / total;
  const perfect = score === total;
  // Bands tuned so 80%+ visually celebrates rather than warns. The audit
  // flagged that 8/10 used to land in the pink "go practise misses" tier,
  // which felt punishing for what's actually a strong run.
  const tone: 'green' | 'yellow' | 'pink' =
    pct >= 0.8 ? 'green' : pct >= 0.6 ? 'yellow' : 'pink';
  const highlight =
    tone === 'green'
      ? 'bg-neon-green'
      : tone === 'yellow'
        ? 'bg-neon-yellow'
        : 'bg-neon-pink';

  let lead: string;
  let accent: { text: string; bg: string };
  if (perfect) {
    lead = 'Flawless.';
    accent = { text: 'Top of the class.', bg: 'bg-neon-green text-ink' };
  } else if (pct >= 0.8) {
    lead = 'Top mark.';
    accent = {
      text: `${score} out of ${total} right.`,
      bg: 'bg-neon-green text-ink',
    };
  } else if (pct >= 0.6) {
    lead = 'Solid run.';
    accent = {
      text: `${score} right out of ${total}.`,
      bg: 'bg-neon-yellow text-ink',
    };
  } else {
    lead = 'Good effort.';
    accent = {
      text: 'Take it back to Study and try again.',
      bg: 'bg-neon-pink text-paper',
    };
  }

  return (
    <div className="max-w-[760px] mx-auto text-center py-6 sm:py-12">
      <div className="text-[13px] font-bold text-neon-pink uppercase tracking-[0.16em] mb-3.5">
        Quiz complete
      </div>
      <div className="font-display text-[clamp(4rem,18vw,6rem)] font-bold tracking-[-0.045em] leading-[0.95]">
        <span className="relative inline-block">
          {score}
          <span
            aria-hidden
            className={`absolute left-[-2%] right-[-2%] bottom-[8%] h-[18%] -z-10 -skew-x-6 ${highlight}`}
          />
        </span>
        <span className="text-inkSoft">/{total}</span>
      </div>
      <div className="font-display text-[20px] sm:text-[22px] font-semibold mt-3.5">
        {lead} <span className={`${accent.bg} px-2`}>{accent.text}</span>
      </div>
      <div className="flex flex-wrap gap-3 justify-center mt-7">
        <button
          onClick={onRetry}
          className="bg-paper text-ink border-[1.5px] border-ink rounded-full px-6 py-3.5 font-semibold"
        >
          Try again
        </button>
        {!perfect && (
          <Link
            to="/mistakes"
            viewTransition
            className="bg-ink text-paper rounded-full px-6 py-3.5 font-semibold"
          >
            Review mistakes ›
          </Link>
        )}
        <Link
          to={`/study/${sectionId}`}
          viewTransition
          className="bg-paper text-ink border-[1.5px] border-rule rounded-full px-6 py-3.5 font-semibold"
        >
          Back to study
        </Link>
      </div>
    </div>
  );
}
