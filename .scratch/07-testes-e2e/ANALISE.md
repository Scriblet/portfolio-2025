# Análise do site e das interações: base dos testes E2E (Cypress)

Status: done
Onda: `07-testes-e2e`

Inventário completo do portfólio (Vite 6 + React 19 + TS, MUI 7, framer-motion 12,
react-router-dom 7, react-scroll, SCSS modules, vite-plugin-pwa) organizado para
embasar os PRDs de testes automatizados. Fatos verificados no código em 08/11/2026.

## 1. Rotas e páginas

- Bootstrap: `src/main.tsx`: `ColorModeProvider` → `ThemeProvider` (MUI) →
  `SnackbarProvider` → `BrowserRouter` com `basename = import.meta.env.BASE_URL`.
- Rotas (`src/App.tsx`):
  - `*` (catch-all) → `Portfolio` (home). **Não há página 404**: qualquer URL
    desconhecida renderiza a home. Em produção o GitHub Pages usa `dist/404.html`
    = cópia do `index.html` (SPA fallback, `deploy.yml`).
  - `/immersive` → `src/pages/immersive/immersive.tsx` (**lazy**), seta
    `document.title = 'Preview imersivo: Lucas Nonato'` e `<meta name="robots"
    content="noindex, nofollow">` no mount (revertido no unmount).
  - `/roadmap` → **somente DEV** (`import.meta.env.DEV`); em build de produção a
    URL cai no catch-all e mostra a home.
- Seções lazy da home via `LazySection` (`SectionFallback` com
  `data-testid="section-fallback"` preserva a âncora durante o load):
  Experience, Timeline, Filosofia, Skills, GithubBanner, ContactForm, Footer.
  Apenas `Header` e `Presentation` (hero) são eager.
- Ordem das seções da home (`<main id="home">`): hero (`presentation-section`) →
  `#experience` → `#jornada` → filosofia (sem âncora) → `#skills` → github
  (sem âncora) → `#contact` → footer. Mais `OfflineNotice` e `GrainOverlay` fixos.
- Base path: `VITE_BASE_PATH=/portfolio-2025/` em produção (GitHub Pages); em
  dev é `/`. O `basename` do router acompanha.
- Meta tags: estáticas em `index.html` (title, canonical, OG/Twitter, JSON-LD).
  Só `/immersive` muda title/robots em runtime.

## 2. Shell e navegação (`src/pages/header.tsx`)

- `<header data-testid="site-header">`, `<nav aria-label="Navegação principal">`.
- Marca "Lucas Nonato." → smooth scroll para `#home` via `react-scroll`
  (`scroller.scrollTo`, duration 800, offset −80).
- Links desktop: "Experiência" `#experience`, "Jornada" `#jornada`,
  "Habilidades" `#skills`, "Contato" `#contact` (mesmo scroll com offset −80).
  **Sem destaque de seção ativa** (`aria-current` não existe).
- Links dev-only no header: `/roadmap` e `/immersive` (RouterLink), só em `npm run dev`.
- Ações: `InstallButton` (`install-button`), `ThemeToggle` (`theme-toggle`),
  CTA "Contato" (`header-cta`).
- **Drawer mobile** (`mobile-menu-button` → `mobile-menu`): `role="dialog"
  aria-modal="true"`, overlay clicável fecha, botão fechar com foco automático,
  `Escape` fecha, `body` com `overflow: hidden` enquanto aberto, foco volta ao
  hamburger no unmount. Os mesmos 4 links fecham o drawer e rolam.
- Responsividade: `navLinks` some em ≤1080px (então `menuButton` aparece);
  `navCta` some em ≤520px.
- **Auto-hide no scroll** (`useScrollDirection`): rolando para baixo além de 80px
  o header some (`translateY(-140%)` + `inert` + `aria-hidden="true"`); volta ao
  rolar para cima. Não some com foco dentro (`focusWithin`) nem no topo (≤80px).

## 3. Interações por seção

### Hero (`src/pages/presentation.tsx`)
- `presentation-section`, `presentation-stage` (sticky com `useStickyProgress`
  escrevendo `--p` no scroll), `presentation-image` (decorativa), `presentation-name`,
  `presentation-role`.
