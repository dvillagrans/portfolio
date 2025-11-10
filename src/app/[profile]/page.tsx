"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, notFound } from "next/navigation";
import dynamic from 'next/dynamic';
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { OptimizedAvatar, OptimizedAvatarFallback, OptimizedAvatarImage } from "@/components/ui/optimized-avatar";
import { DATA } from "@/data/resume";
import { useI18n } from "@/contexts/i18n-context";
import { useProfile, PROFILE_METADATA, ProfileType } from "@/contexts/profile-context";
import { PROFILE_DATA } from "@/data/profiles";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { StaggerContainer, StaggerItem, EnhancedCard } from "@/components/page-transition";

const IconCloudDemo = dynamic(() => import("@/components/ui/cloud-icon").then(mod => ({ default: mod.IconCloudDemo })), {
  loading: () => <div className="w-full h-48 animate-pulse bg-muted rounded-lg" />,
  ssr: false
});

const MarqueeDemo = dynamic(() => import("@/components/MarqueeDemo").then(mod => ({ default: mod.MarqueeDemo })), {
  loading: () => <div className="w-full h-32 animate-pulse bg-muted rounded-lg" />
});

const ProjectDialog = dynamic(() => import("@/components/project-dialog").then(mod => ({ default: mod.ProjectDialog })), {
  loading: () => null
});

const ContactForm = dynamic(() => import("@/components/contact-form").then(mod => ({ default: mod.ContactForm })), {
  loading: () => <div className="w-full h-96 animate-pulse bg-muted rounded-lg" />
});

