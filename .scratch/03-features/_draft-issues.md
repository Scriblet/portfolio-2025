# Draft Issues — Vertical Slices (raseunho, não publicado)

> Gerado a partir dos PRDs em `.scratch/03-features/`. Cada fatia é end-to-end e demonstrável isoladamente. `What to build` não contém file paths.

---

## 1. Projetos em Destaque (PRD: projetos-destaque) — 4 slices

### 1.1 Seção de projetos com fallback estático no lugar do banner
- **Blocked by:** Nenhum
- **User stories covered:** 1, 3, 9
- **What to build:** Nova seção Projects intercalada na ordem das seções, substituindo o banner genérico, renderizando cards básicos (nome, descrição, link externo) a partir de lista estática inicial configurável sem mudar código.
- **Acceptance criteria:**
  - [x] Seção visível entre Skills e Contact com cards mostrando nome, descrição e link para o repo/demonstração
  - [x] Clicar no card/link abre o destino em nova janela sem perder o portfólio
  - [x] Lista de destaques é configurável pelo mantenedor sem alterar o contrato de dados
  - [x] Seção carrega sem bloquear o restante da página

### 1.2 Integração com GitHub API + cache silencioso
- **Blocked by:** 1.1
- **User stories covered:** 7, 8, 13
- **What to build:** Serviço GitHub consumindo a API pública com cache em memória + persistência com expiração; em falha/rate limit, retorna o fallback estático silenciosamente.
- **Acceptance criteria:**
  - [x] Projetos reais são carregados da API com ordenação/atualização preservadas
  - [x] Cache evita requisições repetidas e expira conforme TTL configurado
  - [x] Se a API falhar, a seção exibe o fallback sem mensagem de erro técnica ao visitante
  - [x] Nenhum teste depende da rede real do GitHub (mock/intercept)

### 1.3 Stack, tipo de projeto e polish visual/acessível dos cards
- **Blocked by:** 1.1
- **User stories covered:** 2, 4, 5, 6, 10, 11, 14
- **What to build:** Badges de tecnologias e indicadores de tipo de projeto nos cards, com layout mobile empilhado, foco/nome acessível, contraste e respeito a prefers-reduced-motion.
- **Acceptance criteria:**
  - [x] Cada card exibe stack/linguagens e indicador visual de tipo de projeto
  - [x] No mobile os cards empilham com alvos de toque adequados
  - [x] Navegação por teclado e leitor de tela com nome acessível e ordem lógica nos cards
  - [x] Animações respeitam movimento reduzido; contraste/tipografia legíveis

### 1.4 Analytics de projetos + CTA de contato
- **Blocked by:** 1.2
- **User stories covered:** 12, 15
- **What to build:** Eventos de view/clique por projeto via serviço de analytics existente e chamada clara para contato ao fim da seção.
- **Acceptance criteria:**
  - [x] Visualização e clique registram evento com o nome do projeto
  - [x] CTA de contato visível após a lista e navegável por teclado
  - [x] Nenhum dado pessoal coletado nos eventos

---

## 2. Download de CV (PRD: download-cv) — 3 slices

### 2.1 Botão principal de download com asset estático
- **Blocked by:** Nenhum
- **User stories covered:** 1, 2, 5, 6, 9, 10, 12, 14, 15
- **What to build:** Botão de CV na área principal servindo PDF estático versionado do repo, com rótulo acessível (ação + formato), nome de arquivo descritivo e troca de conteúdo sem mudança de código.
- **Acceptance criteria:**
  - [x] Botão claramente visível na área principal, alcançável por teclado com foco visível
  - [x] Link aponta para o PDF com nome descritivo (nome + CV) via atributo de download
  - [x] Atualizar o CV é só substituir o asset estático, sem tocar em código
  - [x] Contraste e hierarquia tipográfica consistentes com o tema atual

### 2.2 Feedback e fallback de download
- **Blocked by:** 2.1
- **User stories covered:** 3, 4, 7, 8, 13
- **What to build:** Feedback visual ao iniciar o download, abertura em nova guia como fallback quando o navegador bloqueia download direto, e área de toque mobile adequada.
- **Acceptance criteria:**
  - [x] Clique exibe feedback visual imediato sem permitir cliques repetidos involuntários
  - [x] Se download direto não for suportado, o PDF abre em nova guia sem perder o portfólio
  - [x] Botão usável com uma mão no mobile (área de toque e rótulo legíveis)
  - [x] PDF permanece legível em impressão preto e branco

