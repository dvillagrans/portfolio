import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: {
    src: string;
    width: number;
    height: number;
  };
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  return (
    <Card
      className={
        "group flex flex-col overflow-hidden border hover:shadow-xl transition-all duration-500 ease-out h-full hover:border-primary/20"
      }
    >
      <Link
        href={href || "#"}
        className={cn("block relative overflow-hidden", className)}
      >
        {video && (
          <div className="relative h-72 w-full overflow-hidden">
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="pointer-events-none h-full w-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        )}
        {image && (
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
              priority={true}
              quality={100}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        )}
      </Link>
      <CardHeader className="px-6 pt-6">
        <div className="space-y-2">
          <CardTitle className="text-lg font-semibold transition-colors group-hover:text-primary">{title}</CardTitle>
          <time className="font-sans text-sm text-muted-foreground">{dates}</time>
          <div className="hidden font-sans text-sm underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <Markdown className="prose prose-sm max-w-full text-pretty font-sans text-muted-foreground dark:prose-invert">
            {description}
          </Markdown>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-6">
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {tags?.map((tag) => (
              <Badge
                className="px-2 py-0.5 text-[12px] transition-colors hover:bg-primary hover:text-primary-foreground"
                variant="secondary"
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-6 pb-6">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-2">
            {links?.map((link, idx) => (
              <Link href={link?.href} key={idx} target="_blank">
                <Badge 
                  key={idx} 
                  className="flex gap-2 px-3 py-1.5 text-[12px] transition-all hover:bg-primary hover:text-primary-foreground"
                >
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
