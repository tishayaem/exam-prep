import { useMemo } from 'react';
import { shuffle } from '../lib/shuffle';

interface Props {
  items: string[]; // canonical order
  userOrder: string[]; // items in user-tap order
  setUserOrder: (next: string[]) => void;
  locked: boolean;
  verdict: 'correct' | 'wrong' | null;
  onSubmit: () => void;
}

export function SequenceAnswer({
  items,
  userOrder,
  setUserOrder,
  locked,
  verdict,
  onSubmit,
}: Props) {
  const display = useMemo(() => shuffle(items), [items]);

  function tap(item: string) {
    if (locked) return;
    if (userOrder.includes(item)) {
      setUserOrder(userOrder.filter((i) => i !== item));
      return;
    }
    setUserOrder([...userOrder, item]);
  }

  const allOrdered = userOrder.length === items.length;

  function badgeFor(item: string) {
    const i = userOrder.indexOf(item);
    return i >= 0 ? i + 1 : null;
  }

  function classFor(item: string) {
    const myPos = userOrder.indexOf(item);
    if (verdict) {
      if (myPos < 0) return 'bg-paper text-inkSoft border-rule';
      const correct = items[myPos] === item;
      return correct
        ? 'bg-neon-green text-ink border-neon-green'
        : 'bg-neon-pink text-paper border-neon-pink';
    }
    if (myPos >= 0) return 'bg-ink text-paper border-ink';
    return 'bg-paper text-ink border-rule hover:border-ink';
  }

  return (
    <div className="space-y-5">
      <p className="text-[13px] text-inkSoft">
        Tap each step in the right order. Tap a numbered step to clear it.
      </p>
      <div className="grid gap-3">
        {display.map((item) => {
          const badge = badgeFor(item);
          return (
            <button
              key={item}
              type="button"
              disabled={locked}
              onClick={() => tap(item)}
              className={`w-full text-left rounded-2xl px-4 py-4 text-[16px] font-medium border-[1.5px] transition-colors flex items-center gap-3.5 min-h-[60px] ${classFor(
                item,
              )}`}
            >
              <span
                className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-[14px] font-bold tabular-nums shrink-0 ${
                  badge !== null
                    ? 'bg-neon-yellow text-ink'
                    : 'bg-off text-inkSoft'
                }`}
              >
                {badge ?? '·'}
              </span>
              <span className="min-w-0">{item}</span>
            </button>
          );
        })}
      </div>

      {!locked && (
        <button
          type="button"
          onClick={onSubmit}
          disabled={!allOrdered}
          className="bg-ink text-paper rounded-2xl px-7 py-4 font-bold disabled:opacity-30"
        >
          Check ›
        </button>
      )}
    </div>
  );
}
