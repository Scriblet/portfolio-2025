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
  README.md       # este índice
```

## 01 — Técnicos (base)

| # | Slug | Título | Status |
|---|------|--------|--------|
| 1 | `seo-metadados` | SEO técnico e metadados | done |
| 2 | `code-splitting-lazy` | Code-splitting e lazy loading | ready-for-agent |
| 3 | `dados-centralizados` | Configuração centralizada de dados | done |
| 4 | `seguranca-contato` | Segurança do formulário de contato | done |
| 6 | `pwa-offline` | PWA e offline básico | ready-for-agent |

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

## 05 — Refactor imersivo (onda 6)

| # | Slug | Título | Status |
|---|------|--------|--------|
| 17 | `design-system-immersive` | Design system imersivo (tokens, tipografia, vidro, grão) | ready-for-agent |
| 18 | `portal-hero` | Portal hero cinematográfico dirigido por scroll | ready-for-agent |
| 19 | `editorial-narrative` | Declaração, roster, trajetória e fechamento editorial | ready-for-agent |
| 20 | `release-deck` | Deck físico de releases com arrasto e teclado | ready-for-agent |
| 21 | `immersive-preview-page` | Página `/immersive` (laboratório de direção visual) | done |
| 22 | `motion-a11y-performance` | Movimento, acessibilidade e performance | ready-for-agent |

## Roadmap sugerido

1. **Quick wins (concluído):** `seo-metadados`, `hierarquia-tipografica`, `dados-centralizados`, `seguranca-contato`, `header-scroll-inteligente`, `progresso-leitura`, `microinteracoes-foco`, `download-cv`, `tema-claro-escuro`, `snackbar-contato`
2. **Médio prazo:** `code-splitting-lazy` (concluído)
3. **Alto impacto:** `pwa-offline`, `secao-toolbox`, `secao-timeline`
4. **Onda 6 (em andamento):** `immersive-preview-page` entregue; `design-system-immersive`, `portal-hero`, `editorial-narrative`, `release-deck` e `motion-a11y-performance` a implementar. A prévia está em `/immersive`.

## Como funciona

- Um PRD por pasta: `PRD.md` (spec) + `issues/01-<slug>.md`, `02-<slug>.md`... (issues de implementação)
- Triage: `Status:` no topo de cada arquivo (ver `docs/agents/triage-labels.md`)
- Para implementar: use `to-issues` a partir do PRD desejado
- Painel vivo do plano: rota `/roadmap` (somente em desenvolvimento)
- Testes: `npm run test:unit` (Vitest). Playwright foi removido do fluxo de desenvolvimento; ver `docs/agents/testing.md`.
