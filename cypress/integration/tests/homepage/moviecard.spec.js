describe('Test redirect of a movie cards', () => {
  it('Checks the redirects of the movie card to The Treasure', () => {
    cy.visit('/');
    cy.get('.MuiGrid-container-216 > :nth-child(1)').click();
    cy.url().should('eq', 'http://localhost:3000/movie/573a13f8f29313caabde8d7a');
    cy.get('.makeStyles-title-444').should('have.text', 'The Treasure');
    cy.get('.makeStyles-infoElements-441 > :nth-child(2)').should('have.text', 'Comedy');
    cy.get('.makeStyles-infoElements-441 > :nth-child(1)').should('be.visible');
  });
});
