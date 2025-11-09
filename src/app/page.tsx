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
    <div className="h-screen w-full flex items-center justify-center px-4 md:px-6 py-6 overflow-hidden">
      <div className="max-w-7xl w-full space-y-6 md:space-y-8">

        {/* Hero Section - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-2 max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Diego Villagran
          </h1>
          <p className="text-base md:text-lg text-muted-foreground/80">
            {language === 'en'
              ? 'Data Science Student & Multi-Disciplinary Engineer'
              : 'Estudiante de Ciencia de Datos e Ingeniero Multidisciplinario'}
          </p>
        </motion.div>

        {/* Bento Grid - Compact */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">

          {/* ML Engineer - Hero Card */}
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onClick={() => handleProfileSelect('ml-engineer')}
            className="md:col-span-7 group relative overflow-hidden rounded-xl border-2 border-border bg-gradient-to-br from-purple-500/5 via-background to-pink-500/5 hover:border-purple-500/30 transition-all duration-500 text-left"
          >
            <div className="p-5 md:p-6 space-y-4">
              {/* Top section */}
              <div className="flex items-start justify-between">
                <div className="relative">
                  <div className="absolute -inset-3 bg-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Code2 className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 group-hover:text-purple-500 transition-all duration-300" />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold">
                    {language === 'en' ? profiles['ml-engineer'].title : profiles['ml-engineer'].titleEs}
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono">
                    MLOps • Applied AI • Model Serving
                  </p>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground/80 leading-relaxed line-clamp-2">
                  {language === 'en'
                    ? 'Building production ML pipelines with 85%+ accuracy, real-time inference <100ms'
                    : 'Construyendo pipelines ML con 85%+ precisión, inferencia <100ms'}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {['TensorFlow', 'FastAPI', 'Docker'].map((tech) => (
                  <span key={tech} className="px-2 py-0.5 text-xs rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.button>

          {/* Data Engineer - Tall Card */}
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={() => handleProfileSelect('data-engineer')}
            className="md:col-span-5 group relative overflow-hidden rounded-xl border-2 border-border bg-gradient-to-br from-blue-500/5 via-background to-cyan-500/5 hover:border-blue-500/30 transition-all duration-500 text-left"
          >
            <div className="p-5 md:p-6 space-y-4 h-full flex flex-col">
              {/* Icon centered */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-3 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300">
                    <Database className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2 flex-1 text-center">
                <div>
                  <h3 className="text-lg md:text-xl font-bold">
                    {language === 'en' ? profiles['data-engineer'].title : profiles['data-engineer'].titleEs}
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono">
                    ETL • Pipelines
                  </p>
                </div>
                <p className="text-xs text-muted-foreground/80 leading-relaxed line-clamp-2">
                  {language === 'en'
                    ? '300+ daily inputs, 92% accuracy'
                    : '300+ entradas diarias, 92% precisión'}
                </p>
              </div>

              {/* Bottom arrow */}
              <div className="flex justify-center">
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-y-1 group-hover:text-blue-500 transition-all duration-300" />
              </div>
            </div>
          </motion.button>

          {/* DevOps Engineer - Wide Card */}
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={() => handleProfileSelect('devops-engineer')}
            className="md:col-span-5 group relative overflow-hidden rounded-xl border-2 border-border hover:border-green-500/30 transition-all duration-500 text-left"
          >
            {/* Vertical accent line */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="p-5 md:p-6 space-y-4">
              {/* Icon and arrow in row */}
              <div className="flex items-center justify-between">
                <div className="relative">
                  <div className="absolute -inset-2 bg-green-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative w-11 h-11 rounded-lg bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
                    <Rocket className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="flex gap-1">
                  <GitBranch className="w-3.5 h-3.5 text-green-500/40" />
                  <Cpu className="w-3.5 h-3.5 text-green-500/40" />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-1.5">
                <h3 className="text-lg md:text-xl font-bold">
                  {language === 'en' ? profiles['devops-engineer'].title : profiles['devops-engineer'].titleEs}
                </h3>
                <p className="text-xs text-muted-foreground font-mono">
                  CI/CD • Containers
                </p>
                <p className="text-xs text-muted-foreground/80 leading-relaxed line-clamp-2">
                  {language === 'en'
                    ? '99.5% uptime, 50% faster deployments'
                    : '99.5% disponibilidad, 50% más rápido'}
                </p>
              </div>

              {/* Bottom section */}
              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <span className="text-xs text-muted-foreground">Docker • K8s</span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:translate-x-1 group-hover:text-green-500 transition-all duration-300" />
              </div>
            </div>
          </motion.button>

          {/* Data Analyst - Compact Stats Card */}
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onClick={() => handleProfileSelect('data-analyst')}
            className="md:col-span-7 group relative overflow-hidden rounded-xl border-2 border-border bg-gradient-to-br from-orange-500/5 via-background to-red-500/5 hover:border-orange-500/30 transition-all duration-500 text-left"
          >
            <div className="p-5 md:p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                {/* Left side */}
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-orange-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative w-11 h-11 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold">
                        {language === 'en' ? profiles['data-analyst'].title : profiles['data-analyst'].titleEs}
                      </h3>
                      <p className="text-xs text-muted-foreground font-mono">
                        SQL • BI Dashboards
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground/80 leading-relaxed line-clamp-2">
                    {language === 'en'
                      ? '300+ documents/day into insights with Power BI'
                      : '300+ documentos/día en insights con Power BI'}
                  </p>
                </div>

                {/* Right side - Stats */}
                <div className="hidden md:flex flex-col gap-2 text-right">
                  <div>
                    <div className="text-xl font-bold text-orange-500">92%</div>
                    <div className="text-xs text-muted-foreground">{language === 'en' ? 'Accuracy' : 'Precisión'}</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-orange-500">25+</div>
                    <div className="text-xs text-muted-foreground">{language === 'en' ? 'Metrics' : 'Métricas'}</div>
                  </div>
                </div>
              </div>

              {/* Bottom */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                  <Sparkles className="w-3.5 h-3.5 text-orange-500/60" />
                  <span className="text-xs text-muted-foreground">Power BI • Tableau</span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 group-hover:text-orange-500 transition-all duration-300" />
              </div>
            </div>
          </motion.button>

        </div>

      </div>
    </div>
  );
}
