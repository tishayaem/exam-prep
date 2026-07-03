import type { CubeNetFigure, Section } from '../types';

// NVR section 8 — cube nets (fold a flat net into a cube), the second spatial
// type from the roadmap §7 list. Figures are CubeNetFigure grids rendered by
// <CubeNet>; the questions stay ordinary mcq/truefalse/numeric so grading is
// untouched. Three question flavours, straight from the research
// (materials/11plus-research/non-verbal-reasoning.md §10):
//   1. does this shape fold into a cube at all? (count traps + overlap traps)
//   2. which face ends up OPPOSITE a given face? (the two-apart rule)
//   3. which faces can/can't touch? (opposite faces never share an edge)
//
// Every answer is derivable from the printed grid alone by folding it, and
// nvr-answers.test.ts does exactly that: a fold simulator re-derives each
// net's validity and opposite pairs independently, so a mis-authored net or a
// wrong stored answer fails the suite.
//
// The four symbol nets and their hand-folded opposite pairs:
//   Net A (cross)      star–moon, heart–triangle, circle–square
//   Net B (T)          square–moon, heart–triangle, star–circle
//   Net C (staircase)  star–square, moon–heart, circle–triangle
//   Net D (1-4-1)      star–circle, moon–heart, triangle–square
const NET_A_CROSS: CubeNetFigure = {
  cells: [
    [null, 'star', null],
    ['circle', 'heart', 'square'],
    [null, 'moon', null],
    [null, 'triangle', null],
  ],
};

const NET_B_TEE: CubeNetFigure = {
  cells: [
    ['square', 'heart', 'moon'],
    [null, 'star', null],
    [null, 'triangle', null],
    [null, 'circle', null],
  ],
};

const NET_C_STAIRS: CubeNetFigure = {
  cells: [
    ['star', 'moon', null, null],
    [null, 'circle', 'square', null],
    [null, null, 'heart', 'triangle'],
  ],
};

const NET_D_ARMS: CubeNetFigure = {
  cells: [
    [null, 'triangle', null, null],
    ['moon', 'star', 'heart', 'circle'],
    [null, null, 'square', null],
  ],
};

// Validity figures — all faces blank so the only question is the shape.
const BLANK_CROSS: CubeNetFigure = {
  cells: [
    [null, 'blank', null],
    ['blank', 'blank', 'blank'],
    [null, 'blank', null],
    [null, 'blank', null],
  ],
};

const BLANK_PLUS_FIVE: CubeNetFigure = {
  cells: [
    [null, 'blank', null],
    ['blank', 'blank', 'blank'],
    [null, 'blank', null],
  ],
};

const BLANK_BLOCK: CubeNetFigure = {
  cells: [
    ['blank', 'blank', 'blank'],
    ['blank', 'blank', 'blank'],
  ],
};

const BLANK_STRIP: CubeNetFigure = {
  cells: [['blank', 'blank', 'blank', 'blank', 'blank', 'blank']],
};

const BLANK_SEVEN: CubeNetFigure = {
  cells: [
    ['blank', 'blank', 'blank'],
    ['blank', 'blank', 'blank'],
    ['blank', null, null],
  ],
};

const BLANK_STAIRS: CubeNetFigure = {
  cells: [
    ['blank', 'blank', null, null],
    [null, 'blank', 'blank', null],
    [null, null, 'blank', 'blank'],
  ],
};

