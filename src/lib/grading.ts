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
