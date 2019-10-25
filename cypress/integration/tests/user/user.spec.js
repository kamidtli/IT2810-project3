describe('User tests', () => {
  it('Add new user test', () => {
    cy.visit('/');
    cy.get('a').click();
    cy.get('#username').type('user{enter}');
    cy.get('.MuiAvatar-root').click();
    cy.get('.MuiList-root > .MuiButtonBase-root').should('have.text', 'Logout').type('{esc}');
  });
  it('Add movie to a users watchlist', () => {
    cy.get('#\\35 73a13f8f29313caabde8d7a-watchlist').click();
    cy.get('.MuiButton-label > .MuiSvgIcon-root').click();
    cy.get('[href="/watchlist"] > .MuiButtonBase-root').click();
    cy.get('.MuiTypography-h5').should('have.text', 'The Treasure');
  });
  it('Remove movie from watchlist', () => {
    cy.get('#\\35 73a13f8f29313caabde8d7a-watchlist-rm').click();
    cy.get('#refreshbutton').click();
    cy.get('p').should('have.text', 'No movies in watchlist');
  });
  it('Logout user', () => {
    cy.get('.MuiAvatar-root').click();
    cy.get('.MuiList-root > .MuiButtonBase-root').click();
    cy.get('a > .MuiButtonBase-root').should('have.text', 'SIGN IN');
  });
});
