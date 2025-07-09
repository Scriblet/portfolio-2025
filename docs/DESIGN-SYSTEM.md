# 🎨 Guia de Design System - Portfolio 2025

## 🎯 Visão Geral
Este documento define o sistema de design utilizado no Portfolio 2025, incluindo cores, tipografia, espaçamentos, componentes e diretrizes de uso.

## 🎨 Paleta de Cores

### 🌈 Cores Principais
```scss
// Cores Primárias
$primary: #673ab7;           // Roxo principal - CTAs, links, destaques
$primary-light: #9a67ea;     // Roxo claro - Hover states
$primary-dark: #320b86;      // Roxo escuro - Active states

// Cores Secundárias  
$secondary: #800080;         // Roxo secundário - Acentos
$tertiary: #e95d90;         // Rosa - Empresa 4 (Experience)

// Cores de Status
$success: #0fa36b;          // Verde - Empresa 2 (Experience)
$info: #3c84c7;            // Azul - Empresa 1 (Experience)
$warning: #ff9800;         // Laranja - Estados de atenção
$error: #f44336;           // Vermelho - Estados de erro
```

### 🌙 Tema Escuro (Padrão)
```scss
// Backgrounds
$bg-primary: #121212;       // Fundo principal da aplicação
$bg-secondary: #1e1e1e;     // Fundo de cards e componentes
$bg-tertiary: #2d2d2d;     // Fundo de elementos elevados

// Textos
$text-primary: #ffffff;     // Texto principal (alta legibilidade)
$text-secondary: #b3b3b3;   // Texto secundário (média legibilidade)
$text-disabled: #666666;    // Texto desabilitado (baixa legibilidade)

// Bordas e Divisores
$border-color: #333333;     // Bordas padrão
$divider-color: #444444;    // Divisores e separadores
```

### 🌅 Cores Contextuais (Experience Section)
```scss
$experience-colors: (
  1: #3c84c7,  // Porto Seguro - Azul corporativo
  2: #0fa36b,  // Thoughtworks - Verde tecnologia
  3: #800080,  // Arco Educação - Roxo educação
  4: #e95d90   // Finger Consultoria - Rosa criatividade
);
```

### ♿ Acessibilidade de Cores
Todos os pares de cores seguem WCAG 2.1 AA:
- **Texto normal**: Contraste mínimo 4.5:1
- **Texto grande**: Contraste mínimo 3:1
- **Elementos interativos**: Contraste mínimo 3:1

## 📝 Sistema de Tipografia

### 👨‍💻 Família de Fontes
```scss
$font-family-primary: 'Poppins', -apple-system, BlinkMacSystemFont, 
  'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;

$font-family-monospace: 'SF Mono', Monaco, 'Cascadia Code', 
  'Roboto Mono', Consolas, 'Courier New', monospace;
```

### 📐 Escala Tipográfica (Modular 1.333)
```scss
// Função clamp() para responsividade fluida
$typography-scale: (
  h1: clamp(1.8rem, 4vw, 3.052rem),      // ~49px desktop
  h2: clamp(1.5rem, 3.5vw, 2.441rem),   // ~39px desktop  
  h3: clamp(1.3rem, 3vw, 1.953rem),     // ~31px desktop
  h4: clamp(1.1rem, 2.5vw, 1.563rem),   // ~25px desktop
  h5: clamp(1rem, 2vw, 1.25rem),        // ~20px desktop
  h6: clamp(0.9rem, 1.8vw, 1.125rem),   // ~18px desktop
  
  body1: clamp(0.875rem, 1.5vw, 1rem),   // ~16px desktop
  body2: clamp(0.75rem, 1.2vw, 0.875rem), // ~14px desktop
  caption: clamp(0.7rem, 1vw, 0.75rem),   // ~12px desktop
  button: clamp(0.75rem, 1.2vw, 0.875rem) // ~14px desktop
);
```

### 📏 Pesos de Fonte
```scss
$font-weights: (
  light: 300,      // Textos secundários
  regular: 400,    // Texto corpo padrão
  medium: 500,     // Subtítulos, botões
  semibold: 600,   // Títulos de seção
  bold: 700,       // Títulos principais
  extrabold: 800   // Títulos hero
);
```

### 📐 Altura de Linha e Espaçamento
```scss
$line-heights: (
  tight: 1.2,      // Títulos grandes
  snug: 1.3,       // Títulos médios
  normal: 1.4,     // Títulos pequenos
  relaxed: 1.5,    // Texto corpo
  loose: 1.6       // Texto longo
);

$letter-spacings: (
  tight: -0.02em,  // Títulos grandes
  normal: 0,       // Padrão
  wide: 0.15px     // Botões, labels
);
```

## 📏 Sistema de Espaçamento

