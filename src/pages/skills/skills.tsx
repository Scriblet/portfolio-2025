import { motion } from "framer-motion";
import { Box, Typography, useTheme, alpha } from "@mui/material";
import {
  Code,
  DesignServices,
  Storage,
  Build,
  Api,
  Cloud,
  Accessibility,
} from "@mui/icons-material";

const SkillsSection = () => {
  const theme = useTheme();

  const skills = [
    {
      icon: <Code fontSize="large" />,
      title: "React/Next.js",
      description: "Desenvolvimento de aplicações modernas e performáticas",
      tags: ["Componentes", "SSR", "Gerenciamento de Estado", "Hooks"],
    },
    {
      icon: <DesignServices fontSize="large" />,
      title: "UX Engineering",
      description: "Ponte entre design e desenvolvimento",
      tags: ["Figma", "Design Systems", "Prototipação"],
    },
    {
      icon: <Api fontSize="large" />,
      title: "APIs REST/GraphQL",
      description: "Integração com back-end e serviços externos",
      tags: ["Fetch API", "Axios", "Autenticação"],
    },
    {
      icon: <Accessibility fontSize="large" />,
      title: "Acessibilidade Digital",
      description: "Desenvolvimento inclusivo seguindo WCAG 2.2 AA",
      tags: ["Navegação", "Leitores de Tela", "Contraste"],
    },
    {
      icon: <Storage fontSize="large" />,
      title: "Bancos de Dados",
      description: "Modelagem e consulta eficiente",
      tags: ["PostgreSQL", "MongoDB", "SQL"],
    },
    {
      icon: <Build fontSize="large" />,
      title: "Testes Automatizados",
      description: "Garantia de qualidade e acessibilidade",
      tags: ["Testes E2E", "Jest", "Cypress"],
    },
    {
      icon: <Cloud fontSize="large" />,
      title: "Cloud & DevOps",
      description: "Deploy e monitoramento de aplicações",
      tags: ["AWS", "GitHub Actions", "Docker"],
    },
    {
      icon: <Code fontSize="large" />,
      title: "TypeScript",
      description: "Tipagem para código mais seguro",
      tags: ["Interfaces", "Tipos Básicos", "Props"],
    },
    {
      icon: <DesignServices fontSize="large" />,
      title: "UI Development",
      description: "Implementação pixel-perfect",
      tags: ["Material UI", "Responsividade", "Microinterações"],
    },
    {
      icon: <Build fontSize="large" />,
      title: "Metodologias Ágeis",
      description: "Trabalho em equipe eficiente",
      tags: ["Scrum", "Sprints", "Kanban", "Pair Programming", "Scrumban"],
    },
  ];

  return (
    <Box
      id="skills"
      component="section"
      sx={{ 
        py: { xs: 3, sm: 4, md: 6, lg: 8 }, 
        px: { xs: 1, sm: 2, md: 3, lg: 4 },
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: 800,
          mb: { xs: 3, sm: 4, md: 5, lg: 6 },
          textAlign: "center",
          fontSize: {
            xs: "1.5rem",
            sm: "1.8rem", 
            md: "2.2rem",
            lg: "2.5rem"
          },
          color: theme.palette.text.primary,
          wordWrap: "break-word",
          overflowWrap: "break-word",
        }}
      >
        Habilidades Técnicas
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: { xs: 1.5, sm: 2, md: 3, lg: 4 },
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={skill.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.1 }}
          >
            <Box
              sx={{
                p: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
                height: "100%",
                borderRadius: 4,
                border: `1px solid ${theme.palette.divider}`,
                backgroundColor: theme.palette.background.paper,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: `0 6px 16px ${alpha(
                    theme.palette.primary.light,
                    0.1,
                  )}`,
                },
              }}
            >
              <Box
                sx={{
                  color: theme.palette.primary.main,
                  mb: { xs: 1, sm: 1.5, md: 2 },
                }}
              >
                {skill.icon}
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  color: theme.palette.text.primary,
                  fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                {skill.title}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  mb: { xs: 1, sm: 1.5, md: 2 },
                  color: theme.palette.text.secondary,
                  minHeight: { xs: "2em", sm: "2.5em", md: "3.5em" },
                  fontSize: { xs: "0.8rem", sm: "0.875rem", md: "1rem" },
                  lineHeight: 1.4,
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                {skill.description}
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {skill.tags.map((tag) => (
                  <Box
                    key={tag}
                    sx={{
                      px: { xs: 0.75, sm: 1 },
                      py: 0.5,
                      borderRadius: 2,
                      backgroundColor: alpha(
                        theme.palette.primary.light,
                        0.1,
                      ),
                      color: theme.palette.text.primary,
                      fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.875rem" },
                      margin: "0.25rem",
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                    }}
                  >
                    {tag}
                  </Box>
                ))}
              </Box>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default SkillsSection;
