import React, { Component, Fragment } from 'react';
import Paper from '../../common/Paper';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import styles from './MessageHeader.module.scss';
import UserInviteModal from './UserInviteModal';
import CurrentRoomUsersModal from './CurrentRoomUsersModal';
import Tooltip from '@material-ui/core/Tooltip';
import firebase from '../../../firebase';

class MessageHeader extends Component {
  state = {
    UserListModalIsOpen: false,
    CurrentRoomUsersIsOpen: false,
    roomsRef: firebase.database().ref('rooms'),
    currentRoom: this.props.currentRoom,
    currentRoomUsers: [],
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
    this.addRoomListener();
  };

  openCurrentRoomUsersModal = () => {
    this.setState({ CurrentRoomUsersIsOpen: true });
  };

  closeCurrentRoomUsersModal = () => {
    this.setState({ CurrentRoomUsersIsOpen: false });
  };

  openModal = () => {
    this.setState({ UserListModalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ UserListModalIsOpen: false });
  };

  /**
   * 이벤트 리스너를 등록합니다.
   * DB에서 roodId의 유저가 추가 될 때마다 실행 됩니다.
   */
  addRoomListener = () => {
    const { roomsRef, currentRoom } = this.state;
    const currentRoomUsers = [];
    if (currentRoom) {
      roomsRef.child(currentRoom.id).child('users').on('child_added', (snap) => {
        currentRoomUsers.push(snap.val());
        this.setState({ currentRoomUsers });
      });
    }
  };

  removeListeners = () => {
    this.state.roomsRef.off();
  };

  render() {
    const { currentRoom } = this.props;
    const { UserListModalIsOpen, currentRoomUsers, CurrentRoomUsersIsOpen } = this.state;
    return (
      <Fragment>
        <Paper className={styles['message-header']}>
          <div className={styles['room-info']}>
            <h3 className={styles['room-name']}>{`# ${currentRoom ? currentRoom.name : 'Welcome to Open Chat'}`}</h3>
            <button
              type="button"
              className={styles['user-count']}
              onClick={this.openCurrentRoomUsersModal}
              disabled={!currentRoom}
            >
              {`참여자 수 : ${currentRoomUsers.length}`}
            </button>
          </div>
          <button type="button" onClick={this.openModal} disabled={!currentRoom}>
            <Tooltip title="초대하기">
              <Icon className={styles.icon}>person_add</Icon>
            </Tooltip>
          </button>
        </Paper>
        <UserInviteModal
          isOpen={UserListModalIsOpen}
          closeModal={this.closeModal}
          currentRoom={currentRoom}
          currentRoomUsers={currentRoomUsers}
        />
        <CurrentRoomUsersModal
          isOpen={CurrentRoomUsersIsOpen}
          closeModal={this.closeCurrentRoomUsersModal}
          currentRoomUsers={currentRoomUsers}
        />
      </Fragment>
    );
  }
}

MessageHeader.propTypes = {
  currentRoom: PropTypes.object,
};

export default MessageHeader;
