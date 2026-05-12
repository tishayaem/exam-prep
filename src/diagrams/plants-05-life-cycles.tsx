const INK = '#0A0A0A';
const INK_SOFT = '#6B6B6B';
const PINK = '#f50aa2';
const GREEN = '#0cf35c';
const YELLOW = '#fff000';
const BLUE = '#0185fd';
const PAPER = '#FFFFFF';
const LABEL_FONT = 'Space Grotesk, system-ui, sans-serif';

export function PlantsLifeCyclesDiagram() {
  return (
    <svg
      viewBox="0 0 640 440"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="The four stages of a butterfly's life cycle arranged in a circle: egg, caterpillar (larva), chrysalis (pupa) and adult butterfly. Arrows show the cycle returning to egg."
      className="w-full h-auto max-w-[600px]"
    >
      <title>Butterfly life cycle</title>

      <text x="320" y="32" fontSize="14" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle" letterSpacing="0.1em">
        BUTTERFLY LIFE CYCLE
      </text>

      {/* Faint circular guide */}
      <circle cx="320" cy="230" r="140" fill="none" stroke="#E6E6E6" strokeWidth="2" strokeDasharray="4 5" />

      {/* Centre label */}
      <text x="320" y="226" fontSize="14" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle">complete</text>
      <text x="320" y="244" fontSize="14" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle">metamorphosis</text>

      {/* Curved cycle arrows (clockwise) */}
      <path d="M 360 100 A 140 140 0 0 1 450 270" fill="none" stroke={INK_SOFT} strokeWidth="2" strokeLinecap="round" />
      <polygon points="450,270 444,258 456,260" fill={INK_SOFT} />

      <path d="M 440 300 A 140 140 0 0 1 280 360" fill="none" stroke={INK_SOFT} strokeWidth="2" strokeLinecap="round" />
      <polygon points="280,360 290,352 292,366" fill={INK_SOFT} />

      <path d="M 250 350 A 140 140 0 0 1 190 200" fill="none" stroke={INK_SOFT} strokeWidth="2" strokeLinecap="round" />
      <polygon points="190,200 184,212 196,210" fill={INK_SOFT} />

      <path d="M 200 170 A 140 140 0 0 1 280 100" fill="none" stroke={INK_SOFT} strokeWidth="2" strokeLinecap="round" />
      <polygon points="280,100 268,98 274,110" fill={INK_SOFT} />

      {/* ─── Stage 1: Egg (top) ──────────────────────────── */}
      <g transform="translate(320, 90)">
        {/* Leaf */}
        <ellipse cx="0" cy="0" rx="44" ry="18" fill={GREEN} stroke={INK} strokeWidth="2" transform="rotate(-8)" />
        <line x1="-30" y1="2" x2="30" y2="-2" stroke={INK_SOFT} strokeWidth="1" />
        {/* Eggs — 5 small ovals on leaf */}
        {[-18, -10, -2, 8, 18].map((x, i) => (
          <ellipse key={i} cx={x} cy={-3 + (i % 2) * 2} rx="3.5" ry="5" fill={PAPER} stroke={INK} strokeWidth="1.5" />
        ))}
        <text x="0" y="40" fontSize="15" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">1. Egg</text>
      </g>

      {/* ─── Stage 2: Caterpillar / larva (right) ───────── */}
      <g transform="translate(490, 230)">
        {/* Segmented body */}
        {[-30, -18, -6, 6, 18, 30].map((x, i) => (
          <circle key={i} cx={x} cy="0" r="11" fill={GREEN} stroke={INK} strokeWidth="2" />
        ))}
        {/* Stripes */}
        {[-30, -18, -6, 6, 18, 30].map((x, i) => (
          <line key={i} x1={x} y1="-9" x2={x} y2="9" stroke={INK} strokeWidth="1.2" />
        ))}
        {/* Head with eye */}
        <circle cx="40" cy="-2" r="9" fill={GREEN} stroke={INK} strokeWidth="2" />
        <circle cx="44" cy="-4" r="2" fill={INK} />
        {/* Antennae */}
        <line x1="44" y1="-10" x2="48" y2="-18" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="40" y1="-10" x2="36" y2="-18" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
        {/* Little legs */}
        {[-26, -10, 6, 22].map((x, i) => (
          <line key={i} x1={x} y1="11" x2={x} y2="20" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
        ))}
        <text x="0" y="44" fontSize="15" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">2. Caterpillar</text>
        <text x="0" y="60" fontSize="11" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle">(larva)</text>
      </g>

      {/* ─── Stage 3: Chrysalis / pupa (bottom) ─────────── */}
      <g transform="translate(320, 370)">
        {/* Branch */}
        <line x1="-30" y1="-30" x2="30" y2="-30" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        {/* Silk thread */}
        <line x1="0" y1="-30" x2="0" y2="-20" stroke={INK} strokeWidth="1.5" />
        {/* Chrysalis — tear-drop shape */}
        <path d="M 0,-20 Q -14,-15 -12,5 Q -8,18 0,22 Q 8,18 12,5 Q 14,-15 0,-20 Z" fill={YELLOW} stroke={INK} strokeWidth="2" />
        {/* Detail lines */}
        <line x1="-8" y1="-5" x2="8" y2="-5" stroke={INK} strokeWidth="1.2" />
        <line x1="-9" y1="5" x2="9" y2="5" stroke={INK} strokeWidth="1.2" />
        <text x="0" y="44" fontSize="15" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">3. Chrysalis</text>
        <text x="0" y="60" fontSize="11" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle">(pupa)</text>
      </g>

      {/* ─── Stage 4: Adult butterfly (left) ─────────────── */}
      <g transform="translate(150, 230)">
        {/* Body */}
        <ellipse cx="0" cy="0" rx="4" ry="20" fill={INK} />
        {/* Wings — upper */}
        <path d="M 0,-12 Q -34,-30 -30,0 Q -16,-4 0,-4 Z" fill={PINK} stroke={INK} strokeWidth="2" />
        <path d="M 0,-12 Q 34,-30 30,0 Q 16,-4 0,-4 Z" fill={PINK} stroke={INK} strokeWidth="2" />
        {/* Wings — lower */}
        <path d="M 0,0 Q -28,4 -26,22 Q -10,16 0,12 Z" fill={BLUE} stroke={INK} strokeWidth="2" />
        <path d="M 0,0 Q 28,4 26,22 Q 10,16 0,12 Z" fill={BLUE} stroke={INK} strokeWidth="2" />
        {/* Antennae */}
        <path d="M 0,-20 Q -4,-28 -8,-32" fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 0,-20 Q 4,-28 8,-32" fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
        <text x="0" y="44" fontSize="15" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">4. Butterfly</text>
        <text x="0" y="60" fontSize="11" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle">(adult)</text>
      </g>
    </svg>
  );
}
