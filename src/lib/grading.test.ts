import { describe, it, expect } from 'vitest';
import { grade, gradeNumeric, gradeMatch, gradeSequence } from './grading';

describe('grade (fuzzy short-answer)', () => {
  it('accepts an exact, case-insensitive match', () => {
    expect(grade('Peach', 'Peach')).toBe('correct');
    expect(grade('peach', 'Peach')).toBe('correct');
  });

  it('accepts an answer listed in acceptable[]', () => {
    expect(grade('plum', 'Peach', ['plum', 'cherry'])).toBe('correct');
  });

  it('accepts a substring containment (typed extra words)', () => {
    expect(grade('the flesh', 'flesh')).toBe('correct');
  });

  it('flags a partial token overlap as borderline', () => {
    // intersection {cats, and} of union {cats, and, dogs, birds} = 0.5
    expect(grade('cats and birds', 'cats and dogs')).toBe('borderline');
  });

  it('rejects empty and clearly-wrong answers', () => {
    expect(grade('', 'peach')).toBe('wrong');
    expect(grade('banana', 'peach')).toBe('wrong');
  });
});

describe('gradeNumeric (exact, unit-aware)', () => {
  it('matches plain and equivalent numeric forms', () => {
    expect(gradeNumeric('42', '42')).toBe(true);
    expect(gradeNumeric('42.00', '42')).toBe(true);
    expect(gradeNumeric('1,944', '1944')).toBe(true);
  });

  it('never lets a longer number match a shorter one (the bug this type prevents)', () => {
    expect(gradeNumeric('120', '20')).toBe(false);
    expect(gradeNumeric('1', '-1')).toBe(false);
  });

  it('tolerates currency, percent and degree symbols', () => {
    expect(gradeNumeric('42', '£42')).toBe(true);
    expect(gradeNumeric('£42.00', '£42')).toBe(true);
    expect(gradeNumeric('90°', '90')).toBe(true);
    expect(gradeNumeric('55', '55%')).toBe(true);
  });

  it('compares non-decimal forms (fractions, times) as strings', () => {
    expect(gradeNumeric('7/24', '7/24')).toBe(true);
    expect(gradeNumeric('7/25', '7/24')).toBe(false);
    expect(gradeNumeric('16:55', '16:55')).toBe(true);
    expect(gradeNumeric('16:54', '16:55')).toBe(false);
  });

  it('rejects empty input and respects acceptable[] for unit forms', () => {
    expect(gradeNumeric('', '5')).toBe(false);
    expect(gradeNumeric('3.45', '3.45 kg')).toBe(false);
    expect(gradeNumeric('3.45', '3.45 kg', ['3.45'])).toBe(true);
  });
});

describe('gradeMatch', () => {
  const pairs = [
    { left: 'A', right: '1' },
    { left: 'B', right: '2' },
  ];

  it('passes only a fully correct mapping', () => {
    expect(gradeMatch({ A: '1', B: '2' }, pairs)).toBe(true);
  });

  it('fails a wrong or incomplete mapping', () => {
    expect(gradeMatch({ A: '2', B: '1' }, pairs)).toBe(false);
    expect(gradeMatch({ A: '1' }, pairs)).toBe(false);
  });
});

describe('gradeSequence', () => {
  const order = ['first', 'second', 'third'];

  it('passes the exact order', () => {
    expect(gradeSequence(['first', 'second', 'third'], order)).toBe(true);
  });

  it('fails wrong order or wrong length', () => {
    expect(gradeSequence(['second', 'first', 'third'], order)).toBe(false);
    expect(gradeSequence(['first', 'second'], order)).toBe(false);
  });
});
