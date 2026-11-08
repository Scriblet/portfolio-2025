import { useEffect, useRef, useState } from "react";
import { Button, Typography, useTheme } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { motion } from "framer-motion";
import { trackPortfolioEvents } from "../services/analytics";

const CV_PATH = `${import.meta.env.BASE_URL}cv/lucas-nonato-cv.pdf`;
const CV_FILENAME = "Lucas-Nonato-CV.pdf";

type DownloadCvButtonProps = {
  location: "presentation" | "contact";
  align?: "left" | "center";
  /** Ajusta contraste do feedback quando o botão fica sobre foto escura. */
  onDark?: boolean;
};

/**
 * Static CV download. The `download` attribute triggers a direct download when
 * supported; `target="_blank"` is the fallback for browsers that block it.
 */
const DownloadCvButton = ({
  location,
  align = "left",
  onDark = false,
}: DownloadCvButtonProps) => {
  const [started, setStarted] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const theme = useTheme();

  useEffect(
    () => () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    },
    [],
  );

  const handleClick = () => {
    trackPortfolioEvents.resumeDownload();
    setStarted(true);

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => setStarted(false), 2500);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: align === "center" ? "center" : "flex-start",
      }}
    >
      <Button
        component="a"
        href={CV_PATH}
        download={CV_FILENAME}
        target="_blank"
        rel="noopener noreferrer"
        variant="contained"
        startIcon={<DownloadIcon />}
        onClick={handleClick}
        aria-label="Baixar CV de Lucas Nonato em PDF"
        data-testid={`download-cv-button-${location}`}
        sx={{
          minHeight: 52,
          px: { xs: 2.5, md: 3 },
          py: 0,
          borderRadius: "999px",
          fontFamily: "var(--font-mono)",
          fontWeight: 600,
          fontSize: "11px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#ffffff",
          backgroundColor: theme.palette.primary.main,
          transition: "background-color 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
          },
          "&:focus-visible": {
            outline: `3px solid ${
              theme.palette.mode === "dark" || onDark ? "#a324ff" : "#7e18d6"
            }`,
            outlineOffset: "3px",
          },
        }}
      >
        Baixar CV
      </Button>

      <Typography
        component="span"
        role="status"
        aria-live="polite"
        data-testid={`download-cv-feedback-${location}`}
        sx={{
          position: "absolute",
          top: "100%",
          left: align === "center" ? "50%" : 0,
          transform: align === "center" ? "translateX(-50%)" : "none",
          mt: 0.75,
          minHeight: "1.25rem",
          whiteSpace: "nowrap",
          fontSize: "0.75rem",
          color: onDark ? "rgba(241, 238, 232, 0.8)" : "text.secondary",
        }}
      >
        {started ? "Download iniciado" : ""}
      </Typography>
    </motion.div>
  );
};

export default DownloadCvButton;
