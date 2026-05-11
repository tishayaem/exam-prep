/**
 * Lightweight confetti — call confettiBurst(x, y, opts?). Mounts a single
 * full-viewport canvas lazily on first use and removes itself after particles
 * settle (so we don't keep an idle canvas on every page).
 */

type Shape = 'rect' | 'circle';

interface BurstOpts {
  colors?: string[];
  count?: number;
  shapes?: Shape[];
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  shape: Shape;
  rot: number;
  spin: number;
  life: number;
}

let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let particles: Particle[] = [];
let raf: number | null = null;

function resize() {
  if (!canvas || !ctx) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function ensure() {
  if (canvas) return;
  canvas = document.createElement('canvas');
  canvas.style.cssText =
    'position:fixed;inset:0;pointer-events:none;z-index:99999';
  document.body.appendChild(canvas);
  ctx = canvas.getContext('2d');
  resize();
  window.addEventListener('resize', resize);
}

function teardown() {
  if (raf !== null) cancelAnimationFrame(raf);
  raf = null;
  window.removeEventListener('resize', resize);
  canvas?.remove();
  canvas = null;
  ctx = null;
}

function loop() {
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = particles.filter((p) => p.life > 0);

  for (const p of particles) {
    p.vy += 0.18;
    p.vx *= 0.995;
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.spin;
    p.life -= 1;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.globalAlpha = Math.min(1, p.life / 30);
    ctx.fillStyle = p.color;
    if (p.shape === 'rect') {
      ctx.fillRect(-p.size, -p.size * 0.5, p.size * 2, p.size);
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  if (particles.length > 0) {
    raf = requestAnimationFrame(loop);
  } else {
    teardown();
  }
}

const DEFAULT_COLORS = ['#0cf35c', '#f50aa2', '#fff000', '#0185fd', '#0A0A0A'];
const DEFAULT_SHAPES: Shape[] = ['rect', 'circle'];

export function confettiBurst(x: number, y: number, opts: BurstOpts = {}) {
  // Honour the OS-level reduced-motion preference — no fireworks if asked.
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

  ensure();
  const colors = opts.colors ?? DEFAULT_COLORS;
  const shapes = opts.shapes ?? DEFAULT_SHAPES;
  const count = opts.count ?? 80;

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 9;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 4,
      size: 4 + Math.random() * 6,
      color: colors[(Math.random() * colors.length) | 0],
      shape: shapes[(Math.random() * shapes.length) | 0],
      rot: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.4,
      life: 90 + Math.random() * 40,
    });
  }
  if (raf === null) raf = requestAnimationFrame(loop);
}

/**
 * Fire from the centre of the element that received the click. Designed to be
 * dropped straight into onClick={burstFromEvent} on celebratory buttons.
 */
export function burstFromEvent(e: { currentTarget: Element }) {
  const r = e.currentTarget.getBoundingClientRect();
  confettiBurst(r.left + r.width / 2, r.top + r.height / 2);
}
