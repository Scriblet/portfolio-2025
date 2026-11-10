import { alpha, IconButton, useTheme } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useReducedMotion } from "framer-motion";
import { useColorMode } from "../theme/ColorModeContext";
import { trackEvent } from "../services/analytics";
import type { ColorMode } from "../theme/palettes";

/**
 * Botão de troca de tema claro/escuro.
 *
 * Não se auto-monta no header: a integração é feita pelo header.tsx depois
 * que o ColorModeProvider estiver envolvendo a aplicação em main.tsx.
 */
const ThemeToggle = () => {
  const { mode, toggleMode } = useColorMode();
  const theme = useTheme();
  const shouldReduceMotion = useReducedMotion();

  const isDark = mode === "dark";
  const label = isDark ? "Ativar tema claro" : "Ativar tema escuro";

  const handleToggle = () => {
    const nextMode: ColorMode = isDark ? "light" : "dark";
    toggleMode();
    // Registra o tema efetivamente aplicado, sem dados pessoais.
    trackEvent("theme_change", "appearance", nextMode);
  };

  return (
    <IconButton
      data-testid="theme-toggle"
      aria-label={label}
      aria-pressed={isDark}
      onClick={handleToggle}
      color="inherit"
      sx={{
        // Herda a cor do AppBar; não fixa text.primary para não perder
        // contraste enquanto o header ainda usa o fundo escuro.
        transition: shouldReduceMotion ? "none" : undefined,
        "&:hover": {
          backgroundColor: alpha(theme.palette.primary.main, 0.12),
        },
        "&:active": {
          transform: shouldReduceMotion ? "none" : "scale(0.94)",
        },
      }}
    >
      {isDark ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
};

export default ThemeToggle;
