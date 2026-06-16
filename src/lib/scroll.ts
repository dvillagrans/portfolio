import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { CINEMATIC_SCROLL, buildCinematicSnapPoints } from "./featuredWorkScrollConfig";

let scrollToRegistered = false;

function ensureScrollToPlugin() {
  if (!scrollToRegistered) {
    gsap.registerPlugin(ScrollToPlugin);
    scrollToRegistered = true;
  }
}

export interface SmoothScrollOptions {
  duration?: number;
  ease?: string;
  offset?: number;
}

/** GSAP-powered scroll — evita el "smooth" nativo que pelea con ScrollTrigger pin/snap. */
export function smoothScrollTo(targetY: number, options: SmoothScrollOptions = {}) {
  ensureScrollToPlugin();
  const { duration = 1.25, ease = "power2.inOut", offset = 0 } = options;

  gsap.to(window, {
    scrollTo: { y: Math.max(0, targetY + offset), autoKill: true },
    duration,
    ease,
    overwrite: "auto",
  });
}

export function smoothScrollToElement(
  el: HTMLElement,
  options: SmoothScrollOptions = {}
) {
  const y = el.getBoundingClientRect().top + window.scrollY;
  smoothScrollTo(y, options);
}

export function smoothScrollToHash(
  hash: string,
  options: SmoothScrollOptions = {}
) {
  const id = hash.replace(/^#/, "");
  const el = document.getElementById(id);
  if (el) smoothScrollToElement(el, options);
}

export function getFeaturedWorkScrollDistance(totalSlides: number): number {
  return (totalSlides - 1) * window.innerHeight * CINEMATIC_SCROLL.vhPerSlide;
}

export function getFeaturedWorkSceneScrollY(
  sectionEl: HTMLElement,
  sceneIndex: number,
  totalSlides: number
): number {
  const sectionTop = sectionEl.getBoundingClientRect().top + window.scrollY;
  const scrollDistance = getFeaturedWorkScrollDistance(totalSlides);
  const snapPoints = buildCinematicSnapPoints(totalSlides);
  const progress = snapPoints[sceneIndex] ?? sceneIndex / (totalSlides - 1);
  return sectionTop + progress * scrollDistance;
}
