"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useMemo, useRef, useState, useEffect, forwardRef, type ElementType, type ReactNode } from "react";
import { useI18n } from "@/contexts/i18n-context";
import { ProfileType } from "@/contexts/profile-context";
import { Code2, Database, Rocket, TrendingUp, Server, GitBranch, LineChart, Boxes, Container, Cloud, Activity, BarChart3, FileText, PieChart } from "lucide-react";
import Image from "next/image";
import { BentoGrid } from "@/components/ui/bento-grid";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { cn } from "@/lib/utils";
import { DATA } from "@/data/resume";

// Circle component for beam nodes (like Magic UI examples)
const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 border-border bg-background p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

const InfrastructureDecoration = () => {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {/* Deep green gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b2415] via-[#123e25] to-[#07180e]" />
      
      {/* Server/Cloud icons background */}
      <div className="absolute top-4 left-4 opacity-5">
        <Rocket className="w-24 h-24 text-emerald-300" />
      </div>
      
      <div className="absolute bottom-6 right-6 opacity-5">
        <Database className="w-26 h-26 text-emerald-400" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
        style={{
          backgroundImage:
            "linear-gradient(rgba(143,240,178,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(143,240,178,0.05) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Orbiting microservices con iconos */}
      <div className="relative flex h-full w-full items-center justify-center scale-75 sm:scale-90 lg:scale-100">
        {/* Center glow con icono */}
        <div className="size-12 rounded-full border-2 border-emerald-500/30 bg-emerald-500/10 backdrop-blur-sm flex items-center justify-center sm:size-14 lg:size-16">
          <Cloud className="w-5 h-5 text-emerald-400 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
        </div>

        {/* Inner orbit con iconos */}
        <OrbitingCircles
          className="size-6 border-none bg-emerald-500/20 backdrop-blur-sm flex items-center justify-center sm:size-7 lg:size-8"
          duration={20}
          delay={0}
          radius={50}
        >
          <Container className="w-2.5 h-2.5 text-emerald-300 sm:w-3 sm:h-3" />
        </OrbitingCircles>
        <OrbitingCircles
          className="size-6 border-none bg-emerald-500/20 backdrop-blur-sm flex items-center justify-center sm:size-7 lg:size-8"
          duration={20}
          delay={10}
          radius={50}
        >
          <Database className="w-2.5 h-2.5 text-emerald-300 sm:w-3 sm:h-3" />
        </OrbitingCircles>

        {/* Outer orbit con iconos */}
        <OrbitingCircles
          className="size-8 border-none bg-emerald-400/15 backdrop-blur-sm flex items-center justify-center sm:size-9 lg:size-10"
          duration={30}
          delay={0}
          radius={80}
          reverse
        >
          <Server className="w-3 h-3 text-emerald-300 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
        </OrbitingCircles>
        <OrbitingCircles
          className="size-8 border-none bg-emerald-400/15 backdrop-blur-sm flex items-center justify-center sm:size-9 lg:size-10"
          duration={30}
          delay={15}
          radius={80}
          reverse
        >
          <Boxes className="w-3 h-3 text-emerald-300 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
        </OrbitingCircles>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#123e25]/30 to-[#07180e]/70" />
    </div>
  );
};

const DataAnalystDecoration = () => {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-3 sm:p-5 md:p-6 lg:p-8">
      {/* Orange gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2d1a10] via-[#3c200c] to-[#211209]" />

      {/* Chart/Analytics icons background */}
      <div className="absolute top-2 right-2 opacity-5 sm:top-3 sm:right-3 md:top-4 md:right-4">
        <TrendingUp className="w-20 h-20 text-amber-300 sm:w-24 sm:h-24 md:w-32 md:h-32" />
      </div>
      
      <div className="absolute bottom-3 left-3 opacity-5 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6">
        <Database className="w-16 h-16 text-amber-400 sm:w-20 sm:h-20 md:w-24 md:h-24" />
      </div>

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: "radial-gradient(rgba(244,184,96,0.4) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Dashboard visualization - sin íconos */}
      <div className="relative grid h-full w-full grid-cols-3 grid-rows-3 gap-1 p-3 sm:gap-1.5 sm:p-4 md:gap-2 md:p-6">
        {/* Main chart */}
        <div className="col-span-2 row-span-2 rounded-md border border-amber-500/20 bg-amber-950/30 backdrop-blur-sm p-1.5 sm:p-2 md:p-3 md:rounded-lg">
          <div className="mb-1 sm:mb-1.5 md:mb-2">
            <div className="h-0.5 w-10 bg-amber-500/30 rounded sm:h-0.5 sm:w-12 md:h-1 md:w-16" />
          </div>
          <div className="space-y-0.5 sm:space-y-0.5 md:space-y-1">
            {[60, 80, 45, 90].map((height, i) => (
              <div key={i} className="flex items-end gap-0.5 h-2 sm:h-2.5 md:h-3">
                <div
                  className="bg-amber-500/40 rounded-sm transition-all"
                  style={{ width: '20%', height: `${height}%` }}
                />
                <div
                  className="bg-amber-500/30 rounded-sm transition-all"
                  style={{ width: '20%', height: `${height * 0.7}%` }}
                />
                <div
                  className="bg-amber-500/20 rounded-sm transition-all"
                  style={{ width: '20%', height: `${height * 0.5}%` }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Small metric cards */}
        <div className="row-span-1 rounded-md border border-amber-500/20 bg-amber-950/30 backdrop-blur-sm p-1 sm:p-1.5 md:p-2 md:rounded-lg">
          <div className="space-y-0.5">
            <div className="h-0.5 w-full bg-amber-500/30 rounded" />
            <div className="h-0.5 w-3/4 bg-amber-500/20 rounded" />
          </div>
        </div>

        <div className="row-span-1 rounded-md border border-amber-500/20 bg-amber-950/30 backdrop-blur-sm p-1 sm:p-1.5 md:p-2 md:rounded-lg">
          <div className="space-y-0.5">
            <div className="h-0.5 w-full bg-amber-500/30 rounded" />
            <div className="h-0.5 w-2/3 bg-amber-500/20 rounded" />
          </div>
        </div>

        {/* Data table */}
        <div className="col-span-3 row-span-1 rounded-md border border-amber-500/20 bg-amber-950/30 backdrop-blur-sm p-1 sm:p-1.5 md:p-2 md:rounded-lg">
          <div className="space-y-0.5 sm:space-y-0.5 md:space-y-1">
            {[100, 85, 70].map((width, i) => (
              <div key={i} className="h-0.5 rounded" style={{ width: `${width}%`, background: 'rgba(244,184,96,0.25)' }} />
            ))}
          </div>
        </div>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3c200c]/30 to-[#211209]/70" />
    </div>
  );
};

const DataPipelinesDecoration = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dbRef = useRef<HTMLDivElement | null>(null);
  const pythonRef = useRef<HTMLDivElement | null>(null);
  const apiRef = useRef<HTMLDivElement | null>(null);
  const dashboardRef = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10">
      {/* Deep cyan/blue gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0e223a] via-[#08243d] to-[#031726]" />
      
      {/* Database icon background */}
      <div className="absolute top-2 left-2 opacity-5 sm:top-3 sm:left-3 md:top-4 md:left-4">
        <Database className="w-16 h-16 text-cyan-400 sm:w-20 sm:h-20 md:w-24 md:h-24" />
      </div>
      
      {/* Code icon background */}
      <div className="absolute bottom-4 right-4 opacity-5 sm:bottom-5 sm:right-5 md:bottom-6 md:right-6">
        <Code2 className="w-20 h-20 text-cyan-300 sm:w-24 sm:h-24 md:w-28 md:h-28" />
      </div>

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "12px 12px, 16px 16px",
          backgroundPosition: "0 0, 6px 6px",
        }}
      />

      {/* Data pipeline nodes con iconos */}
      <div className="relative flex w-full max-w-xs sm:max-w-md md:max-w-lg flex-row items-center justify-between gap-4 sm:gap-6 md:gap-8 lg:gap-10 scale-90 sm:scale-95 md:scale-100">
        <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
          <div ref={dbRef} className="size-8 rounded-full border-2 border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm flex items-center justify-center sm:size-10 md:size-12">
            <Database className="w-3.5 h-3.5 text-cyan-400 sm:w-4 sm:h-4 md:w-5 md:h-5" />
          </div>
          <div ref={pythonRef} className="size-8 rounded-full border-2 border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm flex items-center justify-center sm:size-10 md:size-12">
            <Code2 className="w-3.5 h-3.5 text-cyan-400 sm:w-4 sm:h-4 md:w-5 md:h-5" />
          </div>
        </div>
        
        <div ref={apiRef} className="size-12 rounded-full border-2 border-cyan-500/40 bg-cyan-500/20 backdrop-blur-sm flex items-center justify-center sm:size-14 md:size-16">
          <Server className="w-5 h-5 text-cyan-300 sm:w-6 sm:h-6 md:w-7 md:h-7" />
        </div>

        <div ref={dashboardRef} className="size-8 rounded-full border-2 border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm flex items-center justify-center sm:size-10 md:size-12">
          <BarChart3 className="w-3.5 h-3.5 text-cyan-400 sm:w-4 sm:h-4 md:w-5 md:h-5" />
        </div>
      </div>

      {/* Animated Beams */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={dbRef}
        toRef={apiRef}
        curvature={-40}
        endYOffset={-10}
      />
      
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={pythonRef}
        toRef={apiRef}
        curvature={40}
        endYOffset={10}
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={apiRef}
        toRef={dashboardRef}
        reverse
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#031726]/35 to-[#010c14]/70" />
    </div>
  );
};

