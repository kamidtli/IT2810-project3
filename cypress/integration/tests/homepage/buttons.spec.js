describe('Test genre buttons on the homepage', function() {
    const genres = ['Action', 'Comedy', 'Documentary', 'Drama', 'Fanatasy', 'Romance', 'Short', 'Thriller'];
    genres.map((genre) => {
        it(`Checks the redirects of the ${genre} button`, function() {
            cy.visit('/')
            cy.get(`:nth-child(${genres.indexOf(genre) + 1}) > .makeStyles-link-132 > .MuiButtonBase-root-333`).click()
            cy.url().should('eq', `http://localhost:3000/search/genre/${genre}`)
        })
    })
})