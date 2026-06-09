import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { findSection } from '../data';
import { useProgress } from '../lib/storage';
import { FeedbackPanel, firstAnswer, formatAnswer } from '../components/QuestionRunner';
import { AlphabetStrip } from '../components/AlphabetStrip';
import { AnswerArea } from '../components/AnswerArea';
import { useAnswerState } from '../components/useAnswerState';
import { burstFromEvent } from '../lib/confetti';

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
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  // The shared answer engine: it grades and exposes the input state; Quiz reacts
  // by scoring and logging the attempt. Same engine the Mock Test / Mistakes use
  // through QuestionRunner, so grading can't drift between modes.
  const current = order[index];
  const a = useAnswerState(current, (correct, chosen) => {
    setScore((s) => s + (correct ? 1 : 0));
    recordAttempt(current.id, correct, current.difficulty, chosen);
  });

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
          a.reset();
        }}
      />
    );
  }

  function next(e: React.MouseEvent<HTMLButtonElement>) {
    if (a.verdict === 'correct') {
      burstFromEvent(e);
    }
    if (index + 1 >= total) {
      setDone(true);
      // Bigger pop on the last "See result" press.
      burstFromEvent(e);
      return;
    }
    setIndex((i) => i + 1);
    a.reset();
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
            {current.prompt}
          </h2>
          {current.letterStrip && (
            // Keyed per question so the marks reset with each new question.
            <div key={current.id} className="mb-7">
              <AlphabetStrip />
            </div>
          )}
          <AnswerArea
            question={current}
            input={a.input}
            setInput={a.setInput}
            userPairs={a.userPairs}
            setUserPairs={a.setUserPairs}
            userOrder={a.userOrder}
            setUserOrder={a.setUserOrder}
            pickedIndex={a.pickedIndex}
            verdict={a.verdict}
            locked={a.locked}
            onChoice={a.handleChoice}
            onNvrChoice={a.handleNvrChoice}
            onSubmit={a.submit}
          />
        </div>

        {/* Right: feedback / hint */}
        <div className="lg:sticky lg:top-24">
          {a.borderline && (
            <div className="border border-dashed border-neon-yellow rounded-[22px] p-7 bg-neon-yellow/15 flex flex-col gap-5">
              <div>
                <div className="text-[12px] font-bold text-inkSoft uppercase tracking-[0.14em]">
                  The answer is
                </div>
                <div className="font-display text-[26px] sm:text-[30px] font-bold tracking-[-0.022em] mt-2 leading-snug">
                  <span className="bg-neon-yellow px-1.5 text-ink">
                    {firstAnswer(current.answer)}
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
                  onClick={() => a.resolveBorderline(true)}
                  className="flex-1 bg-neon-green text-ink rounded-full px-6 py-4 font-bold text-[16px]"
                >
                  Yes ✓
                </button>
                <button
                  onClick={() => a.resolveBorderline(false)}
                  className="flex-1 bg-neon-pink text-paper rounded-full px-6 py-4 font-bold text-[16px]"
                >
                  No ✗
                </button>
              </div>
            </div>
          )}

          {!a.verdict && !a.borderline && (
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

          {a.verdict && (
            <FeedbackPanel
              verdict={a.verdict}
              answer={formatAnswer(current)}
              explanation={current.explanation}
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
