import { createTheme, responsiveFontSizes } from "@mui/material/styles";

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
  },
  palette: {
    primary: {
      main: "#673ab7",
    },
    secondary: {
      main: "#800080",
    },
    warning: {
      main: "#121212",
    },

    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b3b3b3",
    },
  },
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
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: "44px", // Tamanho mínimo para toque em dispositivos móveis
          "@media (max-width: 600px)": {
            minHeight: "40px",
            fontSize: "0.875rem",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            "@media (max-width: 600px)": {
              fontSize: "16px", // Evita zoom no iOS
            },
          },
        },
      },
    },
  },
});

const theme = responsiveFontSizes(baseTheme, {
  factor: 3, // Intensidade do escalonamento
  breakpoints: ["xs", "sm", "md", "lg", "xl"],
});

export default theme;
