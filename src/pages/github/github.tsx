import { motion } from "framer-motion";
import { Typography, Button, CardMedia, Box, useMediaQuery, useTheme } from "@mui/material";
import { useInView } from "react-intersection-observer";
import ImgGithub from "../../img/github-logo.svg";
import { GitHub } from "@mui/icons-material";

const GithubBanner = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

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
        backgroundColor: "white",
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
          variant="h1"
          sx={{
            fontWeight: 800,
            mb: isMobile ? 2 : 3,
            fontSize: isMobile ? "1.8rem" : isTablet ? "2.2rem" : "2.5rem",
            color: "black",
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
            color: "black",
            maxWidth: "100%",
            lineHeight: 1.6,
          }}
        >
          Se você é uma pessoa que gosta de analisar códigos, recomendo
          fortemente que dê uma olhada no meu Github. É por lá que hospedo
          grande parte dos meus códigos.
        </Typography>

        <motion.div 
          whileHover={{ scale: 1.03 }} 
          whileTap={{ scale: 0.98 }}
          style={{
            display: "flex",
            justifyContent: isMobile ? "center" : "flex-start",
          }}
        >
          <Button
            href="https://github.com/scriblet"
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
              color: "black",
              borderColor: "black",
              "&:hover": {
                borderColor: "#333",
                backgroundColor: "rgba(0, 0, 0, 0.04)",
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
          sx={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            width: isMobile ? "80%" : "100%",
          }}
        />
      </motion.div>
    </Box>
  );
};

export default GithubBanner;
