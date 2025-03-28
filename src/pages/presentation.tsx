import ImgPresentation from "../img/presetation.jpg";
import { CardMedia, Typography, useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import { motion } from "framer-motion";

function Presentation() {
  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.down("xl"));
  return (
    <motion.div
      initial={{ opacity: 0 }} // Começa menor e transparente
      animate={{ opacity: 1 }} // Cresce para tamanho normal e aparece
      transition={{
        duration: 1.2, // Duração da animação
      }}
      style={{
        width: "100%",
      }}
    >
      <Box
        component="div"
        sx={{
          height: onlySmallScreen
            ? "60vh"
            : onlyMediumScreen
            ? "60vh"
            : onlyLargeScreen
            ? "vh"
            : "86vh",
          display: "flex",
          justifyContent: "space-between",
          margin: "0 24px",
          borderRadius: "16px",
        }}
      >
        <motion.div
          className="container-image"
          style={{
            padding: "80px",
            margin: "0",
          }}
        >
          <CardMedia
            component="img"
            image={ImgPresentation}
            alt="Lucas Nonato. Jovem com cabelo cacheado volumoso e bigode sorri amplamente para a câmera. Ele usa uma camisa preta e uma alça transversal é visível em seu ombro. O fundo tem uma parede decorada com grafites coloridos em tons de roxo, verde e vermelho, com letras estilizadas."
            sx={{
              height: "100%",
              objectFit: "fill",
              borderRadius: "360px",
            }}
          />
        </motion.div>

        <motion.div
          className="container-texts"
          style={{
            minWidth: "52%",
            height: "auto",
            padding: onlySmallScreen
              ? "0 0 0 6vw"
              : onlyMediumScreen
              ? "0 0 0 6vw"
              : onlyLargeScreen
              ? "0 0 0 4vw"
              : "0 0 0 8.5vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "2.5rem",
            backgroundColor: "#000a0a",
            borderRadius: "40px",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Typography variant="h1" className="presentation-title">
              Eu sou Lucas Nonato
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Typography variant="h1" className="presentation-title">
              Desenvolvedor Web
              <Typography
                variant="inherit"
                sx={{ fontWeight: 700, color: "rgb(88, 88, 95)" }}
              >
                Full-Stack
              </Typography>
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Typography variant="h1" className="presentation-title">
              UX Designer
            </Typography>
          </motion.div>
        </motion.div>
      </Box>
    </motion.div>
  );
}

export default Presentation;
