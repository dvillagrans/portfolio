import { describe, expect, it } from "vitest";
import {
  getIncomingFadeDelay,
  isAccentLight,
  CINEMATIC_SCROLL,
} from "./featuredWorkScrollConfig";

describe("isAccentLight", () => {
  it("detects light oklch backgrounds", () => {
    expect(isAccentLight("oklch(97% 0.006 155)")).toBe(true);
  });

  it("detects dark hex backgrounds", () => {
    expect(isAccentLight("#0c100c")).toBe(false);
  });
});

describe("getIncomingFadeDelay", () => {
  const fadeDur = 0.1;

  it("delays longer on dark to light transitions", () => {
    const darkToLight = getIncomingFadeDelay("#0c100c", "oklch(97% 0.006 155)", fadeDur);
    const neutral = getIncomingFadeDelay("#0c100c", "#0d1117", fadeDur);
    expect(darkToLight).toBeGreaterThan(neutral);
    expect(darkToLight).toBe(fadeDur * CINEMATIC_SCROLL.incomingFadeDelayDarkToLight);
  });
});
