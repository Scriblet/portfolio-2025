/**
 * Tokens do design system imersivo.
 *
 * Fonte única de verdade em TypeScript para cores, tipografia, espaçamento,
 * raios, vidro e movimento. O equivalente em CSS custom properties vive em
 * `src/styles/design-system.css` e é consumido por toda a aplicação.
 *
 * A página `/immersive` nasceu como laboratório; estes tokens são a base que
 * o portfólio em `/` passa a compartilhar.
 */

export const designTokens = {
  colors: {
    void: "#090b0d",
    void2: "#101317",
    surface: "#18181b",
    paper: "#f1eee8",
    paper2: "#a8afb2",
    muted: "#737a7f",
    lightBg: "#f4f4f5",
    lightSurface: "#ffffff",
    lightText: "#18181b",
    lightText2: "#52525b",
    lightBorder: "#e4e4e7",
    emerald: "#34d399",
    amber: "#e8913c",
    deepTeal: "#2e6b72",
  },
  fonts: {
    display: "Syne",
    body: "Inter",
    mono: "Sora",
  },
  space: {
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
    5: "24px",
    6: "32px",
    7: "48px",
    8: "64px",
    9: "96px",
  },
  radius: {
    sm: "12px",
    md: "16px",
    lg: "24px",
    pill: "999px",
  },
  motion: {
    enter: "800ms",
    hover: "300ms",
    easeOut: "cubic-bezier(0.16, 1, 0.3, 1)",
    revealY: "20px",
  },
} as const;

export type DesignTokens = typeof designTokens;
