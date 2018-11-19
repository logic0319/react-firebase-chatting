import React from 'react';
import Paper from '../../components/common/Paper';
import {shallow} from 'enzyme/build';

describe('Paper', () => {
  let component = null;
  it('초기 렌더링이 문제없이 되야함', () => {
    component = shallow(<Paper>
      <p>paper</p>
    </Paper>);
  });

  it('초기 렌더링 스냅샷 일치함', () => {
    expect(component).toMatchSnapshot();
  });
});
