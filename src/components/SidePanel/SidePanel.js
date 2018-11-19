import React, { Component } from 'react';
import styles from './SidePanel.module.scss';
import Icon from '@material-ui/core/Icon';
import CreateRoomModal from './CreateRoomModal/CreateRoomModal';
import firebase from '../../firebase';
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

  handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log('Logout'));
  };

  render() {
    const { CreateRoomModalIsOpen } = this.state;
    const { currentUser } = this.props;
    return (
      <div className={styles['side-panel']}>
        <button onClick={this.openModal} type="button">
          <Icon className={styles.icon}>add_box</Icon>
        </button>
        <button onClick={this.handleLogout} type="button">
          <Icon className={styles.icon}>directions_run</Icon>
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
