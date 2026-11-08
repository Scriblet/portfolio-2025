import { Alert, Box, Button } from "@mui/material";
import { useOnlineStatus } from "../../hooks/useOnlineStatus";

/**
 * Aviso discreto e acessível quando o navegador está offline.
 *
 * O shell da SPA já fica em cache pelo service worker; este aviso explica por
 * que uma ação de rede (como enviar o formulário) pode falhar. Não usa
 * animação, então respeita `prefers-reduced-motion` por construção.
 */
const OfflineNotice = () => {
  const online = useOnlineStatus();

  if (online) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "fixed",
        left: "50%",
        bottom: { xs: 16, md: 24 },
        transform: "translateX(-50%)",
        width: "min(92vw, 560px)",
        zIndex: 2000,
      }}
    >
      <Alert
        severity="warning"
        role="status"
        aria-live="polite"
        data-testid="offline-notice"
        action={
          <Button
            color="inherit"
            size="small"
            onClick={() => window.location.reload()}
          >
            Tentar novamente
          </Button>
        }
      >
        Você está offline. O conteúdo em cache continua disponível.
      </Alert>
    </Box>
  );
};

export default OfflineNotice;
