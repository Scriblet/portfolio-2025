# PRDs do portfólio — índice por tipo

> Issue tracker local em `.scratch/` (ver `docs/agents/issue-tracker.md`).  
> Cada PRD está em `.scratch/<categoria>/<feature-slug>/PRD.md` com `Status: ready-for-agent`.

## Estrutura

```
.scratch/
  01-tecnicos/    # base técnica (performance, SEO, segurança, testes)
  02-ux/          # experiência do usuário (navegação, tipografia, motion)
  03-features/    # funcionalidades novas (projetos, CV, tema, blog, contato)
  04-secoes/      # seções novas na página (projetos, depoimentos, toolbox, timeline)
  README.md       # este índice
```

## 01 — Técnicos (base)

| # | Slug | Título | Status |
|---|------|--------|--------|
| 1 | `seo-metadados` | SEO técnico e metadados | ready-for-agent |
| 2 | `code-splitting-lazy` | Code-splitting e lazy loading | ready-for-agent |
| 3 | `dados-centralizados` | Configuração centralizada de dados | ready-for-agent |
| 4 | `seguranca-contato` | Segurança do formulário de contato | ready-for-agent |
| 5 | `testes-a11y-visual` | Testes de acessibilidade e visual regression | ready-for-agent |
| 6 | `pwa-offline` | PWA e offline básico | ready-for-agent |

## 02 — UX

| # | Slug | Título | Status |
|---|------|--------|--------|
| 7 | `header-scroll-inteligente` | Header com scroll inteligente | ready-for-agent |
| 8 | `progresso-leitura` | Indicador de progresso de leitura | ready-for-agent |
| 9 | `microinteracoes-foco` | Microinterações e estados de foco consistentes | ready-for-agent |
| 10 | `hierarquia-tipografica` | Hierarquia tipográfica e elemento vazio (Experience) | ready-for-agent |

## 03 — Features

| # | Slug | Título | Status |
|---|------|--------|--------|
| 11 | `projetos-destaque` | Projetos em destaque com cards interativos | ready-for-agent |
| 12 | `download-cv` | Download de CV em PDF | ready-for-agent |
| 13 | `tema-claro-escuro` | Tema claro/escuro toggle | ready-for-agent |
| 14 | `blog-tecnico` | Blog/artigos técnicos (modo leve) | ready-for-agent |
| 15 | `snackbar-contato` | Toast/snackbar de confirmação no contato | ready-for-agent |

## 04 — Seções novas

| # | Slug | Título | Status |
|---|------|--------|--------|
| 16 | `secao-projetos` | Seção Projetos (substitui/amplia GitHub) | ready-for-agent |
| 17 | `secao-depoimentos` | Seção Depoimentos/Recomendações | ready-for-agent |
| 18 | `secao-toolbox` | Seção Stack/Toolbox visual | ready-for-agent |
| 19 | `secao-timeline` | Seção Jornada/Carreira (timeline) | ready-for-agent |

## Roadmap sugerido

1. **Quick wins:** `seo-metadados`, `hierarquia-tipografica`, `header-scroll-inteligente`, `dados-centralizados`, `snackbar-contato`
2. **Médio prazo:** `seguranca-contato`, `code-splitting-lazy`, `projetos-destaque`, `tema-claro-escuro`, `download-cv`
3. **Alto impacto:** `secao-depoimentos`, `pwa-offline`, `blog-tecnico`, `secao-toolbox`, `secao-timeline`

## Como funciona

- Um PRD por pasta: `PRD.md` (spec) + `issues/01-<slug>.md`, `02-<slug>.md`... (issues de implementação)
- Triage: `Status:` no topo de cada arquivo (ver `docs/agents/triage-labels.md`)
- Para implementar: use `to-issues` a partir do PRD desejado
