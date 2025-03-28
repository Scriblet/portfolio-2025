import { motion } from "framer-motion";
import { Box, Typography, Grid, Chip, useTheme, alpha } from "@mui/material";
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
    <Box component="section" sx={{ py: 8, px: { xs: 2, md: 4 } }}>
      <Typography
        variant="h2"
        sx={{
          fontWeight: 800,
          mb: 6,
          textAlign: "center",
          fontSize: { xs: "2rem", md: "2.5rem" },
          color: theme.palette.text.primary,
        }}
      >
        Habilidades Técnicas
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {skills.map((skill, index) => (
          <Grid key={skill.title}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
            >
              <Box
                sx={{
                  p: 3,
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
                    mb: 2,
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
                  }}
                >
                  {skill.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    mb: 2,
                    color: theme.palette.text.secondary,
                    minHeight: "3.5em",
                  }}
                >
                  {skill.description}
                </Typography>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {skill.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{
                        borderRadius: 2,
                        backgroundColor: alpha(
                          theme.palette.primary.light,
                          0.1,
                        ),
                        color: theme.palette.text.primary,
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SkillsSection;
