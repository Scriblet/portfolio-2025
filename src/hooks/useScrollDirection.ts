import { useEffect, useRef, useState } from "react";

export interface ScrollDirectionState {
  /** O header deve estar escondido (rolagem para baixo). */
  hidden: boolean;
  /** O scroll está no topo (ou dentro da zona de topo). */
  atTop: boolean;
}

/** Abaixo disso o header nunca se esconde e volta a aparecer. */
const TOP_ZONE = 80;

/**
 * Decide se o header deve se esconder a partir da direção e da posição do scroll.
 *
 * - desce (delta > threshold) e scrollY > 80 => esconde
 * - sobe (delta < -threshold) ou scrollY <= 80 => mostra
 * - deltas menores que o threshold não trocam o estado, mas acumulam, então
 *   micro-scrolls não fazem o header piscar.
 *
 * O listener é passivo e o cálculo é agendado em requestAnimationFrame,
 * garantindo no máximo uma atualização de estado por frame.
 */
export function useScrollDirection(threshold = 10): ScrollDirectionState {
  const [state, setState] = useState<ScrollDirectionState>({
    hidden: false,
    atTop: true,
  });

  const lastYRef = useRef(0);
  const hiddenRef = useRef(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    lastYRef.current = Math.max(window.scrollY, 0);
    hiddenRef.current = false;

    const apply = (hidden: boolean, atTop: boolean) => {
      setState((prev) =>
        prev.hidden === hidden && prev.atTop === atTop
          ? prev
          : { hidden, atTop },
      );
    };

    const update = () => {
      frameRef.current = null;

      // Math.max protege contra o rubber-band do iOS (scrollY negativo).
      const y = Math.max(window.scrollY, 0);
      const delta = y - lastYRef.current;
      const atTop = y <= TOP_ZONE;

      if (atTop) {
        lastYRef.current = y;
        hiddenRef.current = false;
        apply(false, true);
        return;
      }

      if (Math.abs(delta) < threshold) {
        // Micro-scroll: mantém o estado, mas não descarta o acumulado
        // (lastYRef só avança quando o limiar é cruzado).
        apply(hiddenRef.current, false);
        return;
      }

      lastYRef.current = y;
      hiddenRef.current = delta > 0;
      apply(hiddenRef.current, false);
    };

    const onScroll = () => {
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(update);
      }
    };

    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [threshold]);

  return state;
}

export default useScrollDirection;
