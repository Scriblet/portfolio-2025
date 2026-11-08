# Issue — Reveal com stagger e remoção final do deck

Status: done

## Parent

PRD: `.scratch/05-immersive/skills-glass-cards/PRD.md`

## What to build

Aplicar reveal com stagger de 80ms aos cards de skills e confirmar que nenhuma referência ao deck arrastável permanece na rota.

## Acceptance criteria

- [x] Cards entram com stagger ao revelar (máx. 80ms entre itens).
- [x] Headline da seção deriva de `skills.length` (ex.: "Dez frentes de trabalho.").
- [x] Nenhuma importação ou renderização de `ReleasesDeck` em `/immersive`.
- [x] Nenhum asset ou estilo exclusivo do deck permanece no SCSS.
- [x] Teste valida stagger e ausência de `ReleasesDeck` no bundle.

## Blocked by

- `.scratch/05-immersive/skills-glass-cards/issues/02-tipografia-tags-hover.md`
- `.scratch/05-immersive/motion-a11y-performance/issues/01-motion-tokens-reveal.md`
