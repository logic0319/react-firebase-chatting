import React from 'react';
import Login from '../../components/Auth/Login';
import {shallow} from 'enzyme/build';

describe('Login', () => {
  let component = null;
  it('초기 렌더링이 문제없이 되야함', () => {
    component = shallow(<Login/>);
  });

  it('초기 렌더링 스냅샷 일치함', () => {
    expect(component).toMatchSnapshot();
  });
});
