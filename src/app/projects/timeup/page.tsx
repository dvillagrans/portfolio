"use client";

import React, { useEffect, useRef } from "react";
import { Link } from "next-view-transitions";
import Navbar from "@/components/layout/Navbar";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const meta = [
  { label: "Role", value: "Solo Developer / Architect" },
  { label: "Timeline", value: "10 Weeks (MVP)" },
  { label: "Architecture", value: "Serverless + Stateful Node.js VPS" },
  { label: "Core Stack", value: "Next.js, Turborepo, Supabase, Socket.IO, Passkeys" }
];

const constraints = [
  { title: "Tiempo", desc: "Proyecto de una sola persona. El MVP tenía que ser funcional en aproximadamente diez semanas, sin equipo ni margen para reescrituras grandes." },
  { title: "Usuarios reales con baja tolerancia técnica", desc: "Dueños de negocios de entre 30 y 50 años, con experiencia técnica baja o media. Si el onboarding tomaba más de diez minutos, el sistema fallaba." },
  { title: "Costos cero al inicio", desc: "La infraestructura no podía escalar en costo antes de tener ingresos reales. Serverless y servicios gestionados eran obligatorios." },
  { title: "Aprobación manual forzosa", desc: "Para evitar spam y mantener calidad de usuarios, el registro no podía ser self-service. Esto afectó el diseño del flujo de autenticación desde el inicio." },
  { title: "Serverless sin estado", desc: "Desplegado en Vercel. Cualquier funcionalidad con estado persistente (WebSockets, notificaciones en tiempo real) tenía que vivir fuera del frontend." },
  { title: "Regularización legal", desc: "Negocios de salud y bienestar requieren consentimientos informados firmados. No era un nice-to-have, era una restricción del dominio desde el día uno." }
];

const decisions = [
  {
    topic: "3.1 Monorepo con Turborepo",
    decision: "Un monorepo con múltiples apps y packages",
    why: "El sistema tiene dos frontends con usuarios distintos (dueños y clientes), pero comparten esquema de datos, tipos y lógica de dominio. Separar repositorios hubiera fragmentado el código. Turborepo permitió builds incrementales sin pipelines complejos.",
    tradeoff: "Mayor complejidad inicial en configuración (paths, aliases, Prisma compartido). El costo valía la coherencia."
  },
  {
    topic: "3.2 Next.js App Router como backend y frontend",
    decision: "No existe un backend separado. APIs en Next.js",
    why: "Con un solo desarrollador, mantener frontend y backend separados duplicaba deploys, auth y tipados. Next.js App Router con Server Actions cubría el volumen del MVP.",
    tradeoff: "Arquitectura serverless sin estado. Esto obligó a diseñar explícitamente cualquier feature con estado persistente, resultando más robusto."
  },
  {
    topic: "3.3 WebSocket Server separado en VPS",
    decision: "Notificaciones RT en un servidor Node.js dedicado + Redis",
    why: "Vercel no soporta conexiones persistentes. SSE falló por timeouts. Extraer WebSockets a un proceso dedicado resolvió el problema. Flujo: Next.js → POST /notify → WebSocket Server → Redis → Cliente.",
    tradeoff: "Más puntos de fallo y operación. La separación de responsabilidades era correcta, pero incrementó mantenimiento al salir de vercel."
  },
  {
    topic: "3.4 Registro con aprobación manual",
    decision: "Registros en estado PENDING para aprobación del Admin",
    why: "Control de calidad en beta cerrada. Además, el modelo multi-tenant asume datos completos desde el inicio. Registros instantáneos generan negocios mal configurados.",
    tradeoff: "Mayor fricción en el funnel de onboarding."
  },
  {
    topic: "3.5 Passkeys (WebAuthn)",
    decision: "Soporte de autenticación sin contraseña desde MVP",
    why: "Usuarios con baja tolerancia a contraseñas. Tablets compartidas. Alta rotación de personal. Los passkeys reducen la fricción al mínimo.",
    tradeoff: "Implementación compleja. Errores de configuración de DOM/Origin en producción costaron debugging."
  },
  {
    topic: "3.6 Consentimientos Digitales",
    decision: "Módulo con firma electrónica y generación PDF de clase mundial",
    why: "Para negocios de salud no es opcional. Sin esto, la plataforma no podía ser usada legalmente.",
    tradeoff: "Complejidad temprana en schema y flujos antes de validar PMF real en el nicho de salud."
  },
  {
    topic: "3.7 Cron billing en VPS",
    decision: "Pipeline de cobros desde un cron job robusto en VPS",
    why: "Vercel Cron no garantizaba ejecución precisa. Para billing, la confiabilidad absoluta es innegociable.",
    tradeoff: "Mantenimiento operativo adicional de una VM solo para correr cronjobs con API keys validadas."
  }
];

