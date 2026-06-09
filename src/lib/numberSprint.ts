import type { Question, Section } from '../data/types';

/**
 * The question pool for Number Sprint: quick difficulty-1 numeric maths
 * questions, drilled against the clock to train the rapid-numeracy opening
 * of the ISEB paper. The answer-shape filter matters: the sprint input uses
 * the iPad decimal keypad, which has digits, a decimal point and nothing
 * else — so answers needing a minus sign, slash or letters are excluded
 * rather than being untypeable under time pressure.
 */
export function numberSprintPool(sections: readonly Section[]): Question[] {
  return sections
    .filter((s) => s.subject === 'maths')
    .flatMap((s) => s.questions)
    .filter(
      (q) =>
        q.type === 'numeric' &&
        q.difficulty === 1 &&
        /^[0-9.,]+$/.test(Array.isArray(q.answer) ? q.answer[0] : q.answer),
    );
}
