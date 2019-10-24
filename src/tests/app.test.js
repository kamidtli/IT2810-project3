import React from 'react';
import { shallow } from 'enzyme';
import Card from '../components/Card/Card';
import App from '../App';

it('renders without crashing', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.toJSON).toMatchSnapshot();
});
