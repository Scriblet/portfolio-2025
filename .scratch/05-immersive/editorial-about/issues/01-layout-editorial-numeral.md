# Issue: Layout split editorial e numeral vazado

Status: done

## Parent

PRD: `.scratch/05-immersive/editorial-about/PRD.md`

## What to build

Criar o layout split da seção `#about`: frase editorial grande em Syne com palavra destacada em âmbar, label "Sobre / 01" e numeral "01" vazado como background decorativo.

## Acceptance criteria

- [x] Seção `#about` renderiza com label usando `SectionLabel`.
- [x] Frase editorial em Syne 600, `clamp(1.9rem, 4.3vw, 4.15rem)`, `max-width: 21ch`.
- [x] Palavra-chave da frase envolta em `<em class="highlight">` com cor âmbar.
- [x] Numeral "01" vazado com `-webkit-text-stroke`, `aria-hidden`, posicionado atrás do texto.
- [x] Layout split `1.15fr 0.85fr` desktop, empilhado em mobile.
- [x] Nenhum retrato circular obrigatório (remover ou tornar opcional).

## Blocked by

- `.scratch/05-immersive/design-system-immersive/issues/02-vidro-grao-rotulos.md`
