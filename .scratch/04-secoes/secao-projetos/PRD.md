# PRD — Seção Projetos

Status: ready-for-agent
Feature slug: `secao-projetos`

## Problem Statement
A presença pública do autor hoje depende de um banner genérico de GitHub com texto e CTA genéricos, que não comunica o que foi construído, quais tecnologias foram usadas, nem prova de resultado. Visitantes que querem julgar capacidade técnica precisam sair do portfólio e garimpar repositórios sem contexto, o que aumenta o atrito e reduz a chance de compreensão do trabalho. Também existe duplicação conceitual, pois links sociais, habilidades e dados de apresentação estão espalhados e hardcoded em componentes, dificultando curadoria intencional de três a seis projetos destaques com imagem, stack e links claros.

## Solution
Criar uma seção Projetos com grid de três a seis projetos curados, cada card contendo thumb, título, descrição curta, stack representada por chips/ícones, e links para demo ou repositório quando existirem. A seção substitui ou amplia a experiência do banner de GitHub, mantendo um CTA leve para perfil completo, e adota dados centralizados curados em vez de textos hardcoded. O layout respeita tema escuro, motion e responsividade existentes, expõe data-testid para testes, registra cliques em analytics, e funciona como prova visual rápida para recrutadores sem exigir navegação externa.

## User Stories
1. Como um(a) recrutador(a) técnico(a), quero ver de três a seis projetos curados em grid na própria página, para avaliar em segundos o que o autor construiu sem precisar sair para o GitHub.
2. Como um(a) visitante que rola pela seção de projetos, quero preview visual com thumbnail para cada projeto, para entender o tipo de produto e a qualidade visual antes de abrir qualquer link.
3. Como um(a) visitante que avalia stack, quero ver as principais tecnologias de cada projeto em chips ou ícones, para cruzar rapidamente as skills declaradas com trabalho real.
4. Como um(a) visitante interessado(a) em um projeto, quero links claros para demo ao vivo e repositório quando disponíveis, para explorar o projeto no contexto que preferir.
5. Como um(a)Visitante(a) que não quer abrir links externos acidentalmente, quero diferenciação visual e abertura em nova guia para links externos de projetos, para manter controle sobre a navegação.
6. Como um(a) usuário(a) em dispositivos móveis, quero que o grid de projetos collapse para coluna única com cards legíveis, para explorar projetos no celular sem zoom ou scroll horizontal.
7. Como um(a) visitante que adiciona um novo projeto ao portfólio, quero curadoria simples a partir de dados centralizados sem editar o layout do card, para atualizar vitrine com uma entrada declarativa.
8. Como um(a) visitante que acessa via teclado ou leitor de tela, quero cards com títulos semânticos, descrições legíveis e alvos de link acessíveis, para explorar projetos de forma autônoma.
9. Como um(a) pessoa responsável por métricas, quero eventos de analytics para visualização da seção e cliques em demo e repositório por projeto, para saber quais projetos geram mais interesse.
10. Como um(a) visitante que já viu o banner de GitHub, quero um estado claro entre a nova seção curada e o CTA genérico de perfil completo, para não confundir projetos em destaque com conta no GitHub.
11. Como um(a) autor(a) que quer provar resultado, quero descrição curta com contexto e impacto do projeto, para que o visitante entenda o problema resolvido sem ler a documentação completa.
12. Como um(a) visitante com preferência por acessibilidade, quero que thumbs tenham texto alternativo significativo e que cores da stack tenham contraste suficiente, para perceber imagens e chips sem depender apenas de cor.
13. Como um(a) visitante que completa a visão de projetos, quero animação de entrada discreta e consistente com as demais seções, para sentir continuidade visual sem distrações excessivas.
14. Como um(a) visitante que encontra a seção em um estado sem projetos publicados, quero um vazio amigável com fallback para CTA de GitHub, para a página não parecer quebrada antes da primeira curadoria.

## Implementation Decisions
Módulo de dados centralizados de projetos como seam de conteúdo, com um contrato de projeto incluindo identificador, título, descrição curta, imagem de thumbnail com texto alternativo, stack como lista de tags, links de demo e repositório opcionais, destaque e ordem de exibição. O componente de seção consome essa lista e renderiza um grid responsivo de três a seis cards, com variante compacta para telas pequenas, usando o sistema visual existente de tema, tipografia e motion, e reutilizando padrões de chips e ícones sem introduzir nova biblioteca de UI. Links externos abrem em nova guia com indicação visual, cliques emitem analytics com identificador do projeto e tipo de destino, e thumbs usam assets estáticos do projeto com fallback visual quando a imagem está ausente. A relação com o banner de GitHub deve ser definida como ampliação, mantendo o perfil completo como CTA secundário após a vitrine curada, sem remover navegação para a conta. Os seams principais são a camada E2E e o componente de card e grid, e nenhum novo backend, ORM ou extração automática de repositórios é necessário nesta entrega.

## Testing Decisions
Bom teste é aquele que valida presença da seção, quantidade de projetos curados, thumb, stack, links de demo e repositório, estado vazio com fallback, layout responsivo básico e cliques com analytics, sem depender de screenshots pixel-perfect ou de dados reais de rede. O essencial é cobrir renderização com fixtures de três projetos, navegação por teclado, ausência ou presença condicional de links, fallback de imagem e ordem de exibição. Prior art é a suite Playwright da aplicação, especialmente o cenário de GitHub que já valida visibilidade de CTA e âncoras entre seções, que deve ser estendido para a nova seção com novos data-testid para grid, cards, thumbnails, chips de stack e links de projeto. Testes de componente devem validar o contrato de dados, o card com e sem links opcionais e o estado vazio, enquanto testes E2E validam a jornada de leitura de projeto e clique em demo. Usar fixtures mockadas do módulo de dados de projetos para isolar a UI da curadoria real e evitar flakiness por rede externa ou repositórios reais.

## Out of Scope
Extração automática de repositórios externos via API do GitHub, buscador do GitHub por nome, filtro avançado por linguagem no servidor, página de detalhe rica por projeto fora do card, sistema de likes ou comentários, integração com CI de demonstração, CMS administrativo, e substituição completa dos dados de skills ou do rodapé por esta feature.

## Further Notes
A curadoria inicial deve equilibrar variedade técnica e prova de impacto, priorizando projetos com demo funcional quando possível. A dependência futura de centralização de dados deve ser respeitada para que esta feature não duplique tipos de projeto, skill ou link social. O visual deve seguir as seções vizinhas de Skills, Experience e GithubBanner, reutilizando tema escuro, espaçamento e motion, e qualquer evolução para biblioteca de projetos completa pode partir deste mesmo contrato de dados.