export const nvr08CubeNets: Section = {
  id: 'nvr-08-cube-nets',
  subject: 'non-verbal',
  pack: 'nvr-spatial',
  number: 8,
  title: 'Nets of a Cube',
  lesson: `A **net** is a cube unfolded and laid flat — six squares joined edge to edge. The test shows you the flat net and asks about the folded cube, so all the folding happens in your head. Three tools do almost every question.

**Tool 1 — count the squares first.** A cube has exactly 6 faces, so a real net has exactly 6 squares. Five squares leaves a hole; seven means squares must overlap. But careful: 6 squares is needed, not enough — a 2-by-3 block and a straight strip of 6 both FAIL, because when you fold them, squares land on top of each other while other sides stay open.

**Tool 2 — the two-apart rule.** Look for a straight line of squares in the net. When the line wraps around the cube, faces **two apart in the line end up opposite each other**. Neighbouring squares always stay neighbours — a face is never opposite the square it touches.

**Tool 3 — the leftover pair.** A cube's six faces make exactly three opposite pairs. Once the straight lines have given you two pairs, the two faces left over MUST be the third pair — no folding needed.

**The touching trick:** opposite faces never share an edge. So if two symbols are an opposite pair, a cube showing them side by side is impossible — that's how you spot the fake cube among the options.

**Show your working:** write the three pairs down before you answer, like "star–moon, heart–triangle, circle–square". Every question about the net is instant once the pairs are on paper.`,
  vocabulary: [
    { term: 'Net', meaning: 'A 3D shape unfolded and laid out flat — for a cube, six squares joined edge to edge.' },
    { term: 'Face', meaning: 'One flat surface of the cube. Each square of the net becomes one face.' },
    { term: 'Opposite faces', meaning: 'The two faces on either side of the cube that never touch. Every cube has exactly three opposite pairs.' },
    { term: 'Two-apart rule', meaning: 'In a straight line of the net, squares two apart fold to opposite sides of the cube.' },
    { term: 'Edge', meaning: 'Where two faces meet. Squares that share an edge on the net still share an edge on the cube.' },
  ],
  examples: [
    {
      title: 'Why the 2-by-3 block fails',
      body: 'Cut a 2-by-3 rectangle of six squares out of paper and try to fold it into a cube — it curls into a ring with two squares landing on the same face and two sides left open. Six squares is the right AMOUNT of paper, but a net also needs the right ARRANGEMENT. Only some layouts of six squares work (there are exactly 11).',
    },
    {
      title: 'Dice secretly use the two-apart rule',
      body: 'On a real die, opposite faces always add up to 7: 1–6, 2–5, 3–4. If you unfolded a die into a cross-shaped net, the 1 and the 6 would sit two apart in the straight line — never side by side. Next time you see a die, check: can you ever see the 1 and the 6 at the same time?',
    },
  ],
  questions: [
    {
      id: 'nvr-08-q1',
      sectionId: 'nvr-08-cube-nets',
      type: 'numeric',
      prompt: 'This net folds into a cube. How many squares does it have?',
      net: BLANK_CROSS,
      answer: '6',
      explanation: 'A cube has 6 faces, so its net has exactly 6 squares — count them: one at the top, three across the middle, two below. Counting the squares is always the first check.',
      difficulty: 1,
      reasoning: true,
      drivers: ['unfamiliar'],
      source: 'GL Spatial · Cube nets',
    },
    {
      id: 'nvr-08-q2',
      sectionId: 'nvr-08-cube-nets',
      type: 'truefalse',
      prompt: 'True or false: this net will fold up into a cube.',
      net: BLANK_CROSS,
      answer: 'True',
      explanation: 'True — this is the classic cross net. The column of four squares wraps right around the cube, and the two side squares fold up to close the last two faces. Six squares, nothing overlaps, no gaps.',
      difficulty: 1,
      reasoning: true,
      drivers: ['justify'],
      source: 'GL Spatial · Cube nets',
    },
    {
      id: 'nvr-08-q3',
      sectionId: 'nvr-08-cube-nets',
      type: 'truefalse',
      prompt: 'True or false: this net will fold up into a cube.',
      net: BLANK_PLUS_FIVE,
      answer: 'False',
      explanation: 'False — count the squares: only 5. A cube has 6 faces, so folding this leaves a hole where the sixth face should be. Always count before you start folding in your head.',
      difficulty: 1,
      reasoning: true,
      drivers: ['distractor'],
      source: 'GL Spatial · Cube nets',
    },
    {
      id: 'nvr-08-q4',
      sectionId: 'nvr-08-cube-nets',
      type: 'mcq',
      prompt: 'When this net is folded into a cube, which symbol is on the face OPPOSITE the star?',
      net: NET_A_CROSS,
      choices: ['moon', 'heart', 'triangle', 'circle'],
      answer: 'moon',
      explanation: 'The star sits in a straight column: star, heart, moon, triangle. Faces two apart in a line fold to opposite sides — star and moon are two apart, so they end up opposite. The heart is the star\'s neighbour, and neighbours can never be opposite.',
      difficulty: 1,
      reasoning: true,
      drivers: ['multi-step'],
      source: 'GL Spatial · Cube nets',
    },
    {
      id: 'nvr-08-q5',
      sectionId: 'nvr-08-cube-nets',
      type: 'mcq',
      prompt: 'When this net is folded into a cube, which symbol is on the face OPPOSITE the circle?',
      net: NET_A_CROSS,
      choices: ['square', 'heart', 'star', 'moon'],
      answer: 'square',
      explanation: 'The circle and the square are the two side arms — a straight row of three with the heart between them. Two apart in a line means opposite, so circle–square is a pair. The heart in the middle touches both, so it can\'t be opposite either one.',
      difficulty: 1,
      reasoning: true,
      drivers: ['multi-step'],
      source: 'GL Spatial · Cube nets',
      variantOf: 'nvr-08-q4',
    },
    {
      id: 'nvr-08-q6',
      sectionId: 'nvr-08-cube-nets',
      type: 'truefalse',
      prompt: 'This shape is made of exactly 6 squares. True or false: it will fold up into a cube.',
      net: BLANK_BLOCK,
      answer: 'False',
      explanation: 'False — 6 squares is the right amount but the wrong arrangement. Fold the 2-by-3 block and the squares curl round into a ring: two land on the same face while two sides of the cube stay open. Right count, wrong shape.',
      difficulty: 2,
      reasoning: true,
      drivers: ['distractor', 'justify'],
      source: 'GL Spatial · Cube nets',
    },
    {
      id: 'nvr-08-q7',
      sectionId: 'nvr-08-cube-nets',
      type: 'truefalse',
      prompt: 'True or false: this strip of 6 squares will fold up into a cube.',
      net: BLANK_STRIP,
      answer: 'False',
      explanation: 'False — a straight strip only ever wraps around four sides. It goes round and round like a tube: the last two squares land on faces already covered, and the two ends of the tube never get a face at all.',
      difficulty: 2,
      reasoning: true,
      drivers: ['distractor', 'justify'],
      source: 'GL Spatial · Cube nets',
      variantOf: 'nvr-08-q6',
    },
    {
      id: 'nvr-08-q8',
      sectionId: 'nvr-08-cube-nets',
      type: 'mcq',
      prompt: 'When this net is folded into a cube, which symbol is on the face OPPOSITE the heart?',
      net: NET_B_TEE,
      choices: ['triangle', 'star', 'moon', 'square'],
      answer: 'triangle',
      explanation: 'Read the column: heart, star, triangle, circle. Two apart in a straight line means opposite — heart and triangle are two apart, so heart–triangle is a pair. The star sits between them, touching both.',
      difficulty: 2,
      reasoning: true,
      drivers: ['multi-step'],
      source: 'GL Spatial · Cube nets',
      variantOf: 'nvr-08-q4',
    },
    {
      id: 'nvr-08-q9',
      sectionId: 'nvr-08-cube-nets',
      type: 'mcq',
      prompt: 'When this net is folded into a cube, which symbol is on the face OPPOSITE the moon?',
      net: NET_B_TEE,
      choices: ['square', 'heart', 'star', 'circle'],
      answer: 'square',
      explanation: 'The top row is a straight line of three: square, heart, moon. The two ends of a line of three are two apart, so square and moon fold to opposite faces, with the heart wrapped between them.',
      difficulty: 2,
      reasoning: true,
      drivers: ['multi-step'],
      source: 'GL Spatial · Cube nets',
      variantOf: 'nvr-08-q8',
    },
    {
      id: 'nvr-08-q10',
      sectionId: 'nvr-08-cube-nets',
      type: 'mcq',
      prompt: 'When this net is folded into a cube, which symbol is on the face OPPOSITE the star?',
      net: NET_B_TEE,
      choices: ['circle', 'triangle', 'heart', 'moon'],
      answer: 'circle',
      explanation: 'The column runs heart, star, triangle, circle. Count two along from the star: star → triangle is one, → circle is two. Star and circle are two apart, so they end up opposite.',
      difficulty: 2,
      reasoning: true,
      drivers: ['multi-step'],
      source: 'GL Spatial · Cube nets',
      variantOf: 'nvr-08-q8',
    },
    {
      id: 'nvr-08-q11',
      sectionId: 'nvr-08-cube-nets',
      type: 'truefalse',
      prompt: 'This net is folded into a cube. True or false: the star face and the moon face can share an edge.',
      net: NET_A_CROSS,
      answer: 'False',
      explanation: 'False — star and moon are two apart in the column, so they fold to OPPOSITE faces, and opposite faces never touch. A drawing of this cube showing the star and the moon side by side is impossible.',
      difficulty: 2,
      reasoning: true,
      drivers: ['justify'],
      source: 'GL Spatial · Cube nets',
    },
    {
      id: 'nvr-08-q12',
      sectionId: 'nvr-08-cube-nets',
      type: 'truefalse',
      prompt: 'This net is folded into a cube. True or false: the star face and the circle face share an edge.',
      net: NET_A_CROSS,
      answer: 'True',
      explanation: 'True — the pairs of this net are star–moon, heart–triangle and circle–square, so star and circle are NOT opposite. On a cube, any two faces that aren\'t opposite must meet along an edge.',
      difficulty: 2,
      reasoning: true,
      drivers: ['justify'],
      source: 'GL Spatial · Cube nets',
      variantOf: 'nvr-08-q11',
    },
    {
      id: 'nvr-08-q13',
      sectionId: 'nvr-08-cube-nets',
      type: 'mcq',
      prompt: 'When this net is folded into a cube, which symbol is on the face OPPOSITE the star?',
      net: NET_D_ARMS,
      choices: ['circle', 'heart', 'moon', 'triangle'],
      answer: 'circle',
      explanation: 'The long row reads moon, star, heart, circle. Two along from the star: star → heart → circle. So star and circle fold to opposite faces (and moon–heart make the row\'s other pair).',
      difficulty: 2,
      reasoning: true,
      drivers: ['multi-step'],
      source: 'GL Spatial · Cube nets',
      variantOf: 'nvr-08-q4',
    },
    {
      id: 'nvr-08-q14',
      sectionId: 'nvr-08-cube-nets',
      type: 'mcq',
      prompt: 'When this net is folded into a cube, which symbol is on the face OPPOSITE the triangle?',
      net: NET_D_ARMS,
      choices: ['square', 'star', 'moon', 'heart'],
      answer: 'square',
      explanation: 'Use the leftover trick. The row of four gives two pairs: star–circle and moon–heart. That uses up four faces — the triangle and the square are the only two left, so they MUST be the third pair. No folding needed.',
      difficulty: 3,
      reasoning: true,
      drivers: ['multi-step', 'justify'],
      source: 'GL Spatial · Cube nets',
      variantOf: 'nvr-08-q13',
    },
    {
      id: 'nvr-08-q15',
      sectionId: 'nvr-08-cube-nets',
      type: 'mcq',
      prompt: 'When this staircase net is folded into a cube, which symbol is on the face OPPOSITE the star?',
      net: NET_C_STAIRS,
      choices: ['square', 'moon', 'circle', 'heart'],
      answer: 'square',
      explanation: 'No straight line of three here, so fold it step by step: the star is the floor, the moon folds up into a wall, the circle folds over to become the roof… and the square lands on the wall facing the star. The staircase pairs are star–square, moon–heart, circle–triangle.',
      difficulty: 3,
      reasoning: true,
      drivers: ['multi-step', 'justify'],
      source: 'GL Spatial · Cube nets',
    },
    {
      id: 'nvr-08-q16',
      sectionId: 'nvr-08-cube-nets',
      type: 'mcq',
      prompt: 'When this staircase net is folded into a cube, which symbol is on the face OPPOSITE the circle?',
      net: NET_C_STAIRS,
      choices: ['triangle', 'heart', 'square', 'star'],
      answer: 'triangle',
      explanation: 'Fold the staircase in your head (or use the leftovers): star–square pair up and moon–heart pair up, which leaves circle and triangle as the third pair. In a staircase net, each face pairs with the one two steps along the diagonal.',
      difficulty: 3,
      reasoning: true,
      drivers: ['multi-step', 'justify'],
      source: 'GL Spatial · Cube nets',
      variantOf: 'nvr-08-q15',
    },
    {
      id: 'nvr-08-q17',
      sectionId: 'nvr-08-cube-nets',
      type: 'truefalse',
      prompt: 'True or false: this net will fold up into a cube.',
      net: BLANK_SEVEN,
      answer: 'False',
      explanation: 'False — count first: 7 squares. A cube only has 6 faces, so one square would have to land on top of another. Too many squares is just as impossible as too few.',
      difficulty: 3,
      reasoning: true,
      drivers: ['distractor'],
      source: 'GL Spatial · Cube nets',
      variantOf: 'nvr-08-q3',
    },
    {
      id: 'nvr-08-q18',
      sectionId: 'nvr-08-cube-nets',
      type: 'mcq',
      prompt: 'This net is folded into a cube. Which pair of faces ends up OPPOSITE each other?',
      net: NET_C_STAIRS,
      choices: ['moon and heart', 'star and moon', 'circle and square', 'heart and triangle'],
      answer: 'moon and heart',
      explanation: 'Every other pair listed touches along an edge on the net — and neighbours stay neighbours when you fold, so they can\'t be opposite. Moon and heart never touch on the net, and folding the staircase brings them to opposite faces: the pairs are star–square, moon–heart, circle–triangle.',
      difficulty: 3,
      reasoning: true,
      drivers: ['multi-step', 'distractor'],
      source: 'GL Spatial · Cube nets',
      variantOf: 'nvr-08-q15',
    },
    {
      id: 'nvr-08-q19',
      sectionId: 'nvr-08-cube-nets',
      type: 'truefalse',
      prompt: 'True or false: this staircase of 6 squares will fold up into a cube.',
      net: BLANK_STAIRS,
      answer: 'True',
      explanation: 'True — it doesn\'t look like the classic cross, but fold it step by step and every square lands on its own face: floor, walls, roof, nothing overlapping. There are 11 different nets that work, and the staircase is one of them.',
      difficulty: 3,
      reasoning: true,
      drivers: ['justify', 'unfamiliar'],
      source: 'GL Spatial · Cube nets',
      variantOf: 'nvr-08-q2',
    },
    {
      id: 'nvr-08-q20',
      sectionId: 'nvr-08-cube-nets',
      type: 'mcq',
      prompt: 'Ali folds this net into a cube. Which pair of faces can NEVER touch along an edge?',
      net: NET_A_CROSS,
      choices: ['heart and triangle', 'star and circle', 'moon and square', 'circle and heart'],
      answer: 'heart and triangle',
      explanation: 'Heart and triangle are two apart in the column, so they fold to OPPOSITE faces — and opposite faces never share an edge. Every other pair listed isn\'t opposite, so those faces must touch. This is how you spot an impossible cube: it shows an opposite pair side by side.',
      difficulty: 3,
      reasoning: true,
      drivers: ['multi-step', 'justify', 'distractor'],
      source: 'GL Spatial · Cube nets',
      variantOf: 'nvr-08-q11',
    },
  ],
  deeper: `There are exactly **11** different nets that fold into a cube — mathematicians have checked every possible arrangement of six squares (there are 35 of them, called hexominoes) and only 11 work. Try drawing squared-paper shapes of six squares and sorting them into "folds" and "fails" — the fails always either curl into a tube or stack two squares onto one face.

The two-apart rule works because a straight line of squares wraps around the cube like a belt: four squares go right round (front, bottom, back, top), so square 1 faces square 3, and square 2 faces square 4. That's also why **no face is ever opposite its neighbour** — a neighbour always folds to the side, never across. Real dice are made from nets too, always arranged so opposite faces add to 7.`,
};
