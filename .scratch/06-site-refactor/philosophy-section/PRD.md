---
title: SeÃ§Ã£o de Filosofia imersiva
status: done
wave: 7
scope: site
owner: agent
---

# PRD â€” SeÃ§Ã£o de Filosofia imersiva

## Resumo / objetivo

Transformar o banner marrom de Filosofia & Valores em uma seÃ§Ã£o editorial
escura com foto, painel de vidro e CTA pill, alinhada Ã  linguagem da rota
`/immersive`.

## Estado atual

- `src/pages/filosofia/filosofia.tsx` usa fundo `#584732`, texto branco,
  botÃ£o MUI outlined e imagem em `CardMedia`.
- A seÃ§Ã£o Ã© uma faixa horizontal com texto Ã  esquerda e imagem Ã  direita.

## DireÃ§Ã£o visual (referÃªncia `/immersive`)

- Fundo `var(--void)` ou `var(--void-2)`.
- Layout split editorial: texto Ã  esquerda, foto Ã  direita com tratamento
  dessaturado e vinheta.
- Label "Filosofia / 05", tÃ­tulo Syne com destaque Ã¢mbar.
- CTA `PillButton` ghost para LinkedIn.
- Painel de citaÃ§Ã£o em vidro, se necessÃ¡rio para dar hierarquia.

## Requisitos funcionais

1. Remover o fundo `#584732` e o texto branco hardcoded.
2. Refatorar para o layout editorial imersivo.
3. Reutilizar a imagem existente e o alt atual.
4. Preservar o link para o LinkedIn.
5. Garantir responsividade e reduced motion.
6. Aplicar `loading="lazy"` e dimensÃµes na imagem.

## CritÃ©rios de aceitaÃ§Ã£o

- [x] Nenhuma cor hardcoded fora dos tokens.
- [x] TÃ­tulo e corpo legÃ­veis com contraste AA.
- [x] CTA usa `PillButton` ou botÃ£o do tema.
- [x] Imagem com `loading="lazy"` e alt preservado.
- [x] Sem overflow em 320â€“1920px.
- [x] Reduced motion respeitado.

## DependÃªncias

- `design-system-immersive` (onda 6).
- `motion-a11y-performance` (onda 6).

## Arquivos envolvidos

- `src/pages/filosofia/filosofia.tsx`
- `src/img/multiracial-hands-coming-together.jpg`
