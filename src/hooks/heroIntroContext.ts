import { createContext, useContext } from "react";

export type HeroIntroPhase = "curtains" | "content" | "complete";

export type HeroIntroValue = {
  phase: HeroIntroPhase;
  /** A intro ainda está rodando (inclui a fase de conteúdo). */
  isIntro: boolean;
  /** A coreografia terminou e o header volta a obedecer ao scroll. */
  introComplete: boolean;
};

export const HeroIntroContext = createContext<HeroIntroValue>({
  phase: "complete",
  isIntro: false,
  introComplete: true,
});

export const useHeroIntro = () => useContext(HeroIntroContext);
