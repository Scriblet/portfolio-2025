# PRD — Seção Jornada/Carreira

Status: ready-for-agent
Feature slug: `secao-timeline`

## Problem Statement

O portfólio hoje mostra apenas as empresas onde o profissional trabalhou (cards em Experience), mas não conta a trajetória completa: formação acadêmica, certificações, cursos relevantes e conquistas aparecem dispersos ou ausentes. Recrutadores precisam montar a linha do tempo manualmente a partir de descrições, o que aumenta o esforço de leitura e pode fazer marcos importantes (formação, certificação, promoção) passarem despercebidos. Também não há uma visualização cronológica que comunique evolução e consistência de carreira.

## Solution

Adicionar uma nova seção de página única, acessível pela âncora `#jornada`, com uma timeline vertical cronológica exibindo marcos de carreira: formação, certificações, evoluções profissionais e conquistas, cada um com período, título, instituição/empresa e descrição breve. A seção entra no menu do Header, segue o tema escuro (linha vertical, marcadores, cards) e consome dados de um módulo tipado em `src/data/`.

## User Stories

1. Como um(a) recrutador(a), quero percorrer a jornada em ordem cronológica do mais recente ao mais antigo, para entender rapidamente a evolução e a consistência da carreira.
2. Como um(a) gestor(a) de RH, quero identificar formação acadêmica, certificações e conquistas distintas na timeline, para validar requisitos formais da vaga sem caçar informações.
3. Como um(a) visitante interessado(a) em mentoria ou consultoria, quero ver marcos de aprendizado e especialização, para avaliar autoridade técnica e didática.
4. Como um(a) visitante no mobile, quero que a timeline vertical se adapte a uma única coluna sem que linha, marcadores ou datas se sobreponham, para ler a trajetória com o polegar.
5. Como um(a) usuário(a) de leitor de tela, quero que cada marco seja um item de lista ordenado com período, título e descrição anunciados em sequência, para reconstruir a cronologia sem depender da posição visual.
6. Como um(a) usuário(a) que navega por teclado, quero alcançar os marcos em ordem cronológica e ver o foco destacado, para inspecionar cada etapa sem mouse.
7. Como um(a) visitante com sensibilidade a movimento, quero que animações de aparição da timeline respeitem `prefers-reduced-motion`, para não perder o contexto ao rolar.
8. Como um(a) visitante, quero que a timeline carregue sem deslocamento de layout após os ícones e datas renderizarem, para leitura estável.
9. Como um(a) recrutador(a) em conexão limitada, quero que a timeline não dependa de bibliotecas pesadas para traçar a linha, para que a seção carregue rápido.
10. Como um(a) visitante de SEO, quero que períodos, títulos e instituições estejam no HTML inicial como texto, para que buscas indexem a trajetória completa.
11. Como um(a) visitante que acessa por link direto, quero chegar à seção pela âncora `#jornada` já posicionada no início da timeline, para não perder a cronologia.
12. Como um(a) recrutador(a) no desktop, quero ver o item Jornada no menu do Header em posição coerente com a narrativa (após Experience), para navegar direto à linha do tempo.
13. Como um(a) visitante que usa zoom de 200%, quero que datas, marcadores e cards cresçam sem sobreposição e que a linha vertical permaneça alinhada, para ler sem ambiguidade.
14. Como um(a) gerente de engenharia, quero ver conquistas com impacto quantificável quando disponíveis (ex.: certificação, promoção, projeto entregue), para priorizar perguntas sobre resultados.
15. Como um(a) visitante, quero marcadores visuais distintos por tipo de marco (formação, certificação, profissional, conquista), para escanear rapidamente o tipo de etapa ao rolar.

## Implementation Decisions

