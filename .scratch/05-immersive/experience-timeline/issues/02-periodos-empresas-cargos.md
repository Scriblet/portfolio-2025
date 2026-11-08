# Issue — Períodos, empresas e cargos com dados reais

Status: done

## Parent

PRD: `.scratch/05-immersive/experience-timeline/PRD.md`

## What to build

Aplicar tipografia e espaçamento corretos aos campos de período, empresa, cargo e descrição, garantindo que todos os valores sejam os reais de `src/data/experiences.ts`.

## Acceptance criteria

- [x] Período em Sora 11px, `tabular-nums`, cor `#9EA5A8`.
- [x] Empresa em Syne 600, cor `#EDE7DC`.
- [x] Cargo em Inter 500, uppercase tracking 0.12em, cor `#9EA5A8`.
- [x] Descrição em Inter 400, 14–15px, `max-width: 62ch`, line-height 1.68.
- [x] Valores reais:
  - Vivo (Telefônica Brasil) — Consultor de IA / AI Software Engineer — mar/2026 – atual
  - Porto Seguro — Desenvolvedor de Software Pleno — jan/2024 – mar/2026
  - Thoughtworks — Consultant Developer — abr/2022 – ago/2023
  - ArcoTech (Escola em Movimento) — Full Stack Developer — jun/2021 – mar/2022
  - Finger Consultoria — Founder & UX Designer — ago/2019 – jun/2021
- [x] Teste valida presença dos períodos reais no DOM.

## Blocked by

- `.scratch/05-immersive/experience-timeline/issues/01-estrutura-timeline-mapeamento.md`
