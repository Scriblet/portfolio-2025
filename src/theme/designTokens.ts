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
    void: "#080411",
    void2: "#110822",
    surface: "#1a1033",
    paper: "#f4eefa",
    paper2: "#b3a6c9",
    muted: "#7d6d96",
    lightBg: "#f8f6fa",
    lightSurface: "#ffffff",
    lightText: "#140d20",
    lightText2: "#584d6b",
    lightBorder: "#e6dfed",
    neonViolet: "#a324ff",
    magentaGlow: "#dd3df5",
    deepPurple: "#462085",
    violetAccent: "#7e18d6",
    magentaAccent: "#bc1ecf",
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