- Clicáveis: `presentation-cta-contact` (âncora `#contact`), `download-cv-button-presentation`
  (link para `{BASE_URL}cv/lucas-nonato-cv.pdf`, `download`, `target="_blank"`) que mostra
  feedback "Download iniciado" por 2500 ms em `download-cv-feedback-presentation`
  (`role="status" aria-live="polite"`). Mesmo botão em `location="contact"`.
- Painéis, wordmark e scroll cue são decorativos (`aria-hidden`).
- `src/pages/presentation.styles.ts` tem `repeat: Infinity` mas é **código morto**
  (não importado por ninguém).

### Experiência (`src/pages/experience/experience.tsx`)
- `experience-section` (`id="experience"`), `experience-heading`.
- 5 cards estáticos: `experience-card-1..5`, `experience-company-N`,
  `experience-position-N`, `experience-description-N`.
- Marcas: `company-mark-vivo`, `company-mark-porto-seguro`, `company-mark-thoughtworks`,
  `company-mark-arcotech`, `company-mark-finger` (`src/components/company-marks.tsx`).
- Sem interação (apenas conteúdo).

### Jornada (`src/pages/timeline/timeline.tsx`)
- `jornada-section` (`id="jornada"`), lista `aria-label="Linha do tempo da carreira"`.
- Itens: `jornada-item-{vivo,porto-seguro,thoughtworks,arcotech,finger-consultoria}`,
  `<time dateTime>`, badge de tipo (Formação/Certificação/Profissional/Conquista) e
  link "Ver certificado" `target="_blank"` (texto sr-only "(abre em nova aba)").

### Filosofia (`src/pages/filosofia/filosofia.tsx`)
- `filosofia-section`. Estática, imagem com alt descritivo. Sem interação.

### Skills (`src/pages/skills/skills.tsx`)
- `skills-section` (`id="skills"`), `skills-heading`.
- 10 cards: `skill-card-<slug>` (slug = título minúsculo com `-`; atenção a
  `skill-card-react/next.js`, `skill-card-apis-rest/graphql`,
  `skill-card-cloud-&-devops`, `skill-card-metodologias-ágeis`).
- Tags são `<span>` **não clicáveis**; sem filtros. `onMouseEnter` só dispara analytics.

### GitHub (`src/pages/github/github.tsx`)
- `github-section`: **banner estático**, sem busca/estatísticas de API.
- Links externos para `https://github.com/scriblet`: `github-link` (PillButton) e
  logo com `aria-label="Abrir perfil no GitHub"`, ambos `target="_blank"`.

### Contato (`src/pages/formContact/contactForm.tsx`)
- `contact-section` (`id="contact"`). CTAs: `contact-email` (mailto), `contact-linkedin`
  (externo), `download-cv-button-contact`.
- Formulário (`<form noValidate aria-busy>`):
  - Honeypot oculto `#contact-website` (name `website`, `tabIndex={-1}`, `aria-hidden`).
  - `#contact-nome` (maxLength 100), `#contact-email` (type email, 254),
    `#contact-message` (textarea, 2000).
  - Validação client-side com mensagens em `#contact-*-error`, `aria-invalid`,
    `aria-describedby`; erros somem ao digitar. Mensagens: "Informe seu nome.",
    "O nome deve ter no máximo 100 caracteres.", "Informe seu email.",
    "Informe um email válido.", "Escreva sua mensagem.",
    "A mensagem deve ter no máximo 2000 caracteres."
  - Submit: `POST /api/contact` JSON `{name, email, message, website}`; botão
    `disabled` + `aria-disabled`, texto "Enviando...".
  - Feedback via Snackbar: sucesso (`200 {ok:true}`) → "Mensagem enviada"/
    "Obrigado! Vou responder em breve." + form limpo; `429` → warning "Muitas
    tentativas. Aguarde um minuto e tente novamente."; falha → error "Não foi
    possível enviar. Tente novamente."; offline (`navigator.onLine === false`)
    → warning "Você está offline. Verifique a conexão e tente novamente."
  - Snackbar (`snackbar-host`, `snackbar-{success,error,warning,info}`): auto-hide
    4–7 s por severidade, **ignora clickaway**, fecha com Escape/botão "Fechar".
- Backend: Netlify Function `netlify/functions/contact.mjs`, honeypot descarta
  com `200 {ok:true}`, rate limit 5 req/IP/60 s → `429`, webhook Discord server-only.
  **`npm run dev` (Vite puro) NÃO serve a function** → em E2E usar `cy.intercept`.

