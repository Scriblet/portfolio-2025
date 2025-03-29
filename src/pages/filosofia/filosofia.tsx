import { motion } from "framer-motion";
import { Typography, Button, CardMedia } from "@mui/material";
import { useInView } from "react-intersection-observer";
import ImgPhilosophy from "../../img/multiracial-hands-coming-together.jpg";
import { LinkedIn } from "@mui/icons-material";

const PhilosophyBanner = () => {
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
    <div ref={ref} style={{
      padding: "24px 24px 24px 48px",
      backgroundColor: "#584732",
      display: "flex",
    }}>
      {/* Container Esquerdo - Texto */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "32px",
          padding: "0 32px",
          color: "white",
          width: "50%",
        }}
      >
        {/* Título */}
        <motion.div variants={itemVariants}>
          <Typography
            variant="h1"
            style={{
              fontWeight: "800",
              marginBottom: "24px",
            }}
          >
            Filosofia & Valores
          </Typography>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "300",
              fontSize: "1rem",
              marginBottom: "32px",
              maxWidth: "80%",
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
        >
          <Button
            href="https://www.linkedin.com/in/lucas-nonato1/"
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            startIcon={<LinkedIn />}
            style={{
              padding: "10px 24px",
              borderRadius: "8px",
              fontWeight: "500",
              textTransform: "none",
              fontSize: "1rem",
              color: "white",
              borderColor: "white",
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
          width: "50%",
          height: "100%",
        }}
      >
        <CardMedia
          component="img"
          image={ImgPhilosophy}
          alt="Duas mãos fechadas se tocam em um cumprimento de punhos (fist bump). A mão à esquerda tem pele clara, enquanto a da direita tem pele escura. O fundo é branco, destacando o gesto de cumplicidade e respeito entre as duas pessoas."
          style={{
            objectFit: "cover",
            borderRadius: "16px",
            width: "100%",
            height: "100%",
          }}
        />
      </motion.div>
    </div>
  );
};

export default PhilosophyBanner;