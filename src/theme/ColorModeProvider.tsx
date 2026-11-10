import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { ColorModeContext, type ColorModeContextValue } from "./ColorModeContext";
import {
  applyColorModeToDocument,
  getInitialColorMode,
  persistColorMode,
} from "./colorMode";
import type { ColorMode } from "./palettes";

type ColorModeProviderProps = {
  children: ReactNode;
  /** Útil em testes; em produção a preferência é lida do ambiente. */
  initialMode?: ColorMode;
};

export const ColorModeProvider = ({
  children,
  initialMode,
}: ColorModeProviderProps) => {
  const [mode, setModeState] = useState<ColorMode>(
    () => initialMode ?? getInitialColorMode(),
  );

  // Mantém o documento sincronizado já no primeiro render e a cada troca.
  useEffect(() => {
    applyColorModeToDocument(mode);
  }, [mode]);

  const setMode = useCallback((next: ColorMode) => {
    setModeState(next);
    persistColorMode(next);
  }, []);

  const toggleMode = useCallback(() => {
    const next: ColorMode = mode === "dark" ? "light" : "dark";
    setModeState(next);
    persistColorMode(next);
  }, [mode]);

  const value = useMemo<ColorModeContextValue>(
    () => ({ mode, setMode, toggleMode }),
    [mode, setMode, toggleMode],
  );

  return (
    <ColorModeContext.Provider value={value}>
      {children}
    </ColorModeContext.Provider>
  );
};

export default ColorModeProvider;
