"use client";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ProjectGridSkeleton } from "@/components/project-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { StaggerContainer, StaggerItem, EnhancedCard } from "@/components/page-transition";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import { IconCloudDemo } from "@/components/ui/cloud-icon";
// import ParticlesDemo from "@/components/ParticlesDemo";
import ShinyButton from "@/components/magicui/shiny-button";
import { MarqueeDemo } from "@/components/MarqueeDemo";
import { useState, useEffect } from "react";
import { ProjectDialog } from "@/components/project-dialog";
import { ContactForm } from "@/components/contact-form";
import { useI18n } from "@/contexts/i18n-context";

const BLUR_FADE_DELAY = 0.04;

// Typing Animation Hook
const useTypingEffect = (text: string, speed: number = 100) => {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayText, isComplete };
};

// Floating Animation Component
const FloatingElement = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  return (
    <div
      className="animate-float"
      style={{
        animationDelay: `${delay}s`,
        animation: `float 6s ease-in-out infinite ${delay}s`
      }}
    >
      {children}
    </div>
  );
};

// Scroll parallax hook
const useScrollParallax = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
};

// Intersection Observer hook for scroll animations (optimized)
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        // Unobserve after first intersection for performance
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px', // Trigger slightly before element comes into view
      ...options
    });

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, options]);

  return [setRef, isIntersecting] as const;
};

