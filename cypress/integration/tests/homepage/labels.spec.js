describe('Homepage tests', () => {
  it('Check if labels have right text', () => {
    cy.visit('/');
    cy.get('.makeStyles-mainTitle-126').should('contain.text', 'Search for thousands of movies');
    cy.get('.makeStyles-latestTitle-131').should('contain.text', 'Latest release');
    cy.get('.MuiGrid-container-216 > :nth-child(1)').should('contain.text', 'The Treasure');
    cy.get('.MuiGrid-container-216 > :nth-child(9)').should('contain.text', 'Mountains May Depart');
  });
});
