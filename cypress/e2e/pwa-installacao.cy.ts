/**
 * InstallButton (PRD cypress-pwa-offline).
 *
 * O navegador só dispara `beforeinstallprompt` em contexto instalável; aqui o
 * evento é sintético, com prompt/userChoice stubados. Nenhum estado vaza entre
 * testes porque cada um faz uma visita nova.
 */
type PromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

const isPreview = () =>
  String(Cypress.config('baseUrl') ?? '').includes(':4173')

const standaloneMatchMedia = (win: Window) => {
  const original = win.matchMedia?.bind(win)

  win.matchMedia = ((query: string): MediaQueryList => {
    if (query.includes('display-mode: standalone')) {
      return {
        matches: true,
        media: query,
        onchange: null,
        addListener: () => undefined,
        removeListener: () => undefined,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        dispatchEvent: () => false,
      } as unknown as MediaQueryList
    }

    return original
      ? original(query)
      : ({
          matches: false,
          media: query,
          onchange: null,
          addListener: () => undefined,
          removeListener: () => undefined,
          addEventListener: () => undefined,
          removeEventListener: () => undefined,
          dispatchEvent: () => false,
        } as unknown as MediaQueryList)
  }) as typeof win.matchMedia
}

describe('PWA: instalação', () => {
  before(function () {
    if (!isPreview()) this.skip()
  })

  it('não mostra o botão sem beforeinstallprompt', () => {
    cy.visitApp('/')
    cy.get('[data-testid="install-button"]').should('not.exist')
  })

  it('mostra o botão após o evento e chama o prompt ao clicar', () => {
    cy.visitApp('/')
    cy.get('[data-testid="presentation-section"]').should('be.visible')

    let promptCalls = 0

    cy.window().then((win) => {
      const prompt = () => {
        promptCalls += 1
        return Promise.resolve()
      }
      const event = new win.Event('beforeinstallprompt') as PromptEvent

      Object.assign(event, {
        prompt,
        userChoice: Promise.resolve({
          outcome: 'accepted',
          platform: 'web',
        }),
      })

      win.dispatchEvent(event)
    })

    cy.get('[data-testid="install-button"]')
      .should('be.visible')
      .and('have.attr', 'aria-label', 'Instalar o portfólio')
      .click()

    cy.then(() => {
      expect(promptCalls, 'prompt nativo chamado').to.eq(1)
    })
    // Após a escolha o prompt é consumido e o botão sai de cena.
    cy.get('[data-testid="install-button"]').should('not.exist')
  })

  it('não mostra o botão quando o app já está em modo standalone', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        standaloneMatchMedia(win)
      },
    })
    cy.get('[data-testid="presentation-section"]').should('be.visible')

    cy.window().then((win) => {
      const event = new win.Event('beforeinstallprompt') as PromptEvent
      Object.assign(event, {
        prompt: cy.stub().resolves(),
        userChoice: Promise.resolve({
          outcome: 'dismissed',
          platform: 'web',
        }),
      })
      win.dispatchEvent(event)
    })

    cy.get('[data-testid="install-button"]').should('not.exist')
  })
})

export {}
