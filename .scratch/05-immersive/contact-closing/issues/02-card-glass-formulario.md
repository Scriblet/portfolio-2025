# Issue — Card de glass com formulário de contato

Status: done

## Parent

PRD: `.scratch/05-immersive/contact-closing/PRD.md`

## What to build

Implementar o card de glass contendo formulário de contato com campos nome, e-mail, mensagem e botão enviar. Reaproveitar validação e endpoint `/api/contact` do portfólio principal quando possível.

## Acceptance criteria

- [x] Card de glass usando tokens de vidro do design system.
- [x] Campos: nome, e-mail, mensagem (todos obrigatórios).
- [x] Labels em Sora 10px uppercase associadas aos inputs.
- [x] Inputs com fundo `rgba(255,255,255,0.04)`, borda `rgba(255,255,255,0.1)`, raio 12px, altura mínima 48px.
- [x] Botão submit como `PillButton` sólido, altura ≥44px.
- [x] Validação nativa + feedback acessível via `role="status" aria-live="polite"`.
- [x] Integração com endpoint `/api/contact` ou lógica equivalente.

## Blocked by

- `.scratch/05-immersive/contact-closing/issues/01-layout-headline-wordmark.md`
- `.scratch/05-immersive/design-system-immersive/issues/03-botoes-foco-contraste.md`
