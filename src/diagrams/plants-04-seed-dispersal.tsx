const INK = '#0A0A0A';
const INK_SOFT = '#6B6B6B';
const PINK = '#f50aa2';
const GREEN = '#0cf35c';
const YELLOW = '#fff000';
const BLUE = '#0185fd';
const LABEL_FONT = 'Space Grotesk, system-ui, sans-serif';

export function PlantsSeedDispersalDiagram() {
  return (
    <svg
      viewBox="0 0 720 280"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Four panels showing the four ways seeds spread: wind, animal, water and explosion"
      className="w-full h-auto max-w-[680px]"
    >
      <title>Four ways seeds spread</title>

      {/* Panel separators */}
      <line x1="180" y1="20" x2="180" y2="260" stroke="#E6E6E6" strokeWidth="1" />
      <line x1="360" y1="20" x2="360" y2="260" stroke="#E6E6E6" strokeWidth="1" />
      <line x1="540" y1="20" x2="540" y2="260" stroke="#E6E6E6" strokeWidth="1" />

      {/* ── Panel 1: Wind — dandelion parachute ─────────── */}
      <text x="90" y="40" fontSize="16" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">Wind</text>

      {/* Parachute filaments — radiating from a centre point */}
      {Array.from({ length: 9 }, (_, i) => {
        const a = -Math.PI / 2 + (i - 4) * 0.35;
        const x1 = 90;
        const y1 = 100;
        const x2 = 90 + Math.cos(a) * 38;
        const y2 = 100 + Math.sin(a) * 38;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth="1.5" strokeLinecap="round" />;
      })}
      {/* Stalk */}
      <line x1="90" y1="100" x2="90" y2="160" stroke={INK} strokeWidth="2" />
      {/* Seed */}
      <ellipse cx="90" cy="168" rx="5" ry="10" fill={INK} />

      {/* Wind arrow */}
      <path d="M 30 220 Q 80 200 150 220" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      <polygon points="150,220 142,213 142,227" fill={INK} />
      <text x="90" y="246" fontSize="12" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle">drifts on the breeze</text>

      {/* ── Panel 2: Animal — sticky burr ───────────────── */}
      <text x="270" y="40" fontSize="16" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">Animal</text>

      {/* Burr body */}
      <circle cx="270" cy="130" r="22" fill={PINK} stroke={INK} strokeWidth="2" />
      {/* Hooks — small lines radiating outward */}
      {Array.from({ length: 16 }, (_, i) => {
        const a = (i * 360) / 16;
        const rad = (a * Math.PI) / 180;
        const x1 = 270 + Math.cos(rad) * 22;
        const y1 = 130 + Math.sin(rad) * 22;
        const x2 = 270 + Math.cos(rad) * 34;
        const y2 = 130 + Math.sin(rad) * 34;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth="2" strokeLinecap="round" />;
      })}
      {/* Fur strands (representing animal coat the burr clings to) */}
      <line x1="200" y1="200" x2="220" y2="210" stroke={INK_SOFT} strokeWidth="2" strokeLinecap="round" />
      <line x1="220" y1="195" x2="245" y2="208" stroke={INK_SOFT} strokeWidth="2" strokeLinecap="round" />
      <line x1="250" y1="195" x2="270" y2="210" stroke={INK_SOFT} strokeWidth="2" strokeLinecap="round" />
      <line x1="280" y1="195" x2="305" y2="208" stroke={INK_SOFT} strokeWidth="2" strokeLinecap="round" />
      <line x1="315" y1="200" x2="335" y2="210" stroke={INK_SOFT} strokeWidth="2" strokeLinecap="round" />
      <text x="270" y="246" fontSize="12" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle">sticks to fur</text>

      {/* ── Panel 3: Water — floating coconut ────────────── */}
      <text x="450" y="40" fontSize="16" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">Water</text>

      {/* Coconut */}
      <ellipse cx="450" cy="135" rx="28" ry="20" fill={INK} stroke={INK} strokeWidth="2" />
      <ellipse cx="450" cy="135" rx="22" ry="14" fill="none" stroke={INK_SOFT} strokeWidth="1.5" />

      {/* Water line — wavy */}
      <path d="M 380 175 Q 400 165 420 175 T 460 175 T 500 175 T 520 175" fill="none" stroke={BLUE} strokeWidth="3" strokeLinecap="round" />
      <path d="M 380 195 Q 400 185 420 195 T 460 195 T 500 195 T 520 195" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" opacity="0.6" />

      {/* Drift arrow */}
      <line x1="385" y1="220" x2="510" y2="220" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      <polygon points="515,220 505,214 505,226" fill={INK} />
      <text x="450" y="246" fontSize="12" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle">floats and travels</text>

      {/* ── Panel 4: Explosion — bursting pod ─────────────── */}
      <text x="630" y="40" fontSize="16" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">Explosion</text>

      {/* Pod cracking — two halves */}
      <path d="M 600 140 Q 600 110 630 105 Q 660 110 660 140" fill={GREEN} stroke={INK} strokeWidth="2" />
      <path d="M 600 140 Q 600 170 630 175 Q 660 170 660 140" fill={GREEN} stroke={INK} strokeWidth="2" />
      <line x1="600" y1="140" x2="660" y2="140" stroke={INK} strokeWidth="2" strokeDasharray="4 3" />

      {/* Seeds shooting outward */}
      {[
        { x: 580, y: 95 },
        { x: 600, y: 80 },
        { x: 630, y: 70 },
        { x: 670, y: 80 },
        { x: 690, y: 100 },
        { x: 680, y: 175 },
        { x: 645, y: 195 },
        { x: 600, y: 200 },
      ].map((p, i) => (
        <g key={i}>
          <line x1="630" y1="140" x2={p.x} y2={p.y} stroke={YELLOW} strokeWidth="2" opacity="0.6" />
          <circle cx={p.x} cy={p.y} r="4" fill={INK} />
        </g>
      ))}
      <text x="630" y="246" fontSize="12" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle">pod bursts open</text>
    </svg>
  );
}
