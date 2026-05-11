import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useProgress } from './lib/storage';

export function AppShell() {
  const { state } = useProgress();
  const location = useLocation();
  const onHome = location.pathname === '/';

  return (
    <div className="min-h-dvh max-w-3xl mx-auto px-5 pb-24">
      <header className="flex items-center justify-between py-5">
        <Link to="/" viewTransition className="flex items-center gap-2 group">
          <span className="text-2xl">📚</span>
          <span className="font-display font-bold text-xl text-ink group-hover:text-accent transition-colors">
            Exam Prep
          </span>
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <span aria-hidden>🔥</span>
            <PopOnChange value={state.streak.count} />
          </div>
          <div className="flex items-center gap-1">
            <span aria-hidden>⚡</span>
            <PopOnChange value={state.xp} />
          </div>
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

/**
 * Renders a number that pops (scale keyframe) whenever its value changes.
 * Skips the first render so the page doesn't pop on initial load.
 */
function PopOnChange({ value }: { value: number }) {
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
