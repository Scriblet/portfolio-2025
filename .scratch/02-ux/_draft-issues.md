# Draft issues — 02-ux (rascunho pré-quiz)

> Gerado a partir de 4 PRDs: header-scroll-inteligente, progresso-leitura, microinteracoes-foco, hierarquia-tipografica.
> Não publicar antes do quiz do usuário. Ordem sugerida dentro de cada feature é a ordem de entrega.

---

## 1. header-scroll-inteligente (PRD: Header com Scroll Inteligente)

### 1.1 Hook de direção de scroll e Header esconde/mostra

- **Blocked by:** Nenhuma — primeiro da feature
- **User stories covered:** 1, 2, 8, 9, 10, 13, 15
- **What to build:** Hook reutilizável que expõe visível/escondido a partir da direção e posição do scroll, com Header consumindo o estado e animando via Framer Motion, mantendo visual atual com backdrop blur e links por âncoras.
- **Acceptance criteria:**
  - [ ] Ao rolar para baixo, o Header se esconde suavemente; ao rolar para cima, reaparece de imediato
  - [ ] No topo da página (scroll na posição zero), o Header está sempre visível
  - [ ] O visual do Header visível permanece o atual (fixo, backdrop blur, âncoras #experience/#skills/#contact)
  - [ ] Sem dependência nova; a lógica de scroll vive no hook, não espalhada no componente
  - [ ] Comportamento é previsível: desce esconde, sobe mostra

### 1.2 Acessibilidade: Header escondido sai da tabulação e foco traz de volta

- **Blocked by:** 1.1 (depende do estado visível/escondido do hook)
- **User stories covered:** 3, 4
- **What to build:** Quando escondido, o Header é removido da ordem de tabulação e ignorado por leitores de tela; ao receber foco interno, volta a ficar visível sem gesto de scroll.
- **Acceptance criteria:**
  - [ ] Com o Header escondido, nenhum elemento interno é alcançável por Tab e não é anunciado por leitor de tela
  - [ ] Ao navegar por teclado até um elemento do Header, ele volta a aparecer imediatamente
  - [ ] Nenhum controle invisível recebe foco em nenhum estado
  - [ ] Leitor de tela não anuncia controles invisíveis durante o scroll

### 1.3 Polimento de scroll: limiar anti-piscada, reduced motion e contraste

- **Blocked by:** 1.1 (polimento sobre o comportamento base) — pode ser feita em paralelo com 1.2
- **User stories covered:** 5, 6, 12, 14
- **What to build:** Limiar mínimo de scroll para trocar estado, transição curta e responsiva, sem animação de deslocamento com prefers-reduced-motion, e contraste mantido sobre conteúdo rolado.
- **Acceptance criteria:**
  - [ ] Pequenos ajustes de scroll não trocam o estado (sem piscada em scrolls rápidos)
  - [ ] Com prefers-reduced-motion, o Header mostra/esconde sem animação de deslocamento
  - [ ] No mobile, a transição é rápida o suficiente para não parecer lenta ou travada
  - [ ] Com o Header visível, links mantêm contraste suficiente sobre o conteúdo por baixo

### 1.4 Âncoras sem bloqueio e cobertura E2E do scroll inteligente

- **Blocked by:** 1.1, 1.2
- **User stories covered:** 7, 11, 16
- **What to build:** Garantir que cliques em âncoras não são ocultados nem bloqueados pelo Header e cobrir o comportamento com testes E2E automatizados de scroll simulado.
- **Acceptance criteria:**
  - [ ] Clicar em #contact (e demais âncoras) chega ao destino sem conteúdo ocultado por baixo do Header
  - [ ] Em E2E automatizado: rolar para baixo esconde, rolar para cima mostra, no topo está visível
  - [ ] E2E cobre o caso de foco por teclado trazendo o Header de volta
  - [ ] Ao rolar para cima no mobile, o botão de contato reaparece visível junto com o Header

---

## 2. progresso-leitura (PRD: Indicador de Progresso de Leitura)

### 2.1 Hook de progresso e barra fina no topo (0–100%)

- **Blocked by:** Nenhuma — primeiro da feature
- **User stories covered:** 1, 2, 3, 8, 10, 11
- **What to build:** Hook reutilizável que expõe progresso normalizado 0–1 a partir da posição de scroll, com barra fina fixa no topo usando a cor primária da paleta atual e suavização pelo Framer Motion.
- **Acceptance criteria:**
  - [ ] No topo, a barra começa em 0% (ou próxima de 0)
  - [ ] Ao alcançar o rodapé, a barra completa em 100%
  - [ ] Ao rolar para cima, a barra recua proporcionalmente à posição real
  - [ ] A barra usa a cor primária da paleta atual, sem novos tokens de cor
  - [ ] Qualquer componente futuro pode consumir o mesmo hook sem recalcular

### 2.2 Robustez: mobile, contraste, casos inválidos e não-bloqueio da conversão

- **Blocked by:** 2.1 (a barra precisa existir antes de ter robustez)
- **User stories covered:** 4, 7, 13, 15
- **What to build:** Barra visível e legível em telas estreitas sem roubar espaço vertical, com proteção contra altura zero, scroll além do fim e overscroll mobile, e sem cobrir nem bloquear o link de contato.
- **Acceptance criteria:**
  - [ ] No mobile, a barra é visível e legível sem roubar espaço vertical significativo
  - [ ] A barra tem contraste suficiente contra o fundo escuro e o conteúdo por baixo
  - [ ] Com altura zero ou conteúdo ainda carregando, a barra não quebra nem exibe valores inválidos
  - [ ] Overscroll mobile não faz a barra exceder 100%
  - [ ] A barra nunca bloqueia nem cobre o link de contato

### 2.3 Acessibilidade e movimento reduzido da barra

- **Blocked by:** 2.1 — pode ser feita em paralelo com 2.2
- **User stories covered:** 5, 6, 9
- **What to build:** Barra apresentada como indicador de progresso informativo sem live regions verbosas, sem interceptar foco, sem suavização automática com prefers-reduced-motion, e comunicando progresso também por posição/tamanho, não só por cor.
- **Acceptance criteria:**
  - [ ] Usuário de leitor de tela não é interrompido por atualizações de porcentagem a cada tick
  - [ ] O foco de teclado nunca é interceptado pela barra
  - [ ] Com prefers-reduced-motion, o preenchimento acompanha o scroll sem animação suavizada
  - [ ] O progresso é compreensível mesmo sem percepção de cor (posição/tamanho também indicam)

### 2.4 Sincronia com âncoras, integração com o Header e E2E

- **Blocked by:** 2.1, 2.2, 2.3 — e integração visual com 1.1 (header-scroll-inteligente) para compor sem conflito
- **User stories covered:** 12, 14, 16
- **What to build:** Barra reflete a posição real após saltos por âncora, compõe visualmente com o Header inteligente sem sobrepor links, e é coberta por E2E automatizado de scroll simulado.
- **Acceptance criteria:**
  - [ ] Após clicar numa âncora (ex.: #skills), a barra reflete a posição real pós-salto
  - [ ] Quando o Header se esconde, a barra permanece utilizável sem sobrepor links
  - [ ] Em E2E automatizado: a barra existe, está em 0% no topo e atinge 100% no rodapé
  - [ ] Sem dependência nova (scroll nativo + Framer Motion já instalado)

---

## 3. microinteracoes-foco (PRD: Microinterações e Estados de Foco Consistentes)

### 3.1 Tokens centrais de estado interativo no tema

- **Blocked by:** Nenhuma — primeiro da feature
- **User stories covered:** 2, 9, 10, 15, 16
- **What to build:** Definições centrais de hover, focus-visible, active e transições curtas com duração e curva únicas no tema MUI, consumidas por links do Header, botões e futuros componentes interativos.
- **Acceptance criteria:**
  - [ ] Todo elemento interativo responde ao hover com realce sutil e consistente
  - [ ] O mesmo padrão visual se aplica no Header, botões e demais superfícies, sem sobrescritas ad-hoc
  - [ ] Os estados derivam do tema existente (mesma fonte, paleta e breakpoints), sem segunda linguagem visual
  - [ ] Novos componentes herdam o padrão sem duplicar estilos
  - [ ] A interface continua parecida com a anterior, apenas mais consistente

### 3.2 Focus-visible acessível: anel com contraste e forma

- **Blocked by:** 3.1 (o anel é um dos tokens centrais)
- **User stories covered:** 1, 4, 5, 7, 14
- **What to build:** Anel de foco sempre visível na navegação por teclado (suprimido em clique de mouse), com contraste sobre o fundo escuro e superfícies elevadas, e identificado também por forma/contorno, não só por cor.
- **Acceptance criteria:**
  - [ ] Navegando por teclado, qualquer elemento interativo mostra onde está o foco
  - [ ] O anel tem contraste suficiente sobre o fundo escuro e sobre os cards de Skills
  - [ ] O foco é identificável por forma/contorno, sem depender apenas de cor
  - [ ] Estados de foco não geram anúncios verbosos para leitor de tela
  - [ ] Com zoom de 200%, os indicadores continuam visíveis e não cortados

### 3.3 Herança em Skills e ContactForm, resposta de toque e reduced motion

- **Blocked by:** 3.1, 3.2 (depende dos estados centrais e do foco)
- **User stories covered:** 3, 6, 8, 11, 12
- **What to build:** Cards de Skills e campos do ContactForm herdam os estados padronizados sem reescrever a lógica existente, com resposta ativa imediata ao toque e sem deslocamento/escala com prefers-reduced-motion.
- **Acceptance criteria:**
  - [ ] Cards de Skills e campos do formulário exibem os mesmos estados de foco/erro/preenchimento
  - [ ] No mobile, tocar em um elemento gera resposta imediata (active), sem atraso
  - [ ] Com prefers-reduced-motion, microinterações usam apenas cor/sombra, sem deslocamento ou escala
  - [ ] Em telas pequenas, alvos de toque e indicadores de foco não são cortados nem sobrepostos
  - [ ] A lógica existente de Skills (dados) e de envio do formulário não é alterada

### 3.4 Cobertura E2E por enumeração de interativos e sem regressão

- **Blocked by:** 3.1, 3.2, 3.3 (a cobertura verifica o sistema completo)
- **User stories covered:** 13 (e cobre regressão das stories 8 e 9)
- **What to build:** Testes E2E que enumeram todos os elementos interativos da composição e verificam alcance por teclado e aplicação do foco visível, sem snapshot frágil de CSS.
- **Acceptance criteria:**
  - [ ] Em E2E automatizado, todos os elementos interativos principais (Header, Skills, ContactForm, Footer) são alcançáveis por teclado
  - [ ] O teste falha se algum interativo ficar sem indicador de foco visível
  - [ ] O fluxo de preenchimento e envio do formulário de contato continua funcionando (sem regressão)
  - [ ] A navegação por âncoras do Header continua funcionando (sem regressão)
  - [ ] Sem testes frágeis de timing de animação (reduced motion verificado por emulação)

---

## 4. hierarquia-tipografica (PRD: Hierarquia Tipográfica)

### 4.1 Escala tipográfica central e responsiva no tema

- **Blocked by:** Nenhuma — primeiro da feature
- **User stories covered:** 1, 2, 6, 7, 8, 11, 12
- **What to build:** Escala explícita de títulos, subtítulos, corpo e legenda definida uma única vez no tema, com tamanhos responsivos nos breakpoints atuais, e consumida pelas seções da página.
- **Acceptance criteria:**
  - [ ] O título principal se distingue rapidamente dos títulos de seção em qualquer viewport
  - [ ] A hierarquia se mantém em telas estreitas, sem truncar ou sobrepor textos
  - [ ] Em monitores grandes, os títulos não crescem de forma desproporcional
  - [ ] A hierarquia depende de tamanho, peso e espaçamento, não só de cor
  - [ ] Ajustar um título é uma mudança global no tema, sem caçar estilos espalhados

### 4.2 Remoção do título vazio na Experience preservando o ritmo

- **Blocked by:** 4.1 (pode ser feita junto da escala, mas preserva o ritmo definido por ela)
- **User stories covered:** 3, 13
- **What to build:** Remover o elemento de título vazio da seção Experience e ajustar o espaçamento subsequente para preservar o ritmo vertical, sem alterar nenhum outro conteúdo da seção.
- **Acceptance criteria:**
  - [ ] A seção Experience não exibe mais título vazio nem lacuna visual anormal
  - [ ] O restante do layout da seção não muda (sem regressão visual)
  - [ ] Nenhum outro conteúdo da seção é alterado por este slice

### 4.3 Contraste dos textos secundários e headings semânticos corretos

- **Blocked by:** 4.1
- **User stories covered:** 4, 5, 10
- **What to build:** Clarear as cores de texto secundário no tema para contraste adequado sobre o fundo escuro, garantindo ordem e níveis de headings idênticos entre visual, leitura de tela e foco de teclado.
- **Acceptance criteria:**
  - [ ] Textos secundários (descrições e metadados) atingem contraste suficiente sobre o fundo escuro
  - [ ] Existe um único título principal e os títulos de seção seguem um nível único e consistente
  - [ ] A ordem de headings no HTML é lógica para navegação por leitor de tela
  - [ ] Navegando por teclado, o foco acompanha a ordem dos títulos e do conteúdo
  - [ ] O roxo primário da identidade é preservado (o ajuste é só nos textos secundários)

### 4.4 Verificação E2E e validação desktop/mobile sem regressão

- **Blocked by:** 4.1, 4.2, 4.3
- **User stories covered:** 9, 14 (e valida 1 e 2)
- **What to build:** Estender os testes E2E existentes com asserções de headings e ausência do título vazio, mantendo os identificadores atuais, e validar manualmente em desktop e viewport mobile.
- **Acceptance criteria:**
  - [ ] Em E2E automatizado: unicidade do título principal e ordem de headings verificadas
  - [ ] Em E2E automatizado: o elemento de título vazio na Experience não aparece
  - [ ] Nenhum teste E2E pré-existente falha por mudança de texto ou estrutura
  - [ ] Identificadores atuais dos componentes são preservados (testes e analytics não quebram)
  - [ ] Verificação manual em desktop e mobile confirma hierarquia legível em ambos, incluindo impressão/PDF
