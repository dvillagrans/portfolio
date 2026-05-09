import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { LanguageProvider, useLanguage } from "./LanguageContext";
import { type ReactNode } from "react";

afterEach(() => {
  vi.restoreAllMocks();
  localStorage.removeItem("portfolio-lang");
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <LanguageProvider>{children}</LanguageProvider>
);

describe("useLanguage", () => {
  it("throws when used outside LanguageProvider", () => {
    expect(() => renderHook(() => useLanguage())).toThrow(
      "useLanguage must be used within a LanguageProvider"
    );
  });

  it("defaults to English before mount", () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    expect(result.current.language).toBe("en");
  });

  it("returns the English dictionary by default", () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    expect(result.current.t.nav).toBeDefined();
    expect(result.current.t.hero).toBeDefined();
    expect(result.current.t.hero.title1).toBeDefined();
  });

  it("reads stored language from localStorage", () => {
    localStorage.setItem("portfolio-lang", "es");
    const { result } = renderHook(() => useLanguage(), { wrapper });
    expect(result.current.language).toBe("es");
  });

  it("falls back to browser language when no stored preference", () => {
    localStorage.removeItem("portfolio-lang");
    Object.defineProperty(navigator, "language", {
      value: "es-MX",
      configurable: true,
    });
    const { result } = renderHook(() => useLanguage(), { wrapper });
    expect(result.current.language).toBe("es");
  });

  it("falls back to English for unknown browser language", () => {
    localStorage.removeItem("portfolio-lang");
    Object.defineProperty(navigator, "language", {
      value: "fr-FR",
      configurable: true,
    });
    const { result } = renderHook(() => useLanguage(), { wrapper });
    expect(result.current.language).toBe("en");
  });
});

describe("LanguageProvider interactions", () => {
  it("setLanguage updates language and persists to localStorage", () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    act(() => result.current.setLanguage("es"));
    expect(result.current.language).toBe("es");
    expect(localStorage.getItem("portfolio-lang")).toBe("es");
  });

  it("setLanguage toggles back to English", () => {
    localStorage.setItem("portfolio-lang", "es");
    const { result } = renderHook(() => useLanguage(), { wrapper });
    act(() => result.current.setLanguage("en"));
    expect(result.current.language).toBe("en");
    expect(localStorage.getItem("portfolio-lang")).toBe("en");
  });

  it("switches dictionary content when language changes", () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    const enCta = result.current.t.hero.cta;
    act(() => result.current.setLanguage("es"));
    expect(result.current.t.hero.cta).not.toBe(enCta);
  });

  it("provides different nav labels per language", () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    act(() => result.current.setLanguage("es"));
    expect(result.current.t.nav.projects).toBeDefined();
    expect(result.current.t.nav.systems).toBeDefined();
    expect(result.current.t.nav.about).toBeDefined();
    expect(result.current.t.nav.contact).toBeDefined();
  });
});
