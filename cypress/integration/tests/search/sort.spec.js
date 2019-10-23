describe('Sort functionality test', function() {
    it(`Test the redirect of the search field`, function() {
        cy.visit('/search/nolan')
    })
    it('Checks the content of the page', function() {
        cy.get('.MuiGrid-container > :nth-child(1)').should('contain.text', "The Dark Knight")
        cy.get('.MuiGrid-container > :nth-child(3)').should('contain.text', "Interstellar")
        cy.get('.MuiGrid-container').children().should('have.length', 9)
    })
    it('Checks the released (newest) functionality', function() {
        cy.get('#select-sortValue').click()
        cy.get('[data-value="-released"]').click()
        cy.get('.MuiGrid-container > :nth-child(1)').should('contain.text', "Interstellar")
        cy.get('.MuiGrid-container > :nth-child(9)').should('contain.text', "Following")
    })
    it('Checks the alphabetic sort functionality', function() {
        cy.get('#select-sortValue').click()
        cy.get('[data-value="title"]').click()
        cy.get('.MuiGrid-container > :nth-child(1)').should('contain.text', "Batman Begins")
        cy.get('.MuiGrid-container > :nth-child(9)').should('contain.text', "The Prestige")
    })
    
})