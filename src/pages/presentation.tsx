import ImgPresentation from "../img/presetation.jpg";
import { CardMedia, Typography, useMediaQuery, useTheme, Box } from "@mui/material";
import { motion, MotionConfig, useAnimationFrame } from "framer-motion";
import { useRef, CSSProperties } from "react";
import {
  containerVariants,
  imageVariants,
  textVariants,
  getTextContainerVariants,
  getPresentationStyles,
  outerRingAnimation,
  innerRingAnimation,
  glowAnimation,
  imageHoverAnimation,
  floatingParticleTopAnimation,
  floatingParticleBottomAnimation,
  decorativeCircleAnimation
} from "./presentation.styles";

type FloatingCircleProps = {
  style: CSSProperties;
  testId: string;
  amplitudeY: number;
  amplitudeX?: number;
  rotationDeg?: number;
  durationMs: number;
  phaseOffsetMs?: number;
};

const FloatingCircle = ({
  style,
  testId,
  amplitudeY,
  amplitudeX = 0,
  rotationDeg = 0,
  durationMs,
  phaseOffsetMs = 0
}: FloatingCircleProps) => {
  const circleRef = useRef<HTMLDivElement | null>(null);

  useAnimationFrame((time) => {
    const element = circleRef.current;
    if (!element) {
      return;
    }

    const totalDuration = Math.max(durationMs, 16);
    const elapsed = (time + phaseOffsetMs) % totalDuration;
    const angle = (elapsed / totalDuration) * Math.PI * 2;
    const translateX = amplitudeX ? Math.sin(angle) * amplitudeX : 0;
    const translateY = Math.cos(angle) * amplitudeY;
    const rotation = rotationDeg ? Math.sin(angle) * rotationDeg : 0;

    element.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotation}deg)`;
  });

  return <div ref={circleRef} style={style} data-testid={testId} />;
};

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
    <MotionConfig reducedMotion="never">
      <motion.div
        id="home"
        data-testid="presentation-section"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={styles.root}
      >
        <Box sx={styles.backgroundOverlay} />

      <FloatingCircle
        style={styles.floatingCircleTopRight}
        testId="presentation-floating-top"
        amplitudeY={12}
        amplitudeX={6}
        rotationDeg={4}
        durationMs={6000}
      />

      <FloatingCircle
        style={styles.floatingCircleBottomLeft}
        testId="presentation-floating-bottom"
        amplitudeY={16}
        amplitudeX={8}
        rotationDeg={6}
        durationMs={5500}
        phaseOffsetMs={1200}
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
          data-testid="presentation-image-container"
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
            data-testid="presentation-image-wrapper"
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
    </MotionConfig>
  );
}

export default Presentation;
