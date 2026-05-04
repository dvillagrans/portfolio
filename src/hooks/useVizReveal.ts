"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function useVizReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!ref.current || reduced) return;

    const cards = ref.current.querySelectorAll(".secondary-card");
    const vizContainers = ref.current.querySelectorAll(".viz-container");

    const ctx = gsap.context(() => {
      gsap.from(cards, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(vizContainers, {
        opacity: 0,
        scale: 0.98,
        duration: 0.5,
        stagger: 0.15,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
          once: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [reduced]);

  return ref;
}
