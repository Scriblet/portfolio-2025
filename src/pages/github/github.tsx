import { motion } from "framer-motion";
import { Typography, Button, CardMedia, Box } from "@mui/material";
import { useInView } from "react-intersection-observer";
import ImgGithub from "../../img/github-logo.svg";
import { GitHub } from "@mui/icons-material";

const GithubBanner = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <Box
      ref={ref}
      sx={{
        maxWidth: "100%",
        padding: { xl: "40px 24px", md: "60px 48px" },
        backgroundColor: "white",
        display: "flex",
        flexDirection: { xl: "column", md: "row" },
        alignItems: "center",
        gap: { xl: 3, md: 6 },
      }}
    >
      {/* Seção de Texto */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{
          width: "100%",
          padding: "0 32px",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: 800,
            mb: 3,
            fontSize: { lg: "2rem", md: "2.5rem" },
            color: "black",
          }}
        >
          Github
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontWeight: 400,
            fontSize: "1.1rem",
            mb: 4,
            color: "black",
            maxWidth: "90%",
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
        >
          <Button
            href="https://github.com/scriblet"
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            startIcon={<GitHub />}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: "8px",
              fontWeight: 500,
              textTransform: "none",
              fontSize: "1rem",
              color: "black",
              borderColor: "black",
              '&:hover': {
                borderColor: "#333",
                backgroundColor: "rgba(0, 0, 0, 0.04)"
              }
            }}
          >
            Siga-me no Github
          </Button>
        </motion.div>
      </motion.div>

      {/* Seção da Imagem */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          width:  "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CardMedia
          component="img"
          image={ImgGithub}
          alt="Logo do GitHub"
          sx={{
            width: "100%",
            maxWidth: "400px",
            objectFit: "contain",
          }}
        />
      </motion.div>
    </Box>
  );
};

export default GithubBanner;