### Footer (`src/pages/footer.tsx`)
- Sociais `target="_blank" rel="noopener noreferrer"`: GitHub e LinkedIn com URL;
  **Instagram e Twitter têm `href=""`** (`src/data/social.ts`), comportamento
  atual a documentar nos testes (possível bug).
- Nav do rodapé ("Home", "Experiência", "Jornada", "Habilidades", "Contato") com
  react-scroll (offset −80). Fine print com ano corrente.

## 4. Tema claro/escuro

- `ColorModeProvider` (`src/theme/ColorModeProvider.tsx`): prioridade localStorage
  `"portfolio-color-mode"` (`COLOR_MODE_STORAGE_KEY`) → `prefers-color-scheme` → **"dark"**.
- Aplicação no DOM: `documentElement.style.colorScheme`, atributo
  **`data-mui-color-scheme="light|dark"` no `<html>`** (assertiva mais estável) e
  `<meta name="theme-color">`. CSS claro via `[data-mui-color-scheme="light"] .app-container`
  (`design-system.css`).
- Toggle: `theme-toggle` (`aria-label` dinâmico "Ativar tema claro/escuro",
  `aria-pressed`). A página `/immersive` herda o tema mas não tem toggle.

## 5. PWA / Offline

- `vite-plugin-pwa` (`registerType: 'autoUpdate'`, `devOptions.enabled: false`,
  **SW não roda em dev**; só em build/preview). Precache inclui JS/CSS/imagens/woff
  e o PDF do CV; `navigateFallback: 'index.html'` com denylist `/\/api\//`.
- Manifest inline: standalone, theme `#0a0814`, ícones 192/512/maskable em `public/`.
- `OfflineNotice` (`offline-notice`): só renderiza offline (eventos
  `online`/`offline` + `navigator.onLine`), `role="status"`, texto "Você está
  offline. O conteúdo em cache continua disponível." + botão "Tentar novamente"
  (`window.location.reload()`).
- `InstallButton` (`install-button`): só aparece quando `beforeinstallprompt` é
  capturado e o app não está em `display-mode: standalone`.

## 6. Página `/immersive`

- `immersive-page`: prévia experimental, `noindex`, tema adaptativo (herda o
  global; sem ThemeToggle).
- Nav (`ImmersiveNav`): âncoras nativas por hash `#about`, `#skills`, `#experience`,
  `#contact` (sem react-scroll), marca → `#immersive-hero`, CTA `RouterLink to="/"`.
- `CleanHero` (`immersive-hero`, `immersive-wordmark`, `immersive-hero-meta`),
  **sem interações clicáveis**. ⚠️ `PortalHero.tsx` tem testids próprios mas é
  **código morto** (não importado). **Não existe `ReleasesDeck`** no repo.
- `immersive-about`, `immersive-skills` (cards `immersive-skill-card` repetido),
  `immersive-experience` (itens `immersive-experience-item` repetido).
- Formulário próprio (`#immersive-contact-form`, campos `#immersive-nome`,
  `#immersive-email`, `#immersive-message`, honeypot `input[name="website"]`),
  **mesmas validações/mensagens** do form principal, mesmo `POST /api/contact`,
  mas feedback **inline** (`formSuccess`/`formError`): sucesso "Mensagem enviada.
  Responderei em breve.", 429 "Muitas tentativas. Aguarde um minuto.",
  erro "Não foi possível enviar. Tente pelo e-mail ou LinkedIn.",
  catch "Erro de conexão. Tente pelo e-mail ou LinkedIn.". Campos/erros sem
  data-testid → usar os `#immersive-*-error`.

## 7. Animações e esperas relevantes para E2E

- **Reveal on scroll** (`useRevealOnScroll`): `[data-reveal]` fica `opacity: 0`
  quando `data-motion="ready"` no root; IntersectionObserver marca
  `data-revealed="true"` uma única vez. **Esperar `[data-revealed="true"]`** ou
  forçar `prefers-reduced-motion: reduce` (aí nada é ocultado, `App.css`).
- Framer Motion mínimo em runtime (`DownloadCvButton` hover/tap). Sem `@keyframes`
  em CSS: tudo `transition`/transform. Sem loops infinitos ativos.
