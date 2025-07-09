# 🚀 Guia de Deploy - Portfolio 2025

## 🎯 Visão Geral
Este guia fornece instruções detalhadas para fazer deploy da aplicação Portfolio 2025 em diferentes plataformas de hospedagem.

## 📋 Pré-requisitos

### ✅ Checklist Antes do Deploy
- [ ] Build local funcionando (`npm run build`)
- [ ] Testes de responsividade realizados
- [ ] Otimização de imagens concluída
- [ ] Variáveis de ambiente configuradas
- [ ] Performance verificada (Lighthouse 90+)
- [ ] SEO básico implementado
- [ ] Acessibilidade validada

### 🔧 Configurações Necessárias
```bash
# Verificar se o build está funcionando
npm run build
npm run preview

# Verificar tamanho do bundle
npm run build -- --analyze
```

## 🌐 Deploy no Netlify (Recomendado)

### 🚀 Deploy Automático via Git

#### 1. Preparação do Repositório
```bash
# Adicionar arquivo de configuração
touch netlify.toml
```

#### 2. Configuração (netlify.toml)
```toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"
  NPM_VERSION = "8"

# Redirects para SPA
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Headers de cache
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# Headers de segurança
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

# Configuração de formulários (se usando Netlify Forms)
[build.processing]
  skip_processing = false
[build.processing.css]
  bundle = true
  minify = true
[build.processing.js]
  bundle = true
  minify = true
[build.processing.html]
  pretty_urls = true
```

#### 3. Deploy via Dashboard
1. Acesse [netlify.com](https://netlify.com)
2. Clique em "New site from Git"
3. Conecte seu repositório GitHub
4. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `18`

#### 4. Deploy via CLI
```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Inicializar projeto
netlify init

# Deploy manual
netlify deploy --prod
```

### 🔧 Configurações Avançadas Netlify

#### Variables de Ambiente
```bash
# Via CLI
netlify env:set VITE_API_URL "https://api.exemplo.com"
netlify env:set VITE_DISCORD_WEBHOOK "sua_webhook_url"

# Via Dashboard: Site settings → Environment variables
```

#### Functions (Serverless)
```javascript
// netlify/functions/contact.js
exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { name, email, message } = JSON.parse(event.body);
  
  // Lógica de envio de email
  
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Email enviado com sucesso!' })
  };
};
```

## ▲ Deploy no Vercel

### 🚀 Deploy Automático

#### 1. Configuração (vercel.json)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

#### 2. Deploy via CLI
```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy para produção
vercel --prod
```

#### 3. Deploy via Git
1. Acesse [vercel.com](https://vercel.com)
2. Conecte repositório GitHub
3. Configuração automática para Vite

### 🔧 Configurações Avançadas Vercel

#### Variables de Ambiente
```bash
# Via CLI
vercel env add VITE_API_URL production

# Via Dashboard: Project Settings → Environment Variables
```

#### Edge Functions
```javascript
// api/contact.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;
  
  // Lógica de processamento
  
  res.status(200).json({ message: 'Success' });
}
```

## 🐙 Deploy no GitHub Pages

### 🚀 Deploy via GitHub Actions

#### 1. Configuração (.github/workflows/deploy.yml)
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Setup Pages
        uses: actions/configure-pages@v3
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

#### 2. Configuração do Repositório
1. Settings → Pages
2. Source: "GitHub Actions"
3. Configure custom domain (opcional)

#### 3. Ajustes para GitHub Pages
```typescript
// vite.config.ts - adicionar base path
export default defineConfig({
  plugins: [react()],
  base: '/nome-do-repositorio/', // Para repo não organizacional
  // base: '/', // Para repo organizacional (username.github.io)
})
```

## 🔥 Deploy no Firebase Hosting

### 🚀 Configuração Firebase

#### 1. Instalação e Setup
```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Inicializar projeto
firebase init hosting
```

#### 2. Configuração (firebase.json)
```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "/assets/**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      }
    ]
  }
}
```

#### 3. Scripts de Deploy
```json
// package.json
{
  "scripts": {
    "deploy": "npm run build && firebase deploy",
    "deploy:preview": "npm run build && firebase hosting:channel:deploy preview"
  }
}
```

## 🐳 Deploy com Docker

### 📦 Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copiar arquivos built
COPY --from=build /app/dist /usr/share/nginx/html

# Configuração nginx
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### ⚙️ Configuração Nginx (nginx.conf)
```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        # Gzip compression
        gzip on;
        gzip_types text/plain text/css application/json application/javascript;

        # Cache static assets
        location /assets/ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # SPA routing
        location / {
            try_files $uri $uri/ /index.html;
        }

        # Security headers
        add_header X-Frame-Options "DENY";
        add_header X-Content-Type-Options "nosniff";
        add_header X-XSS-Protection "1; mode=block";
    }
}
```

### 🚀 Deploy com Docker
```bash
# Build
docker build -t portfolio-2025 .

# Run local
docker run -p 3000:80 portfolio-2025

# Deploy para Docker Hub
docker tag portfolio-2025 username/portfolio-2025
docker push username/portfolio-2025
```

## ☁️ Deploy na AWS S3 + CloudFront

### 📦 Configuração S3

#### 1. Script de Deploy
```bash
#!/bin/bash
# deploy-aws.sh

# Build da aplicação
npm run build

# Sync com S3
aws s3 sync dist/ s3://seu-bucket-name --delete

# Invalidar CloudFront
aws cloudfront create-invalidation \
  --distribution-id SEU_DISTRIBUTION_ID \
  --paths "/*"
```

#### 2. Configuração CloudFront
```json
{
  "DefaultRootObject": "index.html",
  "CustomErrorResponses": [
    {
      "ErrorCode": 404,
      "ResponseCode": 200,
      "ResponsePagePath": "/index.html"
    }
  ],
  "CacheBehaviors": [
    {
      "PathPattern": "/assets/*",
      "TargetOriginId": "S3Origin",
      "ViewerProtocolPolicy": "https-only",
      "CachePolicyId": "CACHE_OPTIMIZED"
    }
  ]
}
```

## 🔧 Otimizações de Performance

### ⚡ Build Otimizado
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@mui/material', '@emotion/react'],
          animations: ['framer-motion']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
```

### 🖼️ Otimização de Imagens
```bash
# Instalar imagemin
npm install --save-dev imagemin imagemin-mozjpeg imagemin-pngquant

# Script de otimização
node scripts/optimize-images.js
```

### 📊 Análise de Bundle
```bash
# Analisar bundle
npm run build -- --analyze

# Bundle analyzer
npx vite-bundle-analyzer dist
```

## 🔒 Configurações de Segurança

### 🛡️ Headers de Segurança
```javascript
// Para todas as plataformas - adicionar headers
const securityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
};
```

### 🔐 HTTPS e SSL
```nginx
# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name exemplo.com;
    return 301 https://$server_name$request_uri;
}

