"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useI18n } from "@/contexts/i18n-context";
import { PROFILE_METADATA, ProfileType } from "@/contexts/profile-context";
import { ArrowRight, Code2, Database, Rocket, TrendingUp, Sparkles, Eye } from "lucide-react";
import Image from "next/image";
import { DATA } from "@/data/resume";

export default function LandingPage() {
  const router = useRouter();
  const { language } = useI18n();

  const handleProfileSelect = (profile: ProfileType) => {
    localStorage.setItem('profile', profile);
    router.push(`/${profile}`);
  };

  const profiles = PROFILE_METADATA;

  return (
    <div className="min-h-screen w-full px-3 sm:px-4 md:px-6 py-8 sm:py-12 md:py-16 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-12 md:space-y-16">

        {/* Hero Section - Personal & Human */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-6 md:space-y-8"
        >
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-cyan-500/20 rounded-full blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden ring-4 ring-white/10 ring-offset-4 ring-offset-background">
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
          <div className="space-y-3 sm:space-y-4 max-w-3xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              {language === 'en'
                ? (
                  <>
                    Hi, I'm Diego — <br className="hidden sm:inline" />
                    <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      I build data systems that work in production
                    </span>
                  </>
                )
                : (
                  <>
                    Hola, soy Diego — <br className="hidden sm:inline" />
                    <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      construyo sistemas de datos que funcionan en producción
                    </span>
                  </>
                )}
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-muted-foreground/80 leading-relaxed max-w-2xl mx-auto">
              {language === 'en'
                ? 'I enjoy turning complex systems into clear, reproducible solutions that are peaceful to operate.'
                : 'Me gusta convertir sistemas complejos en soluciones claras, reproducibles y tranquilas de operar.'}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/projects')}
              className="px-6 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 hover:border-white/20 text-sm font-medium transition-all duration-300"
            >
              {language === 'en' ? 'View Projects' : 'Ver Proyectos'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
              className="px-6 py-2.5 rounded-lg border border-white/10 hover:border-white/20 text-sm font-medium transition-all duration-300"
            >
              {language === 'en' ? 'View Experience' : 'Ver Experiencia'}
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
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5 rounded-2xl blur-3xl" />
          <div className="relative max-w-3xl mx-auto p-6 sm:p-8 md:p-10 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-sm">
            <div className="flex items-start gap-3 sm:gap-4 mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
              </div>
              <div className="flex-1 space-y-3 text-left">
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground/90 leading-relaxed">
                  {language === 'en'
                    ? 'I believe engineering should be understandable. I value systems that age well: transparent, documented, and easy to maintain.'
                    : 'Creo que la ingeniería debe ser entendible. Valoro los sistemas que envejecen bien: transparentes, documentados y fáciles de mantener.'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Areas of Experience - Personal Narrative */}
        <div className="space-y-4 sm:space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl sm:text-2xl md:text-3xl font-bold text-center"
          >
            {language === 'en' ? 'Areas where I have experience' : 'Áreas donde tengo experiencia'}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
            {/* Model Deployment & MLOps */}
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              onClick={() => handleProfileSelect('ml-engineer')}
              className="md:col-span-7 group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-purple-500/5 via-black/40 to-background backdrop-blur-sm hover:border-white/20 hover:scale-[1.01] transition-all duration-500 text-left"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
                <div className="flex items-start justify-between">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-purple-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-purple-500/30 to-purple-600/30 border border-purple-500/20 flex items-center justify-center backdrop-blur-sm">
                      <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:translate-x-1 group-hover:text-purple-400 transition-all duration-300" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold">
                    {language === 'en' ? 'Model Deployment & MLOps' : 'Despliegue de Modelos & MLOps'}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed">
                    {language === 'en'
                      ? 'I enjoy taking models to production and monitoring them so they work without surprises. I care about reproducibility and stability more than hype.'
                      : 'Me gusta llevar modelos a producción y monitorearlos para que funcionen sin sobresaltos. Me importa más la reproducibilidad y estabilidad que el hype.'}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['TensorFlow', 'FastAPI', 'Docker'].map((tech) => (
                    <span key={tech} className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-xs rounded-md bg-purple-500/10 text-purple-400/80 border border-purple-500/20">
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
              onClick={() => handleProfileSelect('data-engineer')}
              className="md:col-span-5 group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-purple-500/5 via-black/40 to-background backdrop-blur-sm hover:border-white/20 hover:scale-[1.01] transition-all duration-500 text-left"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4 h-full flex flex-col">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-purple-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-purple-500/30 to-purple-600/30 border border-purple-500/20 flex items-center justify-center backdrop-blur-sm transform group-hover:rotate-6 transition-transform duration-300">
                      <Database className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 flex-1 text-center">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold">
                    {language === 'en' ? 'Data Pipelines & Modeling' : 'Pipelines de Datos & Modelado'}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed">
                    {language === 'en'
                      ? 'I enjoy designing clean, testable pipelines. Good data engineering is invisible—it just works.'
                      : 'Disfruto diseñar pipelines limpios y testeables. La buena ingeniería de datos es invisible—simplemente funciona.'}
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-1.5">
                  {['PostgreSQL', 'Python', 'n8n'].map((tech) => (
                    <span key={tech} className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-xs rounded-md bg-purple-500/10 text-purple-400/80 border border-purple-500/20">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex justify-center pt-1">
                  <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:translate-y-1 group-hover:text-purple-400 transition-all duration-300" />
                </div>
              </div>
            </motion.button>

            {/* Infrastructure & Observability */}
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              onClick={() => handleProfileSelect('devops-engineer')}
              className="md:col-span-5 group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-purple-500/5 via-black/40 to-background backdrop-blur-sm hover:border-white/20 hover:scale-[1.01] transition-all duration-500 text-left"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-purple-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-br from-purple-500/30 to-purple-600/30 border border-purple-500/20 flex items-center justify-center backdrop-blur-sm">
                      <Rocket className="w-5 h-5 text-purple-400" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold">
                    {language === 'en' ? 'Infrastructure & Observability' : 'Infraestructura & Observabilidad'}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed">
                    {language === 'en'
                      ? 'I'm obsessed with observability because a good system should tell you how it feels. Deployments should be boring.'
                      : 'Me obsesiona la observabilidad porque un buen sistema debe decirte cómo se siente. Los despliegues deben ser aburridos.'}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['Docker', 'Kubernetes', 'Grafana'].map((tech) => (
                    <span key={tech} className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-xs rounded-md bg-purple-500/10 text-purple-400/80 border border-purple-500/20">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex justify-end pt-1">
                  <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:translate-x-1 group-hover:text-purple-400 transition-all duration-300" />
                </div>
              </div>
            </motion.button>

            {/* Dashboards & Analytics */}
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              onClick={() => handleProfileSelect('data-analyst')}
              className="md:col-span-7 group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-purple-500/5 via-black/40 to-background backdrop-blur-sm hover:border-white/20 hover:scale-[1.01] transition-all duration-500 text-left"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="absolute -inset-2 bg-purple-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-br from-purple-500/30 to-purple-600/30 border border-purple-500/20 flex items-center justify-center backdrop-blur-sm">
                          <TrendingUp className="w-5 h-5 text-purple-400" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg md:text-xl font-bold">
                          {language === 'en' ? 'Dashboards & Analytics' : 'Dashboards & Analytics'}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed">
                      {language === 'en'
                        ? 'I build dashboards that help make decisions, not to decorate reports. Clarity over complexity.'
                        : 'Hago dashboards que ayudan a tomar decisiones, no a decorar reportes. Claridad sobre complejidad.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex flex-wrap gap-1.5">
                    {['Power BI', 'Tableau', 'DAX'].map((tech) => (
                      <span key={tech} className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-xs rounded-md bg-purple-500/10 text-purple-400/80 border border-purple-500/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:translate-x-1 group-hover:text-purple-400 transition-all duration-300" />
                </div>
              </div>
            </motion.button>
          </div>
        </div>

      </div>
    </div>
  );
}
