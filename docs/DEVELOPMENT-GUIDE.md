# 📖 Guia de Desenvolvimento - Portfolio 2025

## 🎯 Objetivo
Este guia fornece instruções detalhadas para desenvolvedores que desejam contribuir ou modificar o projeto Portfolio 2025.

## 🏗️ Arquitetura da Aplicação

### 📦 Padrão de Organização
O projeto segue uma estrutura baseada em **páginas/componentes**, onde cada seção principal da aplicação é um componente independente:

```
src/pages/
├── header.tsx          # Navegação principal
├── presentation.tsx    # Seção de apresentação
├── experience/         # Experiências profissionais
├── skills/            # Habilidades técnicas
├── filosofia/         # Valores e filosofia
├── github/            # Seção GitHub
├── formContact/       # Formulário de contato
└── footer.tsx         # Rodapé
```

### 🎨 Sistema de Estilos

#### Material-UI + CSS Modules + Sass
- **Material-UI**: Componentes base e sistema de design
- **CSS Modules**: Estilos isolados por componente (.module.scss)
- **Sass**: Pré-processador para funcionalidades avançadas
- **CSS Global**: Utilitários responsivos e reset

#### Convenções de Nomenclatura
```scss
// BEM (Block Element Modifier)
.component-name { }
.component-name__element { }
.component-name--modifier { }

// Exemplo: experience.module.scss
.experience-title { }
.experience-title--color-1 { }
.experience-text { }
```

### 🔄 Gerenciamento de Estado
- **Estado Local**: `useState` para formulários e interações
- **Props**: Comunicação entre componentes
- **Context**: Não utilizado (aplicação simples)
- **Estado Global**: Não necessário para este projeto

## 🛠️ Ferramentas de Desenvolvimento

### 🔧 Configuração do Ambiente

#### VS Code (Recomendado)
Extensions essenciais:
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag"
  ]
}
```

#### Configuração do Prettier (.prettierrc)
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

### 🎯 Scripts de Desenvolvimento

#### Comandos Úteis
```bash
# Desenvolvimento com hot reload
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Linting com correção automática
npm run lint -- --fix

# Análise de bundle
npm run build -- --analyze

# Limpar cache do Vite
npm run dev -- --force
```

## 🎨 Guia de Componentes

### 📝 Criando Novos Componentes

#### Template Base
```tsx
// src/pages/novo-componente/NovoComponente.tsx
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import styles from "./NovoComponente.module.scss";

interface NovoComponenteProps {
  // Defina as props aqui
}

const NovoComponente: React.FC<NovoComponenteProps> = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component={motion.section}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={styles.container}
      sx={{
        // Estilos responsivos aqui
      }}
    >
      <Typography variant="h2" className={styles.title}>
        Título do Componente
      </Typography>
      
      {/* Conteúdo aqui */}
    </Box>
  );
};

export default NovoComponente;
```

#### Arquivo SCSS Correspondente
```scss
// src/pages/novo-componente/NovoComponente.module.scss
.container {
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
}

.title {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  margin-bottom: 1rem;
}
```

### 🎭 Padrões de Animação

#### Framer Motion - Convenções
```tsx
// Animação de entrada padrão
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Animação escalonada
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Hover simples
const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.2 }
};
```

## 📱 Desenvolvimento Responsivo

### 🎯 Mobile-First Approach
```scss
// ✅ Correto - Mobile primeiro
.component {
  font-size: 1rem;
  
  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
  
  @media (min-width: 1024px) {
    font-size: 1.5rem;
  }
}

// ❌ Incorreto - Desktop primeiro
.component {
  font-size: 1.5rem;
  
  @media (max-width: 1024px) {
    font-size: 1.2rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
}
```

### 📐 Breakpoints Material-UI
```tsx
// Hook useMediaQuery
const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

// Responsive props no sx
sx={{
  fontSize: {
    xs: "1rem",      // 0px+
    sm: "1.2rem",    // 600px+
    md: "1.4rem",    // 900px+
    lg: "1.6rem",    // 1200px+
    xl: "1.8rem"     // 1536px+
  }
}}
```

### 🔧 Utilitários Responsivos
```css
/* Classes utilitárias disponíveis */
.hide-mobile    /* Oculta em mobile */
.show-mobile    /* Mostra apenas em mobile */
.hide-tablet    /* Oculta em tablet */
.show-tablet    /* Mostra apenas em tablet */

/* Grid responsivo */
.grid-responsive /* 1 col mobile → 2 tablet → 3-4 desktop */

/* Texto responsivo */
.text-responsive /* Word-wrap automático */

/* Container responsivo */
.responsive-container /* Padding adaptativo */
```

## 🎨 Sistema de Tema

### 🎨 Customização do Tema
```typescript
// src/theme.ts - Adicionando novas cores
const customTheme = createTheme({
  palette: {
    primary: {
      main: "#673ab7",
      light: "#9a67ea",
      dark: "#320b86"
    },
    // Adicione cores customizadas
    tertiary: {
      main: "#ff6b6b",
      contrastText: "#fff"
    }
  }
});

// Estendendo tipos TypeScript
declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
  }
}
```

### 📝 Tipografia Customizada
```typescript
// Adicionando variantes de tipografia
typography: {
  // Variantes personalizadas
  subtitle3: {
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: 1.57
  }
}

