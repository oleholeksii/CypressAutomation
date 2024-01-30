context('Action', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/actions')
  })

  it('.type() - type into a DOM element', () => {
    cy.get('#email1')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com')

      //type with a special character sequence
      .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
      .type('{del}{selectall}{backspace}')

      //.type() with key modifiers
      .type('{alt}{option}') //these are equivalent
      .type('{ctrl}{control}') //these are equivalent
      .type('{meta}{command}{cmd}') //these are equivalent
      .type('{shift}')

      //Delay each key press by 0.1 sec
      .type('slow.typing@email.com', { delay: 100 })
      .should('have.value', 'slow.typing@email.com')

    cy.get('.action-disabled')
      //ignore error checking prior to type
      //like whether the input visible or disabled
      .type('disabled error checking', { force: true })
      .should('have.value', 'disabled error checking')
  })

  it('.focus() on a DOM element', () => {
    cy.get('.action-focus').focus()
      .should('have.class', 'focus')
      .prev().should('have.attr', 'style', 'color: orange;')
  })

  it('.blur() - blur off a DOM element', () => {
    cy.get('.action-blur').type('About to blur').blur()
      .should('have.class', 'error')
      .prev().should('have.attr', 'style', 'color: red;')
  })

  it('.clear() - clears an input or textarea element', () => {
    cy.get('.action-clear').type('clear this text')
      .should('have.value', 'clear this text')
      .clear()
      .should('have.value', '')
  })

  it('.submit() - submit the form', () => {
    cy.get('.action-form')
      .find('[type="text"]').type('HALFOFF')

    cy.get('.action-form').submit()
      .next().should('contain', 'Your form has been submitted!')
  })

  it('.click() - click on a DOM element', () => {
    cy.get('.action-btn').click()

    // You can click on 9 specific positions of an element:
    //  -----------------------------------
    // | topLeft        top       topRight |
    // |                                   |
    // |                                   |
    // |                                   |
    // | left          center        right |
    // |                                   |
    // |                                   |
    // |                                   |
    // | bottomLeft   bottom   bottomRight |
    //  -----------------------------------

    // clicking in the center of the element is the default
    cy.get('#action-canvas')
      .click()

      .click('topLeft')
      .click('top')
      .click('topRight')
      .click('left')
      .click('right')
      .click('bottomLeft')
      .click('bottom')
      .click('bottomRight')

    //.click() accepts a x and y coordinate
    // that controls where the click occurs
    cy.get('#action-canvas')
      .click(80, 75)
      .click(170, 75)
      .click(80, 165)
      .click(100, 185)
      .click(125, 190)
      .click(150, 185)
      .click(170, 165)

    //click multiple elements by passing multiple: true
    cy.get('.action-labels>.label').click({ multiple: true })

    // Ignore error checking prior to clicking
    cy.get('.action-opacity>.btn').click({ force: true })
  })

  it('.dbclick() - double click on a DOM element', () => {

    // Our app has a listener on 'dblclick' event in our 'scripts.js'
    // that hides the div and shows an input on double click
    cy.get('.action-div').dblclick().should('not.be.visible')
    cy.get('.action-input-hidden').should('be.visible')
  })

  it('.rightclick() on a DOM element', () => {
    cy.get('.rightclick-action-div').rightclick().should('not.be.visible')
    cy.get('.rightclick-action-input-hidden').should('be.visible')
  })

  it('.check() a checkbox or radio element', () => {
    cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]')
      .check().should('be.checked')

    cy.get('.action-radios [type="radio"]').not('[disabled]')
      .check().should('be.checked')

    // .check() accepts a value argument
    cy.get('.action-radios [type="radio"]')
      .check('radio1').should('be.checked')

    // .check() accepts an array of values
    cy.get('.action-multiple-checkboxes [type="checkbox"]')
      .check(['checkbox1', 'checkbox2']).should('be.checked')

    // Ignore error checking prior to checking
    cy.get('.action-checkboxes [disabled]')
      .check({ force: true }).should('be.checked')

    cy.get('.action-radios [type="radio"]')
      .check('radio3', { force: true }).should('be.checked')
  })

  it('.uncheck() a checkbox element', () => {
    cy.get('.action-check [type="checkbox"]')
      .not('[disabled]')
      .uncheck(['checkbox1', 'checkbox3']).should('not.be.checked')

    cy.get('.action-check [type="checkbox"]')
      .uncheck({ force: true }).should('not.be.checked')
  })

  it('.select() an option in a <select> element', () => {
    cy.get('.action-select')
      .should('have.value', '--Select a fruit--')

    cy.get('.action-select').select('apples')
    // confirm the apples were selected
    // note that each value starts with "fr-" in our HTML
    cy.get('.action-select').should('have.value', 'fr-apples')

    cy.get('.action-select-multiple')
      .select(['apples', 'oranges', 'bananas'])
      .invoke('val')
      .should('deep.equal', ['fr-apples', 'fr-oranges', 'fr-bananas'])
      .should('include', 'fr-oranges')
  })

  it('.scrollIntoView()', () => {
    cy.get('#scroll-horizontal button')
      .should('not.be.visible')

    cy.get('#scroll-horizontal button').scrollIntoView()
      .should('be.visible')

    cy.get('#scroll-vertical button')
      .should('not.be.visible')

    cy.get('#scroll-vertical button').scrollIntoView()
      .should('be.visible')

    cy.get('#scroll-both button')
      .should('not.be.visible')

    cy.get('#scroll-both button').scrollIntoView()
      .should('be.visible')
  })

  it('.trigger() an event on a DOM elemnt', () => {
    cy.get('.trigger-input-range')
      .invoke('val', 25)
      .trigger('change')
      .get('input[type=range]').siblings('p')
      .should('have.text', '25')
    //.get('input[type=range]').siblings('p'): Ponownie za pomocą .get(), znajduje elementy <input> z atrybutem type ustawionym na "range", które są rodzeństwem elementu <p>.
    //.should('have.text', '25'): Sprawdza, czy tekst w znalezionym elemencie <p> (rodzeństwo pola input typu range) jest równy "25". To sprawdzenie asercji sprawdza, czy po zmianie wartości pola input, tekst w sąsiednim elemencie <p> został zaktualizowany zgodnie z oczekiwaniami.
  })

  it.only('cy.scrollTo() - scroll the window or element to a position', () => {
    // https://on.cypress.io/scrollTo

    // You can scroll to 9 specific positions of an element:
    //  -----------------------------------
    // | topLeft        top       topRight |
    // |                                   |
    // |                                   |
    // |                                   |
    // | left          center        right |
    // |                                   |
    // |                                   |
    // |                                   |
    // | bottomLeft   bottom   bottomRight |
    //  -----------------------------------

    // if you chain .scrollTo() off of cy, we will
    // scroll the entire window

    cy.scrollTo('bottom')
    cy.get('#scrollable-horizontal').scrollTo('right')

    // or you can scroll to a specific coordinate:
    // (x axis, y axis) in pixels
    cy.get('#scrollable-vertical').scrollTo(250, 250)

    // or you can scroll to a specific percentage
    // of the (width, height) of the element
    cy.get('#scrollable-both').scrollTo('75%', '25%')

    // control the easing of the scroll (default is 'swing')
    cy.get('#scrollable-vertical').scrollTo('center', { easing: 'linear' })

    // control the duration of the scroll (in ms)
    cy.get('#scrollable-both').scrollTo('center', { duration: 2000 })
  })

})

