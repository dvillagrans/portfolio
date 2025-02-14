import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const certificates = [
  {
    img: "/img/googlecloud.webp", 
  },
  {
    img: "/img/Curso_Oracle.webp", 
  },
  {
    img: "/img/CursoGitHubActitions.webp",
  },
  {
    img: "/img/docker.webp",
  },
  {
    img: "/img/Udemy_DC.webp",
  },
  {
    img: "/img/Coursera.webp",
  }
  
];

const CertificateCard = ({ img }: { img: string }) => {
  return (
    <div className="w-[650px] px-4"> {/* Ajustado a 650px */}
      <figure
        className={cn(
          "relative cursor-pointer overflow-hidden rounded-xl border",
          // light styles
          "border-gray-950/[.1] bg-gray-950/[.01]",
          // dark styles
          "dark:border-gray-50/[.1] dark:bg-gray-50/[.10]"
        )}
      >
        <AspectRatio ratio={16/9}>
          <Image
            className={cn(
              "h-full w-full object-cover",
              // light hover styles
              "hover:bg-gray-950/[.05]",
              // dark hover styles
              "dark:hover:bg-gray-50/[.15]"
            )}
            alt="Certificate"
            src={img}
            fill
            sizes="(max-width: 650px) 100vw, 650px" // Ajustado al nuevo tamaño
          />
        </AspectRatio>
      </figure>
    </div>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex h-[650px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-transparent"> {/* Ajustado a 650px */}
      <Marquee pauseOnHover className="[--duration:33s]">
        {certificates.map((certificate, index) => (
          <CertificateCard key={index} img={certificate.img} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-white/90 dark:from-background/90"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-white/90 dark:from-background/90"></div>
    </div>
  );
}
