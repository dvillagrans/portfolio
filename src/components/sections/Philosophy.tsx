"use client";

import { useEffect, useRef } from "react";
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

/* ─── Static SVG Visual: Connected Nodes ─── */
function PipelineVisual({ reduced }: { reduced: boolean }) {
  const teal = "oklch(40% 0.085 195)";
  const amber = "oklch(70% 0.130 65)";
  const lineColor = "oklch(100% 0 0 / 0.12)";

  if (reduced) {
    return (
      <svg viewBox="0 0 320 160" className="w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <circle cx="50" cy="80" r="4" fill={teal} opacity="0.5" />
        <circle cx="105" cy="55" r="4" fill={amber} opacity="0.4" />
        <circle cx="165" cy="90" r="6" fill={teal} opacity="0.5" />
        <circle cx="225" cy="60" r="4" fill={amber} opacity="0.4" />
        <circle cx="280" cy="80" r="4" fill={teal} opacity="0.5" />
        <path d="M50 80 L105 55 M105 55 L165 90 M165 90 L225 60 M225 60 L280 80" fill="none" stroke={lineColor} strokeWidth="1.5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 320 160" className="w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Connection lines */}
      <path d="M50 80 L105 55" fill="none" stroke={lineColor} strokeWidth="1.5" />
      <path d="M105 55 L165 90" fill="none" stroke={lineColor} strokeWidth="1.5" />
      <path d="M165 90 L225 60" fill="none" stroke={lineColor} strokeWidth="1.5" />
      <path d="M225 60 L280 80" fill="none" stroke={lineColor} strokeWidth="1.5" />

      {/* Node 1 — teal */}
      <circle cx="50" cy="80" r="5" fill={teal} opacity="0.15" />
      <circle cx="50" cy="80" r="5" stroke={teal} strokeWidth="1.5" fill="none" opacity="0.7" />

      {/* Node 2 — amber */}
      <circle cx="105" cy="55" r="5" fill={amber} opacity="0.12" />
      <circle cx="105" cy="55" r="5" stroke={amber} strokeWidth="1.5" fill="none" opacity="0.7" />

      {/* Node 3 — active, teal, larger */}
      <circle cx="165" cy="90" r="9" fill={teal} opacity="0.08" filter="url(#nodeGlow)" />
      <circle cx="165" cy="90" r="9" stroke={teal} strokeWidth="2" fill="none" opacity="0.8" />
      <circle cx="165" cy="90" r="3" fill={teal} opacity="0.9" />

      {/* Node 4 — amber */}
      <circle cx="225" cy="60" r="5" fill={amber} opacity="0.12" />
      <circle cx="225" cy="60" r="5" stroke={amber} strokeWidth="1.5" fill="none" opacity="0.7" />

      {/* Node 5 — teal */}
      <circle cx="280" cy="80" r="5" fill={teal} opacity="0.15" />
      <circle cx="280" cy="80" r="5" stroke={teal} strokeWidth="1.5" fill="none" opacity="0.7" />
    </svg>
  );
}


/* ─── Static SVG Visual: Infrastructure Matrix ─── */
function GridVisual({ reduced }: { reduced: boolean }) {
  const teal = "oklch(40% 0.085 195)";
  const amber = "oklch(70% 0.130 65)";
  const borderColor = "oklch(100% 0 0 / 0.12)";

  const cells = [
    { x: 35, y: 22, dot: false, fill: teal, dotColor: "" },
    { x: 125, y: 22, dot: true, fill: "", dotColor: amber },
    { x: 215, y: 22, dot: false, fill: "", dotColor: "" },
    { x: 35, y: 82, dot: false, fill: "", dotColor: "" },
    { x: 125, y: 82, dot: false, fill: amber, dotColor: "" },
    { x: 215, y: 82, dot: true, fill: "", dotColor: teal },
    { x: 35, y: 142, dot: true, fill: "", dotColor: teal },
    { x: 125, y: 142, dot: false, fill: "", dotColor: "" },
    { x: 215, y: 142, dot: false, fill: teal, dotColor: "" },
  ];

  if (reduced) {
    return (
      <svg viewBox="0 0 320 200" className="w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {cells.map((c, i) => (
          <rect
            key={i}
            x={c.x} y={c.y} width="70" height="48" rx="4"
            fill="none"
            stroke={borderColor}
            strokeWidth="1.5"
            opacity="0.35"
          />
        ))}
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 320 200" className="w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {cells.map((c, i) => (
        <g key={i}>
          {c.fill && (
            <rect
              x={c.x} y={c.y} width="70" height="48" rx="4"
              fill={c.fill}
              fillOpacity="0.05"
            />
          )}
          <rect
            x={c.x} y={c.y} width="70" height="48" rx="4"
            fill="none"
            stroke={borderColor}
            strokeWidth="1.5"
          />
          {c.dot && c.dotColor && (
            <circle
              cx={c.x + 35}
              cy={c.y + 24}
              r="2.5"
              fill={c.dotColor}
              opacity="0.7"
            />
          )}
        </g>
      ))}
    </svg>
  );
}

