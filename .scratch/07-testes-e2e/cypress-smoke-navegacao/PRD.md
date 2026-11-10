# PRD: Smoke e navegação: home, rotas, header, drawer e tema

Status: draft
Feature slug: `cypress-smoke-navegacao`
Onda: `07-testes-e2e`

## Problem Statement

Nada garante que o portfólio carregue, que a navegação por âncoras leve à seção
certa, que o menu mobile abra e feche, que o tema alterne e persista, ou que o
header se comporte ao rolar. São as interações que todo visitante usa primeiro e
que mudanças no shell (header, lazy sections, framer-motion, scroll) quebram em
silêncio: hoje só uma inspeção manual perceberia.

## Solution

Uma camada de specs de smoke e navegação cobrindo: carregamento da home com o
conteúdo principal; rotas (`/`, `/immersive`, URL desconhecida → home, `/roadmap`
ausente em produção); navegação por âncoras do header e do footer (scroll até a
seção, offset do header); menu mobile (abrir/fechar, Escape, trava de scroll,
foco); alternância de tema (claro/escuro, persistência, meta theme-color) e
comportamento do header no scroll (auto-hide, retorno, foco) mais a barra de
progresso de leitura.

## User Stories

1. Como visitante, quero que a home carregue com hero, experiências e contato
   visíveis, para ter certeza de que o site funciona ao abrir o link.
2. Como visitante, quero clicar em "Experiência"/"Jornada"/"Habilidades"/"Contato"
   e chegar à seção certa, sem parar atrás do header fixo.
3. Como visitante em celular, quero abrir o menu pelo hambúrguer, navegar e ter
   o menu fechando sozinho após a escolha, para não ficar preso em overlay.
4. Como visitante em celular, quero fechar o menu com Escape (ou botão) e
   recuperar o scroll da página, para voltar ao conteúdo.
5. Como visitante, quero alternar entre tema claro e escuro e que a preferência
   continue valendo ao recarregar, para não reconfigurar a cada visita.
6. Como visitante que rola a página, quero que o header some quando leio e
   reaparece quando volto, para ganhar espaço de leitura sem perder a navegação.
7. Como visitante, quero ver o progresso de leitura avançar conforme eu rolo,
   para saber quanto do site já vi.
8. Como visitante, quero que `/immersive` abra como prévia (sem ser indexada) e
   que URLs antigas ou inválidas não me deixem em página vazia, para não me perder.
9. Como visitante que usa teclado, quero que o foco dentro do header o mantenha
   visível, para navegar sem perder de vista os controles.
10. Como mantenedor, quero esses fluxos cobertos por smoke para detectar regressões
    críticas logo no CI, antes de qualquer deploy.

## Implementation Decisions

- Specs: `cypress/e2e/smoke-home.cy.ts`, `navegacao-ancoras.cy.ts`,
  `menu-mobile.cy.ts`, `tema.cy.ts`, `header-scroll.cy.ts` (podem ser agrupados
  em menos arquivos se o runtime crescer; a separação favorece rodar 1 spec por vez).
- Asserções de scroll por âncora: clicar no link, aguardar `waitForSection(...)`
  e conferir que o topo da seção ficou dentro do viewport (offset −80 tolerado
  com folga de ~120px), sem `cy.wait` fixo.
- Tema: assertar `data-mui-color-scheme` no `<html>` (não classes de CSS) e o
  conteúdo de `localStorage["portfolio-color-mode"]` após reload.
- Auto-hide: scroll real (`cy.scrollTo`/`cy.window` com `scrollBy`) e assertiva de
  `aria-hidden`/`inert`/visibilidade do `site-header`; testar também que focar um
  link do header impede o hide.
- Drawer: viewport 375×812 (ou `cy.viewport`); testar `aria-expanded` do
  `mobile-menu-button`, `role="dialog"` do `mobile-menu`, Escape, overlay e
  trava de `body` (`overflow: hidden`).
- `/immersive`: assertar `immersive-page`, title e `<meta name="robots">`.
  `/roadmap` em produção: visita e espera a home (`presentation-section`), o
  spec deve rodar contra build/preview, não contra dev.
- Usar `cy.enableReducedMotion()` por padrão para neutralizar reveals/transições.

## Testing Decisions

- Comportamental, não visual: importa o que o visitante consegue fazer (chegar à
  seção, mudar tema, abrir menu), não a posição exata em pixels ou a estilização.
- Smoke primeiro (home carrega, seções principais existem), roda em todo CI.
- Evitar acoplamento a textos de copy quando houver `data-testid`; textos são
  aceitos apenas onde são o contrato (ex.: rótulo do botão de tema em
  `aria-label`).
- Não duplicar o que o Vitest já cobre (resolução de tema inicial, hooks de
  scroll): aqui valida-se a integração no navegador.

## Out of Scope

- Formulário de contato (PRD `cypress-formularios-contato`).
- Conteúdo detalhado das seções e links externos (PRD `cypress-secoes-conteudo`).
- PWA/offline (PRD `cypress-pwa-offline`) e acessibilidade (PRD `cypress-a11y-responsivo`).
- Corrigir o destaque de seção ativa no header (hoje não existe) ou adicionar
  skip link: são gaps de produto, não de teste.

## Further Notes

- Dependências: PRD `cypress-infraestrutura` (comandos `visitApp`, `resetTheme`,
  `enableReducedMotion`, `waitForSection`).
- Risco: as seções lazy podem ainda estar em `section-fallback` quando o scroll
  terminar: por isso `waitForSection` é obrigatório antes de asserir conteúdo.
- Links "Roadmap"/"Imersivo" do header só existem em dev; os specs devem rodar
  contra build/preview para cobrir o comportamento de produção.
