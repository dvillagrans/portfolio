/** Parámetros del scroll cinematográfico en Featured Work. */
export const CINEMATIC_SCROLL = {
  /** Viewport heights de scroll entre cada proyecto (más = más deliberado). */
  vhPerSlide: 2.25,
  /** Retardo del scrub — amortigua el wheel antes de mover la timeline. */
  scrub: 1.85,
  slideOffsetY: 22,
  /** Fracción del segmento donde el proyecto queda fijo y legible. */
  holdFraction: 0.78,
  /** Fracción del segmento usada solo para el crossfade. */
  fadeFraction: 0.22,
  snap: {
    durationMin: 0.9,
    durationMax: 1.8,
    /** Espera antes de encajar — evita saltos con micro-scroll. */
    delay: 0.45,
    ease: "power2.inOut" as const,
    /** Sin inercia: un flick corto no salta dos proyectos. */
    inertia: false,
  },
  programmaticScroll: {
    duration: 1.5,
    ease: "power2.inOut" as const,
  },
  /** Delay base (fraction of fadeDur) antes de que entre el slide siguiente. */
  incomingFadeDelayFraction: 0.4,
  /** Delay extra en transiciones dark → light. */
  incomingFadeDelayDarkToLight: 0.58,
} as const;

export const CHROME_TRANSITION_MS = 500;

export function isAccentLight(bg: string): boolean {
  const oklch = bg.match(/oklch\(\s*([\d.]+)%/);
  if (oklch) return parseFloat(oklch[1]) >= 55;

  const hex = bg.replace("#", "");
  if (hex.length >= 6) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const luma = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luma > 0.45;
  }
  return false;
}

export function getIncomingFadeDelay(fromBg: string, toBg: string, fadeDur: number): number {
  const { incomingFadeDelayFraction, incomingFadeDelayDarkToLight } = CINEMATIC_SCROLL;
  if (!isAccentLight(fromBg) && isAccentLight(toBg)) {
    return fadeDur * incomingFadeDelayDarkToLight;
  }
  return fadeDur * incomingFadeDelayFraction;
}

/** Progreso (0–1) donde cada slide está plenamente visible — centro del hold. */
export function buildCinematicSnapPoints(totalSlides: number): number[] {
  if (totalSlides <= 1) return [0];

  const segment = 1 / (totalSlides - 1);
  const { holdFraction, fadeFraction } = CINEMATIC_SCROLL;

  return Array.from({ length: totalSlides }, (_, i) => {
    if (i === 0) return (segment * holdFraction) / 2;
    if (i === totalSlides - 1) return 1 - (segment * fadeFraction) / 2;
    return i * segment + (segment * holdFraction) / 2;
  });
}

/** Índice activo con zona muerta durante el crossfade (no parpadea el rail). */
export function getActiveSceneFromProgress(progress: number, totalSlides: number): number {
  if (totalSlides <= 1) return 0;

  const segment = 1 / (totalSlides - 1);
  const { holdFraction, fadeFraction } = CINEMATIC_SCROLL;
  const clamped = Math.min(1, Math.max(0, progress));

  const segmentIdx = Math.min(totalSlides - 2, Math.floor(clamped / segment + 1e-6));
  const within = clamped - segmentIdx * segment;
  const fadeStart = segment * holdFraction;

  if (segmentIdx >= totalSlides - 1) return totalSlides - 1;
  if (within < fadeStart) return segmentIdx;

  const fadeProgress = (within - fadeStart) / (segment * fadeFraction);
  return fadeProgress < 0.55 ? segmentIdx : segmentIdx + 1;
}
