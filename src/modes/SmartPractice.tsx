import { useState } from 'react';
import { Link } from 'react-router-dom';
import { allSections, questionsBySubject } from '../data';
import { SUBJECTS } from '../data/packs';
import { useProgress } from '../lib/storage';
import { QuestionRunner } from '../components/QuestionRunner';
import { Headline } from '../components/Editorial';
import { pickAdaptive, weakestTopics } from '../lib/mastery';
import type { Question, Subject } from '../data/types';

const COUNT = 12;
type Phase = 'pre' | 'running' | 'review';

export function SmartPractice() {
  const { state, recordAttempt } = useProgress();
  const [phase, setPhase] = useState<Phase>('pre');
  const [paper, setPaper] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [reasoningOnly, setReasoningOnly] = useState(false);

  function start(subject?: Subject) {
    const picked = pickAdaptive(allSections, state, COUNT, Date.now(), {
      ...(subject ? { subject } : {}),
      reasoningOnly,
    });
    setPaper(picked);
    setIndex(0);
    setCorrect(0);
    setPhase('running');
  }

  if (phase === 'pre') {
    return (
      <PreScreen
        onStart={start}
        attempts={state.attempts.length}
        state={state}
        reasoningOnly={reasoningOnly}
        onToggleReasoning={() => setReasoningOnly((v) => !v)}
      />
    );
  }

  if (phase === 'review') {
    return (
      <ReviewScreen
        correct={correct}
        total={paper.length}
        topics={[...new Set(paper.map((q) => sectionTitle(q.sectionId)))]}
        onAgain={() => start()}
      />
    );
  }

  if (index >= paper.length) {
    setPhase('review');
    return null;
  }

  const q = paper[index];

  return (
    <div className="space-y-7">
      <div className="flex items-baseline justify-between">
        <div className="text-[13px] font-bold text-neon-pink uppercase tracking-[0.16em]">
          {reasoningOnly ? 'Problem-solving · aimed at your gaps' : 'Aimed at your gaps'}
        </div>
        <div className="text-[13px] font-bold tabular-nums text-inkSoft">
          {index + 1} <span className="text-rule">/</span> {paper.length}
        </div>
      </div>

      <DotProgress current={index} total={paper.length} />

      <QuestionRunner
        key={q.id}
        question={q}
        onResolved={(ok, chosen) => {
          if (ok) setCorrect((c) => c + 1);
          recordAttempt(q.id, ok, q.difficulty, chosen);
        }}
        onNext={() => setIndex((i) => i + 1)}
        nextLabel={index + 1 < paper.length ? 'Next ›' : 'See how you did ›'}
      />
    </div>
  );
}

// ─── Pre ─────────────────────────────────────────────────────────────────────

