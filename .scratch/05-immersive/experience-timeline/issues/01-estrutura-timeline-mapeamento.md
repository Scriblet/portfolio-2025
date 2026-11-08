# Issue — Estrutura da timeline e mapeamento de experiências

Status: done

## Parent

PRD: `.scratch/05-immersive/experience-timeline/PRD.md`

## What to build

Criar a estrutura da seção `#experience` como timeline vertical e mapear as 5 experiências de `src/data/experiences.ts` em itens de timeline.

## Acceptance criteria

- [x] Seção `#experience` renderiza com label "Experiência / 03".
- [x] 5 itens de timeline exibidos na ordem de `experiences.ts` (mais recente primeiro).
- [x] Cada item contém número de ordem, período, empresa, cargo e descrição.
- [x] Dados vêm de `experienceTimeline` em `content.ts`, que deriva de `experiences.ts`.
- [x] Nenhuma data ou empresa inventada.
- [x] Teste unitário valida `experienceTimeline` derivado de `experiences.ts`.

## Blocked by

- `.scratch/05-immersive/skills-glass-cards/issues/01-grid-cards-skills.md`
