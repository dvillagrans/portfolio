import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Colophon from "./Colophon";

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
});

vi.mock("@/i18n/LanguageContext", () => ({
  useLanguage: () => ({
    t: {
      colophon: {
        fontCredit: "Typography: EB Garamond by Google Fonts",
        deployLabel: "Last deploy",
        scoreLabel: "Lighthouse",
      },
    },
  }),
}));

describe("Colophon", () => {
  it("renders three columns: font credits, deploy timestamp, lighthouse score", () => {
    vi.stubEnv("NEXT_PUBLIC_DEPLOY_TIMESTAMP", "2025-06-01T12:00:00Z");
    vi.stubEnv("NEXT_PUBLIC_LIGHTHOUSE_SCORE", "98");
    render(<Colophon />);

    expect(screen.getByText(/EB Garamond/)).toBeInTheDocument();
    expect(screen.getByText(/2025/)).toBeInTheDocument();
    expect(screen.getByText("98")).toBeInTheDocument();
  });

  it("falls back to build time when NEXT_PUBLIC_DEPLOY_TIMESTAMP is missing", () => {
    vi.stubEnv("NEXT_PUBLIC_DEPLOY_TIMESTAMP", "");
    vi.stubEnv("NEXT_PUBLIC_LIGHTHOUSE_SCORE", "95");
    render(<Colophon />);

    // Should show build time with (build) suffix
    expect(screen.getByText(/\(build\)/)).toBeInTheDocument();
  });

  it("hides lighthouse column when score env var is missing", () => {
    vi.stubEnv("NEXT_PUBLIC_DEPLOY_TIMESTAMP", "2025-06-01T12:00:00Z");
    vi.stubEnv("NEXT_PUBLIC_LIGHTHOUSE_SCORE", "");
    render(<Colophon />);

    expect(screen.queryByText(/Lighthouse/i)).not.toBeInTheDocument();
  });

  it("renders font credit with designer attribution", () => {
    render(<Colophon />);
    expect(screen.getByText(/EB Garamond/)).toBeInTheDocument();
    expect(screen.getByText(/Google Fonts/)).toBeInTheDocument();
  });
});
