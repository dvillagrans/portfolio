"use client";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import { IconCloudDemo } from "@/components/ui/cloud-icon";
import ParticlesDemo from "@/components/ParticlesDemo";
import ShinyButton from "@/components/magicui/shiny-button";
import { MarqueeDemo } from "@/components/MarqueeDemo";
import { useState } from "react";
import { ProjectDialog } from "@/components/project-dialog";

const BLUR_FADE_DELAY = 0.04;

const skillCategories = [
  { title: "Data Science", skills: ["Python", "Pandas", "Numpy", "Matplotlib", "Seaborn"] },
  { title: "Machine Learning", skills: ["Scikit-learn", "Tensorflow", "Keras", "PyTorch", "Yolo"] },
  { title: "Databases", skills: ["PostgreSQL", "SQL"] },
  { title: "Version Control", skills: ["Git", "GitHub"] },
  { title: "Cloud & DevOps", skills: ["Docker", "Kubernetes", "AWS", "Azure", "Google Cloud"] },
  { title: "Web Development", skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Astro", "Vercel"] },
];

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
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10 max-w-2xl">      <section id="hero" className="relative py-8 space-y-8">
      <div className="mx-auto w-full">
        {/* Header with title and avatar */}
        <div className="gap-6 flex justify-between items-start mb-8">
          <div className="flex-col flex flex-1 space-y-4">
            <BlurFadeText
              delay={BLUR_FADE_DELAY}
              className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent"
              yOffset={8}
              text={`Hi, I'm ${DATA.name.split(' ')[0]} 👋`}
            />
            <BlurFade delay={BLUR_FADE_DELAY * 1.5}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground font-medium">Available for work</span>
              </div>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <div className="flex flex-wrap gap-2 pt-2">
                <div className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20 hover:bg-primary/15 transition-colors">
                  🔬 Data Scientist
                </div>
                <div className="px-3 py-1.5 bg-blue-500/10 text-blue-500 rounded-full text-sm font-medium border border-blue-500/20 hover:bg-blue-500/15 transition-colors">
                  💻 Full-Stack Dev
                </div>
                <div className="px-3 py-1.5 bg-purple-500/10 text-purple-500 rounded-full text-sm font-medium border border-purple-500/20 hover:bg-purple-500/15 transition-colors">
                  🤖 ML Engineer
                </div>
              </div>
            </BlurFade>
          </div>
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-blue-500 to-purple-500 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <Avatar className="relative size-28 sm:size-32 border-2 border-background shadow-xl ring-2 ring-background">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} className="object-cover" />
                <AvatarFallback className="text-xl font-bold bg-gradient-to-br from-primary to-blue-500 text-primary-foreground">{DATA.initials}</AvatarFallback>
              </Avatar>
            </div>
          </BlurFade>
        </div>

        {/* Description and achievements in one cohesive block */}
        <div className="space-y-6">
          <BlurFadeText
            className="max-w-[580px] text-lg md:text-xl text-muted-foreground leading-relaxed"
            delay={BLUR_FADE_DELAY * 3}
            text="Passionate about turning complex data into actionable business insights. I specialize in building end-to-end machine learning pipelines and scalable web applications that drive real value."
          />

          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
              <div className="text-center space-y-1 p-3 rounded-lg bg-green-500/5 border border-green-500/10">
                <div className="text-2xl font-bold text-green-500">92%</div>
                <div className="text-xs text-muted-foreground">Forecasting Accuracy</div>
              </div>
              <div className="text-center space-y-1 p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
                <div className="text-2xl font-bold text-blue-500">40%</div>
                <div className="text-xs text-muted-foreground">Conversion Improvements</div>
              </div>
              <div className="text-center space-y-1 p-3 rounded-lg bg-purple-500/5 border border-purple-500/10">
                <div className="text-2xl font-bold text-purple-500">3+</div>
                <div className="text-xs text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center space-y-1 p-3 rounded-lg bg-orange-500/5 border border-orange-500/10">
                <div className="text-2xl font-bold text-orange-500">1M+</div>
                <div className="text-xs text-muted-foreground">Daily Records</div>
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/10">
              <div className="w-1 h-16 bg-gradient-to-b from-primary to-purple-500 rounded-full flex-shrink-0 mt-1"></div>
              <div className="space-y-1">                <p className="text-sm text-muted-foreground italic leading-relaxed">
                &ldquo;I thrive at the intersection of data science and software engineering, creating solutions that bridge complex algorithms with user-friendly applications.&rdquo;
              </p>
                <p className="text-xs text-muted-foreground">
                  Currently pursuing Data Science at <span className="font-medium text-foreground">ESCOM-IPN</span>
                </p>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <h2 className="text-2xl font-bold">Work Experience</h2>
          </BlurFade>
          {DATA.work.map((work, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 6 + id * 0.05}
            >
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
            </BlurFade>
          ))}
        </div>
      </section>

      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-2xl font-bold">Education</h2>
          </BlurFade>
          {DATA.education.map((education, id) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            >
              <ResumeCard
                key={education.school}
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

      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3 items-center">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-2xl font-bold mb-6">Skills</h2>
          </BlurFade>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 w-full max-w-4xl">
            {skillCategories.map((category, index) => (
              <BlurFade key={category.title} delay={BLUR_FADE_DELAY * (10 + index)}>
                <ParticlesDemo title={category.title} skills={category.skills} />
              </BlurFade>
            ))}
          </div>
          <IconCloudDemo />

        </div>
      </section>


      <section id="projects">
        <div className="space-y-12 w-full">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">My Projects</h2>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Check out my latest work
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Here are some of my featured projects. View all projects to see more.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 w-full max-w-4xl">
            {DATA.projects.slice(0, 4).map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
                <div onClick={() => setSelectedProject(project)} className="cursor-pointer">
                  <ProjectCard
                    key={project.title}
                    title={project.title}
                    description={project.description}
                    dates={project.dates}
                    tags={project.technologies}
                    image={project.image}
                  />
                </div>
              </BlurFade>
            ))}
          </div>
          <div className="flex justify-center">
            <ShinyButton text={`View All Projects (${DATA.projects.length})`} href="projects" />
          </div>
        </div>
      </section>

      {/* Diálogo de proyecto */}
      {selectedProject && (
        <ProjectDialog
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          project={selectedProject}
        />
      )}      <section id="certifications">
        <h2 className="text-2xl font-bold">Certifications</h2>
        <MarqueeDemo />
      </section>
      <section id="contact">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold">Let&rsquo;s Build Something Amazing Together</h2>
              <h3 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Ready to Transform Data into Impact?
              </h3>              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                I&rsquo;m currently open to new opportunities in data science, machine learning, and full-stack development.
                Whether you need predictive analytics, web solutions, or data visualization dashboards, let&rsquo;s discuss how I can help drive your business forward.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
                <Link
                  href={DATA.contact.social.LinkedIn.url}
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium"
                >
                  Connect on LinkedIn
                </Link>
                <Link
                  href={`mailto:${DATA.contact.email}`}
                  className="inline-flex items-center px-6 py-3 rounded-lg border border-primary hover:bg-primary hover:text-primary-foreground transition-colors font-medium"
                >
                  Send Email
                </Link>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

    </main>
  );
}
