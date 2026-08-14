import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import FeaturedWork from "./FeaturedWork";
import type { ProjectItem } from "@/i18n/types";

afterEach(() => {
  cleanup();
});

const mockProject: ProjectItem = {
  id: "01",
  type: "hero",
  context: "Client project",
  category: "AI",
  title: "EyeNet",
  subtitle: "Pipeline that ships.",
  problem: "Problem",
  system: "System",
  outcome: "Outcome",
  role: "Lead engineer",
  image: "/img/microservices.webp",
  tags: ["ML"],
  metrics: [{ value: "2x", label: "throughput" }],
  links: [],
  href: "/projects/eyenet",
  caseStudy: "/projects/eyenet",
};

vi.mock("gsap", () => ({
  default: {
    registerPlugin: vi.fn(),
    context: vi.fn().mockReturnValue({ revert: vi.fn() }),
    set: vi.fn(),
    fromTo: vi.fn(),
    timeline: vi.fn(() => ({ to: vi.fn(), fromTo: vi.fn() })),
  },
}));

vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {
    snapDirectional: vi.fn(() => () => 0),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    refresh: vi.fn(),
  },
}));

vi.mock("@/hooks/useReducedMotion", () => ({
  useReducedMotion: () => false,
}));

vi.mock("@/i18n/LanguageContext", () => ({
  useLanguage: () => ({
    language: "en",
    t: {
      work: {
        title: "Selected work",
        subtitle: "Projects that shipped.",
        labelEvidence: "Evidence",
        inspect: "Inspect",
        projects: [mockProject],
      },
    },
  }),
}));

vi.mock("./Scene", () => ({
  Scene: ({ project }: { project: ProjectItem }) => <h3>{project.title}</h3>,
  getAccent: () => ({ fg: "#6db88a", bg: "#101210", ink: "#ece8e0" }),
  accentAlpha: (_c: string, a: number) => `rgba(0,0,0,${a})`,
}));

function stubMatchMedia(matches: boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
    }),
  });
}

describe("FeaturedWork", () => {
  beforeEach(() => {
    stubMatchMedia(false);
    Element.prototype.scrollTo = vi.fn();
  });

  it("renders the static header eyebrow at AA-safe ink", () => {
    const { container } = render(<FeaturedWork />);
    const eyebrow = container.querySelector(".mb-3 span");
    expect(eyebrow).not.toBeNull();
    expect(eyebrow?.getAttribute("style")).toContain("rgba(28, 28, 30, 0.65)");
  });

  it("renders the static header subtitle at AA-safe ink", () => {
    const { container } = render(<FeaturedWork />);
    const subtitle = container.querySelector('header p[class*="mt-4"]');
    expect(subtitle).not.toBeNull();
    expect(subtitle?.getAttribute("style")).toContain("rgba(28, 28, 30, 0.65)");
  });

  it("renders the static footer note at AA-safe charcoal", () => {
    const { container } = render(<FeaturedWork />);
    const note = container.querySelector('footer p[class*="text-charcoal/60"]');
    expect(note).not.toBeNull();
  });

  it("labels the section with an h2 before project h3s in cinematic mode", async () => {
    stubMatchMedia(true);
    const { container } = render(<FeaturedWork />);

    const h2 = await screen.findByRole("heading", { level: 2, name: /Selected work/i });
    const firstH3 = container.querySelector("h3");
    expect(firstH3).not.toBeNull();
    expect(
      h2.compareDocumentPosition(firstH3 as Node) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });
});
