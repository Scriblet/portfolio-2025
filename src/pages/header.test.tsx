import { act, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createMatchMedia } from "../test/setup";
import { ColorModeProvider } from "../theme/ColorModeProvider";
import { HeroIntroProvider } from "../hooks/useHeroIntro";
import Header from "./header";

const renderHeader = () =>
  render(
    <MemoryRouter>
      <ColorModeProvider initialMode="dark">
        <HeroIntroProvider>
          <Header />
        </HeroIntroProvider>
      </ColorModeProvider>
    </MemoryRouter>,
  );

describe("Header durante a intro do hero", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: createMatchMedia(() => false),
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("fica inerte enquanto o wordmark está em destaque", () => {
    renderHeader();

    const header = screen.getByTestId("site-header");

    expect(header).toHaveAttribute("data-intro", "true");
    expect(header).toHaveAttribute("aria-hidden", "true");
    expect(header).toHaveAttribute("inert");
  });

  it("entra junto da revelação e libera a interação", () => {
    renderHeader();

    const header = screen.getByTestId("site-header");

    act(() => {
      vi.advanceTimersByTime(1200);
    });

    expect(header).toHaveAttribute("data-intro", "true");
    expect(header).not.toHaveAttribute("aria-hidden");
    expect(header).not.toHaveAttribute("inert");

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(header).not.toHaveAttribute("data-intro");
    expect(header).not.toHaveAttribute("aria-hidden");
  });

  it("aparece imediatamente com movimento reduzido", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: createMatchMedia((query) => query.includes("reduce")),
    });

    renderHeader();

    const header = screen.getByTestId("site-header");

    expect(header).not.toHaveAttribute("data-intro");
    expect(header).not.toHaveAttribute("aria-hidden");
    expect(header).not.toHaveAttribute("inert");
  });
});
