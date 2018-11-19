import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import UserInfoItem from '../../common/UserInfoItem';

class CurrentRoomUsersModal extends Component {
  displayUsers = users => users.length > 0 && users.map(user => (
    <UserInfoItem
      user={user}
      onClick={() => this.inviteUser(user)}
      key={user.id}
    />
  ));

  render() {
    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '35rem',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        background: '#eee',
        padding: '3rem',
        boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
      },
    };

    const { isOpen, closeModal, currentRoomUsers } = this.props;
    return (
      <Modal
        shouldCloseOnOverlayClick
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <h1>현재 참여자</h1>
        {this.displayUsers(currentRoomUsers)}
      </Modal>
    );
  }
}

CurrentRoomUsersModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  currentRoomUsers: PropTypes.array.isRequired,
};

export default CurrentRoomUsersModal;
