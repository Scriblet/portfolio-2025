import type { Experience } from './types';

// Fonte única das experiências exibidas na seção #experience.
// A ordem do array é a ordem renderizada nos cards.
export const experiences: Experience[] = [
  {
    id: 1,
    number: '01',
    company: 'Porto Seguro',
    position: 'Desenv. de Software Full-Stack',
    description:
      'Desenvolvo um portal de gestão de sinistros usando TypeScript, RxJS e Angular Material. Foco em performance com lazy loading e pré-carregamento inteligente.',
  },
  {
    id: 2,
    number: '02',
    company: 'Thoughtworks',
    position: 'Consultant Developer',
    description:
      'Atuei como Consultant Developer com React, TypeScript, TDD e NodeJS. Participei de projeto para tornar aplicativo 100% acessível seguindo WCAG',
  },
  {
    id: 3,
    number: '03',
    company: 'Arco Educação',
    position: 'Desenv. de Software',
    description:
      'Desenvolvi sistemas web com AngularJS, C# e ASP.NET MVC. Trabalhei em front-end responsivo e back-end robusto com NHibernate e Dapper.',
  },
  {
    id: 4,
    number: '04',
    company: 'Finger Consultoria',
    position: 'UX Designer',
    description:
      'Fundei a Finger Consultoria para fornecer serviços de consultoria de carreira para estudantes.',
  },
];
