const INK = '#0A0A0A';
const INK_SOFT = '#6B6B6B';
const PINK = '#f50aa2';
const BLUE = '#0185fd';
const LABEL_FONT = 'Space Grotesk, system-ui, sans-serif';

const LINE_Y = 120;
const X0 = 50;
const X1 = 430;
const STOPS = [
  { at: 0, word: 'Impossible', frac: '0', pct: '0%' },
  { at: 0.25, word: 'Unlikely', frac: '1/4', pct: '25%' },
  { at: 0.5, word: 'Evens', frac: '1/2', pct: '50%' },
  { at: 0.75, word: 'Likely', frac: '3/4', pct: '75%' },
  { at: 1, word: 'Certain', frac: '1', pct: '100%' },
];
const x = (p: number) => X0 + p * (X1 - X0);

export function MathsProbabilityDiagram() {
  return (
    <svg
      viewBox="0 0 480 220"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="The probability scale from 0 to 1: impossible at 0, unlikely at one quarter, evens at one half, likely at three quarters and certain at 1, each shown as a fraction and a percentage."
      className="w-full h-auto max-w-[480px]"
    >
      <title>The probability scale from 0 (impossible) to 1 (certain)</title>

      {/* Scale line */}
      <line x1={X0} y1={LINE_Y} x2={X1} y2={LINE_Y} stroke={INK} strokeWidth="3" />

      {STOPS.map((s) => (
        <g key={s.at}>
          <line x1={x(s.at)} y1={LINE_Y - 10} x2={x(s.at)} y2={LINE_Y + 10} stroke={INK} strokeWidth="3" />
          {/* Word above, angled slightly apart by staggering heights */}
          <text x={x(s.at)} y={s.at === 0.5 ? 78 : 96} fontSize="14" fontWeight="700" fontFamily={LABEL_FONT} fill={s.at === 0.5 ? PINK : INK} textAnchor="middle">
            {s.word}
          </text>
          {/* Fraction + percentage below */}
          <text x={x(s.at)} y={LINE_Y + 34} fontSize="15" fontWeight="700" fontFamily={LABEL_FONT} fill={BLUE} textAnchor="middle">
            {s.frac}
          </text>
          <text x={x(s.at)} y={LINE_Y + 54} fontSize="13" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle">
            {s.pct}
          </text>
        </g>
      ))}

      {/* Evens marker */}
      <circle cx={x(0.5)} cy={LINE_Y} r="7" fill={PINK} stroke={INK} strokeWidth="2" />

      <text x="240" y="204" fontSize="13" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle" letterSpacing="0.04em">
        Every probability lives between 0 and 1
      </text>
    </svg>
  );
}
