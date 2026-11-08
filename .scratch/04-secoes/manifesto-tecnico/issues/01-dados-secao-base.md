# Issue — Manifesto Técnico: dados + seção base renderizada

Status: ready-for-agent

## Parent
PRD: `.scratch/04-secoes/manifesto-tecnico/PRD.md`

## What to build
Criar o módulo tipado `principles` com 5 a 7 princípios técnicos e renderizar a seção `#manifesto` como lista semântica, cada princípio com número, título, frase de impacto e explicação. Registrar a seção no fluxo da página após o mapa de maturidade em IA. O acabamento editorial fica para a próxima issue.

## Acceptance criteria
- [ ] `src/data/principles.ts` exporta os princípios com número, título, frase e explicação, sem hardcoded no componente
- [ ] Tipo `Principle` adicionado em `src/data/types.ts`
- [ ] Seção `#manifesto` renderiza todos os princípios na ordem definida
- [ ] Seção registrada no `App.tsx` e visível na página
- [ ] Texto dos princípios presente no HTML inicial (SEO)
- [ ] Teste unitário valida quantidade e estrutura do módulo

## Blocked by
- None - can start immediately
