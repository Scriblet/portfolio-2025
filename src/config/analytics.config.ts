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

// Configurações do site e links sociais: fonte única em src/data/.
// Re-exportados aqui para manter compatibilidade com imports existentes.
export { SITE_CONFIG } from '../data/site';
export { SOCIAL_LINKS } from '../data/social';
