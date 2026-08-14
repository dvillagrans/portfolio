"use client";

import { useEffect, useState } from "react";

const MOBILE_BUDGET_MQ = "(hover: none), (max-width: 767px)";

export function useCoarsePointer(): boolean {
  const [coarse, setCoarse] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      return window.matchMedia(MOBILE_BUDGET_MQ).matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_BUDGET_MQ);
    setCoarse(mql.matches);

    const handler = (e: MediaQueryListEvent) => setCoarse(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return coarse;
}
