import type { Section } from './types';

import { nvr01OddOneOut } from './sections/nvr-01-odd-one-out';
import { nvr02Series } from './sections/nvr-02-series';
import { nvr03Analogies } from './sections/nvr-03-analogies';
import { nvr04Matrices } from './sections/nvr-04-matrices';
import { nvr05Codes } from './sections/nvr-05-codes';
import { nvr06MostSimilar } from './sections/nvr-06-most-similar';
import { nvrCubelab01HowManyCubes } from './sections/nvr-cubelab-01-how-many-cubes';
import { nvrCubelab02CubeNets } from './sections/nvr-cubelab-02-cube-nets';

export const nvrSections: Section[] = [
  nvr01OddOneOut,
  nvr02Series,
  nvr03Analogies,
  nvr04Matrices,
  nvr05Codes,
  nvr06MostSimilar,
  nvrCubelab01HowManyCubes,
  nvrCubelab02CubeNets,
];
