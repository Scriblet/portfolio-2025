# PRD — Seção Depoimentos/Recomendações

Status: ready-for-agent
Feature slug: `secao-depoimentos`

## Problem Statement

O portfólio atual apresenta experiência de forma factual (empresas, cargos e descrições em cards), mas não inclui nenhuma prova social: não há depoimento, recomendação ou citação de colegas, gestores ou clientes que valide a qualidade do trabalho. Recrutadores visitantes precisam inferir confiabilidade e impacto apenas a partir de descrições autodeclaradas, o que reduz credibilidade em uma decisão de contato. Além disso, há risco de estourar a página com textos longos ou quebrar o tema escuro atual se os depoimentos forem apenas empilhados verticalmente sem curadoria visual.

## Solution

Adicionar uma nova seção de página única, acessível pela âncora `#depoimentos`, com um carrossel de depoimentos/recomendações. Cada depoimento exibe foto, nome, cargo/empresa, texto da citação e, opcionalmente, link para perfil profissional. A seção entra no menu do Header ao lado de Experience, Skills e Contato, segue o tema escuro existente (Poppins, clamp, roxo `#673ab7`) e recebe seus dados de um novo módulo tipado em `src/data/`, separando conteúdo de apresentação.

## User Stories

1. Como um(a) recrutador(a), quero ver depoimentos com foto, nome e cargo da pessoa que recomenda, para avaliar rapidamente a credibilidade e o contexto profissional de cada recomendação.
2. Como um(a) visitante interessado(a) em contratar, quero ler citações curtas e diretas sobre impacto e colaboração, para confirmar se o profissional entrega valor além de habilidades técnicas.
3. Como um(a) gestor(a) de tecnologia, quero avançar e voltar entre depoimentos no carrossel, para comparar diferentes vozes sem sair da seção.
4. Como um(a) visitante no mobile, quero que o carrossel seja deslizado por toque e que botões de navegação sejam grandes o suficiente, para navegar sem zoom ou frustração em telas pequenas.
5. Como um(a) usuário(a) de leitor de tela, quero que cada depoimento seja anunciado como um item de lista com nome, cargo e citação completos, para entender quem recomenda sem depender de imagens.
6. Como um(a) usuário(a) que navega por teclado, quero alcançar os controles do carrossel em ordem lógica e ver o foco destacado, para operar a seção sem usar o mouse.
7. Como um(a) visitante com preferência de movimento reduzido, quero que o carrossel não se mova automaticamente ou que a animação seja respeitada, para evitar desconforto e perda de leitura.
8. Como um(a) visitante, quero que a seção carregue sem deslocamento visual depois que as fotos aparecem, para que o layout não salte enquanto leio.
9. Como um(a) recrutador(a), quero que fotos de depoentes sejam responsivas e otimizadas, para que a seção não penalize o tempo de carregamento no 4G.
10. Como um(a) visitante de SEO, quero que depoimentos renderizem no HTML inicial com título e texto da seção, para que mecanismos de busca indexem a prova social.
11. Como um(a) visitante que acessa por link direto, quero chegar à seção pela âncora `#depoimentos` e vê-la destacada, para não precisar rolar toda a página.
12. Como um(a) recrutador(a) no desktop, quero ver o menu do Header com o item Depoimentos na ordem do conteúdo, para antecipar onde encontrar recomendações.
13. Como um(a) visitante que usa ampliador de texto, quero que nome, cargo e citação cresçam proporcionalmente sem sobrepor a foto ou os controles, para ler com conforto em 200% de zoom.
14. Como um(a) gerente de produto, quero saber que o carrossel funciona com 1 depoimento (sem controles inúteis) e com muitos (com paginação/indicadores), para garantir comportamento previsível com qualquer volume de conteúdo.

## Implementation Decisions

