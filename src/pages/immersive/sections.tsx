import {
  aboutContent,
  contactContent,
  experienceContent,
  experienceTimeline,
  portraitImage,
  skillCards,
  skillsContent,
} from "./content";
import { ImmersiveContactForm } from "./ImmersiveContactForm";
import { ResponsivePicture } from "../../components/ResponsivePicture";
import {
  GlassPanel,
  Hairline,
  IndexNumeral,
  PillButton,
  SectionLabel,
} from "./ui";
import styles from "./immersive.module.scss";

export const About = () => (
  <section
    id="about"
    className={styles.aboutSection}
    data-testid="immersive-about"
    aria-labelledby="immersive-about-title"
  >
    <IndexNumeral className={styles.aboutIndex}>
      {aboutContent.index}
    </IndexNumeral>

    <div className={styles.aboutGrid}>
      <div className={styles.aboutCopy}>
        <SectionLabel tone="light">
          {aboutContent.label} / {aboutContent.index}
        </SectionLabel>

        <h2
          id="immersive-about-title"
          className={styles.aboutStatement}
          data-reveal
        >
          {aboutContent.statement.map((part, index) =>
            index === aboutContent.highlightIndex ? (
              <em key={index} className={styles.aboutHighlight}>
                {part}
              </em>
            ) : (
              <span key={index}>{part}</span>
            ),
          )}
        </h2>

        <Hairline tone="light" className={styles.aboutRule} />
        <p className={styles.aboutFootnote} data-reveal>
          {aboutContent.footnote}
        </p>
      </div>

      <div className={styles.aboutHud} data-reveal>
        {aboutContent.hud.map((item) => (
          <GlassPanel
            key={item.label}
            tone="light"
            className={styles.aboutHudCard}
          >
            <span className={styles.aboutHudLabel}>{item.label}</span>
            <span className={styles.aboutHudValue}>{item.value}</span>
          </GlassPanel>
        ))}
      </div>
    </div>

    <figure className={styles.aboutOrbit} aria-hidden="true">
      <span className={styles.aboutOrbitRing} />
      <ResponsivePicture
        {...portraitImage}
        alt=""
        className={styles.aboutOrbitImage}
        loading="lazy"
      />
      <figcaption className={styles.aboutOrbitCaption}>Arquivo / 2026</figcaption>
    </figure>
  </section>
);

export const Skills = () => (
  <section
    id="skills"
    className={`${styles.section} ${styles.skillsSection}`}
    data-testid="immersive-skills"
    aria-labelledby="immersive-skills-title"
  >
    <div className={styles.sectionHead}>
      <div>
        <SectionLabel tone="dark">
          {skillsContent.label} / {skillsContent.index}
        </SectionLabel>
        <h2
          id="immersive-skills-title"
          className={styles.sectionTitle}
          data-reveal
        >
          {skillsContent.heading}
        </h2>
      </div>
      <p className={styles.sectionLead} data-reveal>
        {skillsContent.description}
      </p>
    </div>

    <ul className={styles.skillsGrid}>
      {skillCards.map((skill) => (
        <GlassPanel
          as="li"
          key={skill.id}
          tone="dark"
          className={styles.skillCard}
          data-reveal
          data-testid="immersive-skill-card"
        >
          <span className={styles.skillIndex}>{skill.index}</span>
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
      ))}
    </ul>
  </section>
);

export const Experience = () => (
  <section
    id="experience"
    className={`${styles.section} ${styles.experienceSection}`}
    data-testid="immersive-experience"
    aria-labelledby="immersive-experience-title"
  >
    <div className={styles.sectionHead}>
      <div>
        <SectionLabel tone="dark">
          {experienceContent.label} / {experienceContent.index}
        </SectionLabel>
        <h2
          id="immersive-experience-title"
          className={styles.sectionTitle}
          data-reveal
        >
          {experienceContent.heading}
        </h2>
      </div>
      <p className={styles.sectionLead} data-reveal>
        {experienceContent.description}
      </p>
    </div>

    <ol className={styles.timeline}>
      <li className={styles.timelineLine} aria-hidden="true" />
      {experienceTimeline.map((item) => (
        <li
          key={item.id}
          className={styles.timelineItem}
          data-reveal
          data-testid="immersive-experience-item"
        >
          <span className={styles.timelinePeriod}>{item.period}</span>
          <GlassPanel tone="dark" className={styles.timelineCard}>
            <span className={styles.timelineNumber}>{item.number}</span>
            <h3 className={styles.timelineCompany}>{item.company}</h3>
            <p className={styles.timelineRole}>{item.position}</p>
            <p className={styles.timelineDescription}>{item.description}</p>
          </GlassPanel>
        </li>
      ))}
    </ol>

    <p className={styles.placeholderNote} data-reveal>
      Períodos extraídos do currículo em <code>public/cv/lucas-nonato-cv.pdf</code>.
      Nenhuma data ou conquista foi inventada.
    </p>
  </section>
);

export const Contact = () => (
  <footer
    id="contact"
    className={styles.contactSection}
    data-testid="immersive-contact"
    aria-labelledby="immersive-contact-title"
  >
    <div className={styles.contactGrid}>
      <div className={styles.contactCopy}>
        <SectionLabel tone="dark">{contactContent.label}</SectionLabel>
        <h2 id="immersive-contact-title" className={styles.contactTitle} data-reveal>
          {contactContent.headline}
        </h2>
        <p className={styles.contactBody} data-reveal>
          {contactContent.body}
        </p>

        <div className={styles.contactActions} data-reveal>
          <PillButton href={contactContent.primaryAction.href}>
            {contactContent.primaryAction.label}
          </PillButton>
          <PillButton
            href={contactContent.secondaryAction.href}
            external
            variant="ghost-dark"
          >
            {contactContent.secondaryAction.label}
          </PillButton>
        </div>
      </div>

      <GlassPanel tone="dark" className={styles.contactCard} data-reveal>
        <h3 className={styles.contactCardTitle}>{contactContent.form.title}</h3>
        <ImmersiveContactForm />
      </GlassPanel>
    </div>

    <Hairline className={styles.contactRule} />

    <div className={styles.contactFinePrint}>
      <p>{contactContent.footer.email}</p>
      <p>{contactContent.footer.location}</p>
      <p>
        {contactContent.footer.social.map((link, index) => (
          <span key={link.label}>
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
            {index < contactContent.footer.social.length - 1 && " · "}
          </span>
        ))}
      </p>
    </div>

    <div className={styles.bigWordmarkWrap} aria-hidden="true">
      <span className={styles.bigWordmark}>Lucas Nonato</span>
    </div>
  </footer>
);
