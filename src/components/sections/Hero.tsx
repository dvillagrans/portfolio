"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { useLanguage } from "@/i18n/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMagnetic } from "@/hooks/useMagnetic";
import { ArrowDownToLine } from "lucide-react";
import Link from "next/link";

const WebGLHeroCanvas = dynamic(
  () => import("@/components/ui/WebGLHeroCanvas"),
  { ssr: false }
);

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const magneticProjects = useMagnetic({ strength: 10, radius: 150 });
  const magneticCv = useMagnetic({ strength: 8, radius: 120 });

  // Split headline into animatable word spans
  const title1Words = t.hero.title1.split(" ");
  const title2Words = t.hero.title2.split(" ");
  const allWords = [...title1Words, ...title2Words];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) {
        // Respect reduced motion: make everything visible instantly
        gsap.set(scanRef.current, { opacity: 0 });
        const validWords = wordsRef.current.filter(Boolean);
        gsap.set(validWords, { clipPath: "inset(0% 0% 0% 0%)", y: 0, opacity: 1 });
        gsap.set(sublineRef.current, { y: 0, opacity: 1 });
        gsap.set(actionRef.current, { y: 0, opacity: 1 });
        return;
      }

      // Scan line — disabled for clarity-first hero
      gsap.set(scanRef.current, { opacity: 0 });

      // Word-by-word clip-path reveal — cinematic "rising from below"
      const validWords = wordsRef.current.filter(Boolean);
      gsap.fromTo(
        validWords,
        { clipPath: "inset(100% 0% 0% 0%)", y: 28, opacity: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.065,
          delay: 0.4,
        }
      );

      // Subtitle — fades in after headline settles
      gsap.fromTo(
        sublineRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power3.out",
          delay: 0.4 + allWords.length * 0.065 + 0.1,
        }
      );

      // CTA — last to arrive
      gsap.fromTo(
        actionRef.current,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.4 + allWords.length * 0.065 + 0.3,
        }
      );
    }, container);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  return (
    <section
      ref={container}
      id="hero"
      className="relative flex h-[100dvh] w-full flex-col justify-end overflow-hidden pt-[max(5rem,calc(4rem+env(safe-area-inset-top)))] sm:pt-24 md:pt-28 pb-[max(5rem,calc(1.25rem+env(safe-area-inset-bottom)))] sm:pb-24 md:pb-32 pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] sm:pl-8 md:pl-24"
    >
      {/* Background — subtle ambient layer, content-first */}
      <div className="absolute inset-0 z-0 bg-charcoal">
        <div className="absolute inset-0 opacity-[0.35]" aria-hidden="true">
          <WebGLHeroCanvas />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/85 to-charcoal/70" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/60 to-transparent" aria-hidden="true" />
      </div>

      {/* Scan line — kept in DOM for reduced-motion compat, hidden */}
      <div
        ref={scanRef}
        className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-warm/60 to-transparent pointer-events-none z-10 opacity-0"
        style={{ transformOrigin: "left" }}
        aria-hidden
      />

      <div className="relative z-10 max-w-4xl">
        {/* Headline with word-by-word split animation */}
        <h1
          className="font-sans font-medium tracking-tight text-offwhite break-words leading-[1.02]"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5.25rem)", textWrap: "balance" }}
          aria-label={`${t.hero.title1} ${t.hero.title2}`}
        >
          {/* Line 1 */}
          <span className="block" aria-hidden>
            {title1Words.map((word, i) => (
              <span key={`t1-${i}`} className="inline-block overflow-hidden mr-[0.22em] last:mr-0">
                <span
                  ref={(el) => { wordsRef.current[i] = el; }}
                  className="inline-block"
                >
                  {word}
                </span>
              </span>
            ))}
          </span>
          {/* Line 2 — serif italic */}
          <span className="block font-serif italic text-offwhite/75" aria-hidden>
            {title2Words.map((word, i) => (
              <span key={`t2-${i}`} className="inline-block overflow-hidden mr-[0.22em] last:mr-0">
                <span
                  ref={(el) => { wordsRef.current[title1Words.length + i] = el; }}
                  className="inline-block"
                >
                  {word}
                </span>
              </span>
            ))}
          </span>
        </h1>

        <p
          ref={sublineRef}
          className="mt-6 md:mt-10 max-w-xl font-sans text-base leading-relaxed text-offwhite/55 selection:text-offwhite selection:bg-accent"
          style={{ opacity: reduced ? 1 : 0 }}
        >
          {t.hero.subtitle1} <br />
          {t.hero.subtitle2}
        </p>

        <div 
          ref={actionRef}
          className="mt-10 md:mt-16 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3"
          style={{ opacity: reduced ? 1 : 0 }}
        >
          <Link
            href="/projects"
            ref={magneticProjects.ref as React.RefObject<HTMLAnchorElement>}
            className="group inline-flex items-center justify-center sm:justify-start w-full sm:w-auto min-h-[44px] gap-3 border border-offwhite/20 px-6 py-4 md:px-8 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-offwhite transition-colors duration-200 hover:bg-offwhite hover:text-charcoal"
          >
            {t.hero.cta}
            <div className="h-[2px] w-4 bg-warm transition-all group-hover:w-8 group-hover:bg-charcoal" />
          </Link>
          <a
            href="/resume/resume-banca.pdf"
            download
            ref={magneticCv.ref as React.RefObject<HTMLAnchorElement>}
            className="group inline-flex items-center justify-center sm:justify-start w-full sm:w-auto min-h-[44px] gap-2 border border-offwhite/10 px-6 py-4 md:px-8 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-offwhite/70 transition-colors duration-200 hover:text-offwhite hover:border-offwhite/30"
          >
            {t.hero.downloadCv}
            <ArrowDownToLine className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
