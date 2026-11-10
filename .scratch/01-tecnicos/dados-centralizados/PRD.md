# PRD: Configuração centralizada de dados

Status: ready-for-agent
Feature slug: `dados-centralizados`

## Problem Statement

Como mantenedor, atualizar empresa, skill, link social ou texto exige caçar arrays hardcoded dentro de `experience.tsx`, `skills.tsx`, `header.tsx`, `github.tsx`, `footer.tsx` e configs, isso gera duplicidade, testes frágeis e atrito para novas seções (Projetos, Depoimentos, Timeline).

## Solution

Centralizar todos os dados de conteúdo em `src/data/` tipado (experiences, skills, social, site, projects, testimonials), com componentes passando a ser puros consumidores via props, permitindo atualização, testes e reuso por novas seções sem tocar em JSX.

## User Stories

1. Como mantenedor, quero alterar uma experiência em um único arquivo `src/data/experiences.ts`, para não editar componente.
2. Como mantenedor, quero skills agrupadas por categoria em `src/data/skills.ts`, para reaproveitar em Toolbox.
3. Como mantenedor, quero links sociais e sites vindos de `src/data/social.ts` + `site.ts` alinhados a `analytics.config.ts`, para fonte única.
4. Como mantenedor, quero tipos TypeScript para cada entidade (`Experience`, `Skill`, `Project`), para catch de erro em build.
5. Como dev novo, quero README curto em `src/data/README.md` explicando onde editar, para onboarding rápido.
6. Como testador, quero testes importar a mesma fonte de dados do componente, para asserts estáveis.
7. Como mantenedor, quero validar shape via `tsc --noEmit`, para falhar cedo se campo faltar.
8. Como visitante, quero nenhuma mudança visual após migração, para zero risco.
9. Como mantenedor, quero ability de exportar dados para CMS/headless depois, para evolução.
10. Como mantenedor, quero ids estáveis (`id`, `slug`) para analytics e testes, para rastreabilidade.
11. Como visitante SEO, quero texto inalterado, para não perder ranking.
12. Como mantenedor, quero fallback seguro se arquivo de dados ficar vazio (early return + log), para não quebrar página.
13. Como dev, quero barrels `index.ts`, para import limpo.
14. Como mantenedor, quero exemplos de como adicionar nova seção consumindo `src/data/`, para escalar.

## Implementation Decisions

- **Seam principal:** Componente (render) + build: mesmo DOM antes/depois; `tsc` valida tipos.
- **Seam secundário:** E2E: testes existentes devem passar sem mudança de seletor.
- Módulos afetados: novo `src/data/` (`experiences.ts`, `skills.ts`, `social.ts`, `site.ts`, `projects.ts`, `testimonials.ts`, `types.ts`, `index.ts`), `src/pages/experience/experience.tsx`, `src/pages/skills/skills.tsx`, `src/pages/header.tsx`, `src/pages/github/github.tsx`, `src/pages/footer.tsx`, `src/config/analytics.config.ts`.
- Decisões:
  - Painel de tipos explícitos; arrays `as const` onde fizer sentido.
  - `SITE_CONFIG` passa a ler de `src/data/site.ts` (ou re-exporta), unifica `VITE_*` com fallback.
  - Componentes recebem dados via import direto (sem context global nesta fase) para manter simplicidade.
  - Nenhum fetch runtime: dados estáticos tipados.
- Protótipo: não se aplica.

## Testing Decisions

- Bom teste = render externo + typecheck: não teste de import.
- Testar em: existente `tests/experience.spec.ts`, `tests/app.spec.ts` (skills), mais `tsc --noEmit`.
- Priors: asserts por `data-testid="experience-card-*"` + leitura de `src/data/*` no teste.
- Casos: render idêntico (count + textos), ordem preservada, build passa.

## Out of Scope

- CMS/headless, API pública, i18n, validação runtime com Zod (pode vir depois).
- Redux/Zustand global store.

## Further Notes

- Pré-requisito para `secao-projetos`, `secao-depoimentos`, `secao-toolbox`, `secao-timeline`, `download-cv`, `blog-tecnico`.
