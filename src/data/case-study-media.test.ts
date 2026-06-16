import { describe, expect, it } from "vitest";
import { caseStudyMedia, getCaseStudyMedia, resolveCaseStudyMediaFromProject } from "./case-study-media";

describe("case-study-media", () => {
  it("exposes poster paths for every editorial slug", () => {
    for (const slug of ["covid", "nyc", "india"] as const) {
      const media = getCaseStudyMedia(slug);
      expect(media.slug).toBe(slug);
      expect(media.poster.startsWith("/img/")).toBe(true);
      expect(media.alt.length).toBeGreaterThan(0);
    }
  });

  it("registers covid demo video under public/videos", () => {
    expect(caseStudyMedia.covid.video).toEqual({ mp4: "/videos/covid.mp4" });
  });

  it("leaves nyc and india as poster-only until videos are added", () => {
    expect(getCaseStudyMedia("nyc").video).toBeUndefined();
    expect(getCaseStudyMedia("india").video).toBeUndefined();
  });

  it("resolves media from featured project case study paths", () => {
    expect(resolveCaseStudyMediaFromProject({ href: "/projects/covid", caseStudy: "/projects/covid" })?.slug).toBe(
      "covid"
    );
    expect(resolveCaseStudyMediaFromProject({ href: "/projects/eyenet" })).toBeNull();
  });
});
