describe('Test redirect of a movie cards', () => {
  it('Checks the redirects of the movie card to The Treasure', () => {
    cy.visit('/');
    cy.get('#\\35 73a13f8f29313caabde8d7a').click();
    cy.url().should('eq', 'http://localhost:3000/movie/573a13f8f29313caabde8d7a');
    cy.get('#\\35 73a13f8f29313caabde8d7a-title').should('have.text', 'The Treasure');
    cy.get('#\\35 73a13f8f29313caabde8d7a-rating').should('have.text', 'IMDb rating: 7.5');
    cy.get('.rv-xy-plot__inner').should('be.visible');
  });
});