// ScrollReveal component (enhanced)
const ScrollReveal = ({
  children,
  animation = "fade-in-up",
  delay = 0,
  duration = 0.7,
  distance = 30
}: {
  children: React.ReactNode;
  animation?: string;
  delay?: number;
  duration?: number;
  distance?: number;
}) => {
  const [ref, isIntersecting] = useIntersectionObserver();

  const getAnimationClasses = () => {
    const baseClasses = "reveal-element transition-all gpu-accelerated";
    const visibleClasses = `animate-${animation} opacity-100`;
    const hiddenClasses = "opacity-0";

    // Add transform based on animation type
    let hiddenTransform = "";
    switch (animation) {
      case "slide-in-left":
        hiddenTransform = "translate-x-[-30px]";
        break;
      case "slide-in-right":
        hiddenTransform = "translate-x-[30px]";
        break;
      case "fade-in-up":
        hiddenTransform = `translate-y-[${distance}px]`;
        break;
      case "zoom-in":
        hiddenTransform = "scale-90";
        break;
      default:
        hiddenTransform = `translate-y-[${distance}px]`;
    }

    return isIntersecting
      ? `${baseClasses} ${visibleClasses}`
      : `${baseClasses} ${hiddenClasses} ${hiddenTransform}`;
  };

  return (
    <div
      ref={ref}
      className={getAnimationClasses()}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}s`
      }}
    >
      {children}
    </div>
  );
};

// Moved skillCategories inside component to access translations

interface Project {
  readonly title: string;
  readonly href: string;
  readonly dates: string;
  readonly active?: boolean;
  readonly description: string;
  readonly technologies: readonly string[];
  readonly links?: readonly {
    readonly type: string;
    readonly href: string;
    readonly icon: React.ReactNode;
  }[];
  readonly image?: {
    readonly src: string;
    readonly width?: number;
    readonly height?: number;
  };
  readonly video?: string;  // Añadimos la propiedad video como opcional
}

export default function Page() {
  const { t } = useI18n();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { displayText, isComplete } = useTypingEffect(t('hero.greeting'), 80);
  const scrollY = useScrollParallax();

  const skillCategories = [
    { title: t('skills.categories.datascience'), skills: ["Python", "Pandas", "Numpy", "Matplotlib", "Seaborn"] },
    { title: t('skills.categories.ml'), skills: ["Scikit-learn", "Tensorflow", "Keras", "PyTorch", "Yolo"] },
    { title: t('skills.categories.databases'), skills: ["PostgreSQL", "SQL"] },
    { title: t('skills.categories.versioncontrol'), skills: ["Git", "GitHub"] },
    { title: t('skills.categories.cloud'), skills: ["Docker", "Kubernetes", "AWS", "Azure", "Google Cloud"] },
    { title: t('skills.categories.web'), skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Astro", "Vercel"] },
  ];

  // Simular carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10 max-w-2xl">      <section id="hero" className="relative py-8 space-y-8 overflow-hidden">
      <div className="mx-auto w-full">
        {/* Floating sparkles with parallax */}
        <div
          className="absolute top-4 left-4 w-2 h-2 bg-primary rounded-full animate-sparkle opacity-60"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        ></div>
        <div
          className="absolute top-16 right-8 w-1 h-1 bg-blue-500 rounded-full animate-sparkle opacity-80"
          style={{
            animationDelay: '1s',
            transform: `translateY(${scrollY * 0.15}px)`
          }}
        ></div>
        <div
          className="absolute bottom-8 left-12 w-1.5 h-1.5 bg-purple-500 rounded-full animate-sparkle opacity-70"
          style={{
            animationDelay: '2s',
            transform: `translateY(${scrollY * 0.2}px)`
          }}
        ></div>

        {/* Header with title and avatar */}
        <div className="gap-6 flex justify-between items-start mb-8">
          <div className="flex-col flex flex-1 space-y-4">
            <BlurFade delay={BLUR_FADE_DELAY}>
              <div className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                <span className={isComplete ? "" : "animate-typing"}>{displayText}</span>
                {!isComplete && <span className="animate-pulse">|</span>}
              </div>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 1.5}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground font-medium">{t('status.available')}</span>
              </div>
            </BlurFade>              <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <div className="flex flex-wrap gap-2 pt-2">
                <div className="group px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20 hover:bg-primary/15 hover:border-primary/30 hover:scale-105 transition-all duration-300 cursor-default">
                  <span className="group-hover:animate-pulse">🔬</span> {t('roles.datascientist')}
                </div>
                <div className="group px-3 py-1.5 bg-blue-500/10 text-blue-500 rounded-full text-sm font-medium border border-blue-500/20 hover:bg-blue-500/15 hover:border-blue-500/30 hover:scale-105 transition-all duration-300 cursor-default">
                  <span className="group-hover:animate-pulse">💻</span> {t('roles.fullstack')}
                </div>
                <div className="group px-3 py-1.5 bg-purple-500/10 text-purple-500 rounded-full text-sm font-medium border border-purple-500/20 hover:bg-purple-500/15 hover:border-purple-500/30 hover:scale-105 transition-all duration-300 cursor-default">
                  <span className="group-hover:animate-pulse">🤖</span> {t('roles.mlengineer')}
                </div>
              </div>
            </BlurFade>
          </div>            <BlurFade delay={BLUR_FADE_DELAY}>
            <FloatingElement delay={1}>
              <div className="relative group">
                {/* Orbiting elements */}
                <div className="absolute -inset-8 animate-spin" style={{ animationDuration: '20s' }}>
                  <div className="absolute top-0 left-1/2 w-1 h-1 bg-primary rounded-full transform -translate-x-1/2"></div>
                  <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-blue-500 rounded-full transform -translate-x-1/2"></div>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-blue-500 to-purple-500 rounded-full blur opacity-25 group-hover:opacity-40 group-hover:animate-pulse transition duration-1000 group-hover:duration-200"></div>
                <Avatar className="relative size-28 sm:size-32 border-2 border-background shadow-xl ring-2 ring-background hover:ring-4 hover:ring-primary/20 transition-all duration-300 hover:scale-105">
                  <AvatarImage alt={DATA.name} src={DATA.avatarUrl} className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <AvatarFallback className="text-xl font-bold bg-gradient-to-br from-primary to-blue-500 text-primary-foreground">{DATA.initials}</AvatarFallback>
                </Avatar>
              </div>
            </FloatingElement>
          </BlurFade>
        </div>

        {/* Description and achievements in one cohesive block */}
        <div className="space-y-6">
          <BlurFadeText
            className="max-w-[580px] text-lg md:text-xl text-muted-foreground leading-relaxed"
            delay={BLUR_FADE_DELAY * 3}
            text={t('hero.summary')}
          />            <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
              <div className="group text-center space-y-1 p-3 rounded-lg bg-green-500/5 border border-green-500/10 hover:bg-green-500/10 hover:border-green-500/20 hover:scale-105 transition-all duration-300 cursor-default">
                <div className="text-2xl font-bold text-green-500 group-hover:animate-pulse">92%</div>
                <div className="text-xs text-muted-foreground group-hover:text-green-600 transition-colors">{t('metrics.forecasting')}</div>
              </div>
              <div className="group text-center space-y-1 p-3 rounded-lg bg-blue-500/5 border border-blue-500/10 hover:bg-blue-500/10 hover:border-blue-500/20 hover:scale-105 transition-all duration-300 cursor-default">
                <div className="text-2xl font-bold text-blue-500 group-hover:animate-pulse">40%</div>
                <div className="text-xs text-muted-foreground group-hover:text-blue-600 transition-colors">{t('metrics.conversion')}</div>
              </div>
              <div className="group text-center space-y-1 p-3 rounded-lg bg-purple-500/5 border border-purple-500/10 hover:bg-purple-500/10 hover:border-purple-500/20 hover:scale-105 transition-all duration-300 cursor-default">
                <div className="text-2xl font-bold text-purple-500 group-hover:animate-pulse">3+</div>
                <div className="text-xs text-muted-foreground group-hover:text-purple-600 transition-colors">{t('metrics.experience')}</div>
              </div>
              <div className="group text-center space-y-1 p-3 rounded-lg bg-orange-500/5 border border-orange-500/10 hover:bg-orange-500/10 hover:border-orange-500/20 hover:scale-105 transition-all duration-300 cursor-default">
                <div className="text-2xl font-bold text-orange-500 group-hover:animate-pulse">1M+</div>
                <div className="text-xs text-muted-foreground group-hover:text-orange-600 transition-colors">{t('metrics.records')}</div>
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/10">
              <div className="w-1 h-16 bg-gradient-to-b from-primary to-purple-500 rounded-full flex-shrink-0 mt-1"></div>
              <div className="space-y-1">                <p className="text-sm text-muted-foreground italic leading-relaxed">
                &ldquo;{t('about.quote')}&rdquo;
              </p>
                <p className="text-xs text-muted-foreground">
                  {t('about.currentlyPursuing')}
                </p>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>      <ScrollReveal animation="slide-in-left" delay={100}>
        <section id="work" className="space-y-6">
          <div className="flex min-h-0 flex-col gap-y-4">
            <BlurFade delay={BLUR_FADE_DELAY * 6}>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold tracking-tight">{t('experience.work')}</h2>
                <div className="h-px bg-gradient-to-r from-border to-transparent flex-1"></div>
                <div className="text-sm text-muted-foreground font-medium bg-primary/10 px-3 py-1 rounded-full">
                  {DATA.work.length} {t('status.experiences')}
                </div>
              </div>
            </BlurFade>
            {isLoading ? (
              <div className="grid gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                    <Skeleton className="h-16 w-full" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-4">
                {DATA.work.map((work, id) => (
                  <BlurFade
                    key={work.company}
                    delay={BLUR_FADE_DELAY * 7 + id * 0.1}
                  >
                    <div className="group relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-blue-500/20 to-purple-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                      <ResumeCard
                        key={work.company}
                        logoUrl={work.logoUrl}
                        altText={work.company}
                        title={work.company}
                        subtitle={work.title}
                        href={work.href}
                        badges={work.badges}
                        period={`${work.start} - ${work.end ?? "Present"}`}
                        description={work.description}
                      />
                    </div>
                  </BlurFade>
                ))}
              </div>
            )}
          </div>
        </section>
      </ScrollReveal>      <ScrollReveal animation="slide-in-right" delay={200}>
        <section id="education" className="space-y-6">
          <div className="flex min-h-0 flex-col gap-y-4">
            <BlurFade delay={BLUR_FADE_DELAY * 8}>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold tracking-tight">{t('experience.education')}</h2>
                <div className="h-px bg-gradient-to-r from-border to-transparent flex-1"></div>
                <div className="text-sm text-muted-foreground font-medium bg-blue-500/10 px-3 py-1 rounded-full">
                  {DATA.education.length} {t('status.degrees')}
                </div>
              </div>
            </BlurFade>
            {isLoading ? (
              <div className="grid gap-4">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-4">
                {DATA.education.map((education, id) => (
                  <BlurFade
                    key={education.school}
                    delay={BLUR_FADE_DELAY * 9 + id * 0.1}
                  >
                    <div className="group relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                      <ResumeCard
                        key={education.school}
                        href={education.href}
                        logoUrl={education.logoUrl}
                        altText={education.school}
                        title={education.school}
                        subtitle={education.degree}
                        period={`${education.start} - ${education.end}`}
                      />
                    </div>
                  </BlurFade>
                ))}
              </div>
            )}
          </div>
        </section>
      </ScrollReveal>      <ScrollReveal animation="fade-in-up" delay={300}>
        <section id="skills" className="space-y-8">
          <div className="flex min-h-0 flex-col gap-y-6 items-center">
            <BlurFade delay={BLUR_FADE_DELAY * 10}>
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-3">
                  <div className="h-px bg-gradient-to-r from-transparent to-border flex-1 max-w-20"></div>
                  <h2 className="text-2xl font-bold tracking-tight">{t('skills.title')}</h2>
                  <div className="h-px bg-gradient-to-r from-border to-transparent flex-1 max-w-20"></div>
                </div>
                <p className="text-muted-foreground max-w-2xl text-center">
                  {t('skills.description')}
                </p>
              </div>
            </BlurFade>

            {/* Skill Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
              {skillCategories.map((category, index) => (
                <BlurFade key={category.title} delay={BLUR_FADE_DELAY * (11 + index * 0.2)}>
                  <div className="group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/20 via-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative">
                      {/* Temporarily disabled due to initialization error */}
                      {/* <ParticlesDemo title={category.title} skills={category.skills} /> */}
                      <div className="flex h-[280px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
                        <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-3xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10 mb-2">
                          {category.title}
                        </span>
                        <span className="text-base text-center text-muted-foreground">
                          {category.skills.join(", ")}
                        </span>
                      </div>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>            {/* Icon Cloud */}
            <div className="w-full">
              <div className="max-w-md mx-auto scale-75 sm:scale-90">
                <IconCloudDemo />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>      <ScrollReveal animation="zoom-in" delay={400}>
        <section id="projects" className="space-y-8">
          <div className="space-y-8 w-full">
            <BlurFade delay={BLUR_FADE_DELAY * 15}>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-3">
                    <div className="h-px bg-gradient-to-r from-transparent to-border flex-1 max-w-20"></div>
                    <h2 className="text-2xl font-bold tracking-tight">{t('projects.title')}</h2>
                    <div className="h-px bg-gradient-to-r from-border to-transparent flex-1 max-w-20"></div>
                  </div>
                  <h3 className="text-3xl font-bold tracking-tighter sm:text-4xl bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                    {t('projects.subtitle')}
                  </h3>
                  <p className="text-muted-foreground md:text-lg max-w-2xl">
                    {t('projects.description')}
                  </p>
                  <div className="flex items-center justify-center gap-2 pt-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-sm text-muted-foreground font-medium">{DATA.projects.length} {t('projects.totalProjects')}</span>
                  </div>
                </div>
              </div>
            </BlurFade>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProjectGridSkeleton count={4} />
              </div>
            ) : (
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto">
                {DATA.projects.slice(0, 4).map((project, id) => (
                  <StaggerItem key={project.title} className="stagger-item">
                    <EnhancedCard
                      onClick={() => setSelectedProject(project)}
                      className="cursor-pointer group relative h-full"
                    >
                      <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 via-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                      <div className="relative h-full">
                        <ProjectCard
                          title={project.title}
                          description={project.description}
                          dates={project.dates}
                          tags={project.technologies}
                          image={project.image}
                        />
                      </div>
                    </EnhancedCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}

            <BlurFade delay={BLUR_FADE_DELAY * 18}>
              <div className="flex justify-center pt-4">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary via-blue-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                  <div className="relative">
                    <ShinyButton text={`${t('projects.viewall')} (${DATA.projects.length})`} href="projects" />
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>
      </ScrollReveal>

      {/* Diálogo de proyecto */}
      {selectedProject && (
        <ProjectDialog
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          project={selectedProject}
        />
      )}      <ScrollReveal animation="slide-in-left" delay={500}>
        <section id="certifications" className="space-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 19}>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight">{t('status.certifications')}</h2>
              <div className="h-px bg-gradient-to-r from-border to-transparent flex-1"></div>
              <div className="text-sm text-muted-foreground font-medium bg-orange-500/10 px-3 py-1 rounded-full">
                {t('status.certifications')}
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 19.5}>
            <div className="scale-90 sm:scale-95">
              <MarqueeDemo />
            </div>
          </BlurFade>
        </section>
      </ScrollReveal>      <ScrollReveal animation="fade-in-up" delay={600}>
        <section id="contact" className="py-16">
          <div className="space-y-12 w-full max-w-4xl mx-auto">
            <BlurFade delay={BLUR_FADE_DELAY * 20}>
              <div className="text-center space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-3">
                    <div className="h-px bg-gradient-to-r from-transparent to-border flex-1 max-w-20"></div>
                    <h2 className="text-2xl font-bold tracking-tight">{t('contact.title')}</h2>
                    <div className="h-px bg-gradient-to-r from-border to-transparent flex-1 max-w-20"></div>
                  </div>
                  <h3 className="text-3xl font-bold tracking-tighter sm:text-4xl bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                    {t('contact.hero.title')}
                  </h3>
                  <p className="mx-auto max-w-[600px] text-muted-foreground md:text-lg leading-relaxed">
                    {t('contact.hero.description')}
                  </p>
                </div>

                {/* Status and Location */}
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                  <div className="group flex items-center gap-2 px-3 py-2 bg-green-500/10 text-green-500 rounded-full border border-green-500/20 hover:bg-green-500/15 hover:border-green-500/30 hover:scale-105 transition-all duration-300 cursor-default">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse group-hover:animate-bounce"></div>
                    <span className="font-medium">{t('contact.status.available')}</span>
                  </div>
                  <div className="group flex items-center gap-2 px-3 py-2 bg-blue-500/10 text-blue-500 rounded-full border border-blue-500/20 hover:bg-blue-500/15 hover:border-blue-500/30 hover:scale-105 transition-all duration-300 cursor-default">
                    <span className="font-medium group-hover:animate-pulse">📍 {t('contact.status.location')}</span>
                  </div>
                  <div className="group flex items-center gap-2 px-3 py-2 bg-purple-500/10 text-purple-500 rounded-full border border-purple-500/20 hover:bg-purple-500/15 hover:border-purple-500/30 hover:scale-105 transition-all duration-300 cursor-default">
                    <span className="font-medium group-hover:animate-pulse">🎓 {t('contact.status.student')}</span>
                  </div>
                </div>
              </div>
            </BlurFade>

            {/* Contact Form */}
            <BlurFade delay={BLUR_FADE_DELAY * 21}>
              <ContactForm />
            </BlurFade>

            {/* Alternative Contact Methods */}
            <BlurFade delay={BLUR_FADE_DELAY * 22}>
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center gap-3">
                  <div className="h-px bg-gradient-to-r from-transparent to-border flex-1 max-w-32"></div>
                  <span className="text-sm text-muted-foreground font-medium">{t('contact.alternative.title')}</span>
                  <div className="h-px bg-gradient-to-r from-border to-transparent flex-1 max-w-32"></div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg blur opacity-25 group-hover:opacity-75 group-hover:animate-pulse transition duration-500"></div>
                    <Link
                      href={DATA.contact.social.LinkedIn.url}
                      className="relative inline-flex items-center px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                    >
                      <span className="mr-2 group-hover:animate-bounce">💼</span>
                      LinkedIn
                    </Link>
                  </div>
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/80 rounded-lg blur opacity-25 group-hover:opacity-75 group-hover:animate-pulse transition duration-500"></div>
                    <Link
                      href={`mailto:${DATA.contact.email}`}
                      className="relative inline-flex items-center px-6 py-2.5 rounded-lg border-2 border-primary bg-background hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                    >
                      <span className="mr-2 group-hover:animate-bounce">✉️</span>
                      Email
                    </Link>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="flex flex-wrap justify-center gap-3 text-sm">
                    <span className="px-3 py-1 bg-muted rounded-full hover:bg-muted/80 transition-colors cursor-default">📧 {t('contact.response.time')}</span>
                    <span className="px-3 py-1 bg-muted rounded-full hover:bg-muted/80 transition-colors cursor-default">💬 {t('contact.linkedin.note')}</span>
                    <span className="px-3 py-1 bg-muted rounded-full hover:bg-muted/80 transition-colors cursor-default">🤝 {t('contact.remote.note')}</span>
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>
      </ScrollReveal>

    </main>
  );
}
