import { useId } from 'react';
import type { NvrFigure as Figure } from '../data/types';

const INK = '#0A0A0A';
const GREY = '#b8b8c0';

const SOLID_FILL: Record<'white' | 'black' | 'grey', string> = {
  white: '#FFFFFF',
  black: INK,
  grey: GREY,
};

const SIZE_SCALE: Record<NonNullable<Figure['size']>, number> = {
  sm: 0.62,
  md: 0.82,
  lg: 1,
};

/** Vertices of a regular n-gon, first point at `startDeg` (−90 = pointing up). */
function polygon(n: number, c: number, r: number, startDeg: number): string {
  const pts: string[] = [];
  for (let i = 0; i < n; i++) {
    const a = ((startDeg + (i * 360) / n) * Math.PI) / 180;
    pts.push(`${c + r * Math.cos(a)},${c + r * Math.sin(a)}`);
  }
  return pts.join(' ');
}

function star(c: number, r: number, startDeg: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const rr = i % 2 === 0 ? r : r * 0.45;
    const a = ((startDeg + i * 36) * Math.PI) / 180;
    pts.push(`${c + rr * Math.cos(a)},${c + rr * Math.sin(a)}`);
  }
  return pts.join(' ');
}

/** Offsets (in units of r) for internal dots, in compact dice-like clusters. */
function dotOffsets(n: number): Array<[number, number]> {
  switch (n) {
    case 1: return [[0, 0]];
    case 2: return [[-0.32, 0], [0.32, 0]];
    case 3: return [[0, -0.34], [-0.32, 0.24], [0.32, 0.24]];
    case 4: return [[-0.3, -0.3], [0.3, -0.3], [-0.3, 0.3], [0.3, 0.3]];
    case 5: return [[-0.32, -0.3], [0.32, -0.3], [0, 0], [-0.32, 0.3], [0.32, 0.3]];
    case 6: return [[-0.32, -0.34], [0.32, -0.34], [-0.32, 0], [0.32, 0], [-0.32, 0.34], [0.32, 0.34]];
    default: {
      // Wrap into rows of up to 3, centred.
      const perRow = 3;
      const rows = Math.ceil(n / perRow);
      return Array.from({ length: n }, (_, i) => {
        const row = Math.floor(i / perRow);
        const col = i % perRow;
        const inRow = Math.min(perRow, n - row * perRow);
        return [(-(inRow - 1) / 2 + col) * 0.3, (-(rows - 1) / 2 + row) * 0.32] as [number, number];
      });
    }
  }
}

function Shape({ shape, c, r }: { shape: Figure['shape']; c: number; r: number }) {
  switch (shape) {
    case 'circle':
      return <circle cx={c} cy={c} r={r} />;
    case 'square': {
      const s = r * 0.86;
      return <rect x={c - s} y={c - s} width={s * 2} height={s * 2} />;
    }
    case 'diamond':
      return <polygon points={polygon(4, c, r, -90)} />;
    case 'triangle':
      return <polygon points={polygon(3, c, r, -90)} />;
    case 'pentagon':
      return <polygon points={polygon(5, c, r, -90)} />;
    case 'hexagon':
      return <polygon points={polygon(6, c, r, -90)} />;
    case 'star':
      return <polygon points={star(c, r, -90)} />;
    case 'arrow': {
      const h = r * 0.3;
      const b = r * 0.25; // where the head begins
      return (
        <polygon
          points={`${c - r},${c - h} ${c + b},${c - h} ${c + b},${c - r * 0.62} ${c + r},${c} ${c + b},${c + r * 0.62} ${c + b},${c + h} ${c - r},${c + h}`}
        />
      );
    }
  }
}

/**
 * Renders one declarative NVR figure as a self-contained SVG. `box` is the
 * pixel size of the (square) cell; the shape is centred and scaled to `size`.
 */
export function NvrFigure({ figure, box = 78 }: { figure: Figure; box?: number }) {
  const patternId = useId();
  const c = box / 2;
  const r = box * 0.4 * SIZE_SCALE[figure.size ?? 'md'];
  const fill = figure.fill ?? 'white';
  const fillValue = fill === 'striped' ? `url(#${patternId})` : SOLID_FILL[fill];
  const rotation = figure.rotation ?? 0;
  const dots = figure.dots ?? 0;

  return (
    <svg viewBox={`0 0 ${box} ${box}`} width={box} height={box} role="img" aria-hidden>
      {fill === 'striped' && (
        <defs>
          <pattern id={patternId} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="7" height="7" fill="#FFFFFF" />
            <line x1="0" y1="0" x2="0" y2="7" stroke={INK} strokeWidth="2.5" />
          </pattern>
        </defs>
      )}
      <g
        fill={fillValue}
        stroke={INK}
        strokeWidth="2.5"
        strokeLinejoin="round"
        transform={rotation ? `rotate(${rotation} ${c} ${c})` : undefined}
      >
        <Shape shape={figure.shape} c={c} r={r} />
      </g>
      {dots > 0 &&
        dotOffsets(dots).map(([dx, dy], i) => (
          <circle key={i} cx={c + dx * r} cy={c + dy * r} r={Math.max(2.5, r * 0.12)} fill={INK} />
        ))}
    </svg>
  );
}
