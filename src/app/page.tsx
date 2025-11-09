"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useI18n } from "@/contexts/i18n-context";
import { PROFILE_METADATA, ProfileType } from "@/contexts/profile-context";
import { ArrowRight, Code2, Database, Rocket, TrendingUp, Sparkles, Cpu, GitBranch } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const { language } = useI18n();

  const handleProfileSelect = (profile: ProfileType) => {
    localStorage.setItem('profile', profile);
    router.push(`/${profile}`);
  };

  const profiles = PROFILE_METADATA;

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 md:px-6 py-16 md:py-20">
      <div className="max-w-7xl w-full space-y-12 md:space-y-16">

        {/* Hero Section - Ultra Clean */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Diego Villagran
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground/80">
            {language === 'en'
              ? 'Data Science Student & Multi-Disciplinary Engineer'
              : 'Estudiante de Ciencia de Datos e Ingeniero Multidisciplinario'}
          </p>
        </motion.div>

        {/* Bento Grid - Unique Layouts for Each Profile */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">

          {/* ML Engineer - Hero Card (spans full width on mobile, 7 cols on desktop) */}
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onClick={() => handleProfileSelect('ml-engineer')}
            className="md:col-span-7 group relative overflow-hidden rounded-2xl border-2 border-border bg-gradient-to-br from-purple-500/5 via-background to-pink-500/5 hover:border-purple-500/30 transition-all duration-500 text-left"
          >
            <div className="p-8 md:p-10 space-y-6">
              {/* Top section with icon */}
              <div className="flex items-start justify-between">
                <div className="relative">
                  <div className="absolute -inset-4 bg-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Code2 className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 group-hover:text-purple-500 transition-all duration-300" />
              </div>

              {/* Content */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    {language === 'en' ? profiles['ml-engineer'].title : profiles['ml-engineer'].titleEs}
                  </h3>
                  <p className="text-sm text-muted-foreground font-mono">
                    MLOps • Applied AI • Model Serving
                  </p>
                </div>
                <p className="text-sm md:text-base text-muted-foreground/80 leading-relaxed">
                  {language === 'en'
                    ? 'Building production ML pipelines with 85%+ accuracy, real-time inference <100ms, and 10K+ daily requests'
                    : 'Construyendo pipelines ML en producción con 85%+ precisión, inferencia en tiempo real <100ms, y 10K+ solicitudes diarias'}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {['TensorFlow', 'FastAPI', 'Docker', 'PostgreSQL'].map((tech) => (
                  <span key={tech} className="px-3 py-1 text-xs rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.button>

          {/* Data Engineer - Tall Card (spans 5 cols) */}
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={() => handleProfileSelect('data-engineer')}
            className="md:col-span-5 group relative overflow-hidden rounded-2xl border-2 border-border bg-gradient-to-br from-blue-500/5 via-background to-cyan-500/5 hover:border-blue-500/30 transition-all duration-500 text-left"
          >
            <div className="p-8 md:p-10 space-y-6 h-full flex flex-col">
              {/* Icon centered */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300">
                    <Database className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3 flex-1 text-center">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">
                    {language === 'en' ? profiles['data-engineer'].title : profiles['data-engineer'].titleEs}
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono">
                    ETL • Pipelines • Data Warehousing
                  </p>
                </div>
                <p className="text-sm text-muted-foreground/80 leading-relaxed">
                  {language === 'en'
                    ? 'Processing 300+ daily inputs with 92% accuracy through automated ETL workflows'
                    : 'Procesando 300+ entradas diarias con 92% de precisión mediante flujos ETL automatizados'}
                </p>
              </div>

              {/* Bottom arrow */}
              <div className="flex justify-center">
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-y-1 group-hover:text-blue-500 transition-all duration-300" />
              </div>
            </div>
          </motion.button>

          {/* DevOps Engineer - Wide Card with Split Design (spans 5 cols) */}
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={() => handleProfileSelect('devops-engineer')}
            className="md:col-span-5 group relative overflow-hidden rounded-2xl border-2 border-border hover:border-green-500/30 transition-all duration-500 text-left"
          >
            {/* Vertical accent line */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="p-8 space-y-6">
              {/* Icon and arrow in row */}
              <div className="flex items-center justify-between">
                <div className="relative">
                  <div className="absolute -inset-2 bg-green-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
                    <Rocket className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="flex gap-1">
                  <GitBranch className="w-4 h-4 text-green-500/40" />
                  <Cpu className="w-4 h-4 text-green-500/40" />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-bold">
                  {language === 'en' ? profiles['devops-engineer'].title : profiles['devops-engineer'].titleEs}
                </h3>
                <p className="text-xs text-muted-foreground font-mono">
                  CI/CD • Containers • Observability
                </p>
                <p className="text-sm text-muted-foreground/80 leading-relaxed pt-2">
                  {language === 'en'
                    ? '99.5% uptime, 50% faster deployments, 15min recovery time'
                    : '99.5% disponibilidad, 50% despliegues más rápidos, 15min tiempo de recuperación'}
                </p>
              </div>

              {/* Bottom section */}
              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <span className="text-xs text-muted-foreground">Docker • K8s • Grafana</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 group-hover:text-green-500 transition-all duration-300" />
              </div>
            </div>
          </motion.button>

          {/* Data Analyst - Compact Stats Card (spans 7 cols) */}
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onClick={() => handleProfileSelect('data-analyst')}
            className="md:col-span-7 group relative overflow-hidden rounded-2xl border-2 border-border bg-gradient-to-br from-orange-500/5 via-background to-red-500/5 hover:border-orange-500/30 transition-all duration-500 text-left"
          >
            <div className="p-8 space-y-6">
              <div className="flex items-start justify-between">
                {/* Left side */}
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-orange-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                        <TrendingUp className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold">
                        {language === 'en' ? profiles['data-analyst'].title : profiles['data-analyst'].titleEs}
                      </h3>
                      <p className="text-xs text-muted-foreground font-mono">
                        SQL • BI Dashboards • Insights
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground/80 leading-relaxed">
                    {language === 'en'
                      ? 'Transforming 300+ documents/day into actionable insights with Power BI and SQL'
                      : 'Transformando 300+ documentos/día en insights accionables con Power BI y SQL'}
                  </p>
                </div>

                {/* Right side - Stats */}
                <div className="hidden md:flex flex-col gap-3 text-right">
                  <div>
                    <div className="text-2xl font-bold text-orange-500">92%</div>
                    <div className="text-xs text-muted-foreground">{language === 'en' ? 'Accuracy' : 'Precisión'}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-500">25+</div>
                    <div className="text-xs text-muted-foreground">{language === 'en' ? 'Metrics' : 'Métricas'}</div>
                  </div>
                </div>
              </div>

              {/* Bottom */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Sparkles className="w-4 h-4 text-orange-500/60" />
                  <span className="text-xs text-muted-foreground">Power BI • Tableau • Excel</span>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 group-hover:text-orange-500 transition-all duration-300" />
              </div>
            </div>
          </motion.button>

        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground/50">
            {language === 'en'
              ? 'Click any specialization to explore detailed portfolio and download resume'
              : 'Haz clic en cualquier especialización para explorar el portafolio detallado y descargar el currículum'}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
