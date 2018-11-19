import React, { Component } from 'react';
import firebase from '../../firebase';
import uuidv4 from 'uuid/v4';
import styles from './MessageForm.module.scss';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';
import FileUploadModal from './FileUploadModal';
import ProgressBar from './ProgressBar';
import Tooltip from '@material-ui/core/Tooltip';

class MessageForm extends Component {
  state = {
    storageRef: firebase.storage().ref(),
    uploadTask: null,
    percentUploaded: 0,
    message: '',
    user: this.props.currentUser,
    room: this.props.currentRoom,
    messagesRef: firebase.database().ref('messages'),
    errors: [],
    loading: false,
    fileUploadModalIsOpen: false,
  };

  openModal = () => {
    this.setState({ fileUploadModalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ fileUploadModalIsOpen: false });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  createMessage = (fileUrl = null) => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: this.state.user.uid,
        name: this.state.user.displayName,
        avatar: this.state.user.photoURL,
      },
    };
    if (fileUrl !== null) {
      message.image = fileUrl;
    } else {
      message.content = this.state.message;
    }
    return message;
  };

  sendMessage = (event) => {
    if (event.key === 'Enter') {
      const { currentRoom } = this.props;
      const { message, messagesRef } = this.state;

      if (message) {
        this.setState({ loading: true });
        messagesRef
          .child(currentRoom.id)
          .push()
          .set(this.createMessage())
          .then(() => {
            this.setState({ loading: false, message: '', errors: [] });
          })
          .catch((err) => {
            console.error(err);
            this.setState(state => ({
              loading: false,
              errors: state.errors.concat(err),
            }));
          });
      } else {
        this.setState(state => ({
          errors: state.errors.concat({ message: 'Add a message' }),
        }));
      }
    }
  };

  uploadFile = (file, metadata) => {
    const pathToUpload = this.state.room.id;
    const ref = this.state.messagesRef;
    const filePath = `images/${uuidv4()}.jpg`;

    this.setState(state => ({
      uploadTask: state.storageRef.child(filePath).put(file, metadata),
    }),
    () => {
      this.state.uploadTask.on(
        'state_changed',
        (snap) => {
          const percentUploaded = Math.round(
            (snap.bytesTransferred / snap.totalBytes) * 100,
          );
          this.setState({ percentUploaded });
        },
        (err) => {
          console.error(err);
          this.setState(state => ({
            errors: state.errors.concat(err),
            uploadTask: null,
          }));
        },
        () => {
          this.state.uploadTask.snapshot.ref
            .getDownloadURL()
            .then((downloadUrl) => {
              this.sendFileMessage(downloadUrl, ref, pathToUpload);
            })
            .catch((err) => {
              console.error(err);
              this.setState(state => ({
                errors: state.errors.concat(err),
                uploadTask: null,
              }));
            });
        },
      );
    });
  };

  sendFileMessage = (fileUrl, ref, pathToUpload) => {
    ref.child(pathToUpload)
      .push()
      .set(this.createMessage(fileUrl))
      .then(() => {
        this.setState({ percentUploaded: 0 });
      })
      .catch((err) => {
        console.error(err);
        this.setState(state => ({
          errors: state.errors.concat(err),
        }));
      });
  };

  render() {
    const { fileUploadModalIsOpen, percentUploaded, room } = this.state;
    return (
      <div className={styles['message-form']}>
        <div className={styles['message-form-content']}>
          <button
            disabled={!room}
            type="button"
            className={styles['upload-button']}
            onClick={this.openModal}
          >
            <Tooltip title="사진 업로드">
              <Icon className={styles['upload-icon']}>
              add_to_photos
              </Icon>
            </Tooltip>
          </button>
          <input
            disabled={!room}
            placeholder={room ? '' : '방을 생성해주세요'}
            onKeyPress={this.sendMessage}
            onChange={this.handleChange}
            className={styles['message-input']}
            id="message"
            value={this.state.message}
            name="message"
            type="text"
            autoComplete="off"
          />
        </div>
        <ProgressBar completed={percentUploaded} />
        <FileUploadModal
          isOpen={fileUploadModalIsOpen}
          closeModal={this.closeModal}
          uploadFile={this.uploadFile}
        />
      </div>
    );
  }
}

MessageForm.propTypes = {
  currentUser: PropTypes.object,
  currentRoom: PropTypes.object,
};
export default MessageForm;
