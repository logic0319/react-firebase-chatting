import React, { Component } from 'react';
import styles from './SidePanel.module.scss';
import Icon from '@material-ui/core/Icon';

class SidePanel extends Component {
  render() {
    return (
      <div className={styles['side-panel']}>
        <Icon className={styles.icon}>add_box</Icon>
      </div>
    );
  }
}

export default SidePanel;
