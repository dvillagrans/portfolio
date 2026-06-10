"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useTheme } from "@/hooks/ThemeContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type CursorVariant = "default" | "link" | "text" | "view";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { theme } = useTheme();
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (reduced) {
      setEnabled(false);
      return;
    }
    const fine = window.matchMedia("(pointer: fine)");
    setEnabled(fine.matches);
    const handler = (e: MediaQueryListEvent) => setEnabled(e.matches);
    fine.addEventListener("change", handler);
    return () => fine.removeEventListener("change", handler);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add("cursor-active");
    return () => document.body.classList.remove("cursor-active");
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      setHidden(false);
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onDown = () => {
      gsap.to([dot, ring], { scale: 0.7, duration: 0.12, ease: "power2.out" });
    };
    const onUp = () => {
      gsap.to([dot, ring], { scale: 1, duration: 0.25, ease: "power2.out" });
    };

    const onLeave = () => setHidden(true);

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      let el: HTMLElement | null = target;
      let next: CursorVariant = "default";
      while (el && el !== document.body) {
        const v = el.dataset?.cursor as CursorVariant | undefined;
        if (v === "link" || v === "text" || v === "view" || v === "default") {
          next = v;
          break;
        }
        const tag = el.tagName;
        if (tag === "A" || tag === "BUTTON" || el.getAttribute("role") === "button") {
          next = "link";
          break;
        }
        if (tag === "H1" || tag === "H2") {
          next = "text";
          break;
        }
        if (tag === "INPUT" || tag === "TEXTAREA") {
          next = "text";
          break;
        }
        el = el.parentElement;
      }
      setVariant(next);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  const isDark = theme === "dark";
  const dotColor = isDark ? "bg-offwhite" : "bg-charcoal";
  const borderColor = isDark ? "border-offwhite" : "border-charcoal";
  const fillColor = isDark ? "bg-offwhite" : "bg-charcoal";

  const ringClasses =
    variant === "text"
      ? "h-7 w-[2px] rounded-sm"
      : variant === "view"
      ? "h-16 w-16 rounded-full"
      : variant === "link"
      ? "h-10 w-10 rounded-full"
      : "h-7 w-7 rounded-full";

  const ringAppearance =
    variant === "default"
      ? `border ${borderColor}`
      : variant === "link"
      ? "border border-warm/60 bg-warm/15 backdrop-blur-[2px]"
      : variant === "view"
      ? "bg-charcoal text-offwhite border border-offwhite/30"
      : fillColor;

  return (
    <div
      aria-hidden="true"
      style={{ opacity: hidden ? 0 : 1, transition: "opacity 0.2s ease-out" }}
    >
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[200] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: "transform" }}
      >
        <div className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
      </div>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[200] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: "transform", mixBlendMode: isDark ? "difference" : "normal" }}
      >
        <div
          className={`flex items-center justify-center transition-[width,height,border-radius,background-color] duration-300 ease-out ${ringClasses} ${ringAppearance}`}
        >
          {variant === "view" && (
            <span className="font-mono text-[9px] uppercase tracking-[0.15em]">View</span>
          )}
        </div>
      </div>
    </div>
  );
}
