// One-off generator: renders public/icons/icon.svg to the PNG sizes the PWA
// manifest and iOS home screen need. The PNGs are committed, so this only
// needs re-running when the artwork changes. sharp is deliberately not a
// devDependency — run with:
//
//   npm i --no-save sharp && node scripts/make-icons.mjs
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const src = fileURLToPath(new URL('../public/icons/icon.svg', import.meta.url));
const out = (name) =>
  fileURLToPath(new URL(`../public/icons/${name}`, import.meta.url));

const jobs = [
  ['icon-192.png', 192],
  ['icon-512.png', 512],
  // Same artwork; the manifest declares this copy purpose: 'maskable' (the
  // shapes already sit inside the safe zone).
  ['icon-512-maskable.png', 512],
  ['apple-touch-icon.png', 180],
];

for (const [name, size] of jobs) {
  await sharp(src, { density: 300 }).resize(size, size).png().toFile(out(name));
  console.log(`wrote public/icons/${name} (${size}×${size})`);
}
