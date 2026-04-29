"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/i18n/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import Link from "next/link";
import {
  ArrowUpRight,
  Zap,
} from "lucide-react";

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
    transform: { border: "#2a2a2a", bg: "#111111", hoverBorder: "#888888", text: "#555555" },
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
  return <Zap size={14} strokeWidth={1.5} />;
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
          border: `0.5px solid ${hovered ? styles.hoverBorder : styles.border}`,
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
        <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color: "#3a3a3a" }}>
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

function AnimatedMetric({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
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
    <div className="flex flex-col items-center md:items-start gap-1.5">
      <span
        ref={ref}
        className="font-sans font-semibold tabular-nums"
        style={{ fontSize: "22px", letterSpacing: "-0.02em", color: "#f0ead8" }}
      >
        {reduced ? value : "0"}
      </span>
      <span
        className="font-mono uppercase"
        style={{ fontSize: "9px", letterSpacing: "0.08em", color: "#2e2e2e" }}
      >
        {label}
      </span>
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

  /* GSAP entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) {
        if (cardRef.current) gsap.set(cardRef.current, { opacity: 1, y: 0 });
        return;
      }
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: cardRef.current, start: "top 88%" },
      });
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

  return (
    <article ref={cardRef} className="relative w-full">
      <style>{`
        @keyframes flow {
          0%   { left: -5px; opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { left: 32px; opacity: 0; }
        }
        @keyframes pulse-live {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div
        className="relative overflow-hidden"
        style={{
          borderRadius: 16,
          background: "#0d0d0d",
          border: "0.5px solid #1e1e1e",
        }}
      >
        {/* ═══ HEADER ═══ */}
        <div
          className="p-6 md:p-8 flex flex-col md:flex-row md:items-start md:justify-between gap-4"
          style={{ borderBottom: "0.5px solid #1a1a1a" }}
        >
          <div className="flex flex-col gap-2">
            {/* Meta row */}
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-[10px] tracking-[0.1em]" style={{ color: "#3a3a3a" }}>
                SYS_000
              </span>
              <span style={{ color: "#2a2a2a" }}>·</span>
              <span className="flex items-center gap-1.5">
                <span
                  className="block w-[5px] h-[5px] rounded-full bg-green-500"
                  style={{ animation: "pulse-live 2s infinite" }}
                />
                <span className="font-mono text-[10px] tracking-[0.1em]" style={{ color: "#4ade80" }}>
                  LIVE
                </span>
              </span>
              <span style={{ color: "#2a2a2a" }}>·</span>
              <span className="font-mono text-[10px] tracking-[0.1em]" style={{ color: "#3a3a3a" }}>
                {isEn ? "PROFESSIONAL EXPERIENCE" : "EXPERIENCIA PROFESIONAL"}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-sans font-semibold leading-tight" style={{ fontSize: "24px", color: "#f0ead8" }}>
              EyeNet
              <span className="font-light ml-2" style={{ color: "#6a6a6a" }}>
                — AI &amp; Automation
              </span>
            </h3>

            {/* Description */}
            <p className="font-sans text-[13px] leading-relaxed max-w-md" style={{ color: "#4a4a4a" }}>
              {isEn
                ? "LLM pipelines · ETL/ELT · containerized microservices · AI assistants · GPU cluster"
                : "Pipelines LLM · ETL/ELT · microservicios containerizados · asistentes IA · cluster GPU"}
            </p>
          </div>

          {/* Badges */}
          <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0">
            <span
              className="font-mono text-[10px] font-medium px-2.5 py-1 rounded-full"
              style={{ color: "#4ade80", border: "0.5px solid #1e3a1e", background: "#0a150a" }}
            >
              {isEn ? "Apr 2025 – May 2026" : "Abr 2025 – May 2026"}
            </span>
            <span
              className="font-mono text-[10px] font-medium px-2.5 py-1 rounded-full"
              style={{ color: "#6a6a6a", border: "0.5px solid #2a2a2a", background: "#111111" }}
            >
              {isEn ? "Remote" : "Remoto"}
            </span>
            <span
              className="font-mono text-[10px] font-medium px-2.5 py-1 rounded-full"
              style={{ color: "#c8a96e", border: "0.5px solid #2a2218", background: "#15150a" }}
            >
              {isEn ? "Partial NDA" : "NDA Parcial"}
            </span>
          </div>
        </div>

        {/* ═══ PIPELINE ═══ */}
        <div className="p-6 md:p-8" style={{ borderBottom: "0.5px solid #1a1a1a" }}>
          {/* Section header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Zap size={12} style={{ color: "#2a2a2a" }} />
              <span className="font-mono text-[10px] tracking-[0.15em] uppercase" style={{ color: "#3a3a3a" }}>
                {isEn ? "SYSTEM ARCHITECTURE" : "ARQUITECTURA DEL SISTEMA"}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="block w-[5px] h-[5px] rounded-full" style={{ background: "#c8a96e" }} />
              <span className="font-mono text-[9px] tracking-widest" style={{ color: "#2a2a2a" }}>
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
              { color: "#555555", label: "TRANSFORM" },
              { color: "#60a5fa", label: "AI" },
              { color: "#f87171", label: "STORAGE" },
              { color: "#c8a96e", label: "OUTPUT" },
            ].map((item) => (
              <span key={item.label} className="flex items-center gap-1.5 font-mono text-[9px] tracking-widest" style={{ color: "#2a2a2a" }}>
                <span className="block w-[5px] h-[5px] rounded-full" style={{ background: item.color }} />
                {item.label}
              </span>
            ))}
          </div>
        </div>

        {/* ═══ METRICS ═══ */}
        <div
          className="grid grid-cols-2 md:grid-cols-4"
          style={{ borderBottom: "0.5px solid #1a1a1a" }}
        >
          {[
            { value: "65%", label: isEn ? "LESS MANUAL" : "MENOS MANUAL" },
            { value: "300+", label: isEn ? "DOCS / WEEK" : "DOCS / SEMANA" },
            { value: "10K+", label: isEn ? "DAILY REQUESTS" : "REQUESTS DIARIOS" },
            { value: "92%", label: isEn ? "EXTRACTION ACC." : "PRECISIÓN EXTR." },
          ].map((m, i) => (
            <div
              key={m.label}
              className="flex flex-col items-center md:items-start gap-1 py-4 px-5"
              style={{
                borderRight: i < 3 ? "0.5px solid #1a1a1a" : "none",
                borderBottom: i < 2 ? "0.5px solid #1a1a1a" : "none",
              }}
            >
              <AnimatedMetric value={m.value} label={m.label} delay={i} />
            </div>
          ))}
        </div>

        {/* ═══ FOOTER ═══ */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 md:p-5">
          <div className="flex flex-wrap items-center gap-1.5">
            {visibleTags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] px-2 py-[3px] rounded"
                style={{
                  color: "#2e2e2e",
                  border: "0.5px solid #1e1e1e",
                }}
              >
                {tag}
              </span>
            ))}
            {extraCount > 0 && (
              <span
                className="font-mono text-[10px] px-2 py-[3px] rounded"
                style={{ color: "#3a3a3a", border: "0.5px solid #1e1e1e" }}
              >
                +{extraCount} {isEn ? "more" : "más"}
              </span>
            )}
          </div>

          <Link
            href="/projects/eyenet"
            className="group inline-flex items-center gap-1.5 font-mono text-[12px] font-medium px-4 py-2 rounded-[6px] transition-all duration-200"
            style={{
              color: "#c8a96e",
              border: "0.5px solid #2a2218",
              background: "#0f0d07",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#c8a96e";
              e.currentTarget.style.background = "#1a1508";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#2a2218";
              e.currentTarget.style.background = "#0f0d07";
            }}
          >
            {isEn ? "View case study" : "Ver case study"}
            <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