// Declaração de tipos
declare module '@mui/material/styles' {
  interface TypographyVariants {
    subtitle3: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    subtitle3?: React.CSSProperties;
  }
}
```

## 🔧 Otimização e Performance

### 📦 Code Splitting
```tsx
// Lazy loading de componentes pesados
import { lazy, Suspense } from "react";

const HeavyComponent = lazy(() => import("./HeavyComponent"));

// Uso com Suspense
<Suspense fallback={<div>Carregando...</div>}>
  <HeavyComponent />
</Suspense>
```

### 🖼️ Otimização de Imagens
```tsx
// Imagens responsivas
<img
  src="/img/image-mobile.jpg"
  srcSet="/img/image-mobile.jpg 400w, /img/image-tablet.jpg 768w, /img/image-desktop.jpg 1200w"
  sizes="(max-width: 768px) 400px, (max-width: 1200px) 768px, 1200px"
  alt="Descrição acessível"
  loading="lazy"
/>
```

### ⚡ Bundle Analysis
```bash
# Analisar tamanho do bundle
npm run build -- --analyze

# Verificar dependências não utilizadas
npx depcheck

# Audit de segurança
npm audit --audit-level moderate
```

## 🧪 Testes

### 🔍 Testes Manuais Responsivos
```bash
# Checklist para cada novo componente:
# □ Mobile (320px-768px)
# □ Tablet (768px-1024px) 
# □ Desktop (1024px+)
# □ Landscape mobile
# □ Touch targets 44px+
# □ Texto legível sem zoom
# □ Navegação acessível
```

### 🛠️ Ferramentas de Teste
```javascript
// Teste de responsividade programático
const breakpoints = [320, 375, 768, 1024, 1440, 1920];

breakpoints.forEach(width => {
  console.log(`Testando largura: ${width}px`);
  // Lógica de teste aqui
});
```

## 🚀 Deploy e CI/CD

### 🌐 Configuração Netlify
```toml
# netlify.toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### 🔄 GitHub Actions
```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run build
```

## 📋 Checklist de Desenvolvimento

### ✅ Antes de Fazer Commit
- [ ] Código lint-free (`npm run lint`)
- [ ] Build sem erros (`npm run build`)
- [ ] Testes responsivos em 3+ tamanhos
- [ ] Verificação de acessibilidade básica
- [ ] Commit message descritiva

### ✅ Antes de Pull Request
- [ ] Branch atualizada com main
- [ ] Funcionalidade testada completamente
- [ ] Screenshots de diferentes dispositivos
- [ ] Documentação atualizada se necessário
- [ ] Performance não degradada

### ✅ Code Review Guidelines
- [ ] Legibilidade e manutenibilidade
- [ ] Padrões de projeto seguidos
- [ ] Responsividade implementada
- [ ] Sem código duplicado
- [ ] Tratamento de erros adequado

## 🆘 Solução de Problemas

### 🐛 Problemas Comuns

#### Build Falha
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install

# Forçar rebuild do Vite
npm run dev -- --force
```

#### Problemas de Tipagem TypeScript
```typescript
// Declaração de módulos não tipados
declare module "module-sem-tipos" {
  const content: any;
  export default content;
}
```

#### Problemas de Performance
```javascript
// Debug de re-renders
import { StrictMode } from "react";

// Ativar apenas em desenvolvimento
{process.env.NODE_ENV === 'development' && (
  <StrictMode>
    <App />
  </StrictMode>
)}
```

## 📚 Recursos Úteis

### 📖 Documentação
- [React 19 Docs](https://react.dev/)
- [Material-UI](https://mui.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Vite](https://vitejs.dev/)

### 🛠️ Ferramentas
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [React DevTools](https://reactjs.org/blog/2019/08/15/new-react-devtools.html)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

---

**💡 Lembre-se**: Este é um projeto em constante evolução. Contribuições e melhorias são sempre bem-vindas!
