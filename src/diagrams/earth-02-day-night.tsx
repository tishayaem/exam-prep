const INK = '#0A0A0A';
const INK_SOFT = '#6B6B6B';
const YELLOW = '#fff000';
const BLUE = '#0185fd';
const LABEL_FONT = 'Space Grotesk, system-ui, sans-serif';

export function EarthDayNightDiagram() {
  return (
    <svg
      viewBox="0 0 640 320"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="The Sun on the left shines on Earth, lighting the side facing the Sun as day and leaving the side facing away as night. Earth spins on its axis."
      className="w-full h-auto max-w-[600px]"
    >
      <title>Day and night</title>

      {/* Sun + rays on the left */}
      <g transform="translate(80, 160)">
        <circle r="44" fill={YELLOW} stroke={INK} strokeWidth="2" />
        {Array.from({ length: 6 }, (_, i) => {
          const a = (-Math.PI / 2) + (i - 2.5) * 0.35;
          const x1 = Math.cos(a) * 50;
          const y1 = Math.sin(a) * 50;
          const x2 = Math.cos(a) * 68;
          const y2 = Math.sin(a) * 68;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth="2" strokeLinecap="round" />;
        })}
        <text x="0" y="6" fontSize="16" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">Sun</text>
      </g>

      {/* Light arrows from Sun to Earth */}
      {[-30, 0, 30].map((dy, i) => (
        <g key={i}>
          <line x1="170" y1={160 + dy} x2="380" y2={160 + dy * 0.6} stroke={YELLOW} strokeWidth="3" strokeLinecap="round" opacity="0.7" />
          <polygon
            points={`380,${160 + dy * 0.6} 372,${156 + dy * 0.6} 372,${164 + dy * 0.6}`}
            fill={YELLOW}
            stroke={INK}
            strokeWidth="1"
          />
        </g>
      ))}

      {/* Earth — half lit, half dark */}
      <g transform="translate(460, 160)">
        {/* Day side (facing Sun, on the left) — paper with blue continents */}
        <path d="M 0,-80 A 80,80 0 0 0 0,80 L 0,-80 Z" fill={BLUE} stroke={INK} strokeWidth="2.5" />
        {/* Night side */}
        <path d="M 0,-80 A 80,80 0 0 1 0,80 L 0,-80 Z" fill={INK} stroke={INK} strokeWidth="2.5" />

        {/* Axis */}
        <line x1="0" y1="-92" x2="0" y2="92" stroke={INK} strokeWidth="2" strokeDasharray="3 3" />
        <text x="0" y="-100" fontSize="12" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">N</text>

        {/* Rotation arrow */}
        <path d="M -16 -70 A 24 18 0 0 1 16 -70" fill="none" stroke={INK_SOFT} strokeWidth="2" />
        <polygon points="14,-72 22,-66 14,-60" fill={INK_SOFT} />

        {/* Labels */}
        <text x="-40" y="6" fontSize="18" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">Day</text>
        <text x="40" y="6" fontSize="18" fontWeight="700" fontFamily={LABEL_FONT} fill="#FFFFFF" textAnchor="middle">Night</text>
      </g>

      {/* Earth label */}
      <text x="460" y="280" fontSize="14" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">Earth spins once every 24 hours</text>
    </svg>
  );
}
