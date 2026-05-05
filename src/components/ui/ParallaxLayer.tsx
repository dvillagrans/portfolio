"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxLayerProps {
  speed?: number;
  className?: string;
  children: React.ReactNode;
}

export default function ParallaxLayer({ speed = 0.3, className, children }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;

    const el = ref.current;
    const parent = el.parentElement;
    if (!parent) return;

    const tween = gsap.fromTo(
      el,
      { y: 0 },
      {
        y: `${speed * 60}px`,
        ease: "none",
        scrollTrigger: {
          trigger: parent,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    return () => {
      tween.kill();
    };
  }, [speed, reduced]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
