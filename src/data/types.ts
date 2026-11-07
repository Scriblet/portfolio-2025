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

export interface Experience {
  id: number;
  number: string;
  company: string;
  position: string;
  description: string;
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
