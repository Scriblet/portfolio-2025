import { useEffect } from "react";
import type { RefObject } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

/**
 * Progresso de abertura do portal (0 → 1) escrito como custom property `--p`
 * no palco sticky. Sem estado React: o scroll só atualiza uma variável CSS e
 * o navegador interpola o resto na camada de composição.
 *
 * `reducedProgress` define o quadro exibido quando o usuário pede movimento
 * reduzido. No hero principal usamos 1 para nunca esconder o conteúdo atrás
 * das cortinas; na prévia imersiva 0.64 preserva a composição do portal.
 */
export const useStickyProgress = (
  heroRef: RefObject<HTMLElement | null>,
  stageRef: RefObject<HTMLElement | null>,
  reducedProgress = 0.64,
) => {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const hero = heroRef.current;
    const stage = stageRef.current;
    if (!hero || !stage) return;

    if (reduced) {
      stage.style.setProperty("--p", String(reducedProgress));
      return;
    }

    let frame = 0;

    const apply = () => {
      frame = 0;
      const distance = hero.offsetHeight - window.innerHeight;
      const progress =
        distance <= 0
          ? 1
          : clamp(-hero.getBoundingClientRect().top / distance, 0, 1);
      stage.style.setProperty("--p", progress.toFixed(4));
    };

    const request = () => {
      if (!frame) frame = window.requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, [heroRef, stageRef, reduced, reducedProgress]);
};
