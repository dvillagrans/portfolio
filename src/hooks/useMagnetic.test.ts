import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useMagnetic } from "./useMagnetic";

vi.mock("gsap", () => ({
  default: {
    quickTo: vi.fn().mockReturnValue(vi.fn()),
    to: vi.fn(),
  },
}));

vi.mock("@/hooks/useReducedMotion", () => ({
  useReducedMotion: () => false,
}));

describe("useMagnetic", () => {
  it("returns a ref object", () => {
    const { result } = renderHook(() => useMagnetic());
    expect(result.current.ref).toBeDefined();
    expect(typeof result.current.ref).toBe("object");
  });

  it("accepts custom strength and radius options", () => {
    const { result } = renderHook(() =>
      useMagnetic({ strength: 15, radius: 200 })
    );
    expect(result.current.ref).toBeDefined();
  });

  it("returns ref with default options when none provided", () => {
    const { result } = renderHook(() => useMagnetic());
    expect(result.current.ref).toBeDefined();
  });
});
