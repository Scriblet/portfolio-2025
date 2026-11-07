import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import useScrollDirection from "./useScrollDirection";

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

describe("useScrollDirection", () => {
  beforeEach(() => {
    rafCallbacks = [];
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
      rafCallbacks.push(callback);
      return rafCallbacks.length;
    });
    vi.stubGlobal("cancelAnimationFrame", vi.fn());
    setScrollY(0);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("começa visível e no topo", () => {
    const { result } = renderHook(() => useScrollDirection(10));

    expect(result.current).toEqual({ hidden: false, atTop: true });
  });

  it("esconde ao descer além do limiar e mostra ao subir", () => {
    const { result } = renderHook(() => useScrollDirection(10));

    scrollTo(300);
    expect(result.current.hidden).toBe(true);
    expect(result.current.atTop).toBe(false);

    scrollTo(200);
    expect(result.current.hidden).toBe(false);
  });

  it("não pisca em micro-scrolls menores que o limiar", () => {
    const { result } = renderHook(() => useScrollDirection(10));

    scrollTo(300);
    expect(result.current.hidden).toBe(true);

    scrollTo(305);
    expect(result.current.hidden).toBe(true);

    scrollTo(310);
    expect(result.current.hidden).toBe(true);
  });

  it("sempre mostra dentro da zona de topo", () => {
    const { result } = renderHook(() => useScrollDirection(10));

    scrollTo(300);
    expect(result.current.hidden).toBe(true);

    scrollTo(40);
    expect(result.current.hidden).toBe(false);
    expect(result.current.atTop).toBe(true);
  });

  it("remove os listeners ao desmontar", () => {
    const removeSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useScrollDirection(10));

    unmount();

    expect(removeSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith("resize", expect.any(Function));
  });
});
