import type { CubeNetFigure, NetSymbol } from '../data/types';

/**
 * Draws a flat cube net (or a net impostor) as a grid of outlined squares with
 * a symbol on each face — the fold-a-net NVR figure. Purely 2D: the folding
 * happens in the child's head, which is the whole skill. Each glyph is drawn
 * in face-local coordinates centred on (0, 0) so every face reads the same
 * way up — real papers print nets with unrotated symbols unless orientation
 * itself is being tested, and orientation is out of scope here.
 */

const CELL = 52; // side of one face square
const INK = '#0A0A0A';
const FACE = '#FFFFFF';

/** Points string for a regular star: `spikes` outer points around (0, 0). */
function starPoints(spikes: number, outer: number, inner: number): string {
  const pts: string[] = [];
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI * i) / spikes - Math.PI / 2;
    pts.push(`${(r * Math.cos(a)).toFixed(2)},${(r * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(' ');
}

const STAR = starPoints(5, 14, 5.6);

/** One face symbol, drawn filled-ink inside a face square. */
function Glyph({ symbol }: { symbol: NetSymbol }) {
  switch (symbol) {
    case 'circle':
      return <circle r={11} fill={INK} />;
    case 'square':
      return <rect x={-9.5} y={-9.5} width={19} height={19} fill={INK} />;
    case 'triangle':
      return <polygon points="0,-12 11.5,9 -11.5,9" fill={INK} />;
    case 'star':
      return <polygon points={STAR} fill={INK} />;
    case 'moon':
      // Crescent: the outer arc of a big circle, closed by the inner arc of a
      // smaller one — open side facing right.
      return (
        <path
          d="M 5.5,-10.4 A 12,12 0 1,0 5.5,10.4 A 9.5,9.5 0 1,1 5.5,-10.4 Z"
          fill={INK}
        />
      );
    case 'heart':
      return (
        <path
          d="M 0,11 C -1.2,9.6 -11,3.4 -11,-3.4 A 5.9,5.9 0 0 1 0,-6.4 A 5.9,5.9 0 0 1 11,-3.4 C 11,3.4 1.2,9.6 0,11 Z"
          fill={INK}
        />
      );
  }
}

export function CubeNet({
  cells,
  maxWidth = 320,
}: CubeNetFigure & { maxWidth?: number }) {
  const rows = cells.length;
  const cols = Math.max(1, ...cells.map((row) => row.length));
  const pad = 2;
  const w = cols * CELL + pad * 2;
  const h = rows * CELL + pad * 2;
  const width = Math.min(maxWidth, w);

  return (
    <svg
      viewBox={`${-pad} ${-pad} ${w} ${h}`}
      width={width}
      height={(width * h) / w}
      role="img"
      aria-label="A flat net of squares that may fold into a cube"
      style={{ maxWidth: '100%', height: 'auto' }}
    >
      {cells.flatMap((row, r) =>
        row.map((cell, c) =>
          cell === null ? null : (
            <g key={`${r}-${c}`} transform={`translate(${c * CELL}, ${r * CELL})`}>
              <rect
                width={CELL}
                height={CELL}
                fill={FACE}
                stroke={INK}
                strokeWidth={2}
                strokeLinejoin="round"
              />
              {cell !== 'blank' && (
                <g transform={`translate(${CELL / 2}, ${CELL / 2})`}>
                  <Glyph symbol={cell} />
                </g>
              )}
            </g>
          ),
        ),
      )}
    </svg>
  );
}
