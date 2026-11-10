import { SectionLabel } from "../../components/design-system";
import { selectedWorks } from "../../data/selectedWorks";
import styles from "../pages.module.scss";

const sectionContent = {
  label: "Trabalho",
  index: "04",
  heading: "Cases,",
  accent: "não cargos",
  lead: "Cinco entregas reais com contexto, decisão e resultado, o que não cabe num currículo.",
};

/**
 * Seção #selected-work: substitui Experience + Jornada por uma narrativa
 * contínua de cases. Os spans `experience` e `jornada` no topo preservam as
 * âncoras antigas, que continuam chegando por links já compartilhados.
 */
const SelectedWork = () => (
  <section
    id="selected-work"
    className={`${styles.workSection} ${styles.voidSection}`}
    aria-labelledby="selected-work-title"
    data-testid="selected-work-section"
  >
    <span id="experience" className={styles.workAnchor} aria-hidden="true" />
    <span id="jornada" className={styles.workAnchor} aria-hidden="true" />

    <div className={styles.workInner}>
      <header className={styles.workHead}>
        <SectionLabel tone="dark">
          {sectionContent.label} / {sectionContent.index}
        </SectionLabel>
        <div className={styles.workHeadGrid}>
          <h2
            id="selected-work-title"
            className={styles.workTitle}
            data-testid="selected-work-heading"
            data-reveal
          >
            {sectionContent.heading}{" "}
            <em className={styles.workTitleAccent}>
              {sectionContent.accent}
            </em>
          </h2>
          <p className={styles.workLead} data-reveal>
            {sectionContent.lead}
          </p>
        </div>
      </header>

      <ol className={styles.workList}>
        {selectedWorks.map((work) => (
          <li
            key={work.id}
            className={styles.workCase}
            data-testid={`selected-work-case-${work.id}`}
            data-reveal
          >
            <div className={styles.workMeta}>
              <span className={styles.workNumber} aria-hidden="true">
                {work.number}
              </span>
              <dl className={styles.workMetaList}>
                <div className={styles.workMetaRow}>
                  <dt className={styles.workMetaLabel}>Período</dt>
                  <dd className={styles.workMetaValue}>
                    <time>{work.period}</time>
                  </dd>
                </div>
                <div className={styles.workMetaRow}>
                  <dt className={styles.workMetaLabel}>Empresa</dt>
                  <dd className={styles.workMetaValue}>{work.company}</dd>
                </div>
                <div className={styles.workMetaRow}>
                  <dt className={styles.workMetaLabel}>Papel</dt>
                  <dd className={styles.workMetaValue}>{work.role}</dd>
                </div>
              </dl>
            </div>

            <article className={styles.workBody}>
              <h3 className={styles.workHeadline}>{work.headline}</h3>

              <div className={styles.workBlocks}>
                <div className={styles.workBlock}>
                  <h4 className={styles.workBlockTitle}>Contexto</h4>
                  <p className={styles.workBlockText}>{work.context}</p>
                </div>
                <div className={styles.workBlock}>
                  <h4 className={styles.workBlockTitle}>Desafio</h4>
                  <p className={styles.workBlockText}>{work.challenge}</p>
                </div>
                <div className={styles.workBlock}>
                  <h4 className={styles.workBlockTitle}>Decisão</h4>
                  <p className={styles.workBlockText}>{work.action}</p>
                </div>
                <div className={styles.workBlock}>
                  <h4 className={styles.workBlockTitle}>Resultado</h4>
                  <p className={styles.workBlockText}>{work.outcome}</p>
                </div>
              </div>

              <ul className={styles.workStack} aria-label="Stack do case">
                {work.stack.map((tech) => (
                  <li key={tech} className={styles.workStackTag}>
                    {tech}
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default SelectedWork;
