import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ErrorMessage.module.scss';

class ErrorMessage extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className={styles.message}>
        <h3 className={styles.title}>ERROR</h3>
        {children}
      </div>
    );
  }
}

ErrorMessage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorMessage;
