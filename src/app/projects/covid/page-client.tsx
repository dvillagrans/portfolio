"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import { covidEn, covidEs } from "@/i18n/dictionaries/covid";
import { EditorialCaseStudy } from "@/components/case-study/EditorialCaseStudy";
import { CaseStudyExternalActions } from "@/components/case-study/CaseStudyExternalActions";
import { CovidProjectSchema } from "@/components/ui/SchemaOrg";

export default function CovidCaseStudyPage() {
  const { language } = useLanguage();
  const dict = language === "es" ? covidEs : covidEn;

  return (
    <EditorialCaseStudy
      slug="covid"
      dict={dict}
      schema={<CovidProjectSchema />}
      actions={
        <CaseStudyExternalActions
          dashboardHref={dict.linkDashboard}
          dashboardLabel={dict.links.dashboard}
        />
      }
    />
  );
}
