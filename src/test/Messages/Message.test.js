import React from 'react';
import Message from '../../components/Messages/Message';
import {shallow} from 'enzyme/build';

describe('Message', () => {
  let component = null;

  const user = {
    avatar: 'http://wwww.mock-image-url1.com',
    name: 'myp1',
    email: 'myp1@daum.net'
  };

  const imgMessage = {
    image: 'www.image.net'
  };

  const contentMessage = {
    content: '안녕하세요'
  }

  it('초기 렌더링이 문제없이 되야함', () => {
    component = shallow(<Message
      message={contentMessage}
      user={user}
    />);
  });

  it('이미지 메세지가 전달되면 img 태그를 랜더링 함', () => {
    component = shallow(<Message
      message={imgMessage}
      user={user}
    />);
    component.find('img').exists()
  });


  it('초기 렌더링 스냅샷 일치함', () => {
    expect(component).toMatchSnapshot();
  });
});
