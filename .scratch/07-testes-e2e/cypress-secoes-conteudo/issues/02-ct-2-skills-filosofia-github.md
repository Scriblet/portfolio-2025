# Issue — Seções Skills, Filosofia e banner GitHub

Status: ready-for-agent

## Parent
PRD: `.scratch/07-testes-e2e/cypress-secoes-conteudo/PRD.md`

## What to build
Specs das seções de skills, filosofia e github: os 10 `skill-card-*` (com os slugs
atuais, inclusive os que contêm `/`, `&` e acentos) renderizam com título e ao
menos uma tag cada; `filosofia-section` tem imagem com alt descritivo;
`github-section` tem os links externos para `https://github.com/scriblet`
(`github-link` e logo) com target `_blank` e `rel` seguro.

## Acceptance criteria
- [ ] Os 10 `skill-card-*` estão presentes, cada um com título e tags não vazias
- [ ] `filosofia-section` visível com `<img alt>` não vazio e descritivo
- [ ] `github-link` e o logo do GitHub apontam para o perfil em `https://github.com/scriblet`, em nova aba
- [ ] Contrato externo (`https://`, `_blank`, `noopener noreferrer`) validado por helper
- [ ] Specs não colam na copy literal (presença/coerência, não texto integral)

## Blocked by
- 02-ci-2-comandos-servidor.md
