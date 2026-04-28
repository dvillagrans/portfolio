"use client";

import { useEffect } from "react";

export function ConsoleEasterEgg() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Styled message in warm amber — matches the portfolio's warm accent
    console.log(
      "%c👋 Hey there, developer.",
      "font-size:18px; font-weight:700; color:#c97d35; font-family: monospace;"
    );
    console.log(
      "%cI see you're poking around.\nI appreciate curious minds. Let's build something together.\n→ dvillagrans@gmail.com",
      "font-size:13px; color:#888; line-height:1.8; font-family: sans-serif;"
    );
  }, []);
  return null;
}
