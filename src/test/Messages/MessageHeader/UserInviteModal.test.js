import React from 'react';
import { UserInviteModal } from '../../../components/Messages/MessageHeader/UserInviteModal';
import {shallow} from 'enzyme/build';

describe('UserInviteModal', () => {
  let component = null;
  const currentRoomUsers = [{
    avatar: 'http://wwww.mock-image-url1.com',
    name: 'myp1',
    email: 'myp1@daum.net'
  },{
    avatar: 'http://wwww.mock-image-url2.com',
    name: 'myp2',
    email: 'myp2@daum.net'
  }];
  const currentRoom = {
    id: 'abcde',
    name: 'hello world',
  };

  const isOpen = false;
  const mockCloseModal = jest.fn(e => e);

  it('초기 렌더링이 문제없이 되야함', () => {
    component = shallow(<UserInviteModal
      currentRoomUsers={currentRoomUsers}
      closeModal={mockCloseModal}
      currentRoom={currentRoom}
      isOpen={isOpen}
    />);
  });

  it('초기 렌더링 스냅샷 일치함', () => {
    expect(component).toMatchSnapshot();
  });
});
