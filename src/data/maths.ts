import type { Section } from './types';

import { mathsNumber01PlaceValue } from './sections/maths-number-01-place-value';
import { mathsNumber02Operations } from './sections/maths-number-02-operations';
import { mathsNumber03FactorsPrimes } from './sections/maths-number-03-factors-primes';

import { mathsFractions01Fractions } from './sections/maths-fractions-01-fractions';
import { mathsFractions02Decimals } from './sections/maths-fractions-02-decimals';
import { mathsFractions03Percentages } from './sections/maths-fractions-03-percentages';

import { mathsRatio01Ratio } from './sections/maths-ratio-01-ratio';
import { mathsRatio02Algebra } from './sections/maths-ratio-02-algebra';

import { mathsGeometry01Measurement } from './sections/maths-geometry-01-measurement';
import { mathsGeometry02ShapesAngles } from './sections/maths-geometry-02-shapes-angles';
import { mathsGeometry03AreaVolume } from './sections/maths-geometry-03-area-volume';
import { mathsGeometry04Coordinates } from './sections/maths-geometry-04-coordinates';

import { mathsData01Statistics } from './sections/maths-data-01-statistics';
import { mathsData02WordProblems } from './sections/maths-data-02-word-problems';

import { mathsPuzzles01WorkingBackwards } from './sections/maths-puzzles-01-working-backwards';
import { mathsPuzzles02LogicAndCertainty } from './sections/maths-puzzles-02-logic-and-certainty';

export const mathsSections: Section[] = [
  // Number & Calculation
  mathsNumber01PlaceValue,
  mathsNumber02Operations,
  mathsNumber03FactorsPrimes,

  // Fractions, Decimals & Percentages
  mathsFractions01Fractions,
  mathsFractions02Decimals,
  mathsFractions03Percentages,

  // Ratio, Proportion & Algebra
  mathsRatio01Ratio,
  mathsRatio02Algebra,

  // Measurement & Geometry
  mathsGeometry01Measurement,
  mathsGeometry02ShapesAngles,
  mathsGeometry03AreaVolume,
  mathsGeometry04Coordinates,

  // Data & Problem Solving
  mathsData01Statistics,
  mathsData02WordProblems,

  // Puzzle Lab (stretch tier — competition-style archetypes)
  mathsPuzzles01WorkingBackwards,
  mathsPuzzles02LogicAndCertainty,
];
