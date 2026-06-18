"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { useLanguage } from "@/i18n/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const WebGLHeroCanvas = dynamic(
  () => import("@/components/ui/WebGLHeroCanvas"),
  { ssr: false }
);

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const focusRef = useRef<HTMLParagraphElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLAnchorElement>(null);
  const { t } = useLanguage();
  const labels = t.hero;
  const reduced = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = [
        eyebrowRef.current,
        line1Ref.current,
        line2Ref.current,
        sublineRef.current,
        focusRef.current,
        actionRef.current,
        scrollHintRef.current,
      ].filter(Boolean);

      if (reduced) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        targets,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.15,
        }
      );
    }, container);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={container}
      id="hero"
      className="relative flex min-h-[100dvh] w-full flex-col justify-end overflow-hidden pb-[max(5rem,calc(1.25rem+env(safe-area-inset-bottom)))] pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] pt-[max(5rem,calc(4rem+env(safe-area-inset-top)))] sm:pb-24 sm:pl-8 sm:pt-24 md:pb-28 md:pl-24 md:pt-28"
    >
      <div className="absolute inset-0 z-0 bg-charcoal">
        <div className="absolute inset-0 opacity-[0.22]" aria-hidden="true">
          <WebGLHeroCanvas />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/90 to-charcoal/75" aria-hidden="true" />
      </div>

      <div className="relative z-10 max-w-3xl">
        <p
          ref={eyebrowRef}
          className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-offwhite/45"
          style={{ opacity: reduced ? 1 : 0 }}
        >
          {labels.eyebrow}
        </p>

        <h1
          className="font-sans font-medium tracking-tight text-offwhite leading-[1.04]"
          style={{ fontSize: "clamp(2.35rem, 5.5vw, 4.5rem)", textWrap: "balance" }}
        >
          <span ref={line1Ref} className="block" style={{ opacity: reduced ? 1 : 0 }}>
            {labels.title1}
          </span>
          <span
            ref={line2Ref}
            className="mt-1 block font-display italic text-offwhite/72"
            style={{ opacity: reduced ? 1 : 0 }}
          >
            {labels.title2}
          </span>
        </h1>

        <p
          ref={sublineRef}
          className="mt-6 max-w-xl font-sans text-base leading-relaxed text-offwhite/58 md:mt-8 md:text-[17px]"
          style={{ opacity: reduced ? 1 : 0 }}
        >
          {labels.subtitle}
        </p>

        <p
          ref={focusRef}
          className="mt-4 font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-offwhite/35"
          style={{ opacity: reduced ? 1 : 0 }}
        >
          {labels.focusLine}
        </p>

        <div
          ref={actionRef}
          className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center md:mt-12"
          style={{ opacity: reduced ? 1 : 0 }}
        >
          <Link
            href="#projects"
            className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-warm px-7 py-3.5 font-sans text-sm font-semibold text-charcoal transition-opacity hover:opacity-90 spring-press"
          >
            {labels.cta}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <a
            href="/resume/resume-banca.pdf"
            download
            className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-offwhite/15 px-7 py-3.5 font-sans text-sm font-medium text-offwhite/72 transition-colors hover:border-offwhite/30 hover:text-offwhite spring-press"
          >
            {labels.downloadCv}
            <ArrowDownToLine className="h-4 w-4" />
          </a>
        </div>
      </div>

      <a
        ref={scrollHintRef}
        href="#projects"
        className="relative z-10 mt-14 flex flex-col items-start gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-offwhite/30 transition-colors hover:text-offwhite/50 md:mt-16"
        style={{ opacity: reduced ? 1 : 0 }}
      >
        <span>{labels.scrollHint}</span>
        <span className="h-8 w-px bg-offwhite/20" aria-hidden="true" />
      </a>
    </section>
  );
}
