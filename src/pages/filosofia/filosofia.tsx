import philosophyImage from "../../img/multiracial-hands-coming-together.jpg";
import {
  GlassPanel,
  Hairline,
  SectionLabel,
} from "../../components/design-system";
import styles from "../pages.module.scss";

const sectionContent = {
  label: "Filosofia",
  index: "04",
  statement: [
    "Construo interfaces acessíveis onde ",
    "design e engenharia ",
    "são a mesma decisão.",
  ] as const,
  highlightIndex: 1,
  body: [
    "Minha prática une código limpo, arquitetura enxuta e atenção às pessoas que usam o produto. Acredito que acessibilidade e performance não são itens de backlog — são qualidade.",
    "Cada decisão técnica deve resolver um problema real e escalar sem perder a alma da experiência.",
  ] as const,
};

const PhilosophyBanner = () => (
  <section
    className={`${styles.philosophySection} ${styles.void2Section}`}
    aria-labelledby="filosofia-title"
    data-testid="filosofia-section"
  >
    <div className={styles.philosophyGrid}>
      <div>
        <SectionLabel tone="dark">
          {sectionContent.label} / {sectionContent.index}
        </SectionLabel>

        <h2
          id="filosofia-title"
          className={styles.philosophyStatement}
          data-reveal
        >
          {sectionContent.statement.map((text, index) =>
            index === sectionContent.highlightIndex ? (
              <em key={index} className={styles.philosophyHighlight}>
                {text}
              </em>
            ) : (
              <span key={index}>{text}</span>
            ),
          )}
        </h2>

        <Hairline tone="dark" className={styles.philosophyRule} />

        {sectionContent.body.map((paragraph, index) => (
          <p key={index} className={styles.philosophyBody} data-reveal>
            {paragraph}
          </p>
        ))}
      </div>

      <GlassPanel tone="dark" className={styles.philosophyImageWrap}>
        <img
          src={philosophyImage}
          alt="Várias mãos de diferentes tons de pele se unindo no centro em gesto de colaboração e inclusão."
          className={styles.philosophyImage}
          loading="lazy"
          decoding="async"
        />
        <span className={styles.philosophyImageOverlay} aria-hidden="true" />
      </GlassPanel>
    </div>
  </section>
);

export default PhilosophyBanner;
