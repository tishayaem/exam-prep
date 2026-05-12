const INK = '#0A0A0A';
const INK_SOFT = '#6B6B6B';
const PINK = '#f50aa2';
const GREEN = '#0cf35c';
const YELLOW = '#fff000';
const LABEL_FONT = 'Space Grotesk, system-ui, sans-serif';

interface FlowerProps {
  cx: number;
  cy: number;
  label: string;
}

function Flower({ cx, cy, label }: FlowerProps) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      {/* Stem */}
      <line x1="0" y1="20" x2="0" y2="120" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      {/* Leaf */}
      <ellipse cx="14" cy="80" rx="14" ry="6" fill={GREEN} stroke={INK} strokeWidth="1.5" transform="rotate(30 14 80)" />
      {/* Petals — 5 around the centre */}
      {Array.from({ length: 5 }, (_, i) => {
        const a = (i * 2 * Math.PI) / 5 - Math.PI / 2;
        const px = Math.cos(a) * 18;
        const py = Math.sin(a) * 18;
        return <ellipse key={i} cx={px} cy={py} rx="16" ry="10" fill={PINK} stroke={INK} strokeWidth="1.5" transform={`rotate(${(a * 180) / Math.PI} ${px} ${py})`} />;
      })}
      {/* Central yellow anther disc with pollen dots */}
      <circle r="10" fill={YELLOW} stroke={INK} strokeWidth="1.5" />
      <circle cx="-3" cy="-3" r="1.5" fill={INK} />
      <circle cx="3" cy="-2" r="1.5" fill={INK} />
      <circle cx="-2" cy="3" r="1.5" fill={INK} />
      <circle cx="3" cy="3" r="1.5" fill={INK} />
      {/* Label */}
      <text x="0" y="140" fontSize="13" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle">{label}</text>
    </g>
  );
}

export function PlantsPollinationDiagram() {
  return (
    <svg
      viewBox="0 0 640 300"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="A bee carrying pollen from one flower to another. The bee picks up pollen from the first flower's anthers and drops it on the second flower's stigma."
      className="w-full h-auto max-w-[600px]"
    >
      <title>Pollination</title>

      {/* Left flower */}
      <Flower cx={120} cy={120} label="Flower 1" />

      {/* Right flower */}
      <Flower cx={520} cy={120} label="Flower 2" />

      {/* Bee path arc */}
      <path d="M 145 110 Q 320 30 495 110" fill="none" stroke={INK_SOFT} strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
      <polygon points="495,110 484,106 488,118" fill={INK_SOFT} />

      {/* Bee */}
      <g transform="translate(320, 50)">
        {/* Body */}
        <ellipse rx="22" ry="14" fill={YELLOW} stroke={INK} strokeWidth="2" />
        {/* Black stripes */}
        <rect x="-14" y="-14" width="6" height="28" fill={INK} />
        <rect x="-2" y="-14" width="6" height="28" fill={INK} />
        <rect x="10" y="-14" width="6" height="28" fill={INK} />
        {/* Wings */}
        <ellipse cx="-4" cy="-16" rx="10" ry="6" fill="#FFFFFF" stroke={INK} strokeWidth="1.5" opacity="0.85" />
        <ellipse cx="8" cy="-16" rx="10" ry="6" fill="#FFFFFF" stroke={INK} strokeWidth="1.5" opacity="0.85" />
        {/* Pollen specks on body */}
        <circle cx="-8" cy="-4" r="1.6" fill={YELLOW} stroke={INK} strokeWidth="0.5" />
        <circle cx="0" cy="-6" r="1.6" fill={YELLOW} stroke={INK} strokeWidth="0.5" />
        <circle cx="6" cy="-3" r="1.6" fill={YELLOW} stroke={INK} strokeWidth="0.5" />
        {/* Head/eye */}
        <circle cx="-20" cy="-2" r="6" fill={INK} />
      </g>
      <text x="320" y="22" fontSize="14" fontWeight="700" fontFamily={LABEL_FONT} fill={INK} textAnchor="middle">Bee carries pollen</text>

      {/* Annotation arrows */}
      <line x1="115" y1="155" x2="115" y2="200" stroke={INK_SOFT} strokeWidth="1.5" />
      <text x="115" y="220" fontSize="12" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle">pollen picked up</text>
      <text x="115" y="236" fontSize="12" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle">from anthers</text>

      <line x1="525" y1="155" x2="525" y2="200" stroke={INK_SOFT} strokeWidth="1.5" />
      <text x="525" y="220" fontSize="12" fontWeight="700" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle">pollen lands on</text>
      <text x="525" y="236" fontSize="12" fontFamily={LABEL_FONT} fill={INK_SOFT} textAnchor="middle">sticky stigma</text>
    </svg>
  );
}
