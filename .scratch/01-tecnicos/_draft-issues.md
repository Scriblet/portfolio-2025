# Rascunho de issues: lote 01-tecnicos (revisão antes de publicar)

Gerado a partir dos 6 PRDs do lote. Ordem sugerida de publicação/execução:
`dados-centralizados` (fundação) → `seguranca-contato` (independente) → `seo-metadados` + `code-splitting-lazy` (paralelizáveis após fundação) → `pwa-offline` (após SEO + splitting) → `testes-a11y-visual` (por último, DOM final).

> Rascunho para quiz do usuário: nada publicado ainda.

---

## dados-centralizados: 4 slices

### DC-1: Fundação da camada de dados tipada
- **Title:** Criar camada de dados tipada e expor site/social como fonte única
- **Blocked by:** None
- **User stories covered:** 3, 4, 9, 10, 13
- **What to build:** Nova camada de dados tipada no app (site, social, projects, testimonials) com barrel de imports; a configuração central existente passa a ler da nova fonte única em vez de constantes espalhadas.
- **Acceptance criteria:**
  - [ ] Nova camada de dados existe com tipos para cada entidade e barrel de import existente para testes e componentes
  - [ ] Site/social já são consumidos a partir da nova fonte pelas áreas que hoje usam a config central
  - [ ] Nenhuma mudança visual percebida (mesmo DOM antes/depois)
  - [ ] `tsc --noEmit` passa; testes existentes passam sem mudança de seletor
  - [ ] Campo obrigatório removido do tipo quebra o build (erro de compilação imediato)

### DC-2: Migrar Experience e Skills para a fonte única
- **Title:** Renderizar Experience e Skills a partir da nova camada de dados
- **Blocked by:** DC-1
- **User stories covered:** 1, 2, 6, 11
- **What to build:** Seções de Experience e Skills passam a ser consumidoras puras da nova camada (skills agrupadas por categoria), sem alterar texto, ordem ou layout; testes passam a importar a mesma fonte que o componente usa.
- **Acceptance criteria:**
  - [ ] Alterar uma experiência/skill em um único arquivo da camada de dados reflete na página sem tocar em componente
  - [ ] Render idêntico: contagem de cards, textos e ordem preservados (suite existente verde)
  - [ ] Asserts de teste leem a mesma fonte de dados renderizada pelo componente
  - [ ] Build e `tsc --noEmit` passam

### DC-3: Migrar Header, GitHub, Footer e blindar dados vazios
- **Title:** Renderizar Header/GitHub/Footer a partir da fonte única com fallback seguro
- **Blocked by:** DC-1
- **User stories covered:** 8, 12
- **What to build:** Header, banner GitHub e Footer passam a consumir os dados sociais/site da camada única, com fallback seguro (early return + log) se um arquivo de dados ficar vazio, sem quebrar a página.
- **Acceptance criteria:**
  - [ ] Links sociais e textos exibidos continuam idênticos ao comportamento atual
  - [ ] Arquivo de dados vazio não quebra a página (fallback seguro com log)
  - [ ] Nenhuma regressão visual/estrutural detectada pelos testes existentes
  - [ ] `tsc --noEmit` e suite existente verdes

### DC-4: Documentar a camada e preparar novas seções
- **Title:** Documentar a camada de dados e publicar exemplos de nova seção
- **Blocked by:** DC-3
- **User stories covered:** 5, 7, 14
- **What to build:** Guia curto de onboarding explicando onde editar cada tipo de conteúdo, mais exemplo fechando o ciclo de uma nova seção consumindo a camada; validação de shape via typecheck documentada.
- **Acceptance criteria:**
  - [ ] README da camada explica onde editar cada entidade e como adicionar uma nova seção
  - [ ] Exemplo de nova seção consumindo a camada está presente e funcional
  - [ ] `tsc --noEmit` falha ao remover campo obrigatório (evidência registrada)
  - [ ] Suite completa verde, zero mudança visual

---

## seguranca-contato: 3 slices

