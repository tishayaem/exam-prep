import type { Pack, Subject } from './types';

/**
 * The single source of truth for how packs group under subjects and what they're
 * called. Home, Study and the Mock Test subject chooser all read from here, so
 * adding a pack (or a whole subject) is a data change — no `pack === 'plants'`
 * style branching scattered across the modes.
 *
 * Order matters: it's the display order on Home (within each subject) and the
 * numbering of the pack headers.
 */
export interface PackDef {
  slug: Pack;
  subject: Subject;
  title: string;
  /**
   * Marks a stretch-tier "Lab" pack (Puzzle Lab, Word Lab, Cube Lab…).
   * Stretch questions must carry `reasoning: true` + ≥1 `drivers` tag
   * (enforced by data.test.ts) and feed the weekly Puzzle mix.
   */
  stretch?: boolean;
}

export interface SubjectDef {
  id: Subject;
  title: string;
  /**
   * Accent colour for the subject's Home card and subject-page underline.
   * Keys map to bg-neon-* classes where they're rendered (Tailwind needs the
   * full class name in a .tsx file, so the mapping lives with the components).
   */
  tone: 'green' | 'blue' | 'yellow' | 'pink' | 'purple';
  /** Kid-facing one-liner on the Home subject card. */
  blurb: string;
}

/** Subjects in the order they appear on Home. */
export const SUBJECTS: SubjectDef[] = [
  {
    id: 'science',
    title: 'Science',
    tone: 'green',
    blurb: 'Plants, space and forces — how the world works.',
  },
  {
    id: 'maths',
    title: 'Maths',
    tone: 'blue',
    blurb: 'Numbers, fractions, shapes and problem solving.',
  },
  {
    id: 'english',
    title: 'English',
    tone: 'yellow',
    blurb: 'Reading, writing and getting the grammar right.',
  },
  {
    id: 'non-verbal',
    title: 'Non-Verbal Reasoning',
    tone: 'pink',
    blurb: 'Spot the pattern hiding in the pictures.',
  },
  {
    id: 'verbal',
    title: 'Verbal Reasoning',
    tone: 'purple',
    blurb: 'Crack codes and play detective with words.',
  },
];

export const PACKS: PackDef[] = [
  // Science
  { slug: 'plants', subject: 'science', title: 'Plants & Living Things' },
  { slug: 'earth-space-forces', subject: 'science', title: 'Earth, Space & Forces' },

  // Maths
  { slug: 'maths-number', subject: 'maths', title: 'Number & Calculation' },
  { slug: 'maths-fractions', subject: 'maths', title: 'Fractions, Decimals & Percentages' },
  { slug: 'maths-ratio', subject: 'maths', title: 'Ratio, Proportion & Algebra' },
  { slug: 'maths-geometry', subject: 'maths', title: 'Measurement & Geometry' },
  { slug: 'maths-data', subject: 'maths', title: 'Data & Problem Solving' },
  { slug: 'maths-puzzles', subject: 'maths', title: 'Puzzle Lab', stretch: true },

  // English
  { slug: 'english-reading', subject: 'english', title: 'Reading & Comprehension' },
  { slug: 'english-spag', subject: 'english', title: 'Spelling, Punctuation & Grammar' },
  { slug: 'english-writing', subject: 'english', title: 'Writing & Composition' },

  // Non-Verbal Reasoning
  { slug: 'nvr-core', subject: 'non-verbal', title: 'Figures & Patterns' },
  { slug: 'nvr-cubelab', subject: 'non-verbal', title: 'Cube Lab', stretch: true },

  // Verbal Reasoning
  { slug: 'vr-core', subject: 'verbal', title: 'Words, Codes & Logic' },
  { slug: 'vr-wordlab', subject: 'verbal', title: 'Word Lab', stretch: true },
];

/** Slugs of every stretch-tier pack — the Puzzle-mix pool and test contracts key off this. */
export const STRETCH_PACK_SLUGS: ReadonlySet<Pack> = new Set(
  PACKS.filter((p) => p.stretch).map((p) => p.slug),
);

/** Human-readable pack title for a slug, falling back to the slug itself. */
export function packTitle(slug: Pack): string {
  return PACKS.find((p) => p.slug === slug)?.title ?? slug;
}

/** Subject a pack belongs to (used for the Study overline). */
export function packSubject(slug: Pack): Subject | undefined {
  return PACKS.find((p) => p.slug === slug)?.subject;
}

/** Human-readable subject title for an id. */
export function subjectTitle(id: Subject): string {
  return SUBJECTS.find((s) => s.id === id)?.title ?? id;
}
