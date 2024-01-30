import 'cypress-iframe'

describe('Handling frames', () => {

  it('approach 1', () => {

    cy.visit('https://the-internet.herokuapp.com/iframe')

    const myiframe = cy.get("#mce_0_ifr")
      .its('0.contentDocument.body') //0 because there is one document
      .should('be.visible')
      .then(cy.wrap)

    myiframe.clear().type('Welcome {selectall}')
    cy.get("[aria-label='Bold']").click()

  })

  it('approach 2 by using custom commands', () => {

    cy.visit('https://the-internet.herokuapp.com/iframe')

    cy.getIframe('#mce_0_ifr').clear().type('Welcome {selectall}')

    cy.get("[aria-label='Bold']").click()

  })

  it('approach 3 by using cypress iframe plugin', () => {

    cy.visit('https://the-internet.herokuapp.com/iframe')

    cy.frameLoaded('#mce_0_ifr') //lod tha frame

    cy.iframe('#mce_0_ifr').clear().type('Welcome {selectall}')

    cy.get("[aria-label='Bold']").click()
  })


})