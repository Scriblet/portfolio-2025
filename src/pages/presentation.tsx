import ImgPresentation from "../img/presetation.jpg";
import { CardMedia, Typography, useMediaQuery, useTheme, Box } from "@mui/material";
import { motion } from "framer-motion";
import {
  containerVariants,
  imageVariants,
  floatingVariants,
  textVariants,
  getTextContainerVariants,
  getPresentationStyles,
  outerRingAnimation,
  innerRingAnimation,
  glowAnimation,
  imageHoverAnimation,
  floatingParticleTopAnimation,
  floatingParticleBottomAnimation,
  decorativeCircleAnimation,
  floatingCircleBottomLeftVariants
} from "./presentation.styles";

function Presentation() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isVerySmall = useMediaQuery("(max-width:360px)");
  const isSmallTablet = useMediaQuery("(max-width:768px)");

  const textContainerVariants = getTextContainerVariants(isMobile);
  const styles = getPresentationStyles({
    isMobile,
    isVerySmall,
    isSmallTablet
  });

  return (
    <motion.div
      id="home"
      data-testid="presentation-section"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={styles.root}
    >
      <Box sx={styles.backgroundOverlay} />

      <motion.div
        variants={floatingVariants}
        animate="animate"
        style={styles.floatingCircleTopRight}
      />

      <motion.div
        variants={floatingCircleBottomLeftVariants}
        animate="animate"
        style={styles.floatingCircleBottomLeft}
      />

      <Box
        component={motion.div}
        variants={containerVariants}
        sx={styles.gridContainer}
      >
        <motion.div
          className="container-image"
          variants={imageVariants}
          style={styles.imageContainer}
        >
          <motion.div
            {...outerRingAnimation}
            style={styles.outerRing}
          />

          <motion.div
            {...innerRingAnimation}
            style={styles.innerRing}
          />

          <motion.div
            {...glowAnimation}
            style={styles.glow}
          />

          <motion.div
            {...imageHoverAnimation}
            style={styles.imageWrapper}
          >
            <CardMedia
              component="img"
              image={ImgPresentation}
              alt="Lucas Nonato. Jovem com cabelo cacheado volumoso e bigode sorri amplamente para a câmera. Ele usa uma camisa preta e uma alça transversal é visível em seu ombro. O fundo tem uma parede decorada com grafites coloridos em tons de roxo, verde e vermelho, com letras estilizadas."
              data-testid="presentation-image"
              sx={styles.cardMedia}
            />
          </motion.div>

          {!isMobile && (
            <>
              <motion.div
                {...floatingParticleTopAnimation}
                style={styles.particleTopRight}
              />
              <motion.div
                {...floatingParticleBottomAnimation}
                style={styles.particleBottomLeft}
              />
            </>
          )}
        </motion.div>

        <motion.div
          className="container-texts"
          variants={textContainerVariants}
          style={styles.textContainer}
        >
          <Box sx={styles.textBox}>
            <motion.div variants={textVariants} style={styles.contentLayer}>
              <Typography
                variant={isMobile ? "h2" : "h1"}
                className="presentation-title"
                data-testid="presentation-name"
                sx={styles.nameTypography}
              >
                Eu sou Lucas Nonato
              </Typography>
            </motion.div>

            <motion.div variants={textVariants} style={styles.contentLayer}>
              <Typography
                variant={isMobile ? "h2" : "h1"}
                className="presentation-title"
                data-testid="presentation-role"
                sx={styles.roleTypography}
              >
                Desenvolvedor Web
                <Typography
                  variant="inherit"
                  data-testid="presentation-specialty"
                  sx={styles.specialtyTypography}
                >
                  Full-Stack
                </Typography>
              </Typography>
            </motion.div>

            <motion.div variants={textVariants} style={styles.contentLayer}>
              <Typography
                variant={isMobile ? "h2" : "h1"}
                className="presentation-title"
                data-testid="presentation-secondary-role"
                sx={styles.secondaryRoleTypography}
              >
                UX Designer
              </Typography>
            </motion.div>

            <motion.div
              {...decorativeCircleAnimation}
              style={styles.decorativeCircle}
            />
          </Box>
        </motion.div>
      </Box>
    </motion.div>
  );
}

export default Presentation;
