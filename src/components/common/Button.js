import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

class Button extends Component {
  handleClick = (e) => {
    const { onClick } = this.props;
    onClick && onClick(e);
  };

  render() {
    const {
      children, loader, disabled, className,
    } = this.props;
    return (
      <button
        className={`${styles.button} ${className}`}
        onClick={this.handleClick}
        type="button"
        disabled={disabled}
      >
        { loader ? <div className={styles.loader} /> : children }
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  loader: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

Button.default = {
  loader: false,
  disabled: false,
};

export default Button;
