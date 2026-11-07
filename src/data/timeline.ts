import type { Milestone } from './types';

// Fonte única da seção #jornada.
//
// Os períodos abaixo vieram do preview aprovado do portfólio. Se algum período
// não estiver exato, ajuste apenas este arquivo: a timeline reordena sozinha
// pelo campo `date` (mais recente primeiro).
export const milestones: Milestone[] = [
  {
    id: 'porto-seguro',
    type: 'profissional',
    title: 'Desenvolvedor Full-Stack',
    institution: 'Porto Seguro',
    period: '2024 — Atual',
    date: '2024-01',
    description:
      'Portal de gestão de sinistros com TypeScript, RxJS e Angular Material, com foco em performance via lazy loading e pré-carregamento inteligente.',
  },
  {
    id: 'thoughtworks',
    type: 'profissional',
    title: 'Consultant Developer',
    institution: 'Thoughtworks',
    period: '2022 — 2024',
    date: '2022-01',
    description:
      'Consultoria em React, TypeScript, TDD e Node.js, incluindo um projeto para tornar um aplicativo 100% acessível seguindo WCAG.',
  },
  {
    id: 'arco-educacao',
    type: 'profissional',
    title: 'Desenvolvedor de Software',
    institution: 'Arco Educação',
    period: '2020 — 2022',
    date: '2020-01',
    description:
      'Sistemas web com AngularJS, C# e ASP.NET MVC, front-end responsivo e back-end com NHibernate e Dapper.',
  },
  {
    id: 'aws-cloud-practitioner',
    type: 'certificacao',
    title: 'AWS Cloud Practitioner',
    institution: 'Amazon Web Services',
    period: '2019',
    date: '2019-01',
    description: 'Primeira certificação em cloud computing.',
  },
];

/** Marcos em ordem cronológica decrescente (mais recente primeiro). */
export const sortedMilestones = [...milestones].sort((a, b) =>
  b.date.localeCompare(a.date),
);
