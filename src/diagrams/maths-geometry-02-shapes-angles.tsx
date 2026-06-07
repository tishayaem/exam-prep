const INK = '#0A0A0A';
const INK_SOFT = '#6B6B6B';
const PINK = '#f50aa2';
const GREEN = '#0cf35c';
const BLUE = '#0185fd';
const RULE = '#E6E6E6';
const LABEL_FONT = 'Space Grotesk, system-ui, sans-serif';

export function MathsShapesAnglesDiagram() {
  return (
    <svg
      viewBox="0 0 640 250"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Left: a straight line with a ray, showing two angles a and b that add to 180 degrees. Right: a triangle whose three angles a, b and c add to 180 degrees."
      className="w-full h-auto max-w-[600px]"
    >
      <title>Angle facts: angles on a line and in a triangle both make 180°</title>

      <text x="170" y="34" fontSize="14" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle" letterSpacing="0.06em">ON A LINE</text>
      <text x="470" y="34" fontSize="14" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle" letterSpacing="0.06em">IN A TRIANGLE</text>
      <line x1="320" y1="20" x2="320" y2="235" stroke={RULE} strokeWidth="1" />

      {/* ── Straight line + ray ── */}
      <line x1="40" y1="175" x2="300" y2="175" stroke={INK} strokeWidth="2.5" />
      <line x1="170" y1="175" x2="245" y2="95" stroke={INK} strokeWidth="2.5" />
      {/* angle markers */}
      <path d="M 204 175 A 34 34 0 0 0 193.3 150.2" fill="none" stroke={GREEN} strokeWidth="3" />
      <path d="M 193.3 150.2 A 34 34 0 0 0 136 175" fill="none" stroke={PINK} strokeWidth="3" />
      <text x="158" y="146" fontSize="16" fontWeight="700" fontFamily={LABEL_FONT} fill={PINK} textAnchor="middle">a</text>
      <text x="214" y="165" fontSize="16" fontWeight="700" fontFamily={LABEL_FONT} fill={GREEN} textAnchor="middle">b</text>
      <circle cx="170" cy="175" r="3.5" fill={INK} />
      <text x="170" y="208" fontSize="15" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">a + b = 180°</text>

      {/* ── Triangle ── */}
      <path d="M 370 180 L 560 180 L 465 75 Z" fill="none" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M 394 180 A 24 24 0 0 0 386.1 162.2" fill="none" stroke={PINK} strokeWidth="3" />
      <path d="M 536 180 A 24 24 0 0 1 543.9 162.2" fill="none" stroke={GREEN} strokeWidth="3" />
      <path d="M 448.9 92.8 A 24 24 0 0 0 481.1 92.8" fill="none" stroke={BLUE} strokeWidth="3" />
      <text x="392" y="170" fontSize="15" fontWeight="700" fontFamily={LABEL_FONT} fill={PINK} textAnchor="middle">a</text>
      <text x="538" y="170" fontSize="15" fontWeight="700" fontFamily={LABEL_FONT} fill={GREEN} textAnchor="middle">b</text>
      <text x="465" y="110" fontSize="15" fontWeight="700" fontFamily={LABEL_FONT} fill={BLUE} textAnchor="middle">c</text>
      <text x="465" y="208" fontSize="15" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">a + b + c = 180°</text>
    </svg>
  );
}
