import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { ThemeProvider, useTheme } from "./ThemeContext";
import { type ReactNode } from "react";

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe("useTheme", () => {
  it("throws when used outside ThemeProvider", () => {
    expect(() => renderHook(() => useTheme())).toThrow(
      "useTheme must be used within ThemeProvider"
    );
  });

  it("has initial useState value of dark before effect runs", () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    // Before effects settle, the initial state is "dark"
    expect(result.current.theme).toBe("dark");
  });

  it("reads stored theme from localStorage after mount", () => {
    localStorage.setItem("theme", "light");
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.theme).toBe("light");
  });

  it("falls back to system preference when no stored theme", () => {
    // System prefers dark (matchMedia.matches = false from setup)
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.theme).toBe("dark");
  });

  it("persists theme to localStorage on change", () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    act(() => result.current.setTheme("light"));
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("applies data-theme attribute on change", () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    act(() => result.current.setTheme("light"));
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    act(() => result.current.setTheme("dark"));
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  it("removes no-transition class on mount", () => {
    document.documentElement.classList.add("no-transition");
    renderHook(() => useTheme(), { wrapper });
    expect(document.documentElement.classList.contains("no-transition")).toBe(
      false
    );
  });
});

describe("ThemeProvider interactions", () => {
  it("toggleTheme switches from dark to light", () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.theme).toBe("dark");
    act(() => result.current.toggleTheme());
    expect(result.current.theme).toBe("light");
  });

  it("toggleTheme switches back from light to dark", () => {
    localStorage.setItem("theme", "light");
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.theme).toBe("light");
    act(() => result.current.toggleTheme());
    expect(result.current.theme).toBe("dark");
  });

  it("setTheme changes theme directly", () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    act(() => result.current.setTheme("light"));
    expect(result.current.theme).toBe("light");
    act(() => result.current.setTheme("dark"));
    expect(result.current.theme).toBe("dark");
  });
});
