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
import PortalHero from './PortalHero';
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
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex, nofollow';
    document.head.appendChild(robots);
    document.title = 'Preview imersivo — Lucas Nonato';

    return () => {
      document.title = previousTitle;
      robots.remove();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={styles.page}
      data-testid="immersive-page"
    >
      <a className={styles.skipLink} href="#immersive-main">
        Pular para o conteúdo
      </a>

      <GrainOverlay />
      <ImmersiveNav />

      <main id="immersive-main" tabIndex={-1}>
        <PortalHero />
        <About />
        <Skills />
        <Experience />
      </main>
      <Contact />
    </div>
  );
};

export default Immersive;
