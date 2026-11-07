import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import useReadingProgress from "./useReadingProgress";

const setLayout = (scrollHeight: number, innerHeight: number) => {
  Object.defineProperty(document.documentElement, "scrollHeight", {
    configurable: true,
    value: scrollHeight,
  });
  Object.defineProperty(window, "innerHeight", {
    configurable: true,
    value: innerHeight,
  });
};

const setScrollY = (value: number) => {
  Object.defineProperty(window, "scrollY", {
    configurable: true,
    value,
  });
};

let rafCallbacks: FrameRequestCallback[] = [];

const flushRaf = () => {
  const callbacks = rafCallbacks;
  rafCallbacks = [];
  callbacks.forEach((callback) => callback(0));
};

const scrollTo = (value: number) => {
  act(() => {
    setScrollY(value);
    window.dispatchEvent(new Event("scroll"));
    flushRaf();
  });
};

describe("useReadingProgress", () => {
  beforeEach(() => {
    rafCallbacks = [];
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
      rafCallbacks.push(callback);
      return rafCallbacks.length;
    });
    vi.stubGlobal("cancelAnimationFrame", vi.fn());
    setLayout(2000, 1000);
    setScrollY(0);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("começa em 0 no topo", () => {
    const { result } = renderHook(() => useReadingProgress());

    expect(result.current).toBe(0);
  });

  it("calcula a metade e o fim da página", () => {
    const { result } = renderHook(() => useReadingProgress());

    scrollTo(500);
    expect(result.current).toBeCloseTo(0.5, 5);

    scrollTo(1000);
    expect(result.current).toBe(1);
  });

  it("faz clamp acima do fim da página", () => {
    const { result } = renderHook(() => useReadingProgress());

    scrollTo(1500);
    expect(result.current).toBe(1);
  });

  it("protege contra scroll negativo (rubber-band)", () => {
    const { result } = renderHook(() => useReadingProgress());

    scrollTo(-80);
    expect(result.current).toBe(0);
  });

  it("retorna 0 quando a página não tem altura rolável", () => {
    setLayout(800, 1000);

    const { result } = renderHook(() => useReadingProgress());

    expect(result.current).toBe(0);
  });
});
