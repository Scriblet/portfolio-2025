# Issue — Documentação e testes do design system

Status: done

## Parent

PRD: `.scratch/05-immersive/design-system-immersive/PRD.md`

## What to build

Documentar os tokens e primitivos do design system imersivo no próprio PRD ou em um arquivo de referência curto, e adicionar testes unitários cobrindo tokens, primitivos e regras de reduced motion.

## Acceptance criteria

- [x] PRD atualizado com exemplos de uso de cada primitivo.
- [x] Testes unitários validam exportação e valores dos tokens.
- [x] Testes validam variantes de `PillButton`, `SectionLabel` e `GlassPanel`.
- [x] Teste confirma que `GrainOverlay` não intercepta eventos de ponteiro.
- [x] Teste confirma que `prefers-reduced-motion` zera transições no escopo.
- [x] `npm run test:unit` passa.

## Blocked by

- `.scratch/05-immersive/design-system-immersive/issues/02-vidro-grao-rotulos.md`
- `.scratch/05-immersive/design-system-immersive/issues/03-botoes-foco-contraste.md`
