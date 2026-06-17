import { describe, expect, it } from "vitest";
import { CV_PROFILE } from "@/data/cv/profile";
import { renderCoverLetter } from "./cover-letter";

describe("renderCoverLetter", () => {
  it("renders greeting, body, closing, and contact", () => {
    const text = renderCoverLetter(CV_PROFILE, {
      greeting: "Dear Hiring Team,",
      paragraphs: [
        "I am applying for the Data Scientist role. At EyeNet I reduced manual document work by 65%.",
        "My COVID risk profiles project clustered 30M+ records into 9 interpretable groups.",
      ],
      closing: "Best regards,",
    });

    expect(text).toContain("Dear Hiring Team,");
    expect(text).toContain("65%");
    expect(text).toContain(CV_PROFILE.name);
    expect(text).toContain(CV_PROFILE.email);
  });
});
