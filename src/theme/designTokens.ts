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
    void: "#0a0814",
    void2: "#120e22",
    surface: "#1e1830",
    paper: "#f2eefb",
    paper2: "#a9a0c4",
    muted: "#6b6285",
    lightBg: "#f7f5fa",
    lightSurface: "#ffffff",
    lightText: "#181023",
    lightText2: "#5a526e",
    lightBorder: "#ddd7ec",
    violet: "#7c3aed",
    magenta: "#c026d3",
    deepPurple: "#4c1d95",
    violetAccent: "#6d28d9",
    magentaAccent: "#a21caf",
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
