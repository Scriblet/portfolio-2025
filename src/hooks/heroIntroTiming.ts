/**
 * Timeline da intro do hero.
 *
 * A coreografia inteira roda no carregamento, sem depender de scroll. Estes
 * valores são a fonte de verdade para o estado em React; as durações de cada
 * camada ficam nos keyframes de `presentation.module.scss` e no header.
 */
export const HERO_INTRO = {
  /** Tempo com as cortinas fechadas e o wordmark em destaque. */
  CURTAINS_HOLD_MS: 1200,
  /** Duração total até liberar o header para o comportamento de scroll. */
  TOTAL_MS: 2200,
  /** Entrada do header, alinhada à abertura das cortinas e da foto. */
  HEADER_ENTER_MS: 700,
} as const;
