# 🚀 Portfólio 2025 - Lucas Nonato

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
- [🚀 Publicação](#-publicação)
- [🤝 Contribuição](#-contribuição)
- [📄 Licença](#-licença)

## 🎯 Visão Geral

Este é um portfólio profissional que apresenta:
- **Apresentação pessoal** com foto e descrição das áreas de atuação
- **Estudos de caso profissionais** na seção Trabalho, com contexto, decisão e resultado
- **Habilidades técnicas** organizadas em cartões interativos
- **Mapa de maturidade em IA** com cinco camadas de atuação, de produto a governança
- **Manifesto técnico** com sete princípios e a foto das mãos em faixa de largura total
- **Links para GitHub** e projetos
- **Formulário de contato** integrado a uma Netlify Function que notifica via Discord
- **Rota `/immersive`**: refatoração visual com portal guiado por rolagem e painel de versões
- **Rota `/roadmap`**: plano de evolução do projeto com o estado de cada onda (montada apenas em desenvolvimento)

### 🎨 Design
- Interface moderna e minimalista
- Animações suaves com Framer Motion
- Temas claro e escuro (o `/immersive` permanece escuro de referência)
- Sistema de design com tokens em CSS + TypeScript
- Tipografia responsiva e legível
- Componentes acessíveis (diretrizes WCAG)

## ✨ Funcionalidades

### 🏠 Seção de Apresentação
- Foto profissional com descrição detalhada para acessibilidade
- Títulos animados apresentando as áreas de atuação
- Layout responsivo que se adapta a diferentes tamanhos de tela

### 💼 Trabalho
- Cinco estudos de caso em narrativa contínua, do mais recente ao mais antigo
- Cada estudo de caso traz contexto, desafio, decisão, resultado e pilha de tecnologias
- Metadados por estudo de caso com período, empresa e papel, sem cartões de vidro
- Âncoras antigas `#experience` e `#jornada` continuam levando à seção

### 🔧 Habilidades Técnicas
- 10 habilidades principais organizadas em cartões
- Ícones do Material-UI para identificação visual
- Etiquetas com tecnologias específicas
- Efeitos ao passar o mouse para melhor interação

### 🧠 Mapa de Maturidade em IA
- Trilho fixo com numeral e índice 01–05 que acende conforme a rolagem
- Cinco camadas em coluna contínua, sem cartões: produto, integração, RAG, agentes e governança
- Conteúdo de `src/data/aiMaturity.ts`, com evidência explícita por camada

### 🎯 Manifesto Técnico
- A tese é o próprio `h2`; "Como eu construo" entra como rótulo superior
- Foto das mãos em faixa de largura total entre a abertura e os princípios
- Sete princípios de `src/data/principles.ts`, com numeral recortado e impacto em itálico

### 📁 GitHub
- Seção dedicada aos projetos no GitHub
- Chamada para ação para seguir no GitHub
- Painel de vidro integrado ao tema claro/escuro

### 📬 Contato
- Três propostas de valor com ganho e chamada para ação que preenche o formulário
- Campos para nome, e-mail e mensagem
- Validação de formulário
- Integração com webhook do Discord para notificações
- Retorno visual de envio (sucesso/erro)

### 🧭 Navegação
- Cabeçalho fixo com navegação suave
- Menu hambúrguer responsivo para dispositivos móveis
- Links de ancoragem para seções específicas
- Rodapé com links de navegação e redes sociais

## 🛠️ Tecnologias

### Front-end
- **React 19.0.0** - Biblioteca JavaScript para construção de interfaces
- **TypeScript 5.7.2** - Superset tipado do JavaScript
- **Vite 6.2.0** - Ferramenta de compilação e servidor de desenvolvimento ultrarrápido
- **Material-UI 7.0.0** - Biblioteca de componentes React

### Estilização
- **Material-UI System** - Sistema de componentes de design
- **Sass 1.86.0** - Pré-processador CSS
- **Propriedades personalizadas CSS** - Variáveis CSS nativas
- **Design responsivo** - Abordagem mobile-first (prioridade para dispositivos móveis)

### Animações
- **Framer Motion 12.6.2** - Biblioteca de animações para React
- **React Intersection Observer 9.16.0** - Detecção de elementos visíveis

### Navegação
- **React Router DOM 7.4.0** - Roteamento para aplicações React
- **React Scroll 1.9.3** - Rolagem suave entre seções

### Tipografia
- **Fontsource Syne / Inter / Sora** - Fontes auto-hospedadas do design system

### Ferramentas de Desenvolvimento
- **ESLint 9.21.0** - Linter para JavaScript/TypeScript
- **PostCSS 8.5.3** - Processador CSS
- **Vite Plugin React 4.3.4** - Plugin do Vite para React

## 📱 Responsividade

### 🎯 Pontos de Quebra
```typescript
xs: 0px - 599px     // Smartphones
sm: 600px - 899px   // Tablets pequenos
md: 900px - 1199px  // Tablets grandes/Notebooks
lg: 1200px - 1535px // Computadores de mesa
xl: 1536px+         // Computadores de mesa grandes
```

### 📐 Pontos de Quebra Personalizados
```css
320px  // Smartphones muito pequenos
360px  // Smartphones pequenos
480px  // Smartphones grandes
768px  // Tablets
1024px // Tablets em modo paisagem
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
- ✅ Computador de mesa FHD (1920×1080)
- ✅ Computador de mesa 4K (3840×2160)

## 🚀 Instalação

### Pré-requisitos
- **Node.js 22.19+** (`engines` no `package.json`; Node 20 quebra os testes por
  causa do `jsdom` 31 → `undici` 8)
- npm 10+

### 🔧 Passo a passo

1. **Clone o repositório**
```bash
git clone https://github.com/Scriblet/portfolio-2025.git
cd portfolio-2025
```

2. **Instale as dependências**
```bash
npm install
```

O `install` roda o script `prepare`, que aponta os hooks de commit para
`.githooks/` (Conventional Commits: ver `docs/agents/commits.md`).

3. **Configure as variáveis de ambiente** (opcional)
```bash
cp .env.example .env
```

- `DISCORD_WEBHOOK_URL`: segredo **exclusivo do servidor** da Netlify Function.
- `VITE_CONTACT_ENDPOINT`: URL pública da função; vazio usa `/api/contact`
  (só funciona com `netlify dev`). Detalhes em `docs/CONTACT-ENDPOINT.md`.

4. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
# ou, para testar a função de contato na mesma origem:
npx netlify dev
```

5. **Acesse a aplicação**
```
http://localhost:5173
```

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev                # Vite em http://localhost:5173

# Qualidade
npm run lint               # ESLint + checagem de texto (falha em erro e em aviso)
npm run lint:text          # Só a checagem de texto (travessão proibido)
npm run test:unit          # Vitest + jsdom (ciclo padrão, ~2s)
npm run test:unit:watch    # Vitest em modo de observação

# Compilação (checagem de tipos + empacotamento)
npm run build              # tsc --noEmit (app e node) + vite build
npm run preview            # Serve o dist em http://localhost:4173

# E2E (opcional: ver docs/agents/testing.md)
npm run dev:test           # Servidor de desenvolvimento em :5174 para as especificações
npm run test:e2e:spec -- cypress/e2e/<spec>.cy.ts  # Uma especificação
npm run test:e2e:preview   # Compilação + pré-visualização + suíte completa (CI)

# Imagens
npm run images:optimize    # Gera AVIF/WebP/JPEG em src/img/generated
npm run images:check       # Valida o orçamento de peso das imagens (CI)
```

## 🏗️ Estrutura do Projeto

```
portfolio-2025/
├── .github/workflows/       # ci.yml (lint+testes+compilação) e deploy.yml (Pages)
├── .githooks/               # commit-msg (Conventional Commits)
├── .scratch/                # PRDs, tarefas e especificações do rastreador local
├── assets-src/img/          # Originais das imagens (fonte do fluxo de processamento)
├── cypress/                 # Especificações E2E e comandos personalizados
├── docs/                    # ADRs, agentes (commits, testes) e operação
├── netlify/functions/       # Netlify Function do formulário (contact.mjs)
├── public/                  # Estáticos (CV em PDF, ícones, 404.html)
├── scripts/                 # optimize-images.mjs e check-image-budget.mjs
├── src/
│   ├── components/          # Compartilhados (inclui design-system/)
│   ├── data/                # Conteúdo tipado (experiências, habilidades, plano de evolução…)
│   ├── hooks/               # Revelação, movimento reduzido, rolagem
│   ├── img/                 # Variantes responsivas geradas (generated/)
│   ├── pages/               # Seções, formulário e rota /immersive
│   ├── services/            # Endpoint de contato e integrações
│   ├── styles/              # design-system.css (tokens, vidro, grão)
│   └── theme/               # Tokens TS, paletas MUI e ColorModeProvider
├── vite.config.ts           # Vite, PWA e configuração do Vitest
├── netlify.toml             # Compilação Netlify + funções + contingência SPA
└── package.json             # Dependências, engines e scripts
```

> Rode `npm run images:optimize` após trocar um original em `assets-src/img/`.
> A compilação não gera imagens; `src/img/generated/` é versionado.

## 🎨 Componentes

### 🧭 Cabeçalho
- **Localização**: `src/pages/header.tsx`
- **Função**: Navegação principal da aplicação
- **Características**:
  - Cabeçalho fixo em pílula de vidro, alinhado ao design imersivo
  - Marca tipográfica em Syne, links em fonte mono e caixa alta e chamada para ação em pílula
  - Alternador de tema claro/escuro e instalação do PWA
  - Menu lateral (gaveta) para dispositivos móveis com foco inicial, fechamento por Escape e restauração de foco

### 🏠 Apresentação
- **Localização**: `src/pages/presentation.tsx`
- **Função**: Abertura editorial em formato de portal
- **Características**:
  - Cortinas de vidro que abrem com a rolagem via `useStickyProgress`
  - Fotografia em largura total com tingimento/vinheta e marca tipográfica de abertura
  - Conteúdo (nome, cargo, slogan e chamadas para ação) revelado ao final da abertura
  - Paleta escura local para preservar a atmosfera imersiva nos dois temas
  - Movimento reduzido abre o portal direto no conteúdo

### 💼 Trabalhos Selecionados
- **Localização**: `src/pages/selectedWork/selectedWork.tsx`
- **Função**: Estudos de caso reais em narrativa contínua (substitui Experiência + Jornada)
- **Características**:
  - Capítulos com numeral, período, empresa e papel
  - Blocos de contexto, desafio, decisão e resultado
  - Pilha de tecnologias em etiquetas mono e divisores de linha fina
  - Dados de `src/data/selectedWorks.ts`; âncoras antigas preservadas

### 🔧 Habilidades
- **Localização**: `src/pages/skills/skills.tsx`
- **Função**: Vitrine das habilidades técnicas
- **Características**:
  - Cartões de vidro com índice, ícone, título, descrição e etiquetas
  - Ícones do Material-UI por `SkillIconKey`
  - Conteúdo de `src/data/skills.ts`
  - Grade responsiva 4/3/2/1

### 🧠 Maturidade em IA
- **Localização**: `src/pages/iaMaturity/iaMaturity.tsx`
- **Função**: Mapa de competência em IA em cinco camadas
- **Características**:
  - Coluna contínua com linhas finas, sem cartões
  - Trilho fixo com numeral gigante e índice ativo conforme a rolagem
  - Capacidades em micrograde e evidência em fonte mono
  - Conteúdo de `src/data/aiMaturity.ts`

### 🎯 Manifesto
- **Localização**: `src/pages/manifesto/manifesto.tsx`
- **Função**: Princípios técnicos e de trabalho (absorve a antiga Filosofia)
- **Características**:
  - Declaração como `h2` em escala de destaque
  - Foto das mãos em faixa de largura total
  - Sete princípios com numeral recortado e impacto em itálico
  - Conteúdo de `src/data/principles.ts`

### 📁 GitHub
- **Localização**: `src/pages/github/github.tsx`
- **Função**: Promoção do perfil GitHub
- **Características**:
  - Painel de vidro com texto e chamada para ação em pílula
  - Logo monocromático via Simple Icons
  - Link externo com `rel="noopener noreferrer"`

### 📬 Contato
- **Localização**: `src/pages/formContact/contactForm.tsx`
- **Função**: Proposta de valor + formulário de contato
- **Características**:
  - Três frentes em composição tipográfica (sem cartões), com chamada para ação que preenche o formulário
  - Cartão de vidro com campos nativos estilizados
  - Validação de nome, e-mail e mensagem
  - Honeypot (campo armadilha), tratamento de 429 e estado sem conexão
  - Retorno visual via snackbar (`aria-live`)

### 🦶 Rodapé
- **Localização**: `src/pages/footer.tsx`
- **Função**: Rodapé com links e informações
- **Características**:
  - Marca tipográfica, links em fonte mono e ícones sociais vazados
  - Linha fina, marca tipográfica grande e texto em letras miúdas
  - Rolagem suave e métricas de análise preservadas

## 📐 Sistema de Design

### 🎨 Tokens e paleta
Fonte única de verdade:
- `src/styles/design-system.css`: propriedades personalizadas CSS e classes `ds-*`.
- `src/theme/designTokens.ts`: os mesmos valores em TypeScript.
- `src/theme/palettes.ts`: paletas MUI por modo.

| Token | Escuro | Claro |
|---|---|---|
| `--void` | `#0a0814` | `#f7f5fa` |
| `--void-2` | `#120e22` | `#ffffff` |
| `--paper` | `#f2eefb` | `#181023` |
| `--paper-2` | `#a9a0c4` | `#5a526e` |
| `--violet` | `#7c3aed` | `#6d28d9` |
| `--magenta` | `#c026d3` | `#a21caf` |

O `ColorModeProvider` aplica `data-mui-color-scheme` no `<html>`; o bloco
`[data-mui-color-scheme="light"]` troca os tokens sem duplicar CSS.

### 📝 Tipografia
- **Display**: `Syne` 600–800.
- **Corpo**: `Inter` 300–500.
- **Rótulos / mono**: `Sora` 400–600.
- **Escala**: `clamp()` fluida, carregada via `@fontsource`.

### 🧊 Vidro, grão e foco
- Vidro escuro: `--glass-bg`, `--glass-border`, `--glass-shadow`.
- Vidro claro: `--glass-light-bg`, `--glass-light-border`.
- Grão SVG fixo em `GrainOverlay` (~7,5% de opacidade).
- Foco visível global de 2px com deslocamento de 3px.
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
- **Alvo** (`target`): ES2020
- **Bibliotecas** (`lib`): ES2020, DOM, DOM.Iterable
- **Módulo** (`module`): ESNext
- **Modo estrito** (`strict`): true
- **JSX** (`jsx`): react-jsx

### 🎨 Tema do Material-UI (theme.ts)
- Tipografia responsiva com `clamp()`
- Paleta de cores customizada
- Pontos de quebra padrão do Material-UI
- Componentes personalizados

### 🔍 ESLint (eslint.config.js)
- Configuração para TypeScript
- Regras para React e React Hooks
- Configuração para arquivos .js e .ts

## 📱 Testes de Responsividade

### 🛠️ Ferramentas Recomendadas
1. **Chrome DevTools** - Emulação de dispositivos
2. **Firefox** - Modo de design responsivo
3. **Responsively App** - Testes em múltiplos dispositivos
4. **BrowserStack** - Testes em dispositivos reais

### ✅ Lista de Verificação de Testes
- [ ] Textos legíveis em todos os tamanhos
- [ ] Botões com área de toque adequada (44px+)
- [ ] Imagens redimensionam corretamente
- [ ] Navegação funciona em dispositivos móveis
- [ ] Formulários usáveis em dispositivos de toque
- [ ] Sem rolagem horizontal indesejada
- [ ] Animações suaves em todos os dispositivos
- [ ] Desempenho mantido em dispositivos de baixo desempenho

### 📊 Métricas de Desempenho
- **Pontuação no Lighthouse**: 90+ (dispositivos móveis)
- **First Contentful Paint** (primeira renderização de conteúdo): < 2s
- **Largest Contentful Paint** (maior renderização de conteúdo): < 4s
- **Cumulative Layout Shift** (deslocamento cumulativo de layout): < 0.1

## 🚀 Publicação

### 🐙 GitHub Pages (produção)

O site é publicado em **https://scriblet.github.io/portfolio-2025/** pelo
fluxo de trabalho `.github/workflows/deploy.yml` a cada push em `main`:

1. `npm ci` + `npm run build` com `VITE_BASE_PATH=/portfolio-2025/`.
2. `dist/404.html` é gerado a partir do `index.html` (rota de contingência da SPA).
3. O diretório `dist/` vai para o Pages via `actions/deploy-pages`.

Variáveis de compilação (Settings → Secrets and variables → Actions):

| Tipo     | Nome                    | Uso                                     |
| -------- | ----------------------- | --------------------------------------- |
| Variável | `VITE_CONTACT_ENDPOINT` | URL pública da função (ver abaixo)      |
| Variável | `VITE_GA_MEASUREMENT_ID`| Google Analytics                        |

### 📬 Netlify (somente as funções)

O Pages é estático e **não serve `/api/*`**. A Netlify Function de contato
(`netlify/functions/contact.mjs`) roda em uma implantação separada no Netlify;
`netlify.toml` já configura a compilação, as funções e a rota de contingência da SPA.

- Segundo site Netlify no mesmo repositório: comando de compilação vazio, diretório de
  publicação `public` e diretório de funções `netlify/functions`.
- Segredo `DISCORD_WEBHOOK_URL` (nunca `VITE_*`).
- CORS liberado para `scriblet.github.io` e `lucasnonato.site`
  (extras em `CONTACT_ALLOWED_ORIGINS`).

Passo a passo completo, contrato HTTP e rotação do webhook:
[`docs/CONTACT-ENDPOINT.md`](docs/CONTACT-ENDPOINT.md).

## 🤝 Contribuição

### 🔄 Fluxo de Trabalho
1. Faça um fork do projeto
2. Crie uma branch para sua funcionalidade (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Envie para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

### 📋 Padrões de Código
- Use TypeScript para segurança de tipos
- Siga as convenções do ESLint configurado
- Escreva commits descritivos
- Teste a responsividade em múltiplos dispositivos
- Mantenha a acessibilidade (diretrizes WCAG)
- **Nunca use travessão (em dash, U+2014) no texto**: troque por vírgula, dois-pontos, parênteses ou ponto final. O `npm run lint` bloqueia. Regra completa em [`docs/agents/copy.md`](docs/agents/copy.md)

### 🐛 Reportar Bugs
- Use as Issues do GitHub
- Descreva os passos para reproduzir
- Inclua capturas de tela se aplicável
- Mencione o dispositivo/navegador usado

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
- **Portfólio**: [Este projeto!]

---

⭐ **Se este projeto foi útil para você, considere dar uma estrela no GitHub!**
