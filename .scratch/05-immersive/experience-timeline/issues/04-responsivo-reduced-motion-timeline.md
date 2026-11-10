# Issue: Responsivo e reduced motion da timeline

Status: done

## Parent

PRD: `.scratch/05-immersive/experience-timeline/PRD.md`

## What to build

Garantir que a timeline funcione em mobile com período acima do conteúdo, sem overflow horizontal, e que `prefers-reduced-motion` mantenha os itens visíveis.

## Acceptance criteria

- [x] Layout empilhado em mobile: período, empresa/cargo, descrição.
- [x] `scrollWidth === innerWidth` em 320/390/768/1440.
- [x] Com `prefers-reduced-motion`, itens visíveis sem stagger.
- [x] Linha vertical adaptada ou escondida em mobile se necessário.
- [x] `scroll-margin-top` aplicado para a navegação fixa.

## Blocked by

- `.scratch/05-immersive/experience-timeline/issues/03-linha-visual-marcadores.md`
