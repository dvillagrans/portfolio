"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DEFAULT_STOPS } from "@/hooks/useSectionHue";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgressRail() {
  const reduced = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (reduced) return;

    const triggers: ScrollTrigger[] = [];

    DEFAULT_STOPS.forEach((stop, idx) => {
      const el = document.getElementById(stop.sectionId);
      if (!el) return;

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => setActiveIdx(idx),
        onEnterBack: () => setActiveIdx(idx),
      });
      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [reduced]);

  return (
    <div
      className="fixed left-6 top-0 z-40 hidden lg:flex flex-col items-center h-full py-24 pointer-events-none"
      aria-hidden="true"
    >
      {/* Vertical rail line */}
      <div className="relative flex flex-col items-center gap-6 h-full">
        {DEFAULT_STOPS.map((stop, idx) => (
          <div key={stop.sectionId} className="relative flex items-center">
            {/* Dot marker */}
            <div
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                idx === activeIdx
                  ? "bg-warm scale-125 shadow-[0_0_8px_oklch(70%_0.130_65)]"
                  : "bg-offwhite/20"
              }`}
            />
            {/* Section label on hover/active */}
            <span
              className={`ml-4 font-display text-xs italic transition-all duration-500 whitespace-nowrap ${
                idx === activeIdx
                  ? "text-warm opacity-100 translate-x-0"
                  : "text-offwhite/30 opacity-0 -translate-x-2"
              }`}
            >
              {stop.label ?? stop.sectionId}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
