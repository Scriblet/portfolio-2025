import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const baseTheme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
    // Escala modular (1.333 - terceira maioria)
    h1: {
      fontSize: "3.052rem", // ~48.83px (base 16px)
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontSize: "2.441rem", // ~39.06px
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontSize: "1.953rem", // ~31.25px
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: "1.563rem", // ~25px
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.25rem", // 20px
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: "1rem", // 16px (base)
      fontWeight: 400,
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem", // 14px
      lineHeight: 1.6,
    },
    button: {
      fontSize: "0.875rem", // 14px
      textTransform: "none",
      fontWeight: 500,
    },
    caption: {
      fontSize: "0.75rem", // 12px
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
          "@media (max-width: 600px)": {
            fontSize: "15px", // Ajuste fino para mobile
          },
        },
      },
    },
  },
});

const theme = responsiveFontSizes(baseTheme, {
  factor: 3, // Intensidade do escalonamento
});

export default theme;
