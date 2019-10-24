import React from 'react';
import { shallow } from 'enzyme';
import { ThemeProvider } from '@material-ui/styles';
import FilterBar from '../components/FilterBar/FilterBar';
import theme from '../theme';

describe('Filter Bar component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<ThemeProvider theme={theme}><FilterBar /></ThemeProvider>);
    expect(wrapper.toJSON).toMatchSnapshot();
  });
});
