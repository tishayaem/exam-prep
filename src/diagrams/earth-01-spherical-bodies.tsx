const INK = '#0A0A0A';
const INK_SOFT = '#6B6B6B';
const YELLOW = '#fff000';
const BLUE = '#0185fd';
const MOON = '#D9D9DE';
const LABEL_FONT = 'Space Grotesk, system-ui, sans-serif';

// Earth and Moon are drawn to their real diameter ratio (Moon ≈ ¼ Earth).
// The Sun is shown big but NOT to that scale — it's actually ~109 Earths
// wide, which would make Earth and Moon invisible on this canvas. The
// caption row makes the "not to scale" honesty explicit.
const EARTH_R = 56;
const MOON_R = EARTH_R / 4; // ≈14, the real ratio

export function EarthSphericalBodiesDiagram() {
  return (
    <svg
      viewBox="0 0 640 320"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Three labelled spheres in a row — the Sun (yellow), the Earth (blue), and the Moon (grey). The Earth and Moon are sized to their real ratio (the Moon is about a quarter as wide as the Earth), while the Sun is shown big but not to scale — it is actually about 109 times the Earth's diameter."
      className="w-full h-auto max-w-[600px]"
    >
      <title>Earth, Sun and Moon — all spherical</title>

      {/* Sun */}
      <g transform="translate(110, 150)">
        <circle r="84" fill={YELLOW} stroke={INK} strokeWidth="2.5" />
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const x1 = Math.cos(a) * 90;
          const y1 = Math.sin(a) * 90;
          const x2 = Math.cos(a) * 110;
          const y2 = Math.sin(a) * 110;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={INK}
              strokeWidth="2"
              strokeLinecap="round"
            />
          );
        })}
        <text
          x="0"
          y="6"
          fontSize="20"
          fontWeight="700"
          fontFamily={LABEL_FONT}
          fill={INK}
          textAnchor="middle"
        >
          Sun
        </text>
      </g>

      {/* Earth */}
      <g transform="translate(360, 150)">
        <circle r={EARTH_R} fill={BLUE} stroke={INK} strokeWidth="2.5" />
        {/* hint of continents — abstract blobs, not real geography */}
        <ellipse cx="-18" cy="-8" rx="14" ry="9" fill="#1A6B2E" opacity="0.85" />
        <ellipse cx="14" cy="14" rx="18" ry="10" fill="#1A6B2E" opacity="0.85" />
        <ellipse cx="-6" cy="26" rx="8" ry="5" fill="#1A6B2E" opacity="0.85" />
        <text
          x="0"
          y="6"
          fontSize="16"
          fontWeight="700"
          fontFamily={LABEL_FONT}
          fill="#FFFFFF"
          textAnchor="middle"
        >
          Earth
        </text>
      </g>

      {/* Moon */}
      <g transform="translate(520, 150)">
        <circle r={MOON_R} fill={MOON} stroke={INK} strokeWidth="2" />
        {/* a few craters for texture */}
        <circle cx="-4" cy="-3" r="2.5" fill={INK_SOFT} opacity="0.45" />
        <circle cx="4" cy="2" r="1.8" fill={INK_SOFT} opacity="0.45" />
        <circle cx="-2" cy="5" r="1.4" fill={INK_SOFT} opacity="0.45" />
        <text
          x="0"
          y={MOON_R + 18}
          fontSize="14"
          fontWeight="700"
          fontFamily={LABEL_FONT}
          fill={INK}
          textAnchor="middle"
        >
          Moon
        </text>
      </g>

      {/* Caption row: the honest scale note */}
      <text
        x="320"
        y="290"
        fontSize="13"
        fontWeight="600"
        fontFamily={LABEL_FONT}
        fill={INK_SOFT}
        textAnchor="middle"
      >
        All spherical · Earth and Moon to scale · Sun is actually ~109 Earths wide
      </text>
    </svg>
  );
}
