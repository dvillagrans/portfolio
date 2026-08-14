import { describe, it, expect, vi, afterEach } from "vitest";
import { cleanup, render } from "@testing-library/react";
import WebGLHeroCanvas from "./WebGLHeroCanvas";

vi.mock("@/hooks/useReducedMotion", () => ({
  useReducedMotion: () => false,
}));

afterEach(() => {
  cleanup();
});

describe("WebGLHeroCanvas", () => {
  it("renders a canvas element", () => {
    // Mock getContext to return null (WebGL not available) — should show fallback
    HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue(null);

    render(<WebGLHeroCanvas />);
    const canvas = document.querySelector("canvas");
    expect(canvas).toBeInTheDocument();
  });

  it("shows static gradient fallback when WebGL is not available", () => {
    HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue(null);

    const { container } = render(<WebGLHeroCanvas />);
    // Should have a fallback gradient div
    const fallback = container.querySelector("[data-webgl-fallback]");
    expect(fallback).toBeInTheDocument();
  });

  it("shows static gradient when useReducedMotion is true", () => {
    // Re-mock reduced motion to true
    vi.doMock("@/hooks/useReducedMotion", () => ({
      useReducedMotion: () => true,
    }));

    // Need fresh import for the mock to take effect
    const { container } = render(<WebGLHeroCanvas />);
    const fallback = container.querySelector("[data-webgl-fallback]");
    expect(fallback).toBeInTheDocument();

    vi.doUnmock("@/hooks/useReducedMotion");
  });
});
