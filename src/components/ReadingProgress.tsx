import { Box, alpha, useTheme } from "@mui/material";
import { useReducedMotion } from "framer-motion";
import useReadingProgress from "../hooks/useReadingProgress";

/**
 * Barra fina de progresso de leitura fixa no topo da viewport.
 *
 * Puramente informativa: não recebe foco, não intercepta cliques
 * (pointerEvents: none) e não usa live region (as atualizações de scroll
 * não interrompem leitores de tela).
 */
export default function ReadingProgress() {
  const theme = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const progress = useReadingProgress();
  const percent = Math.round(progress * 100);

  return (
    <Box
      data-testid="reading-progress"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      aria-label="Progresso de leitura"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 1100,
        pointerEvents: "none",
        backgroundColor: alpha(theme.palette.text.primary, 0.08),
      }}
    >
      <Box
        data-testid="reading-progress-bar"
        sx={{
          height: "100%",
          width: `${progress * 100}%`,
          backgroundColor: theme.palette.primary.main,
          transition: prefersReducedMotion ? "none" : "width 120ms linear",
          willChange: "width",
        }}
      />
    </Box>
  );
}
