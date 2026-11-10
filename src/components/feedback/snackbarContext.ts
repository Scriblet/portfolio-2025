import { createContext, useContext } from "react";

export type SnackbarSeverity = "success" | "error" | "warning" | "info";

export type NotifyOptions = {
  severity: SnackbarSeverity;
  title?: string;
  message: string;
  /** Origem da notificação, usada apenas para analytics (sem dados pessoais). */
  context?: string;
};

export type SnackbarContextValue = {
  notify: (options: NotifyOptions) => void;
  close: () => void;
};

export const SnackbarContext = createContext<SnackbarContextValue | null>(null);

export const useSnackbar = (): SnackbarContextValue => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar deve ser usado dentro de SnackbarProvider");
  }
  return context;
};
