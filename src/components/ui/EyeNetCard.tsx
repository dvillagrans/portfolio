"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/i18n/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  Activity,
  Cpu,
  Database,
  Globe,
  Lock,
  Server,
  Zap,
  Radio,
  ArrowRight,
  ArrowUpRight,
  Terminal,
} from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

/* ─── Count-up metric ─── */
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
      <span ref={ref} className="text-3xl md:text-4xl font-bold tracking-tighter text-white font-sans tabular-nums">
        {reduced ? value : "0"}
      </span>
      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30 leading-tight text-center md:text-left">
        {label}
      </span>
    </div>
  );
}

/* ─── Terminal typewriter ─── */
const LOGS_EN = [
  "[14:32:01] ETL pipeline initialized",
  "[14:32:04] 247 docs queued for processing",
  "[14:32:07] LLaMA cluster: 3/3 nodes active",
  "[14:32:09] OpenAI API latency: 180ms",
  "[14:32:12] Webhook batch delivered",
  "[14:32:15] Redis cache hit ratio: 94%",
  "[14:32:18] n8n workflow #442 completed",
  "[14:32:21] Telegram alert dispatched",
];

const LOGS_ES = [
  "[14:32:01] Pipeline ETL inicializado",
  "[14:32:04] 247 docs en cola de procesamiento",
  "[14:32:07] Cluster LLaMA: 3/3 nodos activos",
  "[14:32:09] Latencia OpenAI API: 180ms",
  "[14:32:12] Batch webhooks entregado",
  "[14:32:15] Ratio cache Redis: 94%",
  "[14:32:18] Workflow n8n #442 completado",
  "[14:32:21] Alerta Telegram enviada",
];

function MiniTerminal({ lang }: { lang: "en" | "es" }) {
  const [lines, setLines] = useState<string[]>([]);
  const [cursorVisible, setCursorVisible] = useState(true);
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const logs = lang === "en" ? LOGS_EN : LOGS_ES;

  useEffect(() => {
    if (reduced) {
      setLines(logs);
      return;
    }
    let idx = 0;
    setLines([]);
    const interval = setInterval(() => {
      if (idx >= logs.length) {
        clearInterval(interval);
        return;
      }
      setLines((prev) => [...prev, logs[idx]]);
      idx++;
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, 350);
    return () => clearInterval(interval);
  }, [logs, reduced]);

  useEffect(() => {
    if (reduced) return;
    const blink = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(blink);
  }, [reduced]);

  return (
    <div className="rounded-xl border border-white/5 bg-black/40 backdrop-blur-sm overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5">
        <Terminal size={10} className="text-white/30" />
        <span className="font-mono text-[9px] uppercase tracking-widest text-white/30">
          {lang === "en" ? "System Logs" : "Logs del Sistema"}
        </span>
      </div>
      <div ref={containerRef} className="px-4 py-3 h-28 overflow-hidden font-mono text-[10px] leading-relaxed text-white/50 space-y-0.5">
        {lines.map((line, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-accent/60 shrink-0">{">"}</span>
            <span>{line}</span>
          </div>
        ))}
        {!reduced && cursorVisible && (
          <span className="inline-block w-1.5 h-3 bg-accent/70 ml-3 animate-pulse" />
        )}
      </div>
    </div>
  );
}

/* ─── Network topology SVG ─── */
function NetworkTopology() {
  const reduced = useReducedMotion();
  return (
    <svg viewBox="0 0 240 100" className="w-full h-auto opacity-60" aria-hidden="true">
      {/* Nodes */}
      <circle cx="30" cy="50" r="4" fill="rgba(255,255,255,0.15)" className={reduced ? "" : "animate-pulse"} />
      <circle cx="90" cy="30" r="4" fill="rgba(255,255,255,0.15)" className={reduced ? "" : "animate-pulse"} style={{ animationDelay: "0.3s" }} />
      <circle cx="90" cy="70" r="4" fill="rgba(255,255,255,0.15)" className={reduced ? "" : "animate-pulse"} style={{ animationDelay: "0.6s" }} />
      <circle cx="150" cy="50" r="5" fill="rgba(255,255,255,0.2)" className={reduced ? "" : "animate-pulse"} style={{ animationDelay: "0.9s" }} />
      <circle cx="210" cy="30" r="4" fill="rgba(255,255,255,0.15)" className={reduced ? "" : "animate-pulse"} style={{ animationDelay: "1.2s" }} />
      <circle cx="210" cy="70" r="4" fill="rgba(255,255,255,0.15)" className={reduced ? "" : "animate-pulse"} style={{ animationDelay: "1.5s" }} />

      {/* Connections */}
      <line x1="30" y1="50" x2="90" y2="30" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      <line x1="30" y1="50" x2="90" y2="70" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      <line x1="90" y1="30" x2="150" y2="50" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      <line x1="90" y1="70" x2="150" y2="50" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      <line x1="150" y1="50" x2="210" y2="30" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      <line x1="150" y1="50" x2="210" y2="70" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* Animated data packets */}
      {!reduced && (
        <>
          <circle cx="0" cy="0" r="1.5" fill="rgba(0,201,255,0.6)">
            <animateMotion dur="2s" repeatCount="indefinite" path="M30,50 L90,30 L150,50 L210,30" />
          </circle>
          <circle cx="0" cy="0" r="1.5" fill="rgba(0,227,204,0.5)">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M30,50 L90,70 L150,50 L210,70" />
          </circle>
        </>
      )}
    </svg>
  );
}

