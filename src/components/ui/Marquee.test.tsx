import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Marquee from "./Marquee";

afterEach(() => {
  cleanup();
});

vi.mock("gsap", () => ({
  default: {
    to: vi.fn(),
    set: vi.fn(),
  },
}));

vi.mock("@/hooks/useReducedMotion", () => ({
  useReducedMotion: () => true,
}));

vi.mock("@/i18n/LanguageContext", () => ({
  useLanguage: () => ({
    t: {
      marquee: {
        ariaLabel: "Tech marquee",
        segments: [
          { text: "Machine Learning", warm: false },
          { text: "Data Engineering", warm: true },
        ],
      },
    },
  }),
}));

describe("Marquee", () => {
  it("renders neutral segments at AA-safe opacity", () => {
    render(<Marquee />);
    const neutral = screen.getAllByText("Machine Learning");
    expect(neutral.length).toBeGreaterThan(0);
    for (const el of neutral) {
      expect(el.className).toContain("text-offwhite/60");
    }
  });

  it("keeps warm segments on the warm accent", () => {
    render(<Marquee />);
    const warm = screen.getAllByText("Data Engineering");
    for (const el of warm) {
      expect(el.className).toContain("text-warm/75");
    }
  });

  it("exposes an accessible name", () => {
    render(<Marquee />);
    expect(screen.getByRole("marquee")).toHaveAttribute("aria-label", "Tech marquee");
  });
});