### SC-1: Endpoint server-side de contato validado e protegido
- **Title:** Criar endpoint server-side de contato com validação e rate limit
- **Blocked by:** None
- **User stories covered:** 4, 5, 6, 7, 8, 10
- **What to build:** Função server-side que recebe o payload do formulário, valida email/mensagem, aplica rate limit por IP, bloqueia payloads malformados e envia ao destino final usando segredo apenas no servidor, nenhum segredo no bundle do cliente.
- **Acceptance criteria:**
  - [ ] `POST /api/contact` com payload válido retorna 200 e entrega a mensagem ao destino final
  - [ ] Payload malformado (sem email/mensagem válida) retorna 400 com shape de erro estável
  - [ ] Flood a partir do mesmo IP é barrado com 429 + `Retry-After`
  - [ ] Destino/segredo configurado apenas via variável de ambiente no servidor; bundle do cliente não contém o webhook
  - [ ] Logs server-side não registram dados sensíveis; setup documentado em `.env.example`

### SC-2: Formulário falando com o novo endpoint com mesma UX
- **Title:** Migrar formulário para o endpoint seguro mantendo a UX
- **Blocked by:** SC-1
- **User stories covered:** 1, 2, 3, 12, 15
- **What to build:** O formulário passa a enviar ao endpoint server-side com os mesmos campos e apresentação, validação no cliente e no servidor, feedback de sucesso/erro via snackbar amigável e retry claro em falha de rede.
- **Acceptance criteria:**
  - [ ] Visitante vê o mesmo formulário (nome, email, mensagem) e consegue enviar com sucesso exibido no snackbar
  - [ ] Email inválido ou mensagem vazia gera feedback claro no cliente e é rejeitado no servidor (400)
  - [ ] Falha de rede exibe erro amigável com caminho de nova tentativa, sem expor detalhes internos
  - [ ] Labels e `aria-describedby` de erro presentes (navegação por teclado/leitor ok)
  - [ ] Nenhuma referência ao webhook antigo permanece no código do cliente

### SC-3: Prova E2E, telemetria e documentação de deploy
- **Title:** Cobrir endpoint com E2E mockado, telemetria e docs de deploy
- **Blocked by:** SC-2
- **User stories covered:** 9, 11, 13, 14
- **What to build:** Teste ponta a ponta com o endpoint mockado (sem depender do serviço final em CI), evento de conversão emitido, ponto de inserção opcional para captcha definido, e guia reproduzível de deploy da função.
- **Acceptance criteria:**
  - [ ] E2E cobre sucesso (200), validação (400) e snackbar exibido, sem chamar o serviço de destino em CI
  - [ ] Existe guarda que falha se o segredo voltar a aparecer no bundle do cliente
  - [ ] Envio bem-sucedido emite evento de conversão para medição
  - [ ] Guia de deploy da função está publicado e reproduzível do zero
  - [ ] Hook opcional de captcha documentado, sem penalizar humanos no fluxo padrão

---

## seo-metadados: 3 slices

### SEO-1: Metadados essenciais, idioma e assets de marca
- **Title:** Entregar metadados essenciais e assets de marca no head
- **Blocked by:** DC-1 (fonte única de textos via config central)
- **User stories covered:** 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 13
- **What to build:** Página passa a expor título otimizado, descrição, Open Graph, Twitter Cards, canonical, robots, favicon/ícones e cor de tema alinhados ao tema escuro, com idioma correto e imagem de compartilhamento local em alta resolução.
- **Acceptance criteria:**
  - [ ] Compartilhar o link em WhatsApp/LinkedIn/Twitter exibe título, descrição e imagem corretos da marca
  - [ ] Idioma declarado correto, descrição em PT-BR útil, `index,follow` explícito e canonical/URL derivadas da URL base configurável
  - [ ] Favicon, ícone Apple e `theme-color` consistentes com o tema escuro; imagem de compartilhamento 1200×630 servida localmente
  - [ ] Título/descrição são lidos da fonte centralizada (atualizável sem editar HTML)
  - [ ] Favicon e imagem respondem 200

