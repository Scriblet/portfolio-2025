import { SOCIAL_LINKS } from "../../data";
import { siGithub } from "simple-icons";
import { GlassPanel, PillButton, SectionLabel } from "../../components/design-system";
import { trackPortfolioEvents } from "../../services/analytics";
import styles from "../pages.module.scss";

const sectionContent = {
  label: "GitHub",
  index: "07",
  heading: "Código aberto e projetos reais",
  description:
    "Se você gosta de analisar código, recomendo dar uma olhada no meu GitHub. É por lá que hospedo grande parte dos meus projetos e experimentos.",
};

const GithubBanner = () => (
  <section
    className={styles.voidSection}
    aria-labelledby="github-title"
    data-testid="github-section"
  >
    <GlassPanel tone="dark" className={styles.githubPanel}>
      <div>
        <SectionLabel tone="dark">
          {sectionContent.label} / {sectionContent.index}
        </SectionLabel>
        <h2
          id="github-title"
          className={styles.githubTitle}
          data-reveal
        >
          {sectionContent.heading}
        </h2>
        <p className={styles.githubBody} data-reveal>
          {sectionContent.description}
        </p>
        <div data-reveal>
          <PillButton
            href={SOCIAL_LINKS.GITHUB}
            external
            variant="ghost-dark"
            testId="github-link"
          >
            Siga-me no GitHub
          </PillButton>
        </div>
      </div>

      <a
        href={SOCIAL_LINKS.GITHUB}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir perfil no GitHub"
        onClick={() => trackPortfolioEvents.socialLinkClick("github")}
      >
        <svg
          viewBox="0 0 24 24"
          className={styles.githubLogo}
          aria-hidden="true"
          focusable="false"
        >
          <path d={siGithub.path} fill="currentColor" />
        </svg>
      </a>
    </GlassPanel>
  </section>
);

export default GithubBanner;
