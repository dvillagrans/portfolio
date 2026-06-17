import { describe, expect, it } from "vitest";
import { CV_DATA } from ".";

describe("CV_DATA", () => {
  it("has a stable profile and projects corpus", () => {
    expect(CV_DATA.profile.name.length).toBeGreaterThan(5);
    expect(CV_DATA.projects.length).toBeGreaterThanOrEqual(6);
    expect(CV_DATA.projects.some((p) => p.id === "covid")).toBe(true);
    expect(CV_DATA.projects.every((p) => p.impactBullets.length >= 3)).toBe(true);
  });
});