### SEO-2: Dados estruturados Person e testes de regressão de SEO
- **Title:** Adicionar dados estruturados Person e testes de regressão de SEO
- **Blocked by:** SEO-1
- **User stories covered:** 4, 14
- **What to build:** Bloco de dados estruturados sobre a pessoa (nome, cargo, URL e perfis sociais) renderizado na página, mais suíte de testes que lê as tags do head servido e falha se qualquer tag essencial sumir.
- **Acceptance criteria:**
  - [ ] Bloco de dados estruturados parseável com nome, cargo, URL e redes sociais (GitHub/LinkedIn)
  - [ ] Suite nova verifica presença e conteúdo de OG/Twitter, canonical, JSON-LD e favicon no head servido
  - [ ] Remover manualmente uma tag essencial faz a suite falhar
  - [ ] Sem regressão nos testes existentes

### SEO-3: Auditoria Lighthouse SEO e guia de validação manual
- **Title:** Validar Lighthouse SEO ≥ 95 e documentar validação manual de previews
- **Blocked by:** SEO-2
- **User stories covered:** 12
- **What to build:** Auditoria Lighthouse de SEO aprovada no nível alvo, com procedimento manual documentado de validação de previews nas ferramentas de compartilhamento, para evitar regressões futuras.
- **Acceptance criteria:**
  - [ ] Lighthouse SEO ≥ 95 na página final
  - [ ] Guia com passos de validação manual em ferramentas de preview de WhatsApp/LinkedIn/Twitter publicado
  - [ ] LCP sem regressão após a inclusão dos metadados
  - [ ] Sem regressão nos testes existentes

---

## code-splitting-lazy: 4 slices

### CS-1: Separar vendor do bundle inicial e medir o ganho
- **Title:** Configurar code-splitting do vendor e registrar baseline de bundle
- **Blocked by:** DC-4 (placeholders determinísticos da fonte única)
- **User stories covered:** 6, 9, 15
- **What to build:** Build passa a separar o código de terceiros do bundle inicial (chunks mínimos viáveis), com medição registrada do tamanho inicial antes/depois para comprovar o ganho.
- **Acceptance criteria:**
  - [ ] Build gera chunks com vendor separado do código do app
  - [ ] Tamanho do bundle inicial (gzip, excluindo vendor) medido e registrado antes/depois
  - [ ] App carrega e funciona igual ao baseline (suite verde)
  - [ ] Sem mudança de comportamento visível para o visitante

### CS-2: Lazy das seções de conteúdo com skeleton sem shift
- **Title:** Adiar Experience/Skills com skeleton de altura preservada
- **Blocked by:** CS-1
- **User stories covered:** 1, 3, 4, 13
- **What to build:** Dobra inicial (apresentação + cabeçalho) carrega primeiro; Experience e Skills passam a ser carregadas sob demanda no scroll com skeleton da mesma altura (sem salto de layout), e imagens fora da dobra só carregam quando necessárias.
- **Acceptance criteria:**
  - [ ] Apresentação renderiza sem esperar as seções adiadas (tempo de dobra < 2s)
  - [ ] Scroll disparando o carregamento de Experience/Skills exibe skeleton de altura preservada
  - [ ] CLS < 0.1 durante o carregamento das seções adiadas
  - [ ] Conteúdo continua indexável após o lazy (cabeçalho + estrutura presentes no DOM)
  - [ ] Navegação por âncora até as seções adiadas funciona

### CS-3: Lazy das demais seções e imagens preguiçosas
- **Title:** Adiar Philosophy/GitHub/Contact/Footer e aplicar loading preguiçoso em imagens
- **Blocked by:** CS-2
- **User stories covered:** 2, 5, 8, 10, 12
- **What to build:** Demais seções abaixo da dobra passam a carregar sob demanda com animação de entrada apenas quando entram na viewport; imagens fora da dobra carregam sob demanda e a imagem principal recebe prioridade de carregamento.
- **Acceptance criteria:**
  - [ ] Todas as seções abaixo da dobra carregam apenas sob demanda, mantendo ordem visual e ids de âncora
  - [ ] Scroll suave sem jank perceptível; animações disparam somente ao entrar na viewport
  - [ ] Imagem principal com prioridade alta; demais imagens preguiçosas
  - [ ] Suite existente verde, incluido navegação por âncoras
  - [ ] Consumo inicial de dados reduzido em relação ao baseline

