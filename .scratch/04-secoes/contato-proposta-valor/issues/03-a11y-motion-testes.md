# Issue: Contato com Proposta de Valor: a11y + motion + testes de regressão

Status: done

## Parent
PRD: `.scratch/04-secoes/contato-proposta-valor/PRD.md`

## What to build
Fechar a entrega de acessibilidade e movimento: propostas anunciadas antes do formulário, foco visível em links e campos, reveal com `prefers-reduced-motion` respeitado e regressão completa do formulário de contato.

## Acceptance criteria
- [ ] Leitor de tela anuncia os cartões de proposta antes do formulário
- [ ] Foco visível em links, CTAs e campos do formulário
- [ ] Reveal discreto, desativado quando `prefers-reduced-motion` está ativo
- [ ] Testes existentes de contato (validação, envio, snackbar) continuam verdes
- [ ] Teste cobre renderização dos 3 cartões e CTAs
- [ ] `npm run test:unit` e `npx tsc --noEmit` passam

## Blocked by
- `.scratch/04-secoes/contato-proposta-valor/issues/02-visual-ctas-responsividade.md`
