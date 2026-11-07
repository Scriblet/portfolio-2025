# PRD — Code-splitting e lazy loading

Status: ready-for-agent
Feature slug: `code-splitting-lazy`

## Problem Statement

Como visitante mobile, sinto travamento no primeiro carregamento porque todo o SPA (Presentation, Experience, Philosophy, Skills, GitHub, Contact, Footer) é carregado e executado de uma vez — JS bundle grande, imagens pesadas e animações competindo. Isso piora LCP/INP e aumenta taxa de saída.

## Solution

Carregar só a dobra inicial (Presentation+Header), adiar seções abaixo da dobra via `React.lazy` + `Suspense` e `loading="lazy"`/preload inteligente nas imagens, reduzindo bundle inicial e melhorando LCP/INP sem mudar conteúdo ou ordem visual.

## User Stories

1. Como visitante mobile, quero ver a Presentation em < 2s, para não abandonar.
2. Como visitante desktop, quero scroll suave sem jank ao entrar nas seções.
3. Como visitante, quero placeholder/skeleton de altura preservada ao carregar Experience/Skills, para evitar layout shift (CLS).
4. Como usuário com internet lenta, quero imagens fora da dobra carregadas sob demanda, para economizar dados.
5. Como usuário, quero animação de entrada apenas quando seção entra em viewport, para não desperdiçar CPU.
6. Como mantenedor, quero code splitting por rota/seção, para reduzir bundle inicial.
7. Como mantenedor, quero fallback de erro para chunk falhado com retry, para não quebrar página se CDN falhar.
8. Como visitante, quero conteúdo sempre visível mesmo com JS falho em chunk secundário, para não perder contato.
9. Como mantenedor, quero métrica de bundle tamanho inicial antes/depois, para comprovar ganho.
10. Como usuário, quero nenhuma mudança de comportamento de navegação por âncoras após lazy, para não quebrar `react-scroll`.
11. Como mantenedor, quero teste que prove chunk lazy carregado sob demanda, para evitar regressão silenciosa.
12. Como usuário mobile, quero menor consumo de dados iniciais, para economizar energia e banda.
13. Como visitante SEO, quero conteúdo ainda indexável após lazy, para não perder tráfego.
14. Como usuário com `prefers-reduced-motion`, quero menos trabalho de animação no carregamento inicial.
15. Como mantenedor, quero build Vite configurado com `manualChunks` mínimo viável, para separar vendor.

## Implementation Decisions

- **Seam principal:** E2E + build — Lighthouse (LCP/CLS/INP) + Playwright provando adição de chunks sob scroll.
- **Seam secundário:** Componente — `App.tsx` passa a lazy-load Experience, PhilosophyBanner, SkillsSection, GithubBanner, ContactForm, Footer; Presentation e Header ficam eager.
- Módulos afetados: `src/App.tsx`, `vite.config.ts` (build.rollupOptions), `src/img/*` (adicionar `loading="lazy"`, `decoding="async"`).
- Decisões:
  - `React.lazy(() => import('./pages/...'))` com `lazySection` helper + `Suspense` com skeleton de mesma altura (CLS 0).
  - IntersectionObserver já existente (`react-intersection-observer`) mantém `triggerOnce`.
  - Imagens: hero `fetchpriority="high"` + preload; demais `loading="lazy"`.
  - Sem mudança de ordem visual ou de ids de âncora (`#experience`, `#skills`, `#contact`).
  - Meta: bundle inicial < 200kB gzip (excluindo vendor), LCP < 2.5s em 4G.
- Protótipo: não se aplica.

## Testing Decisions

- Bom teste = comportamento externo (tempo de dobra, chunk carregado, CLS) — não implementação interna de chunk.
- Testar em: Lighthouse CI + Playwright (`tests/perf.spec.ts`).
- Priors: `tests/app.spec.ts` com `waitUntil: networkidle` + leitura de `performance.getEntriesByType('navigation')`.
- Casos: Presentation renderizada sem esperar Info chunk; scroll carrega Experience; fallback aparece sob throttling; CLS < 0.1; anchor navigation funciona.

## Out of Scope

- SSR/SSG, Image CDN otimizado, webp automático.
- Virtualização de listas.
- Service worker (ver `pwa-offline`).

## Further Notes

- Risco: `react-scroll` com lazy sections precisa `offset` ajustado — testar em `tests/header.spec.ts`.
- Depende de `dados-centralizados` para placeholders determinísticos.
