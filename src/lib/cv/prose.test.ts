import { describe, expect, it } from "vitest";
import { sanitizeProseDashes } from "./prose";

describe("sanitizeProseDashes", () => {
  it("replaces em dash separators with commas", () => {
    expect(sanitizeProseDashes("I built EyeNet — a production platform.")).toBe(
      "I built EyeNet, a production platform."
    );
  });

  it("replaces spaced hyphen separators", () => {
    expect(sanitizeProseDashes("We shipped fast - with strong observability.")).toBe(
      "We shipped fast, with strong observability."
    );
  });

  it("keeps hyphens inside words and numbers", () => {
    expect(sanitizeProseDashes("Full-stack work on COVID-19 at ESCOM-IPN.")).toBe(
      "Full-stack work on COVID-19 at ESCOM-IPN."
    );
  });

  it("converts markdown bullets to bullet glyphs", () => {
    expect(sanitizeProseDashes("- First point\n- Second point")).toBe(
      "• First point\n• Second point"
    );
  });
});
