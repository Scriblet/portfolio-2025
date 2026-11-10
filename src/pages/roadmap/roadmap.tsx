import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  LinearProgress,
  Stack,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ScienceIcon from "@mui/icons-material/Science";
import { Link as RouterLink } from "react-router-dom";
import {
  roadmapGroups,
  roadmapStats,
  type RoadmapItem,
  type RoadmapStatus,
  type RoadmapWave,
} from "../../data/roadmap";

const statusMeta: Record<
  RoadmapStatus,
  { label: string; color: "success" | "info" | "default" }
> = {
  done: { label: "Concluído", color: "success" },
  "in-progress": { label: "Em andamento", color: "info" },
  pending: { label: "Pendente", color: "default" },
};

const ItemCard = ({ item }: { item: RoadmapItem }) => {
  const theme = useTheme();
  const meta = statusMeta[item.status];
  const progress =
    item.issuesTotal === 0
      ? 0
      : Math.round((item.issuesDone / item.issuesTotal) * 100);

  const accent =
    item.status === "done"
      ? theme.palette.success.main
      : item.status === "in-progress"
        ? theme.palette.info.main
        : theme.palette.divider;

  return (
    <Card
      variant="outlined"
      data-testid={`roadmap-item-${item.slug}`}
      sx={{
        height: "100%",
        borderColor:
          item.status === "pending"
            ? theme.palette.divider
            : alpha(accent, 0.55),
        backgroundColor:
          item.status === "done"
            ? alpha(theme.palette.success.main, 0.04)
            : theme.palette.background.paper,
      }}
    >
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          gap={1}
        >
          <Typography variant="h6" component="h4" sx={{ fontWeight: 700 }}>
            {item.title}
          </Typography>
          <Chip
            size="small"
            label={meta.label}
            color={meta.color}
            data-testid={`roadmap-status-${item.status}`}
          />
        </Stack>

        <Stack direction="row" alignItems="center" gap={1} flexWrap="wrap">
          <Chip size="small" variant="outlined" label={item.category} />
          <Typography variant="caption" color="text.secondary">
            {item.issuesDone}/{item.issuesTotal} issues
          </Typography>
        </Stack>

        <Typography variant="body2" color="text.secondary">
          {item.summary}
        </Typography>

        {item.dependsOn && item.dependsOn.length > 0 && (
          <Typography variant="caption" color="text.secondary">
            Depende de: {item.dependsOn.join(", ")}
          </Typography>
        )}

        {item.note && (
          <Typography variant="caption" color="text.secondary">
            {item.note}
          </Typography>
        )}

        <Box sx={{ mt: "auto", pt: 1 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            aria-label={`Progresso de ${item.title}`}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: alpha(theme.palette.text.primary, 0.08),
              "& .MuiLinearProgress-bar": {
                backgroundColor: accent,
                borderRadius: 3,
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

const StatCard = ({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) => {
  const theme = useTheme();

  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="overline" color="text.secondary">
          {label}
        </Typography>
        <Typography
          variant="h3"
          component="p"
          sx={{
            fontWeight: 800,
            color: theme.palette.primary.main,
            fontSize: "2.2rem",
            lineHeight: 1.1,
          }}
        >
          {value}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {hint}
        </Typography>
      </CardContent>
    </Card>
  );
};

const SectionHeading = ({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) => (
  <Box sx={{ mb: 2.5 }}>
    <Typography variant="overline" color="text.secondary">
      {eyebrow}
    </Typography>
    <Typography variant="h2" component="h2" sx={{ fontWeight: 800 }}>
      {title}
    </Typography>
    <Typography color="text.secondary" sx={{ mt: 0.5, maxWidth: 760 }}>
      {description}
    </Typography>
  </Box>
);

const waveTotals = (wave: RoadmapWave) => {
  const issuesDone = wave.items.reduce(
    (total, item) => total + item.issuesDone,
    0,
  );
  const issuesTotal = wave.items.reduce(
    (total, item) => total + item.issuesTotal,
    0,
  );

  return {
    issuesDone,
    issuesTotal,
    progress: issuesTotal === 0 ? 0 : Math.round((issuesDone / issuesTotal) * 100),
  };
};

const WaveCard = ({ wave }: { wave: RoadmapWave }) => {
  const theme = useTheme();
  const { issuesDone, issuesTotal, progress } = waveTotals(wave);

  return (
    <Card
      variant="outlined"
      data-testid={`roadmap-wave-${wave.id}`}
      sx={{
        borderColor: alpha(theme.palette.info.main, 0.5),
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          gap={1.5}
        >
          <Box>
            <Typography variant="overline" color="text.secondary">
              Onda {wave.id}
            </Typography>
            <Typography variant="h3" component="h3" sx={{ fontWeight: 800 }}>
              {wave.title}
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 0.5 }}>
              {wave.goal}
            </Typography>
          </Box>

          <Stack direction="row" alignItems="center" gap={1} sx={{ flexShrink: 0 }}>
            <Chip size="small" label="Em andamento" color="info" />
            <Typography variant="caption" color="text.secondary">
              {issuesDone}/{issuesTotal} issues
            </Typography>
          </Stack>
        </Stack>

        <LinearProgress
          variant="determinate"
          value={progress}
          aria-label={`Progresso da onda ${wave.id}`}
          sx={{
            my: 2.5,
            height: 6,
            borderRadius: 3,
            backgroundColor: alpha(theme.palette.text.primary, 0.08),
            "& .MuiLinearProgress-bar": { borderRadius: 3 },
          }}
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: 2,
          }}
        >
          {wave.items.map((item) => (
            <ItemCard key={item.slug} item={item} />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

const UpcomingCard = ({ wave }: { wave: RoadmapWave }) => {
  const theme = useTheme();
  const { issuesTotal, progress } = waveTotals(wave);

  return (
    <Card
      variant="outlined"
      data-testid={`roadmap-upcoming-${wave.id}`}
      sx={{ borderColor: theme.palette.divider }}
    >
      <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          gap={1}
        >
          <Box>
            <Typography variant="overline" color="text.secondary">
              Onda {wave.id}
            </Typography>
            <Typography variant="h3" component="h3" sx={{ fontWeight: 700 }}>
              {wave.title}
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary">
            {wave.items.length} PRDs · {issuesTotal} issues · {progress}%
          </Typography>
        </Stack>

        <Stack spacing={1} sx={{ mt: 2 }}>
          {wave.items.map((item) => (
            <Stack
              key={item.slug}
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "baseline" }}
              gap={0.5}
              sx={{
                borderTop: `1px solid ${theme.palette.divider}`,
                pt: 1,
              }}
            >
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {item.title}
                </Typography>
                {item.dependsOn && item.dependsOn.length > 0 && (
                  <Typography variant="caption" color="text.secondary">
                    Depende de: {item.dependsOn.join(", ")}
                  </Typography>
                )}
              </Box>
              <Typography variant="caption" color="text.secondary">
                {item.issuesTotal} issues
              </Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

const ShippedBand = () => {
  const theme = useTheme();
  const { shippedWaves, shipped } = roadmapGroups();

  return (
    <Accordion
      disableGutters
      elevation={0}
      data-testid="roadmap-shipped"
      sx={{
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        "&:before": { display: "none" },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", sm: "baseline" }}
          gap={{ xs: 0.25, sm: 1.5 }}
        >
          <Typography variant="h3" component="h2" sx={{ fontWeight: 700 }}>
            Entregue
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {shippedWaves.length} ondas · {shipped.prds} PRDs ·{" "}
            {shipped.issuesTotal} issues · abra para ver o histórico
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack divider={<Box sx={{ borderTop: `1px solid ${theme.palette.divider}` }} />}>
          {shippedWaves.map((wave) => {
            const { issuesTotal } = waveTotals(wave);
            return (
              <Stack
                key={wave.id}
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", sm: "baseline" }}
                gap={0.5}
                sx={{ py: 1 }}
              >
                <Typography variant="body2">
                  <strong>Onda {wave.id}</strong> · {wave.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {wave.items.length} PRDs · {issuesTotal} issues
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

const Roadmap = () => {
  const theme = useTheme();
  const stats = roadmapStats();
  const groups = roadmapGroups();

  return (
    <Box
      component="main"
      data-testid="roadmap-page"
      sx={{
        minHeight: "100vh",
        py: { xs: 4, md: 8 },
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          gap={2}
        >
          <Box>
            <Chip
              icon={<ScienceIcon />}
              label="Ambiente de desenvolvimento"
              color="info"
              size="small"
              sx={{ mb: 1.5 }}
            />
            <Typography variant="h1" component="h1" sx={{ fontWeight: 800 }}>
              Roadmap do portfólio
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 720 }}>
              Foco atual e próximos passos. O que já foi entregue fica recolhido
              no fim da página; esta rota só é montada em desenvolvimento.
            </Typography>
          </Box>

          <Button
            component={RouterLink}
            to="/"
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{ flexShrink: 0 }}
          >
            Voltar ao portfólio
          </Button>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
            gap: 2,
            mt: 4,
          }}
        >
          <StatCard
            label="Entregue"
            value={`${stats.progress}%`}
            hint={`${stats.issuesDone}/${stats.issuesTotal} issues do plano`}
          />
          <StatCard
            label="Em andamento"
            value={`${groups.active.openPrds}`}
            hint={`PRDs abertos · ${groups.active.issuesDone}/${groups.active.issuesTotal} issues`}
          />
          <StatCard
            label="A seguir"
            value={`${groups.upcoming.openPrds}`}
            hint={`PRDs na fila · ${groups.upcoming.issuesTotal} issues`}
          />
        </Box>

        <Box sx={{ mt: 3 }}>
          <LinearProgress
            variant="determinate"
            value={stats.progress}
            aria-label="Progresso geral do roadmap"
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: alpha(theme.palette.text.primary, 0.08),
              "& .MuiLinearProgress-bar": { borderRadius: 4 },
            }}
          />
        </Box>

        <Box component="section" sx={{ mt: 6 }}>
          <SectionHeading
            eyebrow="Agora"
            title="Em andamento"
            description="Ondas abertas, com os PRDs e o progresso de cada uma. Só o que ainda exige trabalho."
          />
          <Stack spacing={3}>
            {groups.activeWaves.map((wave) => (
              <WaveCard key={wave.id} wave={wave} />
            ))}
          </Stack>
        </Box>

        <Box component="section" sx={{ mt: 6 }}>
          <SectionHeading
            eyebrow="Depois"
            title="A seguir"
            description="Ondas ainda não iniciadas. Comece pelos PRDs sem dependência para destravar o resto."
          />
          <Stack spacing={2}>
            {groups.upcomingWaves.map((wave) => (
              <UpcomingCard key={wave.id} wave={wave} />
            ))}
          </Stack>
        </Box>

        <Box component="section" sx={{ mt: 6 }}>
          <ShippedBand />
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 4 }}
        >
          Rota disponível apenas com <code>import.meta.env.DEV</code>. Os
          arquivos de planejamento completos ficam em <code>.scratch/</code>.
        </Typography>
      </Container>
    </Box>
  );
};

export default Roadmap;
