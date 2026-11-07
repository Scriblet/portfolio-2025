# PRD — Hierarquia Tipográfica

Status: ready-for-agent
Feature slug: `hierarquia-tipografica`

## Problem Statement

A página inicial apresenta uma hierarquia tipográfica inconsistente: títulos de seção, conteúdo e metadados não possuem uma escala visual clara que guie o olhar do visitante, e a seção de Experiência contém um elemento de título vazio que gera ruído visual, confusão para leitores de tela e quebra a percepção de qualidade do portfólio. O contraste de alguns textos secundários também é insuficiente, o que penaliza usuários com baixa visão e dispositivos com brilho reduzido. Para um portfólio que é a porta de entrada de um profissional de frontend, essa inconsistência reduz escaneabilidade, credibilidade e acessibilidade, sem que exista um sistema tipográfico reutilizável capaz de manter a consistência em futuras seções.

## Solution

Estabelecer uma escala tipográfica explícita e consistente em toda a página (herói, seções, cards e rodapé), removendo o elemento de título vazio na seção Experiência, reforçando o contraste dos textos secundários e garantindo que cada nível de título comunique claramente sua função na página. A solução deve ser visualmente sutil em desktop e mobile, preservando a identidade do tema escuro e sem introduzir dependências novas, de modo que qualquer seção futura herde automaticamente a nova hierarquia.

## User Stories

1. Como um(a) visitante, quero distinguir rapidamente qual é o título principal e quais são os títulos de seção, para escaneado a página sem esforço.
2. Como um(a) recrutador, quero perceber uma hierarquia visual coerente entre Experience, Skills e Contact, para avaliar o cuidado e o nível profissional do portfólio.
3. Como um(a) visitante, quero não encontrar um título vazio na seção Experience, para não ser distraído(a) por uma lacuna visual ou ficar em dúvida sobre o conteúdo.
4. Como um(a) usuário(a) de leitor de tela, quero que os títulos tenham ordem e níveis corretos no HTML, para navegar pela página por headings de forma lógica.
5. Como um(a) usuário(a) com baixa visão, quero contraste suficiente nos textos secundários, para ler descrições e metadados sem fadiga visual.
6. Como um(a) visitante mobile, quero que a escala tipográfica preserve a hierarquia em telas estreitas, sem truncar ou sobrepor textos.
7. Como um(a) visitante que acessa em monitor externo grande, quero que os títulos não cresçam de forma desproporcional, para manter equilíbrio visual.
8. Como um(a) mantenedor, quero uma escala tipográfica definida em um único lugar, para ajustar títulos de forma global sem caçar estilos espalhados.
9. Como um(a) recrutador que imprime ou salva a página em PDF, quero que a hierarquia permaneça legível, para revisar o portfólio offline.
10. Como um(a) visitante que usa navegação por teclado, quero que o foco visual acompanhe a ordem dos títulos e do conteúdo, para saber onde está na página.
11. Como um(a) usuário(a) com daltonismo, quero que a hierarquia dependa de tamanho, peso e espaçamento (e não apenas de cor), para compreender a estrutura.
12. Como um(a) visitante de língua não nativa, quero títulos curtos e consistentes, para entender rapidamente cada seção.
13. Como um(a) mantenedor, quero que a remoção do elemento vazio não altere o layout do restante da seção, para não introduzir regressão visual.
14. Como um(a) analista do portfólio, quero registrar eventos de rolagem/engajamento por seção de forma estável após a mudança, para comparar métricas de leitura antes e depois.

## Implementation Decisions

- Módulo de tema: centralizar a escala tipográfica no objeto de tema MUI existente (variantes de título, subtítulo, corpo e legenda, com tamanhos responsivos nos breakpoints já definidos), em vez de estilos ad-hoc por componente. Todo componente de seção passa a consumir as variantes do tema.
- Módulo Experience: remover o elemento de título vazio e ajustar o espaçamento subsequente para preservar o ritmo vertical; nenhum outro conteúdo da seção muda.
- Módulo de contraste: clarear as cores de texto secundário no tema para atingir contraste adequado sobre o fundo escuro, mantendo o roxo primário da identidade. Aplicar o ajuste no tema, não por componente.
- Contrato visual: ordem de headings (um único título principal, títulos de seção em nível único e consistente, subtítulos abaixo deles) deve ser idêntica entre HTML, leitores de tela e visual. Sem novos contratos de dados ou de API.
- Decisão de migração: não criar um novo sistema de design ou biblioteca tipográfica; reutilizar tipografia e espaçamento nativos do MUI v7 e animações existentes do Framer Motion sem alterar os timings.
- Decisão de não-regressão: manter os data-testid atuais dos componentes para testes E2E e analytics; nenhuma remoção de identificadores que quebram testes existentes.

## Testing Decisions

- Bom teste aqui é validar estrutura semântica e presença/ausência visual, não pixels exatos: ordem e unicidade do título principal, ausência do elemento vazio na seção Experience, e contraste mínimo dos textos secundários.
- Módulo testado: testes E2E Playwright existentes (prior art: tests/app.spec.ts) como base — estender com asserções de headings e de que o elemento vazio não aparece; testes de componente/serviço apenas se houver lógica de tema reutilizável que mereça cobertura unitária.
- Verificação manual em desktop e viewport mobile para confirmar que a hierarquia se mantém em ambos.
- Critério de aceite: nenhum teste E2E pré-existente deve falhar por mudança de texto ou estrutura; qualquer ajuste em teste deve refletir uma intenção (novo título/ausência do vazio), não uma quebra acidental.

## Out of Scope

- Tema claro/escuro (feature separada).
- Reescrita dos textos da seção Experience ou inclusão de novos conteúdos.
- Redesign completo da identidade visual, paleta de cores primária ou logotipo.
- Mudança da tipografia da fonte (família) — apenas escala, pesos e contraste.
- Atualização do banner GitHub ou adição de projetos em destaque (feature separada).
- Novas dependências ou sistema de design externo.

## Further Notes

- Risco baixo: mudança restrita a tema e à seção Experience. Ficar atento a que o espaçamento vertical da Experience não crie lacunas perceptíveis após a remoção do elemento vazio.
- A escala definida para esta feature deve ser reutilizada pelas próximas features (projetos em destaque, CV, tema claro/escuro) para manter consistência.
