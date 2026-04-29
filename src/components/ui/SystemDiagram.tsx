"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Database, Cpu, Send, Zap, MessageSquare, Globe, Activity } from "lucide-react";

export default function SystemDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(".diagram-item", { opacity: 1, y: 0 });
        return;
      }
      // Animate entry for all elements
      gsap.from(".diagram-item", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out"
      });

      // Subtle pulse for the core
      gsap.to(".diagram-core", {
        scale: 1.02,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Flow animations (simulating framer-motion dash offset)
      gsap.to(".flow-path", {
        strokeDashoffset: -20,
        duration: 1,
        repeat: -1,
        ease: "none"
      });
    }, containerRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={containerRef} className="relative h-full w-full bg-black flex flex-col items-center justify-center p-8 overflow-hidden font-mono text-[10px]">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:30px_30px]"></div>
      
      {/* Animated Flow Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.15 }}>
        <path 
          d="M 150 250 L 300 250" 
          stroke="#ff9d00" 
          strokeWidth="1"
          fill="none"
          strokeDasharray="4,4"
          className="flow-path"
        />
        <path 
          d="M 450 250 L 600 250" 
          stroke="#ff9d00" 
          strokeWidth="1"
          fill="none"
          strokeDasharray="4,4"
          className="flow-path"
        />
      </svg>

      <div className="relative z-10 grid grid-cols-3 gap-12 items-center w-full max-w-3xl">
        
        {/* Layer 1: Ingestion */}
        <div className="flex flex-col gap-3">
          <div className="text-white/20 uppercase tracking-[0.3em] mb-4 text-[8px]">Layer_01 / Ingestion</div>
          {[
            { icon: <Zap className="w-3 h-3" />, label: "Webhooks" },
            { icon: <Globe className="w-3 h-3" />, label: "Scrapers" },
            { icon: <Activity className="w-3 h-3" />, label: "API Streams" }
          ].map((item, i) => (
            <div 
              key={i}
              className="diagram-item flex items-center gap-3 bg-white/[0.03] border border-white/10 p-3 rounded-xl text-white/60"
            >
              <div className="text-warm">{item.icon}</div>
              <span className="tracking-wider">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Layer 2: Processing (Centerpiece) */}
        <div className="flex flex-col items-center">
          <div className="text-white/20 uppercase tracking-[0.3em] mb-6 text-[8px]">Layer_02 / Logic</div>
          <div 
            className="diagram-core diagram-item relative flex flex-col items-center justify-center w-40 h-56 bg-warm/5 border border-warm/30 rounded-[2rem] p-6 text-center shadow-[0_0_50px_rgba(255,157,0,0.05)]"
          >
            <div className="absolute -top-3 px-3 bg-black border border-warm/30 rounded-full text-[7px] font-bold text-warm uppercase tracking-widest">Autonomous Core</div>
            <Cpu className="w-10 h-10 text-warm mb-6 opacity-80" />
            <div className="flex flex-col gap-2.5 w-full">
              <div className="bg-white/5 p-2 rounded-lg border border-white/5 text-[7px] text-white/40 tracking-wider">Custom LLaMA Cluster</div>
              <div className="bg-white/5 p-2 rounded-lg border border-white/5 text-[7px] text-white/40 tracking-wider">OpenAI GPT-4o</div>
              <div className="bg-white/5 p-2 rounded-lg border border-white/5 text-[7px] text-white/40 tracking-wider">Google Gemini 1.5 Pro</div>
            </div>
          </div>
        </div>

        {/* Layer 3: Delivery */}
        <div className="flex flex-col gap-3">
          <div className="text-white/20 uppercase tracking-[0.3em] mb-4 text-[8px]">Layer_03 / Delivery</div>
          {[
            { icon: <MessageSquare className="w-3 h-3" />, label: "Slack / Discord" },
            { icon: <Database className="w-3 h-3" />, label: "PostgreSQL" },
            { icon: <Send className="w-3 h-3" />, label: "Web Dashboards" }
          ].map((item, i) => (
            <div 
              key={i}
              className="diagram-item flex items-center gap-3 bg-white/[0.03] border border-white/10 p-3 rounded-xl text-white/60"
            >
              <div className="text-accent">{item.icon}</div>
              <span className="tracking-wider">{item.label}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Partial NDA Label */}
      <div className="absolute bottom-6 right-8 flex items-center gap-2.5 text-[7px] text-white/20 uppercase tracking-[0.4em] font-bold">
        <div className="w-1.5 h-1.5 bg-red-500/40 rounded-full animate-pulse"></div>
        Partial NDA: Sensitive Architecture Obfuscated
      </div>
    </div>
  );
}
