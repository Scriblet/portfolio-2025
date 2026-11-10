import type { ValueProposition } from './types';

// Fonte única das propostas exibidas em #contact.
//
// Cada cartão preenche o formulário com um texto inicial. O ganho é uma linha
// concreta, sem promessa que não possa ser sustentada numa conversa.
export const valuePropositions: ValueProposition[] = [
  {
    id: 'ia-no-produto',
    number: '01',
    title: 'Integrar IA no seu produto',
    description:
      'Levo LLMs, agentes e RAG do conceito à produção, com governança e observabilidade.',
    benefit:
      'Do protótipo ao agente em produção, com custo, latência e falha sob controle.',
    ctaLabel: 'Falar sobre IA',
    prompt: 'Olá, quero falar sobre integrar IA no meu produto.',
  },
  {
    id: 'times-com-qualidade',
    number: '02',
    title: 'Acelerar times com qualidade',
    description:
      'Refatoro legados, subo cobertura de testes e reduzo débito técnico sem parar a entrega.',
    benefit:
      'Entrega contínua com menos regressão e um time que não depende de uma pessoa só.',
    ctaLabel: 'Falar sobre o time',
    prompt: 'Olá, quero falar sobre acelerar o time com qualidade.',
  },
  {
    id: 'arquitetura-escala',
    number: '03',
    title: 'Arquitetar para escala',
    description:
      'Desenho sistemas claros, documentados e prontos para crescer com o negócio.',
    benefit:
      'Decisões registradas que o time consegue manter sem depender do autor original.',
    ctaLabel: 'Falar sobre arquitetura',
    prompt: 'Olá, quero falar sobre arquitetar para escala.',
  },
];
