import { Box, alpha, useTheme } from "@mui/material";

export type SectionFallbackVariant =
  | "experience"
  | "timeline"
  | "skills"
  | "philosophy"
  | "github"
  | "contact"
  | "footer";

type SectionFallbackProps = {
  variant: SectionFallbackVariant;
  /**
   * Âncora usada pelo react-scroll enquanto o chunk da seção ainda carrega.
   * O id sai do DOM no mesmo commit em que a seção real (que traz o id
   * definitivo) é montada, então nunca há ids duplicados.
   */
  id?: string;
};

// Altura reservada por seção: evita salto de layout (CLS) quando o chunk
// termina de carregar. Valores acompanham a proporção real de cada seção em
// mobile (xs) e desktop (md).
const MIN_HEIGHT: Record<SectionFallbackVariant, { xs: string; md: string }> = {
  experience: { xs: "40vh", md: "45vh" },
  timeline: { xs: "40vh", md: "45vh" },
  skills: { xs: "40vh", md: "45vh" },
  philosophy: { xs: "30vh", md: "32vh" },
  github: { xs: "30vh", md: "32vh" },
  contact: { xs: "30vh", md: "32vh" },
  footer: { xs: "30vh", md: "30vh" },
};

/**
 * Skeleton de altura preservada exibido pelo <Suspense> enquanto o chunk de
 * uma seção abaixo da dobra é baixado. É puramente decorativo: fica oculto
 * para leitores de tela e não recebe foco.
 */
const SectionFallback = ({ variant, id }: SectionFallbackProps) => {
  const theme = useTheme();
  const heights = MIN_HEIGHT[variant];

  const bar = (width: string, height: number) => ({
    width,
    height,
    borderRadius: 1,
    backgroundColor: alpha(theme.palette.text.primary, 0.08),
  });

  return (
    <Box
      id={id}
      aria-hidden="true"
      data-testid="section-fallback"
      sx={{
        width: "100%",
        minHeight: { xs: heights.xs, md: heights.md },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, sm: 4, md: 8 },
        py: { xs: 3, md: 4 },
        backgroundColor: alpha(theme.palette.background.paper, 0.35),
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1200,
          display: "flex",
          flexDirection: "column",
          gap: { xs: 1.5, md: 2 },
        }}
      >
        <Box sx={bar("45%", 24)} />
        <Box sx={bar("100%", 14)} />
        <Box sx={bar("85%", 14)} />
        <Box sx={bar("65%", 14)} />
      </Box>
    </Box>
  );
};

export default SectionFallback;
