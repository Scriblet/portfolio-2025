# Issue: Entregar metadados essenciais e assets de marca no head

Status: ready-for-agent

## Parent
PRD: `.scratch/01-tecnicos/seo-metadados/PRD.md`

## What to build
Página passa a expor título otimizado, descrição, Open Graph, Twitter Cards, canonical, robots, favicon/ícones e cor de tema alinhados ao tema escuro, com idioma correto e imagem de compartilhamento local em alta resolução.

## Acceptance criteria
- [ ] Compartilhar o link em WhatsApp/LinkedIn/Twitter exibe título, descrição e imagem corretos da marca
- [ ] Idioma declarado correto, descrição em PT-BR útil, `index,follow` explícito e canonical/URL derivadas da URL base configurável
- [ ] Favicon, ícone Apple e `theme-color` consistentes com o tema escuro; imagem de compartilhamento 1200×630 servida localmente
- [ ] Título/descrição são lidos da fonte centralizada (atualizável sem editar HTML)
- [ ] Favicon e imagem respondem 200

## Blocked by
- 01-dc-1-fundacao-camada-dados.md
