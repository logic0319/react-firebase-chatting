import React from 'react';
import Form from '../../components/common/Form';
import {shallow} from 'enzyme/build';

describe('Form', () => {
  let component = null;
  const mockCallback = jest.fn(e => e);
  it('초기 렌더링이 문제없이 되야함', () => {
    component = shallow(<Form
      onSubmit={mockCallback}>
      <input type='text'/>
    </Form>);
  });

  it('초기 렌더링 스냅샷 일치함', () => {
    expect(component).toMatchSnapshot();
  });

  it('onSubmit 함수가 수행되어야 함', () => {
    component.find('form').simulate('submit');
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
