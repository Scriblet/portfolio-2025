import { createContext, useContext } from "react";
import type { ColorMode } from "./palettes";

export type ColorModeContextValue = {
  mode: ColorMode;
  setMode: (mode: ColorMode) => void;
  toggleMode: () => void;
};

export const ColorModeContext = createContext<ColorModeContextValue | null>(
  null,
);

export const useColorMode = (): ColorModeContextValue => {
  const context = useContext(ColorModeContext);

  if (!context) {
    throw new Error(
      "useColorMode deve ser usado dentro de um ColorModeProvider.",
    );
  }

  return context;
};
