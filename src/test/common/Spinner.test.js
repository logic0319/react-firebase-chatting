import React from 'react';
import Spiiner from '../../components/common/Spinner';
import {shallow} from 'enzyme/build';

describe('Spinner', () => {
  let component = null;
  it('초기 렌더링이 문제없이 되야함', () => {
    component = shallow(<Spiiner/>);
  });

  it('초기 렌더링 스냅샷 일치함', () => {
    expect(component).toMatchSnapshot();
  });
});
