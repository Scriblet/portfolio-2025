import { heroMeta, portraitImage, wordmark } from "./content";
import { ResponsivePicture } from "../../components/ResponsivePicture";
import { useColorMode } from "../../theme/ColorModeContext";
import { GlassPanel } from "./ui";
import styles from "./immersive.module.scss";

/**
 * Hero "clean" — adapta ao tema do usuário.
 *
 * No dark mode mantém a atmosfera escura do portal; no light mode vira uma
 * versão clara, sem o efeito scroll-driven de abertura. Os metadados usam o
 * tom de vidro correspondente ao modo ativo.
 */
const CleanHero = () => {
  const { mode } = useColorMode();
  const isLight = mode === "light";

  return (
    <section
      id="immersive-hero"
      className={`${styles.heroClean} ${isLight ? styles.heroCleanLight : ""}`}
      aria-labelledby="immersive-title"
      data-testid="immersive-hero"
    >
      <div className={styles.heroCleanPhoto} aria-hidden="true">
        <ResponsivePicture
          {...portraitImage}
          className={styles.heroCleanImage}
          alt=""
          loading="eager"
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
          tone={isLight ? "light" : "dark"}
          data-testid="immersive-hero-meta"
        >
          <span className={styles.heroCleanMetaDot} aria-hidden="true" />
          <span className={styles.heroCleanMetaLabel}>{heroMeta.topLeft.label}</span>
          <span className={styles.heroCleanMetaValue}>{heroMeta.topLeft.value}</span>
        </GlassPanel>

        <GlassPanel
          className={styles.heroCleanMetaTopRight}
          tone={isLight ? "light" : "dark"}
        >
          <span className={styles.heroCleanMetaLabel}>{heroMeta.topRight.label}</span>
          <span className={styles.heroCleanMetaValue}>{heroMeta.topRight.value}</span>
        </GlassPanel>

        <GlassPanel
          className={styles.heroCleanMetaBottomLeft}
          tone={isLight ? "light" : "dark"}
        >
          <span className={styles.heroCleanMetaLabel}>{heroMeta.bottomLeft.label}</span>
          <span className={styles.heroCleanMetaValue}>{heroMeta.bottomLeft.value}</span>
        </GlassPanel>

        <GlassPanel
          className={styles.heroCleanMetaBottomRight}
          tone={isLight ? "light" : "dark"}
        >
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
};

export default CleanHero;
