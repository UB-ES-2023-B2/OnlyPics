// settings.spec.js

describe('Settings Page', () => {
  beforeEach(() => {
    cy.login()
    cy.get('.dropdown-content').contains('Settings').click({force: true})
  })

  it('should update user information', () => {
    // Type valid information in the form fields
    const fixtureFile = 'cypress/fixtures/testPrivate.jpg'
    cy.get('input[type="file"]').selectFile(fixtureFile,{force:true})
    cy.get('#username').clear().type('nametest')
    cy.get('#password').clear().type('.12345aA')
    cy.get('#name').clear().type('NewName')
    cy.get('#lastname').clear().type('NewLastname')
    cy.get('#email').clear().type('newemail@example.com')
    cy.get('#biography').clear().type('NewBiography')
    cy.get('#birthDate').type('2000-01-01') // Add a valid date

    // Click the "Save Information" button
    cy.get('.styled-button').contains('Save Information').click()

    cy.once('window:alert', (str) => {
      expect(str).to.equal('Your information has been successfully updated.')
    })
    // Assert that the information has been updated successfully
    cy.url().should('include', '/profile')
    cy.get('.username').should('contain', 'nametest')
    cy.get('.name').should('contain', 'NewName NewLastname')
    cy.get('.biography').should('contain', 'NewBiography')
    cy.get('.footer-section').should('contain','newemail@example.com')
  })
  it('should show an error if the form is incomplete', () => {
    // Leave one of the fields empty
    cy.get('#username').type('newUsername')
    cy.get('#password').type('NewPassword!1')
    cy.get('#name').type('NewName')
    cy.get('#lastname').type('NewLastname')
    cy.get('#email').type('newemail@example.com')
    cy.get('#biography').type('NewBiography')

    // Click the "Save Information" button
    cy.get('.styled-button').contains('Save Information').click()

    // Assert that an alert appears with the incomplete form message
    cy.once('window:alert', (str) => {
      expect(str).to.equal('Complete the form before updating')
    })
  })

  it('should show an error if the password is invalid', () => {
    const fixtureFile = 'cypress/fixtures/testPrivate.jpg'
    cy.get('input[type="file"]').selectFile(fixtureFile,{force:true})
    // Type valid information in the form fields
    cy.get('#username').clear().type('newUsername')
    cy.get('#password').clear().type('invalidpassword')
    cy.get('#name').clear().type('NewName')
    cy.get('#lastname').clear().type('NewLastname')
    cy.get('#email').clear().type('newemail@example.com')
    cy.get('#biography').clear().type('NewBiography')
    cy.get('#birthDate').type('2000-01-01') // Add a valid date

    // Click the "Save Information" button
    cy.get('.styled-button').contains('Save Information').click()

    // Assert that an alert appears with the invalid password message
    cy.once('window:alert', (str) => {
      expect(str).to.equal('Password must contain an upper letter, lower letter, and a special character')
    })
  })
})
