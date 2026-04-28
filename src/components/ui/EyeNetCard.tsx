"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function EyeNetCard() {
  const { language } = useLanguage();
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
        }
      });

      // Animate arrows
      gsap.to(".diagram-arrow", {
        x: 5,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, cardRef);
    return () => ctx.revert();
  }, []);

  return (
    <article 
      ref={cardRef}
      className="relative w-full overflow-hidden rounded-[2.5rem] bg-[#1a1b1e] text-white/90 shadow-2xl border border-white/5"
    >
      {/* Header Section */}
      <div className="p-8 lg:p-12 border-b border-white/5">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
              SYS_000 · {language === 'en' ? 'PROFESSIONAL EXPERIENCE' : 'EXPERIENCIA PROFESIONAL'}
            </span>
            <h3 className="font-sans text-4xl md:text-5xl font-medium tracking-tight text-white">
              EyeNet — AI & Automation
            </h3>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="px-4 py-1.5 rounded-full bg-[#dcfce7] text-[#166534] text-[10px] font-bold tracking-tight whitespace-nowrap">
              {language === 'en' ? 'April 2025 - Present' : 'Abril 2025 - Presente'}
            </span>
            <span className="px-4 py-1.5 rounded-full border border-white/10 text-white/60 text-[10px] font-bold tracking-tight">
              {language === 'en' ? 'Remote' : 'Remoto'}
            </span>
          </div>
        </div>

        <p className="max-w-3xl text-base md:text-lg text-white/60 leading-relaxed font-sans">
          {language === 'en' 
            ? 'Full automation infrastructure with LLMs, ETL/ELT pipelines, containerized microservices, AI assistants, and production web/mobile apps.'
            : 'Infraestructura completa de automatización con LLMs, pipelines ETL/ELT, microservicios containerizados, asistentes de IA y apps móviles/web en producción.'}
        </p>
      </div>

      {/* Architecture Section */}
      <div className="p-8 lg:p-12 bg-black/20 overflow-x-auto">
        <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/20 mb-8">
          {language === 'en' ? 'SYSTEM ARCHITECTURE' : 'ARQUITECTURA DEL SISTEMA'}
        </h4>

        <div className="flex flex-col gap-8 min-w-[700px]">
          {/* Ingestion Row */}
          <div className="flex items-center gap-3">
            <span className="w-24 shrink-0 font-sans text-xs text-white/40">{language === 'en' ? 'Ingestion' : 'Ingesta'}</span>
            <div className="flex items-center gap-3">
              <Pill color="blue">APIs externas</Pill>
              <Arrow />
              <Pill color="blue">n8n workflows</Pill>
              <Arrow />
              <Pill color="dark">ETL / ELT pipelines</Pill>
              <Arrow />
              <Pill color="dark">PostgreSQL · MongoDB · Redis</Pill>
            </div>
          </div>

          {/* Processing Row */}
          <div className="flex items-center gap-3">
            <span className="w-24 shrink-0 font-sans text-xs text-white/40">{language === 'en' ? 'Processing' : 'Procesamiento'}</span>
            <div className="flex items-center gap-3">
              <Pill color="yellow">OpenAI API</Pill>
              <Plus />
              <Pill color="yellow">Gemini API</Pill>
              <Plus />
              <Pill color="yellow">Cluster LLM propio</Pill>
              <Arrow />
              <Pill color="dark">{language === 'en' ? 'Doc extraction 92%' : 'Extracción docs 92%'}</Pill>
            </div>
          </div>

          {/* Delivery Row */}
          <div className="flex items-center gap-3">
            <span className="w-24 shrink-0 font-sans text-xs text-white/40">{language === 'en' ? 'Delivery' : 'Delivery'}</span>
            <div className="flex items-center gap-3">
              <Pill color="dark">Docker · CI/CD</Pill>
              <Arrow />
              <Pill color="dark">5+ microservicios</Pill>
              <Arrow />
              <Pill color="dark">Apps web · mobile</Pill>
              <Arrow />
              <Pill color="green">Telegram monitoring</Pill>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-t border-white/5 bg-black/10">
        <Metric value="65%" label={language === 'en' ? 'LESS MANUAL WORK' : 'MENOS TRABAJO MANUAL'} />
        <Metric value="300+" label={language === 'en' ? 'DOCS PROCESSED / WEEK' : 'DOCS PROCESADOS / SEMANA'} border />
        <Metric value="10K+" label={language === 'en' ? 'DAILY REQUESTS' : 'REQUESTS DIARIOS'} border />
        <Metric value="92%" label={language === 'en' ? 'EXTRACTION ACCURACY' : 'PRECISIÓN EXTRACCIÓN'} border />
      </div>

      {/* Footer Section */}
      <div className="p-8 lg:p-12 border-t border-white/5">
        <div className="flex flex-wrap gap-2 mb-8">
          {["Python", "n8n", "Docker", "FastAPI", "OpenAI", "Gemini", "PostgreSQL", "Redis", "CI/CD"].map(tag => (
            <span key={tag} className="px-3 py-1 rounded-lg border border-white/10 bg-white/5 text-[10px] font-bold text-white/40">
              {tag}
            </span>
          ))}
        </div>
        
        <p className="font-sans text-xs italic text-white/30">
          {language === 'en' ? 'Production system — Partial NDA' : 'Sistema en producción — NDA parcial'}
        </p>
      </div>
    </article>
  );
}

function Pill({ children, color }: { children: React.ReactNode, color: 'blue' | 'yellow' | 'green' | 'dark' }) {
  const styles = {
    blue: "bg-[#eff6ff] text-[#1e40af] border-transparent",
    yellow: "bg-[#fefce8] text-[#854d0e] border-transparent",
    green: "bg-[#f0fdf4] text-[#166534] border-transparent",
    dark: "bg-white/5 text-white/60 border-white/10"
  };

  return (
    <span className={`px-4 py-2 rounded-xl text-[11px] font-medium border whitespace-nowrap ${styles[color]}`}>
      {children}
    </span>
  );
}

function Arrow() {
  return <ArrowRight className="diagram-arrow w-3 h-3 text-white/20 shrink-0" />;
}

function Plus() {
  return <span className="text-white/20 text-xs shrink-0">+</span>;
}

function Metric({ value, label, border }: { value: string, label: string, border?: boolean }) {
  return (
    <div className={`p-8 lg:p-10 flex flex-col gap-2 ${border ? 'md:border-l border-white/5' : ''} ${border ? 'border-t md:border-t-0 border-white/5' : ''}`}>
      <span className="text-3xl md:text-4xl font-bold tracking-tight text-white">{value}</span>
      <span className="text-[9px] font-bold uppercase tracking-widest text-white/30 leading-tight">{label}</span>
    </div>
  );
}
