import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCoarsePointer } from "./useCoarsePointer";

interface MqlChangeEvent {
  matches: boolean;
}

function stubMatchMedia(matches: boolean) {
  const listeners: Array<(e: MqlChangeEvent) => void> = [];
  const matchMediaMock = vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: (_type: string, cb: (e: MqlChangeEvent) => void) => {
      listeners.push(cb);
    },
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }));
  window.matchMedia = matchMediaMock;
  return { matchMediaMock, listeners };
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("useCoarsePointer", () => {
  it("is false on desktop / fine-pointer viewports", () => {
    stubMatchMedia(false);
    const { result } = renderHook(() => useCoarsePointer());
    expect(result.current).toBe(false);
  });

  it("is true on mobile / coarse-pointer viewports", () => {
    stubMatchMedia(true);
    const { result } = renderHook(() => useCoarsePointer());
    expect(result.current).toBe(true);
  });

  it("targets the mobile budget media query", () => {
    const { matchMediaMock } = stubMatchMedia(false);
    renderHook(() => useCoarsePointer());
    const query = matchMediaMock.mock.calls[0][0] as string;
    expect(query).toMatch(/hover: none/);
    expect(query).toMatch(/max-width: 767px/);
  });

  it("reacts to media query changes", () => {
    const { listeners } = stubMatchMedia(false);
    const { result } = renderHook(() => useCoarsePointer());
    expect(result.current).toBe(false);

    act(() => listeners[0]?.({ matches: true }));
    expect(result.current).toBe(true);

    act(() => listeners[0]?.({ matches: false }));
    expect(result.current).toBe(false);
  });

  it("reads the coarse state synchronously on mount (no effect round-trip)", () => {
    const { matchMediaMock } = stubMatchMedia(true);
    const { result } = renderHook(() => useCoarsePointer());
    expect(result.current).toBe(true);
    expect(matchMediaMock).toHaveBeenCalled();
  });

  it("resolves to false synchronously on desktop viewports", () => {
    const { matchMediaMock } = stubMatchMedia(false);
    const { result } = renderHook(() => useCoarsePointer());
    expect(result.current).toBe(false);
    expect(matchMediaMock).toHaveBeenCalled();
  });
});
