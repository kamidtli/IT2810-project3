describe('Search fields test', function() {
    it(`Test the redirect of the search field`, function() {
        cy.visit('/')
        cy.get('#outlined-with-placeholder').type('Pirates {enter}')
        cy.url().should('eq', `http://localhost:3000/search/Pirates`)
    })
    it('Checks the content of the search page after search', function() {
        cy.get('.MuiGrid-container > :nth-child(1)').should('contain.text', "Pirates of the Caribbean: The Curse of the Black Pearl")
        cy.get('.MuiGrid-container > :nth-child(7)').should('contain.text', "Pirates of the Great Salt Lake")
        cy.get('.MuiGrid-container').children().should('have.length', 7)
    })
})