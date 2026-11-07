import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Snackbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { trackPortfolioEvents } from "../../services/analytics";

export type SnackbarSeverity = "success" | "error" | "warning" | "info";

export type NotifyOptions = {
  severity: SnackbarSeverity;
  title?: string;
  message: string;
  /** Origem da notificação, usada apenas para analytics (sem dados pessoais). */
  context?: string;
};

type SnackbarMessage = NotifyOptions & {
  id: number;
  context: string;
};

type SnackbarContextValue = {
  notify: (options: NotifyOptions) => void;
  close: () => void;
};

type State = {
  current: SnackbarMessage | null;
  pending: SnackbarMessage[];
  open: boolean;
};

type Action =
  | { type: "notify"; message: SnackbarMessage }
  | { type: "close" }
  | { type: "exited" };

const SnackbarContext = createContext<SnackbarContextValue | null>(null);

const MAX_QUEUE = 3;

const AUTO_HIDE_DURATION: Record<SnackbarSeverity, number> = {
  success: 4000,
  info: 5000,
  warning: 6000,
  error: 7000,
};

const isSameMessage = (a: NotifyOptions, b: NotifyOptions) =>
  a.severity === b.severity &&
  a.title === b.title &&
  a.message === b.message;

const initialState: State = { current: null, pending: [], open: false };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "notify": {
      // Dedup de mensagem idêntica consecutiva: a que está em exibição.
      if (state.current && isSameMessage(state.current, action.message)) {
        return state;
      }

      if (!state.current) {
        return { current: action.message, pending: state.pending, open: true };
      }

      const last = state.pending[state.pending.length - 1];
      if (last && isSameMessage(last, action.message)) return state;
      if (state.pending.length >= MAX_QUEUE - 1) return state;

      return { ...state, pending: [...state.pending, action.message] };
    }
    case "close":
      return state.open ? { ...state, open: false } : state;
    case "exited": {
      if (state.pending.length === 0) {
        return { current: null, pending: state.pending, open: false };
      }
      const [next, ...rest] = state.pending;
      return { current: next, pending: rest, open: true };
    }
    default:
      return state;
  }
};

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );

  const [state, dispatch] = useReducer(reducer, initialState);
  const { current, open } = state;
  const idRef = useRef(0);
  const trackedIdRef = useRef<number | null>(null);

  const notify = useCallback((options: NotifyOptions) => {
    const message: SnackbarMessage = {
      ...options,
      context: options.context ?? "global",
      id: ++idRef.current,
    };
    dispatch({ type: "notify", message });
  }, []);

  const close = useCallback(() => {
    dispatch({ type: "close" });
  }, []);

  const handleClose = useCallback((_event: unknown, reason?: string) => {
    // Clique fora não deve descartar a confirmação sem intenção.
    if (reason === "clickaway") return;
    dispatch({ type: "close" });
  }, []);

  const handleExited = useCallback(() => {
    dispatch({ type: "exited" });
  }, []);

  // Analytics: registra a exibição uma única vez por mensagem, sem dados pessoais.
  useEffect(() => {
    const { current: shown, open: isOpen } = state;
    if (!shown || !isOpen) return;
    if (trackedIdRef.current === shown.id) return;
    trackedIdRef.current = shown.id;
    trackPortfolioEvents.notificationShown(shown.severity, shown.context);
  }, [state]);

  // Escape fecha o snackbar mesmo quando o foco não está dentro dele.
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dispatch({ type: "close" });
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const value = useMemo<SnackbarContextValue>(
    () => ({ notify, close }),
    [notify, close],
  );

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar
        key={current?.id ?? "empty"}
        open={open}
        autoHideDuration={
          current ? AUTO_HIDE_DURATION[current.severity] : undefined
        }
        onClose={handleClose}
        slotProps={{ transition: { onExited: handleExited } }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: isMobile ? "center" : "right",
        }}
        transitionDuration={prefersReducedMotion ? 0 : undefined}
        data-testid="snackbar-host"
        sx={{
          "&.MuiSnackbar-root": {
            bottom: { xs: 16, sm: 24 },
            left: { xs: 16, sm: "auto" },
            right: { xs: 16, sm: 24 },
          },
        }}
      >
        {current ? (
          <Alert
            variant="filled"
            severity={current.severity}
            onClose={handleClose}
            closeText="Fechar"
            data-testid={`snackbar-${current.severity}`}
            sx={{
              width: "100%",
              alignItems: "center",
              boxShadow: 3,
            }}
          >
            {current.title ? (
              <AlertTitle sx={{ mb: 0.25 }}>{current.title}</AlertTitle>
            ) : null}
            <Box component="span">{current.message}</Box>
          </Alert>
        ) : undefined}
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextValue => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar deve ser usado dentro de SnackbarProvider");
  }
  return context;
};

export default SnackbarProvider;
