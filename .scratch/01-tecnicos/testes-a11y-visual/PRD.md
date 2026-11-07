# PRD — Testes de acessibilidade e visual regression

Status: ready-for-agent
Feature slug: `testes-a11y-visual`

## Problem Statement

Como usuário de leitor de tela/teclado, posso encontrar barreiras (contraste insuficiente, foco invisível, falta de label) que testes atuais não detectam. Como mantenedor, mudanças visuais podem quebrar layout sem sinal claro porque só há testes funcionais amplos.

## Solution

Adicionar layer de acessibilidade automatizada com `@axe-core/playwright` em E2E críticos e baseline de screenshots para regressão visual — bloqueando no CI regressões WCAG e de layout.

## User Stories

1. Como usuário de leitor de tela, quero headings em ordem lógica e sem elementos vazios, para navegar por seções.
2. Como usuário de teclado, quero foco visível em todos os interativos, para saber onde estou.
3. Como usuário, quero contraste ≥ 4.5:1, para ler textos.
4. Como mantenedor, quero saber em CI quando nova violação axe aparece, para bloquear merge.
5. Como mantenedor, quero baseline visual por viewport (mobile/desktop), para diff visual rápido.
6. Como mantenedor, quero screenshots com máscara de animação, para evitar flake de Framer Motion.
7. Como dev, quero rodar a11y localmente com `npm run test:a11y`, para feedback rápido.
8. Como visitante, quero SVGs decorativos com `aria-hidden`, para leitor não ler ruído.
9. Como visitante, quero `alt` descritivo em imagens de conteúdo, para contexto.
10. Como mantenedor, quero relatório axe anexado ao CI, para auditoria.
11. Como usuário mobile, quero targets de toque ≥ 44×44, para não errar.
12. Como mantenedor, quero threshold de violações críticas = 0, para padrão alto.
13. Como dev, quero base de fotos/páginas em estado `prefers-reduced-motion`, para estabilizar screenshots.
14. Como mantenedor, quero documentar como atualizar snapshots, para onboarding.
15. Como avaliador WCAG, quero checar foco e heading order automaticamente, para menos manual.

## Implementation Decisions

- **Seam principal:** E2E (Playwright) — axe + screenshot assertions.
- **Seam secundário:** Componente — correção de contraste/labels/foco onde necessário.
- Módulos afetados: `playwright.config.ts`, `tests/a11y.spec.ts`, `tests/visual.spec.ts`, `src/theme.ts` (contraste), `index.html` (snapshot base).
- Decisões:
  - `@axe-core/playwright` com `toHaveNoViolations()` em home, contact, mobile.
  - Screenshots: `toHaveScreenshot()` com `animations: 'disabled'` e `mask` para motion.
  - Viewports: 375×667, 768×1024, 1280×900.
  - Zero violação crítica/serious; violações moderadas tracked sem block.
  - CI: `npx playwright test --update-snapshots` documentado, não automático.
- Protótipo: não se aplica.

## Testing Decisions

- Bom teste = acessibilidade externa (axe) + pixels estáveis — não regra de código.
- Testar em: Playwright, com `AxeBuilder` e screenshot comparisons.
- Priors: `playwright.config.ts` já com baseURL e webServer.
- Casos: axe==0 crítico, screenshot diff < threshold, foco opera via Tab, heading order.

## Out of Scope

- Teste manual com NVDA/VoiceOver completo.
- Lighthouse CI completo.
- Unit tests com Testing Library.

## Further Notes

- Corrigir `experience` h4 vazio entra neste PRD (a11y heading order).
