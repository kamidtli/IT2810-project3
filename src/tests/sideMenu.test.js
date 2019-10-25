import React from 'react';
import { shallow } from 'enzyme';
import { ThemeProvider } from '@material-ui/styles';
import SideMenu from '../components/SideMenu/sideMenu';
import theme from '../theme';

describe('Side Menu component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <ThemeProvider theme={theme}>
        <SideMenu />
      </ThemeProvider>
    );
    expect(wrapper.toJSON).toMatchSnapshot();
  });
});
