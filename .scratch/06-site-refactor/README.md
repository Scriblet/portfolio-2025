# Onda 7 — Refactor do site com o design imersivo

> O portfólio inteiro passa a usar a linguagem visual da rota `/immersive`.
> Base técnica: `src/styles/design-system.css`, `src/theme/designTokens.ts`,
> `src/components/design-system/` e o tema MUI em `src/theme.ts`.

## Status

**Entregue.** Todas as seções foram refatoradas e validadas com
`npx tsc -p tsconfig.app.json --noEmit`, `npm run build` e
`npm run test:unit -- --run` (40 testes).

## Referência visual

A rota `/immersive` é o laboratório aprovado. Ela não é mais o destino do
refactor: é a referência de tokens, vidro, tipografia, movimento e composição.

## PRDs por seção

| # | Slug | Seção | Status |
|---|------|-------|--------|
| 1 | `header-hero` | Header fixo + Hero/Presentation | done |
| 2 | `experience-section` | Empresas e aprendizados | done |
| 3 | `timeline-section` | Jornada / marcos | done |
| 4 | `philosophy-section` | Filosofia e valores | done |
| 5 | `skills-section` | Habilidades técnicas | done |
| 6 | `toolbox-section` | Stack e ferramentas | done |
| 7 | `github-section` | Banner GitHub | done |
| 8 | `contact-section` | Contato e formulário | done |
| 9 | `footer-section` | Rodapé | done |
| 10 | `global-shell` | Shell global e movimento | done |

## Gate global

- `motion-a11y-performance` da onda 6 continua sendo o gate de animação,
  foco, contraste e performance para todas as seções.
- Nenhuma seção pode reintroduzir cores hardcoded fora dos tokens.
- `npm run test:unit` e `npx tsc -p tsconfig.app.json --noEmit` precisam passar.

## Convenções

- Cada PRD: `.scratch/06-site-refactor/<slug>/PRD.md`
- Cada issue: `.scratch/06-site-refactor/<slug>/issues/<NN>-<slug>.md`
- Triage: `Status:` no topo de cada issue (`ready-for-agent`, `done` etc.)