### 2.3 Analytics e reforço em Contact
- **Blocked by:** 2.1
- **User stories covered:** 11
- **What to build:** Reuso do componente de botão em Contact e disparo do evento de analytics já existente no serviço de analítica ao baixar.
- **Acceptance criteria:**
  - [x] Cada download registra o evento de analytics preexistente, sem dados pessoais
  - [x] Botão de reforço em Contact reutiliza o mesmo componente e comportamento
  - [x] Testes validam rótulo, destino do link e disparo do evento sem baixar o arquivo real

---

## 3. Tema Claro/Escuro (PRD: tema-claro-escuro) — 3 slices

### 3.1 Toggle no header + tema reativo com persistência
- **Blocked by:** Nenhum
- **User stories covered:** 1, 2, 6, 12, 15, 16
- **What to build:** Sistema de tema com duas paletas derivadas (claro/escuro, roxo primário preservado), ThemeProvider reativo e toggle compacto no cabeçalho com persistência em localStorage.
- **Acceptance criteria:**
  - [x] Toggle visível no cabeçalho alterna claro/escuro sem recarregar a página
  - [x] Escolha persiste entre recargas via localStorage
  - [x] Componentes existentes (seções, botões, cards, formulários) se adaptam sem cores fixas por componente
  - [x] Toggle alcançável por teclado com foco visível e área de toque mobile adequada

### 3.2 Preferência do sistema e fallback de armazenamento
- **Blocked by:** 3.1
- **User stories covered:** 3, 14
- **What to build:** Leitura inicial via prefers-color-scheme quando não há escolha salva, com fallback silencioso para tema escuro quando o armazenamento falha.
- **Acceptance criteria:**
  - [x] Primeira visita sem escolha salva segue a preferência do sistema
  - [x] Com escolha salva, ela tem prioridade sobre a preferência do sistema
  - [x] Storage indisponível não quebra a página (fallback silencioso)
  - [x] Remover a escolha salva restaura o comportamento do sistema

### 3.3 Qualidade visual, acessibilidade e analytics de tema
- **Blocked by:** 3.1
- **User stories covered:** 4, 5, 7, 8, 9, 10, 11, 13
- **What to build:** Contraste adequado em ambos os temas, rótulo/estado acessível no toggle, transição que respeita movimento reduzido e eventos de troca de tema.
- **Acceptance criteria:**
  - [x] Toggle anuncia rótulo e tema ativo para leitores de tela
  - [x] Ambos os temas mantêm contraste suficiente e leitura confortável (sem branco ofuscante)
  - [x] Transição de tema é suave e desabilitada com movimento reduzido
  - [x] Troca de tema e tema em uso são registrados via analytics existente
  - [x] Verificação manual de contraste/hierarquia em desktop e mobile nos dois temas

---

## 4. Blog Técnico (PRD: blog-tecnico) — 4 slices

### 4.1 Seam de conteúdo Markdown + lista ordenada com estado vazio
- **Blocked by:** Nenhum
- **User stories covered:** 1, 2, 5, 6, 8, 12, 13
- **What to build:** Módulo de conteúdo carregando posts estáticos em build time com frontmatter (título, data, descrição, tags, tempo de leitura) e seção de lista ordenada por data com estado vazio amigável.
- **Acceptance criteria:**
  - [x] Lista integrada ao fluxo da página exibe cards com título, data, descrição, tags e tempo de leitura
  - [x] Ordem decrescente por data e novos posts aparecem automaticamente após o build
  - [x] Sem posts, a lista exibe estado vazio amigável sem quebrar a página
  - [x] Lista de demonstração funciona com pelo menos dois posts mockados

