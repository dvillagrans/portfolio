"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useLanguage } from "@/i18n/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const actionRef = useRef<HTMLAnchorElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const reduced = useReducedMotion();

  // Split headline into animatable word spans
  const title1Words = t.hero.title1.split(" ");
  const title2Words = t.hero.title2.split(" ");
  const allWords = [...title1Words, ...title2Words];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) {
        // Respect reduced motion: make everything visible instantly
        gsap.set(bgRef.current, { scale: 1, opacity: 1 });
        gsap.set(scanRef.current, { opacity: 0 });
        const validWords = wordsRef.current.filter(Boolean);
        gsap.set(validWords, { clipPath: "inset(0% 0% 0% 0%)", y: 0, opacity: 1 });
        gsap.set(sublineRef.current, { y: 0, opacity: 1 });
        gsap.set(actionRef.current, { y: 0, opacity: 1 });
        return;
      }

      // Background slow breathe
      gsap.to(bgRef.current, {
        scale: 1.08,
        duration: 14,
        repeat: -1,
        ease: "sine.inOut",
        yoyo: true,
      });

      // Scan line — sweeps left to right then disappears (cinematic HUD moment)
      gsap.fromTo(
        scanRef.current,
        { scaleX: 0, opacity: 0.6, transformOrigin: "left" },
        {
          scaleX: 1,
          duration: 1.1,
          ease: "expo.inOut",
          delay: 0.1,
          onComplete: () => {
            gsap.to(scanRef.current, { opacity: 0, duration: 0.4, delay: 0.1 });
          },
        }
      );

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
      className="relative flex h-[100dvh] w-full flex-col justify-end overflow-hidden pb-[max(5rem,calc(1.25rem+env(safe-area-inset-bottom)))] md:pb-32 pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] sm:pl-8 md:pl-24"
    >
      {/* Background cinematic layers */}
      <div className="absolute inset-0 z-0 bg-charcoal">
        <div
          ref={bgRef}
          className="absolute inset-0 overflow-hidden"
        >
          <Image
            src="/images/bg-water-dark.jpg"
            alt=""
            fill
            priority
            fetchPriority="high"
            quality={75}
            className="object-cover opacity-80 mix-blend-screen"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/20 to-transparent opacity-60" />
      </div>

      {/* Cinematic scan line — sweeps once on load */}
      <div
        ref={scanRef}
        className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-warm/60 to-transparent pointer-events-none z-10"
        style={{ transformOrigin: "left" }}
        aria-hidden
      />

      <div className="relative z-10 max-w-4xl">
        {/* Headline with word-by-word split animation */}
        <h1
          className="font-sans text-5xl sm:text-6xl font-medium tracking-tight text-offwhite md:text-[6rem] md:leading-[1.02]"
          style={{ textWrap: "balance" }}
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

        <a
          ref={actionRef}
          href="#projects"
          className="group mt-10 md:mt-16 inline-flex items-center justify-center sm:justify-start w-full sm:w-auto min-h-[44px] gap-3 border border-offwhite/20 px-6 py-4 md:px-8 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-offwhite transition-all hover:bg-offwhite hover:text-charcoal active:scale-[0.98]"
          style={{ opacity: reduced ? 1 : 0 }}
        >
          {t.hero.cta}
          <div className="h-[2px] w-4 bg-warm transition-all group-hover:w-8 group-hover:bg-charcoal" />
        </a>
      </div>
    </section>
  );
}
