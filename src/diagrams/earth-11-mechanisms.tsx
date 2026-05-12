const INK = '#0A0A0A';
const INK_SOFT = '#6B6B6B';
const PINK = '#f50aa2';
const YELLOW = '#fff000';
const BLUE = '#0185fd';
const LABEL_FONT = 'Space Grotesk, system-ui, sans-serif';

export function EarthMechanismsDiagram() {
  return (
    <svg
      viewBox="0 0 720 300"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Three mechanisms shown side by side: a lever pivoting on a fulcrum, a pulley with a rope and load, and two interlocking gears"
      className="w-full h-auto max-w-[680px]"
    >
      <title>Levers, pulleys and gears</title>

      {/* Panel separators (faint vertical lines) */}
      <line x1="240" y1="20" x2="240" y2="280" stroke="#E6E6E6" strokeWidth="1" />
      <line x1="480" y1="20" x2="480" y2="280" stroke="#E6E6E6" strokeWidth="1" />

      {/* Panel titles */}
      <text x="120" y="40" fontSize="18" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">Lever</text>
      <text x="360" y="40" fontSize="18" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">Pulley</text>
      <text x="600" y="40" fontSize="18" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">Gear</text>

      {/* ── Panel 1: Lever ──────────────────────────────── */}
      {/* Push arrow on the left */}
      <line x1="40" y1="90" x2="40" y2="155" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      <polygon points="40,165 33,150 47,150" fill={INK} />
      <text x="42" y="82" fontSize="13" fontWeight="700" fontFamily={LABEL_FONT} fill={INK}>Push</text>

      {/* Beam — tilted (left high, right low because load is on the right) */}
      <line x1="30" y1="160" x2="210" y2="210" stroke={INK} strokeWidth="6" strokeLinecap="round" />

      {/* Load on the right end */}
      <rect x="180" y="190" width="32" height="20" fill={PINK} stroke={INK} strokeWidth="2" />
      <text x="196" y="232" fontSize="12" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">Load</text>

      {/* Fulcrum triangle */}
      <polygon points="120,210 95,255 145,255" fill={YELLOW} stroke={INK} strokeWidth="2" />
      <text x="120" y="278" fontSize="12" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">Fulcrum</text>

      {/* ── Panel 2: Pulley ─────────────────────────────── */}
      {/* Support beam */}
      <line x1="290" y1="80" x2="430" y2="80" stroke={INK} strokeWidth="6" strokeLinecap="round" />
      <line x1="295" y1="80" x2="310" y2="65" stroke={INK} strokeWidth="2" />
      <line x1="415" y1="80" x2="430" y2="65" stroke={INK} strokeWidth="2" />

      {/* Pulley wheel */}
      <circle cx="360" cy="115" r="22" fill="#FFFFFF" stroke={INK} strokeWidth="3" />
      <circle cx="360" cy="115" r="5" fill={INK} />
      {/* Connector to support */}
      <line x1="360" y1="93" x2="360" y2="83" stroke={INK} strokeWidth="2" />

      {/* Rope */}
      <line x1="342" y1="125" x2="342" y2="250" stroke={INK} strokeWidth="2.5" />
      <line x1="378" y1="125" x2="378" y2="220" stroke={INK} strokeWidth="2.5" />
      {/* Curve over the wheel */}
      <path d="M 342 125 A 22 22 0 0 1 378 125" fill="none" stroke={INK} strokeWidth="2.5" />

      {/* Load on right rope */}
      <rect x="360" y="220" width="36" height="24" fill={PINK} stroke={INK} strokeWidth="2" />
      <text x="378" y="262" fontSize="12" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">Load</text>

      {/* Pull arrow on left rope */}
      <line x1="342" y1="250" x2="342" y2="265" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      <polygon points="342,275 335,260 349,260" fill={INK} />
      <text x="320" y="262" fontSize="13" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="end">Pull</text>

      {/* ── Panel 3: Gears ──────────────────────────────── */}
      <GearWheel cx={560} cy={170} radius={36} teeth={12} fill={BLUE} />
      <GearWheel cx={636} cy={170} radius={24} teeth={8} fill={YELLOW} />

      {/* Rotation arrows */}
      <path d="M 560 116 A 50 50 0 0 1 600 130" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      <polygon points="600,132 590,124 600,118" fill={INK} />

      <path d="M 636 215 A 35 35 0 0 1 605 200" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      <polygon points="605,198 615,205 605,212" fill={INK} />

      <text x="560" y="240" fontSize="12" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">Big gear</text>
      <text x="636" y="240" fontSize="12" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">Small gear</text>
    </svg>
  );
}

interface GearWheelProps {
  cx: number;
  cy: number;
  radius: number;
  teeth: number;
  fill: string;
}

function GearWheel({ cx, cy, radius, teeth, fill }: GearWheelProps) {
  return (
    <>
      {Array.from({ length: teeth }, (_, i) => {
        const angle = (i * 360) / teeth;
        return (
          <rect
            key={i}
            x={cx - 4}
            y={cy - radius - 7}
            width="8"
            height="10"
            fill={fill}
            stroke={INK}
            strokeWidth="1.5"
            transform={`rotate(${angle} ${cx} ${cy})`}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={radius} fill={fill} stroke={INK} strokeWidth="2" />
      <circle cx={cx} cy={cy} r={radius / 4} fill={INK_SOFT} stroke={INK} strokeWidth="1.5" />
    </>
  );
}