const BLUR_FADE_DELAY = 0.04;

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { language } = useI18n();
  const { setProfile } = useProfile();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  const profileParam = params.profile as ProfileType;

  // Validate profile
  if (!PROFILE_METADATA[profileParam]) {
    notFound();
  }

  const metadata = PROFILE_METADATA[profileParam];
  const profileData = PROFILE_DATA[profileParam];

  useEffect(() => {
    setMounted(true);
    setProfile(profileParam);
  }, [profileParam, setProfile]);

  const title = language === 'en' ? metadata.title : metadata.titleEs;
  const tagline = language === 'en' ? metadata.tagline : metadata.taglineEs;
  const summary = language === 'en' ? profileData.summary : profileData.summaryEs;

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10 max-w-2xl">
      {/* Back to Landing Button */}
      <BlurFade delay={0}>
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            {language === 'en' ? 'Back to Profiles' : 'Volver a Perfiles'}
          </Button>
        </Link>
      </BlurFade>

      {/* Hero Section */}
      <section id="hero" className="relative py-8 space-y-8 overflow-hidden">
        <div className="mx-auto w-full">
          {/* Header with avatar */}
          <div className="gap-6 flex justify-between items-start mb-8">
            <div className="flex-col flex flex-1 space-y-4">
              <BlurFade delay={BLUR_FADE_DELAY}>
                <div className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                  {DATA.name}
                </div>
              </BlurFade>

              <BlurFade delay={BLUR_FADE_DELAY * 1.5}>
                <div className="flex items-center gap-2">
                  <span className="text-4xl">{metadata.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <p className="text-sm text-muted-foreground font-mono">{tagline}</p>
                  </div>
                </div>
              </BlurFade>

              <BlurFade delay={BLUR_FADE_DELAY * 2}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-muted-foreground font-medium">
                    {language === 'en' ? 'Available for work' : 'Disponible para trabajar'}
                  </span>
                </div>
              </BlurFade>
            </div>

            <BlurFade delay={BLUR_FADE_DELAY}>
              <OptimizedAvatar className="relative size-28 sm:size-32 border-2 border-background shadow-xl">
                <OptimizedAvatarImage
                  alt={DATA.name}
                  src={DATA.avatarUrl}
                  className="object-cover"
                  size={128}
                  priority={true}
                />
                <OptimizedAvatarFallback>{DATA.initials}</OptimizedAvatarFallback>
              </OptimizedAvatar>
            </BlurFade>
          </div>

          {/* Summary */}
          <BlurFadeText
            className="max-w-[680px] text-base md:text-lg text-muted-foreground leading-relaxed"
            delay={BLUR_FADE_DELAY * 3}
            text={summary}
          />

          {/* Resume Download Button */}
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="mt-6">
              <a href={metadata.resumePdf} download target="_blank" rel="noopener noreferrer">
                <Button className={`bg-gradient-to-r ${metadata.color} text-white hover:opacity-90`}>
                  <Download className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'Download Resume (PDF)' : 'Descargar CV (PDF)'}
                </Button>
              </a>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="space-y-6">
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight">
              {language === 'en' ? 'Key Skills' : 'Habilidades Clave'}
            </h2>
            <div className="h-px bg-gradient-to-r from-border to-transparent flex-1"></div>
          </div>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 6}>
          <div className="flex flex-wrap gap-2">
            {profileData.highlightedSkills.map((skill) => (
              <span
                key={skill}
                className={`px-3 py-1.5 bg-gradient-to-r ${metadata.color} bg-opacity-10 rounded-full text-sm font-medium border border-current/20`}
              >
                {skill}
              </span>
            ))}
          </div>
        </BlurFade>

        {/* Icon Cloud */}
        <div className="w-full pt-4">
          <div className="max-w-md mx-auto scale-75 sm:scale-90">
            <IconCloudDemo />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="work" className="space-y-6">
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight">
              {language === 'en' ? 'Experience' : 'Experiencia'}
            </h2>
            <div className="h-px bg-gradient-to-r from-border to-transparent flex-1"></div>
          </div>
        </BlurFade>

        <div className="grid gap-4">
          {profileData.work.map((work, id) => (
            <BlurFade key={work.company} delay={BLUR_FADE_DELAY * (8 + id * 0.1)}>
              <ResumeCard
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                badges={work.badges}
                period={`${work.start} - ${work.end}`}
                description={work.description}
              />
            </BlurFade>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="space-y-6">
        <BlurFade delay={BLUR_FADE_DELAY * 10}>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight">
              {language === 'en' ? 'Featured Projects' : 'Proyectos Destacados'}
            </h2>
            <div className="h-px bg-gradient-to-r from-border to-transparent flex-1"></div>
            <div className="text-sm text-muted-foreground font-medium bg-primary/10 px-3 py-1 rounded-full">
              {profileData.projects.length}
            </div>
          </div>
        </BlurFade>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profileData.projects.map((project, id) => (
            <StaggerItem key={project.title}>
              <EnhancedCard
                onClick={() => setSelectedProject(project)}
                className="cursor-pointer h-full"
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  role={project.role}
                  image={project.image}
                />
              </EnhancedCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <BlurFade delay={BLUR_FADE_DELAY * 12}>
          <div className="flex justify-center pt-4">
            <Link href="/projects">
              <Button variant="outline">
                {language === 'en' ? 'View All Projects' : 'Ver Todos los Proyectos'}
              </Button>
            </Link>
          </div>
        </BlurFade>
      </section>

      {/* Project Dialog */}
      {selectedProject && (
        <ProjectDialog
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          project={selectedProject}
        />
      )}

      {/* Education Section */}
      <section id="education" className="space-y-6">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight">
              {language === 'en' ? 'Education' : 'Educación'}
            </h2>
            <div className="h-px bg-gradient-to-r from-border to-transparent flex-1"></div>
          </div>
        </BlurFade>

        <div className="grid gap-4">
          {DATA.education.map((education, id) => (
            <BlurFade key={education.school} delay={BLUR_FADE_DELAY * (14 + id * 0.1)}>
              <ResumeCard
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
              />
            </BlurFade>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className="space-y-6">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight">
              {language === 'en' ? 'Certifications' : 'Certificaciones'}
            </h2>
            <div className="h-px bg-gradient-to-r from-border to-transparent flex-1"></div>
          </div>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 17}>
          <div className="scale-90 sm:scale-95">
            <MarqueeDemo />
          </div>
        </BlurFade>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-8 space-y-8">
        <BlurFade delay={BLUR_FADE_DELAY * 18}>
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">
              {language === 'en' ? 'Get in Touch' : 'Contacta Conmigo'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === 'en'
                ? 'Interested in this profile? Let\'s talk about how I can help your team.'
                : '¿Interesado en este perfil? Hablemos sobre cómo puedo ayudar a tu equipo.'}
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 19}>
          <ContactForm />
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 20}>
          <div className="flex justify-center gap-4">
            <Link href={DATA.contact.social.LinkedIn.url} target="_blank">
              <Button variant="outline">
                💼 LinkedIn
              </Button>
            </Link>
            <Link href={`mailto:${DATA.contact.email}`}>
              <Button variant="outline">
                ✉️ Email
              </Button>
            </Link>
          </div>
        </BlurFade>
      </section>
    </main>
  );
}
