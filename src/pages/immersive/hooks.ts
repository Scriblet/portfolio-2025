import { useEffect, useLayoutEffect, useState } from "react";
import type { RefObject } from "react";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

/** Lê `prefers-reduced-motion` de forma reativa. */
export const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(query.matches);

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
};

/**
 * Progresso do portal (0 → 1) escrito como custom property `--p` no palco
 * sticky. Sem estado React: o scroll só atualiza uma variável CSS, e o
 * navegador interpola o resto na camada de composição.
 */
export const useStickyProgress = (
  heroRef: RefObject<HTMLElement | null>,
  stageRef: RefObject<HTMLElement | null>,
) => {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const hero = heroRef.current;
    const stage = stageRef.current;
    if (!hero || !stage) return;

    if (reduced) {
      stage.style.setProperty("--p", "0.64");
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
  }, [heroRef, stageRef, reduced]);
};

/**
 * Progresso de uma seção através da viewport, escrito como `--q`.
 * Usado no elemento circular da declaração (deriva + rotação).
 */
export const useViewportProgress = (ref: RefObject<HTMLElement | null>) => {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (reduced) {
      element.style.setProperty("--q", "0.5");
      return;
    }

    let frame = 0;

    const apply = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const total = window.innerHeight + rect.height;
      const progress = clamp((window.innerHeight - rect.top) / total, 0, 1);
      element.style.setProperty("--q", progress.toFixed(4));
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
  }, [ref, reduced]);
};

/**
 * Revela `[data-reveal]` uma única vez ao entrar na viewport.
 *
 * O atributo `data-motion="ready"` só é adicionado quando o JS confirma que
 * movimento é permitido. Sem JS (ou com movimento reduzido) o conteúdo nunca
 * fica escondido.
 */
export const useRevealOnScroll = (rootRef: RefObject<HTMLElement | null>) => {
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || reduced || typeof IntersectionObserver === "undefined") {
      return;
    }

    root.dataset.motion = "ready";
    const items = Array.from(
      root.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    const reveal = (item: HTMLElement) => {
      item.dataset.revealed = "true";
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    items.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
      delete root.dataset.motion;
    };
  }, [rootRef, reduced]);
};
