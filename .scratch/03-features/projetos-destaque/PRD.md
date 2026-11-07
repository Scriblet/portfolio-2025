# PRD — Projetos em Destaque

Status: ready-for-agent
Feature slug: `projetos-destaque`

## Problem Statement

O portfólio atualmente exibe um banner genérico de GitHub que não apresenta projetos, descrições ou evidências concretas do trabalho do profissional, desperdiçando o espaço mais persuasivo da página. Visitantes e recrutadores querem ver projetos reais — com nome, descrição, tecnologias e link — antes de decidir entrar em contato, mas hoje só encontram um convite genérico para visitar um perfil. Isso reduz o engajamento, enfraquece a apresentação técnica e impede qualquer medição de quais projetos despertam interesse.

## Solution

Substituir o banner genérico por uma seção de projetos em destaque composta por cards interativos (nome, descrição, tecnologias, links), alimentada pela API pública do GitHub com cache para não depender de disponibilidade em tempo real, e com fallback elegante (conteúdo estático ou mensagem) quando a API falhar ou estiver indisponível. A seção deve ser visualmente consistente com a hierarquia tipográfica do portfólio, responder bem no mobile e gerar eventos de analytics sobre cliques em projetos.

## User Stories

1. Como um(a) visitante, quero ver projetos em destaque com nome e descrição, para avaliar rapidamente o trabalho do profissional sem sair da página.
2. Como um(a) recrutador, quero ver quais tecnologias cada projeto usa, para filtrar por stack compatível com a vaga.
3. Como um(a) visitante, quero clicar em um card e abrir o repositório/demonstração em nova janela, para explorar o projeto sem perder o portfólio.
4. Como um(a) visitante mobile, quero cards empilhados e fáceis de tocar, para navegar pelos projetos com uma mão.
5. Como um(a) usuário(a) de leitor de tela, quero que cada card tenha nome acessível e ordem de leitura lógica, para entender os projetos.
6. Como um(a) usuário(a) de teclado, quero focar e ativar cada card/link de forma clara, para explorar sem mouse.
7. Como um(a) visitante, quero que a página carregue mesmo se a API do GitHub falhar (conteúdo de reserva), para não ver uma seção vazia ou quebrada.
8. Como um(a) visitante em conexão lenta, quero que os projetos apareçam rapidamente graças ao cache, para não esperar requisições repetidas.
9. Como um(a) mantenedor, quero que os projetos destacados sejam selecionáveis sem mudar código (ex.: lista de repos fixos), para controlar o que aparece.
10. Como um(a) recrutador, quero indicadores visuais de tipo de projeto (ex.: front-end, ferramenta, estudo), para priorizar o que avaliar.
11. Como um(a) visitante que prefere movimento reduzido, quero que as animações dos cards respeitem essa preferência, para não ser incomodado(a).
12. Como um(a) analista, quero eventos de visualização e clique por projeto, para saber quais projetos geram mais interesse.
13. Como um(a) mantenedor, quero tratar limites de taxa da API de forma silenciosa com cache, para a página nunca exibir erro ao visitante.
14. Como um(a) visitante com baixa visão, quero contraste e escala tipográfica adequados nos cards, para ler descrições sem esforço.
15. Como um(a) recrutador em visita rápida, quero uma chamada para ação clara após os projetos (contato), para converter engajamento em conversa.

## Implementation Decisions

- Módulo Projects (novo, dentro da ordem das seções da página): componente de lista que consome dados de repositórios e renderiza cards interativos; substitui o banner genérico de GitHub no App, mantendo Header → Presentation → Experience → Philosophy → Skills → Projects → Contact → Footer.
- Módulo de serviço GitHub (novo): adaptador da API pública do GitHub (lista de repos do usuário, com filtro para os destacados) com camada de cache (cache em memória + persistência local com expiração) e retorno de fallback estático quando a API falhar. Sem autenticação; respeitar limites públicos.
- Contrato de dados interno: lista de projetos com nome, descrição, URL, stack/linguagens, datas de atualização e indicadores; a seleção de destaques é configurável pelo mantenedor sem alterar o contrato.
- Decisão de renderização: renderizar a seção de forma assíncrona sem bloquear o restante da página; skeleton/estado de carregamento discreto e fallback silencioso (sem mensagens de erro técnicas ao visitante).
- Decisão visual: cards reutilizam a escala tipográfica e o tema MUI existentes, com interatividade via animações Framer Motion já presentes; sem novas bibliotecas.
- Analytics: registrar eventos de clique/visualização com o nome do projeto via serviço de analytics existente, reutilizando data-testid para testes.

## Testing Decisions

- Bom teste aqui é validar comportamento de integração e resiliência: renderização dos cards a partir de dados (mockados), fallback quando a API falha, links corretos, e eventos de analytics disparados.
- Módulo testado: serviço GitHub com cache (testes unitários/serviço: sucesso, falha, expiração de cache) e componente de cards (testes de componente). Seam principal segue E2E Playwright (prior art: tests/app.spec.ts) para fluxo ponta a ponta com a API mockada/interceptada, sem depender da rede real nos testes.
- Prior art: seguir o padrão de data-testid de tests/app.spec.ts para localizar seção e cards de forma estável.
- Critério de aceite: nenhum teste deve consultar a API real do GitHub; taxa de falha da rede não pode quebrar os testes.

## Out of Scope

- Autenticação, repositórios privados ou escrita no GitHub.
- Páginação completa ou busca entre todos os repositórios.
- Blog, métricas de estrelas detalhadas ou gráficos de atividade por projeto.
- Trocar a seção de Contact ou o formulário (feature separada).
- Download de CV, tema claro/escuro e hierarquia tipográfica (features separadas; esta feature apenas consome a escala tipográfica existente).

## Further Notes

- Prioridade é a resiliência: cache + fallback estático garantem que o portfólio nunca fique sem projetos por indisponibilidade da API.
- Se a API pública não entregar dados suficientes, o fallback estático deve ser mantido pelo mantenedor como lista padrão de repos.
