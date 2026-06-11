"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/i18n/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────────────────────
   NODOS DEL PIPELINE
   ────────────────────────────────────────────────────────────── */

type NodeType = "trigger" | "transform" | "ai" | "storage" | "output";

interface PipelineNodeConfig {
  id: string;
  label: string;
  sublabel: string;
  tag?: string;
  type: NodeType;
  tooltipTitle: string;
  tooltipDesc: string;
}

function getNodeStyles(type: NodeType) {
  const map: Record<NodeType, { border: string; bg: string; hoverBorder: string; text: string }> = {
    trigger:  { border: "#1e3a1e", bg: "#0a150a", hoverBorder: "#4ade80", text: "#4ade80" },
    transform: { border: "#2a2a2a", bg: "#111111", hoverBorder: "#888888", text: "#888888" },
    ai:       { border: "#1e2a3a", bg: "#0a0f15", hoverBorder: "#60a5fa", text: "#60a5fa" },
    storage:  { border: "#2a1a1a", bg: "#150a0a", hoverBorder: "#f87171", text: "#f87171" },
    output:   { border: "#2a2218", bg: "#15150a", hoverBorder: "#c8a96e", text: "#c8a96e" },
  };
  return map[type];
}

/* Íconos inline SVG por tipo */
function NodeIcon({ type }: { type: NodeType }) {
  if (type === "trigger") {
    return <span className="block w-[6px] h-[6px] rounded-full bg-red-500" />;
  }
  if (type === "transform") {
    return <span className="font-mono text-[10px] leading-none text-[#555]">{"{ }"}</span>;
  }
  if (type === "ai") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
      </svg>
    );
  }
  if (type === "storage") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    );
  }
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

/* Tooltip montado con portal para evitar overflow clipping */
function Tooltip({
  title,
  desc,
  rect,
  color,
  visible,
}: {
  title: string;
  desc: string;
  rect: DOMRect | null;
  color: string;
  visible: boolean;
}) {
  if (!rect || !visible) return null;
  const top = rect.top - 8;
  const left = rect.left + rect.width / 2;
  return createPortal(
    <div
      className="fixed z-[9999] pointer-events-none transition-opacity duration-150"
      style={{
        top: 0,
        left: 0,
        transform: `translate(${left}px, ${top}px) translate(-50%, -100%)`,
        opacity: visible ? 1 : 0,
      }}
    >
      <div
        className="max-w-[220px] p-2.5 rounded-lg border"
        style={{ background: "#111", borderColor: "#2a2a2a" }}
      >
        <p className="font-sans text-[13px] font-semibold mb-1" style={{ color: "#f0ead8" }}>
          {title}
        </p>
        <p className="font-mono text-[11px] leading-relaxed" style={{ color: "#888" }}>
          {desc}
        </p>
      </div>
      <div
        className="w-0 h-0 mx-auto"
        style={{
          borderLeft: "5px solid transparent",
          borderRight: "5px solid transparent",
          borderTop: "5px solid #2a2a2a",
        }}
      />
    </div>,
    document.body
  );
}

/* ──────────────────────────────────────────────────────────────
   PIPELINE NODE COMPONENT
   ────────────────────────────────────────────────────────────── */

