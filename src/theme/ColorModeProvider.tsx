import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  COLOR_MODE_STORAGE_KEY,
  THEME_COLOR_META,
  isColorMode,
  type ColorMode,
} from "./palettes";

type ColorModeContextValue = {
  mode: ColorMode;
  setMode: (mode: ColorMode) => void;
  toggleMode: () => void;
};

const ColorModeContext = createContext<ColorModeContextValue | null>(null);

/** Lê a escolha salva; qualquer falha de storage vira "sem preferência". */
export const readStoredColorMode = (): ColorMode | null => {
  if (typeof window === "undefined") return null;

  try {
    const stored = window.localStorage.getItem(COLOR_MODE_STORAGE_KEY);
    return isColorMode(stored) ? stored : null;
  } catch {
    // Storage indisponível (modo privado, política do navegador etc.).
    return null;
  }
};

/** Lê prefers-color-scheme; retorna null quando não há sinal do sistema. */
export const getSystemColorMode = (): ColorMode | null => {
  if (
    typeof window === "undefined" ||
    typeof window.matchMedia !== "function"
  ) {
    return null;
  }

  try {
    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      return "light";
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
  } catch {
    // matchMedia pode lançar em ambientes muito restritos.
  }

  return null;
};

/** Prioridade: localStorage válido → prefers-color-scheme → escuro. */
export const getInitialColorMode = (): ColorMode =>
  readStoredColorMode() ?? getSystemColorMode() ?? "dark";

const applyColorModeToDocument = (mode: ColorMode) => {
  if (typeof document === "undefined") return;

  // Usado pelo navegador para scrollbars/controles nativos e pelo teste E2E.
  document.documentElement.style.colorScheme = mode;
  document.documentElement.setAttribute("data-mui-color-scheme", mode);

  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (themeColorMeta) {
    themeColorMeta.setAttribute("content", THEME_COLOR_META[mode]);
  }
};

const persistColorMode = (mode: ColorMode) => {
  try {
    window.localStorage.setItem(COLOR_MODE_STORAGE_KEY, mode);
  } catch {
    // Falha silenciosa: a preferência continua válida só nesta sessão.
  }
};

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

export const useColorMode = (): ColorModeContextValue => {
  const context = useContext(ColorModeContext);

  if (!context) {
    throw new Error(
      "useColorMode deve ser usado dentro de um ColorModeProvider.",
    );
  }

  return context;
};

export default ColorModeProvider;
