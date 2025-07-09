// Configurações para serviços de email
export const EMAIL_CONFIG = {
  // EmailJS Configuration
  EMAILJS: {
    SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
    PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
    ENABLED: !!(import.meta.env.VITE_EMAILJS_SERVICE_ID && 
               import.meta.env.VITE_EMAILJS_TEMPLATE_ID && 
               import.meta.env.VITE_EMAILJS_PUBLIC_KEY),
  },
  
  // Formspree Configuration
  FORMSPREE: {
    ENDPOINT: import.meta.env.VITE_FORMSPREE_ENDPOINT || '',
    ENABLED: !!import.meta.env.VITE_FORMSPREE_ENDPOINT,
  },
};

// Configurações de desenvolvimento
export const DEV_CONFIG = {
  PORT: import.meta.env.VITE_DEV_PORT || 3000,
  HOST: import.meta.env.VITE_DEV_HOST || 'localhost',
  DEBUG_MODE: import.meta.env.VITE_DEBUG_MODE === 'true',
  PERFORMANCE_DEBUG: import.meta.env.VITE_PERFORMANCE_DEBUG === 'true',
};

// Configurações de PWA (Progressive Web App)
export const PWA_CONFIG = {
  NAME: import.meta.env.VITE_PWA_NAME || 'Lucas Nonato Portfolio',
  SHORT_NAME: import.meta.env.VITE_PWA_SHORT_NAME || 'LN Portfolio',
  THEME_COLOR: import.meta.env.VITE_PWA_THEME_COLOR || '#181823',
  BACKGROUND_COLOR: import.meta.env.VITE_PWA_BACKGROUND_COLOR || '#000000',
};

// Configurações de API
export const API_CONFIG = {
  GITHUB_TOKEN: import.meta.env.VITE_GITHUB_API_TOKEN || '',
  BASE_URL: import.meta.env.VITE_API_BASE_URL || '',
  CORS_ORIGINS: import.meta.env.VITE_CORS_ORIGINS?.split(',') || [],
};

// Configurações de tema
export const THEME_CONFIG = {
  PRIMARY_COLOR: import.meta.env.VITE_PRIMARY_COLOR || '#00bcd4',
  SECONDARY_COLOR: import.meta.env.VITE_SECONDARY_COLOR || '#9c27b0',
};

// Verificar qual serviço de email está configurado
export const getEmailService = () => {
  if (EMAIL_CONFIG.EMAILJS.ENABLED) {
    return 'emailjs';
  } else if (EMAIL_CONFIG.FORMSPREE.ENABLED) {
    return 'formspree';
  }
  return null;
};

// Verificar se pelo menos um serviço de email está configurado
export const isEmailConfigured = () => {
  return EMAIL_CONFIG.EMAILJS.ENABLED || EMAIL_CONFIG.FORMSPREE.ENABLED;
};