- **Estrutura de página**: nova seção em `src/pages/` seguindo o padrão das seções existentes, com âncora `#depoimentos`, `data-testid` de seção e heading no nível hierárquico esperado (`h2` com clamp do tema).
- **Integração global**: registrar a seção no `App.tsx` na ordem narrativa definida (após Experience ou Skills, a critério do agente, mantendo uma única ordem consistente) e adicionar o item correspondente ao menu do Header com link âncora.
- **Contrato de dados**: novo módulo tipado em `src/data/` (dependência deste plano: camada de dados ainda não existe) exportando uma lista de depoimentos com campos `id`, `quote`, `authorName`, `authorRole`, `authorCompany`, `photoUrl` e `profileUrl` opcional. A seção consome apenas esse contrato; nenhuma string de depoimento permanece hardcoded no componente.
- **Carrossel**: implementar com Framer Motion para transições e gesto de arrastar (drag) no desktop/mobile, com controles anterior/próximo, indicadores de posição e auto-avanço pausável. Respeitar `prefers-reduced-motion` desabilitando auto-avanço e animações de transição.
- **Acessibilidade**: região de carrossel com `aria-roledescription` e `aria-live="polite"` para anúncio da posição ("Depoimento 2 de 5"), lista semântica para itens, botões com `aria-label` em PT-BR, foco visível e ordem de tabulação coerente.
- **Fotos**: usar URLs otimizadas (WebP quando possível), `alt` descritivo com nome do autor, dimensões reservadas para evitar CLS e `loading="lazy"` para itens fora da viewport.
- **Tema**: reutilizar tokens do tema escuro existente e componentes MUI v7 (Card, Avatar, IconButton, Typography) sem criar novo sistema visual.
- **SEO/semântica**: texto completo de cada depoimento presente no HTML inicial (sem exigir interação para renderizar), heading único e uso de `<figure>`/`<blockquote>`/`<figcaption>` para a citação e autoria.

## Testing Decisions

- **Prior art**: `tests/experience.spec.ts` (Page Object `ExperiencePage`, asserções de título, contagem de cards, conteúdo por item e âncora) é o modelo direto. Criar `tests/depoimentos.spec.ts` com Page Object espelhado (`DepoimentosPage`) com `goto()`, `scrollToSection()`, seletores por `data-testid` e métodos para navegar o carrossel.
- **O que é bom teste nesta feature**:
  - A seção existe, está visível após rolagem e possui âncora `#depoimentos`.
  - O título principal corresponde ao texto esperado.
  - O carrossel renderiza exatamente a quantidade de depoimentos vindos de `src/data/` e cada item exibe citação, nome, cargo e foto com `alt`.
  - Navegar para frente e para trás atualiza o depoimento ativo e o indicador de posição ("X de N").
  - Com um único depoimento, controles de navegação ficam desabilitados ou ocultos.
  - O item de menu do Header linka para `#depoimentos`.
  - Navegação inteiramente por teclado alcança os controles e o foco é visível (verificação de `tabIndex` e ordem).
  - `prefers-reduced-motion` desabilita o auto-avanço (teste de emulação via Playwright).
- **Escopo de teste**: Playwright E2E como seam principal (interação real com carrossel) + checagem de componente para contraste/tema apenas se já houver infraestrutura; não introduzir nova biblioteca de teste nesta feature.

## Out of Scope

- Sistema de comentários ou envio de novos depoimentos pelo visitante.
- Integração automática com APIs de redes sociais (LinkedIn, etc.) ou sincronização de recomendações.
- Moderação, aprovação ou autenticação de autores de depoimentos.
- Tradução/i18n dos depoimentos ou detecção automática de idioma.
- Animação de partículas, parallax pesado ou qualquer efeito que comprometa performance e acessibilidade.
- Alteração da estrutura das seções existentes (Experience, Skills, ContactForm) além do registro da nova seção e do item de menu.
- Criação de fotos/avatar gerados por IA; usar apenas imagens fornecidas ou placeholders autorizados.

## Further Notes

- Depende da camada `src/data/` tipada; se ela ainda não existir, esta feature deve criá-la de forma mínima apenas para depoimentos, sem generalizar para outras seções.
- Citações devem ser reais e autorizadas pelos autores; evitar depoimentos fictícios ou genéricos sem atribuição.
- Manter textos em PT-BR seguindo o tom das demais seções.
