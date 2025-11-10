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
    <div className="min-h-screen w-full px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 overflow-x-hidden flex flex-col">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
        {/* Hero - Ultra Compact */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center space-y-3 sm:space-y-4 mb-5 sm:mb-6 md:mb-8"
        >
          {/* Photo - small */}
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full overflow-hidden ring-2 ring-white/10">
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
          <div className="space-y-1.5 sm:space-y-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[40px] font-extrabold leading-tight">
              {language === "en"
                ? "Hi, I'm Diego"
                : "Hola, soy Diego"}
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground/80 leading-relaxed max-w-xl mx-auto px-2">
              {language === "en"
                ? "I build data systems that feel calm in production."
                : "Construyo sistemas de datos que se sienten tranquilos en producción."}
            </p>
          </div>

          {/* Values Bar */}
          <div className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground/70">
            <span>
              {language === "en" ? "Transparency" : "Transparencia"}
            </span>
            <span className="text-muted-foreground/40">•</span>
            <span>
              {language === "en" ? "Documentation" : "Documentación"}
            </span>
            <span className="text-muted-foreground/40">•</span>
            <span>
              {language === "en"
                ? "Easy maintenance"
                : "Mantenimiento sencillo"}
            </span>
          </div>
        </motion.div>

        {/* Main Selection Grid - Irregular Layout */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-2.5 sm:gap-3 md:gap-4 max-w-6xl mx-auto w-full">
          {/* Model Deployment & MLOps - Purple→Pink */}
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            onClick={() => handleProfileSelect("ml-engineer")}
            className="md:col-span-7 group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/5 via-black/40 to-background backdrop-blur-sm hover:border-purple-400/30 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgb(124,58,237,0.12)] transition-all duration-200 text-left p-3 sm:p-4 md:p-6"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

            <div className="relative space-y-2 sm:space-y-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/20 flex items-center justify-center backdrop-blur-sm shadow-lg shadow-purple-500/20">
                <Code2 className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-purple-400" />
              </div>

              <div className="space-y-1 sm:space-y-1.5">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-[22px] font-bold">
                  {language === "en"
                    ? "Model Deployment & MLOps"
                    : "Despliegue de Modelos & MLOps"}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground/70 leading-relaxed">
                  {language === "en"
                    ? "From notebooks to production—reproducibly and without drama."
                    : "De notebooks a producción—reproducible y sin drama."}
                </p>
              </div>

              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                {["TensorFlow", "FastAPI", "Docker"].map((tech) => (
                  <span
                    key={tech}
                    className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-md bg-purple-500/10 text-purple-300/90 border border-purple-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.button>

          {/* Data Pipelines & Modeling - Cyan→Blue */}
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            onClick={() => handleProfileSelect("data-engineer")}
            className="md:col-span-5 group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/5 via-black/40 to-background backdrop-blur-sm hover:border-cyan-400/30 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgb(6,182,212,0.12)] transition-all duration-200 text-left p-3 sm:p-4 md:p-6"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

            <div className="relative space-y-2 sm:space-y-3 h-full flex flex-col">
              <div className="flex justify-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/20 flex items-center justify-center backdrop-blur-sm shadow-lg shadow-cyan-500/20">
                  <Database className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-cyan-400" />
                </div>
              </div>

              <div className="space-y-1 sm:space-y-1.5 flex-1 text-center">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-[22px] font-bold">
                  {language === "en"
                    ? "Data Pipelines & Modeling"
                    : "Pipelines de Datos & Modelado"}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground/70 leading-relaxed">
                  {language === "en"
                    ? "Clean, testable pipelines. Good data engineering is invisible."
                    : "Pipelines limpios y testeables. La buena ingeniería de datos es invisible."}
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-1 sm:gap-1.5">
                {["PostgreSQL", "Python", "n8n"].map((tech) => (
                  <span
                    key={tech}
                    className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-md bg-cyan-500/10 text-cyan-300/90 border border-cyan-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.button>

          {/* Infrastructure & Observability - Green→Lime */}
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            onClick={() => handleProfileSelect("devops-engineer")}
            className="md:col-span-5 group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/5 via-black/40 to-background backdrop-blur-sm hover:border-emerald-400/30 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgb(16,185,129,0.12)] transition-all duration-200 text-left p-3 sm:p-4 md:p-6"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-lime-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

            <div className="relative space-y-2 sm:space-y-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-emerald-500/20 to-lime-500/20 border border-emerald-500/20 flex items-center justify-center backdrop-blur-sm shadow-lg shadow-emerald-500/20">
                <Rocket className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-emerald-400" />
              </div>

              <div className="space-y-1 sm:space-y-1.5">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-[22px] font-bold">
                  {language === "en"
                    ? "Infrastructure & Observability"
                    : "Infraestructura & Observabilidad"}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground/70 leading-relaxed">
                  {language === "en"
                    ? "If it matters, we can see it. Boring, reliable deployments."
                    : "Si importa, podemos verlo. Despliegues aburridos y confiables."}
                </p>
              </div>

              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                {["Docker", "Kubernetes", "Grafana"].map((tech) => (
                  <span
                    key={tech}
                    className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-md bg-emerald-500/10 text-emerald-300/90 border border-emerald-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.button>

          {/* Dashboards & Analytics - Orange→Amber */}
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            onClick={() => handleProfileSelect("data-analyst")}
            className="md:col-span-7 group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-orange-500/5 via-black/40 to-background backdrop-blur-sm hover:border-orange-400/30 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgb(249,115,22,0.12)] transition-all duration-200 text-left p-3 sm:p-4 md:p-6"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

            <div className="relative space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/20 flex items-center justify-center backdrop-blur-sm shadow-lg shadow-orange-500/20">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-[22px] font-bold">
                    {language === "en"
                      ? "Dashboards & Analytics"
                      : "Dashboards & Analytics"}
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm md:text-base text-muted-foreground/70 leading-relaxed">
                {language === "en"
                  ? "Less dashboarding, more decisions."
                  : "Menos dashboards, más decisiones."}
              </p>

              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                {["Power BI", "Tableau", "DAX"].map((tech) => (
                  <span
                    key={tech}
                    className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-md bg-orange-500/10 text-orange-300/90 border border-orange-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.button>
        </div>

        {/* Footer - Discrete Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex items-center justify-center gap-4 sm:gap-6 mt-4 sm:mt-6 text-[10px] sm:text-xs text-muted-foreground/60"
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
