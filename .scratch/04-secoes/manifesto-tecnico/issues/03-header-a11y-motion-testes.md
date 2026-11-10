# Issue: Manifesto Técnico: header + a11y + motion + testes

Status: done

## Parent
PRD: `.scratch/04-secoes/manifesto-tecnico/PRD.md`

## What to build
Integrar a seção ao menu do Header, aplicar foco visível, reveal com `prefers-reduced-motion` respeitado e concluir os testes da seção. Fechar a entrega com o manifesto navegável por teclado e anunciado corretamente por leitor de tela.

## Acceptance criteria
- [ ] Item no menu do Header linka para `#manifesto` e a âncora posiciona no título
- [ ] Foco visível em qualquer elemento interativo da seção
- [ ] Reveal discreto, desativado quando `prefers-reduced-motion` está ativo
- [ ] Leitor de tela anuncia cada princípio como unidade (título + explicação)
- [ ] Teste unitário cobre renderização e link do menu
- [ ] `npm run test:unit` e `npx tsc --noEmit` passam

## Blocked by
- `.scratch/04-secoes/manifesto-tecnico/issues/02-visual-editorial-responsividade.md`
