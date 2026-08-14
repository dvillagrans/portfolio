import { describe, it, expect, vi, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import Stack from "./Stack";

afterEach(() => {
  cleanup();
});

vi.mock("gsap", () => ({
  default: {
    registerPlugin: vi.fn(),
    set: vi.fn(),
    to: vi.fn(),
    context: vi.fn().mockReturnValue({ revert: vi.fn() }),
  },
}));

vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {
    create: vi.fn(),
  },
}));

vi.mock("@gsap/react", () => ({
  useGSAP: vi.fn(),
}));

vi.mock("@/hooks/useReducedMotion", () => ({
  useReducedMotion: () => true,
}));

vi.mock("@/i18n/LanguageContext", () => ({
  useLanguage: () => ({
    language: "en",
    t: {
      stack: {
        eyebrow: "Stack",
        title: "Technical stack",
        subtitle: "Tools I ship with.",
        tools: ["Python", "SQL", "Next.js", "Power BI"],
        bands: {
          dataScience: "Data science",
          infrastructure: "Infrastructure",
          platform: "Platform",
          core: "Core",
        },
        labelUsedIn: "Used in",
        labelExploration: "Exploration",
        projectOne: "project",
        projectMany: "projects",
        emptyTitle: "Select a tool",
        emptyHint: "Pick a tool to see where it ships.",
        hintTap: "Tap a tool",
        hintHover: "Hover a tool",
      },
      work: {
        projects: [],
      },
    },
  }),
}));

describe("Stack", () => {
  it("renders band labels at AA-safe opacity", () => {
    const { container } = render(<Stack />);
    const labels = container.querySelectorAll('span[style*="240, 234, 216, 0.6"]');
    expect(labels.length).toBe(4);
  });

  it("renders the interaction hint at AA-safe opacity", () => {
    const { container } = render(<Stack />);
    const hint = container.querySelector("p.mt-8");
    expect(hint).not.toBeNull();
    expect(hint?.className).toContain("text-offwhite/50");
  });

  it("renders the empty-state hint at AA-safe opacity", () => {
    const { container } = render(<Stack />);
    const emptyHint = container.querySelector("p.max-w-lg");
    expect(emptyHint).not.toBeNull();
    expect(emptyHint?.className).toContain("text-offwhite/55");
  });
});
