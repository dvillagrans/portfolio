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
    <main className="flex flex-col min-h-[100dvh] space-y-10 max-w-2xl">
      <section id="hero">
        <div className="mx-auto w-full  space-y-8">
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                yOffset={8}
                text={`Hi, I'm ${DATA.name} 👋`}
              />
              <BlurFadeText
                className="max-w-[600px] md:text-xl"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className="size-28 sm:size-32 border">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-2xl font-bold">About</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <Markdown className="prose max-w-auto md:text-base text-pretty font-sans text-base text-muted-foreground dark:prose-invert">
            {DATA.summary}
          </Markdown>
        </BlurFade>
      </section>

      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
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
              <h2 className="text-2xl font-bold">Let's Build Something Amazing Together</h2>
              <h3 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Ready to Transform Data into Impact?
              </h3>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                I'm currently open to new opportunities in data science, machine learning, and full-stack development.
                Whether you need predictive analytics, web solutions, or data visualization dashboards, let's discuss how I can help drive your business forward.
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
