import { useMemo, useState } from 'react';
import { Box, Chip, Typography, alpha, useTheme } from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import {
  siAngular,
  siCss,
  siCypress,
  siDocker,
  siDotnet,
  siEslint,
  siExpress,
  siFigma,
  siFramer,
  siGit,
  siGithub,
  siGithubactions,
  siGraphql,
  siHtml5,
  siJavascript,
  siJest,
  siMongodb,
  siMui,
  siNetlify,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPrettier,
  siReact,
  siSass,
  siStorybook,
  siTypescript,
  siVercel,
  siVite,
  siVitest,
} from 'simple-icons';
import {
  technologies,
  toolboxCategories,
  type Technology,
  type ToolboxCategoryId,
  type ToolboxIconKey,
} from '../../data';

// Mapa entre a chave dos dados e o path oficial do Simple Icons. Importar
// nomes individuais mantém o bundle pequeno: só os ícones usados entram.
const iconMap: Record<ToolboxIconKey, { path: string; title: string }> = {
  react: siReact,
  nextjs: siNextdotjs,
  typescript: siTypescript,
  javascript: siJavascript,
  angular: siAngular,
  html5: siHtml5,
  css: siCss,
  sass: siSass,
  mui: siMui,
  framer: siFramer,
  vite: siVite,
  node: siNodedotjs,
  express: siExpress,
  graphql: siGraphql,
  dotnet: siDotnet,
  postgresql: siPostgresql,
  mongodb: siMongodb,
  docker: siDocker,
  githubactions: siGithubactions,
  vercel: siVercel,
  netlify: siNetlify,
  git: siGit,
  github: siGithub,
  vitest: siVitest,
  jest: siJest,
  cypress: siCypress,
  eslint: siEslint,
  prettier: siPrettier,
  figma: siFigma,
  storybook: siStorybook,
};

const TechIcon = ({ technology }: { technology: Technology }) => {
  const theme = useTheme();
  const icon = technology.icon ? iconMap[technology.icon] : undefined;

  if (!icon) {
    const initials = technology.name
      .replace(/[^A-Za-z0-9]/g, '')
      .slice(0, 2)
      .toUpperCase();

    return (
      <Box
        aria-hidden="true"
        sx={{
          width: { xs: 32, md: 38 },
          height: { xs: 32, md: 38 },
          borderRadius: 2,
          display: 'grid',
          placeItems: 'center',
          fontWeight: 700,
          fontSize: '0.75rem',
          letterSpacing: 0.5,
          backgroundColor: alpha(theme.palette.primary.main, 0.16),
          color: theme.palette.text.primary,
          flexShrink: 0,
        }}
      >
        {initials}
      </Box>
    );
  }

  return (
    <Box
      component="svg"
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      sx={{
        width: { xs: 30, md: 36 },
        height: { xs: 30, md: 36 },
        color: theme.palette.text.primary,
        flexShrink: 0,
      }}
    >
      <path d={icon.path} fill="currentColor" />
    </Box>
  );
};

