describe('Handle dropdowns', () => {

  xit('Dropdown with select', () => {

    cy.visit('https://testautomationpractice.blogspot.com/')
    cy.get('#country')
      .select('Japan')
      .should('have.value', 'japan')

  })

  xit('Dropdown without select', () => {

    cy.visit('https://www.dummyticket.com/dummy-ticket-for-visa-application/')
    cy.get("#select2-billing_country-container").click()
    cy.get('.select2-search__field').type('Jap').type('{enter}')
    cy.get("#select2-billing_country-container").should('have.text', 'Japan')

  })


  xit('Dropdown with suggest', () => {

    cy.visit('https://pl.wikipedia.org/wiki/Wikipedia:Strona_g%C5%82%C3%B3wna')
    cy.get('.cdx-text-input__input').type('Delhi')
    cy.get('#cdx-typeahead-search-menu-0').contains('Delhi Heights').click()

  })

  it.only('Dynamic Dropdown', () => {

    cy.visit('https://www.google.com/')

    cy.get('#W0wltc > .QS5gu').click()

    cy.get('#APjFqb').type('Cypress automation')

    cy.wait(2000)

    cy.get('div.wM6W7d').each(($el, index, $list) => {
      if ($el.text() == 'cypress automation tool') {
        cy.wrap($el).click()
      }
    })

    cy.get('#APjFqb').should('have.value', 'cypress automation tool')

  })

})