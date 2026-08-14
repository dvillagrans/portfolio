import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { CommandPaletteProvider } from "@/hooks/CommandPaletteContext";
import { CommandPaletteLazy } from "./CommandPaletteLazy";

afterEach(() => {
  cleanup();
});

vi.mock("./CommandPalette", () => ({
  CommandPalette: () => <div data-testid="palette">Command palette</div>,
}));

describe("CommandPaletteLazy", () => {
  it("renders nothing while closed", () => {
    render(
      <CommandPaletteProvider>
        <CommandPaletteLazy />
      </CommandPaletteProvider>
    );
    expect(screen.queryByTestId("palette")).not.toBeInTheDocument();
  });

  it("mounts the palette module only when opened", async () => {
    render(
      <CommandPaletteProvider>
        <CommandPaletteLazy />
      </CommandPaletteProvider>
    );
    expect(screen.queryByTestId("palette")).not.toBeInTheDocument();

    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    expect(await screen.findByTestId("palette")).toBeInTheDocument();
  });
});
