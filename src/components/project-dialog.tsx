"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, LayersIcon, LinkIcon, RocketIcon } from "lucide-react";

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

export function ProjectDialog({ isOpen, onClose, project }: ProjectDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            {project.title}
          </DialogTitle>
          <DialogDescription className="flex items-center gap-2 text-muted-foreground">
            <CalendarIcon className="w-4 h-4" />
            {project.dates}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Descripción del proyecto */}
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed">{project.description}</p>
            </div>

            {/* Tecnologías */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <LayersIcon className="w-5 h-5" />
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="px-3 py-1">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Enlaces */}
            {project.links && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <LinkIcon className="w-5 h-5" />
                  Project Links
                </h3>
                <div className="flex flex-wrap gap-4">
                  {project.links.map((link) => (
                    <Link
                      key={link.type}
                      href={link.href}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-all hover:scale-105"
                      target="_blank"
                    >
                      {link.icon}
                      {link.type}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="preview" className="space-y-8">
            {/* Vista previa con video o imagen */}
            <div className="rounded-xl overflow-hidden border border-primary/10">
              {project.video && project.video !== "" ? (
                <video 
                  controls 
                  src={project.video} 
                  className="w-full aspect-video object-cover"
                />
              ) : project.image ? (
                <div className="relative aspect-video">
                  <Image
                    src={project.image.src}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : null}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
