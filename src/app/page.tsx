"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useI18n } from "@/contexts/i18n-context";
import { ProfileType } from "@/contexts/profile-context";
import { Code2, Database, Rocket, TrendingUp } from "lucide-react";
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
    <div className="h-screen w-full px-4 sm:px-6 md:px-8 py-6 md:py-8 overflow-hidden flex flex-col">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
        {/* Hero - Ultra Compact */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center space-y-3 mb-8 md:mb-10"
        >
          {/* Photo - small */}
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden ring-2 ring-white/10">
              <Image
                src={DATA.avatarUrl}
                alt="Diego Villagran"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Name + One Line */}
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-1">
              Hi, I&apos;m Diego
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground/70">
              {language === "en"
                ? "I build calm, reliable data systems."
                : "Construyo sistemas de datos tranquilos y confiables."}
            </p>
          </div>
        </motion.div>

        {/* Main Selection Grid - 2x2 */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto w-full">
          {/* Model Deployment & MLOps */}
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            onClick={() => handleProfileSelect("ml-engineer")}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/5 via-black/40 to-background backdrop-blur-sm hover:border-white/20 hover:scale-[1.02] transition-all duration-200 text-left p-6 md:p-8"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

            <div className="relative space-y-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/20 flex items-center justify-center backdrop-blur-sm">
                <Code2 className="w-6 h-6 sm:w-7 sm:h-7 text-purple-400" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
                  {language === "en"
                    ? "Model Deployment & MLOps"
                    : "Despliegue de Modelos & MLOps"}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground/80">
                  {language === "en"
                    ? "From notebooks to production, reproducibly."
                    : "De notebooks a producción, reproducible."}
                </p>
              </div>
            </div>
          </motion.button>

          {/* Data Pipelines & Modeling */}
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            onClick={() => handleProfileSelect("data-engineer")}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/5 via-black/40 to-background backdrop-blur-sm hover:border-white/20 hover:scale-[1.02] transition-all duration-200 text-left p-6 md:p-8"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

            <div className="relative space-y-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/20 flex items-center justify-center backdrop-blur-sm">
                <Database className="w-6 h-6 sm:w-7 sm:h-7 text-purple-400" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
                  {language === "en"
                    ? "Data Pipelines & Modeling"
                    : "Pipelines de Datos & Modelado"}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground/80">
                  {language === "en"
                    ? "Clean, testable pipelines that don't break."
                    : "Pipelines limpios y testeables que no se rompen."}
                </p>
              </div>
            </div>
          </motion.button>

          {/* Infrastructure & Observability */}
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            onClick={() => handleProfileSelect("devops-engineer")}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/5 via-black/40 to-background backdrop-blur-sm hover:border-white/20 hover:scale-[1.02] transition-all duration-200 text-left p-6 md:p-8"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

            <div className="relative space-y-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/20 flex items-center justify-center backdrop-blur-sm">
                <Rocket className="w-6 h-6 sm:w-7 sm:h-7 text-purple-400" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
                  {language === "en"
                    ? "Infrastructure & Observability"
                    : "Infraestructura & Observabilidad"}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground/80">
                  {language === "en"
                    ? "Systems that tell you how they feel."
                    : "Sistemas que te dicen cómo se sienten."}
                </p>
              </div>
            </div>
          </motion.button>

          {/* Dashboards & Analytics */}
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            onClick={() => handleProfileSelect("data-analyst")}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/5 via-black/40 to-background backdrop-blur-sm hover:border-white/20 hover:scale-[1.02] transition-all duration-200 text-left p-6 md:p-8"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

            <div className="relative space-y-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/20 flex items-center justify-center backdrop-blur-sm">
                <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-purple-400" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
                  {language === "en"
                    ? "Dashboards & Analytics"
                    : "Dashboards & Analytics"}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground/80">
                  {language === "en"
                    ? "Dashboards that lead to decisions, not noise."
                    : "Dashboards que llevan a decisiones, no ruido."}
                </p>
              </div>
            </div>
          </motion.button>
        </div>

        {/* Footer - Discrete Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex items-center justify-center gap-6 mt-6 text-xs text-muted-foreground/60"
        >
          <button
            onClick={() => router.push("/projects")}
            className="hover:text-foreground transition-colors duration-200"
          >
            {language === "en" ? "Projects" : "Proyectos"}
          </button>
          <span className="text-muted-foreground/30">•</span>
          <button
            onClick={() => router.push("/ml-engineer")}
            className="hover:text-foreground transition-colors duration-200"
          >
            {language === "en" ? "Experience" : "Experiencia"}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
