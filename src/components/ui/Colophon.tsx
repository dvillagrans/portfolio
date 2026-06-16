"use client";

import { useLanguage } from "@/i18n/LanguageContext";

const BUILD_TIME = new Date().toISOString();

function formatDeployTime(timestamp: string): { display: string; isBuild: boolean } {
  if (!timestamp || timestamp.trim() === "") {
    return { display: formatIsoDate(BUILD_TIME), isBuild: true };
  }
  return { display: formatIsoDate(timestamp), isBuild: false };
}

function formatIsoDate(iso: string): string {
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export default function Colophon() {
  const { t } = useLanguage();
  const deployTimestamp = process.env.NEXT_PUBLIC_DEPLOY_TIMESTAMP ?? "";
  const lighthouseScore = process.env.NEXT_PUBLIC_LIGHTHOUSE_SCORE ?? "";

  const { display: deployDisplay, isBuild } = formatDeployTime(deployTimestamp);
  const showLighthouse = lighthouseScore.trim() !== "";

  return (
    <footer className="mt-20 md:mt-24 w-full border-t border-white/10 pt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 font-sans text-xs text-offwhite/50">
        {/* Font credits */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-offwhite/30">
            {t.colophon.deployLabel === "Last deploy" ? "Typography" : "Tipografía"}
          </span>
          <span className="text-offwhite/60">{t.colophon.fontCredit}</span>
        </div>

        {/* Deploy timestamp */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-offwhite/30">
            {t.colophon.deployLabel}
          </span>
          <span className="text-offwhite/60">
            {deployDisplay}
            {isBuild && <span className="ml-1 text-offwhite/40">(build)</span>}
          </span>
        </div>

        {/* Lighthouse score */}
        {showLighthouse && (
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-offwhite/30">
              {t.colophon.scoreLabel}
            </span>
            <span className="font-serif text-2xl italic text-warm">
              {lighthouseScore}
            </span>
          </div>
        )}
      </div>
    </footer>
  );
}
