import type { PaletteOptions } from "@mui/material/styles";

/** Modos de aparência suportados pelo portfólio. */
export type ColorMode = "light" | "dark";

/** Chave usada para persistir a escolha do usuário. */
export const COLOR_MODE_STORAGE_KEY = "portfolio-color-mode";

/** Cor da barra do navegador (meta[name="theme-color"]) por modo. */
export const THEME_COLOR_META: Record<ColorMode, string> = {
  dark: "#121212",
  light: "#f5f3f7",
};

/**
 * Cor do anel de foco por modo. Precisa de contraste tanto sobre o fundo
 * quanto sobre superfícies elevadas (cards/papers).
 */
export const FOCUS_RING_COLOR: Record<ColorMode, string> = {
  dark: "#22d3ee",
  light: "#00695c",
};

/**
 * Tokens compartilhados de estado interativo.
 *
 * Duração/curva únicas para hover, focus e active. As transições só tocam
 * propriedades baratas (cor, sombra, opacidade) para não forçar layout.
 */
export const interactiveTokens = {
  duration: "150ms",
  easing: "ease-out",
  transition:
    "color 150ms ease-out, background-color 150ms ease-out, border-color 150ms ease-out, box-shadow 150ms ease-out, opacity 150ms ease-out",
  focusRingWidth: "3px",
  focusRingOffset: "2px",
} as const;

export const isColorMode = (value: unknown): value is ColorMode =>
  value === "light" || value === "dark";

/** Paleta escura: identidade atual do portfólio. */
export const darkPalette: PaletteOptions = {
  mode: "dark",
  primary: {
    main: "#673ab7",
  },
  secondary: {
    main: "#800080",
  },
  warning: {
    main: "#ed6c02",
  },
  background: {
    default: "#121212",
    paper: "#1e1e1e",
  },
  text: {
    primary: "#ffffff",
    secondary: "#c2c2c2", // contraste AA sobre #121212 e #1e1e1e
  },
  divider: "rgba(255, 255, 255, 0.12)",
};

/**
 * Paleta clara: fundo levemente lilás (nunca branco puro), paper branco e
 * textos com contraste AA. Mantém o roxo primário da identidade.
 */
export const lightPalette: PaletteOptions = {
  mode: "light",
  primary: {
    main: "#673ab7",
  },
  secondary: {
    main: "#800080",
  },
  background: {
    default: "#f5f3f7",
    paper: "#ffffff",
  },
  text: {
    primary: "#1a1a1a",
    secondary: "#4a4a4a",
  },
  divider: "rgba(0, 0, 0, 0.12)",
};

export const getPalette = (mode: ColorMode): PaletteOptions =>
  mode === "light" ? lightPalette : darkPalette;
