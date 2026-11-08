import ImgPresentation from "../img/presetation.jpg";
import { SITE_CONFIG } from "../data";
import { GlassPanel, PillButton } from "../components/design-system";
import DownloadCvButton from "../components/DownloadCvButton";
import styles from "./presentation.module.scss";

const heroMeta = {
  topRight: { label: "Base", value: SITE_CONFIG.LOCATION },
  bottomLeft: { label: "Stack principal", value: SITE_CONFIG.STACK_LABEL },
};

function Presentation() {
  return (
    <section
      className={styles.hero}
      aria-labelledby="presentation-title"
      data-testid="presentation-section"
    >
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <p className={styles.heroLabel} data-reveal>
            Portfólio / 2026
          </p>

          <h1
            id="presentation-title"
            className={styles.heroTitle}
            data-testid="presentation-name"
            data-reveal
          >
            {SITE_CONFIG.AUTHOR}
            <span className={styles.heroTitleAccent}>
              {SITE_CONFIG.ROLE}
            </span>
          </h1>

          <p className={styles.heroRole} data-reveal data-testid="presentation-role">
            {SITE_CONFIG.TAGLINE}.
          </p>

          <div className={styles.heroActions} data-reveal>
            <PillButton href="#contact" testId="presentation-cta-contact">
              Vamos conversar
            </PillButton>
            <DownloadCvButton location="presentation" align="left" />
          </div>
        </div>

        <div className={styles.heroVisual} data-reveal>
          <div className={styles.heroImageWrap}>
            <img
              src={ImgPresentation}
              alt="Lucas Nonato. Jovem com cabelo cacheado volumoso e bigode sorri amplamente para a câmera. Ele usa uma camisa preta e uma alça transversal é visível em seu ombro. O fundo tem uma parede decorada com grafites coloridos em tons de roxo, verde e vermelho, com letras estilizadas."
              className={styles.heroImage}
              fetchPriority="high"
              decoding="async"
              data-testid="presentation-image"
            />
            <span className={styles.heroImageOverlay} aria-hidden="true" />
            <span className={styles.heroImageVignette} aria-hidden="true" />
          </div>

          <GlassPanel className={styles.heroMetaTop}>
            <span className={styles.metaLabel}>{heroMeta.topRight.label}</span>
            <span className={styles.metaValue}>{heroMeta.topRight.value}</span>
          </GlassPanel>

          <GlassPanel className={styles.heroMeta}>
            <span className={styles.metaDot} aria-hidden="true" />
            <span className={styles.metaLabel}>{heroMeta.bottomLeft.label}</span>
            <span className={styles.metaValue}>{heroMeta.bottomLeft.value}</span>
          </GlassPanel>
        </div>
      </div>

      <div className={styles.scrollCue} aria-hidden="true">
        <span className={styles.scrollCueLine} />
        <span className={styles.scrollCueLabel}>Scroll para explorar</span>
      </div>
    </section>
  );
}

export default Presentation;
