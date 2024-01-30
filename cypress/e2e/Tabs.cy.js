describe('Handle tab', () => {

  it('Approach 1', () => {
    cy.visit('https://the-internet.herokuapp.com/windows') //parent tab

    cy.get('.example > a').invoke('removeAttr', 'target').click() //clicking on link after removing attribute

    cy.url().should('include', 'https://the-internet.herokuapp.com/windows/new') //assertion

    cy.wait(5000)

    //some operations
    cy.go('back') //back to parent tab

  })

  it.only('Approach 2', () => {
    cy.visit('https://the-internet.herokuapp.com/windows') //parent tab

    cy.get('.example > a').then((element) => {  //captured element '.example > a' is stored in variable 'element'

      let url = element.prop('href')  //capturing value of href. url here is representing child page

      cy.visit(url)
    })

    cy.url().should('include', 'https://the-internet.herokuapp.com/windows/new') //assertion

    cy.wait(5000)

    //some operations
    cy.go('back') //back to parent tab

  })
})