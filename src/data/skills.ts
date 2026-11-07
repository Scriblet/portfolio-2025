import type { Skill } from './types';

// Fonte única das habilidades exibidas na seção #skills.
// `icon` referencia uma chave do mapa `skillIcons` em src/pages/skills/skills.tsx.
export const skills: Skill[] = [
  {
    icon: 'code',
    title: 'React/Next.js',
    description: 'Desenvolvimento de aplicações modernas e performáticas',
    tags: ['Componentes', 'SSR', 'Gerenciamento de Estado', 'Hooks'],
  },
  {
    icon: 'design',
    title: 'UX Engineering',
    description: 'Ponte entre design e desenvolvimento',
    tags: ['Figma', 'Design Systems', 'Prototipação'],
  },
  {
    icon: 'api',
    title: 'APIs REST/GraphQL',
    description: 'Integração com back-end e serviços externos',
    tags: ['Fetch API', 'Axios', 'Autenticação'],
  },
  {
    icon: 'accessibility',
    title: 'Acessibilidade Digital',
    description: 'Desenvolvimento inclusivo seguindo WCAG 2.2 AA',
    tags: ['Navegação', 'Leitores de Tela', 'Contraste'],
  },
  {
    icon: 'storage',
    title: 'Bancos de Dados',
    description: 'Modelagem e consulta eficiente',
    tags: ['PostgreSQL', 'MongoDB', 'SQL'],
  },
  {
    icon: 'build',
    title: 'Testes Automatizados',
    description: 'Garantia de qualidade e acessibilidade',
    tags: ['Testes E2E', 'Jest', 'Cypress'],
  },
  {
    icon: 'cloud',
    title: 'Cloud & DevOps',
    description: 'Deploy e monitoramento de aplicações',
    tags: ['AWS', 'GitHub Actions', 'Docker'],
  },
  {
    icon: 'code',
    title: 'TypeScript',
    description: 'Tipagem para código mais seguro',
    tags: ['Interfaces', 'Tipos Básicos', 'Props'],
  },
  {
    icon: 'design',
    title: 'UI Development',
    description: 'Implementação pixel-perfect',
    tags: ['Material UI', 'Responsividade', 'Microinterações'],
  },
  {
    icon: 'build',
    title: 'Metodologias Ágeis',
    description: 'Trabalho em equipe eficiente',
    tags: ['Scrum', 'Sprints', 'Kanban', 'Pair Programming', 'Scrumban'],
  },
];
