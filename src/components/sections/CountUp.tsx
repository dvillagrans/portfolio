"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface CountUpProps {
  value: string;
  triggerKey: number;
  reduced: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function CountUp({ value, triggerKey, reduced, className, style }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!match || reduced) {
      ref.current.textContent = value;
      return;
    }
    const target = parseFloat(match[1]);
    const suffix = match[2];
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: target,
      duration: 1.4,
      ease: "power2.out",
      onUpdate: () => {
        if (!ref.current) return;
        const rounded = Number.isInteger(target)
          ? Math.round(obj.v)
          : obj.v.toFixed(1);
        ref.current.textContent = `${rounded}${suffix}`;
      },
    });
    return () => {
      tween.kill();
    };
  }, [value, triggerKey, reduced]);

  return <span ref={ref} className={className} style={style}>{reduced ? value : "0"}</span>;
}

export type { CountUpProps };
