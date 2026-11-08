import type { Experience } from './types';

// Fonte única das experiências exibidas na seção #experience.
// Ordem: mais recente primeiro. Períodos extraídos do currículo de Lucas Nonato.
export const experiences: Experience[] = [
  {
    id: 1,
    number: '01',
    company: 'Vivo (Telefônica Brasil)',
    position: 'Consultor de IA / AI Software Engineer',
    period: 'mar/2026 – atual',
    description:
      'Atuo na evolução da plataforma Aura, integrando LLMs, agentes de IA e APIs em arquiteturas escaláveis com TypeScript, Node.js e práticas de MLOps.',
  },
  {
    id: 2,
    number: '02',
    company: 'Porto Seguro',
    position: 'Desenvolvedor de Software Pleno',
    period: 'jan/2024 – mar/2026',
    description:
      'Desenvolvi aplicações web e serviços com React, TypeScript, Node.js e APIs REST, focando em performance, manutenibilidade e integração entre sistemas.',
  },
  {
    id: 3,
    number: '03',
    company: 'Thoughtworks',
    position: 'Consultant Developer',
    period: 'abr/2022 – ago/2023',
    description:
      'Atuei com React, TypeScript, TDD e Node.js em times de consultoria, participando de iniciativas para tornar produtos 100% acessíveis segundo WCAG.',
  },
  {
    id: 4,
    number: '04',
    company: 'ArcoTech (Escola em Movimento)',
    position: 'Full Stack Developer',
    period: 'jun/2021 – mar/2022',
    description:
      'Desenvolvi sistemas web com AngularJS, C#, ASP.NET MVC, NHibernate e Dapper, entregando front-end responsivo e back-end robusto.',
  },
  {
    id: 5,
    number: '05',
    company: 'Finger Consultoria',
    position: 'Founder & UX Designer',
    period: 'ago/2019 – jun/2021',
    description:
      'Fundei a Finger Consultoria para serviços de consultoria de carreira. Cuidei de UX research, prototipação e design de interfaces com Figma, Sketch e testes com usuários.',
  },
];
