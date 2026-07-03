const INK = '#0A0A0A';
const INK_SOFT = '#6B6B6B';
const PINK = '#f50aa2';
const BLUE = '#0185fd';
const LABEL_FONT = 'Space Grotesk, system-ui, sans-serif';

// Dashed mirror line.
function Mirror({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={BLUE} strokeWidth="1.5" strokeDasharray="4 3" />
  );
}

function Caption({ x, top, bottom }: { x: number; top: string; bottom: string }) {
  return (
    <>
      <text x={x} y={162} fontSize="13" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">
        {top}
      </text>
      <text x={x} y={180} fontSize="11" fontWeight="600" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle">
        {bottom}
      </text>
    </>
  );
}

export function MathsSymmetryDiagram() {
  return (
    <svg
      viewBox="0 0 360 195"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Three shapes and their symmetry. A square has 4 lines of symmetry (vertical, horizontal and both diagonals). An equilateral triangle has 3 lines of symmetry. A leaning parallelogram has 0 lines of symmetry but rotational symmetry of order 2 — it maps onto itself after a 180° turn."
      className="w-full h-auto max-w-[420px]"
    >
      <title>Lines of symmetry vs rotational symmetry</title>

      {/* ── Square: 4 lines of symmetry ── */}
      <rect x={26} y={56} width={68} height={68} fill="none" stroke={INK} strokeWidth="2" />
      <Mirror x1={60} y1={50} x2={60} y2={130} />
      <Mirror x1={20} y1={90} x2={100} y2={90} />
      <Mirror x1={20} y1={50} x2={100} y2={130} />
      <Mirror x1={100} y1={50} x2={20} y2={130} />
      <Caption x={60} top="4 lines" bottom="order 4" />

      {/* ── Equilateral triangle: 3 lines of symmetry ── */}
      <polygon points="180,58 218,124 142,124" fill="none" stroke={INK} strokeWidth="2" />
      <Mirror x1={180} y1={52} x2={180} y2={130} />
      <Mirror x1={142} y1={124} x2={199} y2={91} />
      <Mirror x1={218} y1={124} x2={161} y2={91} />
      <Caption x={180} top="3 lines" bottom="order 3" />

      {/* ── Parallelogram: 0 lines, but rotational order 2 ── */}
      <polygon points="278,66 332,66 322,124 268,124" fill="none" stroke={INK} strokeWidth="2" />
      {/* Rotation arrow — a ~270° arc with a head, centred on the shape. */}
      <path
        d="M 309 79.4 A 18 18 0 1 1 285 86"
        fill="none"
        stroke={PINK}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <polygon points="285,86 280,80 288,79" fill={PINK} />
      <Caption x={300} top="0 lines" bottom="order 2" />
    </svg>
  );
}
