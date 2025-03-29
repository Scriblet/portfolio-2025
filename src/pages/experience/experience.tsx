import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Box from "@mui/material/Box";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import styles from "./experience.module.scss";

const Experience = () => {
  const theme = useTheme();
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.down("xl"));

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
        display: "flex",
        flexDirection: "column",
        borderRadius: "16px",
        margin: "0 64px 64px",
      }}
      ref={ref}
    >
      <motion.h4
        initial={{ opacity: 0, x: -60 }} // Começa invisível e 100px à esquerda
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{
          duration: 0.6,
          ease: "easeOut", // Curva de animação suave
        }}
        style={{ fontWeight: "300", fontSize: "0.75rem " }}
      >
        EXPERIÊNCIA
      </motion.h4>

      <motion.h1
        initial={{ opacity: 0, x: -60 }} // Começa invisível e 100px à esquerda
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{
          duration: 0.6,
          ease: "easeOut", // Curva de animação suave
          delay: 0.2,
        }}
        style={{ maxWidth: "40%" }}
      >
        Empresas onde trabalhei e Aprendizados que conquistei
      </motion.h1>

      <Grid container spacing={3}>
        {experiences.map((exp, index) => (
          <Grid size={onlyLargeScreen ? 6 : 3} key={exp.id}>
            <Box component="div">
              <motion.h1
                initial={{ opacity: 0, x: -60 }} // Começa invisível e 100px à esquerda
                animate={inView ? { opacity: 1, x: 0 } : {}} // Termina visível na posição normal
                transition={{
                  duration: 0.6, // Duração de 0.7 segundos
                  delay: 0.2, // Adicione esta linha

                  ease: "easeOut", // Curva de animação suave
                }}
                className={styles.bigNumbers}
              >
                {exp.number}
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, x: -60 }} // Começa invisível e 100px à esquerda
                animate={inView ? { opacity: 1, x: 0 } : {}} // Termina visível na posição normal
                transition={{
                  duration: 0.8, // Duração de 0.7 segundos
                  delay: 0.2, // Adicione esta linha
                  ease: "easeOut", // Curva de animação suave
                }}
                className={`${styles["experience-title"]} ${
                  styles[`experience-title--color-${index + 1}`]
                }`}
              >
                {exp.company}
              </motion.h2>

              <motion.h3
                initial={{ opacity: 0, x: -60 }} // Começa invisível e 100px à esquerda
                animate={inView ? { opacity: 1, x: 0 } : {}} // Termina visível na posição normal
                transition={{
                  duration: 1, // Duração de 0.7 segundos
                  delay: 0.2, // Adicione esta linha
                  ease: "easeOut", // Curva de animação suave
                }}
              >
                {exp.position}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, x: -60 }} // Começa invisível e 100px à esquerda
                animate={inView ? { opacity: 1, x: 0 } : {}} // Termina visível na posição normal
                transition={{
                  duration: 1.2, // Duração de 0.7 segundos
                  delay: 0.2, // Adicione esta linha
                  ease: "easeOut", // Curva de animação suave
                }}
                className={styles.experienceText}
              >
                {exp.description}
              </motion.p>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Experience;
