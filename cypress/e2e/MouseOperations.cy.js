import 'cypress-iframe'
require('@4tw/cypress-drag-drop')

describe("Mouse Operations", () => {

  it('Mouse Hover', () => {
    cy.visit("https://demo.opencart.com/")

    cy.get(':nth-child(1) > .dropdown-menu > .dropdown-inner > .list-unstyled > :nth-child(2) > .nav-link')
      .should("not.be.visible")

    cy.get('.nav > :nth-child(1) > .dropdown-toggle').trigger('mouseover').click()

    cy.get(':nth-child(1) > .dropdown-menu > .dropdown-inner > .list-unstyled > :nth-child(2) > .nav-link')
      .should("be.visible")
  })

  it('Right click', () => {
    cy.visit('https://swisnl.github.io/jQuery-contextMenu/demo.html')

    //Approach 1
    // cy.get('.context-menu-one').trigger('contextmenu')
    // cy.get('.context-menu-icon-copy').should('be.visible')

    //Approach 2
    cy.get('.context-menu-one').rightclick()
    cy.get('.context-menu-icon-copy').should('be.visible')
  })

  it('Double click', () => {
    cy.visit("https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_ev_ondblclick3")
    cy.frameLoaded('#iframeResult')
    cy.get('#accept-choices').click()

    // cy.get("#field2").should('be.empty')

    //Approach 1 - trigger()
    // cy.iframe('#iframeResult').find("button[ondblclick='myFunction()']").trigger('dblclick')
    // cy.iframe('#iframeResult').find("#field2").should('have.value', 'Hello World!')


    //Approach 2 - dbclick
    cy.iframe('#iframeResult').find("button[ondblclick='myFunction()']").dblclick
    cy.iframe('#iframeResult').find("#field2").should('have.value', 'Hello World!')

  })

  it('Drag and drop using plugin', () => {
    cy.visit('http://www.dhtmlgoodies.com/packages/dhtml-suite-for-applications/demos/demo-drag-drop-3.html')
    cy.get('#box6').drag('#box106', { force: true })

  })

  it.only('Scroll the page', () => {
    cy.visit('https://www.countries-ofthe-world.com/flags-of-the-world.html')
    cy.get(':nth-child(1) > tbody > :nth-child(86) > :nth-child(1) > img').scrollIntoView({ duration: 2000 })
    cy.get(':nth-child(1) > tbody > :nth-child(86) > :nth-child(1) > img').should('be.visible')
    cy.get(':nth-child(1) > tbody > :nth-child(4) > :nth-child(1) > img').scrollIntoView({ duration: 1000 })
    cy.get(':nth-child(1) > tbody > :nth-child(4) > :nth-child(1) > img').should('be.visible')
    
  })


})
