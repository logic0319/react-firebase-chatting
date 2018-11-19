import React, { Component } from 'react';
import styles from './RoomList.module.scss';
import firebase from '../../firebase';
import PropTypes from 'prop-types';
import HashLoader from 'react-spinners/HashLoader';
import { connect } from 'react-redux';
import { setCurrentRoom } from '../../actions';

export class RoomList extends Component {
  state = {
    activeRoom: '',
    room: null,
    user: this.props.currentUser,
    usersRef: firebase.database().ref('users'),
    rooms: [],
    loading: true,
    firstLoad: true,
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

  setFirstRoom = () => {
    const firstRoom = this.state.rooms[0];
    if (this.state.firstLoad && this.state.rooms.length > 0) {
      this.props.setCurrentRoom(firstRoom);
      this.setState({ room: firstRoom });
      this.setActiveRoom(firstRoom);
    }
    this.setState({ firstLoad: false });
  };

  setActiveRoom = (room) => {
    this.setState({ activeRoom: room.id });
  };

  changeRoom = (room) => {
    this.setActiveRoom(room);
    this.props.setCurrentRoom(room);
    this.setState({ room });
  };

  addListeners = (userId) => {
    this.addUserListener(userId);
  };

  addUserListener = (userId) => {
    const { usersRef } = this.state;
    const loadedRooms = [];
    usersRef.child(userId).child('rooms').on('child_added', (snap) => {
      loadedRooms.push(snap.val());
      this.setState({ rooms: loadedRooms, loading: false }, () => this.setFirstRoom());
    });
  };

  removeListeners = () => {
    this.state.usersRef.off();
  };

  displayRooms = rooms => (
    rooms.length > 0 && rooms.map(room => (
      <button
        type="button"
        onClick={() => this.changeRoom(room)}
        className={`${styles['room-name']} ${this.state.activeRoom === room.id ? styles.active : ''}`}
        key={room.id}
      >
        {`@ ${room.name}`}
      </button>
    ))
  );

  displaySpinner = () => (
    <div className={styles['spinner-wrapper']}>
      <HashLoader color="#ffffff" />
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
  setCurrentRoom: PropTypes.func.isRequired,
};

export default connect(null, { setCurrentRoom })(RoomList);
