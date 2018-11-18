import React, { Component } from 'react';
import styles from './SidePanel.module.scss';
import Icon from '@material-ui/core/Icon';
import CreateRoomModal from './CreateRoomModal/CreateRoomModal';

class SidePanel extends Component {
  state = {
    CreateRoomModalIsOpen: false,
  };

  openModal = () => {
    this.setState({ CreateRoomModalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ CreateRoomModalIsOpen: false });
  };

  render() {
    const { CreateRoomModalIsOpen } = this.state;
    return (
      <div className={styles['side-panel']}>
        <button onClick={this.openModal} type="button">
          <Icon className={styles.icon}>add_box</Icon>
        </button>
        <CreateRoomModal
          isOpen={CreateRoomModalIsOpen}
          closeModal={this.closeModal}
        />
      </div>
    );
  }
}

export default SidePanel;
