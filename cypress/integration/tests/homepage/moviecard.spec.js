describe('Test redirect of a movie cards', function() {
    it(`Checks the redirects of the movie card to The Treasure`, function() {
        cy.visit('/')
        cy.get('.makeStyles-root-337 > .MuiGrid-container-203 > :nth-child(1)').click()
        cy.url().should('eq', `http://localhost:3000/movie/573a13f8f29313caabde8d7a`)
    })
})