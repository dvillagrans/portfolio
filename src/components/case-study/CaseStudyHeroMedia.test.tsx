import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { CaseStudyHeroMedia } from "@/components/case-study/CaseStudyHeroMedia";
import { getCaseStudyMedia } from "@/data/case-study-media";

describe("CaseStudyHeroMedia", () => {
  afterEach(() => cleanup());

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
});
