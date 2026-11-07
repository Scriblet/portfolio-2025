# Draft issues — tracer bullets (passo 3, aguardando quiz do usuário)

Gerado a partir dos PRDs em `.scratch/04-secoes/*/PRD.md`. Fatias verticais, end-to-end e demonstráveis sozinhas.
Nada publicado ainda.

Total de slices: **14**

---

## secao-projetos (PRD: `.scratch/04-secoes/secao-projetos/PRD.md`)

### 1. Card de projeto único end-to-end com dados centralizados
- **Blocked by:** nenhum (cria o módulo de dados de projetos mínimo)
- **User stories covered:** 2, 3, 4, 11, 12
- **What to build:** Contrato tipado de projeto + grid renderizando 1 card com thumb, título, descrição, chips de stack e links demo/repo, sem hardcoded no componente.
- **Acceptance criteria:**
  - [ ] Grid renderiza exatamente os projetos do módulo de dados (fixture com 3 itens)
  - [ ] Card exibe thumb com alt significativo, título, descrição e chips de stack
  - [ ] Links de demo/repositório aparecem condicionalmente e abrem em nova guia
  - [ ] Adicionar entrada no módulo de dados exibe novo card sem tocar no layout
  - [ ] Teste E2E valida renderização do card e navegação por teclado

### 2. Grid curado de 3–6 projetos com responsividade e motion
- **Blocked by:** 1
- **User stories covered:** 1, 6, 13
- **What to build:** Grid responsivo multi-card (desktop multi-coluna, mobile coluna única) com animação de entrada discreta e data-testid para testes.
- **Acceptance criteria:**
  - [ ] Entre 3 e 6 projetos curados renderizam no grid
  - [ ] Grid cola para coluna única em viewport mobile sem scroll horizontal
  - [ ] Animação de entrada respeita `prefers-reduced-motion`
  - [ ] data-testid de grid, cards, thumbs e chips expostos para testes

### 3. Analytics de visualização e clique por projeto
- **Blocked by:** 2
- **User stories covered:** 9
- **What to build:** Emissão de eventos de analytics para view da seção e cliques em demo/repositório com identificador do projeto e tipo de destino.
- **Acceptance criteria:**
  - [ ] Evento de view da seção dispara ao entrar no viewport
  - [ ] Clique em demo emite evento com id do projeto e destino=demo
  - [ ] Clique em repositório emite evento com id do projeto e destino=repo
  - [ ] Teste E2E confirma eventos sem depender de rede externa

### 4. Estado vazio com fallback e relação com banner de GitHub
- **Blocked by:** 2 (paralelável com 3)
- **User stories covered:** 5, 10, 14
- **What to build:** Vazio amigável com fallback para CTA do GitHub quando não há projetos publicados, deixando claro a relação entre vitrine curada e perfil completo.
- **Acceptance criteria:**
  - [ ] Sem projetos publicados, seção mostra estado vazio amigável com CTA de GitHub
  - [ ] Diferenciação visual de links externos (ícone/indicador) e abertura em nova guia
  - [ ] CTA de perfil completo permanece acessível após a vitrine curada
  - [ ] Página nunca parece quebrada antes da primeira curadoria

---

## secao-depoimentos (PRD: `.scratch/04-secoes/secao-depoimentos/PRD.md`)

### 5. Módulo de dados + seção simples de depoimentos com âncora e menu
- **Blocked by:** nenhum (cria `src/data/` mínima só para depoimentos)
- **User stories covered:** 1, 2, 5, 8, 10, 11, 12
- **What to build:** Módulo tipado de depoimentos + seção `#depoimentos` renderizando lista estática (foto, nome, cargo, citação) com item de menu no Header, sem carrossel ainda.
- **Acceptance criteria:**
  - [ ] Módulo tipado exporta lista com id, citação, autor, cargo, empresa, foto e link opcional
  - [ ] Seção renderiza todos os depoimentos do módulo com `<figure>`/`<blockquote>` e foto com alt
  - [ ] Item Depoimentos aparece no menu do Header e âncora `#depoimentos` rola até a seção
  - [ ] Texto completo presente no HTML inicial (SEO) e sem deslocamento após fotos carregarem
  - [ ] Teste E2E valida seção, título, contagem e conteúdo por item

### 6. Carrossel navegável com indicadores e controles condicionais
- **Blocked by:** 5
- **User stories covered:** 3, 4, 14
- **What to build:** Carrossel com anterior/próximo, indicadores de posição, gesto de arrastar e controles ocultos com 1 único depoimento.
- **Acceptance criteria:**
  - [ ] Navegar frente/trás atualiza depoimento ativo e indicador "X de N"
  - [ ] Gesto de arrastar funciona em mobile e botões têm alvo de toque adequado
  - [ ] Com 1 depoimento, controles ficam desabilitados/ocultos
  - [ ] Teste E2E valida navegação do carrossel e comportamento com 1 item

### 7. Acessibilidade, motion e performance do carrossel
- **Blocked by:** 6
- **User stories covered:** 6, 7, 9, 13
- **What to build:** Região de carrossel com aria-live e roledescription, fotos otimizadas com dimensões reservadas, `prefers-reduced-motion` desligando auto-avanço e animações.
- **Acceptance criteria:**
  - [ ] Região com `aria-live="polite"` anuncia posição ("Depoimento 2 de 5")
  - [ ] Navegação por teclado alcança controles em ordem lógica com foco visível
  - [ ] `prefers-reduced-motion` desabilita auto-avanço e transições (teste com emulação)
  - [ ] Fotos otimizadas com dimensões reservadas, lazy loading e sem CLS
  - [ ] Texto cresce proporcionalmente em zoom de 200% sem sobrepor foto ou controles

