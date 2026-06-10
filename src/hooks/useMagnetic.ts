"use client";

import { useRef, useEffect, type RefObject } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MagneticOptions {
  strength?: number;
  radius?: number;
}

export function useMagnetic(
  options: MagneticOptions = {}
): { ref: RefObject<HTMLElement | null> } {
  const { strength = 10, radius = 150 } = options;
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const mql = window.matchMedia("(pointer: fine)");
    if (!mql.matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    let frame = 0;
    let pendingX = 0;
    let pendingY = 0;

    const apply = () => {
      frame = 0;
      xTo(pendingX);
      yTo(pendingY);
    };

    const handlePointerMove = (e: PointerEvent) => {
      // Use the post-transform rect, then subtract the current GSAP translate
      // to recover the element's REST position. This breaks the feedback loop
      // where the element chases its own moved center.
      const rect = el.getBoundingClientRect();
      const tx = Number(gsap.getProperty(el, "x")) || 0;
      const ty = Number(gsap.getProperty(el, "y")) || 0;
      const restCenterX = rect.left + rect.width / 2 - tx;
      const restCenterY = rect.top + rect.height / 2 - ty;

      const dx = e.clientX - restCenterX;
      const dy = e.clientY - restCenterY;
      const dist = Math.hypot(dx, dy);

      if (dist < radius) {
        const ratio = 1 - dist / radius;
        pendingX = dx * ratio * (strength / radius);
        pendingY = dy * ratio * (strength / radius);
      } else {
        pendingX = 0;
        pendingY = 0;
      }

      if (!frame) frame = requestAnimationFrame(apply);
    };

    const reset = () => {
      pendingX = 0;
      pendingY = 0;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    // Listen on window so the element keeps reacting even when it has moved
    // out from under the cursor — this is what kills the bounce.
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", reset);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", reset);
      if (frame) cancelAnimationFrame(frame);
      xTo(0);
      yTo(0);
    };
  }, [reduced, strength, radius]);

  return { ref };
}
