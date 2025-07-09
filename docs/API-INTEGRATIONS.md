# 📚 Documentação de API e Integrações - Portfolio 2025

## 🎯 Visão Geral
Este documento detalha todas as integrações externas, APIs utilizadas e configurações de terceiros no projeto Portfolio 2025.

## 📬 Integração Discord Webhook

### 🔗 Configuração
O formulário de contato utiliza Discord Webhook para receber notificações de mensagens.

#### 🔧 Setup do Webhook
```typescript
// src/pages/formContact/contactForm.tsx
const DISCORD_WEBHOOK: string = process.env.VITE_DISCORD_WEBHOOK_URL || 
  "https://discord.com/api/webhooks/ID/TOKEN";
```

#### 📝 Estrutura da Mensagem
```typescript
interface DiscordMessage {
  content: string;
  embeds: DiscordEmbed[];
}

interface DiscordEmbed {
  title: string;
  fields: DiscordField[];
  color: number;
  timestamp?: string;
}

interface DiscordField {
  name: string;
  value: string;
  inline?: boolean;
}
```

#### 📨 Implementação do Envio
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    const discordMessage = {
      content: "📬 <@197222374133727232> **Nova mensagem do formulário de contato!**",
      embeds: [
        {
          title: "Detalhes do Contato",
          fields: [
            { name: "👤 Nome", value: nome || "Não informado" },
            { name: "✉️ Email", value: email || "Não informado" },
            { name: "💬 Mensagem", value: message || "Não informada" },
          ],
          color: 5814783, // Cor roxa (#673ab7)
          timestamp: new Date().toISOString()
        },
      ],
    };

    const response = await fetch(DISCORD_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordMessage),
    });

    if (response.ok) {
      setStatus({
        type: "success",
        message: "✅ Mensagem enviada com sucesso!",
      });
      // Limpar formulário
      setNome("");
      setEmail("");
      setMessage("");
    } else {
      throw new Error("Falha ao enviar mensagem");
    }
  } catch (error) {
    setStatus({
      type: "error",
      message: "❌ Erro ao enviar mensagem. Tente novamente mais tarde.",
    });
    console.error("Erro ao enviar para Discord:", error);
  } finally {
    setIsSubmitting(false);
  }
};
```

### 🛡️ Segurança e Rate Limiting

#### ⚠️ Rate Limits Discord
- **Global**: 50 requisições por segundo
- **Per-webhook**: 30 requisições por minuto
- **Message size**: Máximo 2000 caracteres no content

#### 🔒 Proteções Implementadas
```typescript
// Debounce para evitar spam
const [isSubmitting, setIsSubmitting] = useState(false);

// Validação básica
const validateForm = () => {
  if (!nome.trim()) return "Nome é obrigatório";
  if (!email.trim()) return "Email é obrigatório";
  if (!message.trim()) return "Mensagem é obrigatória";
  if (!/^\S+@\S+\.\S+$/.test(email)) return "Email inválido";
  return null;
};

// Sanitização de conteúdo
const sanitizeInput = (input: string) => {
  return input
    .replace(/[<>]/g, '') // Remove HTML tags
    .trim()
    .substring(0, 500); // Limita tamanho
};
```

### 🔄 Alternativas de Implementação

#### 📧 EmailJS (Alternativa)
```typescript
// Instalação: npm install @emailjs/browser

import emailjs from '@emailjs/browser';

const sendEmail = async (formData: FormData) => {
  try {
    await emailjs.sendForm(
      'service_id',
      'template_id',
      formRef.current,
      'public_key'
    );
    setStatus({ type: 'success', message: 'Email enviado!' });
  } catch (error) {
    setStatus({ type: 'error', message: 'Erro ao enviar email' });
  }
};
```

#### 🔗 Netlify Forms (Alternativa)
```html
<!-- Adicionar ao formulário -->
<form name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact" />
  <!-- Campos do formulário -->
