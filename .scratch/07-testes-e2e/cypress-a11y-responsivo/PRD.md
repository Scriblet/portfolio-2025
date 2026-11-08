# PRD — Acessibilidade e responsivo: axe-core, teclado e viewports

Status: draft
Feature slug: `cypress-a11y-responsivo`
Onda: `07-testes-e2e`

## Problem Statement

O portfólio investiu em acessibilidade (labels, aria, foco visível, reduced
motion) mas isso nunca é verificado automaticamente: uma mudança de componente
pode reintroduzir contraste baixo, remover um `aria-label`, quebrar a ordem de
tabulação ou esconder controles essenciais em telas pequenas. O Thoughtworks
(position de acessibilidade WCAG no currículo) torna isso especialmente caro
como ponto cego. Também não há garantia de que `prefers-reduced-motion` continue
desligando animações/reveals.

## Solution

Specs de acessibilidade e responsividade: varredura com **axe-core** (`@axe-core/cypress`)
na home, na `/immersive` e nos estados de erro do formulário (sem violações
serious/critical, com allowlist explícita e comentada do que for aceito); navegação
por teclado (tabulação até tema/menu/CTAs, Escape fecha drawer e snackbar, foco
visível); viewports 375/768/1280 com a regra responsiva do header (links ≤1080px
viram drawer; CTA some ≤520px) e alvos de toque; e reduced motion (com a
preferência ativa, nada fica `opacity: 0` nem depende de reveal).

## User Stories

1. Como visitante com deficiência visual, quero contraste, labels e landmarks
   corretos, para usar o site com leitor de tela e ampliador.
2. Como visitante que navega só por teclado, quero alcançar todos os controles
   (tema, menu, CTAs, formulário) em ordem previsível, sem armadilha de foco.
3. Como visitante que navega por teclado, quero ver claramente onde está o foco,
   para não me perder.
4. Como visitante com sensibilidade a movimento, quero que animações e reveals
   sejam desativados quando eu preferir, para ler sem desconforto.
5. Como visitante no celular, quero o menu hambúrguer e os CTAs acessíveis e com
   alvos de toque confortáveis, para agir sem erro de toque.
6. Como visitante em tablet, quero o layout adaptado sem sobreposição ou corte,
   para consumir o conteúdo inteiro.
7. Como visitante, quero que o drawer não seja uma armadilha de foco (abre com
   foco, fecha e devolve o foco), para não ficar preso.
8. Como mantenedor, quero falhas de a11y sérias barradas no CI, para não regredir
   WCAG em silêncio.
9. Como mantenedor, quero exceções documentadas (allowlist com justificativa),
   para saber o que é aceito e o que é pendência.
10. Como mantenedor, quero que rodar a11y não torne a suíte lenta — uma varredura
    por página/estado basta.

## Implementation Decisions

- Specs: `cypress/e2e/a11y-axe.cy.ts`, `a11y-teclado-foco.cy.ts`,
  `responsivo-viewports.cy.ts`, `motion-reduced.cy.ts`.
- axe-core via `@axe-core/cypress`: `cy.injectAxe(); cy.checkA11y()` com contexto
  restrito (ex.: `main`) e filtro de impacto `serious`/`critical`. Violations
  `minor`/`moderate` são reportadas em log mas não falham (política a registrar
  no PRD/issue).
- Rodar axe em: home completa (após reveals), `/immersive`, form com erros de
  validação visíveis, drawer aberto e tema claro.
- Teclado: `cy.tab()` (plugin `cypress-plugin-tab` ou sequência de `tab`) para
  alcançar `theme-toggle`, `mobile-menu-button`/links, CTAs e campos; Escape fecha
  `mobile-menu` e `snackbar-*`; assertar `:focus-visible` (outline) via estilo
  computado em um elemento focado.
- Responsivo: `cy.viewport` em 375×812, 768×1024 e 1280×720 — drawer presente em
  375, links do header ausentes em 375, `header-cta` ausente em ≤520, tudo visível
  em 1280. Alvos de toque: botões principais com área ≥44px (medida por bounding
  client rect) — tolerância registrada se algum ícone for menor.
- Reduced motion: `cy.enableReducedMotion()` → assertar que `[data-reveal]` está
  visível sem `data-revealed="true"` e que transições do header são `none`;
  comparar com `disableReducedMotion` (reais aparecem com reveal).
- Seletor estável: nunca classes MUI/SCSS; papéis/labels/testids.

## Testing Decisions

- A11y automatizado cobre o que axe vê (contraste, roles, labels); navegação por
  teclado cobre ordem/foco; leitura real por leitor de tela continua manual.
- Uma varredura por página/estado, sem loops — custo baixo em CI.
- Allowlist de violações aceitas vive em `cypress/support/a11y-exceptions.ts`
  (ou comentário no spec) com justificativa por item — nada de silenciar tudo.
- Falhas de axe devem apontar o seletor do elemento — o spec deve logar
  `violation.id`, `impact` e `nodes`.

## Out of Scope

- Auditoria manual com NVDA/VoiceOver (fica checklist de release).
- Corrigir gaps de produto (skip link ausente, `href=""` de Instagram/Twitter,
  destaque de seção ativa) — issues de produto, não deste PRD.
- i18n/multi-idioma (site é pt-BR fixo).
- Testes de performance (Lighthouse) e contraste em todas as cópias.

## Further Notes

- Dependências: PRD `cypress-infraestrutura` (comandos, dependência
  `@axe-core/cypress`/`cypress-axe` declarada lá).
- Risco: axe + MUI pode acusar violações do próprio MUI (ex.: contraste de
  tooltip) — preferir escopo (`main`, `header`) e allowlist justificada a
  desativar regras globais.
- `prefers-reduced-motion` também é o modo padrão de estabilidade da suíte
  (PRD de infra) — este PRD valida que o comportamento do app com a preferência
  ativa está correto, não só que os testes ficam estáveis.
