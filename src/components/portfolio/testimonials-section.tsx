'use client';

import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { PortfolioTestimonial, resolveText } from "@/data/profiles/types";
import { useI18n } from "@/contexts/i18n-context";

interface TestimonialsSectionProps {
  testimonials: PortfolioTestimonial[];
  onSectionView?: (section: string) => void;
}

export function TestimonialsSection({ testimonials, onSectionView }: TestimonialsSectionProps) {
  const { language } = useI18n();
  const localizedCopy = useMemo(
    () => ({
      eyebrow: {
        en: "Testimonials",
        es: "Testimonios",
      },
      headline: {
        en: "Let the teams speak.",
        es: "Que hablen los equipos.",
      },
      description: {
        en: "Direct feedback from teams that already work with me. Real stories tied to the cases above.",
        es: "Feedback directo de quienes ya trabajan conmigo. Historias reales vinculadas a los casos anteriores.",
      },
    }),
    [],
  );

  useEffect(() => {
    if (!testimonials.length) return;
    onSectionView?.("testimonials");
  }, [onSectionView, testimonials.length]);

  if (!testimonials.length) return null;

  return (
    <section id="testimonios" className="space-y-6 sm:space-y-8">
      <motion.div
        className="flex flex-col gap-2 sm:gap-3"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4 }}
      >
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white/50">
          {resolveText(localizedCopy.eyebrow, language)}
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white">
          {resolveText(localizedCopy.headline, language)}
        </h2>
        <p className="max-w-2xl text-sm sm:text-base text-white/65">
          {resolveText(localizedCopy.description, language)}
        </p>
      </motion.div>

      <motion.div
        className="grid gap-3 sm:gap-4 md:grid-cols-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.12,
            },
          },
        }}
      >
        {testimonials.map((testimonial) => {
          const quote = resolveText(testimonial.quote, language);
          const author = resolveText(testimonial.author, language);
          const role = testimonial.role ? resolveText(testimonial.role, language) : undefined;
          const company = testimonial.company ? resolveText(testimonial.company, language) : undefined;

          return (
            <motion.blockquote
              key={quote}
              className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-6 text-white backdrop-blur"
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="absolute -right-12 top-0 h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-[hsla(var(--portfolio-accent),0.25)] blur-3xl opacity-70" />
              <p className="text-base sm:text-lg leading-relaxed text-white/80">&ldquo;{quote}&rdquo;</p>
              <footer className="mt-4 sm:mt-6 text-xs sm:text-sm text-white/60">
                <span className="font-semibold text-white/80">{author}</span>
                {role && ` · ${role}`}
                {company && <span className="text-white/40"> @ {company}</span>}
              </footer>
            </motion.blockquote>
          );
        })}
      </motion.div>
    </section>
  );
}

