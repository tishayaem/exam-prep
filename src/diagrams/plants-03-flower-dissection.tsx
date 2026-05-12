const INK = '#0A0A0A';
const PINK = '#f50aa2';
const GREEN = '#0cf35c';
const YELLOW = '#fff000';
const LABEL_FONT = 'Space Grotesk, system-ui, sans-serif';

/**
 * Side-view stylised flower with labelled parts. Petals/sepals coloured;
 * carpel and stamens in ink line-art so the kid can trace the reproductive
 * machinery without colour noise.
 */
export function PlantsFlowerDissectionDiagram() {
  return (
    <svg
      viewBox="0 0 600 480"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Side view of a flower showing petal, sepal, anther, filament, stigma, style, ovary and ovule"
      className="w-full h-auto max-w-[560px]"
    >
      <title>Flower parts</title>

      {/* Stem */}
      <line x1="300" y1="370" x2="300" y2="450" stroke={INK} strokeWidth="4" strokeLinecap="round" />

      {/* Sepals — green cup under the petals */}
      <path
        d="M 220 358 Q 300 330 380 358 Q 380 388 300 396 Q 220 388 220 358 Z"
        fill={GREEN}
        stroke={INK}
        strokeWidth="2.5"
      />

      {/* Petals — two pink leaf-shaped petals flanking the centre */}
      <ellipse cx="220" cy="220" rx="80" ry="34" transform="rotate(-72 220 220)" fill={PINK} stroke={INK} strokeWidth="2.5" />
      <ellipse cx="380" cy="220" rx="80" ry="34" transform="rotate(72 380 220)" fill={PINK} stroke={INK} strokeWidth="2.5" />

      {/* Ovary — swollen base of carpel */}
      <ellipse cx="300" cy="318" rx="32" ry="40" fill="#FFFFFF" stroke={INK} strokeWidth="2.5" />

      {/* Ovules — three dots inside ovary */}
      <circle cx="287" cy="316" r="4" fill={INK} />
      <circle cx="300" cy="332" r="4" fill={INK} />
      <circle cx="313" cy="316" r="4" fill={INK} />

      {/* Style — slender tube from ovary up to stigma */}
      <line x1="300" y1="278" x2="300" y2="138" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />

      {/* Stigma — sticky knob on top */}
      <ellipse cx="300" cy="128" rx="16" ry="10" fill={INK} />

      {/* Left stamen — filament + anther */}
      <line x1="278" y1="270" x2="240" y2="172" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="235" cy="164" rx="14" ry="8" transform="rotate(-22 235 164)" fill={YELLOW} stroke={INK} strokeWidth="2" />

      {/* Right stamen — filament + anther */}
      <line x1="322" y1="270" x2="360" y2="172" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="365" cy="164" rx="14" ry="8" transform="rotate(22 365 164)" fill={YELLOW} stroke={INK} strokeWidth="2" />

      {/* Labels — left column */}
      <line x1="160" y1="155" x2="222" y2="160" stroke={INK} strokeWidth="1.2" />
      <text x="20" y="160" fontSize="17" fontWeight="700" fontFamily={LABEL_FONT} fill={INK}>Anther</text>

      <line x1="160" y1="225" x2="265" y2="220" stroke={INK} strokeWidth="1.2" />
      <text x="20" y="230" fontSize="17" fontWeight="700" fontFamily={LABEL_FONT} fill={INK}>Filament</text>

      <line x1="160" y1="318" x2="268" y2="318" stroke={INK} strokeWidth="1.2" />
      <text x="20" y="323" fontSize="17" fontWeight="700" fontFamily={LABEL_FONT} fill={INK}>Ovary</text>

      <line x1="160" y1="378" x2="296" y2="332" stroke={INK} strokeWidth="1.2" />
      <text x="20" y="383" fontSize="17" fontWeight="700" fontFamily={LABEL_FONT} fill={INK}>Ovule</text>

      {/* Labels — right column */}
      <line x1="430" y1="118" x2="316" y2="124" stroke={INK} strokeWidth="1.2" />
      <text x="440" y="123" fontSize="17" fontWeight="700" fontFamily={LABEL_FONT} fill={INK}>Stigma</text>

      <line x1="430" y1="200" x2="308" y2="210" stroke={INK} strokeWidth="1.2" />
      <text x="440" y="205" fontSize="17" fontWeight="700" fontFamily={LABEL_FONT} fill={INK}>Style</text>

      <line x1="430" y1="265" x2="346" y2="228" stroke={INK} strokeWidth="1.2" />
      <text x="440" y="270" fontSize="17" fontWeight="700" fontFamily={LABEL_FONT} fill={INK}>Petal</text>

      <line x1="430" y1="370" x2="368" y2="380" stroke={INK} strokeWidth="1.2" />
      <text x="440" y="375" fontSize="17" fontWeight="700" fontFamily={LABEL_FONT} fill={INK}>Sepal</text>
    </svg>
  );
}
