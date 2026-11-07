import { Component, type ErrorInfo, type ReactNode } from "react";
import { Box, Button, Typography } from "@mui/material";

type LazySectionErrorBoundaryProps = {
  children: ReactNode;
};

type LazySectionErrorBoundaryState = {
  hasError: boolean;
};

/**
 * Error boundary para seções carregadas via React.lazy. Se o download do
 * chunk falhar (CDN fora do ar, cache corrompido, deploy no meio do acesso),
 * o visitante continua com o resto da página e recebe um caminho de retry.
 *
 * Error boundaries ainda precisam ser class components.
 */
export default class LazySectionErrorBoundary extends Component<
  LazySectionErrorBoundaryProps,
  LazySectionErrorBoundaryState
> {
  state: LazySectionErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): LazySectionErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Falha ao carregar seção lazy:", error, errorInfo);
  }

  handleRetry = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          role="alert"
          data-testid="section-error"
          sx={{
            width: "100%",
            minHeight: "30vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            px: 2,
            py: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="body1" component="p">
            Não foi possível carregar esta seção
          </Typography>
          <Button variant="outlined" onClick={this.handleRetry}>
            Tentar novamente
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}
