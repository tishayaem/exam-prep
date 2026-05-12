const INK = '#0A0A0A';
const INK_SOFT = '#6B6B6B';
const PAPER = '#FFFFFF';
const YELLOW = '#fff000';
const BLUE = '#0185fd';
const LABEL_FONT = 'Space Grotesk, system-ui, sans-serif';

export function EarthLightSourcesDiagram() {
  return (
    <svg
      viewBox="0 0 640 360"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="The Sun makes its own light. Light travels to the Moon, bounces off, and reaches Earth as reflected light."
      className="w-full h-auto max-w-[600px]"
    >
      <title>Light source vs reflected light</title>

      {/* Sun (light source) — top left */}
      <g transform="translate(90, 80)">
        <circle r="40" fill={YELLOW} stroke={INK} strokeWidth="2" />
        {Array.from({ length: 10 }, (_, i) => {
          const a = (i * 2 * Math.PI) / 10;
          const x1 = Math.cos(a) * 46;
          const y1 = Math.sin(a) * 46;
          const x2 = Math.cos(a) * 60;
          const y2 = Math.sin(a) * 60;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth="2" strokeLinecap="round" />;
        })}
        <text x="0" y="5" fontSize="14" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">Sun</text>
      </g>
      <text x="90" y="180" fontSize="13" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle" letterSpacing="0.05em">
        MAKES ITS OWN LIGHT
      </text>
      <text x="90" y="200" fontSize="12" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle">(light source)</text>

      {/* Light ray from Sun to Moon */}
      <line x1="155" y1="120" x2="370" y2="195" stroke={YELLOW} strokeWidth="4" strokeLinecap="round" />
      <polygon points="370,195 360,188 358,202" fill={YELLOW} stroke={INK} strokeWidth="1" />
      <text x="245" y="148" fontSize="12" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle">sunlight</text>

      {/* Moon (reflector) — centre */}
      <g transform="translate(395, 200)">
        <circle r="34" fill={PAPER} stroke={INK} strokeWidth="2.5" />
        {/* Crater hints */}
        <circle cx="-10" cy="-8" r="4" fill={INK_SOFT} opacity="0.4" />
        <circle cx="8" cy="6" r="3" fill={INK_SOFT} opacity="0.4" />
        <circle cx="-2" cy="14" r="3" fill={INK_SOFT} opacity="0.4" />
        <text x="0" y="4" fontSize="13" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">Moon</text>
      </g>
      <text x="395" y="282" fontSize="13" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle" letterSpacing="0.05em">
        REFLECTS LIGHT
      </text>
      <text x="395" y="302" fontSize="12" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle">(not a light source)</text>

      {/* Reflected ray from Moon to Earth */}
      <line x1="430" y1="210" x2="555" y2="130" stroke={YELLOW} strokeWidth="3" strokeLinecap="round" strokeDasharray="5 3" opacity="0.8" />
      <polygon points="555,130 552,142 564,138" fill={YELLOW} stroke={INK} strokeWidth="1" />
      <text x="500" y="190" fontSize="12" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle">reflected light</text>

      {/* Earth (observer) — top right */}
      <g transform="translate(570, 110)">
        <circle r="30" fill={BLUE} stroke={INK} strokeWidth="2.5" />
        <text x="0" y="4" fontSize="12" fontWeight="700" fontFamily={LABEL_FONT} fill={PAPER} textAnchor="middle">Earth</text>
      </g>
    </svg>
  );
}
