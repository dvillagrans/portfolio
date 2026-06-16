"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface CaseStudyImage {
  src: string;
  alt: string;
}

interface CaseStudyLightboxProps {
  images: CaseStudyImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  accentClass?: string;
}

export function CaseStudyLightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
  accentClass = "bg-warm",
}: CaseStudyLightboxProps) {
  const { src, alt } = images[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/92 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 active:scale-95"
        aria-label="Close"
      >
        <X size={18} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 active:scale-95 md:left-6"
        aria-label="Previous"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 active:scale-95 md:right-6"
        aria-label="Next"
      >
        <ChevronRight size={20} />
      </button>
      <div
        className="relative mx-14 h-full max-h-[85vh] w-full max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image src={src} alt={alt} fill className="object-contain" sizes="90vw" />
      </div>
      <div
        className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-1"
        role="tablist"
        aria-label="Image carousel"
      >
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-label={`${i + 1} of ${images.length}`}
            aria-selected={i === index}
            onClick={(e) => e.stopPropagation()}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full transition-colors hover:bg-white/10"
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                i === index ? `h-1.5 w-5 ${accentClass}` : "h-1.5 w-1.5 bg-white/30"
              }`}
              aria-hidden
            />
          </button>
        ))}
      </div>
      <p className="absolute bottom-12 left-1/2 max-w-lg -translate-x-1/2 px-4 text-center font-mono text-[10px] uppercase tracking-widest text-white/40">
        {alt}
      </p>
    </div>
  );
}
