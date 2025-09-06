import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";
import { trackProjectView } from "@/components/analytics";
import { useI18n } from "@/contexts/i18n-context";

interface ProjectCardProps {
  title: string;
  description?: string;
  descriptionKey?: string;
  dates: string;
  tags: readonly string[];
  role?: string;
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
  descriptionKey,
  dates,
  tags,
  role,
  image,
  onClick,
}: ProjectCardProps) {
  const { t } = useI18n();
  
  const displayDescription = descriptionKey ? t(descriptionKey) : description;
  
  const handleProjectClick = () => {
    trackProjectView(title);
    onClick?.();
  };
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <Card 
        className="group overflow-hidden border border-primary/10 bg-gradient-to-b from-background/50 to-background/80 backdrop-blur-xl transition-all hover:border-primary/30 hover:shadow-2xl cursor-pointer"
        onClick={handleProjectClick}
      >
      {/* Contenedor de imagen con overlay y efecto hover */}
      <div className="relative aspect-video overflow-hidden">
        {image && (
          <>
            <Image
              src={(() => {
                const baseName = image.src.replace('/img/', '').replace('.webp', '');
                const optimizedImages = ['dash-videojuegos', 'portfolio', 'codemaster', 'etl', 'dash-population', 'dash-esperanzavida-mortalidad', 'output-houses'];
                if (optimizedImages.includes(baseName)) {
                  return `/img/optimized/${baseName}-640.webp`;
                }
                return image.src;
              })()}
              alt={title}
              width={image.width || 1200}
              height={image.height || 630}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </>
        )}
      </div>

      <CardContent className="space-y-4 p-6">
        {/* Título, rol y fecha */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-xl group-hover:text-primary transition-colors flex-1">
              {title}
            </h3>
            {role && (
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs font-medium">
                {role}
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{dates}</p>
        </div>

        {/* Descripción */}
        <p className="text-muted-foreground text-sm leading-relaxed" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {displayDescription}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-primary/10 text-xs px-2 py-1">
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="secondary" className="bg-primary/5 text-xs px-2 py-1">
              +{tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Indicador de "Click para ver más" */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <Badge variant="secondary" className="bg-primary text-primary-foreground">
            {t('projects.card.clickToView')}
          </Badge>
        </div>
      </CardContent>
      </Card>
    </motion.div>
  );
}
