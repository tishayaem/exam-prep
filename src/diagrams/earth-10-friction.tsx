const INK = '#0A0A0A';
const INK_SOFT = '#6B6B6B';
const PINK = '#f50aa2';
const GREEN = '#0cf35c';
const BLUE = '#0185fd';
const LABEL_FONT = 'Space Grotesk, system-ui, sans-serif';

export function EarthFrictionDiagram() {
  return (
    <svg
      viewBox="0 0 720 300"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Three forces that slow things down: friction between a box and the ground, air resistance against a cyclist, and water resistance against a boat."
      className="w-full h-auto max-w-[680px]"
    >
      <title>Friction, air resistance and water resistance</title>

      {/* Panel separators */}
      <line x1="240" y1="20" x2="240" y2="280" stroke="#E6E6E6" strokeWidth="1" />
      <line x1="480" y1="20" x2="480" y2="280" stroke="#E6E6E6" strokeWidth="1" />

      {/* Panel titles */}
      <text x="120" y="38" fontSize="16" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">Friction</text>
      <text x="360" y="38" fontSize="16" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">Air resistance</text>
      <text x="600" y="38" fontSize="16" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">Water resistance</text>

      {/* ── Panel 1: Friction ──────────────────────────── */}
      {/* Rough ground */}
      <line x1="40" y1="200" x2="220" y2="200" stroke={INK} strokeWidth="2.5" />
      {Array.from({ length: 18 }, (_, i) => (
        <line key={i} x1={40 + i * 10} y1="200" x2={45 + i * 10} y2="208" stroke={INK} strokeWidth="1.5" />
      ))}

      {/* Box */}
      <rect x="85" y="150" width="70" height="50" fill={GREEN} stroke={INK} strokeWidth="2" />
      <text x="120" y="180" fontSize="12" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">box</text>

      {/* Motion arrow (right) */}
      <line x1="155" y1="130" x2="200" y2="130" stroke={PINK} strokeWidth="3" strokeLinecap="round" />
      <polygon points="200,130 190,125 190,135" fill={PINK} stroke={INK} strokeWidth="1" />
      <text x="178" y="120" fontSize="11" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">motion</text>

      {/* Friction arrow (left, opposing) */}
      <line x1="115" y1="225" x2="70" y2="225" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <polygon points="70,225 80,220 80,230" fill={INK} />
      <text x="90" y="248" fontSize="11" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle">friction opposes motion</text>

      {/* ── Panel 2: Air resistance — cyclist ──────────── */}
      {/* Ground */}
      <line x1="260" y1="220" x2="460" y2="220" stroke={INK_SOFT} strokeWidth="2" />

      {/* Cyclist — simple silhouette */}
      <g transform="translate(360, 175)">
        {/* Wheels */}
        <circle cx="-22" cy="38" r="12" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
        <circle cx="22" cy="38" r="12" fill="#FFFFFF" stroke={INK} strokeWidth="2" />
        {/* Frame */}
        <line x1="-22" y1="38" x2="0" y2="12" stroke={INK} strokeWidth="2.5" />
        <line x1="22" y1="38" x2="0" y2="12" stroke={INK} strokeWidth="2.5" />
        <line x1="22" y1="38" x2="22" y2="8" stroke={INK} strokeWidth="2.5" />
        <line x1="22" y1="8" x2="14" y2="0" stroke={INK} strokeWidth="2.5" />
        {/* Rider body */}
        <line x1="0" y1="12" x2="6" y2="-22" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        <line x1="6" y1="-22" x2="20" y2="-10" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="6" cy="-32" r="8" fill={PINK} stroke={INK} strokeWidth="2" />
      </g>

      {/* Air resistance lines hitting the front (right side of bike since it moves right) */}
      {[-30, -15, 0, 15, 30].map((dy, i) => (
        <g key={i}>
          <line x1="445" y1={170 + dy} x2="420" y2={170 + dy} stroke={INK} strokeWidth="2" strokeLinecap="round" />
          <polygon points={`420,${170 + dy} 428,${166 + dy} 428,${174 + dy}`} fill={INK} />
        </g>
      ))}

      {/* Motion arrow (cyclist going right) */}
      <line x1="280" y1="130" x2="330" y2="130" stroke={PINK} strokeWidth="3" strokeLinecap="round" />
      <polygon points="330,130 320,125 320,135" fill={PINK} stroke={INK} strokeWidth="1" />
      <text x="305" y="120" fontSize="11" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">motion</text>

      <text x="360" y="262" fontSize="11" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle">air pushes against the rider</text>

      {/* ── Panel 3: Water resistance — boat ──────────── */}
      {/* Water — wavy lines */}
      <path d="M 500 200 Q 520 192 540 200 T 580 200 T 620 200 T 660 200 T 700 200" fill="none" stroke={BLUE} strokeWidth="3" />
      <path d="M 500 218 Q 520 210 540 218 T 580 218 T 620 218 T 660 218 T 700 218" fill="none" stroke={BLUE} strokeWidth="2" opacity="0.6" />

      {/* Boat — simple hull */}
      <path d="M 540 175 L 660 175 L 640 200 L 560 200 Z" fill={GREEN} stroke={INK} strokeWidth="2" />
      {/* Boat cabin */}
      <rect x="580" y="155" width="30" height="20" fill={PINK} stroke={INK} strokeWidth="1.5" />
      {/* Mast */}
      <line x1="595" y1="155" x2="595" y2="130" stroke={INK} strokeWidth="2" />

      {/* Water resistance arrows hitting front (right side) */}
      {[-15, 0, 15].map((dy, i) => (
        <g key={i}>
          <line x1="690" y1={190 + dy} x2="668" y2={190 + dy} stroke={BLUE} strokeWidth="2.5" strokeLinecap="round" />
          <polygon points={`668,${190 + dy} 676,${186 + dy} 676,${194 + dy}`} fill={BLUE} stroke={INK} strokeWidth="1" />
        </g>
      ))}

      {/* Motion arrow */}
      <line x1="510" y1="130" x2="560" y2="130" stroke={PINK} strokeWidth="3" strokeLinecap="round" />
      <polygon points="560,130 550,125 550,135" fill={PINK} stroke={INK} strokeWidth="1" />
      <text x="535" y="120" fontSize="11" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">motion</text>

      <text x="600" y="262" fontSize="11" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle">water pushes against the boat</text>
    </svg>
  );
}
