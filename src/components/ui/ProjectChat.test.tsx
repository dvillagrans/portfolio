import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { ProjectChat } from "./ProjectChat";

afterEach(() => {
  cleanup();
});

vi.mock("gsap", () => ({
  default: {
    context: vi.fn().mockReturnValue({ revert: vi.fn() }),
    set: vi.fn(),
    to: vi.fn(),
    fromTo: vi.fn(),
    timeline: vi.fn(() => ({ to: vi.fn() })),
    delayedCall: vi.fn(),
  },
}));

vi.mock("@/hooks/useReducedMotion", () => ({
  useReducedMotion: () => true,
}));

vi.mock("@/i18n/LanguageContext", () => ({
  useLanguage: () => ({
    language: "en",
    t: {},
  }),
}));

vi.mock("./ProjectChatPanel", () => ({
  ProjectChatPanel: ({ open, onClose }: { open: boolean; onClose: () => void }) =>
    open ? (
      <div role="dialog" aria-label="Chat panel mock">
        <span>Panel loaded</span>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    ) : null,
}));

describe("ProjectChat", () => {
  it("renders the trigger button on load", () => {
    render(<ProjectChat />);
    expect(screen.getByRole("button", { name: /open portfolio chat/i })).toBeInTheDocument();
    // Heavy panel (react-markdown + AI SDK) is not mounted until opened.
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("mounts the chat panel only after the trigger is clicked", async () => {
    render(<ProjectChat />);
    fireEvent.click(screen.getByRole("button", { name: /open portfolio chat/i }));
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveTextContent("Panel loaded");
  });
});
