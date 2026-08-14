import { describe, expect, it } from "vitest";
import {
  DEFAULT_ACCENT,
  MUTED_INK_ALPHA,
  SCENE_ACCENTS,
  mutedInk,
} from "./Scene";

const WCAG_AA_MIN = 4.5;

function linearize(c: number): number {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

function hexLuminance(hex: string): number {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

function oklchToSrgbHex(l: number, c: number, hDeg: number): string {
  const hue = (hDeg * Math.PI) / 180;
  const a = c * Math.cos(hue);
  const b = c * Math.sin(hue);
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;
  const l3 = l_ ** 3;
  const m3 = m_ ** 3;
  const s3 = s_ ** 3;
  const toSrgb = (x: number) => {
    const clamped = Math.max(0, Math.min(1, x));
    const v =
      clamped <= 0.0031308 ? 12.92 * clamped : 1.055 * clamped ** (1 / 2.4) - 0.055;
    return Math.round(v * 255)
      .toString(16)
      .padStart(2, "0");
  };
  const linR = 4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
  const linG = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
  const linB = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3;
  return `#${toSrgb(linR)}${toSrgb(linG)}${toSrgb(linB)}`;
}

/** Resolve an accent background (hex or oklch) to an opaque hex. */
function accentBgHex(bg: string): string {
  const match = /^oklch\(([\d.]+)%\s+([\d.]+)\s+([\d.]+)\)$/.exec(bg);
  if (!match) return bg;
  return oklchToSrgbHex(
    parseFloat(match[1]) / 100,
    parseFloat(match[2]),
    parseFloat(match[3])
  );
}

/** Parse "#rrggbb" or "#rrggbbaa" into RGB channels plus alpha. */
function parseColor(hex: string): { rgb: number[]; alpha: number } {
  const h = hex.replace("#", "");
  const alpha = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;
  const rgb = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  return { rgb, alpha };
}

function contrastRatio(a: string, b: string): number {
  const hi = Math.max(hexLuminance(a), hexLuminance(b));
  const lo = Math.min(hexLuminance(a), hexLuminance(b));
  return (hi + 0.05) / (lo + 0.05);
}

/** Contrast of a semi-transparent fg composed over an opaque bg. */
function compositeContrast(fg: string, bg: string): number {
  const { rgb: frgb, alpha } = parseColor(fg);
  const { rgb: brgb } = parseColor(bg);
  const blended = frgb
    .map((f, i) => Math.round(f * alpha + brgb[i] * (1 - alpha)))
    .map((v) => v.toString(16).padStart(2, "0"))
    .join("");
  return contrastRatio(`#${blended}`, bg);
}

const ACCENTS = [
  SCENE_ACCENTS["00"],
  SCENE_ACCENTS["01"],
  SCENE_ACCENTS["02"],
  SCENE_ACCENTS["03"],
  SCENE_ACCENTS["04"],
  DEFAULT_ACCENT,
];

describe("mutedInk", () => {
  it.each(ACCENTS.map((accent) => [accent.bg, accent.ink] as [string, string]))(
    "clears WCAG AA (>= 4.5:1) for muted ink on background %s",
    (bg, ink) => {
      const muted = mutedInk(ink);
      expect(compositeContrast(muted, accentBgHex(bg))).toBeGreaterThanOrEqual(
        WCAG_AA_MIN
      );
    }
  );

  it("keeps the hierarchy: muted ink stays quieter than full ink", () => {
    for (const accent of ACCENTS) {
      const bg = accentBgHex(accent.bg);
      expect(compositeContrast(mutedInk(accent.ink), bg)).toBeLessThan(
        contrastRatio(accent.ink, bg)
      );
    }
  });

  it("applies the per-family minimum alpha suffix", () => {
    expect(mutedInk("#ece8e0")).toBe(`#ece8e0${MUTED_INK_ALPHA.dark.toLowerCase()}`);
    expect(mutedInk("#1c1c1e")).toBe(`#1c1c1e${MUTED_INK_ALPHA.light.toLowerCase()}`);
  });

  it("keeps dark-scene muted ink AA-safe on the desktop cross-fade blend (Lighthouse 4.39)", () => {
    const muted = mutedInk("#ece8e0");
    const blendedBg = "#27292c";
    expect(compositeContrast(muted, blendedBg)).toBeGreaterThanOrEqual(
      WCAG_AA_MIN
    );
  });
});

describe("EyeNet pipeline header contrast on the #0d1117 evidence frame", () => {
  const frameBg = "#0d1117";

  it("keeps the 'Document pipeline' label (text-white/55) AA-safe", () => {
    const label = "#ffffff8c";
    expect(compositeContrast(label, frameBg)).toBeGreaterThanOrEqual(
      WCAG_AA_MIN
    );
  });

  it("keeps the 'LIVE · 5 nodes' badge (text-white/50) AA-safe", () => {
    const badge = "#ffffff80";
    expect(compositeContrast(badge, frameBg)).toBeGreaterThanOrEqual(
      WCAG_AA_MIN
    );
  });
});
