import React, { Component, Fragment } from 'react';
import Paper from '../../common/Paper';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import styles from './MessageHeader.module.scss';
import UserInviteModal from './UserInviteModal';
import firebase from '../../../firebase';

class MessageHeader extends Component {
  state = {
    UserListModalIsOpen: false,
    roomsRef: firebase.database().ref('rooms'),
    currentRoom: this.props.currentRoom,
    currentRoomUsers: [],
  };

  componentDidMount() {
    this.addListeners();
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  addListeners = () => {
    this.addRoomListener();
  };

  openModal = () => {
    this.setState({ UserListModalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ UserListModalIsOpen: false });
  };

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
    const { UserListModalIsOpen, currentRoomUsers } = this.state;
    return (
      <Fragment>
        <Paper className={styles['message-header']}>
          <h3 className={styles['room-name']}>{`# ${currentRoom ? currentRoom.name : 'Welcome to Open Chat'}`}</h3>
          <Icon className={styles.icon} onClick={this.openModal}>person_add</Icon>
        </Paper>
        <UserInviteModal
          isOpen={UserListModalIsOpen}
          closeModal={this.closeModal}
          currentRoom={currentRoom}
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
