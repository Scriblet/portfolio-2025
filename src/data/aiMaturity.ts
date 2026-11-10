import type { AiMaturityLayer } from './types';

// Fonte única das camadas exibidas em #ia-maturity.
// A ordem é a progressão do mapa: produto → integração → contexto → agentes →
// operação. O texto é copy fechada (ver .scratch/04-secoes/BRIEF-onda-8).
export const aiMaturityLayers: AiMaturityLayer[] = [
  {
    id: 'produto-uso',
    number: '01',
    title: 'Produto e uso',
    thesis: 'IA só vale quando muda o trabalho de alguém.',
    capabilities: [
      'Mapear onde IA gera ganho real',
      'Revisão de código e documentação assistidas',
      'Prototipar para validar hipótese antes de investir',
    ],
    evidence: 'rotina de engenharia em produto',
  },
  {
    id: 'integracao-modelos',
    number: '02',
    title: 'Integração de modelos',
    thesis: 'Modelo bom é modelo que aguenta produção.',
    capabilities: [
      'LLMs via API em TypeScript/Node',
      'Embeddings e busca',
      'Validação de resposta, retry e fallback',
    ],
    evidence: 'plataforma de IA de grande porte',
  },
  {
    id: 'contexto-rag',
    number: '03',
    title: 'Contexto e RAG',
    thesis: 'Resposta boa começa com contexto bom.',
    capabilities: [
      'Chunking e indexação',
      'Vector stores',
      'Prompt estruturado e avaliação de relevância',
    ],
    evidence: 'estudo aplicado e protótipos',
  },
  {
    id: 'agentes-orquestracao',
    number: '04',
    title: 'Agentes e orquestração',
    thesis:
      'Agente é software com ferramentas, não chatbot com personalidade.',
    capabilities: [
      'Tool calling',
      'Memória e estado',
      'Fluxos multi-step com revisão humana',
      'Limites e permissões',
    ],
    evidence: 'em produção na plataforma de IA',
  },
  {
    id: 'operacao-governanca',
    number: '05',
    title: 'Operação e governança',
    thesis: 'O que não é observado não é confiável.',
    capabilities: [
      'Traces de prompt',
      'Avaliação e regressão',
      'Custo e latência',
      'Privacidade, OAuth2/mTLS e versionamento',
    ],
    evidence: 'práticas de CI/CD e segurança aplicadas a produto',
  },
];

/** Total formatado para o rail ("05"). */
export const aiMaturityTotal = String(aiMaturityLayers.length).padStart(2, '0');
