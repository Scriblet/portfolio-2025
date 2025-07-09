# 📊 Google Analytics - Configuração e Uso

Este projeto inclui um serviço completo de tracking com Google Analytics usando o pacote `ga-gtag`.

## 🚀 Como Configurar

### 1. Obter o Measurement ID do Google Analytics

1. Acesse [Google Analytics](https://analytics.google.com/)
2. Crie uma nova propriedade ou use uma existente
3. Vá em **Admin > Propriedade > Streams de dados**
4. Copie o **Measurement ID** (formato: `G-XXXXXXXXXX`)

### 2. Configurar no Projeto

**Opção 1: Via arquivo .env (RECOMENDADO)**

Edite o arquivo `.env` na raiz do projeto:

```env
# Google Analytics
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Outras configurações opcionais
VITE_GA_DEBUG=false
VITE_DEBUG_MODE=false
```

**Opção 2: Via arquivo de configuração**

Edite o arquivo `src/config/analytics.config.ts`:

```typescript
export const GA_CONFIG = {
  MEASUREMENT_ID: 'G-XXXXXXXXXX', // ⬅️ COLOQUE SEU ID AQUI
  ENABLED: true,
  DEBUG: false,
};
```

### 3. Configuração por Variável de Ambiente (MÉTODO ATUAL)

O sistema já está configurado para usar variáveis de ambiente. Configure no arquivo `.env`:

```env
# Obrigatório
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Opcionais para debug/desenvolvimento
VITE_GA_DEBUG=true          # Força GA em desenvolvimento  
VITE_DEBUG_MODE=true        # Ativa logs detalhados
VITE_PERFORMANCE_DEBUG=true # Debug de performance

# Configurações do site
VITE_SITE_NAME=Seu Nome - Portfolio
VITE_SITE_DESCRIPTION=Descrição do seu portfolio
VITE_BASE_URL=https://seusite.com

# Links sociais (usados no footer)
VITE_GITHUB_URL=https://github.com/seuperfil
VITE_LINKEDIN_URL=https://linkedin.com/in/seuperfil
```

**Importante:** 
- ✅ Use o arquivo `.env.example` como base
- ⚠️ Nunca commite o `.env` com dados reais
- 🔒 O `.env` já está no `.gitignore`

## 📈 Eventos Rastreados Automaticamente

### Navegação
- ✅ Cliques no footer (links de navegação)
- ✅ Cliques em links sociais (GitHub, LinkedIn)

### Seções do Portfólio
- ✅ Visualização da seção Presentation
- ✅ Hover na imagem de apresentação
- ✅ Visualização da seção Experience
- ✅ Cliques em cards de experiência
- ✅ Visualização da seção Skills
- ✅ Hover em skills
- ✅ Visualização da seção GitHub
- ✅ Cliques em repositórios

### Engajamento
- ✅ Profundidade de scroll (25%, 50%, 75%, 90%, 100%)
- ✅ Tempo na página
- ✅ Downloads de documentos
- ✅ Cliques em links externos

### Formulário de Contato
- ✅ Visualização do formulário
- ✅ Foco em campos
- ✅ Envio (sucesso/erro)

## 🛠️ Como Usar nos Componentes

### Importar o serviço:

```typescript
import { trackPortfolioEvents } from '../services/analytics';
```

### Exemplos de uso:

```typescript
// Rastrear clique em botão
const handleButtonClick = () => {
  trackPortfolioEvents.navigationClick('about');
  // ... resto da lógica
};

// Rastrear hover em elemento
const handleHover = () => {
  trackPortfolioEvents.skillHover('React');
};

// Rastrear visualização de seção (com Intersection Observer)
useEffect(() => {
  if (inView) {
    trackPortfolioEvents.experienceView();
  }
}, [inView]);
```

### Hooks Disponíveis:

```typescript
import { usePageTimeTracking, useScrollDepthTracking } from '../services/analytics';

// Em componentes principais (como App.tsx)
usePageTimeTracking(); // Rastreia tempo na página
useScrollDepthTracking(); // Rastreia profundidade de scroll
```

## 🎯 Eventos Personalizados

Você pode criar eventos personalizados usando a função `trackEvent`:

```typescript
import { trackEvent } from '../services/analytics';

// Evento personalizado
trackEvent('custom_action', 'custom_category', 'custom_label', 42);
```

## 🔍 Debug e Desenvolvimento

- Em **desenvolvimento**: eventos são logados no console mas não enviados
- Em **produção**: eventos são enviados normalmente ao Google Analytics
- Para testar: altere `ENABLED: true` no config temporariamente

## 📊 Visualizar no Google Analytics

1. Acesse Google Analytics
2. Vá em **Relatórios > Tempo real** para ver eventos em tempo real
3. Vá em **Relatórios > Eventos** para análise histórica
4. Configure **Conversões** personalizadas se necessário

## 🚨 Importante

- ⚠️ **Nunca** commite o Measurement ID real no código público
- ✅ Use variáveis de ambiente para IDs sensíveis
- ✅ Teste sempre em ambiente de desenvolvimento primeiro
- ✅ Respeite LGPD/GDPR se aplicável ao seu caso
