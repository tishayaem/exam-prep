const INK = '#0A0A0A';
const INK_SOFT = '#6B6B6B';
const PINK = '#f50aa2';
const BLUE = '#0185fd';
const LABEL_FONT = 'Space Grotesk, system-ui, sans-serif';

const BASE = 240;
const UNIT = 20; // px per unit of value
const VALUES = [4, 7, 9, 7, 3]; // mean = 30 / 5 = 6
const BAR_W = 50;
const x = (i: number) => 60 + i * 80;

export function MathsStatisticsDiagram() {
  const meanY = BASE - 6 * UNIT;
  return (
    <svg
      viewBox="0 0 480 300"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="A bar chart of the values 4, 7, 9, 7 and 3. A dashed line marks the mean of 6 — the level the bars would sit at if the total were shared equally."
      className="w-full h-auto max-w-[480px]"
    >
      <title>Bar chart with the mean (6) marked</title>

      {/* Bars */}
      {VALUES.map((v, i) => (
        <g key={i}>
          <rect x={x(i)} y={BASE - v * UNIT} width={BAR_W} height={v * UNIT} fill={BLUE} stroke={INK} strokeWidth="2" />
          <text x={x(i) + BAR_W / 2} y={BASE + 22} fontSize="15" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">{v}</text>
        </g>
      ))}

      {/* Baseline */}
      <line x1="45" y1={BASE} x2="445" y2={BASE} stroke={INK} strokeWidth="2" />

      {/* Mean line */}
      <line x1="45" y1={meanY} x2="445" y2={meanY} stroke={PINK} strokeWidth="2.5" strokeDasharray="6 4" />
      <text x="392" y={meanY - 8} fontSize="14" fontWeight="700" fontFamily={LABEL_FONT} fill={PINK} textAnchor="middle">mean = 6</text>

      <text x="240" y="284" fontSize="13" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle" letterSpacing="0.04em">
        (4 + 7 + 9 + 7 + 3) ÷ 5 = 6
      </text>
    </svg>
  );
}
