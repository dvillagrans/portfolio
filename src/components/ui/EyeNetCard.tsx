"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/i18n/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import Link from "next/link";
import { Zap } from "lucide-react";

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
  const styles = getNodeStyles(node.type);

  const handleEnter = useCallback(() => {
    setHovered(true);
    if (ref.current) setRect(ref.current.getBoundingClientRect());
  }, []);

  const handleLeave = useCallback(() => {
    setHovered(false);
  }, []);

  return (
    <>
      <div
        ref={ref}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="relative flex flex-col items-center gap-1.5 px-3 py-3 rounded-[10px] transition-all duration-200 cursor-default select-none"
        style={{
          minWidth: 110,
          border: "1px solid rgba(255,255,255,0.1)",
          borderTop: `2px solid ${hovered ? styles.hoverBorder : styles.border}`,
          background: styles.bg,
          transform: hovered ? "translateY(-2px)" : "translateY(0)",
        }}
      >
        <div style={{ color: styles.text }}>
          <NodeIcon type={node.type} />
        </div>
        <span className="font-sans text-[13px] font-semibold leading-tight" style={{ color: "#f0ead8" }}>
          {node.label}
        </span>
        <span
          className="font-mono text-[9px] uppercase tracking-widest"
          style={{ color: styles.text, letterSpacing: "0.15em" }}
        >
          {node.sublabel}
        </span>
        {node.tag && (
          <span
            className="font-mono text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded"
            style={{
              color: styles.text,
              background: `${styles.text}15`,
              border: `0.5px solid ${styles.text}25`,
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

function PipelineArrow({ delay }: { delay: number }) {
  return (
    <div className="relative flex-shrink-0" style={{ width: 32, height: 2 }}>
      <div className="absolute inset-0" style={{ background: "#1e1e1e", height: 1.5, top: "50%", transform: "translateY(-50%)" }} />
      <div
        className="absolute top-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full"
        style={{
          background: delay === 0 ? "#4ade80" : "#c8a96e",
          animation: `flow 2s linear ${delay}s infinite`,
        }}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   MÉTRICA ANIMADA
   ────────────────────────────────────────────────────────────── */

function AnimatedMetric({
  value,
  label,
  sublabel,
  delay = 0,
  valueClassName = "",
}: {
  value: string;
  label: string;
  sublabel?: string;
  delay?: number;
  valueClassName?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!ref.current || reduced) return;
    const match = value.match(/^(\d+)(.*)$/);
    const target = match ? parseInt(match[1], 10) : null;
    const suffix = match ? match[2] : "";
    if (target === null) {
      ref.current.textContent = value;
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 90%",
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.6,
          delay: delay * 0.15,
          ease: "power2.out",
          onUpdate: () => {
            if (ref.current) ref.current.textContent = Math.round(obj.val) + suffix;
          },
        });
      },
    });
    return () => trigger.kill();
  }, [value, delay, reduced]);

  return (
    <div className="flex flex-col gap-1">
      <span
        ref={ref}
        className={`font-mono font-bold tabular-nums text-white ${valueClassName}`}
      >
        {reduced ? value : "0"}
      </span>
      <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase block">
        {label}
      </span>
      {sublabel && (
        <span className="font-sans text-[11px] text-white/40 block mt-0.5">
          {sublabel}
        </span>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ────────────────────────────────────────────────────────────── */

export default function EyeNetCard() {
  const { language } = useLanguage();
  const reduced = useReducedMotion();
  const cardRef = useRef<HTMLElement>(null);

  const isEn = language === "en";

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
    <article ref={cardRef} className="relative w-full eyenet-card">
      <style>{`
        @keyframes flow {
          0%   { left: -5px; opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { left: 32px; opacity: 0; }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div
        className="relative overflow-hidden rounded-2xl transition-all"
        style={{
          background: "#0d1117",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.3)",
        }}
        onMouseEnter={(e) => {
          gsap.to(e.currentTarget, {
            boxShadow: "0 0 0 1px rgba(255,255,255,0.1), 0 20px 60px rgba(0,0,0,0.4)",
            duration: 0.3,
            ease: "power2.out",
          });
        }}
        onMouseLeave={(e) => {
          gsap.to(e.currentTarget, {
            boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.3)",
            duration: 0.4,
            ease: "power2.inOut",
          });
        }}
      >
        {/* ═══ HEADER ═══ */}
        <header className="p-6 pb-4 md:p-8 md:pb-5">
          {/* Fila superior: metadata técnica */}
          <div className="eyenet-meta flex items-center justify-between mb-5">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-mono text-[11px] text-white/30 tracking-widest">
                SYS_000
              </span>

              <span className="text-white/15">·</span>

              {/* Badge LIVE — con pulso real */}
              <div className="flex items-center gap-1.5">
                <div className="relative">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping opacity-75" />
                </div>
                <span className="font-mono text-[11px] text-emerald-400 tracking-widest">
                  LIVE
                </span>
              </div>

              <span className="text-white/15">·</span>

              <span className="font-mono text-[11px] text-white/30 tracking-widest">
                {isEn ? "PROFESSIONAL EXPERIENCE" : "EXPERIENCIA PROFESIONAL"}
              </span>
            </div>

            {/* Fecha — derecha */}
            <span className="font-mono text-[11px] text-emerald-400/70 hidden sm:block">
              {isEn ? "Apr 2025 — May 2026" : "Abr 2025 — May 2026"}
            </span>
          </div>

          {/* Headline — dos líneas con jerarquía clara */}
          <div className="eyenet-title mb-4">
            <h2 className="font-sans text-4xl font-black text-white leading-none tracking-tight mb-1">
              EyeNet
            </h2>
            <p className="font-mono text-sm text-white/40 tracking-wide">
              AI &amp; Automation Platform
            </p>
          </div>

          {/* Descripción técnica — más legible */}
          <p className="eyenet-desc font-sans text-sm text-white/55 leading-relaxed max-w-lg">
            {isEn
              ? "LLM pipelines · ETL/ELT · containerized microservices · AI assistants · GPU cluster"
              : "Pipelines LLM · ETL/ELT · microservicios containerizados · asistentes IA · cluster GPU"}
          </p>

          {/* Badges de contexto — debajo de la descripción */}
          <div className="eyenet-badges flex items-center gap-2 mt-3">
            <span className="font-mono text-[10px] px-2 py-0.5 rounded-sm text-white/40 border border-white/10">
              {isEn ? "Remote" : "Remoto"}
            </span>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded-sm text-amber-400/70 border border-amber-400/20 bg-amber-400/5">
              {isEn ? "Partial NDA" : "NDA Parcial"}
            </span>
          </div>
        </header>

        {/* ═══ PIPELINE ═══ */}
        <div className="eyenet-flow px-6 md:px-8 pb-6 md:pb-8" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {/* Section header */}
          <div className="flex items-center justify-between mb-5 pt-5">
            <div className="flex items-center gap-2">
              <Zap size={12} className="text-white/15" />
              <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/25">
                {isEn ? "SYSTEM ARCHITECTURE" : "ARQUITECTURA DEL SISTEMA"}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="block w-[5px] h-[5px] rounded-full bg-amber-400/60" />
              <span className="font-mono text-[9px] tracking-widest text-white/15">
                5 {isEn ? "nodes active" : "nodos activos"}
              </span>
            </div>
          </div>

          {/* Pipeline nodes — horizontal scroll on mobile */}
          <div className="overflow-x-auto scrollbar-hide pb-2">
            <div className="flex items-center gap-0 min-w-max px-1">
              {pipelineNodes.map((node, i) => (
                <div key={node.id} className="flex items-center">
                  <PipelineNodeItem node={node} index={i} />
                  {i < pipelineNodes.length - 1 && (
                    <PipelineArrow delay={i * 0.6} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {[
              { color: "#4ade80", label: "TRIGGER" },
              { color: "#888888", label: "TRANSFORM" },
              { color: "#60a5fa", label: "AI" },
              { color: "#f87171", label: "STORAGE" },
              { color: "#c8a96e", label: "OUTPUT" },
            ].map((item) => (
              <span key={item.label} className="flex items-center gap-1.5 font-mono text-[9px] tracking-widest text-white/15">
                <span className="block w-[5px] h-[5px] rounded-full" style={{ background: item.color }} />
                {item.label}
              </span>
            ))}
          </div>
        </div>

        {/* ═══ SEPARATOR + METRICS ═══ */}
        <div className="mx-6 md:mx-8 border-t border-white/[0.08]" />

        <div className="grid grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr] divide-x divide-white/[0.08]">
          <div className="eyenet-metric px-5 md:px-6 py-5">
            <AnimatedMetric
              value="65%"
              label={isEn ? "LESS MANUAL WORK" : "MENOS TRABAJO MANUAL"}
              sublabel={isEn ? "vs. previous process" : "vs. proceso anterior"}
              delay={0}
              valueClassName="text-3xl"
            />
          </div>
          <div className="eyenet-metric px-5 md:px-6 py-5">
            <AnimatedMetric
              value="300+"
              label={isEn ? "DOCS / WEEK" : "DOCS / SEMANA"}
              sublabel={isEn ? "processed automatically" : "procesados automáticamente"}
              delay={1}
              valueClassName="text-2xl"
            />
          </div>
          <div className="eyenet-metric px-5 md:px-6 py-5">
            <AnimatedMetric
              value="10K+"
              label={isEn ? "DAILY REQUESTS" : "REQUESTS DIARIOS"}
              sublabel={isEn ? "to inference cluster" : "al cluster de inferencia"}
              delay={2}
              valueClassName="text-2xl"
            />
          </div>
          <div className="eyenet-metric px-5 md:px-6 py-5">
            <AnimatedMetric
              value="92%"
              label={isEn ? "NER ACCURACY" : "PRECISIÓN NER"}
              sublabel={isEn ? "entity extraction" : "extracción de entidades"}
              delay={3}
              valueClassName="text-2xl"
            />
          </div>
        </div>

        {/* ═══ SEPARATOR + FOOTER ═══ */}
        <div className="mx-6 md:mx-8 border-t border-white/[0.08]" />

        <footer className="eyenet-footer flex flex-wrap items-center justify-between gap-4 px-6 md:px-8 py-4">
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
