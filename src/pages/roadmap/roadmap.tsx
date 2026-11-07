import {
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
import ScienceIcon from "@mui/icons-material/Science";
import { Link as RouterLink } from "react-router-dom";
import {
  roadmapStats,
  roadmapWaves,
  type RoadmapItem,
  type RoadmapStatus,
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
          <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
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
          sx={{ fontWeight: 800, color: theme.palette.primary.main }}
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

const Roadmap = () => {
  const theme = useTheme();
  const stats = roadmapStats();

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
              Plano vivo das ondas de evolução. Esta página só é montada em
              desenvolvimento e não existe no build de produção.
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
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: 2,
            mt: 4,
          }}
        >
          <StatCard
            label="PRDs"
            value={`${stats.prdsDone}/${stats.prdsTotal}`}
            hint="concluídos"
          />
          <StatCard
            label="Issues"
            value={`${stats.issuesDone}/${stats.issuesTotal}`}
            hint="implementadas"
          />
          <StatCard
            label="Ondas"
            value={`${stats.wavesDone}/${stats.wavesTotal}`}
            hint="concluídas"
          />
          <StatCard
            label="Em andamento"
            value={`${stats.inProgress}`}
            hint="PRDs ativos"
          />
        </Box>

        <Box sx={{ mt: 4 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            sx={{ mb: 1 }}
          >
            <Typography variant="h6" component="h2" sx={{ fontWeight: 700 }}>
              Progresso geral
            </Typography>
            <Typography variant="h6" component="p" sx={{ fontWeight: 700 }}>
              {stats.progress}%
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={stats.progress}
            aria-label="Progresso geral do roadmap"
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: alpha(theme.palette.text.primary, 0.08),
              "& .MuiLinearProgress-bar": { borderRadius: 5 },
            }}
          />
        </Box>

        <Stack spacing={3} sx={{ mt: 6 }}>
          {roadmapWaves.map((wave) => {
            const meta = statusMeta[wave.status];
            const done = wave.items.reduce(
              (total, item) => total + item.issuesDone,
              0,
            );
            const total = wave.items.reduce(
              (sum, item) => sum + item.issuesTotal,
              0,
            );
            const progress = total === 0 ? 0 : Math.round((done / total) * 100);

            return (
              <Card
                key={wave.id}
                variant="outlined"
                data-testid={`roadmap-wave-${wave.id}`}
                sx={{
                  borderColor:
                    wave.status === "pending"
                      ? theme.palette.divider
                      : alpha(
                          wave.status === "done"
                            ? theme.palette.success.main
                            : theme.palette.info.main,
                          0.5,
                        ),
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
                      <Typography variant="h2" component="h2" sx={{ fontWeight: 800 }}>
                        {wave.title}
                      </Typography>
                      <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                        {wave.goal}
                      </Typography>
                    </Box>

                    <Stack
                      direction="row"
                      alignItems="center"
                      gap={1}
                      sx={{ flexShrink: 0 }}
                    >
                      <Chip size="small" label={meta.label} color={meta.color} />
                      <Typography variant="caption" color="text.secondary">
                        {done}/{total} issues
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
                      gridTemplateColumns: {
                        xs: "1fr",
                        md: "repeat(2, 1fr)",
                      },
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
          })}
        </Stack>

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
