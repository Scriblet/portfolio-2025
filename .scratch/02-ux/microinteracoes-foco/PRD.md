# PRD: Microinterações e Estados de Foco Consistentes

Status: ready-for-agent
Feature slug: `microinteracoes-foco`

## Problem Statement

Hoje os elementos interativos do portfólio (links do Header, botões, cards de Skills, campos do ContactForm) dependem dos estados padrão do MUI e do navegador sem um padrão próprio: hover, focus, active e focus-visible variam entre componentes, alguns não têm indicador de foco visível suficiente sobre o tema escuro, e não há regra clara de movimento para microinterações. Na prática, isso significa que um usuário de teclado pode não saber onde está o foco, um visitante com baixa visão pode perder o contraste do estado de foco sobre o fundo #121212, e a experiência de "toque" (hover/active) é inconsistente entre seções. O portfólio transmite uma sensação de acabamento menor exatamente nos detalhes que sinalizam qualidade.

## Solution

Padronizar os estados interativos de toda a superfície interativa em um único sistema: regras consistentes de hover (elevação/sombra ou realce sutil), focus-visible (anel de foco sempre visível com contraste adequado sobre o tema escuro), active/pressed (resposta imediata ao toque), e transições curtas e previsíveis para cada estado, tudo derivado do tema MUI existente, com duração e curva únicas, e com respeito completo a prefers-reduced-motion (transições de estado podem permanecer instantâneas, mas sem deslocamento ou animação de escala). O objetivo é que qualquer elemento interativo "pareça" pertencer ao mesmo produto, funcione para mouse, toque e teclado, e seja auditável visualmente em uma única passada.

## User Stories

