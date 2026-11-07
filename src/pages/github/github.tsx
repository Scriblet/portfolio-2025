import { motion, useReducedMotion } from "framer-motion";
import {
  Typography,
  Button,
  CardMedia,
  Box,
  alpha,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useInView } from "react-intersection-observer";
import ImgGithub from "../../img/github-logo.svg";
import { GitHub } from "@mui/icons-material";
import { SOCIAL_LINKS } from "../../data";

const GithubBanner = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const shouldReduceMotion = useReducedMotion();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <Box
      ref={ref}
      sx={{
        maxWidth: "100%",
        height: isMobile ? "auto" : "45vh",
        padding: isMobile 
          ? "2rem 1rem" 
          : isTablet 
            ? "3rem 2rem" 
            : "40px 24px",
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        gap: isMobile ? "2rem" : isTablet ? "4rem" : "3rem",
      }}
    >
      {/* Seção de Texto */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{
          width: isMobile ? "100%" : "50%",
          padding: isMobile ? "0" : "0 32px",
          textAlign: isMobile ? "center" : "left",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            mb: isMobile ? 2 : 3,
            fontSize: isMobile ? "1.8rem" : isTablet ? "2.2rem" : "2.5rem",
            color: theme.palette.text.primary,
          }}
        >
          Github
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontWeight: 400,
            fontSize: isMobile ? "1rem" : "1.1rem",
            mb: isMobile ? 3 : 4,
            color: theme.palette.text.primary,
            maxWidth: "100%",
            lineHeight: 1.6,
          }}
        >
          Se você é uma pessoa que gosta de analisar códigos, recomendo
          fortemente que dê uma olhada no meu Github. É por lá que hospedo
          grande parte dos meus códigos.
        </Typography>

        <motion.div 
          whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }} 
          whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          style={{
            display: "flex",
            justifyContent: isMobile ? "center" : "flex-start",
          }}
        >
          <Button
            href={SOCIAL_LINKS.GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            startIcon={<GitHub />}
            sx={{
              px: isMobile ? 3 : 4,
              py: isMobile ? 1 : 1.5,
              borderRadius: "8px",
              fontWeight: 500,
              textTransform: "none",
              fontSize: isMobile ? "0.9rem" : "1rem",
              color: theme.palette.text.primary,
              borderColor: alpha(theme.palette.text.primary, 0.35),
              "&:hover": {
                borderColor: theme.palette.primary.main,
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
              },
              "&:active": {
                backgroundColor: alpha(theme.palette.primary.main, 0.14),
              },
            }}
          >
            Siga-me no Github
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          width: isMobile ? "100%" : "40%",
          height: isMobile ? "200px" : "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CardMedia
          component="img"
          image={ImgGithub}
          alt="Logo do GitHub"
          loading="lazy"
          decoding="async"
          sx={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            width: isMobile ? "70%" : "80%",
          }}
        />
      </motion.div>
    </Box>
  );
};

export default GithubBanner;
