"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Marquee() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!scrollRef.current || reduced) return;
    const el = scrollRef.current;

    tweenRef.current = gsap.to(el, {
      xPercent: -50,
      ease: "none",
      duration: 22,
      repeat: -1,
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, [reduced]);

  const handleMouseEnter = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 0.12, duration: 0.6, ease: "power2.out" });
    }
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.8, ease: "power2.inOut" });
    }
  };

  const handleFocus = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 0.12, duration: 0.6, ease: "power2.out" });
    }
  };

  const handleBlur = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.8, ease: "power2.inOut" });
    }
  };

  // Words with visual variation — alternating warm accent for editorial rhythm
  const segments = [
    { text: "SYSTEMS ARCHITECTURE", warm: false },
    { text: " // ", warm: false },
    { text: "HIGH-FIDELITY INTERFACES", warm: true },
    { text: " // ", warm: false },
    { text: "EDITORIAL DESIGN", warm: false },
    { text: " // ", warm: false },
    { text: "SCALABLE ENGINEERING", warm: true },
    { text: " // ", warm: false },
  ];

  return (
    <div
      className="w-full overflow-hidden bg-graphite border-y border-offwhite/5 py-4 cursor-default select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={0}
      role="marquee"
      aria-label="Technology keywords"
    >
      <div
        ref={scrollRef}
        className="flex whitespace-nowrap"
        style={{ width: "fit-content" }}
      >
        {/* Duplicate 4x for seamless infinite loop */}
        {[0, 1, 2, 3].map((dup) => (
          <span key={dup} className="flex items-center">
            {segments.map((seg, i) => (
              <span
                key={i}
                className={`font-sans text-[10px] font-bold uppercase tracking-[0.25em] transition-colors ${
                  seg.warm ? "text-warm/70" : "text-offwhite/40"
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
