import { Link, Outlet, useLocation } from 'react-router-dom';
import { useProgress } from './lib/storage';

export function AppShell() {
  const { state } = useProgress();
  const location = useLocation();
  const onHome = location.pathname === '/';

  return (
    <div className="min-h-dvh max-w-3xl mx-auto px-5 pb-24">
      <header className="flex items-center justify-between py-5">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl">📚</span>
          <span className="font-display font-bold text-xl text-ink group-hover:text-accent transition-colors">
            Exam Prep
          </span>
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <span aria-hidden>🔥</span>
            <span className="font-bold tabular-nums">{state.streak.count}</span>
          </div>
          <div className="flex items-center gap-1">
            <span aria-hidden>⚡</span>
            <span className="font-bold tabular-nums">{state.xp}</span>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      {!onHome && (
        <Link
          to="/"
          className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-ink text-paper rounded-full px-5 py-3 text-sm font-bold shadow-lg"
        >
          ← Home
        </Link>
      )}
    </div>
  );
}
