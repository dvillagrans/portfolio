import { describe, it, expect } from "vitest";
import { DEFAULT_STOPS } from "./useSectionHue";

describe("useSectionHue exports", () => {
  it("exports DEFAULT_STOPS as a non-empty array", () => {
    expect(Array.isArray(DEFAULT_STOPS)).toBe(true);
    expect(DEFAULT_STOPS.length).toBeGreaterThan(0);
  });

  it("each stop has sectionId, accent, accentLight, and optional label", () => {
    for (const stop of DEFAULT_STOPS) {
      expect(typeof stop.sectionId).toBe("string");
      expect(stop.sectionId.length).toBeGreaterThan(0);
      expect(typeof stop.accent).toBe("string");
      expect(typeof stop.accentLight).toBe("string");
      if (stop.label !== undefined) {
        expect(typeof stop.label).toBe("string");
      }
    }
  });

  it("includes hero, projects, and contact sections", () => {
    const ids = DEFAULT_STOPS.map((s) => s.sectionId);
    expect(ids).toContain("hero");
    expect(ids).toContain("projects");
    expect(ids).toContain("contact");
  });
});
