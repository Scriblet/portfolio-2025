# PRD: Header com Scroll Inteligente

Status: ready-for-agent
Feature slug: `header-scroll-inteligente`

## Problem Statement

O Header atual é um AppBar fixo com backdrop blur que permanece sempre visível durante o scroll. Em uma página longa (Presentation → Experience → PhilosophyBanner → Skills → GithubBanner → ContactForm → Footer), o cabeçalho fixo ocupa permanentemente espaço vertical, empurra o conteúdo em telas pequenas e compete visualmente com o conteúdo que o visitante está tentando ler, especialmente no mobile, onde cada pixel de viewport conta. Ao mesmo tempo, simplesmente removê-lo prejudicaria a navegação por âncoras (#experience, #skills, #contact) e o acesso ao contato a qualquer momento. Falta um comportamento que preserve o acesso rápido à navegação sem roubar espaço durante a leitura.

## Solution

Fazer o Header inteligente ao scroll: ao descer a página, o cabeçalho se esconde suavemente para liberar espaço de leitura; ao subir (qualquer movimento ascendente), ele reaparece de imediato, garantindo que a navegação esteja sempre a um gesto de distância. O comportamento deve ser animado com o Framer Motion já presente no projeto, respeitar preferências de movimento reduzido (sem animação, apenas mostrar/esconder), manter o backdrop blur quando visível, e nunca esconder o foco de teclado que estiver dentro do Header, se o usuário estiver navegando por teclado, o Header volta a aparecer para não perder acessibilidade.

## User Stories

1. Como um(a) visitante que rola a página para baixo, quero que o Header se esconda, para ganhar espaço vertical de leitura, especialmente no mobile.
2. Como um(a) visitante que decide voltar a navegar, quero que o Header reapareça assim que eu começar a rolar para cima, para acessar as âncoras de Experience, Skills e Contact rapidamente.
3. Como um(a) visitante que usa leitor de tela, quero que o Header escondido seja removido da ordem de tabulação e do anúncio de leitura, para não encontrar controles invisíveis.
4. Como um(a) usuário(a) que navega por teclado, quero que o Header volte a aparecer quando eu alcanço um de seus elementos com o Tab, para nunca perder o foco em algo invisível.
5. Como um(a) visitante com preferência de movimento reduzido, quero que o esconder/mostrar aconteça sem animação de deslocamento, para não sofrer movimento forçado.
6. Como um(a) visitante em mobile, quero que a transição de esconder/mostrar seja rápida o suficiente para não parecer lenta ou travada, para a navegação parecer responsiva.
7. Como um(a) visitante que clica em uma âncora (#contact, por exemplo), quero que o Header não oculte o conteúdo clicado nem bloqueie o salto, para chegar ao formulário sem conteúdo escondido por baixo do AppBar.
8. Como um(a) mantenedor, quero que o comportamento viva em um hook reutilizável (por exemplo, um hook de direção de scroll), para que o Header consuma uma decisão pronta e a lógica de scroll não fique espalhada no componente.
9. Como um(a) mantenedor, quero que o Header continue com seu visual atual (AppBar fixo, backdrop blur, links por âncoras) quando visível, para não introduzir uma mudança de identidade junto com a de comportamento.
10. Como um(a) visitante que rola para o topo, quero que o Header esteja sempre visível nessa posição, para ter o ponto de partida da navegação consistente.
11. Como um(a) visitante que usa o telefone com uma mão, quero que ao voltar a rolar para cima eu encontre o botão de contato visível, para poder agir sem procurar navegação.
12. Como um(a) visitante daltônico ou com baixa visão, quero que o Header, quando visível, mantenha contraste suficiente sobre o conteúdo rolado por baixo, para os links permanecerem legíveis.
13. Como um(a) mantenedor, quero que o comportamento não dependa de librerias novas (reutilizando o Framer Motion já instalado), para não aumentar o bundle nem a superfície de manutenção.
14. Como um(a) visitante que abre o site e rola rapidamente, quero que o Header não fique "piscando" entre estados, para evitar uma experiência tremulante em scrolls rápidos.
15. Como um(a) visitante que usa o Header para navegar entre seções várias vezes, quero que o comportamento seja previsível (desce esconde, sobe mostra), para aprender o padrão e confiar nele.
16. Como um(a) mantenedor, quero que o comportamento seja testável em E2E automatizado (scroll simulado e visibilidade do Header verificada), para não regredir em refactors futuros.

## Implementation Decisions

- Módulo do Header como seam principal, consumindo um hook de scroll reutilizável: a decisão "visível/escondido" nasce no hook (direção e posição do scroll) e o componente apenas aplica o estado, mantendo a lógica de scroll fora da hierarquia visual.
- Contrato do hook de scroll: expõe o estado de visibilidade do Header a partir da direção de rolagem e da posição absoluta, incluindo um limiar mínimo para evitar oscilação (pequenos ajustes não trocam o estado), e um gatilho de foco que força a visibilidade quando um elemento dentro do Header recebe foco.
- Decisão arquitetural: animação via Framer Motion: o deslocamento para esconder/mostrar usa as primitivas de animação já presentes no projeto, com duração curta, e é desativado (sem deslocamento animado) quando prefers-reduced-motion está ativo.
- Acessibilidade como parte do contrato: quando escondido, o Header sai da ordem de tabulação (e é ignorado por leitores de tela); ao receber foco interno, ele volta a ficar visível imediatamente, sem exigir um gesto de scroll.
- O Header mantém sua composição atual (AppBar, backdrop blur, navegação por âncoras para #experience, #skills, #contact) e o comportamento de âncora não muda, o scroll inteligente apenas alterna a visibilidade do container.
- Nenhuma dependência nova: o comportamento é construído sobre scroll nativo do documento e Framer Motion, sem libreria de scroll dedicada.

## Testing Decisions

- Seam de teste principal: Playwright E2E em tests/, seguindo o prior art de tests/app.spec.ts e tests/header.spec.ts (data-testid já estabelecidos no Header), verificar que rolar para baixo esconde o Header, rolar para cima o mostra novamente, e que no topo ele está visível.
- Bom teste aqui é comportamental (visibilidade após scroll simulado) e não snapshot de transform/CSS: o teste deve falhar se o Header sumir fisicamente mas continuar focável, e deve cobrir o caso de foco por teclado trazendo o Header de volta.
- Cobrir o caminho de âncoras após a mudança (herdado de tests/app.spec.ts e tests/experience.spec.ts): clicar em um link de seção ainda navega para a âncora correspondente.
- O caso prefers-reduced-motion deve ser verificado manualmente ou por contexto de emulação do Playwright, confirmando que o estado muda sem animação perceptível, sem que isso vire um teste frágil de timing.

## Out of Scope

- Barra de progresso de leitura (PRD separado: progresso-leitura).
- Mudança de layout, conteúdo ou identidade visual do Header.
- Cabeçalho que muda de cor/tamanho ao rolar (apenas visibilidade).
- Menu mobile novo, drawer ou navegação por gestos.
- Compressão do Header ao rolar (efeito "shrink"): apenas esconder/mostrar.
- Mudanças nas seções alvo das âncoras.

## Further Notes

- O limiar de scroll (pequenos movimentos não devem disparar a troca de estado) é uma decisão de UX criticamente importante: sem ele, o Header pisca em scrolls de ajuste fino.
- Em telas muito curtas (landscape mobile), o benefício é proporcionalmente maior; a validação manual deve incluir um viewport baixo.
- O comportamento deve compor com o indicador de progresso de leitura (outro PRD) sem conflito visual: o Header pode esconder enquanto a barra de progresso permanece fixa no topo, ou vice-versa, a definir na integração.
