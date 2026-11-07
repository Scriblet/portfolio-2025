import type { Technology, ToolboxCategory } from './types';

// Fonte única da seção #toolbox. Nenhuma tecnologia deve ficar hardcoded no
// componente: adicione aqui e a grade se ajusta sozinha.
//
// `icon` referencia uma chave do mapa `iconMap` em
// src/pages/toolbox/toolbox.tsx. Quando não existe um logo oficial confiável
// (ex.: AWS), deixe `icon` de fora: o componente mostra as iniciais em um
// quadro neutro, sem inventar uma marca.

export const toolboxCategories: ToolboxCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    description: 'Interfaces, componentes e design systems.',
  },
  {
    id: 'backend',
    title: 'Backend',
    description: 'APIs, dados e integração com serviços.',
  },
  {
    id: 'devops',
    title: 'DevOps & Infra',
    description: 'Build, entrega e operação.',
  },
  {
    id: 'quality',
    title: 'Qualidade & Testes',
    description: 'Confiança para evoluir o código.',
  },
  {
    id: 'design',
    title: 'Design & Prototipação',
    description: 'Da descoberta ao handoff.',
  },
];

export const technologies: Technology[] = [
  // Frontend
  {
    id: 'react',
    name: 'React',
    categoryId: 'frontend',
    icon: 'react',
    level: 'principal',
    url: 'https://react.dev',
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    categoryId: 'frontend',
    icon: 'nextjs',
    level: 'complementar',
    url: 'https://nextjs.org',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    categoryId: 'frontend',
    icon: 'typescript',
    level: 'principal',
    url: 'https://www.typescriptlang.org',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    categoryId: 'frontend',
    icon: 'javascript',
    level: 'principal',
    url: 'https://developer.mozilla.org/docs/Web/JavaScript',
  },
  {
    id: 'angular',
    name: 'Angular',
    categoryId: 'frontend',
    icon: 'angular',
    level: 'principal',
    url: 'https://angular.dev',
  },
  {
    id: 'html5',
    name: 'HTML5',
    categoryId: 'frontend',
    icon: 'html5',
    level: 'complementar',
    url: 'https://developer.mozilla.org/docs/Web/HTML',
  },
  {
    id: 'css',
    name: 'CSS',
    categoryId: 'frontend',
    icon: 'css',
    level: 'complementar',
    url: 'https://developer.mozilla.org/docs/Web/CSS',
  },
  {
    id: 'sass',
    name: 'Sass',
    categoryId: 'frontend',
    icon: 'sass',
    level: 'complementar',
    url: 'https://sass-lang.com',
  },
  {
    id: 'mui',
    name: 'Material UI',
    categoryId: 'frontend',
    icon: 'mui',
    level: 'principal',
    url: 'https://mui.com',
  },
  {
    id: 'framer-motion',
    name: 'Framer Motion',
    categoryId: 'frontend',
    icon: 'framer',
    level: 'complementar',
    url: 'https://www.framer.com/motion/',
  },
  {
    id: 'vite',
    name: 'Vite',
    categoryId: 'frontend',
    icon: 'vite',
    level: 'complementar',
    url: 'https://vite.dev',
  },

  // Backend
  {
    id: 'nodejs',
    name: 'Node.js',
    categoryId: 'backend',
    icon: 'node',
    level: 'principal',
    url: 'https://nodejs.org',
  },
  {
    id: 'express',
    name: 'Express',
    categoryId: 'backend',
    icon: 'express',
    level: 'complementar',
    url: 'https://expressjs.com',
  },
  {
    id: 'graphql',
    name: 'GraphQL',
    categoryId: 'backend',
    icon: 'graphql',
    level: 'complementar',
    url: 'https://graphql.org',
  },
  {
    id: 'dotnet',
    name: '.NET / C#',
    categoryId: 'backend',
    icon: 'dotnet',
    level: 'complementar',
    url: 'https://dotnet.microsoft.com',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    categoryId: 'backend',
    icon: 'postgresql',
    level: 'principal',
    url: 'https://www.postgresql.org',
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    categoryId: 'backend',
    icon: 'mongodb',
    level: 'complementar',
    url: 'https://www.mongodb.com',
  },

  // DevOps & Infra
  {
    id: 'docker',
    name: 'Docker',
    categoryId: 'devops',
    icon: 'docker',
    level: 'principal',
    url: 'https://www.docker.com',
  },
  {
    id: 'aws',
    name: 'AWS',
    categoryId: 'devops',
    level: 'complementar',
    url: 'https://aws.amazon.com',
  },
  {
    id: 'github-actions',
    name: 'GitHub Actions',
    categoryId: 'devops',
    icon: 'githubactions',
    level: 'principal',
    url: 'https://github.com/features/actions',
  },
  {
    id: 'vercel',
    name: 'Vercel',
    categoryId: 'devops',
    icon: 'vercel',
    level: 'complementar',
    url: 'https://vercel.com',
  },
  {
    id: 'netlify',
    name: 'Netlify',
    categoryId: 'devops',
    icon: 'netlify',
    level: 'complementar',
    url: 'https://www.netlify.com',
  },
  {
    id: 'git',
    name: 'Git',
    categoryId: 'devops',
    icon: 'git',
    level: 'principal',
    url: 'https://git-scm.com',
  },
  {
    id: 'github',
    name: 'GitHub',
    categoryId: 'devops',
    icon: 'github',
    level: 'principal',
    url: 'https://github.com',
  },

  // Qualidade & Testes
  {
    id: 'vitest',
    name: 'Vitest',
    categoryId: 'quality',
    icon: 'vitest',
    level: 'principal',
    url: 'https://vitest.dev',
  },
  {
    id: 'jest',
    name: 'Jest',
    categoryId: 'quality',
    icon: 'jest',
    level: 'complementar',
    url: 'https://jestjs.io',
  },
  {
    id: 'cypress',
    name: 'Cypress',
    categoryId: 'quality',
    icon: 'cypress',
    level: 'complementar',
    url: 'https://www.cypress.io',
  },
  {
    id: 'eslint',
    name: 'ESLint',
    categoryId: 'quality',
    icon: 'eslint',
    level: 'principal',
    url: 'https://eslint.org',
  },
  {
    id: 'prettier',
    name: 'Prettier',
    categoryId: 'quality',
    icon: 'prettier',
    level: 'complementar',
    url: 'https://prettier.io',
  },

  // Design & Prototipação
  {
    id: 'figma',
    name: 'Figma',
    categoryId: 'design',
    icon: 'figma',
    level: 'principal',
    url: 'https://www.figma.com',
  },
  {
    id: 'storybook',
    name: 'Storybook',
    categoryId: 'design',
    icon: 'storybook',
    level: 'complementar',
    url: 'https://storybook.js.org',
  },
];
