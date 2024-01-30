describe('CSSLocators', () => {
  it('CSS locators', () => {
    cy.visit('http://www.automationpractice.pl/index.php')

    // cy.get('#search_query_top').type('T-Shirts')  //id, tag is oprional > 'input#search_query_top'

    // cy.get('.search_query').type('T-Shirts') //class locator

    // cy.get('[name="search_query"]').type('T-Shirts') //attribute

    // cy.get('.search_query[name="search_query"]').type('T-Shirts') //class & attribute

    cy.get('input.search_query[name="search_query"]').type('T-Shirts') //tag & class & attribute

    cy.get('[name=submit_search]').click()  //attribute locator
    cy.get('.lighter').contains('T-Shirts') //assertion (locator > class)


  })
})