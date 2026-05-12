const INK = '#0A0A0A';
const INK_SOFT = '#6B6B6B';
const PINK = '#f50aa2';
const GREEN = '#0cf35c';
const PAPER = '#FFFFFF';
const BLUE = '#0185fd';
const LABEL_FONT = 'Space Grotesk, system-ui, sans-serif';

export function EarthGravityDiagram() {
  return (
    <svg
      viewBox="0 0 640 320"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Gravity pulls an apple straight down to Earth. Gravity also bends the Moon's path into an orbit around Earth."
      className="w-full h-auto max-w-[600px]"
    >
      <title>Gravity</title>

      {/* Vertical divider */}
      <line x1="320" y1="20" x2="320" y2="300" stroke="#E6E6E6" strokeWidth="1" />

      {/* Panel titles */}
      <text x="160" y="38" fontSize="16" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">Gravity pulls things down</text>
      <text x="480" y="38" fontSize="16" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">Gravity bends orbits</text>

      {/* ── Panel 1: Apple falling ───────────────────────── */}
      {/* Tree branch */}
      <line x1="40" y1="90" x2="220" y2="90" stroke={INK} strokeWidth="6" strokeLinecap="round" />
      <ellipse cx="80" cy="85" rx="22" ry="14" fill={GREEN} stroke={INK} strokeWidth="1.5" />
      <ellipse cx="180" cy="85" rx="22" ry="14" fill={GREEN} stroke={INK} strokeWidth="1.5" />

      {/* Falling apple sequence (3 positions) */}
      {[
        { y: 115, opacity: 0.35 },
        { y: 155, opacity: 0.65 },
        { y: 220, opacity: 1 },
      ].map((p, i) => (
        <g key={i} opacity={p.opacity}>
          <circle cx="140" cy={p.y} r="10" fill={PINK} stroke={INK} strokeWidth="2" />
          <line x1="140" y1={p.y - 10} x2="143" y2={p.y - 16} stroke={INK} strokeWidth="2" strokeLinecap="round" />
        </g>
      ))}

      {/* Gravity arrow */}
      <line x1="195" y1="120" x2="195" y2="210" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <polygon points="195,220 188,208 202,208" fill={INK} />
      <text x="210" y="170" fontSize="13" fontWeight="700" fontFamily={LABEL_FONT} fill={INK}>gravity</text>

      {/* Ground */}
      <line x1="40" y1="250" x2="300" y2="250" stroke={INK_SOFT} strokeWidth="2" />
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1={45 + i * 22} y1="250" x2={50 + i * 22} y2="258" stroke={INK_SOFT} strokeWidth="1.5" />
      ))}
      <text x="160" y="288" fontSize="11" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle">apple pulled straight down to Earth</text>

      {/* ── Panel 2: Moon orbiting Earth ─────────────────── */}
      {/* Orbit ellipse */}
      <ellipse cx="480" cy="170" rx="100" ry="80" fill="none" stroke="#E6E6E6" strokeWidth="2" strokeDasharray="4 4" />

      {/* Earth in centre */}
      <circle cx="480" cy="170" r="26" fill={BLUE} stroke={INK} strokeWidth="2.5" />
      <text x="480" y="174" fontSize="11" fontWeight="700" fontFamily={LABEL_FONT} fill={PAPER} textAnchor="middle">Earth</text>

      {/* Moon at a position on the orbit (top-right) */}
      <g transform="translate(560, 110)">
        <circle r="14" fill={PAPER} stroke={INK} strokeWidth="2" />
        <text x="0" y="3" fontSize="10" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">Moon</text>
      </g>

      {/* Gravity arrow from Moon toward Earth */}
      <line x1="552" y1="118" x2="500" y2="158" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      <polygon points="500,158 510,154 506,166" fill={INK} />

      {/* Without-gravity path (straight line, dashed) */}
      <line x1="560" y1="110" x2="600" y2="60" stroke={INK_SOFT} strokeWidth="2" strokeDasharray="3 3" />
      <polygon points="600,60 596,72 590,64" fill={INK_SOFT} />
      <text x="610" y="68" fontSize="10" fontFamily={LABEL_FONT} fill={INK_SOFT}>without</text>
      <text x="610" y="80" fontSize="10" fontFamily={LABEL_FONT} fill={INK_SOFT}>gravity</text>

      {/* Caption */}
      <text x="480" y="288" fontSize="11" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle">gravity bends the Moon's path into an orbit</text>
    </svg>
  );
}