### CS-4: Fallback de erro de chunk, acessibilidade de movimento e prova E2E
- **Title:** Cobrir falha de chunk com retry e provar lazy E2E
- **Blocked by:** CS-3
- **User stories covered:** 7, 11, 14
- **What to build:** Se um pedaço adiado falhar ao carregar, usuário vê fallback com nova tentativa e a página segue usável (contato sempre acessível); usuários com movimento reduzido têm menos trabalho de animação no carregamento; E2E prova o carregamento sob demanda.
- **Acceptance criteria:**
  - [ ] Falha simulada de chunk exibe fallback com retry; visitante não perde acesso às demais seções/contato
  - [ ] Teste E2E prova chunk lazy carregado sob scroll e falha se voltar a carregar tudo upfront
  - [ ] Com `prefers-reduced-motion`, trabalho de animação no carregamento é reduzido
  - [ ] Lighthouse sem regressão de LCP/CLS/INP em relação ao baseline

---

## pwa-offline: 4 slices

### PWA-1: Manifest instalável e ícones gerados pelo build
- **Title:** Gerar manifest e ícones PWA a partir do build
- **Blocked by:** SEO-1 e CS-1 (assets/metadados do SEO com chunks separados)
- **User stories covered:** 3, 9, 15
- **What to build:** Site passa a ter manifesto com nome, modo standalone e cores alinhadas ao tema escuro, e ícones nos tamanhos essenciais inclusive mascarável, tudo gerado pelo processo de build a cada deploy, sem arquivos duplicados à mão.
- **Acceptance criteria:**
  - [ ] Manifesto gerado em build com nome, display standalone e tema/fundo alinhados à paleta atual
  - [ ] Ícones 192px e 512px (inclusive mascarável) publicados e consistentes com a identidade existente
  - [ ] Navegador Android oferece instalação a partir da tela inicial
  - [ ] Rebuild gera manifest/ícones sem edição manual

### PWA-2: Service worker com cache versionado por build
- **Title:** Registrar service worker com cache-first versionado por build
- **Blocked by:** PWA-1
- **User stories covered:** 1, 2, 10, 11
- **What to build:** Service worker mantém os assets estáticos em cache após a primeira visita (navegação com fallback em cache) e atualiza limpo a cada novo build, removendo caches de versões antigas para nunca servir conteúdo preso.
- **Acceptance criteria:**
  - [ ] Após primeira visita, recarregar sem rede serve o conteúdo principal a partir do cache
  - [ ] Navegação repetida é instantânea a partir do cache
  - [ ] Chave de cache amarrada ao hash do build; novo build remove caches obsoletos
  - [ ] Primeira visita não fica mais lenta (cache populado em background)

### PWA-3: Tela de fallback offline amigável e acessível
- **Title:** Exibir fallback offline acessível com nova tentativa
- **Blocked by:** PWA-2
- **User stories covered:** 4, 5, 6, 7
- **What to build:** Visitante que cai para offline sem o conteúdo em cache vê mensagem clara com botão de nova tentativa, anunciada por leitor de tela, respeitando movimento reduzido e com alvos de toque generosos, em vez de página em branco.
- **Acceptance criteria:**
  - [ ] Offline sem conteúdo em cache exibe mensagem clara + botão de nova tentativa
  - [ ] Fallback anunciado de forma acessível (papel de alerta/status, foco ordenado)
  - [ ] Animação/transição do fallback respeita `prefers-reduced-motion`
  - [ ] Elementos legíveis e tocáveis em telas pequenas

