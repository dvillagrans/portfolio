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
      {/* Green gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b2415] via-[#123e25] to-[#07180e]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
        style={{
          backgroundImage:
            "linear-gradient(rgba(143,240,178,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(143,240,178,0.05) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Orbiting microservices */}
      <div className="relative flex h-full w-full items-center justify-center">
        {/* Center glow */}
        <div className="size-16 rounded-full border-2 border-emerald-500/30 bg-emerald-500/10 backdrop-blur-sm" />

        {/* Inner orbit */}
        <OrbitingCircles
          className="size-8 border-none bg-emerald-500/20 backdrop-blur-sm"
          duration={20}
          delay={0}
          radius={60}
        />
        <OrbitingCircles
          className="size-8 border-none bg-emerald-500/20 backdrop-blur-sm"
          duration={20}
          delay={10}
          radius={60}
        />

        {/* Outer orbit */}
        <OrbitingCircles
          className="size-10 border-none bg-emerald-400/15 backdrop-blur-sm"
          duration={30}
          delay={0}
          radius={100}
          reverse
        />
        <OrbitingCircles
          className="size-10 border-none bg-emerald-400/15 backdrop-blur-sm"
          duration={30}
          delay={15}
          radius={100}
          reverse
        />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#123e25]/30 to-[#07180e]/70" />
    </div>
  );
};

