describe('Homepage tests', function() {
    it('Check if labels have right text', function() {
        cy.visit('/')
        cy.get('.makeStyles-mainTitle-126').should('contain.text', 'Search for thousands of movies')
        cy.get('.makeStyles-latestTitle-131').should('contain.text', 'Latest release')
        cy.get(':nth-child(1) > .makeStyles-link-132 > .MuiButtonBase-root-333 > .MuiButton-label-306').should('contain.text', 'Action')
        cy.get(':nth-child(1) > .MuiPaper-root-368 > .makeStyles-link-364 > .MuiButtonBase-root-333 > .MuiCardContent-root-401 > .MuiTypography-h5-411').should('contain.text', 'The Treasure')
    })
})