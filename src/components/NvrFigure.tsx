import { useId } from 'react';
import type { NetMark, NvrFigure as Figure, NvrShapeFigure } from '../data/types';

const INK = '#0A0A0A';
const GREY = '#b8b8c0';

const SOLID_FILL: Record<'white' | 'black' | 'grey', string> = {
  white: '#FFFFFF',
  black: INK,
  grey: GREY,
};

const SIZE_SCALE: Record<NonNullable<NvrShapeFigure['size']>, number> = {
  sm: 0.62,
  md: 0.82,
  lg: 1,
};

/** Vertices of a regular n-gon centred on (cx, cy), first point at `startDeg` (−90 = pointing up). */
function polygonAt(n: number, cx: number, cy: number, r: number, startDeg: number): string {
  const pts: string[] = [];
  for (let i = 0; i < n; i++) {
    const a = ((startDeg + (i * 360) / n) * Math.PI) / 180;
    pts.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`);
  }
  return pts.join(' ');
}

function polygon(n: number, c: number, r: number, startDeg: number): string {
  return polygonAt(n, c, c, r, startDeg);
}

function starAt(cx: number, cy: number, r: number, startDeg: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const rr = i % 2 === 0 ? r : r * 0.45;
    const a = ((startDeg + i * 36) * Math.PI) / 180;
    pts.push(`${cx + rr * Math.cos(a)},${cy + rr * Math.sin(a)}`);
  }
  return pts.join(' ');
}

function star(c: number, r: number, startDeg: number): string {
  return starAt(c, c, r, startDeg);
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

function Shape({ shape, c, r }: { shape: NvrShapeFigure['shape']; c: number; r: number }) {
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
    case 'flag': {
      // Pole on the left, pennant pointing right — chiral, so `mirrored`
      // produces a genuinely different figure.
      const pts = [
        [-0.62, 1], [-0.62, -1], [0.85, -0.55], [-0.45, -0.1], [-0.45, 1],
      ];
      return (
        <polygon points={pts.map(([x, y]) => `${c + x * r},${c + y * r}`).join(' ')} />
      );
    }
    case 'boot': {
      // L-shaped boot, toe pointing right — the second chiral shape.
      const pts = [
        [-0.55, -0.95], [0, -0.95], [0, 0.2], [0.85, 0.2], [0.85, 0.75], [-0.55, 0.75],
      ];
      return (
        <polygon points={pts.map(([x, y]) => `${c + x * r},${c + y * r}`).join(' ')} />
      );
    }
  }
}

// ─── Cube solids (isometric heightmaps) ─────────────────────────────────────

// 2:1 isometric projection of the unit cube at grid (x=col, y=row), base
// level z. Row 0 is the back row; larger x runs to the viewer's right,
// larger y toward the viewer's lower-left. One grid unit projects to a
// diamond 2 wide × 1 tall, and a cube edge drops 1 vertically.
function cubeCorners(x: number, y: number, z: number) {
  const lift = z + 1; // the TOP face of this cube
  return {
    a: [x - y, (x + y) * 0.5 - lift] as const, // back corner
    b: [x - y + 1, (x + y + 1) * 0.5 - lift] as const, // right corner
    c: [x - y, (x + y + 2) * 0.5 - lift] as const, // front corner
    d: [x - y - 1, (x + y + 1) * 0.5 - lift] as const, // left corner
  };
}

const SOLID_TOP = '#FFFFFF';
const SOLID_LEFT = '#dcdce3';
const SOLID_RIGHT = GREY;

/**
 * A stack of unit cubes drawn back-to-front so nearer cubes overdraw the
 * ones they hide (painter's algorithm — under this projection row-major
 * order is depth order). Every face carries an ink stroke, which is what
 * draws the unit-cube edges the child counts along.
 */
function SolidFigure({ heights, box }: { heights: number[][]; box: number }) {
  const cubes: Array<[number, number, number]> = [];
  heights.forEach((row, y) =>
    row.forEach((h, x) => {
      for (let z = 0; z < h; z++) cubes.push([x, y, z]);
    }),
  );

  // Bounding box over every projected vertex (the side faces extend one
  // unit below the top corners), then scale-and-centre into `box`.
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const [x, y, z] of cubes) {
    const { a, b, c, d } = cubeCorners(x, y, z);
    for (const [px, py] of [a, b, c, d]) {
      minX = Math.min(minX, px);
      maxX = Math.max(maxX, px);
      minY = Math.min(minY, py);
      maxY = Math.max(maxY, py + 1); // side faces reach one unit down
    }
  }
  if (cubes.length === 0) return <svg viewBox={`0 0 ${box} ${box}`} width={box} height={box} />;

  const pad = box * 0.08;
  const s = (box - pad * 2) / Math.max(maxX - minX, maxY - minY);
  const ox = (box - (maxX - minX) * s) / 2 - minX * s;
  const oy = (box - (maxY - minY) * s) / 2 - minY * s;
  const P = ([px, py]: readonly [number, number]) =>
    `${(px * s + ox).toFixed(2)},${(py * s + oy).toFixed(2)}`;

  return (
    <svg viewBox={`0 0 ${box} ${box}`} width={box} height={box} role="img" aria-hidden>
      <g stroke={INK} strokeWidth={Math.max(1.1, box * 0.015)} strokeLinejoin="round">
        {cubes.map(([x, y, z]) => {
          const { a, b, c, d } = cubeCorners(x, y, z);
          const drop = ([px, py]: readonly [number, number]) => [px, py + 1] as const;
          return (
            <g key={`${x}-${y}-${z}`}>
              <polygon points={`${P(a)} ${P(b)} ${P(c)} ${P(d)}`} fill={SOLID_TOP} />
              <polygon points={`${P(d)} ${P(c)} ${P(drop(c))} ${P(drop(d))}`} fill={SOLID_LEFT} />
              <polygon points={`${P(b)} ${P(c)} ${P(drop(c))} ${P(drop(b))}`} fill={SOLID_RIGHT} />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

// ─── Cube nets ──────────────────────────────────────────────────────────────

/** One face symbol, drawn inside a net cell of size `s` whose corner is (px, py). */
function Mark({ mark, px, py, s }: { mark: NetMark; px: number; py: number; s: number }) {
  const cx = px + s / 2;
  const cy = py + s / 2;
  switch (mark) {
    case 'dot':
      return <circle cx={cx} cy={cy} r={s * 0.17} fill={INK} />;
    case 'ring':
      return <circle cx={cx} cy={cy} r={s * 0.2} fill="none" stroke={INK} strokeWidth={s * 0.09} />;
    case 'cross': {
      const r = s * 0.21;
      return (
        <path
          d={`M ${cx - r} ${cy} H ${cx + r} M ${cx} ${cy - r} V ${cy + r}`}
          stroke={INK}
          strokeWidth={s * 0.11}
          strokeLinecap="round"
        />
      );
    }
    case 'star':
      return <polygon points={starAt(cx, cy, s * 0.26, -90)} fill={INK} />;
    case 'stripes': {
      const o = s * 0.22;
      return (
        <g stroke={INK} strokeWidth={s * 0.07} strokeLinecap="round">
          <line x1={px + o} y1={py + s - o * 0.6} x2={px + s - o * 0.6} y2={py + o} />
          <line x1={px + o * 0.6} y1={py + o * 1.6} x2={px + s - o * 1.6} y2={py + o * 0.6} />
          <line x1={px + o * 1.6} y1={py + s - o * 0.6} x2={px + s - o * 0.6} y2={py + o * 1.6} />
        </g>
      );
    }
    case 'triangle':
      return <polygon points={polygonAt(3, cx, cy, s * 0.24, -90)} fill={INK} />;
  }
}

/**
 * An unfolded cube net (or impostor): squares on a grid with optional face
 * marks, scaled to fit the box. Cells keep their authored [row, col] layout.
 */
function NetFigure({
  net,
  box,
}: {
  net: { cells: [number, number][]; marks?: (NetMark | null)[] };
  box: number;
}) {
  const rows = net.cells.map(([r]) => r);
  const cols = net.cells.map(([, c]) => c);
  const minR = Math.min(...rows), maxR = Math.max(...rows);
  const minC = Math.min(...cols), maxC = Math.max(...cols);

  const pad = box * 0.07;
  const s = (box - pad * 2) / Math.max(maxR - minR + 1, maxC - minC + 1);
  const ox = (box - (maxC - minC + 1) * s) / 2;
  const oy = (box - (maxR - minR + 1) * s) / 2;

  return (
    <svg viewBox={`0 0 ${box} ${box}`} width={box} height={box} role="img" aria-hidden>
      {net.cells.map(([r, c], i) => {
        const px = ox + (c - minC) * s;
        const py = oy + (r - minR) * s;
        const mark = net.marks?.[i];
        return (
          <g key={i}>
            <rect
              x={px}
              y={py}
              width={s}
              height={s}
              fill="#FFFFFF"
              stroke={INK}
              strokeWidth={Math.max(1.2, box * 0.018)}
              strokeLinejoin="round"
            />
            {mark && <Mark mark={mark} px={px} py={py} s={s} />}
          </g>
        );
      })}
    </svg>
  );
}

/**
 * Renders one declarative NVR figure as a self-contained SVG. `box` is the
 * pixel size of the (square) cell; the shape is centred and scaled to `size`.
 */
export function NvrFigure({ figure, box = 78 }: { figure: Figure; box?: number }) {
  if ('solid' in figure) return <SolidFigure heights={figure.solid} box={box} />;
  if ('net' in figure) return <NetFigure net={figure.net} box={box} />;
  return <ShapeFigure figure={figure} box={box} />;
}

function ShapeFigure({ figure, box }: { figure: NvrShapeFigure; box: number }) {
  const patternId = useId();
  const c = box / 2;
  const r = box * 0.4 * SIZE_SCALE[figure.size ?? 'md'];
  const fill = figure.fill ?? 'white';
  const fillValue = fill === 'striped' ? `url(#${patternId})` : SOLID_FILL[fill];
  const rotation = figure.rotation ?? 0;
  const dots = figure.dots ?? 0;

  // Mirror about the vertical axis through the centre, then rotate. SVG
  // applies transforms right-to-left, so the flip sits last in the list.
  const transforms = [
    rotation ? `rotate(${rotation} ${c} ${c})` : '',
    figure.mirrored ? `translate(${box} 0) scale(-1 1)` : '',
  ]
    .filter(Boolean)
    .join(' ');

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
        transform={transforms || undefined}
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
