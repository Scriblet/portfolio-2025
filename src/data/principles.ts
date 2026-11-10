import type { Principle } from './types';

// Fonte única dos princípios exibidos em #manifesto.
// A ordem é editorial, não hierárquica: abre por propósito, fecha por entrega.
export const principles: Principle[] = [
  {
    id: 'codigo-meio',
    number: '01',
    title: 'Código é meio, não fim.',
    impact: 'O problema vem antes da stack.',
    consequence:
      'Já vi sistema tecnicamente elegante que ninguém usava. Entender o problema e medir o custo da solução vem antes de escolher a ferramenta.',
  },
  {
    id: 'acessibilidade-padrao',
    number: '02',
    title: 'Acessibilidade é padrão, não feature.',
    impact: 'Se não funciona para todos, não está pronto.',
    consequence:
      'Semântica, teclado e contraste entram no primeiro commit, não no backlog de polimento.',
  },
  {
    id: 'ia-intencao',
    number: '03',
    title: 'IA amplifica intenção.',
    impact: 'Sem direção, é ruído com latência.',
    consequence:
      'Modelo não conserta requisito vago. Meu trabalho é dar contexto, limite e critério de sucesso antes de pedir uma resposta.',
  },
  {
    id: 'simples-escala',
    number: '04',
    title: 'Simples escala.',
    impact: 'Complexidade é dívida com juros altos.',
    consequence:
      'Prefiro uma solução chata que o time inteiro entende a uma arquitetura brilhante que só uma pessoa mantém.',
  },
  {
    id: 'aprendizado-continuo',
    number: '05',
    title: 'Aprendizado contínuo é o único estado estável.',
    impact: 'Toda solução vira legado. A curiosidade fica.',
    consequence:
      'Saí do front para full stack, do full stack para IA. O que não mudou foi a disposição de recomeçar como iniciante.',
  },
  {
    id: 'colaboracao-arquitetura',
    number: '06',
    title: 'Colaboração é arquitetura.',
    impact: 'Time que não conversa constrói acoplamento.',
    consequence:
      'Documentação, revisão e decisões explícitas são infraestrutura. O código é consequência.',
  },
  {
    id: 'shipar-design',
    number: '07',
    title: 'Shipar faz parte do design.',
    impact: 'Pronto é melhor que perfeito, desde que o pronto seja honesto.',
    consequence:
      'Sistema bonito que não chega em produção é hipótese. Entrego em fatias pequenas, com critério de pronto.',
  },
];
