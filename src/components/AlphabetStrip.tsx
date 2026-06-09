import { useState } from 'react';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

/**
 * Tappable A–Z line shown above letter-series/code questions (the
 * `letterStrip` flag) — the on-screen version of writing the alphabet out
 * before counting steps, which is the standard exam technique. Tapping
 * highlights a letter so positions can be marked mid-count; it is a
 * scratchpad only and never affects grading. Marks reset with the question.
 */
export function AlphabetStrip() {
  const [marked, setMarked] = useState<ReadonlySet<string>>(new Set());

  const toggle = (letter: string) =>
    setMarked((prev) => {
      const next = new Set(prev);
      if (next.has(letter)) {
        next.delete(letter);
      } else {
        next.add(letter);
      }
      return next;
    });

  return (
    <div>
      <div className="text-[11px] font-bold text-inkSoft uppercase tracking-[0.14em] mb-2">
        A–Z helper · tap to mark letters while you count
      </div>
      <div className="flex flex-wrap gap-1" aria-label="Alphabet strip">
        {LETTERS.map((letter) => (
          <button
            key={letter}
            type="button"
            aria-pressed={marked.has(letter)}
            onClick={() => toggle(letter)}
            className={`w-8 h-9 sm:w-9 sm:h-10 rounded-lg border-[1.5px] text-[14px] font-display font-bold transition-colors ${
              marked.has(letter)
                ? 'bg-neon-yellow border-ink'
                : 'bg-paper border-rule hover:border-ink'
            }`}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
}
