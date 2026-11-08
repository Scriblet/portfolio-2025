# 🚀 Portfolio 2025 - Lucas Nonato

Um portfólio moderno e responsivo desenvolvido com React, TypeScript e Material-UI, apresentando experiências profissionais, habilidades técnicas e projetos de desenvolvimento.

## 📋 Índice

- [🎯 Visão Geral](#-visão-geral)
- [✨ Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologias](#️-tecnologias)
- [📱 Responsividade](#-responsividade)
- [🚀 Instalação](#-instalação)
- [📦 Scripts Disponíveis](#-scripts-disponíveis)
- [🏗️ Estrutura do Projeto](#️-estrutura-do-projeto)
- [🎨 Componentes](#-componentes)
- [📐 Sistema de Design](#-sistema-de-design)
- [🔧 Configurações](#-configurações)
- [📱 Testes de Responsividade](#-testes-de-responsividade)
- [🚀 Deploy](#-deploy)
- [🤝 Contribuição](#-contribuição)
- [📄 Licença](#-licença)

## 🎯 Visão Geral

Este é um portfólio profissional que apresenta:
- **Apresentação pessoal** com foto e descrição das áreas de atuação
- **Experiências profissionais** em empresas como Porto Seguro, Thoughtworks e Arco Educação
- **Habilidades técnicas** organizadas em cards interativos
- **Filosofia e valores** pessoais e profissionais
- **Links para GitHub** e projetos
- **Formulário de contato** integrado com Discord webhook

### 🎨 Design
- Interface moderna e minimalista
- Animações suaves com Framer Motion
- Tema escuro profissional
- Tipografia responsiva e legível
- Componentes acessíveis (WCAG guidelines)

## ✨ Funcionalidades

### 🏠 Seção de Apresentação
- Foto profissional com descrição detalhada para acessibilidade
- Títulos animados apresentando as áreas de atuação
- Layout responsivo que se adapta a diferentes tamanhos de tela

### 💼 Experiências Profissionais
- Cards organizados com numeração visual
- Descrição das empresas e cargos ocupados
- Sistema de cores diferenciadas para cada experiência
- Grid responsivo que se adapta ao dispositivo

### 🔧 Habilidades Técnicas
- 10 habilidades principais organizadas em cards
- Ícones do Material-UI para identificação visual
- Tags com tecnologias específicas
- Efeitos hover para melhor interação

### 🎯 Filosofia e Valores
- Banner dedicado aos valores pessoais e profissionais
- Imagem representativa sobre diversidade e inclusão
- Link direto para o LinkedIn

### 📁 GitHub
- Seção dedicada aos projetos no GitHub
- Call-to-action para seguir no GitHub
- Design contrastante com fundo branco

### 📬 Formulário de Contato
- Campos para nome, email e mensagem
- Validação de formulário
- Integração com Discord webhook para notificações
- Feedback visual de envio (sucesso/erro)

### 🧭 Navegação
- Header fixo com navegação suave
- Menu hamburger responsivo para mobile
- Links de ancoragem para seções específicas
- Footer com links de navegação e redes sociais

## 🛠️ Tecnologias

### Frontend
- **React 19.0.0** - Biblioteca JavaScript para construção de interfaces
- **TypeScript 5.7.2** - Superset tipado do JavaScript
- **Vite 6.2.0** - Build tool e dev server ultrarrápido
- **Material-UI 7.0.0** - Biblioteca de componentes React

### Estilização
- **Material-UI System** - Sistema de design components
- **Sass 1.86.0** - Pré-processador CSS
- **CSS Custom Properties** - Variáveis CSS nativas
- **Responsive Design** - Mobile-first approach

### Animações
- **Framer Motion 12.6.2** - Biblioteca de animações para React
- **React Intersection Observer 9.16.0** - Detecção de elementos visíveis

### Navegação
- **React Router DOM 7.4.0** - Roteamento para aplicações React
- **React Scroll 1.9.3** - Scroll suave entre seções

### Tipografia
- **Fontsource Poppins 5.2.5** - Fonte Poppins auto-hospedada

### Ferramentas de Desenvolvimento
- **ESLint 9.21.0** - Linter para JavaScript/TypeScript
- **PostCSS 8.5.3** - Processador CSS
- **Vite Plugin React 4.3.4** - Plugin do Vite para React

## 📱 Responsividade

### 🎯 Breakpoints
```typescript
xs: 0px - 599px     // Smartphones
sm: 600px - 899px   // Tablets pequenos
md: 900px - 1199px  // Tablets grandes/Laptops
lg: 1200px - 1535px // Desktops
xl: 1536px+         // Desktops grandes
```

### 📐 Breakpoints Customizados
```css
320px  // Smartphones muito pequenos
360px  // Smartphones pequenos
480px  // Smartphones grandes
768px  // Tablets
1024px // Tablets landscape
1440px // Monitores padrão
```

### 🔧 Sistema de Tipografia Responsiva
```css
/* Usando clamp() para escalabilidade fluida */
h1: clamp(1.8rem, 4vw, 3.052rem)
h2: clamp(1.5rem, 3.5vw, 2.441rem)
body: clamp(0.875rem, 1.5vw, 1rem)
```

### 📱 Dispositivos Suportados
- ✅ iPhone SE (375×667)
- ✅ iPhone 12/13/14 (390×844)
- ✅ iPhone 14 Pro Max (430×932)
- ✅ Samsung Galaxy S21 (360×800)
- ✅ iPad Mini (768×1024)
- ✅ iPad Air (820×1180)
- ✅ Desktop FHD (1920×1080)
- ✅ Desktop 4K (3840×2160)

## 🚀 Instalação

### Pré-requisitos
- Node.js 18+ 
- npm 8+ ou yarn 1.22+

### 🔧 Passo a passo

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/portfolio-2025.git
cd portfolio-2025
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente** (opcional)
```bash
# Copie o arquivo de exemplo
cp .env.example .env.local

# Configure as variáveis necessárias
VITE_DISCORD_WEBHOOK_URL=sua_webhook_url_aqui
```

4. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
# ou
yarn dev
```

5. **Acesse a aplicação**
```
http://localhost:5173
```

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Gera build de produção
npm run preview      # Visualiza build de produção

# Linting
npm run lint         # Executa ESLint

# Tipo checking
npm run type-check   # Verifica tipos TypeScript
```

## 🏗️ Estrutura do Projeto

```
portfolio-2025/
├── public/                 # Arquivos estáticos
│   └── vite.svg
├── src/                    # Código fonte
│   ├── assets/            # Assets da aplicação
│   │   └── react.svg
│   ├── components/
│   │   ├── design-system/ # Primitivas do design system
│   │   └── ...            # Componentes compartilhados
│   ├── hooks/             # Hooks (reveal, movimento reduzido, scroll)
│   ├── img/               # Imagens
│   │   ├── multiracial-hands-coming-together.jpg
│   │   └── presetation.jpg
│   ├── pages/             # Componentes de página
│   │   ├── experience/    # Seção de experiências
│   │   │   └── experience.tsx
│   │   ├── filosofia/     # Seção de filosofia
│   │   │   └── filosofia.tsx
│   │   ├── formContact/   # Formulário de contato
│   │   │   └── contactForm.tsx
│   │   ├── github/        # Seção do GitHub
│   │   │   └── github.tsx
│   │   ├── skills/        # Seção de habilidades
│   │   │   └── skills.tsx
│   │   ├── timeline/      # Linha do tempo da carreira
│   │   │   └── timeline.tsx
│   │   ├── toolbox/       # Stack e ferramentas
│   │   │   └── toolbox.tsx
│   │   ├── footer.tsx     # Rodapé
│   │   ├── header.tsx     # Cabeçalho
│   │   ├── header.module.scss
│   │   ├── pages.module.scss # Layout compartilhado das seções
│   │   ├── presentation.tsx # Apresentação
│   │   └── presentation.module.scss
│   ├── styles/            # Estilos globais
│   │   ├── design-system.css # Tokens, vidro, grão e foco
│   │   └── responsive-utils.css
│   ├── theme/
│   │   ├── designTokens.ts # Tokens do DS em TypeScript
│   │   ├── palettes.ts     # Paletas MUI por modo
│   │   └── ColorModeProvider.tsx
│   ├── App.css           # Estilos do componente principal
│   ├── App.tsx           # Componente principal
│   ├── index.css         # Estilos globais
│   ├── main.tsx          # Ponto de entrada
│   ├── theme.ts          # Configuração do tema Material-UI
│   └── vite-env.d.ts     # Tipos do Vite
├── eslint.config.js      # Configuração ESLint
├── index.html            # Template HTML
├── netlify.toml          # Configuração Netlify
├── package.json          # Dependências e scripts
├── tsconfig.json         # Configuração TypeScript
├── tsconfig.app.json     # Configuração TypeScript (app)
├── tsconfig.node.json    # Configuração TypeScript (Node)
├── vite.config.ts        # Configuração Vite
└── README.md             # Esta documentação
```

## 🎨 Componentes

### 🧭 Header
- **Localização**: `src/pages/header.tsx`
- **Função**: Navegação principal da aplicação
- **Características**:
  - Header glass pill fixo, alinhado ao design imersivo
  - Wordmark Syne, links mono uppercase e CTA pill
  - Toggle de tema claro/escuro e instalação PWA
  - Drawer mobile com foco inicial, fechamento por Escape e restauração de foco

### 🏠 Presentation
- **Localização**: `src/pages/presentation.tsx`
- **Função**: Hero editorial em formato portal
- **Características**:
  - Cortinas de vidro que abrem no scroll via `useStickyProgress`
  - Fotografia full-bleed com tint/vignette e wordmark de abertura
  - Conteúdo (nome, cargo, tagline e CTAs) revelado ao final da abertura
  - Paleta escura local para preservar a atmosfera imersiva nos dois temas
  - Movimento reduzido abre o portal direto no conteúdo

### 💼 Experience
- **Localização**: `src/pages/experience/experience.tsx`
- **Função**: Apresentação das experiências profissionais
- **Características**:
  - Grid de 3 colunas no desktop (2 no tablet, 1 no mobile)
  - Cards de vidro com numeração, período, empresa e cargo
  - Dados reais de `src/data/experiences.ts`
  - Hover com elevação respeitando `prefers-reduced-motion`

### 🔧 Skills
- **Localização**: `src/pages/skills/skills.tsx`
- **Função**: Showcase das habilidades técnicas
- **Características**:
  - Cards de vidro com índice, ícone, título, descrição e tags
  - Ícones do Material-UI por `SkillIconKey`
  - Conteúdo de `src/data/skills.ts`
  - Grid responsivo 4/3/2/1

### 🎯 Philosophy
- **Localização**: `src/pages/filosofia/filosofia.tsx`
- **Função**: Apresentação de valores pessoais
- **Características**:
  - Seção editorial escura com declaração em Syne
  - Destaque em âmbar e régua hairline
  - Foto com tratamento duotônico e vinheta
  - CTA para LinkedIn em pill

### 📁 GitHub
- **Localização**: `src/pages/github/github.tsx`
- **Função**: Promoção do perfil GitHub
- **Características**:
  - Painel de vidro com texto e CTA pill
  - Logo monocromático via Simple Icons
  - Link externo com `rel="noopener noreferrer"`

### 📬 ContactForm
- **Localização**: `src/pages/formContact/contactForm.tsx`
- **Função**: Formulário de contato
- **Características**:
  - Card de vidro com inputs nativos estilizados
  - Validação de nome, e-mail e mensagem
  - Honeypot, tratamento de 429 e estado offline
  - Feedback via snackbar (`aria-live`)

### 🦶 Footer
- **Localização**: `src/pages/footer.tsx`
- **Função**: Rodapé com links e informações
- **Características**:
  - Wordmark, links mono e ícones sociais ghost
  - Hairline, wordmark grande e fine print
  - Scroll suave e analytics preservados

## 📐 Sistema de Design

### 🎨 Tokens e paleta
Fonte única de verdade:
- `src/styles/design-system.css` — CSS custom properties e classes `ds-*`.
- `src/theme/designTokens.ts` — os mesmos valores em TypeScript.
- `src/theme/palettes.ts` — paletas MUI por modo.

| Token | Dark | Light |
|---|---|---|
| `--void` | `#090b0d` | `#f4f4f5` |
| `--void-2` | `#101317` | `#ffffff` |
| `--paper` | `#f1eee8` | `#18181b` |
| `--paper-2` | `#a8afb2` | `#52525b` |
| `--emerald` | `#34d399` | `#047857` |
| `--amber` | `#e8913c` | `#b45309` |

O `ColorModeProvider` aplica `data-mui-color-scheme` no `<html>`; o bloco
`[data-mui-color-scheme="light"]` troca os tokens sem duplicar CSS.

### 📝 Tipografia
- **Display**: `Syne` 600–800.
- **Corpo**: `Inter` 300–500.
- **Labels / mono**: `Sora` 400–600.
- **Escala**: `clamp()` fluida, carregada via `@fontsource`.

### 🧊 Vidro, grão e foco
- Vidro escuro: `--glass-bg`, `--glass-border`, `--glass-shadow`.
- Vidro claro: `--glass-light-bg`, `--glass-light-border`.
- Grão SVG fixo em `GrainOverlay` (~7,5% de opacidade).
- Foco visível global de 2px com offset 3px.
- `prefers-reduced-motion` remove animações e deslocamentos.

### 🧩 Primitivas
Em `src/components/design-system/`:
`GlassPanel`, `Hairline`, `GrainOverlay`, `IndexNumeral`, `PillButton`,
`PillIcon` e `SectionLabel`.

### 📏 Espaçamentos e raios
- Espaçamento: `--space-1` (4px) a `--space-9` (96px).
- Raios: `--radius-sm` (12px), `--radius-md` (16px), `--radius-lg` (24px),
  `--radius-pill` (999px).

## 🔧 Configurações

### ⚛️ Vite (vite.config.ts)
```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
```

### 📝 TypeScript (tsconfig.json)
- **Target**: ES2020
- **Lib**: ES2020, DOM, DOM.Iterable
- **Module**: ESNext
- **Strict**: true
- **JSX**: react-jsx

### 🎨 Material-UI Theme (theme.ts)
- Tipografia responsiva com `clamp()`
- Paleta de cores customizada
- Breakpoints padrão do Material-UI
- Componentes personalizados

### 🔍 ESLint (eslint.config.js)
- Configuração para TypeScript
- Rules para React e React Hooks
- Configuração para arquivos .js e .ts

## 📱 Testes de Responsividade

### 🛠️ Ferramentas Recomendadas
1. **Chrome DevTools** - Device emulation
2. **Firefox Responsive Design Mode**
3. **Responsively App** - Multi-device testing
4. **BrowserStack** - Real device testing

### ✅ Checklist de Testes
- [ ] Textos legíveis em todos os tamanhos
- [ ] Botões com área de toque adequada (44px+)
- [ ] Imagens redimensionam corretamente
- [ ] Navegação funciona em mobile
- [ ] Formulários usáveis em touch devices
- [ ] Sem scroll horizontal indesejado
- [ ] Animações suaves em todos os dispositivos
- [ ] Performance mantida em dispositivos baixo-end

### 📊 Métricas de Performance
- **Lighthouse Score**: 90+ (mobile)
- **First Contentful Paint**: < 2s
- **Largest Contentful Paint**: < 4s
- **Cumulative Layout Shift**: < 0.1

## 🚀 Deploy

### 🌐 Netlify (Recomendado)
```toml
# netlify.toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### ▲ Vercel
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev"
}
```

### 🐙 GitHub Pages
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 🤝 Contribuição

### 🔄 Fluxo de Trabalho
1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

### 📋 Padrões de Código
- Use TypeScript para tipo safety
- Siga as convenções do ESLint configurado
- Escreva commits descritivos
- Teste a responsividade em múltiplos dispositivos
- Mantenha a acessibilidade (WCAG guidelines)

### 🐛 Reportar Bugs
- Use as Issues do GitHub
- Descreva os passos para reproduzir
- Inclua screenshots se aplicável
- Mencione o dispositivo/browser usado

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Sobre o Desenvolvedor

**Lucas Nonato**
- Desenvolvedor Full-Stack
- UX Designer
- Especialista em acessibilidade digital

### 🔗 Links
- **LinkedIn**: [lucas-nonato1](https://www.linkedin.com/in/lucas-nonato1/)
- **GitHub**: [scriblet](https://github.com/scriblet)
- **Portfolio**: [Este projeto!]

---

⭐ **Se este projeto foi útil para você, considere dar uma estrela no GitHub!**
