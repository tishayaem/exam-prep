const INK = '#0A0A0A';
const INK_SOFT = '#6B6B6B';
const PINK = '#f50aa2';
const GREEN = '#0cf35c';
const BLUE = '#0185fd';
const RULE = '#E6E6E6';
const LABEL_FONT = 'Space Grotesk, system-ui, sans-serif';

const O = 180;
const U = 24; // px per unit
const gx = (v: number) => O + v * U;
const gy = (v: number) => O - v * U;
const RANGE = 6;

export function MathsCoordinatesDiagram() {
  const lo = gy(RANGE);
  const hi = gy(-RANGE);
  return (
    <svg
      viewBox="0 0 360 360"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="A coordinate grid. The point (5, 3) and its reflection in the y-axis, (−5, 3), are marked. Reflecting in the y-axis changes the sign of the x-coordinate but keeps y the same."
      className="w-full h-auto max-w-[360px]"
    >
      <title>Reflecting (5, 3) in the y-axis gives (−5, 3)</title>

      {/* y-axis mirror highlight */}
      <rect x={O - 6} y={lo} width="12" height={hi - lo} fill={BLUE} opacity="0.12" />

      {/* Grid lines */}
      {Array.from({ length: 2 * RANGE + 1 }).map((_, i) => {
        const v = i - RANGE;
        return (
          <g key={v}>
            <line x1={gx(v)} y1={lo} x2={gx(v)} y2={hi} stroke={RULE} strokeWidth="1" />
            <line x1={gx(-RANGE)} y1={gy(v)} x2={gx(RANGE)} y2={gy(v)} stroke={RULE} strokeWidth="1" />
          </g>
        );
      })}

      {/* Axes */}
      <line x1={gx(-RANGE)} y1={O} x2={gx(RANGE)} y2={O} stroke={INK} strokeWidth="2" />
      <line x1={O} y1={lo} x2={O} y2={hi} stroke={INK} strokeWidth="2" />
      <polygon points={`${gx(RANGE)},${O} ${gx(RANGE) - 9},${O - 5} ${gx(RANGE) - 9},${O + 5}`} fill={INK} />
      <polygon points={`${O},${lo} ${O - 5},${lo + 9} ${O + 5},${lo + 9}`} fill={INK} />
      <text x={gx(RANGE) - 4} y={O + 18} fontSize="13" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT}>x</text>
      <text x={O + 8} y={lo + 12} fontSize="13" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT}>y</text>

      {/* Dashed connector between the two points */}
      <line x1={gx(-5)} y1={gy(3)} x2={gx(5)} y2={gy(3)} stroke={INK_SOFT} strokeWidth="1.5" strokeDasharray="4 4" />

      {/* Points */}
      <circle cx={gx(5)} cy={gy(3)} r="6" fill={GREEN} stroke={INK} strokeWidth="1.5" />
      <text x={gx(5) + 4} y={gy(3) - 12} fontSize="14" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">(5, 3)</text>
      <circle cx={gx(-5)} cy={gy(3)} r="6" fill={PINK} stroke={INK} strokeWidth="1.5" />
      <text x={gx(-5) - 2} y={gy(3) - 12} fontSize="14" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">(−5, 3)</text>

      <text x={O} y={hi + 4} fontSize="12" fontWeight="700" fontFamily={LABEL_FONT} fill={BLUE} textAnchor="middle">mirror in y-axis</text>
    </svg>
  );
}
