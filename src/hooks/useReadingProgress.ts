import { useEffect, useState } from "react";

/**
 * Progresso de leitura da página, normalizado em 0..1.
 *
 * `scrollY / (scrollHeight - innerHeight)`, com clamp em 0..1:
 * - documento sem altura rolável (ou ainda carregando) => 0
 * - overscroll do iOS (scrollY negativo) => 0
 * - scroll além do fim => 1
 *
 * Listener de scroll/resize passivo, cálculo agendado em requestAnimationFrame.
 */
export function useReadingProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame: number | null = null;

    const update = () => {
      frame = null;

      const doc = document.documentElement;
      const scrollTop = Math.max(window.scrollY || doc.scrollTop || 0, 0);
      const scrollable = doc.scrollHeight - window.innerHeight;

      if (!Number.isFinite(scrollable) || scrollable <= 0) {
        setProgress(0);
        return;
      }

      const next = scrollTop / scrollable;
      setProgress(Math.min(1, Math.max(0, next)));
    };

    const schedule = () => {
      if (frame === null) {
        frame = window.requestAnimationFrame(update);
      }
    };

    update();

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
        frame = null;
      }
    };
  }, []);

  return progress;
}

export default useReadingProgress;
