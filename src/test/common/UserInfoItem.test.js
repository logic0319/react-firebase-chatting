import React from 'react';
import UserInfoItem from '../../components/common/UserInfoItem';
import {shallow} from 'enzyme/build';

describe('UserInfoItem', () => {
  let component = null;
  const user = {
    avatar: 'http://wwww.mock-image-url.com',
    name: 'myp',
    email: 'myp7@daum.net'
  };

  const mockCallback = jest.fn(e => e);
  it('초기 렌더링이 문제없이 되야함', () => {
    component = shallow(<UserInfoItem
      user={user}
      onClick={mockCallback}/>);
  });

  it('초기 렌더링 스냅샷 일치함', () => {
    expect(component).toMatchSnapshot();
  });

  it('onClick 함수가 수행되어야 함', () => {
    component.find('button').simulate('click');
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
