import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  sortedMilestones,
  type MilestoneType,
} from "../../data";
import { GlassPanel, SectionLabel } from "../../components/design-system";
import styles from "../pages.module.scss";

const TYPE_ORDER: MilestoneType[] = [
  "profissional",
  "formacao",
  "certificacao",
  "conquista",
];

const typeMeta: Record<MilestoneType, { label: string; color: string }> = {
  formacao: { label: "Formação", color: "var(--violet)" },
  certificacao: { label: "Certificação", color: "var(--magenta)" },
  profissional: { label: "Profissional", color: "var(--violet)" },
  conquista: { label: "Conquista", color: "var(--magenta)" },
};

const presentTypes = TYPE_ORDER.filter((type) =>
  sortedMilestones.some((milestone) => milestone.type === type),
);

const sectionContent = {
  label: "Jornada",
  index: "03",
  heading: "Minha Jornada",
  description:
    "Trajetória profissional, do marco mais recente ao mais antigo.",
};

const Timeline = () => (
  <section
    id="jornada"
    className={`${styles.section} ${styles.voidSection}`}
    data-testid="jornada-section"
    aria-labelledby="jornada-title"
  >
    <div className={styles.sectionHead}>
      <div>
        <SectionLabel tone="dark">
          {sectionContent.label} / {sectionContent.index}
        </SectionLabel>
        <h2
          id="jornada-title"
          className={styles.sectionTitle}
          data-reveal
        >
          {sectionContent.heading}
        </h2>
      </div>
      <p className={styles.sectionLead} data-reveal>
        {sectionContent.description}
      </p>
    </div>

    <div
      className={styles.timeline}
    >
      {presentTypes.length > 0 && (
        <div className={styles.timelineLine} aria-hidden="true" />
      )}

      <ol
        aria-label="Linha do tempo da carreira"
        style={{ listStyle: "none", margin: 0, padding: 0 }}
      >
        {sortedMilestones.map((milestone) => {
          const meta = typeMeta[milestone.type];
          return (
            <li
              key={milestone.id}
              className={styles.timelineItem}
              data-testid={`jornada-item-${milestone.id}`}
              data-reveal
            >
              <span className={styles.timelinePeriod}>
                <time dateTime={milestone.date}>{milestone.period}</time>
              </span>
              <GlassPanel tone="dark" className={styles.timelineCard}>
                <span className={styles.timelineType}>
                  <span
                    className={styles.timelineTypeDot}
                    style={{ background: meta.color }}
                    aria-hidden="true"
                  />
                  {meta.label}
                </span>
                <h3 className={styles.timelineTitle}>{milestone.title}</h3>
                <p className={styles.timelineInstitution}>
                  {milestone.institution}
                </p>
                {milestone.description && (
                  <p className={styles.timelineDescription}>
                    {milestone.description}
                  </p>
                )}
                {milestone.url && (
                  <a
                    className={styles.timelineLink}
                    href={milestone.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver certificado
                    <OpenInNewIcon fontSize="small" />
                    <span className={styles.srOnly}>
                      (abre em nova aba)
                    </span>
                  </a>
                )}
              </GlassPanel>
            </li>
          );
        })}
      </ol>
    </div>
  </section>
);

export default Timeline;
