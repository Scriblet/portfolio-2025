# Issue — Cobrir falha de chunk com retry e provar lazy E2E

Status: ready-for-agent

## Parent
PRD: `.scratch/01-tecnicos/code-splitting-lazy/PRD.md`

## What to build
Se um pedaço adiado falhar ao carregar, usuário vê fallback com nova tentativa e a página segue usável (contato sempre acessível); usuários com movimento reduzido têm menos trabalho de animação no carregamento; E2E prova o carregamento sob demanda.

## Acceptance criteria
- [ ] Falha simulada de chunk exibe fallback com retry; visitante não perde acesso às demais seções/contato
- [ ] Teste E2E prova chunk lazy carregado sob scroll e falha se voltar a carregar tudo upfront
- [ ] Com `prefers-reduced-motion`, trabalho de animação no carregamento é reduzido
- [ ] Lighthouse sem regressão de LCP/CLS/INP em relação ao baseline

## Blocked by
- 03-cs-3-lazy-demais-imagens.md
