import { describe, expect, it } from "vitest";
import { CV_DATA } from "@/data/cv";
import { selectCvContext } from "@/lib/cv/select";
import { formatSelectionSummary } from "@/lib/cv/format-selection";

describe("formatSelectionSummary", () => {
  it("maps selection ids to readable labels", () => {
    const selection = selectCvContext(
      CV_DATA,
      "Python machine learning PySpark data pipeline Azure ETL dashboards"
    );
    const summary = formatSelectionSummary(CV_DATA, selection);

    expect(summary.projects.length).toBeGreaterThanOrEqual(3);
    expect(summary.projects[0]?.name.length).toBeGreaterThan(0);
    expect(summary.experience.length).toBeGreaterThanOrEqual(1);
    expect(summary.skills.length).toBeGreaterThan(0);
  });
});
