import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { findSection, scienceSections } from '../data/science';
import { shuffle, sample } from '../lib/shuffle';
import { useProgress } from '../lib/storage';
import type { Section } from '../data/types';

const SPRINT_SECONDS = 45;

type Card = {
  /** Stable Leitner-tracked ID per vocab term, e.g. "vocab:plants-03-flower-dissection:stigma". */
  id: string;
  term: string;
  meaning: string;
  distractors: string[];
};

type SourceTerm = { id: string; term: string; meaning: string };

function vocabId(sectionId: string, term: string): string {
  const slug = term
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `vocab:${sectionId}:${slug}`;
}

function expand(s: Section): SourceTerm[] {
  return s.vocabulary.map((v) => ({
    id: vocabId(s.id, v.term),
    term: v.term,
    meaning: v.meaning,
  }));
}

export function VocabSprint() {
  const { sectionId } = useParams();
  // Key by sectionId so switching scope (between sections or to/from
  // all-sections) re-mounts the inner body and resets phase / score / timer.
  return <VocabSprintBody key={sectionId ?? '__all__'} sectionId={sectionId} />;
}

function VocabSprintBody({ sectionId }: { sectionId: string | undefined }) {
  const { recordAttempt } = useProgress();

  const allVocab = useMemo<SourceTerm[]>(() => {
    if (sectionId) {
      const s = findSection(sectionId);
      return s ? expand(s) : [];
    }
    return scienceSections.flatMap(expand);
  }, [sectionId]);

  const [cards, setCards] = useState<Card[]>(() => buildCards(allVocab));
  const [phase, setPhase] = useState<'pre' | 'running' | 'done'>('pre');
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(SPRINT_SECONDS);
  const [pickedAt, setPickedAt] = useState<string | null>(null);

  // Hoisted above the early returns so the hook is unconditional. The choices
  // array re-shuffles only when the active card changes — without this memo,
  // every keystroke would re-randomise the option order mid-question.
  const activeCard: Card | null = cards[index] ?? null;
  const options = useMemo(
    () =>
      activeCard
        ? shuffle([activeCard.meaning, ...activeCard.distractors])
        : [],
    [activeCard],
  );

  useEffect(() => {
    if (phase !== 'running') return;
    if (secondsLeft <= 0) {
      setPhase('done');
      return;
    }
    const id = window.setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(id);
  }, [phase, secondsLeft]);

  if (allVocab.length < 4) {
    return (
      <div className="max-w-[640px] mx-auto py-10 text-center space-y-5">
        <h2 className="font-display text-3xl font-bold tracking-tight">
          Not enough vocabulary
        </h2>
        <p className="text-inkSoft">
          Vocab Sprint needs at least 4 terms in this section.
        </p>
        <Link
          to="/"
          viewTransition
          className="inline-block bg-ink text-paper rounded-full px-6 py-3.5 font-semibold"
        >
          Back home
        </Link>
      </div>
    );
  }

  function startRun() {
    setCards(buildCards(allVocab));
    setIndex(0);
    setScore(0);
    setSecondsLeft(SPRINT_SECONDS);
    setPickedAt(null);
    setPhase('running');
  }

  if (phase === 'pre') {
    return (
      <div className="space-y-9">
        <header>
          <div className="text-[13px] font-bold text-neon-pink uppercase tracking-[0.16em] mb-3">
            Practice · Beat the buzzer
          </div>
          <h1 className="font-display text-[clamp(2.25rem,6.4vw,4.75rem)] font-bold tracking-[-0.04em] leading-[0.95] m-0">
            Vocab{' '}
            <span className="relative inline-block">
              Sprint.
              <span
                aria-hidden
                className="absolute left-[-2%] right-[-2%] bottom-[8%] h-[18%] bg-neon-yellow -z-10 -skew-x-6"
              />
            </span>
          </h1>
          <p className="text-[15px] text-inkSoft mt-4 max-w-xl leading-relaxed">
            Pick the right meaning for each word. You have{' '}
            <strong className="text-ink font-semibold">
              {SPRINT_SECONDS} seconds
            </strong>
            . How many can you get?
          </p>
        </header>

        <div className="bg-ink text-paper rounded-[28px] p-7 sm:p-9 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <div className="text-[12px] font-bold text-neon-yellow uppercase tracking-[0.14em]">
              {allVocab.length} terms loaded
            </div>
            <div className="font-display text-2xl sm:text-[32px] font-bold tracking-[-0.025em] mt-2 leading-tight">
              Tap when you're ready.
            </div>
          </div>
          <button
            onClick={startRun}
            className="bg-neon-yellow text-ink rounded-full px-7 py-4 font-bold text-[15px] hover:opacity-90 transition-opacity justify-self-start"
          >
            Start ›
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'done' || index >= cards.length) {
    const total = Math.max(index, 1);
    const tagline =
      score >= cards.length * 0.9
        ? { text: "Locked in.", bg: 'bg-neon-green text-ink' }
        : score >= cards.length * 0.6
          ? { text: 'Solid. A couple more sprints.', bg: 'bg-neon-yellow text-ink' }
          : { text: 'Take it back to Study and run it again.', bg: 'bg-neon-pink text-paper' };

    return (
      <div className="max-w-[760px] mx-auto text-center py-6 sm:py-12 space-y-7">
        <div className="text-[13px] font-bold text-neon-pink uppercase tracking-[0.16em]">
          Time's up
        </div>
        <div className="font-display text-[clamp(4rem,18vw,6rem)] font-bold tracking-[-0.045em] leading-[0.95]">
          {score}
          <span className="text-inkSoft">/{total}</span>
        </div>
        <div className="font-display text-[20px] sm:text-[22px] font-semibold">
          <span className={`${tagline.bg} px-2`}>{tagline.text}</span>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={startRun}
            className="bg-paper text-ink border-[1.5px] border-ink rounded-full px-6 py-3.5 font-semibold"
          >
            Go again
          </button>
          <Link
            to="/"
            viewTransition
            className="bg-ink text-paper rounded-full px-6 py-3.5 font-semibold"
          >
            Home
          </Link>
        </div>
      </div>
    );
  }

  // Past the early returns, activeCard is non-null.
  const card = activeCard!;
  const picked = pickedAt !== null;

  function pick(option: string) {
    if (picked) return;
    setPickedAt(option);
    const correct = option === card.meaning;
    if (correct) setScore((s) => s + 1);
    // Sprint counts as a difficulty-1 attempt: each tap nudges the term's
    // Leitner box up or down and adds to the global attempt log, so progress
    // earned here shows up in XP, streak, and (eventually) Flashcards.
    recordAttempt(card.id, correct, 1, option);
    // Asymmetric: snap forward on correct, linger on wrong so she has time to
    // read the right meaning (which is flashing green alongside her pink pick).
    window.setTimeout(() => {
      setPickedAt(null);
      setIndex((i) => i + 1);
    }, correct ? 450 : 1000);
  }

  const lowTime = secondsLeft <= 10;

  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between">
        <div className="text-[13px] font-bold text-neon-pink uppercase tracking-[0.16em]">
          Word {index + 1}
        </div>
        <div className="flex items-baseline gap-4 text-[13px] font-semibold">
          <span>
            <span className="text-inkSoft">Score </span>
            <span className="bg-neon-green px-2 py-0.5 font-bold text-ink tabular-nums">
              {score}
            </span>
          </span>
          <span
            key={lowTime ? 'low' : 'normal'}
            className={`tabular-nums inline-block ${
              lowTime ? 'text-neon-pink animate-emphasis-pop' : 'text-ink'
            }`}
          >
            ⏱ {secondsLeft}s
          </span>
        </div>
      </div>

      <div className="h-1.5 bg-off rounded-full overflow-hidden">
        <div
          className="h-full bg-neon-yellow rounded-full progress-fill"
          style={{ width: `${(secondsLeft / SPRINT_SECONDS) * 100}%` }}
        />
      </div>

      <div className="bg-ink text-paper rounded-[28px] p-7 sm:p-10">
        <div className="text-[11px] font-bold text-neon-yellow uppercase tracking-[0.14em]">
          Term
        </div>
        <div className="font-display text-4xl sm:text-[56px] font-bold tracking-[-0.03em] mt-2 leading-tight">
          {card.term}
        </div>
      </div>

      <div className="grid gap-3">
        {options.map((opt) => {
          let cls =
            'bg-paper text-ink border-[1.5px] border-rule hover:border-ink';
          if (picked) {
            if (opt === card.meaning) cls = 'bg-neon-green text-ink border-[1.5px] border-neon-green animate-emphasis-pop';
            else if (opt === pickedAt) cls = 'bg-neon-pink text-paper border-[1.5px] border-neon-pink';
            else cls = 'bg-paper text-inkSoft border-[1.5px] border-rule';
          }
          return (
            <button
              key={opt}
              onClick={() => pick(opt)}
              disabled={picked}
              className={`rounded-2xl px-5 py-4 text-left text-[16px] font-medium transition-colors ${cls}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function buildCards(vocab: SourceTerm[]): Card[] {
  if (vocab.length < 4) return [];
  return shuffle(vocab).map((v) => {
    const pool = vocab.filter((other) => other.meaning !== v.meaning);
    const distractors = sample(pool, 3).map((d) => d.meaning);
    return { id: v.id, term: v.term, meaning: v.meaning, distractors };
  });
}

