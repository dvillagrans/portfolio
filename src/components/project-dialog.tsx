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
import { motion } from "framer-motion";
import Link from "next/link";

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
      <DialogContent className="max-w-3xl h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {project.dates}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Imagen del proyecto */}
          {project.image && (
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src={project.image.src}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Descripción */}
          <p className="text-lg leading-relaxed">{project.description}</p>

          {/* Tecnologías */}
          <div className="space-y-2">
            <h3 className="font-semibold">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Enlaces */}
          {project.links && (
            <div className="flex gap-4">
              {project.links.map((link) => (
                <Link
                  key={link.type}
                  href={link.href}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                  target="_blank"
                >
                  {link.icon}
                  {link.type}
                </Link>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