/* ─── Static SVG Visual: Signal to Noise ─── */
function ClarityVisual({ reduced }: { reduced: boolean }) {
  const teal = "oklch(40% 0.085 195)";
  const amber = "oklch(70% 0.130 65)";
  const lineColor = "oklch(100% 0 0 / 0.12)";

  if (reduced) {
    return (
      <svg viewBox="0 0 320 160" className="w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <circle cx="50" cy="60" r="3" fill={teal} opacity="0.3" />
        <circle cx="85" cy="100" r="3" fill={amber} opacity="0.3" />
        <circle cx="70" cy="130" r="3" fill={teal} opacity="0.3" />
        <path d="M120 80 L185 80" fill="none" stroke={lineColor} strokeWidth="1.5" />
        <path d="M178 74 L185 80 L178 86" fill="none" stroke={amber} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="215" cy="55" r="3" fill={teal} opacity="0.7" />
        <circle cx="215" cy="80" r="3" fill={teal} opacity="0.7" />
        <circle cx="215" cy="105" r="3" fill={teal} opacity="0.7" />
        <circle cx="250" cy="55" r="3" fill={amber} opacity="0.7" />
        <circle cx="250" cy="80" r="3" fill={amber} opacity="0.7" />
        <circle cx="250" cy="105" r="3" fill={amber} opacity="0.7" />
        <circle cx="285" cy="55" r="3" fill={teal} opacity="0.7" />
        <circle cx="285" cy="80" r="3" fill={teal} opacity="0.7" />
        <circle cx="285" cy="105" r="3" fill={teal} opacity="0.7" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 320 160" className="w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <filter id="chaosBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
      </defs>

      {/* Chaos — left side: scattered, blurred dots */}
      <g filter="url(#chaosBlur)" opacity="0.35">
        <circle cx="45" cy="50" r="4" fill={teal} />
        <circle cx="80" cy="75" r="3" fill={amber} />
        <circle cx="60" cy="110" r="5" fill={teal} />
        <circle cx="95" cy="130" r="3" fill={amber} />
        <circle cx="35" cy="85" r="3.5" fill={amber} />
        <circle cx="110" cy="55" r="2.5" fill={teal} />
        <circle cx="75" cy="145" r="4" fill={teal} />
      </g>

      {/* Faint chaotic connections */}
      <path d="M45 50 Q60 70 80 75" fill="none" stroke={lineColor} strokeWidth="1" opacity="0.15" filter="url(#chaosBlur)" />
      <path d="M60 110 Q80 100 95 130" fill="none" stroke={lineColor} strokeWidth="1" opacity="0.15" filter="url(#chaosBlur)" />

      {/* Transition arrow */}
      <path d="M135 80 L185 80" fill="none" stroke={amber} strokeWidth="1.5" opacity="0.5" />
      <path d="M178 74 L185 80 L178 86" fill="none" stroke={amber} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />

      {/* Order — right side: crisp, aligned grid */}
      <g opacity="0.9">
        <circle cx="215" cy="55" r="3.5" fill={teal} />
        <circle cx="215" cy="80" r="3.5" fill={teal} />
        <circle cx="215" cy="105" r="3.5" fill={teal} />
        <circle cx="250" cy="55" r="3.5" fill={amber} />
        <circle cx="250" cy="80" r="3.5" fill={amber} />
        <circle cx="250" cy="105" r="3.5" fill={amber} />
        <circle cx="285" cy="55" r="3.5" fill={teal} />
        <circle cx="285" cy="80" r="3.5" fill={teal} />
        <circle cx="285" cy="105" r="3.5" fill={teal} />
      </g>

      {/* Crisp connections */}
      <path d="M215 55 L250 55 M250 55 L285 55" fill="none" stroke={lineColor} strokeWidth="1.5" opacity="0.25" />
      <path d="M215 80 L250 80 M250 80 L285 80" fill="none" stroke={lineColor} strokeWidth="1.5" opacity="0.25" />
      <path d="M215 105 L250 105 M250 105 L285 105" fill="none" stroke={lineColor} strokeWidth="1.5" opacity="0.25" />
      <path d="M250 55 L250 80 M250 80 L250 105" fill="none" stroke={lineColor} strokeWidth="1.5" opacity="0.25" />
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
        {/* Section heading */}
        <div className="flex items-center gap-4 mb-6">
          <h2 className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-warm/70">
            04. {t.philosophy.tag}
          </h2>
          <div className="h-[1px] flex-1 max-w-24 bg-warm/15" />
        </div>
        <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight text-warm/90 mb-16 md:mb-24">
          {t.philosophy.title}
        </h3>

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
