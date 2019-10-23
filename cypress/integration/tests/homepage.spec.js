describe('Homepage tests', function() {
    it('Check if labels have right text', function() {
        cy.visit('/')
        cy.get('.makeStyles-mainTitle-126').should('contain.text', 'Search for thousands of movies')
        cy.get('.makeStyles-latestTitle-131').should('contain.text', 'Latest release')
        cy.get(':nth-child(1) > .makeStyles-link-132 > .MuiButtonBase-root-333 > .MuiButton-label-306').should('contain.text', 'Action')
        cy.get(':nth-child(1) > .MuiPaper-root-368 > .makeStyles-link-364 > .MuiButtonBase-root-333 > .MuiCardContent-root-401 > .MuiTypography-h5-411').should('contain.text', 'The Treasure')
    })
})

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

describe('Test redirect of a movie cards', function() {
    it(`Checks the redirects of the movie card to The Treasure`, function() {
        cy.visit('/')
        cy.get('.makeStyles-root-337 > .MuiGrid-container-203 > :nth-child(1)').click()
        cy.url().should('eq', `http://localhost:3000/movie/573a13f8f29313caabde8d7a`)
    })
})

describe('Search fields test', function() {
    it(`Test the redirect of the search field`, function() {
        cy.visit('/')
        cy.get('.makeStyles-container-526').click().type('Pirates')
        cy.url().should('eq', `http://localhost:3000/search/Pirates`)
    })
})

