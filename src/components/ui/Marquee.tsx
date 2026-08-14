"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useLanguage } from "@/i18n/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useCoarsePointer } from "@/hooks/useCoarsePointer";

export default function Marquee() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const coarse = useCoarsePointer();
  const segments = t.marquee.segments;

  useEffect(() => {
    if (!scrollRef.current || reduced || coarse) return;
    const el = scrollRef.current;

    tweenRef.current = gsap.to(el, {
      xPercent: -50,
      ease: "none",
      duration: 28,
      repeat: -1,
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, [reduced, coarse]);

  const setSpeed = (scale: number) => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: scale, duration: 0.6, ease: "power2.out" });
    }
  };

  return (
    <div
      className="w-full overflow-hidden border-y border-offwhite/8 bg-charcoal py-3.5 cursor-default select-none"
      onMouseEnter={() => setSpeed(0.15)}
      onMouseLeave={() => setSpeed(1)}
      onFocus={() => setSpeed(0.15)}
      onBlur={() => setSpeed(1)}
      tabIndex={0}
      role="marquee"
      aria-label={t.marquee.ariaLabel}
    >
      <div
        ref={scrollRef}
        className="flex whitespace-nowrap"
        style={{ width: "fit-content" }}
      >
        {[0, 1, 2, 3].map((dup) => (
          <span key={dup} className="flex items-center">
            {segments.map((seg, i) => (
              <span
                key={`${dup}-${i}`}
                className={`font-sans text-[10px] font-medium uppercase tracking-[0.22em] ${
                  seg.warm ? "text-warm/75" : "text-offwhite/60"
                }`}
              >
                {seg.text}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
