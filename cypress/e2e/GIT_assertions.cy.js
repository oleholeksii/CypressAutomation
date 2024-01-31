context('Assertions', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/assertions')
  })

  describe('Implicit assersions', () => {
    it('.shpuld() - make an assertion about the current subject', () => {
      cy.get('.assertion-table')
        .find('tbody tr:last')
        .should('have.class', 'success')
        .find('td')
        .first()
        //checking the text of the <td> element on various ways
        .should('have.text', 'Column content')
        .should('contain', 'Column content')
        .should('have.html', 'Column content')
        // chai-jquery uses "is()" to check if element matches selector
        .should('match', 'td')
        .invoke('text')
        .should('match', /column content/i)

      // a better way to check element's text content against a regular expression
      // is to use "cy.contains"
      // https://on.cypress.io/contains
      cy.get('.assertion-table')
        .find('tbody tr:last')
        // finds first <td> element with text content matching regular expression
        .contains('td', /column content/i)
        .should('be.visible')

      // for more information about asserting element's text
      // see https://on.cypress.io/using-cypress-faq#How-do-I-get-an-element’s-text-contents
    })

    it('.and()', () => {
      cy.get('.assertions-link')
        .should('have.class', 'active')
        .and('have.attr', 'href')
        .and('include', 'cypress.io')
    })
  })

  describe('Explicit assertions', () => {
    it('expect - make an asserion about aspecified subject', () => {
      expect(true).to.be.true
      const o = { foo: 'bar' }


      expect('FooBar').to.match(/bar$/i)
      /* Rozpoczynamy z poleceniem expect(), które służy do tworzenia asercji w Cypress.W tym przypadku, podajemy łańcuch znaków 'FooBar' jako wartość, którą będziemy sprawdzać.
         to.match(/bar$/i): Dodajemy łańcuch asercji .to.match(), który jest używany do porównywania wartości z wyrażeniem regularnym. W tym przypadku używamy /bar$/i jako wyrażenia regularnego.
         /bar$/: Oznacza, że sprawdzamy, czy łańcuch znaków kończy się na 'bar'. Symbol $ w wyrażeniu regularnym oznacza koniec łańcucha.
         i: Jest flagą (flaga nieczułości na wielkość liter), co oznacza, że porównanie jest nieczułe na wielkość liter. Dzięki temu, 'Bar' również pasuje do wzorca, nawet jeśli pierwotnie było napisane z wielkiej litery. */
    })

    it('pass your own callback function to should()', () => {
      cy.get('.assertions-p')
        .find('p')
        .should(($p) => {
          const texts = $p.map((i, el) => Cypress.$(el).text())
          const paragraphs = texts.get()
          expect(paragraphs, 'has 3 paragraphs').to.have.length(3)
          expect(paragraphs, 'has expected text in each paragraph').to.deep.eq([
            'Some text from first p',
            'More text from second p',
            'And even more text from third p'
          ])
        })
    })

    it('find element by class name regex', () => {
      cy.get('.docs-header')
        .find('div')
        .should(($div) => {
          expect($div).to.have.length(1)

          const className = $div[0].className

          expect(className).to.match(/heading-/)
        })
        .then(($div) => {
          expect($div, 'text content').to.have.text('Introduction')
        })
    })

    it('can throw any error', () => {
      cy.get('.docs-header')
        .find('div')
        .should(($div) => {
          if ($div.length !== 1) {
            //you can throw your own error
            throw new Error('Did not find 1 element')
          }

          const className = $div[0].className

          if (!className.match(/heading-/)) {
            throw new Error('Couldnt not find class "-heading" in ${className}')
          }
        })
    })

    it('Matches unknown text between two elements', () => {
      let text
      const normalizeText = (s) => s.replace(/\s/g, '').toLowerCase()
      // "/": Otwierający znak ukośnika w wyrażeniach regularnych. Oznacza początek wyrażenia regularnego
      // "\s": Oznacza dowolny biały znak (whitespace), tak jak spacja, tabulator, czy znak nowej linii
      // "/": Zamykający znak ukośnika w wyrażeniach regularnych. Oznacza koniec wyrażenia regularnego
      // "g": Opcja globalna (global flag), która wskazuje, że dopasowanie ma być przeprowadzone globalnie na całym ciągu znaków, a nie tylko na pierwszym znalezionym dopasowaniu.

      cy.get('.two-elements')
        .find('.first')
        .then(($first) => {
          text = normalizeText($first.text())
        })

      cy.get('.two-elements')
        .find('.second')
        .should(($second) => {
          const secondText = normalizeText($second.text())

          expect(secondText, 'second text').to.equal(text)
        })
    })

    it('assert - assert shape of an object', () => {
      const person = {
        name: 'Joe',
        age: 20
      }

      assert.isObject(person, 'value is object')
    })

    it('retries the should callback untill assertions pass', () => {
      cy.get('#random-number')
        .should(($div) => {
          // $div tutaj to wczesniej znaleziony random number
          const n = parseFloat($div.text())

          expect(n).to.be.gte(1).and.be.lte(10)
        })
    })
  })
})
