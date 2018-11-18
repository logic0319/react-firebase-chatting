import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Paper.module.scss';

class Paper extends Component {
  render() {
    const { children, className } = this.props;
    return (
      <div className={`${styles.paper} ${className}`}>
        {children}
      </div>
    );
  }
}

Paper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Paper;
