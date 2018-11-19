import React, { Component } from 'react';
import styles from './SidePanel.module.scss';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import CreateRoomModal from './CreateRoomModal/CreateRoomModal';
import firebase from '../../firebase';
import PropTypes from 'prop-types';
import { clearUser, clearRoom } from '../../actions';
import { connect } from 'react-redux';

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
    const { clearRoom, clearUser } = this.props;
    firebase
      .auth()
      .signOut()
      .then(() => console.log('Logout'));
    clearRoom();
    clearUser();
  };

  render() {
    const { CreateRoomModalIsOpen } = this.state;
    const { currentUser } = this.props;
    return (
      <div className={styles['side-panel']}>
        <button onClick={this.openModal} type="button">
          <Tooltip title="방 만들기">
            <Icon className={styles.icon}>add_box</Icon>
          </Tooltip>
        </button>
        <button onClick={this.handleLogout} type="button">
          <Tooltip title="로그아웃">
            <Icon className={styles.icon}>directions_run</Icon>
          </Tooltip>
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
  clearRoom: PropTypes.func.isRequired,
  clearUser: PropTypes.func.isRequired,
};

export default connect(null, { clearRoom, clearUser })(SidePanel);
