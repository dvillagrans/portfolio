import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CaseStudyHeroMedia } from "@/components/case-study/CaseStudyHeroMedia";
import { getCaseStudyMedia } from "@/data/case-study-media";

function makeIntersectionObserver(intersecting: boolean) {
  return class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | Document | null = null;
    readonly rootMargin = "";
    readonly thresholds: readonly number[] = [];
    constructor(private readonly callback: IntersectionObserverCallback) {}

    observe = (target: Element) => {
      this.callback([{ isIntersecting: intersecting, target } as IntersectionObserverEntry], this);
    };
    disconnect = vi.fn();
    unobserve = vi.fn();
    takeRecords = () => [];
  };
}

describe("CaseStudyHeroMedia", () => {
  afterEach(() => cleanup());

  beforeEach(() => {
    // Default back to the jsdom stub (not intersecting).
    vi.stubGlobal("IntersectionObserver", makeIntersectionObserver(false));
  });

  it("renders poster image when no video is configured", () => {
    render(<CaseStudyHeroMedia media={getCaseStudyMedia("nyc")} />);
    expect(screen.getByRole("img", { name: /nyc ride-hailing/i })).toBeInTheDocument();
    expect(screen.queryByRole("video")).not.toBeInTheDocument();
  });

  it("does not mount video until lazy load (poster visible first)", () => {
    render(<CaseStudyHeroMedia media={getCaseStudyMedia("covid")} />);
    expect(screen.getByRole("img", { name: /covid-19 risk profiles/i })).toBeInTheDocument();
    expect(screen.queryByRole("video")).not.toBeInTheDocument();
  });

  it("plays video in featured mode only when the scene is active", () => {
    vi.stubGlobal("IntersectionObserver", makeIntersectionObserver(true));
    const { rerender } = render(
      <CaseStudyHeroMedia
        media={getCaseStudyMedia("covid")}
        layout="embedded"
        playback="active-scene"
        isActive={false}
        showControls={false}
      />
    );
    expect(screen.getByRole("img", { name: /covid-19 risk profiles/i })).toBeInTheDocument();
    expect(screen.queryByRole("video")).not.toBeInTheDocument();

    rerender(
      <CaseStudyHeroMedia
        media={getCaseStudyMedia("covid")}
        layout="embedded"
        playback="active-scene"
        isActive
        showControls={false}
      />
    );
    expect(document.querySelector("video")).toBeTruthy();
    expect(document.querySelector("video")?.getAttribute("aria-label")).toMatch(/covid-19 risk profiles/i);
  });

  it("holds active-scene video until the frame is near the viewport", () => {
    vi.stubGlobal("IntersectionObserver", makeIntersectionObserver(false));
    render(
      <CaseStudyHeroMedia
        media={getCaseStudyMedia("covid")}
        layout="embedded"
        playback="active-scene"
        isActive
        showControls={false}
      />
    );
    // Not intersecting → poster image stays, video is not mounted yet.
    expect(screen.getByRole("img", { name: /covid-19 risk profiles/i })).toBeInTheDocument();
    expect(document.querySelector("video")).toBeFalsy();
  });
});
