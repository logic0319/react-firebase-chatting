import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Message.module.scss';

class Message extends Component {
  isImage = message => message.hasOwnProperty('image') && !message.hasOwnProperty('content');

  render() {
    const { message, user } = this.props;
    return (
      <div className={styles.message}>
        <img className={styles.avatar} src={user.avatar} alt={`${user.name} avatar`} />
        <div className={styles['message-content']}>
          <span className={styles['display-name']}>{user.name}</span>
          {this.isImage(message)
            ? (
              <div className={styles['image-wrapper']}>
                <img
                  className={styles['message-img']}
                  src={message.image}
                  alt={message.image}
                />
              </div>
            )
            : <p className={styles['message-text']}>{message.content}</p>
          }
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default Message;