const lessons = [
  { title: "Connection pooling en serverless", issue: "Vercel + Prisma + Supabase sin pooling causaba errores silenciosos.", lesson: "En serverless con managed DB, el connection pooler es obligatorio. Migrado a Transaction Pooler en Supabase." },
  { title: "WebAuthn & NEXTAUTH_URL", issue: "Un slash extra en la config de producción corrompía los passkeys.", lesson: "Cualquier feature dependiente de origin matching necesita staging real idéntico antes de producción." },
  { title: "Sobre-ingeniería temprana", issue: "Demasiada auditoría y features legales para una v1.", lesson: "Las restricciones reales no siempre son urgencias inmediatas para un MVP." },
  { title: "Ghost users y estados intermedios", issue: "Los estados intermedios se expanden y contaminan todo el sistema.", lesson: "Evita estados intermedios en entidades core si no son estrictamente vitales." }
];

export default function TimeUpCaseStudy() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(".reveal-fade");
      elements.forEach((el: any) => {
        gsap.fromTo(el, 
          { y: 30, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" } }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />
      <main ref={containerRef} className="min-h-screen pt-24 pb-20 md:pt-32 md:pb-32 px-5 md:px-12 lg:px-24 text-[#FFFFFF] uppercase tracking-wide bg-[#020406]">
      
      {/* Navigation */}
      <div className="mb-16 reveal-fade">
        <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-[#FFFFFF]/50 hover:text-[#FFFFFF] transition-colors uppercase font-mono tracking-widest">
          <ArrowLeft size={16} /> Volver al Archivo
        </Link>
      </div>

      {/* Header */}
      <header className="mb-16 md:mb-24 reveal-fade max-w-5xl">
        <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-6 md:mb-8 leading-none bg-clip-text text-transparent bg-[linear-gradient(135deg,#00C9FF,#00E3CC,#4B5DFF)] drop-shadow-2xl" style={{textShadow:"0 0 40px rgba(0,201,255,0.4)"}}>
          Time<span className="text-[#FFFFFF]/40">Up</span>
        </h1>
        <p className="text-xl md:text-3xl text-[#FFFFFF]/70 tracking-normal capitalize font-serif italic mb-6">
          Operational SaaS for local service businesses in Mexico
        </p>
        <p className="text-sm md:text-base text-[#FFFFFF]/50 leading-relaxed max-w-3xl font-mono normal-case tracking-normal">
          A production-ready, multi-tenant platform designed to reduce operational friction in small service businesses with zero digital infrastructure.
          This case study documents the constraints, decisions, trade-offs, and failures behind building and operating TimeUp as a solo developer.
        </p>
      </header>

      {/* Meta Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 mb-12 md:mb-16 border-t border-b border-[#2A2A2A] py-6 md:py-8 reveal-fade font-mono text-xs md:text-sm">
        {meta.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <span className="text-[#FFFFFF]/40">{item.label}</span>
            <span className="normal-case text-[#FFFFFF]/90">{item.value}</span>
          </div>
        ))}
      </section>

      {/* Live URLs */}
      <section className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 mb-20 md:mb-32 reveal-fade">
        <a href="https://timeup.mx" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center sm:justify-start gap-3 border border-white/20 px-4 py-3 md:px-6 md:py-3 font-mono text-xs uppercase tracking-widest text-[#FFFFFF] transition-all hover:bg-[#00C9FF] hover:text-[#020406] hover:shadow-[0_0_20px_rgba(0,201,255,0.5)] border-[#00C9FF]/30 w-full sm:w-auto">
          App Usuarios
          <ArrowUpRight className="h-3 w-3" />
        </a>
        <a href="https://negocios.timeup.mx" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center sm:justify-start gap-3 border border-white/20 px-4 py-3 md:px-6 md:py-3 font-mono text-xs uppercase tracking-widest text-[#FFFFFF] transition-all hover:bg-[#00C9FF] hover:text-[#020406] hover:shadow-[0_0_20px_rgba(0,201,255,0.5)] border-[#00C9FF]/30 w-full sm:w-auto">
          App Negocios
          <ArrowUpRight className="h-3 w-3" />
        </a>
      </section>

      {/* 1. El Problema Real */}
      <section className="mb-20 md:mb-32 grid md:grid-cols-12 gap-12 reveal-fade">
        <div className="md:col-span-4">
          <h2 className="text-xs text-[#FFFFFF]/50 font-mono tracking-widest uppercase relative md:sticky md:top-32 mb-6 md:mb-0">01 // El Problema Real</h2>
        </div>
        <div className="md:col-span-8 prose prose-invert font-serif normal-case tracking-normal text-lg md:text-xl leading-relaxed text-[#FFFFFF]/80">
          <p className="mb-6">El dolor que atacaba TimeUp no era "agendar citas". Era que los dueños de barberías, estéticas, spas y clínicas pequeñas operan con WhatsApp, libretas y memoria.</p>
          <p className="mb-6">Cuando un cliente no aparece, nadie lo sabe hasta que el especialista está parado esperando. Cuando quieren ver cuánto ganaron en la semana, abren Excel —o no lo abren y simplemente no lo saben.</p>
          <p className="mb-6">No había fricción de adopción tecnológica porque "no les gustara la tecnología". Había fricción porque ninguna herramienta existente había sido diseñada para alguien que tiene las manos ocupadas cortando cabello y no puede interpretar un dashboard de doce widgets en una tablet.</p>
          <p className="text-[#FFFFFF] font-medium">El problema real era reducir la carga operativa de negocios locales que tienen cero infraestructura digital y muy poco tiempo para aprender herramientas nuevas.</p>
        </div>
      </section>

      {/* 2. Constraints */}
      <section className="mb-20 md:mb-32 grid md:grid-cols-12 gap-12 reveal-fade">
        <div className="md:col-span-4">
          <h2 className="text-xs text-[#FFFFFF]/50 font-mono tracking-widest uppercase relative md:sticky md:top-32 mb-6 md:mb-0">02 // Context & Constraints</h2>
          <p className="mt-4 text-sm font-mono normal-case tracking-normal text-[#FFFFFF]/40 mb-8">Constraints That Shaped Every Decision. Estas restricciones no son excusas. Son el contexto que define cada decisión técnica y de producto.</p>
        </div>
        <div className="md:col-span-8">
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-12">
            {constraints.map((c, i) => (
              <div key={i} className="border-l border-white/20 pl-4 relative group">
                <h3 className="text-sm font-bold mb-3">{c.title}</h3>
                <p className="text-sm text-[#FFFFFF]/60 font-mono normal-case tracking-normal leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Visual System Context */}
      <section className="mb-20 md:mb-32 reveal-fade">
        <h2 className="text-xs text-[#FFFFFF]/50 font-mono tracking-widest uppercase mb-12 border-b border-[#2A2A2A] pb-4">02.5 // System Interfaces</h2>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Main Hero Image - Admin Analytics */}
          <div className="md:col-span-12 relative h-[25vh] sm:h-[40vh] md:h-[70vh] w-full border border-[#2A2A2A] bg-white/5 group overflow-hidden">
            <Image 
              src="/images/timeup/admin-analytics.png" 
              alt="TimeUp Admin Analytics Panel" 
              fill 
              className="object-cover object-left-top opacity-60 mix-blend-screen transition-opacity duration-700 group-hover:opacity-100" 
            />
            <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-[#020406]/60 backdrop-blur-md px-2 py-1 md:px-3 font-mono text-[9px] md:text-[10px] tracking-widest border border-[#2A2A2A] text-[#FFFFFF]/70">
              ROLE_ADMIN // ANALYTICS ENGINE
            </div>
          </div>

          {/* Sub Images - Staff & Owner */}
          <div className="md:col-span-6 relative h-[25vh] sm:h-[30vh] md:h-[50vh] w-full border border-[#2A2A2A] bg-white/5 group overflow-hidden">
            <Image 
              src="/images/timeup/owner-finance.png" 
              alt="TimeUp Owner Financial Panel" 
              fill 
              className="object-cover object-left-top opacity-60 mix-blend-screen transition-opacity duration-700 group-hover:opacity-100" 
            />
            <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-[#020406]/60 backdrop-blur-md px-2 py-1 md:px-3 font-mono text-[9px] md:text-[10px] tracking-widest border border-[#2A2A2A] text-[#FFFFFF]/70">
              ROLE_OWNER // FINANCIAL METRICS
            </div>
          </div>

          <div className="md:col-span-6 relative h-[25vh] sm:h-[30vh] md:h-[50vh] w-full border border-[#2A2A2A] bg-white/5 group overflow-hidden">
            <Image 
              src="/images/timeup/staff-dashboard.png" 
              alt="TimeUp Staff Daily Agenda" 
              fill 
              className="object-cover object-left-top opacity-60 mix-blend-screen transition-opacity duration-700 group-hover:opacity-100" 
            />
            <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-[#020406]/60 backdrop-blur-md px-2 py-1 md:px-3 font-mono text-[9px] md:text-[10px] tracking-widest border border-[#2A2A2A] text-[#FFFFFF]/70">
              ROLE_STAFF // KINETIC AGENDA
            </div>
          </div>

        </div>
      </section>

      {/* 3. Architecture ASCII */}
      <section className="mb-20 md:mb-32 reveal-fade">
        <h2 className="text-xs text-[#FFFFFF]/50 font-mono tracking-widest uppercase mb-12 border-b border-[#2A2A2A] pb-4">03 // System Architecture</h2>
        <div className="bg-[#020406]/40 border border-[#2A2A2A] p-4 md:p-8 rounded-sm overflow-x-auto relative group">
          <div className="absolute top-4 right-4 text-[10px] uppercase font-mono text-[#FFFFFF]/20">V_1.0 Production</div>
          <pre className="font-mono text-[10px] md:text-xs text-[#FFFFFF]/60 leading-tight">
{`┌──────────────────────────────────────────────────────┐
│                   Vercel (Serverless)                │
│                                                      │
│   apps/negocios          apps/usuarios               │
│   (Next.js)              (Next.js)                   │
│   Panel de negocios      Reserva pública             │
│                                                      │
└───────────────┬──────────────────────────────────────┘
│
┌─────────┼─────────┐
│         │         │
┌─────▼─────┐ ┌─▼────┐ ┌──▼────────────┐
│ Supabase  │ │Redis │ │ VPS (Node.js) │
│ PostgreSQL│ │PubSub│ │ WebSocket     │
│ Prisma    │ └──────┘ │ Cron Billing  │
└───────────┘          └───────────────┘`}
          </pre>
          
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs text-[#FFFFFF]/50 pt-4 border-t border-[#2A2A2A] shadow-[0_-20px_60px_rgba(0,0,0,0.5)] bg-[#0A0A0A]">
            <div><span className="text-[#FFFFFF]/80">ADMIN:</span> Global management</div>
            <div><span className="text-[#FFFFFF]/80">OWNER:</span> Full control</div>
            <div><span className="text-[#FFFFFF]/80">STAFF:</span> Personal agenda</div>
            <div><span className="text-[#FFFFFF]/80">CLIENT:</span> Booking</div>
          </div>
        </div>
      </section>

      {/* 4. Key Decisions */}
      <section className="mb-20 md:mb-32 reveal-fade">
        <h2 className="text-xs text-[#FFFFFF]/50 font-mono tracking-widest uppercase mb-12 border-b border-[#2A2A2A] pb-4">04 // Key Decisions</h2>
        <div className="flex flex-col gap-8 text-sm normal-case font-mono tracking-normal">
          {decisions.map((d, i) => (
            <div key={i} className="grid md:grid-cols-12 gap-6 bg-white/[0.02] border border-[#2A2A2A] p-6 md:p-8 hover:bg-white/[0.04] transition-colors">
              <div className="md:col-span-4 flex flex-col justify-between">
                <span className="text-xs text-[#FFFFFF]/40 uppercase tracking-widest mb-4 inline-block">{d.topic}</span>
                <span className="text-base text-[#FFFFFF]/90 font-medium">{d.decision}</span>
              </div>
              <div className="md:col-span-8 flex flex-col gap-4">
                <div>
                  <h4 className="text-[10px] uppercase text-[#FFFFFF]/30 tracking-widest mb-1">Why</h4>
                  <p className="text-[#FFFFFF]/70 leading-relaxed">{d.why}</p>
                </div>
                <div className="border-t border-[#2A2A2A] shadow-[0_-20px_60px_rgba(0,0,0,0.5)] bg-[#0A0A0A] pt-4 mt-2">
                  <h4 className="text-[10px] uppercase text-[#FFFFFF]/30 tracking-widest mb-1">Trade-off Accepted</h4>
                  <p className="text-[#FFFFFF]/50">{d.tradeoff}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. What Broke & Learned */}
      <section className="mb-20 md:mb-32 grid md:grid-cols-12 gap-12 reveal-fade">
        <div className="md:col-span-4">
          <h2 className="text-xs text-[#FFFFFF]/50 font-mono tracking-widest uppercase relative md:sticky md:top-32 mb-6 md:mb-0">05 // Post-Mortem</h2>
          <p className="mt-4 text-sm font-mono normal-case tracking-normal text-[#FFFFFF]/40 mb-8">What Broke, What Hurt, What I Learned. These failures shaped the system more than the successes.</p>
        </div>
        <div className="md:col-span-8">
          <div className="flex flex-col gap-6">
            {lessons.map((l, i) => (
              <div key={i} className="border border-[#2A2A2A] p-6 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#FFFFFF]/80">{l.title}</h3>
                  <p className="text-sm font-mono tracking-normal normal-case text-[#FFFFFF]/50">{l.issue}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-sm border-l-2 border-white/50">
                  <p className="text-sm font-mono normal-case tracking-normal text-[#FFFFFF]/80"><span className="text-[10px] uppercase text-[#FFFFFF]/40 mr-2 tracking-widest">Lesson:</span>{l.lesson}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Outcome & Differently */}
      <section className="grid md:grid-cols-2 gap-12 mb-24 reveal-fade pt-12 border-t border-[#2A2A2A] shadow-[0_-20px_60px_rgba(0,0,0,0.5)] bg-[#0A0A0A]">
        <div>
          <h2 className="text-xs text-[#FFFFFF]/50 font-mono tracking-widest uppercase mb-6">06 // Outcome</h2>
          <ul className="text-sm font-mono normal-case tracking-normal text-[#FFFFFF]/70 flex flex-col gap-3">
            <li className="flex items-start gap-3"><span className="text-[#FFFFFF]/30">→</span> TimeUp está en producción activa bajo timeup.mx</li>
            <li className="flex items-start gap-3"><span className="text-[#FFFFFF]/30">→</span> Flujos completos de onboarding, operación y reserva pública</li>
            <li className="flex items-start gap-3"><span className="text-[#FFFFFF]/30">→</span> Cron billing diario en producción estable</li>
            <li className="flex items-start gap-3"><span className="text-[#FFFFFF]/30">→</span> Dashboard Time-to-First-Byte (TTFB) &lt; 500 ms</li>
            <li className="flex items-start gap-3"><span className="text-[#FFFFFF]/30">→</span> Arquitectura extensible sin refactor estructural post-MVP</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xs text-[#FFFFFF]/50 font-mono tracking-widest uppercase mb-6">07 // What I Would Do Differently</h2>
          <ul className="text-sm font-mono normal-case tracking-normal text-[#FFFFFF]/70 flex flex-col gap-3">
            <li className="flex items-start gap-3"><span className="text-[#FFFFFF]/30">→</span> Simplificaría drásticamente el modelo de usuarios/roles.</li>
            <li className="flex items-start gap-3"><span className="text-[#FFFFFF]/30">→</span> Extraería una capa de servicios explícita desde el día uno.</li>
            <li className="flex items-start gap-3"><span className="text-[#FFFFFF]/30">→</span> Implementaría un entorno de staging obligatorio para CI/CD.</li>
            <li className="flex items-start gap-3"><span className="text-[#FFFFFF]/30">→</span> Usaría un proveedor gestionado para realtime (Pusher/Supabase RT) en lugar de WebSockets custom.</li>
          </ul>
        </div>
      </section>

      <div className="text-center md:text-left text-[10px] text-[#FFFFFF]/30 font-mono tracking-widest uppercase pt-12 border-t border-[#2A2A2A] shadow-[0_-20px_60px_rgba(0,0,0,0.5)] bg-[#0A0A0A] reveal-fade">
        LAST UPDATED: FEBRUARY 2026 // TIMEUP SYSTEM ARCHITECTURE LOG
      </div>
    </main>
    </>
  );
}
