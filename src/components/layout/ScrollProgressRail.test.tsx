import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import ScrollProgressRail from "./ScrollProgressRail";

afterEach(() => {
  cleanup();
});

vi.mock("gsap", () => ({
  default: {
    registerPlugin: vi.fn(),
    context: vi.fn().mockReturnValue({ revert: vi.fn() }),
    set: vi.fn(),
    to: vi.fn(),
    fromTo: vi.fn(),
    quickTo: vi.fn().mockReturnValue(vi.fn()),
  },
}));

vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {
    create: vi.fn(),
    getAll: vi.fn().mockReturnValue([]),
  },
}));

vi.mock("@/hooks/useReducedMotion", () => ({
  useReducedMotion: () => false,
}));

describe("ScrollProgressRail", () => {
  it("renders the rail container with section markers", () => {
    render(<ScrollProgressRail />);

    // Should render section labels from DEFAULT_STOPS
    expect(screen.getByText("Hero")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders as a fixed sidebar element", () => {
    const { container } = render(<ScrollProgressRail />);
    const rail = container.firstElementChild;
    expect(rail).toHaveClass("fixed");
  });

  it("is hidden on small viewports via responsive class", () => {
    const { container } = render(<ScrollProgressRail />);
    const rail = container.firstElementChild;
    expect(rail).toHaveClass("hidden");
    expect(rail).toHaveClass("lg:flex");
  });
});
