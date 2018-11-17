import React from 'react';
import ErrorMessage from '../../components/common/ErrorMessage';
import {shallow} from 'enzyme/build';

describe('ErrorMessage', () => {
  let component = null;
  it('초기 렌더링이 문제없이 되야함', () => {
    component = shallow(<ErrorMessage>
      <p>error message</p>
    </ErrorMessage>);
  });

  it('초기 렌더링 스냅샷 일치함', () => {
    expect(component).toMatchSnapshot();
  });
});
