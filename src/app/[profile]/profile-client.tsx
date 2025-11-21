"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/i18n-context";
import { useProfile } from "@/contexts/profile-context";
import type { ProfileMetadata, ProfileType } from "@/data/profiles/metadata";
import { ProfileData } from "@/data/profiles";
import { PortfolioLayout } from "@/components/portfolio/portfolio-layout";
import { usePortfolioMetrics } from "@/hooks/usePortfolioMetrics";
import { ProfileFeature } from "@/components/portfolio/features/profile-feature";

interface ProfileClientProps {
  profile: ProfileType;
  metadata: ProfileMetadata;
  content: ProfileData;
}

export function ProfileClient({ profile, metadata, content }: ProfileClientProps) {
  const { language } = useI18n();
  const { setProfile } = useProfile();
  const { trackCta, trackProof, trackSectionView } = usePortfolioMetrics(profile);

  useEffect(() => {
    setProfile(profile);
  }, [profile, setProfile]);

  const headerSlot = (
    <div className="flex items-center justify-between">
      <Link href="/">
        <Button
          size="sm"
          variant="ghost"
          className="gap-2 rounded-full border border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" />
          {language === "en" ? "Back to profiles" : "Volver a perfiles"}
        </Button>
      </Link>
      <span className="hidden text-sm uppercase tracking-[0.4em] text-white/40 md:inline-flex">
        {language === "en" ? metadata.title : metadata.titleEs}
      </span>
    </div>
  );

  return (
    <motion.main
      className="relative min-h-[100dvh]"
      initial={{ opacity: 0.6, scale: 0.98, filter: "blur(12px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.16, ease: [0.4, 0, 0.2, 1] }}
    >
      <PortfolioLayout
        metadata={metadata}
        content={content}
        headerSlot={headerSlot}
        featureSlot={<ProfileFeature profile={profile} />}
        onCtaClick={trackCta}
        onProofClick={trackProof}
        onSectionView={trackSectionView}
      />
    </motion.main>
  );
}

