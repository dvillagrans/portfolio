"use client";

import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/i18n/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════
   PHILOSOPHY SECTION — "The Systems Mindset" Visual Manifesto
   Dark editorial layout with animated SVG metaphors for each
   principle. Cinematic scroll-driven entrances.
   ═══════════════════════════════════════════════════════════════ */

/* ─── Animated SVG Visual: Pipeline Flow ─── */
function PipelineVisual({ reduced }: { reduced: boolean }) {
  if (reduced) {
    return (
      <svg viewBox="0 0 320 200" className="w-full h-full" aria-hidden="true">
        <path d="M20 100 C80 40, 140 160, 200 80 S300 120, 300 100" fill="none" stroke="oklch(70% 0.130 65 / 0.25)" strokeWidth="2" strokeDasharray="6 8" />
        <circle cx="100" cy="70" r="5" fill="oklch(40% 0.085 195)" opacity="0.6" />
        <circle cx="200" cy="80" r="6" fill="oklch(70% 0.130 65)" opacity="0.5" />
        <circle cx="280" cy="105" r="4" fill="oklch(40% 0.085 195)" opacity="0.5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="pipeGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(40% 0.085 195)" stopOpacity="0.3" />
          <stop offset="50%" stopColor="oklch(70% 0.130 65)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="oklch(40% 0.085 195)" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Curved pipeline paths */}
      <path d="M20 100 C80 40, 140 160, 200 80 S300 120, 300 100" fill="none" stroke="url(#pipeGrad)" strokeWidth="2" strokeDasharray="6 8" opacity="0.6" />
      <path d="M20 140 C60 100, 120 180, 180 120 S280 160, 300 140" fill="none" stroke="oklch(40% 0.085 195 / 0.2)" strokeWidth="1.5" strokeDasharray="4 10" />
      <path d="M20 60 C70 20, 130 100, 190 40 S290 80, 300 60" fill="none" stroke="oklch(70% 0.130 65 / 0.15)" strokeWidth="1.5" strokeDasharray="8 12" />

      {/* Flowing particles — SMIL, zero JS overhead */}
      <circle r="4" fill="oklch(40% 0.085 195)">
        <animateMotion path="M20 100 C80 40, 140 160, 200 80 S300 120, 300 100" dur="3.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;0" dur="3.2s" repeatCount="indefinite" />
      </circle>
      <circle r="3" fill="oklch(70% 0.130 65)">
        <animateMotion path="M20 100 C80 40, 140 160, 200 80 S300 120, 300 100" dur="3.2s" begin="1.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;0" dur="3.2s" begin="1.6s" repeatCount="indefinite" />
      </circle>
      <circle r="3.5" fill="oklch(40% 0.085 195)">
        <animateMotion path="M20 140 C60 100, 120 180, 180 120 S280 160, 300 140" dur="4.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;0" dur="4.5s" repeatCount="indefinite" />
      </circle>
      <circle r="2.5" fill="oklch(70% 0.130 65)">
        <animateMotion path="M20 60 C70 20, 130 100, 190 40 S290 80, 300 60" dur="5s" begin="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;0.8;0.8;0" dur="5s" begin="2s" repeatCount="indefinite" />
      </circle>

      {/* Node pulses */}
      <circle cx="200" cy="80" r="8" fill="oklch(70% 0.130 65)" opacity="0.2">
        <animate attributeName="r" values="6;10;6" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.2;0.05;0.2" dur="2.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

/* ─── Animated SVG Visual: Infrastructure Grid ─── */
function GridVisual({ reduced }: { reduced: boolean }) {
  const cells = useMemo(() => [
    { x: 40, y: 30, w: 70, h: 50, r: 8 },
    { x: 125, y: 30, w: 70, h: 50, r: 8 },
    { x: 210, y: 30, w: 70, h: 50, r: 8 },
    { x: 40, y: 95, w: 70, h: 50, r: 8 },
    { x: 125, y: 95, w: 70, h: 50, r: 8 },
    { x: 210, y: 95, w: 70, h: 50, r: 8 },
    { x: 40, y: 160, w: 70, h: 50, r: 8 },
    { x: 125, y: 160, w: 70, h: 50, r: 8 },
    { x: 210, y: 160, w: 70, h: 50, r: 8 },
  ], []);

  return (
    <svg viewBox="0 0 320 240" className="w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="gridGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(40% 0.085 195)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="oklch(70% 0.130 65)" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      {cells.map((c, i) => (
        <g key={i}>
          <rect
            x={c.x} y={c.y} width={c.w} height={c.h} rx={c.r}
            fill="none"
            stroke="url(#gridGrad)"
            strokeWidth="1.5"
            opacity={reduced ? 0.35 : 0.25}
            className={reduced ? "" : "grid-cell-rect"}
          />
          {!reduced && (
            <circle cx={c.x + c.w / 2} cy={c.y + c.h / 2} r="2.5" fill="oklch(40% 0.085 195)" opacity="0">
              <animate attributeName="opacity" values="0;0.6;0" dur={`${2 + (i % 3) * 0.7}s`} begin={`${i * 0.15}s`} repeatCount="indefinite" />
            </circle>
          )}
        </g>
      ))}
      {/* Connection lines */}
      <path d="M110 55h15M195 55h15M75 95v15M160 95v15M245 95v15" stroke="oklch(40% 0.085 195 / 0.2)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ─── Animated SVG Visual: Clarity / Explainability ─── */
function ClarityVisual({ reduced }: { reduced: boolean }) {
  const lines = [
    { text: "accuracy = 0.97", x: 40, y: 55, opacity: 0.25 },
    { text: "if !explained:", x: 40, y: 90, opacity: 0.4 },
    { text: "  model = BROKEN", x: 40, y: 125, opacity: 0.6 },
    { text: "// clarity is design", x: 40, y: 175, opacity: 1, accent: true },
  ];

  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <filter id="clarityBlur">
          <feGaussianBlur stdDeviation={reduced ? "0" : "1.5"} />
        </filter>
      </defs>

      {lines.map((line, i) => (
        <text
          key={i}
          x={line.x}
          y={line.y}
          fontFamily="var(--font-jetbrains-mono), ui-monospace, monospace"
          fontSize="15"
          fill={line.accent ? "oklch(70% 0.130 65)" : "oklch(97% 0.008 80 / 0.55)"}
          opacity={line.opacity}
          filter={reduced ? undefined : "url(#clarityBlur)"}
          className={reduced ? "" : "clarity-line"}
          style={{ fontVariantLigatures: "none" }}
        >
          {line.text}
          {!reduced && line.accent && (
            <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
          )}
        </text>
      ))}

      {/* Scanning highlight line */}
      {!reduced && (
        <>
          <rect x="35" y="42" width="250" height="2" fill="oklch(70% 0.130 65 / 0.15)">
            <animate attributeName="y" values="42;190;42" dur="4s" repeatCount="indefinite" />
          </rect>
          <circle cx="30" cy="42" r="3" fill="oklch(70% 0.130 65)">
            <animate attributeName="cy" values="42;190;42" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0.2;0.6" dur="4s" repeatCount="indefinite" />
          </circle>
        </>
      )}
    </svg>
  );
}

/* ─── Principle Card ─── */
function PrincipleCard({
  index,
  item,
  reduced,
}: {
  index: number;
  item: { title: string; description: string };
  reduced: boolean;
}) {
  const [number, ...titleRest] = item.title.split(". ");
  const pureTitle = titleRest.join(". ");

  const visuals = [
    <PipelineVisual key="p" reduced={reduced} />,
    <GridVisual key="g" reduced={reduced} />,
    <ClarityVisual key="c" reduced={reduced} />,
  ];

  const borderColors = [
    "border-l-warm",
    "border-l-accent",
    "border-l-warm/70",
  ];

  const numberColors = [
    "text-warm/8 group-hover:text-warm/15",
    "text-accent/8 group-hover:text-accent/15",
    "text-warm/6 group-hover:text-warm/12",
  ];

  const dotColors = [
    "bg-warm/50 group-hover:bg-warm",
    "bg-accent/50 group-hover:bg-accent",
    "bg-warm/40 group-hover:bg-warm/80",
  ];

  const patternBgs = [
    "/img/patterns/pipelines-flow.svg",
    "/img/patterns/infra-grid.svg",
    "/img/patterns/analytics-tiles.svg",
  ];

  return (
    <div
      className={`principle-card group relative flex flex-col md:flex-row gap-8 md:gap-12 p-8 md:p-10 lg:p-14 bg-graphite/40 backdrop-blur-sm border border-white/[0.06] ${borderColors[index]} border-l-[3px] rounded-2xl overflow-hidden hover:bg-graphite/60 transition-colors duration-700`}
    >
      {/* Subtle pattern background */}
      <div
        className="absolute inset-0 opacity-[0.035] bg-no-repeat bg-right-bottom pointer-events-none"
        style={{ backgroundImage: `url(${patternBgs[index]})`, backgroundSize: "320px" }}
        aria-hidden="true"
      />

      {/* Ambient glow */}
      <div
        className={`absolute -right-20 -top-20 h-64 w-64 rounded-full blur-[120px] transition-all duration-700 pointer-events-none ${
          index === 1 ? "bg-accent/8 group-hover:bg-accent/15" : "bg-warm/8 group-hover:bg-warm/15"
        }`}
        aria-hidden="true"
      />

      {/* Watermark number */}
      <span
        className={`absolute top-2 right-4 md:right-8 font-serif text-8xl md:text-[10rem] font-medium leading-none select-none pointer-events-none transition-colors duration-700 ${numberColors[index]}`}
        aria-hidden="true"
      >
        {number}
      </span>

      {/* Visual side */}
      <div
        className="relative flex-shrink-0 w-full md:w-2/5 lg:w-[38%] aspect-[16/10] md:aspect-auto md:min-h-[260px] rounded-xl bg-charcoal/60 border border-white/[0.05] overflow-hidden"
        aria-hidden="true"
      >
        {visuals[index]}
      </div>

      {/* Text side */}
      <div className="relative flex flex-col justify-center flex-1 z-10">
        <div className="flex items-center gap-3 mb-4 md:mb-5">
          <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${dotColors[index]}`} />
          <span className="font-mono text-[10px] font-bold tracking-[0.25em] uppercase text-white/30">
            PRINCIPLE_0{index + 1}
          </span>
        </div>

        <h3 className="mb-4 md:mb-5 font-sans text-2xl md:text-3xl lg:text-[2rem] font-semibold tracking-tight text-offwhite leading-[1.15] max-w-lg">
          {pureTitle}
        </h3>

        <p className="principle-desc font-sans text-base md:text-[17px] leading-[1.7] text-white/45 group-hover:text-white/65 transition-colors duration-500 max-w-xl">
          {item.description}
        </p>
      </div>
    </div>
  );
}

/* ─── Main Section ─── */
export default function Philosophy() {
  const container = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const reduced = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(".quote-text", { opacity: 1, y: 0, filter: "blur(0px)" });
        gsap.set(".principle-card", { opacity: 1, y: 0, rotateX: 0 });
        gsap.set(".principle-desc", { opacity: 1, filter: "blur(0px)" });
        return;
      }

      /* Quote: blur-to-clear + scale entrance */
      gsap.fromTo(
        ".quote-text",
        { opacity: 0, y: 50, filter: "blur(16px)", scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scale: 1,
          duration: 1.6,
          ease: "expo.out",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 72%",
            once: true,
          },
        }
      );

      /* Cards: staggered dramatic entrance with perspective */
      if (cardsRef.current) {
        gsap.fromTo(
          ".principle-card",
          { opacity: 0, y: 80, rotateX: 6 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.2,
            stagger: 0.22,
            ease: "expo.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 78%",
              once: true,
            },
          }
        );
      }

      /* Principle 3 description: blur-to-clear (the "explainability" metaphor) */
      gsap.fromTo(
        ".principle-card:last-child .principle-desc",
        { opacity: 0.2, filter: "blur(8px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".principle-card:last-child",
            start: "top 60%",
            once: true,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [reduced]);

  const quote = t.philosophy.quote.replace(/[\'"]/g, "");

  return (
    <section
      ref={container}
      id="principles"
      className="relative bg-charcoal py-24 md:py-36 lg:py-44 overflow-hidden text-offwhite"
      style={{ perspective: "1200px" }}
    >
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(255 255 255 / 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.08) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      {/* Noise grain overlay */}
      <div className="absolute inset-0 noise-overlay opacity-[0.12] pointer-events-none" aria-hidden="true" />

      {/* Top ambient line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-warm/10 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] md:px-12 lg:px-16">
        {/* Section tag */}
        <div className="flex items-center gap-4 mb-16 md:mb-24">
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-warm/70">
            04. {t.philosophy.tag}
          </span>
          <div className="h-[1px] flex-1 max-w-24 bg-warm/15" />
        </div>

        {/* ═══ Massive Manifesto Quote ═══ */}
        <div ref={quoteRef} className="mb-24 md:mb-36 lg:mb-44 max-w-6xl">
          <p className="quote-text font-serif italic text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[1.08] tracking-tight text-warm">
            {quote}
          </p>
          {/* Decorative rule */}
          <div className="mt-10 md:mt-14 flex items-center gap-4">
            <div className="h-[2px] w-16 md:w-24 bg-warm/30" />
            <div className="h-[2px] w-3 rounded-full bg-warm/20" />
          </div>
        </div>

        {/* ═══ Principle Cards ═══ */}
        <div ref={cardsRef} className="space-y-6 md:space-y-8">
          {t.philosophy.items.map((item, idx) => (
            <PrincipleCard key={idx} index={idx} item={item} reduced={reduced} />
          ))}
        </div>
      </div>

      {/* Bottom ambient line */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-offwhite/5 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