# HTTPS server
server {
    listen 443 ssl http2;
    server_name exemplo.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
}
```

## 📊 Monitoramento e Analytics

### 📈 Google Analytics
```typescript
// src/analytics.ts
import { gtag } from 'ga-gtag';

export const initAnalytics = () => {
  gtag('config', 'GA_MEASUREMENT_ID', {
    page_title: 'Portfolio Lucas Nonato',
    page_location: window.location.href
  });
};
```

### 🔍 Performance Monitoring
```typescript
// src/performance.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

// Enviar métricas para analytics
getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## 🐛 Troubleshooting

### ❌ Problemas Comuns

#### Build Falha
```bash
# Limpar cache e rebuildar
rm -rf node_modules package-lock.json dist
npm install
npm run build
```

#### Rotas 404 em SPA
```nginx
# Nginx - redirecionar todas as rotas para index.html
location / {
    try_files $uri $uri/ /index.html;
}
```

#### Variáveis de Ambiente Não Carregam
```bash
# Verificar prefixo VITE_
VITE_API_URL=https://api.exemplo.com

# Verificar se está sendo usado corretamente
console.log(import.meta.env.VITE_API_URL);
```

### 🔧 Scripts de Automação

#### Deploy Script Completo
```bash
#!/bin/bash
# deploy.sh

echo "🚀 Iniciando deploy..."

# Verificar se está na branch main
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" != "main" ]; then
  echo "❌ Deploy deve ser feito a partir da branch main"
  exit 1
fi

# Verificar se há mudanças não commitadas
if [ -n "$(git status --porcelain)" ]; then
  echo "❌ Há mudanças não commitadas"
  exit 1
fi

# Build e testes
echo "📦 Fazendo build..."
npm run build

echo "🧪 Executando testes..."
npm run lint

# Deploy
echo "🌐 Fazendo deploy..."
netlify deploy --prod

echo "✅ Deploy concluído com sucesso!"
```

---

**🚀 Sua aplicação agora está pronta para ser acessada globalmente com alta performance e segurança!**
