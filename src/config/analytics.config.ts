// Configurações do Google Analytics
export const GA_CONFIG = {
  // Pega o ID das variáveis de ambiente ou usa valor padrão
  MEASUREMENT_ID: import.meta.env.VITE_GA_MEASUREMENT_ID || 'GA_MEASUREMENT_ID',
  
  // Só ativar em produção, exceto se forçado por variável de ambiente
  ENABLED: import.meta.env.VITE_GA_DEBUG === 'true' || import.meta.env.MODE === 'production',
  
  // Debug em desenvolvimento ou se forçado por variável
  DEBUG: import.meta.env.VITE_DEBUG_MODE === 'true' || import.meta.env.MODE === 'development',
  
  // Configurações extras
  PERFORMANCE_DEBUG: import.meta.env.VITE_PERFORMANCE_DEBUG === 'true',
};

// Verificar se o GA está configurado corretamente
export const isGAConfigured = () => {
  return GA_CONFIG.MEASUREMENT_ID !== 'GA_MEASUREMENT_ID' && 
         GA_CONFIG.MEASUREMENT_ID?.startsWith('G-') && 
         GA_CONFIG.ENABLED;
};

// Configurações do site para SEO e metadados
export const SITE_CONFIG = {
  NAME: import.meta.env.VITE_SITE_NAME || 'Lucas Nonato - Portfolio',
  DESCRIPTION: import.meta.env.VITE_SITE_DESCRIPTION || 'Portfólio de Lucas Nonato - Desenvolvedor Full-Stack',
  BASE_URL: import.meta.env.VITE_BASE_URL || 'http://localhost:3000',
  AUTHOR: import.meta.env.VITE_AUTHOR || 'Lucas Nonato',
  KEYWORDS: import.meta.env.VITE_SEO_KEYWORDS?.split(',') || ['portfolio', 'desenvolvedor', 'full-stack'],
};

// Links sociais
export const SOCIAL_LINKS = {
  GITHUB: import.meta.env.VITE_GITHUB_URL || 'https://github.com/LucasNonato',
  LINKEDIN: import.meta.env.VITE_LINKEDIN_URL || 'https://www.linkedin.com/in/lucasnonato/',
  INSTAGRAM: import.meta.env.VITE_INSTAGRAM_URL || '',
  TWITTER: import.meta.env.VITE_TWITTER_URL || '',
};
