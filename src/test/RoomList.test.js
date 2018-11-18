import React from 'react';
import RoomList from '../components/RoomList/RoomList';
import {shallow} from 'enzyme/build';

describe('SidePanel', () => {
  let component = null;
  it('초기 렌더링이 문제없이 되야함', () => {
    component = shallow(<RoomList/>);
  });

  it('초기 렌더링 스냅샷 일치함', () => {
    expect(component).toMatchSnapshot();
  });
});
