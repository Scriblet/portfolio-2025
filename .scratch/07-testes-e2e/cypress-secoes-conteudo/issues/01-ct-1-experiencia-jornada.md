# Issue — Seções Experiência e Jornada: cards, marcas e certificados

Status: ready-for-agent

## Parent
PRD: `.scratch/07-testes-e2e/cypress-secoes-conteudo/PRD.md`

## What to build
Specs das seções `#experience` e `#jornada`: 5 cards de experiência com empresa,
cargo, período e descrição não vazios, numeração `01..05` e as 5 marcas
`company-mark-{vivo,porto-seguro,thoughtworks,arcotech,finger}` renderizando `<svg>`;
5 itens da linha do tempo com `<time dateTime>` coerente, badge de tipo e link
"Ver certificado" externo seguro (target `_blank`, `rel` com `noopener`) quando houver.

## Acceptance criteria
- [ ] `experience-card-1..5` e sub-elementos de conteúdo presentes e visíveis
- [ ] Os 5 `company-mark-*` existem e contêm `<svg>` inline
- [ ] `jornada-item-*` (vivo, porto-seguro, thoughtworks, arcotech, finger-consultoria) presentes com `<time dateTime>` válido
- [ ] Links de certificado seguem o contrato externo (`https://`, `_blank`, `noopener`)
- [ ] Specs usam `waitForSection` antes de asserir

## Blocked by
- 02-ci-2-comandos-servidor.md
