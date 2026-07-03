import type { CubeStackFigure } from '../data/types';

/**
 * Draws a heightmap of unit cubes as one isometric picture — the on-screen
 * "how many cubes" NVR figure. The projection is a standard axonometric box
 * stack: +column goes right-and-down, +row (toward the back) goes left-and-up,
 * +height goes straight up. Cubes are painted back-to-front and bottom-to-top
 * so nearer cubes correctly overlap farther ones.
 *
 * Faithfulness matters: every cube in every column is drawn, including the
 * hidden support cubes underneath raised ones, so the count the child must
 * reach (the sum of all heights) always matches the figure on screen.
 */

const TW = 24; // half-width of a cube's top face (the horizontal run of one edge)
const TH = 12; // half-depth of the top face (the vertical run of one edge)
const CH = 28; // on-screen height of one cube

const INK = '#0A0A0A';
const TOP = '#FFFFFF';
const LEFT = '#E1E1E7'; // the front-left face — mid tone
const RIGHT = '#C3C3CD'; // the front-right face — darkest, for depth

/** Project a grid corner (gx = column, gy = row-from-back, gz = height) to screen. */
function project(gx: number, gy: number, gz: number): [number, number] {
  return [(gx - gy) * TW, (gx + gy) * TH - gz * CH];
}

const pts = (corners: Array<[number, number]>) =>
  corners.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

/** The three visible faces of the unit cube at footprint (c, r), level z. */
function Cube({ c, r, z }: { c: number; r: number; z: number }) {
  const top = pts([
    project(c, r, z + 1),
    project(c + 1, r, z + 1),
    project(c + 1, r + 1, z + 1),
    project(c, r + 1, z + 1),
  ]);
  const left = pts([
    project(c, r + 1, z),
    project(c + 1, r + 1, z),
    project(c + 1, r + 1, z + 1),
    project(c, r + 1, z + 1),
  ]);
  const right = pts([
    project(c + 1, r, z),
    project(c + 1, r + 1, z),
    project(c + 1, r + 1, z + 1),
    project(c + 1, r, z + 1),
  ]);
  return (
    <g stroke={INK} strokeWidth={1.6} strokeLinejoin="round">
      <polygon points={left} fill={LEFT} />
      <polygon points={right} fill={RIGHT} />
      <polygon points={top} fill={TOP} />
    </g>
  );
}

export function CubeStack({
  heights,
  maxWidth = 340,
}: CubeStackFigure & { maxWidth?: number }) {
  const rows = heights.length;
  const cols = Math.max(1, ...heights.map((row) => row.length));
  const maxH = Math.max(1, ...heights.flat());

  // Flatten to individual cubes, then sort into painter's order: farther cells
  // (smaller col+row) first, and lower cubes before higher ones in a column.
  const cubes: Array<{ c: number; r: number; z: number }> = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < heights[r].length; c++) {
      const h = heights[r][c] ?? 0;
      for (let z = 0; z < h; z++) cubes.push({ c, r, z });
    }
  }
  cubes.sort((a, b) => a.c + a.r - (b.c + b.r) || a.z - b.z);

  // Bounds from the eight extreme corners of the bounding box.
  const xs: number[] = [];
  const ys: number[] = [];
  for (const gx of [0, cols]) {
    for (const gy of [0, rows]) {
      for (const gz of [0, maxH]) {
        const [x, y] = project(gx, gy, gz);
        xs.push(x);
        ys.push(y);
      }
    }
  }
  const pad = 6;
  const minX = Math.min(...xs) - pad;
  const minY = Math.min(...ys) - pad;
  const w = Math.max(...xs) - minX + pad;
  const h = Math.max(...ys) - minY + pad;
  const width = Math.min(maxWidth, w);

  return (
    <svg
      viewBox={`${minX.toFixed(1)} ${minY.toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}`}
      width={width}
      height={(width * h) / w}
      role="img"
      aria-label="A stack of cubes to count"
      style={{ maxWidth: '100%', height: 'auto' }}
    >
      {cubes.map((cube) => (
        <Cube key={`${cube.c}-${cube.r}-${cube.z}`} {...cube} />
      ))}
    </svg>
  );
}
