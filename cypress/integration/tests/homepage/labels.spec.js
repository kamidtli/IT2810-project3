describe('Homepage tests', () => {
  it('Check if labels have right text', () => {
    cy.visit('/');
    cy.get('#HomepageTitle').should('contain.text', 'Search for thousands of movies');
    cy.get('#subtitle').should('contain.text', 'Latest release');
    cy.get('#\\35 73a13f8f29313caabde8d7a').should('contain.text', 'The Treasure');
    cy.get('#\\35 73a13f0f29313caabdda7ac').should('contain.text', 'Mountains May Depart');
  });
});


