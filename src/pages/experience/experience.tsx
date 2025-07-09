import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Box from "@mui/material/Box";
import { useMediaQuery, useTheme } from "@mui/material";
import styles from "./experience.module.scss";

const Experience = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.35,
  });

  // Dados das experiências em um array para mapeamento
  const experiences = [
    {
      id: 1,
      number: "01",
      company: "Porto Seguro",
      position: "Desenv. de Software Full-Stack",
      description:
        "Desenvolvo um portal de gestão de sinistros usando TypeScript, RxJS e Angular Material. Foco em performance com lazy loading e pré-carregamento inteligente.",
    },
    {
      id: 2,
      number: "02",
      company: "Thoughtworks",
      position: "Consultant Developer",
      description:
        "Atuei como Consultant Developer com React, TypeScript, TDD e NodeJS. Participei de projeto para tornar aplicativo 100% acessível seguindo WCAG",
    },
    {
      id: 3,
      number: "03",
      company: "Arco Educação",
      position: "Desenv. de Software",
      description:
        "Desenvolvi sistemas web com AngularJS, C# e ASP.NET MVC. Trabalhei em front-end responsivo e back-end robusto com NHibernate e Dapper.",
    },
    {
      id: 4,
      number: "04",
      company: "Finger Consultoria",
      position: "UX Designer",
      description:
        "Fundei a Finger Consultoria para fornecer serviços de consultoria de carreira para estudantes.",
    },
  ];

  return (
    <Box
      component="div"
      id="experience"
      sx={{
        paddingTop: isMobile ? "2rem" : "4rem",
        paddingBottom: isMobile ? "2rem" : "4rem", 
        display: "flex",
        flexDirection: "column",
        borderRadius: "16px",
        margin: isMobile 
          ? "0 1rem 2rem" 
          : isTablet 
            ? "0 2rem 3rem" 
            : "0 64px 64px",
      }}
      ref={ref}
    >
      <motion.h4
        initial={{ opacity: 0, x: -60 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        style={{ 
          fontWeight: "300", 
          fontSize: isMobile ? "0.7rem" : "0.75rem",
          textAlign: isMobile ? "center" : "left",
        }}
      >
      </motion.h4>

      <motion.h1
        initial={{ opacity: 0, x: -60 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{
          duration: 0.6,
          ease: "easeOut",
          delay: 0.2,
        }}
        style={{ 
          maxWidth: isMobile ? "100%" : "40%",
          fontSize: isMobile ? "1.8rem" : isTablet ? "2.2rem" : "2.5rem",
          textAlign: isMobile ? "center" : "left",
        }}
      >
        Empresas onde trabalhei e Aprendizados que conquistei
      </motion.h1>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: isMobile ? 2 : 3,
        }}
      >
        {experiences.map((exp, index) => (
          <Box 
            key={exp.id}
            sx={{
              padding: isMobile ? "1rem" : "1.5rem",
              paddingLeft: index === 0 ? "0" : "1.5rem",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <motion.h1
              initial={{ opacity: 0, x: -60 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: "easeOut",
              }}
              className={styles.bigNumbers}
              style={{
                fontSize: isMobile ? "3rem" : isTablet ? "4rem" : "5rem",
                marginBottom: "1rem",
              }}
            >
              {exp.number}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, x: -60 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: "easeOut",
              }}
              className={`${styles["experience-title"]} ${
                styles[`experience-title--color-${index + 1}`]
              }`}
              style={{
                fontSize: isMobile ? "1.2rem" : isTablet ? "1.4rem" : "1.6rem",
                marginBottom: "0.5rem",
              }}
            >
              {exp.company}
            </motion.h2>

            <motion.h3
              initial={{ opacity: 0, x: -60 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 1,
                delay: 0.2,
                ease: "easeOut",
              }}
              style={{
                fontSize: isMobile ? "1rem" : isTablet ? "1.1rem" : "1.2rem",
                marginBottom: "1rem",
              }}
            >
              {exp.position}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, x: -60 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 1.2,
                delay: 0.2,
                ease: "easeOut",
              }}
              className={styles.experienceText}
              style={{
                fontSize: isMobile ? "0.9rem" : "1rem",
                lineHeight: "1.6",
                flex: 1,
              }}
            >
              {exp.description}
            </motion.p>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Experience;
