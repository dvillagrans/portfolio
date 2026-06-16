"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import { nycEn, nycEs } from "@/i18n/dictionaries/nyc";
import { EditorialCaseStudy } from "@/components/case-study/EditorialCaseStudy";
import { CaseStudyExternalActions } from "@/components/case-study/CaseStudyExternalActions";

export default function NycCaseStudyPage() {
  const { language } = useLanguage();
  const dict = language === "es" ? nycEs : nycEn;

  return (
    <EditorialCaseStudy
      dict={dict}
      heroImage={{
        src: "/img/nyc-ridehailing-dashboard.webp",
        alt: "NYC ride-hailing analytics dashboard",
      }}
      actions={
        <CaseStudyExternalActions
          dashboardHref={dict.linkDashboard}
          dashboardLabel={dict.links.dashboard}
          repoHref={dict.linkRepo}
          repoLabel={dict.links.repo}
        />
      }
    />
  );
}
