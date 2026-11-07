import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages serves the site under /portfolio-2025/. The deploy workflow
  // sets VITE_BASE_PATH; local dev and other hosts keep "/".
  base: process.env.VITE_BASE_PATH || "/",
  plugins: [react()],
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