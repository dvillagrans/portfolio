"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const actionRef = useRef<HTMLAnchorElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle background zoom to simulate slow movement
      gsap.to(bgRef.current, {
        scale: 1.1,
        duration: 20,
        repeat: -1,
        ease: "sine.inOut",
        yoyo: true,
      });

      // Staggered text reveal (weighed motion)
      gsap.fromTo(
        [headlineRef.current, sublineRef.current, actionRef.current],
        { y: 40, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.6,
          ease: "power3.out",
          stagger: 0.2,
          delay: 0.3,
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="relative flex h-[100dvh] w-full flex-col justify-end overflow-hidden pb-20 md:pb-32 px-6 sm:pl-8 md:pl-24"
    >
      {/* Background cinematic layers */}
      <div className="absolute inset-0 z-0 bg-charcoal">
        <div
          ref={bgRef}
          className="absolute inset-0 opacity-80 mix-blend-screen bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/bg-water-dark.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/20 to-transparent opacity-60" />
      </div>

      <div className="relative z-10 max-w-4xl">
        <h1
          ref={headlineRef}
          className="font-sans text-4xl sm:text-5xl font-medium tracking-tight text-offwhite md:text-[5.5rem] md:leading-[1.05]"
          style={{ textWrap: "balance" }}
        >
          {t.hero.title1} <br />
          <span className="font-serif italic text-gray-300">{t.hero.title2}</span>
        </h1>

        <p
          ref={sublineRef}
          className="mt-6 md:mt-8 max-w-2xl font-mono text-xs sm:text-sm leading-relaxed text-gray-400 md:text-base selection:text-offwhite selection:bg-accent"
        >
          {t.hero.subtitle1} <br />
          {t.hero.subtitle2}
        </p>

        <a
          ref={actionRef}
          href="#projects"
          className="group mt-10 md:mt-14 inline-flex items-center justify-center sm:justify-start w-full sm:w-auto gap-3 border border-offwhite/20 px-6 py-4 md:px-8 font-mono text-xs uppercase tracking-widest text-offwhite transition-all hover:bg-offwhite hover:text-charcoal"
        >
          {t.hero.cta}
          <div className="h-[2px] w-4 bg-accent transition-all group-hover:w-8 group-hover:bg-charcoal" />
        </a>
      </div>
    </section>
  );
}
