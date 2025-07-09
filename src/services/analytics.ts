import { install, gtag } from 'ga-gtag';
import { GA_CONFIG, isGAConfigured } from '../config/analytics.config';

// Inicializar o Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && isGAConfigured()) {
    install(GA_CONFIG.MEASUREMENT_ID);
    
    if (GA_CONFIG.DEBUG) {
      console.log('Google Analytics inicializado com ID:', GA_CONFIG.MEASUREMENT_ID);
    }
  }
};

// Rastrear visualizações de página
export const trackPageView = (page_title: string, page_location?: string) => {
  if (typeof window !== 'undefined' && isGAConfigured()) {
    gtag('event', 'page_view', {
      page_title,
      page_location: page_location || window.location.href,
    });
  }
};

// Rastrear eventos personalizados
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && isGAConfigured()) {
    gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Eventos específicos do portfólio
export const trackPortfolioEvents = {
  // Navegação
  navigationClick: (section: string) => {
    trackEvent('click', 'navigation', `nav_${section}`);
  },

  // Seção Presentation
  presentationView: () => {
    trackEvent('view', 'section', 'presentation');
  },

  presentationImageHover: () => {
    trackEvent('hover', 'interaction', 'presentation_image');
  },

  // Seção Experience
  experienceView: () => {
    trackEvent('view', 'section', 'experience');
  },

  experienceCardClick: (company: string) => {
    trackEvent('click', 'experience', `company_${company.toLowerCase().replace(/\s+/g, '_')}`);
  },

  // Seção Skills
  skillsView: () => {
    trackEvent('view', 'section', 'skills');
  },

  skillHover: (skill: string) => {
    trackEvent('hover', 'skills', skill.toLowerCase().replace(/\s+/g, '_'));
  },

  // Seção GitHub
  githubView: () => {
    trackEvent('view', 'section', 'github');
  },

  githubRepoClick: (repoName: string) => {
    trackEvent('click', 'github', `repo_${repoName}`);
  },

  // Footer e Links Sociais
  socialLinkClick: (platform: string) => {
    trackEvent('click', 'social', platform.toLowerCase());
  },

  footerLinkClick: (link: string) => {
    trackEvent('click', 'footer', link.toLowerCase());
  },

  // Formulário de Contato
  contactFormView: () => {
    trackEvent('view', 'section', 'contact_form');
  },

  contactFormSubmit: (success: boolean) => {
    trackEvent(success ? 'submit_success' : 'submit_error', 'contact_form', success ? 'form_sent' : 'form_error');
  },

  contactFormFieldFocus: (field: string) => {
    trackEvent('focus', 'contact_form', `field_${field}`);
  },

  // Scroll e Engajamento
  scrollDepth: (percentage: number) => {
    trackEvent('scroll', 'engagement', `depth_${percentage}%`, percentage);
  },

  timeOnPage: (seconds: number) => {
    trackEvent('time_on_page', 'engagement', 'duration', seconds);
  },

  // Downloads e Links Externos
  resumeDownload: () => {
    trackEvent('download', 'document', 'resume');
  },

  externalLinkClick: (url: string) => {
    trackEvent('click', 'external_link', url);
  },
};

// Hook para rastrear tempo na página
export const usePageTimeTracking = () => {
  if (typeof window !== 'undefined') {
    const startTime = Date.now();
    
    const trackTimeOnUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      trackPortfolioEvents.timeOnPage(timeSpent);
    };

    window.addEventListener('beforeunload', trackTimeOnUnload);
    
    return () => {
      window.removeEventListener('beforeunload', trackTimeOnUnload);
    };
  }
};

// Hook para rastrear profundidade de scroll
export const useScrollDepthTracking = () => {
  if (typeof window !== 'undefined') {
    let maxScrollDepth = 0;
    const thresholds = [25, 50, 75, 90, 100];
    const tracked = new Set<number>();

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollDepth = Math.round((window.scrollY / scrollHeight) * 100);
      
      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        
        thresholds.forEach(threshold => {
          if (scrollDepth >= threshold && !tracked.has(threshold)) {
            tracked.add(threshold);
            trackPortfolioEvents.scrollDepth(threshold);
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }
};