const MLOpsDecoration = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const notebookRef = useRef<HTMLDivElement | null>(null);
  const gitRef = useRef<HTMLDivElement | null>(null);
  const pipelineRef = useRef<HTMLDivElement | null>(null);
  const prodRef = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10">
      {/* Deep purple gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2f1c5e] via-[#1a0f38] to-[#0c071a]" />
      
      {/* Rocket icon background */}
      <div className="absolute top-3 right-3 opacity-5 sm:top-4 sm:right-4 md:top-6 md:right-6">
        <Rocket className="w-20 h-20 text-purple-300 sm:w-24 sm:h-24 md:w-32 md:h-32" />
      </div>
      
      {/* Code icon background */}
      <div className="absolute bottom-2 left-2 opacity-5 sm:bottom-3 sm:left-3 md:bottom-4 md:left-4">
        <Code2 className="w-20 h-20 text-purple-400 sm:w-24 sm:h-24 md:w-28 md:h-28" />
      </div>

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.1] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(rgba(165,132,255,0.06) 1px, transparent 1px), radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "14px 14px, 18px 18px",
          backgroundPosition: "0 0, 7px 7px",
        }}
      />

      {/* MLOps pipeline nodes con iconos */}
      <div className="relative flex w-full max-w-xs sm:max-w-md md:max-w-lg flex-row items-center justify-between gap-4 sm:gap-6 md:gap-8 lg:gap-10 scale-90 sm:scale-95 md:scale-100">
        <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
          <div ref={notebookRef} className="size-8 rounded-full border-2 border-purple-500/30 bg-purple-500/10 backdrop-blur-sm flex items-center justify-center sm:size-10 md:size-12">
            <FileText className="w-3.5 h-3.5 text-purple-400 sm:w-4 sm:h-4 md:w-5 md:h-5" />
          </div>
          <div ref={gitRef} className="size-8 rounded-full border-2 border-purple-500/30 bg-purple-500/10 backdrop-blur-sm flex items-center justify-center sm:size-10 md:size-12">
            <GitBranch className="w-3.5 h-3.5 text-purple-400 sm:w-4 sm:h-4 md:w-5 md:h-5" />
          </div>
        </div>
        
        <div ref={pipelineRef} className="size-12 rounded-full border-2 border-purple-500/40 bg-purple-500/20 backdrop-blur-sm flex items-center justify-center sm:size-14 md:size-16">
          <Activity className="w-5 h-5 text-purple-300 sm:w-6 sm:h-6 md:w-7 md:h-7" />
        </div>

        <div ref={prodRef} className="size-8 rounded-full border-2 border-purple-500/30 bg-purple-500/10 backdrop-blur-sm flex items-center justify-center sm:size-10 md:size-12">
          <Rocket className="w-3.5 h-3.5 text-purple-400 sm:w-4 sm:h-4 md:w-5 md:h-5" />
        </div>
      </div>

      {/* Animated Beams */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={notebookRef}
        toRef={pipelineRef}
        curvature={-40}
        endYOffset={-10}
      />
      
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={gitRef}
        toRef={pipelineRef}
        curvature={40}
        endYOffset={10}
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={pipelineRef}
        toRef={prodRef}
        reverse
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a0f38]/30 to-[#0c071a]/65" />
    </div>
  );
};

