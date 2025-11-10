'use client';

import { ReactNode } from "react";
import { ProfileMetadata } from "@/contexts/profile-context";
import { ProfileData } from "@/data/profiles";
import { HeroSection } from "./hero-section";
import { ProblemsSection } from "./problems-section";
import { ProcessTimeline } from "./process-timeline";
import { CaseShowcase } from "./case-showcase";
import { ToolboxSection } from "./toolbox-section";
import { GuaranteesSection } from "./guarantees-section";
import { TestimonialsSection } from "./testimonials-section";
import { HumanSection } from "./human-section";
import { FinalCta } from "./final-cta";

export interface PortfolioLayoutProps {
  metadata: ProfileMetadata;
  content: ProfileData;
  headerSlot?: ReactNode;
  onCtaClick?: (label: string) => void;
  onSectionView?: (section: string) => void;
  onProofClick?: (caseStudy: string, proof: string) => void;
}

export function PortfolioLayout({
  metadata,
  content,
  headerSlot,
  onCtaClick,
  onSectionView,
  onProofClick,
}: PortfolioLayoutProps) {
  return (
    <div className={`portfolio-theme ${metadata.themeClass}`}>
      <div className="portfolio-surface relative flex min-h-screen w-full flex-col gap-14 bg-[hsl(var(--portfolio-bg))] px-6 py-10 md:px-10 lg:px-16">
        <div className="absolute inset-0 -z-10 bg-[hsla(var(--portfolio-shadow),0.85)]" />
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-14">
          {headerSlot}
          <HeroSection
            hero={content.hero}
            metadata={metadata}
            onCtaClick={onCtaClick}
            onSectionView={onSectionView}
          />
          <ProblemsSection
            problems={content.problems}
            metrics={content.metrics}
            onSectionView={onSectionView}
          />
          <ProcessTimeline steps={content.process} onSectionView={onSectionView} />
          <CaseShowcase
            studies={content.caseStudies}
            onSectionView={onSectionView}
            onProofClick={onProofClick}
          />
          <ToolboxSection toolbox={content.toolbox} onSectionView={onSectionView} />
          <GuaranteesSection guarantees={content.guarantees} onSectionView={onSectionView} />
          <TestimonialsSection testimonials={content.testimonials} onSectionView={onSectionView} />
          <HumanSection
            anecdote={content.anecdote}
            workingStyle={content.workingStyle}
            onSectionView={onSectionView}
          />
          <FinalCta cta={content.finalCta} onCtaClick={onCtaClick} onSectionView={onSectionView} />
        </div>
      </div>
    </div>
  );
}

