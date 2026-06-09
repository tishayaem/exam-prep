import { describe, it, expect } from 'vitest';
import { sectionsBySubject } from './index';
import { gradeNumeric } from '../lib/grading';

/**
 * Golden answer keys for EVERY maths exercise, independently re-derived from
 * each question's prompt by a review pass (five reviewers, one per pack) —
 * deliberately NOT copied from the section files. The section data must agree
 * with this table; editing a question's answer without updating the key here
 * fails the test, forcing a re-review.
 *
 * This is a second, independent source of truth, so it catches answer-key
 * typos that the self-grading checks in data.test.ts cannot (gradeNumeric
 * happily confirms a wrong-but-self-consistent answer).
 */
const EXPECTED: Record<string, string> = {
  // Number & Calculation
  'maths-number-01-q1': '400000',
  'maths-number-01-q2': '2750000',
  'maths-number-01-q3': '4,700',
  'maths-number-01-q4': '-1',
  'maths-number-01-q5': '21',
  'maths-number-01-q6': '1944',
  'maths-number-01-q7': '6',
  'maths-number-01-q8': '2,100,001',
  'maths-number-01-q9': '700000',
  'maths-number-01-q10': '38000',
  'maths-number-01-q11': '3,850',
  'maths-number-01-q12': '-5',
  'maths-number-01-q13': '-4',
  'maths-number-01-q14': '12',
  'maths-number-01-q15': '-8',
  'maths-number-01-q16': '94',
  'maths-number-01-q17': '5499',
  'maths-number-01-q18': '2',
  'maths-number-01-q19': '7',
  'maths-number-01-q20': '200,007',
  'maths-number-02-q1': '16',
  'maths-number-02-q2': '385',
  'maths-number-02-q3': '9660',
  'maths-number-02-q4': '1421',
  'maths-number-02-q5': '4653',
  'maths-number-02-q6': '32',
  'maths-number-02-q7': '63',
  'maths-number-02-q8': '(2 + 4) x 5',
  'maths-number-02-q9': '32',
  'maths-number-02-q10': '÷',
  'maths-number-02-q11': '3',
  'maths-number-02-q12': '48',
  'maths-number-02-q13': '1300',
  'maths-number-02-q14': '250',
  'maths-number-02-q15': '(3 + 2) × 8',
  'maths-number-02-q16': '96',
  'maths-number-02-q17': '38',
  'maths-number-02-q18': '43',
  'maths-number-02-q19': '(2 + 3) × 4',
  'maths-number-02-q20': '560',
  'maths-number-03-q1': '7, 14, 21',
  'maths-number-03-q2': '9',
  'maths-number-03-q3': '9',
  'maths-number-03-q4': '37',
  'maths-number-03-q5': '12',
  'maths-number-03-q6': '81',
  'maths-number-03-q7': '78',
  'maths-number-03-q8': '120',
  'maths-number-03-q9': '6',
  'maths-number-03-q10': '49',
  'maths-number-03-q11': '27',
  'maths-number-03-q12': '9',
  'maths-number-03-q13': '4',
  'maths-number-03-q14': '2 is the only even prime',
  'maths-number-03-q15': '12',
  'maths-number-03-q16': '6',
  'maths-number-03-q17': '5',
  'maths-number-03-q18': '24',
  'maths-number-03-q19': '6',
  'maths-number-03-q20': '83',

  // Fractions, Decimals & Percentages
  'maths-fractions-01-q1': '45',
  'maths-fractions-01-q2': '4/6',
  'maths-fractions-01-q3': '3/4',
  'maths-fractions-01-q4': '1 5/12',
  'maths-fractions-01-q5': '7/24',
  'maths-fractions-01-q6': '1/4',
  'maths-fractions-01-q7': '1/2',
  'maths-fractions-01-q8': '27',
  'maths-fractions-01-q9': '14',
  'maths-fractions-01-q10': '3 1/2',
  'maths-fractions-01-q11': '2/3',
  'maths-fractions-01-q12': '1/6',
  'maths-fractions-01-q13': '3/10',
  'maths-fractions-01-q14': '5/8',
  'maths-fractions-01-q15': '2/5',
  'maths-fractions-01-q16': '5/12',
  'maths-fractions-01-q17': '7/20',
  'maths-fractions-01-q18': '30',
  'maths-fractions-01-q19': '35',
  'maths-fractions-01-q20': '8',
  'maths-fractions-02-q1': '16.75',
  'maths-fractions-02-q2': '750',
  'maths-fractions-02-q3': '0.24',
  'maths-fractions-02-q4': '8',
  'maths-fractions-02-q5': '1/8',
  'maths-fractions-02-q6': '0.3',
  'maths-fractions-02-q7': '0.6',
  'maths-fractions-02-q8': '6',
  'maths-fractions-02-q9': '6.35',
  'maths-fractions-02-q10': '0.47',
  'maths-fractions-02-q11': '0.38',
  'maths-fractions-02-q12': '2',
  'maths-fractions-02-q13': '3.5',
  'maths-fractions-02-q14': '13',
  'maths-fractions-02-q15': '0.9',
  'maths-fractions-02-q16': '3/4',
  'maths-fractions-02-q17': '2.10',
  'maths-fractions-02-q18': '0.65',
  'maths-fractions-02-q19': '0.75',
  'maths-fractions-02-q20': '70',
  'maths-fractions-03-q1': '36',
  'maths-fractions-03-q2': '3/10',
  'maths-fractions-03-q3': '100',
  'maths-fractions-03-q4': '42',
  'maths-fractions-03-q5': '462',
  'maths-fractions-03-q6': '£60',
  'maths-fractions-03-q7': '25',
  'maths-fractions-03-q8': '270',
  'maths-fractions-03-q9': '30',
  'maths-fractions-03-q10': '75%',
  'maths-fractions-03-q11': '60',
  'maths-fractions-03-q12': '40.50',
  'maths-fractions-03-q13': '20',
  'maths-fractions-03-q14': '65',
  'maths-fractions-03-q15': '25',
  'maths-fractions-03-q16': '270',
  'maths-fractions-03-q17': '80',
  'maths-fractions-03-q18': 'Shop B (£20 off)',
  'maths-fractions-03-q19': '4.50',
  'maths-fractions-03-q20': '78',

  // Ratio, Proportion & Algebra
  'maths-ratio-01-q1': '£36',
  'maths-ratio-01-q2': '3 : 4',
  'maths-ratio-01-q3': '500',
  'maths-ratio-01-q4': '21',
  'maths-ratio-01-q5': '12',
  'maths-ratio-01-q6': '2',
  'maths-ratio-01-q7': '10 days',
  'maths-ratio-01-q8': '2 : 3',
  'maths-ratio-01-q9': '6',
  'maths-ratio-01-q10': '96',
  'maths-ratio-01-q11': '20',
  'maths-ratio-01-q12': '9',
  'maths-ratio-01-q13': '90',
  'maths-ratio-01-q14': '300',
  'maths-ratio-01-q15': '24',
  'maths-ratio-01-q16': '20',
  'maths-ratio-01-q17': '12',
  'maths-ratio-01-q18': '135',
  'maths-ratio-01-q19': '3 : 2',
  'maths-ratio-01-q20': '3',
  'maths-ratio-02-q1': '21',
  'maths-ratio-02-q2': '5',
  'maths-ratio-02-q3': '9',
  'maths-ratio-02-q4': '11',
  'maths-ratio-02-q5': '3n + 1',
  'maths-ratio-02-q6': '31',
  'maths-ratio-02-q7': '7',
  'maths-ratio-02-q8': '47, 95',
  'maths-ratio-02-q9': '22',
  'maths-ratio-02-q10': '21',
  'maths-ratio-02-q11': '6a',
  'maths-ratio-02-q12': '17',
  'maths-ratio-02-q13': '6',
  'maths-ratio-02-q14': '21',
  'maths-ratio-02-q15': '3n + 2',
  'maths-ratio-02-q16': '11',
  'maths-ratio-02-q17': '7',
  'maths-ratio-02-q18': '5',
  'maths-ratio-02-q19': '17',
  'maths-ratio-02-q20': '36',

  // Measurement & Geometry
  'maths-geometry-01-q1': '3.45',
  'maths-geometry-01-q2': '1500 m',
  'maths-geometry-01-q3': '1200',
  'maths-geometry-01-q4': '8',
  'maths-geometry-01-q5': '135',
  'maths-geometry-01-q6': '16:55',
  'maths-geometry-01-q7': '1 h 30 min',
  'maths-geometry-01-q8': '5.03',
  'maths-geometry-02-q1': '180',
  'maths-geometry-02-q2': '65',
  'maths-geometry-02-q3': '43',
  'maths-geometry-02-q4': '65',
  'maths-geometry-02-q5': '70',
  'maths-geometry-02-q6': '120',
  'maths-geometry-02-q7': 'Trapezium',
  'maths-geometry-02-q8': '9',
  'maths-geometry-03-q1': '84',
  'maths-geometry-03-q2': '38',
  'maths-geometry-03-q3': '30',
  'maths-geometry-03-q4': '60',
  'maths-geometry-03-q5': '9',
  'maths-geometry-03-q6': 'Shape A',
  'maths-geometry-03-q7': '68',
  'maths-geometry-03-q8': '28',
  'maths-geometry-04-q1': '(5, 6)',
  'maths-geometry-04-q2': '(7, -3)',
  'maths-geometry-04-q3': '(-5, 3)',
  'maths-geometry-04-q4': '(5, -3)',
  'maths-geometry-04-q5': '(4, 1)',
  'maths-geometry-04-q6': 'Bottom-left',

  // Data & Problem Solving
  'maths-data-01-q1': '6',
  'maths-data-01-q2': '5',
  'maths-data-01-q3': '11',
  'maths-data-01-q4': 'Median',
  'maths-data-01-q5': '6.5',
  'maths-data-01-q6': '13',
  'maths-data-01-q7': '8',
  'maths-data-01-q8': '90',
  'maths-data-02-q1': '5',
  'maths-data-02-q2': '7',
  'maths-data-02-q3': '7.50',
  'maths-data-02-q4': '24',
  'maths-data-02-q5': '25',
  'maths-data-02-q6': '40',
  'maths-data-02-q7': '75',
  'maths-data-02-q8': '11',
  'maths-data-02-q9': '6',
  'maths-data-02-q10': '3.05',
  'maths-data-02-q11': '20',
  'maths-data-02-q12': '150',
  'maths-data-02-q13': '15',
  'maths-data-02-q14': '6',
  'maths-data-02-q15': '26',
  'maths-data-02-q16': '16:25',
  'maths-data-02-q17': 'Raj',
  'maths-data-02-q18': '70',
  'maths-data-02-q19': '4',
  'maths-data-02-q20': '1400',
};

const mathsQuestions = sectionsBySubject('maths').flatMap((s) => s.questions);

const first = (a: string | string[]): string => (Array.isArray(a) ? a[0] : a);

// Normalise an MCQ choice so the reviewed key can be written in plain ASCII
// regardless of the unicode the data uses (⁄ fraction slash, − minus, × times,
// °, £, commas, spaces).
const normMcq = (s: string): string =>
  s
    .toLowerCase()
    .replace(/⁄/g, '/')
    .replace(/[−–]/g, '-')
    .replace(/×/g, 'x')
    .replace(/[°£,\s]/g, '');

describe('maths answer keys (independently reviewed)', () => {
  it('covers every maths question and has no stale keys', () => {
    const ids = mathsQuestions.map((q) => q.id).sort();
    expect(Object.keys(EXPECTED).sort()).toEqual(ids);
  });

  it.each(mathsQuestions)('$id matches its reviewed answer', (q) => {
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
