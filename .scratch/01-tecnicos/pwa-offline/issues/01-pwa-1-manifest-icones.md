# Issue: Gerar manifest e ícones PWA a partir do build

Status: ready-for-agent

## Parent
PRD: `.scratch/01-tecnicos/pwa-offline/PRD.md`

## What to build
Site passa a ter manifesto com nome, modo standalone e cores alinhadas ao tema escuro, e ícones nos tamanhos essenciais inclusive mascarável, tudo gerado pelo processo de build a cada deploy, sem arquivos duplicados à mão.

## Acceptance criteria
- [ ] Manifesto gerado em build com nome, display standalone e tema/fundo alinhados à paleta atual
- [ ] Ícones 192px e 512px (inclusive mascarável) publicados e consistentes com a identidade existente
- [ ] Navegador Android oferece instalação a partir da tela inicial
- [ ] Rebuild gera manifest/ícones sem edição manual

## Blocked by
- 01-seo-1-metadados-marca.md
- 01-cs-1-vendor-baseline.md
