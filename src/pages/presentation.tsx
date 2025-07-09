import ImgPresentation from "../img/presetation.jpg";
import { CardMedia, Typography, useMediaQuery, useTheme, Box } from "@mui/material";
import { motion } from "framer-motion";

function Presentation() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isVerySmall = useMediaQuery("(max-width:360px)");
  const isSmallTablet = useMediaQuery("(max-width:768px)");

  // Variantes de animação para o Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotateY: -15
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const textContainerVariants = {
    hidden: { opacity: 0, x: isMobile ? 0 : 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 2, -2, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      id="home"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ 
        width: "100%",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Background decorativo */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(0, 255, 255, 0.036) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.036) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.024) 0%, transparent 50%)
          `,
          zIndex: 0
        }}
      />

      {/* Elementos flutuantes decorativos */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        style={{
          position: "absolute",
          top: "10%",
          right: "10%",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "linear-gradient(45deg, rgba(0, 255, 255, 0.1), rgba(147, 51, 234, 0.1))",
          zIndex: 1,
          display: isMobile ? "none" : "block"
        }}
      />

      <motion.div
        variants={{
          animate: {
            y: [15, -15, 15],
            rotate: [0, -3, 3, 0],
            transition: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }
          }
        }}
        animate="animate"
        style={{
          position: "absolute",
          bottom: "15%",
          left: "5%",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(0, 255, 255, 0.1))",
          zIndex: 1,
          display: isMobile ? "none" : "block"
        }}
      />

      <Box
        component={motion.div}
        variants={containerVariants}
        sx={{
          minHeight: {
            xs: "auto",
            sm: "auto", 
            md: "75vh",
            lg: "85vh"
          },
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr",
            md: "1.2fr 1fr",
            lg: "1.3fr 1fr"
          },
          gridTemplateRows: {
            xs: "auto auto",
            sm: "auto auto",
            md: "1fr"
          },
          alignItems: "center",
          margin: {
            xs: "0 0.5rem",
            sm: "0 1rem", 
            md: "0 1.5rem",
            lg: "0 2rem"
          },
          borderRadius: "20px",
          gap: {
            xs: "3rem",
            sm: "4rem",
            md: "3rem",
            lg: "4rem"
          },
          padding: {
            xs: "12vh 0 4rem 0", // Mais espaço no topo para mobile
            sm: "14vh 0 5rem 0", // Ainda mais espaço para tablets pequenos
            md: "8vh 0 4rem 0",  // Ajuste para medium
            lg: "10vh 0 6rem 0"  // Espaço generoso para large
          },
          position: "relative",
          zIndex: 2
        }}
      >
        {/* Container da Imagem com efeitos avançados */}
        <motion.div
          className="container-image"
          variants={imageVariants}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            order: isMobile ? 1 : 0,
            position: "relative"
          }}
        >
          {/* Anel decorativo externo */}
          <motion.div
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              position: "absolute",
              width: isMobile ? "320px" : isSmallTablet ? "420px" : "680px",
              height: isMobile ? "320px" : isSmallTablet ? "420px" : "680px",
              borderRadius: "50%",
              border: "2px solid transparent",
              background: `
                linear-gradient(45deg, transparent, transparent) padding-box,
                linear-gradient(45deg, rgba(0, 255, 255, 0.3), rgba(147, 51, 234, 0.3), rgba(59, 130, 246, 0.3)) border-box
              `,
              zIndex: 1
            }}
          />

          {/* Anel decorativo interno */}
          <motion.div
            animate={{
              rotate: -360
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              position: "absolute",
              width: isMobile ? "290px" : isSmallTablet ? "390px" : "640px",
              height: isMobile ? "290px" : isSmallTablet ? "390px" : "640px",
              borderRadius: "50%",
              border: "1px solid rgba(0, 255, 255, 0.2)",
              zIndex: 1
            }}
          />

          {/* Glow effect de fundo */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              position: "absolute",
              width: isMobile ? "280px" : isSmallTablet ? "380px" : "630px",
              height: isMobile ? "280px" : isSmallTablet ? "380px" : "630px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 70%)",
              zIndex: 0
            }}
          />

          {/* Imagem principal */}
          <motion.div
            whileHover={{ 
              scale: 1.05,
              rotateY: 5,
              transition: { duration: 0.3 }
            }}
            style={{ 
              position: "relative", 
              zIndex: 2,
              borderRadius: "50%",
              overflow: "hidden"
            }}
          >
            <CardMedia
              component="img"
              image={ImgPresentation}
              alt="Lucas Nonato. Jovem com cabelo cacheado volumoso e bigode sorri amplamente para a câmera. Ele usa uma camisa preta e uma alça transversal é visível em seu ombro. O fundo tem uma parede decorada com grafites coloridos em tons de roxo, verde e vermelho, com letras estilizadas."
              sx={{
                height: {
                  xs: isVerySmall ? "240px" : "280px",
                  sm: "320px",
                  md: "480px",
                  lg: "550px",
                  xl: "600px"
                },
                width: {
                  xs: isVerySmall ? "240px" : "280px",
                  sm: "320px",
                  md: "480px", 
                  lg: "550px",
                  xl: "600px"
                },
                maxWidth: "75vw",
                maxHeight: "75vw",
                objectFit: "cover",
                borderRadius: "50%",
                boxShadow: `
                  0 0 0 4px rgba(0, 255, 255, 0.1),
                  0 0 0 8px rgba(147, 51, 234, 0.05),
                  0 20px 40px rgba(0, 0, 0, 0.3),
                  0 0 60px rgba(0, 255, 255, 0.2)
                `,
                border: "3px solid rgba(255, 255, 255, 0.1)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                filter: "contrast(1.1) saturate(1.1)",
                "&:hover": {
                  boxShadow: `
                    0 0 0 4px rgba(0, 255, 255, 0.2),
                    0 0 0 8px rgba(147, 51, 234, 0.1),
                    0 25px 50px rgba(0, 0, 0, 0.4),
                    0 0 80px rgba(0, 255, 255, 0.3)
                  `,
                  filter: "contrast(1.2) saturate(1.2) brightness(1.05)"
                }
              }}
            />
          </motion.div>

          {/* Partículas flutuantes */}
          {!isMobile && (
            <>
              <motion.div
                animate={{
                  y: [-20, 20, -20],
                  x: [-10, 10, -10],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  position: "absolute",
                  top: "10%",
                  right: "15%",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "rgba(0, 255, 255, 0.6)",
                  zIndex: 3
                }}
              />
              <motion.div
                animate={{
                  y: [15, -15, 15],
                  x: [10, -10, 10],
                  opacity: [0.4, 0.9, 0.4]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                style={{
                  position: "absolute",
                  bottom: "20%",
                  left: "10%",
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "rgba(147, 51, 234, 0.7)",
                  zIndex: 3
                }}
              />
            </>
          )}
        </motion.div>

        {/* Container de Texto com design premium */}
        <motion.div
          className="container-texts"
          variants={textContainerVariants}
          style={{
            width: "100%",
            height: "auto",
            order: isMobile ? 2 : 0,
            position: "relative"
          }}
        >
          {/* Background glass morphism */}
          <Box
            sx={{
              padding: {
                xs: isVerySmall ? "2rem" : "2.5rem",
                sm: "3rem",
                md: "3.5rem",
                lg: "4.5rem"
              },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: {
                xs: "2rem",
                sm: "2.5rem",
                md: "3rem"
              },
              background: `
                linear-gradient(135deg, 
                  rgba(15, 23, 42, 0.95) 0%,
                  rgba(30, 41, 59, 0.9) 50%,
                  rgba(15, 23, 42, 0.95) 100%
                )
              `,
              borderRadius: {
                xs: "20px",
                sm: "25px",
                md: "35px",
                lg: "45px"
              },
              border: "1px solid rgba(0, 255, 255, 0.1)",
              backdropFilter: "blur(20px)",
              position: "relative",
              overflow: "hidden",
              boxShadow: `
                0 25px 50px rgba(0, 0, 0, 0.5),
                inset 0 1px 0 rgba(255, 255, 255, 0.1),
                0 0 60px rgba(0, 255, 255, 0.05)
              `,
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "2px",
                background: "linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.4), rgba(168, 85, 247, 0.4), transparent)",
              },
              "&::after": {
                content: '""',
                position: "absolute",
                top: "20%",
                right: "-50%",
                width: "100%",
                height: "100%",
                background: "radial-gradient(circle, rgba(0, 255, 255, 0.03) 0%, transparent 50%)",
                transform: "rotate(45deg)",
                pointerEvents: "none"
              }
            }}
          >
            {/* Título principal limpo */}
            <motion.div
              variants={textVariants}
              style={{ position: "relative", zIndex: 2 }}
            >
              <Typography 
                variant={isMobile ? "h2" : "h1"} 
                className="presentation-title"
                sx={{
                  fontSize: {
                    xs: isVerySmall ? "1.6rem" : "2rem",
                    sm: "2.5rem",
                    md: "3rem",
                    lg: "3.8rem",
                    xl: "4.2rem"
                  },
                  fontWeight: 800,
                  textAlign: isMobile ? "center" : "left",
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  lineHeight: 1.1,
                  color: "#f8f9fa",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: "-8px",
                    left: isMobile ? "50%" : "0",
                    transform: isMobile ? "translateX(-50%)" : "none",
                    width: "60px",
                    height: "3px",
                    background: "linear-gradient(90deg, rgba(34, 211, 238, 0.6), rgba(168, 85, 247, 0.6))",
                    borderRadius: "2px"
                  }
                }}
              >
                Eu sou Lucas Nonato
              </Typography>
            </motion.div>

            {/* Desenvolvedor Web limpo */}
            <motion.div
              variants={textVariants}
              style={{ position: "relative", zIndex: 2 }}
            >
              <Typography 
                variant={isMobile ? "h2" : "h1"} 
                className="presentation-title"
                sx={{
                  fontSize: {
                    xs: isVerySmall ? "1.6rem" : "2rem",
                    sm: "2.5rem",
                    md: "3rem",
                    lg: "3.8rem",
                    xl: "4.2rem"
                  },
                  fontWeight: 800,
                  textAlign: isMobile ? "center" : "left",
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  lineHeight: 1.1,
                  color: "#e9ecef"
                }}
              >
                Desenvolvedor Web
                
                {/* Full-Stack simples */}
                <Typography
                  variant="inherit"
                  sx={{
                  display: "block",
                  fontSize: isMobile ? "0.8em" : "0.85em",
                  fontWeight: 700,
                  color: "#06b6d4", // cyan mais claro
                  marginTop: "0.3rem"
                  }}
                >
                  Full-Stack
                </Typography>
              </Typography>
            </motion.div>

            {/* UX Designer limpo */}
            <motion.div
              variants={textVariants}
              style={{ position: "relative", zIndex: 2 }}
            >
              <Typography 
                variant={isMobile ? "h2" : "h1"} 
                className="presentation-title"
                sx={{
                  fontSize: {
                    xs: isVerySmall ? "1.6rem" : "2rem",
                    sm: "2.5rem",
                    md: "3rem",
                    lg: "3.8rem",
                    xl: "4.2rem"
                  },
                  fontWeight: 800,
                  textAlign: isMobile ? "center" : "left",
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  lineHeight: 1.1,
                  color: "#6d28d9" // purple escuro
                }}
              >
                UX Designer
              </Typography>
            </motion.div>

            {/* Elemento decorativo no canto */}
            <motion.div
              animate={{
                rotate: [0, 180, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                position: "absolute",
                bottom: "15px",
                right: "15px",
                width: "40px",
                height: "40px",
                background: "linear-gradient(45deg, rgba(0, 255, 255, 0.1), rgba(147, 51, 234, 0.1))",
                borderRadius: "50%",
                border: "1px solid rgba(0, 255, 255, 0.2)",
                zIndex: 1
              }}
            />
          </Box>
        </motion.div>
      </Box>
    </motion.div>
  );
}

export default Presentation;
