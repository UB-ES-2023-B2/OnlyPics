describe('Search photos by title', () => {
  it('should type the title of a photo and show all the pics containing that title', () => {
    cy.visit('/')
    cy.login()
    cy.get('.search-input').type('Rana')
    cy.get('.card-title').contains('Rana')
    cy.get('.clear-icon').click()
    cy.get('.search-input').type('Tigre')
    cy.get('.card-title').contains('Tigre')
    cy.get('.clear-icon').click()
    cy.get('.search-input').type('Ajolote')
    cy.get('.card-title').contains('Ajolote')
    cy.get('.clear-icon').click()
    cy.get('.search-input').type('Paisaje')
    cy.get('.card-title').contains('Paisaje')
    cy.get('.clear-icon').click()
  })
  it('should show and empty list of photos when title doesnt match any photo', () => {
    cy.visit('/')
    cy.login()
    cy.get('.search-input').type('deverdadesperoquenadiesepongaestetitutloporqueentoncesmeharafallareltest')
    cy.get('.card-title').should('not.exist')





  })
})
