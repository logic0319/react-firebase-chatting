import React from 'react';
import Register from '../../components/Auth/Register';
import {shallow} from 'enzyme/build';

describe('Register', () => {
  let component = null;
  it('초기 렌더링이 문제없이 되야함', () => {
    component = shallow(<Register/>);
  });

  it('초기 렌더링 스냅샷 일치함', () => {
    expect(component).toMatchSnapshot();
  });
});
