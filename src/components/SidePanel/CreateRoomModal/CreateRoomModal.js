import React, { Component } from 'react';
import Modal from 'react-modal';
import Input from '../../common/Input';
import Button from '../../common/Button';
import firebase from '../../../firebase';
import PropTypes from 'prop-types';
import styles from './CreateRoomModal.module.scss';

class CreateRoomModal extends Component {
  state = {
    roomName: '',
    channelsRef: firebase.database().ref('channels'),
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {
    if (this.isFormValid(this.state)) {
      this.createRoom();
    }
  };

  isFormValid = ({ roomName }) => roomName;

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

    const { isOpen, closeModal } = this.props;
    const { roomName } = this.state;
    return (
      <Modal
        shouldCloseOnOverlayClick
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h1>방 만들기</h1>
        <Input
          id="roomName"
          name="roomName"
          value={roomName}
          placeholder="제목"
          type="text"
          onChange={this.handleChange}
        />
        <div className={styles['button-wrapper']}>
          <Button onClick={this.handleSubmit}>만들기</Button>
        </div>
      </Modal>
    );
  }
}

CreateRoomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default CreateRoomModal;
