import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// Mock window.matchMedia — not available in jsdom
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Mock IntersectionObserver — not available in jsdom
class IntersectionObserverMock implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin = "";
  readonly thresholds: readonly number[] = [];

  constructor(private readonly callback: IntersectionObserverCallback) {}

  observe = (target: Element) => {
    this.callback([{ isIntersecting: false, target } as IntersectionObserverEntry], this);
  };

  disconnect = vi.fn();
  unobserve = vi.fn();
  takeRecords = () => [];
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});
