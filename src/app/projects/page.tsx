"use client";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ProjectGridSkeleton } from "@/components/project-card-skeleton";
import { StaggerContainer, StaggerItem, EnhancedCard } from "@/components/page-transition";
import Link from "next/link";
import { ArrowLeft, Search, Filter, X, Sparkles, Github, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { DATA } from "@/data/resume";
import { useProjectFilter } from "../../hooks/useProjectFilter";
import { ProjectDialog } from "@/components/project-dialog";
import ShinyButton from "@/components/magicui/shiny-button";

// Constantes para el efecto de desvanecimiento
const BLUR_FADE_DELAY = 0.04;

// Hook de parallax para el scroll
const useScrollParallax = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
};

// Componente de animación para elementos flotantes
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

// Intersection Observer hook para animaciones de scroll (optimizado)
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        // Dejar de observar después de la primera intersección para mejorar el rendimiento
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px', // Activar ligeramente antes de que el elemento entre en vista
      ...options
    });

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, options]);

  return [setRef, isIntersecting] as const;
};

// Componente para revelar con scroll (mejorado)
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
      ref={ref as React.LegacyRef<HTMLDivElement>}
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

export default function ProjectsPage() {
  const { activeFilter, setActiveFilter, filteredProjects, categories, categoryNames } = useProjectFilter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const scrollY = useScrollParallax();

  // Simular carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const filteredProjectsBySearch = filteredProjects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.technologies.some((tech: string) => tech.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Hero Section con Parallax */}
      <section className="relative py-10 md:py-12 space-y-6 overflow-hidden">
        <div className="mx-auto w-full">
          {/* Partículas flotantes con parallax y efectos visuales mejorados */}
          <div
            className="absolute top-12 right-10 w-2 h-2 bg-primary rounded-full animate-sparkle opacity-60"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          ></div>
          <div
            className="absolute top-28 left-16 w-1.5 h-1.5 bg-blue-500 rounded-full animate-sparkle opacity-80"
            style={{
              animationDelay: '1s',
              transform: `translateY(${scrollY * 0.15}px)`
            }}
          ></div>
          <div
            className="absolute bottom-16 left-1/3 w-1 h-1 bg-purple-500 rounded-full animate-sparkle opacity-70"
            style={{
              animationDelay: '2s',
              transform: `translateY(${scrollY * 0.2}px)`
            }}
          ></div>
          {/* Nueva partícula brillante */}
          <div
            className="absolute top-40 right-1/4 w-1 h-1 bg-teal-400 rounded-full animate-sparkle opacity-75"
            style={{
              animationDelay: '1.5s',
              transform: `translateY(${scrollY * 0.12}px)`
            }}
          ></div>
          
          {/* Navegación superior mejorada */}
          <div className="flex justify-start items-center mb-8">
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full bg-background/50 border border-border/50 hover:bg-background/80 hover:border-primary/30 transition-all group shadow-sm backdrop-blur-sm"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1.5" />
                <span>Volver</span>
              </Link>
            </BlurFade>
          </div>
          
          {/* Cabecera mejorada con efectos visuales */}
          <div className="space-y-4 relative">
            {/* Efecto de luz difuminada detrás del título */}
            <div className="absolute -top-2 -left-5 w-32 h-32 bg-gradient-to-br from-primary/30 via-blue-500/20 to-transparent rounded-full blur-2xl opacity-60 -z-10"></div>

            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                Mis proyectos
              </h1>
            </BlurFade>

            <BlurFadeText
              className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-[520px]"
              delay={BLUR_FADE_DELAY * 3}
              text="Una colección de mi trabajo en ciencia de datos, desarrollo web y aprendizaje automático. Cada proyecto refleja mi pasión por crear soluciones efectivas."
            />

            <BlurFade delay={BLUR_FADE_DELAY * 3.5}>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground font-medium">
                  {filteredProjects.length} proyectos en total
                  {activeFilter !== 'all' && ` • Filtrando por: ${categoryNames[activeFilter] || activeFilter}`}
                </span>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>
      
      {/* Barra de búsqueda y filtros mejorada */}
      <ScrollReveal animation="fade-in-up" delay={300}>
        <div className="space-y-4 relative">
          {/* Efecto de luz difuminada */}
          <div className="absolute -bottom-4 right-10 w-40 h-40 bg-gradient-to-tl from-blue-500/20 via-primary/10 to-transparent rounded-full blur-2xl opacity-50 -z-10"></div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Búsqueda mejorada */}
            <div className="relative flex-1 group">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-blue-500/30 opacity-0 blur transition-all duration-300 group-hover:opacity-100 -z-10"></div>
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Buscar proyectos por nombre o tecnología..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-background/60 backdrop-blur-sm border border-border/50 text-sm placeholder:text-muted-foreground/60 focus:border-primary/40 focus:ring-2 focus:ring-primary/20 transition-all shadow-sm group-hover:border-primary/30"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute inset-y-0 right-3 flex items-center"
                >
                  <X className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                </button>
              )}
            </div>
            
            {/* Botón de filtros mejorado con diseño más creativo */}
            <div className="relative group">
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/30 via-blue-500/30 to-purple-500/30 opacity-0 blur transition-all duration-300 group-hover:opacity-100 -z-10"></div>
              <button
                onClick={handleToggleFilters}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all shadow-sm z-10 overflow-hidden ${showFilters
                  ? 'bg-gradient-to-r from-primary via-primary/95 to-primary/90 text-primary-foreground border border-primary/40 shadow-lg shadow-primary/25'
                  : 'bg-background/60 backdrop-blur-sm border border-border/50 hover:border-primary/40 hover:shadow-md'
                  }`}
              >
                {/* Efecto de onda en el fondo */}
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 ${showFilters ? 'translate-x-0' : '-translate-x-full group-hover:translate-x-full'
                  }`}></div>

                {/* Icono animado */}
                <div className="relative">
                  <Filter className={`w-4 h-4 transition-all duration-300 ${showFilters ? 'rotate-180 animate-pulse' : 'group-hover:rotate-12'
                    }`} />
                </div>

                {/* Texto con animación */}
                <span className="relative font-medium">
                  {showFilters ? "Ocultar filtros" : "Mostrar filtros"}
                </span>

                {/* Badge del filtro activo */}
                {activeFilter !== 'all' && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    className={`relative flex items-center gap-1 text-xs py-1 px-2 rounded-full ml-1 ${showFilters
                      ? 'bg-primary-foreground/20 text-primary-foreground'
                      : 'bg-primary/10 text-primary border border-primary/20'
                      }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${showFilters ? 'bg-primary-foreground/60' : 'bg-primary animate-pulse'
                      }`}></div>
                    <span className="font-medium capitalize">{categoryNames[activeFilter] || activeFilter}</span>
                  </motion.div>
                )}

                {/* Indicador de estado */}
                <div className={`absolute top-1 right-1 w-2 h-2 rounded-full transition-all duration-300 ${showFilters
                  ? 'bg-primary-foreground/60 animate-pulse'
                  : 'bg-primary/40 group-hover:bg-primary group-hover:animate-bounce'
                  }`}></div>
              </button>
            </div>
          </div>
          
          {/* Panel de filtros desplegable mejorado con diseño más creativo */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0, rotateX: -15 }}
                animate={{ height: 'auto', opacity: 1, rotateX: 0 }}
                exit={{ height: 0, opacity: 0, rotateX: -15 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="overflow-hidden perspective-1000"
              >
                <div className="relative p-6 bg-background/60 backdrop-blur-sm border border-border/50 rounded-xl shadow-lg">
                  {/* Header creativo del panel */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-primary/10 rounded-lg">
                        <Filter className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground">Filtrar por categoría</span>
                    </div>
                    <div className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                      {categories.length} categorías
                    </div>
                  </div>

                  {/* Línea decorativa */}
                  <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-4"></div>

                  {/* Grid de filtros con diseño más creativo */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    {categories.map((category, index) => (
                      <motion.button
                        key={category}
                        onClick={() => setActiveFilter(category)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className={`group relative px-3 py-2.5 rounded-xl transition-all text-xs font-medium overflow-hidden
                          ${activeFilter === category
                            ? "bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground shadow-lg shadow-primary/25 border border-primary/40"
                            : "bg-background/80 hover:bg-primary/5 border border-border/40 hover:border-primary/30 hover:shadow-md"
                          }`}
                      >
                        {/* Efecto de brillo en hover */}
                        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ${activeFilter === category ? 'opacity-20' : 'opacity-0 group-hover:opacity-100'
                          }`}></div>                        {/* Contenido del filtro */}
                        <div className="relative flex items-center justify-center gap-1.5">
                          {category === "all" ? (
                            <>
                              <Sparkles className={`w-3 h-3 ${activeFilter === category ? 'animate-pulse' : 'group-hover:animate-bounce'}`} />
                              <span>{categoryNames[category]}</span>
                            </>
                          ) : (
                            <>
                              <div className={`w-2 h-2 rounded-full transition-all ${activeFilter === category
                                ? 'bg-primary-foreground animate-pulse'
                                : 'bg-primary/60 group-hover:bg-primary group-hover:animate-bounce'
                                }`}></div>
                              <span className="capitalize">{categoryNames[category] || category}</span>
                            </>
                          )}
                        </div>

                        {/* Contador de proyectos por categoría */}
                        {activeFilter === category && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 w-4 h-4 bg-primary-foreground text-primary rounded-full flex items-center justify-center text-[10px] font-bold"
                          >
                            {filteredProjects.length}
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>

                  {/* Footer del panel con estadísticas */}
                  <div className="mt-4 pt-3 border-t border-border/30">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        Mostrando {filteredProjectsBySearch.length} de {DATA.projects.length} proyectos
                      </span>
                      {activeFilter !== 'all' && (
                        <motion.button
                          onClick={() => setActiveFilter('all')}
                          className="text-primary hover:text-primary/80 font-medium hover:underline"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Limpiar filtros
                        </motion.button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScrollReveal>      {/* Proyectos filtrados mejorados */}
      <ScrollReveal animation="fade-in-up" delay={400}>
        <div className="space-y-8 relative">
          {/* Efecto de luz difuminada para el fondo */}
          <div className="absolute -top-10 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-primary/5 rounded-full blur-3xl opacity-40 -z-10"></div>

          {filteredProjectsBySearch.length === 0 ? (
            <div className="text-center py-20 relative">
              <BlurFade delay={BLUR_FADE_DELAY * 5}>
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 rounded-full bg-background/70 border border-border/50 shadow-lg">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                    No se encontraron proyectos
                  </h3>
                  <p className="text-muted-foreground max-w-md">
                    No se encontraron proyectos que coincidan con &ldquo;{searchQuery}&rdquo;
                    {activeFilter !== 'all' && ` en la categoría &ldquo;${activeFilter}&rdquo;`}.
                  </p>
                  <div className="mt-4 relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-blue-500/30 opacity-0 rounded-full blur transition-all duration-300 group-hover:opacity-100"></div>
                    <button
                      onClick={handleClearSearch}
                      className="relative px-4 py-2 rounded-full bg-background/60 backdrop-blur-sm border border-border/50 hover:border-primary/40 text-sm font-medium text-foreground transition-all shadow-sm"
                    >
                      Limpiar búsqueda
                    </button>
                  </div>
                </div>
              </BlurFade>
            </div>
          ) : (
            isLoading ? (
              <ProjectGridSkeleton count={6} />
            ) : (
              <AnimatePresence mode="wait">
                <StaggerContainer className="grid gap-6 lg:gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {filteredProjectsBySearch.map((project, index) => (
                    <StaggerItem key={project.title} index={index}>
                      <EnhancedCard
                        onClick={() => setSelectedProject(project)}
                        className="cursor-pointer group relative h-full"
                      >
                        {/* Efecto de brillo mejorado */}
                        <div className="absolute -inset-1.5 bg-gradient-to-br from-primary/30 via-blue-500/20 to-purple-500/30 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition duration-300 group-hover:duration-200"></div>

                        {/* Contenido del proyecto */}
                        <div className="relative bg-background/70 backdrop-blur-sm h-full rounded-lg overflow-hidden border border-border/50 group-hover:border-primary/30 shadow-sm group-hover:shadow-md">
                          <ProjectCard
                            title={project.title}
                            description={project.description}
                            dates={project.dates}
                            tags={project.technologies}
                            image={project.image}
                          />

                          {/* Indicador de clic */}
                          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition duration-300">
                            <div className="p-1.5 rounded-full bg-background/80 border border-border/50 text-primary backdrop-blur-sm">
                              <ExternalLink className="w-3 h-3" />
                            </div>
                          </div>
                        </div>
                      </EnhancedCard>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </AnimatePresence>
            )
          )}
        </div>
      </ScrollReveal>      {/* Sección CTA mejorada con efectos visuales modernos */}
      <ScrollReveal animation="fade-in-up" delay={600}>
        <div className="py-16 pt-20">
          <div className="relative">
            {/* Efectos de luz mejorados para el fondo */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-blue-500/15 to-purple-500/20 rounded-3xl blur-2xl opacity-70" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl" />

            {/* Contenedor principal */}
            <div className="relative bg-background/60 backdrop-blur-xl rounded-2xl p-6 md:p-10 pt-12 md:pt-16 text-center space-y-6 border border-border/50 shadow-xl overflow-visible">
              {/* Decoración superior */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <FloatingElement>
                  <div className="p-3 bg-background/80 backdrop-blur-sm rounded-full border border-primary/30 shadow-lg">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                </FloatingElement>
              </div>

              {/* Líneas decorativas */}
              <div className="absolute inset-0 overflow-hidden opacity-10">
                <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent"></div>
                <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent"></div>
                <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
              </div>

              {/* Título con efectos visuales */}
              <BlurFade delay={0.1}>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mt-4 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                  ¿Creamos algo increíble juntos?
                </h2>
              </BlurFade>

              {/* Descripción */}
              <BlurFadeText
                className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg"
                delay={0.2}
                text="¿Interesado en colaborar o quieres discutir un proyecto? Siempre estoy abierto a nuevas oportunidades y desafíos."
              />                {/* Botones de contacto con efectos visuales mejorados */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 pb-2">
                {/* Botón LinkedIn */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl blur opacity-25 group-hover:opacity-75 group-hover:animate-pulse transition duration-500"></div>
                  <Link
                    href={DATA.contact.social.LinkedIn.url}
                    className="relative inline-flex items-center px-5 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-95 text-sm"
                  >
                    <span className="mr-2">💼</span>
                    Conecta en LinkedIn
                  </Link>
                </div>

                {/* Botón GitHub */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-neutral-800 to-neutral-900 rounded-xl blur opacity-25 group-hover:opacity-75 group-hover:animate-pulse transition duration-500"></div>
                  <Link
                    href={DATA.contact.social.GitHub.url}
                    className="relative inline-flex items-center px-5 py-2.5 rounded-xl bg-neutral-800 text-white hover:bg-neutral-900 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-95 text-sm"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Ver GitHub
                  </Link>
                </div>

                {/* Botón Email */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/80 rounded-xl blur opacity-25 group-hover:opacity-75 group-hover:animate-pulse transition duration-500"></div>
                  <Link
                    href={`mailto:${DATA.contact.email}`}
                    className="relative inline-flex items-center px-5 py-2.5 rounded-xl border border-primary bg-background hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-95 text-sm"
                  >
                    <span className="mr-2">✉️</span>
                    Enviar Email
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Diálogo de proyecto */}
      {selectedProject && (
        <ProjectDialog
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          project={selectedProject}
        />
      )}
    </main>
  );
}