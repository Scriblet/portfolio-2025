# Issue: Layout do fechamento escuro e headline

Status: done

## Parent

PRD: `.scratch/05-immersive/contact-closing/PRD.md`

## What to build

Criar o layout da seção `#contact` com fundo `#0A0C0E`, headline oversized e wordmark "Lucas Nonato" gigante cortado pela borda inferior.

## Acceptance criteria

- [x] Seção `#contact` renderiza como `footer` ou seção final.
- [x] Headline em Syne 600/700, `clamp(2.2rem, 5.4vw, 5rem)`, cor `#EDE7DC`.
- [x] Headline derivado de `contactContent.headline`.
- [x] Wordmark final em Syne 800, `clamp(4rem, 18.5vw, 18rem)`, cortado por `overflow: hidden`.
- [x] Fundo escuro consistente com o restante da página.
- [x] Label "Contato / 04" usando `SectionLabel`.

## Blocked by

- `.scratch/05-immersive/experience-timeline/issues/01-estrutura-timeline-mapeamento.md`
