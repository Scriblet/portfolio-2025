import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  ColorModeProvider,
  getInitialColorMode,
  getSystemColorMode,
  readStoredColorMode,
  useColorMode,
} from "./ColorModeProvider";

const STORAGE_KEY = "portfolio-color-mode";

const mockSystemMode = (mode: "light" | "dark" | null) => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: mode !== null && query.includes(mode),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
};

const Probe = () => {
  const { mode, toggleMode } = useColorMode();
  return <button onClick={toggleMode}>{mode}</button>;
};

describe("color mode preference", () => {
  it("lê a escolha salva válida e ignora valor inválido", () => {
    window.localStorage.setItem(STORAGE_KEY, "light");
    expect(readStoredColorMode()).toBe("light");

    window.localStorage.setItem(STORAGE_KEY, "neon");
    expect(readStoredColorMode()).toBeNull();
  });

  it("cai para null quando o storage lança", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });

    expect(readStoredColorMode()).toBeNull();
  });

  it("lê prefers-color-scheme", () => {
    mockSystemMode("dark");
    expect(getSystemColorMode()).toBe("dark");

    mockSystemMode("light");
    expect(getSystemColorMode()).toBe("light");

    mockSystemMode(null);
    expect(getSystemColorMode()).toBeNull();
  });

  it("prioriza localStorage, depois sistema, depois escuro", () => {
    mockSystemMode("light");
    window.localStorage.setItem(STORAGE_KEY, "dark");
    expect(getInitialColorMode()).toBe("dark");

    window.localStorage.clear();
    expect(getInitialColorMode()).toBe("light");

    mockSystemMode(null);
    expect(getInitialColorMode()).toBe("dark");
  });

  it("aplica e persiste a troca de tema", () => {
    render(
      <ColorModeProvider initialMode="dark">
        <Probe />
      </ColorModeProvider>,
    );

    const toggle = screen.getByRole("button");
    expect(toggle).toHaveTextContent("dark");
    expect(document.documentElement).toHaveAttribute(
      "data-mui-color-scheme",
      "dark",
    );

    fireEvent.click(toggle);

    expect(toggle).toHaveTextContent("light");
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe("light");
    expect(document.documentElement).toHaveAttribute(
      "data-mui-color-scheme",
      "light",
    );
  });

  it("não quebra quando o storage está indisponível para escrita", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("quota");
    });

    render(
      <ColorModeProvider initialMode="dark">
        <Probe />
      </ColorModeProvider>,
    );

    const toggle = screen.getByRole("button");
    expect(() => fireEvent.click(toggle)).not.toThrow();
    expect(toggle).toHaveTextContent("light");
  });
});
