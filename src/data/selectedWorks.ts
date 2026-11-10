import type { SelectedWork } from './types';

// Fonte única dos cases exibidos em #selected-work.
//
// Cada case prova uma camada do mapa de IA e/ou um princípio do manifesto.
// Períodos, empresas e cargos vêm do currículo (public/cv/lucas-nonato-cv.pdf);
// nenhum número de resultado é inventado – quando não há métrica auditável,
// o texto descreve o tipo de resultado e o aprendizado.
export const selectedWorks: SelectedWork[] = [
  {
    id: 'vivo-aura',
    number: '01',
    company: 'Vivo (Telefônica Brasil)',
    period: 'mar/2026 – atual',
    start: '2026-03',
    role: 'Consultor de IA / AI Software Engineer',
    headline: 'Agentes de IA em produção, não em demonstração',
    context:
      'A plataforma Aura evolui com LLMs, agentes e APIs em um produto de grande porte, com muitos consumidores internos e regras de segurança que não podem ser ignoradas.',
    challenge:
      'Integrar modelos generativos sem trocar previsibilidade por novidade: latência, custo, permissões e comportamento em falha precisavam caber na operação.',
    action:
      'Integro LLMs e agentes via API em TypeScript e Node.js, com tool calling, limites de permissão, validação de resposta e fallback. Cuido da fronteira de segurança com OAuth2 e mTLS e levo as mudanças pelo pipeline de CI/CD.',
    outcome:
      'Agentes rodam em produção com revisão humana nos pontos de decisão. O aprendizado: confiabilidade e governança são o que separam um agente de demonstração de um agente de produto.',
    stack: [
      'TypeScript',
      'Node.js',
      'LLMs',
      'Agentes',
      'OAuth2',
      'mTLS',
      'CI/CD',
    ],
  },
  {
    id: 'porto-seguro',
    number: '02',
    company: 'Porto Seguro',
    period: 'jan/2024 – mar/2026',
    start: '2024-01',
    role: 'Desenvolvedor de Software Pleno',
    headline: 'Evoluir produtos críticos sem parar a entrega',
    context:
      'Produtos digitais de seguros, com regras de negócio densas e vários sistemas precisando conversar sem quebrar jornadas sensíveis.',
    challenge:
      'Evoluir aplicações web e serviços em um ambiente com legado, mantendo performance e manutenibilidade sem transformar cada entrega em retrabalho.',
    action:
      'Trabalhei com React, TypeScript, Node.js e APIs REST em refatorações incrementais, cobertura de testes e revisão de código focada em legibilidade e contratos claros.',
    outcome:
      'Entregas mais previsíveis e menos regressão. O aprendizado: negociar escopo técnico com produto usando risco concreto, não preferência pessoal.',
    stack: [
      'React',
      'TypeScript',
      'Node.js',
      'APIs REST',
      'Testes automatizados',
    ],
  },
  {
    id: 'thoughtworks',
    number: '03',
    company: 'Thoughtworks',
    period: 'abr/2022 – ago/2023',
    start: '2022-04',
    role: 'Consultant Developer',
    headline: 'Acessibilidade como critério de pronto',
    context:
      'Consultoria em produtos de clientes diferentes, com times heterogêneos e prazos que raramente reservam espaço para qualidade no fim.',
    challenge:
      'Levar produtos a conformidade WCAG sem tratá-la como fase final, e sustentar TDD em times que ainda estavam criando o hábito de testar.',
    action:
      'Conduzi auditorias de semântica, teclado e contraste; implementei componentes acessíveis em React e Node.js; usei TDD e pair programming para espalhar o critério pelo time.',
    outcome:
      'Acessibilidade entrou no fluxo, não no backlog de polimento. O aprendizado: defender qualidade com evidência funciona melhor do que defender com opinião.',
    stack: ['React', 'TypeScript', 'Node.js', 'TDD', 'WCAG'],
  },
  {
    id: 'arcotech',
    number: '04',
    company: 'ArcoTech (Escola em Movimento)',
    period: 'jun/2021 – mar/2022',
    start: '2021-06',
    role: 'Full Stack Developer',
    headline: 'Um produto educacional inteiro, do front ao banco',
    context:
      'Uma operação educacional precisava de sistema web próprio, e a equipe era pequena o bastante para que cada pessoa cobrisse mais de uma camada.',
    challenge:
      'Entregar front responsivo e back-end robusto com uma stack legada – AngularJS, C#, ASP.NET MVC, NHibernate e Dapper – sem tempo para arquitetura cerimonial.',
    action:
      'Modelei dados, implementei endpoints, ajustei ORM e consultas e construí a interface responsiva, tomando decisões de simplicidade a cada camada.',
    outcome:
      'Produto entregue de ponta a ponta. O aprendizado: full stack não é saber tudo, é fechar o loop entre interface, regra e dado.',
    stack: ['AngularJS', 'C#', 'ASP.NET MVC', 'NHibernate', 'Dapper'],
  },
  {
    id: 'finger',
    number: '05',
    company: 'Finger Consultoria',
    period: 'ago/2019 – jun/2021',
    start: '2019-08',
    role: 'Founder & UX Designer',
    headline: 'Fundar uma consultoria e aprender a ouvir antes de desenhar',
    context:
      'Consultoria própria de carreira, criada para ajudar pessoas a reposicionar a trajetória profissional com método, não com achismo.',
    challenge:
      'Validar o serviço, conduzir pesquisa e entregar design sem equipe, conciliando escopo comercial e profundidade de descoberta.',
    action:
      'Conduzi UX research, prototipação em Figma e Sketch e testes com usuários; transformei achados em decisões de interface e em propostas comerciais claras.',
    outcome:
      'Um método de pesquisa que uso até hoje em produto. O aprendizado: produto começa na conversa, não na tela.',
    stack: ['UX Research', 'Figma', 'Sketch', 'Testes com usuários'],
  },
];
