---
title: SeÃ§Ã£o de Contato imersiva
status: done
wave: 7
scope: site
owner: agent
---

# PRD â€” SeÃ§Ã£o de Contato imersiva

## Resumo / objetivo

Reformular o contato como o fechamento do portfÃ³lio: headline oversized, card
de vidro com formulÃ¡rio e CTA, mantendo validaÃ§Ã£o, honeypot, endpoint
`/api/contact`, snackbar e estado offline.

## Estado atual

- `src/pages/formContact/contactForm.tsx` usa `TextField` e `Button` MUI.
- O formulÃ¡rio jÃ¡ tem validaÃ§Ã£o, honeypot, tratamento de 429, offline e
  `aria-live` via snackbar.
- O layout Ã© uma faixa com texto Ã  esquerda e formulÃ¡rio Ã  direita.

## DireÃ§Ã£o visual (referÃªncia `/immersive`)

- Fundo `var(--void)`.
- Label "Contato / 08", headline Syne grande e corpo Inter.
- Card de formulÃ¡rio `GlassPanel` com labels mono e inputs do tema.
- BotÃ£o submit pill, com estado de loading.
- Fine print com e-mail e localizaÃ§Ã£o reais.
- Wordmark final opcional.

## Requisitos funcionais

1. Refatorar o layout para o fechamento editorial imersivo.
2. Manter todos os comportamentos do formulÃ¡rio atuais.
3. Usar `GlassPanel` e os inputs do tema global.
4. Manter `h2` da seÃ§Ã£o e labels associados.
5. Garantir feedback acessÃ­vel (`aria-live`/snackbar).
6. Respeitar reduced motion.

## CritÃ©rios de aceitaÃ§Ã£o

- [x] Campos nome, e-mail e mensagem continuam validando.
- [x] Honeypot, 429, offline e sucesso continuam tratados.
- [x] Card usa vidro e tokens, sem hex hardcoded.
- [x] Inputs tÃªm labels associados e foco visÃ­vel.
- [x] Contraste AA em labels e helper text.
- [x] Sem overflow em 320â€“1920px.
- [x] Testes de contato continuam passando.

## DependÃªncias

- `design-system-immersive` (onda 6).
- `motion-a11y-performance` (onda 6).

## Arquivos envolvidos

- `src/pages/formContact/contactForm.tsx`
- `src/components/DownloadCvButton.tsx`
- `src/components/feedback/SnackbarProvider.tsx`
