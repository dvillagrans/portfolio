const fs = require('fs');
const file = 'src/app/projects/timeup/page.tsx';

const content = `"use client";

import React, { useEffect, useRef } from "react";
import { Link } from "next-view-transitions";
import Navbar from "@/components/layout/Navbar";
import { 
  ArrowLeft, ArrowUpRight, 
  Clock, Users, Zap, Shield, Database, LayoutTemplate, Activity, FileCheck2, AlertCircle, Quote 
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const meta = [
  { label: "Role", value: "Solo Developer / Architect" },
  { label: "Timeline", value: "10 Semanas (MVP)" },
  { label: "Architecture", value: "Serverless + Stateful VPS" },
  { label: "Core Stack", value: "Next.js, Supabase, Passkeys" }
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
      <main ref={containerRef} className="min-h-screen pt-24 pb-20 md:pt-32 md:pb-32 px-5 md:px-12 lg:px-24 text-zinc-300 bg-[#020406] selection:bg-[#00C9FF] selection:text-[#020406]">
      
      {/* Navigation */}
      <div className="mb-12 reveal-fade">
        <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-[#00C9FF] transition-colors uppercase font-mono tracking-widest">
          <ArrowLeft size={16} /> Volver al Archivo
        </Link>
      </div>

      {/* Header */}
      <header className="mb-12 reveal-fade max-w-5xl">
        <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-6 leading-none bg-clip-text text-transparent bg-[linear-gradient(135deg,#00C9FF,#00E3CC,#4B5DFF)] drop-shadow-2xl" style={{textShadow:"0 0 40px rgba(0,201,255,0.4)"}}>
          Time<span className="text-white/40">Up</span>
        </h1>
        <p className="text-xl md:text-3xl text-white/70 tracking-normal font-serif italic mb-6">
          SaaS Operativo para el sector de la salud y bienestar.
        </p>
      </header>

      {/* 1. TL;DR Cards */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-16 reveal-fade">
        <div className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl hover:border-[#00C9FF]/30 transition-all duration-500">
          <h3 className="text-[#00C9FF] font-mono text-xs uppercase tracking-widest mb-3 flex items-center gap-2"><AlertCircle size={14}/> El Reto</h3>
          <p className="text-sm text-white/60 leading-relaxed font-sans">
            Negocios locales operando ciegamente con <span className="text-white font-medium">WhatsApp y libretas</span>. Dueños ocupados permanentemente y un staff de atención con baja afinidad a herramientas tecnológicas complejas.
          </p>
        </div>
        <div className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl hover:border-[#00E3CC]/30 transition-all duration-500">
          <h3 className="text-[#00E3CC] font-mono text-xs uppercase tracking-widest mb-3 flex items-center gap-2"><Zap size={14}/> La Solución</h3>
          <p className="text-sm text-white/60 leading-relaxed font-sans">
            Plataforma <span className="text-white font-medium">Multi-tenant Cloud</span> con onboarding amigable, acceso <span className="text-[#00E3CC]">Passkeys biométrico</span> sin contraseñas engorrosas y flujo kinético Real-Time.
          </p>
        </div>
        <div className="bg-[#4B5DFF]/10 border border-[#4B5DFF]/20 p-6 rounded-2xl hover:border-[#4B5DFF]/40 transition-all duration-500">
          <h3 className="text-[#4B5DFF] font-mono text-xs uppercase tracking-widest mb-3 flex items-center gap-2"><Activity size={14}/> El Impacto</h3>
          <p className="text-sm text-[#4B5DFF]/90 leading-relaxed font-sans">
            <span className="text-white font-medium">MVP construido en 10 semanas</span> bajo una arquitectura optimizada. Despliegue con costos operativos cercanos a cero antes de traccionar volumen productivo.
          </p>
        </div>
      </section>

      {/* Meta Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 border-y border-white/10 py-8 reveal-fade font-mono text-xs">
        {meta.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <span className="text-white/40 uppercase relative pl-3 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-[#00C9FF] before:rounded-full">{item.label}</span>
            <span className="text-white/90">{item.value}</span>
          </div>
        ))}
      </section>

      {/* Live URLs */}
      <section className="flex flex-col sm:flex-row flex-wrap gap-4 mb-24 reveal-fade px-2">
        <a href="https://timeup.mx" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center sm:justify-start gap-3 border border-[#00C9FF]/30 px-6 py-3 font-mono text-xs uppercase tracking-widest text-[#00C9FF] transition-all hover:bg-[#00C9FF] hover:text-[#020406] hover:shadow-[0_0_20px_rgba(0,201,255,0.4)] rounded-full w-full sm:w-auto">
          App Pública
          <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
        <a href="https://negocios.timeup.mx" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center sm:justify-start gap-3 border border-[#4B5DFF]/30 px-6 py-3 font-mono text-xs uppercase tracking-widest text-[#4B5DFF] transition-all hover:bg-[#4B5DFF] hover:text-[#020406] hover:shadow-[0_0_20px_rgba(75,93,255,0.4)] rounded-full w-full sm:w-auto">
          Panel Negocios
          <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </section>

      {/* 2. PULL QUOTE */}
      <section className="mb-32 reveal-fade max-w-4xl mx-auto text-center px-4">
        <Quote className="text-[#00C9FF]/20 w-12 h-12 md:w-16 md:h-16 mx-auto mb-8" />
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white/90 leading-tight mb-8">
          "Si el onboarding tomaba más de <span className="text-[#00C9FF] italic font-medium">diez minutos</span>, la implementación fracasaba."
        </h2>
        <div className="w-12 h-1 bg-gradient-to-r from-[#00C9FF] to-[#4B5DFF] mx-auto mb-6 rounded-full"></div>
        <p className="font-mono text-xs text-white/40 uppercase tracking-widest">La Premisa Funcional</p>
      </section>

      {/* 3. Bento Constraints */}
      <section className="mb-32 reveal-fade">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-sm text-[#00C9FF] font-mono tracking-widest uppercase mb-3">01 // Restricciones Inflexibles</h2>
            <p className="text-3xl md:text-4xl font-serif text-white/80 leading-tight">Muros de contención.</p>
          </div>
          <p className="font-mono text-xs text-white/40 md:max-w-[200px] border-l border-white/20 pl-4 py-1">El contexto que definió la arquitectura y nos obligó a evitar la sobree-ingeniería.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(200px,auto)]">
          {/* Bento Item 1: Wide */}
          <div className="md:col-span-2 bg-[#1A1A1A]/60 border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-[#00C9FF]/30 transition-all duration-500 hover:bg-[#1A1A1A]">
            <div className="absolute top-0 right-0 p-8 text-white/[0.03] group-hover:text-[#00C9FF]/10 transition-colors duration-500">
              <Users size={180} />
            </div>
            <h3 className="text-2xl lg:text-3xl font-serif text-white mb-4 relative z-10 w-fit">Usuarios de Baja Paciencia</h3>
            <p className="text-white/60 leading-relaxed font-sans max-w-lg relative z-10 text-sm lg:text-base">
              Dueños de negocios de 30 a 50 años. El flujo no podía asumir <span className="text-[#00C9FF] font-medium">ningún conocimiento técnico previo</span>. Por eso transicionamos de esquemas lentos de email a utilizar <span className="text-white border-b border-white/20 pb-0.5">Hardware Biométrico nativo (Passkeys)</span>.
            </p>
          </div>

          {/* Bento Item 2 */}
          <div className="bg-[#1A1A1A]/60 border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-[#00E3CC]/30 transition-all duration-500 hover:bg-[#1A1A1A] flex flex-col justify-center">
            <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-3"><Clock className="text-[#00E3CC]" size={24}/> MVP a Contrarreloj</h3>
            <p className="text-white/60 leading-relaxed font-sans text-sm">Desarrollado y modelado por un <span className="text-[#00E3CC] font-medium">solo mantenedor</span>, obligando a elegir herramientas hiper-productivas (Turborepo + Next).</p>
          </div>

          {/* Bento Item 3 */}
          <div className="bg-gradient-to-br from-[#4B5DFF]/10 to-[#1A1A1A]/60 border border-[#4B5DFF]/20 p-8 rounded-3xl relative group hover:border-[#4B5DFF]/40 transition-all duration-500 flex flex-col justify-center">
            <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-3"><Shield className="text-[#4B5DFF]" size={24}/> Calidad del Tenant</h3>
            <p className="text-white/60 leading-relaxed font-sans text-sm">
              Sistema de Onboarding semi-abierto. Requiere aprobación administrativa en el Backend, generando estados complejos en BD <span className="text-[#4B5DFF] font-mono text-[10px] bg-[#4B5DFF]/10 px-2 py-1 rounded ml-1">PENDDING</span>.
            </p>
          </div>

          {/* Bento Item 4: Wide */}
          <div className="md:col-span-2 bg-[#1A1A1A]/60 border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-[#00C9FF]/30 transition-all duration-500 hover:bg-[#1A1A1A]">
            <div className="flex flex-col md:flex-row gap-8 h-full">
              <div className="flex-1 flex flex-col justify-center">
                 <h3 className="text-xl lg:text-2xl font-serif text-white mb-4 flex items-center gap-3"><Zap className="text-[#00C9FF]" size={24}/> Serverless Zero-Cost</h3>
                <p className="text-white/60 leading-relaxed font-sans text-sm">La app debía poder pivotear con un burn rate muerto. Despliegue puro en <span className="text-white font-medium">Vercel & Supabase Free</span> aislando los componentes demandantes.</p>
              </div>
              <div className="flex-1 md:border-l md:border-white/10 md:pl-8 flex flex-col justify-center pt-8 md:pt-0 border-t border-white/10 md:border-t-0">
                 <div className="flex items-center gap-3 mb-3">
                    <FileCheck2 className="text-white/40 group-hover:text-[#00C9FF] transition-colors" size={24}/>
                    <span className="text-white/90 font-serif text-lg">Módulo Legal Estricto</span>
                 </div>
                 <p className="text-sm text-white/50 font-sans">
                  Gestión innegociable de <span className="text-white/80">Consentimientos Informados Digitales</span> con firmas electrónicas en PDF para tratamientos médicos invasivos.
                 </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual System Context */}
      <section className="mb-32 reveal-fade">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-sm text-[#00C9FF] font-mono tracking-widest uppercase mb-3">02 // Interfaces Ecosistema</h2>
          <p className="text-3xl md:text-4xl font-serif text-white/80 leading-tight">Herramientas dedicadas por rol.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          <div className="md:col-span-12 relative h-[35vh] sm:h-[50vh] md:h-[75vh] w-full bg-[#1A1A1A] rounded-3xl overflow-hidden group border border-white/5">
            <Image 
              src="/img/timeup/admin-analytics.png" 
              alt="Administrador TimeUp" 
              fill 
              className="object-cover object-left-top opacity-50 mix-blend-screen scale-105 group-hover:scale-100 transition-all duration-1000 group-hover:opacity-100" 
            />
            <div className="absolute top-6 left-6 md:top-8 md:left-8 bg-[#020406]/90 p-4 rounded-xl backdrop-blur-md border-l-4 border-[#00C9FF] shadow-2xl">
              <p className="font-mono text-[10px] md:text-xs tracking-widest text-[#00C9FF] uppercase mb-1">MÓDULO : ADMIN</p>
              <p className="font-serif text-white/90 text-sm md:text-base">Centro de Control y Analíticas Globales.</p>
            </div>
          </div>

          <div className="md:col-span-6 relative h-[30vh] sm:h-[40vh] md:h-[55vh] w-full bg-[#1A1A1A] rounded-3xl overflow-hidden group border border-white/5">
            <Image 
              src="/img/timeup/owner-finance.png" 
              alt="Finanzas Dueño" 
              fill 
              className="object-cover object-left-top opacity-50 mix-blend-screen scale-105 group-hover:scale-100 transition-all duration-1000 group-hover:opacity-100" 
            />
            <div className="absolute top-6 left-6 bg-[#020406]/90 p-4 rounded-xl backdrop-blur-md border-l-4 border-[#00E3CC] shadow-2xl">
              <p className="font-mono text-[10px] md:text-xs tracking-widest text-[#00E3CC] uppercase mb-1">MÓDULO : OWNER</p>
              <p className="font-serif text-white/90 text-sm md:text-base">Métricas de Rendimiento y Configuración.</p>
            </div>
          </div>

          <div className="md:col-span-6 relative h-[30vh] sm:h-[40vh] md:h-[55vh] w-full bg-[#1A1A1A] rounded-3xl overflow-hidden group border border-white/5">
            <Image 
              src="/img/timeup/staff-dashboard.png" 
              alt="Agenda Staff" 
              fill 
              className="object-cover object-left-top opacity-50 mix-blend-screen scale-105 group-hover:scale-100 transition-all duration-1000 group-hover:opacity-100" 
            />
            <div className="absolute top-6 left-6 bg-[#020406]/90 p-4 rounded-xl backdrop-blur-md border-l-4 border-[#4B5DFF] shadow-2xl">
              <p className="font-mono text-[10px] md:text-xs tracking-widest text-[#4B5DFF] uppercase mb-1">MÓDULO : STAFF</p>
              <p className="font-serif text-white/90 text-sm md:text-base">Agenda Viva y Manejo Cliente-Local.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Engineering Decisions / Callouts */}
      <section className="mb-32 reveal-fade">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-sm text-[#00C9FF] font-mono tracking-widest uppercase mb-3">03 // Arquitectura y Decisiones</h2>
            <p className="text-3xl md:text-4xl font-serif text-white/80 leading-tight">Trade-offs que dan vida al negocio.</p>
          </div>
        </div>
        
        <div className="flex flex-col gap-8">
          
          {/* Dec 1 */}
          <div className="bg-[#1A1A1A]/40 border border-white/5 rounded-3xl overflow-hidden flex flex-col md:flex-row group hover:border-[#00C9FF]/20 transition-all duration-500">
             <div className="p-8 md:w-1/3 bg-white/[0.01] border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#00C9FF] mb-3 block">3.1 / ESTRUCTURA DE REPOSITORIO</span>
                  <h3 className="text-2xl font-serif text-white mb-2">Monorepositorio Turborepo</h3>
                </div>
                <LayoutTemplate className="text-white/10 mt-12 group-hover:text-[#00C9FF]/20 transition-colors" size={64} strokeWidth={1} />
             </div>
             <div className="p-8 md:p-12 md:w-2/3 flex flex-col gap-6 justify-center">
                <p className="text-white/70 leading-relaxed font-sans text-sm lg:text-base">
                  Construir múltiples ecosistemas React obligaba a cruzar lógicas de negocio, tipos en TypeScript y esquemas Prisma. Optamos por la rigidez inicial de <span className="text-white">monorepositorios para orquestar</span> múltiples bases acopladas con cacherréo automático.
                </p>
                <div className="bg-gradient-to-r from-[#4B5DFF]/10 to-transparent border-l-2 border-[#4B5DFF] rounded-r-xl p-6">
                   <h4 className="text-[#4B5DFF] uppercase text-[10px] tracking-widest font-mono mb-2 flex items-center gap-2"><Activity size={12}/> El Costo Operativo</h4>
                   <p className="text-sm text-[#4B5DFF]/80 font-sans">El tooling de arranque retrasó la v.1, pero escalar entre un despliegue y otro fue totalmente instantáneo semanas después.</p>
                </div>
             </div>
          </div>

          {/* Dec 2 */}
          <div className="bg-[#1A1A1A]/40 border border-white/5 rounded-3xl overflow-hidden flex flex-col md:flex-row group hover:border-[#00E3CC]/20 transition-all duration-500">
             <div className="p-8 md:w-1/3 bg-white/[0.01] border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#00E3CC] mb-3 block">3.2 / SINCRONIZACIÓN STATEFUL</span>
                  <h3 className="text-2xl font-serif text-white mb-2">Aislamiento de WebSockets</h3>
                </div>
                <Database className="text-white/10 mt-12 group-hover:text-[#00E3CC]/20 transition-colors" size={64} strokeWidth={1} />
             </div>
             <div className="p-8 md:p-12 md:w-2/3 flex flex-col gap-6 justify-center">
                <p className="text-white/70 leading-relaxed font-sans text-sm lg:text-base">
                  Plataformas como Vercel y Edge Functions castigan las conexiones abiertas prolongadas (Timeouts y SSE muertos en minutos). Extrajimos el motor bidireccional a una Máquina Virtual con <span className="text-[#00E3CC]">NodeJS + pm2 + Redis PubSub</span> actuando como pipeline en tiempo real.
                </p>
                <div className="bg-gradient-to-r from-[#4B5DFF]/10 to-transparent border-l-2 border-[#4B5DFF] rounded-r-xl p-6">
                   <h4 className="text-[#4B5DFF] uppercase text-[10px] tracking-widest font-mono mb-2 flex items-center gap-2"><Activity size={12}/> El Costo Operativo</h4>
                   <p className="text-sm text-[#4B5DFF]/80 font-sans">Fragmentación de monitoreo; pasamos de solo mirar logs de Vercel a tener que revisar métricas en un droplet de Ubuntu constantemente.</p>
                </div>
             </div>
          </div>

          {/* Dec 3 */}
          <div className="bg-[#1A1A1A]/40 border border-white/5 rounded-3xl overflow-hidden flex flex-col md:flex-row group hover:border-[#00C9FF]/20 transition-all duration-500">
             <div className="p-8 md:w-1/3 bg-white/[0.01] border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#4B5DFF] mb-3 block">3.3 / EXPERIENCIA DE AUTENTICACIÓN</span>
                  <h3 className="text-2xl font-serif text-white mb-2">Ingreso Biométrico WebAuthn</h3>
                </div>
                <Shield className="text-white/10 mt-12 group-hover:text-[#4B5DFF]/20 transition-colors" size={64} strokeWidth={1} />
             </div>
             <div className="p-8 md:p-12 md:w-2/3 flex flex-col gap-6 justify-center">
                <p className="text-white/70 leading-relaxed font-sans text-sm lg:text-base">
                  Obligar al staff local a recordar strings largos interrumpe su labor operativa. La implementación fuerte de APIs de biometría integradas en el hardware (FaceID / Fingerprint) cortó la fricción de acceso desde <span className="text-white">varios minutos a fracciones de segundo</span> en la tablet del mostrador.
                </p>
                <div className="bg-gradient-to-r from-[#4B5DFF]/10 to-transparent border-l-2 border-[#4B5DFF] rounded-r-xl p-6">
                   <h4 className="text-[#4B5DFF] uppercase text-[10px] tracking-widest font-mono mb-2 flex items-center gap-2"><Activity size={12}/> El Costo Operativo</h4>
                   <p className="text-sm text-[#4B5DFF]/80 font-sans">Altísima complejidad en el fallback; obligó a mantener un robusto sistema extra por Magic Links SMTP.</p>
                </div>
             </div>
          </div>

        </div>
      </section>

      {/* 5. What Broke & Learned (Minimalist rows) */}
      <section className="mb-32 grid md:grid-cols-12 gap-12 md:gap-20 reveal-fade">
        <div className="md:col-span-5">
          <h2 className="text-sm text-[#00E3CC] font-mono tracking-widest uppercase mb-3">04 // Post-Mortem System</h2>
          <p className="text-3xl md:text-4xl font-serif text-white/80 mb-6 leading-tight">Aprendizajes crudos al golpear Producción.</p>
          <p className="text-sm font-sans text-white/50 leading-relaxed">
            Las implementaciones técnicas puras raramente sobreviven al comportamiento orgánico del usuario final y de las limitaciones Cloud de cueto inferior. Lo que realmente se incendió y cómo fue blindado.
          </p>
        </div>
        <div className="md:col-span-7">
          <div className="flex flex-col gap-4">
            
            <div className="bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 transition-colors p-6 md:p-8 rounded-2xl group">
              <h3 className="text-xl font-serif text-white mb-3 flex items-center gap-3">Asfixia del Connection Pooler <AlertCircle className="text-red-400 opacity-60 group-hover:opacity-100 transition-opacity" size={18}/></h3>
              <p className="text-sm font-sans text-white/50 mb-5 leading-relaxed">Combinar AWS Serverless con motores de Base de Datos fríos en Supabase terminaba quemando cuotas de conexión ineficientes destrozando los pipelines.</p>
              <div className="flex gap-2">
                 <span className="text-[10px] font-mono tracking-widest text-[#00E3CC] bg-[#00E3CC]/10 border border-[#00E3CC]/20 px-3 py-1.5 rounded-full inline-block">MIGRADO DE URGENCIA A TRANSACTION POOLERS ACTIVOS</span>
              </div>
            </div>

            <div className="bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 transition-colors p-6 md:p-8 rounded-2xl group">
              <h3 className="text-xl font-serif text-white mb-3 flex items-center gap-3">WebAuthn & Origin Mismatch <AlertCircle className="text-red-400 opacity-60 group-hover:opacity-100 transition-opacity" size={18}/></h3>
              <p className="text-sm font-sans text-white/50 mb-5 leading-relaxed">Un insignificante slash '/' sobrante en la terminación CORS del proyecto en producción colapsó todo el flujo de llaves digitales de seguridad en el deploy inicial porque rompen la seguridad criptográfica.</p>
              <div className="flex gap-2">
                 <span className="text-[10px] font-mono tracking-widest text-[#00E3CC] bg-[#00E3CC]/10 border border-[#00E3CC]/20 px-3 py-1.5 rounded-full inline-block">ESPEJADO OBLIGATORIO DE ENTORNO PREVIEW CI/CD</span>
              </div>
            </div>

            <div className="bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 transition-colors p-6 md:p-8 rounded-2xl group">
              <h3 className="text-xl font-serif text-white mb-3 flex items-center gap-3">Purgatorios de Estado y Usuarios Fantasma <AlertCircle className="text-red-400 opacity-60 group-hover:opacity-100 transition-opacity" size={18}/></h3>
              <p className="text-sm font-sans text-white/50 mb-5 leading-relaxed">Entidades semi-aprobadas creaban inconsistencia al arrastrar valores que contaminaban las métricas de cohortes posteriores en KPIs.</p>
              <div className="flex gap-2">
                 <span className="text-[10px] font-mono tracking-widest text-[#00E3CC] bg-[#00E3CC]/10 border border-[#00E3CC]/20 px-3 py-1.5 rounded-full inline-block">RESTRICCIÓN ABSOLUTA DE ESTADOS INTERMEDIOS (BOOLEANS AL EXTREMO)</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="pt-12 pb-12 flex flex-col sm:flex-row justify-between items-center text-[10px] text-white/30 font-mono tracking-widest uppercase border-t border-white/10 reveal-fade">
        <span className="mb-4 sm:mb-0">LAST UPDATED: Q1 2026 // TIMEUP SYSTEM ARCHITECTURE LOG</span>
        <span className="text-[#00C9FF]/50 border border-[#00C9FF]/20 px-4 py-2 rounded-full">ESTADO: EN PRODUCCIÓN CONSTANTE</span>
      </footer>
    </main>
    </>
  );
}
`

fs.writeFileSync(file, content);
