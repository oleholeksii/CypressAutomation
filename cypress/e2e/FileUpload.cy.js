import 'cypress-file-upload'

describe('File uploads', () => {

  it('Single File upload', () => {
    cy.visit('https://the-internet.herokuapp.com/upload')
    cy.get("#file-upload").attachFile('test1.pdf')
    cy.get('#file-submit').click()
    cy.wait(3000)
    cy.get('h3').should('have.text', 'File Uploaded!')
  })

  it('File upload - rename', () => {
    cy.visit('https://the-internet.herokuapp.com/upload')
    cy.get("#file-upload").attachFile({ filePath: 'test1.pdf', fileName: 'myfile.pdf' })
    cy.get('#file-submit').click()
    cy.wait(3000)
    cy.get('h3').should('have.text', 'File Uploaded!')
  })

  it('File upload - Drag and Drop', () => {
    cy.visit('https://the-internet.herokuapp.com/upload')
    cy.get('#drag-drop-upload').attachFile('test1.pdf', { subjectType: 'drag-n-drop' })
    cy.wait(3000)
    cy.get('#drag-drop-upload > .dz-preview > .dz-details > .dz-filename > span')
      .contains('test1.pdf')
  })

  it('File upload - multiple files', () => {
    cy.visit('https://davidwalsh.name/demo/multiple-file-upload.php')
    cy.get('#filesToUpload').attachFile(['test1.pdf', 'test2.pdf'])
    cy.wait(3000)
    cy.get(':nth-child(6) > strong').should('have.text', 'Files You Selected:')
  })

  it.only('File upload - multiple files', () => {
    cy.visit('https://www.htmlelements.com/demos/fileupload/shadow-dom/index.htm')
    cy.get('.smart-browse-input', { includeShadowDom: true }).attachFile('test1.pdf')
    cy.get('.smart-item-name', { includeShadowDom: true }).should('have.text', 'test1.pdf')

  })

})