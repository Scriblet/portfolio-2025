# Issue: Estados do formulário e reduced motion do Contato

Status: done

## Parent

PRD: `.scratch/05-immersive/contact-closing/PRD.md`

## What to build

Implementar estados de loading, sucesso e erro do formulário, garantir responsividade do card e respeitar `prefers-reduced-motion`.

## Acceptance criteria

- [x] Botão exibe estado de loading durante submit.
- [x] Mensagem de sucesso/erro anunciada via `aria-live`.
- [x] Formulário limpo após envio bem-sucedido.
- [x] Card e headline não transbordam em mobile.
- [x] `scrollWidth === innerWidth` em 320/390/768/1440.
- [x] Com `prefers-reduced-motion`, formulário e texto visíveis sem animação.
- [x] `scroll-margin-top` aplicado para a navegação fixa.

## Blocked by

- `.scratch/05-immersive/contact-closing/issues/02-card-glass-formulario.md`
- `.scratch/05-immersive/contact-closing/issues/03-links-sociais-fine-print.md`
