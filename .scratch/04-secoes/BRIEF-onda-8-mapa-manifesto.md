# Brief fechado — Onda 8: Mapa de Maturidade em IA + Manifesto

Decisões tomadas com o Lucas em 2026-11-09. **Não reabrir.** Este arquivo é a
entrada única para o design e para a implementação.

## Decisões travadas

| Tema | Decisão |
| --- | --- |
| Filosofia × Manifesto | O Manifesto **absorve** a Filosofia. O statement atual vira a abertura do Manifesto e a foto das mãos entra como respiro visual. A seção Filosofia deixa de existir como bloco separado. |
| Ordem na página | Mapa de Maturidade → Manifesto → Selected Work → Habilidades → GitHub → Contato |
| Marcador de nível | **Sem marcador.** As camadas descrevem atuação; nada de nota, selo ou "onde estou". |
| RAG | Sem experiência em produção. A evidência da camada 03 diz explicitamente **"estudo aplicado e protótipos"**. |
| Agentes | **Em produção** na plataforma de IA (Aura/Vivo). |
| Evidências | **Empresas anonimizadas.** Usar "plataforma de IA de grande porte", "produto de seguros", "consultoria" — sem nomes próprios no mapa. |
| Manifesto | **7 princípios**, incluindo "Shipar faz parte do design". |
| Headline do mapa | **"Onde a IA vira sistema"** |
| Headline do manifesto | **"Como eu construo"** |
| Ambição visual | **Puxar para o imersivo**: mais contraste, mais presença tipográfica e movimento do que a home atual, sem virar uma segunda `/immersive`. |

## 1. Mapa de Maturidade em IA — conteúdo final

- **Label:** `Competência em IA / 02`
- **Headline:** Onde a IA vira sistema
- **Apoio:** O mapa do que eu coloco de pé — não um ranking de senioridade.
- **Fecho:** As camadas de baixo sustentam as de cima. Nenhuma funciona sozinha.

### Camada 01 — Produto e uso
- **Tese:** IA só vale quando muda o trabalho de alguém.
- **Capacidades:** mapear onde IA gera ganho real; revisão de código e documentação assistidas; prototipar para validar hipótese antes de investir.
- **Evidência:** rotina de engenharia em produto.

### Camada 02 — Integração de modelos
- **Tese:** Modelo bom é modelo que aguenta produção.
- **Capacidades:** LLMs via API em TypeScript/Node; embeddings e busca; validação de resposta, retry e fallback.
- **Evidência:** plataforma de IA de grande porte.

### Camada 03 — Contexto e RAG
- **Tese:** Resposta boa começa com contexto bom.
- **Capacidades:** chunking e indexação; vector stores; prompt estruturado; avaliação de relevância.
- **Evidência:** estudo aplicado e protótipos.

### Camada 04 — Agentes e orquestração
- **Tese:** Agente é software com ferramentas, não chatbot com personalidade.
- **Capacidades:** tool calling; memória e estado; fluxos multi-step com revisão humana; limites e permissões.
- **Evidência:** em produção na plataforma de IA.

### Camada 05 — Operação e governança
- **Tese:** O que não é observado não é confiável.
- **Capacidades:** traces de prompt; avaliação e regressão; custo e latência; privacidade, OAuth2/mTLS e versionamento de prompts.
- **Evidência:** práticas de CI/CD e segurança aplicadas a produto.

## 2. Manifesto — conteúdo final

- **Label:** `Princípios / 03`
- **Headline:** Como eu construo
- **Abertura (herdada da Filosofia, ampliada):** Construo software e interfaces acessíveis onde design e engenharia são a mesma decisão.
- **Apoio:** Sete regras que eu uso para decidir — não para decorar.
- **Fecho:** Os cases abaixo são o teste dessas regras.

Cada princípio tem número, título, frase de impacto e 1–2 linhas de consequência.

**01 — Código é meio, não fim.**
*O problema vem antes da stack.*
Já vi sistema tecnicamente elegante que ninguém usava. Entender o problema e medir o custo da solução vem antes de escolher a ferramenta.

**02 — Acessibilidade é padrão, não feature.**
*Se não funciona para todos, não está pronto.*
Semântica, teclado e contraste entram no primeiro commit, não no backlog de polimento.

