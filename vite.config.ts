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