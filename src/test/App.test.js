import React from 'react';
import { App } from '../components/App';
import {shallow} from "enzyme/build";

describe('Register', () => {
  it('renders correctly', () => {
    const component = shallow(<App/>);
    expect(component).toMatchSnapshot();
  });
})