/* ─── Main EyeNet Card ─── */
export default function EyeNetCard() {
  const { language } = useLanguage();
  const cardRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);

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
        y: 40,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: cardRef.current, start: "top 88%" },
      });
    }, cardRef);
    return () => ctx.revert();
  }, [reduced]);

  /* 3D tilt + spotlight */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (reduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMouse({ x, y });

    if (innerRef.current) {
      const rotateX = (y - 0.5) * -8;
      const rotateY = (x - 0.5) * 8;
      innerRef.current.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    }
  }, [reduced]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (innerRef.current) {
      innerRef.current.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    }
  }, []);

  const spotlightX = mouse.x * 100;
  const spotlightY = mouse.y * 100;

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full"
      style={{ perspective: "1200px" }}
    >
      {/* Outer wrapper for transform isolation */}
      <div
        ref={innerRef}
        className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-graphite border border-white/[0.06] shadow-2xl transition-transform duration-200 ease-out will-change-transform"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Animated conic border glow */}
        <div
          className="absolute -inset-[1px] rounded-[2rem] md:rounded-[2.5rem] opacity-0 transition-opacity duration-700 pointer-events-none"
          style={{
            opacity: isHovered ? 1 : 0,
            background: "conic-gradient(from 0deg, transparent 0%, rgba(0,201,255,0.15) 20%, transparent 40%, rgba(0,227,204,0.1) 60%, transparent 80%)",
            animation: reduced ? "none" : "spin-slow 4s linear infinite",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: "1px",
          }}
        />

        {/* Mouse-following spotlight */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(600px circle at ${spotlightX}% ${spotlightY}%, rgba(0,201,255,0.07), transparent 60%)`,
          }}
        />

        {/* ─── HEADER ─── */}
        <div className="relative p-8 lg:p-12 border-b border-white/[0.05]">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-5 mb-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                  SYS_000
                </span>
                <span className="h-3 w-[1px] bg-white/10" />
                <span className="flex items-center gap-1.5">
                  <Radio size={10} className="text-red-400" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-red-400 font-bold animate-pulse">
                    LIVE
                  </span>
                </span>
              </div>

              {/* Glitch title */}
              <h3 className="relative font-sans text-4xl md:text-6xl font-bold tracking-tighter text-white group">
                <span className="relative z-10">EyeNet</span>
                <span
                  className="absolute inset-0 z-0 text-cyan-400 opacity-0"
                  style={{
                    animation: reduced || !isHovered ? "none" : "glitch-1 2.5s infinite linear alternate-reverse",
                    clipPath: "inset(20% 0 60% 0)",
                  }}
                >
                  EyeNet
                </span>
                <span
                  className="absolute inset-0 z-0 text-teal-400 opacity-0"
                  style={{
                    animation: reduced || !isHovered ? "none" : "glitch-2 3s infinite linear alternate-reverse",
                    clipPath: "inset(60% 0 20% 0)",
                  }}
                >
                  EyeNet
                </span>
                <span className="text-white/30 font-light ml-2 text-2xl md:text-3xl align-top">—</span>
                <span className="text-white/40 font-light text-2xl md:text-3xl ml-1">AI &amp; Automation</span>
              </h3>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-white/50 text-[10px] font-bold tracking-tight">
                {isEn ? "Apr 2025 — Present" : "Abr 2025 — Presente"}
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-white/50 text-[10px] font-bold tracking-tight">
                {isEn ? "Remote" : "Remoto"}
              </span>
              <Link
                href="/projects/eyenet"
                className="group/link inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/[0.06] border border-cyan-500/20 text-cyan-400/70 text-[10px] font-bold tracking-tight hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all"
              >
                {isEn ? "View Case Study" : "Ver Case Study"}
                <ArrowUpRight size={10} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          <p className="max-w-3xl text-sm md:text-base text-white/45 leading-relaxed font-sans">
            {isEn
              ? "Full automation infrastructure with LLMs, ETL/ELT pipelines, containerized microservices, AI assistants, and production web/mobile apps."
              : "Infraestructura completa de automatización con LLMs, pipelines ETL/ELT, microservicios containerizados, asistentes de IA y apps móviles/web en producción."}
          </p>
        </div>

        {/* ─── ARCHITECTURE + TOPOLOGY ─── */}
        <div className="relative p-8 lg:p-12 bg-black/20 border-b border-white/[0.05]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Cpu size={14} className="text-white/20" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/25">
                {isEn ? "System Architecture" : "Arquitectura del Sistema"}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 animate-pulse" />
              <span className="font-mono text-[9px] text-white/25 uppercase tracking-widest">
                {isEn ? "5 nodes active" : "5 nodos activos"}
              </span>
            </div>
          </div>

          {/* Network topology SVG */}
          <div className="mb-8">
            <NetworkTopology />
          </div>

          {/* Architecture stages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ArchStage
              icon={<Globe size={16} />}
              label={isEn ? "Ingestion" : "Ingesta"}
              items={["Webhooks", "n8n", "ETL/ELT"]}
              accent="cyan"
              reduced={reduced}
            />
            <ArchStage
              icon={<Cpu size={16} />}
              label={isEn ? "Processing" : "Procesamiento"}
              items={["LLaMA Cluster", "GPT-4o", "Gemini 1.5"]}
              accent="teal"
              reduced={reduced}
            />
            <ArchStage
              icon={<Server size={16} />}
              label={isEn ? "Delivery" : "Delivery"}
              items={["Docker", "Microservices", "Telegram"]}
              accent="indigo"
              reduced={reduced}
            />
          </div>
        </div>

        {/* ─── METRICS + TERMINAL ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Metrics */}
          <div className="lg:col-span-7 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/[0.05]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
              <AnimatedMetric value="65%" label={isEn ? "Less Manual Work" : "Menos Trabajo Manual"} delay={0} />
              <AnimatedMetric value="300+" label={isEn ? "Docs / Week" : "Docs / Semana"} delay={1} />
              <AnimatedMetric value="10K+" label={isEn ? "Daily Requests" : "Requests Diarios"} delay={2} />
              <AnimatedMetric value="92%" label={isEn ? "Extraction Accuracy" : "Precisión Extracción"} delay={3} />
            </div>

            {/* Data flow mini-visual */}
            <div className="mt-10 flex items-center gap-3">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="flex items-center gap-2 text-white/20">
                <Database size={12} />
                <ArrowRight size={12} className={reduced ? "" : "animate-pulse"} />
                <Zap size={12} />
                <ArrowRight size={12} className={reduced ? "" : "animate-pulse"} />
                <Activity size={12} />
              </div>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          </div>

          {/* Terminal */}
          <div className="lg:col-span-5 p-8 lg:p-12 bg-black/10">
            <MiniTerminal lang={language as "en" | "es"} />
          </div>
        </div>

        {/* ─── FOOTER: TAGS + CLASSIFIED SEAL ─── */}
        <div className="relative p-8 lg:p-12 border-t border-white/[0.05]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-wrap gap-2">
              {["Python", "n8n", "Docker", "FastAPI", "OpenAI", "Gemini", "PostgreSQL", "Redis", "CI/CD"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] text-[10px] font-bold text-white/35 tracking-wider uppercase hover:border-cyan-500/20 hover:text-cyan-400/60 hover:bg-cyan-500/[0.03] transition-all duration-300 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Classified seal */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" className="text-white" />
                  <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1" className="text-white" />
                  <path
                    id="sealPath"
                    d="M50,15 a35,35 0 1,1 0,70 a35,35 0 1,1 0,-70"
                    fill="none"
                  />
                  <text className="text-[11px] uppercase tracking-[0.3em] fill-white/40">
                    <textPath href="#sealPath" startOffset="0%">
                      {isEn ? "CONFIDENTIAL • RESTRICTED • " : "CONFIDENCIAL • RESTRINGIDO • "}
                    </textPath>
                  </text>
                </svg>
                <Lock size={18} className="absolute text-white/20" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/25">
                  {isEn ? "Production System" : "Sistema en Producción"}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/15">
                  {isEn ? "Partial NDA / Non-Disclosure" : "NDA Parcial / No Divulgación"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ─── Architecture Stage Card ─── */
function ArchStage({
  icon,
  label,
  items,
  accent,
  reduced,
}: {
  icon: React.ReactNode;
  label: string;
  items: string[];
  accent: "cyan" | "teal" | "indigo";
  reduced: boolean;
}) {
  const accentMap = {
    cyan: "border-cyan-500/10 hover:border-cyan-500/25 text-cyan-400/70",
    teal: "border-teal-500/10 hover:border-teal-500/25 text-teal-400/70",
    indigo: "border-indigo-500/10 hover:border-indigo-500/25 text-indigo-400/70",
  };

  const glowMap = {
    cyan: "group-hover:shadow-[0_0_20px_rgba(0,201,255,0.06)]",
    teal: "group-hover:shadow-[0_0_20px_rgba(0,227,204,0.06)]",
    indigo: "group-hover:shadow-[0_0_20px_rgba(75,93,255,0.06)]",
  };

  return (
    <div
      className={`group relative rounded-2xl border ${accentMap[accent]} bg-white/[0.015] p-5 transition-all duration-500 ${glowMap[accent]} hover:bg-white/[0.03]`}
    >
      <div className="flex items-center gap-2.5 mb-4">
        <div className="text-white/30">{icon}</div>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">{label}</span>
      </div>
      <div className="flex flex-col gap-2">
        {items.map((item, i) => (
          <div key={item} className="flex items-center gap-2">
            {!reduced && (
              <span
                className="w-1 h-1 rounded-full bg-current opacity-40"
                style={{ animation: `pulse-dot 2s ${i * 0.3}s ease-in-out infinite` }}
              />
            )}
            <span className="font-sans text-[11px] text-white/50 font-medium">{item}</span>
          </div>
        ))}
      </div>

      {/* Corner accent line */}
      <div
        className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
      />
    </div>
  );
}
