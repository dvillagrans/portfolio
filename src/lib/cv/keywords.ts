function normalizeToken(token: string): string {
  return token
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

/**
 * Lightweight keyword extraction for deterministic CV selection.
 * Intentionally simple (no NLP deps) but stable.
 */
export function extractKeywords(text: string): string[] {
  const normalized = normalizeToken(text);
  if (!normalized) return [];

  const raw = normalized.split(/\s+/g);
  const stop = new Set([
    "a",
    "an",
    "and",
    "are",
    "as",
    "at",
    "be",
    "by",
    "for",
    "from",
    "has",
    "have",
    "in",
    "is",
    "it",
    "of",
    "on",
    "or",
    "that",
    "the",
    "to",
    "with",
    "you",
    "your",
    "y",
    "de",
    "del",
    "la",
    "las",
    "los",
    "el",
    "en",
    "con",
    "para",
    "por",
    "un",
    "una",
    "que",
  ]);

  const keep: string[] = [];
  for (const t of raw) {
    if (t.length < 3) continue;
    if (stop.has(t)) continue;
    keep.push(t);
  }

  return Array.from(new Set(keep));
}

