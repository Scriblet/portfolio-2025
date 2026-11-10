import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import App from "../App";
import { SnackbarProvider } from "../components/feedback/SnackbarProvider";
import { useColorMode } from "./ColorModeContext";
import { createAppTheme } from "./index";

/** Raiz temática: liga o modo de cor ao tema MUI e aos providers globais. */
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

export default ThemedApp;
