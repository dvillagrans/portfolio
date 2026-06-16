"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/i18n/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { accentAlpha } from "@/components/sections/Scene";

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
      start: "top 78%",
      once: true,
      onEnter: () => {
        if (startedRef.current) return;
        startedRef.current = true;

        let i = 0;
        const interval = setInterval(() => {
          i++;
          setTyped(text.slice(0, i));
          if (i >= text.length) clearInterval(interval);
        }, 24);
      },
    });

    return () => trigger.kill();
  }, [text, enabled]);

  return { typed, triggerRef, complete: typed.length >= text.length };
}

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const principlesRef = useRef<(HTMLElement | null)[]>([]);
  const closureRef = useRef<HTMLParagraphElement>(null);
  const { t } = useLanguage();
  const labels = t.philosophy;
  const reduced = useReducedMotion();

  const [active, setActive] = useState<number | null>(null);
  const [isCoarse, setIsCoarse] = useState(false);

  const quote = labels.quote.replace(/^["']|["']$/g, "");
  const { typed, triggerRef, complete } = useTypewriter(quote, !reduced);

  useEffect(() => {
    const mql = window.matchMedia("(hover: none), (max-width: 767px)");
    setIsCoarse(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsCoarse(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) {
        principlesRef.current.forEach((p) => p && gsap.set(p, { opacity: 1, y: 0 }));
        if (closureRef.current) gsap.set(closureRef.current, { opacity: 1, y: 0 });
        return;
      }

      principlesRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });

      if (closureRef.current) {
        gsap.fromTo(
          closureRef.current,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: closureRef.current, start: "top 92%", once: true },
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
      className="relative overflow-hidden bg-charcoal py-20 text-offwhite md:py-28"
      style={{
        paddingLeft: "max(1.5rem, env(safe-area-inset-left))",
        paddingRight: "max(1.5rem, env(safe-area-inset-right))",
      }}
    >
      <div className="relative z-10 mx-auto max-w-7xl lg:px-12">
        <header className="mb-12 md:mb-16">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-offwhite/20" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-offwhite/50">
              {labels.eyebrow}
            </span>
          </div>
          <h2 className="font-serif text-4xl tracking-tight text-offwhite md:text-5xl lg:text-6xl">
            {labels.title}
          </h2>
          <p className="mt-4 max-w-xl font-sans text-sm text-offwhite/55 md:text-base">
            {labels.subtitle}
          </p>
        </header>

        {/* Editorial quote — single cinematic beat */}
        <div ref={triggerRef} className="mb-14 md:mb-20 max-w-4xl">
          <blockquote>
            <p
              className="font-serif italic leading-[1.12] tracking-tight text-warm"
              style={{ fontSize: "clamp(1.75rem, 4.5vw, 3.5rem)" }}
            >
              <span>&ldquo;{typed}</span>
              <span
                className="inline-block translate-y-[-0.06em] text-warm/70"
                style={{
                  animation:
                    !complete && !reduced ? "manifesto-cursor 0.9s steps(1) infinite" : "none",
                  opacity: complete ? 0 : 1,
                  width: "0.45ch",
                }}
                aria-hidden="true"
              >
                |
              </span>
              <span className={complete ? "" : "opacity-0"}>&rdquo;</span>
            </p>
          </blockquote>
          <footer
            className="mt-6 flex items-center gap-3 transition-opacity duration-700"
            style={{ opacity: complete ? 1 : 0 }}
          >
            <div className="h-px w-12 bg-warm/35" />
            <cite className="font-sans text-sm not-italic text-offwhite/50">{labels.quoteBy}</cite>
          </footer>
        </div>

        {/* Principles — scan layer + expand for depth */}
        <div className="flex flex-col gap-3">
          {labels.items.map((item, idx) => {
            const accent = ACCENTS[idx % ACCENTS.length];
            const isActive = active === idx;
            const caseNumber = String(idx + 1).padStart(2, "0");

            return (
              <article
                key={item.title}
                ref={(el) => {
                  principlesRef.current[idx] = el;
                }}
                onMouseEnter={() => !isCoarse && setActive(idx)}
                onMouseLeave={() => !isCoarse && setActive(null)}
                onClick={() => isCoarse && setActive(isActive ? null : idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive(isActive ? null : idx);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                aria-label={item.title}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 transition-all duration-500 hover:border-white/16 focus:outline-none focus-visible:ring-2 focus-visible:ring-warm/35 md:px-8 md:py-6"
                style={{
                  boxShadow: isActive ? `0 0 0 1px ${accentAlpha(accent, 0.2)} inset` : undefined,
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="mb-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-offwhite/38">
                      {labels.labelPrinciple} {caseNumber}
                    </p>
                    <h3 className="font-serif text-xl tracking-tight text-offwhite md:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-offwhite/58">
                      {item.summary}
                    </p>
                  </div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    className="mt-1 hidden shrink-0 transition-transform duration-500 md:block"
                    style={{
                      transform: isActive ? "rotate(90deg)" : "rotate(0deg)",
                      color: isActive ? accent : "rgba(240,234,216,0.25)",
                    }}
                    aria-hidden="true"
                  >
                    <path
                      d="M8 5l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div
                  className="overflow-hidden transition-all duration-600 ease-out"
                  style={{
                    maxHeight: isActive ? "200px" : "0px",
                    opacity: isActive ? 1 : 0,
                  }}
                >
                  <p className="pt-4 font-sans text-sm leading-relaxed text-offwhite/65 md:text-[15px]">
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-8 font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-offwhite/28">
          {isCoarse ? labels.hintTap : labels.hintHover}
        </p>

        <p
          ref={closureRef}
          className="mt-14 max-w-2xl border-t border-white/8 pt-8 font-serif text-lg italic text-offwhite/45 md:text-xl"
        >
          {labels.closure}
        </p>
      </div>

      <style>{`
        @keyframes manifesto-cursor {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
