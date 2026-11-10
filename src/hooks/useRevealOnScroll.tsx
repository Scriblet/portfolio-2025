import { useLayoutEffect, useRef } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Revela `[data-reveal]` uma única vez ao entrar na viewport.
 *
 * O atributo `data-motion="ready"` só é adicionado quando o JS confirma que
 * movimento é permitido. Sem JS (ou com movimento reduzido) o conteúdo nunca
 * fica escondido.
 */
export const useRevealOnScroll = () => {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || reduced || typeof IntersectionObserver === "undefined") {
      return;
    }

    root.dataset.motion = "ready";

    const observed = new WeakSet<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.revealed = "true";
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    // As seções são lazy-loaded: precisamos observar nós que entram depois.
    const observeAll = () => {
      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((item) => {
        if (observed.has(item)) return;
        observed.add(item);
        observer.observe(item);
      });
    };

    observeAll();

    const mutations = new MutationObserver(observeAll);
    mutations.observe(root, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
      delete root.dataset.motion;
    };
  }, [reduced]);

  return rootRef;
};