function PipelineNodeItem({ node, index }: { node: PipelineNodeConfig; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const styles = getNodeStyles(node.type);

  const handleEnter = useCallback(() => {
    setHovered(true);
    if (ref.current) setRect(ref.current.getBoundingClientRect());
  }, []);

  const handleLeave = useCallback(() => {
    setHovered(false);
  }, []);

  useEffect(() => {
    if (!glowRef.current || reduced) return;
    const el = glowRef.current;
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(el, { opacity: 0.15, duration: 2 + index * 0.3, ease: "sine.inOut" });
    tl.to(el, { opacity: 0.45, duration: 2 + index * 0.3, ease: "sine.inOut" });
    return () => { tl.kill(); };
  }, [index, reduced]);

  return (
    <>
      <div
        ref={ref}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="relative flex flex-col items-center gap-2.5 px-4 py-4 rounded-xl transition-all duration-300 cursor-default select-none group"
        style={{
          minWidth: 118,
          border: `1px solid ${hovered ? `${styles.hoverBorder}60` : "rgba(255,255,255,0.07)"}`,
          background: hovered
            ? `linear-gradient(180deg, ${styles.bg} 0%, rgba(13,17,23,0.95) 100%)`
            : "rgba(13,17,23,0.6)",
          backdropFilter: "blur(12px)",
          transform: hovered ? "translateY(-4px) scale(1.03)" : "translateY(0) scale(1)",
          boxShadow: hovered
            ? `0 0 20px ${styles.hoverBorder}15, 0 4px 24px rgba(0,0,0,0.3)`
            : "0 2px 8px rgba(0,0,0,0.2)",
        }}
      >
        {/* Subtle pulse glow behind */}
        <div
          ref={glowRef}
          className="absolute inset-0 rounded-xl opacity-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, ${styles.hoverBorder}08 0%, transparent 70%)`,
          }}
        />

        {/* Top accent line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300"
          style={{
            width: hovered ? "70%" : "30%",
            background: hovered
              ? `linear-gradient(90deg, transparent, ${styles.hoverBorder}, transparent)`
              : `linear-gradient(90deg, transparent, ${styles.border}, transparent)`,
          }}
        />

        <div className="relative z-10" style={{ color: hovered ? styles.hoverBorder : styles.text }}>
          <NodeIcon type={node.type} />
        </div>
        <span className="font-sans text-[13px] font-semibold leading-tight text-center" style={{ color: "#f0ead8" }}>
          {node.label}
        </span>
        <span
          className="font-mono text-[9px] uppercase tracking-[0.15em] text-center"
          style={{ color: hovered ? styles.hoverBorder : styles.text }}
        >
          {node.sublabel}
        </span>
        {node.tag && (
          <span
            className="font-mono text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded-full transition-all duration-300"
            style={{
              color: hovered ? styles.hoverBorder : `${styles.text}99`,
              background: hovered ? `${styles.hoverBorder}15` : `${styles.text}10`,
              border: `0.5px solid ${hovered ? styles.hoverBorder + "30" : styles.text + "15"}`,
            }}
          >
            {node.tag}
          </span>
        )}
      </div>

      <Tooltip
        title={node.tooltipTitle}
        desc={node.tooltipDesc}
        rect={rect}
        color={styles.text}
        visible={hovered}
      />
    </>
  );
}

/* ──────────────────────────────────────────────────────────────
   FLECHA CON PARTÍCULA ANIMADA
   ────────────────────────────────────────────────────────────── */

function PipelineArrow({ delay, colorFrom, colorTo }: { delay: number; colorFrom: string; colorTo: string }) {
  return (
    <div className="relative flex-shrink-0 flex items-center" style={{ width: 38, height: 2 }}>
      {/* Background line with gradient */}
      <div
        className="absolute inset-0"
        style={{
          height: 1.5,
          top: "50%",
          transform: "translateY(-50%)",
          background: `linear-gradient(90deg, ${colorFrom}40, ${colorTo}40)`,
        }}
      />
      {/* Particle 1 — main flow */}
      <div
        className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
        style={{
          background: colorFrom,
          boxShadow: `0 0 6px ${colorFrom}80, 0 0 12px ${colorFrom}30`,
          animation: `flowParticle 2.2s linear ${delay}s infinite`,
        }}
      />
      {/* Particle 2 — trailing */}
      <div
        className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full"
        style={{
          background: colorTo,
          boxShadow: `0 0 4px ${colorTo}60`,
          animation: `flowParticle 2.2s linear ${delay + 0.7}s infinite`,
        }}
      />
      {/* Particle 3 — fast ghost */}
      <div
        className="absolute top-1/2 -translate-y-1/2 w-[4px] h-[4px] rounded-full"
        style={{
          background: colorFrom,
          opacity: 0.6,
          filter: "blur(1px)",
          animation: `flowParticle 1.4s linear ${delay + 1.1}s infinite`,
        }}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   ORB VISUAL — decorative tech anchor for EyeNet header
   ────────────────────────────────────────────────────────────── */

function OrbVisual({ reduced }: { reduced: boolean }) {
  return (
    <div className="absolute top-4 right-4 md:top-6 md:right-8 hidden md:block pointer-events-none" aria-hidden="true">
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
        {/* Static rings */}
        <circle cx="36" cy="36" r="34" stroke="oklch(40% 0.085 195)" strokeWidth="0.5" opacity="0.12" />
        <circle cx="36" cy="36" r="24" stroke="oklch(40% 0.085 195)" strokeWidth="0.5" opacity="0.2" />
        <circle cx="36" cy="36" r="14" stroke="oklch(70% 0.130 65)" strokeWidth="0.5" opacity="0.3" />
        <circle cx="36" cy="36" r="3" fill="oklch(70% 0.130 65)" opacity="0.5" />
        {/* Animated pulse rings */}
        {!reduced && (
          <>
            <circle cx="36" cy="36" r="34" stroke="oklch(40% 0.085 195)" strokeWidth="0.5" opacity="0">
              <animate attributeName="r" values="28;38;28" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.2;0;0.2" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="36" cy="36" r="24" stroke="oklch(70% 0.130 65)" strokeWidth="0.5" opacity="0">
              <animate attributeName="r" values="16;28;16" dur="3s" repeatCount="indefinite" begin="0.5s" />
              <animate attributeName="opacity" values="0.15;0;0.15" dur="3s" repeatCount="indefinite" begin="0.5s" />
            </circle>
          </>
        )}
      </svg>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ────────────────────────────────────────────────────────────── */

interface EyeNetCardProps {
  variant?: "card" | "bespoke";
}

export default function EyeNetCard({ variant = "card" }: EyeNetCardProps = {}) {
  const { language } = useLanguage();
  const reduced = useReducedMotion();
  const cardRef = useRef<HTMLElement>(null);

  const isEn = language === "en";
  const isBespoke = variant === "bespoke";
  const [activeTab, setActiveTab] = useState<"Doc Pipeline" | "AI Assistant">("Doc Pipeline");

  /* GSAP internal timeline */
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          once: true,
        },
        delay: 0.3,
      });

      tl.from(".eyenet-meta", {
        opacity: 0,
        y: -8,
        duration: 0.4,
        ease: "power2.out",
      });

      tl.from(".eyenet-title", {
        opacity: 0,
        y: 12,
        duration: 0.5,
        ease: "power3.out",
      }, "-=0.1");

      tl.from(".eyenet-desc", {
        opacity: 0,
        y: 8,
        duration: 0.4,
        ease: "power2.out",
      }, "-=0.3");

      tl.from(".eyenet-badges", {
        opacity: 0,
        y: 6,
        duration: 0.35,
        ease: "power2.out",
      }, "-=0.25");

      tl.from(".eyenet-flow", {
        opacity: 0,
        scale: 0.98,
        duration: 0.6,
        ease: "power2.out",
      }, "-=0.2");

      tl.from(".eyenet-metric", {
        opacity: 0,
        y: 10,
        stagger: 0.08,
        duration: 0.4,
        ease: "power2.out",
      }, "-=0.3");

      tl.from(".eyenet-footer", {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      }, "-=0.2");
    }, cardRef);

    return () => ctx.revert();
  }, [reduced]);

  const pipelineNodes: PipelineNodeConfig[] = [
    {
      id: "webhook",
      label: "Webhook",
      sublabel: "TRIGGER",
      type: "trigger",
      tooltipTitle: isEn ? "Webhook Trigger" : "Webhook Trigger",
      tooltipDesc: isEn
        ? "Entry point. Receives POST events from external systems. First challenge: payloads arriving without fixed schema — required a normalization layer before any processing."
        : "Punto de entrada. Recibe eventos POST de sistemas externos. Primer reto: payloads sin esquema fijo — requirió capa de normalización antes de procesar.",
    },
    {
      id: "normalize",
      label: "Normalize",
      sublabel: "TRANSFORM",
      type: "transform",
      tooltipTitle: isEn ? "Normalize Layer" : "Capa de Normalización",
      tooltipDesc: isEn
        ? "Code layer resolving missing fields, type coercion, and schema validation. Designed schema-first from day one to support KPI aggregations without future refactoring."
        : "Capa de código resolviendo campos faltantes, coerción de tipos y validación de schema. Diseñado schema-first desde el día uno.",
    },
    {
      id: "ai-agent",
      label: "AI Agent",
      sublabel: "AI · MEMORY",
      tag: isEn ? "4 sub-agents" : "4 sub-agentes",
      type: "ai",
      tooltipTitle: isEn ? "AI Agent Core" : "Núcleo de Agente IA",
      tooltipDesc: isEn
        ? "DeepSeek via private GPU cluster + Chat Memory + Structured Output Parser. Routes to specialized sub-agents by intent: documents, calendar, data queries, general conversation."
        : "DeepSeek vía cluster GPU privado + Memoria de Chat + Parser de Output Estructurado. Enruta a sub-agentes especializados por intención.",
    },
    {
      id: "mongodb",
      label: "MongoDB",
      sublabel: "SCHEMA-FIRST STORAGE",
      type: "storage",
      tooltipTitle: isEn ? "Schema-First Storage" : "Almacenamiento Schema-First",
      tooltipDesc: isEn
        ? "Persistence layer with schema designed for KPI aggregation queries. Stores structured extractions + conversation context. Enables operational analytics dashboard."
        : "Capa de persistencia con schema diseñado para queries de agregación KPI. Almacena extracciones estructuradas + contexto de conversación.",
    },
    {
      id: "delivery",
      label: "Delivery",
      sublabel: "OUTPUT",
      tag: "PDF · Drive · TG",
      type: "output",
      tooltipTitle: isEn ? "Parallel Delivery" : "Entrega Paralela",
      tooltipDesc: isEn
        ? "Parallel delivery: PDF generation via Puppeteer microservice, Google Drive upload, Excel proxy for records, Telegram monitoring alerts for operators."
        : "Entrega paralela: generación PDF vía microservicio Puppeteer, upload a Google Drive, proxy Excel para registros, alertas Telegram para operadores.",
    },
  ];

  const connectionColors: [string, string][] = [
    ["#4ade80", "#888888"],
    ["#888888", "#60a5fa"],
    ["#60a5fa", "#f87171"],
    ["#f87171", "#c8a96e"],
  ];

  const tags = ["Python", "n8n", "Docker", "FastAPI", "OpenAI", "Gemini", "PostgreSQL", "Redis", "CI/CD"];
  const visibleTags = tags.slice(0, 7);
  const extraCount = tags.length - visibleTags.length;

  const blueTags = ["Python"];
  const amberTags = ["Docker"];

  const getTagStyle = (tag: string) => {
    if (blueTags.includes(tag)) {
      return {
        color: "rgba(96,165,250,0.8)",
        border: "1px solid rgba(96,165,250,0.2)",
        background: "rgba(96,165,250,0.05)",
      };
    }
    if (amberTags.includes(tag)) {
      return {
        color: "rgba(251,191,36,0.6)",
        border: "1px solid rgba(251,191,36,0.15)",
        background: "rgba(251,191,36,0.05)",
      };
    }
    return {
      color: "rgba(255,255,255,0.3)",
      border: "1px solid rgba(255,255,255,0.08)",
      background: "transparent",
    };
  };

  return (
    <article
      ref={cardRef}
      className={
        isBespoke
          ? "relative h-full w-full overflow-hidden eyenet-card flex flex-col"
          : "relative w-full eyenet-card"
      }
    >
      <style>{`
        @keyframes flowParticle {
          0%   { left: -6px; opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { left: 38px; opacity: 0; }
        }
        @keyframes dataPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div
        className={
          isBespoke
            ? "relative h-full overflow-hidden flex flex-col"
            : "relative overflow-hidden rounded-2xl transition-all"
        }
        style={
          isBespoke
            ? { background: "#0d1117" }
            : {
                background: "#0d1117",
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.3)",
              }
        }
        onMouseEnter={
          isBespoke
            ? undefined
            : (e) => {
                gsap.to(e.currentTarget, {
                  boxShadow:
                    "0 0 0 1px rgba(255,255,255,0.1), 0 20px 60px rgba(0,0,0,0.4)",
                  duration: 0.3,
                  ease: "power2.out",
                });
              }
        }
        onMouseLeave={
          isBespoke
            ? undefined
            : (e) => {
                gsap.to(e.currentTarget, {
                  boxShadow:
                    "0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.3)",
                  duration: 0.4,
                  ease: "power2.inOut",
                });
              }
        }
      >
        {/* ═══ HEADER ═══ */}
        <header
          className={
            isBespoke
              ? "relative pt-28 px-8 pb-6 md:pt-32 md:px-16 md:pb-8 lg:pt-36 lg:px-24 xl:px-32 overflow-hidden"
              : "relative p-6 pb-4 md:p-8 md:pb-5 overflow-hidden"
          }
        >
          {/* Subtle depth gradient */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(180deg, #0d1117 0%, #0a0f14 100%)" }}
          />
          {/* Subtle scan-line texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px)",
            }}
          />
          {/* Decorative orb */}
          <OrbVisual reduced={reduced} />

          <div className="relative z-10">
            {/* Metadata row */}
            <div className="eyenet-meta flex items-center justify-between mb-6 pl-3" style={{ borderLeft: "2px solid oklch(40% 0.085 195 / 0.25)" }}>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-mono text-[11px] text-white/30 tracking-widest">SYS_000</span>
                <span className="text-white/15">·</span>
                <div className="flex items-center gap-1.5">
                  <div className="relative">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping opacity-75" />
                  </div>
                  <span className="font-mono text-[11px] text-emerald-400 tracking-widest">LIVE</span>
                </div>
                <span className="text-white/15">·</span>
                <span className="font-mono text-[11px] text-white/30 tracking-widest">
                  {isEn ? "PROFESSIONAL EXPERIENCE" : "EXPERIENCIA PROFESIONAL"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] text-white/40 hidden sm:block">
                  {isEn ? "Apr 2025 – May 2026" : "Abr 2025 – May 2026"}
                </span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-sm text-white/40 border border-[#666] bg-transparent">
                  NDA PARCIAL
                </span>
              </div>
            </div>

            {/* Headline + Stats — two-column layout */}
            <div className={isBespoke ? "grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 mb-7" : "grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-6 mb-5"}>
              {/* Left column — title, subtitle, description */}
              <div className="eyenet-title">
                <h2
                  className="font-sans font-black text-white leading-none tracking-tight mb-2"
                  style={{ fontSize: "clamp(56px, 6vw, 80px)", textShadow: "0 0 40px rgba(96,165,250,0.15)" }}
                >
                  EyeNet
                </h2>
                <p className="font-sans text-[14px] text-[#888] mb-3">
                  AI &amp; Automation Platform
                </p>
                <p className="font-sans text-[13px] text-[#aaa] leading-relaxed">
                  {isEn
                    ? "Automatization of documental flows with LLMs and autonomous agents. Inference over private GPU cluster."
                    : "Automatización de flujos documentales con LLMs y agentes autónomos. Inferencia sobre cluster GPU privado."}
                </p>
              </div>

              {/* Right column — stats grid 2x2 */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-5 self-center">
                <div className="eyenet-metric">
                  <span className="font-mono text-[28px] font-bold text-white tabular-nums leading-none">65%</span>
                  <span className="block font-mono text-[10px] uppercase text-[#666] tracking-[0.1em] mt-1">
                    {isEn ? "Less Manual Work" : "Menos Trabajo Manual"}
                  </span>
                </div>
                <div className="eyenet-metric">
                  <span className="font-mono text-[28px] font-bold text-white tabular-nums leading-none">300+</span>
                  <span className="block font-mono text-[10px] uppercase text-[#666] tracking-[0.1em] mt-1">
                    {isEn ? "Docs / Week" : "Docs / Semana"}
                  </span>
                </div>
                <div className="eyenet-metric">
                  <span className="font-mono text-[28px] font-bold text-white tabular-nums leading-none">10K+</span>
                  <span className="block font-mono text-[10px] uppercase text-[#666] tracking-[0.1em] mt-1">
                    {isEn ? "Daily Requests" : "Requests Diarios"}
                  </span>
                </div>
                <div className="eyenet-metric">
                  <span className="font-mono text-[28px] font-bold text-white tabular-nums leading-none">92%</span>
                  <span className="block font-mono text-[10px] uppercase text-[#666] tracking-[0.1em] mt-1">
                    {isEn ? "NER Accuracy" : "Precisión NER"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ═══ PIPELINE ═══ */}
        <div
          className={
            isBespoke
              ? "eyenet-flow px-8 md:px-16 lg:px-24 xl:px-32 pb-8 md:pb-10"
              : "eyenet-flow px-6 md:px-8 pb-6 md:pb-8"
          }
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          {/* Pipeline tabs */}
          <div className="flex items-center gap-6 pt-5 mb-4">
            {(["Doc Pipeline", "AI Assistant"] as const).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className="font-mono text-[11px] uppercase tracking-wider pb-2 transition-colors duration-200"
                  style={{
                    color: isActive ? "#fff" : "#666",
                    borderBottom: `1px solid ${isActive ? "#fff" : "#333"}`,
                    background: "transparent",
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Section header — modern dash layout */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <svg width="20" height="12" viewBox="0 0 20 12" fill="none" className="shrink-0">
                <rect x="0" y="5" width="20" height="2" rx="1" fill="oklch(40% 0.085 195 / 0.3)" />
                <rect x="0" y="5" width="8" height="2" rx="1" fill="oklch(40% 0.085 195)" />
                <circle cx="10" cy="6" r="1.5" fill="oklch(40% 0.085 195)" />
              </svg>
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/35">
                {activeTab === "Doc Pipeline"
                  ? (isEn ? "DOCUMENT PIPELINE" : "PIPELINE DOCUMENTAL")
                  : (isEn ? "AI ASSISTANT PIPELINE" : "PIPELINE ASISTENTE IA")}
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full border border-white/[0.06] bg-white/[0.02]">
              <div className="relative">
                <div className="w-[5px] h-[5px] rounded-full bg-amber-400/80" style={{ animation: "dataPulse 2s ease-in-out infinite" }} />
              </div>
              <span className="font-mono text-[9px] tracking-widest text-white/15 leading-none">
                5 {isEn ? "NODES ACTIVE" : "NODOS ACTIVOS"}
              </span>
            </div>
          </div>

          {/* Pipeline nodes — horizontal scroll on mobile */}
          <div className="overflow-x-auto scrollbar-hide pb-2" style={{ height: 160 }}>
            <div className="flex items-center gap-0 min-w-max px-1 h-full">
              {pipelineNodes.map((node, i) => (
                <div key={node.id} className="flex items-center">
                  <PipelineNodeItem node={node} index={i} />
                  {i < pipelineNodes.length - 1 && (
                    <PipelineArrow delay={i * 0.6} colorFrom={connectionColors[i][0]} colorTo={connectionColors[i][1]} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Legend — inline minimal with glow dots */}
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5">
            {[
              { color: "#4ade80", label: "TRIGGER" },
              { color: "#888888", label: "TRANSFORM" },
              { color: "#60a5fa", label: "AI" },
              { color: "#f87171", label: "STORAGE" },
              { color: "#c8a96e", label: "OUTPUT" },
            ].map((item) => (
              <span key={item.label} className="flex items-center gap-1.5 font-mono text-[8px] tracking-[0.12em] text-white/20">
                <span
                  className="block w-[5px] h-[5px] rounded-full"
                  style={{
                    background: item.color,
                    boxShadow: `0 0 4px ${item.color}40`,
                  }}
                />
                {item.label}
              </span>
            ))}
          </div>
        </div>

        {/* ═══ FOOTER ═══ */}
        <div
          className={
            isBespoke
              ? "mx-8 md:mx-16 lg:mx-24 xl:mx-32 border-t border-white/[0.08]"
              : "mx-6 md:mx-8 border-t border-white/[0.08]"
          }
        />

        <footer
          className={
            isBespoke
              ? "eyenet-footer flex flex-wrap items-center justify-between gap-4 px-8 md:px-16 lg:px-24 xl:px-32 py-6 lg:py-8"
              : "eyenet-footer flex flex-wrap items-center justify-between gap-4 px-6 md:px-8 py-4"
          }
        >
          <div className="flex items-center gap-1.5 flex-wrap">
            {visibleTags.map((tag) => {
              const style = getTagStyle(tag);
              return (
                <span
                  key={tag}
                  className="font-mono text-[10px] px-2 py-0.5 rounded-sm"
                  style={{
                    color: style.color,
                    border: style.border,
                    background: style.background,
                  }}
                >
                  {tag}
                </span>
              );
            })}
            {extraCount > 0 && (
              <span
                className="font-mono text-[10px] px-2 py-0.5 rounded-sm text-white/20 border border-white/[0.06]"
              >
                +{extraCount} {isEn ? "more" : "más"}
              </span>
            )}
          </div>

          <Link
            href="/projects/eyenet"
            className="group flex items-center gap-2 font-mono text-[11px] tracking-widest text-white/50 hover:text-white transition-colors duration-200"
          >
            <span>{isEn ? "VIEW SYSTEM" : "VER SISTEMA"}</span>
            <span className="transform group-hover:translate-x-1 transition-transform duration-200">
              →
            </span>
          </Link>
        </footer>
      </div>
    </article>
  );
}
