import React from 'react';
import SidePanel from '../../components/SidePanel/SidePanel';
import {shallow} from 'enzyme/build';

describe('SidePanel', () => {
  let component = null;
  it('초기 렌더링이 문제없이 되야함', () => {
    component = shallow(<SidePanel/>);
  });

  it('초기 렌더링 스냅샷 일치함', () => {
    expect(component).toMatchSnapshot();
  });
});
