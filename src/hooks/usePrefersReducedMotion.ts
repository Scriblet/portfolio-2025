import { useEffect, useState } from "react";

/**
 * Lê `prefers-reduced-motion` de forma reativa.
 *
 * SSR-safe: retorna `false` até montar no cliente.
 */
export const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(query.matches);

    setReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
};
