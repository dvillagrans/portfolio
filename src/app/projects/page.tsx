"use client";
import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import Link from "next/link";

interface project {
  title: string;
  description: string;
  dates: string;
  technologies: string[];
  slug?: string;
  githubUrl?: string;
  projectUrl?: string;
  links?: { [key: string]: string };
  image?: string;
  video?: string;
  href?: string;
}
import { ArrowLeft, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { DATA } from "@/data/resume";
import { useProjectFilter } from "../../hooks/useProjectFilter";
import { ProjectDialog } from "@/components/project-dialog";

export default function ProjectsPage() {
  const { activeFilter, setActiveFilter, filteredProjects, categories } = useProjectFilter();
  const [isGridView, setIsGridView] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredProjectsBySearch = filteredProjects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.technologies.some((tech: string) => tech.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  return (
    <main className="min-h-[100dvh] bg-gradient-to-b from-background via-background/95 to-background/90">
      {/* Header (ya no sticky) */}
          <div className="backdrop-blur-xl border-b border-primary/10 bg-background/30">
        <div className="px-4 lg:px-8">
          {/* Header superior */}
          <div className="py-4 flex justify-between items-center">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors group bg-primary/5 px-4 py-2 rounded-full"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back
            </Link>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsGridView(!isGridView)}
                className="p-2.5 rounded-full hover:bg-primary/10 transition-colors bg-primary/5"
                aria-label={isGridView ? "Switch to list view" : "Switch to grid view"}
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Filtros reorganizados */}
          <div className="py-4 border-t border-primary/10 space-y-4">
            {/* Barra de búsqueda */}
            <div className="w-full max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full px-4 py-2.5 rounded-full bg-primary/5 border-none text-sm placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            
            {/* Filtros de categorías */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-1.5 rounded-full transition-all text-xs font-medium
                    ${activeFilter === category
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                      : "hover:bg-primary/10 bg-primary/5 hover:scale-105"
                    }`}
                >
                  {category === "all" ? "All Technologies" : category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 lg:px-8 py-12" style={{ maxWidth: "90rem" }}>
        <section className="space-y-12">
          {/* Título y descripción */}
          <BlurFade delay={0.1}>
            <div className="text-center space-y-4 mb-8">
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-primary/70">
                My Projects
              </h1>
              <p className="text-muted-foreground/80 text-lg max-w-2xl mx-auto">
                Explore my portfolio of {filteredProjects.length} projects across different areas of expertise
              </p>
            </div>
          </BlurFade>

          {/* Grid con click handler */}
          <AnimatePresence mode="wait">
            <motion.div 
              className={`
                grid gap-6 lg:gap-8
                ${isGridView 
                  ? 'grid-cols-1 md:grid-cols-2' // Modificado para mostrar solo 2 columnas
                  : 'grid-cols-1 max-w-4xl mx-auto'
                }
              `}
              layout
            >
              {filteredProjectsBySearch.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedProject(project)}
                  className="relative group cursor-pointer"
                >
                  <ProjectCard
                    href={project.href}
                    title={project.title}
                    description={project.description}
                    dates={project.dates}
                    tags={project.technologies}
                    image={project.image}
                    video={project.video}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Diálogo de proyecto */}
          {selectedProject && (
            <ProjectDialog
              isOpen={!!selectedProject}
              onClose={() => setSelectedProject(null)}
              project={selectedProject}
            />
          )}

          {/* CTA Section mejorada */}
          <BlurFade delay={0.8}>
            <div className="relative mt-20">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-3xl blur-2xl" />
              <div className="relative bg-background/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 text-center space-y-6 border border-primary/10">
                <h2 className="text-2xl font-bold">Lets Create Something Amazing</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Interested in collaborating or want to discuss a project? Im always open to new opportunities and challenges.
                </p>
                <div className="flex gap-4 justify-center">
                  <Link
                    href="https://www.linkedin.com/in/dvillagrans/"
                    className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-all hover:scale-105"
                  >
                    Get in Touch
                  </Link>
                  <Link
                    href={DATA.contact.social.GitHub.url}
                    className="inline-block px-8 py-4 border border-primary/20 rounded-full hover:bg-primary/5 transition-all hover:scale-105"
                  >
                    View GitHub
                  </Link>
                </div>
              </div>
            </div>
          </BlurFade>
        </section>
      </div>
    </main>
  );
}