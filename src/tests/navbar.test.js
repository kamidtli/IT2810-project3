import React from 'react';
import { shallow } from 'enzyme';
import { ThemeProvider } from '@material-ui/styles';
import NavBar from '../components/Navbar/Navbar';
import theme from '../theme';

describe('Navbar component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <ThemeProvider theme={theme}>
        <NavBar />
      </ThemeProvider>
    );
    expect(wrapper.toJSON).toMatchSnapshot();
  });
});