**03 — IA amplifica intenção.**
*Sem direção, é ruído com latência.*
Modelo não conserta requisito vago. Meu trabalho é dar contexto, limite e critério de sucesso antes de pedir uma resposta.

**04 — Simples escala.**
*Complexidade é dívida com juros altos.*
Prefiro uma solução chata que o time inteiro entende a uma arquitetura brilhante que só uma pessoa mantém.

**05 — Aprendizado contínuo é o único estado estável.**
*Toda solução vira legado. A curiosidade fica.*
Saí do front para full stack, do full stack para IA. O que não mudou foi a disposição de recomeçar como iniciante.

**06 — Colaboração é arquitetura.**
*Time que não conversa constrói acoplamento.*
Documentação, revisão e decisões explícitas são infraestrutura. O código é consequência.

**07 — Shipar faz parte do design.**
*Pronto é melhor que perfeito, desde que o pronto seja honesto.*
Sistema bonito que não chega em produção é hipótese. Entrego em fatias pequenas, com critério de pronto.

## 3. Regras editoriais

- Camada: até 55 palavras no total. Princípio: até 45.
- Título sempre em afirmação, nunca pergunta.
- Proibido: "revolucionário", "disruptivo", "paixão por tecnologia", "soluções inovadoras", "transformador".
- Termo técnico em inglês só quando é o nome da coisa: RAG, embeddings, tool calling, guardrails, traces.
- Nenhum número inventado. Sem métrica auditável, descrever o tipo de resultado.
- O texto do BRIEF é a fonte da verdade. O design não deve reescrever a copy; se algo não couber, sinalizar em vez de cortar.

## 4. Direção visual validada (não reabrir)

A primeira versão do protótipo foi considerada **simples demais**: cinco cards
idênticos e sete linhas idênticas repetiam o padrão `label + headline + lead`
de todas as seções. O redesign foi aprovado com estas duas estruturas:

### Mapa — diagrama de pilha contínuo, não cards
- Uma única coluna contínua dividida por hairlines, como corte de arquitetura.
- Rail fixo (sticky) à esquerda no desktop com um numeral gigante **05** e o
  índice 01–05; a camada ativa acende no rail conforme o scroll.
- Números na calha, título em escala alta, capacidades em micro-grid de
  3 colunas. **Zero cartões, zero vidro.**
- No mobile o rail vira apenas os números na calha, sem sticky.
- Superfície sólida com hairline (decisão já validada).

### Manifesto — spread editorial, não lista
- O statement é o próprio `h2`, em escala de display (5–6rem): a seção começa
  pela tese, não por um título genérico.
- "Como eu construo" passa a label/eyebrow acima do statement.
- A foto das mãos entra como faixa full-bleed entre a abertura e os princípios.
- Cada princípio tem o numeral cortado pela borda esquerda (stroke discreto,
  `aria-hidden`), a frase de impacto em itálico e escala alta, e a consequência
  numa coluna estreita. **Sem cards, só tipografia, régua e espaço.**
- Fundo `--void-2`, mantendo a descida a partir do `--void` do mapa.

### Diferenciação
O mapa é arquitetural e técnico; o manifesto é literário. Os dois não podem
compartilhar o mesmo ritmo visual.

### Numeração
Mapa `02`, Manifesto `03`. As seções seguintes serão renumeradas na
implementação.

## 5. O que o design precisa resolver

1. Como o rail do mapa acende a camada ativa sem virar efeito gratuito e sem
   duplicar informação para leitores de tela.
2. Como o manifesto mantém 7 princípios sem parede de texto, usando escala,
   régua e recorte do numeral.
3. Movimento: entrada e hover com `prefers-reduced-motion` obrigatório.
4. Responsivo de 320px a 1920px sem overflow horizontal.
5. Acessibilidade: semântica de lista, ordem de leitura, numerais decorativos
   com `aria-hidden`, contraste AA, alvos de toque ≥44px.
6. Tema claro: as duas seções precisam funcionar no toggle da home.

## 6. Restrições

- Sem dependência nova. MUI, Framer Motion, CSS modules e tokens existentes.
- A escala tipográfica global está quebrada (`responsiveFontSizes` + `clamp` → `NaNrem`). **Não depender dos tamanhos do tema**: especificar tamanhos explícitos por seção.
- Não alterar `src/` nesta etapa.
- PT-BR. Wireframes ASCII obrigatórios.
