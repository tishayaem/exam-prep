import type { Question, Section } from '../data/types';

/**
 * The question pool for Number Sprint: quick difficulty-1 numeric maths
 * questions, drilled against the clock to train the rapid-numeracy opening
 * of the ISEB paper. The answer-shape filter matters: the sprint input uses
 * the iPad decimal keypad, which has digits, a decimal point and nothing
 * else — so answers needing a minus sign, slash or letters are excluded
 * rather than being untypeable under time pressure.
 *
 * Puzzle Lab is excluded outright: its difficulty-1 items are short riddles,
 * not bare arithmetic, and reading a two-line puzzle is the wrong tempo for
 * a 60-second sprint.
 */
export function numberSprintPool(sections: readonly Section[]): Question[] {
  return sections
    .filter((s) => s.subject === 'maths' && s.pack !== 'maths-puzzles')
    .flatMap((s) => s.questions)
    .filter(
      (q) =>
        q.type === 'numeric' &&
        q.difficulty === 1 &&
        /^[0-9.,]+$/.test(Array.isArray(q.answer) ? q.answer[0] : q.answer),
    );
}
