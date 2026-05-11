import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { findSection, scienceSections } from '../data/science';
import { shuffle, sample } from '../lib/shuffle';
import type { VocabularyTerm } from '../data/types';

const SPRINT_SECONDS = 45;

type Card = {
  term: string;
  meaning: string;
  distractors: string[];
};

export function VocabSprint() {
  const { sectionId } = useParams();

  const allVocab = useMemo(() => {
    if (sectionId) return findSection(sectionId)?.vocabulary ?? [];
    return scienceSections.flatMap((s) => s.vocabulary);
  }, [sectionId]);

  const [cards, setCards] = useState<Card[]>(() => buildCards(allVocab));
  const [phase, setPhase] = useState<'pre' | 'running' | 'done'>('pre');
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(SPRINT_SECONDS);
  const [pickedAt, setPickedAt] = useState<string | null>(null);

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
      <div className="card text-center space-y-2">
        <h2 className="text-xl font-bold">Not enough vocabulary</h2>
        <p className="text-ink/60">Vocab Sprint needs at least 4 terms.</p>
        <Link to="/" className="tap bg-ink/5 font-bold inline-block mt-2">
          Back home
        </Link>
      </div>
    );
  }

  if (phase === 'pre') {
    return (
      <div className="card text-center space-y-4">
        <div className="text-5xl">⚡</div>
        <h2 className="text-2xl font-bold">Vocab Sprint</h2>
        <p className="text-ink/70">
          Pick the right meaning for each word. You have{' '}
          <strong>{SPRINT_SECONDS} seconds</strong>. Go as fast as you can!
        </p>
        <button
          onClick={() => {
            setCards(buildCards(allVocab));
            setIndex(0);
            setScore(0);
            setSecondsLeft(SPRINT_SECONDS);
            setPhase('running');
          }}
          className="tap bg-accent text-white font-bold text-lg w-full"
        >
          Start →
        </button>
      </div>
    );
  }

  if (phase === 'done' || index >= cards.length) {
    return (
      <div className="card text-center space-y-4">
        <div className="text-5xl">{score >= cards.length * 0.7 ? '🏆' : '⭐'}</div>
        <h2 className="text-2xl font-bold">Time's up!</h2>
        <p className="text-ink/70">
          You got <strong>{score}</strong> correct
          {index > 0 && <> in {SPRINT_SECONDS - secondsLeft}s</>}.
        </p>
        <div className="flex gap-3 justify-center pt-2">
          <button
            onClick={() => {
              setCards(buildCards(allVocab));
              setIndex(0);
              setScore(0);
              setSecondsLeft(SPRINT_SECONDS);
              setPickedAt(null);
              setPhase('running');
            }}
            className="tap bg-accent text-white font-bold"
          >
            Go again
          </button>
          <Link to="/" className="tap bg-ink/5 font-bold">
            Home
          </Link>
        </div>
      </div>
    );
  }

  const card = cards[index];
  const options = useMemoChoices(card);
  const picked = pickedAt !== null;

  function pick(option: string) {
    if (picked) return;
    setPickedAt(option);
    if (option === card.meaning) setScore((s) => s + 1);
    window.setTimeout(() => {
      setPickedAt(null);
      setIndex((i) => i + 1);
    }, 350);
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between px-1">
        <div className="text-sm text-ink/60 tabular-nums">
          ⏱ {secondsLeft}s
        </div>
        <div className="text-sm font-bold tabular-nums">⚡ {score}</div>
      </div>

      <div className="card space-y-1">
        <p className="text-xs uppercase tracking-wide text-ink/50">Term</p>
        <h2 className="text-3xl font-bold text-accent">{card.term}</h2>
      </div>

      <div className="grid gap-2">
        {options.map((opt) => {
          let state: 'idle' | 'right' | 'wrong' = 'idle';
          if (picked) {
            if (opt === card.meaning) state = 'right';
            else if (opt === pickedAt) state = 'wrong';
          }
          return (
            <button
              key={opt}
              onClick={() => pick(opt)}
              disabled={picked}
              className={`tap text-left font-medium ${
                state === 'right'
                  ? 'bg-emerald-500 text-white'
                  : state === 'wrong'
                    ? 'bg-rose-400 text-white'
                    : 'bg-ink/5 hover:bg-ink/10'
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function buildCards(vocab: VocabularyTerm[]): Card[] {
  if (vocab.length < 4) return [];
  return shuffle(vocab).map((v) => {
    const pool = vocab.filter((other) => other.meaning !== v.meaning);
    const distractors = sample(pool, 3).map((d) => d.meaning);
    return { term: v.term, meaning: v.meaning, distractors };
  });
}

function useMemoChoices(card: Card) {
  return useMemo(
    () => shuffle([card.meaning, ...card.distractors]),
    [card],
  );
}
