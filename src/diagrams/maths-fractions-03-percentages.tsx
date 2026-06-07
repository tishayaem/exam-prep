const INK = '#0A0A0A';
const INK_SOFT = '#6B6B6B';
const PINK = '#f50aa2';
const RULE = '#E6E6E6';
const LABEL_FONT = 'Space Grotesk, system-ui, sans-serif';

const ORIGIN = 40;
const CELL = 30;
const SHADED = 30; // 30 of 100 = 30%

export function MathsPercentagesDiagram() {
  return (
    <svg
      viewBox="0 0 380 400"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="A ten by ten grid of one hundred squares. Thirty squares are shaded, showing thirty per cent."
      className="w-full h-auto max-w-[360px]"
    >
      <title>30% = 30 squares out of 100</title>

      {Array.from({ length: 100 }).map((_, i) => {
        const r = Math.floor(i / 10);
        const c = i % 10;
        return (
          <rect
            key={i}
            x={ORIGIN + c * CELL}
            y={ORIGIN + r * CELL}
            width={CELL}
            height={CELL}
            fill={i < SHADED ? PINK : RULE}
            stroke={INK}
            strokeWidth="1.5"
          />
        );
      })}

      <text x={ORIGIN + 5 * CELL} y="28" fontSize="15" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle" letterSpacing="0.04em">
        100 SQUARES
      </text>
      <text x={ORIGIN + 5 * CELL} y="376" fontSize="18" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">
        30% = 30⁄100 = 3⁄10
      </text>
    </svg>
  );
}
