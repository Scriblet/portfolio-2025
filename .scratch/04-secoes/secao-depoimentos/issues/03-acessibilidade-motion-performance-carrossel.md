# Issue — Acessibilidade, motion e performance do carrossel

Status: ready-for-agent

## Parent
PRD: `.scratch/04-secoes/secao-depoimentos/PRD.md`

## What to build
Região de carrossel com aria-live e roledescription, fotos otimizadas com dimensões reservadas, `prefers-reduced-motion` desligando auto-avanço e animações.

## Acceptance criteria
- [ ] Região com `aria-live="polite"` anuncia posição ("Depoimento 2 de 5")
- [ ] Navegação por teclado alcança controles em ordem lógica com foco visível
- [ ] `prefers-reduced-motion` desabilita auto-avanço e transições (teste com emulação)
- [ ] Fotos otimizadas com dimensões reservadas, lazy loading e sem CLS
- [ ] Texto cresce proporcionalmente em zoom de 200% sem sobrepor foto ou controles

## Blocked by
- `.scratch/04-secoes/secao-depoimentos/issues/02-carrossel-navegavel-indicadores-controles-condicionais.md`
