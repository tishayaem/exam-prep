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
  'maths-geometry-01-q9': '2.5',
  'maths-geometry-01-q10': '320',
  'maths-geometry-01-q11': '4.5 cm',
  'maths-geometry-01-q12': '2500',
  'maths-geometry-01-q13': '1.5 kg',
  'maths-geometry-01-q14': '4.15',
  'maths-geometry-01-q15': '5',
  'maths-geometry-01-q16': '14:25',
  'maths-geometry-01-q17': '75',
  'maths-geometry-01-q18': '7',
  'maths-geometry-01-q19': '2.60',
  'maths-geometry-01-q20': '21:15',
  'maths-geometry-02-q1': '180',
  'maths-geometry-02-q2': '65',
  'maths-geometry-02-q3': '43',
  'maths-geometry-02-q4': '65',
  'maths-geometry-02-q5': '70',
  'maths-geometry-02-q6': '120',
  'maths-geometry-02-q7': 'Trapezium',
  'maths-geometry-02-q8': '9',
  'maths-geometry-02-q9': '360°',
  'maths-geometry-02-q10': 'obtuse',
  'maths-geometry-02-q11': '55',
  'maths-geometry-02-q12': '60',
  'maths-geometry-02-q13': '85',
  'maths-geometry-02-q14': '80',
  'maths-geometry-02-q15': '6',
  'maths-geometry-02-q16': '5',
  'maths-geometry-02-q17': '108',
  'maths-geometry-02-q18': '30',
  'maths-geometry-02-q19': 'Square',
  'maths-geometry-02-q20': '80',
  'maths-geometry-03-q1': '84',
  'maths-geometry-03-q2': '38',
  'maths-geometry-03-q3': '30',
  'maths-geometry-03-q4': '60',
  'maths-geometry-03-q5': '9',
  'maths-geometry-03-q6': 'Shape A',
  'maths-geometry-03-q7': '68',
  'maths-geometry-03-q8': '28',
  'maths-geometry-03-q9': '64',
  'maths-geometry-03-q10': '28',
  'maths-geometry-03-q11': '27',
  'maths-geometry-03-q12': '90',
  'maths-geometry-03-q13': '7',
  'maths-geometry-03-q14': '30',
  'maths-geometry-03-q15': '36',
  'maths-geometry-03-q16': '60',
  'maths-geometry-03-q17': '88',
  'maths-geometry-03-q18': '96',
  'maths-geometry-03-q19': '26',
  'maths-geometry-03-q20': '36',
  'maths-geometry-04-q1': '(5, 6)',
  'maths-geometry-04-q2': '(7, -3)',
  'maths-geometry-04-q3': '(-5, 3)',
  'maths-geometry-04-q4': '(5, -3)',
  'maths-geometry-04-q5': '(4, 1)',
  'maths-geometry-04-q6': 'Bottom-left',
  'maths-geometry-04-q7': '(4, 2)',
  'maths-geometry-04-q8': 'y-axis',
  'maths-geometry-04-q9': '7',
  'maths-geometry-04-q10': '(6, 7)',
  'maths-geometry-04-q11': '(3, 5)',
  'maths-geometry-04-q12': '(−3, 7)',
  'maths-geometry-04-q13': '(−2, −3)',
  'maths-geometry-04-q14': '7',
  'maths-geometry-04-q15': '(6, 2)',
  'maths-geometry-04-q16': 'Bottom-right',
  'maths-geometry-04-q17': '4',
  'maths-geometry-04-q18': '3',
  'maths-geometry-04-q19': '16',
  'maths-geometry-04-q20': '5 right, 2 down',

  // Data & Problem Solving
  'maths-data-01-q1': '6',
  'maths-data-01-q2': '5',
  'maths-data-01-q3': '11',
  'maths-data-01-q4': 'Median',
  'maths-data-01-q5': '6.5',
  'maths-data-01-q6': '13',
  'maths-data-01-q7': '8',
  'maths-data-01-q8': '90',
  'maths-data-01-q9': '10',
  'maths-data-01-q10': '22',
  'maths-data-01-q11': '5',
  'maths-data-01-q12': '3',
  'maths-data-01-q13': '7',
  'maths-data-01-q14': '36',
  'maths-data-01-q15': '13',
  'maths-data-01-q16': '1/4',
  'maths-data-01-q17': '120',
  'maths-data-01-q18': '11.2',
  'maths-data-01-q19': '20',
  'maths-data-01-q20': '7.2',
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

  // Puzzle Lab · Working Backwards (each chain re-derived and run forwards)
  'maths-puzzles-01-q1': '13', // (30 − 4) ÷ 2; check 13×2+4 = 30
  'maths-puzzles-01-q2': '7', // (16 + 5) ÷ 3; check 7×3−5 = 16
  'maths-puzzles-01-q3': 'Subtract 2, then divide by 4', // last step (+2) undone first
  'maths-puzzles-01-q4': '6', // (2.50 + 0.50) × 2; check 6→3→2.50
  'maths-puzzles-01-q5': '33', // 12 × 2 + 9; check 33−9=24, halved 12
  'maths-puzzles-01-q6': 'False', // last step first, not first step
  'maths-puzzles-01-q7': '9', // (19 + 8) ÷ 3; check 9×3−8 = 19
  'maths-puzzles-01-q8': '50', // (18 + 7) × 2; check 25 after voucher
  'maths-puzzles-01-q9': '18', // 6×2 = 12 kept = 2⁄3 of start → 18; 18→12→6
  'maths-puzzles-01-q10': '12', // one undo of the halving: 6 × 2
  'maths-puzzles-01-q11': '10', // 9×2 = 18 before park; 18−8 = 10 set off
  'maths-puzzles-01-q12': 'Day 11', // one doubling = one day before full
  'maths-puzzles-01-q13': '3', // t2 = 11−7 = 4; t1 = 7−4 = 3; 3,4,7,11,18 ✓
  'maths-puzzles-01-q14': '6.60', // paid 10−4.60 = 5.40; +1.20 reduction
  'maths-puzzles-01-q15': '72', // kept ½×⅔×¾ = ¼ of start = 18 → 72
  'maths-puzzles-01-q16': '12', // before moat 36 (= 24÷2×3); ⅓ of 36
  'maths-puzzles-01-q17': '10', // J+6 = 2(J−2) → J = 10; 16 = 2×8 ✓
  'maths-puzzles-01-q18': '£12 is 3⁄5 of her money: 12 ÷ 3 = 4, then 4 × 5 = £20', // kept fraction
  'maths-puzzles-01-q19': '60', // 17+1 = 18; +12 = 30; ×2 = 60
  'maths-puzzles-01-q20': '20', // 21−6 = 15 = ¾ of start → 20

  // Puzzle Lab · Logic & Certainty (each deduction re-derived)
  'maths-puzzles-02-q1': "No — if Maya is telling the truth, then Sam's statement is false.", // contradictory pair
  'maths-puzzles-02-q2': 'Dev', // Ben/Cara contradiction uses the one truth → Dev's denial is a lie
  'maths-puzzles-02-q3': "The tin labelled 'Mixed'", // wrong label → pure contents reveal all three
  'maths-puzzles-02-q4': 'Zef is a Knave; his friend is a Knight', // Knight saying it self-contradicts
  'maths-puzzles-02-q5': 'True', // false claim of truth → Rio's statement false
  'maths-puzzles-02-q6': 'Priti', // not Nina (given), not Omar (fish)
  'maths-puzzles-02-q7': 'Lena', // Kai < Jay and Jay ≠ last → Kai 1st, Jay 2nd
  'maths-puzzles-02-q8': 'Locker 3', // odd and not 1; blue is noise
  'maths-puzzles-02-q9': 'Flo: drums, Gus: harp, Hana: flute', // Flo banned from flute+harp → drums
  'maths-puzzles-02-q10': '3', // worst case one of each (2) + 1
  'maths-puzzles-02-q11': '4', // worst case one of each (3) + 1
  'maths-puzzles-02-q12': '4', // three colours → 4; the 10/8/6 are noise
  'maths-puzzles-02-q13': '10', // all 8 blue + 1 red + 1 = 10
  'maths-puzzles-02-q14': 'At least two children share a birthday month', // 31 > 12 months
  'maths-puzzles-02-q15':
    'No — 5 × 3 = 15 hand-ends is odd, but every handshake uses exactly two hands', // parity
  'maths-puzzles-02-q16':
    'No — each cup needs an odd number of flips, so the total needed is odd, but every move adds an even number', // 3 odds = odd vs even moves
  'maths-puzzles-02-q17': 'False', // same-colour corners removed → 32 vs 30
  'maths-puzzles-02-q18': '45', // total is invariant: 1+2+…+9
  'maths-puzzles-02-q19': '24', // rise of 1⁄12 of n equals 2 → n = 24; 6→8 heads ✓
  'maths-puzzles-02-q20': '8', // mints ≤ 12 forces toffees ≥ 8; 7 toffees fails
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
