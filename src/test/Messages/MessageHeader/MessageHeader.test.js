import React from 'react';
import MessageHeader from '../../../components/Messages/MessageHeader/MessageHeader';
import {shallow} from 'enzyme/build';

describe('MessageHeader', () => {
  let component = null;
  it('초기 렌더링이 문제없이 되야함', () => {
    component = shallow(<MessageHeader />);
  });

  it('초기 렌더링 스냅샷 일치함', () => {
    expect(component).toMatchSnapshot();
  });
});
