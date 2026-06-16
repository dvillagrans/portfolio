"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function useCaseStudyReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>(".reveal-fade");
      if (reduced) {
        elements.forEach((el) => gsap.set(el, { y: 0, opacity: 1 }));
        return;
      }
      elements.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, [reduced]);

  return containerRef;
}
