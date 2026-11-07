import { alpha, createTheme, responsiveFontSizes } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";
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
      fontFamily: "'Poppins', sans-serif",
      // Escala modular responsiva (1.333 - terceira maioria)
      h1: {
        fontSize: "clamp(1.8rem, 4vw, 3.052rem)", // ~48.83px (base 16px)
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: "-0.02em",
      },
      h2: {
        fontSize: "clamp(1.5rem, 3.5vw, 2.441rem)", // ~39.06px
        fontWeight: 600,
        lineHeight: 1.3,
        letterSpacing: "-0.01em",
      },
      h3: {
        fontSize: "clamp(1.3rem, 3vw, 1.953rem)", // ~31.25px
        fontWeight: 500,
        lineHeight: 1.4,
      },
      h4: {
        fontSize: "clamp(1.1rem, 2.5vw, 1.563rem)", // ~25px
        fontWeight: 500,
        lineHeight: 1.4,
      },
      h5: {
        fontSize: "clamp(1rem, 2vw, 1.25rem)", // 20px
        fontWeight: 500,
        lineHeight: 1.5,
      },
      h6: {
        fontSize: "clamp(0.95rem, 1.8vw, 1.125rem)", // 18px
        fontWeight: 600,
        lineHeight: 1.5,
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
        lineHeight: 1.6,
      },
      body2: {
        fontSize: "clamp(0.75rem, 1.2vw, 0.875rem)", // 14px
        lineHeight: 1.6,
      },
      button: {
        fontSize: "clamp(0.75rem, 1.2vw, 0.875rem)", // 14px
        textTransform: "none",
        fontWeight: 500,
      },
      caption: {
        fontSize: "clamp(0.7rem, 1vw, 0.75rem)", // 12px
        lineHeight: 1.6,
      },
      overline: {
        fontSize: "clamp(0.65rem, 0.9vw, 0.75rem)", // 12px
        fontWeight: 600,
        lineHeight: 1.6,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      },
    },
    palette: getPalette(mode),
    components: {
      MuiCssBaseline: {
        styleOverrides: {
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
            transition,
            "&:active": {
              transform: "scale(0.98)",
            },
            "&:focus-visible, &.Mui-focusVisible": focus,
            "@media (max-width: 600px)": {
              minHeight: "40px",
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
            transition,
            "&:hover": {
              color: theme.palette.primary.main,
            },
            "&:focus-visible, &.Mui-focusVisible": focus,
            "@media (prefers-reduced-motion: reduce)": reducedMotion,
          }),
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