- Header auto-hide com `transform .25s` (vira `none` em reduced motion).
- `useStickyProgress` escreve `--p` via rAF durante o scroll do hero.
- `ReadingProgress` (barra `reading-progress-bar`, transition 120 ms).
- Timers: feedback de download 2500 ms; snackbars 4–7 s.
- Listeners de scroll com rAF/passive → asserções devem ter retry (default do Cypress).

## 8. Acessibilidade já presente

- Landmarks: `header`+`nav` (principal e do rodapé), `main#home`, `footer`;
  `/immersive` tem `main#immersive-main`; drawer `role="dialog" aria-modal`.
- aria-labels em tema, menu, sociais, download CV, progressbar de leitura.
- Formulários com labels/`htmlFor`, `aria-invalid`, `aria-describedby`, honeypot
  oculto; live regions em feedback de CV e OfflineNotice.
- `:focus-visible` global (outline violeta); `prefers-reduced-motion` respeitado.
- **Gap conhecido: não existe skip link.**

## 9. Infra de testes atual

- Vitest (jsdom): `npm run test:unit`, 9 arquivos, 42 testes (hooks, tema, dados,
  componentes). Cobertura de lógica; nada de navegador.
- **Não existe Cypress nem Playwright** (sem `cypress.config.*`, pasta `tests/`
  vazia, `test-results/.last-run.json` é resíduo).
- CI (`ci.yml`): `npm ci` → `lint` → `test:unit` → `build`. **Sem E2E.**
- `deploy.yml`: build com `VITE_BASE_PATH=/portfolio-2025/` + `404.html` → GitHub Pages.
- `docs/agents/testing.md`: Vitest é o loop padrão; E2E é opt-in e **nunca** no
  loop de dev (a suíte antiga de 100+ testes de navegador congelava a máquina).
  `docs/CONTACT-ENDPOINT.md` ainda cita um spec Playwright removido.

## 10. Superfície de seletores

- **Usar sempre `data-testid`** (60 ocorrências, listadas acima por seção) e IDs
  estáveis (`#contact-nome`, `#experience`, `#mobile-menu`…).
- **Nunca** selecionar por classes CSS modules (hasheadas), `sx`/classes MUI
  (`.MuiButton-root`), nem `ds-*` do design system.
- Atributos animados (`data-motion`, `data-revealed`, `style.transform`, `--p`)
  servem como **condição de espera**, não como identificador.
- `immersive-skill-card` e `immersive-experience-item` repetem testid → usar
  `.eq(n)` com parcimônia.

## 11. Armadilhas para a implementação dos testes

1. Sections lazy: aguardar `section-fallback` sumir e a section real aparecer.
2. Header some ao rolar para baixo (`inert`/`aria-hidden`).
3. `/roadmap` e os links dev-only só existem em dev.
4. `/api/contact` só existe em `netlify dev` → **sempre `cy.intercept`** nos specs.
5. Basename `/portfolio-2025/` em build de produção vs `/` em dev → `baseUrl`
   configurável (`CYPRESS_BASE_URL`).
6. SW ativo só em build/preview → specs de PWA rodam contra `vite preview`.
7. Tema default dark e persiste em `localStorage["portfolio-color-mode"]` →
   limpar entre testes; assertar `data-mui-color-scheme`.
8. Instagram/Twitter do footer com `href=""` (comportamento atual).
9. Snackbars somem sozinhos e ignoram clickaway (só Escape/botão "Fechar").
10. Reduced motion desliga reveals e transições: útil para estabilizar specs.

## 12. Cobertura proposta → mapa dos PRDs

| PRD | Escopo |
|---|---|
| `cypress-infraestrutura` | Instalação, config, comandos, servidor, CI, docs e regras de execução |
| `cypress-smoke-navegacao` | Home, rotas, header, drawer, tema, scroll/progresso |
| `cypress-secoes-conteudo` | Experiência, jornada, filosofia, skills, GitHub, footer e integridade de links |
| `cypress-formularios-contato` | Validação, submit, snackbars, honeypot, estados limite e form da `/immersive` |
| `cypress-pwa-offline` | OfflineNotice, conteúdo em cache, install button (preview build) |
| `cypress-a11y-responsivo` | axe-core, teclado/foco, viewports, reduced motion |
