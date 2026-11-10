---
title: Contato com Proposta de Valor
status: draft
scope: site
owner: agent
---

# PRD: Contato com Proposta de Valor

## Resumo / objetivo

Reformular a seção de contato para que, além do formulário, ela comunique claramente **como Lucas pode ajudar**, proposta de valor direcionada a recrutadores, times de produto e líderes técnicos. A seção transforma o contato de "me mande uma mensagem" em "é assim que eu resolvo problemas do seu time".

## Problem Statement

A seção de contato atual é genérica: convida o visitante a enviar uma mensagem sem contextualizar o que Lucas entrega. Recrutadores e gestores chegam ao final da página sem uma oferta clara. O contato vira um formulário frio em vez de um convite baseado em valor.

## Solution

Reformular a seção `#contact` mantendo o formulário funcional, mas adicionando uma proposta de valor clara no topo: 3 cartões de serviço/engajamento que resumem como Lucas pode contribuir (ex.: liderar integração de IA em produtos, acelerar times com engenharia de qualidade, arquitetar sistemas escaláveis). Cada cartão pode ter um CTA específico ou apenas posicionar a oferta.

## User Stories

1. Como um(a) recrutador(a), quero entender rapidamente o que Lucas entrega, para decidir se entro em contato.
2. Como um(a) gestor(a) de produto, quero ver propostas alinhadas a dores reais do meu time, para iniciar uma conversa objetiva.
3. Como um(a) líder técnico(a), quero ver ofertas que envolvam arquitetura, IA e qualidade, para avaliar fit.
4. Como um(a) visitante no mobile, quero que os cartões de proposta e o formulário empilhem sem quebrar.
5. Como um(a) usuário(a) de leitor de tela, quero que as propostas sejam anunciadas antes do formulário.
6. Como um(a) visitante com sensibilidade a movimento, quero que animações respeitem `prefers-reduced-motion`.
7. Como um(a) visitante, quero que o formulário continue funcionando exatamente como hoje.

## Requisitos funcionais

1. Manter a seção `#contact` e o formulário funcional existente.
2. Adicionar 3 cartões de proposta de valor acima ou ao lado do formulário.
3. Cada cartão deve conter: título, descrição curta, benefício-chave e CTA textual.
4. Manter os CTAs existentes (e-mail, LinkedIn, download CV).
5. Respeitar `prefers-reduced-motion`.
6. Garantir que o formulário permaneça acessível e com os mesmos comportamentos de validação e envio.

## Especificações de design/UX

- **Fundo**: manter `var(--void-2)` ou tom escuro consistente com o footer.
- **Layout**: desktop com grid 2 colunas (propostas + formulário) ou propostas em topo e formulário abaixo; mobile empilhado.
- **Cartões de proposta sugeridos**:
  1. **Integrar IA no seu produto**: "Levo LLMs, agentes e RAG do conceito à produção, com governança e observabilidade."
  2. **Acelerar times com qualidade**: "Refatoro legados, subo cobertura de testes e reduzo débito técnico sem parar a entrega."
  3. **Arquitetar para escala**: "Desenho sistemas claros, documentados e prontos para crescer com o negócio."
- **Tipografia**: headline da seção reformulado (ex.: "Vamos resolver algo real?"), título dos cartões em destaque, corpo em cor secundária.
- **CTA**: cada cartão pode ter um link de e-mail com assunto pré-preenchido relevante (ex.: `mailto:lucas.nonato1@hotmail.com?subject=Vaga:+Engenheiro+de+IA`).
- **Formulário**: manter campos, validação, honeypot, snackbar e analytics atuais.

## Interações e estados

- **Reveal**: propostas e formulário fade-in ao entrar na viewport.
- **Hover nos cartões**: leve destaque/borda.
- **Hover nos CTAs**: indicação de interação.
- **Focus**: anel de foco visível em links e campos do formulário.
- **Reduced motion**: sem animação.

## Critérios de aceitação

- [ ] Seção `#contact` exibe 3 cartões de proposta de valor.
- [ ] Cada cartão mostra título, descrição, benefício e CTA.
- [ ] Formulário continua funcionando com validação, envio, snackbar e analytics.
- [ ] Layout responde de 320px a 1920px sem overflow horizontal.
- [ ] `prefers-reduced-motion` mantém conteúdo visível.
- [ ] Testes unitários existentes do formulário continuam passando.
- [ ] CTAs de e-mail usam `subject` apropriado.

## Dependências de outros PRDs

- `mapa-maturidade-ia`, `manifesto-tecnico` e `selected-work` (recomendado entregar antes para que a proposta de valor dialogue com o restante do site).
- Design system atual para `GlassPanel`, `PillButton`, `SectionLabel`, tipografia e foco.

## Out of Scope

- Alterar backend do formulário.
- Adicionar agendamento de call ou calendly.
- Chatbot de IA no contato.
- Tradução multilíngue.

## Notas de implementação (componentes/arquivos envolvidos)

- `src/data/contact.ts` (novo): fonte das propostas de valor.
- `src/pages/formContact/contactForm.tsx`: refatorar para incluir propostas.
- `src/pages/formContact/contactForm.module.scss`: estilos adicionais para os cartões.
- `src/data/types.ts`: adicionar tipo `ValueProposition`.
- `tests/contact.spec.ts` (existente): garantir que continua passando.

## Further Notes

- As propostas devem refletir o posicionamento de engenheiro de IA e full stack.
- Manter textos em PT-BR.
- O tom deve ser convidativo mas profissional.
