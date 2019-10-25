import React from 'react';
import { shallow } from 'enzyme';
import { ThemeProvider } from '@material-ui/styles';
import Filters from '../components/FilterBar/Filters';
import theme from '../theme';

describe('Filter Bar component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <ThemeProvider theme={theme}>
        <Filters />
      </ThemeProvider>
    );
    expect(wrapper.toJSON).toMatchSnapshot();
  });
});
