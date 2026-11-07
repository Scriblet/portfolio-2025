import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useMediaQuery, useTheme } from "@mui/material";
import { experiences } from "../../data";
import styles from "./experience.module.scss";

/**
 * Variantes acessíveis das cores de destaque por modo.
 *
 * O SCSS usa as cores da identidade, que não passam no contraste AA em ambos
 * os fundos: sobre `#f5f3f7` verde/rosa ficavam em ~2.9:1 e sobre `#121212`
 * o roxo ficava em ~2:1. Estas variantes mantêm a matiz e garantem ≥ 4.5:1
 * (o título pode renderizar em 13px no mobile, então o alvo é o de texto
 * normal, não o de texto grande).
 */
const TITLE_COLOR_OVERRIDES: Record<"light" | "dark", Array<string | undefined>> = {
  light: ["#2f6ea8", "#0b7a50", "#800080", "#b02a5b"],
  dark: [undefined, undefined, "#ba68c8", undefined],
};

const Experience = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isLightMode = theme.palette.mode === "light";
  // Textos auxiliares do SCSS (#8491a0) só passam no fundo escuro.
  const secondaryTextColor = isLightMode
    ? theme.palette.text.secondary
    : undefined;

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.35,
  });

  return (
    <Box
      component="section"
      id="experience"
      data-testid="experience-section"
      sx={{
        paddingTop: isMobile ? "2rem" : "4rem",
        paddingBottom: isMobile ? "2rem" : "4rem",
        display: "flex",
        flexDirection: "column",
        borderRadius: "16px",
        margin: isMobile
          ? "0 1rem 2rem"
          : isTablet
          ? "0 2rem 3rem"
          : "0 64px 64px",
      }}
      ref={ref}
    >
      <Typography
        component={motion.h2}
        variant="h2"
        initial={{ opacity: 0, x: -60 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{
          duration: 0.6,
          ease: "easeOut",
          delay: 0.2,
        }}
        sx={{
          maxWidth: isMobile ? "100%" : "40%",
          textAlign: isMobile ? "center" : "left",
          mb: { xs: 3, sm: 4 },
        }}
        data-testid="experience-heading"
      >
        Empresas onde trabalhei e Aprendizados que conquistei
      </Typography>

      <Box
        data-testid="experience-grid"
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: isMobile ? 2 : 3,
        }}
      >
        {experiences.map((exp, index) => (
          <Box
            key={exp.id}
            data-testid={`experience-card-${exp.id}`}
            sx={{
              padding: isMobile ? "1rem" : "1.5rem",
              paddingLeft: index === 0 ? "0" : isMobile ? "1rem" : "1.5rem",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <Typography
              component={motion.span}
              aria-hidden="true"
              initial={{ opacity: 0, x: -60 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: "easeOut",
              }}
              className={styles.bigNumbers}
              style={{ color: secondaryTextColor }}
              sx={{
                display: "block",
                fontSize: {
                  xs: "3rem",
                  md: "4rem",
                  lg: "5rem",
                },
                lineHeight: 1.1,
                marginBottom: "1rem",
              }}
              data-testid={`experience-number-${exp.id}`}
            >
              {exp.number}
            </Typography>

            <Typography
              component={motion.h3}
              variant="h3"
              initial={{ opacity: 0, x: -60 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: "easeOut",
              }}
              className={`${styles["experience-title"]} ${
                styles[`experience-title--color-${index + 1}`]
              }`}
              style={{
                color: TITLE_COLOR_OVERRIDES[
                  isLightMode ? "light" : "dark"
                ][index],
              }}
              sx={{
                marginTop: "1rem",
                marginBottom: "0.5rem",
                fontWeight: 700,
              }}
              data-testid={`experience-company-${exp.id}`}
            >
              {exp.company}
            </Typography>

            <Typography
              component={motion.h4}
              variant="h4"
              initial={{ opacity: 0, x: -60 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 1,
                delay: 0.2,
                ease: "easeOut",
              }}
              sx={{ marginBottom: "1rem" }}
              data-testid={`experience-position-${exp.id}`}
            >
              {exp.position}
            </Typography>

            <motion.p
              initial={{ opacity: 0, x: -60 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 1.2,
                delay: 0.2,
                ease: "easeOut",
              }}
              className={styles.experienceText}
              style={{
                fontSize: isMobile ? "0.9rem" : "1rem",
                lineHeight: "1.6",
                flex: 1,
                color: secondaryTextColor,
              }}
              data-testid={`experience-description-${exp.id}`}
            >
              {exp.description}
            </motion.p>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Experience;
