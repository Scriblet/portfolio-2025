import { ResponsivePicture } from "../../components/ResponsivePicture";
import { SectionLabel } from "../../components/design-system";
import { principles } from "../../data/principles";
import { philosophyHands } from "../../img/responsive";
import styles from "../pages.module.scss";

const sectionContent = {
  label: "Princípios",
  index: "03",
  eyebrow: "Como eu construo",
  lead: "Sete regras que eu uso para decidir, não para decorar.",
  close: "Os cases abaixo são o teste dessas regras.",
};

/**
 * Seção #manifesto: absorve a antiga Filosofia.
 *
 * A tese é o próprio `h2` (não um título genérico); "Como eu construo" vira
 * eyebrow. A foto das mãos entra como faixa full-bleed entre a abertura e os
 * sete princípios.
 */
const Manifesto = () => (
  <section
    id="manifesto"
    className={`${styles.manifestoSection} ${styles.void2Section}`}
    aria-labelledby="manifesto-title"
    data-testid="manifesto-section"
  >
    <div className={styles.manifestoInner}>
      <header className={styles.manifestoHead}>
        <SectionLabel tone="dark">
          {sectionContent.label} / {sectionContent.index}
        </SectionLabel>
        <p className={styles.manifestoEyebrow} data-reveal>
          {sectionContent.eyebrow}
        </p>
        <h2
          id="manifesto-title"
          className={styles.manifestoStatement}
          data-testid="manifesto-statement"
          data-reveal
        >
          Construo software e interfaces acessíveis onde{" "}
          <em className={styles.manifestoAccent}>design e engenharia</em> são a
          mesma decisão.
        </h2>
        <p className={styles.manifestoLead} data-reveal>
          {sectionContent.lead}
        </p>
      </header>
    </div>

    <figure className={styles.manifestoBand} data-reveal>
      <ResponsivePicture
        {...philosophyHands}
        sizes="100vw"
        alt="Várias mãos de diferentes tons de pele se unindo no centro em gesto de colaboração e inclusão."
        className={styles.manifestoBandImage}
        testId="manifesto-image"
      />
      <span className={styles.manifestoBandOverlay} aria-hidden="true" />
    </figure>

    <div className={styles.manifestoInner}>
      <ol className={styles.manifestoPrinciples}>
        {principles.map((principle) => (
          <li
            key={principle.id}
            className={styles.principle}
            data-reveal
            data-testid={`manifesto-principle-${principle.id}`}
          >
            <span className={styles.principleNumber} aria-hidden="true">
              {principle.number}
            </span>
            <div>
              <h3 className={styles.principleTitle}>{principle.title}</h3>
              <p className={styles.principleImpact}>{principle.impact}</p>
              <p className={styles.principleConsequence}>
                {principle.consequence}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <p className={styles.manifestoClose} data-reveal>
        {sectionContent.close}
      </p>
    </div>
  </section>
);

export default Manifesto;
