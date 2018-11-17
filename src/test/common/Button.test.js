import React from 'react';
import Button from '../../components/common/Button';
import {shallow} from 'enzyme/build';

describe('Button', () => {
  let component = null;
  const mockCallback = jest.fn(e => e);
  it('초기 렌더링이 문제없이 되야함', () => {
    component = shallow(<Button
      onClick={mockCallback}>
      버튼
    </Button>);
  });

  it('초기 렌더링 스냅샷 일치함', () => {
    expect(component).toMatchSnapshot();
  });

  it('onClick 함수가 수행되어야 함', () => {
    component.find('button').simulate('click');
    expect(mockCallback.mock.calls.length).toBe(1);
  });

  it('div.loader를 랜더링 해야함', () => {
    component = shallow(<Button
      loader
      onClick={mockCallback}>
      버튼
    </Button>);
    component.find('div.loader').exists();
  });
});
