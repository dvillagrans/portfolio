import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";
import { trackProjectView } from "@/components/analytics";

interface ProjectCardProps {
  title: string;
  description: string;
  dates: string;
  tags: readonly string[];
  image?: {
    src: string;
    width?: number;
    height?: number;
  };
  video?: string;
  onClick?: () => void;
  href?: string;
}

export function ProjectCard({
  title,
  description,
  dates,
  tags,
  image,
  onClick,
}: ProjectCardProps) {
  const handleProjectClick = () => {
    trackProjectView(title);
    onClick?.();
  };
  return (
    <Card 
      className="group overflow-hidden border border-primary/10 bg-gradient-to-b from-background/50 to-background/80 backdrop-blur-xl transition-all hover:border-primary/30 hover:shadow-lg"
      onClick={handleProjectClick}
    >
      {/* Contenedor de imagen con overlay y efecto hover */}
      <div className="relative aspect-video overflow-hidden">
        {image && (
          <>
            <Image
              src={image.src}
              alt={title}
              width={image.width || 1200}
              height={image.height || 630}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </>
        )}
      </div>

      <CardContent className="space-y-4 p-6">
        {/* Título y fecha */}
        <div>
          <h3 className="font-bold text-xl group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{dates}</p>
        </div>

        {/* Descripción */}
        <p className="text-muted-foreground line-clamp-2">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-primary/10">
              {tag}
            </Badge>
          ))}
          {tags.length > 4 && (
            <Badge variant="secondary" className="bg-primary/5">
              +{tags.length - 4}
            </Badge>
          )}
        </div>

        {/* Indicador de "Click para ver más" */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <Badge variant="secondary" className="bg-primary text-primary-foreground">
            Click para ver más
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