</form>
```

## 🎭 Integração Framer Motion

### 📦 Configuração Base
```typescript
// src/main.tsx - Configuração global
import { LazyMotion, domAnimation } from "framer-motion";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <LazyMotion features={domAnimation}>
    <App />
  </LazyMotion>
);
```

### 🎨 Variants Personalizadas
```typescript
// src/utils/animations.ts
export const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const slideInLeft = {
  hidden: { 
    opacity: 0, 
    x: -60 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};
```

### 🔍 Intersection Observer
```typescript
// Configuração para animações baseadas em scroll
import { useInView } from "react-intersection-observer";

const ExampleComponent = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,    // Animar apenas uma vez
    threshold: 0.2,       // 20% do elemento visível
    rootMargin: "-100px"  // Offset para trigger
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInUp}
    >
      Conteúdo
    </motion.div>
  );
};
```

## 🎨 Integração Material-UI

### 🎭 Theme Provider
```typescript
// src/theme.ts - Configuração completa
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const baseTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#673ab7' },
    secondary: { main: '#800080' },
    background: {
      default: '#121212',
      paper: '#1e1e1e'
    }
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h1: {
      fontSize: "clamp(1.8rem, 4vw, 3.052rem)",
      fontWeight: 700
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  }
});

export default responsiveFontSizes(baseTheme);
```

### 🎨 Custom Components
```typescript
// Estendendo componentes MUI
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

export const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: 8,
  textTransform: 'none',
  fontWeight: 500,
  minHeight: 44,
  
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[8]
  },
  
  [theme.breakpoints.down('sm')]: {
    minHeight: 48,
    fontSize: '0.875rem'
  }
}));
```

## 📝 Integração React Scroll

### 🧭 Navegação Suave
```typescript
// src/pages/header.tsx
import { Link as ScrollLink, scroller } from "react-scroll";

// Componente de link
<ScrollLink
  to="section-id"
  smooth={true}
  duration={500}
  offset={-80}
  spy={true}
  activeClass="active"
>
  Link Text
</ScrollLink>

// Scroll programático
const handleScrollTo = (targetId: string) => {
  scroller.scrollTo(targetId, {
    duration: 800,
    delay: 0,
    smooth: "easeInOutQuart",
    offset: -80
  });
};
```

### ⚙️ Configurações Avançadas
```typescript
// Configuração global de scroll
import { animateScroll as scroll } from "react-scroll";

// Scroll para o topo
const scrollToTop = () => {
  scroll.scrollToTop({
    duration: 500,
    smooth: "easeInOutQuart"
  });
};

// Scroll por pixel
const scrollToPosition = (position: number) => {
  scroll.scrollTo(position, {
    duration: 800,
    smooth: true
  });
};
```

## 🖼️ Gerenciamento de Assets

### 📁 Estrutura de Imagens
```
src/img/
├── github-logo.svg              # Logo GitHub (otimizado)
├── multiracial-hands-coming-together.jpg  # Imagem filosofia
└── presetation.jpg             # Foto apresentação
```

### 🎯 Otimização de Imagens
```typescript
// Lazy loading nativo
<img
  src="/img/example.jpg"
  alt="Descrição acessível"
  loading="lazy"
  width="300"
  height="200"
/>

// Imagens responsivas
<picture>
  <source
    media="(max-width: 768px)"
    srcSet="/img/mobile.jpg"
  />
  <source
    media="(max-width: 1200px)"
    srcSet="/img/tablet.jpg"
  />
  <img
    src="/img/desktop.jpg"
    alt="Imagem responsiva"
  />
</picture>
```

### 📦 Imports de Assets
```typescript
// Import estático (bundling)
import logoGithub from '../img/github-logo.svg';

// Import dinâmico (lazy)
const loadImage = async (imageName: string) => {
  const module = await import(`../img/${imageName}`);
  return module.default;
};

// Uso em componentes
<CardMedia
  component="img"
  image={logoGithub}
  alt="Logo GitHub"
  sx={{ maxWidth: '100%' }}
