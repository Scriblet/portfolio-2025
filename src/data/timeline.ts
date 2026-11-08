import type { Milestone } from './types';

// Fonte única da seção #jornada.
//
// Os marcos abaixo espelham as experiências reais de `src/data/experiences.ts`
// (currículo de Lucas Nonato). Se algum período mudar, ajuste apenas este
// arquivo: a timeline reordena sozinha pelo campo `date`.
export const milestones: Milestone[] = [
  {
    id: 'vivo',
    type: 'profissional',
    title: 'Consultor de IA / AI Software Engineer',
    institution: 'Vivo (Telefônica Brasil)',
    period: 'mar/2026 – atual',
    date: '2026-03',
    description:
      'Atuo na evolução da plataforma Aura, integrando LLMs, agentes de IA e APIs em arquiteturas escaláveis com TypeScript, Node.js e práticas de MLOps.',
  },
  {
    id: 'porto-seguro',
    type: 'profissional',
    title: 'Desenvolvedor de Software Pleno',
    institution: 'Porto Seguro',
    period: 'jan/2024 – mar/2026',
    date: '2024-01',
    description:
      'Desenvolvi aplicações web e serviços com React, TypeScript, Node.js e APIs REST, focando em performance, manutenibilidade e integração entre sistemas.',
  },
  {
    id: 'thoughtworks',
    type: 'profissional',
    title: 'Consultant Developer',
    institution: 'Thoughtworks',
    period: 'abr/2022 – ago/2023',
    date: '2022-04',
    description:
      'Atuei com React, TypeScript, TDD e Node.js em times de consultoria, participando de iniciativas para tornar produtos 100% acessíveis segundo WCAG.',
  },
  {
    id: 'arcotech',
    type: 'profissional',
    title: 'Full Stack Developer',
    institution: 'ArcoTech (Escola em Movimento)',
    period: 'jun/2021 – mar/2022',
    date: '2021-06',
    description:
      'Desenvolvi sistemas web com AngularJS, C#, ASP.NET MVC, NHibernate e Dapper, entregando front-end responsivo e back-end robusto.',
  },
  {
    id: 'finger-consultoria',
    type: 'profissional',
    title: 'Founder & UX Designer',
    institution: 'Finger Consultoria',
    period: 'ago/2019 – jun/2021',
    date: '2019-08',
    description:
      'Fundei a Finger Consultoria para serviços de consultoria de carreira. Cuidei de UX research, prototipação e design de interfaces com Figma, Sketch e testes com usuários.',
  },
];

/** Marcos em ordem cronológica decrescente (mais recente primeiro). */
export const sortedMilestones = [...milestones].sort((a, b) =>
  b.date.localeCompare(a.date),
);
