# Issue: Responsividade, links de certificado e acessibilidade

Status: ready-for-agent

## Parent
PRD: `.scratch/04-secoes/secao-timeline/PRD.md`

## What to build
Layout alternado no desktop e coluna única no mobile, links de certificado seguros em nova aba, lista ordenada semântica e sem bibliotecas pesadas.

## Acceptance criteria
- [ ] Mobile mostra coluna única sem sobreposição de linha, marcadores ou datas
- [ ] Links de certificados têm `target="_blank"`, `rel="noopener"` e indicação de link externo
- [ ] Marcos como lista ordenada com período, título e descrição anunciados em sequência
- [ ] Navegação por teclado alcança marcos em ordem com foco visível
- [ ] Teste E2E valida layout mobile, links seguros e conteúdo semântico

## Blocked by
- `.scratch/04-secoes/secao-timeline/issues/01-dados-centralizados-timeline-cronologica-ancora-menu.md`
