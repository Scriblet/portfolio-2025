/// <reference types="cypress" />

/**
 * Tipos globais dos comandos customizados (ver cypress/support/commands.ts).
 */
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Visita a app respeitando o baseUrl (inclusive base path do GitHub Pages),
       * limpa o localStorage e aplica o stub de prefers-reduced-motion.
       */
      visitApp(path?: string): Chainable<void>

      /**
       * Reseta a preferência de tema. Sem argumento remove a chave; com
       * 'light'/'dark' grava o valor em localStorage. Recarregue para aplicar.
       */
      resetTheme(mode?: 'light' | 'dark'): Chainable<void>

      /** Liga prefers-reduced-motion: reduce nas próximas visitas. */
      enableReducedMotion(): Chainable<void>

      /** Desliga o stub de reduced motion (movimento normal). */
      disableReducedMotion(): Chainable<void>

      /**
       * Intercepta POST /api/contact com o status/corpo informados e expõe
       * o alias `@postContact`. Nunca deixa o POST real escapar.
       */
      interceptContact(response?: {
        statusCode?: number
        body?: unknown
        delay?: number
      }): Chainable<void>

      /**
       * Aguarda a seção lazy terminar de carregar (sem section-fallback) e
       * o elemento final ficar visível.
       */
      waitForSection(testId: string): Chainable<void>

      /**
       * Garante service worker ativo controlando a página. Só funciona no
       * build/preview; falha com mensagem clara no dev server.
       */
      requireServiceWorker(): Chainable<void>
    }
  }
}

export {}