const DataAnalystDecoration = () => {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-8">
      {/* Orange gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2d1a10] via-[#3c200c] to-[#211209]" />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: "radial-gradient(rgba(244,184,96,0.4) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Dashboard visualization - sin íconos */}
      <div className="relative grid h-full w-full grid-cols-3 grid-rows-3 gap-2 p-6">
        {/* Main chart */}
        <div className="col-span-2 row-span-2 rounded-lg border border-amber-500/20 bg-amber-950/30 backdrop-blur-sm p-3">
          <div className="mb-2">
            <div className="h-1 w-16 bg-amber-500/30 rounded" />
          </div>
          <div className="space-y-1">
            {[60, 80, 45, 90].map((height, i) => (
              <div key={i} className="flex items-end gap-1 h-3">
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
        <div className="row-span-1 rounded-lg border border-amber-500/20 bg-amber-950/30 backdrop-blur-sm p-2">
          <div className="space-y-0.5">
            <div className="h-0.5 w-full bg-amber-500/30 rounded" />
            <div className="h-0.5 w-3/4 bg-amber-500/20 rounded" />
          </div>
        </div>

        <div className="row-span-1 rounded-lg border border-amber-500/20 bg-amber-950/30 backdrop-blur-sm p-2">
          <div className="space-y-0.5">
            <div className="h-0.5 w-full bg-amber-500/30 rounded" />
            <div className="h-0.5 w-2/3 bg-amber-500/20 rounded" />
          </div>
        </div>

        {/* Data table */}
        <div className="col-span-3 row-span-1 rounded-lg border border-amber-500/20 bg-amber-950/30 backdrop-blur-sm p-2">
          <div className="space-y-1">
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
    <div ref={containerRef} className="pointer-events-none absolute inset-0 flex items-center justify-center p-10">
      {/* Brand gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0e223a] via-[#08243d] to-[#031726]" />

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

      {/* Pipeline nodes - sin íconos */}
      <div className="relative flex w-full max-w-lg flex-row items-center justify-between gap-10">
        <div className="flex flex-col gap-4">
          <div ref={dbRef} className="size-12 rounded-full border-2 border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm" />
          <div ref={pythonRef} className="size-12 rounded-full border-2 border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm" />
        </div>
        
        <div ref={apiRef} className="size-16 rounded-full border-2 border-cyan-500/40 bg-cyan-500/20 backdrop-blur-sm" />

        <div ref={dashboardRef} className="size-12 rounded-full border-2 border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm" />
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
    <div ref={containerRef} className="pointer-events-none absolute inset-0 flex items-center justify-center p-10">
      {/* Deep purple gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2f1c5e] via-[#1a0f38] to-[#0c071a]" />

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

      {/* MLOps pipeline nodes - sin íconos */}
      <div className="relative flex w-full max-w-lg flex-row items-center justify-between gap-10">
        <div className="flex flex-col gap-4">
          <div ref={notebookRef} className="size-12 rounded-full border-2 border-purple-500/30 bg-purple-500/10 backdrop-blur-sm" />
          <div ref={gitRef} className="size-12 rounded-full border-2 border-purple-500/30 bg-purple-500/10 backdrop-blur-sm" />
        </div>
        
        <div ref={pipelineRef} className="size-16 rounded-full border-2 border-purple-500/40 bg-purple-500/20 backdrop-blur-sm" />

        <div ref={prodRef} className="size-12 rounded-full border-2 border-purple-500/30 bg-purple-500/10 backdrop-blur-sm" />
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
      colSpan: "lg:col-span-2",
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
      colSpan: "lg:col-span-1",
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
      colSpan: "lg:col-span-1",
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
      colSpan: "lg:col-span-2",
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
    <div className="h-dvh w-full overflow-hidden px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-5 lg:px-8">
      <div className="mx-auto flex h-full max-w-6xl flex-1 flex-col rounded-3xl border border-white/10 bg-black/25 p-4 sm:p-6 md:p-7 backdrop-blur-2xl">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex flex-col items-center gap-3 text-center sm:gap-3.5"
        >
          <div className="relative">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-purple-500/15 via-blue-500/12 to-cyan-500/12 blur-lg opacity-45" />
            <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-white/10 sm:h-14 sm:w-14 md:h-16 md:w-16" suppressHydrationWarning>
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
            <h1 className="text-xl font-extrabold leading-tight sm:text-2xl md:text-3xl lg:text-[34px]">
              {language === "en" ? "Hi, I'm Diego" : "Hola, soy Diego"}
            </h1>
            <p className="mx-auto max-w-xl px-2 text-xs text-muted-foreground/80 leading-relaxed sm:text-sm md:text-base">
              {language === "en"
                ? "I build data systems that feel calm in production."
                : "Construyo sistemas de datos que se sienten tranquilos en producción."}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5 text-[10px] text-muted-foreground/65 sm:gap-2 sm:text-xs">
            <span>{language === "en" ? "Transparency" : "Transparencia"}</span>
            <span className="text-muted-foreground/35">•</span>
            <span>{language === "en" ? "Documentation" : "Documentación"}</span>
            <span className="text-muted-foreground/35">•</span>
            <span>{language === "en" ? "Easy maintenance" : "Mantenimiento sencillo"}</span>
          </div>
        </motion.div>

        <div className="mt-4 flex flex-1 flex-col overflow-hidden sm:mt-5">
          <BentoGrid className="landing-bento grid w-full flex-1 grid-cols-1 auto-rows-[minmax(140px,1fr)] gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:auto-rows-[minmax(180px,0.5fr)]">
            {cards.map((card) => (
              <motion.button
                key={card.profile}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: card.delay }}
                onClick={() => handleProfileSelect(card.profile)}
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.035] p-4 text-left backdrop-blur-[26px] transition-all duration-500 sm:p-5",
                  "hover:-translate-y-1.5 hover:border-white/[0.18] hover:shadow-[0_24px_68px_-32px_rgba(4,9,26,0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
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

                <div className="relative flex h-full flex-col gap-3">
                  <div
                    className={cn(
                      "inline-flex h-11 w-11 items-center justify-center rounded-2xl border text-lg font-semibold shadow-lg transition-transform duration-300 group-hover:scale-95",
                      card.iconWrapper,
                    )}
                  >
                    <card.icon className="h-5 w-5" />
                  </div>

                  <div
                    className={cn(
                      "flex flex-1 flex-col gap-2",
                      card.align === "center" && "items-center text-center",
                    )}
                  >
                    <h3 className="text-base font-semibold text-white sm:text-lg lg:text-xl">
                      {card.title}
                    </h3>
                    <p className="max-w-xs text-xs leading-relaxed text-white/70 sm:text-sm">
                      {card.description}
                    </p>
                  </div>

                  <div
                    className={cn(
                      "flex flex-wrap gap-1.5",
                      card.align === "center" ? "justify-center" : "",
                    )}
                  >
                    {card.tags.map((tech) => (
                      <span key={tech} className={cn("rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide transition sm:text-xs", card.tagClass)}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <span
                  className={cn(
                    "pointer-events-none absolute bottom-4 right-5 text-[10px] uppercase tracking-[0.3em] transition-colors duration-500",
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
          className="mt-4 flex items-center justify-center gap-4 text-[10px] text-muted-foreground/60 sm:gap-5 sm:text-xs"
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
