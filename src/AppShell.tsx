import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useProgress } from './lib/storage';

export function AppShell() {
  const { state } = useProgress();
  const location = useLocation();
  const onHome = location.pathname === '/';

  return (
    <div className="min-h-dvh max-w-[1180px] mx-auto px-5 sm:px-10 pb-24">
      <header className="flex items-baseline justify-between gap-4 pt-9 pb-[18px] border-b border-rule mb-8 sm:mb-10">
        <Link
          to="/"
          viewTransition
          className="flex items-center gap-3 sm:gap-4 group min-w-0"
        >
          <BrandMark />
          <span className="font-display font-bold text-lg sm:text-[19px] tracking-tight text-ink group-hover:text-neon-pink transition-colors">
            Revision
          </span>
          <span className="hidden sm:inline text-[11px] text-inkSoft font-medium uppercase tracking-[0.12em]">
            Year 5 · Science
          </span>
        </Link>
        <div className="flex items-center gap-3 sm:gap-5 text-[13px] font-semibold">
          <Stat label="Streak" value={`${state.streak.count}d`} dotClass="bg-neon-pink" />
          <Stat label="XP" value={state.xp.toLocaleString()} dotClass="bg-neon-green" />
          <Stat label="Level" value={String(levelForXp(state.xp))} dotClass="bg-neon-blue" />
        </div>
      </header>

      <main style={{ viewTransitionName: 'page-root' }}>
        <Outlet />
      </main>

      {!onHome && (
        <Link
          to="/"
          viewTransition
          className="fixed bottom-5 bg-ink text-paper rounded-full px-5 py-3 text-sm font-bold shadow-lg animate-home-button-in"
          style={{ left: '50%' }}
        >
          ← Home
        </Link>
      )}
    </div>
  );
}

function BrandMark() {
  // Four geometric markers — circle, diamond, square, circle — in the four neon
  // accents. Stands in for a logo without committing to an emoji or a glyph.
  return (
    <div className="flex items-center gap-2 shrink-0" aria-hidden>
      <span className="block w-3 h-3 rounded-full bg-neon-green" />
      <span className="block w-3 h-3 bg-neon-pink rotate-45" />
      <span className="block w-3 h-3 bg-neon-yellow" />
      <span className="block w-3 h-3 rounded-full bg-neon-blue" />
    </div>
  );
}

function Stat({
  label,
  value,
  dotClass,
}: {
  label: string;
  value: string;
  dotClass: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className={`block w-2 h-2 rounded-full ${dotClass}`} aria-hidden />
      <span className="hidden sm:inline text-inkSoft font-medium">{label}</span>
      <PopOnChange value={value} />
    </div>
  );
}

// XP → level: every 250 XP unlocks a level. Cheap, predictable, and the number
// fits in one digit until well past anything a Year 5 will hit in a sitting.
function levelForXp(xp: number): number {
  return Math.max(1, Math.floor(xp / 250) + 1);
}

/**
 * Renders a value that pops (scale keyframe) whenever it changes. Skips the
 * first render so the page doesn't pop on initial load.
 */
function PopOnChange({ value }: { value: string }) {
  const prev = useRef(value);
  const [bumps, setBumps] = useState(0);

  useEffect(() => {
    if (prev.current !== value) {
      prev.current = value;
      setBumps((b) => b + 1);
    }
  }, [value]);

  return (
    <span
      key={bumps}
      className={`font-bold tabular-nums inline-block ${bumps > 0 ? 'animate-emphasis-pop' : ''}`}
    >
      {value}
    </span>
  );
}
