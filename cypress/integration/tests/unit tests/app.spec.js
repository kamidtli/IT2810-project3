import Card from '../../../../src/components/Card/Card';

describe('Card component', () => {
  it('works', () => {
    // mount the component under test
    cy.mount(<Card />)
    // mounted component can be selected via its name, function, or JSX
    // e.g. '@HelloWorld', HelloWorld, or <HelloWorld />
    cy.get(Card)
      .should('have.class', 'classes.card')
  })
})

