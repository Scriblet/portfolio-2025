# Issue: Auditoria de foco e contraste

Status: done

## Parent

PRD: `.scratch/05-immersive/motion-a11y-performance/PRD.md`

## What to build

Auditar foco visível e contraste em todas as superfícies da rota `/immersive`: navegação, hero, sobre, skills, experiência, contato e formulário.

## Acceptance criteria

- [x] Foco visível em todos os elementos interativos (links, botões, inputs, nav).
- [x] Anel de foco consistente: 2–3px, offset 3px, esmeralda sobre escuro.
- [x] Contraste AA validado para textos pequenos (`#9EA5A8` sobre `#0A0C0E`).
- [x] Landmarks `nav`/`main`/`footer` presentes.
- [x] Skip link funcional.
- [x] Formulário tem labels associadas e mensagens `aria-live`.

## Blocked by

- `.scratch/05-immersive/contact-closing/issues/04-estados-formulario-reduced-motion.md`
