# PRD: Conteúdo das seções: experiência, jornada, skills, GitHub e footer

Status: draft
Feature slug: `cypress-secoes-conteudo`
Onda: `07-testes-e2e`

## Problem Statement

O valor do portfólio está no conteúdo: as 5 experiências com as marcas das
empresas, a linha do tempo da carreira, as 10 skills, os links para GitHub e
redes. Hoje esses blocos vêm de `src/data/*` e são renderizados sem nenhum teste
de integração: uma refatoração que remova um card, apague uma marca de empresa,
quebre um `target="_blank"` ou deixe um link social vazio passaria despercebida
até alguém reclamar. O Vitest cobre pedaços de dados (`timeline.test.ts`), mas
não a renderização real no navegador nem a integridade dos links.

## Solution

Uma camada de specs de conteúdo que valida a renderização e a integridade dos
links das seções estáticas da home: experiência (5 cards, textos-chave, 5 marcas
`company-mark-*`, numeração), jornada (5 itens, `<time dateTime>`, badges, links
de certificado externos), filosofia (seção e alt da imagem), skills (10 cards e
tags), banner GitHub (links externos para o perfil) e footer (sociais, nav de
âncoras, ano corrente). Regra de link externo: `target="_blank"` + `rel="noopener
noreferrer"` + `href` absoluto e válido.

## User Stories

1. Como recrutador, quero ver todas as experiências com empresa, cargo, período e
   descrição, para avaliar a trajetória sem precisar do PDF.
2. Como recrutador, quero ver a marca de cada empresa nos cards, para reconhecer
   visualmente as passagens.
3. Como visitante, quero percorrer a linha do tempo com datas e tipos (Formação,
   Certificação, Profissional, Conquista), para entender a jornada.
4. Como visitante, quero abrir os certificados em nova aba sem perder o portfólio,
   para validar as credenciais.
5. Como visitante, quero ver as skills com tags técnicas, para julgar o stack.
6. Como visitante, quero clicar em "Siga-me no GitHub"/logo e ir ao perfil certo
   em nova aba, sem navegar para fora do portfólio.
7. Como visitante, quero os links do footer (GitHub, LinkedIn) funcionando e
   abrindo em nova aba, com `rel` seguro.
8. Como visitante, quero navegar pelas âncoras do rodapé até as seções, como no
   header.
9. Como mantenedor, quero detectar regressões de conteúdo (card sumindo, marca
   quebrada, link vazio) automaticamente, sem depender de revisão visual.
10. Como mantenedor, quero que o teste documente o comportamento atual dos links
    sociais sem URL configurada (Instagram/Twitter), para sabermos o que é bug
    conhecido e o que é regressão.

## Implementation Decisions

- Specs: `cypress/e2e/secao-experiencia.cy.ts`, `secao-jornada.cy.ts`,
  `secao-skills-filosofia.cy.ts`, `secao-github-footer.cy.ts`.
- Assertivas de experiência: 5 `experience-card-N` presentes e visíveis,
  `experience-company-N`/`experience-position-N` não vazios, 5 `company-mark-*`
  exatamente (vivo, porto-seguro, thoughtworks, arcotech, finger) com `<svg>`
  renderizado dentro, e numeração `01..05` no topo dos cards.
- Assertivas de jornada: 5 `jornada-item-*`; cada `<time>` tem `dateTime`
  coerente (ano/mês válido); badges de tipo presentes; links "Ver certificado"
  com `target="_blank"` e `rel` contendo `noopener`.
- Assertivas de links externos (helper `expectExternalLink`): `href` começa com
  `https://`, `target="_blank"`, `rel` inclui `noopener noreferrer`. Aplicar em
  `github-link`, logo do GitHub, "Ver certificado", sociais do footer e
  `contact-linkedin`.
- Comportamento documentado (não regressão): Instagram/Twitter do footer hoje
  têm `href=""`: o spec deve registrá-lo explicitamente (teste que espera o
  estado atual, com comentário apontando o bug conhecido) em vez de falso-positivo.
- Conteúdo vindo de `src/data/*`: os specs devem verificar presença e coerência
  (ex.: empresa não vazia), não copiar a copy inteira, mudança de texto não é
  regressão.
- Skill cards: assertar presença dos 10 `skill-card-*` (lista de slugs em
  comentário no spec) e pelo menos uma tag por card; cuidado com `/`, `&` e
  acentos nos testids.

## Testing Decisions

- Testar o contrato estrutural (existe card, existe marca, link é externo seguro),
  não a cópia literal: textos vivem em `src/data` e evoluem.
- `waitForSection` antes de cada seção (lazy loading).
- Preferir `data-testid` e atributos HTML (`target`, `rel`, `dateTime`) a textos.
- Os testes devem falhar se: uma experiência sumir, uma marca não renderizar
  `<svg>`, um link externo abrir na mesma aba, ou um `href` externo ficar relativo.

## Out of Scope

- Formulários (PRD `cypress-formularios-contato`), PWA, acessibilidade.
- Testes de busca/estatísticas do GitHub: não existem no app (banner estático).
- Conteúdo da `/immersive` (coberto pelo smoke + formulário imersivo).
- Corrigir `href=""` do Instagram/Twitter (é issue de produto, não deste PRD).

## Further Notes

- Dependências: PRD `cypress-infraestrutura`.
- Os 5 nomes de `company-mark-*` são contrato público dos testes (data-testid);
  se a chave de marca mudar em `src/data/types.ts`, os specs devem mudar junto.
- Marcas são SVG inline (`?raw`): assertar `svg` com `currentColor`, não snapshot.
