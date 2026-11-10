import { portraitHero } from "../img/responsive";
import { ResponsivePicture } from "../components/ResponsivePicture";
import { SITE_CONFIG } from "../data";
import { GlassPanel, PillButton } from "../components/design-system";
import DownloadCvButton from "../components/DownloadCvButton";
import { useHeroIntro } from "../hooks/heroIntroContext";
import styles from "./presentation.module.scss";

const heroMeta = {
  topRight: { label: "Base", value: SITE_CONFIG.LOCATION },
  bottomRight: { label: "Stack principal", value: SITE_CONFIG.STACK_LABEL },
};

const [firstName, ...restName] = SITE_CONFIG.AUTHOR.split(" ");
const lastName = restName.join(" ");

function Presentation() {
  const { phase, isIntro } = useHeroIntro();

  return (
    <section
      className={styles.hero}
      aria-labelledby="presentation-title"
      data-testid="presentation-section"
      data-intro={isIntro ? "true" : undefined}
      data-intro-phase={phase}
    >
      <div className={styles.heroStage} data-testid="presentation-stage">
        <div className={styles.heroPhoto} aria-hidden="true">
          <ResponsivePicture
            {...portraitHero}
            alt=""
            className={styles.heroImage}
            loading="eager"
            fetchPriority="high"
            testId="presentation-image"
          />
        </div>
        <span className={styles.heroTint} aria-hidden="true" />
        <span className={styles.heroVignette} aria-hidden="true" />

        <div
          className={`${styles.panel} ${styles.panelLeft}`}
          aria-hidden="true"
        >
          <span className={styles.panelLabel}>Portfólio</span>
          <span className={styles.panelTick} />
        </div>
        <div
          className={`${styles.panel} ${styles.panelRight}`}
          aria-hidden="true"
        >
          <span className={styles.panelLabel}>2026</span>
          <span className={styles.panelTick} />
        </div>

        <div className={styles.heroCopy}>
          <p className={styles.heroLabel}>Portfólio / 2026</p>

          <h1
            id="presentation-title"
            className={styles.heroTitle}
            data-testid="presentation-name"
          >
            {SITE_CONFIG.AUTHOR}
            <span className={styles.heroTitleAccent}>
              {SITE_CONFIG.ROLE}
            </span>
          </h1>

          <p className={styles.heroRole} data-testid="presentation-role">
            {SITE_CONFIG.TAGLINE}.
          </p>

          <div className={styles.heroActions}>
            <PillButton href="#contact" testId="presentation-cta-contact">
              Vamos conversar
            </PillButton>
            <DownloadCvButton location="presentation" align="center" onDark />
          </div>
        </div>

        <GlassPanel tone="dark" className={styles.heroMetaTop}>
          <span className={styles.metaLabel}>{heroMeta.topRight.label}</span>
          <span className={styles.metaValue}>{heroMeta.topRight.value}</span>
        </GlassPanel>

        <GlassPanel tone="dark" className={styles.heroMetaBottom}>
          <span className={styles.metaDot} aria-hidden="true" />
          <span className={styles.metaLabel}>{heroMeta.bottomRight.label}</span>
          <span className={styles.metaValue}>{heroMeta.bottomRight.value}</span>
        </GlassPanel>

        <div
          className={styles.wordmark}
          aria-hidden="true"
          data-testid="presentation-wordmark"
        >
          <span className={styles.wordFirst}>{firstName}</span>
          <span className={styles.wordSecond}>{lastName}</span>
        </div>

        <div className={styles.scrollCue} aria-hidden="true">
          <span className={styles.scrollCueLine} />
          <span className={styles.scrollCueLabel}>Scroll para explorar</span>
        </div>
      </div>
    </section>
  );
}

export default Presentation;
