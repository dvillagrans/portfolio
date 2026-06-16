import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import ProjectSpotlight from "./ProjectSpotlight";
import type { ProjectItem } from "@/i18n/types";

afterEach(() => {
  cleanup();
});

vi.mock("gsap", () => ({
  default: {
    fromTo: vi.fn(),
    to: vi.fn(),
    context: vi.fn().mockReturnValue({ revert: vi.fn() }),
    set: vi.fn(),
  },
}));

vi.mock("@/hooks/useReducedMotion", () => ({
  useReducedMotion: () => true,
}));

vi.mock("@/i18n/LanguageContext", () => ({
  useLanguage: () => ({
    language: "en",
    t: {
      work: {
        labelScope: "Problem",
        labelSystem: "Solution",
        labelOutcome: "Impact",
        labelRole: "My role",
      },
    },
  }),
}));

const mockProject: ProjectItem = {
  id: "test-01",
  type: "grid",
  context: "Test",
  category: "Test Category",
  title: "Test Project Title",
  subtitle: "Test subtitle",
  problem: "Test problem description",
  system: "Test system description",
  outcome: "Test outcome",
  role: "Full-stack · Testing",
  image: "/img/test.webp",
  tags: ["React", "TypeScript"],
  metrics: [{ value: "100%", label: "accuracy" }],
  links: [{ label: "Live", url: "https://example.com" }],
  href: "https://example.com",
};

describe("ProjectSpotlight", () => {
  it("renders nothing when closed", () => {
    const { container } = render(
      <ProjectSpotlight project={null} open={false} onClose={vi.fn()} />
    );
    expect(container.innerHTML).toBe("");
  });

  it("renders project title when open", () => {
    render(
      <ProjectSpotlight project={mockProject} open={true} onClose={vi.fn()} />
    );
    expect(screen.getByText("Test Project Title")).toBeInTheDocument();
  });

  it("renders tags", () => {
    render(
      <ProjectSpotlight project={mockProject} open={true} onClose={vi.fn()} />
    );
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("calls onClose when ESC is pressed", () => {
    const onClose = vi.fn();
    render(
      <ProjectSpotlight project={mockProject} open={true} onClose={onClose} />
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when backdrop is clicked", () => {
    const onClose = vi.fn();
    const { container } = render(
      <ProjectSpotlight project={mockProject} open={true} onClose={onClose} />
    );
    const backdrop = container.querySelector("[data-spotlight-backdrop]");
    if (backdrop) fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders Visit CTA for external projects", () => {
    render(
      <ProjectSpotlight project={mockProject} open={true} onClose={vi.fn()} />
    );
    expect(screen.getByText("Open project")).toBeInTheDocument();
  });
});
