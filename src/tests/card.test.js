import React from 'react';
import { shallow } from 'enzyme';
import { ThemeProvider } from '@material-ui/styles';
import Card from '../components/Card/Card';
import theme from '../theme';

describe('Card component', () => {
  it('renders without crashing', () => {
    const card = shallow(
      <ThemeProvider theme={theme}>
        <Card />
      </ThemeProvider>
    );
    expect(card.toJSON).toMatchSnapshot();
  });
});
