# PRD: Seção Stack/Toolbox

Status: removed
Feature slug: `secao-toolbox`

## Problem Statement

As Skills atuais são cards genéricos com ícones do MUI e descrições livres, sem identidade visual das tecnologias (logos oficiais) e sem agrupamento que ajude o recrutador a responder "qual é o stack real deste profissional?" rapidamente. Hoje é difícil escanear a profundidade técnica: front-end, back-end, DevOps e ferramentas aparecem misturados, e ícones genéricos não comunicam familiaridade com ferramentas concretas. A seção também não diferencia o que é core do que é complementar, criando ruído para quem decide uma entrevista.

## Solution

Adicionar uma nova seção de página única, acessível pela âncora `#toolbox`, com grade visual de tecnologias agrupadas por categoria (Frontend, Backend, DevOps/Infra, Ferramentas/Qualidade, etc.), cada item exibindo o ícone/logo oficial da tecnologia e o nome. A seção entra no menu do Header, respeita o tema escuro atual, anima entradas com Framer Motion sem prejudicar acessibilidade, e recebe dados de um módulo tipado em `src/data/`.

## User Stories

1. Como um(a) recrutador(a), quero ver as tecnologias agrupadas por categoria com logos oficiais, para identificar em segundos se o stack do profissional bate com a vaga.
2. Como um(a) gerente de engenharia, quero distinguir tecnologias principais de complementares, para priorizar perguntas de entrevista conforme a profundidade real.
3. Como um(a) desenvolvedor(a) visitante, quero reconhecer React, TypeScript, Node e outras ferramentas pelos seus ícones oficiais, para entender a stack sem ler listas longas.
4. Como um(a) visitante no mobile, quero que a grade de tecnologias se reordene em colunas menores sem cortar logos ou nomes, para explorar o stack com o polegar.
5. Como um(a) usuário(a) de leitor de tela, quero que cada tecnologia seja anunciada com nome completo e categoria, para saber exatamente qual ferramenta está representada.
6. Como um(a) usuário(a) que navega por teclado, quero que cada item da grade seja focável e exiba o foco claramente, para inspecionar tecnologias sem mouse.
7. Como um(a) visitante com sensibilidade a movimento, quero que animações de entrada sejam discretas e respeitem `prefers-reduced-motion`, para não me distrair ao rolar a página.
8. Como um(a) visitante, quero que a grade carregue sem deslocamentos quando os ícones aparecem, para que o layout permaneça estável durante a leitura.
9. Como um(a) recrutador(a) em conexão lenta, quero que os ícones sejam leves (SVG oficial otimizado ou sprite), para que a seção não atrase o carregamento total.
10. Como um(a) visitante de SEO, quero que nomes de tecnologias estejam presentes como texto no HTML inicial, para que buscas por stack indexem corretamente a seção.
11. Como um(a) visitante que acessa por link direto, quero chegar à seção pela âncora `#toolbox` já posicionada no título, para não perder o contexto.
12. Como um(a) recrutador(a) no desktop, quero ver o item Toolbox no menu do Header entre as seções técnicas, para navegar diretamente ao resumo de stack.
13. Como um(a) visitante que usa zoom de 200%, quero que logos e nomes cresçam sem sobreposição e que categorias permaneçam separadas visualmente, para ler sem ambiguidade.
14. Como um(a) gestor(a), quero poder filtrar ou destacar uma categoria (ex.: só Backend) sem recarregar a página, para focar no que importa para a vaga.

## Implementation Decisions