### 4.2 Detalhe do artigo + deep link + leitura
- **Blocked by:** 4.1
- **User stories covered:** 3, 4, 7, 10, 14
- **What to build:** Vista client-side do artigo com render Markdown (títulos, código, listas, links, tabelas, imagens), link profundo direto e caminho de retorno à lista, com tipografia mobile e hierarquia de headings.
- **Acceptance criteria:**
  - [x] Acessar o link do post abre o detalhe no mesmo tema sem sair da SPA
  - [x] URL compartilhada abre direto o detalhe do artigo
  - [x] Corpo renderiza Markdown de forma legível no mobile com navegação por teclado/semântica
  - [x] Há caminho claro de volta à lista e ao restante do portfólio

### 4.3 Tags, filtro e próximos artigos relacionados
- **Blocked by:** 4.2
- **User stories covered:** 9
- **What to build:** Filtro por tag sem nova rota e bloco de próximos artigos relacionados ao final do post, usando tags comuns como critério de relevância.
- **Acceptance criteria:**
  - [x] Filtrar por tag atualiza a lista sem nova navegação/rota
  - [x] Ao fim do artigo, sugestões de próximos artigos/projetos são exibidas
  - [x] Cliques em relacionados navegam sem perder tema nem Header/Footer persistentes

### 4.4 Analytics de leitura e metadados de SEO
- **Blocked by:** 4.2
- **User stories covered:** 11
- **What to build:** Eventos de view da lista, abertura de artigo e clique em relacionados, com título/descrição/metadados por post para SEO básico.
- **Acceptance criteria:**
  - [x] Abertura de artigo e views registram eventos via analytics existente
  - [x] Cada post expõe título e descrição para SEO sem Sitemap/RSS completos
  - [x] Sem coleta de dados pessoais nos eventos

---

## 5. Toast de Contato (PRD: snackbar-contato) — 3 slices

### 5.1 Sistema global de snackbar + sucesso do ContactForm
- **Blocked by:** Nenhum
- **User stories covered:** 1, 6, 7, 9, 12
- **What to build:** Provedor global com contrato de notificação (severidade, título, mensagem, auto-dismiss) e integração do ContactForm para exibir sucesso após envio, mantendo loading/disabled do formulário.
- **Acceptance criteria:**
  - [x] Após envio com sucesso, snackbar de confirmação aparece claramente sem depender do Alert estático
  - [x] Snackbar fecha manualmente e desaparece automaticamente após tempo razoável
  - [x] Provedor global permite disparar notificações de qualquer seção futura sem duplicar componentes
  - [x] Loading e validação do formulário continuam funcionais durante o envio

### 5.2 Erro, live region, mobile e movimento reduzido
- **Blocked by:** 5.1
- **User stories covered:** 2, 3, 4, 8, 10, 13
- **What to build:** Severidade visual distinta para erro, região live para leitores de tela, posição mobile que não cubre o envio e animação que respeita acessibilidade.
- **Acceptance criteria:**
  - [x] Falha no envio exibe snackbar de erro com mensagem clara sobre falha
  - [x] Snackbar é anunciado como live region para leitores de tela
  - [x] No mobile, o toast não cobre o botão de envio nem impede navegação/rolagem
  - [x] Severidades distinguíveis por contraste; animação respeita movimento reduzido

### 5.3 Fila/dedup + analytics + remoção do Alert
- **Blocked by:** 5.1
- **User stories covered:** 5, 11, 14
- **What to build:** Fila simples FIFO ou dedup de mensagens concorrentes, eventos de analytics por severidade/contexto e remoção do feedback estático antigo após paridade.
- **Acceptance criteria:**
  - [x] Envíos consecutivos não empilham notificações sem controle (fila ou dedup)
  - [x] Exibição registra severidade e contexto de origem via analytics, sem dados pessoais
  - [x] Alert estático do formulário é removido após paridade visual e de acessibilidade
  - [x] Snackbar aberto não cria armadilha de foco nem impede navegação

---

## Resumo

- **Total de slices: 17** (projetos-destaque: 4, download-cv: 3, tema-claro-escuro: 3, blog-tecnico: 4, snackbar-contato: 3)
- Slices independentes entre PRDs (cada PRD começa com slice sem blocked-by); dependências são intra-PRD.
- Nenhuma fatia publica ainda — aguarda quiz do usuário.
