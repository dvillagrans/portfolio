"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Link } from "next-view-transitions";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { useLanguage } from "@/i18n/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function NotFound() {
  const container = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const digitsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const messageRef = useRef<HTMLParagraphElement>(null);
  const linkWrapperRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const [clickCount, setClickCount] = useState(0);
  const [showEgg, setShowEgg] = useState(false);
  const { language } = useLanguage();
  const reduced = useReducedMotion();

  const message =
    language === "es"
      ? "Esta página no existe en esta dimensión."
      : "This page doesn't exist in this dimension.";

  const backLabel = language === "es" ? "Volver al inicio" : "Back to home";

  /* Force dark theme on this immersive page for consistent navbar readability */
  useEffect(() => {
    const root = document.documentElement;
    const original = root.getAttribute("data-theme");
    root.setAttribute("data-theme", "dark");
    return () => {
      if (original) root.setAttribute("data-theme", original);
      else root.removeAttribute("data-theme");
    };
  }, []);

  /* Easter egg timer */
  useEffect(() => {
    if (!showEgg) return;
    const t = setTimeout(() => setShowEgg(false), 2000);
    return () => clearTimeout(t);
  }, [showEgg]);

  /* Cinematic entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(bgRef.current, { opacity: 1 });
        const validDigits = digitsRef.current.filter(Boolean);
        gsap.set(validDigits, {
          clipPath: "inset(0% 0% 0% 0%)",
          y: 0,
          opacity: 1,
        });
        gsap.set(messageRef.current, { y: 0, opacity: 1 });
        gsap.set(linkWrapperRef.current, { y: 0, opacity: 1 });
        return;
      }

      // 1. Background fades in
      gsap.fromTo(
        bgRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      // Scan line — sweeps once
      gsap.fromTo(
        scanRef.current,
        { scaleX: 0, opacity: 0.45, transformOrigin: "left" },
        {
          scaleX: 1,
          duration: 1.0,
          ease: "expo.inOut",
          delay: 0.2,
          onComplete: () => {
            gsap.to(scanRef.current, { opacity: 0, duration: 0.4, delay: 0.1 });
          },
        }
      );

      // 2. 404 digits — staggered clip-path reveal from below
      const validDigits = digitsRef.current.filter(Boolean);
      gsap.fromTo(
        validDigits,
        { clipPath: "inset(100% 0% 0% 0%)", y: 28, opacity: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          y: 0,
          opacity: 1,
          duration: 1.05,
          ease: "expo.out",
          stagger: 0.08,
          delay: 0.4,
        }
      );

      // 3. Message fades in after digits
      gsap.fromTo(
        messageRef.current,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.4 + validDigits.length * 0.08 + 0.15,
        }
      );

      // 4. Return link fades in last
      gsap.fromTo(
        linkWrapperRef.current,
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.4 + validDigits.length * 0.08 + 0.35,
        }
      );
    }, container);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const handleDigitClick = () => {
    const next = clickCount + 1;
    setClickCount(next);
    if (next === 5 || next === 10 || next === 42) {
      setShowEgg(true);
    }
  };

  const eggMessage =
    language === "es"
      ? clickCount === 42
        ? "La respuesta a todo."
        : "Seguí buscando..."
      : clickCount === 42
      ? "The answer to everything."
      : "Keep looking...";

  return (
    <div
      ref={container}
      className="relative min-h-[100dvh] w-full overflow-hidden bg-charcoal"
    >
      {/* Subtle radial glow from accent */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 opacity-0"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, oklch(40% 0.085 195 / 0.12) 0%, transparent 55%)",
        }}
        aria-hidden
      />

      {/* Noise texture overlay */}
      <div
        className="noise-overlay fixed inset-0 z-[1] pointer-events-none opacity-[0.05]"
        aria-hidden
      />

      {/* Cinematic scan line */}
      <div
        ref={scanRef}
        className="absolute left-0 right-0 top-[45%] -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-warm/40 to-transparent pointer-events-none z-10"
        style={{ transformOrigin: "left" }}
        aria-hidden
      />

      <Navbar />

      <main className="relative z-20 flex flex-col items-center justify-center min-h-[100dvh] px-6 text-center">
        {/* 404 — glitch layers + interactive digits */}
        <div
          className="relative inline-block cursor-default select-none"
          onClick={handleDigitClick}
          role="button"
          tabIndex={0}
          aria-label="404"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleDigitClick();
          }}
        >
          {/* Glitch layer 1 — warm */}
          <span
            className="absolute inset-0 flex justify-center items-center text-[8rem] sm:text-[10rem] md:text-[14rem] leading-none font-display italic text-warm"
            aria-hidden
            style={{
              animation: reduced
                ? "none"
                : "glitch-1 2.5s infinite linear alternate",
              opacity: reduced ? 0 : undefined,
            }}
          >
            404
          </span>

          {/* Glitch layer 2 — accent */}
          <span
            className="absolute inset-0 flex justify-center items-center text-[8rem] sm:text-[10rem] md:text-[14rem] leading-none font-display italic text-accent"
            aria-hidden
            style={{
              animation: reduced
                ? "none"
                : "glitch-2 2.5s infinite linear alternate-reverse",
              opacity: reduced ? 0 : undefined,
            }}
          >
            404
          </span>

          {/* Main digits */}
          <span className="relative flex text-[8rem] sm:text-[10rem] md:text-[14rem] leading-none font-display italic text-warm">
            {"404".split("").map((digit, i) => (
              <span
                key={i}
                ref={(el) => {
                  digitsRef.current[i] = el;
                }}
                className="inline-block transition-transform duration-150 hover:translate-x-[2px] hover:-translate-y-[2px]"
                style={{ opacity: reduced ? 1 : 0 }}
              >
                {digit}
              </span>
            ))}
          </span>
        </div>

        {/* Easter egg message */}
        {showEgg && (
          <span className="mt-4 font-mono text-[10px] tracking-[0.2em] uppercase text-warm/60">
            {eggMessage}
          </span>
        )}

        {/* Message */}
        <p
          ref={messageRef}
          className="mt-6 md:mt-8 max-w-md font-sans text-base md:text-lg leading-relaxed text-offwhite/55"
          style={{ opacity: reduced ? 1 : 0 }}
        >
          {message}
        </p>

        {/* Return link */}
        <div
          ref={linkWrapperRef}
          className="mt-10"
          style={{ opacity: reduced ? 1 : 0 }}
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-3 font-sans text-sm font-semibold uppercase tracking-[0.18em] text-offwhite/80 transition-colors duration-300 hover:text-warm"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            {backLabel}
          </Link>
        </div>
      </main>
    </div>
  );
}
