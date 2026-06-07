const INK = '#0A0A0A';
const INK_SOFT = '#6B6B6B';
const PINK = '#f50aa2';
const GREEN = '#0cf35c';
const YELLOW = '#fff000';
const LABEL_FONT = 'Space Grotesk, system-ui, sans-serif';

const ROW_Y = 70;
const BOX_H = 60;

function Arrow({ x1, x2, label }: { x1: number; x2: number; label?: string }) {
  const y = ROW_Y + BOX_H / 2;
  return (
    <g>
      <line x1={x1} y1={y} x2={x2 - 10} y2={y} stroke={INK} strokeWidth="2.5" />
      <polygon points={`${x2},${y} ${x2 - 11},${y - 6} ${x2 - 11},${y + 6}`} fill={INK} />
      {label && (
        <text x={(x1 + x2) / 2} y={y - 12} fontSize="14" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle">{label}</text>
      )}
    </g>
  );
}

export function MathsAlgebraDiagram() {
  const midY = ROW_Y + BOX_H / 2;
  return (
    <svg
      viewBox="0 0 640 220"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="A function machine. Input 9 goes through a times-two box to make 18, then a plus-five box to make output 23. A dashed arrow below shows running it backwards: 23 minus 5, divided by 2, gives 9."
      className="w-full h-auto max-w-[600px]"
    >
      <title>Function machine: ×2 then +5, and running it backwards</title>

      {/* Input */}
      <circle cx="55" cy={midY} r="26" fill={YELLOW} stroke={INK} strokeWidth="2" />
      <text x="55" y={midY + 6} fontSize="20" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">9</text>

      <Arrow x1={84} x2={150} />

      {/* × 2 box */}
      <rect x="150" y={ROW_Y} width="96" height={BOX_H} rx="10" fill={GREEN} stroke={INK} strokeWidth="2" />
      <text x="198" y={midY + 7} fontSize="20" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">× 2</text>

      <Arrow x1={246} x2={320} label="18" />

      {/* + 5 box */}
      <rect x="320" y={ROW_Y} width="96" height={BOX_H} rx="10" fill={GREEN} stroke={INK} strokeWidth="2" />
      <text x="368" y={midY + 7} fontSize="20" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">+ 5</text>

      <Arrow x1={416} x2={490} />

      {/* Output */}
      <circle cx="520" cy={midY} r="26" fill={PINK} stroke={INK} strokeWidth="2" />
      <text x="520" y={midY + 6} fontSize="20" fontWeight="700" fontFamily={LABEL_FONT} fill="#FFFFFF" textAnchor="middle">23</text>

      {/* Reverse path below */}
      <path d="M 520 150 Q 290 196 55 150" fill="none" stroke={PINK} strokeWidth="2.5" strokeDasharray="5 4" />
      <polygon points="55,150 67,143 67,157" fill={PINK} />
      <text x="290" y="206" fontSize="14" fontWeight="700" fontFamily={LABEL_FONT} fill={PINK} textAnchor="middle">backwards: (23 − 5) ÷ 2 = 9</text>
    </svg>
  );
}
