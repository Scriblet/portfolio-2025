# Issue: Tema claro/escuro: alternância, persistência e meta theme-color

Status: done

## Parent
PRD: `.scratch/07-testes-e2e/cypress-smoke-navegacao/PRD.md`

## What to build
Spec de tema: `theme-toggle` alterna `data-mui-color-scheme` no `<html>`
(light/dark), atualiza `<meta name="theme-color">` e `aria-pressed`/`aria-label`
do botão; a preferência persiste em `localStorage["portfolio-color-mode"]` após
reload; visita sem preferência gravada parte do tema escuro (default); a página
`/immersive` herda o tema persistido.

## Acceptance criteria
- [ ] Toggle muda `data-mui-color-scheme` de `dark` para `light` e vice-versa
- [ ] Após reload, o tema escolhido continua aplicado (localStorage lido)
- [ ] Primeira visita sem localStorage inicia em `dark`
- [ ] `/immersive` reflete o tema persistido (classes/estado coerente, sem ThemeToggle na página)
- [ ] Asserções baseadas em atributos/estado, não em classes CSS

## Blocked by
- 02-ci-2-comandos-servidor.md
