import { useMemo, useState } from "react";
import {
  siAngular,
  siCss,
  siCypress,
  siDocker,
  siDotnet,
  siEslint,
  siExpress,
  siFigma,
  siFramer,
  siGit,
  siGithub,
  siGithubactions,
  siGraphql,
  siHtml5,
  siJavascript,
  siJest,
  siMongodb,
  siMui,
  siNetlify,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPrettier,
  siReact,
  siSass,
  siStorybook,
  siTypescript,
  siVercel,
  siVite,
  siVitest,
} from "simple-icons";
import {
  technologies,
  toolboxCategories,
  type Technology,
  type ToolboxCategoryId,
  type ToolboxIconKey,
} from "../../data";
import { SectionLabel } from "../../components/design-system";
import styles from "../pages.module.scss";

const iconMap: Record<ToolboxIconKey, { path: string; title: string }> = {
  react: siReact,
  nextjs: siNextdotjs,
  typescript: siTypescript,
  javascript: siJavascript,
  angular: siAngular,
  html5: siHtml5,
  css: siCss,
  sass: siSass,
  mui: siMui,
  framer: siFramer,
  vite: siVite,
  node: siNodedotjs,
  express: siExpress,
  graphql: siGraphql,
  dotnet: siDotnet,
  postgresql: siPostgresql,
  mongodb: siMongodb,
  docker: siDocker,
  githubactions: siGithubactions,
  vercel: siVercel,
  netlify: siNetlify,
  git: siGit,
  github: siGithub,
  vitest: siVitest,
  jest: siJest,
  cypress: siCypress,
  eslint: siEslint,
  prettier: siPrettier,
  figma: siFigma,
  storybook: siStorybook,
};

const TechIcon = ({ technology }: { technology: Technology }) => {
  const icon = technology.icon ? iconMap[technology.icon] : undefined;

  if (!icon) {
    const initials = technology.name
      .replace(/[^A-Za-z0-9]/g, "")
      .slice(0, 2)
      .toUpperCase();

    return (
      <span className={styles.toolboxInitials} aria-hidden="true">
        {initials}
      </span>
    );
  }

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      className={styles.toolboxIcon}
    >
      <title>{icon.title}</title>
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
};

const sectionContent = {
  label: "Toolbox",
  index: "06",
  heading: "Stack & Ferramentas",
  description:
    "O que eu uso no dia a dia, separado entre o que é core e o que é complementar. Cada item leva para a documentação oficial.",
};

const Toolbox = () => {
  const [activeCategory, setActiveCategory] = useState<
    ToolboxCategoryId | "all"
  >("all");

  const visibleCategories = useMemo(
    () =>
      activeCategory === "all"
        ? toolboxCategories
        : toolboxCategories.filter((category) => category.id === activeCategory),
    [activeCategory],
  );

  const technologiesByCategory = useMemo(() => {
    const map = new Map<ToolboxCategoryId, Technology[]>();
    for (const technology of technologies) {
      const list = map.get(technology.categoryId) ?? [];
      list.push(technology);
      map.set(technology.categoryId, list);
    }
    return map;
  }, []);

  return (
    <section
      id="toolbox"
      className={`${styles.section} ${styles.void2Section}`}
      aria-labelledby="toolbox-title"
      data-testid="toolbox-section"
    >
      <div className={styles.sectionHead}>
        <div>
          <SectionLabel tone="dark">
            {sectionContent.label} / {sectionContent.index}
          </SectionLabel>
          <h2
            id="toolbox-title"
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
        className={styles.toolboxFilters}
        role="group"
        aria-label="Filtrar tecnologias por categoria"
      >
        <button
          type="button"
          className={styles.toolboxFilter}
          aria-pressed={activeCategory === "all"}
          onClick={() => setActiveCategory("all")}
          data-testid="toolbox-filter-all"
        >
          Todas
        </button>
        {toolboxCategories.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <button
              key={category.id}
              type="button"
              className={styles.toolboxFilter}
              aria-pressed={isActive}
              onClick={() => setActiveCategory(category.id)}
              data-testid={`toolbox-filter-${category.id}`}
            >
              {category.title}
            </button>
          );
        })}
      </div>

      {visibleCategories.map((category) => {
        const items = technologiesByCategory.get(category.id) ?? [];
        if (items.length === 0) return null;

        return (
          <section
            key={category.id}
            aria-labelledby={`toolbox-category-${category.id}`}
            data-testid={`toolbox-category-${category.id}`}
          >
            <h3
              id={`toolbox-category-${category.id}`}
              className={styles.sectionTitle}
              style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", marginBottom: 20 }}
              data-reveal
            >
              {category.title}
            </h3>
            <ul className={styles.toolboxGrid}>
              {items.map((technology) => {
                const isPrincipal = technology.level === "principal";
                return (
                  <li
                    key={technology.id}
                    data-testid={`toolbox-item-${technology.id}`}
                    data-reveal
                  >
                    {technology.url ? (
                      <a
                        href={technology.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.toolboxCard} ${isPrincipal ? styles.toolboxCardCore : ""}`}
                      >
                        <TechIcon technology={technology} />
                        <p className={styles.toolboxName}>{technology.name}</p>
                        <p
                          className={`${styles.toolboxLevel} ${isPrincipal ? styles.toolboxLevelCore : ""}`}
                        >
                          {isPrincipal ? "Core" : "Complementar"}
                        </p>
                        <span className={styles.srOnly}>
                          (abre em nova aba)
                        </span>
                      </a>
                    ) : (
                      <div
                        className={`${styles.toolboxCard} ${isPrincipal ? styles.toolboxCardCore : ""}`}
                      >
                        <TechIcon technology={technology} />
                        <p className={styles.toolboxName}>{technology.name}</p>
                        <p
                          className={`${styles.toolboxLevel} ${isPrincipal ? styles.toolboxLevelCore : ""}`}
                        >
                          {isPrincipal ? "Core" : "Complementar"}
                        </p>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </section>
  );
};

export default Toolbox;
