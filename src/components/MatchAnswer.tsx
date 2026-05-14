import { useMemo, useState } from 'react';
import { shuffle } from '../lib/shuffle';

interface Props {
  pairs: { left: string; right: string }[];
  userPairs: Record<string, string>;
  setUserPairs: (next: Record<string, string>) => void;
  locked: boolean;
  verdict: 'correct' | 'wrong' | null;
  onSubmit: () => void;
}

export function MatchAnswer({
  pairs,
  userPairs,
  setUserPairs,
  locked,
  verdict,
  onSubmit,
}: Props) {
  // Lefts stay in author order; rights shuffle once so the kid can't pattern-
  // match by row position. Shuffle is keyed off the pairs reference so a new
  // question re-shuffles, but typing on the same question doesn't.
  const lefts = useMemo(() => pairs.map((p) => p.left), [pairs]);
  const rights = useMemo(() => shuffle(pairs.map((p) => p.right)), [pairs]);

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);

  const rightOwner = useMemo(() => {
    const m: Record<string, string> = {};
    Object.entries(userPairs).forEach(([l, r]) => {
      m[r] = l;
    });
    return m;
  }, [userPairs]);

  const canonicalRight = useMemo(() => {
    const m: Record<string, string> = {};
    pairs.forEach((p) => {
      m[p.left] = p.right;
    });
    return m;
  }, [pairs]);

  function tapLeft(l: string) {
    if (locked) return;
    if (userPairs[l] !== undefined) {
      const next = { ...userPairs };
      delete next[l];
      setUserPairs(next);
      setSelectedLeft(null);
      return;
    }
    setSelectedLeft(selectedLeft === l ? null : l);
  }

  function tapRight(r: string) {
    if (locked) return;
    const owner = rightOwner[r];
    if (owner !== undefined) {
      const next = { ...userPairs };
      delete next[owner];
      setUserPairs(next);
      setSelectedLeft(null);
      return;
    }
    if (!selectedLeft) return;
    setUserPairs({ ...userPairs, [selectedLeft]: r });
    setSelectedLeft(null);
  }

  const allPaired = Object.keys(userPairs).length === lefts.length;

  function leftClass(l: string) {
    if (verdict) {
      const correct = userPairs[l] === canonicalRight[l];
      return correct
        ? 'bg-neon-green text-ink border-neon-green'
        : 'bg-neon-pink text-paper border-neon-pink';
    }
    if (selectedLeft === l) return 'bg-ink text-paper border-ink';
    if (userPairs[l] !== undefined) return 'bg-paper text-ink border-ink';
    return 'bg-paper text-ink border-rule hover:border-ink';
  }

  function rightClass(r: string) {
    const owner = rightOwner[r];
    if (verdict) {
      if (!owner) return 'bg-paper text-inkSoft border-rule';
      const correct = canonicalRight[owner] === r;
      return correct
        ? 'bg-neon-green text-ink border-neon-green'
        : 'bg-neon-pink text-paper border-neon-pink';
    }
    if (owner) return 'bg-paper text-ink border-ink';
    if (selectedLeft) return 'bg-paper text-ink border-rule hover:border-ink';
    return 'bg-paper text-inkSoft border-rule';
  }

  function badgeFor(l: string) {
    return lefts.indexOf(l) + 1;
  }

  return (
    <div className="space-y-5">
      <p className="text-[13px] text-inkSoft">
        Tap a word on the left, then tap its match on the right. Tap a paired
        item to undo it.
      </p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-3">
          {lefts.map((l) => (
            <button
              key={l}
              type="button"
              disabled={locked}
              onClick={() => tapLeft(l)}
              className={`w-full text-left rounded-2xl px-4 py-3.5 text-[15px] font-medium border-[1.5px] transition-colors flex items-center gap-3 min-h-[56px] ${leftClass(
                l,
              )}`}
            >
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-neon-yellow text-ink text-[12px] font-bold tabular-nums shrink-0">
                {badgeFor(l)}
              </span>
              <span className="min-w-0">{l}</span>
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {rights.map((r) => {
            const owner = rightOwner[r];
            return (
              <button
                key={r}
                type="button"
                disabled={locked}
                onClick={() => tapRight(r)}
                className={`w-full text-left rounded-2xl px-4 py-3.5 text-[15px] font-medium border-[1.5px] transition-colors flex items-center gap-3 min-h-[56px] ${rightClass(
                  r,
                )}`}
              >
                <span
                  className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-[12px] font-bold tabular-nums shrink-0 ${
                    owner ? 'bg-neon-yellow text-ink' : 'bg-off text-inkSoft'
                  }`}
                >
                  {owner ? badgeFor(owner) : '·'}
                </span>
                <span className="min-w-0">{r}</span>
              </button>
            );
          })}
        </div>
      </div>

      {!locked && (
        <button
          type="button"
          onClick={onSubmit}
          disabled={!allPaired}
          className="bg-ink text-paper rounded-2xl px-7 py-4 font-bold disabled:opacity-30"
        >
          Check ›
        </button>
      )}
    </div>
  );
}
