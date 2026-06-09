import type { Section } from '../types';

export const nvr05Codes: Section = {
  id: 'nvr-05-codes',
  subject: 'non-verbal',
  pack: 'nvr-core',
  number: 5,
  title: 'Codes',
  lesson: `Codes questions are about **half of a real GL non-verbal paper**, so this skill pays for itself.

Each example shape comes with a two-letter code. The letters are not random: the **first letter** stands for one feature and the **second letter** for another. Your job is to crack what each letter means, then write the code for the new shape.

The method:
1. Look at the **first letters** only. Which feature do shapes sharing a first letter have in common? (Often the shape itself, sometimes shading or size.)
2. Do the same for the **second letters**.
3. Read the new shape's two features off your key and build its code.

Watch out: the features are not always in the "obvious" order — sometimes the FIRST letter is the shading and the second is the shape. And some features (like size) may change freely without being coded at all. Trust the letters, not your assumptions.`,
  vocabulary: [
    { term: 'Code', meaning: 'A pair of letters that describes a figure, one letter per feature.' },
    { term: 'Feature', meaning: 'Something codable about a figure: its shape, shading, size, rotation or dots.' },
    { term: 'Key', meaning: 'Your worked-out list of what each code letter stands for.' },
    { term: 'Uncoded feature', meaning: 'Something that varies freely without any letter tracking it — a distraction.' },
  ],
  questions: [
    {
      id: 'nvr-05-q1',
      sectionId: 'nvr-05-codes',
      type: 'mcq',
      prompt: 'Crack the code, then pick the code for the last shape.',
      choices: ['BX', 'BY', 'AX', 'AY'],
      answer: 'BX',
      nvr: {
        kind: 'code',
        codes: ['AX', 'BY', 'AY'],
        stem: [
          { shape: 'triangle', fill: 'black' },
          { shape: 'circle', fill: 'white' },
          { shape: 'triangle', fill: 'white' },
          { shape: 'circle', fill: 'black' },
        ],
      },
      explanation:
        'First letters: A goes with triangles, B with circles. Second letters: X goes with black, Y with white. The new shape is a black circle, so it is B (circle) + X (black) = BX.',
      difficulty: 1,
      source: 'GL NVR · Codes',
    },
    {
      id: 'nvr-05-q2',
      sectionId: 'nvr-05-codes',
      type: 'mcq',
      prompt: 'Crack the code, then pick the code for the last shape.',
      choices: ['GP', 'GQ', 'FP', 'FQ'],
      answer: 'GP',
      nvr: {
        kind: 'code',
        codes: ['FP', 'GQ', 'FQ'],
        stem: [
          { shape: 'square', fill: 'striped' },
          { shape: 'star', fill: 'white' },
          { shape: 'square', fill: 'white' },
          { shape: 'star', fill: 'striped' },
        ],
      },
      explanation:
        'F means square and G means star (first letters). P means striped and Q means white (second letters). A striped star is G + P = GP.',
      difficulty: 1,
      source: 'GL NVR · Codes',
      variantOf: 'nvr-05-q1',
    },
    {
      id: 'nvr-05-q3',
      sectionId: 'nvr-05-codes',
      type: 'mcq',
      prompt: 'Crack the code, then pick the code for the last shape.',
      choices: ['MS', 'MT', 'LS', 'LT'],
      answer: 'MS',
      nvr: {
        kind: 'code',
        codes: ['LS', 'MT', 'LT'],
        stem: [
          { shape: 'hexagon', size: 'lg' },
          { shape: 'diamond', size: 'sm' },
          { shape: 'hexagon', size: 'sm' },
          { shape: 'diamond', size: 'lg' },
        ],
      },
      explanation:
        'L means hexagon, M means diamond. The second letter tracks SIZE: S is large, T is small. A large diamond is M + S = MS.',
      difficulty: 2,
      source: 'GL NVR · Codes',
    },
    {
      id: 'nvr-05-q4',
      sectionId: 'nvr-05-codes',
      type: 'mcq',
      prompt: 'Crack the code, then pick the code for the last arrow.',
      choices: ['ER', 'ES', 'DR', 'DS'],
      answer: 'ER',
      nvr: {
        kind: 'code',
        codes: ['DR', 'ES', 'DS'],
        stem: [
          { shape: 'arrow', fill: 'black', rotation: 0 },
          { shape: 'arrow', fill: 'striped', rotation: 45 },
          { shape: 'arrow', fill: 'black', rotation: 45 },
          { shape: 'arrow', fill: 'striped', rotation: 0 },
        ],
      },
      explanation:
        'Every figure is an arrow, so the letters must track something else. D goes with black and E with striped; R goes with straight arrows and S with tilted ones. A striped straight arrow is E + R = ER.',
      difficulty: 2,
      source: 'GL NVR · Codes',
    },
    {
      id: 'nvr-05-q5',
      sectionId: 'nvr-05-codes',
      type: 'mcq',
      prompt: 'Crack the code, then pick the code for the last shape.',
      choices: ['KN', 'KM', 'JN', 'JM'],
      answer: 'KN',
      nvr: {
        kind: 'code',
        codes: ['JN', 'KM', 'JM'],
        stem: [
          { shape: 'flag', fill: 'black' },
          { shape: 'boot', fill: 'black', mirrored: true },
          { shape: 'flag', fill: 'black', mirrored: true },
          { shape: 'boot', fill: 'black' },
        ],
      },
      explanation:
        'J means flag and K means boot. The second letter tracks which way the shape faces: N for the normal way, M for the mirror image. The last shape is a normal boot: K + N = KN.',
      difficulty: 3,
      source: 'GL NVR · Codes',
    },
    {
      id: 'nvr-05-q6',
      sectionId: 'nvr-05-codes',
      type: 'mcq',
      prompt: 'Crack the code, then pick the code for the last shape.',
      choices: ['RY', 'RX', 'QY', 'PY'],
      answer: 'RY',
      nvr: {
        kind: 'code',
        codes: ['PX', 'QY', 'RX', 'QX'],
        stem: [
          { shape: 'pentagon', fill: 'black' },
          { shape: 'square', fill: 'grey' },
          { shape: 'circle', fill: 'black' },
          { shape: 'square', fill: 'black' },
          { shape: 'circle', fill: 'grey' },
        ],
      },
      explanation:
        'Three first letters this time: P pentagon, Q square, R circle. Second letters: X black, Y grey. A grey circle is R + Y = RY.',
      difficulty: 1,
      source: 'GL NVR · Codes',
      variantOf: 'nvr-05-q1',
    },
    {
      id: 'nvr-05-q7',
      sectionId: 'nvr-05-codes',
      type: 'mcq',
      prompt: 'Crack the code, then pick the code for the last shape.',
      choices: ['DU', 'DV', 'CU', 'CV'],
      answer: 'DU',
      nvr: {
        kind: 'code',
        codes: ['CU', 'DV', 'CV'],
        stem: [
          { shape: 'circle', dots: 1 },
          { shape: 'square', dots: 2 },
          { shape: 'circle', dots: 2 },
          { shape: 'square', dots: 1 },
        ],
      },
      explanation:
        'C means circle and D means square. The second letter counts the dots: U is one dot, V is two. A square with one dot is D + U = DU.',
      difficulty: 2,
      source: 'GL NVR · Codes',
    },
    {
      id: 'nvr-05-q8',
      sectionId: 'nvr-05-codes',
      type: 'mcq',
      prompt: 'Crack the code carefully, then pick the code for the last shape.',
      choices: ['GU', 'HU', 'GT', 'HT'],
      answer: 'GU',
      nvr: {
        kind: 'code',
        codes: ['GT', 'HU', 'HT'],
        stem: [
          { shape: 'triangle', size: 'lg' },
          { shape: 'star', size: 'sm' },
          { shape: 'triangle', size: 'sm' },
          { shape: 'star', size: 'lg' },
        ],
      },
      explanation:
        'Trap: here the FIRST letter is the size (G large, H small) and the SECOND letter is the shape (T triangle, U star). Check: GT and HT are both triangles — so T must mean triangle. A large star is G + U = GU.',
      difficulty: 3,
      source: 'GL NVR · Codes',
      variantOf: 'nvr-05-q3',
    },
    {
      id: 'nvr-05-q9',
      sectionId: 'nvr-05-codes',
      type: 'mcq',
      prompt: 'Crack the code, then pick the code for the last flag.',
      choices: ['AP', 'BP', 'AN', 'AQ'],
      answer: 'AP',
      nvr: {
        kind: 'code',
        codes: ['AN', 'BP', 'AQ', 'BN'],
        stem: [
          { shape: 'flag', fill: 'black', rotation: 0 },
          { shape: 'flag', fill: 'striped', rotation: 90 },
          { shape: 'flag', fill: 'black', rotation: 180 },
          { shape: 'flag', fill: 'striped', rotation: 0 },
          { shape: 'flag', fill: 'black', rotation: 90 },
        ],
      },
      explanation:
        'A means black and B means striped. The second letter is the turn: N upright, P a quarter turn, Q upside down. A black quarter-turned flag is A + P = AP.',
      difficulty: 3,
      source: 'GL NVR · Codes',
      variantOf: 'nvr-05-q4',
    },
    {
      id: 'nvr-05-q10',
      sectionId: 'nvr-05-codes',
      type: 'mcq',
      prompt: 'Crack the code, then pick the code for the last shape.',
      choices: ['TE', 'TF', 'SE', 'SF'],
      answer: 'TE',
      nvr: {
        kind: 'code',
        codes: ['SE', 'TF', 'SF'],
        stem: [
          { shape: 'star', fill: 'white' },
          { shape: 'triangle', fill: 'black' },
          { shape: 'star', fill: 'black' },
          { shape: 'triangle', fill: 'white' },
        ],
      },
      explanation:
        'S means star and T means triangle; E means white and F means black. A white triangle is T + E = TE.',
      difficulty: 1,
      source: 'GL NVR · Codes',
      variantOf: 'nvr-05-q1',
    },
    {
      id: 'nvr-05-q11',
      sectionId: 'nvr-05-codes',
      type: 'mcq',
      prompt: 'Crack the code carefully, then pick the code for the last shape.',
      choices: ['JY', 'KY', 'JX', 'KX'],
      answer: 'JY',
      nvr: {
        kind: 'code',
        codes: ['JX', 'KY', 'KX'],
        stem: [
          { shape: 'hexagon', dots: 2 },
          { shape: 'pentagon', dots: 3 },
          { shape: 'hexagon', dots: 3 },
          { shape: 'pentagon', dots: 2 },
        ],
      },
      explanation:
        'The first letter counts the dots (J two, K three) and the SECOND letter is the shape (X hexagon, Y pentagon). A pentagon with two dots is J + Y = JY.',
      difficulty: 2,
      source: 'GL NVR · Codes',
      variantOf: 'nvr-05-q7',
    },
    {
      id: 'nvr-05-q12',
      sectionId: 'nvr-05-codes',
      type: 'mcq',
      prompt: 'One feature here is NOT coded at all. Crack the code, then pick the code for the last shape.',
      choices: ['NR', 'NS', 'MR', 'MS'],
      answer: 'NR',
      nvr: {
        kind: 'code',
        codes: ['MR', 'NS', 'MS'],
        stem: [
          { shape: 'diamond', fill: 'grey', size: 'lg' },
          { shape: 'arrow', fill: 'black', size: 'sm' },
          { shape: 'diamond', fill: 'black', size: 'sm' },
          { shape: 'arrow', fill: 'grey', size: 'lg' },
        ],
      },
      explanation:
        'M means diamond, N means arrow; R means grey, S means black. The size changes from figure to figure but NO letter tracks it — it is there to distract you. A grey arrow is N + R = NR.',
      difficulty: 3,
      source: 'GL NVR · Codes',
      variantOf: 'nvr-05-q6',
    },
    {
      id: 'nvr-05-q13',
      sectionId: 'nvr-05-codes',
      type: 'mcq',
      prompt: 'Crack the code, then pick the code for the last shape.',
      choices: ['QX', 'QY', 'PX', 'PY'],
      answer: 'QX',
      nvr: {
        kind: 'code',
        codes: ['PX', 'QY', 'PY'],
        stem: [
          { shape: 'hexagon', fill: 'white' },
          { shape: 'triangle', fill: 'grey' },
          { shape: 'hexagon', fill: 'grey' },
          { shape: 'triangle', fill: 'white' },
        ],
      },
      explanation:
        'P means hexagon and Q means triangle; X means white and Y means grey. A white triangle is Q + X = QX.',
      difficulty: 1,
      source: 'GL NVR · Codes',
      variantOf: 'nvr-05-q1',
    },
    {
      id: 'nvr-05-q14',
      sectionId: 'nvr-05-codes',
      type: 'mcq',
      prompt: 'Crack the code, then pick the code for the last boot.',
      choices: ['DR', 'DS', 'CR', 'CS'],
      answer: 'DR',
      nvr: {
        kind: 'code',
        codes: ['CR', 'DS', 'CS'],
        stem: [
          { shape: 'boot', fill: 'grey', rotation: 0 },
          { shape: 'boot', fill: 'black', rotation: 90 },
          { shape: 'boot', fill: 'grey', rotation: 90 },
          { shape: 'boot', fill: 'black', rotation: 0 },
        ],
      },
      explanation:
        'All boots, so the letters track other features: C grey, D black; R upright, S quarter-turned. An upright black boot is D + R = DR.',
      difficulty: 2,
      source: 'GL NVR · Codes',
      variantOf: 'nvr-05-q4',
    },
    {
      id: 'nvr-05-q15',
      sectionId: 'nvr-05-codes',
      type: 'mcq',
      prompt: 'THREE letters this time. Crack the code, then pick the code for the last shape.',
      choices: ['TBM', 'TBL', 'SBM', 'TWM'],
      answer: 'TBM',
      nvr: {
        kind: 'code',
        codes: ['SBL', 'TWM', 'SWL', 'SBM'],
        stem: [
          { shape: 'star', fill: 'black', size: 'lg' },
          { shape: 'diamond', fill: 'white', size: 'sm' },
          { shape: 'star', fill: 'white', size: 'lg' },
          { shape: 'star', fill: 'black', size: 'sm' },
          { shape: 'diamond', fill: 'black', size: 'sm' },
        ],
      },
      explanation:
        'One letter per feature: S star / T diamond, B black / W white, L large / M small. The last shape is a small black diamond: T + B + M = TBM.',
      difficulty: 3,
      source: 'GL NVR · Codes',
      variantOf: 'nvr-05-q1',
    },
  ],
  examples: [
    {
      title: 'Work letter by letter, not shape by shape',
      body: 'Cover the second letters and ask: "what do all the A-shapes share?" Then cover the first letters and do the same. Two small puzzles are much easier than one big one.',
    },
    {
      title: 'The order trap',
      body: 'Nothing says the first letter must be the shape. If two different shapes share a first letter, that letter codes something else — size, shading or rotation. Let the evidence pick the key.',
    },
  ],
};
