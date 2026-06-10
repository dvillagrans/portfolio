"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export interface HueStop {
  sectionId: string;
  accent: string;
  accentLight: string;
  label?: string;
}

export const DEFAULT_STOPS: HueStop[] = [
  { sectionId: "hero",       accent: "oklch(40% 0.085 195)", accentLight: "oklch(55% 0.085 195)", label: "Hero" },
  { sectionId: "projects",   accent: "oklch(45% 0.090 200)", accentLight: "oklch(60% 0.090 200)", label: "Projects" },
  { sectionId: "systems",    accent: "oklch(50% 0.095 240)", accentLight: "oklch(65% 0.095 240)", label: "Systems" },
  { sectionId: "principles", accent: "oklch(45% 0.090 80)",  accentLight: "oklch(60% 0.090 80)",  label: "Principles" },
  { sectionId: "stack",      accent: "oklch(45% 0.090 160)", accentLight: "oklch(60% 0.090 160)", label: "Stack" },
  { sectionId: "contact",    accent: "oklch(40% 0.085 195)", accentLight: "oklch(55% 0.085 195)", label: "Contact" },
];

export function useSectionHue(stops: HueStop[] = DEFAULT_STOPS) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const root = document.documentElement;
    const triggers: ScrollTrigger[] = [];

    for (const stop of stops) {
      const el = document.getElementById(stop.sectionId);
      if (!el) continue;

      const apply = () => {
        root.style.setProperty("--color-accent", stop.accent);
        root.style.setProperty("--color-accent-light", stop.accentLight);
      };

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: apply,
        onEnterBack: apply,
      });
      triggers.push(trigger);
    }

    return () => {
      triggers.forEach((t) => t.kill());
      root.style.removeProperty("--color-accent");
      root.style.removeProperty("--color-accent-light");
    };
  }, [reduced, stops]);
}