### 🔢 Escala de Espaçamento (Base 8px)
```scss
$spacing: (
  0: 0,
  1: 0.25rem,  // 4px
  2: 0.5rem,   // 8px
  3: 0.75rem,  // 12px
  4: 1rem,     // 16px
  5: 1.25rem,  // 20px
  6: 1.5rem,   // 24px
  8: 2rem,     // 32px
  10: 2.5rem,  // 40px
  12: 3rem,    // 48px
  16: 4rem,    // 64px
  20: 5rem,    // 80px
  24: 6rem     // 96px
);
```

### 📱 Espaçamento Responsivo
```scss
// Mixins para espaçamento responsivo
@mixin spacing-responsive($property, $mobile, $tablet: null, $desktop: null) {
  #{$property}: $mobile;
  
  @media (min-width: 768px) {
    #{$property}: $tablet or $mobile;
  }
  
  @media (min-width: 1024px) {
    #{$property}: $desktop or $tablet or $mobile;
  }
}

// Exemplo de uso
.component {
  @include spacing-responsive(padding, 1rem, 2rem, 3rem);
}
```

## 🔲 Sistema de Bordas e Raios

### 📐 Raios de Borda
```scss
$border-radius: (
  none: 0,
  sm: 4px,      // Elementos pequenos (chips, badges)
  md: 8px,      // Padrão (botões, inputs)
  lg: 12px,     // Cards pequenos
  xl: 16px,     // Cards grandes, sections
  2xl: 20px,    // Containers principais
  3xl: 24px,    // Elements especiais
  full: 50%,    // Elementos circulares
  pill: 9999px  // Pills, badges alongados
);
```

### 🖼️ Bordas
```scss
$border-widths: (
  0: 0,
  1: 1px,      // Padrão
  2: 2px,      // Destaque
  4: 4px       // Muito destacado
);

$border-styles: (
  solid: solid,
  dashed: dashed,
  dotted: dotted,
  none: none
);
```

## 🎭 Sistema de Sombras

### 💫 Elevação (Material Design)
```scss
$shadows: (
  none: none,
  sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05),
  md: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
  lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
  xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
  2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25),
  
  // Sombras coloridas para hover states
  primary: 0 6px 16px rgba(103, 58, 183, 0.1),
  success: 0 6px 16px rgba(15, 163, 107, 0.1),
  info: 0 6px 16px rgba(60, 132, 199, 0.1)
);
```

## 📱 Sistema de Breakpoints

### 📐 Breakpoints Material-UI (Padrão)
```scss
$breakpoints: (
  xs: 0px,      // Smartphones pequenos
  sm: 600px,    // Smartphones grandes
  md: 900px,    // Tablets
  lg: 1200px,   // Desktop
  xl: 1536px    // Desktop grandes
);
```

### 🎯 Breakpoints Customizados
```scss
$custom-breakpoints: (
  xxs: 320px,   // Dispositivos muito pequenos
  mobile: 480px, // Smartphones landscape
  tablet: 768px, // Tablets padrão
  laptop: 1024px, // Laptops pequenos
  desktop: 1440px, // Monitores padrão
  wide: 1920px   // Monitores largos
);
```

### 📱 Mixins de Media Queries
```scss
@mixin mobile-only {
  @media (max-width: 599px) { @content; }
}

@mixin tablet-up {
  @media (min-width: 600px) { @content; }
}

@mixin desktop-up {
  @media (min-width: 1200px) { @content; }
}

@mixin between($min, $max) {
  @media (min-width: $min) and (max-width: $max) { @content; }
}
```

## 🎮 Componentes e Estados

### 🔘 Estados Interativos
```scss
// Estados de botões e elementos clicáveis
$interaction-states: (
  default: (
    opacity: 1,
    transform: scale(1)
  ),
  hover: (
    opacity: 0.9,
    transform: scale(1.02)
  ),
  active: (
    opacity: 0.8,
    transform: scale(0.98)
  ),
  disabled: (
    opacity: 0.5,
    transform: none,
    cursor: not-allowed
  )
);
```

### ⏱️ Transições e Animações
```scss
$transitions: (
  fast: 0.1s ease-out,
  normal: 0.2s ease-out,
  slow: 0.3s ease-out,
  
  // Transições específicas
  button: 0.2s ease-out,
  card: 0.3s ease-out,
  modal: 0.4s ease-out
);

$easings: (
  linear: linear,
  ease: ease,
  ease-in: ease-in,
  ease-out: ease-out,
  ease-in-out: ease-in-out,
  
  // Easings personalizados
  bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55),
  smooth: cubic-bezier(0.4, 0, 0.2, 1)
);
```

## 🧩 Componentes Específicos

### 🎴 Cards
```scss
.card {
  background: $bg-secondary;
  border-radius: $border-radius-lg;
  padding: $spacing-6;
  box-shadow: $shadow-md;
  transition: $transition-card;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-lg;
  }
  
  @include mobile-only {
    padding: $spacing-4;
    border-radius: $border-radius-md;
  }
}
```

