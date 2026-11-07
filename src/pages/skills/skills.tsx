import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Box, Typography, useTheme, alpha } from "@mui/material";
import {
  Code,
  DesignServices,
  Storage,
  Build,
  Api,
  Cloud,
  Accessibility,
} from "@mui/icons-material";
import { skills } from "../../data";
import type { SkillIconKey } from "../../data";

// Mapa entre a chave de ícone dos dados e o ícone MUI correspondente.
const skillIcons: Record<SkillIconKey, ReactNode> = {
  code: <Code fontSize="large" />,
  design: <DesignServices fontSize="large" />,
  api: <Api fontSize="large" />,
  accessibility: <Accessibility fontSize="large" />,
  storage: <Storage fontSize="large" />,
  build: <Build fontSize="large" />,
  cloud: <Cloud fontSize="large" />,
};

const SkillsSection = () => {
  const theme = useTheme();

  return (
    <Box
      id="skills"
      component="section"
      sx={{ 
        py: { xs: 3, sm: 4, md: 6, lg: 8 }, 
        px: { xs: 1, sm: 2, md: 3, lg: 4 },
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: 800,
          mb: { xs: 3, sm: 4, md: 5, lg: 6 },
          textAlign: "center",
          color: theme.palette.text.primary,
          wordWrap: "break-word",
          overflowWrap: "break-word",
        }}
      >
        Habilidades Técnicas
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: { xs: 1.5, sm: 2, md: 3, lg: 4 },
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={skill.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.1 }}
          >
            <Box
              sx={{
                p: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
                height: "100%",
                borderRadius: 4,
                border: `1px solid ${theme.palette.divider}`,
                backgroundColor: theme.palette.background.paper,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: `0 6px 16px ${alpha(
                    theme.palette.primary.light,
                    0.1,
                  )}`,
                },
              }}
            >
              <Box
                sx={{
                  color: theme.palette.primary.main,
                  mb: { xs: 1, sm: 1.5, md: 2 },
                }}
              >
                {skillIcons[skill.icon]}
              </Box>

              <Typography
                variant="h6"
                // O card é visualmente um h6, mas semanticamente é nível 3,
                // logo abaixo do h2 da seção — evita o salto h2 → h6.
                aria-level={3}
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  color: theme.palette.text.primary,
                  fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                {skill.title}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  mb: { xs: 1, sm: 1.5, md: 2 },
                  color: theme.palette.text.secondary,
                  minHeight: { xs: "2em", sm: "2.5em", md: "3.5em" },
                  fontSize: { xs: "0.8rem", sm: "0.875rem", md: "1rem" },
                  lineHeight: 1.4,
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                {skill.description}
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {skill.tags.map((tag) => (
                  <Box
                    key={tag}
                    sx={{
                      px: { xs: 0.75, sm: 1 },
                      py: 0.5,
                      borderRadius: 2,
                      backgroundColor: alpha(
                        theme.palette.primary.light,
                        0.1,
                      ),
                      color: theme.palette.text.primary,
                      fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.875rem" },
                      margin: "0.25rem",
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                    }}
                  >
                    {tag}
                  </Box>
                ))}
              </Box>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default SkillsSection;
