import { heroMeta, portraitImage, wordmark } from "./content";
import { GlassPanel } from "./ui";
import styles from "./immersive.module.scss";

/**
 * Hero "clean" — versão imutável ao tema.
 *
 * Mantém a atmosfera escura do portal, mas sem o efeito scroll-driven de
 * abertura. Todas as cores são fixas, então a hero permanece preta mesmo
 * quando o ColorModeProvider alterna para o tema claro do resto do app.
 */
const CleanHero = () => (
  <section
    id="immersive-hero"
    className={styles.heroClean}
    aria-labelledby="immersive-title"
    data-testid="immersive-hero"
  >
    <div className={styles.heroCleanPhoto} aria-hidden="true">
      <img
        className={styles.heroCleanImage}
        src={portraitImage}
        alt=""
      />
      <div className={styles.heroCleanTint} />
      <div className={styles.heroCleanVignette} />
    </div>

    <div className={styles.heroCleanStage}>
      <h1
        id="immersive-title"
        className={styles.heroCleanWordmark}
        aria-label={`${wordmark.left} ${wordmark.right}`}
        data-testid="immersive-wordmark"
      >
        <span className={styles.heroCleanWordFirst} aria-hidden="true">
          {wordmark.left}
        </span>
        <span className={styles.heroCleanWordSecond} aria-hidden="true">
          {wordmark.right}
        </span>
      </h1>

      <GlassPanel
        className={styles.heroCleanMetaTopLeft}
        data-testid="immersive-hero-meta"
      >
        <span className={styles.heroCleanMetaDot} aria-hidden="true" />
        <span className={styles.heroCleanMetaLabel}>{heroMeta.topLeft.label}</span>
        <span className={styles.heroCleanMetaValue}>{heroMeta.topLeft.value}</span>
      </GlassPanel>

      <GlassPanel className={styles.heroCleanMetaTopRight}>
        <span className={styles.heroCleanMetaLabel}>{heroMeta.topRight.label}</span>
        <span className={styles.heroCleanMetaValue}>{heroMeta.topRight.value}</span>
      </GlassPanel>

      <GlassPanel className={styles.heroCleanMetaBottomLeft}>
        <span className={styles.heroCleanMetaLabel}>{heroMeta.bottomLeft.label}</span>
        <span className={styles.heroCleanMetaValue}>{heroMeta.bottomLeft.value}</span>
      </GlassPanel>

      <GlassPanel className={styles.heroCleanMetaBottomRight}>
        <span className={styles.heroCleanMetaLabel}>{heroMeta.bottomRight.label}</span>
        <span className={styles.heroCleanMetaValue}>{heroMeta.bottomRight.value}</span>
      </GlassPanel>

      <div className={styles.heroCleanScrollCue} aria-hidden="true">
        <span className={styles.heroCleanScrollCueLine} />
        <span className={styles.heroCleanScrollCueLabel}>Scroll para explorar</span>
      </div>
    </div>
  </section>
);

export default CleanHero;
