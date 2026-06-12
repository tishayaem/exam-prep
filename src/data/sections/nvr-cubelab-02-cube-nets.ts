import type { Section } from '../types';

// Cube Lab section 2 — cube nets: which six-square shapes fold into a cube,
// and which faces end up opposite each other. Net figures use the
// NvrNetFigure schema ([row, col] cells + face marks). Every net here —
// valid and impostor alike — is machine-folded by the simulator in
// nvr-answers.test.ts, which re-derives each answer (unique foldable index,
// unique impostor index, or the opposite-face pairing) from the cell data.
export const nvrCubelab02CubeNets: Section = {
  id: 'nvr-cubelab-02-cube-nets',
  subject: 'non-verbal',
  pack: 'nvr-cubelab',
  number: 2,
  title: 'Cube Nets',
  lesson: `A **net** is a cube unfolded flat — six squares that fold back up into a box. The test shows you flat shapes and asks what happens when they fold. You can't fold the screen, so you need rules instead of scissors.

**Rule 1 — six squares, but six is not enough.** Every cube net has exactly six squares, yet plenty of six-square shapes do NOT fold into a cube: their squares crash into each other and leave gaps. Six squares is the entry ticket, not the proof.

**Rule 2 — the 2×2 block is poison.** If any four squares form a 2-by-2 block anywhere in the shape, it can never fold into a cube — two squares always land on the same face. Spot a block, cross the shape out.

**Rule 3 — the skip-one rule.** In a straight strip of four squares, the strip wraps right round the cube: square 1 ends opposite square 3, and square 2 ends opposite square 4. Neighbours never end up opposite — squares that share an edge fold to faces that meet at an edge.

**Show your working:** mark the face you'd put on the bottom, then walk the others round it — "this folds up, this folds over the top…" Tracking one fold at a time beats imagining all five at once.`,
  vocabulary: [
    { term: 'Net', meaning: 'A 3-D shape unfolded flat. A cube net is six squares that fold into a cube.' },
    { term: 'Face', meaning: 'One flat side of the cube. Each square of the net becomes one face.' },
    { term: 'Opposite faces', meaning: 'Faces that never touch — like the 1 and 6 on a dice. A cube has three opposite pairs.' },
    { term: 'Overlap', meaning: 'The impostor\'s fate: two squares folding onto the SAME face, leaving the cube with holes.' },
    { term: 'Skip-one rule', meaning: 'In a strip of four, square 1 is opposite square 3, and 2 is opposite 4.' },
  ],
  examples: [
    {
      title: 'Exactly eleven',
      body: 'Out of all the ways to glue six squares together edge to edge (there are 35), exactly ELEVEN fold into a cube. Examiners love the impostors among the other 24 — especially the 2×3 block, which looks tidier than any real net and folds into a mess.',
    },
    {
      title: 'The dice check',
      body: 'On a real dice, opposite faces add up to seven: 1↔6, 2↔5, 3↔4 — and 1, 2 and 3 meet at a corner. Grab a dice and check the skip-one rule on it: it is the fastest way to FEEL why neighbours in the net stay neighbours on the cube.',
    },
  ],
  questions: [
    {
      id: 'nvr-cubelab-02-q1',
      sectionId: 'nvr-cubelab-02-cube-nets',
      type: 'mcq',
      prompt: 'How many squares does a net of a cube always have?',
      choices: ['Four', 'Six', 'Eight', 'Twelve'],
      answer: 'Six',
      explanation: 'A cube has six faces, and each square of the net becomes exactly one face — so six squares, always. (Six squares is necessary but not enough: the squares must also be arranged so they fold without crashing.)',
      difficulty: 1,
      reasoning: true,
      drivers: ['justify'],
      source: 'GL NVR · Cube nets',
    },
    {
      id: 'nvr-cubelab-02-q2',
      sectionId: 'nvr-cubelab-02-cube-nets',
      type: 'mcq',
      prompt: 'Four squares of a net sit in one straight strip. When the strip wraps round the cube, which square ends up OPPOSITE the first one?',
      choices: ['The second one', 'The third one', 'The fourth one', 'None of them — a strip cannot wrap'],
      answer: 'The third one',
      explanation: 'The strip of four wraps right round the cube like a belt: front, right, back, left. Front faces back — so square 1 is opposite square 3, and square 2 is opposite square 4. That is the skip-one rule, and it solves half of all net questions.',
      difficulty: 1,
      reasoning: true,
      drivers: ['justify'],
      source: 'GL NVR · Cube nets',
    },
    {
      id: 'nvr-cubelab-02-q3',
      sectionId: 'nvr-cubelab-02-cube-nets',
      type: 'truefalse',
      prompt: 'True or false: this tidy 2-by-3 block of six squares folds up into a perfect cube.',
      nvr: {
        kind: 'net',
        stem: [{ net: { cells: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2]] } }],
      },
      answer: 'False',
      explanation: 'It has six squares, but however you fold it, squares double up on the same face and two faces of the cube stay open. It contains a 2×2 block (four of them, in fact) — and the 2×2 block is poison. The tidiest-looking shape is the impostor.',
      difficulty: 1,
      reasoning: true,
      drivers: ['distractor'],
      source: 'GL NVR · Cube nets',
    },
    {
      id: 'nvr-cubelab-02-q4',
      sectionId: 'nvr-cubelab-02-cube-nets',
      type: 'nvr',
      prompt: 'Which of these shapes folds into a cube?',
      answer: '1',
      nvr: {
        kind: 'net',
        stem: [],
        options: [
          { net: { cells: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2]] } },
          { net: { cells: [[0, 1], [1, 0], [1, 1], [1, 2], [1, 3], [2, 1]] } },
          { net: { cells: [[0, 1], [0, 3], [1, 0], [1, 1], [1, 2], [1, 3]] } },
          { net: { cells: [[0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 1]] } },
        ],
      },
      explanation: 'B is the classic cross: a strip of four with one flap above and one below — it folds perfectly. A is the 2×3 block (poison). C has both flaps on the SAME side, so they fold onto the same face. D hides a 2×2 block in its top-right corner. Hunt for blocks first, then check the flaps.',
      difficulty: 2,
      reasoning: true,
      drivers: ['justify', 'unfamiliar'],
      source: 'GL NVR · Cube nets',
    },
    {
      id: 'nvr-cubelab-02-q5',
      sectionId: 'nvr-cubelab-02-cube-nets',
      type: 'mcq',
      prompt: 'Why can six squares in ONE straight strip never fold into a cube?',
      nvr: {
        kind: 'net',
        stem: [{ net: { cells: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5]] } }],
      },
      choices: [
        'The strip wraps round in a ring, doubling up on faces and leaving the top and bottom open',
        'A cube actually needs eight squares',
        'The strip is too long to bend that many times',
        'It can — every six-square shape folds into a cube',
      ],
      answer: 'The strip wraps round in a ring, doubling up on faces and leaving the top and bottom open',
      explanation: 'Four squares are enough to wrap right round the cube — squares 5 and 6 just lap round again onto faces already covered, while the top and bottom never get a square at all. A net needs flaps that BREAK OUT of the strip to catch those last two faces.',
      difficulty: 2,
      reasoning: true,
      drivers: ['justify', 'unfamiliar'],
      source: 'GL NVR · Cube nets',
    },
    {
      id: 'nvr-cubelab-02-q6',
      sectionId: 'nvr-cubelab-02-cube-nets',
      type: 'mcq',
      prompt: 'When this net folds into a cube, which mark ends up on the face OPPOSITE the star?',
      nvr: {
        kind: 'net',
        stem: [
          {
            net: {
              cells: [[0, 1], [1, 0], [1, 1], [1, 2], [1, 3], [2, 1]],
              marks: ['star', 'dot', 'cross', 'ring', 'stripes', 'triangle'],
            },
          },
        ],
      },
      choices: ['The dot', 'The cross', 'The triangle', 'The ring'],
      answer: 'The triangle',
      explanation: 'The star and the triangle are the two flaps of the cross — one above the strip, one below. The strip wraps round the middle of the cube, so the two flaps become the lid and the base: opposite each other. Flaps either side of a strip always pair up.',
      difficulty: 2,
      reasoning: true,
      drivers: ['multi-step'],
      source: 'GL NVR · Cube nets',
    },
    {
      id: 'nvr-cubelab-02-q7',
      sectionId: 'nvr-cubelab-02-cube-nets',
      type: 'mcq',
      prompt: 'Same cross, new marks. When it folds, which mark sits OPPOSITE the dot?',
      nvr: {
        kind: 'net',
        stem: [
          {
            net: {
              cells: [[0, 1], [1, 0], [1, 1], [1, 2], [1, 3], [2, 1]],
              marks: ['dot', 'star', 'ring', 'cross', 'triangle', 'stripes'],
            },
          },
        ],
      },
      choices: ['The star', 'The ring', 'The cross', 'The stripes'],
      answer: 'The stripes',
      explanation: 'The dot is the TOP flap this time, and the stripes are the BOTTOM flap — lid and base again, so they end up opposite. In the strip, the star pairs with the cross (skip one) and the ring pairs with the triangle.',
      difficulty: 2,
      reasoning: true,
      drivers: ['multi-step'],
      source: 'GL NVR · Cube nets',
      variantOf: 'nvr-cubelab-02-q6',
    },
    {
      id: 'nvr-cubelab-02-q8',
      sectionId: 'nvr-cubelab-02-cube-nets',
      type: 'mcq',
      prompt: 'Two squares sit side by side in a net, sharing an edge. When the net folds, can they end up on OPPOSITE faces of the cube?',
      choices: [
        'No — squares that share an edge fold to faces that meet at an edge',
        'Yes — any two squares can end up opposite',
        'Only if they are at the two ends of the net',
        'Only on very large nets',
      ],
      answer: 'No — squares that share an edge fold to faces that meet at an edge',
      explanation: 'A fold is a hinge: the shared edge of the two squares becomes a shared edge of two faces, and opposite faces of a cube never touch. So neighbours stay neighbours — which means you can instantly rule out any "opposite" option that touches your target in the net.',
      difficulty: 2,
      reasoning: true,
      drivers: ['justify'],
      source: 'GL NVR · Cube nets',
    },
    {
      id: 'nvr-cubelab-02-q9',
      sectionId: 'nvr-cubelab-02-cube-nets',
      type: 'nvr',
      prompt: 'Which of these shapes folds into a cube?',
      answer: '1',
      nvr: {
        kind: 'net',
        stem: [],
        options: [
          { net: { cells: [[0, 0], [0, 1], [0, 2], [0, 3], [1, 3], [2, 3]] } },
          { net: { cells: [[0, 0], [0, 1], [1, 1], [1, 2], [2, 2], [2, 3]] } },
          { net: { cells: [[0, 0], [0, 1], [1, 1], [1, 2], [2, 1], [2, 2]] } },
          { net: { cells: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2]] } },
        ],
      },
      explanation: 'B is the staircase net — three dominoes stepping the same way — and it folds beautifully (it is one of the eleven real nets). A\'s leg of two laps round onto a face its strip of four already covered. C\'s bottom domino doesn\'t step — it stacks straight under the middle one, making a 2×2 block. D is the poison block again.',
      difficulty: 2,
      reasoning: true,
      drivers: ['justify', 'unfamiliar'],
      source: 'GL NVR · Cube nets',
      variantOf: 'nvr-cubelab-02-q4',
    },
    {
      id: 'nvr-cubelab-02-q10',
      sectionId: 'nvr-cubelab-02-cube-nets',
      type: 'nvr',
      prompt: 'Three of these fold into a cube. Which one does NOT?',
      answer: '2',
      nvr: {
        kind: 'net',
        stem: [],
        options: [
          { net: { cells: [[0, 1], [1, 0], [1, 1], [1, 2], [1, 3], [2, 1]] } },
          { net: { cells: [[0, 0], [1, 0], [1, 1], [1, 2], [1, 3], [2, 3]] } },
          { net: { cells: [[0, 1], [0, 3], [1, 0], [1, 1], [1, 2], [1, 3]] } },
          { net: { cells: [[0, 1], [1, 0], [1, 1], [1, 2], [2, 1], [3, 1]] } },
        ],
      },
      explanation: 'C has its two flaps on the SAME side of the strip — fold the strip round and both flaps swing up to fight over the lid, leaving the base bare. A is the cross, B is the zig-zag (flaps at opposite ends, opposite sides — fine), and D is the cross standing upright. With no 2×2 block in sight, check WHERE the flaps attach.',
      difficulty: 3,
      reasoning: true,
      drivers: ['distractor', 'justify'],
      source: 'GL NVR · Cube nets',
    },
    {
      id: 'nvr-cubelab-02-q11',
      sectionId: 'nvr-cubelab-02-cube-nets',
      type: 'mcq',
      prompt: 'The staircase net, marked. When it folds into a cube, which mark is OPPOSITE the cross?',
      nvr: {
        kind: 'net',
        stem: [
          {
            net: {
              cells: [[0, 0], [0, 1], [1, 1], [1, 2], [2, 2], [2, 3]],
              marks: ['dot', 'star', 'cross', 'ring', 'triangle', 'stripes'],
            },
          },
        ],
      },
      choices: ['The ring', 'The stripes', 'The dot', 'The triangle'],
      answer: 'The stripes',
      explanation: 'No strip of four here, so start with Rule 3: the cross touches the star and the ring — neighbours, ruled out. That leaves the dot, the triangle and the stripes. Now fold a hinge at a time: the dot wraps over to pair with the ring, the star pairs with the triangle — and the last two standing, cross and stripes, must be a pair. On staircase nets, elimination plus one careful fold beats imagining the whole cube.',
      difficulty: 3,
      reasoning: true,
      drivers: ['multi-step', 'justify'],
      source: 'GL NVR · Cube nets',
    },
    {
      id: 'nvr-cubelab-02-q12',
      sectionId: 'nvr-cubelab-02-cube-nets',
      type: 'nvr',
      prompt: 'Three of these fold into a cube. Which one does NOT?',
      answer: '3',
      nvr: {
        kind: 'net',
        stem: [],
        options: [
          { net: { cells: [[0, 0], [0, 1], [1, 1], [1, 2], [1, 3], [2, 3]] } },
          { net: { cells: [[0, 1], [1, 0], [1, 1], [1, 2], [2, 1], [3, 1]] } },
          { net: { cells: [[0, 0], [0, 1], [1, 1], [1, 2], [2, 2], [2, 3]] } },
          { net: { cells: [[0, 0], [0, 1], [0, 2], [0, 3], [1, 3], [2, 3]] } },
        ],
      },
      explanation: 'D is a strip of four with a leg of two hanging off ONE end: fold it and the leg\'s second square laps round onto a face the strip already covered. A (a 2-3-1 net), B (the upright cross) and C (the staircase) are all genuine. Legs of two on the END of a long strip are repeat offenders — fold them square by square.',
      difficulty: 3,
      reasoning: true,
      drivers: ['distractor', 'justify'],
      source: 'GL NVR · Cube nets',
      variantOf: 'nvr-cubelab-02-q10',
    },
    {
      id: 'nvr-cubelab-02-q13',
      sectionId: 'nvr-cubelab-02-cube-nets',
      type: 'mcq',
      prompt: 'This net\'s flaps sit at DIFFERENT ends of the strip. When it folds, which mark is OPPOSITE the dot?',
      nvr: {
        kind: 'net',
        stem: [
          {
            net: {
              cells: [[0, 0], [1, 0], [1, 1], [1, 2], [1, 3], [2, 2]],
              marks: ['star', 'dot', 'ring', 'cross', 'stripes', 'triangle'],
            },
          },
        ],
      },
      choices: ['The cross', 'The triangle', 'The stripes', 'The ring'],
      answer: 'The cross',
      explanation: 'The dot starts the strip of four: dot, ring, cross, stripes. Skip-one says dot ↔ cross (and ring ↔ stripes). The flaps — star and triangle — pair with each other even though they hang off different columns: they are the only two faces left. The skip-one rule doesn\'t care where the flaps are.',
      difficulty: 3,
      reasoning: true,
      drivers: ['multi-step', 'justify'],
      source: 'GL NVR · Cube nets',
      variantOf: 'nvr-cubelab-02-q11',
    },
    {
      id: 'nvr-cubelab-02-q14',
      sectionId: 'nvr-cubelab-02-cube-nets',
      type: 'nvr',
      prompt: 'Which of these shapes folds into a cube?',
      answer: '1',
      nvr: {
        kind: 'net',
        stem: [],
        options: [
          { net: { cells: [[0, 0], [0, 1], [1, 1], [1, 2], [2, 1], [2, 2]] } },
          { net: { cells: [[0, 2], [1, 0], [1, 1], [1, 2], [1, 3], [2, 0]] } },
          { net: { cells: [[0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 1]] } },
          { net: { cells: [[0, 1], [0, 3], [1, 0], [1, 1], [1, 2], [1, 3]] } },
        ],
      },
      explanation: 'B is a real net: a strip of four with one flap above, one below — the flaps don\'t need to share a column, they just need to be on OPPOSITE sides of the strip. A and C both hide 2×2 blocks; D\'s flaps share the same side. The cross family is bigger than the perfect cross.',
      difficulty: 3,
      reasoning: true,
      drivers: ['justify', 'distractor'],
      source: 'GL NVR · Cube nets',
      variantOf: 'nvr-cubelab-02-q9',
    },
    {
      id: 'nvr-cubelab-02-q15',
      sectionId: 'nvr-cubelab-02-cube-nets',
      type: 'mcq',
      prompt: 'The cruellest one. When this cross folds up, which mark ends up OPPOSITE the dot?',
      nvr: {
        kind: 'net',
        stem: [
          {
            net: {
              cells: [[0, 1], [1, 0], [1, 1], [1, 2], [1, 3], [2, 1]],
              marks: ['ring', 'star', 'dot', 'triangle', 'cross', 'stripes'],
            },
          },
        ],
      },
      choices: ['The star', 'The cross', 'The ring', 'The triangle'],
      answer: 'The cross',
      explanation: 'The dot sits at the CENTRE of the cross — and the centre touches four squares: the star, the triangle, the ring and the stripes. Neighbours can\'t be opposite, so all four are out before you fold anything. The only square that doesn\'t touch the dot is the cross at the strip\'s far end — skip-one confirms it: dot, triangle, cross… opposite.',
      difficulty: 3,
      reasoning: true,
      drivers: ['distractor', 'justify'],
      source: 'GL NVR · Cube nets',
      variantOf: 'nvr-cubelab-02-q6',
    },
  ],
  deeper: `Why is the 2×2 block always fatal? Fold any 2×2 block and follow two different routes to the same corner square — round the left or over the top. The two routes land the square in two DIFFERENT places, which in the flat world of paper means it gets torn between them: it must cover two faces at once, and paper refuses.

The eleven real nets have a secret family tree: **six** are "1-4-1" (a strip of four with one flap above and one below — your cross and all its cousins), **three** are "1-3-2", **one** is the "2-2-2" staircase, and **one** is "3-3". Mathematicians found the same eleven for every cube in the universe — it is not a fact about paper, it is a fact about space.`,
};
