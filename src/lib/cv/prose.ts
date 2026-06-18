/**
 * Replace dash-style separators in prose.
 * Keeps hyphens inside tokens (full-stack, COVID-19, ESCOM-IPN).
 */
export function sanitizeProseDashes(text: string): string {
  return text
    .replace(/^(\s*)[-*]\s+/gm, "$1• ")
    .replace(/\s*[—–]\s*/g, ", ")
    .replace(/\s+-\s+/g, ", ")
    .replace(/,\s*,+/g, ", ")
    .replace(/,\s+([.;!?])/g, "$1")
    .trim();
}
