import { alpha, createTheme, responsiveFontSizes } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";
import { designTokens } from "./theme/designTokens";
import {
  FOCUS_RING_COLOR,
  getPalette,
  interactiveTokens,
  type ColorMode,
} from "./theme/palettes";

const { transition } = interactiveTokens;

/** Anel de foco: sempre com forma (outline), nunca apenas cor. */
const focusRing = (mode: ColorMode) => ({
  outline: `${interactiveTokens.focusRingWidth} solid ${FOCUS_RING_COLOR[mode]}`,
  outlineOffset: interactiveTokens.focusRingOffset,
});

/**
 * Com movimento reduzido as microinterações não deslocam nem escalam:
 * restam apenas mudanças instantâneas de cor/sombra.
 */
const reducedMotion = {
  transition: "none",
  transform: "none",
  animation: "none",
  "&:hover": {
    transform: "none",
  },
  "&:active": {
    transform: "none",
  },
} as const;

/**
 * Cria o tema da aplicação para o modo informado.
 *
 * Fonte única de verdade para tipografia, breakpoints, paletas e tokens de
 * estado interativo (hover/focus-visible/active + reduced motion).
 */
export const createAppTheme = (mode: ColorMode): Theme => {
  const focus = focusRing(mode);
  const isDark = mode === "dark";

  const baseTheme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    typography: {
      fontFamily: "'Inter', sans-serif",
      // Escala modular responsiva (1.333 - terceira maioria)
      h1: {
        fontFamily: "'Syne', sans-serif",
        fontSize: "clamp(2.2rem, 6vw, 4.2rem)",
        fontWeight: 800,
        lineHeight: 0.98,
        letterSpacing: "-0.04em",
      },
      h2: {
        fontFamily: "'Syne', sans-serif",
        fontSize: "clamp(1.8rem, 4.5vw, 3.2rem)",
        fontWeight: 700,
        lineHeight: 1.02,
        letterSpacing: "-0.035em",
      },
      h3: {
        fontFamily: "'Syne', sans-serif",
        fontSize: "clamp(1.4rem, 3.2vw, 2.2rem)",
        fontWeight: 700,
        lineHeight: 1.15,
        letterSpacing: "-0.02em",
      },
      h4: {
        fontFamily: "'Syne', sans-serif",
        fontSize: "clamp(1.15rem, 2.5vw, 1.6rem)",
        fontWeight: 600,
        lineHeight: 1.25,
        letterSpacing: "-0.015em",
      },
      h5: {
        fontFamily: "'Syne', sans-serif",
        fontSize: "clamp(1rem, 2vw, 1.25rem)",
        fontWeight: 600,
        lineHeight: 1.35,
      },
      h6: {
        fontFamily: "'Syne', sans-serif",
        fontSize: "clamp(0.95rem, 1.8vw, 1.125rem)",
        fontWeight: 600,
        lineHeight: 1.4,
      },
      subtitle1: {
        fontSize: "clamp(0.875rem, 1.5vw, 1rem)", // 16px
        fontWeight: 500,
        lineHeight: 1.6,
        letterSpacing: "0.01em",
      },
      subtitle2: {
        fontSize: "clamp(0.8rem, 1.2vw, 0.875rem)", // 14px
        fontWeight: 500,
        lineHeight: 1.6,
        letterSpacing: "0.01em",
      },
      body1: {
        fontSize: "clamp(0.875rem, 1.5vw, 1rem)", // 16px (base)
        fontWeight: 400,
        lineHeight: 1.65,
      },
      body2: {
        fontSize: "clamp(0.75rem, 1.2vw, 0.875rem)", // 14px
        lineHeight: 1.65,
      },
      button: {
        fontFamily: "'Sora', sans-serif",
        fontSize: "clamp(0.7rem, 1.1vw, 0.8rem)",
        textTransform: "uppercase",
        fontWeight: 600,
        letterSpacing: "0.1em",
      },
      caption: {
        fontFamily: "'Sora', sans-serif",
        fontSize: "clamp(0.65rem, 0.9vw, 0.72rem)",
        lineHeight: 1.6,
        letterSpacing: "0.08em",
      },
      overline: {
        fontFamily: "'Sora', sans-serif",
        fontSize: "clamp(0.65rem, 0.9vw, 0.75rem)", // 12px
        fontWeight: 600,
        lineHeight: 1.6,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
      },
    },
    palette: getPalette(mode),
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: isDark
              ? designTokens.colors.void
              : designTokens.colors.lightBg,
            color: isDark
              ? designTokens.colors.paper
              : designTokens.colors.lightText,
            fontFamily: "'Inter', sans-serif",
          },
          a: {
            color: isDark
              ? designTokens.colors.neonViolet
              : designTokens.colors.violetAccent,
          },
          "::selection": {
            backgroundColor: isDark
              ? "rgba(163, 36, 255, 0.28)"
              : "rgba(126, 24, 214, 0.22)",
          },
          html: {
            fontSize: "16px", // Base para cálculo do rem
            "@media (max-width: 1200px)": {
              fontSize: "15px",
            },
            "@media (max-width: 900px)": {
              fontSize: "14px",
            },
            "@media (max-width: 600px)": {
              fontSize: "13px", // Ajuste fino para mobile
            },
            "@media (max-width: 360px)": {
              fontSize: "12px", // Para dispositivos muito pequenos
            },
          },
          "*": {
            scrollBehavior: "smooth",
          },
          // Rede de segurança para qualquer elemento nativo focável que não
          // passe por um componente MUI (âncoras do react-scroll, inputs etc.).
          "a:focus-visible, button:focus-visible, input:focus-visible, textarea:focus-visible, select:focus-visible, [role='button']:focus-visible, [tabindex]:focus-visible":
            focus,
          "@media (prefers-reduced-motion: reduce)": {
            "*": {
              scrollBehavior: "auto",
            },
            "*, *::before, *::after": {
              animationDuration: "0.01ms !important",
              animationIterationCount: "1 !important",
              transitionDuration: "0.01ms !important",
            },
            // Guarda temporária: o card de Skills ainda declara um
            // translateY(-4px) local no hover. Até ele consumir os tokens do
            // tema, removemos o deslocamento sob movimento reduzido.
            "#skills .MuiBox-root:hover": {
              transform: "none !important",
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            backgroundColor: isDark
              ? "rgba(8, 4, 17, 0.62)"
              : "rgba(248, 246, 250, 0.82)",
            backdropFilter: "blur(48px) saturate(190%)",
            WebkitBackdropFilter: "blur(48px) saturate(190%)",
            borderBottom: `1px solid ${
              isDark ? "rgba(255, 255, 255, 0.14)" : "rgba(20, 13, 32, 0.1)"
            }`,
            boxShadow: "none",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            backgroundColor: isDark
              ? "rgba(17, 8, 34, 0.92)"
              : "rgba(255, 255, 255, 0.92)",
            backdropFilter: "blur(24px) saturate(150%)",
            WebkitBackdropFilter: "blur(24px) saturate(150%)",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: isDark
              ? "rgba(8, 4, 17, 0.96)"
              : "rgba(248, 246, 250, 0.96)",
            backdropFilter: "blur(24px) saturate(150%)",
            WebkitBackdropFilter: "blur(24px) saturate(150%)",
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: isDark
              ? "rgba(244, 238, 250, 0.13)"
              : "rgba(20, 13, 32, 0.12)",
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            "@media (max-width: 600px)": {
              paddingLeft: "8px",
              paddingRight: "8px",
            },
          },
        },
      },
      // Catch-all de foco para todo componente baseado em ButtonBase
      // (Button, IconButton, ListItemButton, MenuItem, Tab, Chip...).
      MuiButtonBase: {
        styleOverrides: {
          root: {
            "&:focus-visible, &.Mui-focusVisible": focus,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            minHeight: "44px", // Tamanho mínimo para toque em dispositivos móveis
            borderRadius: "999px",
            fontFamily: "'Sora', sans-serif",
            letterSpacing: "0.1em",
            transition,
            "&:active": {
              transform: "scale(0.98)",
            },
            "&:focus-visible, &.Mui-focusVisible": focus,
            "@media (max-width: 600px)": {
              // Alvo de toque mínimo (WCAG 2.5.5 / PRD): 44×44 no mobile.
              minHeight: "44px",
              fontSize: "0.875rem",
            },
            "@media (prefers-reduced-motion: reduce)": reducedMotion,
          },
          contained: ({ theme }) => ({
            "&:hover": {
              boxShadow: `0 6px 18px ${alpha(
                theme.palette.common.black,
                isDark ? 0.5 : 0.18,
              )}`,
            },
          }),
          outlined: ({ theme }) => ({
            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
            },
          }),
          text: ({ theme }) => ({
            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
            },
          }),
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            // Ícones (tema, menu, redes sociais) também precisam de 44×44
            // de área clicável no mobile.
            minWidth: "44px",
            minHeight: "44px",
            transition,
            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.main, 0.12),
            },
            "&:active": {
              transform: "scale(0.94)",
            },
            "&:focus-visible, &.Mui-focusVisible": focus,
            "@media (prefers-reduced-motion: reduce)": reducedMotion,
          }),
        },
      },
      MuiLink: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.palette.primary.main,
            textUnderlineOffset: "4px",
            transition,
            "&:hover": {
              color: theme.palette.secondary.main,
            },
            "&:focus-visible, &.Mui-focusVisible": focus,
            "@media (prefers-reduced-motion: reduce)": reducedMotion,
          }),
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: "999px",
            fontFamily: "'Sora', sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            backgroundColor: isDark
              ? "rgba(255, 255, 255, 0.08)"
              : "rgba(20, 13, 32, 0.05)",
            border: `1px solid ${
              isDark ? "rgba(255, 255, 255, 0.16)" : "rgba(20, 13, 32, 0.12)"
            }`,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: isDark
              ? "rgba(255, 255, 255, 0.04)"
              : "rgba(20, 13, 32, 0.03)",
            borderRadius: "14px",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: isDark
                ? "rgba(255, 255, 255, 0.14)"
                : "rgba(20, 13, 32, 0.14)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: isDark
                ? "rgba(255, 255, 255, 0.24)"
                : "rgba(20, 13, 32, 0.24)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: isDark
                ? designTokens.colors.magentaGlow
                : designTokens.colors.magentaAccent,
              borderWidth: "1px",
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiInputBase-root": {
              transition,
              // O anel é aplicado no contorno do campo (não no input interno)
              // para não ficar escondido atrás do notched outline.
              "&:has(input:focus-visible), &:has(textarea:focus-visible)":
                focus,
              "@media (max-width: 600px)": {
                fontSize: "16px", // Evita zoom no iOS
              },
            },
            "& .MuiInputBase-input:focus-visible": {
              outline: "none",
            },
            "@media (prefers-reduced-motion: reduce)": {
              "& .MuiInputBase-root": {
                transition: "none",
              },
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: "24px",
            backgroundImage: "none",
            border: `1px solid ${
              isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(20, 13, 32, 0.1)"
            }`,
            backdropFilter: "blur(48px) saturate(190%)",
            WebkitBackdropFilter: "blur(48px) saturate(190%)",
            transition,
            "&:hover": {
              boxShadow: `0 8px 24px ${alpha(
                theme.palette.common.black,
                isDark ? 0.5 : 0.12,
              )}`,
            },
            "&:focus-visible, &.Mui-focusVisible": focus,
            "@media (prefers-reduced-motion: reduce)": reducedMotion,
          }),
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            transition,
            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
            },
            "&.Mui-selected": {
              backgroundColor: alpha(theme.palette.primary.main, 0.16),
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.24),
              },
            },
            "&:active": {
              backgroundColor: alpha(theme.palette.primary.main, 0.2),
            },
            "&:focus-visible, &.Mui-focusVisible": focus,
            "@media (prefers-reduced-motion: reduce)": reducedMotion,
          }),
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: ({ theme }) => ({
            transition,
            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
            },
            "&.Mui-selected": {
              backgroundColor: alpha(theme.palette.primary.main, 0.16),
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.24),
              },
            },
            "&:active": {
              backgroundColor: alpha(theme.palette.primary.main, 0.2),
            },
            "&:focus-visible, &.Mui-focusVisible": focus,
            "@media (prefers-reduced-motion: reduce)": reducedMotion,
          }),
        },
      },
    },
  });

  return responsiveFontSizes(baseTheme, {
    factor: 3, // Intensidade do escalonamento
    breakpoints: ["xs", "sm", "md", "lg", "xl"],
  });
};

/**
 * Compatibilidade temporária: main.tsx ainda importa o tema como default.
 * A integração com ColorModeProvider deve passar a usar createAppTheme(mode).
 */
export default createAppTheme("dark");
