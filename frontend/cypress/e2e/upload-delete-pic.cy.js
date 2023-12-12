describe('Upload and delete photo', () => {
  it('should login a user and upload a public pic', () => {
    cy.login()
    cy.get('.round-button').click()
    const fixtureFile = 'cypress/fixtures/test.jpg'
    cy.get('input[type="file"]').selectFile(fixtureFile,{force:true}).wait(1000)
    cy.get('.container > [type="text"]').type('test')
    cy.get(".checkboxes").contains('Public').click()
    cy.get('.price').should('not.be.visible')
    cy.get('.botones > :nth-child(1)').click()
    cy.wait(2000)
    // Check if the image with title "test" and uploaded by user "nametest" is visible
  })


  it('should login a user and upload a private pic',() => {
    cy.login()
    cy.get('.round-button').click()
    const fixtureFile = 'cypress/fixtures/testPrivate.jpg'
    cy.get('input[type="file"]').selectFile(fixtureFile,{force:true})
    cy.get('.container > [type="text"]').type('testPrivate')
    cy.get(".checkboxes").contains('Private').click()
    cy.get('.price > label > input').type('1')
    cy.get('.botones > :nth-child(1)').click()
    cy.wait(2000)
    // Check if the image with title "test" and uploaded by user "nametest" is visible
  })

  it('should check the uploaded pictures in main and profile and delete them',() => {
    cy.login()
    cy.get('.card').contains('testPrivate')
    cy.get('.card .usuario-info span').contains('nametest')
    cy.get('.card').contains('test')
    cy.get('.card .usuario-info span').contains('nametest')
    cy.get('.dropdown-content').contains('Profile').click({force: true})
    cy.get(':nth-child(1) > .card-img-top').click()
    cy.contains('DELETE').click()
    cy.get(':nth-child(2) > .card-img-top').click()
    cy.contains('DELETE').click()
    cy.wait(2000)
    cy.contains('OnlyPics').click()
    cy.get('.card .usuario-info span').contains('nametest').should('not.exist')
  })
})
