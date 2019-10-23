describe('Search field homepage test', function() {
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

describe('Search field header tests', function() {
    it(`Test the redirect of the search field in the header`, function() {
        cy.visit('/')
        cy.get('.makeStyles-search-101 > .MuiInputBase-root > .MuiInputBase-input').type('nolan{enter}')
        cy.url().should('eq', `http://localhost:3000/search/nolan`)
    })
    it('Checks the content of the search page after search', function() {
        cy.get('.MuiGrid-container > :nth-child(1)').should('contain.text', "The Dark Knight")
        cy.get('.MuiGrid-container > :nth-child(3)').should('contain.text', "Interstellar")
        cy.get('.MuiGrid-container > :nth-child(9)').should('contain.text', "Insomnia")
        cy.get('.MuiGrid-container').children().should('have.length', 9)
    })
})