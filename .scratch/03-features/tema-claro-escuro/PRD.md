# PRD: Tema Claro/Escuro

Status: ready-for-agent
Feature slug: `tema-claro-escuro`

## Problem Statement

O portfólio existe apenas em tema escuro, com cores fixas no tema, o que exclui visitantes que preferem ou precisam de tema claro (sensibilidade à luz, leitura diurna prolongada, conforto visual e seguir a preferência do sistema) e ignora o sinal explícito do sistema operacional via prefers-color-scheme. Não há controle do usuário sobre a aparência, nenhuma persistência de preferência entre visitas e nenhuma forma de o mantenedor manter um único sistema de tema capaz de servir os dois modos sem duplicar componentes.

## Solution

Adicionar um toggle de tema claro/escuro visível e acessível no portfólio, com um único sistema de tema dinâmico no MUI (ThemeProvider reativo), persistência da escolha do usuário em localStorage, leitura inicial da preferência do sistema (prefers-color-scheme) quando não houver escolha salva, e transições suaves sem recarregar a página. Ambos os temas devem preservar a identidade (roxo primário), contraste adequado e a hierarquia tipográfica, com eventos de analytics para medir o uso de cada tema.

## User Stories

1. Como um(a) visitante, quero trocar entre tema claro e escuro com um toque/clique, para escolher a aparência mais confortável.
2. Como um(a) visitante, quero que minha escolha de tema persista ao voltar ao portfólio, para não precisar reconfigurar a cada visita.
3. Como um(a) visitante, quero que o tema inicial siga minha preferência do sistema quando não escolhi nada, para ter o tema que já uso no sistema.
4. Como um(a) usuário(a) de leitor de tela, quero que o toggle tenha rótulo e estado acessíveis (qual tema está ativo), para entender e operar a troca.
5. Como um(a) usuário(a) de teclado, quero alcançar o toggle na ordem natural da página com foco visível, para trocar o tema sem mouse.
6. Como um(a) visitante mobile, quero o toggle compacto e de fácil toque no cabeçalho, para trocar rapidamente em qualquer tela.
7. Como um(a) usuário(a) sensível à luz, quero tema claro com contraste adequado (e não branco puro ofuscante), para ler sem desconforto.
8. Como um(a) visitante diurno em ambiente com muita luz, quero tema claro legível, para revisitar o portfólio durante o dia.
9. Como um(a) usuário(a) com baixa visão, quero que ambos os temas mantenham contraste suficiente nos textos, para ler em qualquer modo.
10. Como um(a) recrutador que imprime, quero que o tema não prejudique a leitura impressa, para revisar o conteúdo offline.
11. Como um(a) visitante que prefere movimento reduzido, quero que a transição de tema respeite essa preferência, para não experimentar flashes.
12. Como um(a) mantenedor, quero um único sistema de tema com paletas claro/escuro derivadas, para manter consistência sem duplicar componentes.
13. Como um(a) analista, quero registrar a troca de tema e o tema em uso, para saber a distribuição de preferências e priorizar melhorias.
14. Como um(a) visitante que limpa o armazenamento local, quero que o portfólio continue funcionando (fallback para tema escuro ou preferência do sistema), para nunca quebrar a experiência.
15. Como um(a) visitante em primeira visita, quero o toggle descoberto facilmente no cabeçalho, para entender que a troca é possível.
16. Como um(a) mantenedor, quero que a hierarquia tipográfica e os componentes existentes (seções, botões, cards, formulários) se adaptem automaticamente ao tema, sem estilos fixos por componente.

## Implementation Decisions

- Módulo de tema: substituir a instância estática do tema por um sistema de duas paletas (claro/escuro) no mesmo módulo de tema, com o ThemeProvider reativo recebendo o tema ativo como estado da aplicação, preservando o roxo primário, o fundo escuro atual e os breakpoints existentes. Todos os componentes (Header, seções, cards, formulários, rodapé) passam a consumir cores e tipografia do tema ativo, sem cores fixas dispersas.
- Módulo de preferência (novo, serviço simples): ler a escolha salva de localStorage, caso contrário ler prefers-color-scheme do sistema, caso contrário usar o tema escuro atual como padrão; escrever a escolha do usuário no localStorage a cada troca, com tratamento para armazenamento indisponível (fallback silencioso sem erro visível).
- Módulo Header/App: toggle de tema (botão com ícone e rótulo acessível, estado atual anunciado) no cabeçalho, acessível por teclado e com foco visível; a troca aplica o tema imediatamente sem recarregar a página e sem perder estado de animações em andamento.
- Contrato de analytics: registrar evento de troca de tema e o tema aplicado, com o serviço de analytics existente; sem dados pessoais.
- Decisão de transição: transição de cores curta e suave via recursos nativos do tema, respeitando a preferência de movimento reduzido (sem animação). Sem novas bibliotecas.
- Decisão de regressão: data-testid atuais e eventos existentes permanecem; nenhum componente depende de cor fixa para identificação em testes.

## Testing Decisions

- Bom teste aqui é validar comportamento de tema: escolha inicial segue localStorage → prefers-color-scheme → padrão escuro, toggle aplica e persiste o tema, e evento de analytics dispara.
- Módulo testado: serviço de preferência (prioridade localStorage, leitura do sistema, padrão, armazenamento indisponível) com testes unitários/serviço; fluxo E2E Playwright (prior art: tests/app.spec.ts) para toggle → persistência entre recargas → tema aplicado, com data-testid no toggle.
- Prior art: seguir os padrões de data-testid e de verificação de comportamento de tests/app.spec.ts; mocks de localStorage e de prefers-color-scheme nos testes, sem depender do ambiente real do navegador do desenvolvedor.
- Verificação manual em ambos os temas em desktop e mobile para contraste e hierarquia visual.
- Critério de aceite: remover a escolha salva deve restaurar o comportamento de leitura do sistema; falha de armazenamento não pode quebrar a página.

## Out of Scope

- Temas personalizados além de claro/escuro, ou temas por seção/componente.
- Sincronização de preferência entre dispositivos ou contas.
- Mudança da identidade de cores primária ou da tipografia (apenas derivação claro do sistema atual).
- Download de CV, projetos em destaque e hierarquia tipográfica (features separadas; esta feature apenas fornece o tema dinâmico que elas consomem).
- Correção do formulário de contato ou do webhook (feature técnica separada).
- Novas dependências para theming.

## Further Notes

- Atenção a pisar em cores fixas fora do tema (incluindo animações Framer Motion e estilos de cards), o objetivo é que nenhum componente precise de mudança para adaptar-se ao novo tema.
- Se a feature de hierarquia tipográfica tiver alterado a escala tipográfica, consumi-la sem duplicar definições de tipografia no novo sistema de temas.
