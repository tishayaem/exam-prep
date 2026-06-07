const INK = '#0A0A0A';
const INK_SOFT = '#6B6B6B';
const GREEN = '#0cf35c';
const RULE = '#E6E6E6';
const LABEL_FONT = 'Space Grotesk, system-ui, sans-serif';

const X0 = 130;
const Y0 = 70;
const U = 28; // pixels per cm
const W = 12;
const H = 7;

export function MathsAreaVolumeDiagram() {
  return (
    <svg
      viewBox="0 0 560 320"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="A rectangle 12 cm wide and 7 cm tall, drawn as a grid of unit squares. Its area is 12 times 7 equals 84 square centimetres; its perimeter is 2 times (12 plus 7) equals 38 centimetres."
      className="w-full h-auto max-w-[560px]"
    >
      <title>Rectangle: area = 84 cm², perimeter = 38 cm</title>

      {/* Unit-square grid (light) */}
      <rect x={X0} y={Y0} width={W * U} height={H * U} fill={GREEN} opacity="0.12" />
      {Array.from({ length: W - 1 }).map((_, i) => (
        <line key={`v${i}`} x1={X0 + (i + 1) * U} y1={Y0} x2={X0 + (i + 1) * U} y2={Y0 + H * U} stroke={RULE} strokeWidth="1" />
      ))}
      {Array.from({ length: H - 1 }).map((_, i) => (
        <line key={`h${i}`} x1={X0} y1={Y0 + (i + 1) * U} x2={X0 + W * U} y2={Y0 + (i + 1) * U} stroke={RULE} strokeWidth="1" />
      ))}
      <rect x={X0} y={Y0} width={W * U} height={H * U} fill="none" stroke={INK} strokeWidth="2.5" />

      {/* Side labels */}
      <text x={X0 + (W * U) / 2} y={Y0 - 16} fontSize="16" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">12 cm</text>
      <text x={X0 - 18} y={Y0 + (H * U) / 2} fontSize="16" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle" transform={`rotate(-90 ${X0 - 18} ${Y0 + (H * U) / 2})`}>7 cm</text>

      {/* Area label inside */}
      <text x={X0 + (W * U) / 2} y={Y0 + (H * U) / 2 - 4} fontSize="13" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle" letterSpacing="0.06em">AREA</text>
      <text x={X0 + (W * U) / 2} y={Y0 + (H * U) / 2 + 22} fontSize="22" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">84 cm²</text>

      {/* Formulae */}
      <text x="280" y="296" fontSize="15" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle">
        Area = 12 × 7 = 84 cm²   ·   Perimeter = 2 × (12 + 7) = 38 cm
      </text>
    </svg>
  );
}
