import React from 'react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { 
  CalendarDays, 
  Layers, 
  Link as LinkIcon, 
  ExternalLink,
  Globe,
  Github,
  PlayCircle
} from "lucide-react";

interface ProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    dates: string;
    technologies: string[];
    image?: {
      src: string;
      width: number;
      height: number;
    };
    video?: string;
    links?: Array<{
      type: string;
      href: string;
      icon: React.ReactNode;
    }>;
  };
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export function ProjectDialog({ isOpen, onClose, project }: ProjectDialogProps) {
  // Helper function to get the appropriate icon for link types
  const getLinkIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'github':
        return <Github className="w-5 h-5" />;
      case 'website':
        return <Globe className="w-5 h-5" />;
      case 'demo':
        return <PlayCircle className="w-5 h-5" />;
      default:
        return <ExternalLink className="w-5 h-5" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <ScrollArea className="h-[90vh]">
          <div className="p-6">
            <DialogHeader className="space-y-4">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.3 }}
              >
                <DialogTitle className="text-4xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    {project.title}
                  </span>
                </DialogTitle>
              </motion.div>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <CalendarDays className="w-4 h-4" />
                <span className="text-sm">{project.dates}</span>
              </div>
            </DialogHeader>

            <Tabs defaultValue="overview" className="mt-6">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  transition={{ duration: 0.4 }}
                >
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-lg leading-relaxed text-muted-foreground">
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
                    <Layers className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Technologies</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge 
                        key={tech} 
                        variant="secondary" 
                        className="px-3 py-1 text-sm hover:bg-secondary/80 transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </motion.div>

                {project.links && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    transition={{ duration: 0.6 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-2">
                      <LinkIcon className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-semibold">Project Links</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {project.links.map((link) => (
                        <Link
                          key={link.type}
                          href={link.href}
                          target="_blank"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg 
                            bg-primary/10 hover:bg-primary/20 transition-all hover:scale-105
                            border border-primary/20 hover:border-primary/40"
                        >
                          {getLinkIcon(link.type)}
                          <span>{link.type}</span>
                        </Link>
                      ))}
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
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      {project.video ? (
                        <video 
                          controls 
                          src={project.video} 
                          className="w-full aspect-video object-cover"
                        />
                      ) : project.image && (
                        <div className="relative aspect-video">
                          <Image
                            src={project.image.src}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default ProjectDialog;