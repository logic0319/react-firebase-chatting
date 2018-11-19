import React, { Component } from 'react';
import Modal from 'react-modal';
import firebase from '../../../firebase';
import { connect } from 'react-redux';
import { setCurrentRoom } from '../../../actions';
import PropTypes from 'prop-types';
import UserInfoItem from '../../common/UserInfoItem';

export class UserInviteModal extends Component {
  state = {
    currentRoom: this.props.currentRoom,
    users: [],
    roomsRef: firebase.database().ref('rooms'),
    usersRef: firebase.database().ref('users'),
  };

  componentDidMount() {
    this.addListeners();
  }

  /**
   * 컴포넌트가 unmount될 때 이벤트 리스너를 제거합니다.
   */
  componentWillUnmount() {
    this.removeListeners();
  }

  addListeners = () => {
    this.addUserListener();
  };

  /**
   * 이벤트 리스너를 등록합니다.
   * DB에서 유저가 추가 될 때마다 실행 됩니다.
   */
  addUserListener = () => {
    const { usersRef } = this.state;
    const loadedUsers = [];
    usersRef.on('child_added', (snap) => {
      loadedUsers.push(snap.val());
      this.setState({ users: loadedUsers, loading: false });
    });
  };

  removeListeners = () => {
    this.state.usersRef.off();
    this.state.roomsRef.off();
  };

  /**
   * 유저를 초대합니다.
   * room과 user는 many to many 관계이기 때문에
   * room id 밑에는 유저 정보를
   * user id 밑에는 방 정보를 저장합니다.
   */
  inviteUser = (user) => {
    const {
      roomsRef, usersRef, currentRoom,
    } = this.state;
    const { closeModal } = this.props;
    const key = currentRoom.id;

    const invitedRoom = {
      id: currentRoom.id,
      name: currentRoom.name,
    };

    const invitedUser = {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
    };

    roomsRef
      .child(key)
      .child('users')
      .child(user.id)
      .set(invitedUser)
      .then(() => {
        console.log('add user in room');
      })
      .catch((err) => {
        console.error(err);
      });

    usersRef
      .child(user.id)
      .child('rooms')
      .child(key)
      .set(invitedRoom)
      .then(() => {
        console.log('room add in user');
      })
      .catch((err) => {
        console.error(err);
      });
    closeModal();
  };

  /**
   * 현재 방에 들어와있는 유저를 제외하고 초대 가능한 유저만 보여줍니다.
   */
  displayUsers = (users) => {
    const currentRoomUserIds = this.props.currentRoomUsers.map(user => user.id);
    return users.length > 0 && users
      .filter(user => !currentRoomUserIds.includes(user.id)).map(user => (
        <UserInfoItem
          user={user}
          onClick={() => this.inviteUser(user)}
          key={user.id}
        />
      ));
  };

  render() {
    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '35rem',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        background: '#eee',
        padding: '3rem',
        boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
      },
    };

    const { isOpen, closeModal } = this.props;
    const { users } = this.state;
    return (
      <Modal
        shouldCloseOnOverlayClick
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <h1>초대하기</h1>
        {this.displayUsers(users)}
      </Modal>
    );
  }
}

UserInviteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  currentRoom: PropTypes.object,
  currentRoomUsers: PropTypes.array,
};

export default connect(null, { setCurrentRoom })(UserInviteModal);
