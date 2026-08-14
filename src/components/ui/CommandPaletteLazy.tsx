"use client";

import { lazy, Suspense } from "react";
import { useCommandPalette } from "@/hooks/CommandPaletteContext";

// The palette is only useful after the user presses ⌘K/ctrl+K (or clicks the
// navbar command button). Loading it lazily keeps gsap + the full command list
// out of the initial bundle (Lighthouse: unused-javascript / bootup-time).
const CommandPalette = lazy(() =>
  import("./CommandPalette").then((mod) => ({ default: mod.CommandPalette }))
);

export function CommandPaletteLazy() {
  const { open } = useCommandPalette();
  if (!open) return null;
  return (
    <Suspense fallback={null}>
      <CommandPalette />
    </Suspense>
  );
}
