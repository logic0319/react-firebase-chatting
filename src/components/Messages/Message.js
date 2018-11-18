import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Message.module.scss';

class Message extends Component {
  render() {
    const { message, user } = this.props;
    return (
      <div className={styles.message}>
        <img className={styles.avatar} src={user.photoURL} alt={`${user.displayName} avatar`} />
        <div className={styles['message-content']}>
          <span className={styles['display-name']}>{user.displayName}</span>
          <p className={styles['message-text']}>{message}</p>
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

export default Message;
