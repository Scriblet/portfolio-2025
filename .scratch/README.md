# PRDs do portfólio — índice por tipo

> Issue tracker local em `.scratch/` (ver `docs/agents/issue-tracker.md`).  
> Cada PRD está em `.scratch/<categoria>/<feature-slug>/PRD.md`.

## Estrutura

```
.scratch/
  01-tecnicos/    # base técnica (performance, SEO, segurança, testes)
  02-ux/          # experiência do usuário (navegação, tipografia, motion)
  03-features/    # funcionalidades novas (CV, tema, contato)
  04-secoes/      # seções novas na página (projetos, toolbox, timeline)
  05-immersive/   # refactor visual imersivo (onda 6)
  06-site-refactor/ # refactor visual das seções da home (índice próprio em 06-site-refactor/README.md)
  07-testes-e2e/  # testes automatizados E2E com Cypress (onda 7)
  08-correcoes-review/ # correções da avaliação de 2026-11 (CI, contato, imagens, README, E2E)
  README.md       # este índice
```

## 01 — Técnicos (base)

| # | Slug | Título | Status |
|---|------|--------|--------|
| 1 | `seo-metadados` | SEO técnico e metadados | done |
| 2 | `code-splitting-lazy` | Code-splitting e lazy loading | ready-for-agent |
| 3 | `dados-centralizados` | Configuração centralizada de dados | done |
| 4 | `seguranca-contato` | Segurança do formulário de contato | done |
| 6 | `pwa-offline` | PWA e offline básico | done |

## 02 — UX

| # | Slug | Título | Status |
|---|------|--------|--------|
| 7 | `header-scroll-inteligente` | Header com scroll inteligente | done |
| 8 | `progresso-leitura` | Indicador de progresso de leitura | done |
| 9 | `microinteracoes-foco` | Microinterações e estados de foco consistentes | done |
| 10 | `hierarquia-tipografica` | Hierarquia tipográfica e elemento vazio (Experience) | done |

## 03 — Features

| # | Slug | Título | Status |
|---|------|--------|--------|
| 11 | `download-cv` | Download de CV em PDF | done |
| 12 | `tema-claro-escuro` | Tema claro/escuro toggle | done |
| 13 | `snackbar-contato` | Toast/snackbar de confirmação no contato | done |

## 04 — Seções novas

| # | Slug | Título | Status |
|---|------|--------|--------|
| 14 | `secao-toolbox` | Seção Stack/Toolbox visual | done |
| 15 | `secao-timeline` | Seção Jornada/Carreira (timeline) | done |
| 16 | `mapa-maturidade-ia` | Mapa de Maturidade em IA | draft |
| 17 | `manifesto-tecnico` | Manifesto Técnico | draft |
| 18 | `selected-work` | Selected Work narrativo | draft |
| 19 | `contato-proposta-valor` | Contato com Proposta de Valor | draft |

## 05 — Refactor imersivo (onda 6)

| # | Slug | Título | Status |
|---|------|--------|--------|
| 17 | `design-system-immersive` | Design system imersivo (tokens, tipografia, vidro, grão) | draft |
| 18 | `portal-hero` | Portal hero scroll-driven com wordmark dividido e HUD real | draft |
| 19 | `editorial-about` | Seção Sobre com layout editorial + HUD pessoal | draft |
| 20 | `skills-glass-cards` | Grid de cards de glass para as skills | draft |
| 21 | `experience-timeline` | Timeline vertical de experiências com datas reais | draft |
| 22 | `contact-closing` | Fechamento escuro com card de glass de contato | draft |
| 23 | `motion-a11y-performance` | Movimento, acessibilidade e performance | draft |
| — | `immersive-preview-page` | Página `/immersive` (preview experimental) | done |

## 07 — Testes E2E com Cypress (onda 7)

Análise do site e das interações: `.scratch/07-testes-e2e/ANALISE.md`.

| # | Slug | Título | Status |
|---|------|--------|--------|
| 24 | `cypress-infraestrutura` | Infraestrutura de testes E2E com Cypress | done |
| 25 | `cypress-smoke-navegacao` | Smoke e navegação: home, rotas, header, drawer e tema | draft |
| 26 | `cypress-secoes-conteudo` | Conteúdo das seções: experiência, jornada, skills, GitHub e footer | draft |
| 27 | `cypress-formularios-contato` | Formulários de contato: validação, envio e feedback | draft |
| 28 | `cypress-pwa-offline` | PWA e offline: conteúdo em cache, OfflineNotice e instalação | draft |
| 29 | `cypress-a11y-responsivo` | Acessibilidade e responsivo: axe-core, teclado e viewports | draft |

Ordem de implementação: `cypress-infraestrutura` primeiro (os demais dependem dele);
depois `cypress-smoke-navegacao` → `cypress-secoes-conteudo` →
`cypress-formularios-contato` → `cypress-pwa-offline` → `cypress-a11y-responsivo`.

## 08 — Correções da avaliação (2026-11)

Lote criado a partir da avaliação do site (nota 8/10): CI em Node 22, contato
funcional em produção (`/api/contact` retorna 404 no GitHub Pages), imagens
otimizadas, README consistente e cobertura E2E crítica.

| # | Slug | Título | Status |
|---|------|--------|--------|
| 30 | `ci-node-22` | CI consistente em Node 22 e lint limpo | ready-for-agent |
| 31 | `contato-producao` | Contato funcional em produção | ready-for-agent |
| 32 | `otimizacao-imagens` | Otimização de imagens | ready-for-agent |
| 33 | `readme-consistencia` | README consistente com o repositório | ready-for-agent |
| 34 | `e2e-cobertura-critica` | Cobertura E2E crítica | ready-for-agent |

Ordem sugerida: `ci-node-22` → `contato-producao` (urgente — conversão morta
em produção) → `otimizacao-imagens` → `readme-consistencia` →
`e2e-cobertura-critica` (cobre o núcleo; PWA/a11y seguem na onda 7).

## Roadmap sugerido

1. **Quick wins (concluído):** `seo-metadados`, `hierarquia-tipografica`, `dados-centralizados`, `seguranca-contato`, `header-scroll-inteligente`, `progresso-leitura`, `microinteracoes-foco`, `download-cv`, `tema-claro-escuro`, `snackbar-contato`
2. **Médio prazo:** `code-splitting-lazy` (concluído)
3. **Alto impacto:** `secao-toolbox` (concluído), `secao-timeline` (concluído)
4. **Onda 6 (em andamento):** `immersive-preview-page` entregue; `design-system-immersive`, `portal-hero`, `editorial-about`, `skills-glass-cards`, `experience-timeline`, `contact-closing` e `motion-a11y-performance` a implementar. A prévia está em `/immersive`.
5. **Onda 7 (testes E2E com Cypress):** 6 PRDs em `.scratch/07-testes-e2e/`, prontos para implementação — começar pela `cypress-infraestrutura`.

## Como funciona

- Um PRD por pasta: `PRD.md` (spec) + `issues/01-<slug>.md`, `02-<slug>.md`... (issues de implementação)
- Triage: `Status:` no topo de cada arquivo (ver `docs/agents/triage-labels.md`)
- Para implementar: use `to-issues` a partir do PRD desejado
- Painel vivo do plano: rota `/roadmap` (somente em desenvolvimento)
- Testes: `npm run test:unit` (Vitest) é o loop padrão. E2E com Cypress planejado na onda 7 (`07-testes-e2e/`) — nunca no loop de desenvolvimento; ver `docs/agents/testing.md`.
