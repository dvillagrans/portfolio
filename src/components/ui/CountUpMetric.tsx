"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface CountUpMetricProps {
  value: string;
  label?: string;
  className?: string;
  delay?: number;
}

export default function CountUpMetric({ value, className, delay = 0 }: CountUpMetricProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  const reduced = useReducedMotion();

  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const numericTarget = match ? parseFloat(match[1]) : null;
  const suffix = match ? match[2] : "";
  const hasDecimal = match ? match[1].includes(".") : false;

  useEffect(() => {
    if (!ref.current || numericTarget === null) return;
    if (reduced) {
      ref.current.textContent = value;
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 90%",
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: numericTarget,
          duration: 1.4,
          delay: delay * 0.15,
          ease: "power2.out",
          onUpdate: () => {
            if (ref.current) {
              ref.current.textContent = (hasDecimal ? obj.val.toFixed(1) : Math.round(obj.val)) + suffix;
            }
          },
        });
      },
    });
    return () => trigger.kill();
  }, [numericTarget, suffix, value, reduced, hasDecimal, delay]);

  return (
    <span ref={ref} className={className}>
      {numericTarget !== null ? (reduced ? value : `0${suffix}`) : value}
    </span>
  );
}
