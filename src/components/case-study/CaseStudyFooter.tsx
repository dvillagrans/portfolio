"use client";

import { Link } from "next-view-transitions";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudyFooter as CaseStudyFooterDict } from "@/i18n/types";

interface CaseStudyFooterProps {
  footer: CaseStudyFooterDict;
}

export function CaseStudyFooter({ footer }: CaseStudyFooterProps) {
  return (
    <footer className="reveal-fade mt-20 border-t border-offwhite/10 pt-12 md:mt-28">
      {footer.note && (
        <p className="mb-6 max-w-xl text-sm leading-relaxed text-offwhite/45">{footer.note}</p>
      )}
      <p className="font-serif text-lg italic text-offwhite/70 md:text-xl">{footer.cta}</p>
      <Link
        href="/#contact"
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-warm px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-charcoal transition-all hover:bg-warm/90"
      >
        {footer.contact}
        <ArrowUpRight className="h-3.5 w-3.5" />
      </Link>
    </footer>
  );
}
