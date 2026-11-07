import type { SiteConfig } from './types';

// Configuração do site (SEO e metadados). Lê VITE_* com os fallbacks históricos.
export const SITE_CONFIG: SiteConfig = {
  NAME: import.meta.env.VITE_SITE_NAME || 'Lucas Nonato - Portfolio',
  DESCRIPTION:
    import.meta.env.VITE_SITE_DESCRIPTION ||
    'Portfólio de Lucas Nonato - Desenvolvedor Full-Stack',
  BASE_URL: import.meta.env.VITE_BASE_URL || 'http://localhost:3000',
  AUTHOR: import.meta.env.VITE_AUTHOR || 'Lucas Nonato',
  KEYWORDS: import.meta.env.VITE_SEO_KEYWORDS?.split(',') || [
    'portfolio',
    'desenvolvedor',
    'full-stack',
  ],
  ROLE: import.meta.env.VITE_SITE_ROLE || 'Desenvolvedor Full-Stack',
  TAGLINE: import.meta.env.VITE_SITE_TAGLINE || 'UX Designer',
  LOCALE: import.meta.env.VITE_SITE_LOCALE || 'pt-BR',
  THEME_COLOR: import.meta.env.VITE_THEME_COLOR || '#121212',
  OG_IMAGE: import.meta.env.VITE_OG_IMAGE || '/og-cover.png',
};
