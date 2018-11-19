import React, { Component, Fragment } from 'react';
import Paper from '../../common/Paper';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import styles from './MessageHeader.module.scss';
import UserInviteModal from './UserInviteModal';

class MessageHeader extends Component {
  state = {
    UserListModalIsOpen: false,
  };

  openModal = () => {
    this.setState({ UserListModalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ UserListModalIsOpen: false });
  };

  render() {
    const { currentRoom } = this.props;
    const { UserListModalIsOpen } = this.state;
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
        />
      </Fragment>
    );
  }
}

MessageHeader.propTypes = {
  currentRoom: PropTypes.object,
};

export default MessageHeader;
