import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createMatchMedia } from "../test/setup";
import { HeroIntroProvider } from "../hooks/useHeroIntro";
import Presentation from "./presentation";

const renderPresentation = () =>
  render(
    <HeroIntroProvider>
      <Presentation />
    </HeroIntroProvider>,
  );

describe("Presentation hero", () => {
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

  it("começa com as cortinas fechadas e o wordmark como chegada", () => {
    renderPresentation();

    const hero = screen.getByTestId("presentation-section");

    expect(hero).toHaveAttribute("data-intro", "true");
    expect(hero).toHaveAttribute("data-intro-phase", "curtains");
    expect(screen.getByTestId("presentation-wordmark")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("mantém o h1 acessível durante toda a intro", () => {
    renderPresentation();

    const title = screen.getByRole("heading", { level: 1 });

    expect(title).toHaveTextContent("Lucas Nonato");
    expect(screen.getByTestId("presentation-section")).toHaveAttribute(
      "aria-labelledby",
      "presentation-title",
    );
  });

  it("libera a composição final ao fim da timeline", () => {
    renderPresentation();

    const hero = screen.getByTestId("presentation-section");

    act(() => {
      vi.advanceTimersByTime(1200);
    });
    expect(hero).toHaveAttribute("data-intro-phase", "content");

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(hero).toHaveAttribute("data-intro-phase", "complete");
    expect(hero).not.toHaveAttribute("data-intro");
  });
});
