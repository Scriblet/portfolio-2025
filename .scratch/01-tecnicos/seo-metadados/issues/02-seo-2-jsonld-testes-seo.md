# Issue: Adicionar dados estruturados Person e testes de regressão de SEO

Status: ready-for-agent

## Parent
PRD: `.scratch/01-tecnicos/seo-metadados/PRD.md`

## What to build
Bloco de dados estruturados sobre a pessoa (nome, cargo, URL e perfis sociais) renderizado na página, mais suíte de testes que lê as tags do head servido e falha se qualquer tag essencial sumir.

## Acceptance criteria
- [ ] Bloco de dados estruturados parseável com nome, cargo, URL e redes sociais (GitHub/LinkedIn)
- [ ] Suite nova verifica presença e conteúdo de OG/Twitter, canonical, JSON-LD e favicon no head servido
- [ ] Remover manualmente uma tag essencial faz a suite falhar
- [ ] Sem regressão nos testes existentes

## Blocked by
- 01-seo-1-metadados-marca.md