### 🔘 Botões
```scss
.button {
  font-family: $font-family-primary;
  font-weight: $font-weight-medium;
  font-size: $typography-button;
  line-height: $line-height-normal;
  letter-spacing: $letter-spacing-wide;
  
  padding: $spacing-3 $spacing-6;
  border-radius: $border-radius-md;
  min-height: 44px; // Touch target
  
  transition: $transition-button;
  cursor: pointer;
  
  &--primary {
    background: $primary;
    color: white;
    
    &:hover {
      background: $primary-dark;
    }
  }
  
  &--secondary {
    background: transparent;
    color: $primary;
    border: 1px solid $primary;
    
    &:hover {
      background: $primary;
      color: white;
    }
  }
  
  @include mobile-only {
    min-height: 48px; // Maior área de toque em mobile
    padding: $spacing-4 $spacing-8;
  }
}
```

### 📝 Inputs e Formulários
```scss
.input {
  font-family: $font-family-primary;
  font-size: 16px; // Evita zoom no iOS
  padding: $spacing-3 $spacing-4;
  border: 1px solid $border-color;
  border-radius: $border-radius-md;
  background: $bg-secondary;
  color: $text-primary;
  
  &:focus {
    outline: none;
    border-color: $primary;
    box-shadow: 0 0 0 2px rgba(103, 58, 183, 0.2);
  }
  
  &::placeholder {
    color: $text-secondary;
  }
}
```

## ♿ Diretrizes de Acessibilidade

### 🎨 Contraste de Cores
```scss
// Verificar contraste antes de usar
// Ferramentas: WebAIM, Colour Contrast Analyser

// ✅ Aprovado WCAG AA
.text-on-dark {
  color: #ffffff; // Contraste 21:1 com #121212
}

.primary-on-light {
  color: #673ab7; // Contraste 8.6:1 com #ffffff
}

// ❌ Reprovado - usar apenas decorativo
.low-contrast {
  color: #666666; // Contraste 2.8:1 com #121212
}
```

### 👆 Área de Toque
```scss
// Tamanho mínimo para elementos interativos
.interactive-element {
  min-height: 44px;
  min-width: 44px;
  
  @include mobile-only {
    min-height: 48px;
    min-width: 48px;
  }
}
```

### 🎯 Estados de Foco
```scss
.focusable {
  &:focus-visible {
    outline: 2px solid $primary;
    outline-offset: 2px;
  }
}
```

## 📊 Grid System

### 📐 Container Responsivo
```scss
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 $spacing-4;
  
  @include tablet-up {
    padding: 0 $spacing-6;
  }
  
  @include desktop-up {
    padding: 0 $spacing-8;
  }
}
```

### 🏗️ Grid Flexível
```scss
.grid {
  display: grid;
  gap: $spacing-4;
  grid-template-columns: 1fr;
  
  @include tablet-up {
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-6;
  }
  
  @include desktop-up {
    grid-template-columns: repeat(4, 1fr);
    gap: $spacing-8;
  }
}
```

## 🎨 Diretrizes de Uso

### ✅ Boas Práticas

#### Hierarquia Visual
1. **H1**: Apenas um por página (título principal)
2. **H2**: Títulos de seção principais
3. **H3**: Subtítulos de seção
4. **Body1**: Texto principal
5. **Body2**: Texto secundário/descritivo

#### Espaçamento Consistente
```scss
// Use múltiplos da escala base (8px)
.section {
  margin-bottom: $spacing-16; // 64px
  
  .title {
    margin-bottom: $spacing-6; // 24px
  }
  
  .content {
    margin-bottom: $spacing-4; // 16px
  }
}
```

#### Cores Semânticas
- **Primary**: CTAs, links importantes
- **Secondary**: Elementos de apoio
- **Success**: Confirmações, estados positivos
- **Warning**: Alertas, atenção
- **Error**: Erros, estados negativos

### ❌ Evitar

#### Inconsistências
```scss
// ❌ Não faça - valores arbitrários
.bad-spacing {
  padding: 13px 7px 19px 11px;
}

// ✅ Faça - use a escala
.good-spacing {
  padding: $spacing-3 $spacing-2 $spacing-4 $spacing-3;
}
```

#### Baixo Contraste
```scss
// ❌ Evite - baixo contraste
.poor-contrast {
  color: #888888;
  background: #666666;
}

// ✅ Use - alto contraste
.good-contrast {
  color: $text-primary;
  background: $bg-secondary;
}
```

## 🛠️ Tokens de Design

### 📋 Arquivo de Tokens (design-tokens.scss)
```scss
// Este arquivo centraliza todos os tokens
// para fácil manutenção e consistência

// Cores
@import 'tokens/colors';

// Tipografia  
@import 'tokens/typography';

// Espaçamento
@import 'tokens/spacing';

// Componentes
@import 'tokens/components';

// Responsividade
@import 'tokens/breakpoints';
```

### 🔄 Sincronização com Figma
Para manter consistência entre design e código:

1. **Design Tokens Studio** - Plugin Figma
2. **Style Dictionary** - Transformação de tokens
3. **GitHub Actions** - Sincronização automática

---

**🎨 Este design system garante consistência visual e uma excelente experiência do usuário em todos os dispositivos!**
