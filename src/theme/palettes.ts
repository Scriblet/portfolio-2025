import type { PaletteOptions } from "@mui/material/styles";
import { designTokens } from "./designTokens";

/** Modos de aparência suportados pelo portfólio. */
export type ColorMode = "light" | "dark";

/** Chave usada para persistir a escolha do usuário. */
export const COLOR_MODE_STORAGE_KEY = "portfolio-color-mode";

/** Cor da barra do navegador (meta[name="theme-color"]) por modo. */
export const THEME_COLOR_META: Record<ColorMode, string> = {
  dark: designTokens.colors.void,
  light: designTokens.colors.lightBg,
};

/**
 * Cor do anel de foco por modo. Precisa de contraste tanto sobre o fundo
 * quanto sobre superfícies elevadas (cards/papers).
 */
export const FOCUS_RING_COLOR: Record<ColorMode, string> = {
  dark: designTokens.colors.emerald,
  light: designTokens.colors.deepTeal,
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

/** Paleta escura: identidade imersiva principal. */
export const darkPalette: PaletteOptions = {
  mode: "dark",
  primary: {
    main: designTokens.colors.emerald,
    contrastText: designTokens.colors.void,
  },
  secondary: {
    main: designTokens.colors.amber,
    contrastText: designTokens.colors.void,
  },
  warning: {
    main: designTokens.colors.amber,
  },
  background: {
    default: designTokens.colors.void,
    paper: designTokens.colors.void2,
  },
  text: {
    primary: designTokens.colors.paper,
    secondary: designTokens.colors.paper2,
  },
  divider: "rgba(241, 238, 232, 0.13)",
};

/**
 * Paleta clara: mesma linguagem imersiva sobre papel. O teal profundo garante
 * contraste AA para links e botões; o âmbar permanece como destaque editorial.
 */
export const lightPalette: PaletteOptions = {
  mode: "light",
  primary: {
    main: designTokens.colors.deepTeal,
    contrastText: designTokens.colors.lightSurface,
  },
  secondary: {
    main: "#b45309",
    contrastText: designTokens.colors.lightSurface,
  },
  warning: {
    main: "#b45309",
  },
  background: {
    default: designTokens.colors.lightBg,
    paper: designTokens.colors.lightSurface,
  },
  text: {
    primary: designTokens.colors.lightText,
    secondary: designTokens.colors.lightText2,
  },
  divider: "rgba(24, 24, 27, 0.12)",
};

export const getPalette = (mode: ColorMode): PaletteOptions =>
  mode === "light" ? lightPalette : darkPalette;
