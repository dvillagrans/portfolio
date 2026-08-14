import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Philosophy from "./Philosophy";

afterEach(() => {
  cleanup();
});

vi.mock("gsap", () => ({
  default: {
    registerPlugin: vi.fn(),
    context: vi.fn().mockReturnValue({ revert: vi.fn() }),
    set: vi.fn(),
    fromTo: vi.fn(),
  },
}));

vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {
    create: vi.fn(() => ({ kill: vi.fn() })),
  },
}));

vi.mock("@/hooks/useReducedMotion", () => ({
  useReducedMotion: () => true,
}));

vi.mock("@/i18n/LanguageContext", () => ({
  useLanguage: () => ({
    t: {
      philosophy: {
        eyebrow: "Philosophy",
        title: "How I build",
        subtitle: "Principles that guide the work.",
        quote: "Ship the pipeline, not the notebook.",
        quoteBy: "— The build desk",
        labelPrinciple: "Principle",
        items: [
          { title: "First principle", summary: "Summary one", description: "Description one" },
          { title: "Second principle", summary: "Summary two", description: "Description two" },
        ],
        hintTap: "Tap a principle",
        hintHover: "Hover a principle",
        closure: "Keep it simple.",
      },
    },
  }),
}));

describe("Philosophy", () => {
  it("renders principle eyebrows at AA-safe opacity", () => {
    const { container } = render(<Philosophy />);
    const eyebrows = container.querySelectorAll('p[class*="mb-1.5"]');
    expect(eyebrows.length).toBeGreaterThanOrEqual(2);
    for (const el of eyebrows) {
      expect(el.className).toContain("text-offwhite/50");
    }
  });

  it("renders the interaction hint at AA-safe opacity", () => {
    const { container } = render(<Philosophy />);
    const hint = container.querySelector("p.mt-8");
    expect(hint).not.toBeNull();
    expect(hint?.className).toContain("text-offwhite/50");
  });

  it("derives the accessible name from visible content (no aria-label on panels)", () => {
    const { container } = render(<Philosophy />);
    const panels = container.querySelectorAll('article[role="button"]');
    expect(panels.length).toBeGreaterThanOrEqual(2);
    for (const panel of panels) {
      expect(panel).not.toHaveAttribute("aria-label");
    }
    expect(screen.getByRole("button", { name: /First principle/i })).toBeInTheDocument();
  });
});
