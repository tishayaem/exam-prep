import { useSyncExternalStore, useCallback } from 'react';

const KEY = 'exam-prep-state-v1';

export type LeitnerLevel = 1 | 2 | 3 | 4 | 5;

export interface AttemptLog {
  id: string;
  correct: boolean;
  ts: number;
  /**
   * Pre-formatted human-readable string of what the user chose / typed,
   * used by the Mistakes list to show "You said X". Optional because old
   * entries (and contexts where it's not meaningful) won't have it.
   */
  chosen?: string;
}

export interface ProgressState {
  box: Record<string, LeitnerLevel>;
  attempts: AttemptLog[];
  xp: number;
  streak: { count: number; lastDay: string | null };
  /** Whoever is using the app. Undefined until the child sets it. */
  childName?: string;
}

const initial: ProgressState = {
  box: {},
  attempts: [],
  xp: 0,
  streak: { count: 0, lastDay: null },
};

function load(): ProgressState {
  if (typeof window === 'undefined') return initial;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return initial;
    const parsed = JSON.parse(raw);
    return { ...initial, ...parsed };
  } catch {
    return initial;
  }
}

let memo: ProgressState = load();
const subs = new Set<() => void>();

function persist() {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(memo));
  } catch {
    // localStorage might be unavailable (private mode); silently no-op.
  }
}

function emit() {
  subs.forEach((fn) => fn());
}

function set(updater: (s: ProgressState) => ProgressState) {
  memo = updater(memo);
  persist();
  emit();
}

const subscribe = (cb: () => void) => {
  subs.add(cb);
  return () => {
    subs.delete(cb);
  };
};

const getSnapshot = () => memo;

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function recordStreak(s: ProgressState): ProgressState {
  const today = todayKey();
  if (s.streak.lastDay === today) return s;
  const y = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
  const count = s.streak.lastDay === y ? s.streak.count + 1 : 1;
  return { ...s, streak: { count, lastDay: today } };
}

export function useProgress() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const recordAttempt = useCallback(
    (id: string, correct: boolean, difficulty: 1 | 2 | 3, chosen?: string) => {
      set((s) => {
        const prevLevel = (s.box[id] ?? 1) as LeitnerLevel;
        const nextLevel = correct
          ? (Math.min(5, prevLevel + 1) as LeitnerLevel)
          : (Math.max(1, prevLevel - 1) as LeitnerLevel);
        const xpGained = correct ? difficulty * 2 + 1 : 0;
        const withStreak = recordStreak(s);
        const entry: AttemptLog =
          chosen !== undefined
            ? { id, correct, ts: Date.now(), chosen }
            : { id, correct, ts: Date.now() };
        return {
          ...withStreak,
          box: { ...s.box, [id]: nextLevel },
          attempts: [...s.attempts, entry].slice(-2000),
          xp: withStreak.xp + xpGained,
        };
      });
    },
    [],
  );

  const resetAll = useCallback(() => {
    set(() => ({ ...initial }));
  }, []);

  const setChildName = useCallback((name: string) => {
    const trimmed = name.trim().slice(0, 20);
    if (!trimmed) return;
    set((s) => ({ ...s, childName: trimmed }));
  }, []);

  return { state, recordAttempt, resetAll, setChildName };
}
