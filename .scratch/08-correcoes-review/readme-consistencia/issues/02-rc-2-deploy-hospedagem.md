# Issue: Seção de deploy fiel ao GitHub Pages

Status: done

## Parent
PRD: `.scratch/08-correcoes-review/readme-consistencia/PRD.md`

## What to build
Reescrever a seção de deploy: GitHub Pages como hospedagem de produção
(workflow `deploy.yml`, `VITE_BASE_PATH=/portfolio-2025/`, fallback SPA em
`dist/404.html`, URL publicada), Netlify citada apenas como ambiente das
functions e do `netlify dev`. Remover exemplos contraditórios (Netlify como
"recomendado" para o site, Vercel, workflow ilustrativo com Node 18).

## Acceptance criteria
- [ ] Deploy documentado bate com `.github/workflows/deploy.yml`
- [ ] Base path e fallback SPA explicados corretamente
- [ ] Sem recomendação de hospedagem que contradiga o que o projeto usa

## Blocked by
- 01-rc-1-prerequisitos-scripts.md
