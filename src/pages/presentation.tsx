import ImgPresentation from "../img/presetation.jpg";
import { CardMedia, Typography, useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import { motion } from "framer-motion";

function Presentation() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isVerySmall = useMediaQuery("(max-width:360px)");

  return (
    <motion.div
      id="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      style={{ width: "100%" }}
    >
      <Box
        component="div"
        sx={{
          height: isMobile ? "auto" : isTablet ? "70vh" : "86vh",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "center" : "stretch",
          margin: {
            xs: "0 0.5rem",
            sm: "0 1rem", 
            md: "0 1.5rem",
            lg: "0 24px"
          },
          borderRadius: "16px",
          gap: isMobile ? "2rem" : "0",
        }}
      >
        <motion.div
          className="container-image"
          style={{
            padding: isVerySmall 
              ? "15px" 
              : isMobile 
                ? "20px" 
                : isTablet 
                  ? "40px" 
                  : "80px",
            margin: "0",
            width: isMobile ? "100%" : "auto",
          }}
        >
          <CardMedia
            component="img"
            image={ImgPresentation}
            alt="Lucas Nonato. Jovem com cabelo cacheado volumoso e bigode sorri amplamente para a câmera. Ele usa uma camisa preta e uma alça transversal é visível em seu ombro. O fundo tem uma parede decorada com grafites coloridos em tons de roxo, verde e vermelho, com letras estilizadas."
            sx={{
              height: {
                xs: isVerySmall ? "250px" : "300px",
                sm: "350px",
                md: "100%"
              },
              width: {
                xs: isVerySmall ? "250px" : "300px",
                sm: "350px", 
                md: "auto"
              },
              objectFit: "cover",
              borderRadius: "360px",
            }}
          />
        </motion.div>

        <motion.div
          className="container-texts"
          style={{
            width: isMobile ? "100%" : "52%",
            height: "auto",
            padding: isVerySmall
              ? "1.5rem" 
              : isMobile 
                ? "2rem" 
                : isTablet 
                  ? "2rem 4rem" 
                  : "4rem 8.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: isMobile ? "1.5rem" : "2.5rem",
            backgroundColor: "#000a0a",
            borderRadius: isMobile ? "20px" : "40px",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Typography 
              variant={isMobile ? "h2" : "h1"} 
              className="presentation-title"
              sx={{
                fontSize: {
                  xs: isVerySmall ? "1.6rem" : "2rem",
                  sm: "2.2rem",
                  md: "2.5rem",
                  lg: "3rem"
                },
                textAlign: isMobile ? "center" : "left",
                wordWrap: "break-word",
                overflowWrap: "break-word",
              }}
            >
              Eu sou Lucas Nonato
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Typography 
              variant={isMobile ? "h2" : "h1"} 
              className="presentation-title"
              sx={{
                fontSize: {
                  xs: isVerySmall ? "1.6rem" : "2rem",
                  sm: "2.2rem",
                  md: "2.5rem",
                  lg: "3rem"
                },
                textAlign: isMobile ? "center" : "left",
                wordWrap: "break-word",
                overflowWrap: "break-word",
              }}
            >
              Desenvolvedor Web
              <Typography
                variant="inherit"
                sx={{ 
                  fontWeight: 700, 
                  color: "rgb(88, 88, 95)",
                  display: "block",
                  fontSize: {
                    xs: isVerySmall ? "1.4rem" : "1.8rem",
                    sm: "2rem",
                    md: "2.2rem",
                    lg: "2.8rem"
                  },
                }}
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
            <Typography 
              variant={isMobile ? "h2" : "h1"} 
              className="presentation-title"
              sx={{
                fontSize: {
                  xs: isVerySmall ? "1.6rem" : "2rem",
                  sm: "2.2rem",
                  md: "2.5rem",
                  lg: "3rem"
                },
                textAlign: isMobile ? "center" : "left",
                wordWrap: "break-word",
                overflowWrap: "break-word",
              }}
            >
              UX Designer
            </Typography>
          </motion.div>
        </motion.div>
      </Box>
    </motion.div>
  );
}

export default Presentation;
