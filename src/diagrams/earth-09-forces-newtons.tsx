const INK = '#0A0A0A';
const INK_SOFT = '#6B6B6B';
const PINK = '#f50aa2';
const GREEN = '#0cf35c';
const YELLOW = '#fff000';
const LABEL_FONT = 'Space Grotesk, system-ui, sans-serif';

export function EarthForcesNewtonsDiagram() {
  return (
    <svg
      viewBox="0 0 640 320"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="A push force on the left moves a box away from the hand. A pull force on the right moves the box toward the hand. Each force is measured in newtons."
      className="w-full h-auto max-w-[600px]"
    >
      <title>Forces: push and pull, measured in newtons</title>

      {/* Floor line */}
      <line x1="40" y1="220" x2="600" y2="220" stroke={INK_SOFT} strokeWidth="2" />

      {/* Section titles */}
      <text x="160" y="40" fontSize="20" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">Push</text>
      <text x="480" y="40" fontSize="20" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">Pull</text>

      {/* Vertical divider */}
      <line x1="320" y1="20" x2="320" y2="300" stroke="#E6E6E6" strokeWidth="1" />

      {/* ── Push panel ── */}
      {/* Hand symbol — fist shape on left */}
      <g transform="translate(70, 175)">
        <rect x="-22" y="-20" width="36" height="40" rx="10" fill={YELLOW} stroke={INK} strokeWidth="2" />
        <line x1="14" y1="-12" x2="22" y2="-12" stroke={INK} strokeWidth="2" strokeLinecap="round" />
        <line x1="14" y1="-4" x2="22" y2="-4" stroke={INK} strokeWidth="2" strokeLinecap="round" />
        <line x1="14" y1="4" x2="22" y2="4" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Force arrow pointing right (push) */}
      <line x1="100" y1="175" x2="170" y2="175" stroke={PINK} strokeWidth="4" strokeLinecap="round" />
      <polygon points="170,175 158,168 158,182" fill={PINK} stroke={INK} strokeWidth="1.5" />
      <text x="135" y="160" fontSize="14" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">10 N</text>

      {/* Box being pushed */}
      <rect x="175" y="150" width="80" height="60" fill={GREEN} stroke={INK} strokeWidth="2" />
      <text x="215" y="186" fontSize="13" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">box</text>

      {/* Motion arrow under box */}
      <line x1="175" y1="240" x2="280" y2="240" stroke={INK_SOFT} strokeWidth="2" strokeDasharray="3 3" />
      <polygon points="280,240 270,234 270,246" fill={INK_SOFT} />
      <text x="220" y="262" fontSize="11" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle">moves away from hand</text>

      {/* ── Pull panel ── */}
      {/* Hand on right */}
      <g transform="translate(570, 175)">
        <rect x="-14" y="-20" width="36" height="40" rx="10" fill={YELLOW} stroke={INK} strokeWidth="2" />
        <line x1="-22" y1="-12" x2="-14" y2="-12" stroke={INK} strokeWidth="2" strokeLinecap="round" />
        <line x1="-22" y1="-4" x2="-14" y2="-4" stroke={INK} strokeWidth="2" strokeLinecap="round" />
        <line x1="-22" y1="4" x2="-14" y2="4" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Rope connecting box to hand */}
      <line x1="465" y1="175" x2="548" y2="175" stroke={INK} strokeWidth="2" strokeDasharray="2 3" />

      {/* Force arrow pointing right (pull) */}
      <line x1="490" y1="155" x2="540" y2="155" stroke={PINK} strokeWidth="4" strokeLinecap="round" />
      <polygon points="540,155 528,148 528,162" fill={PINK} stroke={INK} strokeWidth="1.5" />
      <text x="515" y="143" fontSize="14" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">10 N</text>

      {/* Box being pulled */}
      <rect x="385" y="150" width="80" height="60" fill={GREEN} stroke={INK} strokeWidth="2" />
      <text x="425" y="186" fontSize="13" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">box</text>

      {/* Motion arrow under box */}
      <line x1="385" y1="240" x2="480" y2="240" stroke={INK_SOFT} strokeWidth="2" strokeDasharray="3 3" />
      <polygon points="480,240 470,234 470,246" fill={INK_SOFT} />
      <text x="432" y="262" fontSize="11" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle">moves toward hand</text>

      {/* Bottom note */}
      <text x="320" y="298" fontSize="13" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle" letterSpacing="0.05em">
        FORCES ARE MEASURED IN NEWTONS (N)
      </text>
    </svg>
  );
}
