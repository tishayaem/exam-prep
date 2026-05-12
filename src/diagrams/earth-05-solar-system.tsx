const INK = '#0A0A0A';
const INK_SOFT = '#6B6B6B';
const OFF = '#F5F5F2';
const YELLOW = '#fff000';
const PINK = '#f50aa2';
const BLUE = '#0185fd';
const LABEL_FONT = 'Space Grotesk, system-ui, sans-serif';

interface Planet {
  name: string;
  cx: number;
  r: number;
  fill: string;
  hasRings?: boolean;
}

const PLANETS: Planet[] = [
  { name: 'Mercury', cx: 150, r: 4,  fill: INK_SOFT },
  { name: 'Venus',   cx: 195, r: 8,  fill: OFF },
  { name: 'Earth',   cx: 245, r: 8,  fill: BLUE },
  { name: 'Mars',    cx: 295, r: 6,  fill: PINK },
  { name: 'Jupiter', cx: 400, r: 28, fill: OFF },
  { name: 'Saturn',  cx: 520, r: 24, fill: OFF, hasRings: true },
  { name: 'Uranus',  cx: 630, r: 14, fill: BLUE },
  { name: 'Neptune', cx: 730, r: 14, fill: BLUE },
];

const Y = 110;

export function EarthSolarSystemDiagram() {
  return (
    <svg
      viewBox="0 0 800 200"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="The Sun on the left followed by the eight planets in order: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune"
      className="w-full h-auto max-w-[760px]"
    >
      <title>The Solar System</title>

      {/* Faint orbit line — implies distance / order */}
      <line x1="20" y1={Y} x2="780" y2={Y} stroke="#E6E6E6" strokeWidth="2" strokeDasharray="3 5" />

      {/* Sun — partial disc on the left edge */}
      <g transform={`translate(0, ${Y})`}>
        <circle cx="20" cy="0" r="50" fill={YELLOW} stroke={INK} strokeWidth="2" />
        <text x="36" y="4" fontSize="13" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">Sun</text>
      </g>

      {/* Planets */}
      {PLANETS.map((p) => (
        <g key={p.name}>
          {p.hasRings && (
            <ellipse
              cx={p.cx}
              cy={Y}
              rx={p.r + 22}
              ry={6}
              fill="none"
              stroke={INK}
              strokeWidth="2"
              transform={`rotate(-12 ${p.cx} ${Y})`}
            />
          )}
          <circle cx={p.cx} cy={Y} r={p.r} fill={p.fill} stroke={INK} strokeWidth="2" />
          <text
            x={p.cx}
            y={Y + p.r + 22}
            fontSize="13"
            fontWeight="700"
            fontFamily={LABEL_FONT}
            fill={INK}
            textAnchor="middle"
          >
            {p.name}
          </text>
        </g>
      ))}

      {/* Group labels — rocky vs gas giants */}
      <text x="220" y="180" fontSize="11" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle" letterSpacing="0.1em">
        ROCKY PLANETS
      </text>
      <text x="570" y="180" fontSize="11" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle" letterSpacing="0.1em">
        GAS GIANTS
      </text>
    </svg>
  );
}
