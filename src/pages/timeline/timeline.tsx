import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { motion, useReducedMotion } from 'framer-motion';
import {
  sortedMilestones,
  type Milestone,
  type MilestoneType,
} from '../../data';

const TYPE_ORDER: MilestoneType[] = [
  'profissional',
  'formacao',
  'certificacao',
  'conquista',
];

const Timeline = () => {
  const theme = useTheme();
  const prefersReducedMotion = useReducedMotion();

  const typeMeta: Record<MilestoneType, { label: string; color: string }> = {
    formacao: { label: 'Formação', color: theme.palette.info.main },
    certificacao: { label: 'Certificação', color: theme.palette.success.main },
    profissional: { label: 'Profissional', color: theme.palette.primary.main },
    conquista: { label: 'Conquista', color: theme.palette.warning.main },
  };

  const presentTypes = TYPE_ORDER.filter((type) =>
    sortedMilestones.some((milestone) => milestone.type === type),
  );

  const renderCard = (milestone: Milestone, index: number) => {
    const meta = typeMeta[milestone.type];
    const isLeft = index % 2 === 0;

    return (
      <Box
        component={motion.li}
        key={milestone.id}
        data-testid={`jornada-item-${milestone.id}`}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.4,
          delay: prefersReducedMotion ? 0 : index * 0.06,
        }}
        style={{ listStyle: 'none' }}
        sx={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: {
            xs: '32px minmax(0, 1fr)',
            md: 'minmax(0, 1fr) 32px minmax(0, 1fr)',
          },
          columnGap: { xs: 2, md: 3 },
          mb: { xs: 3, md: 4 },
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            gridColumn: { xs: 1, md: 2 },
            gridRow: 1,
            justifySelf: 'center',
            alignSelf: 'start',
            mt: 1.5,
            width: 16,
            height: 16,
            borderRadius: '50%',
            backgroundColor: meta.color,
            border: `3px solid ${theme.palette.background.default}`,
            zIndex: 1,
          }}
        />

        <Card
          variant="outlined"
          sx={{
            gridColumn: { xs: 2, md: isLeft ? 1 : 3 },
            gridRow: 1,
            textAlign: { md: isLeft ? 'right' : 'left' },
            borderColor: alpha(meta.color, 0.45),
            backgroundColor: alpha(theme.palette.background.paper, 0.8),
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={{ xs: 'flex-start', md: isLeft ? 'flex-end' : 'flex-start' }}
              gap={1}
              flexWrap="wrap"
              sx={{ mb: 1 }}
            >
              <Chip
                size="small"
                label={meta.label}
                variant="outlined"
                sx={{
                  borderColor: alpha(meta.color, 0.7),
                  color: theme.palette.text.primary,
                }}
              />
              <Typography
                component="p"
                variant="overline"
                color="text.secondary"
                sx={{ lineHeight: 1.4 }}
              >
                <time dateTime={milestone.date}>{milestone.period}</time>
              </Typography>
            </Stack>

            <Typography
              component="h3"
              variant="h6"
              sx={{ fontWeight: 700, color: theme.palette.text.primary }}
            >
              {milestone.title}
            </Typography>

            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ mt: 0.25 }}
            >
              {milestone.institution}
            </Typography>

            {milestone.description && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
                {milestone.description}
              </Typography>
            )}

            {milestone.url && (
              <Button
                component="a"
                href={milestone.url}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                endIcon={<OpenInNewIcon fontSize="small" />}
                aria-label={`${milestone.title} (abre em nova aba)`}
                sx={{
                  mt: 1.5,
                  textTransform: 'none',
                  color: theme.palette.primary.main,
                }}
              >
                Ver certificado
              </Button>
            )}
          </CardContent>
        </Card>
      </Box>
    );
  };

  return (
    <Box
      component="section"
      id="jornada"
      data-testid="jornada-section"
      sx={{
        py: { xs: 3, sm: 4, md: 6, lg: 8 },
        px: { xs: 1, sm: 2, md: 3, lg: 4 },
      }}
    >
      <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
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
          Minha Jornada
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            textAlign: 'center',
            maxWidth: 640,
            mx: 'auto',
            mt: 1.5,
            mb: { xs: 3, md: 4 },
          }}
        >
          Trajetória profissional e certificações, do marco mais recente ao
          mais antigo.
        </Typography>

        <Stack
          direction="row"
          justifyContent="center"
          flexWrap="wrap"
          gap={2}
          sx={{ mb: { xs: 4, md: 5 } }}
          aria-label="Tipos de marco da jornada"
        >
          {presentTypes.map((type) => (
            <Stack key={type} direction="row" alignItems="center" gap={0.75}>
              <Box
                aria-hidden="true"
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: typeMeta[type].color,
                }}
              />
              <Typography variant="caption" color="text.secondary">
                {typeMeta[type].label}
              </Typography>
            </Stack>
          ))}
        </Stack>

        <Box sx={{ position: 'relative' }}>
          <Box
            aria-hidden="true"
            sx={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: { xs: 15, md: '50%' },
              width: 2,
              transform: { md: 'translateX(-50%)' },
              backgroundColor: theme.palette.divider,
              zIndex: 0,
            }}
          />

          <Box
            component="ol"
            aria-label="Linha do tempo da carreira"
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0,
              position: 'relative',
            }}
          >
            {sortedMilestones.map((milestone, index) =>
              renderCard(milestone, index),
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Timeline;
