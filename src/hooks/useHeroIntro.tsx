import { useEffect, useMemo, useState, type ReactNode } from "react";
import { HeroIntroContext, type HeroIntroPhase } from "./heroIntroContext";
import { HERO_INTRO } from "./heroIntroTiming";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const prefersReducedMotionNow = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Controla a timeline da intro do hero.
 *
 * Na chegada, as cortinas seguram o wordmark "Lucas Nonato", abrem revelando
 * o retrato e o header entra junto da abertura. A coreografia roda no
 * carregamento, sem depender de scroll.
 */
export const HeroIntroProvider = ({ children }: { children: ReactNode }) => {
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState<HeroIntroPhase>(() =>
    prefersReducedMotionNow() ? "complete" : "curtains",
  );

  useEffect(() => {
    // `usePrefersReducedMotion` só conhece a preferência depois do primeiro
    // efeito. Ler o matchMedia aqui evita iniciar timers para quem pediu menos
    // movimento e vê a intro piscar por um frame.
    if (reduced) {
      setPhase("complete");
      return;
    }

    setPhase("curtains");

    const contentId = window.setTimeout(() => {
      setPhase("content");
    }, HERO_INTRO.CURTAINS_HOLD_MS);

    const completeId = window.setTimeout(() => {
      setPhase("complete");
    }, HERO_INTRO.TOTAL_MS);

    return () => {
      window.clearTimeout(contentId);
      window.clearTimeout(completeId);
    };
  }, [reduced]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-hero-intro", phase);

    return () => {
      root.removeAttribute("data-hero-intro");
    };
  }, [phase]);

  const value = useMemo(
    () => ({
      phase,
      isIntro: phase !== "complete",
      introComplete: phase === "complete",
    }),
    [phase],
  );

  return (
    <HeroIntroContext.Provider value={value}>
      {children}
    </HeroIntroContext.Provider>
  );
};
