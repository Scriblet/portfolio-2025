# Issue: Mapa de Maturidade em IA: header + a11y + motion + testes

Status: done

## Parent
PRD: `.scratch/04-secoes/mapa-maturidade-ia/PRD.md`

## What to build
Integrar a seção ao menu do Header, aplicar foco visível, reveal com `prefers-reduced-motion` respeitado e concluir os testes da seção. Fechar a entrega com a seção navegável por teclado e anunciada corretamente por leitor de tela.

## Acceptance criteria
- [ ] Item no menu do Header linka para `#ia-maturity` e a âncora posiciona no título
- [ ] Foco visível em qualquer elemento interativo da seção
- [ ] Reveal discreto com stagger, desativado quando `prefers-reduced-motion` está ativo
- [ ] Leitor de tela anuncia cada camada como item com título e descrição
- [ ] Teste unitário cobre renderização, ordenação e link do menu
- [ ] `npm run test:unit` e `npx tsc --noEmit` passam

## Blocked by
- `.scratch/04-secoes/mapa-maturidade-ia/issues/02-mapa-visual-responsividade.md`
