# Issue — Registrar service worker com cache-first versionado por build

Status: ready-for-agent

## Parent
PRD: `.scratch/01-tecnicos/pwa-offline/PRD.md`

## What to build
Service worker mantém os assets estáticos em cache após a primeira visita (navegação com fallback em cache) e atualiza limpo a cada novo build, removendo caches de versões antigas para nunca servir conteúdo preso.

## Acceptance criteria
- [ ] Após primeira visita, recarregar sem rede serve o conteúdo principal a partir do cache
- [ ] Navegação repetida é instantânea a partir do cache
- [ ] Chave de cache amarrada ao hash do build; novo build remove caches obsoletos
- [ ] Primeira visita não fica mais lenta (cache populado em background)

## Blocked by
- 01-pwa-1-manifest-icones.md