interface LandingCard {
  profile: ProfileType;
  icon: ElementType;
  colSpan: string;
  background: string;
  texture?: string;
  textureBlend?: string;
  iconWrapper: string;
  title: string;
  description: string;
  tags: string[];
  delay: number;
  align?: "left" | "center";
  tagClass: string;
  labelClass: string;
  decoration?: ReactNode;
}

export default function LandingPage() {
  const router = useRouter();
  const { language } = useI18n();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleProfileSelect = (profile: ProfileType) => {
    localStorage.setItem("profile", profile);
    router.push(`/${profile}`);
  };

  const cards = useMemo<LandingCard[]>(() => [
    {
      profile: "ml-engineer",
      icon: Code2,
      colSpan: "sm:col-span-1 sm:row-span-2",
      background:
        "radial-gradient(circle at 22% 18%, rgba(145, 112, 255, 0.42) 0%, rgba(47, 28, 94, 0.88) 48%, rgba(12, 7, 24, 0.96) 100%)",
      texture: "/img/patterns/mlops-particles.svg",
      textureBlend: "mix-blend-screen opacity-[0.65]",
      iconWrapper:
        "border border-[#8F7BFF]/35 bg-[#2D1F53]/65 text-[#E0DAFF] shadow-[0_0_26px_rgba(141,119,255,0.25)]",
      title: language === "en" ? "Model Deployment & MLOps" : "Despliegue de Modelos & MLOps",
      description:
        language === "en"
          ? "From notebooks to production—reproducibly and without drama."
          : "De notebooks a producción—reproducible y sin drama.",
      tags: ["TensorFlow", "FastAPI", "Docker"],
      delay: 0.1,
      align: "left",
      tagClass: "border-[#7C6BFA]/35 bg-[#2E2051]/60 text-[#DED8FF]",
      labelClass: "text-[#BDAEFF]/80 group-hover:text-[#E8E2FF]",
      decoration: <MLOpsDecoration />,
    },
    {
      profile: "data-engineer",
      icon: Database,
      colSpan: "sm:col-span-1",
      background:
        "linear-gradient(160deg, rgba(14, 34, 58, 0.94) 0%, rgba(6, 29, 48, 0.88) 52%, rgba(3, 23, 38, 0.96) 100%)",
      texture: "/img/patterns/pipelines-flow.svg",
      textureBlend: "mix-blend-screen opacity-[0.45]",
      iconWrapper:
        "border border-[#1FD9D3]/35 bg-[#08365D]/65 text-[#A5FFF9] shadow-[0_0_28px_rgba(31,217,211,0.28)]",
      title: language === "en" ? "Data Pipelines & Modeling" : "Pipelines de Datos & Modelado",
      description:
        language === "en"
          ? "Clean, testable pipelines. Good data engineering is invisible."
          : "Pipelines limpios y testeables. La buena ingeniería de datos es invisible.",
      tags: ["PostgreSQL", "Python", "n8n"],
      delay: 0.18,
      align: "center",
      tagClass: "border-[#1FD9D3]/25 bg-[#082C4B]/60 text-[#9BF7F0]",
      labelClass: "text-[#7BE3E0]/75 group-hover:text-[#C6FFFC]",
      decoration: <DataPipelinesDecoration />,
    },
    {
      profile: "devops-engineer",
      icon: Rocket,
      colSpan: "sm:col-span-1",
      background:
        "linear-gradient(155deg, rgba(11, 36, 21, 0.9) 0%, rgba(18, 62, 37, 0.85) 55%, rgba(7, 24, 14, 0.95) 100%)",
      texture: "/img/patterns/infra-grid.svg",
      textureBlend: "mix-blend-soft-light opacity-[0.7]",
      iconWrapper:
        "border border-[#8FF0B2]/30 bg-[#133824]/65 text-[#C9FFDC] shadow-[0_0_26px_rgba(71,207,132,0.25)]",
      title: language === "en" ? "Infrastructure & Observability" : "Infraestructura & Observabilidad",
      description:
        language === "en"
          ? "If it matters, we can see it. Boring, reliable deployments."
          : "Si importa, podemos verlo. Despliegues aburridos y confiables.",
      tags: ["Docker", "Kubernetes", "Grafana"],
      delay: 0.26,
      align: "left",
      tagClass: "border-[#6DE7A1]/25 bg-[#112E1D]/65 text-[#C6FFD9]",
      labelClass: "text-[#9CEABF]/75 group-hover:text-[#D4FFE8]",
      decoration: <InfrastructureDecoration />,
    },
    {
      profile: "data-analyst",
      icon: TrendingUp,
      colSpan: "sm:col-span-2",
      background:
        "linear-gradient(150deg, rgba(45, 26, 16, 0.9) 0%, rgba(60, 32, 12, 0.86) 55%, rgba(33, 18, 9, 0.94) 100%)",
      texture: "/img/patterns/analytics-tiles.svg",
      textureBlend: "mix-blend-soft-light opacity-[0.65]",
      iconWrapper:
        "border border-[#F4B860]/30 bg-[#3D2111]/65 text-[#FFECD1] shadow-[0_0_24px_rgba(244,184,96,0.25)]",
      title: language === "en" ? "Dashboards & Analytics" : "Dashboards & Analytics",
      description:
        language === "en"
          ? "Less dashboarding, more decisions."
          : "Menos dashboards, más decisiones.",
      tags: ["Power BI", "Tableau", "DAX"],
      delay: 0.34,
      align: "left",
      tagClass: "border-[#F4B860]/22 bg-[#3A2114]/60 text-[#FFE3C2]",
      labelClass: "text-[#FAD8A4]/80 group-hover:text-[#FFEBD2]",
      decoration: <DataAnalystDecoration />,
    },
  ], [language]);

  return (
    <div className="h-dvh w-full overflow-hidden px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 lg:px-8 lg:py-5">
      <div className="mx-auto flex h-full max-w-7xl flex-1 flex-col rounded-2xl sm:rounded-3xl border border-white/10 bg-black/25 p-3 sm:p-5 md:p-6 lg:p-7 backdrop-blur-2xl">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex flex-col items-center gap-2 text-center sm:gap-3 md:gap-3.5"
        >
          <div className="relative">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-purple-500/15 via-blue-500/12 to-cyan-500/12 blur-lg opacity-45" />
            <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-white/10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16" suppressHydrationWarning>
              {isMounted ? (
                <Image
                  src={DATA.avatarUrl}
                  alt="Diego Villagran"
                  fill
                  sizes="(max-width: 640px) 48px, (max-width: 768px) 56px, 64px"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/15 to-cyan-500/15 animate-pulse" />
              )}
            </div>
          </div>

          <div className="space-y-1 sm:space-y-1.5">
            <h1 className="text-lg font-extrabold leading-tight sm:text-xl md:text-2xl lg:text-3xl xl:text-[34px]">
              {language === "en" ? "Hi, I'm Diego" : "Hola, soy Diego"}
            </h1>
            <p className="mx-auto max-w-xl px-2 text-[11px] text-muted-foreground/80 leading-relaxed sm:text-xs md:text-sm lg:text-base">
              {language === "en"
                ? "I build data systems that feel calm in production."
                : "Construyo sistemas de datos que se sienten tranquilos en producción."}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1 text-[9px] text-muted-foreground/65 sm:gap-1.5 sm:text-[10px] md:gap-2 md:text-xs">
            <span>{language === "en" ? "Transparency" : "Transparencia"}</span>
            <span className="text-muted-foreground/35">•</span>
            <span>{language === "en" ? "Documentation" : "Documentación"}</span>
            <span className="text-muted-foreground/35">•</span>
            <span>{language === "en" ? "Easy maintenance" : "Mantenimiento sencillo"}</span>
          </div>
        </motion.div>

        <div className="mt-3 flex flex-1 flex-col overflow-hidden sm:mt-4 md:mt-5">
          <BentoGrid className="landing-bento grid w-full flex-1 grid-cols-1 auto-rows-[minmax(130px,1fr)] gap-2.5 sm:grid-cols-2 sm:auto-rows-[minmax(150px,1fr)] sm:gap-3 md:gap-3.5 lg:auto-rows-[minmax(170px,1fr)] xl:auto-rows-[minmax(190px,1fr)]">
            {cards.map((card) => (
              <motion.button
                key={card.profile}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: card.delay }}
                onClick={() => handleProfileSelect(card.profile)}
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-[2rem] border border-white/[0.08] bg-white/[0.035] p-3 text-left backdrop-blur-[26px] transition-all duration-500 sm:p-4 md:p-5",
                  "hover:-translate-y-1 sm:hover:-translate-y-1.5 hover:border-white/[0.18] hover:shadow-[0_24px_68px_-32px_rgba(4,9,26,0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  card.colSpan,
                )}
              >
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem] opacity-95 transition-opacity transition-duration-[900ms] group-hover:opacity-100">
                  {/* Custom decoration (includes its own background) OR default background */}
                  {card.decoration || (
                    <>
                      <div
                        className="absolute inset-0 transition transition-duration-[1200ms] ease-out"
                        style={isMounted ? { background: card.background } : undefined}
                        suppressHydrationWarning
                      />
                      {card.texture ? (
                        <div
                          suppressHydrationWarning
                          className={cn(
                            "absolute inset-0 bg-cover bg-center animate-[texture-pan_36s_ease-in-out_infinite]",
                            card.textureBlend,
                          )}
                          style={{ backgroundImage: `url(${card.texture})` }}
                        />
                      ) : null}
                    </>
                  )}
                  
                  {/* Radial gradient overlay (always on top for all cards) */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_68%)] opacity-70" />
                </div>

                <div className="relative flex h-full flex-col gap-2 sm:gap-2.5 md:gap-3">
                  <div
                    className={cn(
                      "inline-flex h-9 w-9 items-center justify-center rounded-xl border text-base font-semibold shadow-lg transition-transform duration-300 group-hover:scale-95 sm:h-10 sm:w-10 sm:rounded-2xl md:h-11 md:w-11 md:text-lg",
                      card.iconWrapper,
                    )}
                  >
                    <card.icon className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5" />
                  </div>

                  <div
                    className={cn(
                      "flex flex-1 flex-col gap-1.5 sm:gap-2",
                      card.align === "center" && "items-center text-center",
                    )}
                  >
                    <h3 className="text-sm font-semibold text-white sm:text-base md:text-lg lg:text-xl leading-tight">
                      {card.title}
                    </h3>
                    <p className="max-w-xs text-[11px] leading-relaxed text-white/70 sm:text-xs md:text-sm">
                      {card.description}
                    </p>
                  </div>

                  <div
                    className={cn(
                      "flex flex-wrap gap-1 sm:gap-1.5",
                      card.align === "center" ? "justify-center" : "",
                    )}
                  >
                    {card.tags.map((tech) => (
                      <span key={tech} className={cn("rounded-full px-2 py-0.5 text-[9px] font-medium uppercase tracking-wide transition sm:px-2.5 sm:py-1 sm:text-[10px] md:text-xs", card.tagClass)}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <span
                  className={cn(
                    "pointer-events-none absolute bottom-3 right-4 text-[9px] uppercase tracking-[0.3em] transition-colors duration-500 sm:bottom-4 sm:right-5 sm:text-[10px]",
                    card.labelClass,
                  )}
                >
                  {language === "en" ? "Discover" : "Entrar"}
                </span>
              </motion.button>
            ))}
          </BentoGrid>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.3 }}
          className="mt-2.5 flex items-center justify-center gap-3 text-[9px] text-muted-foreground/60 sm:mt-3 sm:gap-4 sm:text-[10px] md:mt-4 md:gap-5 md:text-xs"
        >
          <button
            onClick={() => router.push("/projects")}
            className="transition-colors duration-200 hover:text-foreground"
          >
            {language === "en" ? "Projects" : "Proyectos"}
          </button>
          <span className="text-muted-foreground/30">•</span>
          <button
            onClick={() => router.push("/ml-engineer")}
            className="transition-colors duration-200 hover:text-foreground"
          >
            {language === "en" ? "Experience" : "Experiencia"}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
