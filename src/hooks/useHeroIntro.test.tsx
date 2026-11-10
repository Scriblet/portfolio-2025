import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createMatchMedia } from "../test/setup";
import { useHeroIntro } from "./heroIntroContext";
import { HeroIntroProvider } from "./useHeroIntro";

const Probe = () => {
  const { phase, isIntro, introComplete } = useHeroIntro();

  return (
    <>
      <span data-testid="phase">{phase}</span>
      <span data-testid="is-intro">{String(isIntro)}</span>
      <span data-testid="intro-complete">{String(introComplete)}</span>
    </>
  );
};

const renderIntro = () =>
  render(
    <HeroIntroProvider>
      <Probe />
    </HeroIntroProvider>,
  );

describe("useHeroIntro", () => {
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
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: createMatchMedia(() => false),
    });
  });

  it("avança de cortinas para conteúdo e conclusão", () => {
    renderIntro();

    expect(screen.getByTestId("phase")).toHaveTextContent("curtains");
    expect(screen.getByTestId("is-intro")).toHaveTextContent("true");
    expect(document.documentElement.dataset.heroIntro).toBe("curtains");

    act(() => {
      vi.advanceTimersByTime(1200);
    });

    expect(screen.getByTestId("phase")).toHaveTextContent("content");
    expect(document.documentElement.dataset.heroIntro).toBe("content");

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByTestId("phase")).toHaveTextContent("complete");
    expect(screen.getByTestId("intro-complete")).toHaveTextContent("true");
    expect(document.documentElement.dataset.heroIntro).toBe("complete");
  });

  it("mostra o estado final imediatamente com movimento reduzido", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: createMatchMedia((query) => query.includes("reduce")),
    });

    renderIntro();

    expect(screen.getByTestId("phase")).toHaveTextContent("complete");
    expect(screen.getByTestId("is-intro")).toHaveTextContent("false");
    expect(document.documentElement.dataset.heroIntro).toBe("complete");
  });

  it("remove o atributo global ao desmontar", () => {
    const { unmount } = renderIntro();

    expect(document.documentElement).toHaveAttribute("data-hero-intro");

    unmount();

    expect(document.documentElement).not.toHaveAttribute("data-hero-intro");
  });
});
