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

export type ToolboxCategoryId =
  | 'frontend'
  | 'backend'
  | 'devops'
  | 'quality'
  | 'design';

export interface ToolboxCategory {
  id: ToolboxCategoryId;
  title: string;
  description?: string;
}

export type ToolboxIconKey =
  | 'react'
  | 'nextjs'
  | 'typescript'
  | 'javascript'
  | 'angular'
  | 'html5'
  | 'css'
  | 'sass'
  | 'mui'
  | 'framer'
  | 'vite'
  | 'node'
  | 'express'
  | 'graphql'
  | 'dotnet'
  | 'postgresql'
  | 'mongodb'
  | 'docker'
  | 'githubactions'
  | 'vercel'
  | 'netlify'
  | 'git'
  | 'github'
  | 'vitest'
  | 'jest'
  | 'cypress'
  | 'eslint'
  | 'prettier'
  | 'figma'
  | 'storybook';

export type TechnologyLevel = 'principal' | 'complementar';

export interface Technology {
  id: string;
  name: string;
  categoryId: ToolboxCategoryId;
  /** Chave do mapa de ícones oficiais em src/pages/toolbox/toolbox.tsx. */
  icon?: ToolboxIconKey;
  level: TechnologyLevel;
  url?: string;
}

export type MilestoneType =
  | 'formacao'
  | 'certificacao'
  | 'profissional'
  | 'conquista';

export interface Milestone {
  id: string;
  type: MilestoneType;
  title: string;
  institution: string;
  /** Período legível, ex.: "2024 — Atual" ou "2019". */
  period: string;
  description?: string;
  url?: string;
  /** Data ordenável (ISO ou ano) para a timeline mais recente primeiro. */
  date: string;
}
