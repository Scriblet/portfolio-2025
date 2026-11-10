/**
 * Formulários de contato (PRD cypress-formularios-contato).
 *
 * A function do Netlify é interceptada: a suíte valida o contrato do
 * front-end (payload, estados, feedback e honeypot) sem enviar mensagem real.
 */
describe('formulário de contato da home', () => {
  beforeEach(() => {
    cy.visitApp('/')
    cy.waitForSection('contact-section')
    cy.get('[data-testid="contact-section"]').scrollIntoView()
  })

  it('valida os campos obrigatórios sem fazer request', () => {
    cy.interceptContact()

    cy.get('[data-testid="contact-section"]').contains('button', 'Enviar mensagem').click()

    cy.contains('Informe seu nome.').should('be.visible')
    cy.contains('Informe seu email.').should('be.visible')
    cy.contains('Escreva sua mensagem.').should('be.visible')

    cy.get('@postContact.all').should('have.length', 0)
  })

  it('rejeita um e-mail com formato inválido', () => {
    cy.get('#contact-nome').type('Lucas Nonato')
    cy.get('#contact-email').type('lucas@invalido')
    cy.get('#contact-message').type('Olá, tudo bem?')
    cy.get('[data-testid="contact-section"]').contains('button', 'Enviar mensagem').click()

    cy.contains('Informe um email válido.').should('be.visible')
  })

  it('envia o payload e confirma o sucesso', () => {
    cy.interceptContact()

    cy.get('#contact-nome').type('Lucas Nonato')
    cy.get('#contact-email').type('lucas.nonato1@hotmail.com')
    cy.get('#contact-message').type('Mensagem de teste do Cypress.')
    cy.get('[data-testid="contact-section"]').contains('button', 'Enviar mensagem').click()

    cy.wait('@postContact').its('request.body').should('deep.include', {
      name: 'Lucas Nonato',
      email: 'lucas.nonato1@hotmail.com',
      message: 'Mensagem de teste do Cypress.',
      website: '',
    })

    cy.get('[data-testid="snackbar-success"]').should('contain.text', 'Mensagem enviada')
    cy.get('#contact-nome').should('have.value', '')
    cy.get('#contact-email').should('have.value', '')
    cy.get('#contact-message').should('have.value', '')
  })

  it('mostra erro quando o servidor falha', () => {
    cy.interceptContact({ statusCode: 500, body: { ok: false } })

    cy.get('#contact-nome').type('Lucas Nonato')
    cy.get('#contact-email').type('lucas.nonato1@hotmail.com')
    cy.get('#contact-message').type('Mensagem de teste do Cypress.')
    cy.get('[data-testid="contact-section"]').contains('button', 'Enviar mensagem').click()

    cy.wait('@postContact')
    cy.get('[data-testid="snackbar-error"]').should(
      'contain.text',
      'Não foi possível enviar',
    )
  })

  it('avisa sobre limite de tentativas (429)', () => {
    cy.interceptContact({ statusCode: 429, body: { ok: false, error: 'rate_limited' } })

    cy.get('#contact-nome').type('Lucas Nonato')
    cy.get('#contact-email').type('lucas.nonato1@hotmail.com')
    cy.get('#contact-message').type('Mensagem de teste do Cypress.')
    cy.get('[data-testid="contact-section"]').contains('button', 'Enviar mensagem').click()

    cy.wait('@postContact')
    cy.get('[data-testid="snackbar-warning"]').should(
      'contain.text',
      'Muitas tentativas',
    )
  })

  it('avisa quando o usuário está offline', () => {
    cy.interceptContact()

    cy.window().then((win) => {
      Object.defineProperty(win.navigator, 'onLine', {
        configurable: true,
        get: () => false,
      })
    })

    cy.get('#contact-nome').type('Lucas Nonato')
    cy.get('#contact-email').type('lucas.nonato1@hotmail.com')
    cy.get('#contact-message').type('Mensagem de teste do Cypress.')
    cy.get('[data-testid="contact-section"]').contains('button', 'Enviar mensagem').click()

    cy.get('[data-testid="snackbar-warning"]').should('contain.text', 'Você está offline')
    cy.get('@postContact.all').should('have.length', 0)
  })

  it('encaminha o honeypot para descarte no servidor', () => {
    cy.interceptContact()

    cy.get('#contact-website').type('bot-qualquer', { force: true })
    cy.get('#contact-nome').type('Lucas Nonato')
    cy.get('#contact-email').type('lucas.nonato1@hotmail.com')
    cy.get('#contact-message').type('Mensagem de teste do Cypress.')
    cy.get('[data-testid="contact-section"]').contains('button', 'Enviar mensagem').click()

    cy.wait('@postContact')
      .its('request.body.website')
      .should('eq', 'bot-qualquer')
  })
})

describe('formulário de contato da prévia imersiva', () => {
  beforeEach(() => {
    cy.visitApp('/immersive')
    cy.get('[data-testid="immersive-page"]').should('be.visible')
  })

  it('valida os campos e envia pela mesma function', () => {
    cy.get('#immersive-contact-form').scrollIntoView()

    cy.get('#immersive-contact-form').contains('button', 'Enviar mensagem').click()
    cy.contains('Informe seu nome.').should('be.visible')
    cy.contains('Informe um email válido.').should('not.exist')

    cy.interceptContact()

    cy.get('#immersive-nome').type('Lucas Nonato')
    cy.get('#immersive-email').type('lucas.nonato1@hotmail.com')
    cy.get('#immersive-message').type('Mensagem de teste do Cypress.')
    cy.get('#immersive-contact-form').contains('button', 'Enviar mensagem').click()

    cy.wait('@postContact').its('request.url').should('include', '/api/contact')
    cy.contains('Mensagem enviada. Responderei em breve.').should('be.visible')
    cy.get('#immersive-nome').should('have.value', '')
  })
})