/>
```

## 🌐 Links e Navegação Externa

### 🔗 Links Seguros
```typescript
// Template para links externos seguros
const ExternalLink: React.FC<{
  href: string;
  children: React.ReactNode;
}> = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Link externo para ${href}`}
  >
    {children}
  </a>
);

// Uso nos componentes
<ExternalLink href="https://github.com/scriblet">
  GitHub Profile
</ExternalLink>
```

### 📱 Deep Links para Apps
```typescript
// Links para aplicativos móveis
const socialLinks = {
  linkedin: {
    web: 'https://www.linkedin.com/in/lucas-nonato1/',
    mobile: 'linkedin://profile/lucas-nonato1'
  },
  github: {
    web: 'https://github.com/scriblet',
    mobile: 'github://user/scriblet'
  }
};

// Detectar se é mobile e usar deep link apropriado
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const linkUrl = isMobile ? socialLinks.linkedin.mobile : socialLinks.linkedin.web;
```

## 📊 Analytics e Tracking

### 📈 Google Analytics 4
```typescript
// src/utils/analytics.ts
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const initGA = (measurementId: string) => {
  // Carregar script do GA4
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Configurar gtag
  window.gtag = window.gtag || function() {
    (window.gtag as any).dataLayer = (window.gtag as any).dataLayer || [];
    (window.gtag as any).dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId);
};

// Eventos customizados
export const trackEvent = (eventName: string, parameters?: object) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, parameters);
  }
};

// Uso nos componentes
const handleFormSubmit = () => {
  trackEvent('form_submit', {
    form_name: 'contact_form',
    page_location: window.location.href
  });
};
```

### 🔍 Hotjar Integration
```typescript
// src/utils/hotjar.ts
export const initHotjar = (hjid: number, hjsv: number) => {
  (function(h: any, o: any, t: any, j: any, a?: any, r?: any) {
    h.hj = h.hj || function() {
      (h.hj.q = h.hj.q || []).push(arguments);
    };
    h._hjSettings = { hjid: hjid, hjsv: hjsv };
    a = o.getElementsByTagName('head')[0];
    r = o.createElement('script');
    r.async = 1;
    r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
    a.appendChild(r);
  })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
};
```

## 🔒 Variáveis de Ambiente

### 📝 Configuração (.env)
```bash
# .env.example
VITE_DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/ID/TOKEN
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_HOTJAR_ID=1234567
VITE_API_BASE_URL=https://api.exemplo.com
VITE_ENVIRONMENT=development
```

### 🔧 Uso nas Aplicações
```typescript
// src/config/env.ts
interface EnvConfig {
  discordWebhook: string;
  gaMeasurementId: string;
  hotjarId: string;
  apiBaseUrl: string;
  environment: 'development' | 'staging' | 'production';
}

export const env: EnvConfig = {
  discordWebhook: import.meta.env.VITE_DISCORD_WEBHOOK_URL || '',
  gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID || '',
  hotjarId: import.meta.env.VITE_HOTJAR_ID || '',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '',
  environment: import.meta.env.VITE_ENVIRONMENT || 'development',
};

// Validação de ambiente
export const validateEnv = () => {
  const requiredVars = ['discordWebhook'];
  
  for (const varName of requiredVars) {
    if (!env[varName as keyof EnvConfig]) {
      console.warn(`Missing environment variable: VITE_${varName.toUpperCase()}`);
    }
  }
};
```

## 🛠️ Utilitários e Helpers

### 🔧 API Client
```typescript
// src/utils/apiClient.ts
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}

export const apiClient = new ApiClient(env.apiBaseUrl);
```

### 🔄 Error Handling
```typescript
// src/utils/errorHandler.ts
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const handleApiError = (error: unknown): string => {
  if (error instanceof AppError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Ocorreu um erro inesperado';
};

// Uso nos componentes
try {
  await apiCall();
} catch (error) {
  const errorMessage = handleApiError(error);
  setStatus({ type: 'error', message: errorMessage });
}
```

---

**🔗 Esta documentação garante que todas as integrações funcionem corretamente e de forma segura!**
