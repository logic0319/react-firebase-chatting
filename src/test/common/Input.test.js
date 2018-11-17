import React from 'react';
import Input from '../../components/common/Input';
import {shallow} from 'enzyme/build';

describe('Input', () => {
  let component = null;
  const mockCallback = jest.fn(e => e);
  it('초기 렌더링이 문제없이 되야함', () => {
      component = shallow(<Input
      id="email"
      name="email"
      placeholder="Email"
      type="email"
      value="nick@naver.com"
      onChange={mockCallback}
    />);
  });

  it('초기 렌더링 스냅샷 일치함', () => {
    expect(component).toMatchSnapshot();
  });

  it('onChange 파라미터가 input 요소의 value 값과 같아야 함', () => {
    component.find('input').simulate('change', 'hello');
    expect(mockCallback.mock.calls[0][0]).toBe('hello');
  });
});