---

## secao-toolbox (PRD: `.scratch/04-secoes/secao-toolbox/PRD.md`)

### 8. Módulo de dados + grade agrupada por categoria com logos oficiais
- **Blocked by:** nenhum (cria `src/data/` mínima só para categorias/tecnologias)
- **User stories covered:** 1, 3, 5, 8, 9, 10, 11, 12
- **What to build:** Módulos tipados de categorias e tecnologias + seção `#toolbox` renderizando grade agrupada com logo oficial e nome, mais item de menu no Header.
- **Acceptance criteria:**
  - [ ] Módulos tipados exportam categorias e tecnologias sem hardcoded no componente
  - [ ] Grade renderiza todas as categorias, cada tecnologia na categoria correta com nome e ícone com alt
  - [ ] Item Toolbox no menu do Header linka para `#toolbox` e âncora posiciona no título
  - [ ] Nomes de tecnologias presentes como texto no HTML inicial
  - [ ] Teste E2E valida seção, agrupamento, contagem total e conteúdo por item

### 9. Destaque principal vs complementar e responsividade
- **Blocked by:** 8
- **User stories covered:** 2, 4, 13
- **What to build:** Distinção visual entre nível principal e complementar + grade responsiva que reordena em colunas menores sem cortar logos ou nomes.
- **Acceptance criteria:**
  - [ ] Tecnologias principais vs complementares distinguíveis visualmente
  - [ ] Grade se reordena em viewport mobile sem logos ou nomes cortados
  - [ ] Em zoom de 200%, categorias permanecem separadas e sem sobreposição
  - [ ] Teste E2E valida destaque de nível e layout mobile básico

### 10. Filtro por categoria opcional no cliente
- **Blocked by:** 8 (paralelável com 9)
- **User stories covered:** 14
- **What to build:** Chips de filtro por categoria com estado local (sem rota), padrão "Todas" exibe grade completa.
- **Acceptance criteria:**
  - [ ] Selecionar categoria exibe apenas seus itens sem recarregar página
  - [ ] "Todas" restaura a grade completa
  - [ ] Grade completa continua acessível por padrão
  - [ ] Teste E2E valida filtro e restauração

### 11. Acessibilidade e motion da grade
- **Blocked by:** 8 (paralelável com 9 e 10)
- **User stories covered:** 6, 7
- **What to build:** Lista semântica por categoria, itens focáveis com foco visível, entrada discreta que respeita `prefers-reduced-motion`.
- **Acceptance criteria:**
  - [ ] Cada categoria é lista semântica com nome de tecnologia anunciado como texto
  - [ ] Itens interativos alcançáveis por teclado com foco visível
  - [ ] Emulação de `prefers-reduced-motion` remove animações de entrada
  - [ ] Grade carrega sem deslocamento enquanto ícones aparecem

---

## secao-timeline (PRD: `.scratch/04-secoes/secao-timeline/PRD.md`)

### 12. Módulo de dados + timeline cronológica com âncora e menu
- **Blocked by:** nenhum (cria `src/data/` mínima só para marcos)
- **User stories covered:** 1, 2, 10, 11, 12, 15
- **What to build:** Módulo tipado de marcos + seção `#jornada` com timeline vertical, marcadores por tipo e ordenação decrescente em memória, mais item de menu no Header.
- **Acceptance criteria:**
  - [ ] Módulo tipado exporta marcos com tipo, título, instituição, período, descrição e link opcional
  - [ ] Timeline renderiza todos os marcos em ordem decrescente (mais recente primeiro) por campo de ordenação
  - [ ] Marcadores distinguíveis por tipo (formação, certificação, profissional, conquista)
  - [ ] Item Jornada no menu do Header linka para `#jornada` e âncora posiciona no início da timeline
  - [ ] Teste E2E valida seção, ordenação cronológica e conteúdo por marco

### 13. Responsividade, links de certificado e acessibilidade
- **Blocked by:** 12
- **User stories covered:** 4, 5, 6, 8, 9, 14
- **What to build:** Layout alternado no desktop e coluna única no mobile, links de certificado seguros em nova aba, lista ordenada semântica e sem bibliotecas pesadas.
- **Acceptance criteria:**
  - [ ] Mobile mostra coluna única sem sobreposição de linha, marcadores ou datas
  - [ ] Links de certificados têm `target="_blank"`, `rel="noopener"` e indicação de link externo
  - [ ] Marcos como lista ordenada com período, título e descrição anunciados em sequência
  - [ ] Navegação por teclado alcança marcos em ordem com foco visível
  - [ ] Teste E2E valida layout mobile, links seguros e conteúdo semântico

### 14. Motion discreto e leitura estável em zoom
- **Blocked by:** 13
- **User stories covered:** 7, 13
- **What to build:** Reveal discreto via Framer Motion ao entrar no viewport, desativado com `prefers-reduced-motion`, com linha alinhada em zoom de 200%.
- **Acceptance criteria:**
  - [ ] Reveal da timeline aparece ao entrar no viewport
  - [ ] `prefers-reduced-motion` remove animações de reveal (teste com emulação)
  - [ ] Sem animação contínua da linha ou dos marcadores
  - [ ] Em zoom de 200%, linha vertical permanece alinhada e sem sobreposição
  - [ ] Timeline carrega sem deslocamento após ícones e datas renderizarem
