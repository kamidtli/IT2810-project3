import React from 'react';
import { shallow } from 'enzyme';
import { ThemeProvider } from '@material-ui/styles';
import SortFilter from '../components/SortFilter/SortFilter';
import theme from '../theme';

describe('Sort Filter component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<ThemeProvider theme={theme}><SortFilter /></ThemeProvider>);
    expect(wrapper.toJSON).toMatchSnapshot();
  });
});
