"use client"

import React, { useState, useEffect, useRef } from 'react';
import { 
  motion, 
  AnimatePresence, 
  useMotionValue, 
  useSpring, 
  useTransform, 
  useInView 
} from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { 
  CalendarDays, 
  Layers, 
  Link as LinkIcon, 
  ExternalLink,
  Globe,
  Github,
  PlayCircle,
  Code,
  X,
  Calendar,
  ArrowUpRight,
  ChevronRight,
  Check,
  AlertCircle,
  FileCode,
  Rocket,
  Sparkles,
  Users,
  Terminal,
  BarChart,
  Trophy,
  CheckCircle,
  Lightbulb,
  Zap,
  Star,
  Gauge,
} from "lucide-react";
import { useI18n } from "@/contexts/i18n-context";

interface ProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    dates: string;
    active?: boolean;
    technologies: string[];
    image?: {
      src: string;
      width?: number;
      height?: number;
    };
    video?: string;
    links?: Array<{
      type: string;
      href: string;
      icon: React.ReactNode;
    }>;
    // Para mostrar métricas de impacto en una nueva pestaña
    impact?: {
      metrics?: Array<{
        value: string;
        label: string;
        icon?: React.ReactNode;
      }>;
      highlights?: string[];
      testimonial?: {
        quote: string;
        author: string;
        role?: string;
      };
    };
    // Detalles técnicos adicionales para la pestaña de descripción
    technicalDetails?: {
      architecture?: string;
      challenges?: string[];
      solutions?: string[];
      futureImprovements?: string[];
    };
  };
}

// Animaciones avanzadas
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 10 }
  }
};

const scaleUp = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      duration: 0.5, 
      ease: [0.22, 1, 0.36, 1] 
    } 
  }
};

// Animación de aparición desde abajo con rebote
const slideUp = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 150,
      damping: 15,
      mass: 1
    }
  }
};

// Animación de desplazamiento 3D para cards
const tiltCard = {
  rest: { 
    scale: 1,
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
  hover: { 
    scale: 1.02,
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 17
    }
  }
};

// Animación de revelado tipo telón
const curtainReveal = {
  initial: { clipPath: 'inset(0 100% 0 0)' },
  animate: { 
    clipPath: 'inset(0 0% 0 0)',
    transition: { 
      duration: 0.8, 
      ease: [0.645, 0.045, 0.355, 1.000] 
    }
  }
};

// Componentes de UI reutilizables
const TagPill = ({ children, color = "default" }: { children: React.ReactNode; color?: string }) => {
  const colorClasses: Record<string, string> = {
    default: "bg-primary/10 text-primary border-primary/20",
    blue: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    green: "bg-green-500/10 text-green-500 border-green-500/20",
    purple: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    amber: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    red: "bg-red-500/10 text-red-500 border-red-500/20",
    cyan: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
    pink: "bg-pink-500/10 text-pink-500 border-pink-500/20",
  };

  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border",
      colorClasses[color]
    )}>
      {children}
    </div>
  );
};

// Componente de tarjeta con efecto 3D
const Tilt3DCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-300, 300], [10, -10]);
  const rotateY = useTransform(x, [-300, 300], [-10, 10]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      className={cn("transition-all duration-200", className)}
      whileHover={{ scale: 1.02 }}
    >
      <motion.div
        style={{ scale: useTransform(y, [-100, 100], [0.98, 1.02]) }}
        className="h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

// Componente de métrica animada
const AnimatedMetric = ({ value, label, icon, delay = 0 }: { 
  value: string;
  label: string;
  icon?: React.ReactNode;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2 + delay, duration: 0.5 }}
      className="relative group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/5 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
      <div className="relative bg-background/50 backdrop-blur-sm p-5 rounded-xl border border-border/50 flex flex-col items-center text-center space-y-2 shadow-sm group-hover:shadow-md transition-shadow">
        {icon && <div className="p-2 rounded-full bg-primary/10 text-primary mb-2">{icon}</div>}
        <h4 className="text-2xl md:text-3xl font-bold text-foreground/90">{value}</h4>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </motion.div>
  );
};

