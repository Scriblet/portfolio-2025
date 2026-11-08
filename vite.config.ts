import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  // GitHub Pages serves the site under /portfolio-2025/. The deploy workflow
  // sets VITE_BASE_PATH; local dev and other hosts keep "/".
  base: process.env.VITE_BASE_PATH || "/",
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      manifest: {
        name: 'Lucas Nonato — Portfólio',
        short_name: 'Lucas Nonato',
        description:
          'Portfólio de Lucas Nonato, desenvolvedor full-stack e consultor de IA.',
        lang: 'pt-BR',
        dir: 'ltr',
        // Relativo ao manifest: funciona tanto em "/" quanto em
        // "/portfolio-2025/" sem duplicar configuração por ambiente.
        start_url: '.',
        scope: '.',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#090b0d',
        theme_color: '#090b0d',
        categories: ['portfolio', 'developer', 'technology'],
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // Shell da SPA + assets versionados pelo Vite. O CV em PDF também
        // fica disponível offline depois da primeira visita.
        globPatterns: [
          '**/*.{js,css,html,svg,png,jpg,jpeg,webp,woff,woff2,pdf}',
        ],
        navigateFallback: 'index.html',
        navigateFallbackDenylist: [/\/api\//],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            // Imagens remotas (por exemplo, capas externas) em cache-first.
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },
      devOptions: {
        // O worker só é gerado no build; evita cache preso durante o HMR.
        enabled: false,
      },
    }),
  ],
  server: {
    watch: {
      // PDFs are static assets that may be locked by a PDF viewer on Windows.
      // Watching them makes Vite crash with EBUSY.
      ignored: ["**/*.pdf", "**/screenshots/**"],
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Separa o vendor do código do app: o bundle inicial fica só com o
        // necessário para a dobra (Presentation + Header) e as seções viram
        // chunks próprios via React.lazy.
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          mui: [
            "@mui/material",
            "@mui/icons-material",
            "@emotion/react",
            "@emotion/styled",
          ],
          motion: ["framer-motion"],
        },
      },
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase'
    },
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "sass:list";
          @use "sass:map";
          @use "sass:math";
          @use "sass:meta";
          @use "sass:string";
          // Outros módulos Sass que você usa
        `
      }
    }
  }
})