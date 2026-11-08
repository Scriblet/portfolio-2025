# Issue — Mapa de Maturidade em IA: dados + seção base renderizada

Status: ready-for-agent

## Parent
PRD: `.scratch/04-secoes/mapa-maturidade-ia/PRD.md`

## What to build
Criar o módulo tipado `aiMaturity` com as 5 camadas de maturidade em IA e renderizar a seção `#ia-maturity` como lista semântica de camadas, com título, descrição e capacidades. Registrar a seção no fluxo da página logo após Skills. Nesta fatia o visual pode ser simples; o mapa gráfico fica para a próxima issue.

## Acceptance criteria
- [ ] `src/data/aiMaturity.ts` exporta as 5 camadas com nível, título, descrição, capacidades e exemplo, sem hardcoded no componente
- [ ] Tipo `AiMaturityLevel` adicionado em `src/data/types.ts`
- [ ] Seção `#ia-maturity` renderiza todas as camadas em ordem crescente de maturidade
- [ ] Seção registrada no `App.tsx` e visível na página
- [ ] Texto das camadas presente no HTML inicial (SEO)
- [ ] Teste unitário valida quantidade e ordenação do módulo

## Blocked by
- None - can start immediately
