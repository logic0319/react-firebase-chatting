import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './Input.module.scss';

class Input extends Component {
  handleChange = (e) => {
    const { onChange } = this.props;
    onChange(e);
  };

  render() {
    const {
      id, name, value, type, placeholder, className,
    } = this.props;
    return (
      <Fragment>
        <input
          id={id}
          name={name}
          value={value}
          type={type}
          placeholder={placeholder}
          onChange={this.handleChange}
          className={`${styles.input} ${className}`}
          autoComplete="off"
        />
        <label
          htmlFor={id}
          className={styles.label}
        >
          {placeholder}
        </label>
      </Fragment>
    );
  }
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Input;
