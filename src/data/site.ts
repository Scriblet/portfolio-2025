import type { SiteConfig } from './types';

// Configuração do site (SEO e metadados). Lê VITE_* com os fallbacks históricos.
export const SITE_CONFIG: SiteConfig = {
  NAME: import.meta.env.VITE_SITE_NAME || 'Lucas Nonato - Portfolio',
  DESCRIPTION:
    import.meta.env.VITE_SITE_DESCRIPTION ||
    'Portfólio de Lucas Nonato — Consultor de IA, Software Engineer e Full Stack.',
  BASE_URL: import.meta.env.VITE_BASE_URL || 'http://localhost:3000',
  AUTHOR: import.meta.env.VITE_AUTHOR || 'Lucas Nonato',
  EMAIL: import.meta.env.VITE_AUTHOR_EMAIL || 'lucas.nonato1@hotmail.com',
  LOCATION: import.meta.env.VITE_AUTHOR_LOCATION || 'São Paulo, SP',
  EXPERIENCE_LABEL: import.meta.env.VITE_AUTHOR_EXPERIENCE || '7+ anos',
  STACK_LABEL: import.meta.env.VITE_AUTHOR_STACK || 'TypeScript · React · Node.js',
  KEYWORDS: import.meta.env.VITE_SEO_KEYWORDS?.split(',') || [
    'portfolio',
    'desenvolvedor',
    'full-stack',
  ],
  ROLE:
    import.meta.env.VITE_SITE_ROLE || 'Consultor de IA & Software Engineer',
  TAGLINE:
    import.meta.env.VITE_SITE_TAGLINE ||
    'Construo produtos digitais de ponta a ponta, com foco em acessibilidade, arquitetura e resultados reais',
  LOCALE: import.meta.env.VITE_SITE_LOCALE || 'pt-BR',
  THEME_COLOR: import.meta.env.VITE_THEME_COLOR || '#0a0814',
  OG_IMAGE: import.meta.env.VITE_OG_IMAGE || '/og-preview.png',
};
