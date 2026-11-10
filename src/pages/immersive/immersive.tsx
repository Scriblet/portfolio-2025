import '@fontsource/inter/latin-300.css';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/sora/latin-400.css';
import '@fontsource/sora/latin-500.css';
import '@fontsource/syne/latin-600.css';
import '@fontsource/syne/latin-700.css';
import '@fontsource/syne/latin-800.css';

import { useEffect, useRef } from 'react';
import { useRevealOnScroll } from './hooks';
import ImmersiveNav from './ImmersiveNav';
import CleanHero from './CleanHero';
import { About, Contact, Experience, Skills } from './sections';
import { GrainOverlay } from './ui';
import styles from './immersive.module.scss';

/**
 * Prévia experimental da nova direção visual do portfólio.
 *
 * Rota: /immersive. Serve como laboratório navegável para validar o portal
 * scroll-driven, glassmorphism e a nova arquitetura de informação do portfólio
 * (Hero + Sobre + Skills + Experiência + Contato) antes do refactor completo.
 */
const Immersive = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  useRevealOnScroll(rootRef);

  useEffect(() => {
    const previousTitle = document.title;
    // Reaproveita o <meta name="robots"> do index.html: um segundo tag
    // duplicado seria ignorado pelos buscadores (vale o primeiro).
    const existingRobots = document.querySelector<HTMLMetaElement>(
      'meta[name="robots"]',
    );
    const robots = existingRobots ?? document.createElement('meta');
    const previousRobots = existingRobots?.content;

    if (!existingRobots) {
      robots.name = 'robots';
      document.head.appendChild(robots);
    }
    robots.content = 'noindex, nofollow';
    document.title = 'Preview imersivo — Lucas Nonato';

    return () => {
      document.title = previousTitle;
      if (existingRobots && previousRobots !== undefined) {
        existingRobots.content = previousRobots;
      } else {
        robots.remove();
      }
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={styles.page}
      data-testid="immersive-page"
    >
      <GrainOverlay />
      <ImmersiveNav />

      <main id="immersive-main" tabIndex={-1}>
        <CleanHero />
        <About />
        <Skills />
        <Experience />
      </main>
      <Contact />
    </div>
  );
};

export default Immersive;
