# Issue — Selected Work: a11y + motion + testes

Status: ready-for-agent

## Parent
PRD: `.scratch/04-secoes/selected-work/PRD.md`

## What to build
Fechar a entrega de acessibilidade e movimento: leitura em sequência por leitor de tela, foco visível, reveal com `prefers-reduced-motion` respeitado e testes de renderização/ordenação. Garantir que a remoção de Experience/Timeline não quebrou testes existentes.

## Acceptance criteria
- [ ] Leitor de tela anuncia cada case com heading, período, empresa e descrição em sequência
- [ ] Foco visível em links e elementos interativos
- [ ] Reveal discreto, desativado quando `prefers-reduced-motion` está ativo
- [ ] Testes de renderização, ordenação e âncoras passam
- [ ] Testes antigos de Experience/Timeline removidos ou atualizados
- [ ] `npm run test:unit` e `npx tsc --noEmit` passam

## Blocked by
- `.scratch/04-secoes/selected-work/issues/02-narrativa-cases-responsivo.md`
- `.scratch/04-secoes/selected-work/issues/03-ancoras-antigas-header.md`
