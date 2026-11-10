# Issue — Árvore do projeto e design system documentados

Status: done

## Parent
PRD: `.scratch/08-correcoes-review/readme-consistencia/PRD.md`

## What to build
Atualizar a estrutura de diretórios do README (`src/data`, `src/theme`,
`src/components/design-system`, `src/hooks`, `netlify/functions`, `cypress/`,
`.scratch/`) e as seções de componentes/sistema de design conforme implementado
(tokens, vidro, grão, foco, primitivas). Corrigir a descrição do contato:
formulário com validação client-side que envia a um endpoint server-side com
webhook fora do bundle — não "integrado com Discord webhook" no cliente.

## Acceptance criteria
- [ ] Árvore de diretórios reflete o repositório real (conferida caminho a caminho)
- [ ] Seção de design system bate com `src/styles/design-system.css`
- [ ] Contato descrito como validação client + endpoint server-side seguro

## Blocked by
- 01-rc-1-prerequisitos-scripts.md
