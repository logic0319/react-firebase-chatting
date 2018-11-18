import React, { Component } from 'react';
import MessageHeader from './MessageHeader';
import MessageForm from './MessageForm';
import Paper from '../common/Paper';
import styles from './Messages.module.scss';
import PropTypes from 'prop-types';


class Messages extends Component {
  render() {
    const { currentRoom, currentUser } = this.props;
    return (
      <section className={styles.messages}>
        <MessageHeader
          roomName={currentRoom ? currentRoom.name : ''}
        />
        <Paper className={styles['message-content']} />
        <MessageForm
          currentUser={currentUser}
          currentRoom={currentRoom}
        />
      </section>
    );
  }
}

Messages.propTypes = {
  currentUser: PropTypes.object,
  currentRoom: PropTypes.object,
};

export default Messages;
