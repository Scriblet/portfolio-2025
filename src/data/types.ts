// Tipos das entidades de conteúdo do portfólio.
// Alterar um campo aqui faz o `tsc --noEmit` apontar todos os consumidores afetados.

export type SkillIconKey =
  | 'code'
  | 'design'
  | 'api'
  | 'accessibility'
  | 'storage'
  | 'build'
  | 'cloud';

/** Chaves dos assets de logo oficiais usados nos cards de experiência. */
export type CompanyMarkKey =
  | 'vivo'
  | 'porto-seguro'
  | 'thoughtworks'
  | 'arcotech'
  | 'finger';

export type CompanyMark = {
  /** Chave da logo oficial (ou fallback) usada no card. */
  key: CompanyMarkKey;
};

export interface Experience {
  id: number;
  number: string;
  company: string;
  position: string;
  description: string;
  /** Período legível da experiência (ex.: "2024 – 2026" ou "mar/2026 – atual"). */
  period: string;
  /** Marca visual da empresa exibida no card. */
  mark: CompanyMark;
}

export interface Skill {
  icon: SkillIconKey;
  title: string;
  description: string;
  tags: string[];
}

export interface SiteConfig {
  NAME: string;
  DESCRIPTION: string;
  BASE_URL: string;
  AUTHOR: string;
  EMAIL: string;
  LOCATION: string;
  EXPERIENCE_LABEL: string;
  STACK_LABEL: string;
  KEYWORDS: string[];
  ROLE: string;
  TAGLINE: string;
  LOCALE: string;
  THEME_COLOR: string;
  OG_IMAGE: string;
}

export interface SocialLinks {
  GITHUB: string;
  LINKEDIN: string;
  INSTAGRAM: string;
  TWITTER: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  stack: string[];
  repoUrl?: string;
  demoUrl?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatarUrl?: string;
}

/** Camada do mapa de maturidade em IA (seção #ia-maturity). */
export interface AiMaturityLayer {
  id: string;
  /** Numeral exibido na calha, ex.: "01". */
  number: string;
  title: string;
  /** Tese de uma linha que abre a camada. */
  thesis: string;
  capabilities: string[];
  /** Onde a camada aparece no trabalho real. */
  evidence: string;
}

/** Princípio do manifesto técnico (seção #manifesto). */
export interface Principle {
  id: string;
  /** Numeral exibido como capítulo, ex.: "01". */
  number: string;
  title: string;
  /** Frase de impacto em itálico. */
  impact: string;
  consequence: string;
}

/** Cartão de proposta de valor da seção #contact. */
export interface ValueProposition {
  id: string;
  /** Numeral exibido no cartão, ex.: "01". */
  number: string;
  title: string;
  description: string;
  /** Ganho concreto em uma linha. */
  benefit: string;
  ctaLabel: string;
  /** Texto inicial carregado no formulário ao clicar no cartão. */
  prompt: string;
}

/** Case da seção #selected-work. */
export interface SelectedWork {
  id: string;
  /** Numeral exibido como capítulo, ex.: "01". */
  number: string;
  company: string;
  /** Período legível, ex.: "mar/2026 – atual". */
  period: string;
  /** Data ordenável (ISO) para manter o case mais recente primeiro. */
  start: string;
  role: string;
  headline: string;
  context: string;
  challenge: string;
  action: string;
  outcome: string;
  stack: string[];
}
