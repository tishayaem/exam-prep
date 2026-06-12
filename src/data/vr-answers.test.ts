import { describe, it, expect } from 'vitest';
import { sectionsBySubject } from './index';
import { gradeNumeric } from '../lib/grading';

/**
 * Golden answer keys for EVERY verbal-reasoning exercise, independently
 * re-derived from each question's prompt by a review pass — deliberately NOT
 * copied from the section files. Letter series, shift codes, alphabet
 * positions, number series and sums were re-computed mechanically; word
 * puzzles (anagrams, hidden words, insert-a-letter) were re-solved by hand,
 * checking the distractors fail. The section data must agree with this
 * table; editing a question's answer without updating the key here fails the
 * test, forcing a re-review.
 */
const EXPECTED: Record<string, string> = {
  // Word Lab · Word Ladders (every rung re-checked: one letter, real word)
  'vr-wordlab-01-q1': 'Exactly one letter changes, and the new word is a real word',
  'vr-wordlab-01-q2': 'COG', // COT→COG→DOG; CUT/LOG/CAG all fail
  'vr-wordlab-01-q3': 'WARM', // WARD → WARM (D→M)
  'vr-wordlab-01-q4': 'Either CARD or WORD — both work', // CORD/WARD differ at 2 spots
  'vr-wordlab-01-q5': 'WAG → SAY', // two letters change at once
  'vr-wordlab-01-q6': 'WAY', // WAG→WAY→SAY (SAG also accepted)
  'vr-wordlab-01-q7': '3', // 3 differing positions, 1 fix per step
  'vr-wordlab-01-q8': 'LAME', // LIME→LAME (I→A); MILE is an anagram
  'vr-wordlab-01-q9': 'SOON', // MOON→SOON→SOOT (MOOT also accepted)
  'vr-wordlab-01-q10':
    'Each step changes exactly one letter, so it can fix at most one of the four differences',
  'vr-wordlab-01-q11': 'MAY', // BAY→MAY→MAN
  'vr-wordlab-01-q12': 'WARD', // WARM with M→D
  'vr-wordlab-01-q13': '4', // five words, four changes
  'vr-wordlab-01-q14': 'WISH', // FISH→WISH→WISP; FISP isn't a word
  'vr-wordlab-01-q15': 'HORSE', // 5 letters — length never changes
  'vr-wordlab-01-q16': 'True', // every step reverses
  'vr-wordlab-01-q17': 'DIRE', // anagram of RIDE, not a one-letter step
  'vr-wordlab-01-q18': 'False', // 3 differences need ≥3 steps
  'vr-wordlab-01-q19': 'PIG → WIG → WAG → WAY → SAY → STY', // all single changes
  'vr-wordlab-01-q20': 'Work backwards from the end word too, and try to meet in the middle',

  // Word Lab · Crack the Clue (anagram letters + hidden spellings re-verified)
  'vr-wordlab-02-q1': 'Rearrange the letters of the word next to them (an anagram)',
  'vr-wordlab-02-q2': 'MELON', // LEMON rearranged
  'vr-wordlab-02-q3': 'SPEAR', // PEARS rearranged
  'vr-wordlab-02-q4': 'SORE', // ROSE rearranged
  'vr-wordlab-02-q5': 'CANOE', // OCEAN rearranged
  'vr-wordlab-02-q6': 'RISEN', // SIREN rearranged
  'vr-wordlab-02-q7': 'CAT', // picni(C AT)easter
  'vr-wordlab-02-q8': 'TEN', // kit(TEN)s
  'vr-wordlab-02-q9': 'PARIS', // sto(P A RIS)ky
  'vr-wordlab-02-q10': 'TEA', // bandi(T EA)ts
  'vr-wordlab-02-q11': 'RED', // sac(RED)
  'vr-wordlab-02-q12': 'Double definition', // two meanings, no letter trick
  'vr-wordlab-02-q13': 'BAT', // animal + cricket kit
  'vr-wordlab-02-q14': 'SPRING', // season + coil
  'vr-wordlab-02-q15': 'STEP', // PETS reversed
  'vr-wordlab-02-q16': 'REWARD', // DRAWER reversed
  'vr-wordlab-02-q17': 'Hidden word', // RAIN in ext(RA IN)doors
  'vr-wordlab-02-q18': 'DANGER', // GARDEN rearranged
  'vr-wordlab-02-q19': "'a fruit'", // the definition part
  'vr-wordlab-02-q20': 'ENLIST', // LISTEN rearranged

  // Word Lab · Word Roots (each etymology checked against standard root lists)
  'vr-wordlab-03-q1': 'It lets you look at far-away things', // tele + scope
  'vr-wordlab-03-q2': 'Aquarium', // true aqua; acorn/quack/equal are lookalikes
  'vr-wordlab-03-q3': 'Carry across', // trans + port
  'vr-wordlab-03-q4': 'Giraffe', // from Arabic, no graph brick
  'vr-wordlab-03-q5': 'AUDIENCE', // the hearers
  'vr-wordlab-03-q6': 'something working badly', // mal + function
  'vr-wordlab-03-q7': 'to say beforehand', // pre + dict
  'vr-wordlab-03-q8': 'GEOGRAPHY', // geo + graphy
  'vr-wordlab-03-q9': 'sail all the way around it', // circum + navigate
  'vr-wordlab-03-q10': 'small sound — it picks up quiet sounds and makes them carry', // micro + phone
  'vr-wordlab-03-q11': "the written story of someone's life", // bio + graphy
  'vr-wordlab-03-q12': 'under the sea', // sub + marine
  'vr-wordlab-03-q13': 'MARINE', // sea soldier
  'vr-wordlab-03-q14': 'Spectacles and inspect', // spect = look
  'vr-wordlab-03-q15': 'LIGHT', // photo = light
  'vr-wordlab-03-q16': 'able to be heard', // audi + ble
  'vr-wordlab-03-q17': 'kind, and wishing others well', // bene + volent
  'vr-wordlab-03-q18': 'True', // roots decode unseen words
  'vr-wordlab-03-q19': 'EXPORT', // ex + port
  'vr-wordlab-03-q20': 'far-writing', // tele + graph

  // Letters & Spelling
  'vr-01-q1': 'k', // book/kind, walk/keen
  'vr-01-q2': 'P', // LACE + SPOON
  'vr-01-q3': 'TEAR', // firs(T EAR)
  'vr-01-q4': 'EAN', // CLEANER
  'vr-01-q5': 'flower', // sunflower
  'vr-01-q6': 'SILENT', // anagram of LISTEN
  'vr-01-q7': 't', // cart/table, flat/tip
  'vr-01-q8': 'k', // bank/kite, park/king
  'vr-01-q9': 'h', // crash/hat, march/hut
  'vr-01-q10': 'B', // RIDE + BROOM
  'vr-01-q11': 'S', // PORT + SPOT
  'vr-01-q12': 'MATE', // To(M ATE)
  'vr-01-q13': 'SEAT', // hor(SE AT)e
  'vr-01-q14': 'ITEM', // (IT EM)ily
  'vr-01-q15': 'TCH', // BUTCHER
  'vr-01-q16': 'UND', // THUNDER
  'vr-01-q17': 'bow', // rainbow
  'vr-01-q18': 'snowball',
  'vr-01-q19': 'SHORE', // anagram of HORSE
  'vr-01-q20': 'THING', // anagram of NIGHT

  // Word Meanings
  'vr-02-q1': 'courageous',
  'vr-02-q2': 'modern',
  'vr-02-q3': 'huge & enormous',
  'vr-02-q4': 'rose', // others are vegetables
  'vr-02-q5': 'quick',
  'vr-02-q6': 'mean',
  'vr-02-q7': 'start',
  'vr-02-q8': 'empty',
  'vr-02-q9': 'unwilling',
  'vr-02-q10': 'shrink',
  'vr-02-q11': 'bold',
  'vr-02-q12': 'plentiful',
  'vr-02-q13': 'start & begin',
  'vr-02-q14': 'accept & refuse',
  'vr-02-q15': 'potato & carrot', // fruits form the three
  'vr-02-q16': 'daisy & tulip', // trees form the three
  'vr-02-q17': 'sleep & eat', // ways-of-running form the three
  'vr-02-q18': 'help',
  'vr-02-q19': 'defeat',
  'vr-02-q20': 'banana', // others are tools

  // Word Logic
  'vr-03-q1': 'short',
  'vr-03-q2': 'hive',
  'vr-03-q3': 'cat',
  'vr-03-q4': 'Ben', // Tom > Sam > Ben
  'vr-03-q5': 'Carl', // Anna > Beth > Carl
  'vr-03-q6': 'night',
  'vr-03-q7': 'right',
  'vr-03-q8': 'foot',
  'vr-03-q9': 'painting', // maker → thing made
  'vr-03-q10': 'week', // unit → next bigger unit
  'vr-03-q11': 'track',
  'vr-03-q12': 'write',
  'vr-03-q13': 'frog',
  'vr-03-q14': 'foal',
  'vr-03-q15': 'Zara', // Mia > Leo > Zara
  'vr-03-q16': 'Carl', // Amy-left ⇒ Carl-right
  'vr-03-q17': 'Sam', // Priya > Jack > Sam
  'vr-03-q18': 'Saturday', // Wed +2 = Fri party, +1 = Sat
  'vr-03-q19': 'green', // green < red < blue
  'vr-03-q20': 'flower', // part → whole

  // Letters & Codes
  'vr-04-q1': 'DW', // +1 / −1
  'vr-04-q2': 'LM', // +3 / +3
  'vr-04-q3': 'EFTL', // +1 shift
  'vr-04-q4': '4, 5, 2', // alphabet positions
  'vr-04-q5': 'JK', // +3 pairs
  'vr-04-q6': 'COW', // −1 decode of DPX
  'vr-04-q7': 'GI', // +2 / +2
  'vr-04-q8': 'WD', // −1 / +1
  'vr-04-q9': 'HL', // +2 / +2
  'vr-04-q10': 'EJ', // +1 / +2
  'vr-04-q11': '3, 1, 20', // C, A, T
  'vr-04-q12': 'BED', // 2, 5, 4
  'vr-04-q13': 'NPPO', // +1 shift of MOON
  'vr-04-q14': 'EHRG', // −1 shift of FISH
  'vr-04-q15': 'TREE', // −2 decode of VTGG
  'vr-04-q16': 'GH', // +2 / +2
  'vr-04-q17': 'HS', // +2 / −2
  'vr-04-q18': 'NET', // 14, 5, 20
  'vr-04-q19': 'GT', // +2 / −2
  'vr-04-q20': 'GEAR', // −1 decode of HFBS

  // Number Reasoning
  'vr-05-q1': '19', // +4
  'vr-05-q2': '25', // squares
  'vr-05-q3': '47', // ×2 + 1
  'vr-05-q4': '31', // ×3 + 1
  'vr-05-q5': 'B', // 5 + 12 − 3 = 14
  'vr-05-q6': '5', // (6+4) ÷ 2
  'vr-05-q7': '14', // −4
  'vr-05-q8': '32', // ×2
  'vr-05-q9': '13', // Fibonacci
  'vr-05-q10': '34', // gaps double: 18 + 16
  'vr-05-q11': '25', // ×3 + 1 on 8
  'vr-05-q12': '12', // halve 24
  'vr-05-q13': '81', // square 9
  'vr-05-q14': '13', // −2
  'vr-05-q15': 'C', // 6 + 4 = 10
  'vr-05-q16': 'B', // 3×8 − 15 = 9
  'vr-05-q17': 'D', // 11 + 7 = 18
  'vr-05-q18': '22', // (20−9) × 2
  'vr-05-q19': '19', // 24 − 5
  'vr-05-q20': '24', // 12 ÷ 3 × 6
};

const vrQuestions = sectionsBySubject('verbal').flatMap((s) => s.questions);

const first = (a: string | string[]): string => (Array.isArray(a) ? a[0] : a);

// Same normalisation as the maths suite: tolerate unicode dashes/×, case,
// spaces and commas so the reviewed key can be plain ASCII.
const normMcq = (s: string): string =>
  s
    .toLowerCase()
    .replace(/⁄/g, '/')
    .replace(/[−–]/g, '-')
    .replace(/×/g, 'x')
    .replace(/[°£,\s]/g, '');

describe('verbal-reasoning answer keys (independently reviewed)', () => {
  it('covers every VR question and has no stale keys', () => {
    const ids = vrQuestions.map((q) => q.id).sort();
    expect(Object.keys(EXPECTED).sort()).toEqual(ids);
  });

  it.each(vrQuestions)('$id matches its reviewed answer', (q) => {
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