function PreScreen({
  onStart,
  attempts,
  state,
  reasoningOnly,
  onToggleReasoning,
}: {
  onStart: (s?: Subject) => void;
  attempts: number;
  state: ReturnType<typeof useProgress>['state'];
  reasoningOnly: boolean;
  onToggleReasoning: () => void;
}) {
  // With the problem-solving filter on, only offer subjects that actually
  // have multi-step (reasoning-flagged) questions to draw from.
  const available = SUBJECTS.filter((s) =>
    questionsBySubject(s.id).some((q) => !reasoningOnly || q.reasoning),
  );
  const weak = weakestTopics(allSections, state, Date.now(), {
    includeUnseen: false,
    limit: 3,
  }).filter((t) => t.band !== 'strong');

  return (
    <div className="space-y-9">
      <Headline
        overline="Adaptive · Targets your weak spots"
        lead="Smart"
        accent="Practice"
        accentColor="pink"
        subtitle={`${COUNT} questions, chosen to hit the topics you find hardest and the ones you haven't seen lately. Feedback after every one — this is for learning, not testing.`}
      />

      <div className="bg-ink text-paper rounded-[28px] p-7 sm:p-9 space-y-6">
        <div>
          <div className="text-[12px] font-bold text-neon-green uppercase tracking-[0.14em]">
            {attempts === 0 ? 'First run' : 'Right now we’d focus on'}
          </div>
          <div className="font-display text-2xl sm:text-[30px] font-bold tracking-[-0.025em] mt-2 leading-tight">
            {attempts === 0 ? (
              'A spread to find your level'
            ) : weak.length === 0 ? (
              'A bit of everything — you’re looking strong'
            ) : (
              <span>
                {weak.map((t, i) => (
                  <span key={t.section.id}>
                    {i > 0 && <span className="text-inkSoft">, </span>}
                    <span className="bg-neon-pink text-paper px-1.5">{t.section.title}</span>
                  </span>
                ))}
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={reasoningOnly}
          onClick={onToggleReasoning}
          className={`w-full flex items-center justify-between gap-4 rounded-2xl border-[1.5px] px-5 py-4 text-left transition-colors ${
            reasoningOnly
              ? 'border-neon-green bg-neon-green/15'
              : 'border-paper/30 hover:border-paper/60'
          }`}
        >
          <span>
            <span className="block font-bold text-[15px]">
              Problem-solving only
            </span>
            <span className="block text-[13px] text-paper/60 mt-0.5">
              Multi-step questions that make you stop and think.
            </span>
          </span>
          <span
            aria-hidden
            className={`shrink-0 w-12 h-7 rounded-full p-1 transition-colors ${
              reasoningOnly ? 'bg-neon-green' : 'bg-paper/30'
            }`}
          >
            <span
              className={`block w-5 h-5 rounded-full bg-paper transition-transform ${
                reasoningOnly ? 'translate-x-5' : ''
              }`}
            />
          </span>
        </button>

        <button
          onClick={() => onStart()}
          className="bg-neon-green text-ink rounded-full px-7 py-4 font-bold text-base hover:opacity-90 transition-opacity w-full sm:w-auto"
        >
          Start — everything ›
        </button>

        {available.length > 1 && (
          <div>
            <div className="text-[12px] font-semibold text-paper/60 uppercase tracking-[0.12em] mb-2.5">
              …or just one subject
            </div>
            <div className="flex flex-wrap gap-2.5">
              {available.map((s) => (
                <button
                  key={s.id}
                  onClick={() => onStart(s.id)}
                  className="border border-paper/30 text-paper rounded-full px-4 py-2 text-[13px] font-semibold hover:bg-paper hover:text-ink transition-colors"
                >
                  {s.title}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <p className="text-[13px] text-inkSoft">
        Want the full picture?{' '}
        <Link to="/skills" viewTransition className="text-ink font-semibold underline">
          See your skills map
        </Link>
        .
      </p>
    </div>
  );
}

// ─── Review ──────────────────────────────────────────────────────────────────

function ReviewScreen({
  correct,
  total,
  topics,
  onAgain,
}: {
  correct: number;
  total: number;
  topics: string[];
  onAgain: () => void;
}) {
  const pct = total === 0 ? 0 : Math.round((correct / total) * 100);
  const tagline =
    pct >= 80
      ? { text: 'Those gaps are closing.', bg: 'bg-neon-green text-ink' }
      : pct >= 50
        ? { text: 'Good chunk done — go again to lock it in.', bg: 'bg-neon-yellow text-ink' }
        : { text: 'Tricky set — that’s exactly the point. Try once more.', bg: 'bg-neon-pink text-paper' };

  return (
    <div className="space-y-10 pb-8">
      <header className="text-center max-w-[760px] mx-auto">
        <div className="text-[13px] font-bold text-neon-pink uppercase tracking-[0.16em] mb-3.5">
          Session complete
        </div>
        <div className="font-display text-[clamp(4rem,18vw,6rem)] font-bold tracking-[-0.045em] leading-[0.95]">
          {correct}
          <span className="text-inkSoft">/{total}</span>
        </div>
        <div className="font-display text-[20px] sm:text-[22px] font-semibold mt-3.5">
          {pct}% · <span className={`${tagline.bg} px-2`}>{tagline.text}</span>
        </div>
      </header>

      {topics.length > 0 && (
        <div className="border border-rule rounded-[22px] p-6 text-center">
          <div className="text-[11px] font-bold text-inkSoft uppercase tracking-[0.14em] mb-2">
            You worked on
          </div>
          <div className="text-[15px] leading-relaxed">{topics.join(' · ')}</div>
        </div>
      )}

      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={onAgain}
          className="bg-paper text-ink border-[1.5px] border-ink rounded-full px-6 py-3.5 font-semibold"
        >
          Go again
        </button>
        <Link
          to="/skills"
          viewTransition
          className="bg-ink text-paper rounded-full px-6 py-3.5 font-semibold"
        >
          See your skills map ›
        </Link>
      </div>
    </div>
  );
}

// ─── Bits ────────────────────────────────────────────────────────────────────

function sectionTitle(id: string): string {
  return allSections.find((s) => s.id === id)?.title ?? id;
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
