import React from 'react';
import { shallow } from 'enzyme';
import { ThemeProvider } from '@material-ui/styles';
import SearchField from '../components/SearchField/SearchField';
import theme from '../theme';

describe('Searchfield component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<ThemeProvider theme={theme}><SearchField /></ThemeProvider>);
    expect(wrapper.toJSON).toMatchSnapshot();
  });
});
