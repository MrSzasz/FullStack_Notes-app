describe('Testing full app', () => {
  it('should change theme from dark to light and back', () => {
    // Render the initial project page
    cy.visit('/')

    // Get the switch button and click it
    const switchButton = cy.get('.peer')
    switchButton.should('have.attr', 'aria-checked', 'false')
    switchButton.click()

    // Check if the button has changed, and click it again
    switchButton.should('have.attr', 'aria-checked', 'true')
    switchButton.click()

    // Check if the button has changed back to the initial state
    switchButton.should('have.attr', 'aria-checked', 'false')
  })

  it('should render a loading at start, then the user should create a note, find it without error, edit it and delete it', () => {
    // Render the initial project page
    cy.visit('/')

    // Render the loading state at the start
    cy.get('div[role="card skeleton"]')

    // Create a note with Cypress data
    cy.get('svg[role="open-dialog"]').click()
    cy.get('input[placeholder="Title"]').type('testing title note with cypress')
    cy.get('textarea[placeholder="Write your note"]').type(
      'testing content note with cypress',
    )
    cy.get('button').contains(/save/i).click()

    // Find the note we just created with input
    cy.get('input[placeholder="Search notes..."]')
      .click()
      .type('testing title note')

    // Find the note and edit it
    cy.get('div')
      .contains(/testing title/i)
      .click()
    cy.get('input[placeholder="Title"]').type(
      '{selectAll}{backspace}testing title edit with cypress',
    )
    cy.get('textarea[placeholder="Write your note"]').type(
      '{selectAll}{backspace}testing content edit with cypress',
    )
    cy.get('button')
      .contains(/save changes/i)
      .click()

    // Clear the input
    cy.get('input[placeholder="Search notes..."]')
      .click()
      .type('{selectAll}{backspace}')

    // Click the note and delete it
    cy.get('div')
      .contains(/testing title edit/i)
      .click()
    cy.get('button')
      .contains(/delete/i)
      .click()

    // Check if the note was deleted
    cy.get('div')
      .contains(/testing title edit/i)
      .should('not.exist')
  })
})
