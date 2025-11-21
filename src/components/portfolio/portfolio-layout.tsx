'use client';

import { ReactNode } from "react";
import type { ProfileMetadata } from "@/data/profiles/metadata";
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
import { CommandMenu } from "./command-menu";

export interface PortfolioLayoutProps {
  metadata: ProfileMetadata;
  content: ProfileData;
  headerSlot?: ReactNode;
  featureSlot?: ReactNode;
  onCtaClick?: (label: string) => void;
  onSectionView?: (section: string) => void;
  onProofClick?: (caseStudy: string, proof: string) => void;
}

export function PortfolioLayout({
  metadata,
  content,
  headerSlot,
  featureSlot,
  onCtaClick,
  onSectionView,
  onProofClick,
}: PortfolioLayoutProps) {
  return (
    <div className={`portfolio-theme ${metadata.themeClass}`}>
      <CommandMenu />
      <div className="portfolio-surface relative flex min-h-screen w-full flex-col gap-10 sm:gap-12 md:gap-14 bg-[hsl(var(--portfolio-bg))] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-10">
        <div className="absolute inset-0 -z-10 bg-[hsla(var(--portfolio-shadow),0.85)]" />
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 sm:gap-12 md:gap-14">
          {headerSlot}
          <HeroSection
            hero={content.hero}
            metadata={metadata}
            onCtaClick={onCtaClick}
            onSectionView={onSectionView}
          />

          {/* Feature Slot - Unique per profile */}
          {featureSlot && (
            <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
              {featureSlot}
            </div>
          )}

          <ProblemsSection
            problems={content.problems}
            metrics={content.metrics}
            onSectionView={onSectionView}
          />
          <ProcessTimeline steps={content.process} onSectionView={onSectionView} />
          <HumanSection
            anecdote={content.anecdote}
            workingStyle={content.workingStyle}
            onSectionView={onSectionView}
          />
          <CaseShowcase
            studies={content.caseStudies}
            onSectionView={onSectionView}
            onProofClick={onProofClick}
          />
          <ToolboxSection
            toolbox={content.toolbox}
            coreTools={content.coreTools}
            onSectionView={onSectionView}
          />
          <GuaranteesSection guarantees={content.guarantees} onSectionView={onSectionView} />
          <TestimonialsSection testimonials={content.testimonials} onSectionView={onSectionView} />
          <FinalCta cta={content.finalCta} onCtaClick={onCtaClick} onSectionView={onSectionView} />
        </div>
      </div>
    </div>
  );
}

