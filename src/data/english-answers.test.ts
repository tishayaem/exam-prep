import { describe, it, expect } from 'vitest';
import { sectionsBySubject } from './index';
import { gradeNumeric } from '../lib/grading';

/**
 * Golden answer keys for EVERY English exercise, independently re-derived
 * from each question's prompt by a review pass — deliberately NOT copied
 * from the section files. Spellings were checked against UK conventions
 * (practise-the-verb, -ise endings), grammar against KS2 terminology, and
 * comprehension answers re-read against their passages. The section data
 * must agree with this table; editing a question's answer without updating
 * the key here fails the test, forcing a re-review.
 */
const EXPECTED: Record<string, string> = {
  // Reading & Comprehension (each re-checked against its passage)
  'english-reading-01-q1': 'on a cold evening', // lights coming on + frost + visible breath
  'english-reading-01-q2': 'She hears a sudden noise and waits to check she is safe.', // door bangs → freezes
  'english-reading-01-q3': 'a simile', // "like smoke"
  'english-reading-01-q4': '£4.70',
  'english-reading-01-q5': 'He was anxious to be sure he had enough money.',
  'english-reading-01-q6': 'He is so happy with the atlas that the rain cannot spoil it.',
  'english-reading-01-q7': 'over a mile',
  'english-reading-01-q8': 'The fences block the routes hedgehogs need to find food.',
  'english-reading-01-q9': 'to persuade readers to make their gardens hedgehog-friendly',
  'english-reading-01-q10': 'It is a low, slow, complaining rumble — not close yet.',
  'english-reading-01-q11': 'a metaphor', // no like/as — rain IS stitching
  'english-reading-01-q12': 'They flicker and then go out completely.',

  // Spelling (UK conventions)
  'english-spag-01-q1': 'necessary',
  'english-spag-01-q2': 'separate',
  'english-spag-01-q3': 'babies',
  'english-spag-01-q4': "They're", // = they are
  'english-spag-01-q5': 'definitely',
  'english-spag-01-q6': 'knives',
  'english-spag-01-q7': 'accommodation',
  'english-spag-01-q8': 'its', // possessive, no apostrophe
  'english-spag-01-q9': 'stationery', // paper, with an E
  'english-spag-01-q10': 'embarrass',
  'english-spag-01-q11': 'tomatoes',
  'english-spag-01-q12': 'rhythm',
  'english-spag-01-q13': 'effect', // noun after "a big"
  'english-spag-01-q14': 'occasionally',
  'english-spag-01-q15': 'practise', // UK verb form
  'english-spag-01-q16': 'receive',
  'english-spag-01-q17': 'mischievous',
  'english-spag-01-q18': 'Whose', // possessive
  'english-spag-01-q19': 'too', // too much
  'english-spag-01-q20': 'privilege',

  // Punctuation & Grammar
  'english-spag-02-q1': 'adverb',
  'english-spag-02-q2': 'I like apples, pears and plums.',
  'english-spag-02-q3': 'castle',
  'english-spag-02-q4': "the dog's bone", // one owner
  'english-spag-02-q5': '"Hello," said Tom.', // comma inside the speech marks
  'english-spag-02-q6': 'caught',
  'english-spag-02-q7': 'enormous', // describes the wave (quiet describes the beach)
  'english-spag-02-q8': "don't",
  'english-spag-02-q9': "the children's toys", // irregular plural → 's
  'english-spag-02-q10': 'but', // contrast
  'english-spag-02-q11': 'After we ate lunch, we played football.',
  'english-spag-02-q12': 'I', // "I went" survives alone
  'english-spag-02-q13': 'tuesday', // day of the week
  'english-spag-02-q14': 'Where did you leave your shoes',
  'english-spag-02-q15': 'The cat slept.',
  'english-spag-02-q16': 'went',
  'english-spag-02-q17': 'fewer', // countable
  'english-spag-02-q18': 'exclamation',
  'english-spag-02-q19': 'were', // plural subject
  'english-spag-02-q20': '"Watch out!" shouted Mia. "The floor is wet."',

  // Writing & Composition
  'english-writing-01-q1': 'to hook the reader so they want to read on',
  'english-writing-01-q2': 'a simile', // as ... as
  'english-writing-01-q3': 'a metaphor', // moon IS a coin
  'english-writing-01-q4':
    "Maya's fingers drummed the desk while her eyes kept flicking to the door.",
  'english-writing-01-q5': 'when the time, place or speaker changes',
  'english-writing-01-q6': 'snarled',
  'english-writing-01-q7': 'the slippery, silver snake slid past',
  'english-writing-01-q8': 'personification', // gates given human behaviour
  'english-writing-01-q9': 'The cave was dark, so we lit the torch and went in.',
  'english-writing-01-q10': 'False', // planning is never wasted
  'english-writing-01-q11': 'thud',
  'english-writing-01-q12':
    'Break it into paragraphs and vary the sentence lengths and openers.',
};

const englishQuestions = sectionsBySubject('english').flatMap((s) => s.questions);

const first = (a: string | string[]): string => (Array.isArray(a) ? a[0] : a);

// Same normalisation as the maths/VR suites.
const normMcq = (s: string): string =>
  s
    .toLowerCase()
    .replace(/⁄/g, '/')
    .replace(/[−–]/g, '-')
    .replace(/×/g, 'x')
    .replace(/[°£,\s]/g, '');

describe('English answer keys (independently reviewed)', () => {
  it('covers every English question and has no stale keys', () => {
    const ids = englishQuestions.map((q) => q.id).sort();
    expect(Object.keys(EXPECTED).sort()).toEqual(ids);
  });

  it.each(englishQuestions)('$id matches its reviewed answer', (q) => {
    const expected = EXPECTED[q.id];
    expect(expected, `no reviewed answer key for ${q.id}`).toBeDefined();
    if (q.type === 'numeric') {
      expect(
        gradeNumeric(expected, q.answer, q.acceptable),
        `${q.id}: stored "${first(q.answer)}" should grade equal to reviewed "${expected}"`,
      ).toBe(true);
    } else {
      expect(
        normMcq(first(q.answer)),
        `${q.id}: stored "${first(q.answer)}" should match reviewed "${expected}"`,
      ).toBe(normMcq(expected));
    }
  });
});
