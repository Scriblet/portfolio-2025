import React, { useMemo } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { initGA } from "./services/analytics";
import { SnackbarProvider } from "./components/feedback/SnackbarProvider";
import { ColorModeProvider, useColorMode } from "./theme/ColorModeProvider";
import { createAppTheme } from "./theme";
import "./index.css";
import "./styles/responsive-utils.css";

// Inicializar Google Analytics
initGA();

const ThemedApp = () => {
  const { mode } = useColorMode();
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <BrowserRouter
          basename={import.meta.env.BASE_URL.replace(/\/$/, "") || "/"}
        >
          <App />
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ColorModeProvider>
      <ThemedApp />
    </ColorModeProvider>
  </React.StrictMode>,
);
