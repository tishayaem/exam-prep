const INK = '#0A0A0A';
const INK_SOFT = '#6B6B6B';
const GREEN = '#0cf35c';
const RULE = '#E6E6E6';
const LABEL_FONT = 'Space Grotesk, system-ui, sans-serif';

const BAR_X = 110;
const BAR_W = 432; // divisible by 2, 3, 4, 6

function Bar({ y, parts, shaded }: { y: number; parts: number; shaded: number }) {
  const seg = BAR_W / parts;
  return (
    <g>
      {Array.from({ length: parts }).map((_, i) => (
        <rect
          key={i}
          x={BAR_X + i * seg}
          y={y}
          width={seg}
          height="56"
          fill={i < shaded ? GREEN : RULE}
          stroke={INK}
          strokeWidth="2"
        />
      ))}
    </g>
  );
}

export function MathsFractionsDiagram() {
  const matchX = BAR_X + (BAR_W * 2) / 3; // where 2⁄3 and 4⁄6 both end
  return (
    <svg
      viewBox="0 0 640 250"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Two bars of equal length. The top is split into thirds with two shaded; the bottom into sixths with four shaded. The shaded parts line up, showing two thirds equals four sixths."
      className="w-full h-auto max-w-[600px]"
    >
      <title>Equivalent fractions: 2⁄3 = 4⁄6</title>

      <Bar y={50} parts={3} shaded={2} />
      <text x={BAR_X - 18} y={84} fontSize="22" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="end">2⁄3</text>

      <Bar y={140} parts={6} shaded={4} />
      <text x={BAR_X - 18} y={174} fontSize="22" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="end">4⁄6</text>

      {/* Match line — both shaded portions end here */}
      <line x1={matchX} y1="40" x2={matchX} y2="206" stroke={INK} strokeWidth="2" strokeDasharray="4 4" />
      <text x={matchX} y="232" fontSize="13" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle">same amount</text>
    </svg>
  );
}