1. Como um(a) usuário(a) que navega por teclado, quero sempre saber onde está o foco (anel de foco visível em qualquer elemento interativo), para navegar sem me perder.
2. Como um(a) visitante que usa o mouse, quero que todo elemento interativo responda ao passar o cursor com um realce sutil e consistente, para entender o que é clicável.
3. Como um(a) visitante em mobile que toca em um elemento, quero uma resposta imediata de toque (estado active) sem atraso, para sentir que a interface reagiu.
4. Como um(a) visitante com deficiência visual, quero que o indicador de foco tenha contraste suficiente sobre o fundo escuro (#121212) e sobre os cards de Skills, para conseguir localizá-lo.
5. Como um(a) usuário(a) de leitor de tela, quero que os estados de foco não sejam anunciados como eventos (apenas visualmente corretos), para não receber ruído extra durante a navegação.
6. Como um(a) visitante com preferência de movimento reduzido, quero que microinterações não envolvam deslocamento ou escala, apenas mudanças de cor/sombra, para evitar movimento forçado.
7. Como um(a) visitante daltônico, quero que o foco não dependa apenas de cor (anel/contorno com forma), para conseguir identificar onde estou.
8. Como um(a) visitante que usa o formulário de contato, quero que os campos tenham estados claros e consistentes de foco, erro e preenchimento, para saber onde estou e o que falta.
9. Como um(a) visitante que navega entre seções (links do Header, botões de âncoras), quero que o mesmo padrão visual se aplique em todos os lugares, para aprender uma vez e reconhecer em toda a página.
10. Como um(a) mantenedor, quero que hover/focus/active e transições sejam definidos uma vez no tema (Tokens MUI) e consumidos por todos os componentes, para não duplicar estilos nem deixar um componente "esquecido" com outro padrão.
11. Como um(a) mantenedor, quero que os componentes de Skills (cards hardcoded com MUI icons) e o ContactForm herdem o mesmo sistema de estados sem reescrever sua lógica, para a padronização não exigir manutenção dupla.
12. Como um(a) visitante em mobile com tela pequena, quero que os alvos de toque e os indicadores de foco não sejam cortados ou sobrepostos, para conseguir interagir com precisão.
13. Como um(a) mantenedor, quero que o sistema de estados seja verificável em E2E (foco por teclado alcança elementos interativos e o anel é aplicado), para não regredir em refactors de componentes.
14. Como um(a) visitante que usa.zoom de 200% do navegador, quero que os indicadores de foco continuem visíveis e não cortados, para manter a orientação em níveis de ampliação altos.
15. Como um(a) mantenedor, quero que a padronização respeite o tema existente (Poppins, paleta primary #673ab7, breakpoints atuais), para não introduzir uma segunda linguagem visual junto com a de estados.
16. Como um(a) visitante que volta ao site meses depois, quero que a interface pareça a mesma de antes e apenas mais consistente, para não precisar reaprender interações.

## Implementation Decisions

- Módulo de tema (src/theme.ts) como seam principal: a padronização nasce em um único lugar, tokens de transição (duração e curva compartilhadas), estilo de focus-visible (anel com contraste sobre o tema escuro) e regras de hover/active, consumidos pelos componentes via sistema MUI, em vez de estilos espalhados por arquivo.
- Contrato do tema: cada estado interativo (hover, focus-visible, active) tem uma definição central que cobre links do Header, botões, cards de Skills, campos do ContactForm e qualquer elemento interativo futuro; novos componentes herdam o padrão sem sobrescritas ad-hoc.
- Decisão arquitetural: foco via MUI: o comportamento de focus-visible do MUI é estendido com o anel customizado do tema (sempre presente em navegação por teclado, suprimido em clique de mouse, conforme a convenção focus-visible), sem implementar um sistema paralelo de foco.
- Decisão de movimento: as microinterações usam transições curtas sobre propriedades baratas (cor, sombra, opacidade); com prefers-reduced-motion, deslocamento e escala são removidos e restam apenas mudanças instantâneas de cor/sombra.
- Os componentes existentes (Header, Skills, ContactForm) apenas consomem o tema, nenhuma mudança de lógica de comportamento, apenas herança dos estados padronizados; os dados hardcoded de Skills e o webhook do formulário não são tocados por este PRD.
- Nenhuma dependência nova; tudo é construído sobre o sistema de tema MUI v7 e Framer Motion já presentes.

## Testing Decisions

- Seam de teste principal: Playwright E2E em tests/, seguindo o prior art de tests/app.spec.ts e tests/header.spec.ts, verificar que todos os elementos interativos principais são alcançáveis por teclado e que o estado de foco visível é aplicado (presença do anel, sem depender de pixel exato de sombra).
- Bom teste aqui é comportamental e de cobertura (todo controle interativo alcança o foco e exibe indicador) e não snapshot de CSS: o teste deve enumerar os elementos interativos da composição (Header, Skills, ContactForm, Footer) e falhar se algum deles ficar sem foco visível, mas não deve quebrar por ajuste fino de cor ou sombra.
- Cobrir a ausência de regressão no formulário de contato (fluxo de preenchimento e envio herdado dos specs existentes) e na navegação por âncoras do Header.
- O comportamento com prefers-reduced-motion deve ser verificado por emulação de contexto no Playwright (estado muda sem animação), sem testes frágeis de timing.

## Out of Scope

- Redesign de layout, cores, tipografia ou identidade visual.
- Migração dos dados hardcoded de Experience e Skills para fontes externas.
- Correção do webhook Discord hardcoded no formulário (outro PRD).
- Novas animações de entrada de seções ou de scroll (apenas microinterações de estado).
- Barra de progresso e scroll inteligente do Header (PRDs separados).
- Sistema de design completo ou documentação de componentes (além dos tokens de estado).

## Further Notes

- O maior risco é deixar um componente interativo "esquecido" sem o padrão: a verificação deve ser uma enumeração de cobertura (todos os elementos interativos da página), não testes pontuais por componente.
- O contraste do anel de foco sobre o fundo escuro e sobre superfícies elevadas (cards) precisa de verificação manual com temas claros/escuros de conteúdo, já que E2E não mede percepção de contraste de forma confiável.
- Zoom de 200% e telas com densidade alta são os cenários de validação manual recomendados após a implementação.
