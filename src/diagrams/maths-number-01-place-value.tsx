const INK = '#0A0A0A';
const INK_SOFT = '#6B6B6B';
const PINK = '#f50aa2';
const GREEN = '#0cf35c';
const RULE = '#E6E6E6';
const LABEL_FONT = 'Space Grotesk, system-ui, sans-serif';

// Maps a number-line value (−5…18) to an x coordinate.
const x = (v: number) => 70 + (v + 5) * (520 / 23);
const LINE_Y = 130;

export function MathsPlaceValueDiagram() {
  const ticks = [-5, 0, 5, 10, 15];
  return (
    <svg
      viewBox="0 0 640 210"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="A number line. Negative numbers sit left of zero, positive numbers right. An arc from −4 to 17 is labelled plus 21, the size of the rise."
      className="w-full h-auto max-w-[600px]"
    >
      <title>Number line: the rise from −4 to 17 is +21</title>

      {/* Negative region tint (left of zero) */}
      <rect x={x(-5)} y={LINE_Y - 14} width={x(0) - x(-5)} height="28" fill={RULE} opacity="0.7" />

      {/* The line with end arrows */}
      <line x1={x(-5)} y1={LINE_Y} x2={x(18)} y2={LINE_Y} stroke={INK} strokeWidth="2.5" />
      <polygon points={`${x(-5)},${LINE_Y} ${x(-5) + 11},${LINE_Y - 6} ${x(-5) + 11},${LINE_Y + 6}`} fill={INK} />
      <polygon points={`${x(18)},${LINE_Y} ${x(18) - 11},${LINE_Y - 6} ${x(18) - 11},${LINE_Y + 6}`} fill={INK} />

      {/* Major ticks */}
      {ticks.map((t) => (
        <g key={t}>
          <line x1={x(t)} y1={LINE_Y - 7} x2={x(t)} y2={LINE_Y + 7} stroke={INK} strokeWidth="2" />
          <text x={x(t)} y={LINE_Y + 28} fontSize="14" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle">{t}</text>
        </g>
      ))}

      {/* Region labels */}
      <text x={x(-2.5)} y={LINE_Y - 26} fontSize="12" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle" letterSpacing="0.08em">NEGATIVE</text>
      <text x={x(11.5)} y={LINE_Y - 26} fontSize="12" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle" letterSpacing="0.08em">POSITIVE</text>

      {/* Jump arc from −4 to 17 */}
      <path d={`M ${x(-4)} ${LINE_Y - 8} Q 330 40 ${x(17)} ${LINE_Y - 8}`} fill="none" stroke={PINK} strokeWidth="3" />
      <polygon points={`${x(17)},${LINE_Y - 6} ${x(17) - 9},${LINE_Y - 16} ${x(17) + 3},${LINE_Y - 18}`} fill={PINK} />
      <text x="330" y="48" fontSize="18" fontWeight="700" fontFamily={LABEL_FONT} fill={PINK} textAnchor="middle">+ 21</text>

      {/* Endpoints */}
      <circle cx={x(-4)} cy={LINE_Y} r="6" fill={PINK} stroke={INK} strokeWidth="1.5" />
      <circle cx={x(17)} cy={LINE_Y} r="6" fill={GREEN} stroke={INK} strokeWidth="1.5" />
      <text x={x(-4)} y={LINE_Y + 28} fontSize="14" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">−4</text>
      <text x={x(17)} y={LINE_Y + 28} fontSize="14" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">17</text>

      <text x="320" y="198" fontSize="13" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle" letterSpacing="0.05em">
        CROSS ZERO, SO ADD: 4 + 17 = 21
      </text>
    </svg>
  );
}
