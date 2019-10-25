describe('Search fields test', () => {
  it('Test the redirect of the search field', () => {
    cy.visit('/');
    cy.get('#outlined-with-placeholder').type('Pirates{enter}');
    cy.url().should('eq', 'http://localhost:3000/search/Pirates');
  });
  it('Checks the content of the search page after search', () => {
    cy.get('.MuiGrid-container > :nth-child(1)').should('contain.text', 'Pirates of the Caribbean: The Curse of the Black Pearl');
    cy.get('.MuiGrid-container > :nth-child(11)').should('contain.text', 'The Radio Pirates');
    cy.get('.MuiGrid-container').children().should('have.length', 14);
  });
  it('Checks the genre filter functions', () => {
    cy.get(':nth-child(3) > div > .MuiButtonBase-root').click();
    cy.get(':nth-child(2) > .MuiButtonBase-root').click();
    cy.get(':nth-child(2) > .MuiButtonBase-root').type('{esc}');
    cy.get('.MuiGrid-container').children().should('have.length', 7);
  });
});
