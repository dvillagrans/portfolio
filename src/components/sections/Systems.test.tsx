import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Systems from "./Systems";

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
    create: vi.fn(),
  },
}));

vi.mock("@/hooks/useReducedMotion", () => ({
  useReducedMotion: () => true,
}));

vi.mock("@/i18n/LanguageContext", () => ({
  useLanguage: () => ({
    t: {
      systems: {
        eyebrow: "Systems",
        title: "Systems & capabilities",
        subtitle: "The layers I operate.",
        labelCapability: "Capability",
        labelUsedIn: "Used in",
        railTop: "Data",
        railBottom: "Product",
        hintTap: "Tap a layer",
        hintHover: "Hover a layer",
        items: [
          {
            title: "Pipelines de Machine Learning",
            summary: "Summary one",
            description: "Description one",
            usedIn: ["covid", "nyc"],
            tags: ["ML", "ETL"],
          },
          {
            title: "Ingeniería de Datos e Infraestructura",
            summary: "Summary two",
            description: "Description two",
            usedIn: ["india"],
            tags: ["SQL"],
          },
        ],
      },
    },
  }),
}));

describe("Systems", () => {
  it("derives the accessible name from visible content (no aria-label on panels)", () => {
    const { container } = render(<Systems />);
    const panels = container.querySelectorAll("div.layer-panel");
    expect(panels.length).toBeGreaterThanOrEqual(2);
    for (const panel of panels) {
      expect(panel).toHaveAttribute("role", "button");
      expect(panel).not.toHaveAttribute("aria-label");
    }
    expect(
      screen.getByRole("button", { name: /Pipelines de Machine Learning/i })
    ).toBeInTheDocument();
  });
});
