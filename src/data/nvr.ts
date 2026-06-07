import type { Section } from './types';

import { nvr01OddOneOut } from './sections/nvr-01-odd-one-out';
import { nvr02Series } from './sections/nvr-02-series';
import { nvr03Analogies } from './sections/nvr-03-analogies';
import { nvr04Matrices } from './sections/nvr-04-matrices';

export const nvrSections: Section[] = [
  nvr01OddOneOut,
  nvr02Series,
  nvr03Analogies,
  nvr04Matrices,
];
