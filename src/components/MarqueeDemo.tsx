import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import Image from "next/image";

const certificates = [
  {
    img: "https://i.postimg.cc/fLhWvw6Z/LATAM-GCCF2022-Diego-Villagran-Salazar.png",
  },
  // Agrega más certificados según sea necesario
];

const CertificateCard = ({ img }: { img: string }) => {
  return (
    <figure
      className={cn(
        "relative cursor-pointer overflow-hidden rounded-xl border",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10]",
      )}
    >
      <Image
        className={cn(
          "object-contain",
          // light hover styles
          "hover:bg-gray-950/[.05]",
          // dark hover styles
          "dark:hover:bg-gray-50/[.15]"
        )}
        alt="Certificate"
        src={img}
        width={500}
        height={250}
      />
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-transparent">
      <Marquee pauseOnHover className="[--duration:15s]">
        {certificates.map((certificate, index) => (
          <CertificateCard key={index} img={certificate.img} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
