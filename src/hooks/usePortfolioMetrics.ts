"use client";

import { useCallback } from "react";
import { ProfileType } from "@/contexts/profile-context";
import { trackEvent } from "@/components/analytics";

export function usePortfolioMetrics(profile: ProfileType) {
  const trackCta = useCallback(
    (label: string) => {
      trackEvent("portfolio_cta_click", profile, label);
    },
    [profile]
  );

  const trackProof = useCallback(
    (caseStudy: string, proofLabel: string) => {
      trackEvent("portfolio_proof_click", profile, `${caseStudy} · ${proofLabel}`);
    },
    [profile]
  );

  const trackSectionView = useCallback(
    (section: string) => {
      trackEvent("portfolio_section_view", profile, section);
    },
    [profile]
  );

  return {
    trackCta,
    trackProof,
    trackSectionView,
  };
}