export function ProjectDialog({ isOpen, onClose, project }: ProjectDialogProps) {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState("overview");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [particles, setParticles] = useState<Array<{w:number,h:number,left:string,top:string,y:number,duration:number}>>([])
  
  // Valores para animaciones interactivas
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 300 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  
  // Efectos de parallax para la imagen de fondo
  const moveX = useTransform(springX, [-100, 100], [10, -10]);
  const moveY = useTransform(springY, [-100, 100], [10, -10]);
  
  // Handler para actualizar la posición del mouse
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };
  
  // Reset la posición en mouse leave
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Efecto para manejar teclas de escape
  useEffect(() => {
    setParticles(Array.from({ length: 6 }).map(() => ({
      w: Math.random() * 50 + 20,
      h: Math.random() * 50 + 20,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      y: Math.random() * 30 - 15,
      duration: Math.random() * 5 + 5,
    })));

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Helper function para iconos de tecnologías
  const getTechIcon = (tech: string) => {
    const techLower = tech.toLowerCase();
    if (techLower.includes('react')) return <span className="text-blue-400">⚛️</span>;
    if (techLower.includes('python')) return <span>🐍</span>;
    if (techLower.includes('javascript') || techLower.includes('js')) return <span className="text-yellow-400">🟨</span>;
    if (techLower.includes('typescript') || techLower.includes('ts')) return <span className="text-blue-500">🔷</span>;
    if (techLower.includes('api')) return <span>🔌</span>;
    if (techLower.includes('ai') || techLower.includes('ml') || techLower.includes('inteligencia')) return <span>🤖</span>;
    if (techLower.includes('cloud') || techLower.includes('nube')) return <span>☁️</span>;
    if (techLower.includes('data') || techLower.includes('datos')) return <span>📊</span>;
    if (techLower.includes('node')) return <span className="text-green-500">🟢</span>;
    if (techLower.includes('aws')) return <span>🔶</span>;
    if (techLower.includes('azure')) return <span className="text-blue-600">🔷</span>;
    if (techLower.includes('docker') || techLower.includes('container')) return <span className="text-blue-400">🐳</span>;
    if (techLower.includes('firebase')) return <span className="text-yellow-500">🔥</span>;
    if (techLower.includes('mongo')) return <span className="text-green-600">🍃</span>;
    if (techLower.includes('sql')) return <span className="text-blue-300">💾</span>;
    if (techLower.includes('graphql')) return <span className="text-pink-500">⬢</span>;
    if (techLower.includes('next')) return <span>⚡</span>;
    return <span>🔧</span>;
  };

  // Helper function para obtener el icono apropiado para cada tipo de enlace
  const getLinkIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'github':
        return <Github className="w-5 h-5" />;
      case 'website':
        return <Globe className="w-5 h-5" />;
      case 'source':
        return <FileCode className="w-5 h-5" />;
      case 'demo':
      case 'live':
        return <Rocket className="w-5 h-5" />;
      case 'code':
        return <Terminal className="w-5 h-5" />;
      default:
        return <ArrowUpRight className="w-5 h-5" />;
    }
  };

  // Helper function para obtener el color de fondo según el tipo de enlace
  const getLinkStyle = (type: string) => {
    const baseStyle = "relative overflow-hidden group flex items-center gap-3 px-5 py-3 rounded-lg transition-all duration-300";
    const hoverEffect = "hover:shadow-lg hover:shadow-primary/20 hover:translate-y-[-2px]";
    
    switch (type.toLowerCase()) {
      case 'github':
        return `${baseStyle} ${hoverEffect} bg-neutral-900 text-white`;
      case 'website':
      case 'live':
        return `${baseStyle} ${hoverEffect} bg-blue-600 text-white`;
      case 'demo':
        return `${baseStyle} ${hoverEffect} bg-green-600 text-white`;
      case 'source':
        return `${baseStyle} ${hoverEffect} bg-purple-600 text-white`;
      default:
        return `${baseStyle} ${hoverEffect} bg-primary text-primary-foreground`;
    }
  };

  // Helper function para obtener el color de gradiente según el tipo de enlace
  const getLinkColor = (type: string) => {    
    switch (type.toLowerCase()) {
      case 'github':
        return 'from-neutral-800 to-neutral-900 text-white';
      case 'website':
      case 'live':
        return 'from-blue-500 to-blue-600 text-white';
      case 'demo':
        return 'from-green-500 to-green-600 text-white';
      case 'source':
        return 'from-purple-500 to-purple-600 text-white';
      default:
        return 'from-primary/90 to-primary text-primary-foreground';
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent 
            className="max-w-6xl max-h-[90vh] p-0 rounded-2xl overflow-hidden border-none shadow-[0_0_50px_10px_rgba(0,0,0,0.15)] dark:shadow-primary/5"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <DialogTitle className="sr-only">{project.title}</DialogTitle>
            {/* Botón de cerrar */}
            <motion.div 
              className="absolute top-5 right-5 z-50"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <DialogClose className="group flex items-center gap-1 px-3 py-1.5 rounded-full bg-background/70 backdrop-blur-md hover:bg-background shadow-lg border border-border/50 transition-all">
                <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground">ESC</span>
                <X className="h-4 w-4" />
              </DialogClose>
            </motion.div>

            <ScrollArea className="h-[90vh]">
              {/* Hero Banner con parallax */}
              <motion.div 
                className="relative h-[40vh] md:h-[50vh] overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: imageLoaded ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {project.image && (
                  <motion.div
                    className="absolute inset-0 scale-[1.05]" // Escala para evitar bordes blancos durante animación
                    style={{ x: moveX, y: moveY }}
                    transition={{ type: "spring", stiffness: 50, damping: 30 }}
                  >
                    <Image
                      src={project.image.src}
                      alt={project.title}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 70vw"
                      priority
                      onLoad={() => setImageLoaded(true)}
                    />
                    {/* Overlay de gradiente con partículas */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.85 }}
                      transition={{ duration: 0.8 }}
                    >
                      {/* Efecto de partículas flotantes */}
                      <div className="absolute inset-0 overflow-hidden">
                        {particles.map((p, i) => (
                          <motion.div
                            key={i}
                            className="absolute rounded-full bg-primary/20 blur-md"
                            style={{
                              width: p.w,
                              height: p.h,
                              left: p.left,
                              top: p.top,
                            }}
                            animate={{
                              y: [0, p.y],
                              opacity: [0.3, 0.7, 0.3],
                            }}
                            transition={{
                              duration: p.duration,
                              repeat: Infinity,
                              repeatType: 'reverse',
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
                
                {/* Información del proyecto en el hero */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 z-10">
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="space-y-3"
                  >
                    {/* Status badges */}
                    <motion.div variants={staggerItem} className="flex gap-3 mb-3">
                      {project.active && (
                        <TagPill color="green">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                          </span>
                          {t('projects.activeProject')}
                        </TagPill>
                      )}
                      <TagPill color="blue">
                        <Calendar className="w-3.5 h-3.5" />
                        {project.dates}
                      </TagPill>
                    </motion.div>
                    
                    {/* Título con efecto de máscara */}
                    <motion.h1 
                      variants={staggerItem}
                      className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter"
                    >
                      <span className="bg-gradient-to-r from-white via-white/95 to-white/80 bg-clip-text text-transparent drop-shadow-sm">
                        {project.title}
                      </span>
                    </motion.h1>
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div 
                className="px-6 py-8 md:p-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Tabs defaultValue="overview" onValueChange={setActiveTab} className="mt-2">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <TabsList className="grid w-full grid-cols-3 mb-10 rounded-full p-1.5 bg-muted/30 border border-border/50 shadow-inner">
                      <TabsTrigger 
                        value="overview" 
                        className="rounded-full data-[state=active]:bg-background data-[state=active]:shadow"
                      >
                        <span className="flex items-center gap-2 px-2">
                          <Layers className="w-4 h-4" />
                          <span className="font-medium">{t('projects.description')}</span>
                        </span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="preview"
                        className="rounded-full data-[state=active]:bg-background data-[state=active]:shadow"
                      >
                        <span className="flex items-center gap-2 px-2">
                          <PlayCircle className="w-4 h-4" />
                          <span className="font-medium">{t('projects.preview')}</span>
                        </span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="impact"
                        className="rounded-full data-[state=active]:bg-background data-[state=active]:shadow"
                      >
                        <span className="flex items-center gap-2 px-2">
                          <BarChart className="w-4 h-4" />
                          <span className="font-medium">{t('projects.impact')}</span>
                        </span>
                      </TabsTrigger>
                    </TabsList>
                  </motion.div>

                  <TabsContent value="overview" className="space-y-8">
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={fadeIn}
                      transition={{ duration: 0.4 }}
                    >
                      <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-background to-muted/30">
                        <CardContent className="pt-6">
                          <p className="text-lg leading-relaxed text-foreground/90">
                            {project.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={fadeIn}
                      transition={{ duration: 0.5 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-md bg-primary/10">
                          <Layers className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold">{t('projects.technologies')}</h3>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {project.technologies.map((tech, index) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + (index * 0.05) }}
                            whileHover={{ scale: 1.05, y: -3 }}
                            whileTap={{ scale: 0.98 }}
                            className="relative group"
                          >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-background opacity-0 group-hover:opacity-100 rounded-md blur transition duration-300"></div>
                            <Badge 
                              variant="secondary" 
                              className="relative w-full h-full px-4 py-2 flex items-center justify-center text-sm bg-gradient-to-r from-muted to-muted/60 hover:from-muted/80 transition-colors cursor-default border border-border/50"
                            >
                              <span className="mr-1.5">{getTechIcon(tech)}</span>
                              {tech}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {project.links && project.links.length > 0 && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        transition={{ duration: 0.6 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-md bg-primary/10">
                            <LinkIcon className="w-5 h-5 text-primary" />
                          </div>
                          <h3 className="text-lg font-semibold">{t('projects.links')}</h3>
                        </div>
                        
                        <div className="flex flex-wrap gap-3">
                          {project.links.map((link, index) => (
                            <motion.div
                              key={link.type}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 + (index * 0.1), type: "spring", stiffness: 200, damping: 15 }}
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              className="relative group"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                              <Link
                                href={link.href}
                                target="_blank"
                                className={`relative inline-flex items-center gap-2 px-4 py-3 rounded-lg 
                                  transition-all shadow-md hover:shadow-lg bg-gradient-to-r ${getLinkColor(link.type)}`}
                              >
                                <span className="flex items-center justify-center w-5 h-5">{getLinkIcon(link.type)}</span>
                                <span className="font-medium">{link.type}</span>
                                <motion.span
                                  initial={{ opacity: 0, x: -5 }}
                                  animate={{ opacity: 0, x: -5 }}
                                  whileHover={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="ml-1"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                </motion.span>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                        
                        <div className="mt-6 p-4 rounded-lg border border-border/50 bg-muted/30">
                          <div className="flex items-start gap-2">
                            <div className="p-1 rounded-full bg-blue-500/20 text-blue-500 mt-0.5">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {t('projects.clickLinks')}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="preview" className="space-y-6">
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={fadeIn}
                      transition={{ duration: 0.4 }}
                    >
                      <Tilt3DCard>
                        <Card className="overflow-hidden border-0 shadow-xl">
                          <CardContent className="p-0">                        
                            {project.video ? (
                              <div className="relative aspect-video">
                                <video 
                                  controls 
                                  src={project.video} 
                                  className="w-full h-full object-cover"
                                  poster={project.image?.src}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileHover={{ opacity: 1, scale: 1 }}
                                    className="flex items-center justify-center rounded-full bg-background/80 p-4 backdrop-blur-md shadow-lg"
                                  >
                                    <PlayCircle className="w-8 h-8 text-primary" />
                                  </motion.div>
                                </div>
                              </div>
                            ) : project.image && (
                              <div className="relative aspect-video overflow-hidden">
                                <div className="absolute inset-0">
                                  <Image 
                                    src={project.image.src}
                                    alt={project.title}
                                    fill
                                    className="object-cover object-center"
                                    sizes="(max-width: 768px) 100vw, 70vw"
                                  />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-center pb-8">
                                  <motion.span 
                                    initial={{ y: 20, opacity: 0 }}
                                    whileHover={{ y: 0, opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="text-white font-medium px-6 py-3 rounded-full bg-black/40 backdrop-blur-md shadow-xl"
                                  >
                                    {project.title}
                                  </motion.span>
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </Tilt3DCard>
                      
                      <div className="mt-6 p-4 rounded-lg border border-border/30 bg-muted/20 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {project.video ? (
                            <>
                              <PlayCircle className="w-4 h-4 text-primary" />
                              <p className="text-sm text-muted-foreground">
                                {t('projects.playVideo')}
                              </p>
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4 text-primary" />
                              <p className="text-sm text-muted-foreground">
                                {t('projects.previewDescription')}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </TabsContent>
                  
                  {/* Nueva pestaña de Impacto */}
                  <TabsContent value="impact" className="space-y-8">
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={staggerContainer}
                      transition={{ delayChildren: 0.2 }}
                    >
                      {/* Métricas destacadas con animación */}
                      <motion.div variants={staggerItem} className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="p-1.5 rounded-md bg-primary/10">
                            <BarChart className="w-5 h-5 text-primary" />
                          </div>
                          <h3 className="text-lg font-semibold">{t('projects.metricsResults')}</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Métricas por defecto si no hay personalizadas */}
                          {!project.impact?.metrics ? (
                            <>
                              <AnimatedMetric 
                                value="100%" 
                                label={t('projects.completionRate')}
                                icon={<CheckCircle className="w-6 h-6" />}
                                delay={0.1}
                              />
                              <AnimatedMetric 
                                value="5 de 5" 
                                label={t('projects.clientRating')} 
                                icon={<Star className="w-6 h-6" />}
                                delay={0.2}
                              />
                              <AnimatedMetric 
                                value="A+" 
                                label={t('projects.qualityGrade')} 
                                icon={<Gauge className="w-6 h-6" />}
                                delay={0.3}
                              />
                            </>
                          ) : (
                            // Métricas personalizadas del proyecto
                            project.impact.metrics.map((metric, index) => (
                              <AnimatedMetric 
                                key={metric.label}
                                value={metric.value} 
                                label={metric.label}
                                icon={metric.icon || <Trophy className="w-6 h-6" />}
                                delay={0.1 * index}
                              />
                            ))
                          )}
                        </div>
                      </motion.div>
                      
                      {/* Puntos destacados o logros */}
                      <motion.div variants={staggerItem} className="mb-8">
                        <Tilt3DCard className="overflow-hidden">
                          <Card className="border-0 shadow-lg bg-gradient-to-br from-background via-background to-primary/5">
                            <CardContent className="p-6">
                              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-primary" />
                                <span>{t('projects.achievements')}</span>
                              </h3>
                              
                              <ul className="space-y-3">
                                {project.impact?.highlights ? (
                                  project.impact.highlights.map((highlight, index) => (
                                    <motion.li 
                                      key={index}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.3 + (index * 0.1) }}
                                      className="flex items-start gap-2"
                                    >
                                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                      <span className="text-foreground/90">{highlight}</span>
                                    </motion.li>
                                  ))
                                ) : (
                                  // Datos de ejemplo
                                  <>
                                    <motion.li 
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.3 }}
                                      className="flex items-start gap-2"
                                    >
                                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                      <span className="text-foreground/90">{t('projects.completedRequirements')}</span>
                                    </motion.li>
                                    <motion.li 
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.4 }}
                                      className="flex items-start gap-2"
                                    >
                                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                      <span className="text-foreground/90">{t('projects.additionalFeatures')}</span>
                                    </motion.li>
                                    <motion.li 
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.5 }}
                                      className="flex items-start gap-2"
                                    >
                                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                      <span className="text-foreground/90">{t('projects.optimizedCode')}</span>
                                    </motion.li>
                                  </>
                                )}
                              </ul>
                            </CardContent>
                          </Card>
                        </Tilt3DCard>
                      </motion.div>
                      
                      {/* Testimonio o feedback */}
                      {project.impact?.testimonial && (
                        <motion.div variants={staggerItem} className="mb-4">
                          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-0 shadow-lg relative overflow-hidden">
                            <CardContent className="p-6">
                              <div className="absolute top-0 right-0 opacity-5 text-primary">
                                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M10 11L8 13H5C4.44772 13 4 12.5523 4 12V8C4 7.44772 4.44772 7 5 7H9C9.55228 7 10 7.44772 10 8V11ZM19 11L17 13H14C13.4477 13 13 12.5523 13 12V8C13 7.44772 13.4477 7 14 7H18C18.5523 7 19 7.44772 19 8V11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>
                              <div className="mb-3 text-lg italic text-foreground/90">
                                &ldquo;{project.impact.testimonial.quote}&rdquo;
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                                  <Users className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                  <p className="font-medium text-foreground">{project.impact.testimonial.author}</p>
                                  {project.impact.testimonial.role && (
                                    <p className="text-xs text-muted-foreground">{project.impact.testimonial.role}</p>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )}
                      
                      {/* Nota informativa */}
                      <motion.div variants={staggerItem} className="mt-8">
                        <div className="p-4 rounded-lg border border-blue-500/20 bg-blue-500/5 flex items-start gap-2">
                          <div className="p-1 rounded-full bg-blue-500/20 text-blue-500 mt-0.5">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {t('projects.metricsDisclaimer')}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
