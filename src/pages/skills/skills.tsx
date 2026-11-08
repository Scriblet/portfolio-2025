import CodeIcon from "@mui/icons-material/Code";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import ApiIcon from "@mui/icons-material/Api";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import StorageIcon from "@mui/icons-material/Storage";
import BuildIcon from "@mui/icons-material/Build";
import CloudIcon from "@mui/icons-material/Cloud";
import { skills } from "../../data";
import { trackPortfolioEvents } from "../../services/analytics";
import { GlassPanel, SectionLabel } from "../../components/design-system";
import type { SkillIconKey } from "../../data/types";
import styles from "../pages.module.scss";

const skillIcons: Record<SkillIconKey, typeof CodeIcon> = {
  code: CodeIcon,
  design: DesignServicesIcon,
  api: ApiIcon,
  accessibility: AccessibilityNewIcon,
  storage: StorageIcon,
  build: BuildIcon,
  cloud: CloudIcon,
};

const sectionContent = {
  label: "Skills",
  index: "05",
  heading: "Competências técnicas",
  description:
    "Domínio construído ao longo de projetos reais: front-end, back-end, qualidade, infraestrutura e design de experiência.",
};

const SkillsSection = () => (
  <section
    id="skills"
    className={`${styles.section} ${styles.voidSection}`}
    aria-labelledby="skills-title"
    data-testid="skills-section"
  >
    <div className={styles.sectionHead}>
      <div>
        <SectionLabel tone="dark">
          {sectionContent.label} / {sectionContent.index}
        </SectionLabel>
        <h2
          id="skills-title"
          className={styles.sectionTitle}
          data-testid="skills-heading"
          data-reveal
        >
          {sectionContent.heading}
        </h2>
      </div>
      <p className={styles.sectionLead} data-reveal>
        {sectionContent.description}
      </p>
    </div>

    <ul className={styles.skillsGrid}>
      {skills.map((skill, index) => {
        const Icon = skillIcons[skill.icon];
        return (
          <GlassPanel
            as="li"
            key={skill.title}
            tone="dark"
            className={styles.skillCard}
            data-testid={`skill-card-${skill.title.toLowerCase().replace(/\s+/g, "-")}`}
            data-reveal
            onMouseEnter={() =>
              trackPortfolioEvents.skillHover(skill.title)
            }
          >
            <span className={styles.skillIndex}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className={styles.skillIcon} aria-hidden="true">
              <Icon />
            </span>
            <h3 className={styles.skillTitle}>{skill.title}</h3>
            <p className={styles.skillDescription}>{skill.description}</p>
            <div className={styles.skillTags}>
              {skill.tags.map((tag) => (
                <span key={tag} className={styles.skillTag}>
                  {tag}
                </span>
              ))}
            </div>
          </GlassPanel>
        );
      })}
    </ul>
  </section>
);

export default SkillsSection;
