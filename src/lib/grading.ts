export type GradeResult = 'correct' | 'wrong' | 'borderline';

function normalise(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^\p{L}\p{N}\s/.-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenSet(s: string): Set<string> {
  return new Set(normalise(s).split(' ').filter(Boolean));
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) return 1;
  let inter = 0;
  a.forEach((t) => {
    if (b.has(t)) inter += 1;
  });
  return inter / new Set([...a, ...b]).size;
}

export function grade(
  userInput: string,
  canonical: string | string[],
  acceptable: string[] = [],
): GradeResult {
  const user = normalise(userInput);
  if (!user) return 'wrong';

  const candidates = [
    ...(Array.isArray(canonical) ? canonical : [canonical]),
    ...acceptable,
  ].map(normalise);

  for (const c of candidates) {
    if (user === c) return 'correct';
  }

  for (const c of candidates) {
    if (c.length > 2 && (user.includes(c) || c.includes(user))) return 'correct';
  }

  const userTokens = tokenSet(userInput);
  let best = 0;
  for (const c of candidates) {
    const sim = jaccard(userTokens, new Set(c.split(' ')));
    if (sim > best) best = sim;
  }

  if (best >= 0.7) return 'correct';
  if (best >= 0.4) return 'borderline';
  return 'wrong';
}

/**
 * Strict grader for numeric / short-symbolic answers (the `numeric` question
 * type). Unlike `grade`, there is no fuzzy token matching — `120` must never
 * count as `20`. We compare two ways:
 *   1. as parsed numbers, so `42` === `42.00` and `7` === `7`;
 *   2. as normalised strings, so non-decimal forms like `16:55` or `7/24` work.
 *
 * Authoring rule: keep the answer a bare value and put units in the prompt
 * ("…in degrees?"). Currency (£/$), thousands commas, %, ° and whitespace are
 * tolerated; anything else unusual should be listed in `acceptable`.
 */
export function gradeNumeric(
  userInput: string,
  canonical: string | string[],
  acceptable: string[] = [],
): boolean {
  const user = normaliseNum(userInput);
  if (!user) return false;

  const candidates = [
    ...(Array.isArray(canonical) ? canonical : [canonical]),
    ...acceptable,
  ].map(normaliseNum);

  for (const c of candidates) {
    if (user === c) return true;
    const un = Number(user);
    const cn = Number(c);
    if (Number.isFinite(un) && Number.isFinite(cn) && un === cn) return true;
  }
  return false;
}

function normaliseNum(s: string): string {
  return s
    .toLowerCase()
    .replace(/[£$,%°\s]/g, '')
    .trim();
}

export function gradeMatch(
  userPairs: Record<string, string>,
  canonical: { left: string; right: string }[],
): boolean {
  if (Object.keys(userPairs).length !== canonical.length) return false;
  return canonical.every((p) => userPairs[p.left] === p.right);
}

export function gradeSequence(
  userOrder: readonly string[],
  canonical: readonly string[],
): boolean {
  if (userOrder.length !== canonical.length) return false;
  return userOrder.every((item, i) => item === canonical[i]);
}
