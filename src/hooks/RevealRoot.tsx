import type { ReactNode } from "react";
import { useRevealOnScroll } from "./useRevealOnScroll";

/**
 * Wrapper que aplica o reveal em todos os filhos com `[data-reveal]`.
 */
export const RevealRoot = ({ children }: { children: ReactNode }) => {
  const ref = useRevealOnScroll();
  return (
    <div ref={ref} className="ds-reveal-root">
      {children}
    </div>
  );
};
