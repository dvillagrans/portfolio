"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useI18n } from "@/contexts/i18n-context";
import { PROFILE_METADATA, ProfileType } from "@/contexts/profile-context";
import { ArrowRight, Code2, Database, Rocket, TrendingUp } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const { language } = useI18n();

  const handleProfileSelect = (profile: ProfileType) => {
    localStorage.setItem('profile', profile);
    router.push(`/${profile}`);
  };

  const profiles = PROFILE_METADATA;

  return (
    <div className="min-h-screen md:h-screen w-full flex items-center justify-center px-3 sm:px-4 md:px-6 py-4 sm:py-6 overflow-y-auto md:overflow-hidden">
      <div className="max-w-7xl w-full space-y-6 md:space-y-8 my-auto">

        {/* Hero Section - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-2 sm:space-y-3 max-w-3xl mx-auto px-2"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Diego Villagran
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground/90 leading-relaxed max-w-2xl mx-auto px-2">
            {language === 'en'
              ? 'I build data systems end-to-end: ingestion, transformation, automation, deployment, and monitoring.'
              : 'Diseño y opero soluciones de datos de punta a punta: ingestión, transformación, automatización, despliegue y monitoreo.'}
          </p>
        </motion.div>

        {/* Bento Grid - Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">

          {/* ML Engineer */}
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onClick={() => handleProfileSelect('ml-engineer')}
            className="md:col-span-7 group relative overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-purple-500/5 via-background to-pink-500/5 hover:border-white/10 hover:scale-[1.01] transition-all duration-500 text-left"
          >
            <div className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
              <div className="flex items-start justify-between">
                <div className="relative">
                  <div className="absolute -inset-2 sm:-inset-3 bg-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-500/80 to-pink-500/80 flex items-center justify-center">
                    <Code2 className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:translate-x-1 group-hover:text-purple-400 transition-all duration-300" />
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1">
                    {language === 'en' ? 'Machine Learning Engineer' : 'Ingeniero de Machine Learning'}
                  </h3>
                  <p className="text-xs text-muted-foreground/80 font-mono">
                    MLOps • Applied AI • Model Serving
                  </p>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground/70 leading-relaxed">
                  {language === 'en'
                    ? 'Design and deploy production models focused on stability, reproducibility, and continuous monitoring for near-real-time systems.'
                    : 'Diseño y despliego modelos en producción con enfoque en reproducibilidad, estabilidad y monitoreo continuo.'}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1 sm:pt-2">
                {['TensorFlow', 'FastAPI', 'Docker', 'PostgreSQL'].map((tech) => (
                  <span key={tech} className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-xs rounded-md bg-purple-500/10 text-purple-400/90 border border-purple-500/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.button>

          {/* Data Engineer */}
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={() => handleProfileSelect('data-engineer')}
            className="md:col-span-5 group relative overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-blue-500/5 via-background to-cyan-500/5 hover:border-white/10 hover:scale-[1.01] transition-all duration-500 text-left"
          >
            <div className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4 h-full flex flex-col">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-2 sm:-inset-3 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500/80 to-cyan-500/80 flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300">
                    <Database className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 sm:space-y-2 flex-1 text-center">
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1">
                    {language === 'en' ? 'Data Engineer' : 'Ingeniero de Datos'}
                  </h3>
                  <p className="text-xs text-muted-foreground/80 font-mono">
                    ETL • Pipelines • Data Modeling
                  </p>
                </div>
                <p className="text-xs text-muted-foreground/70 leading-relaxed">
                  {language === 'en'
                    ? 'Build resilient data pipelines that integrate, transform, and validate information from multiple sources ensuring consistency.'
                    : 'Construyo pipelines de datos que integran, transforman y validan información asegurando consistencia y trazabilidad.'}
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-1.5">
                {['PostgreSQL', 'Python', 'n8n'].map((tech) => (
                  <span key={tech} className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-xs rounded-md bg-blue-500/10 text-blue-400/90 border border-blue-500/20">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex justify-center pt-1 sm:pt-2">
                <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:translate-y-1 group-hover:text-blue-400 transition-all duration-300" />
              </div>
            </div>
          </motion.button>

          {/* DevOps Engineer */}
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={() => handleProfileSelect('devops-engineer')}
            className="md:col-span-5 group relative overflow-hidden rounded-xl border border-white/5 hover:border-white/10 hover:scale-[1.01] transition-all duration-500 text-left"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500/80 to-teal-500/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <div className="relative">
                  <div className="absolute -inset-2 bg-green-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-br from-green-500/80 to-teal-500/80 flex items-center justify-center">
                    <Rocket className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1">
                    {language === 'en' ? 'DevOps Engineer' : 'Ingeniero DevOps'}
                  </h3>
                  <p className="text-xs text-muted-foreground/80 font-mono">
                    CI/CD • Containers • Observability
                  </p>
                </div>
                <p className="text-xs text-muted-foreground/70 leading-relaxed">
                  {language === 'en'
                    ? 'Standardize environments and automate deployments to enable reliable deliveries and observability in production.'
                    : 'Estandarizo entornos y automatizo despliegues para habilitar entregas confiables y observabilidad en producción.'}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1 sm:pt-2">
                {['Docker', 'Kubernetes', 'Grafana', 'Prometheus'].map((tech) => (
                  <span key={tech} className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-xs rounded-md bg-green-500/10 text-green-400/90 border border-green-500/20">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex justify-end pt-1 sm:pt-2">
                <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:translate-x-1 group-hover:text-green-400 transition-all duration-300" />
              </div>
            </div>
          </motion.button>

          {/* Data Analyst */}
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onClick={() => handleProfileSelect('data-analyst')}
            className="md:col-span-7 group relative overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-orange-500/5 via-background to-red-500/5 hover:border-white/10 hover:scale-[1.01] transition-all duration-500 text-left"
          >
            <div className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
              <div className="flex items-start justify-between gap-3 sm:gap-4">
                <div className="space-y-2 sm:space-y-3 flex-1">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-orange-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-br from-orange-500/80 to-red-500/80 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold">
                        {language === 'en' ? 'Data Analyst' : 'Analista de Datos'}
                      </h3>
                      <p className="text-xs text-muted-foreground/80 font-mono">
                        SQL • BI Dashboards • Insight Ops
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground/70 leading-relaxed">
                    {language === 'en'
                      ? 'Develop dashboards and reporting systems that convert operational data into measurable decisions for teams.'
                      : 'Desarrollo dashboards y sistemas de reporting que convierten datos operativos en decisiones medibles.'}
                  </p>
                </div>

                <div className="hidden sm:flex flex-col gap-2 text-right">
                  <div>
                    <div className="text-lg md:text-xl font-bold text-orange-400">92%</div>
                    <div className="text-xs text-muted-foreground/60">{language === 'en' ? 'Accuracy' : 'Precisión'}</div>
                  </div>
                  <div>
                    <div className="text-lg md:text-xl font-bold text-orange-400">25+</div>
                    <div className="text-xs text-muted-foreground/60">{language === 'en' ? 'Metrics' : 'Métricas'}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 sm:pt-2">
                <div className="flex flex-wrap gap-1.5">
                  {['Power BI', 'Tableau', 'DAX'].map((tech) => (
                    <span key={tech} className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-xs rounded-md bg-orange-500/10 text-orange-400/90 border border-orange-500/20">
                      {tech}
                    </span>
                  ))}
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:translate-x-1 group-hover:text-orange-400 transition-all duration-300" />
              </div>
            </div>
          </motion.button>

        </div>

      </div>
    </div>
  );
}