const Toolbox = () => {
  const theme = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<
    ToolboxCategoryId | 'all'
  >('all');

  const focusRing =
    theme.palette.mode === 'dark' ? '#22d3ee' : '#00695c';

  const visibleCategories = useMemo(
    () =>
      activeCategory === 'all'
        ? toolboxCategories
        : toolboxCategories.filter((category) => category.id === activeCategory),
    [activeCategory],
  );

  const technologiesByCategory = useMemo(() => {
    const map = new Map<ToolboxCategoryId, Technology[]>();

    for (const technology of technologies) {
      const list = map.get(technology.categoryId) ?? [];
      list.push(technology);
      map.set(technology.categoryId, list);
    }

    return map;
  }, []);

  return (
    <Box
      component="section"
      id="toolbox"
      data-testid="toolbox-section"
      sx={{
        py: { xs: 3, sm: 4, md: 6, lg: 8 },
        px: { xs: 1, sm: 2, md: 3, lg: 4 },
      }}
    >
      <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
        <Typography
          component="h2"
          variant="h2"
          sx={{
            fontWeight: 800,
            textAlign: 'center',
            color: theme.palette.text.primary,
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
          }}
        >
          Stack &amp; Ferramentas
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            textAlign: 'center',
            maxWidth: 720,
            mx: 'auto',
            mt: 1.5,
            mb: { xs: 3, md: 4 },
          }}
        >
          O que eu uso no dia a dia, separado entre o que é core e o que é
          complementar. Cada item leva para a documentação oficial.
        </Typography>

        <Box
          role="group"
          aria-label="Filtrar tecnologias por categoria"
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 1,
            mb: { xs: 4, md: 5 },
          }}
        >
          <Chip
            label="Todas"
            clickable
            color={activeCategory === 'all' ? 'primary' : 'default'}
            variant={activeCategory === 'all' ? 'filled' : 'outlined'}
            onClick={() => setActiveCategory('all')}
            aria-pressed={activeCategory === 'all'}
            data-testid="toolbox-filter-all"
          />
          {toolboxCategories.map((category) => {
            const isActive = activeCategory === category.id;

            return (
              <Chip
                key={category.id}
                label={category.title}
                clickable
                color={isActive ? 'primary' : 'default'}
                variant={isActive ? 'filled' : 'outlined'}
                onClick={() => setActiveCategory(category.id)}
                aria-pressed={isActive}
                data-testid={`toolbox-filter-${category.id}`}
              />
            );
          })}
        </Box>

        {visibleCategories.map((category) => {
          const items = technologiesByCategory.get(category.id) ?? [];

          if (items.length === 0) {
            return null;
          }

          return (
            <Box
              key={category.id}
              component="section"
              aria-labelledby={`toolbox-category-${category.id}`}
              data-testid={`toolbox-category-${category.id}`}
              sx={{ mb: { xs: 4, md: 5 } }}
            >
              <Typography
                id={`toolbox-category-${category.id}`}
                component="h3"
                variant="h5"
                sx={{ fontWeight: 700, color: theme.palette.text.primary }}
              >
                {category.title}
              </Typography>

              {category.description && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {category.description}
                </Typography>
              )}

              <Box
                component="ul"
                sx={{
                  listStyle: 'none',
                  p: 0,
                  m: 0,
                  mt: { xs: 2, md: 2.5 },
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: 'repeat(2, minmax(0, 1fr))',
                    sm: 'repeat(3, minmax(0, 1fr))',
                    md: 'repeat(4, minmax(0, 1fr))',
                    lg: 'repeat(5, minmax(0, 1fr))',
                  },
                  gap: { xs: 1.5, md: 2 },
                }}
              >
                {items.map((technology, index) => {
                  const isPrincipal = technology.level === 'principal';

                  return (
                    <motion.li
                      key={technology.id}
                      initial={
                        prefersReducedMotion ? false : { opacity: 0, y: 12 }
                      }
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.35,
                        delay: prefersReducedMotion ? 0 : index * 0.03,
                      }}
                      style={{ listStyle: 'none' }}
                    >
                      <Box
                        component={technology.url ? 'a' : 'div'}
                        {...(technology.url
                          ? {
                              href: technology.url,
                              target: '_blank',
                              rel: 'noopener noreferrer',
                              'aria-label': `${technology.name} — ${
                                isPrincipal ? 'principal' : 'complementar'
                              } (abre em nova aba)`,
                            }
                          : {})}
                        data-testid={`toolbox-item-${technology.id}`}
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 1,
                          height: '100%',
                          p: { xs: 1.5, md: 2 },
                          borderRadius: 3,
                          border: `1px solid ${
                            isPrincipal
                              ? alpha(theme.palette.primary.main, 0.4)
                              : theme.palette.divider
                          }`,
                          backgroundColor: theme.palette.background.paper,
                          color: theme.palette.text.primary,
                          textDecoration: 'none',
                          transition: prefersReducedMotion
                            ? 'none'
                            : 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
                          '&:hover': {
                            transform: prefersReducedMotion
                              ? 'none'
                              : 'translateY(-3px)',
                            borderColor: alpha(
                              theme.palette.primary.main,
                              0.65,
                            ),
                            boxShadow: `0 8px 20px ${alpha(
                              theme.palette.primary.main,
                              0.16,
                            )}`,
                          },
                          '&:focus-visible': {
                            outline: `3px solid ${focusRing}`,
                            outlineOffset: '2px',
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 1,
                            width: '100%',
                          }}
                        >
                          <TechIcon technology={technology} />

                          {isPrincipal && (
                            <Chip
                              label="Principal"
                              size="small"
                              sx={{
                                height: 20,
                                fontSize: '0.65rem',
                                backgroundColor: alpha(
                                  theme.palette.primary.main,
                                  0.18,
                                ),
                                color: theme.palette.text.primary,
                              }}
                            />
                          )}
                        </Box>

                        <Typography
                          component="span"
                          sx={{
                            fontWeight: 600,
                            fontSize: { xs: '0.85rem', md: '0.95rem' },
                            lineHeight: 1.3,
                            wordBreak: 'break-word',
                          }}
                        >
                          {technology.name}
                        </Typography>

                        <Typography
                          component="span"
                          variant="caption"
                          color="text.secondary"
                        >
                          {isPrincipal ? 'Core' : 'Complementar'}
                        </Typography>
                      </Box>
                    </motion.li>
                  );
                })}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Toolbox;
