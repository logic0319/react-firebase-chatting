import React, { Component } from 'react';
import styles from './SidePanel.module.scss';
import Icon from '@material-ui/core/Icon';
import CreateRoomModal from './CreateRoomModal/CreateRoomModal';
import PropTypes from 'prop-types';

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
    const { currentUser } = this.props;
    return (
      <div className={styles['side-panel']}>
        <button onClick={this.openModal} type="button">
          <Icon className={styles.icon}>add_box</Icon>
        </button>
        <CreateRoomModal
          currentUser={currentUser}
          isOpen={CreateRoomModalIsOpen}
          closeModal={this.closeModal}
        />
      </div>
    );
  }
}

SidePanel.propTypes = {
  currentUser: PropTypes.object,
};

export default SidePanel;