- **Estrutura de página**: nova seção em `src/pages/` com âncora `#toolbox`, `data-testid` e heading `h2` no padrão das demais seções; compor com MUI v7 (Grid, Card, Chip, Tooltip, Typography).
- **Integração global**: registrar a seção em `App.tsx` em posição narrativa coerente (após Skills, por exemplo) e adicionar entrada correspondente ao menu do Header com link âncora.
- **Contrato de dados**: módulos tipados em `src/data/` (dependência: camada de dados ainda não existe), `categories` (id, título, descrição opcional) e `technologies` (id, name, categoryId, iconKey/asset, level opcional: "principal" | "complementar", url opcional). Nenhuma tecnologia hardcoded no componente.
- **Ícones oficiais**: usar assets SVG oficiais ou variantes confiáveis (ex.: pacote de ícones de devicon ou assets oficiais), com `alt`/texto acessível, `loading="lazy"`, dimensões reservadas e fundo neutro compatível com o tema escuro (não forçar fundo branco sobre logo que exige contraste).
- **Agrupamento visual**: cabeçalho por categoria com separação clara (título + grade própria), espaçamento e hierarquia via tokens do tema; sem acordeões na primeira entrega, para manter escaneabilidade.
- **Filtro por categoria (opcional escopo mínimo)**: se incluído, implementar como chips de filtro com estado local, sem rota, mantendo grade completa acessível por padrão.
- **Animações**: Framer Motion apenas para fade/stagger discreto de entrada, com `prefers-reduced-motion` desabilitando stagger e transições; nunca animar movimento contínuo.
- **Acessibilidade**: lista semântica por categoria (`ul`/`li` ou `role="list"`/`listitem`), nome da tecnologia como texto visível (não apenas em tooltip), foco visível em itens interativos e contraste AA para texto sobre fundo escuro.
- **Performance**: ícones como SVG inline ou arquivos otimizados; evitar carregar biblioteca inteira de ícones se houver alternativa por arquivo.

## Testing Decisions

- **Prior art**: `tests/experience.spec.ts` (Page Object, asserções de título, contagem de itens, conteúdo por item e âncora) é o modelo. Criar `tests/toolbox.spec.ts` com `ToolboxPage` espelhado, usando `data-testid` por item (`toolbox-item-<id>`) e por categoria.
- **O que é bom teste nesta feature**:
  - A seção existe, está visível após rolagem e possui âncora `#toolbox`.
  - O título principal corresponde ao texto esperado.
  - Todas as categorias de `src/data/` são renderizadas e cada tecnologia aparece na categoria correta com nome e ícone (com `alt` não vazio).
  - A contagem total de itens na grade corresponde ao tamanho da lista de dados.
  - O item de menu do Header linka para `#toolbox`.
  - Nomes de tecnologias estão presentes como texto no DOM inicial (verificação de SEO/semântica).
  - Se houver filtro por categoria, selecionar uma categoria exibe apenas seus itens; "Todas" restaura a grade completa.
  - Navegação por teclado alcança itens interativos e o foco é visível (checagem de ordem de tabulação).
  - Emulação de `prefers-reduced-motion` remove animações de entrada.
- **Escopo de teste**: Playwright E2E como seam principal; não introduzir nova biblioteca de teste.

## Out of Scope

- Níveis de proficiência com barras de progresso ou percentuais (ex.: "React 90%"), esta entrega mostra agrupamento e destaque, não métrica quantitativa.
- Avaliações, certificados ou links de certificação por tecnologia (ficam na seção Jornada/Carreira).
- Repositórios, métricas de uso ou integração com GitHub API.
- Busca textual de tecnologias ou paginação da grade.
- Tradução/i18n dos nomes de categorias.
- Alteração da seção Skills atual além do que for necessário para coexistência (a remoção/merge das Skills fica fora desta entrega, salvo decisão explícita).
- Animação 3D ou destaques que comprometam desempenho e acessibilidade.

## Further Notes

- Depende da camada `src/data/` tipada; se ainda não existir, criar de forma mínima apenas para categorias e tecnologias, sem abstrair demais seções.
- Preferir logos oficiais dos vendors; quando um logo oficial não existir, usar variante neutra equivalente e nunca ilustração genérica enganosa.
- Manter textos em PT-BR; nomes de tecnologias permanecem no idioma original (ex.: "React", "Docker").
