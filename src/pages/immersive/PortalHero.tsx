import { useRef } from "react";
import { heroMeta, portraitImage, wordmark } from "./content";
import { useStickyProgress } from "../../hooks/useStickyProgress";
import { GlassPanel } from "./ui";
import styles from "./immersive.module.scss";


const PortalHero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useStickyProgress(heroRef, stageRef);

  return (
    <section
      id="immersive-hero"
      ref={heroRef}
      className={styles.hero}
      aria-labelledby="immersive-title"
      data-testid="immersive-hero"
    >
      <div
        ref={stageRef}
        className={styles.heroStage}
        data-testid="immersive-hero-stage"
      >
        <div className={styles.heroPhoto}>
          <img
            className={styles.heroImage}
            src={portraitImage}
            alt="Retrato de Lucas Nonato com fundo roxo."
            data-testid="immersive-hero-image"
          />
          <div className={styles.heroTint} aria-hidden="true" />
          <div className={styles.heroVignette} aria-hidden="true" />
        </div>

        <div
          className={`${styles.panel} ${styles.panelLeft}`}
          aria-hidden="true"
          data-testid="immersive-panel-left"
        >
          <span className={styles.panelLabel}>Portfólio</span>
          <span className={styles.panelTick} />
        </div>

        <div
          className={`${styles.panel} ${styles.panelRight}`}
          aria-hidden="true"
          data-testid="immersive-panel-right"
        >
          <span className={styles.panelLabel}>2026</span>
          <span className={styles.panelTick} />
        </div>

        <span
          className={`${styles.accentDot} ${styles.dotAmber}`}
          aria-hidden="true"
        />
        <span
          className={`${styles.accentDot} ${styles.dotEmerald}`}
          aria-hidden="true"
        />

        <h1
          id="immersive-title"
          className={styles.wordmark}
          aria-label={`${wordmark.left} ${wordmark.right}`}
          data-testid="immersive-wordmark"
        >
          <span className={styles.wordFirst} aria-hidden="true">
            {wordmark.left}
          </span>
          <span className={styles.wordSecond} aria-hidden="true">
            {wordmark.right}
          </span>
        </h1>

        <GlassPanel
          className={styles.metaTopLeft}
          data-testid="immersive-hero-meta"
        >
          <span className={styles.metaDot} aria-hidden="true" />
          <span className={styles.metaLabel}>{heroMeta.topLeft.label}</span>
          <span className={styles.metaValue}>{heroMeta.topLeft.value}</span>
        </GlassPanel>

        <GlassPanel className={styles.metaTopRight}>
          <span className={styles.metaLabel}>{heroMeta.topRight.label}</span>
          <span className={styles.metaValue}>{heroMeta.topRight.value}</span>
        </GlassPanel>

        <GlassPanel className={styles.metaBottomLeft}>
          <span className={styles.metaLabel}>{heroMeta.bottomLeft.label}</span>
          <span className={styles.metaValue}>{heroMeta.bottomLeft.value}</span>
        </GlassPanel>

        <GlassPanel className={styles.metaBottomRight}>
          <span className={styles.metaLabel}>{heroMeta.bottomRight.label}</span>
          <span className={styles.metaValue}>{heroMeta.bottomRight.value}</span>
        </GlassPanel>

        <div className={styles.scrollCue} aria-hidden="true">
          <span className={styles.scrollCueLine} />
          <span className={styles.scrollCueLabel}>Scroll para abrir</span>
        </div>
      </div>
    </section>
  );
};

export default PortalHero;
