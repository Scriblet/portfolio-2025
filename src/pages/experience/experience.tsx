import { experiences } from "../../data";
import {
  GlassPanel,
  SectionLabel,
} from "../../components/design-system";
import { CompanyMark } from "../../components/company-marks";
import styles from "../pages.module.scss";

const sectionContent = {
  label: "Experiência",
  index: "02",
  heading: "Empresas onde trabalhei e aprendizados que conquistei",
  description:
    "Cinco passagens — de consultoria de UX a engenharia de IA — conectadas pela obsessão em resolver problemas com código bem feito.",
};

const Experience = () => (
  <section
    id="experience"
    className={`${styles.section} ${styles.void2Section}`}
    data-testid="experience-section"
    aria-labelledby="experience-title"
  >
    <div className={styles.sectionHead}>
      <div>
        <SectionLabel tone="dark">
          {sectionContent.label} / {sectionContent.index}
        </SectionLabel>
        <h2
          id="experience-title"
          className={styles.sectionTitle}
          data-testid="experience-heading"
          data-reveal
        >
          {sectionContent.heading}
        </h2>
      </div>
      <p className={styles.sectionLead} data-reveal>
        {sectionContent.description}
      </p>
    </div>

    <ul className={styles.experienceGrid}>
      {experiences.map((exp) => (
        <GlassPanel
          as="li"
          key={exp.id}
          tone="dark"
          className={styles.experienceCard}
          data-testid={`experience-card-${exp.id}`}
          data-reveal
        >
          <div className={styles.experienceCardTop}>
            <span className={styles.experienceIndex}>{exp.number}</span>
            <CompanyMark mark={exp.mark} className={styles.experienceMark} />
          </div>
          <span className={styles.experiencePeriod}>{exp.period}</span>
          <h3
            className={styles.experienceCompany}
            data-testid={`experience-company-${exp.id}`}
          >
            {exp.company}
          </h3>
          <p
            className={styles.experiencePosition}
            data-testid={`experience-position-${exp.id}`}
          >
            {exp.position}
          </p>
          <p
            className={styles.experienceDescription}
            data-testid={`experience-description-${exp.id}`}
          >
            {exp.description}
          </p>
        </GlassPanel>
      ))}
    </ul>
  </section>
);

export default Experience;
