import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import gsap from "gsap";
import Marquee from "./Marquee";

const useReducedMotionMock = vi.fn(() => false);
const useCoarsePointerMock = vi.fn(() => false);

vi.mock("gsap", () => ({
  default: {
    to: vi.fn(),
    set: vi.fn(),
  },
}));

vi.mock("@/hooks/useReducedMotion", () => ({
  useReducedMotion: () => useReducedMotionMock(),
}));

vi.mock("@/hooks/useCoarsePointer", () => ({
  useCoarsePointer: () => useCoarsePointerMock(),
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
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    useReducedMotionMock.mockReturnValue(false);
    useCoarsePointerMock.mockReturnValue(false);
    cleanup();
  });

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

  it("starts the loop tween on desktop", () => {
    useReducedMotionMock.mockReturnValue(false);
    useCoarsePointerMock.mockReturnValue(false);

    render(<Marquee />);
    expect(gsap.to).toHaveBeenCalledWith(
      expect.any(HTMLElement),
      expect.objectContaining({ repeat: -1, xPercent: -50 })
    );
  });

  it("does not start the loop tween on mobile viewport", () => {
    useReducedMotionMock.mockReturnValue(false);
    useCoarsePointerMock.mockReturnValue(true);

    render(<Marquee />);
    expect(gsap.to).not.toHaveBeenCalled();
  });

  it("does not start the loop tween under reduced motion", () => {
    useReducedMotionMock.mockReturnValue(true);
    useCoarsePointerMock.mockReturnValue(false);

    render(<Marquee />);
    expect(gsap.to).not.toHaveBeenCalled();
  });
});