### PWA-4: Prompt de instalação discreto, E2E offline e auditoria Lighthouse
- **Title:** Adicionar instalação discreta, E2E offline e auditoria PWA
- **Blocked by:** PWA-3
- **User stories covered:** 8, 12, 13, 14, 16
- **What to build:** Oferta de instalação não intrusiva usando o prompt nativo do navegador, teste E2E simulando offline pós-primeira visita, e auditoria Lighthouse de instalabilidade/offline aprovada, com degradação silenciosa para a SPA normal onde não houver suporte.
- **Acceptance criteria:**
  - [ ] Prompt de instalação aparece de forma discreta sem bloquear o conteúdo; navegadores sem suporte degradam em silêncio
  - [ ] E2E de offline prova que o conteúdo principal segue acessível e falha se um visitante offline perder o acesso
  - [ ] Online, app e âncoras funcionam sem regressão; formulário falha com feedback claro quando offline
  - [ ] Lighthouse aprova instalabilidade e offline

---

## testes-a11y-visual: 4 slices

### TA-1: Infraestrutura axe no CI com gate de zero violações críticas
- **Title:** Adicionar axe E2E com gate de zero violações críticas no CI
- **Blocked by:** DC-4, CS-4, PWA-4 (DOM final das fatias anteriores)
- **User stories covered:** 4, 7, 10, 12, 15
- **What to build:** Suíte de acessibilidade automatizada nas páginas críticas (home, contato, mobile) com falha no CI em violações críticas/sérias, relatório anexado à auditoria e comando único para rodar localmente.
- **Acceptance criteria:**
  - [ ] `npm run test:a11y` roda localmente e reporta violações com detalhe
  - [ ] CI falha em nova violação crítica/séria (threshold zero) e anexa relatório
  - [ ] Foco e ordem de headings checados automaticamente nas páginas críticas
  - [ ] Violações moderadas rastreadas sem bloquear (registradas no backlog)

### TA-2: Correções semânticas e de contraste para atingir o gate
- **Title:** Corrigir contraste, labels, foco e ordem de headings
- **Blocked by:** TA-1
- **User stories covered:** 1, 2, 3, 8, 9, 11, 13
- **What to build:** Correções mínimas de acessibilidade no conteúdo e tema, heading vazio corrigido, SVGs decorativos silenciados, alts descritivos, foco visível, contraste mínimo e alvos de toque adequados, com screenshots estabilizados sob movimento reduzido.
- **Acceptance criteria:**
  - [ ] Gate axe passa com zero violações críticas/sérias
  - [ ] Foco visível em todos os interativos; heading order lógica sem elementos vazios
  - [ ] Contraste ≥ 4.5:1 nos textos; alvos de toque ≥ 44×44 no mobile
  - [ ] SVGs decorativos com `aria-hidden`; alts descritivos em imagens de conteúdo
  - [ ] Nenhuma mudança visual além das correções de acessibilidade

### TA-3: Regressão visual por viewport com máscara de animação
- **Title:** Adicionar screenshots de regressão visual por viewport
- **Blocked by:** TA-2
- **User stories covered:** 5, 6, 13
- **What to build:** Baseline de screenshots nas viewports mobile/tablet/desktop com animações desabilitadas e máscara sobre elementos em movimento, gerando diff visual rápido a cada run.
- **Acceptance criteria:**
  - [ ] Screenshots capturados em 3 viewports (mobile, tablet, desktop) em estado de movimento reduzido
  - [ ] Elementos animados mascarados: sem flake por movimento
  - [ ] Diff visual < threshold em runs limpos
  - [ ] Uma mudança proposital de layout é detectada pelo diff

### TA-4: Aprovar baselines e documentar atualização de snapshots
- **Title:** Aprovar baselines visuais e documentar o fluxo de atualização
- **Blocked by:** TA-3
- **User stories covered:** 14
- **What to build:** Baselines aprovados e commitados, com documentação de como atualizar snapshots propositalmente, para onboarding rápido e runs determinísticos.
- **Acceptance criteria:**
  - [ ] Baselines aprovados e commitados; suite visual verde em CI
  - [ ] Documento com o comando de atualização e política de revisão de diff publicado
  - [ ] Novo dev consegue atualizar um snapshot seguindo só o documento
  - [ ] Suite E2E completa (funcional + a11y + visual) verde

---

## Total

22 slices: DC 4 + SC 3 + SEO 3 + CS 4 + PWA 4 + TA 4.
