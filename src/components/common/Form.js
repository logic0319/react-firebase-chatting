import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Form.module.scss';

class Form extends Component {
  handleSubmit = (e) => {
    const { onSubmit } = this.props;
    onSubmit(e);
  };

  render() {
    const { children, className } = this.props;
    return (
      <form className={`${styles.form} ${className}`} onSubmit={this.handleSubmit}>
        {children}
      </form>
    );
  }
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func,
  className: PropTypes.string,
};

export default Form;
