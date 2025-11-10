"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useI18n } from "@/contexts/i18n-context";
import { ProfileType } from "@/contexts/profile-context";
import {
  ArrowRight,
  Code2,
  Database,
  Rocket,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { DATA } from "@/data/resume";

export default function LandingPage() {
  const router = useRouter();
  const { language } = useI18n();

  const handleProfileSelect = (profile: ProfileType) => {
    localStorage.setItem("profile", profile);
    router.push(`/${profile}`);
  };

  return (
    <div className="h-screen w-full px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 overflow-hidden flex items-center">
      <div className="max-w-6xl mx-auto w-full space-y-6 md:space-y-8">
        {/* Hero Section - Personal & Human */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-3 md:space-y-4"
        >
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute -inset-3 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-cyan-500/20 rounded-full blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden ring-2 ring-white/10 ring-offset-2 ring-offset-background">
              <Image
                src={DATA.avatarUrl}
                alt="Diego Villagran"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Greeting */}
          <div className="space-y-2 max-w-3xl">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight leading-tight">
              {language === "en" ? (
                <>
                  Hi, I&apos;m Diego —{" "}
                  <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    I build data systems that work in production
                  </span>
                </>
              ) : (
                <>
                  Hola, soy Diego —{" "}
                  <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    construyo sistemas de datos que funcionan en producción
                  </span>
                </>
              )}
            </h1>

            <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed max-w-2xl mx-auto">
              {language === "en"
                ? "I enjoy turning complex systems into clear, reproducible solutions that are peaceful to operate."
                : "Me gusta convertir sistemas complejos en soluciones claras, reproducibles y tranquilas de operar."}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/projects")}
              className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 hover:border-white/20 text-xs font-medium transition-all duration-300"
            >
              {language === "en" ? "View Projects" : "Ver Proyectos"}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                })
              }
              className="px-4 py-1.5 rounded-lg border border-white/10 hover:border-white/20 text-xs font-medium transition-all duration-300"
            >
              {language === "en" ? "View Experience" : "Ver Experiencia"}
            </motion.button>
          </div>
        </motion.div>

        {/* Philosophy / Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5 rounded-xl blur-2xl" />
          <div className="relative max-w-3xl mx-auto p-3 sm:p-4 md:p-5 rounded-xl border border-white/10 bg-black/20 backdrop-blur-sm">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground/90 leading-relaxed">
                  {language === "en"
                    ? "I believe engineering should be understandable. I value systems that age well: transparent, documented, and easy to maintain."
                    : "Creo que la ingeniería debe ser entendible. Valoro los sistemas que envejecen bien: transparentes, documentados y fáciles de mantener."}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Areas of Experience - Personal Narrative */}
        <div className="space-y-3 sm:space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl font-bold text-center"
          >
            {language === "en"
              ? "Areas where I have experience"
              : "Áreas donde tengo experiencia"}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-3">
            {/* Model Deployment & MLOps */}
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              onClick={() => handleProfileSelect("ml-engineer")}
              className="md:col-span-7 group relative overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-purple-500/5 via-black/40 to-background backdrop-blur-sm hover:border-white/20 hover:scale-[1.01] transition-all duration-500 text-left"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative p-2 sm:p-3 space-y-1.5 sm:space-y-2">
                <div className="flex items-start justify-between">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-purple-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-gradient-to-br from-purple-500/30 to-purple-600/30 border border-purple-500/20 flex items-center justify-center backdrop-blur-sm">
                      <Code2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-purple-400" />
                    </div>
                  </div>
                  <ArrowRight className="w-3 h-3 text-muted-foreground/50 group-hover:translate-x-1 group-hover:text-purple-400 transition-all duration-300" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-bold">
                    {language === "en"
                      ? "Model Deployment & MLOps"
                      : "Despliegue de Modelos & MLOps"}
                  </h3>
                  <p className="text-xs text-muted-foreground/80 leading-relaxed line-clamp-2">
                    {language === "en"
                      ? "I enjoy taking models to production and monitoring them so they work without surprises. I care about reproducibility and stability more than hype."
                      : "Me gusta llevar modelos a producción y monitorearlos para que funcionen sin sobresaltos. Me importa más la reproducibilidad y estabilidad que el hype."}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {["TensorFlow", "FastAPI", "Docker"].map((tech) => (
                    <span
                      key={tech}
                      className="px-1.5 py-0.5 text-xs rounded-md bg-purple-500/10 text-purple-400/80 border border-purple-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>

            {/* Data Pipelines & Modeling */}
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              onClick={() => handleProfileSelect("data-engineer")}
              className="md:col-span-5 group relative overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-purple-500/5 via-black/40 to-background backdrop-blur-sm hover:border-white/20 hover:scale-[1.01] transition-all duration-500 text-left"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative p-2 sm:p-3 space-y-1.5 sm:space-y-2 h-full flex flex-col">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-purple-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-gradient-to-br from-purple-500/30 to-purple-600/30 border border-purple-500/20 flex items-center justify-center backdrop-blur-sm transform group-hover:rotate-6 transition-transform duration-300">
                      <Database className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-purple-400" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1 flex-1 text-center">
                  <h3 className="text-sm sm:text-base font-bold">
                    {language === "en"
                      ? "Data Pipelines & Modeling"
                      : "Pipelines de Datos & Modelado"}
                  </h3>
                  <p className="text-xs text-muted-foreground/80 leading-relaxed line-clamp-2">
                    {language === "en"
                      ? "I enjoy designing clean, testable pipelines. Good data engineering is invisible—it just works."
                      : "Disfruto diseñar pipelines limpios y testeables. La buena ingeniería de datos es invisible—simplemente funciona."}
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-1">
                  {["PostgreSQL", "Python", "n8n"].map((tech) => (
                    <span
                      key={tech}
                      className="px-1.5 py-0.5 text-xs rounded-md bg-purple-500/10 text-purple-400/80 border border-purple-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="w-3 h-3 text-muted-foreground/50 group-hover:translate-y-1 group-hover:text-purple-400 transition-all duration-300" />
                </div>
              </div>
            </motion.button>

            {/* Infrastructure & Observability */}
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              onClick={() => handleProfileSelect("devops-engineer")}
              className="md:col-span-5 group relative overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-purple-500/5 via-black/40 to-background backdrop-blur-sm hover:border-white/20 hover:scale-[1.01] transition-all duration-500 text-left"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative p-2 sm:p-3 space-y-1.5 sm:space-y-2">
                <div className="flex items-center justify-between">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-purple-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-gradient-to-br from-purple-500/30 to-purple-600/30 border border-purple-500/20 flex items-center justify-center backdrop-blur-sm">
                      <Rocket className="w-4 h-4 text-purple-400" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-bold">
                    {language === "en"
                      ? "Infrastructure & Observability"
                      : "Infraestructura & Observabilidad"}
                  </h3>
                  <p className="text-xs text-muted-foreground/80 leading-relaxed line-clamp-2">
                    {language === "en"
                      ? "I&apos;m obsessed with observability because a good system should tell you how it feels. Deployments should be boring."
                      : "Me obsesiona la observabilidad porque un buen sistema debe decirte cómo se siente. Los despliegues deben ser aburridos."}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {["Docker", "Kubernetes", "Grafana"].map((tech) => (
                    <span
                      key={tech}
                      className="px-1.5 py-0.5 text-xs rounded-md bg-purple-500/10 text-purple-400/80 border border-purple-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex justify-end">
                  <ArrowRight className="w-3 h-3 text-muted-foreground/50 group-hover:translate-x-1 group-hover:text-purple-400 transition-all duration-300" />
                </div>
              </div>
            </motion.button>

            {/* Dashboards & Analytics */}
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              onClick={() => handleProfileSelect("data-analyst")}
              className="md:col-span-7 group relative overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-purple-500/5 via-black/40 to-background backdrop-blur-sm hover:border-white/20 hover:scale-[1.01] transition-all duration-500 text-left"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative p-2 sm:p-3 space-y-1.5 sm:space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <div className="absolute -inset-1 bg-purple-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-gradient-to-br from-purple-500/30 to-purple-600/30 border border-purple-500/20 flex items-center justify-center backdrop-blur-sm">
                          <TrendingUp className="w-4 h-4 text-purple-400" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-bold">
                          {language === "en"
                            ? "Dashboards & Analytics"
                            : "Dashboards & Analytics"}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground/80 leading-relaxed line-clamp-2">
                      {language === "en"
                        ? "I build dashboards that help make decisions, not to decorate reports. Clarity over complexity."
                        : "Hago dashboards que ayudan a tomar decisiones, no a decorar reportes. Claridad sobre complejidad."}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {["Power BI", "Tableau", "DAX"].map((tech) => (
                      <span
                        key={tech}
                        className="px-1.5 py-0.5 text-xs rounded-md bg-purple-500/10 text-purple-400/80 border border-purple-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <ArrowRight className="w-3 h-3 text-muted-foreground/50 group-hover:translate-x-1 group-hover:text-purple-400 transition-all duration-300" />
                </div>
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
