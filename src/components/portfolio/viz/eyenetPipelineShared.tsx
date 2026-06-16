"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export type NodeType = "trigger" | "transform" | "ai" | "storage" | "output";

export interface PipelineNodeConfig {
  id: string;
  label: string;
  sublabel: string;
  tag?: string;
  type: NodeType;
  tooltipTitle: string;
  tooltipDesc: string;
}

export const EYENET_CONNECTION_COLORS: [string, string][] = [
  ["#4ade80", "#888888"],
  ["#888888", "#60a5fa"],
  ["#60a5fa", "#f87171"],
  ["#f87171", "#c8a96e"],
];

export function getEyeNetPipelineNodes(isEn: boolean): PipelineNodeConfig[] {
  return [
    {
      id: "webhook",
      label: "Webhook",
      sublabel: "TRIGGER",
      type: "trigger",
      tooltipTitle: isEn ? "Webhook Trigger" : "Webhook Trigger",
      tooltipDesc: isEn
        ? "Entry point for POST events. Normalization layer handles schema-less payloads."
        : "Punto de entrada POST. Capa de normalización para payloads sin schema.",
    },
    {
      id: "normalize",
      label: "Normalize",
      sublabel: "TRANSFORM",
      type: "transform",
      tooltipTitle: isEn ? "Normalize Layer" : "Capa de Normalización",
      tooltipDesc: isEn
        ? "Schema-first validation, type coercion, and field resolution."
        : "Validación schema-first, coerción de tipos y campos faltantes.",
    },
    {
      id: "ai-agent",
      label: "AI Agent",
      sublabel: "AI · MEMORY",
      tag: isEn ? "4 sub-agents" : "4 sub-agentes",
      type: "ai",
      tooltipTitle: isEn ? "AI Agent Core" : "Núcleo de Agente IA",
      tooltipDesc: isEn
        ? "Private GPU cluster + structured output. Routes to docs, calendar, data, chat."
        : "Cluster GPU privado + output estructurado. Enruta a docs, calendario, data, chat.",
    },
    {
      id: "mongodb",
      label: "MongoDB",
      sublabel: "SCHEMA",
      type: "storage",
      tooltipTitle: isEn ? "Schema-First Storage" : "Almacenamiento Schema-First",
      tooltipDesc: isEn
        ? "KPI-ready persistence for extractions and conversation context."
        : "Persistencia lista para KPIs: extracciones y contexto conversacional.",
    },
    {
      id: "delivery",
      label: "Delivery",
      sublabel: "OUTPUT",
      tag: "PDF · TG",
      type: "output",
      tooltipTitle: isEn ? "Parallel Delivery" : "Entrega Paralela",
      tooltipDesc: isEn
        ? "PDF microservice, Drive upload, Excel proxy, Telegram alerts."
        : "Microservicio PDF, Drive, proxy Excel, alertas Telegram.",
    },
  ];
}

function getNodeStyles(type: NodeType) {
  const map: Record<NodeType, { border: string; bg: string; hoverBorder: string; text: string }> = {
    trigger: { border: "#1e3a1e", bg: "#0a150a", hoverBorder: "#4ade80", text: "#4ade80" },
    transform: { border: "#2a2a2a", bg: "#111111", hoverBorder: "#888888", text: "#888888" },
    ai: { border: "#1e2a3a", bg: "#0a0f15", hoverBorder: "#60a5fa", text: "#60a5fa" },
    storage: { border: "#2a1a1a", bg: "#150a0a", hoverBorder: "#f87171", text: "#f87171" },
    output: { border: "#2a2218", bg: "#15150a", hoverBorder: "#c8a96e", text: "#c8a96e" },
  };
  return map[type];
}

function NodeIcon({ type, compact }: { type: NodeType; compact: boolean }) {
  const size = compact ? 11 : 14;
  if (type === "trigger") {
    return <span className="block h-1.5 w-1.5 rounded-full bg-red-500" />;
  }
  if (type === "transform") {
    return <span className="font-mono text-[9px] leading-none text-[#555]">{"{ }"}</span>;
  }
  if (type === "ai") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
      </svg>
    );
  }
  if (type === "storage") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function Tooltip({
  title,
  desc,
  rect,
  visible,
}: {
  title: string;
  desc: string;
  rect: DOMRect | null;
  visible: boolean;
}) {
  if (!rect || !visible) return null;
  const top = rect.top - 8;
  const left = rect.left + rect.width / 2;
  return createPortal(
    <div
      className="pointer-events-none fixed z-[9999] transition-opacity duration-150"
      style={{
        top: 0,
        left: 0,
        transform: `translate(${left}px, ${top}px) translate(-50%, -100%)`,
        opacity: visible ? 1 : 0,
      }}
    >
      <div className="max-w-[200px] rounded-lg border p-2.5" style={{ background: "#111", borderColor: "#2a2a2a" }}>
        <p className="mb-1 font-sans text-[12px] font-semibold" style={{ color: "#f0ead8" }}>
          {title}
        </p>
        <p className="font-mono text-[10px] leading-relaxed" style={{ color: "#888" }}>
          {desc}
        </p>
      </div>
    </div>,
    document.body
  );
}

