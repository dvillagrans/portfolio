"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useMemo, type ElementType, type ReactNode } from "react";
import { useI18n } from "@/contexts/i18n-context";
import { ProfileType } from "@/contexts/profile-context";
import { Code2, Database, Rocket, TrendingUp } from "lucide-react";
import Image from "next/image";
import { BentoGrid } from "@/components/ui/bento-grid";
import { cn } from "@/lib/utils";
import { DATA } from "@/data/resume";

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

  const handleProfileSelect = (profile: ProfileType) => {
    localStorage.setItem("profile", profile);
    router.push(`/${profile}`);
  };

  const cards = useMemo<LandingCard[]>(() => [
    {
      profile: "ml-engineer",
      icon: Code2,
      colSpan: "",
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
      decoration: (
        <>
          <div className="pointer-events-none absolute inset-[1.25px] rounded-[1.95rem] border border-[#9A8EFF]/25 opacity-70 blur-[0.5px] transition transition-duration-[750ms] group-hover:border-[#CFC4FF]/45 group-hover:opacity-100" />
          <div className="pointer-events-none absolute -top-12 right-[-40px] h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(165,132,255,0.35),transparent_70%)] blur-3xl opacity-80 transition transition-duration-[1800ms] ease-out group-hover:opacity-100" />
          <div className="pointer-events-none absolute -left-20 bottom-[-32px] h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(92,61,166,0.22),transparent_70%)] blur-[72px] opacity-70 group-hover:opacity-90" />
        </>
      ),
    },
    {
      profile: "data-engineer",
      icon: Database,
      colSpan: "",
      background:
        "linear-gradient(145deg, rgba(7, 27, 54, 0.88) 0%, rgba(11, 48, 86, 0.82) 55%, rgba(5, 21, 42, 0.94) 100%)",
      texture: "/img/patterns/pipelines-flow.svg",
      textureBlend: "mix-blend-screen opacity-[0.6]",
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
      decoration: (
        <>
          <div className="pointer-events-none absolute inset-[1.25px] rounded-[1.95rem] border border-[#1FD9D3]/20 bg-gradient-to-br from-[#1FD9D3]/10 to-transparent opacity-70 transition transition-duration-[900ms] group-hover:border-[#72F5EF]/35 group-hover:opacity-100" />
          <div className="pointer-events-none absolute -right-28 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-[conic-gradient(from_90deg_at_50%_50%,rgba(31,217,211,0.24),rgba(9,17,40,0))] opacity-70 blur-[70px]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-[radial-gradient(circle_at_top,rgba(31,217,211,0.12),transparent_75%)] opacity-80" />
          <div className="pointer-events-none absolute -inset-16 rounded-full bg-[radial-gradient(circle_at_top,rgba(31,217,211,0.18),transparent_65%)] opacity-0 transition transition-duration-[1200ms] group-hover:opacity-45" />
        </>
      ),
    },
    {
      profile: "devops-engineer",
      icon: Rocket,
      colSpan: "",
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
      decoration: (
        <>
          <div className="pointer-events-none absolute inset-[1.25px] rounded-[1.95rem] border border-[#66E39F]/20 opacity-75 transition transition-duration-[800ms] group-hover:border-[#A8F7CD]/35 group-hover:opacity-100" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(circle_at_bottom,rgba(255,181,106,0.18),transparent_75%)] opacity-70" />
          <div className="pointer-events-none absolute -left-10 top-10 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(70,199,132,0.28),transparent_75%)] opacity-80 blur-[65px]" />
          <div className="pointer-events-none absolute -top-8 right-12 h-16 w-16 rounded-full bg-[radial-gradient(circle,rgba(255,181,106,0.65),transparent_70%)] opacity-0 transition transition-duration-[900ms] group-hover:opacity-85" />
        </>
      ),
    },
    {
      profile: "data-analyst",
      icon: TrendingUp,
      colSpan: "",
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
      decoration: (
        <>
          <div className="pointer-events-none absolute inset-[1.25px] rounded-[1.95rem] border border-[#F4B860]/20 bg-gradient-to-br from-[#F4B860]/12 to-transparent opacity-75 transition transition-duration-[850ms] group-hover:border-[#FFD9A1]/35 group-hover:opacity-100" />
          <div className="pointer-events-none absolute -right-16 bottom-0 h-44 w-44 rounded-[36%] bg-[radial-gradient(circle,rgba(244,184,96,0.22),transparent_70%)] blur-[72px] opacity-80" />
          <div className="pointer-events-none absolute left-10 -top-10 h-16 w-16 rounded-full bg-[radial-gradient(circle,rgba(198,113,55,0.45),transparent_70%)] opacity-75 animate-[slow-spin_42s_linear_infinite]" />
        </>
      ),
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
            <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-white/10 sm:h-14 sm:w-14 md:h-16 md:w-16">
              <Image
                src={DATA.avatarUrl}
                alt="Diego Villagran"
                fill
                className="object-cover"
                priority
              />
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
          <BentoGrid className="landing-bento grid w-full flex-1 grid-cols-1 auto-rows-[minmax(0,1fr)] gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:auto-rows-[minmax(0,1fr)]">
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
                  <div
                    className="absolute inset-0 transition transition-duration-[1200ms] ease-out"
                    style={{ background: card.background }}
                  />
                  {card.texture ? (
                    <div
                      className={cn(
                        "absolute inset-0 bg-cover bg-center animate-[texture-pan_36s_ease-in-out_infinite]",
                        card.textureBlend,
                      )}
                      style={{ backgroundImage: `url(${card.texture})` }}
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_68%)] opacity-70" />
                  {card.decoration}
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
