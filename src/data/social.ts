import type { SocialLinks } from './types';

// Links sociais. Lê VITE_* com fallbacks.
//
// Nota intencional: GITHUB aponta para https://github.com/scriblet para ficar
// alinhado ao banner da seção Github e ao README. O fallback anterior em
// analytics.config.ts era https://github.com/LucasNonato — unificação proposital.
export const SOCIAL_LINKS: SocialLinks = {
  GITHUB: import.meta.env.VITE_GITHUB_URL || 'https://github.com/scriblet',
  LINKEDIN:
    import.meta.env.VITE_LINKEDIN_URL ||
    'https://www.linkedin.com/in/lucasnonato/',
  INSTAGRAM: import.meta.env.VITE_INSTAGRAM_URL || '',
  TWITTER: import.meta.env.VITE_TWITTER_URL || '',
};
