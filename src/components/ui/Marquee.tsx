"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Marquee() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    
    // Calculate total width of one set of items
    const el = scrollRef.current;
    
    gsap.to(el, {
      xPercent: -50,
      ease: "none",
      duration: 20,
      repeat: -1,
    });
  }, []);

  const text = "SYSTEMS ARCHITECTURE // HIGH-FIDELITY INTERFACES // EDITORIAL DESIGN // SCALABLE ENGINEERING // ";

  return (
    <div className="w-full overflow-hidden bg-accent/10 border-y border-offwhite/5 py-4">
      <div 
        ref={scrollRef} 
        className="flex whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] text-offwhite/80"
        style={{ width: "fit-content" }}
      >
        <span>{text}</span>
        <span>{text}</span>
        {/* Duplicate for seamless infinite feeling */}
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
}
