/// <reference types="cypress" />

export const COLOR_MODE_STORAGE_KEY = 'portfolio-color-mode'

/**
 * Estado do stub de prefers-reduced-motion. Ligado por padrão: neutraliza
 * reveals e transições, deixando a suíte estável. Specs de movimento podem
 * chamar `cy.disableReducedMotion()` antes de visitar.
 */
let reducedMotionEnabled = true

/** Resolve um path relativo contra o baseUrl (com suporte a base path). */
function resolveAppUrl(path: string): string {
  const baseUrl = (Cypress.config('baseUrl') as string) || 'http://localhost:5174'
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
  return new URL(path.replace(/^\/+/, ''), normalizedBase).toString()
}

/** Instala um matchMedia determinístico para prefers-reduced-motion. */
function stubMatchMedia(win: Window): void {
  const original = win.matchMedia?.bind(win)

  win.matchMedia = ((query: string): MediaQueryList => {
    if (query.includes('prefers-reduced-motion')) {
      return {
        matches: reducedMotionEnabled,
        media: query,
        onchange: null,
        addListener: () => undefined,
        removeListener: () => undefined,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        dispatchEvent: () => false,
      } as unknown as MediaQueryList
    }

    if (original) return original(query)

    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    } as unknown as MediaQueryList
  }) as typeof win.matchMedia
}

Cypress.Commands.add('visitApp', (path = '/') => {
  cy.visit(resolveAppUrl(path), {
    onBeforeLoad(win) {
      win.localStorage.clear()
      stubMatchMedia(win)
    },
  })
})

Cypress.Commands.add('resetTheme', (mode?: 'light' | 'dark') => {
  cy.window().then((win) => {
    if (mode) {
      win.localStorage.setItem(COLOR_MODE_STORAGE_KEY, mode)
    } else {
      win.localStorage.removeItem(COLOR_MODE_STORAGE_KEY)
    }
  })
})

Cypress.Commands.add('enableReducedMotion', () => {
  reducedMotionEnabled = true
})

Cypress.Commands.add('disableReducedMotion', () => {
  reducedMotionEnabled = false
})

Cypress.Commands.add('interceptContact', (response = {}) => {
  const { statusCode = 200, body = { ok: true }, delay } = response

  cy.intercept('POST', '**/api/contact', {
    statusCode,
    body,
    ...(delay ? { delay } : {}),
  }).as('postContact')
})

Cypress.Commands.add('waitForSection', (testId: string) => {
  cy.get('[data-testid="section-fallback"]').should('not.exist')
  cy.get(`[data-testid="${testId}"]`).should('be.visible')
})

/**
 * Garante que o service worker está ativo e controlando a página.
 *
 * Só existe no build de produção: specs de PWA precisam rodar contra o
 * preview (4173). Se não houver SW, falha com mensagem explícita em vez de
 * dar falso positivo.
 */
Cypress.Commands.add('requireServiceWorker', () => {
  cy.window({ log: false }).then((win) => {
    if (!('serviceWorker' in win.navigator)) {
      throw new Error(
        'Service worker indisponível: rode os specs de PWA contra build/preview (npm run test:e2e:preview).',
      )
    }

    return win.navigator.serviceWorker.ready.then((registration) => {
      if (!registration.active) {
        throw new Error('Service worker registrado, mas sem worker ativo.')
      }

      if (win.navigator.serviceWorker.controller) return undefined

      return new Cypress.Promise<void>((resolve, reject) => {
        const timeout = win.setTimeout(() => {
          reject(new Error('Service worker não assumiu o controle da página.'))
        }, 10000)

        win.navigator.serviceWorker.addEventListener(
          'controllerchange',
          () => {
            win.clearTimeout(timeout)
            resolve()
          },
          { once: true },
        )
      })
    })
  })
})
