"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useI18n } from "@/contexts/i18n-context";
import { PROFILE_METADATA, ProfileType } from "@/contexts/profile-context";
import { ArrowRight, Code, Database, Cloud, BarChart3 } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const { language } = useI18n();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleProfileSelect = (profile: ProfileType) => {
    localStorage.setItem('profile', profile);
    router.push(`/${profile}`);
  };

  const profiles: ProfileType[] = ['ml-engineer', 'data-engineer', 'devops-engineer', 'data-analyst'];

  // Professional icons mapping
  const profileIcons: Record<ProfileType, any> = {
    'ml-engineer': Code,
    'data-engineer': Database,
    'devops-engineer': Cloud,
    'data-analyst': BarChart3,
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl w-full space-y-16">
        {/* Hero Section - Clean and Professional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6 max-w-3xl mx-auto"
        >
          <div className="space-y-3">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Diego Villagran Salazar
            </h1>
            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-8 bg-gradient-to-r from-transparent via-foreground/40 to-transparent" />
              <p className="text-base md:text-lg text-muted-foreground font-medium">
                {language === 'en' ? 'Data Science Student & Engineer' : 'Estudiante de Ciencia de Datos e Ingeniero'}
              </p>
              <div className="h-px w-8 bg-gradient-to-r from-transparent via-foreground/40 to-transparent" />
            </div>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground/90 leading-relaxed max-w-2xl mx-auto">
            {language === 'en'
              ? 'Select a specialization to explore relevant experience, projects, and skills'
              : 'Selecciona una especialización para explorar experiencia, proyectos y habilidades relevantes'}
          </p>
        </motion.div>

        {/* Profile Cards - Minimalist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {profiles.map((profileId, index) => {
            const profile = PROFILE_METADATA[profileId];
            const title = language === 'en' ? profile.title : profile.titleEs;
            const tagline = language === 'en' ? profile.tagline : profile.taglineEs;
            const Icon = profileIcons[profileId];
            const isHovered = hoveredCard === profileId;

            return (
              <motion.button
                key={profileId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleProfileSelect(profileId)}
                onMouseEnter={() => setHoveredCard(profileId)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative text-left"
              >
                {/* Card Container */}
                <div className="relative h-full p-8 rounded-xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-foreground/20 hover:bg-card/80">

                  {/* Subtle gradient overlay on hover */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="relative space-y-5">
                    {/* Icon & Title Section */}
                    <div className="flex items-start justify-between">
                      <div className="space-y-3 flex-1">
                        {/* Icon */}
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg border border-border bg-background/50 group-hover:border-foreground/20 transition-colors">
                          <Icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </div>

                        {/* Title */}
                        <div>
                          <h3 className="text-xl md:text-2xl font-semibold tracking-tight mb-1.5 group-hover:text-foreground transition-colors">
                            {title}
                          </h3>
                          <p className="text-sm text-muted-foreground/80 font-mono">
                            {tagline.split('|')[0].trim()}
                          </p>
                        </div>
                      </div>

                      {/* Arrow Icon */}
                      <motion.div
                        animate={{ x: isHovered ? 4 : 0, opacity: isHovered ? 1 : 0.4 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2"
                      >
                        <ArrowRight className="w-5 h-5 text-muted-foreground" />
                      </motion.div>
                    </div>

                    {/* Bottom Line - Appears on Hover */}
                    <div className="pt-4 border-t border-transparent group-hover:border-border/50 transition-all duration-300">
                      <p className="text-sm text-muted-foreground/60 group-hover:text-muted-foreground/80 transition-colors">
                        {language === 'en' ? 'View specialized portfolio' : 'Ver portafolio especializado'}
                      </p>
                    </div>
                  </div>

                  {/* Hover effect indicator */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary/60 to-primary/20"
                    initial={{ width: 0 }}
                    animate={{ width: isHovered ? '100%' : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Footer - Minimalist */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center pt-8"
        >
          <p className="text-sm text-muted-foreground/60">
            {language === 'en'
              ? 'Each profile features curated projects and downloadable resume'
              : 'Cada perfil incluye proyectos curados y currículum descargable'}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
