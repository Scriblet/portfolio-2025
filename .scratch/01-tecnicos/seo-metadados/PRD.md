# PRD — SEO técnico e metadados

Status: ready-for-agent
Feature slug: `seo-metadados`

## Problem Statement

Como visitante/recrutador, ao compartilhar o portfólio no WhatsApp, LinkedIn ou Twitter, vejo apenas título genérico sem imagem e sem descrição — isso reduz cliques, perde contexto e prejudica ranqueamento no Google. Hoje o `index.html` tem apenas `<title>` e `lang="en"`, sem Open Graph, Twitter Cards, canonical, favicon dinâmico ou dados estruturados.

## Solution

Entregar um portfólio com metadados técnicos completos: título otimizado, descrição, Open Graph, Twitter Cards, favicon, canonical, `robots`, e JSON-LD `Person` com links sociais — tudo centralizado em `src/config` e refletido no `index.html` — gerando previews ricos e melhor indexação.

## User Stories

1. Como recrutador, quero ver título, descrição e imagem ao receber o link no WhatsApp, para entender quem é o Lucas antes de clicar.
2. Como visitante, quero que o link no LinkedIn mostre card com foto e cargo, para decidir em segundos se clico.
3. Como visitante, quero que o Twitter mostre `summary_large_image`, para ter preview legível no feed.
4. Como mantenedor de SEO, quero JSON-LD `Person` com `name`, `jobTitle`, `sameAs` (GitHub/LinkedIn), para Google entender entidade.
5. Como usuário, quero favicon, `apple-touch-icon` e `theme-color` consistentes com o tema escuro, para experiência nativa ao salvar na home screen.
6. Como mantenedor, quero título e descrição vindos de config centralizada (`SITE_CONFIG`), para atualizar sem editar HTML.
7. Como mantenedor, quero canonical e `og:url` usando variável de base URL, para evitar duplicidade entre previews e produção.
8. Como mantenedor, quero `lang="pt-BR"`, para leitores de tela e Google anunciarem idioma correto.
9. Como usuário, quero `meta description` útil em PT-BR, para snippets melhores no Google.
10. Como mantenedor, quero `robots` explícito (`index,follow`), para evitar bloqueios acidentais.
11. Como visitante, quero imagem OG 1200×630 local em `/public`, para preview rápido sem depender de CDN externa.
12. Como mantenedor, quero validação via ferramenta de preview manual documentada, para evitar regressões futuras.
13. Como usuário mobile, quero `theme-color #121212` no meta, para barra do navegador combinar com o tema.
14. Como mantenedor, quero testes que leiam as tags do `<head>` e falhem se ESSENCIAIS sumirem, para proteger SEO.

## Implementation Decisions

- **Seam principal:** E2E / build — teste de leitura do `<head>` servido + Lighthouse SEO baseline.
- **Seam secundário:** Config centralizada — `SITE_CONFIG` passa a ser fonte para título/descrição/canonical; `index.html` consome valores estáticos estendidos.
- Módulos afetados: `index.html`, `src/config/analytics.config.ts` (SITE_CONFIG), `public/` (favicon, imagem OG).
- Decisões:
  - Suporte apenas a SPA static (sem React Router): metadados estáticos no `index.html` + JSON-LD inline; sem React Helmet Async até haver rotas.
  - Imagem OG gerada a partir da identidade atual (Poppins, gradientes `#673ab7`→`#00bcd4`) em `public/og-cover.png` (1200×630).
  - `lang="pt-BR"`, `title` formato `Nome · Cargo | Tagline`, `og:title`, `og:description`, `twitter:title/description`, `twitter:image`.
  - JSON-LD `Person` com `@context: https://schema.org`, `name`, `jobTitle`, `url`, `sameAs` (GitHub, LinkedIn).
- Fora da decisão deste PRD: sitemap.xml dinâmico, i18n multi-idioma, analytics de Search Console.
- Protótipo: não houve snippet de decisão mais precisa que prose — esta seção é a decisão.

## Testing Decisions

- Bom teste = comportamento externo observável (tags no DOM, preview rendering), não string interna.
- Testar em: `tests/` (Playwright, existente) — novo `tests/seo.spec.ts` lendo `<head>`.
- Priors: `tests/app.spec.ts` usando `page.goto` + `locator('head > meta')`, `data-testid` quando criar elementos novos.
- Casos: presença/conteúdo de OG/Twitter, JSON-LD parseável, favicon 200, canonical, LCP não-regressão.

## Out of Scope

- Blog/routing dinâmico com metadados por página.
- Gerador automático de sitemap.
- Integração Search Console / GA4 Search Console.
- i18n EN/PT.

## Further Notes

- Feito automaticamente valida Lighthouse ≥ 95 em SEO.
- Depende de `dados-centralizados` para fonte única de textos.
