import { useEffect, useRef, useState } from "react";
import { aiMaturityLayers, aiMaturityTotal } from "../../data/aiMaturity";
import { SectionLabel } from "../../components/design-system";
import styles from "../pages.module.scss";

const sectionContent = {
  label: "Competência em IA",
  index: "02",
  heading: "Onde a IA vira",
  accent: "sistema",
  lead: "O mapa do que eu coloco de pé — não um ranking de senioridade.",
  close:
    "As camadas de baixo sustentam as de cima. Nenhuma funciona sozinha.",
};

/**
 * Seção #ia-maturity: mapa contínuo em cinco camadas.
 *
 * O rail à esquerda é decorativo (`aria-hidden`): a numeração real está na
 * lista ordenada. Ele apenas acompanha a camada visível no centro da viewport
 * para dar referência de progressão.
 */
const IAMaturity = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return;

    const layers = Array.from(
      root.querySelectorAll<HTMLElement>("[data-layer]"),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number((entry.target as HTMLElement).dataset.layer);
          if (!Number.isNaN(index)) setActive(index);
        });
      },
      { rootMargin: "-42% 0px -50% 0px", threshold: 0 },
    );

    layers.forEach((layer) => observer.observe(layer));
    return () => observer.disconnect();
  }, []);

  const fillHeight = `${((active + 1) / aiMaturityLayers.length) * 100}%`;

  return (
    <section
      ref={sectionRef}
      id="ia-maturity"
      className={`${styles.iaSection} ${styles.voidSection}`}
      aria-labelledby="ia-maturity-title"
      data-testid="ia-maturity-section"
    >
      <div className={styles.iaInner}>
        <header className={styles.iaHead}>
          <SectionLabel tone="dark">
            {sectionContent.label} / {sectionContent.index}
          </SectionLabel>
          <div className={styles.iaHeadGrid}>
            <h2
              id="ia-maturity-title"
              className={styles.iaTitle}
              data-testid="ia-maturity-heading"
              data-reveal
            >
              {sectionContent.heading}{" "}
              <em className={styles.iaTitleAccent}>{sectionContent.accent}</em>
            </h2>
            <p className={styles.iaLead} data-reveal>
              {sectionContent.lead}
            </p>
          </div>
        </header>

        <div className={styles.iaBody}>
          <aside className={styles.iaRail} aria-hidden="true">
            <div className={styles.iaRailTop}>
              <span className={styles.iaRailCount}>{aiMaturityTotal}</span>
              <span className={styles.iaRailWord}>camadas</span>
            </div>

            <div className={styles.iaRailNav}>
              <span className={styles.iaRailTrack}>
                <span
                  className={styles.iaRailFill}
                  style={{ height: fillHeight }}
                />
              </span>
              <ol className={styles.iaRailIndex}>
                {aiMaturityLayers.map((layer, index) => (
                  <li
                    key={layer.id}
                    className={
                      index === active ? styles.iaRailItemActive : undefined
                    }
                  >
                    <span className={styles.iaRailNumber}>{layer.number}</span>
                    <span>{layer.title}</span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          <ol className={styles.iaStack}>
            {aiMaturityLayers.map((layer, index) => (
              <li
                key={layer.id}
                data-layer={index}
                data-reveal
                className={`${styles.iaLayer} ${
                  index === active ? styles.iaLayerActive : ""
                }`}
                data-testid={`ia-maturity-layer-${layer.id}`}
              >
                <span className={styles.iaLayerNumber} aria-hidden="true">
                  {layer.number}
                </span>
                <div className={styles.iaLayerContent}>
                  <h3 className={styles.iaLayerTitle}>{layer.title}</h3>
                  <p className={styles.iaThesis}>{layer.thesis}</p>
                  <ul className={styles.iaCaps}>
                    {layer.capabilities.map((capability) => (
                      <li key={capability}>{capability}</li>
                    ))}
                  </ul>
                  <p className={styles.iaEvidence}>{layer.evidence}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <p className={styles.iaClose} data-reveal>
          {sectionContent.close}
        </p>
      </div>
    </section>
  );
};

export default IAMaturity;
