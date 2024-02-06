context('Querying', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/querying')
  })

  it('cy.get() - querying DOM elements', () => {
    cy.get('#query-btn').should('contain', 'Button')
    cy.get('.query-btn').should('contain', 'Button')
    cy.get('#querying .well>button:first').should('contain', 'Button')

    cy.get('[data-test-id="test-example"]').should('have.class', 'example')

    cy.get('[data-test-id="test-example"]')
      .invoke('attr', 'data-test-id')
      .should('equal', 'test-example')

    cy.get('[data-test-id="test-example"]')
      .invoke('css', 'position')
      .should('equal', 'static')

    cy.get('[data-test-id="test-example"]')
      .should('have.attr', 'data-test-id', 'test-example')
      .and('have.css', 'position', 'static')
  })

  it('.cy.contains() - query a DOM elements with matching content', () => {
    cy.get('.query-list')
      .contains('bananas')
      .should('have.class', 'third')

    cy.get('.query-list')
      .contains(/^b\w+/)
      .should('have.class', 'third')

    cy.get('.query-list')
      .contains('apples')
      .should('have.class', 'first')

    cy.get('#querying')
      .contains('ul', 'oranges')
      .should('have.class', 'query-list')

    cy.get('.query-button')
      .contains('Save Form')
      .should('have.class', 'btn')
  })

  it('.within() - query DOM elements within a specific element', () => {
    cy.get('.query-form').within(() => {
      cy.get('input:first').should('have.attr', 'placeholder', 'Email')
      cy.get('input:eq(1)').should('have.attr', 'placeholder', 'Password')
    })
  })

  it('.cy.root() - query the root DOM element', () => {
    cy.root().should('match', 'html')

    cy.get('.query-ul').within(() => {
      cy.root().should('have.class', 'query-ul')
    })
  })

  it('best practices - selecting elements', () => {
    // https://on.cypress.io/best-practices#Selecting-Elements
    cy.get('[data-cy=best-practices-selecting-elements]').within(() => {
      // Worst - too generic, no context
      cy.get('button').click()

      // Bad. Coupled to styling. Highly subject to change.
      cy.get('.btn.btn-large').click()

      // Average. Coupled to the `name` attribute which has HTML semantics.
      cy.get('[name=submission]').click()

      // Better. But still coupled to styling or JS event listeners.
      cy.get('#main').click()

      // Slightly better. Uses an ID but also ensures the element
      // has an ARIA role attribute
      cy.get('#main[role=button]').click()

      // Much better. But still coupled to text content that may change.
      cy.contains('Submit').click()

      // Best. Insulated from all changes.
      cy.get('[data-cy=submit]').click()
    })
  })
})