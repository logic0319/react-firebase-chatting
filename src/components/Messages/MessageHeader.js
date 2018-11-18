import React, { Component } from 'react';
import Paper from '../common/Paper';
import PropTypes from 'prop-types';
import styles from './MessageHeader.module.scss';

class MessageHeader extends Component {
  render() {
    const { roomName } = this.props;
    return (
      <Paper className={styles['message-header']}>
        <h3 className={styles['room-name']}>{`# ${roomName}`}</h3>
      </Paper>
    );
  }
}

MessageHeader.propTypes = {
  roomName: PropTypes.string.isRequired,
};

export default MessageHeader;
