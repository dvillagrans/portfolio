"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import { indiaEn, indiaEs } from "@/i18n/dictionaries/india";
import { EditorialCaseStudy } from "@/components/case-study/EditorialCaseStudy";
import { CaseStudyExternalActions } from "@/components/case-study/CaseStudyExternalActions";
import { IndiaProjectSchema } from "@/components/ui/SchemaOrg";

export default function IndiaCaseStudyPage() {
  const { language } = useLanguage();
  const dict = language === "es" ? indiaEs : indiaEn;

  return (
    <EditorialCaseStudy
      slug="india"
      dict={dict}
      schema={<IndiaProjectSchema />}
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
