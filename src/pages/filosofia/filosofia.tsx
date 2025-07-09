import { motion } from "framer-motion";
import { Typography, Button, CardMedia, useMediaQuery, useTheme, Box } from "@mui/material";
import { useInView } from "react-intersection-observer";
import ImgPhilosophy from "../../img/multiracial-hands-coming-together.jpg";
import { LinkedIn } from "@mui/icons-material";

const PhilosophyBanner = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Animação firme sem oscilação
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "tween",
        ease: "easeOut",
        duration: 0.6
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "tween",
        ease: "easeOut",
        duration: 0.8
      }
    }
  };

  return (
    <Box 
      ref={ref} 
      sx={{
        padding: {
          xs: "2rem 1rem",
          sm: "2.5rem 1.5rem",
          md: "3rem 2rem",
          lg: "3rem 3rem"
        },
        margin: {
          xs: "2rem 0",
          sm: "3rem 0",
          md: "4rem 0"
        },
        backgroundColor: "#584732",
        display: "flex",
        flexDirection: {
          xs: "column",
          sm: "row"
        },
        gap: {
          xs: "2rem",
          sm: "2rem",
          md: "3rem"
        },
        minHeight: {
          xs: "auto",
          sm: "400px",
          md: "500px"
        }
      }}
    >
      {/* Container Esquerdo - Texto */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: isMobile ? "1.5rem" : "2rem",
          padding: isMobile ? "0" : "0 2rem",
          color: "white",
          width: isMobile ? "100%" : "50%",
        }}
      >
        {/* Título */}
        <motion.div variants={itemVariants}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              mb: {
                xs: 1,
                sm: 1.5,
                md: 2
              },
              fontSize: {
                xs: "1.75rem",
                sm: "2rem",
                md: "2.5rem",
                lg: "3rem"
              },
              textAlign: {
                xs: "center",
                sm: "left"
              }
            }}
          >
            Filosofia & Valores
          </Typography>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 300,
              fontSize: {
                xs: "0.875rem",
                sm: "0.9rem",
                md: "1rem"
              },
              mb: {
                xs: 1.5,
                md: 2
              },
              maxWidth: {
                xs: "100%",
                sm: "90%",
                md: "80%"
              },
              textAlign: {
                xs: "center",
                sm: "left"
              },
              lineHeight: 1.6
            }}
          >
            Sou apaixonado por Tecnologia, desenvolvimento de soluções e
            empresas que trabalham para desenvolver oportunidades e soluções que
            buscam uma equidade da sociedade.
          </Typography>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          style={{
            display: "flex",
            justifyContent: isMobile ? "center" : "flex-start",
          }}
        >
          <Button
            href="https://www.linkedin.com/in/lucas-nonato1/"
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            startIcon={<LinkedIn />}
            sx={{
              padding: {
                xs: "0.5rem 1.25rem",
                sm: "0.625rem 1.5rem"
              },
              borderRadius: "8px",
              fontWeight: 500,
              textTransform: "none",
              fontSize: {
                xs: "0.875rem",
                sm: "0.9rem",
                md: "1rem"
              },
              color: "white",
              borderColor: "white",
              "&:hover": {
                borderColor: "rgba(255, 255, 255, 0.8)",
                backgroundColor: "rgba(255, 255, 255, 0.1)"
              }
            }}
          >
            Veja meu LinkedIn
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        variants={imageVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{
          width: isMobile ? "100%" : "50%",
          height: isMobile ? "250px" : "100%",
          display: "flex",
          alignItems: "center"
        }}
      >
        <CardMedia
          component="img"
          image={ImgPhilosophy}
          alt="Duas mãos fechadas se tocam em um cumprimento de punhos (fist bump). A mão à esquerda tem pele clara, enquanto a da direita tem pele escura. O fundo é branco, destacando o gesto de cumplicidade e respeito entre as duas pessoas."
          sx={{
            objectFit: "cover",
            borderRadius: {
              xs: "12px",
              sm: "14px",
              md: "16px"
            },
            width: "100%",
            height: "100%",
            maxHeight: {
              xs: "250px",
              sm: "none"
            }
          }}
        />
      </motion.div>
    </Box>
  );
};

export default PhilosophyBanner;