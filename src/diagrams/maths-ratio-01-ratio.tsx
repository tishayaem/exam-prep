const INK = '#0A0A0A';
const INK_SOFT = '#6B6B6B';
const BLUE = '#0185fd';
const YELLOW = '#fff000';
const LABEL_FONT = 'Space Grotesk, system-ui, sans-serif';

const BAR_X = 80;
const SEG = 96; // 5 parts × 96 = 480 wide
const BAR_Y = 78;
const BAR_H = 64;

export function MathsRatioDiagram() {
  return (
    <svg
      viewBox="0 0 640 220"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="A bar split into five equal parts worth twelve pounds each. Two parts (twenty-four pounds) are one colour and three parts (thirty-six pounds) another, showing the ratio two to three sharing sixty pounds."
      className="w-full h-auto max-w-[600px]"
    >
      <title>Sharing £60 in the ratio 2 : 3</title>

      {/* Group totals above */}
      <text x={BAR_X + SEG} y="56" fontSize="18" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">£24</text>
      <text x={BAR_X + 3.5 * SEG} y="56" fontSize="18" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">£36</text>

      {/* The five parts */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x={BAR_X + i * SEG} y={BAR_Y} width={SEG} height={BAR_H} fill={i < 2 ? BLUE : YELLOW} stroke={INK} strokeWidth="2" />
          <text x={BAR_X + i * SEG + SEG / 2} y={BAR_Y + 40} fontSize="15" fontWeight="700" fontFamily={LABEL_FONT} fill={i < 2 ? '#FFFFFF' : INK} textAnchor="middle">£12</text>
        </g>
      ))}

      {/* Part-count labels below */}
      <text x={BAR_X + SEG} y={BAR_Y + BAR_H + 26} fontSize="14" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle">2 parts</text>
      <text x={BAR_X + 3.5 * SEG} y={BAR_Y + BAR_H + 26} fontSize="14" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle">3 parts</text>

      <text x="320" y="210" fontSize="13" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle" letterSpacing="0.05em">
        5 PARTS = £60, SO 1 PART = £12
      </text>
    </svg>
  );
}
