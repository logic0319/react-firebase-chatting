import React, { Component } from 'react';
import styles from './RoomList.module.scss';
import firebase from '../../firebase';
import PropTypes from 'prop-types';
import ClipLoader from 'react-spinners/ClipLoader';

class RoomList extends Component {
  state = {
    user: this.props.currentUser,
    usersRef: firebase.database().ref('users'),
    rooms: [],
    loading: true,
  };

  componentDidMount() {
    const { user } = this.state;

    if (user) {
      this.addListeners(user.uid);
    }
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  addListeners = (userId) => {
    this.addUserListener(userId);
  };

  addUserListener = (userId) => {
    const { usersRef } = this.state;
    const loadedRooms = [];
    usersRef.child(userId).child('rooms').on('child_added', (snap) => {
      loadedRooms.push(snap.val());
      this.setState({
        rooms: loadedRooms, loading: false,
      });
    });
  };

  removeListeners = () => {
    this.state.usersRef.off();
  };

  displayRooms = rooms => (
    rooms.length > 0 && rooms.map(room => (
      <h3 className={styles['room-name']} key={room.id}>
        {`@ ${room.name}`}
      </h3>
    ))
  );

  displaySpinner = () => (
    <div className={styles['spinner-wrapper']}>
      <ClipLoader color="#ffffff" />
    </div>
  );

  render() {
    const { rooms, loading } = this.state;
    return (
      <section className={styles['room-list']}>
        <h1 className={styles.title}>OPEN CHAT</h1>
        { loading ? this.displaySpinner() : this.displayRooms(rooms)}
      </section>
    );
  }
}

RoomList.propTypes = {
  currentUser: PropTypes.object,
};

export default RoomList;
