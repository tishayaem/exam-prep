const INK = '#0A0A0A';
const INK_SOFT = '#6B6B6B';
const YELLOW = '#fff000';
const BLUE = '#0185fd';
const LABEL_FONT = 'Space Grotesk, system-ui, sans-serif';

interface EarthPosition {
  cx: number;
  cy: number;
  season: string;
  monthHint: string;
  /** Whether the axis-tilt direction points roughly toward or away from the Sun. */
  axisVsSun: 'toward' | 'away' | 'sideways';
}

const SUN_X = 320;
const SUN_Y = 230;
const SUN_R = 36;
const ORBIT_R = 160;
const EARTH_R = 24;
/** Fixed tilt direction in space — axis always points the same way (top-right). */
const TILT_RAD = (-23.5 * Math.PI) / 180;

const POSITIONS: EarthPosition[] = [
  // Counterclockwise starting from the left (June, Northern Summer).
  { cx: SUN_X - ORBIT_R, cy: SUN_Y, season: 'Summer', monthHint: 'June', axisVsSun: 'toward' },
  { cx: SUN_X, cy: SUN_Y - ORBIT_R, season: 'Autumn', monthHint: 'Sept', axisVsSun: 'sideways' },
  { cx: SUN_X + ORBIT_R, cy: SUN_Y, season: 'Winter', monthHint: 'Dec', axisVsSun: 'away' },
  { cx: SUN_X, cy: SUN_Y + ORBIT_R, season: 'Spring', monthHint: 'March', axisVsSun: 'sideways' },
];

export function EarthOrbitsSeasonsDiagram() {
  return (
    <svg
      viewBox="0 0 640 480"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Earth at four positions around the Sun showing the Northern Hemisphere seasons. The axis tilt stays fixed in space, so different positions tilt the north pole toward or away from the Sun."
      className="w-full h-auto max-w-[600px]"
    >
      <title>Orbits and seasons</title>

      <text x={SUN_X} y="32" fontSize="14" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle" letterSpacing="0.1em">
        NORTHERN HEMISPHERE SEASONS
      </text>

      {/* Orbit ellipse */}
      <ellipse cx={SUN_X} cy={SUN_Y} rx={ORBIT_R} ry={ORBIT_R} fill="none" stroke="#E6E6E6" strokeWidth="2" strokeDasharray="4 4" />

      {/* Sun */}
      <g>
        <circle cx={SUN_X} cy={SUN_Y} r={SUN_R} fill={YELLOW} stroke={INK} strokeWidth="2" />
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i * Math.PI) / 4;
          const x1 = SUN_X + Math.cos(a) * (SUN_R + 4);
          const y1 = SUN_Y + Math.sin(a) * (SUN_R + 4);
          const x2 = SUN_X + Math.cos(a) * (SUN_R + 16);
          const y2 = SUN_Y + Math.sin(a) * (SUN_R + 16);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth="2" strokeLinecap="round" />;
        })}
        <text x={SUN_X} y={SUN_Y + 5} fontSize="14" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">Sun</text>
      </g>

      {/* Four Earths */}
      {POSITIONS.map((p) => {
        // Axis goes through Earth's centre, tilted always top-right.
        const ax = Math.sin(TILT_RAD) * (EARTH_R + 8);
        const ay = -Math.cos(TILT_RAD) * (EARTH_R + 8);
        const isToward = p.axisVsSun === 'toward';
        const isAway = p.axisVsSun === 'away';
        return (
          <g key={p.season}>
            {/* Earth */}
            <circle cx={p.cx} cy={p.cy} r={EARTH_R} fill={BLUE} stroke={INK} strokeWidth="2" />

            {/* Tilted axis with N / S markers */}
            <line
              x1={p.cx - ax}
              y1={p.cy - ay}
              x2={p.cx + ax}
              y2={p.cy + ay}
              stroke={INK}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <text
              x={p.cx - ax}
              y={p.cy - ay - 4}
              fontSize="11"
              fontWeight="700"
              fontFamily={LABEL_FONT}
              fill={INK}
              textAnchor="middle"
            >
              N
            </text>

            {/* Equator hint */}
            <ellipse cx={p.cx} cy={p.cy} rx={EARTH_R} ry={5} fill="none" stroke="#FFFFFF" strokeWidth="1.5" transform={`rotate(${TILT_RAD * (180 / Math.PI) + 90} ${p.cx} ${p.cy})`} />

            {/* Season + month label, placed outside the orbit */}
            {(() => {
              // Move label radially outward from the Sun.
              const dx = p.cx - SUN_X;
              const dy = p.cy - SUN_Y;
              const len = Math.sqrt(dx * dx + dy * dy) || 1;
              const lx = p.cx + (dx / len) * 56;
              const ly = p.cy + (dy / len) * 56;
              return (
                <g>
                  <text x={lx} y={ly - 6} fontSize="16" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">
                    {p.season}
                  </text>
                  <text x={lx} y={ly + 12} fontSize="12" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle">
                    {p.monthHint}
                  </text>
                  {isToward && (
                    <text x={lx} y={ly + 30} fontSize="11" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle">
                      axis tilts toward Sun
                    </text>
                  )}
                  {isAway && (
                    <text x={lx} y={ly + 30} fontSize="11" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle">
                      axis tilts away from Sun
                    </text>
                  )}
                </g>
              );
            })()}
          </g>
        );
      })}

      {/* Orbit direction arrow */}
      <path d="M 470 90 A 220 220 0 0 0 420 70" fill="none" stroke={INK_SOFT} strokeWidth="2" strokeLinecap="round" />
      <polygon points="420,70 432,68 426,80" fill={INK_SOFT} />
      <text x="490" y="60" fontSize="11" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="start">orbit direction</text>
    </svg>
  );
}
