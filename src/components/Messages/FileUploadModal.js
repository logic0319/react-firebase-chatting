import React, { Component } from 'react';
import Modal from 'react-modal';
import Input from '../common/Input';
import Button from '../common/Button';
import mime from 'mime-types';
import PropTypes from 'prop-types';
import styles from './FileUplodeModal.module.scss';

class FileUploadModal extends Component {
  state = {
    file: null,
    authorized: ['image/jpeg', 'image/png'],
  };

  addFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      this.setState({ file });
    }
  };

  sendFile = () => {
    const { file } = this.state;
    const { uploadFile, closeModal } = this.props;
    if (file !== null) {
      if (this.isAuthorized(file.name)) {
        const metadata = { contentType: mime.lookup(file.name) };
        uploadFile(file, metadata);
        closeModal();
        this.clearFile();
      }
    }
  };

  isAuthorized = filename => this.state.authorized.includes(mime.lookup(filename));

  clearFile = () => this.setState({ file: null });

  render() {
    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '60rem',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        background: '#eee',
        padding: '3rem',
        boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
      },
    };

    const { isOpen, closeModal } = this.props;
    return (
      <Modal
        shouldCloseOnOverlayClick
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <h1>이미지 파일을 선택하세요</h1>
        <Input
          id="file"
          name="file"
          type="file"
          placeholder="File types: jpg, png"
          onChange={this.addFile}
        />
        <div className={styles['button-wrapper']}>
          <Button onClick={this.sendFile}>전송</Button>
        </div>
      </Modal>
    );
  }
}

FileUploadModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
};

export default FileUploadModal;
