const INK = '#0A0A0A';
const PAPER = '#FFFFFF';
const YELLOW = '#fff000';
const BLUE = '#0185fd';
const LABEL_FONT = 'Space Grotesk, system-ui, sans-serif';

const CENTRE_X = 300;
const CENTRE_Y = 240;
const RING_R = 120;
const MOON_R = 22;

type PhaseKind =
  | 'new'
  | 'wax-crescent'
  | 'first-quarter'
  | 'wax-gibbous'
  | 'full'
  | 'wan-gibbous'
  | 'last-quarter'
  | 'wan-crescent';

interface Phase {
  kind: PhaseKind;
  /** Angle in degrees, 0 = right (between Earth and Sun). */
  angle: number;
  label: string;
  labelAnchor: 'start' | 'middle' | 'end';
  /** Offset added to the moon's centre to position the label. */
  labelDx: number;
  labelDy: number;
}

const PHASES: Phase[] = [
  { kind: 'new',           angle: 0,   label: 'New',              labelAnchor: 'middle', labelDx: 0,   labelDy: 50 },
  { kind: 'wax-crescent',  angle: 45,  label: 'Waxing crescent',  labelAnchor: 'start',  labelDx: 30,  labelDy: -10 },
  { kind: 'first-quarter', angle: 90,  label: 'First quarter',    labelAnchor: 'middle', labelDx: 0,   labelDy: -42 },
  { kind: 'wax-gibbous',   angle: 135, label: 'Waxing gibbous',   labelAnchor: 'end',    labelDx: -30, labelDy: -10 },
  { kind: 'full',          angle: 180, label: 'Full',             labelAnchor: 'middle', labelDx: 0,   labelDy: 50 },
  { kind: 'wan-gibbous',   angle: 225, label: 'Waning gibbous',   labelAnchor: 'end',    labelDx: -30, labelDy: 14 },
  { kind: 'last-quarter',  angle: 270, label: 'Last quarter',     labelAnchor: 'middle', labelDx: 0,   labelDy: 52 },
  { kind: 'wan-crescent',  angle: 315, label: 'Waning crescent',  labelAnchor: 'start',  labelDx: 30,  labelDy: 14 },
];

function moonOverlay(kind: PhaseKind): { base: string; overlay?: { d: string; fill: string } } {
  // Right side lit ← Sun is on the right.
  switch (kind) {
    case 'new':           return { base: INK };
    case 'wax-crescent':  return { base: INK,   overlay: { d: 'M 0,-22 A 22,22 0 0 1 0,22 A 12,22 0 0 1 0,-22 Z', fill: PAPER } };
    case 'first-quarter': return { base: INK,   overlay: { d: 'M 0,-22 A 22,22 0 0 1 0,22 L 0,-22 Z',           fill: PAPER } };
    case 'wax-gibbous':   return { base: PAPER, overlay: { d: 'M 0,-22 A 22,22 0 0 0 0,22 A 12,22 0 0 0 0,-22 Z', fill: INK } };
    case 'full':          return { base: PAPER };
    case 'wan-gibbous':   return { base: PAPER, overlay: { d: 'M 0,-22 A 22,22 0 0 1 0,22 A 12,22 0 0 1 0,-22 Z', fill: INK } };
    case 'last-quarter':  return { base: INK,   overlay: { d: 'M 0,-22 A 22,22 0 0 0 0,22 L 0,-22 Z',           fill: PAPER } };
    case 'wan-crescent':  return { base: INK,   overlay: { d: 'M 0,-22 A 22,22 0 0 0 0,22 A 12,22 0 0 0 0,-22 Z', fill: PAPER } };
  }
}

export function EarthMoonPhasesDiagram() {
  return (
    <svg
      viewBox="0 0 620 500"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="The eight phases of the Moon arranged in a circle around Earth, with the Sun on the right"
      className="w-full h-auto max-w-[600px]"
    >
      <title>Phases of the Moon</title>

      {/* Faint orbit ring */}
      <circle cx={CENTRE_X} cy={CENTRE_Y} r={RING_R} fill="none" stroke="#E6E6E6" strokeWidth="2" strokeDasharray="3 5" />

      {/* Sun on the right with rays */}
      <g transform={`translate(580, ${CENTRE_Y})`}>
        <circle r="20" fill={YELLOW} stroke={INK} strokeWidth="2" />
        {[-1, -0.5, 0, 0.5, 1].map((k, i) => {
          const a = k * 0.55;
          const x1 = 24 * Math.cos(a);
          const y1 = 24 * Math.sin(a);
          const x2 = 36 * Math.cos(a);
          const y2 = 36 * Math.sin(a);
          return (
            <line key={i} x1={-x1} y1={y1} x2={-x2} y2={y2} stroke={INK} strokeWidth="2" strokeLinecap="round" />
          );
        })}
        <text x="0" y="44" fontSize="14" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">Sun</text>
      </g>

      {/* Earth at centre */}
      <circle cx={CENTRE_X} cy={CENTRE_Y} r="20" fill={BLUE} stroke={INK} strokeWidth="2" />
      <text x={CENTRE_X} y={CENTRE_Y + 4} fontSize="12" fontWeight="700" fontFamily={LABEL_FONT} fill={PAPER} textAnchor="middle">Earth</text>

      {/* 8 moons */}
      {PHASES.map((p) => {
        const rad = (p.angle * Math.PI) / 180;
        const mx = CENTRE_X + RING_R * Math.cos(rad);
        const my = CENTRE_Y - RING_R * Math.sin(rad);
        const { base, overlay } = moonOverlay(p.kind);
        return (
          <g key={p.kind} transform={`translate(${mx}, ${my})`}>
            <circle r={MOON_R} fill={base} />
            {overlay && <path d={overlay.d} fill={overlay.fill} />}
            <circle r={MOON_R} fill="none" stroke={INK} strokeWidth="2" />
            <text
              x={p.labelDx}
              y={p.labelDy}
              fontSize="14"
              fontWeight="700"
              fontFamily={LABEL_FONT}
              fill={INK}
              textAnchor={p.labelAnchor}
            >
              {p.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