- **Estrutura de página**: nova seção em `src/pages/` com âncora `#jornada`, `data-testid`, heading `h2` no padrão visual das demais seções; compor com MUI v7 (Box, Stack, Card, Chip, Typography) e linha vertical via CSS ou componente MUI posicionado.
- **Integração global**: registrar a seção em `App.tsx` (posição narrativa a definir pelo agente, sugerido: após Experience) e adicionar entrada ao menu do Header com link âncora.
- **Contrato de dados**: módulos tipados em `src/data/` (dependência: camada de dados ainda não existe) — `milestones` com `id`, `type` ("formacao" | "certificacao" | "profissional" | "conquista"), `title`, `institution`, `period` (texto livre, ex.: "2019 — 2021" ou "2023"), `description` opcional, `url` opcional (certificado/projeto) e `order`/`date` para ordenação. Ordenar em memória antes de renderizar (mais recente primeiro) em vez de depender da ordem do array.
- **Timeline visual**: linha vertical contínua com marcadores circulares por tipo (forma/cor do tema), alternância desktop (linha central) e mobile (linha à esquerda), usando tokens do tema escuro; evitar bibliotecas de timeline de terceiros na primeira entrega.
- **Acessibilidade**: lista ordenada semântica (`ol`/`li`) ou `role="list"`/`listitem`, período legível por leitor de tela (texto, não apenas cor), foco visível em itens com links, e contraste AA.
- **Animações**: Framer Motion para reveal discreto ao entrar na viewport, desativado com `prefers-reduced-motion`; sem animação contínua da linha ou dos marcadores.
- **Links**: URLs externas de certificados abrem em nova aba com `rel="noopener"` e indicação textual de que é link externo.
- **SEO/semântica**: texto completo dos marcos no HTML inicial, heading único e datas como texto (não apenas como imagem ou `title`).

## Testing Decisions

- **Prior art**: `tests/experience.spec.ts` (Page Object, título, contagem e conteúdo por item, âncora) é o modelo direto. Criar `tests/jornada.spec.ts` com `JornadaPage` espelhado, usando `data-testid` por marco (`jornada-item-<id>`) e verificando ordenação cronológica.
- **O que é bom teste nesta feature**:
  - A seção existe, está visível após rolagem e possui âncora `#jornada`.
  - O título principal corresponde ao texto esperado.
  - Todos os marcos de `src/data/` são renderizados com título, instituição, período e tipo corretos.
  - Os marcos aparecem em ordem cronológica decrescente (mais recente primeiro) conforme o campo de ordenação.
  - Cada tipo de marco (formação, certificação, profissional, conquista) possui marcador/legenda distinguível.
  - O item de menu do Header linka para `#jornada`.
  - Links de certificados (quando existirem) têm `target="_blank"` e `rel` seguro.
  - Navegação por teclado alcança os marcos em ordem e o foco é visível.
  - Emulação de `prefers-reduced-motion` remove animações de reveal.
- **Escopo de teste**: Playwright E2E como seam principal; verificar ordenação em teste (não apenas presença) porque é o risco funcional central desta feature.

## Out of Scope

- Linha do tempo interativa com zoom, filtros por ano ou modo mapa.
- Integração com APIs (LinkedIn, GitHub, bolsas de certificado) ou sincronização automática de marcos.
- Upload ou verificação de certificados/PDFs dentro do portfólio.
- Detecção automática de idioma ou tradução multilíngue da timeline.
- Remoção ou reformulação das cards de Experience — esta entrega complementa, não substitui, a seção existente.
- Animação contínua (ex.: linha que se desenha sem parar) ou parallax que prejudique acessibilidade e performance.
- Depoimentos ou comentários vinculados a marcos específicos.

## Further Notes

- Depende da camada `src/data/` tipada; se ainda não existir, criar de forma mínima apenas para marcos, sem abstrair demais seções.
- Períodos devem ser conferidos com o profissional (evitar datas inventadas ou estimadas sem marcação); usar períodos textuais quando o ano exato não for público.
- Manter textos em PT-BR; nomes de instituições e certificações permanecem no idioma original.