function PipelineNodeItem({
  node,
  index,
  compact,
}: {
  node: PipelineNodeConfig;
  index: number;
  compact: boolean;
}) {
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

  useEffect(() => {
    if (!glowRef.current || reduced) return;
    const el = glowRef.current;
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(el, { opacity: 0.12, duration: 2 + index * 0.25, ease: "sine.inOut" });
    tl.to(el, { opacity: 0.38, duration: 2 + index * 0.25, ease: "sine.inOut" });
    return () => {
      tl.kill();
    };
  }, [index, reduced]);

  return (
    <>
      <div
        ref={ref}
        onMouseEnter={handleEnter}
        onMouseLeave={() => setHovered(false)}
        className="group relative flex cursor-default select-none flex-col items-center rounded-lg transition-all duration-300"
        style={{
          minWidth: compact ? 76 : 118,
          gap: compact ? 6 : 10,
          padding: compact ? "10px 8px" : "16px",
          border: `1px solid ${hovered ? `${styles.hoverBorder}60` : "rgba(255,255,255,0.07)"}`,
          background: hovered
            ? `linear-gradient(180deg, ${styles.bg} 0%, rgba(13,17,23,0.95) 100%)`
            : "rgba(13,17,23,0.6)",
          transform: hovered ? "translateY(-3px) scale(1.02)" : "translateY(0) scale(1)",
          boxShadow: hovered ? `0 0 16px ${styles.hoverBorder}18` : "0 2px 8px rgba(0,0,0,0.2)",
        }}
      >
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0 rounded-lg opacity-0"
          style={{
            background: `radial-gradient(ellipse at center, ${styles.hoverBorder}10 0%, transparent 70%)`,
          }}
        />
        <div style={{ color: hovered ? styles.hoverBorder : styles.text }}>
          <NodeIcon type={node.type} compact={compact} />
        </div>
        <span
          className={`text-center font-sans font-semibold leading-tight text-[#f0ead8] ${compact ? "text-[10px]" : "text-[13px]"}`}
        >
          {node.label}
        </span>
        <span
          className={`text-center font-mono uppercase tracking-wider ${compact ? "text-[7px]" : "text-[9px]"}`}
          style={{ color: hovered ? styles.hoverBorder : styles.text }}
        >
          {node.sublabel}
        </span>
        {node.tag && (
          <span
            className="rounded-full px-1 py-0.5 font-mono text-[7px] uppercase tracking-wider"
            style={{
              color: hovered ? styles.hoverBorder : `${styles.text}99`,
              background: `${styles.text}10`,
              border: `0.5px solid ${styles.text}20`,
            }}
          >
            {node.tag}
          </span>
        )}
      </div>
      <Tooltip title={node.tooltipTitle} desc={node.tooltipDesc} rect={rect} visible={hovered} />
    </>
  );
}

function PipelineArrow({
  delay,
  colorFrom,
  colorTo,
  compact,
}: {
  delay: number;
  colorFrom: string;
  colorTo: string;
  compact: boolean;
}) {
  const width = compact ? 22 : 38;
  return (
    <div className="relative flex shrink-0 items-center" style={{ width, height: 2 }}>
      <div
        className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
        style={{ background: `linear-gradient(90deg, ${colorFrom}40, ${colorTo}40)` }}
      />
      <div
        className="absolute top-1/2 h-1 w-1 -translate-y-1/2 rounded-full"
        style={{
          background: colorFrom,
          boxShadow: `0 0 5px ${colorFrom}70`,
          animation: `eyenetFlowParticle 2s linear ${delay}s infinite`,
        }}
      />
    </div>
  );
}

export function EyeNetPipelineFlow({
  compact = false,
  isEn,
  showLegend = false,
  framed = false,
}: {
  compact?: boolean;
  isEn: boolean;
  showLegend?: boolean;
  framed?: boolean;
}) {
  const reduced = useReducedMotion();
  const nodes = getEyeNetPipelineNodes(isEn);

  const pipeline = (
    <>
      <div className="flex items-center justify-between gap-2 px-1">
        <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/35">
          {isEn ? "Document pipeline" : "Pipeline documental"}
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-widest text-white/25">
          <span
            className="h-1 w-1 rounded-full bg-emerald-400"
            style={reduced ? undefined : { animation: "pulse 2s ease-in-out infinite" }}
          />
          LIVE · 5 {isEn ? "nodes" : "nodos"}
        </span>
      </div>

      <style>{`
        @keyframes eyenetFlowParticle {
          0%   { left: 0; opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { left: calc(100% - 4px); opacity: 0; }
        }
      `}</style>

      <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div
          className={`flex min-w-max items-center px-0.5 ${framed ? "py-2" : ""}`}
          style={framed ? { minHeight: compact ? 140 : 160 } : undefined}
        >
          {nodes.map((node, i) => (
            <div key={node.id} className="flex items-center">
              <PipelineNodeItem node={node} index={i} compact={compact} />
              {i < nodes.length - 1 && (
                <PipelineArrow
                  delay={i * 0.55}
                  colorFrom={EYENET_CONNECTION_COLORS[i][0]}
                  colorTo={EYENET_CONNECTION_COLORS[i][1]}
                  compact={compact}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {showLegend && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 px-1 pb-1">
          {[
            { color: "#4ade80", label: "TRIGGER" },
            { color: "#888888", label: "TRANSFORM" },
            { color: "#60a5fa", label: "AI" },
            { color: "#f87171", label: "STORAGE" },
            { color: "#c8a96e", label: "OUTPUT" },
          ].map((item) => (
            <span
              key={item.label}
              className="flex items-center gap-1.5 font-mono text-[8px] tracking-[0.12em] text-white/20"
            >
              <span
                className="block h-[5px] w-[5px] rounded-full"
                style={{ background: item.color, boxShadow: `0 0 4px ${item.color}40` }}
              />
              {item.label}
            </span>
          ))}
        </div>
      )}
    </>
  );

  return (
    <div className={`flex h-full flex-col ${compact ? "justify-center gap-3 px-1 py-2" : "gap-4 px-2 py-3"}`}>
      {framed ? (
        <div className="border border-[#1a1a1a] px-1">{pipeline}</div>
      ) : (
        pipeline
      )}
    </div>
  );
}
