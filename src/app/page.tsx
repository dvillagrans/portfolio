"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useI18n } from "@/contexts/i18n-context";
import { PROFILE_METADATA, ProfileType } from "@/contexts/profile-context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";

export default function LandingPage() {
  const router = useRouter();
  const { language } = useI18n();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleProfileSelect = (profile: ProfileType) => {
    localStorage.setItem('profile', profile);
    router.push(`/${profile}`);
  };

  const profiles: ProfileType[] = ['ml-engineer', 'data-engineer', 'devops-engineer', 'data-analyst'];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-background via-background to-muted/20">
      <div className="max-w-6xl w-full space-y-12">
        {/* Header */}
        <BlurFade delay={0.1} inView>
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-primary animate-pulse" />
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {language === 'en' ? 'Diego Villagran Salazar' : 'Diego Villagran Salazar'}
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              {language === 'en'
                ? 'Choose the profile that matches what you\'re looking for'
                : 'Elige el perfil que coincida con lo que buscas'}
            </p>
            <p className="text-sm md:text-base text-muted-foreground/80">
              {language === 'en'
                ? 'Each profile showcases specialized skills and relevant projects'
                : 'Cada perfil muestra habilidades especializadas y proyectos relevantes'}
            </p>
          </div>
        </BlurFade>

        {/* Profile Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profiles.map((profileId, index) => {
            const profile = PROFILE_METADATA[profileId];
            const title = language === 'en' ? profile.title : profile.titleEs;
            const tagline = language === 'en' ? profile.tagline : profile.taglineEs;
            const description = language === 'en' ? profile.description : profile.descriptionEs;

            return (
              <BlurFade key={profileId} delay={0.2 + index * 0.1} inView>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card
                    className="group relative overflow-hidden cursor-pointer h-full border-2 hover:border-primary/50 transition-all duration-300"
                    onClick={() => handleProfileSelect(profileId)}
                  >
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${profile.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                    {/* Content */}
                    <div className="relative p-8 space-y-6">
                      {/* Icon and Title */}
                      <div className="space-y-3">
                        <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                          {profile.icon}
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors">
                          {title}
                        </h2>
                        <p className={`text-sm font-mono bg-gradient-to-r ${profile.color} bg-clip-text text-transparent font-semibold`}>
                          {tagline}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed line-clamp-4">
                        {description}
                      </p>

                      {/* CTA Button */}
                      <Button
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                        variant="outline"
                      >
                        {language === 'en' ? 'View Profile' : 'Ver Perfil'}
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>

                    {/* Corner Accent */}
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${profile.color} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-300`} />
                  </Card>
                </motion.div>
              </BlurFade>
            );
          })}
        </div>

        {/* Footer Note */}
        <BlurFade delay={0.6} inView>
          <div className="text-center space-y-2 pt-8">
            <p className="text-sm text-muted-foreground">
              {language === 'en'
                ? 'Each profile has a tailored resume and portfolio view'
                : 'Cada perfil tiene un currículum y vista de portafolio personalizado'}
            </p>
            <p className="text-xs text-muted-foreground/60">
              {language === 'en'
                ? 'You can switch profiles anytime using the selector in the navigation bar'
                : 'Puedes cambiar de perfil en cualquier momento usando el selector en la barra de navegación'}
            </p>
          </div>
        </BlurFade>
      </div>
    </div>
  );
}
