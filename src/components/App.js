import React, { Component } from 'react';
import SidePanel from './SidePanel/SidePanel';
import RoomList from './RoomList/RoomList';
import Messages from './Messages/Messages';
import styles from './App.module.scss';
import '../styles/main.scss';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class App extends Component {
  render() {
    const { currentUser, currentRoom } = this.props;
    return (
      <div className={styles.App}>
        <SidePanel
          currentUser={currentUser}
        />
        <RoomList
          currentUser={currentUser}
        />
        <Messages
          currentUser={currentUser}
          currentRoom={currentRoom}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentRoom: state.room.currentRoom,
});

App.propTypes = {
  currentUser: PropTypes.object,
  currentRoom: PropTypes.object,
};

export default connect(mapStateToProps)(App);
