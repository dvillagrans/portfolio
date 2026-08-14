import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import gsap from "gsap";
import Hero from "./Hero";

const useReducedMotionMock = vi.fn(() => false);
const useCoarsePointerMock = vi.fn(() => false);

vi.mock("next/dynamic", () => ({
  __esModule: true,
  default: () => {
    const WebGLHeroCanvasStub = () => <div data-testid="webgl-hero-stub" aria-hidden="true" />;
    WebGLHeroCanvasStub.displayName = "WebGLHeroCanvasStub";
    return WebGLHeroCanvasStub;
  },
}));

vi.mock("gsap", () => ({
  default: {
    context: vi.fn().mockImplementation((cb: () => void) => {
      cb();
      return { revert: vi.fn() };
    }),
    set: vi.fn(),
    fromTo: vi.fn(),
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
      hero: {
        eyebrow: "AI & Data Engineer",
        title1: "Production ML systems",
        title2: "and AI automation.",
        subtitle: "I build infrastructure that ships.",
        focusLine: "Client work · research",
        cta: "View case studies",
        downloadCv: "Download CV",
        scrollHint: "Scroll to featured work",
      },
    },
  }),
}));

describe("Hero", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    useReducedMotionMock.mockReturnValue(false);
    useCoarsePointerMock.mockReturnValue(false);
    cleanup();
  });

  it("keeps hero text visible on mobile (no inline hidden state in the LCP element)", () => {
    useCoarsePointerMock.mockReturnValue(true);
    const { container } = render(<Hero />);

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();

    const reveals = container.querySelectorAll(".hero-reveal");
    expect(reveals.length).toBe(7);
    for (const el of reveals) {
      expect((el.getAttribute("style") ?? "").toLowerCase()).not.toContain("opacity");
    }
  });

  it("does not start the entrance animation on mobile viewport", () => {
    useCoarsePointerMock.mockReturnValue(true);
    render(<Hero />);

    expect(gsap.fromTo).not.toHaveBeenCalled();
    expect(gsap.set).toHaveBeenCalledWith(
      expect.any(Array),
      expect.objectContaining({ opacity: 1, y: 0 })
    );
  });

  it("runs the entrance animation on desktop fine-pointer viewports", () => {
    useCoarsePointerMock.mockReturnValue(false);
    useReducedMotionMock.mockReturnValue(false);
    render(<Hero />);

    expect(gsap.fromTo).toHaveBeenCalledWith(
      expect.any(Array),
      expect.objectContaining({ opacity: 0, y: 20 }),
      expect.objectContaining({ opacity: 1, duration: 0.9 })
    );
  });

  it("reveals text immediately under reduced motion without animating", () => {
    useReducedMotionMock.mockReturnValue(true);
    useCoarsePointerMock.mockReturnValue(false);
    render(<Hero />);

    expect(gsap.fromTo).not.toHaveBeenCalled();
    expect(gsap.set).toHaveBeenCalledWith(
      expect.any(Array),
      expect.objectContaining({ opacity: 1, y: 0 })
    );
  });

  it("keeps the decorative background fallback in the DOM", () => {
    useCoarsePointerMock.mockReturnValue(true);
    render(<Hero />);

    expect(screen.getByTestId("webgl-hero-stub")).toBeInTheDocument();
  });
});
