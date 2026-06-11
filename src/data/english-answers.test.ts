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
  'english-reading-01-q13': 'disappeared suddenly', // one moment crossing, next only prints left
  'english-reading-01-q14': 'She moves carefully, trying not to be noticed.', // froze at the door bang → stealth
  'english-reading-01-q15': '3', // "saving his pocket money for three weeks"
  'english-reading-01-q16':
    'Eli had visited the stall before, and the man had kept his promise to save the atlas.', // "just as he had promised"
  'english-reading-01-q17': 'the size of a CD case',
  'english-reading-01-q18': 'eat the slugs that attack your lettuces', // "In return, a visiting hedgehog…"
  'english-reading-01-q19': 'The tree bows low like a servant before a powerful, royal wind.', // bent and bowed / king
  'english-reading-01-q20': 'A distant storm arrives at tea-time and knocks the electricity out.', // grumbled afar → arrived → lights gave up

  // Long fiction — the swift (each re-checked against the passage)
  'english-reading-02-q1': 'on the morning of sports day', // first line
  'english-reading-02-q2': 'Priya', // "said his sister Priya"
  'english-reading-02-q3': 'huddled against the bins',
  'english-reading-02-q4': 'a simile', // "like a dropped glove"
  'english-reading-02-q5': 'a teacher who knows about birds', // "who taught science and knew about birds"
  'english-reading-02-q6':
    "It repeats Priya's phrase to show, with a touch of humour, how calmly he reacted.", // echo of "go bananas"
  'english-reading-02-q7': '6', // "punched six holes in the lid"
  'english-reading-02-q8': 'Its legs are too short and weak to push it back into the air.',
  'english-reading-02-q9': 'untidily scattered about', // sports-day kit dropped on the grass
  'english-reading-02-q10': 'His mind is on the swift — the races have stopped mattering to him.', // "thought about the shoebox"
  'english-reading-02-q11': 'at half past three',
  'english-reading-02-q12': 'a window in the top corridor, above the playing field',
  'english-reading-02-q13': 'a sudden lurch of fear that the bird is hurt after all', // "perhaps it was injured after all"
  'english-reading-02-q14': 'a simile', // "fell like a stone"
  'english-reading-02-q15':
    '"Sliced" suggests a fast, clean, knife-sharp movement — sudden power after looking so helpless.',
  'english-reading-02-q16': 'It cuts upwards fast and sharply instead of flapping politely away.', // "did not flap away politely"
  'english-reading-02-q17': 'a metaphor', // no like/as — IS a handful of air and feathers
  'english-reading-02-q18':
    "The sky is the swift's true home — they saved the bird so it could return to the air, not to keep it safe on the ground.",
  'english-reading-02-q19':
    'bird found by the bins — shoebox in the staffroom — the races — release from the window', // morning → before races → races → 3:30
  'english-reading-02-q20':
    'A boy cares more about saving a stranded bird than about winning anything on sports day.',

  // Non-fiction (Winkie) & poetry (The Tide) — re-checked against each text
  'english-reading-03-q1': 'a carrier pigeon',
  'english-reading-03-q2': 'more than a hundred and twenty miles', // 50 is the speed, 15 the minutes
  'english-reading-03-q3':
    'The radio was dead, so there was no other way to tell anyone where they were.',
  'english-reading-03-q4': "the animals' Victoria Cross",
  'english-reading-03-q5': '32', // "thirty-two went to pigeons"
  'english-reading-03-q6': 'Pigeons were the most loveable of all the war animals.', // "loveable" — uncheckable
  'english-reading-03-q7': 'a natural, built-in ability to find the way back home', // instinct = built in
  'english-reading-03-q8': 'to inform the reader about how carrier pigeons helped in wartime',
  'english-reading-03-q9':
    'Her arrival time, the oil on her feathers and the wind direction let them calculate where the plane went down.',
  'english-reading-03-q10': 'A dramatic true story hooks the reader before the information arrives.',
  'english-reading-03-q11': 'a dog', // "a great grey dog", sustained throughout
  'english-reading-03-q12': 'its findings — things it has carried in from the sea',
  'english-reading-03-q13': 'AABB — the lines rhyme in pairs', // dog/fog, feet/retreat
  'english-reading-03-q14': 'Waves are foaming against the cliffs and slowly wearing them away.', // reading through the metaphor
  'english-reading-03-q15': 'personification', // sea given a creature's behaviour
  'english-reading-03-q16': '"it snaps and snarls and spits out spray"', // four S-sounds
  'english-reading-03-q17': 'from playful to violent and dangerous', // the "But" turn in stanza 3
  'english-reading-03-q18': 'drags them away',
  'english-reading-03-q19':
    'The sea now looks too calm and innocent to believe it was ever dangerous.',
  'english-reading-03-q20':
    'It suggests an easy, unhurried, animal stride — matching both the dog picture and the slow, steady waves.',

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
  'english-writing-01-q13': 'The scream came from the cellar.', // plants a question; the rest are warm-ups
  'english-writing-01-q14': 'Beyond the gate, the path disappeared into the mist.', // starts with WHERE
  'english-writing-01-q15': 'start a new line', // new speaker, new line
  'english-writing-01-q16': "Buster never left my side again — and I never let go of the lead.", // full-circle ending
  'english-writing-01-q17':
    'All night the wind howled in the chimney and rattled the windows in their frames.', // hearable detail
  'english-writing-01-q18': 'False', // marks are for ideas/structure/accuracy, not length
  'english-writing-01-q19': 'near the middle, after the build-up', // problem sits at the mountain's peak
  'english-writing-01-q20': 'The tense jumps from past to present — pick one and stay in it.', // was walking / am running
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
