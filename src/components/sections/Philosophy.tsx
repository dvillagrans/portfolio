"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/i18n/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const ACCENTS = [
  "oklch(72% 0.15 65)",
  "oklch(70% 0.13 195)",
  "oklch(74% 0.10 90)",
];

function useTypewriter(text: string, enabled: boolean) {
  const [typed, setTyped] = useState("");
  const startedRef = useRef(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) {
      setTyped(text);
      return;
    }
    if (!triggerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: "top 75%",
      once: true,
      onEnter: () => {
        if (startedRef.current) return;
        startedRef.current = true;

        let i = 0;
        const interval = setInterval(() => {
          i++;
          setTyped(text.slice(0, i));
          if (i >= text.length) {
            clearInterval(interval);
          }
        }, 28);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [text, enabled]);

  return { typed, triggerRef, complete: typed.length >= text.length };
}

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const principlesRef = useRef<(HTMLElement | null)[]>([]);
  const signatureRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  const reduced = useReducedMotion();
  const [focused, setFocused] = useState<number | null>(null);

  const quote = t.philosophy.quote.replace(/["']/g, "");
  const { typed, triggerRef, complete } = useTypewriter(quote, !reduced);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) {
        principlesRef.current.forEach((p) => {
          if (p) gsap.set(p, { opacity: 1, y: 0 });
        });
        if (signatureRef.current) gsap.set(signatureRef.current, { opacity: 1, y: 0 });
        return;
      }

      principlesRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            delay: i * 0.15,
            ease: "expo.out",
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
              once: true,
            },
          }
        );
      });

      if (signatureRef.current) {
        gsap.fromTo(
          signatureRef.current,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: signatureRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="principles"
      className="relative overflow-hidden bg-charcoal py-28 text-offwhite md:py-40 lg:py-48"
      style={{
        paddingLeft: "max(1.5rem, env(safe-area-inset-left))",
        paddingRight: "max(1.5rem, env(safe-area-inset-right))",
      }}
    >
      {/* Quiet scan-line texture — barely perceptible */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(240,234,216,0.4) 3px, rgba(240,234,216,0.4) 4px)",
        }}
      />

      {/* Top ambient line */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[1px] w-full max-w-7xl -translate-x-1/2 bg-gradient-to-r from-transparent via-warm/15 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl md:px-12 lg:px-16">
        {/* Section heading */}
        <header className="mb-20 md:mb-32">
          <div className="mb-6 flex items-center gap-4">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-warm/70">
              04. {t.philosophy.tag}
            </span>
            <div className="h-[1px] w-16 bg-warm/20" />
          </div>
          <h2 className="font-serif text-3xl italic tracking-tight text-offwhite/70 md:text-4xl lg:text-5xl">
            {t.philosophy.title}
          </h2>
        </header>

        {/* ═══ Manifesto Quote — typewriter ═══ */}
        <div ref={triggerRef} className="mb-32 md:mb-44 lg:mb-52 max-w-6xl">
          <p
            className="font-serif italic leading-[1.08] tracking-tight text-warm"
            style={{
              fontSize: "clamp(2.25rem, 7vw, 5.5rem)",
              minHeight: "1.08em",
            }}
          >
            <span>&ldquo;{typed}</span>
            <span
              className="inline-block translate-y-[-0.08em] text-warm/80"
              style={{
                animation: !complete || reduced
                  ? "manifesto-cursor 0.9s steps(1) infinite"
                  : reduced
                  ? "none"
                  : "manifesto-cursor-fadeout 1.2s ease-out forwards",
                width: "0.5ch",
                display: "inline-block",
              }}
              aria-hidden="true"
            >
              |
            </span>
            <span className={complete ? "" : "opacity-0"}>&rdquo;</span>
          </p>

          {/* Manifesto signature rule */}
          <div
            className="mt-12 flex items-center gap-4 transition-opacity duration-1000"
            style={{ opacity: complete ? 1 : 0 }}
          >
            <div className="h-[2px] w-20 bg-warm/40 md:w-32" />
            <span className="h-1.5 w-1.5 rounded-full bg-warm/60" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-warm/50">
              {language === "es" ? "MANIFIESTO · 2026" : "MANIFESTO · 2026"}
            </span>
          </div>
        </div>

        {/* ═══ Principles as manuscript entries ═══ */}
        <div className="space-y-24 md:space-y-32 lg:space-y-40">
          {t.philosophy.items.map((item, idx) => {
            const [numLabel, ...titleRest] = item.title.split(". ");
            const pureTitle = titleRest.join(". ");
            const accent = ACCENTS[idx % ACCENTS.length];
            const isFocused = focused === idx;
            const isDimmed = focused !== null && focused !== idx;

            return (
              <article
                key={idx}
                ref={(el) => {
                  principlesRef.current[idx] = el;
                }}
                onMouseEnter={() => setFocused(idx)}
                onMouseLeave={() => setFocused(null)}
                onFocus={() => setFocused(idx)}
                onBlur={() => setFocused(null)}
                tabIndex={0}
                aria-label={pureTitle}
                className="group relative grid cursor-default grid-cols-1 gap-6 outline-none transition-all duration-700 ease-out md:grid-cols-[auto_1fr] md:gap-12 lg:gap-16"
                style={{
                  opacity: isDimmed ? 0.32 : 1,
                  filter: isDimmed ? "blur(2px)" : "blur(0)",
                  transform: isFocused ? "translateX(8px)" : "translateX(0)",
                }}
              >
                {/* Left: illuminated number + accent rule */}
                <div className="flex items-start gap-4 md:flex-col md:items-end md:gap-3 md:pt-3">
                  <span
                    className="font-serif italic leading-none transition-colors duration-500"
                    style={{
                      fontSize: "clamp(3.5rem, 6vw, 5.5rem)",
                      color: isFocused ? accent : "rgba(240,234,216,0.85)",
                    }}
                  >
                    {numLabel}.
                  </span>
                  <div
                    className="mt-3 h-[2px] origin-left transition-all duration-700 md:mt-0 md:h-[3px]"
                    style={{
                      width: isFocused ? 80 : 40,
                      background: accent,
                      opacity: isFocused ? 1 : 0.6,
                    }}
                  />
                </div>

                {/* Right: principle + description */}
                <div className="max-w-3xl">
                  <h3
                    className="mb-6 font-serif tracking-tight transition-colors duration-500 md:mb-8"
                    style={{
                      fontSize: "clamp(1.875rem, 4vw, 3.5rem)",
                      lineHeight: 1.1,
                      color: isFocused ? "#fff" : "rgba(240,234,216,0.95)",
                    }}
                  >
                    {pureTitle}
                  </h3>
                  <p
                    className="font-sans leading-[1.7] transition-colors duration-500"
                    style={{
                      fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
                      color: isFocused ? "rgba(240,234,216,0.85)" : "rgba(240,234,216,0.55)",
                    }}
                  >
                    {item.description}
                  </p>

                  {/* Subtle reading marker — only visible when focused */}
                  <div
                    className="mt-8 flex items-center gap-3 transition-opacity duration-500"
                    style={{ opacity: isFocused ? 1 : 0 }}
                    aria-hidden="true"
                  >
                    <span
                      className="h-1 w-1 rounded-full"
                      style={{ background: accent }}
                    />
                    <span
                      className="font-mono text-[9px] font-bold uppercase tracking-[0.32em]"
                      style={{ color: accent }}
                    >
                      {language === "es" ? "EN FOCO" : "IN FOCUS"}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* ═══ Closing signature ═══ */}
        <div
          ref={signatureRef}
          className="mt-32 flex flex-col items-end gap-4 md:mt-44"
        >
          <div className="h-[1px] w-32 bg-warm/30 md:w-48" />
          <p className="font-serif italic text-base text-warm/80 md:text-lg">
            — Diego Villagran
          </p>
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.32em] text-offwhite/30">
            {language === "es" ? "FIN DEL MANIFIESTO" : "END OF MANIFESTO"}
          </p>
        </div>
      </div>

      {/* Bottom ambient line */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[1px] w-full max-w-7xl -translate-x-1/2 bg-gradient-to-r from-transparent via-offwhite/8 to-transparent"
        aria-hidden="true"
      />

      <style>{`
        @keyframes manifesto-cursor {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes manifesto-cursor-fadeout {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
